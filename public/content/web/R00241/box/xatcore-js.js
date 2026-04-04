/**
 * xatcore-js.js — Pure JavaScript replacement for xat's Emscripten WASM core.
 *
 * This module intercepts the WASM Module/SendC pathway and implements the xat
 * XML protocol directly in JavaScript, connecting to our private server's WebSocket.
 *
 * Load this BEFORE activity.js in embed.html.
 */

(function() {
  'use strict';

  // ===== STATE =====
  const state = {
    userId: 0,
    socketId: 0,
    username: 'Guest',
    roomId: '1',
    groupName: '',
    rank: 0,
    days: 0,
    xats: 0,
    avatar: '',
    lang: 'en',
    connected: false,
    joined: false,
    ws: null,
    fifoQueue: [],       // queued {Type, Cmd, Data} events for xatTick/ReadToJavaFifo
    lineId: 1,
    users: new Map(),    // userId -> {name, avatar, rank, days, ...}
    authToken: null,
    flags: 0,
    page: 'classic',
    tickEnabled: false,
    activityInstance: null,
    mainInitDone: false, // whether visitors.main() has been called
    groupConfig: {},     // gconfig data from gp packet
    savedId: '',         // last clicked user ID for actions
    blockedUsers: new Set(),
    heartbeatInterval: null,
  };

  // Get auth token from sessionStorage (set by login.html)
  state.authToken = sessionStorage.getItem('xat_token') || localStorage.getItem('xat_token') || null;

  // Get user info if available
  try {
    const userStr = sessionStorage.getItem('xat_user') || localStorage.getItem('xat_user');
    if (userStr) {
      const user = JSON.parse(userStr);
      state.userId = user.id || 0;
      state.username = user.username || 'Guest';
      state.rank = user.rank || 0;
      state.xats = user.xats || 0;
      state.days = user.days || 0;
    }
  } catch(e) {}

  // Sync auth systems: if we have xat_token auth, populate localStorage.todo
  // so the classic UI (settings, actions) can read avatar/user data
  if (state.authToken && state.userId) {
    try {
      const todoData = JSON.parse(localStorage.getItem('todo') || '{}');
      todoData.w_userno = state.userId;
      todoData.w_name = state.username;
      todoData.w_avatar = state.avatar || '';
      todoData.w_xats = state.xats;
      todoData.w_days = state.days;
      todoData.w_k1 = state.authToken;
      localStorage.setItem('todo', JSON.stringify(todoData));
    } catch(e) {}
  }

  // ===== FIFO QUEUE =====
  function enqueue(type, cmd, data) {
    state.fifoQueue.push(JSON.stringify({ Type: String(type), Cmd: cmd || '', Data: data || '' }));
  }

  function dequeue() {
    return state.fifoQueue.length > 0 ? state.fifoQueue.shift() : '';
  }

  // Enqueue a FifoNotification with eval strings
  function enqueueFifo(evalStrings) {
    if (!Array.isArray(evalStrings)) evalStrings = [evalStrings];
    enqueue(5, 'FifoNotification', JSON.stringify(evalStrings));
  }

  // ===== XML HELPERS =====
  function escapeXml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function buildXml(tag, attrs) {
    const parts = Object.entries(attrs)
      .filter(([_, v]) => v !== undefined && v !== null)
      .map(([k, v]) => `${k}="${escapeXml(v)}"`)
      .join(' ');
    return `<${tag}${parts ? ' ' + parts : ''} />`;
  }

  function parseXml(str) {
    str = str.trim().replace(/\0/g, '');
    if (!str.startsWith('<')) return null;
    const tagMatch = str.match(/^<(\w+)\s*/);
    if (!tagMatch) return null;
    const tag = tagMatch[1];
    const attrs = {};
    const attrRegex = /(\w+)="([^"]*)"/g;
    let m;
    while ((m = attrRegex.exec(str)) !== null) {
      attrs[m[1]] = m[2].replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    }
    return { tag, attrs };
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
    valid: 65536,         // registered user
    everypower: 131072,
    bump: 262144,
    mirror: 524288,
    invert: 1048576,
    typing: 2097152,      // typing indicator enabled
    away: 4194304,        // away status
    hasdays: 8388608,     // subscriber
    invisible: 16777216,
    sline: 33554432,      // custom smiley line
    category: 67108864,
    shuffle: 134217728,
    nolinks: 268435456,
    hasprofile: 1073741824,
  };

  function computePFlags(user) {
    let flags = 0;
    if (user && user.name && !user.name.startsWith('Guest_')) {
      flags |= PFLAGS.valid | PFLAGS.typing;
    }
    if (user && user.days > 0) {
      flags |= PFLAGS.hasdays;
    }
    if (user) {
      if (user.namecolor) flags |= PFLAGS.col;
      if (user.nameglow) flags |= PFLAGS.glow;
      if (user.namegrad) flags |= PFLAGS.grad;
      if (user.hat) flags |= PFLAGS.hat;
      if (user.status) flags |= PFLAGS.status;
      if (user.statusfx) flags |= PFLAGS.statusglow | PFLAGS.statuscol;
    }
    return flags;
  }

  // ===== WEBSOCKET =====
  function connectWS() {
    if (state.ws && state.ws.readyState <= 1) return;

    const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = location.hostname || 'localhost';
    // Explicit port in URL wins; else HTTPS (e.g. trycloudflare) uses default 443, local HTTP dev uses 6969
    const portSuffix = location.port
      ? `:${location.port}`
      : location.protocol === 'http:'
        ? ':6969'
        : '';
    const url = `${proto}//${host}${portSuffix}/ws`;

    console.log('[xatcore-js] Connecting to', url);
    state.ws = new _origWebSocket(url);
    state.ws.binaryType = 'arraybuffer';

    // Keep activity's WebSocket reference updated so IsConnected() works
    updateActivityWS();

    // Show "Connecting..." overlay in the chat UI
    enqueueFifo('InitPage("Connecting")');

    state.ws.onopen = () => {
      console.log('[xatcore-js] WebSocket connected');
      updateActivityWS();

      // Get room ID from server
      const groupName = state.groupName || 'Lobby';
      fetch('/web_gear/chat/roomid.php?d=' + encodeURIComponent(groupName))
        .then(r => r.json())
        .then(data => {
          state.roomId = String(data.id || '1').trim();
          // Send handshake with token auth
          const yAttrs = { r: state.roomId };
          if (state.authToken) {
            yAttrs.token = state.authToken;
          }
          sendPacket('y', yAttrs);
        })
        .catch(() => {
          state.roomId = '1';
          sendPacket('y', { r: '1', token: state.authToken || '' });
        });
    };

    state.ws.onmessage = (evt) => {
      let data;
      if (evt.data instanceof ArrayBuffer) {
        data = new TextDecoder().decode(evt.data);
      } else {
        data = evt.data;
      }

      const packets = data.split('\0').filter(p => p.trim().length > 0);
      for (const pkt of packets) {
        handleServerPacket(pkt);
      }
    };

    state.ws.onclose = () => {
      console.log('[xatcore-js] WebSocket closed');
      state.connected = false;
      state.joined = false;
      if (state.heartbeatInterval) {
        clearInterval(state.heartbeatInterval);
        state.heartbeatInterval = null;
      }
      // Auto-reconnect after 3 seconds
      setTimeout(() => {
        if (!state.connected) {
          console.log('[xatcore-js] Attempting reconnect...');
          enqueueFifo('InitPage("Connecting")');
          connectWS();
        }
      }, 3000);
    };

    state.ws.onerror = (e) => {
      console.error('[xatcore-js] WebSocket error');
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
      console.log('[xatcore-js] SEND:', xml);
      const buf = new TextEncoder().encode(xml + '\0');
      state.ws.send(buf);
    }
  }

  // ===== SERVER PACKET HANDLER =====
  function handleServerPacket(raw) {
    const parsed = parseXml(raw);
    if (!parsed) return;
    const { tag, attrs } = parsed;
    console.log('[xatcore-js] RECV:', tag, attrs);

    switch (tag) {
      case 'y': handleHandshakeResponse(attrs); break;
      case 'i': handleRoomInfo(attrs); break;
      case 'gp': handleGroupProps(attrs); break;
      case 'aa': handleAnnouncement(attrs); break;
      case 'w': handlePoolInfo(attrs); break;
      case 'u': handleUserPacket(attrs); break;
      case 'o': handleOfflineUser(attrs); break;
      case 'l': handleUserLeft(attrs); break;
      case 'done': handleDone(attrs); break;
      case 'm': handleMessage(attrs); break;
      case 'p': handlePrivateMessage(attrs); break;
      case 'x': handleTyping(attrs); break;
      case 'z': handleAway(attrs); break;
      case 'e': handleError(attrs); break;
      case 'c': handleKickBan(attrs); break;
      case 'f': handleFriendPacket(attrs); break;
      case 'gb': handleGuestbookPacket(attrs); break;
      case 'us': handleUserSearchResult(attrs); break;
      case 'a': handleInteraction(attrs); break;
      case 'q': handleRedirect(attrs); break;
      case 'b': handleBlockPacket(attrs); break;
      case 'em': handleMessageEdit(attrs); break;
      case 'dm': handleMessageDelete(attrs); break;
      case 'rc': handleReaction(attrs); break;
      case 'mc':
        // Macro data from server - could be save ack or initial load
        if (attrs.data) {
          // Initial macro load on join
          try {
            var macroData = JSON.parse(attrs.data);
            enqueueFifo("if(typeof settings!=='undefined'&&settings.setMacros)settings.setMacros('" + escapeJson(attrs.data) + "')");
            // Store in localStorage for keyword highlighting
            localStorage.setItem('Macros', attrs.data);
          } catch(e) {}
        }
        break;
      case 'hg': handleHugKiss(attrs); break;
      case 'tr': handleTrade(attrs); break;
      case 'game': handleGame(attrs); break;
      case 'xs': break; // profile save ack
      case 'sp': break; // power toggle ack
      case 'h': break; // heartbeat ack, no action needed
      case 'v': break; // version ack
      case 'idle': break; // idle ack
      case 'logout': break; // logout ack
      default:
        console.log('[xatcore-js] Unhandled packet:', tag, attrs);
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
    if (attrs.n) state.username = attrs.n;
    if (attrs.r) {
      // Server sends internal rank (0,2,4,16,32). Map to display rank (0,1,3,4,5) to match handleUserPacket
      const ir = parseInt(attrs.r);
      state.rank = ir >= 32 ? 5 : ir >= 16 ? 4 : ir >= 4 ? 3 : ir >= 2 ? 1 : 0;
    }
    if (attrs.d0) state.days = parseInt(attrs.d0);
    if (attrs.x0) state.xats = parseInt(attrs.x0);
    state.connected = true;

    // Start heartbeat every 30 seconds to keep connection alive
    if (state.heartbeatInterval) clearInterval(state.heartbeatInterval);
    state.heartbeatInterval = setInterval(() => {
      if (state.connected) {
        sendPacket('h', {});
      } else {
        clearInterval(state.heartbeatInterval);
        state.heartbeatInterval = null;
      }
    }, 30000);

    // Send j2 to join the room
    sendPacket('j2', {
      u: String(state.userId),
      n: state.username,
      a: state.avatar,
      cb: String(Math.floor(Date.now() / 1000)),
      token: state.authToken || '',
    });
  }

  function handleUserPacket(attrs) {
    const userId = attrs.u;
    const rawName = attrs.n || 'User_' + userId;
    // Parse name##status format: "DisplayName ##StatusText" or "DisplayName ## "
    let username = rawName;
    let status = '';
    const hashIdx = rawName.indexOf('##');
    if (hashIdx !== -1) {
      username = rawName.substring(0, hashIdx).trim();
      status = rawName.substring(hashIdx + 2).trim();
    }
    const avatar = attrs.a || '';
    const fFlags = parseInt(attrs.f || '0');
    // q attribute = rank (1=main owner, 2=mod, 3=owner). f is flags bitmask, not rank
    const qRank = parseInt(attrs.q || '0');
    // Map q values to internal rank numbers for display
    const rank = qRank === 1 ? 5 : qRank === 3 ? 4 : qRank === 2 ? 3 : (fFlags & 0x08) ? 1 : 0;
    const isRegistered = !!(fFlags & 0x08);
    const days = attrs.d0 || '';
    const pawn = attrs.pawn || '';
    const cyclepawn = attrs.cyclepawn || '';
    const homepage = attrs.h || '';
    const badge = attrs.badge || '';
    const registeredName = attrs.N || '';

    // Collect power bitmasks from p0-p23 attributes
    const powerMasks = [];
    for (let i = 0; i < 24; i++) {
      powerMasks.push(parseInt(attrs['p' + i] || '0'));
    }

    // Visual customization from server
    const namecolor = attrs.namecolor || '';
    const nameglow = attrs.nameglow || '';
    const namegrad = attrs.namegrad || '';
    const namefont = attrs.namefont || '';
    const pcback = attrs.pcback || '';
    const statusfx = attrs.statusfx || '';
    const hat = attrs.hat || '';
    const iconcolor = attrs.iconcolor || '';
    const pawnHue = attrs.pawnHue || '';
    const avatarSettings = attrs.avatarSettings || '';
    const pstyle = attrs.pstyle || '';
    const marriedTo = attrs.sn || '';
    const bffWith = attrs.bff || '';
    const verified = attrs.verified === '1';

    state.users.set(userId, {
      id: userId, name: username, avatar, rank, days, pawn, cyclepawn,
      status, homepage, badge, powerMasks, xats: parseInt(attrs.d3 || '0'),
      regTime: parseInt(attrs.d2 || '0'),
      fFlags, registeredName, isRegistered, online: true,
      namecolor, nameglow, namegrad, namefont, pcback, statusfx, hat, iconcolor, pawnHue, avatarSettings,
      pstyle, marriedTo, bffWith, verified,
    });

    // Update self data if this is our own packet
    if (String(userId) === String(state.userId)) {
      state.rank = rank;
      state.avatar = avatar;
      state.status = status;
      state.homepage = homepage;
      state.pawn = pawn;
      state.powerMasks = powerMasks;
      state.regTime = parseInt(attrs.d2 || '0');
      if (attrs.sn) state.marriedTo = attrs.sn;
      if (attrs.bff) state.bffWith = attrs.bff;
      if (attrs.pstyle) state.pstyle = attrs.pstyle;

      // Populate localStorage power bank so SetPow() / setUserBank() can initialize
      // w_Powers = JSON array of power bitmask ints (p0-p23), w_Mask = disabled powers
      try {
        localStorage.setItem('w_Powers', JSON.stringify(powerMasks));
        var disabledPowers = [];
        try { disabledPowers = JSON.parse(attrs.pd || '[]'); } catch(e) {}
        localStorage.setItem('w_Mask', JSON.stringify(disabledPowers));
        var todoData = JSON.parse(localStorage.getItem('todo') || '{}');
        todoData.w_userno = state.userId;
        todoData.w_name = state.username;
        todoData.w_avatar = avatar || '';
        todoData.w_xats = parseInt(attrs.d3 || '0');
        todoData.w_days = parseInt(attrs.d0 || '0');
        todoData.w_PowerO = attrs.po || '';
        todoData.w_k1 = state.authToken || '';
        localStorage.setItem('todo', JSON.stringify(todoData));
        // Trigger power bank reload if PSSA is already loaded
        enqueueFifo("if(typeof reloadPowersBank==='function')reloadPowersBank()");
      } catch(e) { console.error('[xatcore] Failed to set power localStorage:', e); }
    }

    // If not joined yet, defer — handleDone will emit visitors in rank order
    if (!state.mainInitDone) return;

    // Late join — emit immediately + play join sound
    var u = state.users.get(userId);
    if (u) {
      emitVisitor(u);
      if (String(userId) !== String(state.userId)) {
        enqueueFifo("if(typeof doSound==='function')doSound('pop')");
      }
    }
  }

  function emitVisitor(u) {
    var userId = u.id;
    var username = u.name;
    var avatar = u.avatar;
    var rank = u.rank;
    var days = u.days;
    var isRegistered = u.isRegistered;
    var customPawn = u.pawn;
    var cyclepawn = u.cyclepawn;
    var status = u.status;
    var badge = u.badge;

    // Compute pFlags for this user (NamePowers bitmask)
    let pFlags = 0;
    if (isRegistered) pFlags |= PFLAGS.valid | PFLAGS.typing;
    if (days > 0) pFlags |= PFLAGS.hasdays;
    // Visual power flags — enable rendering in the real xat client
    if (u.namecolor) pFlags |= 8;       // col
    if (u.nameglow) pFlags |= 4;        // glow
    if (u.namegrad) pFlags |= 32768;    // grad
    if (u.namefont) pFlags |= 64;       // namefont
    if (u.hat) pFlags |= 1;             // hat
    if (status) pFlags |= 2;            // status
    if (u.statusfx) pFlags |= 16 | 32;  // statusglow + statuscol

    // Determine image format
    let image = '(smile#)';
    if (avatar) {
      if (avatar.startsWith('(') || avatar.startsWith('<')) {
        image = avatar;
      } else if (/^\d+$/.test(avatar)) {
        image = avatar;
      } else {
        image = avatar;
      }
    }

    // Pawn: use custom pawn if set, else default rank-based pawn
    let pawn = '';
    if (customPawn) {
      pawn = customPawn.startsWith('(') ? customPawn : '(' + customPawn + ')';
    } else if (isRegistered) {
      // Rank-based pawn color
      const baseRank = rank & 0xFF;
      const rankHex = baseRank.toString(16);
      pawn = '(p1*r' + rankHex + ')';
    }

    // Apply pawnHue effect (tints the pawn)
    if (u.pawnHue && pawn) {
      pawn = pawn.replace(')', '#h' + u.pawnHue + ')');
    }

    // Build visitor object with ALL fields visitors.js expects
    const visitorObj = {
      id: userId,
      name: username,
      registered: isRegistered ? username : '',
      image: image,
      pFlags: pFlags,
      pFlags2: 0,
      pawn: pawn,
      cyclepawn: cyclepawn || '',
      status: status || '',
      text: isRegistered ? username : '',
      PoolCol: 0,
      PoolColW: 0,
      F: rank,
      avatarEffect: u.avatarSettings || '',
      Statusfx: u.statusfx || '',
      badge: badge || '',
      // Visual customization
      namecolor: u.namecolor || '',
      nameglow: u.nameglow || '',
      namegrad: u.namegrad || '',
      namefont: u.namefont || '',
      pcback: u.pcback || '',
      hat: u.hat || '',
      iconcolor: u.iconcolor || '',
    };

    enqueueFifo("visitors.addVisitor('" + escapeJson(JSON.stringify(visitorObj)) + "', 0)");
  }

  function handleGroupProps(attrs) {
    const scroller = attrs.t || '';
    const roomId = attrs.g || state.roomId;

    // Build gconfig from gp attributes
    const gc = {};
    // Pass through any gXX attributes (group powers/config)
    for (const [key, val] of Object.entries(attrs)) {
      if (key.startsWith('g') && key.length > 1) {
        gc[key] = val;
      }
    }
    gc.p = attrs.p || '0|0|0|0|0|0|0|0|0|0|0';
    gc.t = scroller;
    gc.d = attrs.d || '3';

    state.groupConfig = gc;

    // Set group config in the UI - setGconfig expects JSON string
    enqueueFifo("setGconfig('" + escapeJson(JSON.stringify(gc)) + "')");
    // Display scroller text if present
    if (scroller) {
      enqueueFifo("if(typeof setScroller==='function')setScroller('" + escapeJson(scroller) + "')");
    }
    // Radio URL — launch radio player if supported
    if (attrs.radio) {
      state.roomRadio = attrs.radio;
      enqueueFifo("if(typeof setRadio==='function')setRadio('" + escapeJs(attrs.radio) + "')");
    }
    // Group background from xback attribute
    if (attrs.xback) {
      enqueueFifo("if(typeof setBackground==='function'){setBackground('" + escapeJs(attrs.xback) + "')}else{var _mo=document.getElementById('messagesOverlay');if(_mo){_mo.style.backgroundImage='url('+'" + escapeJs(attrs.xback) + "'+')';_mo.style.backgroundSize='cover';}}");
    }
  }

  function handleDone(attrs) {
    state.joined = true;
    console.log('[xatcore-js] Join complete, room:', state.roomId);

    // Close the "Connecting..." overlay
    enqueueFifo('ConnectingClose()');

    const isGuest = !state.authToken;
    const isRegistered = !isGuest && state.username && !state.username.startsWith('Guest_');
    const myPFlags = computePFlags({ name: state.username, days: state.days });

    // ButCol/ButColW must be NUMBERS — toHex6() does Number(x).toString(16)
    // 0x000080 = 128 (dark blue), 0xFFFFFF = 16777215 (white)
    const butColNum = 128;       // #000080 = default xat blue
    const butColWNum = 16777215; // #FFFFFF = white

    // Build COMPLETE mainConfig that xatMain() (xat.js) expects
    const mainConfig = {
      MyId: state.userId,
      page: 'classic',
      dom: location.protocol + '//' + location.host,
      PhoneType: 3,
      lang: state.lang,
      GroupName: state.groupName || 'Lobby',
      chatid: state.roomId,
      roomid: state.roomId,
      Flags: 5,              // IsClassic flag (bit 0 = classic, bit 2 = classic variant)
      pFlags: myPFlags,
      pFlags2: 0,
      ButCol: butColNum,
      ButColW: butColWNum,
      xatback: '',           // Chat background
      NotLoggedIn: isGuest ? '1' : '',
      MyRegName: isRegistered ? state.username : '',
      registered: isRegistered ? state.username : '',
      xats: state.xats,
      days: state.days,
      d0: state.days > 0 ? String(state.days) : '',
      w_avatar: state.avatar || '',
      w_homepage: '',
      w_status: '',
      w_Powers: 0,
      gid: state.roomId,
      cb: state.roomRevision || '0',
    };

    // Ensure Smilies, Avatars, and power arrays are initialized before xatMain runs
    enqueueFifo("if(!_Activity.instance.Smilies){_Activity.instance.Smilies=new Smilies();_Activity.instance.Avatars=new Avatars();_Activity.instance.Smilies.Animation=true;}");
    // Initialize PSSA, SOTH, SYEL as empty arrays so .indexOf() calls don't crash
    enqueueFifo("if(!_Activity.instance.PSSA){_Activity.instance.PSSA=[];_Activity.instance.SOTH=[];_Activity.instance.SYEL=[];_Activity.instance.TOPSH=[];_Activity.instance.SUPERPOWERS=[];_Activity.instance.xConsts=_Activity.instance.xConsts||{}}");
    // Fix cStyle: activity.js initializes it as {} (object) but setCstyle() expects a JSON string
    enqueueFifo("if(typeof _Activity.instance.cStyle!=='string'){_Activity.instance.cStyle='{}';}");

    // Proactively load ALL pow2 data sections into the smiley/power engine
    // This is critical for smiley rendering, power glow colors, topsh items, etc.
    // Use GetXconst names (lowercase) — pow2KeyMap in fetchPowerData maps to actual pow2 keys
    var pow2Sections = ['pssa', 'topsh', 'isgrp', 'SuperPowers', 'SuperPawns', 'Stickers', 'effects', 'frames', 'aces', 'backs', 'hugs', 'pawns', 'actions', 'EmoteP', 'Free', 'Types', 'Flixes', 'reactions'];
    for (var pi = 0; pi < pow2Sections.length; pi++) {
      fetchPowerData(pow2Sections[pi]);
    }

    // After pow2 loads, derive soth/syel from pssa+topsh and call addSmilies
    // soth = all power smiley names, syel = default free smilies
    // Also reload power bank in case w_Powers was set before PSSA
    enqueueFifo([
      "try{",
      "var _xc=_Activity.instance.xConsts||{};",
      "var _soth=_xc.topsh?Object.keys(_xc.topsh):[];",
      "var _syel=_xc.pssa?Object.keys(_xc.pssa):[];",
      "_Activity.instance.SOTH=_soth;_Activity.instance.SYEL=_syel;",
      "if(typeof addSmilies==='function')addSmilies(JSON.stringify(_syel),JSON.stringify(_soth),'[]','[]','[]');",
      "if(typeof reloadPowersBank==='function')reloadPowersBank();",
      "}catch(e){console.error('[xatcore] soth/syel init:',e)}"
    ].join(''));

    // Initialize visitors panel (calls xatMain internally which sets up QuickBar + SmileyBar)
    enqueueFifo("visitors.main('" + escapeJson(JSON.stringify(mainConfig)) + "')");

    // Initialize messages panel
    enqueueFifo("messages.main('" + escapeJson(JSON.stringify(mainConfig)) + "')");

    // Trigger layout recalc so messagesOverlay gets proper dimensions
    enqueueFifo("if(typeof bodyResize==='function')bodyResize(null)");

    state.mainInitDone = true;

    // Emit rank section headers and visitors in rank order
    // IDs 300-399 are section headers: 300=group name, 301=rank section
    // Set background from i packet or gp packet if available
    if (state.roomBackground) {
      mainConfig.xatback = state.roomBackground;
    } else if (state.groupConfig && state.groupConfig.xback) {
      mainConfig.xatback = state.groupConfig.xback;
    }

    const rankGroups = [
      { minRank: 5, label: 'Main Owner', bg: 0xFF9900, fg: 0xFFFFFF },
      { minRank: 4, label: 'Owners',     bg: 0x000088, fg: 0xFFFFFF },
      { minRank: 3, label: 'Moderators', bg: 0x008800, fg: 0xFFFFFF },
      { minRank: 1, label: 'Members',    bg: 0x444444, fg: 0xFFFFFF },
      { minRank: 0, label: 'Guests',     bg: 0x888888, fg: 0xFFFFFF },
    ];

    // Group name header
    enqueueFifo("visitors.addVisitor('" + escapeJson(JSON.stringify({
      id: 300,
      name: state.groupName || 'Lobby',
      PoolCol: butColNum,
      PoolColW: butColWNum,
    })) + "', -1)");

    // Collect users by rank tier
    for (let ti = 0; ti < rankGroups.length; ti++) {
      const tier = rankGroups[ti];
      const nextMin = ti > 0 ? rankGroups[ti - 1].minRank : Infinity;
      const usersInTier = [];
      for (const [uid, user] of state.users) {
        const r = user.rank || 0;
        if (r >= tier.minRank && r < nextMin) {
          usersInTier.push({ uid, ...user });
        }
      }
      if (usersInTier.length === 0) continue;

      // Section header
      enqueueFifo("visitors.addVisitor('" + escapeJson(JSON.stringify({
        id: 301,
        name: tier.label,
        PoolCol: tier.bg,
        PoolColW: tier.fg,
      })) + "', -1)");

      // Emit each user in this tier
      for (const u of usersInTier) {
        var userObj = state.users.get(String(u.uid));
        if (userObj) {
          emitVisitor(userObj);
        } else {
          // Fallback: construct minimal user object
          var isReg = u.name && !u.name.startsWith('Guest_');
          emitVisitor({ id: u.uid, name: u.name, avatar: u.avatar, rank: u.rank, days: u.days, isRegistered: isReg, pawn: u.pawn, cyclepawn: u.cyclepawn, status: u.status, badge: u.badge });
        }
      }
    }

    // Update Sign In button text based on login status
    if (isGuest) {
      enqueueFifo('setSignInButton("Sign In")');
    } else {
      enqueueFifo('setSignInButton("' + escapeJs(state.username) + '")');
    }

    // Add a welcome system message
    addSystemMessage('Welcome to ' + (state.groupName || 'Lobby') + '!');
  }

  function handleMessage(attrs) {
    const rawUserId = attrs.u || '0';
    // Strip pool suffix (e.g., "1553448427_2" -> "1553448427")
    const userId = rawUserId.replace(/_\d+$/, '');

    // Check blocked users
    if (state.blockedUsers && state.blockedUsers.has(userId)) return;

    const text = attrs.t || '';
    const user = state.users.get(userId);
    const name = attrs.n || (user ? user.name : null) || 'Unknown';
    const isRegistered = name && !name.startsWith('Guest_');

    const msgObj = {
      i: state.lineId++,
      id: userId,
      name: name,
      text: text,
      image: user && user.avatar ? user.avatar : '(smile#)',
      registered: isRegistered ? name : '',
      pFlags: user ? computePFlags(user) : (isRegistered ? (PFLAGS.valid | PFLAGS.typing) : 0),
      pFlags2: 0,
      pawn: user && user.pawn ? user.pawn : '',
      Time: 0,
      msgId: 'm' + Date.now() + Math.random().toString(36).slice(2, 6),
      Big: false,
      flip: false,
      cb: '0',
      avatarEffect: user && user.avatarSettings ? user.avatarSettings : '',
      // Visual customization
      namecolor: user && user.namecolor ? user.namecolor : '',
      nameglow: user && user.nameglow ? user.nameglow : '',
      namegrad: user && user.namegrad ? user.namegrad : '',
      pcback: user && user.pcback ? user.pcback : '',
      hat: user && user.hat ? user.hat : '',
      Statusfx: user && user.statusfx ? user.statusfx : '',
    };

    enqueueFifo("messages.addMessage('" + escapeJson(JSON.stringify(msgObj)) + "')");
    // Play message sound (skip for own messages and system messages)
    if (userId !== '0' && String(userId) !== String(state.userId)) {
      // Check for audie sound in message: #sname format
      var audieMatch = text.match(/#([a-z]+)\b/i);
      if (audieMatch && ['boing','burp','buzzer','doorbell','explosion','fart','kiss','punch','scream','slap','snore','trumpet','yawn'].indexOf(audieMatch[1].toLowerCase()) !== -1) {
        enqueueFifo("if(typeof doSound==='function')doSound('" + escapeJs(audieMatch[1].toLowerCase()) + "',true)");
      }
    }

    // Check for URLs and fetch previews
    var msgText = text;
    var urlMatch = msgText.match(/https?:\/\/[^\s<>"']+/);
    if (urlMatch && urlMatch[0]) {
      var previewUrl = urlMatch[0];
      // Don't preview image URLs or smiley URLs
      if (!previewUrl.match(/\.(png|jpg|gif|webp|svg)(\?|$)/i)) {
        var capturedMsgId = msgObj.msgId;
        fetch('/api/link-preview?url=' + encodeURIComponent(previewUrl))
          .then(function(r) { return r.json(); })
          .then(function(preview) {
            if (preview.title) {
              var previewHtml = '<div class="linkPreview" style="border-left:3px solid #4ecdc4;padding:6px 10px;margin:4px 0;background:rgba(0,0,0,0.2);border-radius:0 4px 4px 0;font-size:12px">';
              if (preview.image) previewHtml += '<img src="' + preview.image.replace(/"/g, '&quot;') + '" style="max-width:120px;max-height:80px;float:right;margin-left:8px;border-radius:4px">';
              previewHtml += '<div style="font-weight:600;color:#fff">' + (preview.title || '').substring(0,80).replace(/</g,'&lt;') + '</div>';
              if (preview.description) previewHtml += '<div style="color:#aaa;margin-top:2px">' + preview.description.substring(0,120).replace(/</g,'&lt;') + '</div>';
              if (preview.siteName) previewHtml += '<div style="color:#666;margin-top:2px;font-size:11px">' + preview.siteName.replace(/</g,'&lt;') + '</div>';
              previewHtml += '<div style="clear:both"></div></div>';
              enqueueFifo("var _lp=document.querySelector('[data-msgid=\"" + escapeJs(capturedMsgId) + "\"]');if(_lp){var _lpd=document.createElement('div');_lpd.innerHTML='" + escapeJs(previewHtml) + "';_lp.appendChild(_lpd.firstChild)}");
            }
          }).catch(function(){});
      }
    }
  }

  function handlePrivateMessage(attrs) {
    const userId = attrs.u || '0';
    const text = attrs.t || '';
    const targetId = attrs.d || '0';
    const isSelf = attrs.self === '1';
    const senderUser = state.users.get(userId);
    const name = isSelf ? state.username : (attrs.n || (senderUser ? senderUser.name : null) || 'Unknown');
    const avatar = isSelf ? state.avatar : (attrs.a || (senderUser ? senderUser.avatar : '') || '');
    const pawn = attrs.pawn || (senderUser ? senderUser.pawn : '') || '';
    const pcback = attrs.pcback || (senderUser ? senderUser.pcback : '') || '';

    // Track PC conversations
    if (!state.pcChats) state.pcChats = new Map();
    const pcUserId = isSelf ? targetId : userId;
    const pcUserName = isSelf ? ((state.users.get(targetId) || {}).name || 'user') : name;
    if (!state.pcChats.has(pcUserId)) {
      state.pcChats.set(pcUserId, { name: pcUserName, pcback: pcback });
    }

    // Try to open PC tab via real xat client, fallback to inline PM
    const pcChatId = pcUserId;
    enqueueFifo("if(typeof _Activity!=='undefined'&&_Activity.instance&&_Activity.instance.CurrentChatC!='" + escapeJs(pcChatId) + "'){try{ToC({Type:'OpenPC',UserNo:" + pcChatId + ",Page:'messages'})}catch(e){}}");

    const msgObj = {
      i: state.lineId++,
      id: isSelf ? String(state.userId) : userId,
      name: name,
      text: text,
      image: avatar || '(smile#)',
      registered: name,
      pFlags: PFLAGS.valid | PFLAGS.typing,
      pFlags2: 0,
      pawn: pawn,
      Time: 0,
      msgId: 'p' + Date.now(),
      Big: false,
      flip: false,
      cb: '0',
      avatarEffect: '',
    };

    enqueueFifo("messages.addMessage('" + escapeJson(JSON.stringify(msgObj)) + "')");
    // Play PM sound
    if (!isSelf) {
      enqueueFifo("if(typeof doSound==='function')doSound('doorbell')");
    }
  }

  function handleRoomInfo(attrs) {
    // <i b="bg;=name;=...;=lang;=radio;=..." f="features" cb="revision" B="botId" />
    if (attrs.b) {
      const fields = attrs.b.split(';=');
      state.roomBackground = fields[0] || '';
      state.roomLanguage = fields[3] || 'English';
      state.roomRadio = fields[4] || '';
    }
    state.roomFeatures = attrs.f || '0';
    state.roomRevision = attrs.cb || '0';
    state.botId = attrs.B || '0';
  }

  function handleAnnouncement(attrs) {
    // <aa b="base64html" />
    if (attrs.b) {
      try {
        const html = atob(attrs.b);
        // Use addSystemMessage since addSystemHtml doesn't exist on messages object
        addSystemMessage('[Announcement] ' + html.replace(/<[^>]*>/g, ''));
      } catch(e) {}
    }
  }

  function handlePoolInfo(attrs) {
    // <w v="currentPool pool1 poolCount maxPool" />
    if (attrs.v) {
      const parts = attrs.v.split(' ');
      state.currentPool = parseInt(parts[0]) || 0;
    }
  }

  function handleOfflineUser(attrs) {
    // <o> packets represent offline users who recently chatted
    // Store them but mark as offline — they appear grayed out in the user list
    const userId = attrs.u;
    if (!userId) return;
    const rawName = attrs.n || '';
    let name = rawName;
    let status = '';
    const hashIdx = rawName.indexOf('##');
    if (hashIdx !== -1) {
      name = rawName.substring(0, hashIdx).trim();
      status = rawName.substring(hashIdx + 2).trim();
    }
    name = name || 'User';
    const fFlags = parseInt(attrs.f || '0');
    const isRegistered = !!(fFlags & 0x08);
    // Parse rank from q attribute (same mapping as handleUserPacket)
    const qRank = parseInt(attrs.q || '0');
    const rank = qRank === 1 ? 5 : qRank === 3 ? 4 : qRank === 2 ? 3 : (fFlags & 0x08) ? 1 : 0;
    const user = {
      id: userId,
      name: name,
      registeredName: attrs.N || '',
      avatar: attrs.a || '',
      homepage: attrs.h || '',
      rank: rank,
      online: false,
      d0: attrs.d0 || '',
      status: status,
    };
    state.users.set(userId, user);
    // Build pawn string based on rank
    const rankCode = rank >= 5 ? 'r1' : rank >= 4 ? 'r3' : rank >= 3 ? 'r2' : 'r0';
    const pawnStr = isRegistered ? ('(p1#' + rankCode + ')') : '';
    // Add offline visitor to the UI using same format as emitVisitor
    const visitorObj = {
      id: userId,
      name: name,
      registered: isRegistered ? name : '',
      image: user.avatar || '(smile#)',
      pFlags: isRegistered ? (PFLAGS.valid) : 0,
      pFlags2: 0,
      pawn: pawnStr,
      status: status,
      text: isRegistered ? name : '',
      PoolCol: 0,
      PoolColW: 0,
      F: 0,
      avatarEffect: '',
    };
    enqueueFifo("visitors.addVisitor('" + escapeJson(JSON.stringify(visitorObj)) + "', 0)");
  }

  function handleInteraction(attrs) {
    // <a> packets are kiss/hug/gift animations
    console.log('[xatcore-js] Interaction:', attrs);
  }

  function handleRedirect(attrs) {
    // <q> packets redirect/boot user to another room
    if (attrs.r) {
      addSystemMessage('You have been redirected to room ' + attrs.r);
    }
  }

  function handleUserLeft(attrs) {
    const userId = attrs.u;
    const user = state.users.get(userId);
    state.users.delete(userId);

    // Remove visitor from DOM using data-user attribute (how visitors.js stores them)
    enqueueFifo('var _el=document.querySelector(\'[data-user="' + userId + '"]\');if(_el)_el.remove();');

    if (user) {
      addSystemMessage(user.name + ' has left.');
    }
  }

  function handleTyping(attrs) {
    // x packets can be typing indicators, trade protocol, or power actions
    if (attrs.t && (attrs.t.startsWith('/trade') || attrs.t === '/tradeaccept' || attrs.t === '/tradereject')) {
      handleTradePacket(attrs);
      return;
    }
    if (attrs.t === 'on' || attrs.t === 'off' || attrs.t === 'gifted') {
      handlePowerPacket(attrs);
      return;
    }
    const userId = attrs.u;
    const isTyping = (attrs.t === '/typing' || attrs.d === '1') ? 1 : 0;
    enqueueFifo('visitors.doTyping(' + userId + ', ' + isTyping + ')');
  }

  function handleMessageEdit(attrs) {
    // Server broadcasts: <em t="newText" i="msgId" u="userId" E="epoch" />
    var msgId = attrs.i || '';
    var newText = attrs.t || '';
    if (!msgId || !newText) return;
    // Tell messages.js to update the message in the DOM
    enqueueFifo("if(typeof messages!=='undefined'&&messages.editMessage)messages.editMessage('" + escapeJs(msgId) + "','" + escapeJs(newText) + "');" +
      "else{var _el=document.querySelector('[data-msgid=\"" + escapeJs(msgId) + "\"] .messageText');if(_el){_el.textContent='" + escapeJs(newText) + "';var _ed=document.createElement('span');_ed.className='editedLabel';_ed.textContent=' (edited)';_el.appendChild(_ed);}}");
  }

  function handleMessageDelete(attrs) {
    // Server broadcasts: <dm i="msgId" u="userId" />
    var msgId = attrs.i || '';
    if (!msgId) return;
    enqueueFifo("var _dm=document.querySelector('[data-msgid=\"" + escapeJs(msgId) + "\"]');if(_dm)_dm.remove()");
  }

  function handleReaction(attrs) {
    // Server broadcasts: <rc i="msgId" r="smiley" u="userId" n="username" rid="reactionId" del="1"? />
    var msgId = attrs.i || '';
    var reaction = attrs.r || '';
    var userId = attrs.u || '';
    var username = attrs.n || '';
    var reactionId = attrs.rid || '';
    var isDel = attrs.del === '1';

    if (!msgId) return;

    // Build reaction data object and pass to messages.js
    var reactionData = JSON.stringify({
      msgId: msgId,
      reaction: reaction,
      userId: userId,
      username: username,
      reactionId: reactionId,
      isDel: isDel,
    });
    enqueueFifo("if(typeof messages!=='undefined'&&messages.handleReaction)messages.handleReaction('" + escapeJson(reactionData) + "')");
  }

  function handleHugKiss(attrs) {
    var fromId = attrs.u || '';
    var fromName = attrs.n || 'Someone';
    var toId = attrs.d || '';
    var giftType = attrs.g || 'hug';
    var smiley = attrs.s || '(hug)';

    // Resolve recipient name from known users
    var toUser = state.users.get(toId);
    var toName = toUser ? toUser.name : ('User_' + toId);

    // Emoji map for gift types
    var emojiMap = { hug: '\u{1F917}', kiss: '\u{1F48B}', smooch: '\u{1F48F}', bear: '\u{1F43B}', blowkiss: '\u{1F618}', grouphug: '\u{1F91D}' };
    var emoji = emojiMap[giftType] || smiley;

    var animHtml = '<div id="hugAnim" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.5);animation:fadeIn .3s">'
      + '<div style="background:#1a1a2e;border:2px solid #4ecdc4;border-radius:16px;padding:30px 40px;text-align:center;animation:bounceIn .5s">'
      + '<div style="font-size:48px;margin-bottom:10px">' + emoji + '</div>'
      + '<div style="color:#fff;font-size:18px;font-weight:600">' + fromName.replace(/</g, '&lt;') + '</div>'
      + '<div style="color:#4ecdc4;font-size:14px;margin:8px 0">sent a ' + giftType.replace(/</g, '&lt;') + ' to</div>'
      + '<div style="color:#fff;font-size:18px;font-weight:600">' + toName.replace(/</g, '&lt;') + '</div>'
      + '</div></div>';

    // Only show the overlay if this involves the current user (sender or recipient)
    var myId = String(state.userId);
    if (fromId === myId || toId === myId) {
      enqueueFifo(
        "var _ha=document.createElement('div');_ha.innerHTML='" + escapeJs(animHtml) + "';"
        + "document.body.appendChild(_ha.firstChild);"
        + "setTimeout(function(){var _h=document.getElementById('hugAnim');if(_h)_h.remove()},4000)"
      );
    }
    // Also show a brief chat message for everyone
    addSystemMessage(fromName + ' sent a ' + giftType + ' to ' + toName + ' ' + emoji);
  }

  function handleGame(attrs) {
    var action = attrs.a || '';
    if (action === 'created') {
      addSystemMessage('Game: ' + (attrs.host || '') + ' started a ' + (attrs.g || 'game') + ' game! Type /joingame ' + (attrs.id || '') + ' to join.');
    } else if (action === 'joined') {
      addSystemMessage((attrs.player || '') + ' joined the game!');
    } else if (action === 'started') {
      enqueueFifo("if(typeof openGameWindow==='function')openGameWindow('" + escapeJs(attrs.g || '') + "','" + escapeJs(attrs.id || '') + "','" + escapeJs(attrs.players || '[]') + "')");
    } else if (action === 'ended') {
      var winMsg = attrs.winner ? 'Winner: ' + attrs.winner : "It's a draw!";
      addSystemMessage('Game over! ' + winMsg);
    } else if (action === 'move') {
      var moveData = JSON.stringify({ u: attrs.u, n: attrs.n, d: attrs.d });
      enqueueFifo("if(typeof handleGameMove==='function')handleGameMove('" + escapeJs(attrs.id || '') + "'," + escapeJs(moveData) + ")");
    }
  }

  function handleTrade(attrs) {
    var action = attrs.a || '';
    if (action === 'incoming') {
      var offerText = '';
      if (parseInt(attrs.ox) > 0) offerText += attrs.ox + ' xats ';
      if (parseInt(attrs.od) > 0) offerText += attrs.od + ' days ';
      var requestText = '';
      if (parseInt(attrs.rx) > 0) requestText += attrs.rx + ' xats ';
      if (parseInt(attrs.rd) > 0) requestText += attrs.rd + ' days ';

      enqueueFifo("if(confirm('Trade offer from " + escapeJs(attrs.from || '') + ":\\nOffering: " + escapeJs(offerText || 'nothing') + "\\nRequesting: " + escapeJs(requestText || 'nothing') + "\\n\\nAccept?')){" +
        "parent._Activity.instance.SendC('xatCommand',JSON.stringify({Command:'Trade',action:'accept',id:'" + escapeJs(attrs.id) + "'}))" +
        "}else{" +
        "parent._Activity.instance.SendC('xatCommand',JSON.stringify({Command:'Trade',action:'decline',id:'" + escapeJs(attrs.id) + "'}))" +
        "}");
    } else if (action === 'accepted' || action === 'complete') {
      enqueueFifo("alert('Trade #" + escapeJs(attrs.id) + " completed successfully!')");
    } else if (action === 'declined') {
      enqueueFifo("alert('Trade #" + escapeJs(attrs.id) + " was declined. Your items have been returned.')");
    } else if (action === 'sent') {
      enqueueFifo("alert('Trade offer sent! ID: " + escapeJs(attrs.id) + "')");
    }
  }

  // Handle power activation, deactivation, and gifting notifications from the server.
  function handlePowerPacket(attrs) {
    var userId = String(attrs.u || '');
    var powerId = attrs.i;
    var action = attrs.t;

    if (action === 'on' || action === 'off') {
      // Update the local user state so UI can reflect active/inactive powers
      var user = state.users.get(userId);
      if (user) {
        if (!user.activePowers) user.activePowers = {};
        if (action === 'on') {
          user.activePowers[powerId] = true;
        } else {
          delete user.activePowers[powerId];
        }
      }
    } else if (action === 'gifted') {
      // Show a notification to the recipient that they received a power gift
      var senderName = attrs.n || 'Someone';
      addSystemMessage(senderName + ' gifted you a power!');
      enqueueFifo("if(typeof doSound==='function')doSound('pop')");
    }
  }

  function handleAway(attrs) {
    // Away status update - re-render visitor with updated status
    const userId = attrs.u;
    const user = state.users.get(userId);
    if (user) {
      user.away = true;
      const isReg = user.name && !user.name.startsWith('Guest_');
      const visitorObj = {
        id: userId,
        name: user.name,
        registered: isReg ? user.name : '',
        image: user.avatar || '(smile#)',
        pFlags: computePFlags(user) | PFLAGS.away,
        pFlags2: 0,
        pawn: isReg ? '(p1*r' + (user.rank & 0xFF).toString(16) + ')' : '',
        status: attrs.t || 'away',
        text: attrs.t || 'away',
        PoolCol: 0,
        PoolColW: 0,
        F: user.rank,
        avatarEffect: '',
      };
      enqueueFifo("visitors.addVisitor('" + escapeJson(JSON.stringify(visitorObj)) + "', 0)");
    }
  }

  function handleError(attrs) {
    const text = attrs.t || 'An error occurred.';
    addSystemMessage('Error: ' + text);
  }

  function handleKickBan(attrs) {
    // Kicked or banned from room
    const reason = attrs.t || attrs.r || 'You were disconnected.';
    addSystemMessage(reason);
    enqueueFifo('InitPage("' + escapeJs(reason) + '")');
  }

  function handleFriendPacket(attrs) {
    if (!state.friends) state.friends = new Map();
    if (!state.friendRequests) state.friendRequests = new Map();

    var action = attrs.t;

    if (!action) {
      // Friend list entry: <f u="id" n="name" a="avatar" s="1|0" />
      state.friends.set(String(attrs.u), {
        id: attrs.u,
        name: attrs.n || '',
        avatar: attrs.a || '',
        online: attrs.s === '1',
      });
      updateFriendsPanel();
    } else if (action === 'request') {
      // Incoming friend request from another user
      state.friendRequests.set(String(attrs.u), { id: attrs.u, name: attrs.n || '' });
      addSystemMessage('Friend request from ' + (attrs.n || 'User ' + attrs.u));
      updateFriendsPanel();
    } else if (action === 'sent') {
      // Confirmation that our friend request was sent
      addSystemMessage('Friend request sent to User ' + attrs.u);
    } else if (action === 'accepted') {
      // Friend request accepted (either direction)
      state.friendRequests.delete(String(attrs.u));
      state.friends.set(String(attrs.u), {
        id: attrs.u,
        name: attrs.n || '',
        avatar: attrs.a || '',
        online: attrs.s === '1',
      });
      addSystemMessage((attrs.n || 'User ' + attrs.u) + ' is now your friend!');
      updateFriendsPanel();
    } else if (action === 'declined') {
      state.friendRequests.delete(String(attrs.u));
      addSystemMessage('Friend request declined.');
    } else if (action === 'removed') {
      state.friends.delete(String(attrs.u));
      updateFriendsPanel();
    }
  }

  function updateFriendsPanel() {
    if (typeof ToC === 'function') {
      var friendArr = [];
      if (state.friends) {
        state.friends.forEach(function(f, id) {
          friendArr.push({ id: id, name: f.name, avatar: f.avatar || '', online: f.online });
        });
      }
      var requestArr = [];
      if (state.friendRequests) {
        state.friendRequests.forEach(function(r, id) {
          requestArr.push({ id: id, name: r.name });
        });
      }
      try { ToC({ Type: 'FriendsList', friends: friendArr, requests: requestArr }); } catch(e) {}
    }
  }

  function handleBlockPacket(attrs) {
    // Block list sync: <b l="id1,id2,id3" /> on join
    // Block add/remove: <b u="userId" t="added|removed" />
    if (attrs.l) {
      // Full list sync
      state.blockedUsers = new Set(attrs.l.split(',').filter(Boolean));
    } else if (attrs.u) {
      if (attrs.t === 'removed') {
        state.blockedUsers.delete(attrs.u);
      } else {
        state.blockedUsers.add(attrs.u);
      }
    }
  }

  function handleGuestbookPacket(attrs) {
    // Guestbook entry: <gb u="ownerId" a="authorId" n="authorName" m="message" t="timestamp" />
    const msg = (attrs.n || 'Unknown') + ': ' + (attrs.m || '');
    addSystemMessage('[Guestbook] ' + msg);
  }

  function handleUserSearchResult(attrs) {
    // User search result: <us u="id" n="name" a="avatar" f="rank" />
    addSystemMessage('[Search] ' + (attrs.n || 'Unknown') + ' (ID: ' + (attrs.u || '?') + ', Rank: ' + (attrs.f || '0') + ')');
  }

  // Handle trade packets received via <x>
  function handleTradePacket(attrs) {
    if (attrs.t === '/trade') {
      // Someone wants to trade with us
      addSystemMessage(attrs.n + ' wants to trade with you! Use /tradeaccept or /tradereject');
      state.pendingTradeFrom = attrs.u;
    } else if (attrs.t === '/tradeaccept') {
      addSystemMessage(attrs.n + ' accepted your trade!');
    } else if (attrs.t === '/tradereject') {
      addSystemMessage(attrs.n + ' rejected your trade.');
    }
  }

  function addSystemMessage(text) {
    const msgObj = {
      i: state.lineId++,
      id: '0',
      name: 'System',
      text: text,
      image: '',
      registered: '',
      pFlags: 0,
      pFlags2: 0,
      pawn: '',
      Time: 5, // temporary message
      msgId: '',
      Big: false,
      flip: false,
      cb: '0',
      avatarEffect: '',
    };
    enqueueFifo("messages.addMessage('" + escapeJson(JSON.stringify(msgObj)) + "')");
  }

  // ===== STRING HELPERS =====
  function escapeJs(str) {
    return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '\\r');
  }

  function escapeJson(str) {
    // Escape single quotes and backslashes for embedding in eval('...') strings
    return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  }

  // ===== ACTIONS HELPERS =====
  // actions.js _0x552cdd expects: { action: string, label: string, icon: string, flags: number, row: number }
  // action strings prefixed with "$" trigger sub-panels (e.g. "$Ban" opens ban form)
  // icon appended to "svg/act" + icon + ".svg" — must match actual SVG filenames
  // flags: bit 0 = greyed out (disabled), bit 1 = gcontrol restricted
  // Available icons: AddAsFriend, Ban, BuyXats, Cancel, Divorce, Edit, Gifts, Ignore,
  //   Kick, Login, MakeGuest, MakeMember, MakeModerator, MakeOwner, OK, Powers,
  //   PrivateChat, PrivateMessage, Register, Settings, Store, Transfer

  // Display rank constants (mapped from server q attribute in handleUserPacket)
  // q=0/none→0(guest), f&0x08→1(member), q=2→3(mod), q=3→4(owner), q=1→5(main owner)
  const RANK_GUEST = 0;
  const RANK_MEMBER = 1;
  const RANK_MOD = 3;
  const RANK_OWNER = 4;
  const RANK_MAIN_OWNER = 5;

  function canActOn(myRank, targetRank) {
    // Can only act on users with strictly lower rank
    return myRank > targetRank;
  }

  function buildActionsMenu(targetUserId, isMe, targetRank) {
    const menu = [];
    const myRank = state.rank;
    const targetUser = state.users.get(String(targetUserId));
    const isTargetReg = targetUser && targetUser.name && !targetUser.name.startsWith('Guest_');

    if (isMe) {
      // === SELF ACTIONS ===
      menu.push({ action: 'Edit', label: 'Edit Profile', icon: 'Edit', flags: 0, row: 1 });
      menu.push({ action: 'Settings', label: 'Settings', icon: 'Settings', flags: 0, row: 1 });
      menu.push({ action: 'Powers', label: 'Powers', icon: 'Powers', flags: 0, row: 2 });
      menu.push({ action: 'Store', label: 'Store', icon: 'Store', flags: 0, row: 2 });
      menu.push({ action: '$Transfer', label: 'Transfer', icon: 'Transfer', flags: 0, row: 3 });
      menu.push({ action: 'BuyXats', label: 'Buy Xats', icon: 'BuyXats', flags: 0, row: 3 });
    } else {
      // === OTHER USER ACTIONS ===
      let row = 1;

      // Row 1: Basic interaction (always available)
      menu.push({ action: 'PrivateChat', label: 'Private Chat', icon: 'PrivateChat', flags: 0, row: row });
      menu.push({ action: 'PrivateMessage', label: 'Private Message', icon: 'PrivateMessage', flags: 0, row: row });
      row++;

      // Row 2: Social
      menu.push({ action: 'AddAsFriend', label: 'Add Friend', icon: 'AddAsFriend', flags: 0, row: row });
      menu.push({ action: 'Ignore', label: 'Ignore', icon: 'Ignore', flags: 0, row: row });
      row++;

      // Row 3: Transfer / Gifts
      menu.push({ action: '$Transfer', label: 'Transfer', icon: 'Transfer', flags: 0, row: row });
      menu.push({ action: 'Gifts', label: 'Gifts', icon: 'Gifts', flags: 0, row: row });
      row++;

      // Moderator+ actions (rank >= MOD)
      if (myRank >= RANK_MOD) {
        const cantAct = !canActOn(myRank, targetRank) ? 1 : 0;

        // Row 4: Kick & Ban
        menu.push({ action: '$Kick', label: 'Kick', icon: 'Kick', flags: cantAct, row: row });
        menu.push({ action: '$Ban', label: 'Ban', icon: 'Ban', flags: cantAct, row: row });
        row++;

        // Row 5: Gag & Mute (mod tools)
        menu.push({ action: 'Gag', label: 'Gag', icon: 'Ban', flags: cantAct, row: row });
        menu.push({ action: 'Ungag', label: 'Ungag', icon: 'Ban', flags: cantAct, row: row });
        row++;
      }

      // Owner+ actions (rank >= OWNER)
      if (myRank >= RANK_OWNER) {
        const cantAct = !canActOn(myRank, targetRank) ? 1 : 0;

        // Row: Rank management
        menu.push({ action: 'Mod', label: 'Make Mod', icon: 'MakeModerator', flags: 0, row: row });
        menu.push({ action: 'Member', label: 'Make Member', icon: 'MakeMember', flags: 0, row: row });
        row++;

        menu.push({ action: 'Guest', label: 'Make Guest', icon: 'MakeGuest', flags: cantAct, row: row });
        menu.push({ action: 'Owner', label: 'Make Owner', icon: 'MakeOwner', flags: 0, row: row });
        row++;

        // Unban
        menu.push({ action: 'Unban', label: 'Unban', icon: 'MakeGuest', flags: 0, row: row });
        menu.push({ action: 'Dunce', label: 'Dunce', icon: 'Ban', flags: cantAct, row: row });
        row++;
      }
    }

    return menu;
  }

  // Build sub-panel data arrays that actions.js iterates over when $Kick/$Ban/$Transfer is opened
  function buildBanSubPanel(targetName) {
    return [
      { Type: 'select', List: [
        { label: '1 Hour', value: '3600' },
        { label: '2 Hours', value: '7200' },
        { label: '6 Hours', value: '21600' },
        { label: '12 Hours', value: '43200' },
        { label: '24 Hours', value: '86400' },
        { label: '3 Days', value: '259200' },
        { label: '1 Week', value: '604800' },
        { label: '2 Weeks', value: '1209600' },
        { label: 'Permanent', value: '0' },
      ]},
      { action: '$doBan', label: 'Ban ' + (targetName || 'User'), icon: 'Ban', flags: 0, row: 1, Type: 'Ban' },
      { action: 'Cancel', label: 'Cancel', icon: 'Cancel', flags: 0, row: 1 },
    ];
  }

  function buildKickSubPanel(targetName) {
    return [
      { action: '$doKick', label: 'Kick ' + (targetName || 'User'), icon: 'Kick', flags: 0, row: 1, Type: 'Kick' },
      { action: 'Cancel', label: 'Cancel', icon: 'Cancel', flags: 0, row: 1 },
    ];
  }

  function buildTransferSubPanel() {
    return [
      { type: 'text', name: (state.xats || 0) + ',' + (state.days || 0) },
      { type: 'dialog', id: 'Xats', name: 'Xats' },
      { type: 'dialog', id: 'Days', name: 'Days' },
      { type: 'password', id: 'Password', name: 'Password' },
      { action: '$doTransfer', label: 'Transfer', icon: 'Transfer', flags: 0, row: 1, Type: 'Transfer' },
      { action: 'Cancel', label: 'Cancel', icon: 'Cancel', flags: 0, row: 1 },
    ];
  }

  function handleActionCommand(cmd) {
    const targetId = state.savedId || cmd.UserNo;
    console.log('[xatcore-js] handleActionCommand:', JSON.stringify(cmd), 'targetId:', targetId);
    if (!targetId) return;

    const actionName = cmd.name || cmd.action || cmd.Type;
    const targetUser = state.users.get(String(targetId));
    const targetName = targetUser ? (targetUser.name || '') : String(targetId);

    switch (actionName) {
      // === COMMUNICATION ===
      case 'PM':
      case 'PrivateChat':
      case 'PrivateMessage': {
        const pmRegname = targetUser ? (targetUser.name || '') : '';
        console.log('[xatcore-js] PM action:', actionName, 'targetId:', targetId, 'regname:', pmRegname);
        // If a Message is included, this is an actual PM being sent (from sendPm in xat.js)
        if (cmd.Message && state.ws && state.ws.readyState === 1) {
          // Send private message packet to server
          sendPacket('p', {
            t: cmd.Message,
            u: String(state.userId),
            d: String(targetId),
            n: state.username,
          });
          // Show the sent message locally (server doesn't echo PMs back to sender)
          var pmMsgObj = {
            id: 'pm_' + Date.now(),
            userId: String(state.userId),
            text: cmd.Message,
            name: state.username,
            registered: state.username,
            avatar: state.avatar || '',
            time: Math.floor(Date.now() / 1000),
            type: 'pm_sent',
            pFlags: 0,
            pFlags2: 0,
            pawn: state.pawn || '',
            namecolor: '',
            nameglow: '',
            namegrad: '',
            avatarEffect: '',
          };
          enqueueFifo("messages.addMessage('" + escapeJson(JSON.stringify(pmMsgObj)) + "')");
          break;
        }
        // Otherwise just open PM mode UI
        enqueueFifo([
          "if(typeof setFrameVis==='function')setFrameVis()",
          "if(typeof setPmMode==='function')setPmMode(true," + targetId + ",'" + escapeJs(pmRegname) + "',document)",
        ]);
        break;
      }

      // === MODERATION: KICK ===
      case 'Kick':
      case 'doKick': {
        if (state.rank < RANK_MOD) break;
        const reason = cmd.Reason || cmd.ReasonKick || '';
        // Send <c> packet: t=type, p=reason, u=myId, d=targetId
        sendPacket('c', { t: 'k', u: String(state.userId), d: String(targetId), p: reason });
        break;
      }

      // === MODERATION: BAN ===
      case 'Ban':
      case 'doBan': {
        if (state.rank < RANK_MOD) break;
        const duration = cmd.Duration || '21600'; // default 6 hours
        const reason = cmd.Reason || '';
        const bootTo = cmd.BootTo || '';
        // Send <c> packet for ban
        sendPacket('c', { t: 'g', u: String(state.userId), d: String(targetId), p: reason, dt: duration, bt: bootTo });
        break;
      }

      // === MODERATION: UNBAN ===
      case 'Unban': {
        if (state.rank < RANK_MOD) break;
        sendPacket('c', { t: 'u', u: String(state.userId), d: String(targetId) });
        break;
      }

      // === MODERATION: GAG ===
      case 'Gag': {
        if (state.rank < RANK_MOD) break;
        sendPacket('c', { t: 'gg', u: String(state.userId), d: String(targetId) });
        break;
      }

      case 'Ungag': {
        if (state.rank < RANK_MOD) break;
        sendPacket('c', { t: 'ug', u: String(state.userId), d: String(targetId) });
        break;
      }

      // === MODERATION: MUTE (invisible gag) ===
      case 'Mute': {
        if (state.rank < RANK_MOD) break;
        sendPacket('c', { t: 'gm', u: String(state.userId), d: String(targetId) });
        break;
      }

      // === MODERATION: DUNCE ===
      case 'Dunce': {
        if (state.rank < RANK_OWNER) break;
        sendPacket('c', { t: 'gd', u: String(state.userId), d: String(targetId) });
        break;
      }

      // === RANK CHANGES (send <c> packets) ===
      case 'Mod': {
        if (state.rank < RANK_OWNER) break;
        sendPacket('c', { t: 'm', u: String(state.userId), d: String(targetId) });
        break;
      }

      case 'Member': {
        if (state.rank < RANK_OWNER) break;
        sendPacket('c', { t: 'e', u: String(state.userId), d: String(targetId) });
        break;
      }

      case 'Guest': {
        if (state.rank < RANK_OWNER) break;
        sendPacket('c', { t: 'r', u: String(state.userId), d: String(targetId) });
        break;
      }

      case 'Owner': {
        if (state.rank < RANK_OWNER) break;
        sendPacket('c', { t: 'M', u: String(state.userId), d: String(targetId) });
        break;
      }

      // === SOCIAL ===
      case 'Friend':
      case 'AddAsFriend': {
        fetch('/api/friends/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + (state.authToken || '') },
          body: JSON.stringify({ friendId: parseInt(targetId) }),
        }).then(r => r.json()).then(data => {
          if (data.ok) addSystemMessage(data.message || 'Friend added.');
          else addSystemMessage('Error: ' + (data.error || 'Failed'));
        }).catch(() => addSystemMessage('Failed to add friend.'));
        break;
      }

      case 'Unfriend': {
        fetch('/api/friends/remove', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + (state.authToken || '') },
          body: JSON.stringify({ friendId: parseInt(targetId) }),
        }).then(r => r.json()).then(data => {
          addSystemMessage(data.ok ? 'Friend removed.' : 'Error: ' + (data.error || 'Failed'));
        }).catch(() => addSystemMessage('Failed to remove friend.'));
        break;
      }

      case 'Block':
      case 'Ignore': {
        if (!state.blockedUsers) state.blockedUsers = new Set();
        state.blockedUsers.add(String(targetId));
        addSystemMessage('User ignored.');
        break;
      }

      // === TRANSFER ===
      case 'Transfer':
      case 'doTransfer': {
        const xats = parseInt(cmd.Xats) || parseInt(cmd.xats) || 0;
        const days = parseInt(cmd.Days) || parseInt(cmd.days) || 0;
        const password = cmd.Password || '';
        if (xats <= 0 && days <= 0) {
          addSystemMessage('Enter xats or days amount to transfer.');
          return;
        }
        fetch('/api/transfer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + (state.authToken || '') },
          body: JSON.stringify({ targetId: parseInt(targetId), xats, days, password }),
        }).then(r => r.json()).then(data => {
          if (data.ok) addSystemMessage(data.message);
          else addSystemMessage('Error: ' + (data.error || 'Transfer failed'));
        }).catch(() => addSystemMessage('Transfer failed.'));
        break;
      }

      // === GIFTS ===
      case 'Gifts': {
        // Show powers/gifts for user (placeholder — opens profile view)
        enqueueFifo("if(typeof classicSetDialog==='function')classicSetDialog('profile'," + targetId + ")");
        break;
      }

      // === SELF ACTIONS ===
      case 'Edit': {
        enqueueFifo("if(typeof classicSetDialog==='function')classicSetDialog('settings'," + state.userId + ")");
        break;
      }

      case 'Settings': {
        enqueueFifo("if(typeof classicSetDialog==='function')classicSetDialog('settings'," + state.userId + ")");
        break;
      }

      case 'Powers': {
        // Open powers view for user
        enqueueFifo("if(typeof classicSetDialog==='function')classicSetDialog('profile'," + (targetId || state.userId) + ")");
        break;
      }

      case 'Store':
      case 'BuyXats': {
        window.open('/store', '_blank');
        break;
      }

      // === MARRIAGE / BFF ===
      case 'Marry': {
        fetch('/api/relationships/marry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + (state.authToken || '') },
          body: JSON.stringify({ partnerId: parseInt(targetId) }),
        }).then(r => r.json()).then(data => {
          addSystemMessage(data.success ? (data.message || 'Married!') : ('Error: ' + (data.error || 'Failed')));
        }).catch(() => addSystemMessage('Failed to send marriage proposal.'));
        break;
      }

      case 'Divorce': {
        fetch('/api/relationships/divorce', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + (state.authToken || '') },
        }).then(r => r.json()).then(data => {
          addSystemMessage(data.success ? 'Divorced.' : ('Error: ' + (data.error || 'Failed')));
        }).catch(() => addSystemMessage('Failed to divorce.'));
        break;
      }

      case 'BFF': {
        fetch('/api/relationships/bff', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + (state.authToken || '') },
          body: JSON.stringify({ partnerId: parseInt(targetId) }),
        }).then(r => r.json()).then(data => {
          addSystemMessage(data.success ? (data.message || 'BFF added!') : ('Error: ' + (data.error || 'Failed')));
        }).catch(() => addSystemMessage('Failed to send BFF request.'));
        break;
      }

      // === LOGOUT ===
      case 'Logout': {
        localStorage.removeItem('xat_token');
        localStorage.removeItem('xat_user');
        sessionStorage.removeItem('xat_token');
        if (state.ws) state.ws.close();
        state.userId = null;
        state.username = '';
        state.authToken = '';
        state.connected = false;
        window.location.reload();
        break;
      }

      default:
        console.log('[xatcore-js] Unhandled action:', actionName, cmd);
    }
  }

  // ===== SENDC REPLACEMENT =====
  function handleSendC(command, arg1, arg2) {
    switch (command) {
      case 'xatInit':
        // Return userId. If not logged in, create a guest session first.
        if (!state.userId) {
          const guestId = Math.floor(1500000000 + Math.random() * 500000000);
          state.userId = guestId;
          state.username = 'Guest_' + (guestId % 10000);
        }
        return String(state.userId);

      case 'SetPage':
        state.page = arg2 || 'classic';
        return state.page;

      case 'xatMain':
        // Trigger WebSocket connection
        connectWS();
        return '';

      case 'leaveBackground':
        state.groupName = arg2 || '';
        return '';

      case 'ConsoleOff':
        return '0'; // Keep console enabled

      case 'SetPhoneFontSize':
        return '';

      case 'setLang':
        state.lang = arg2 || 'en';
        return '';

      case 'sendStuff':
        // Store flags from the JSON arg1
        try {
          const stuff = JSON.parse(arg1);
          state.flags = stuff.Flags || 0;
        } catch(e) {}
        return '';

      case 'getStuff':
        return JSON.stringify({
          lang: state.lang,
          MyId: state.userId,
          username: state.username,
          rank: state.rank,
          xats: state.xats,
          days: state.days,
        });

      case 'xatCommand':
        handleXatCommand(arg2);
        return '';

      case 'xatTick':
        return dequeue();

      case 'ReadToJavaFifo':
        return dequeue();

      case 'xatMessageReceived':
      case 'xatMessageOK':
      case 'xatURL':
      case 'LastActionHero':
      case 'viewWillDisappear':
      case 'webViewDidFinishLoad':
      case 'setToken':
        return '';

      default:
        console.log('[xatcore-js] Unknown SendC:', command,
          typeof arg1 === 'string' ? arg1.substring(0, 80) : arg1,
          typeof arg2 === 'string' ? arg2.substring(0, 80) : arg2);
        return '';
    }
  }

  function handleXatCommand(jsonStr) {
    if (!jsonStr) return;
    try {
      const cmd = JSON.parse(jsonStr);

      switch (cmd.Command || cmd.Type) {
        case 'Send':
          // User typed a message — check for special commands first
          if (cmd.Message && state.ws && state.ws.readyState === 1) {
            const msg = cmd.Message;

            // Filter client-only commands - don't send to server
            if (msg === '/RTypeOn') {
              // Send typing indicator - server expects t attribute with /typing or /RTypeOn
              sendPacket('x', { u: String(state.userId), t: '/typing' });
              return;
            }
            if (msg === '/RTypeOff') {
              sendPacket('x', { u: String(state.userId), t: '/typingoff' });
              return;
            }
            // Client-only commands that shouldn't go to server
            if (msg.startsWith('/bump') || msg.startsWith('/rtl') || msg.startsWith('/ltr')) {
              return;
            }

            // Hug/kiss slash commands: /hug <userId>, /kiss <userId>, etc.
            var hugMatch = msg.match(/^\/(hug|kiss|bear|smooch|grouphug|blowkiss)\s+(\d+)/i);
            if (hugMatch) {
              sendPacket('hg', {
                d: hugMatch[2],
                g: hugMatch[1].toLowerCase(),
                s: '(' + hugMatch[1].toLowerCase() + ')',
              });
              break;
            }

            // Game slash commands
            if (msg.startsWith('/startgame ')) {
              var gameType = msg.split(' ')[1] || 'tictactoe';
              sendPacket('game', { a: 'create', g: gameType });
              break;
            }
            if (msg.startsWith('/joingame ')) {
              var joinGameId = msg.split(' ')[1];
              if (joinGameId) sendPacket('game', { a: 'join', id: joinGameId });
              break;
            }

            // Regular message - send to server
            sendPacket('m', {
              t: msg,
              u: String(state.userId),
              n: state.username,
            });
          }
          break;

        case 'Hug':
        case 'Kiss':
        case 'Gift':
          if (cmd.UserNo && state.ws && state.ws.readyState === 1) {
            var giftTypeCmd = (cmd.Type || cmd.Command || 'hug').toLowerCase();
            sendPacket('hg', {
              d: String(cmd.UserNo),
              g: cmd.GiftType || giftTypeCmd,
              s: cmd.Smiley || '(' + (cmd.GiftType || giftTypeCmd) + ')',
            });
          }
          break;

        case 'EnableTick':
          state.tickEnabled = true;
          break;

        case 'Refresh':
          break;

        case 'StartGroup':
          if (cmd.Group) {
            state.groupName = cmd.Group;
            if (state.ws) state.ws.close();
            state.mainInitDone = false;
            connectWS();
          }
          break;

        case 'GetXconst':
          // Power constants - try to fetch from server
          if (cmd.js && cmd.obj) {
            fetchPowerData(cmd.obj);
          }
          break;

        case 'signInButtonPressed':
          // Sign In button opens the login/register dialog via selector iframe
          // If DoSignIn is set, use that; otherwise show SignUp page
          const signInPage = cmd.DoSignIn || 'SignUp';
          enqueueFifo("classicSetDialog('selector', 0)");
          enqueueFifo("if(_Activity.instance.Selector){_Activity.instance.Selector.DoLoginEtc('" + signInPage + "')}");
          break;

        case 'Click':
          // User clicked on a visitor - store for actions dialog
          console.log('[xatcore-js] Click received, UserNo:', cmd.UserNo);
          if (cmd.UserNo) {
            state.savedId = String(cmd.UserNo);
          }
          break;

        case 'SaveId':
          if (cmd.UserNo || cmd.id) {
            state.savedId = String(cmd.UserNo || cmd.id);
          }
          break;

        case 'LoadClassicDialog':
          // classicSetDialog called — need to feed user data to actions iframe
          console.log('[xatcore-js] LoadClassicDialog:', cmd.Type, 'UserNo:', cmd.UserNo, 'savedId:', state.savedId, 'users:', [...state.users.keys()], 'myId:', state.userId);
          if (cmd.Type === 'actions' || cmd.Type === 'profile') {
            const targetUserId = String(cmd.UserNo || state.savedId);
            const targetUser = state.users.get(targetUserId);
            const isMe = targetUserId === String(state.userId);
            console.log('[xatcore-js] targetUserId:', targetUserId, 'targetUser:', targetUser, 'isMe:', isMe);

            if (targetUser || isMe) {
              const userName = isMe ? state.username : (targetUser ? targetUser.name : 'Unknown');
              const userAvatar = isMe ? state.avatar : (targetUser ? targetUser.avatar : '');
              const userRank = isMe ? state.rank : (targetUser ? targetUser.rank : 0);
              const userDays = isMe ? state.days : (targetUser ? targetUser.days : 0);
              const userXats = isMe ? state.xats : (targetUser ? targetUser.xats : 0);
              const userStatus = isMe ? (state.status || '') : (targetUser ? (targetUser.status || '') : '');
              const userHomepage = isMe ? (state.homepage || '') : (targetUser ? (targetUser.homepage || '') : '');
              const isReg = userName && !userName.startsWith('Guest_');

              // Build actions data JSON matching what actions.configurePage expects
              const userPFlags = computePFlags({ name: userName, days: userDays });
              const actionsData = {
                user: [{
                  id: parseInt(targetUserId) || 0,
                  name: userName,
                  regname: isReg ? userName : '',
                  me: isMe ? '1' : '0',
                  avatar: userAvatar || '',
                  status: userStatus,
                  homepage: userHomepage,
                  pFlags: userPFlags,
                  pFlags2: 0,
                  pstyle: isMe ? (state.pstyle || '') : (targetUser ? (targetUser.pstyle || '') : ''),
                  flag0: 0,
                  on2: JSON.stringify({ online: 'Online' }).replace(/"/g, '`'),
                  addedAsFriend: '0',
                  calls: '',
                  callsAccepted: '0',
                  w_Powers: '',
                  F: userRank,
                  d0: userDays,
                  d3: userXats,
                  married: isMe ? (state.marriedTo || '') : (targetUser ? (targetUser.marriedTo || '') : ''),
                  bff: isMe ? (state.bffWith || '') : (targetUser ? (targetUser.bffWith || '') : ''),
                  d2: targetUser ? (targetUser.regTime || 0) : (state.regTime || 0),
                }],
                main: buildActionsMenu(targetUserId, isMe, userRank),
              };

              // Add sub-panel data arrays for $Kick, $Ban, $Transfer
              if (!isMe) {
                actionsData.Ban = buildBanSubPanel(userName);
                actionsData.Kick = buildKickSubPanel(userName);
              }
              actionsData.Transfer = buildTransferSubPanel();

              // AllPowers is a bitmask array of all powers the user owns
              // Powers are stored as 32-bit integers where bit N means power (index*32 + N) is owned
              actionsData.AllPowers = [targetUser ? (targetUser.powerMasks || []) : (state.powerMasks || [])];
              actionsData.Collections = [{}];
              actionsData.PowersOflo = [['']];
              actionsData.guestbook = '/api/guestbook/' + (parseInt(targetUserId) || state.userId);

              // Init actions iframe config + call configurePage
              // Must set ButCol/ButColW in the actions iframe's config or buttons get #000NAN colors
              const acfg = escapeJson(JSON.stringify({
                MyId: state.userId, Flags: 5, ButCol: 128, ButColW: 16777215,
                dom: location.protocol + '//' + location.host, PhoneType: 3, lang: state.lang || 'en',
                GroupName: state.groupName || 'Lobby', chatid: state.roomId,
              }));
              const adata = escapeJson(JSON.stringify(actionsData));
              enqueueFifo([
                "var af=document.getElementById('actionsFrame');if(af&&af.contentWindow){var aw=af.contentWindow;if(aw.actions){if(!aw._cfgDone){aw.actions.main('" + acfg + "');aw._cfgDone=true;}aw.actions.Visible=true;aw.actions.configurePage('" + adata + "')}}"
              ]);
              console.log('[xatcore-js] Calling actions.configurePage with', actionsData.main.length, 'menu items');
            }
          }
          break;

        case 'Action':
          // Actions panel triggered an action
          handleActionCommand(cmd);
          // Handle view switching (Next field from actions.js sendApp)
          if (cmd.Next === 'messages') {
            enqueueFifo("if(_Activity&&_Activity.instance)_Activity.instance.SetPage('messages')");
          } else if (cmd.Next === 'visitors') {
            enqueueFifo("if(_Activity&&_Activity.instance)_Activity.instance.SetPage('visitors')");
          }
          break;

        case 'Block':
          if (!state.blockedUsers) state.blockedUsers = new Set();
          if (cmd.UserNo) {
            state.blockedUsers.add(String(cmd.UserNo));
            // Persist to server
            if (state.ws && state.ws.readyState === 1) {
              sendPacket('b', {
                u: String(cmd.UserNo),
                t: 'add',
              });
            }
          }
          break;

        case 'Trade':
          if (cmd.action && state.ws && state.ws.readyState === 1) {
            sendPacket('tr', {
              a: cmd.action,
              id: cmd.id || '',
              d: cmd.UserNo ? String(cmd.UserNo) : '',
              ox: String(cmd.offerXats || 0),
              od: String(cmd.offerDays || 0),
              op: cmd.offerPowers || '[]',
              rx: String(cmd.requestXats || 0),
              rd: String(cmd.requestDays || 0),
              rp: cmd.requestPowers || '[]',
            });
          }
          break;

        case 'GoBack':
          // Close dialog/go back to chat
          enqueueFifo("setFrameVis()");
          break;

        case 'NOP':
          // NOP with Next = view switch (used by actions.js GoBack)
          if (cmd.Next === 'messages') {
            enqueueFifo("if(_Activity&&_Activity.instance)_Activity.instance.SetPage('messages')");
          } else if (cmd.Next === 'visitors') {
            enqueueFifo("if(_Activity&&_Activity.instance)_Activity.instance.SetPage('visitors')");
          }
          break;

        case 'Vol':
          try {
            const volVal = parseInt(cmd.Value) || 0;
            localStorage.setItem('xat_volume', String(volVal));
            // Apply to audio elements in page
            const vol = volVal / 100;
            document.querySelectorAll('audio').forEach(function(a) { a.volume = Math.min(1, Math.max(0, vol)); });
          } catch(e) {}
          break;

        case 'Setting':
          // Setting change from settings panel
          // settings.js sends Name/Value, support both Name and Key
          try {
            const settingKey = cmd.Name || cmd.Key;
            const settings = JSON.parse(localStorage.getItem('Settings') || '{}');
            if (settingKey) settings[settingKey] = cmd.Value;
            localStorage.setItem('Settings', JSON.stringify(settings));
          } catch(e) {}
          // Friend category update
          if ((cmd.Name || cmd.Key) === 'friend_category' && cmd.FriendId) {
            fetch('/api/friends/' + cmd.FriendId + '/category', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + state.authToken },
              body: JSON.stringify({ category: cmd.Category || '' }),
            }).catch(function(){});
          }
          break;

        case 'DeleteAccount':
          if (cmd.Password) {
            fetch('/auth/delete-account', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + state.authToken },
              body: JSON.stringify({ password: cmd.Password }),
            })
            .then(function(r) { return r.json(); })
            .then(function(data) {
              if (data.success) {
                localStorage.clear();
                window.top.location.href = '/';
              } else {
                enqueueFifo("alert('" + escapeJs(data.error || 'Deletion failed') + "')");
              }
            });
          }
          break;

        case 'DeleteMsg':
          if (cmd.Num || cmd.msgId) {
            const delId = cmd.Num || cmd.msgId;
            // Send to server for broadcast
            sendPacket('dm', {
              i: String(delId),
              u: String(state.userId),
            });
          }
          break;

        case 'DoReaction':
          if (cmd.MsgId && cmd.Reaction && state.ws && state.ws.readyState === 1) {
            sendPacket('rc', {
              i: cmd.MsgId,
              r: cmd.Reaction,
              u: String(state.userId),
              n: state.username,
              rid: cmd.reactionId || Math.random().toString(36).substr(2, 9),
            });
          }
          break;

        case 'MakeId':
          // Guest trying to chat — redirect to login
          if (!state.authToken) {
            window.top.location.href = '/login';
          }
          break;

        case 'DoRapid':
          if (cmd.UserNo && state.ws && state.ws.readyState === 1) {
            sendPacket('c', {
              t: '/rapid',
              d: String(cmd.UserNo),
              u: String(state.userId),
            });
          }
          break;

        case 'EditMsg':
          if (cmd.MsgId && cmd.NewMsg && state.ws && state.ws.readyState === 1) {
            sendPacket('em', {
              t: cmd.NewMsg,
              i: cmd.MsgId,
              u: String(state.userId),
            });
          }
          break;

        case 'UndoReaction':
          if (cmd.reactionId && state.ws && state.ws.readyState === 1) {
            sendPacket('rc', {
              i: cmd.MsgId || '',
              u: String(state.userId),
              rid: cmd.reactionId,
              del: '1',
            });
          }
          break;

        case 'SetPower':
          if (cmd.Id !== undefined && state.ws && state.ws.readyState === 1) {
            sendPacket('sp', {
              p: String(cmd.Id),
              v: String(cmd.Value || 0),
              u: String(state.userId),
            });
          }
          break;

        case 'Macro':
          if (state.ws && state.ws.readyState === 1) {
            sendPacket('mc', {
              n: cmd.Name || '',
              v: cmd.Value || '',
              u: String(state.userId),
            });
          }
          break;

        case 'SaveXatspace':
          if (state.ws && state.ws.readyState === 1) {
            sendPacket('xs', {
              n: cmd.Name || '',
              a: cmd.Avatar || '',
              s: cmd.status || '',
              h: cmd.HomePage || '',
              u: String(state.userId),
            });
            // Update local state
            if (cmd.Name) state.username = cmd.Name;
            if (cmd.Avatar) state.avatar = cmd.Avatar;
            if (cmd.status !== undefined) state.status = cmd.status;
            if (cmd.HomePage !== undefined) state.homepage = cmd.HomePage;
          }
          break;

        case 'OpenPC':
          if (cmd.UserNo) {
            const pcUserId = String(cmd.UserNo);
            const pcUser = state.users.get(pcUserId);
            const pcName = pcUser ? pcUser.name : ('User_' + pcUserId);
            // Tell classic.js to open a PC tab
            enqueueFifo("if(typeof classic !== 'undefined' && classic.openTab) classic.openTab(" + parseInt(pcUserId) + ", '" + escapeJs(pcName) + "')");
          }
          break;

        case 'SetPool':
          if (cmd.Pool !== undefined && state.ws && state.ws.readyState === 1) {
            state.pool = parseInt(cmd.Pool) || 0;
            sendPacket('j2', {
              cb: state.roomId || '0',
              Y: '2',
              l5: '65535',
              l4: String(Math.floor(Date.now() / 1000 - 1)),
              l3: '0',
              l2: '0',
              pool: String(state.pool),
            });
          }
          break;

        case 'GetSmilies':
          // Client requesting smiley list refresh - pow2 data handles this
          break;

        case 'GeneratePawnPreview':
          // Pawn preview is generated client-side, no server needed
          break;

        case 'Login':
          if (cmd.Username && cmd.Password) {
            fetch('/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username: cmd.Username, password: cmd.Password }),
            })
            .then(function(r) { return r.json(); })
            .then(function(data) {
              if (data.token) {
                state.authToken = data.token;
                state.userId = data.user.id;
                state.username = data.user.username;
                state.rank = data.user.rank || 0;
                state.xats = data.user.xats || 0;
                state.days = data.user.days || 0;
                localStorage.setItem('xat_token', data.token);
                localStorage.setItem('xat_user', JSON.stringify(data.user));
                // Close selector dialog and reconnect
                enqueueFifo("if(typeof setFrameVis==='function')setFrameVis()");
                if (state.ws) state.ws.close();
                state.mainInitDone = false;
                connectWS();
              } else {
                enqueueFifo("if(_Activity.instance.Selector)_Activity.instance.Selector.DoLoginMessage('" + escapeJs(data.error || 'Login failed') + "')");
              }
            })
            .catch(function() {
              enqueueFifo("if(_Activity.instance.Selector)_Activity.instance.Selector.DoLoginMessage('Connection error')");
            });
          }
          break;

        case 'Register':
          // selector.js sends Password1 (not Password)
          if (cmd.Username && (cmd.Password1 || cmd.Password)) {
            fetch('/auth/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username: cmd.Username, password: cmd.Password1 || cmd.Password, email: cmd.Email || '' }),
            })
            .then(function(r) { return r.json(); })
            .then(function(data) {
              if (data.token) {
                state.authToken = data.token;
                state.userId = data.user.id;
                state.username = data.user.username;
                state.rank = data.user.rank || 0;
                state.xats = data.user.xats || 0;
                state.days = data.user.days || 0;
                localStorage.setItem('xat_token', data.token);
                localStorage.setItem('xat_user', JSON.stringify(data.user));
                enqueueFifo("if(typeof setFrameVis==='function')setFrameVis()");
                if (state.ws) state.ws.close();
                state.mainInitDone = false;
                connectWS();
              } else {
                enqueueFifo("if(_Activity.instance.Selector)_Activity.instance.Selector.RegisterError('" + escapeJs(data.error || 'Registration failed') + "')");
              }
            })
            .catch(function() {
              enqueueFifo("if(_Activity.instance.Selector)_Activity.instance.Selector.RegisterError('Connection error')");
            });
          }
          break;

        case 'ResetPassword':
          if (cmd.Email) {
            fetch('/auth/reset-password', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: cmd.Email }),
            })
            .then(function(r) { return r.json(); })
            .then(function(data) {
              var msg = data.message || data.error || 'Check your email for reset instructions.';
              enqueueFifo("if(_Activity.instance.Selector)_Activity.instance.Selector.forgotPass('" + escapeJs(JSON.stringify({html: msg})) + "')");
            })
            .catch(function() {
              enqueueFifo("if(_Activity.instance.Selector)_Activity.instance.Selector.forgotPass('" + escapeJs(JSON.stringify({Err:{login:'Connection error'}})) + "')");
            });
          }
          break;

        case 'Assign':
          if (cmd.PowerId !== undefined && state.ws && state.ws.readyState === 1) {
            sendPacket('ap', {
              p: String(cmd.PowerId),
              v: String(cmd.Value || 0),
              u: String(state.userId),
            });
          }
          break;

        case 'EditToggle':
        case 'EditChange':
          // Friend list edit operations handled locally
          break;

        case 'getUsersOnline':
          // Server already sends user list on join
          break;

        case 'QueNotify':
          // Queue a notification for display
          if (cmd.Message) {
            enqueueFifo("if(typeof showNotification==='function')showNotification('" + escapeJs(cmd.Message) + "')");
          }
          break;

        case 'GoWebChat':
          break;

        case 'StartGame':
          if (cmd.GameType && state.ws && state.ws.readyState === 1) {
            sendPacket('game', { a: 'create', g: cmd.GameType });
          }
          break;

        case 'JoinGame':
          if (cmd.GameId && state.ws && state.ws.readyState === 1) {
            sendPacket('game', { a: 'join', id: String(cmd.GameId) });
          }
          break;

        case 'GameMove':
          if (cmd.GameId && state.ws && state.ws.readyState === 1) {
            sendPacket('game', { a: 'move', id: String(cmd.GameId), d: cmd.MoveData || '' });
          }
          break;

        default:
          console.log('[xatcore-js] xatCommand:', cmd);
      }
    } catch(e) {
      console.error('[xatcore-js] xatCommand parse error:', e);
    }
  }

  // ===== POWER DATA FETCHING =====
  // pow2.php data is a raw JSON array: [["last",{...}],["backs",{...}],["pssa",[...]],...]
  // Convert to an object keyed by name, then extract the specific requested const
  let _powerDataCache = null; // object keyed by const name
  let _powerDataFetching = false;
  let _powerDataQueue = []; // queue of objNames waiting for fetch

  function fetchPowerData(objName) {
    const arrayConsts = ['reactions', 'pssa', 'topsh', 'soth', 'syel', 'SuperPowers', 'SuperPawns', 'Stickers', 'effects', 'uCollections'];
    const emptyFallback = arrayConsts.includes(objName) ? '[]' : '{}';
    // Map GetXconst names to pow2 data keys (they differ)
    var pow2KeyMap = {
      'SuperPowers': 'SuperP', 'SuperPawns': 'pawns2', 'Stickers': 'Sticker',
      'effects': 'Effects', 'frames': 'Frames', 'aces': 'Aces'
    };

    if (_powerDataCache) {
      var cacheKey = pow2KeyMap[objName] || objName;
      const val = _powerDataCache[cacheKey] !== undefined ? _powerDataCache[cacheKey] : _powerDataCache[objName];
      const data = val !== undefined ? JSON.stringify(val) : emptyFallback;
      enqueueFifo('GetXconst("' + escapeJs(objName) + '", \'' + escapeJson(data) + '\')');
      return;
    }

    // Queue this request if fetch is already in progress
    _powerDataQueue.push(objName);
    if (_powerDataFetching) return;
    _powerDataFetching = true;

    fetch('/web_gear/chat/pow2.php')
      .then(r => r.text())
      .then(text => {
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
            try { _powerDataCache = JSON.parse(match[1]); } catch (e2) { _powerDataCache = {}; }
          } else {
            _powerDataCache = {};
          }
        }
        // Flush all queued requests
        const queue = _powerDataQueue.splice(0);
        for (const name of queue) {
          const fallback = arrayConsts.includes(name) ? '[]' : '{}';
          var ck = pow2KeyMap[name] || name;
          const val = _powerDataCache[ck] !== undefined ? _powerDataCache[ck] : _powerDataCache[name];
          const data = val !== undefined ? JSON.stringify(val) : fallback;
          enqueueFifo('GetXconst("' + escapeJs(name) + '", \'' + escapeJson(data) + '\')');
        }
        _powerDataFetching = false;
      })
      .catch(() => {
        const queue = _powerDataQueue.splice(0);
        for (const name of queue) {
          const fallback = arrayConsts.includes(name) ? '[]' : '{}';
          enqueueFifo('GetXconst("' + escapeJs(name) + '", \'' + fallback + '\')');
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
    print: function() {},
    printErr: function() {},
    canvas: [],
    setStatus: function() {},
    totalDependencies: 0,
    monitorRunDependencies: function() {},
    _malloc: function() { return 0; },
    _xFree: function() {},
    stringToUTF8: function() {},
    ccall: function() { return ''; },
  };

  let _sendCPatched = false;

  const _patchInterval = setInterval(function() {
    if (window._Activity && window._Activity.instance && !_sendCPatched) {
      _sendCPatched = true;
      clearInterval(_patchInterval);

      state.activityInstance = window._Activity.instance;

      // Patch SendC to use our handler
      state.activityInstance.SendC = function(command, arg1, arg2) {
        return handleSendC(command, arg1 || '', arg2 || '');
      };

      // Store the group name from the URL
      const params = new URLSearchParams(window.location.search);
      state.groupName = params.get('n') || params.get('gn') || '';

      // Also check parent URL
      if (!state.groupName && window.parent !== window) {
        try {
          const parentParams = new URLSearchParams(window.parent.location.search);
          state.groupName = parentParams.get('n') || parentParams.get('gn') || '';
        } catch(e) {}
      }

      // Now trigger StartChat
      console.log('[xatcore-js] Triggering StartChat for group:', state.groupName);
      state.activityInstance.StartChat();
    }
  }, 100);

  // Also provide UTF8ToString global that SendC uses
  window.UTF8ToString = function(ptr) { return ''; };

  console.log('[xatcore-js] xat JavaScript core loaded. Auth token:', state.authToken ? 'present' : 'none');
})();
