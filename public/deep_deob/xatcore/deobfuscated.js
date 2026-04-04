/**
 * xatcore-js.js — Pure JavaScript replacement for xat's Emscripten WASM core.
 *
 * This module intercepts the WASM Module/SendC pathway and implements the xat
 * XML protocol directly in JavaScript, connecting to our private server's WebSocket.
 *
 * Load this BEFORE activity.js in embed.html.
 */

(function () {
  'use strict';

  // ===== STATE =====
  const state = {
    userId: 0,
    socketId: 0,
    username: "Guest",
    roomId: "1",
    groupName: "",
    rank: 0,
    days: 0,
    xats: 0,
    avatar: "",
    lang: "en",
    connected: false,
    joined: false,
    ws: null,
    fifoQueue: [],
    // queued {Type, Cmd, Data} events for xatTick/ReadToJavaFifo
    lineId: 1,
    users: new Map(),
    // userId -> {name, avatar, rank, days, ...}
    authToken: null,
    flags: 0,
    page: "classic",
    tickEnabled: false,
    activityInstance: null,
    mainInitDone: false,
    // whether visitors.main() has been called
    groupConfig: {},
    // gconfig data from gp packet
    savedId: "" // last clicked user ID for actions
  };

  // Get auth token from sessionStorage (set by login.html)
  state.authToken = sessionStorage.getItem("xat_token") || localStorage.getItem("xat_token") || null;

  // Get user info if available
  try {
    const userStr = sessionStorage.getItem("xat_user") || localStorage.getItem("xat_user");
    if (userStr) {
      const user = JSON.parse(userStr);
      state.userId = user.id || 0;
      state.username = user.username || "Guest";
      state.rank = user.rank || 0;
      state.xats = user.xats || 0;
      state.days = user.days || 0;
    }
  } catch (e) {}

  // Sync auth systems: if we have xat_token auth, populate localStorage.todo
  // so the classic UI (settings, actions) can read avatar/user data
  if (state.authToken && state.userId) {
    try {
      const todoData = JSON.parse(localStorage.getItem("todo") || "{}");
      todoData.w_userno = state.userId;
      todoData.w_name = state.username;
      todoData.w_avatar = state.avatar || "";
      todoData.w_xats = state.xats;
      todoData.w_days = state.days;
      todoData.w_k1 = state.authToken;
      localStorage.setItem("todo", JSON.stringify(todoData));
    } catch (e) {}
  }

  // ===== FIFO QUEUE =====
  function enqueue(type, cmd, data) {
    state.fifoQueue.push(JSON.stringify({
      Type: String(type),
      Cmd: cmd || "",
      Data: data || ""
    }));
  }
  function dequeue() {
    if (state.fifoQueue.length > 0) {
      return state.fifoQueue.shift();
    } else {
      return "";
    }
  }

  // Enqueue a FifoNotification with eval strings
  function enqueueFifo(evalStrings) {
    if (!Array.isArray(evalStrings)) {
      evalStrings = [evalStrings];
    }
    enqueue(5, "FifoNotification", JSON.stringify(evalStrings));
  }

  // ===== XML HELPERS =====
  function escapeXml(str) {
    return String(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function buildXml(tag, attrs) {
    const parts = Object.entries(attrs).filter(([_, v]) => v !== undefined && v !== null).map(([k, v]) => `${k}="${escapeXml(v)}"`).join(" ");
    return `<${tag}${parts ? " " + parts : ""} />`;
  }
  function parseXml(str) {
    str = str.trim().replace(/\0/g, "");
    if (!str.startsWith("<")) {
      return null;
    }
    const tagMatch = str.match(/^<(\w+)\s*/);
    if (!tagMatch) {
      return null;
    }
    const tag = tagMatch[1];
    const attrs = {};
    const attrRegex = /(\w+)="([^"]*)"/g;
    let m;
    while ((m = attrRegex.exec(str)) !== null) {
      attrs[m[1]] = m[2].replace(/&quot;/g, "\"").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    }
    return {
      tag,
      attrs
    };
  }

  // ===== RANK/FLAG HELPERS =====
  // pFlags bits — must match NamePowers in xat.js exactly
  const PFLAGS = {
    hat: 1,
    status: 2,
    glow: 4,
    col: 8,
    statusglow: 16,
    statuscol: 32,
    red: 64,
    green: 128,
    blue: 256,
    light: 512,
    nospace: 1024,
    animate: 2048,
    jewel: 4096,
    flag: 8192,
    wave: 16384,
    grad: 32768,
    valid: 65536,
    // registered user
    everypower: 131072,
    bump: 262144,
    mirror: 524288,
    invert: 1048576,
    typing: 2097152,
    // typing indicator enabled
    away: 4194304,
    // away status
    hasdays: 8388608,
    // subscriber
    invisible: 16777216,
    sline: 33554432,
    // custom smiley line
    category: 67108864,
    shuffle: 134217728,
    nolinks: 268435456,
    hasprofile: 1073741824
  };
  function computePFlags(user) {
    let flags = 0;
    if (user && user.name && !user.name.startsWith("Guest_")) {
      flags |= PFLAGS.valid | PFLAGS.typing;
    }
    if (user && user.days > 0) {
      flags |= PFLAGS.hasdays;
    }
    return flags;
  }

  // ===== WEBSOCKET =====
  function connectWS() {
    if (state.ws && state.ws.readyState <= 1) {
      return;
    }
    const proto = location.protocol === "https:" ? "wss:" : "ws:";
    const host = location.hostname || "localhost";
    const port = location.port || "6969";
    const url = `${proto}//${host}:${port}/ws`;
    console.log("[xatcore-js] Connecting to", url);
    state.ws = new _origWebSocket(url);
    state.ws.binaryType = "arraybuffer";

    // Keep activity's WebSocket reference updated so IsConnected() works
    updateActivityWS();

    // Show "Connecting..." overlay in the chat UI
    enqueueFifo("InitPage(\"Connecting\")");
    state.ws.onopen = () => {
      console.log("[xatcore-js] WebSocket connected");
      updateActivityWS();

      // Get room ID from server
      const groupName = state.groupName || "Lobby";
      fetch("/web_gear/chat/roomid.php?d=" + encodeURIComponent(groupName)).then(r => r.json()).then(data => {
        state.roomId = String(data.id || "1").trim();
        // Send handshake with token auth
        const yAttrs = {
          r: state.roomId
        };
        if (state.authToken) {
          yAttrs.token = state.authToken;
        }
        sendPacket("y", yAttrs);
      }).catch(() => {
        state.roomId = "1";
        sendPacket("y", {
          r: "1",
          token: state.authToken || ""
        });
      });
    };
    state.ws.onmessage = evt => {
      let data;
      if (evt.data instanceof ArrayBuffer) {
        data = new TextDecoder().decode(evt.data);
      } else {
        data = evt.data;
      }
      const packets = data.split("\0").filter(p => p.trim().length > 0);
      for (const pkt of packets) {
        handleServerPacket(pkt);
      }
    };
    state.ws.onclose = () => {
      console.log("[xatcore-js] WebSocket closed");
      state.connected = false;
      state.joined = false;
      // Show disconnected state in the UI
      enqueueFifo("InitPage(\"Disconnected\")");
    };
    state.ws.onerror = e => {
      console.error("[xatcore-js] WebSocket error");
    };
  }
  function updateActivityWS() {
    if (state.activityInstance && state.ws) {
      state.activityInstance.WebSocket = state.ws;
    }
  }
  function sendPacket(tag, attrs) {
    if (state.ws && state.ws.readyState === 1) {
      const xml = buildXml(tag, attrs);
      console.log("[xatcore-js] SEND:", xml);
      const buf = new TextEncoder().encode(xml + "\0");
      state.ws.send(buf);
    }
  }

  // ===== SERVER PACKET HANDLER =====
  function handleServerPacket(raw) {
    const parsed = parseXml(raw);
    if (!parsed) {
      return;
    }
    const {
      tag,
      attrs
    } = parsed;
    console.log("[xatcore-js] RECV:", tag, attrs);
    switch (tag) {
      case "y":
        handleHandshakeResponse(attrs);
        break;
      case "u":
        handleUserPacket(attrs);
        break;
      case "gp":
        handleGroupProps(attrs);
        break;
      case "done":
        handleDone(attrs);
        break;
      case "m":
        handleMessage(attrs);
        break;
      case "p":
        handlePrivateMessage(attrs);
        break;
      case "o":
        handleUserLeft(attrs);
        break;
      case "x":
        handleTyping(attrs);
        break;
      case "z":
        handleAway(attrs);
        break;
      case "e":
        handleError(attrs);
        break;
      case "c":
        handleKickBan(attrs);
        break;
      case "f":
        handleFriendPacket(attrs);
        break;
      case "gb":
        handleGuestbookPacket(attrs);
        break;
      case "us":
        handleUserSearchResult(attrs);
        break;
      case "h":
        break;
      // heartbeat ack, no action needed
      default:
        console.log("[xatcore-js] Unhandled packet:", tag, attrs);
    }
  }
  function handleHandshakeResponse(attrs) {
    // Server sends: <y i="socketId" u="userId" c="roomId" r="rank" ... />
    state.socketId = attrs.i || 0;
    if (attrs.u) {
      state.userId = parseInt(attrs.u);
      if (state.activityInstance) {
        state.activityInstance.MyId = state.userId;
      }
    }
    if (attrs.n) {
      state.username = attrs.n;
    }
    if (attrs.r) {
      state.rank = parseInt(attrs.r);
    }
    if (attrs.d0) {
      state.days = parseInt(attrs.d0);
    }
    if (attrs.x0) {
      state.xats = parseInt(attrs.x0);
    }
    state.connected = true;

    // Send j2 to join the room
    sendPacket("j2", {
      u: String(state.userId),
      n: state.username,
      a: state.avatar,
      cb: String(Math.floor(Date.now() / 1000)),
      token: state.authToken || ""
    });
  }
  function handleUserPacket(attrs) {
    const userId = attrs.u;
    const username = attrs.n || "User_" + userId;
    const avatar = attrs.a || "";
    const rank = parseInt(attrs.f || "0");
    const isRegistered = !username.startsWith("Guest_");
    const days = parseInt(attrs.d0 || "0");
    const pawn = attrs.pawn || "";
    const cyclepawn = attrs.cyclepawn || "";
    const status = attrs.st || "";
    const homepage = attrs.h || "";
    const badge = attrs.badge || "";

    // Collect power bitmasks from p0-p15 attributes
    const powerMasks = [];
    for (let i = 0; i < 16; i++) {
      powerMasks.push(parseInt(attrs["p" + i] || "0"));
    }
    state.users.set(userId, {
      name: username,
      avatar,
      rank,
      days,
      pawn,
      cyclepawn,
      status,
      homepage,
      badge,
      powerMasks,
      xats: 0
    });

    // Update self data if this is our own packet
    if (String(userId) === String(state.userId)) {
      state.rank = rank & 255; // Strip flag bits for rank comparison
      state.avatar = avatar;
      state.status = status;
      state.homepage = homepage;
      state.pawn = pawn;
    }

    // If not joined yet, defer — handleDone will emit visitors in rank order
    if (!state.mainInitDone) {
      return;
    }

    // Late join — emit immediately
    emitVisitor(userId, username, avatar, rank, days, isRegistered, pawn, cyclepawn, status, badge);
  }
  function emitVisitor(userId, username, avatar, rank, days, isRegistered, customPawn, cyclepawn, status, badge) {
    // Compute pFlags for this user
    let pFlags = 0;
    if (isRegistered) {
      pFlags |= PFLAGS.valid | PFLAGS.typing;
    }
    if (days > 0) {
      pFlags |= PFLAGS.hasdays;
    }

    // Determine image format
    let image = "(smile#)";
    if (avatar) {
      if (avatar.startsWith("(") || avatar.startsWith("<")) {
        image = avatar;
      } else if (/^\d+$/.test(avatar)) {
        image = avatar;
      } else {
        image = avatar;
      }
    }

    // Pawn: use custom pawn if set, else default rank-based pawn
    let pawn = "";
    if (customPawn) {
      pawn = customPawn.startsWith("(") ? customPawn : "(" + customPawn + ")";
    } else if (isRegistered) {
      // Rank-based pawn color
      const baseRank = rank & 255;
      const rankHex = baseRank.toString(16);
      pawn = "(p1*r" + rankHex + ")";
    }

    // Build visitor object with ALL fields visitors.js expects
    const visitorObj = {
      id: userId,
      name: username,
      registered: isRegistered ? username : "",
      image: image,
      pFlags: pFlags,
      pFlags2: 0,
      pawn: pawn,
      cyclepawn: cyclepawn || "",
      status: status || "",
      text: isRegistered ? username : "",
      PoolCol: 0,
      PoolColW: 0,
      F: rank,
      avatarEffect: "",
      Statusfx: "",
      badge: badge || ""
    };
    enqueueFifo("visitors.addVisitor('" + escapeJson(JSON.stringify(visitorObj)) + "', 0)");
  }
  function handleGroupProps(attrs) {
    const scroller = attrs.t || "";
    const roomId = attrs.g || state.roomId;

    // Build gconfig from gp attributes
    const gc = {};
    // Pass through any gXX attributes (group powers/config)
    for (const [key, val] of Object.entries(attrs)) {
      if (key.startsWith("g") && key.length > 1) {
        gc[key] = val;
      }
    }
    gc.p = attrs.p || "0|0|0|0|0|0|0|0|0|0|0";
    gc.t = scroller;
    gc.d = attrs.d || "3";
    state.groupConfig = gc;

    // Set group config in the UI - setGconfig expects JSON string
    enqueueFifo("setGconfig('" + escapeJson(JSON.stringify(gc)) + "')");
    // Display scroller text if present
    if (scroller) {
      enqueueFifo("if(typeof setScroller==='function')setScroller('" + escapeJson(scroller) + "')");
    }
  }
  function handleDone(attrs) {
    state.joined = true;
    console.log("[xatcore-js] Join complete, room:", state.roomId);

    // Close the "Connecting..." overlay
    enqueueFifo("ConnectingClose()");
    const isGuest = !state.authToken;
    const isRegistered = !isGuest && state.username && !state.username.startsWith("Guest_");
    const myPFlags = computePFlags({
      name: state.username,
      days: state.days
    });

    // ButCol/ButColW must be NUMBERS — toHex6() does Number(x).toString(16)
    // 0x000080 = 128 (dark blue), 0xFFFFFF = 16777215 (white)
    const butColNum = 128; // #000080 = default xat blue
    const butColWNum = 16777215; // #FFFFFF = white

    // Build COMPLETE mainConfig that xatMain() (xat.js) expects
    const mainConfig = {
      MyId: state.userId,
      page: "classic",
      dom: location.protocol + "//" + location.host,
      PhoneType: 3,
      lang: state.lang,
      GroupName: state.groupName || "Lobby",
      chatid: state.roomId,
      roomid: state.roomId,
      Flags: 5,
      // IsClassic flag (bit 0 = classic, bit 2 = classic variant)
      pFlags: myPFlags,
      pFlags2: 0,
      ButCol: butColNum,
      ButColW: butColWNum,
      xatback: "",
      // Chat background
      NotLoggedIn: isGuest ? "1" : "",
      MyRegName: isRegistered ? state.username : "",
      registered: isRegistered ? state.username : "",
      xats: state.xats,
      days: state.days
    };

    // Ensure Smilies, Avatars, and power arrays are initialized before xatMain runs
    enqueueFifo("if(!_Activity.instance.Smilies){_Activity.instance.Smilies=new Smilies();_Activity.instance.Avatars=new Avatars();_Activity.instance.Smilies.Animation=true;}");
    // Initialize PSSA, SOTH, SYEL as empty arrays so .indexOf() calls don't crash
    enqueueFifo("if(!_Activity.instance.PSSA){_Activity.instance.PSSA=[];_Activity.instance.SOTH=[];_Activity.instance.SYEL=[];_Activity.instance.TOPSH=[];_Activity.instance.SUPERPOWERS=[];_Activity.instance.xConsts=_Activity.instance.xConsts||{}}");
    // Fix cStyle: activity.js initializes it as {} (object) but setCstyle() expects a JSON string
    enqueueFifo("if(typeof _Activity.instance.cStyle!=='string'){_Activity.instance.cStyle='{}';}");

    // Initialize visitors panel (calls xatMain internally which sets up QuickBar + SmileyBar)
    enqueueFifo("visitors.main('" + escapeJson(JSON.stringify(mainConfig)) + "')");

    // Initialize messages panel
    enqueueFifo("messages.main('" + escapeJson(JSON.stringify(mainConfig)) + "')");

    // Trigger layout recalc so messagesOverlay gets proper dimensions
    enqueueFifo("if(typeof bodyResize==='function')bodyResize(null)");
    state.mainInitDone = true;

    // Emit rank section headers and visitors in rank order
    // IDs 300-399 are section headers: 300=group name, 301=rank section
    // Set background from gp packet if available
    if (state.groupConfig && state.groupConfig.xback) {
      mainConfig.xatback = state.groupConfig.xback;
    }
    const rankGroups = [{
      minRank: 32,
      label: "Main Owner",
      bg: 16750848,
      fg: 16777215
    }, {
      minRank: 16,
      label: "Owners",
      bg: 136,
      fg: 16777215
    }, {
      minRank: 4,
      label: "Moderators",
      bg: 34816,
      fg: 16777215
    }, {
      minRank: 2,
      label: "Members",
      bg: 4473924,
      fg: 16777215
    }, {
      minRank: 0,
      label: "Guests",
      bg: 8947848,
      fg: 16777215
    }];

    // Group name header
    enqueueFifo("visitors.addVisitor('" + escapeJson(JSON.stringify({
      id: 300,
      name: state.groupName || "Lobby",
      PoolCol: butColNum,
      PoolColW: butColWNum
    })) + "', -1)");

    // Collect users by rank tier
    for (const tier of rankGroups) {
      const usersInTier = [];
      for (const [uid, user] of state.users) {
        const r = user.rank || 0;
        if (tier.minRank === 0 ? r < 2 : r >= tier.minRank && (tier.minRank === 16 || r < rankGroups[rankGroups.indexOf(tier) - 1].minRank)) {
          usersInTier.push({
            uid,
            ...user
          });
        }
      }
      if (usersInTier.length === 0) {
        continue;
      }

      // Section header
      enqueueFifo("visitors.addVisitor('" + escapeJson(JSON.stringify({
        id: 301,
        name: tier.label,
        PoolCol: tier.bg,
        PoolColW: tier.fg
      })) + "', -1)");

      // Emit each user in this tier
      for (const u of usersInTier) {
        const isReg = u.name && !u.name.startsWith("Guest_");
        emitVisitor(u.uid, u.name, u.avatar, u.rank, u.days, isReg, u.pawn, u.cyclepawn, u.status, u.badge);
      }
    }

    // Update Sign In button text based on login status
    if (isGuest) {
      enqueueFifo("setSignInButton(\"Sign In\")");
    } else {
      enqueueFifo("setSignInButton(\"" + escapeJs(state.username) + "\")");
    }

    // Add a welcome system message
    addSystemMessage("Welcome to " + (state.groupName || "Lobby") + "!");
  }
  function handleMessage(attrs) {
    const userId = attrs.u || "0";

    // Check blocked users
    if (state.blockedUsers && state.blockedUsers.has(userId)) {
      return;
    }
    const text = attrs.t || "";
    const name = attrs.n || (state.users.get(userId) || {}).name || "Unknown";
    const user = state.users.get(userId);
    const isRegistered = name && !name.startsWith("Guest_");
    const msgObj = {
      i: state.lineId++,
      id: userId,
      name: name,
      text: text,
      image: user && user.avatar ? user.avatar : "(smile#)",
      registered: isRegistered ? name : "",
      pFlags: isRegistered ? PFLAGS.valid | PFLAGS.typing : 0,
      pFlags2: 0,
      pawn: "",
      Time: 0,
      msgId: "m" + Date.now() + Math.random().toString(36).slice(2, 6),
      Big: false,
      flip: false,
      cb: "0",
      avatarEffect: ""
    };
    enqueueFifo("messages.addMessage('" + escapeJson(JSON.stringify(msgObj)) + "')");
  }
  function handlePrivateMessage(attrs) {
    const userId = attrs.u || "0";
    const text = attrs.t || "";
    const targetId = attrs.d || "0";
    const isSelf = attrs.self === "1";
    const name = isSelf ? state.username : attrs.n || (state.users.get(userId) || {}).name || "Unknown";
    const msgObj = {
      i: state.lineId++,
      id: isSelf ? String(state.userId) : userId,
      name: name,
      text: (isSelf ? "(PM to " + ((state.users.get(targetId) || {}).name || "user") + ") " : "(PM) ") + text,
      image: "(smile#)",
      registered: name,
      pFlags: PFLAGS.valid,
      pFlags2: 0,
      pawn: "",
      Time: 0,
      msgId: "p" + Date.now(),
      Big: false,
      flip: false,
      cb: "0",
      avatarEffect: ""
    };
    enqueueFifo("messages.addMessage('" + escapeJson(JSON.stringify(msgObj)) + "')");
  }
  function handleUserLeft(attrs) {
    const userId = attrs.u;
    const user = state.users.get(userId);
    state.users.delete(userId);

    // Remove visitor from DOM using data-user attribute (how visitors.js stores them)
    enqueueFifo("var _el=document.querySelector('[data-user=\"" + userId + "\"]');if(_el)_el.remove();");
    if (user) {
      addSystemMessage(user.name + " has left.");
    }
  }
  function handleTyping(attrs) {
    // x packets can be typing indicators or trade protocol
    if (attrs.t && (attrs.t.startsWith("/trade") || attrs.t === "/tradeaccept" || attrs.t === "/tradereject")) {
      handleTradePacket(attrs);
      return;
    }
    const userId = attrs.u;
    const isTyping = attrs.t === "/typing" || attrs.d === "1" ? 1 : 0;
    enqueueFifo("visitors.doTyping(" + userId + ", " + isTyping + ")");
  }
  function handleAway(attrs) {
    // Away status update - re-render visitor with updated status
    const userId = attrs.u;
    const user = state.users.get(userId);
    if (user) {
      user.away = true;
      const isReg = user.name && !user.name.startsWith("Guest_");
      const visitorObj = {
        id: userId,
        name: user.name,
        registered: isReg ? user.name : "",
        image: user.avatar || "(smile#)",
        pFlags: computePFlags(user) | PFLAGS.away,
        pFlags2: 0,
        pawn: isReg ? "(p1#r42)" : "",
        status: attrs.t || "away",
        text: attrs.t || "away",
        PoolCol: 0,
        PoolColW: 0,
        F: user.rank,
        avatarEffect: ""
      };
      enqueueFifo("visitors.addVisitor('" + escapeJson(JSON.stringify(visitorObj)) + "', 0)");
    }
  }
  function handleError(attrs) {
    const text = attrs.t || "An error occurred.";
    addSystemMessage("Error: " + text);
  }
  function handleKickBan(attrs) {
    // Kicked or banned from room
    const reason = attrs.t || attrs.r || "You were disconnected.";
    addSystemMessage(reason);
    enqueueFifo("InitPage(\"" + escapeJs(reason) + "\")");
  }
  function handleFriendPacket(attrs) {
    // Friend list entry: <f u="id" n="name" a="avatar" s="online" />
    if (!state.friends) {
      state.friends = new Map();
    }
    state.friends.set(attrs.u, {
      id: attrs.u,
      name: attrs.n || "",
      avatar: attrs.a || "",
      online: attrs.s === "1"
    });
  }
  function handleGuestbookPacket(attrs) {
    // Guestbook entry: <gb u="ownerId" a="authorId" n="authorName" m="message" t="timestamp" />
    const msg = (attrs.n || "Unknown") + ": " + (attrs.m || "");
    addSystemMessage("[Guestbook] " + msg);
  }
  function handleUserSearchResult(attrs) {
    // User search result: <us u="id" n="name" a="avatar" f="rank" />
    addSystemMessage("[Search] " + (attrs.n || "Unknown") + " (ID: " + (attrs.u || "?") + ", Rank: " + (attrs.f || "0") + ")");
  }

  // Handle trade packets received via <x>
  function handleTradePacket(attrs) {
    if (attrs.t === "/trade") {
      // Someone wants to trade with us
      addSystemMessage(attrs.n + " wants to trade with you! Use /tradeaccept or /tradereject");
      state.pendingTradeFrom = attrs.u;
    } else if (attrs.t === "/tradeaccept") {
      addSystemMessage(attrs.n + " accepted your trade!");
    } else if (attrs.t === "/tradereject") {
      addSystemMessage(attrs.n + " rejected your trade.");
    }
  }
  function addSystemMessage(text) {
    const msgObj = {
      i: state.lineId++,
      id: "0",
      name: "System",
      text: text,
      image: "",
      registered: "",
      pFlags: 0,
      pFlags2: 0,
      pawn: "",
      Time: 5,
      // temporary message
      msgId: "",
      Big: false,
      flip: false,
      cb: "0",
      avatarEffect: ""
    };
    enqueueFifo("messages.addMessage('" + escapeJson(JSON.stringify(msgObj)) + "')");
  }

  // ===== STRING HELPERS =====
  function escapeJs(str) {
    return str.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\n/g, "\\n").replace(/\r/g, "\\r");
  }
  function escapeJson(str) {
    // Escape single quotes and backslashes for embedding in eval('...') strings
    return str.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
  }

  // ===== ACTIONS HELPERS =====
  // actions.js _0x552cdd expects: { action: string, label: string, icon: string, flags: number, row: number }
  // action strings prefixed with "$" trigger sub-panels (e.g. "$Ban" opens ban form)
  // icon appended to "svg/act" + icon + ".svg" — must match actual SVG filenames
  // flags: bit 0 = greyed out (disabled), bit 1 = gcontrol restricted
  // Available icons: AddAsFriend, Ban, BuyXats, Cancel, Divorce, Edit, Gifts, Ignore,
  //   Kick, Login, MakeGuest, MakeMember, MakeModerator, MakeOwner, OK, Powers,
  //   PrivateChat, PrivateMessage, Register, Settings, Store, Transfer

  // Rank constants matching server RANK enum
  const RANK_GUEST = 0;
  const RANK_MEMBER = 2;
  const RANK_MOD = 4;
  const RANK_OWNER = 16;
  function canActOn(myRank, targetRank) {
    // Can only act on users with strictly lower rank
    return myRank > targetRank;
  }
  function buildActionsMenu(targetUserId, isMe, targetRank) {
    const menu = [];
    const myRank = state.rank;
    const targetUser = state.users.get(String(targetUserId));
    const isTargetReg = targetUser && targetUser.name && !targetUser.name.startsWith("Guest_");
    if (isMe) {
      // === SELF ACTIONS ===
      menu.push({
        action: "Edit",
        label: "Edit Profile",
        icon: "Edit",
        flags: 0,
        row: 1
      });
      menu.push({
        action: "Settings",
        label: "Settings",
        icon: "Settings",
        flags: 0,
        row: 1
      });
      menu.push({
        action: "Powers",
        label: "Powers",
        icon: "Powers",
        flags: 0,
        row: 2
      });
      menu.push({
        action: "Store",
        label: "Store",
        icon: "Store",
        flags: 0,
        row: 2
      });
      menu.push({
        action: "$Transfer",
        label: "Transfer",
        icon: "Transfer",
        flags: 0,
        row: 3
      });
      menu.push({
        action: "BuyXats",
        label: "Buy Xats",
        icon: "BuyXats",
        flags: 0,
        row: 3
      });
    } else {
      // === OTHER USER ACTIONS ===
      let row = 1;

      // Row 1: Basic interaction (always available)
      menu.push({
        action: "PrivateChat",
        label: "Private Chat",
        icon: "PrivateChat",
        flags: 0,
        row: row
      });
      menu.push({
        action: "PrivateMessage",
        label: "Private Message",
        icon: "PrivateMessage",
        flags: 0,
        row: row
      });
      row++;

      // Row 2: Social
      menu.push({
        action: "AddAsFriend",
        label: "Add Friend",
        icon: "AddAsFriend",
        flags: 0,
        row: row
      });
      menu.push({
        action: "Ignore",
        label: "Ignore",
        icon: "Ignore",
        flags: 0,
        row: row
      });
      row++;

      // Row 3: Transfer / Gifts
      menu.push({
        action: "$Transfer",
        label: "Transfer",
        icon: "Transfer",
        flags: 0,
        row: row
      });
      menu.push({
        action: "Gifts",
        label: "Gifts",
        icon: "Gifts",
        flags: 0,
        row: row
      });
      row++;

      // Moderator+ actions (rank >= MOD)
      if (myRank >= RANK_MOD) {
        const cantAct = !canActOn(myRank, targetRank) ? 1 : 0;

        // Row 4: Kick & Ban
        menu.push({
          action: "$Kick",
          label: "Kick",
          icon: "Kick",
          flags: cantAct,
          row: row
        });
        menu.push({
          action: "$Ban",
          label: "Ban",
          icon: "Ban",
          flags: cantAct,
          row: row
        });
        row++;

        // Row 5: Gag & Mute (mod tools)
        menu.push({
          action: "Gag",
          label: "Gag",
          icon: "Ban",
          flags: cantAct,
          row: row
        });
        menu.push({
          action: "Ungag",
          label: "Ungag",
          icon: "Ban",
          flags: cantAct,
          row: row
        });
        row++;
      }

      // Owner+ actions (rank >= OWNER)
      if (myRank >= RANK_OWNER) {
        const cantAct = !canActOn(myRank, targetRank) ? 1 : 0;

        // Row: Rank management
        menu.push({
          action: "Mod",
          label: "Make Mod",
          icon: "MakeModerator",
          flags: 0,
          row: row
        });
        menu.push({
          action: "Member",
          label: "Make Member",
          icon: "MakeMember",
          flags: 0,
          row: row
        });
        row++;
        menu.push({
          action: "Guest",
          label: "Make Guest",
          icon: "MakeGuest",
          flags: cantAct,
          row: row
        });
        menu.push({
          action: "Owner",
          label: "Make Owner",
          icon: "MakeOwner",
          flags: 0,
          row: row
        });
        row++;

        // Unban
        menu.push({
          action: "Unban",
          label: "Unban",
          icon: "MakeGuest",
          flags: 0,
          row: row
        });
        menu.push({
          action: "Dunce",
          label: "Dunce",
          icon: "Ban",
          flags: cantAct,
          row: row
        });
        row++;
      }
    }
    return menu;
  }

  // Build sub-panel data arrays that actions.js iterates over when $Kick/$Ban/$Transfer is opened
  function buildBanSubPanel(targetName) {
    return [{
      Type: "select",
      List: [{
        label: "1 Hour",
        value: "3600"
      }, {
        label: "2 Hours",
        value: "7200"
      }, {
        label: "6 Hours",
        value: "21600"
      }, {
        label: "12 Hours",
        value: "43200"
      }, {
        label: "24 Hours",
        value: "86400"
      }, {
        label: "3 Days",
        value: "259200"
      }, {
        label: "1 Week",
        value: "604800"
      }, {
        label: "2 Weeks",
        value: "1209600"
      }, {
        label: "Permanent",
        value: "0"
      }]
    }, {
      action: "$doBan",
      label: "Ban " + (targetName || "User"),
      icon: "Ban",
      flags: 0,
      row: 1,
      Type: "Ban"
    }, {
      action: "Cancel",
      label: "Cancel",
      icon: "Cancel",
      flags: 0,
      row: 1
    }];
  }
  function buildKickSubPanel(targetName) {
    return [{
      action: "$doKick",
      label: "Kick " + (targetName || "User"),
      icon: "Kick",
      flags: 0,
      row: 1,
      Type: "Kick"
    }, {
      action: "Cancel",
      label: "Cancel",
      icon: "Cancel",
      flags: 0,
      row: 1
    }];
  }
  function buildTransferSubPanel() {
    return [{
      type: "text",
      name: (state.xats || 0) + "," + (state.days || 0)
    }, {
      type: "dialog",
      id: "Xats",
      name: "Xats"
    }, {
      type: "dialog",
      id: "Days",
      name: "Days"
    }, {
      type: "password",
      id: "Password",
      name: "Password"
    }, {
      action: "$doTransfer",
      label: "Transfer",
      icon: "Transfer",
      flags: 0,
      row: 1,
      Type: "Transfer"
    }, {
      action: "Cancel",
      label: "Cancel",
      icon: "Cancel",
      flags: 0,
      row: 1
    }];
  }
  function handleActionCommand(cmd) {
    const targetId = state.savedId || cmd.UserNo;
    console.log("[xatcore-js] handleActionCommand:", JSON.stringify(cmd), "targetId:", targetId);
    if (!targetId) {
      return;
    }
    const actionName = cmd.name || cmd.action || cmd.Type;
    const targetUser = state.users.get(String(targetId));
    const targetName = targetUser ? targetUser.name || "" : String(targetId);
    switch (actionName) {
      // === COMMUNICATION ===
      case "PM":
      case "PrivateChat":
      case "PrivateMessage":
        {
          const pmRegname = targetUser ? targetUser.name || "" : "";
          console.log("[xatcore-js] PM action:", actionName, "targetId:", targetId, "regname:", pmRegname);
          // Close the actions dialog, set PM mode, and switch to messages
          enqueueFifo(["console.log('[FIFO] closing dialog'); if(typeof setFrameVis==='function')setFrameVis()", "console.log('[FIFO] setting PM mode for', " + targetId + "); if(typeof setPmMode==='function')setPmMode(true," + targetId + ",'" + escapeJs(pmRegname) + "',document); else console.error('[FIFO] setPmMode not found')"]);
          break;
        }

      // === MODERATION: KICK ===
      case "Kick":
      case "doKick":
        {
          if (state.rank < RANK_MOD) {
            break;
          }
          const reason = cmd.Reason || cmd.ReasonKick || "";
          // Send <c> packet: t=type, p=reason, u=myId, d=targetId
          sendPacket("c", {
            t: "k",
            u: String(state.userId),
            d: String(targetId),
            p: reason
          });
          break;
        }

      // === MODERATION: BAN ===
      case "Ban":
      case "doBan":
        {
          if (state.rank < RANK_MOD) {
            break;
          }
          const duration = cmd.Duration || "21600"; // default 6 hours
          const reason = cmd.Reason || "";
          const bootTo = cmd.BootTo || "";
          // Send <c> packet for ban
          sendPacket("c", {
            t: "g",
            u: String(state.userId),
            d: String(targetId),
            p: reason,
            dt: duration,
            bt: bootTo
          });
          break;
        }

      // === MODERATION: UNBAN ===
      case "Unban":
        {
          if (state.rank < RANK_MOD) {
            break;
          }
          sendPacket("c", {
            t: "u",
            u: String(state.userId),
            d: String(targetId)
          });
          break;
        }

      // === MODERATION: GAG ===
      case "Gag":
        {
          if (state.rank < RANK_MOD) {
            break;
          }
          sendPacket("c", {
            t: "gg",
            u: String(state.userId),
            d: String(targetId)
          });
          break;
        }
      case "Ungag":
        {
          if (state.rank < RANK_MOD) {
            break;
          }
          sendPacket("c", {
            t: "ug",
            u: String(state.userId),
            d: String(targetId)
          });
          break;
        }

      // === MODERATION: MUTE (invisible gag) ===
      case "Mute":
        {
          if (state.rank < RANK_MOD) {
            break;
          }
          sendPacket("c", {
            t: "gm",
            u: String(state.userId),
            d: String(targetId)
          });
          break;
        }

      // === MODERATION: DUNCE ===
      case "Dunce":
        {
          if (state.rank < RANK_OWNER) {
            break;
          }
          sendPacket("c", {
            t: "gd",
            u: String(state.userId),
            d: String(targetId)
          });
          break;
        }

      // === RANK CHANGES (send <c> packets) ===
      case "Mod":
        {
          if (state.rank < RANK_OWNER) {
            break;
          }
          sendPacket("c", {
            t: "m",
            u: String(state.userId),
            d: String(targetId)
          });
          break;
        }
      case "Member":
        {
          if (state.rank < RANK_OWNER) {
            break;
          }
          sendPacket("c", {
            t: "e",
            u: String(state.userId),
            d: String(targetId)
          });
          break;
        }
      case "Guest":
        {
          if (state.rank < RANK_OWNER) {
            break;
          }
          sendPacket("c", {
            t: "r",
            u: String(state.userId),
            d: String(targetId)
          });
          break;
        }
      case "Owner":
        {
          if (state.rank < RANK_OWNER) {
            break;
          }
          sendPacket("c", {
            t: "M",
            u: String(state.userId),
            d: String(targetId)
          });
          break;
        }

      // === SOCIAL ===
      case "Friend":
      case "AddAsFriend":
        {
          fetch("/api/friends/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + (state.authToken || "")
            },
            body: JSON.stringify({
              friendId: parseInt(targetId)
            })
          }).then(r => r.json()).then(data => {
            if (data.ok) {
              addSystemMessage(data.message || "Friend added.");
            } else {
              addSystemMessage("Error: " + (data.error || "Failed"));
            }
          }).catch(() => addSystemMessage("Failed to add friend."));
          break;
        }
      case "Unfriend":
        {
          fetch("/api/friends/remove", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + (state.authToken || "")
            },
            body: JSON.stringify({
              friendId: parseInt(targetId)
            })
          }).then(r => r.json()).then(data => {
            addSystemMessage(data.ok ? "Friend removed." : "Error: " + (data.error || "Failed"));
          }).catch(() => addSystemMessage("Failed to remove friend."));
          break;
        }
      case "Block":
      case "Ignore":
        {
          if (!state.blockedUsers) {
            state.blockedUsers = new Set();
          }
          state.blockedUsers.add(String(targetId));
          addSystemMessage("User ignored.");
          break;
        }

      // === TRANSFER ===
      case "Transfer":
      case "doTransfer":
        {
          const xats = parseInt(cmd.Xats) || parseInt(cmd.xats) || 0;
          const days = parseInt(cmd.Days) || parseInt(cmd.days) || 0;
          const password = cmd.Password || "";
          if (xats <= 0 && days <= 0) {
            addSystemMessage("Enter xats or days amount to transfer.");
            return;
          }
          fetch("/api/transfer", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + (state.authToken || "")
            },
            body: JSON.stringify({
              targetId: parseInt(targetId),
              xats,
              days,
              password
            })
          }).then(r => r.json()).then(data => {
            if (data.ok) {
              addSystemMessage(data.message);
            } else {
              addSystemMessage("Error: " + (data.error || "Transfer failed"));
            }
          }).catch(() => addSystemMessage("Transfer failed."));
          break;
        }

      // === GIFTS ===
      case "Gifts":
        {
          // Show powers/gifts for user (placeholder — opens profile view)
          enqueueFifo("if(typeof classicSetDialog==='function')classicSetDialog('profile'," + targetId + ")");
          break;
        }

      // === SELF ACTIONS ===
      case "Edit":
        {
          enqueueFifo("if(typeof classicSetDialog==='function')classicSetDialog('settings'," + state.userId + ")");
          break;
        }
      case "Settings":
        {
          enqueueFifo("if(typeof classicSetDialog==='function')classicSetDialog('settings'," + state.userId + ")");
          break;
        }
      case "Powers":
        {
          // Open powers view for user
          enqueueFifo("if(typeof classicSetDialog==='function')classicSetDialog('profile'," + (targetId || state.userId) + ")");
          break;
        }
      case "Store":
      case "BuyXats":
        {
          addSystemMessage("Store is not available on this private server.");
          break;
        }
      default:
        console.log("[xatcore-js] Unhandled action:", actionName, cmd);
    }
  }

  // ===== SENDC REPLACEMENT =====
  function handleSendC(command, arg1, arg2) {
    switch (command) {
      case "xatInit":
        // Return userId. If not logged in, create a guest session first.
        if (!state.userId) {
          const guestId = Math.floor(10000 + Math.random() * 90000);
          state.userId = guestId;
          state.username = "Guest_" + guestId;
        }
        return String(state.userId);
      case "SetPage":
        state.page = arg2 || "classic";
        return state.page;
      case "xatMain":
        // Trigger WebSocket connection
        connectWS();
        return "";
      case "leaveBackground":
        state.groupName = arg2 || "";
        return "";
      case "ConsoleOff":
        return "0";
      // Keep console enabled

      case "SetPhoneFontSize":
        return "";
      case "setLang":
        state.lang = arg2 || "en";
        return "";
      case "sendStuff":
        // Store flags from the JSON arg1
        try {
          const stuff = JSON.parse(arg1);
          state.flags = stuff.Flags || 0;
        } catch (e) {}
        return "";
      case "getStuff":
        return JSON.stringify({
          lang: state.lang,
          MyId: state.userId,
          username: state.username,
          rank: state.rank,
          xats: state.xats,
          days: state.days
        });
      case "xatCommand":
        handleXatCommand(arg2);
        return "";
      case "xatTick":
        return dequeue();
      case "ReadToJavaFifo":
        return dequeue();
      case "xatMessageReceived":
      case "xatMessageOK":
      case "xatURL":
      case "LastActionHero":
      case "viewWillDisappear":
      case "webViewDidFinishLoad":
      case "setToken":
        return "";
      default:
        console.log("[xatcore-js] Unknown SendC:", command, typeof arg1 === "string" ? arg1.substring(0, 80) : arg1, typeof arg2 === "string" ? arg2.substring(0, 80) : arg2);
        return "";
    }
  }
  function handleXatCommand(jsonStr) {
    if (!jsonStr) {
      return;
    }
    try {
      const cmd = JSON.parse(jsonStr);
      switch (cmd.Command || cmd.Type) {
        case "Send":
          // User typed a message — check for special commands first
          if (cmd.Message && state.ws && state.ws.readyState === 1) {
            const msg = cmd.Message;

            // Filter client-only commands - don't send to server
            if (msg === "/RTypeOn") {
              // Send typing indicator
              sendPacket("x", {
                u: String(state.userId),
                d: "1"
              });
              return;
            }
            if (msg === "/RTypeOff") {
              sendPacket("x", {
                u: String(state.userId),
                d: "0"
              });
              return;
            }
            // Client-only commands that shouldn't go to server
            if (msg.startsWith("/bump") || msg.startsWith("/rtl") || msg.startsWith("/ltr")) {
              return;
            }

            // Regular message - send to server
            sendPacket("m", {
              t: msg,
              u: String(state.userId),
              n: state.username
            });
          }
          break;
        case "EnableTick":
          state.tickEnabled = true;
          break;
        case "Refresh":
          break;
        case "StartGroup":
          if (cmd.Group) {
            state.groupName = cmd.Group;
            if (state.ws) {
              state.ws.close();
            }
            state.mainInitDone = false;
            connectWS();
          }
          break;
        case "GetXconst":
          // Power constants - try to fetch from server
          if (cmd.js && cmd.obj) {
            fetchPowerData(cmd.obj);
          }
          break;
        case "signInButtonPressed":
          // Sign In button opens the login/register dialog via selector iframe
          // If DoSignIn is set, use that; otherwise show SignUp page
          const signInPage = cmd.DoSignIn || "SignUp";
          enqueueFifo("classicSetDialog('selector', 0)");
          enqueueFifo("if(_Activity.instance.Selector){_Activity.instance.Selector.DoLoginEtc('" + signInPage + "')}");
          break;
        case "Click":
          // User clicked on a visitor - store for actions dialog
          console.log("[xatcore-js] Click received, UserNo:", cmd.UserNo);
          if (cmd.UserNo) {
            state.savedId = String(cmd.UserNo);
          }
          break;
        case "SaveId":
          if (cmd.id) {
            state.savedId = String(cmd.id);
          }
          break;
        case "LoadClassicDialog":
          // classicSetDialog called — need to feed user data to actions iframe
          console.log("[xatcore-js] LoadClassicDialog:", cmd.Type, "UserNo:", cmd.UserNo, "savedId:", state.savedId, "users:", [...state.users.keys()], "myId:", state.userId);
          if (cmd.Type === "actions" || cmd.Type === "profile") {
            const targetUserId = String(cmd.UserNo || state.savedId);
            const targetUser = state.users.get(targetUserId);
            const isMe = targetUserId === String(state.userId);
            console.log("[xatcore-js] targetUserId:", targetUserId, "targetUser:", targetUser, "isMe:", isMe);
            if (targetUser || isMe) {
              const userName = isMe ? state.username : targetUser ? targetUser.name : "Unknown";
              const userAvatar = isMe ? state.avatar : targetUser ? targetUser.avatar : "";
              const userRank = isMe ? state.rank : targetUser ? targetUser.rank : 0;
              const userDays = isMe ? state.days : targetUser ? targetUser.days : 0;
              const userXats = isMe ? state.xats : targetUser ? targetUser.xats : 0;
              const userStatus = isMe ? state.status || "" : targetUser ? targetUser.status || "" : "";
              const userHomepage = isMe ? state.homepage || "" : targetUser ? targetUser.homepage || "" : "";
              const isReg = userName && !userName.startsWith("Guest_");

              // Build actions data JSON matching what actions.configurePage expects
              const userPFlags = computePFlags({
                name: userName,
                days: userDays
              });
              const actionsData = {
                user: [{
                  id: parseInt(targetUserId) || 0,
                  name: userName,
                  regname: isReg ? userName : "",
                  me: isMe ? "1" : "0",
                  avatar: userAvatar || "",
                  status: userStatus,
                  homepage: userHomepage,
                  pFlags: userPFlags,
                  pFlags2: 0,
                  pstyle: "",
                  flag0: 0,
                  on2: JSON.stringify({
                    online: "Online"
                  }).replace(/"/g, "`"),
                  addedAsFriend: "0",
                  calls: "",
                  callsAccepted: "0",
                  w_Powers: "",
                  F: userRank,
                  d0: userDays,
                  d3: userXats
                }],
                main: buildActionsMenu(targetUserId, isMe, userRank)
              };

              // Add sub-panel data arrays for $Kick, $Ban, $Transfer
              if (!isMe) {
                actionsData.Ban = buildBanSubPanel(userName);
                actionsData.Kick = buildKickSubPanel(userName);
              }
              actionsData.Transfer = buildTransferSubPanel();

              // AllPowers is a bitmask array of all powers the user owns
              // Powers are stored as 32-bit integers where bit N means power (index*32 + N) is owned
              actionsData.AllPowers = [[]];
              actionsData.Collections = [{}];
              actionsData.PowersOflo = [[""]];

              // Init actions iframe config + call configurePage
              // Must set ButCol/ButColW in the actions iframe's config or buttons get #000NAN colors
              const acfg = escapeJson(JSON.stringify({
                MyId: state.userId,
                Flags: 5,
                ButCol: 128,
                ButColW: 16777215,
                dom: location.protocol + "//" + location.host,
                PhoneType: 3,
                lang: state.lang || "en",
                GroupName: state.groupName || "Lobby",
                chatid: state.roomId
              }));
              const adata = escapeJson(JSON.stringify(actionsData));
              enqueueFifo(["var af=document.getElementById('actionsFrame');if(af&&af.contentWindow){var aw=af.contentWindow;if(aw.actions){if(!aw._cfgDone){aw.actions.main('" + acfg + "');aw._cfgDone=true;}aw.actions.Visible=true;aw.actions.configurePage('" + adata + "')}}"]);
              console.log("[xatcore-js] Calling actions.configurePage with", actionsData.main.length, "menu items");
            }
          }
          break;
        case "Action":
          // Actions panel triggered an action
          handleActionCommand(cmd);
          // Handle view switching (Next field from actions.js sendApp)
          if (cmd.Next === "messages") {
            enqueueFifo("if(_Activity&&_Activity.instance)_Activity.instance.SetPage('messages')");
          } else if (cmd.Next === "visitors") {
            enqueueFifo("if(_Activity&&_Activity.instance)_Activity.instance.SetPage('visitors')");
          }
          break;
        case "Block":
          // Block user (client-side)
          if (!state.blockedUsers) {
            state.blockedUsers = new Set();
          }
          if (cmd.UserNo) {
            state.blockedUsers.add(String(cmd.UserNo));
          }
          break;
        case "GoBack":
          // Close dialog/go back to chat
          enqueueFifo("setFrameVis()");
          break;
        case "NOP":
          // NOP with Next = view switch (used by actions.js GoBack)
          if (cmd.Next === "messages") {
            enqueueFifo("if(_Activity&&_Activity.instance)_Activity.instance.SetPage('messages')");
          } else if (cmd.Next === "visitors") {
            enqueueFifo("if(_Activity&&_Activity.instance)_Activity.instance.SetPage('visitors')");
          }
          break;
        case "Vol":
          // Volume change - store locally
          try {
            localStorage.setItem("xat_volume", cmd.Value || "100");
          } catch (e) {}
          break;
        case "Setting":
          // Setting change from settings panel
          try {
            const settings = JSON.parse(localStorage.getItem("Settings") || "{}");
            if (cmd.Key) {
              settings[cmd.Key] = cmd.Value;
            }
            localStorage.setItem("Settings", JSON.stringify(settings));
          } catch (e) {}
          break;
        case "DeleteMsg":
          // Delete a message by ID
          if (cmd.msgId) {
            enqueueFifo("var _dm=document.querySelector('[data-msgid=\"" + escapeJs(cmd.msgId) + "\"]');if(_dm)_dm.remove();");
          }
          break;
        case "DoReaction":
          // Send a reaction to a message
          // For now, just broadcast as a special message
          if (cmd.msgId && cmd.reaction) {
            sendPacket("m", {
              t: "/react " + cmd.reaction + " " + cmd.msgId,
              u: String(state.userId),
              n: state.username
            });
          }
          break;
        case "MakeId":
          // Guest trying to chat — redirect to login
          if (!state.authToken) {
            window.top.location.href = "/login";
          }
          break;
        case "DoRapid":
          break;
        case "EditMsg":
          break;
        case "GoWebChat":
          break;
        default:
          console.log("[xatcore-js] xatCommand:", cmd);
      }
    } catch (e) {
      console.error("[xatcore-js] xatCommand parse error:", e);
    }
  }

  // ===== POWER DATA FETCHING =====
  // pow2.php data is a raw JSON array: [["last",{...}],["backs",{...}],["pssa",[...]],...]
  // Convert to an object keyed by name, then extract the specific requested const
  let _powerDataCache = null; // object keyed by const name
  let _powerDataFetching = false;
  let _powerDataQueue = []; // queue of objNames waiting for fetch

  function fetchPowerData(objName) {
    const arrayConsts = ["reactions", "pssa", "topsh", "soth", "syel", "SuperPowers", "SuperPawns", "Stickers", "effects", "uCollections"];
    const emptyFallback = arrayConsts.includes(objName) ? "[]" : "{}";
    if (_powerDataCache) {
      const val = _powerDataCache[objName];
      const data = val !== undefined ? JSON.stringify(val) : emptyFallback;
      enqueueFifo("GetXconst(\"" + escapeJs(objName) + "\", '" + escapeJson(data) + "')");
      return;
    }

    // Queue this request if fetch is already in progress
    _powerDataQueue.push(objName);
    if (_powerDataFetching) {
      return;
    }
    _powerDataFetching = true;
    fetch("/web_gear/chat/pow2.php").then(r => r.text()).then(text => {
      try {
        const raw = JSON.parse(text);
        // Convert [["name", value], ...] array to {name: value} object
        _powerDataCache = {};
        if (Array.isArray(raw)) {
          for (const entry of raw) {
            if (Array.isArray(entry) && entry.length >= 2) {
              _powerDataCache[entry[0]] = entry[1];
            }
          }
        }
      } catch (e) {
        // Try legacy "var defined = {...}" format
        const match = text.match(/var\s+defined\s*=\s*(\{[\s\S]*\})/);
        if (match) {
          try {
            _powerDataCache = JSON.parse(match[1]);
          } catch (e2) {
            _powerDataCache = {};
          }
        } else {
          _powerDataCache = {};
        }
      }
      // Flush all queued requests
      const queue = _powerDataQueue.splice(0);
      for (const name of queue) {
        const fallback = arrayConsts.includes(name) ? "[]" : "{}";
        const val = _powerDataCache[name];
        const data = val !== undefined ? JSON.stringify(val) : fallback;
        enqueueFifo("GetXconst(\"" + escapeJs(name) + "\", '" + escapeJson(data) + "')");
      }
      _powerDataFetching = false;
    }).catch(() => {
      const queue = _powerDataQueue.splice(0);
      for (const name of queue) {
        const fallback = arrayConsts.includes(name) ? "[]" : "{}";
        enqueueFifo("GetXconst(\"" + escapeJs(name) + "\", '" + fallback + "')");
      }
      _powerDataFetching = false;
    });
  }

  // ===== WASM MODULE MOCK =====
  // Save original WebSocket before activity.js overrides it
  var _origWebSocket = window.WebSocket;

  // Create Module global that activity.js expects
  window.Module = {
    preRun: [],
    postRun: [],
    print: function () {},
    printErr: function () {},
    canvas: [],
    setStatus: function () {},
    totalDependencies: 0,
    monitorRunDependencies: function () {},
    _malloc: function () {
      return 0;
    },
    _xFree: function () {},
    stringToUTF8: function () {},
    ccall: function () {
      return "";
    }
  };
  let _sendCPatched = false;
  const _patchInterval = setInterval(function () {
    if (window._Activity && window._Activity.instance && !_sendCPatched) {
      _sendCPatched = true;
      clearInterval(_patchInterval);
      state.activityInstance = window._Activity.instance;

      // Patch SendC to use our handler
      state.activityInstance.SendC = function (command, arg1, arg2) {
        return handleSendC(command, arg1 || "", arg2 || "");
      };

      // Store the group name from the URL
      const params = new URLSearchParams(window.location.search);
      state.groupName = params.get("n") || params.get("gn") || "";

      // Also check parent URL
      if (!state.groupName && window.parent !== window) {
        try {
          const parentParams = new URLSearchParams(window.parent.location.search);
          state.groupName = parentParams.get("n") || parentParams.get("gn") || "";
        } catch (e) {}
      }

      // Now trigger StartChat
      console.log("[xatcore-js] Triggering StartChat for group:", state.groupName);
      state.activityInstance.StartChat();
    }
  }, 100);

  // Also provide UTF8ToString global that SendC uses
  window.UTF8ToString = function (ptr) {
    return "";
  };
  console.log("[xatcore-js] xat JavaScript core loaded. Auth token:", state.authToken ? "present" : "none");
})();