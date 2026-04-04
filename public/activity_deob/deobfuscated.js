var Module;
var ReleaseMode = 0;
const kTickeTab = "10";
class Activity {
  constructor() {
    if (Activity.instance) {
      return Activity.instance;
    }
    const defaultConfig = {
      name: "box",
      origin: "https://xat.com",
      debugLogIgnore: [],
      debugNoLogs: !0
    };
    Activity.instance = this;
    this.instance = this;
    this.MyId;
    this.MyObj;
    this.SavedId;
    this.CurrentPage;
    this.PagesLoaded;
    this.LastActionHero;
    this.LastCommand;
    this.IsAway = !1;
    this.UserSettings = {};
    this.CommandsQueue = [];
    this.cStyle = {};
    this.IsFlixActive = !1;
    this.IsFlixVisible = !1;
    this.FlixChatId = -1;
    this.FlixBackground;
    this.pawnHueData = [];
    this.pawnHuePreviewCode = "";
    this.WebSocket;
    this.ConnectIp;
    this.ConnectPort;
    this.IsSockOpen;
    this.ConsoleOff;
    this.AppFrameLoaded;
    this.OfflinePushToken;
    this.Radio;
    this.Sound = 5;
    this.Volume = [35, 35, 35, 100];
    this.Device = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    this.IsWeb = !0;
    this.IsClassic = !0;
    this.IsLandscape;
    this.IsNarrow;
    this.IsAndroidApp;
    this.IsIOSApp;
    this.IsMobileApp;
    this.LoginBodge;
    this.gConfig;
    this.GroupName;
    this.CurrentChat;
    this.CurrentChatC;
    this.LangFiles = {};
    this.CustomGroupLang;
    this.Notify;
    this.FIFO = [];
    this.LocalNotify;
    this.TickFPS = 10;
    this.TickQueue = [];
    this.PSSA;
    this.TOPSH;
    this.SUPERPOWERS;
    this.SOTH;
    this.SYEL;
    this.UCOLLECTIONS;
    this.EFFECTS;
    this.FRAMES;
    this.ACES;
    this.Smilies;
    this.Avatars;
    this.Selector;
    this.Settings;
    this.Quickbar;
    this.AdBanner;
    this.Window = window;
    this.Parent = parent;
    this.clickedTickleTab = !1;
    this.Reactions = [];
    this.xConsts = {};
    this.xConfig = defaultConfig;
    this.LOADURL = 1;
    this.SEND = 2;
    this.CLOSE = 3;
    this.CONNECT = 4;
    this.NOTIFY = 5;
    this.ALERT = 6;
    this.HTTP = 7;
    this.LANGS = 8;
    this.FINISHTRANSACTION = 9;
    this.LOG = 10;
    this.SAVESOL = 11;
    this.LOADSOL = 12;
    this.DEBUG = 13;
    this.PERMISSIONS = {
      denied: "denied",
      granted: "granted",
      prompt: "prompt"
    };
    this.TRIGGERED_PERMISSIONS = [this.PERMISSIONS.prompt];
    this.voteURLs = {
      get: null,
      post: null
    };
    console.log = function (origLog, name, ignoreList) {
      return function () {
        this.xConfig.debugNoLogs;
      }.bind(this);
    }.bind(this)(console.log.bind(console), this.xConfig.name, this.xConfig.debugLogIgnore);
    this.returnPermissionForStorageAccess().then(permission => {
      if (permission === this.PERMISSIONS.granted) {
        return this.requestStorageAccessApi();
      }
    });
    this.InitLocalNotify();
    this.initFocusChange();
    this.clearLiveStats();
    Module = {
      preRun: [],
      postRun: [this.StartChat.bind(this)],
      print: function (text) {
        if (arguments.length > 1) {
          text = Array.prototype.slice.call(arguments).join(" ");
        }
        text = String(text).replace(/\/n/g, "\n");
      },
      printErr: function (text) {
        if (arguments.length > 1) {
          text = Array.prototype.slice.call(arguments).join(" ");
        }
        console.error("!printErr=" + text);
      },
      canvas: [],
      setStatus: function (msg) {
        if (arguments.length > 1) {
          msg = Array.prototype.slice.call(arguments).join(" ");
        }
      },
      totalDependencies: 0,
      monitorRunDependencies: function (remaining) {
        this.totalDependencies = Math.max(this.totalDependencies, remaining);
        this.setStatus(remaining ? "Preparing... (" + (this.totalDependencies - remaining) + "/" + this.totalDependencies + ")" : "All downloads complete.");
      }
    };
    window.onerror = () => {
      Module.setStatus("Exception thrown, see JavaScript console");
      Module.setStatus = statusMsg => {
        if (statusMsg) {
          Module.printErr("[post-exception status] " + statusMsg);
        }
      };
    };
    window.onbeforeunload = () => {
      this.CloseSock();
      this.clearLiveStats();
    };
    this.LoadModules();
    this.ConnectToC();
    document.addEventListener("click", this.ClickOnDom.bind(this), !0);
    document.getElementById("moreMenu").addEventListener("click", this.onMore.bind(this));
    window.addEventListener("orientationchange", ev => {
      const angle = ev.target.screen.orientation ? ev.target.screen.orientation.angle : window.orientation;
      this.SendStuff(angle);
      this.SendC("xatCommand", "", JSON.stringify({
        Command: "Refresh"
      }));
    });
  }
  Init() {
    if (this.Parent && !this.Parent.deferredPrompt) {
      this.Parent.sendStuff = this.SendStuff;
    }
    this.SendStuff();
    const initResult = this.SendC("xatInit", "", "");
    if (initResult == -999) {
      return;
    }
    this.MyId = initResult;
    this.UserSettings = JSON.parse(localStorage.getItem("Settings")) ?? {};
    if (this.IsClassic) {
      this.SetPage("classic");
    } else if (this.GroupName) {
      this.SetPage("messages");
    } else if (initResult == 0) {
      this.SetPage("groups");
    } else {
      this.SetPage("chats");
    }
    this.SendC("xatMain", "", "");
    this.SendC("leaveBackground", "", this.GroupName);
    this.ConsoleOff = this.SendC("ConsoleOff", "", "") > 0;
    this.SendC("SetPhoneFontSize", "", "1.0");
    this.SendC("setLang", "", window.navigator.userLanguage || window.navigator.language);
    this.Smilies = new Smilies();
    this.Avatars = new Avatars();
    this.Smilies.Animation = this.Avatars.Animation = this.UserSettings.animation != "disable";
    this.AdBanner = this.Parent.document.getElementById("promoframe");
    if (!this.IsClassic) {
      const menuItems = ["home", "profile", "friends", "chats", "groups", "settings", "store", "buy", "help", "visitors", "classic", "logout", "login", "install"];
      for (let i in menuItems) {
        const menuEl = document.getElementById("sp_" + menuItems[i]);
        if (menuEl) {
          menuEl.menuItem = menuItems[i];
          menuEl.addEventListener("click", ev => this.SetPageFromMenuItem(ev.currentTarget.menuItem));
        }
      }
      addClass("d-none", "sp_classic");
      if (this.IsIOSApp) {
        addClass("d-none", "sp_buy");
      }
      setDNone(this.CanInstallPWA(), "sp_install");
    }
    GetXconsts(this.IsClassic ? "messages" : "parent");
    this.SendC("xatCommand", "", JSON.stringify({
      Command: "EnableTick"
    }));
    const stuffData = this.SendC("getStuff", "", "");
    if (stuffData != -999) {
      this.GetStuff(stuffData);
    }
    window.addEventListener("message", this.OnMessage.bind(this), !1);
    window.setInterval(this.Tick.bind(this), 1000 / this.TickFPS);
  }
  Tick() {
    if (this.PagesLoaded) {
      let tickData = this.SendC("xatTick", "", "");
      if (tickData != -999) {
        while (tickData) {
          this.GotJsonFromC(tickData);
          tickData = this.SendC("ReadToJavaFifo", "", "");
        }
      }
      if (this.OfflinePushToken) {
        this.SendC("setToken", "", this.OfflinePushToken);
        this.OfflinePushToken = "";
      }
      this.TickQueue.forEach(callback => callback());
      this.ProcessCommand(this.CommandsQueue.shift());
    } else {
      this.PagesLoaded = this.IsClassic;
      let loadedCount = 0;
      const frameNames = ["actions", "settings", "selector"];
      if (!this.PagesLoaded) {
        frameNames.forEach(name => {
          const frame = document.getElementById(name + "Frame");
          if (frame && frame.contentWindow[name]) {
            loadedCount++;
          }
        });
      }
      if (this.PagesLoaded || loadedCount == frameNames.length) {
        this.PagesLoaded = true;
        this.SendC("xatCommand", "", JSON.stringify({
          Command: "EnableTick"
        }));
        if (!this.IsClassic && !this.MyId && !this.GroupName && (!!this.IsIOSApp || !!this.IsAndroidApp)) {
          this.Selector.DoLoginEtc("SignUp");
        }
      }
    }
  }
  IsConnected() {
    return this?.WebSocket?.readyState == 1;
  }
  StartChat() {
    if (this.Parent) {
      this.GroupName = this.GetParameterByName("gn", this.Parent.location.href);
      if (!this.GroupName) {
        this.GroupName = this.GetParameterByName("id", this.Parent.location.href);
        this.GroupName &&= "xat" + this.GroupName;
      }
    }
    this.GroupName ||= this.GetParameterByName("n");
    if (this.GroupName) {
      this.GroupName = this.GroupName.replace(/[^0-9a-zA-Z_]/g, "");
    } else {
      this.GroupName = "";
    }
    let parentUrl = this.Parent.location.href;
    if (!parentUrl.includes("app=")) {
      parentUrl += "&" + document.location.href;
    }
    const appParam = this.GetParameterByName("app", parentUrl);
    if (appParam && appParam !== "0") {
      this.IsClassic = !1;
      if (appParam != "1") {
        this.IsMobileApp = true;
      }
      switch (appParam) {
        case "2":
          this.IsIOSApp = !0;
          this.IsWeb = !1;
          this.IsAndroidApp = !1;
          this.IsDevice = !0;
          break;
        case "3":
          this.IsAndroidApp = !0;
          this.IsWeb = !1;
          this.IsIOSApp = !1;
          this.IsDevice = !0;
      }
    }
    if (this.IsClassic) {
      this.SetClassicMode(true);
    } else {
      document.getElementById("actionbar").style.display = "block";
      document.getElementById("Overlays").innerHTML = "<div class=\"table\" style=\"height:100%; width:100%;background-color:#F9F9F9;\">\n                        <div class=\"row\" style=\"height:100%; width:100%\">\n                            <div class=\"cell\" style=\"height:100%; width:100%\">\n                            <iframe class=\"d-none\" width=\"100%\" height=\"100%\" id=\"selectorFrame\" align=\"top\" frameborder=\"0\"\n                                src=\"www/selector.html\"></iframe>\n                            <iframe class=\"d-none\" width=\"100%\" height=\"100%\" id=\"actionsFrame\" align=\"top\" frameborder=\"0\"\n                                src=\"www/actions.html\"></iframe>\n                            <iframe class=\"d-none\" width=\"100%\" height=\"100%\" id=\"settingsFrame\" align=\"top\" frameborder=\"0\"\n                                src=\"www/settings.html\"></iframe>\n                            </div>\n                        </div>\n                    </div>";
    }
    if (this.Notify.compatible()) {
      this.Notify.authorize();
    }
    this.Init();
  }
  GetParameterByName(paramName, url) {
    const searchStr = window.location.search.length ? window.location.search : window.location.href;
    const fullUrl = url || searchStr;
    const queryStr = fullUrl.includes("?") ? fullUrl.split("?")[1].split("#")[0] : "";
    const hashStr = fullUrl.includes("#") ? fullUrl.split("#")[1] : "";
    const cleanHash = hashStr.startsWith("!") ? hashStr.slice(1) : hashStr;
    return new URLSearchParams(queryStr + "&" + cleanHash).get(paramName);
  }
  CanInstallPWA() {
    return !!this.Parent?.deferredPrompt || !!/iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase()) && !window.navigator?.standalone;
  }
  SendStuff(orientation = -1) {
    let stuffObj = {};
    let flags = 0;
    this.IsLandscape = window.innerHeight <= window.innerWidth;
    switch (orientation) {
      case 0:
      case 180:
        this.IsLandscape = !1;
        break;
      case 90:
      case 270:
        this.IsLandscape = !0;
    }
    this.IsNarrow = window.innerWidth < 200;
    if (this.IsDevice) {
      flags |= 1;
    }
    if (this.IsWeb) {
      flags |= 2;
    }
    if (this.IsClassic) {
      flags |= 4;
    }
    if (this.IsLandscape) {
      flags |= 8;
    }
    if (this.IsNarrow) {
      flags |= 16;
    }
    if (this.IsAndroidApp) {
      flags |= 32;
    }
    if (this.IsIOSApp) {
      flags |= 64;
    }
    if (this.IsMobileApp) {
      flags |= 256;
    }
    if (this.Parent?.isPWA) {
      flags |= 128;
    }
    stuffObj.Flags = flags;
    stuffObj.origin = this.xConfig.origin;
    if (orientation >= 0) {
      stuffObj.Rotation = orientation;
    }
    this.SendC("sendStuff", JSON.stringify(stuffObj), "");
  }
  SetPage(pageName) {
    let isPop = !1;
    if (!pageName || pageName == "home") {
      return;
    }
    if (pageName == "pop" && this.CurrentPage == "classic") {
      isPop = true;
      pageName = this.CurrentPage;
    }
    let pageResult = this.SendC("SetPage", "", pageName);
    if (pageResult != -999) {
      if (!isPop && pageResult == this.CurrentPage) {
        return;
      }
      this.CurrentPage = pageResult;
      if (this.CurrentPage == "profile") {
        this.CurrentPage = "actions";
      }
      this.SendC("viewWillDisappear", "", "");
      const appFrame = document.getElementById("appframe");
      if (this.CurrentPage === "captcha") {
        const lastCmdJson = JSON.stringify(this.LastCommand);
        appFrame.src = "/web_gear/chat/AreYouaHuman.php?ts=1&m=3&j=" + lastCmdJson;
        addClass("d-none", "Overlays");
      } else {
        appFrame.onload = ev => {
          this.AppFrameLoaded = true;
          this.SendC("webViewDidFinishLoad", "", "");
          this.SendC("xatCommand", "", JSON.stringify({
            Command: "webViewDidFinishLoad"
          }));
          if (!this.IsClassic) {
            appFrame.contentDocument.body.classList.add("isApp");
          }
        };
        appFrame.src = "www/" + this.CurrentPage + ".html";
      }
    }
  }
  SetPageFromMenuItem(menuItem) {
    switch (menuItem) {
      case "buy":
        openBuyPage(true, document.getElementById("appframe").contentWindow);
        return;
      case "classic":
        if (!this.IsAndroidApp && !this.IsIOSApp) {
          this.SendC("xatCommand", "", JSON.stringify({
            Command: "GoWebChat"
          }));
          return;
        }
        this.SetClassicMode(!0);
        document.getElementById("appframe").src = "www/classic.html";
        this.SetPage(menuItem);
        return;
      case "profile":
        classicSetDialog("actions", 0);
        return;
      case "settings":
        classicSetDialog("settings", 0);
        return;
      case "logout":
        this.Selector.DoLoginEtc("LogoutOK");
        return;
      case "login":
        this.Selector.DoLoginEtc("LoginForm");
        return;
      case "install":
        this.Parent?.PWAinstall();
        return;
    }
    setFrameVis();
    this.SetPage(menuItem);
  }
  GetStuff(stuffJson) {
    LangFiles = this.LangFiles;
    Language = JSON.parse(stuffJson).lang;
    LoadLangAll();
  }
  QueueCommand(command) {
    if (command) {
      this.CommandsQueue.push(command);
    }
  }
  ProcessCommand(command) {
    if (typeof command == "string") {
      command = decodeURIComponent((command + "").replace(/\+/g, "%20"));
      command = JSON.parse(command);
    }
    if (!command) {
      return;
    }
    this.LastCommand = command;
    if (this.LastCommand.Type == "xtrace") {
      return;
    }
    let actionHero = this.LastCommand["this.LastActionHero"] ?? "";
    let savedId = this.LastCommand.SavedId ?? "";
    if (this.LastActionHero != actionHero || this.SavedId != savedId) {
      this.SavedId = savedId;
      this.LastActionHero = actionHero;
      this.SendC("LastActionHero", this.LastActionHero, this.SavedId);
    }
    const nextPage = this.LastCommand.Next;
    this.SendC("xatCommand", "", JSON.stringify(this.LastCommand));
    if (!this.IsClassic || nextPage == "captcha" || nextPage == "pop") {
      if (nextPage == "actions" && command.UserNo) {
        classicSetDialog(nextPage, command.UserNo);
      } else {
        this.SetPage(nextPage);
      }
    }
  }
  Base64ArrayBuffer(arrayBuffer) {
    const bytes = new Uint8Array(arrayBuffer);
    const byteLength = bytes.byteLength;
    const remainder = byteLength % 3;
    const mainLength = byteLength - remainder;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let chunk;
    let a;
    let b;
    let c;
    let d;
    let result = "";
    for (let i = 0; i < mainLength; i += 3) {
      chunk = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];
      a = (chunk & 16515072) >> 18;
      b = (chunk & 258048) >> 12;
      c = (chunk & 4032) >> 6;
      d = chunk & 63;
      result += chars[a] + chars[b] + chars[c] + chars[d];
    }
    if (remainder == 1) {
      chunk = bytes[mainLength];
      a = (chunk & 252) >> 2;
      b = (chunk & 3) << 4;
      result += chars[a] + chars[b] + "==";
    } else if (remainder == 2) {
      chunk = bytes[mainLength] << 8 | bytes[mainLength + 1];
      a = (chunk & 64512) >> 10;
      b = (chunk & 1008) >> 4;
      c = (chunk & 15) << 2;
      result += chars[a] + chars[b] + chars[c] + "=";
    }
    return result;
  }
  ToUTF8ArrayBuf(str) {
    const utf8Bytes = [];
    for (let i = 0; i < str.length; i++) {
      let charCode = str.charCodeAt(i);
      if (charCode < 128) {
        utf8Bytes.push(charCode);
      } else if (charCode < 2048) {
        utf8Bytes.push(charCode >> 6 | 192, charCode & 63 | 128);
      } else if (charCode < 55296 || charCode >= 57344) {
        utf8Bytes.push(charCode >> 12 | 224, charCode >> 6 & 63 | 128, charCode & 63 | 128);
      } else {
        i++;
        charCode = 65536 + ((charCode & 1023) << 10 | str.charCodeAt(i) & 1023);
        utf8Bytes.push(charCode >> 18 | 240, charCode >> 12 & 63 | 128, charCode >> 6 & 63 | 128, charCode & 63 | 128);
      }
    }
    const bufLength = utf8Bytes.length;
    const buffer = new ArrayBuffer(bufLength);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < bufLength; i++) {
      view[i] = utf8Bytes[i];
    }
    return buffer;
  }
  SendSock(data) {
    if (this.WebSocket) {
      const buf = this.ToUTF8ArrayBuf(data);
      this.WebSocket.send(buf);
    }
  }
  CloseSock() {
    this.IsSockOpen = !1;
    this.clickedTickleTab = !1;
    if (this.WebSocket) {
      this.SendSock("<C />");
      this.WebSocket.close();
      this.WebSocket = null;
      this.CustomGroupLang = null;
    }
  }
  PlayRadio(radioUrl) {
    if (this.Radio) {
      this.Radio.unload();
      this.Radio = null;
    }
    if (radioUrl && this.Volume[1] != 0 && (this.Sound & 2) != 0) {
      this.Radio = new Howl({
        src: [radioUrl],
        html5: true,
        volume: this.Volume[1] / 100
      });
      this.Radio.play();
    }
  }
  DoFifoNotification(fifoJson) {
    let parsed;
    const fifoItems = JSON.parse(fifoJson);
    const appFrameWindow = document.getElementById("appframe").contentWindow;
    for (let i = 0; i < fifoItems.length; i++) {
      if (fifoItems[i].charAt(0) == "{") {
        parsed = JSON.parse(fifoItems[i]);
        switch (parsed.Command) {
          case "CustLang":
            this.CustomGroupLang = parsed;
            GotLang({
              box: 0
            });
            break;
          case "SendSound":
            this.Volume = [this.xInt(parsed[1]), this.xInt(parsed[2]), this.xInt(parsed[3]), this.xInt(parsed[4])];
            this.Sound = this.xInt(parsed.w_sound);
            if (appFrameWindow.SetSpkIcon) {
              appFrameWindow.SetSpkIcon(this.Sound, parsed.HasRadio);
            }
            break;
          case "PlayRadio":
            if (!this.IsClassic) {
              break;
            }
            this.PlayRadio(parsed.Radio);
            break;
          case "PlaySound":
            if (parsed.isGoodfriend < 1 && (this.Volume[0] == 0 || (this.Sound & 1) == 0)) {
              break;
            }
            const soundUrl = "https://xat.com/content/sounds/" + parsed.Sound;
            try {
              new Howl({
                src: [soundUrl + ".webm", soundUrl + ".mp3"],
                volume: this.Volume[0] / 100
              }).play();
            } catch (err) {}
            break;
          case "ToSideapp":
            this.Parent?.postMessage(JSON.stringify(parsed), this.xConfig.origin);
            if (parsed.channel == 30012) {
              try {
                if (JSON.parse(parsed.msg).t.startsWith("DC_")) {
                  try {
                    localStorage.setItem("xatLive.isEnding", "true");
                    localStorage.removeItem("xatLive.isRunning");
                    localStorage.removeItem("xatLive.pendingCall");
                    localStorage.removeItem("xatLive.data");
                  } catch (err) {}
                }
              } catch {}
            }
            break;
          case "setCount":
            let countValue = parsed.setCount;
            const countEl = document.getElementById("idactcount");
            if (countValue > 0) {
              if (countValue > 9) {
                countValue = "9+";
              }
              countEl.innerText = countValue;
              countEl.style.visibility = "visible";
            } else {
              countEl.style.visibility = "hidden";
            }
            break;
          case "LocalNotify":
            if (!this.LocalNotify) {
              break;
            }
            if (!document[this.hidden]) {
              break;
            }
            this.Notify.show(parsed.n, parsed.t);
        }
      } else {
        try {
          appFrameWindow.eval(fifoItems[i].toString());
        } catch (err) {}
      }
    }
  }
  DoNotify(notifyType, notifyData) {
    switch (notifyType) {
      case "FifoNotification":
        if (!this.AppFrameLoaded) {
          this.FIFO.unshift(notifyData);
          return;
        }
        while (this.FIFO.length) {
          this.DoFifoNotification(this.FIFO.pop());
        }
        this.DoFifoNotification(notifyData);
        return;
      case "SetURL":
        if (!this.IsAndroidApp && !this.IsIOSApp) {
          let urlData = JSON.parse(notifyData);
          if (urlData && urlData[0].indexOf(this.xConfig.origin) >= 0) {
            urlData[0] += "?classic=1";
          }
          window.open(urlData[0], "_self");
        }
        return;
      case "SetGroupsPage":
        this.SetPage("groups");
        return;
      case "SetChatsPage":
        this.SetPage("chats");
        return;
      case "SetMePage":
        this.SetPage("profile");
        return;
      case "SetBackPage":
        this.SetPage("pop");
        return;
      case "SetVisitors":
        document.getElementById("appframe").contentWindow.openList(0, "visitors", 0);
        return;
    }
  }
  ProcessDataFromC(type, cmd, data) {
    console.log(".FromC", data);
    switch (this.xInt(type)) {
      case this.DEBUG:
        break;
      case this.SAVESOL:
        if (typeof Storage == "undefined") {
          break;
        }
        if (this.IsClassic || (!this.IsClassic && localStorage.getItem("mobCookies") == 1)) {
          localStorage.setItem(cmd, data);
        }
        break;
      case this.LOADSOL:
        if (typeof Storage == "undefined") {
          break;
        }
        if (this.IsClassic || (!this.IsClassic && localStorage.getItem("mobCcookies") == 1)) {
          localStorage.getItem(cmd);
          localStorage.setItem(cmd, data);
        }
        break;
      case this.LOG:
        break;
      case this.LOADURL:
        const xhr = new XMLHttpRequest();
        const url = cmd;
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              this.SendC("xatURL", xhr.responseURL, xhr.responseText);
            } else {
              console.log("LOADURL Err:" + xhr.status);
            }
          }
        };
        if (data) {
          xhr.open("POST", url, !0);
          xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          let postData = JSON.parse(data);
          data += "&ts=1";
          if (postData["g-recaptcha-response"]) {
            data += "&g-recaptcha-response=" + postData["g-recaptcha-response"];
          }
          xhr.send("json=" + data);
        } else {
          xhr.open("GET", url, !0);
          xhr.send();
        }
        break;
      case this.SEND:
        this.SendSock(data);
        break;
      case this.CLOSE:
        this.CloseSock();
        break;
      case this.CONNECT:
        const connectIp = "wss://wss.xat.com";
        const connectPort = 443;
        this.ConnectPort = this.xInt(connectPort) + "/v2";
        this.CloseSock();
        this.ConnectIp = connectIp;
        this.WebSocket = new WebSocket(this.ConnectIp + ":" + this.ConnectPort);
        this.WebSocket.binaryType = "arraybuffer";
        this.WebSocket.onopen = (ev) => {
          this.IsSockOpen = true;
          this.SendC("xatMessageReceived", "#CONNECT_OK", "");
          this.SendC("xatMessageOK", "#CONNECT_CHECK", btoa(window.location.host));
        };
        this.WebSocket.onclose = (ev) => {
          if (ev.code != 1000) {
            console.log("WebSocket CLOSE ERROR:" + ev.code);
          }
          this.SendC("xatMessageReceived", "#CONNECT_CLOSE", "");
          this.IsSockOpen = false;
        };
        this.WebSocket.onmessage = (ev) => {
          this.SendC("xatMessageReceived", "#MESSAGE", this.Base64ArrayBuffer(ev.data));
        };
        this.WebSocket.onerror = (ev) => {
          console.log("WebSocket ERROR");
        };
        break;
      case this.NOTIFY:
        this.DoNotify(cmd, data);
      case this.ALERT:
      case this.HTTP:
      case this.LANGS:
      case this.FINISHTRANSACTION:
    }
  }
  GotJsonFromC(jsonStr) {
    if (jsonStr && (jsonStr = JSON.parse(jsonStr))) {
      if ((jsonStr.Type == "1" || jsonStr.Type == "5" || jsonStr.Type == "10") && !!this.Settings?.toSave) {
        this.Settings?.doSave();
      }
      this.ProcessDataFromC(jsonStr.Type, jsonStr.Cmd, jsonStr.Data);
    }
  }
  SendC(cmd, arg1, arg2) {
    const cmdSize = (cmd.length * 2 + 1) * 2;
    const cmdPtr = Module._malloc(cmdSize);
    Module.stringToUTF8(cmd, cmdPtr, cmdSize);

    const arg1Size = (arg1.length * 2 + 1) * 2;
    const arg1Ptr = Module._malloc(arg1Size);
    Module.stringToUTF8(arg1, arg1Ptr, arg1Size);

    const arg2Size = (arg2.length * 2 + 1) * 2;
    const arg2Ptr = Module._malloc(arg2Size);
    Module.stringToUTF8(arg2, arg2Ptr, arg2Size);

    const resultPtr = Module.ccall(
      "cToC",
      null,
      ["number", "number", "number"],
      [cmdPtr, arg1Ptr, arg2Ptr]
    );
    const resultStr = UTF8ToString(resultPtr);
    Module._xFree(resultPtr);
    return resultStr;
  }
  onMore() {
    const dropdown = document.querySelector("#dropdown-content");
    if (dropdown) {
      const isHidden = dropdown.style.display == "none" || dropdown.style.display == "";
      dropdown.style.display = isHidden ? "block" : "none";
      if (isHidden) {
        if (this.MyId) {
          removeClass("d-none", "sp_logout");
          if (hasMobCookiesEnabled()) {
            removeClass("d-none", "sp_buy");
          } else {
            addClass("d-none", "sp_buy");
          }
          removeClass("d-none", "sp_store");
          addClass("d-none", "sp_login");
        } else {
          addClass("d-none", "sp_logout");
          addClass("d-none", "sp_buy");
          addClass("d-none", "sp_store");
          removeClass("d-none", "sp_login");
        }
        if (this.CurrentChat == "3") {
          addClass("d-none", "sp_visitors");
        } else {
          removeClass("d-none", "sp_visitors");
        }
      }
    }
  }
  ClickOnDom(ev) {
    if (ev && ev.target.classList.contains("menuOpen")) {
      return;
    }
    const dropdownContent = document.querySelector(".dropdown #dropdown-content");
    if (dropdownContent && dropdownContent.style.display == "block") {
      dropdownContent.style.display = "none";
    }
    const actionsFrame = findNodeInWindowOrParent("#actionsFrame");
    if (actionsFrame && actionsFrame.contentWindow && actionsFrame.contentWindow.document) {
      const dropdownContent2 = actionsFrame.contentWindow.document.querySelector(".dropdown-content2");
      if (dropdownContent2 && dropdownContent2.style.display == "block") {
        dropdownContent2.style.display = "none";
      }
    }
    this.Quickbar?.shouldCloseQuickBar(ev);
  }
  SetClassicMode(enable) {
    if (enable) {
      this.clearDivAct("Overlays");
      var actionBar = document.getElementById("actionbar");
      actionBar.style.height = "0%";
      actionBar.style.display = "none";
      document.getElementById("app").style.height = "100%";
    }
  }
  OnMessage(ev) {
    console.log("OnMessage: ", ev);
    if (ev.origin !== this.xConfig.origin) {
      console.log("onMessage Bad Origin=", ev.origin, ev);
      return;
    }
    let data;
    try {
      data = JSON.parse(ev.data);
    } catch (err) {
      return;
    }
    if (data.action != "sideload") {
      if (data.action != "kissDone" && data.action != "kissClick") {
        if (data.Command != "ToSideapp" && data.action != "kissLoaded") {
          this.SendC("xatCommand", "", JSON.stringify({
            Command: "lcAppToChat",
            channel: data.channel,
            user: data.user,
            msg: data.msg
          }));
        }
      } else {
        this.clearDivAct("kissContainer").style.display = "none";
      }
    } else if (this.Parent) {
      this.Parent.postMessage(ev.data, this.xConfig.origin);
    }
  }
  LoadModules() {
    let browser;
    const userAgent = navigator.userAgent;
    const browsers = ["Chrome", "Edge", "Firefox", "Safari", "OPR", "MSIE", "Trident"];
    for (let i = 0; i < browsers.length; i++) {
      if (userAgent.indexOf(browsers[i]) > -1) {
        browser = browsers[i];
        break;
      }
    }
    switch (browser) {
      case "Chrome":
      case "Firefox":
      case "OPR":
        this.LoadJsModule("www/firebase.js");
    }
    this.LoadJsModule("/content/js/howler.min.js");
  }
  LoadJsModule(path, doReject) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = path;
      script.async = !0;
      script.onload = (ev) => resolve();
      script.onerror = (ev) => {
        const errorMsg = "file not found: " + path;
        if (!doReject) {
          throw errorMsg;
        }
        reject(errorMsg);
      };
      document.head.appendChild(script);
    });
  }
  ConnectToC() {
    if (this.UseWsCore) {
      const wsCoreUrl = "ws://tst763459.xat.com:8081";
      this.WsCore = new WebSocket(wsCoreUrl);
      this.WsCore.onopen = () => {
        console.log("WSCORE: Connection opened");
        this.StartChat();
      };
      this.WsCore.onmessage = (ev) => {
        const match = ev.data.match(/:(.*?):(.*)/);
        switch (match[1]) {
          case "getUserno":
            break;
          case "xatInit":
            this.MyId = match[2];
            this.Init();
            break;
          case "getStuff":
            this.GetStuff(match[2]);
            break;
          case "ConsoleOff":
            this.ConsoleOff = match[2] == "1";
            break;
          case "SetPage":
            this.SetPage(match[2]);
            break;
          case "ReadToJavaFifo":
          case "xatTick":
            this.GotJsonFromC(match[2]);
        }
      };
      this.WsCore.onclose = () => {
        console.log("WSCORE: Connection closed");
      };
    } else if (window.WebAssembly) {
      this.LoadJsModule("xatcorewasm.php", 1).then((ev) => {}, (ev) => {
        this.LoadJsModule("xatcore.php");
      });
    } else {
      this.LoadJsModule("xatcore.php");
    }
  }
  xInt(val) {
    val = parseInt(val);
    if (isNaN(val)) {
      return 0;
    } else {
      return val;
    }
  }
  InitLocalNotify() {
    const self = this;
    this.Notify = {
      list: [],
      id: 0,
      compatible: function () {
        return typeof Notification != "undefined" || (console.error("FBM:Notifications are not available for your browser."), !1);
      },
      authorize: function () {
        if (this.compatible()) {
          Notification.requestPermission(function (perm) {
            self.LocalNotify = perm == "granted";
          });
        }
      },
      show: function (title, body) {
        if (!self.LocalNotify) {
          return;
        }
        this.id++;
        const id = this.id;
        this.list[id] = new Notification(title, {
          body: body,
          tag: id,
          icon: "https://xat.com/images/planet.svg",
          lang: "",
          dir: "auto"
        });
        this.logEvent("Notification #" + id + " queued for display");
        this.list[id].onclick = () => {
          this.logEvent(id, "clicked");
        };
        this.list[id].onshow = () => {
          this.logEvent(id, "showed");
        };
        this.list[id].onerror = () => {
          this.logEvent(id, "errored");
        };
        this.list[id].onclose = () => {
          this.logEvent(id, "closed");
        };
      },
      logEvent: function (id, ev) {}
    };
  }
  initFocusChange() {
    if (document.hidden !== undefined) {
      this.hidden = "hidden";
    } else if (document.msHidden !== undefined) {
      this.hidden = "msHidden";
    } else if (document.webkitHidden !== undefined) {
      this.hidden = "webkitHidden";
    }
  }
  GetInstance() {
    return this.instance;
  }
  setVoteURLFromServerData(data) {
    try {
      data = JSON.parse(data);
      const url = "/json/vote.php?id=" + data.user + "&roomid=" + data.room + "&cb=" + data.cb;
      this.voteURLs.get = url;
      this.voteURLs.post = url + "&i=" + data.i + "&s=" + data.s + "&t=" + data.t + "&k=" + data.k;
    } catch (err) {}
  }
  AreWeOnEmbed() {
    const referrer = document.referrer;
    return /:\/\/xat\.com\/embed\/chat(\d*|\.php)/.test(referrer);
  }
  async returnPermissionForStorageAccess() {
    if (!this.AreWeOnEmbed() || !this.IsClassic) {
      return !1;
    }
    if (!document.hasStorageAccess) {
      return this.PERMISSIONS.granted;
    }
    if (await document.hasStorageAccess()) {
      return this.PERMISSIONS.granted;
    }
    try {
      return (await navigator.permissions.query({
        name: "storage-access"
      })).state || this.PERMISSIONS.denied;
    } catch (err) {
      return !1;
    }
  }
  setNewTodoAndReload() {
    try {
      const todoData = JSON.parse(localStorage.getItem("todo")) ?? {};
      const scaCookie = this.getCookie("sca");
      if (scaCookie && scaCookie.includes(",")) {
        const [deviceId, passHash, userNo] = scaCookie.split(",").filter(Boolean);
        if (!Object.keys(todoData).length || !todoData.w_registered || todoData.DeviceId !== deviceId || todoData.PassHash !== passHash) {
          todoData.DeviceId = deviceId;
          todoData.PassHash = passHash;
          todoData.w_userno = userNo;
          todoData.MobNo = "";
          localStorage.setItem("todo", JSON.stringify(todoData));
        }
      }
    } catch (err) {
      console.error("An error occurred while setting new todo and reloading:", err);
    }
  }
  async requestStorageAccessApi() {
    try {
      await document.requestStorageAccess();
      this.setNewTodoAndReload();
    } catch (err) {
      console.log("access denied");
    }
  }
  getCookie(name) {
    const prefix = name + "=";
    const cookies = document.cookie.split(";");
    if (!cookies.length) {
      return null;
    }
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(prefix) === 0) {
        return cookie.substring(prefix.length, cookie.length);
      }
    }
    return null;
  }
  clearDivAct(elementId, element) {
    if (typeof clearDiv != "function") {
      element ||= document.getElementById(elementId);
      if (element) {
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
      }
      return element;
    }
    return clearDiv(elementId, element);
  }
  clearLiveStats() {
    localStorage.removeItem("xatLive.isRunning");
    localStorage.removeItem("xatLive.isEnding");
    localStorage.removeItem("xatLive.data");
  }
  setCstyleJson(json) {
    json ||= "{}";
    this.cStyle = json;
  }
  CanUseFlix() {
    return _Activity.instance.UserSettings?.flix !== "disable";
  }
  initFlix(data) {
    if (data.ef === "0" || this.IsFlixActive || !this.IsClassic || !this.CanUseFlix()) {
      return;
    }
    this.FlixChatId = data.cg;
    const effectId = data.ef || 0;
    const flixName = data.fl + "_" + effectId;
    const background = data.bk == null || xInt(data.bk) ? data.fl + "_" + (data.bk || "1") : undefined;
    const width = window.innerWidth + 1;
    const height = window.innerHeight + 1;
    const x = xInt(data.XX) || 0;
    const y = xInt(data.YY) || 0;
    const scale = xInt(data.SC) || 100;
    const option1 = xInt(data.Opt) || 256;
    const option2 = xInt(data.Op2) || 0;
    const priority = xInt(data.PR) || 0;
    const power = xInt(data.pw) || 0;
    const sm = data.SM || undefined;
    const colors = data.col?.split("#");
    let colorArray = [65280, 128];
    for (let i in colors) {
      colorArray[i] = Number("0x" + colors[i]);
    }
    const num = xInt(data.NUM) || 0;
    const gt = xInt(data.GT) || 0;
    const ba = xInt(data.BA) || 100;
    const ga = xInt(data.GA) || 100;
    const bt = xInt(data.BT) || 0;
    const script = document.createElement("script");
    script.src = "./www/flix.js";
    script.async = !1;
    script.onload = (ev) => {
      const flixArgs = {
        WW: width,
        HH: height,
        XX: x,
        YY: y,
        SC: scale,
        BG: background,
        PR: priority,
        PW: power,
        SM: sm,
        NUM: num,
        GT: gt,
        Op2: option2,
        BA: ba,
        GA: ga,
        BT: bt
      };
      const flixConfig = {
        Flix: flixName,
        Args: flixArgs,
        Cols: colorArray,
        Text: ["", ""],
        Opt: option1
      };
      FlixStart(flixConfig);
    };
    script.onerror = (err) => {
      const errorMsg = "File not found: flix.js";
      if (!doReject) {
        throw errorMsg;
      }
      reject(errorMsg);
    };
    document.head.appendChild(script);
  }
  SetFlixVisible(visible) {
    this.IsFlixVisible = visible;
    const display = visible ? "block" : "none";
    document.getElementById("flix_canvas").style.display = display;
  }
  DestroyFlix() {
    if (this.IsFlixActive) {
      FlixDestructor();
      this.IsFlixActive = false;
    }
  }
  HandleFlix(flixCode) {
    if (!this.IsFlixActive) return false;
    const parts = flixCode.split("_");
    if (parts.length > 1) {
      this.SetFlixVisible(false);
      return false;
    }
    if ((this.FlixChatId !== parts[0] && parts[0] !== "10") || !this.CanUseFlix()) {
      this.DestroyFlix();
      return false;
    }
    this.SetFlixVisible(true);
    WakeFlixBackground();
    return true;
  }
  setPawnHueValues(data) {
    if (!data) {
      return;
    }
    const minColorInt = parseInt(data.PawnHueMinColor, 10);
    const maxColorInt = parseInt(data.PawnHueMaxColor, 10);
    const minColorHex = "#" + minColorInt.toString(16).padStart(6, "0");
    const maxColorHex = "#" + maxColorInt.toString(16).padStart(6, "0");
    const minValue = data.PawnHueMinValue;
    const maxValue = data.PawnHueMaxValue;
    const previewPawn = data.PreviewPawn;
    this.pawnHueData[0] = minColorHex;
    this.pawnHueData[1] = maxColorHex;
    this.pawnHueData[2] = minValue;
    this.pawnHueData[3] = maxValue;
    this.pawnHuePreviewCode = previewPawn;
    this.Settings.pawnHueData = this.pawnHueData;
    this.Settings.setCurrentPawnPreview(this.pawnHuePreviewCode);
    this.Settings.setPawnHueSliderColor(minColorHex, maxColorHex);
  }
}
var _Activity = window._Activity = new Activity();