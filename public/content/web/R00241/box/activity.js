
// === IXAT: Override WebSocket connection to private server ===
var _origWebSocket = WebSocket;
var _ixatWS = function(url, protocols) {
  // Redirect any xat.com WebSocket to our server
  var wsProto = location.protocol === 'https:' ? 'wss:' : 'ws:';
  var newUrl = wsProto + '//' + location.host + '/ws';
  console.log('[ixat] WebSocket redirect: ' + url + ' -> ' + newUrl);
  return new _origWebSocket(newUrl, protocols);
};
_ixatWS.CONNECTING = _origWebSocket.CONNECTING;
_ixatWS.OPEN = _origWebSocket.OPEN;
_ixatWS.CLOSING = _origWebSocket.CLOSING;
_ixatWS.CLOSED = _origWebSocket.CLOSED;
_ixatWS.prototype = _origWebSocket.prototype;
WebSocket = _ixatWS;
// === END IXAT OVERRIDE ===

// Module is provided by xatcore-js.js (JS WASM replacement)
var Module = window.Module || {};
var ReleaseMode = 0;
const kTickeTab = "10";
class Activity {
  constructor() {
    if (Activity.instance) {
      return Activity.instance;
    }
    const _0x3db854 = {
      name: "box",
      origin: "http://localhost:6969",
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
    this.xConfig = _0x3db854;
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
    console.log = function (_0x4605b4, _0x482c4c, _0x309f8c) {
      return function () {
        this.xConfig.debugNoLogs;
      }.bind(this);
    }.bind(this)(console.log.bind(console), this.xConfig.name, this.xConfig.debugLogIgnore);
    this.returnPermissionForStorageAccess().then(_0x155c9a => {
      if (_0x155c9a === this.PERMISSIONS.granted) {
        return this.requestStorageAccessApi();
      }
    });
    this.InitLocalNotify();
    this.initFocusChange();
    this.clearLiveStats();
    Module = {
      preRun: [],
      postRun: [this.StartChat.bind(this)],
      print: function (_0x4d6dd5) {
        if (arguments.length > 1) {
          _0x4d6dd5 = Array.prototype.slice.call(arguments).join(" ");
        }
        _0x4d6dd5 = String(_0x4d6dd5).replace(/\/n/g, "\n");
      },
      printErr: function (_0x428e99) {
        if (arguments.length > 1) {
          _0x428e99 = Array.prototype.slice.call(arguments).join(" ");
        }
        console.error("!printErr=" + _0x428e99);
      },
      canvas: [],
      setStatus: function (_0x19691d) {
        if (arguments.length > 1) {
          _0x19691d = Array.prototype.slice.call(arguments).join(" ");
        }
      },
      totalDependencies: 0,
      monitorRunDependencies: function (_0x3c9781) {
        this.totalDependencies = Math.max(this.totalDependencies, _0x3c9781);
        this.setStatus(_0x3c9781 ? "Preparing... (" + (this.totalDependencies - _0x3c9781) + "/" + this.totalDependencies + ")" : "All downloads complete.");
      }
    };
    window.onerror = () => {
      Module.setStatus("Exception thrown, see JavaScript console");
      Module.setStatus = _0x173a40 => {
        if (_0x173a40) {
          Module.printErr("[post-exception status] " + _0x173a40);
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
    window.addEventListener("orientationchange", _0x35c3eb => {
      const _0x20fbd2 = _0x35c3eb.target.screen.orientation ? _0x35c3eb.target.screen.orientation.angle : window.orientation;
      this.SendStuff(_0x20fbd2);
      this.SendC("xatCommand", "", JSON.stringify({
        Command: "Refresh"
      }));
    });
  }
  Init() {
    console.log('[ixat] Init() called');
    if (this.Parent && !this.Parent.deferredPrompt) {
      this.Parent.sendStuff = this.SendStuff;
    }
    this.SendStuff();
    const _0x1de4db = this.SendC("xatInit", "", "");
    console.log('[ixat] xatInit returned:', _0x1de4db);
    if (_0x1de4db == -999) {
      console.warn('[ixat] xatInit returned -999 (WASM not ready), forcing classic mode');
      // Force classic.html to load even without WASM
      document.getElementById("appframe").src = "www/classic.html";
      return;
    }
    this.MyId = _0x1de4db;
    this.UserSettings = JSON.parse(localStorage.getItem("Settings")) ?? {};
    if (this.IsClassic) {
      this.SetPage("classic");
    } else if (this.GroupName) {
      this.SetPage("messages");
    } else if (_0x1de4db == 0) {
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
      const _0x2f63c2 = ["home", "profile", "friends", "chats", "groups", "settings", "store", "buy", "help", "visitors", "classic", "logout", "login", "install"];
      for (let _0x1e39eb in _0x2f63c2) {
        const _0x58437b = document.getElementById("sp_" + _0x2f63c2[_0x1e39eb]);
        if (_0x58437b) {
          _0x58437b.menuItem = _0x2f63c2[_0x1e39eb];
          _0x58437b.addEventListener("click", _0x3d8ce3 => this.SetPageFromMenuItem(_0x3d8ce3.currentTarget.menuItem));
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
    const _0x2b9fd4 = this.SendC("getStuff", "", "");
    if (_0x2b9fd4 != -999) {
      this.GetStuff(_0x2b9fd4);
    }
    window.addEventListener("message", this.OnMessage.bind(this), !1);
    window.setInterval(this.Tick.bind(this), 1000 / this.TickFPS);
  }
  Tick() {
    if (this.PagesLoaded) {
      let _0x40f5f1 = this.SendC("xatTick", "", "");
      if (_0x40f5f1 != -999) {
        while (_0x40f5f1) {
          this.GotJsonFromC(_0x40f5f1);
          _0x40f5f1 = this.SendC("ReadToJavaFifo", "", "");
        }
      }
      if (this.OfflinePushToken) {
        this.SendC("setToken", "", this.OfflinePushToken);
        this.OfflinePushToken = "";
      }
      this.TickQueue.forEach(_0x1d4660 => _0x1d4660());
      this.ProcessCommand(this.CommandsQueue.shift());
    } else {
      this.PagesLoaded = this.IsClassic;
      let _0x2b6bc8 = 0;
      const _0x785c73 = ["actions", "settings", "selector"];
      if (!this.PagesLoaded) {
        _0x785c73.forEach(_0x25e5f3 => {
          const _0x28b89e = document.getElementById(_0x25e5f3 + "Frame");
          if (_0x28b89e && _0x28b89e.contentWindow[_0x25e5f3]) {
            _0x2b6bc8++;
          }
        });
      }
      if (this.PagesLoaded || _0x2b6bc8 == _0x785c73.length) {
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
    console.log('[ixat] StartChat() called');
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
    let _0x1e7adb = this.Parent.location.href;
    if (!_0x1e7adb.includes("app=")) {
      _0x1e7adb += "&" + document.location.href;
    }
    const _0x4e9b5e = this.GetParameterByName("app", _0x1e7adb);
    if (_0x4e9b5e && _0x4e9b5e !== "0") {
      this.IsClassic = !1;
      if (_0x4e9b5e != "1") {
        this.IsMobileApp = true;
      }
      switch (_0x4e9b5e) {
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
  GetParameterByName(_0x40e2f4, _0x444abb) {
    const _0x294d1e = window.location.search.length ? window.location.search : window.location.href;
    const _0x5a4e88 = _0x444abb || _0x294d1e;
    const _0x1682b5 = _0x5a4e88.includes("?") ? _0x5a4e88.split("?")[1].split("#")[0] : "";
    const _0x31bd62 = _0x5a4e88.includes("#") ? _0x5a4e88.split("#")[1] : "";
    const _0x3060ac = _0x31bd62.startsWith("!") ? _0x31bd62.slice(1) : _0x31bd62;
    return new URLSearchParams(_0x1682b5 + "&" + _0x3060ac).get(_0x40e2f4);
  }
  CanInstallPWA() {
    return !!this.Parent?.deferredPrompt || !!/iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase()) && !window.navigator?.standalone;
  }
  SendStuff(_0x4367b7 = -1) {
    let _0x14cd85 = {};
    let _0x5b8bb9 = 0;
    this.IsLandscape = window.innerHeight <= window.innerWidth;
    switch (_0x4367b7) {
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
      _0x5b8bb9 |= 1;
    }
    if (this.IsWeb) {
      _0x5b8bb9 |= 2;
    }
    if (this.IsClassic) {
      _0x5b8bb9 |= 4;
    }
    if (this.IsLandscape) {
      _0x5b8bb9 |= 8;
    }
    if (this.IsNarrow) {
      _0x5b8bb9 |= 16;
    }
    if (this.IsAndroidApp) {
      _0x5b8bb9 |= 32;
    }
    if (this.IsIOSApp) {
      _0x5b8bb9 |= 64;
    }
    if (this.IsMobileApp) {
      _0x5b8bb9 |= 256;
    }
    if (this.Parent?.isPWA) {
      _0x5b8bb9 |= 128;
    }
    _0x14cd85.Flags = _0x5b8bb9;
    _0x14cd85.origin = this.xConfig.origin;
    if (_0x4367b7 >= 0) {
      _0x14cd85.Rotation = _0x4367b7;
    }
    this.SendC("sendStuff", JSON.stringify(_0x14cd85), "");
  }
  SetPage(_0x4c9c17) {
    let _0x508db7 = !1;
    if (!_0x4c9c17 || _0x4c9c17 == "home") {
      return;
    }
    if (_0x4c9c17 == "pop" && this.CurrentPage == "classic") {
      _0x508db7 = true;
      _0x4c9c17 = this.CurrentPage;
    }
    let _0x45a611 = this.SendC("SetPage", "", _0x4c9c17);
    if (_0x45a611 != -999) {
      if (!_0x508db7 && _0x45a611 == this.CurrentPage) {
        return;
      }
      this.CurrentPage = _0x45a611;
      if (this.CurrentPage == "profile") {
        this.CurrentPage = "actions";
      }
      this.SendC("viewWillDisappear", "", "");
      const _0x65dd94 = document.getElementById("appframe");
      if (this.CurrentPage === "captcha") {
        const _0x39e484 = JSON.stringify(this.LastCommand);
        _0x65dd94.src = "/web_gear/chat/AreYouaHuman.php?ts=1&m=3&j=" + _0x39e484;
        addClass("d-none", "Overlays");
      } else {
        _0x65dd94.onload = _0x4d9e23 => {
          this.AppFrameLoaded = true;
          this.SendC("webViewDidFinishLoad", "", "");
          this.SendC("xatCommand", "", JSON.stringify({
            Command: "webViewDidFinishLoad"
          }));
          if (!this.IsClassic) {
            _0x65dd94.contentDocument.body.classList.add("isApp");
          }
        };
        _0x65dd94.src = "www/" + this.CurrentPage + ".html";
      }
    }
  }
  SetPageFromMenuItem(_0x280d02) {
    switch (_0x280d02) {
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
        this.SetPage(_0x280d02);
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
    this.SetPage(_0x280d02);
  }
  GetStuff(_0x11dd90) {
    LangFiles = this.LangFiles;
    Language = JSON.parse(_0x11dd90).lang;
    LoadLangAll();
  }
  QueueCommand(_0x54934a) {
    if (_0x54934a) {
      this.CommandsQueue.push(_0x54934a);
    }
  }
  ProcessCommand(_0x5a25d7) {
    if (typeof _0x5a25d7 == "string") {
      _0x5a25d7 = decodeURIComponent((_0x5a25d7 + "").replace(/\+/g, "%20"));
      _0x5a25d7 = JSON.parse(_0x5a25d7);
    }
    if (!_0x5a25d7) {
      return;
    }
    this.LastCommand = _0x5a25d7;
    if (this.LastCommand.Type == "xtrace") {
      return;
    }
    let _0x3818e0 = this.LastCommand["this.LastActionHero"] ?? "";
    let _0x27100c = this.LastCommand.SavedId ?? "";
    if (this.LastActionHero != _0x3818e0 || this.SavedId != _0x27100c) {
      this.SavedId = _0x27100c;
      this.LastActionHero = _0x3818e0;
      this.SendC("LastActionHero", this.LastActionHero, this.SavedId);
    }
    const _0x1e9397 = this.LastCommand.Next;
    this.SendC("xatCommand", "", JSON.stringify(this.LastCommand));
    if (!this.IsClassic || _0x1e9397 == "captcha" || _0x1e9397 == "pop") {
      if (_0x1e9397 == "actions" && _0x5a25d7.UserNo) {
        classicSetDialog(_0x1e9397, _0x5a25d7.UserNo);
      } else {
        this.SetPage(_0x1e9397);
      }
    }
  }
  Base64ArrayBuffer(_0x2d23d8) {
    const _0x7e1126 = new Uint8Array(_0x2d23d8);
    const _0x40ce33 = _0x7e1126.byteLength;
    const _0x361e42 = _0x40ce33 % 3;
    const _0x32e3da = _0x40ce33 - _0x361e42;
    const _0x6567a7 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let _0xbfc15c;
    let _0x2c979d;
    let _0x9db0bf;
    let _0x56e4f3;
    let _0x3774fa;
    let _0xde55e0 = "";
    for (let _0x93609 = 0; _0x93609 < _0x32e3da; _0x93609 += 3) {
      _0xbfc15c = _0x7e1126[_0x93609] << 16 | _0x7e1126[_0x93609 + 1] << 8 | _0x7e1126[_0x93609 + 2];
      _0x2c979d = (_0xbfc15c & 16515072) >> 18;
      _0x9db0bf = (_0xbfc15c & 258048) >> 12;
      _0x56e4f3 = (_0xbfc15c & 4032) >> 6;
      _0x3774fa = _0xbfc15c & 63;
      _0xde55e0 += _0x6567a7[_0x2c979d] + _0x6567a7[_0x9db0bf] + _0x6567a7[_0x56e4f3] + _0x6567a7[_0x3774fa];
    }
    if (_0x361e42 == 1) {
      _0xbfc15c = _0x7e1126[_0x32e3da];
      _0x2c979d = (_0xbfc15c & 252) >> 2;
      _0x9db0bf = (_0xbfc15c & 3) << 4;
      _0xde55e0 += _0x6567a7[_0x2c979d] + _0x6567a7[_0x9db0bf] + "==";
    } else if (_0x361e42 == 2) {
      _0xbfc15c = _0x7e1126[_0x32e3da] << 8 | _0x7e1126[_0x32e3da + 1];
      _0x2c979d = (_0xbfc15c & 64512) >> 10;
      _0x9db0bf = (_0xbfc15c & 1008) >> 4;
      _0x56e4f3 = (_0xbfc15c & 15) << 2;
      _0xde55e0 += _0x6567a7[_0x2c979d] + _0x6567a7[_0x9db0bf] + _0x6567a7[_0x56e4f3] + "=";
    }
    return _0xde55e0;
  }
  ToUTF8ArrayBuf(_0x1f3dbc) {
    const _0x3e24f9 = [];
    for (let _0x653186 = 0; _0x653186 < _0x1f3dbc.length; _0x653186++) {
      let _0x3f6c39 = _0x1f3dbc.charCodeAt(_0x653186);
      if (_0x3f6c39 < 128) {
        _0x3e24f9.push(_0x3f6c39);
      } else if (_0x3f6c39 < 2048) {
        _0x3e24f9.push(_0x3f6c39 >> 6 | 192, _0x3f6c39 & 63 | 128);
      } else if (_0x3f6c39 < 55296 || _0x3f6c39 >= 57344) {
        _0x3e24f9.push(_0x3f6c39 >> 12 | 224, _0x3f6c39 >> 6 & 63 | 128, _0x3f6c39 & 63 | 128);
      } else {
        _0x653186++;
        _0x3f6c39 = 65536 + ((_0x3f6c39 & 1023) << 10 | _0x1f3dbc.charCodeAt(_0x653186) & 1023);
        _0x3e24f9.push(_0x3f6c39 >> 18 | 240, _0x3f6c39 >> 12 & 63 | 128, _0x3f6c39 >> 6 & 63 | 128, _0x3f6c39 & 63 | 128);
      }
    }
    const _0x51816d = _0x3e24f9.length;
    const _0x37c670 = new ArrayBuffer(_0x51816d);
    const _0xbac306 = new Uint8Array(_0x37c670);
    for (let _0xbccf0d = 0; _0xbccf0d < _0x51816d; _0xbccf0d++) {
      _0xbac306[_0xbccf0d] = _0x3e24f9[_0xbccf0d];
    }
    return _0x37c670;
  }
  SendSock(_0x2b2882) {
    if (this.WebSocket) {
      const _0x201548 = this.ToUTF8ArrayBuf(_0x2b2882);
      this.WebSocket.send(_0x201548);
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
  PlayRadio(_0x1b86ed) {
    if (this.Radio) {
      this.Radio.unload();
      this.Radio = null;
    }
    if (_0x1b86ed && this.Volume[1] != 0 && (this.Sound & 2) != 0) {
      this.Radio = new Howl({
        src: [_0x1b86ed],
        html5: true,
        volume: this.Volume[1] / 100
      });
      this.Radio.play();
    }
  }
  DoFifoNotification(_0xc6f073) {
    let _0x68d46e;
    const _0x68482f = JSON.parse(_0xc6f073);
    const _0x41666e = document.getElementById("appframe").contentWindow;
    for (let _0x34e541 = 0; _0x34e541 < _0x68482f.length; _0x34e541++) {
      if (_0x68482f[_0x34e541].charAt(0) == "{") {
        _0x68d46e = JSON.parse(_0x68482f[_0x34e541]);
        switch (_0x68d46e.Command) {
          case "CustLang":
            this.CustomGroupLang = _0x68d46e;
            GotLang({
              box: 0
            });
            break;
          case "SendSound":
            this.Volume = [this.xInt(_0x68d46e[1]), this.xInt(_0x68d46e[2]), this.xInt(_0x68d46e[3]), this.xInt(_0x68d46e[4])];
            this.Sound = this.xInt(_0x68d46e.w_sound);
            if (_0x41666e.SetSpkIcon) {
              _0x41666e.SetSpkIcon(this.Sound, _0x68d46e.HasRadio);
            }
            break;
          case "PlayRadio":
            if (!this.IsClassic) {
              break;
            }
            this.PlayRadio(_0x68d46e.Radio);
            break;
          case "PlaySound":
            if (_0x68d46e.isGoodfriend < 1 && (this.Volume[0] == 0 || (this.Sound & 1) == 0)) {
              break;
            }
            const _0x35f2d5 = "http://localhost:6969/content/sounds/" + _0x68d46e.Sound;
            try {
              new Howl({
                src: [_0x35f2d5 + ".webm", _0x35f2d5 + ".mp3"],
                volume: this.Volume[0] / 100
              }).play();
            } catch (_0x3a30de) {}
            break;
          case "ToSideapp":
            this.Parent?.postMessage(JSON.stringify(_0x68d46e), this.xConfig.origin);
            if (_0x68d46e.channel == 30012) {
              try {
                if (JSON.parse(_0x68d46e.msg).t.startsWith("DC_")) {
                  try {
                    localStorage.setItem("xatLive.isEnding", "true");
                    localStorage.removeItem("xatLive.isRunning");
                    localStorage.removeItem("xatLive.pendingCall");
                    localStorage.removeItem("xatLive.data");
                  } catch (_0x95b580) {}
                }
              } catch {}
            }
            break;
          case "setCount":
            let _0xbaa746 = _0x68d46e.setCount;
            const _0x1ded02 = document.getElementById("idactcount");
            if (_0xbaa746 > 0) {
              if (_0xbaa746 > 9) {
                _0xbaa746 = "9+";
              }
              _0x1ded02.innerText = _0xbaa746;
              _0x1ded02.style.visibility = "visible";
            } else {
              _0x1ded02.style.visibility = "hidden";
            }
            break;
          case "LocalNotify":
            if (!this.LocalNotify) {
              break;
            }
            if (!document[this.hidden]) {
              break;
            }
            this.Notify.show(_0x68d46e.n, _0x68d46e.t);
        }
      } else {
        try {
          _0x41666e.eval(_0x68482f[_0x34e541].toString());
        } catch (_0x2eebf9) { console.error('[DoFifoNotification] eval error:', _0x2eebf9, _0x68482f[_0x34e541].toString().substring(0, 200)); }
      }
    }
  }
  DoNotify(_0x10c441, _0x2dc8e5) {
    switch (_0x10c441) {
      case "FifoNotification":
        if (!this.AppFrameLoaded) {
          this.FIFO.unshift(_0x2dc8e5);
          return;
        }
        while (this.FIFO.length) {
          this.DoFifoNotification(this.FIFO.pop());
        }
        this.DoFifoNotification(_0x2dc8e5);
        return;
      case "SetURL":
        if (!this.IsAndroidApp && !this.IsIOSApp) {
          let _0x252a83 = JSON.parse(_0x2dc8e5);
          if (_0x252a83 && _0x252a83[0].indexOf(this.xConfig.origin) >= 0) {
            _0x252a83[0] += "?classic=1";
          }
          window.open(_0x252a83[0], "_self");
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
  ProcessDataFromC(_0x5290eb, _0x525c97, _0x23cd7f) {
    console.log("[ixat] FromC type=" + _0x5290eb + " cmd=" + _0x525c97?.substring?.(0,100), _0x23cd7f?.substring?.(0,200));
    switch (this.xInt(_0x5290eb)) {
      case this.DEBUG:
        break;
      case this.SAVESOL:
        if (typeof Storage == "undefined") {
          break;
        }
        if (this.IsClassic || !this.IsClassic && localStorage.getItem("mobCookies") == 1) {
          localStorage.setItem(_0x525c97, _0x23cd7f);
        }
        break;
      case this.LOADSOL:
        if (typeof Storage == "undefined") {
          break;
        }
        if (this.IsClassic || !this.IsClassic && localStorage.getItem("mobCcookies") == 1) {
          localStorage.getItem(_0x525c97);
          localStorage.setItem(_0x525c97, _0x23cd7f);
        }
        break;
      case this.LOG:
        break;
      case this.LOADURL:
        const _0x975916 = new XMLHttpRequest();
        const _0x2798c3 = _0x525c97;
        _0x975916.onreadystatechange = () => {
          if (_0x975916.readyState === 4) {
            if (_0x975916.status === 200) {
              this.SendC("xatURL", _0x975916.responseURL, _0x975916.responseText);
            } else {
              console.log("LOADURL Err:" + _0x975916.status);
            }
          }
        };
        if (_0x23cd7f) {
          _0x975916.open("POST", _0x2798c3, !0);
          _0x975916.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          let _0x8cb2a9 = JSON.parse(_0x23cd7f);
          _0x23cd7f += "&ts=1";
          if (_0x8cb2a9["g-recaptcha-response"]) {
            _0x23cd7f += "&g-recaptcha-response=" + _0x8cb2a9["g-recaptcha-response"];
          }
          _0x975916.send("json=" + _0x23cd7f);
        } else {
          _0x975916.open("GET", _0x2798c3, !0);
          _0x975916.send();
        }
        break;
      case this.SEND:
        this.SendSock(_0x23cd7f);
        break;
      case this.CLOSE:
        this.CloseSock();
        break;
      case this.CONNECT:
        _0x525c97 = "wss://wss.localhost:6969";
        _0x23cd7f = 443;
        this.ConnectPort = this.xInt(_0x23cd7f) + "/v2";
        this.CloseSock();
        this.ConnectIp = _0x525c97;
        this.WebSocket = new WebSocket(this.ConnectIp + ":" + this.ConnectPort);
        this.WebSocket.binaryType = "arraybuffer";
        this.WebSocket.onopen = _0x55efc0 => {
          this.IsSockOpen = true;
          this.SendC("xatMessageReceived", "#CONNECT_OK", "");
          this.SendC("xatMessageOK", "#CONNECT_CHECK", btoa(window.location.host));
        };
        this.WebSocket.onclose = _0x57e6a0 => {
          if (_0x57e6a0.code != 1000) {
            console.log("WebSocket CLOSE ERROR:" + _0x57e6a0.code);
          }
          this.SendC("xatMessageReceived", "#CONNECT_CLOSE", "");
          this.IsSockOpen = false;
        };
        this.WebSocket.onmessage = _0x2b510f => {
          this.SendC("xatMessageReceived", "#MESSAGE", this.Base64ArrayBuffer(_0x2b510f.data));
        };
        this.WebSocket.onerror = _0x4b3a8f => {
          console.log("WebSocket ERROR");
        };
        break;
      case this.NOTIFY:
        this.DoNotify(_0x525c97, _0x23cd7f);
      case this.ALERT:
      case this.HTTP:
      case this.LANGS:
      case this.FINISHTRANSACTION:
    }
  }
  GotJsonFromC(_0xd3f2f7) {
    if (_0xd3f2f7 &&= JSON.parse(_0xd3f2f7)) {
      if ((_0xd3f2f7.Type == "1" || _0xd3f2f7.Type == "5" || _0xd3f2f7.Type == "10") && !!this.Settings?.toSave) {
        this.Settings?.doSave();
      }
      this.ProcessDataFromC(_0xd3f2f7.Type, _0xd3f2f7.Cmd, _0xd3f2f7.Data);
    }
  }
  SendC(_0x33cf84, _0x4fa3ee, _0x3e4fc1) {
    console.log('[ixat] SendC:', _0x33cf84, _0x4fa3ee?.substring?.(0,80) || _0x4fa3ee, _0x3e4fc1?.substring?.(0,80) || _0x3e4fc1);
    var _0x553058 = (_0x33cf84.length * 2 + 1) * 2;
    var _0x3305b3 = Module._malloc(_0x553058);
    Module.stringToUTF8(_0x33cf84, _0x3305b3, _0x553058);
    var _0x244a24 = (_0x4fa3ee.length * 2 + 1) * 2;
    var _0x3dfd3c = Module._malloc(_0x244a24);
    Module.stringToUTF8(_0x4fa3ee, _0x3dfd3c, _0x244a24);
    var _0x47537f = (_0x3e4fc1.length * 2 + 1) * 2;
    var _0x27c14e = Module._malloc(_0x47537f);
    Module.stringToUTF8(_0x3e4fc1, _0x27c14e, _0x47537f);
    var _0xf34789 = Module.ccall("cToC", null, ["number", "number", "number"], [_0x3305b3, _0x3dfd3c, _0x27c14e]);
    var _0x5227b5 = UTF8ToString(_0xf34789);
    Module._xFree(_0xf34789);
    return _0x5227b5;
  }
  onMore() {
    const _0x6e7998 = document.querySelector("#dropdown-content");
    if (_0x6e7998) {
      const _0x4d2ea6 = _0x6e7998.style.display == "none" || _0x6e7998.style.display == "";
      _0x6e7998.style.display = _0x4d2ea6 ? "block" : "none";
      if (_0x4d2ea6) {
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
  ClickOnDom(_0x14cfd1) {
    if (_0x14cfd1 && _0x14cfd1.target.classList.contains("menuOpen")) {
      return;
    }
    const _0x4205b5 = document.querySelector(".dropdown #dropdown-content");
    if (_0x4205b5 && _0x4205b5.style.display == "block") {
      _0x4205b5.style.display = "none";
    }
    const _0x4ed786 = findNodeInWindowOrParent("#actionsFrame");
    if (_0x4ed786 && _0x4ed786.contentWindow && _0x4ed786.contentWindow.document) {
      const _0x39804c = _0x4ed786.contentWindow.document.querySelector(".dropdown-content2");
      if (_0x39804c && _0x39804c.style.display == "block") {
        _0x39804c.style.display = "none";
      }
    }
    this.Quickbar?.shouldCloseQuickBar(_0x14cfd1);
  }
  SetClassicMode(_0x278421) {
    if (_0x278421) {
      this.clearDivAct("Overlays");
      var _0x4fae32 = document.getElementById("actionbar");
      _0x4fae32.style.height = "0%";
      _0x4fae32.style.display = "none";
      document.getElementById("app").style.height = "100%";
    }
  }
  OnMessage(_0x364893) {
    console.log("OnMessage: ", _0x364893);
    if (_0x364893.origin !== this.xConfig.origin) {
      console.log("onMessage Bad Origin=", _0x364893.origin, _0x364893);
      return;
    }
    let _0x347949;
    try {
      _0x347949 = JSON.parse(_0x364893.data);
    } catch (_0x27ec81) {
      return;
    }
    if (_0x347949.action != "sideload") {
      if (_0x347949.action != "kissDone" && _0x347949.action != "kissClick") {
        if (_0x347949.Command != "ToSideapp" && _0x347949.action != "kissLoaded") {
          this.SendC("xatCommand", "", JSON.stringify({
            Command: "lcAppToChat",
            channel: _0x347949.channel,
            user: _0x347949.user,
            msg: _0x347949.msg
          }));
        }
      } else {
        this.clearDivAct("kissContainer").style.display = "none";
      }
    } else if (this.Parent) {
      this.Parent.postMessage(_0x364893.data, this.xConfig.origin);
    }
  }
  LoadModules() {
    let _0x341b4d;
    const _0x39ca63 = navigator.userAgent;
    const _0x412d34 = ["Chrome", "Edge", "Firefox", "Safari", "OPR", "MSIE", "Trident"];
    for (let _0x47b5df = 0; _0x47b5df < _0x412d34.length; _0x47b5df++) {
      if (_0x39ca63.indexOf(_0x412d34[_0x47b5df]) > -1) {
        _0x341b4d = _0x412d34[_0x47b5df];
        break;
      }
    }
    switch (_0x341b4d) {
      case "Chrome":
      case "Firefox":
      case "OPR":
        this.LoadJsModule("www/firebase.js");
    }
    this.LoadJsModule("/content/js/howler.min.js");
  }
  LoadJsModule(_0x71c8d5, _0x12f0e0) {
    return new Promise((_0x487fac, _0x7b9e2c) => {
      const _0x28afcb = document.createElement("script");
      _0x28afcb.src = _0x71c8d5;
      _0x28afcb.async = !0;
      _0x28afcb.onload = _0x21ccaf => _0x487fac();
      _0x28afcb.onerror = _0xb8f7c5 => {
        const _0x311391 = "file not found: " + _0x71c8d5;
        if (!_0x12f0e0) {
          throw _0x311391;
        }
        _0x7b9e2c(_0x311391);
      };
      document.head.appendChild(_0x28afcb);
    });
  }
  ConnectToC() {
    // [ixat] Skip WASM loading entirely - xatcore-js.js handles everything
    // The JS core patches SendC and triggers StartChat via polling interval
    console.log('[ixat] ConnectToC: Using JavaScript core (xatcore-js.js)');
  }
  xInt(_0x3fc330) {
    _0x3fc330 = parseInt(_0x3fc330);
    if (isNaN(_0x3fc330)) {
      return 0;
    } else {
      return _0x3fc330;
    }
  }
  InitLocalNotify() {
    const _0x2a55a2 = this;
    this.Notify = {
      list: [],
      id: 0,
      compatible: function () {
        return typeof Notification != "undefined" || (console.error("FBM:Notifications are not available for your browser."), !1);
      },
      authorize: function () {
        if (this.compatible()) {
          Notification.requestPermission(function (_0xf032d4) {
            _0x2a55a2.LocalNotify = _0xf032d4 == "granted";
          });
        }
      },
      show: function (_0x37ad6d, _0x44c16a) {
        if (!_0x2a55a2.LocalNotify) {
          return;
        }
        this.id++;
        const _0x257857 = this.id;
        this.list[_0x257857] = new Notification(_0x37ad6d, {
          body: _0x44c16a,
          tag: _0x257857,
          icon: "http://localhost:6969/images/planet.svg",
          lang: "",
          dir: "auto"
        });
        this.logEvent("Notification #" + _0x257857 + " queued for display");
        this.list[_0x257857].onclick = () => {
          this.logEvent(_0x257857, "clicked");
        };
        this.list[_0x257857].onshow = () => {
          this.logEvent(_0x257857, "showed");
        };
        this.list[_0x257857].onerror = () => {
          this.logEvent(_0x257857, "errored");
        };
        this.list[_0x257857].onclose = () => {
          this.logEvent(_0x257857, "closed");
        };
      },
      logEvent: function (_0x2a6d56, _0x2b6fc0) {}
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
  setVoteURLFromServerData(_0x112810) {
    try {
      const _0x527156 = "/json/vote.php?id=" + (_0x112810 = JSON.parse(_0x112810)).user + "&roomid=" + _0x112810.room + "&cb=" + _0x112810.cb;
      this.voteURLs.get = _0x527156;
      this.voteURLs.post = _0x527156 + "&i=" + _0x112810.i + "&s=" + _0x112810.s + "&t=" + _0x112810.t + "&k=" + _0x112810.k;
    } catch (_0x3c951a) {}
  }
  AreWeOnEmbed() {
    const _0x4efd43 = document.referrer;
    return /:\/\/xat\.com\/embed\/chat(\d*|\.php)/.test(_0x4efd43);
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
    } catch (_0x539b25) {
      return !1;
    }
  }
  setNewTodoAndReload() {
    try {
      const _0x1a6520 = JSON.parse(localStorage.getItem("todo")) ?? {};
      const _0x2c8ec1 = this.getCookie("sca");
      if (_0x2c8ec1 && _0x2c8ec1.includes(",")) {
        const [_0x7e04eb, _0x99447f, _0x22baa3] = _0x2c8ec1.split(",").filter(Boolean);
        if (!Object.keys(_0x1a6520).length || !_0x1a6520.w_registered || _0x1a6520.DeviceId !== _0x7e04eb || _0x1a6520.PassHash !== _0x99447f) {
          _0x1a6520.DeviceId = _0x7e04eb;
          _0x1a6520.PassHash = _0x99447f;
          _0x1a6520.w_userno = _0x22baa3;
          _0x1a6520.MobNo = "";
          localStorage.setItem("todo", JSON.stringify(_0x1a6520));
        }
      }
    } catch (_0x4d90a7) {
      console.error("An error occurred while setting new todo and reloading:", _0x4d90a7);
    }
  }
  async requestStorageAccessApi() {
    try {
      await document.requestStorageAccess();
      this.setNewTodoAndReload();
    } catch (_0x3b2db4) {
      console.log("access denied");
    }
  }
  getCookie(_0x3e93d9) {
    const _0x5f4392 = _0x3e93d9 + "=";
    const _0x5b4579 = document.cookie.split(";");
    if (!_0x5b4579.length) {
      return null;
    }
    for (let _0x3131c8 = 0; _0x3131c8 < _0x5b4579.length; _0x3131c8++) {
      let _0x24234d = _0x5b4579[_0x3131c8];
      while (_0x24234d.charAt(0) === " ") {
        _0x24234d = _0x24234d.substring(1, _0x24234d.length);
      }
      if (_0x24234d.indexOf(_0x5f4392) === 0) {
        return _0x24234d.substring(_0x5f4392.length, _0x24234d.length);
      }
    }
    return null;
  }
  clearDivAct(_0x909964, _0x175c7c) {
    if (typeof clearDiv != "function") {
      _0x175c7c ||= document.getElementById(_0x909964);
      if (_0x175c7c) {
        while (_0x175c7c.firstChild) {
          _0x175c7c.removeChild(_0x175c7c.firstChild);
        }
      }
      return _0x175c7c;
    }
    return clearDiv(_0x909964, _0x175c7c);
  }
  clearLiveStats() {
    localStorage.removeItem("xatLive.isRunning");
    localStorage.removeItem("xatLive.isEnding");
    localStorage.removeItem("xatLive.data");
  }
  setCstyleJson(_0x316f13) {
    _0x316f13 ||= "{}";
    this.cStyle = _0x316f13;
  }
  CanUseFlix() {
    return _Activity.instance.UserSettings?.flix !== "disable";
  }
  initFlix(_0x4a8192) {
    if (_0x4a8192.ef === "0" || this.IsFlixActive || !this.IsClassic || !this.CanUseFlix()) {
      return;
    }
    this.FlixChatId = _0x4a8192.cg;
    const _0x1b8159 = _0x4a8192.ef || 0;
    const _0x441178 = _0x4a8192.fl + "_" + _0x1b8159;
    const _0x561ffc = _0x4a8192.bk == null || xInt(_0x4a8192.bk) ? _0x4a8192.fl + "_" + (_0x4a8192.bk || "1") : undefined;
    const _0x588fca = window.innerWidth + 1;
    const _0x15ec74 = window.innerHeight + 1;
    const _0x458660 = xInt(_0x4a8192.XX) || 0;
    const _0x4596f7 = xInt(_0x4a8192.YY) || 0;
    const _0x51f524 = xInt(_0x4a8192.SC) || 100;
    const _0x554137 = xInt(_0x4a8192.Opt) || 256;
    const _0x3b563c = xInt(_0x4a8192.Op2) || 0;
    const _0x47d650 = xInt(_0x4a8192.PR) || 0;
    const _0xb1f57d = xInt(_0x4a8192.pw) || 0;
    const _0x1c5530 = _0x4a8192.SM || undefined;
    const _0x209caf = _0x4a8192.col?.split("#");
    let _0x3a1e6 = [65280, 128];
    for (let _0x127169 in _0x209caf) {
      _0x3a1e6[_0x127169] = Number("0x" + _0x209caf[_0x127169]);
    }
    const _0x536ae8 = xInt(_0x4a8192.NUM) || 0;
    const _0xb3050 = xInt(_0x4a8192.GT) || 0;
    const _0x14591e = xInt(_0x4a8192.BA) || 100;
    const _0x339994 = xInt(_0x4a8192.GA) || 100;
    const _0x566117 = xInt(_0x4a8192.BT) || 0;
    const _0x29106a = document.createElement("script");
    _0x29106a.src = "./www/flix.js";
    _0x29106a.async = !1;
    _0x29106a.onload = _0x3f605b => {
      const _0x17bb71 = {
        WW: _0x588fca,
        HH: _0x15ec74,
        XX: _0x458660,
        YY: _0x4596f7,
        SC: _0x51f524,
        BG: _0x561ffc,
        PR: _0x47d650,
        PW: _0xb1f57d,
        SM: _0x1c5530,
        NUM: _0x536ae8,
        GT: _0xb3050,
        Op2: _0x3b563c,
        BA: _0x14591e,
        GA: _0x339994,
        BT: _0x566117
      };
      const _0x544e11 = {
        Flix: _0x441178,
        Args: _0x17bb71,
        Cols: _0x3a1e6,
        Text: ["", ""],
        Opt: _0x554137
      };
      FlixStart(_0x544e11);
    };
    _0x29106a.onerror = _0x17b415 => {
      const _0x37e9dd = "File not found: flix.js";
      if (!doReject) {
        throw _0x37e9dd;
      }
      reject(_0x37e9dd);
    };
    document.head.appendChild(_0x29106a);
  }
  SetFlixVisible(_0x38a234) {
    this.IsFlixVisible = _0x38a234;
    const _0x238177 = _0x38a234 ? "block" : "none";
    document.getElementById("flix_canvas").style.display = _0x238177;
  }
  DestroyFlix() {
    if (this.IsFlixActive) {
      FlixDestructor();
      this.IsFlixActive = false;
    }
  }
  HandleFlix(_0x36ec74) {
    return !!this.IsFlixActive && ((_0x36ec74 = _0x36ec74.split("_")).length > 1 ? (this.SetFlixVisible(!1), !1) : this.FlixChatId !== _0x36ec74[0] && _0x36ec74[0] !== "10" || !this.CanUseFlix() ? (this.DestroyFlix(), !1) : (this.SetFlixVisible(!0), WakeFlixBackground(), !0));
  }
  setPawnHueValues(_0x397da5) {
    if (!_0x397da5) {
      return;
    }
    const _0x4d2df1 = parseInt(_0x397da5.PawnHueMinColor, 10);
    const _0x623c67 = parseInt(_0x397da5.PawnHueMaxColor, 10);
    const _0x349938 = "#" + _0x4d2df1.toString(16).padStart(6, "0");
    const _0x5d62bd = "#" + _0x623c67.toString(16).padStart(6, "0");
    const _0x576a54 = _0x397da5.PawnHueMinValue;
    const _0x172785 = _0x397da5.PawnHueMaxValue;
    const _0x527751 = _0x397da5.PreviewPawn;
    this.pawnHueData[0] = _0x349938;
    this.pawnHueData[1] = _0x5d62bd;
    this.pawnHueData[2] = _0x576a54;
    this.pawnHueData[3] = _0x172785;
    this.pawnHuePreviewCode = _0x527751;
    this.Settings.pawnHueData = this.pawnHueData;
    this.Settings.setCurrentPawnPreview(this.pawnHuePreviewCode);
    this.Settings.setPawnHueSliderColor(_0x349938, _0x5d62bd);
  }
}
var _Activity = window._Activity = new Activity();