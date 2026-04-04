"use strict";
let LastApp;
let sideFrame;
let lcFrame;
let sbe;
let directListener = [];
let boxdir = "box";
let captcha = false;
let iframeStorage = "iframe_v2";
let defaultwidth = 650;
let defaultheight = 486;
let update = null;
let cn = Math.floor(Math.random() * Math.floor(2147483647));
let trace = console.log;
let shimFrame = document.getElementById("shim");
let appID = 0;
startAnalyticsFour();
n = GET.params.n;
n ||= GET.path;
n ||= "xat";
if (json.type === "home") {
  Home = 1;
} else {
  Direct = 1;
}
function newstuff(_0x374455) {
  const _0x522103 = new Date(2021, 5, 16, 0, 0, 0, 0);
  const _0x46edd5 = new Date(2021, 5, 29, 0, 0, 0, 0);
  let _0x304ee4 = document.querySelector("#newStf");
  let _0x48ce55 = document.querySelector("#newV");
  if (_0x522103 <= _0x374455 && _0x374455 <= _0x46edd5) {
    _0x304ee4?.classList?.remove("d-none");
    _0x48ce55.innerHTML += " <small>(v1.55)</small>";
  } else {
    _0x304ee4?.classList?.add("d-none");
  }
}
function loadHash(_0x5c0ab1) {
  if (!Home) {
    return;
  }
  let _0x230fff = _0x5c0ab1 || location.hash;
  if (_0x230fff && ["featured", "popular", "supported", "games"].indexOf(_0x230fff) >= 0 && location.hash.length > 0) {
    let _0x453383 = document.querySelector("#groups");
    if (_0x453383) {
      _0x453383.scrollIntoView({
        behavior: "smooth"
      });
    }
  }
}
function DoSendMessage(_0x5c2e74) {
  _0x5c2e74.preventDefault();
  let _0x54091d = $("#sendmsgerr");
  let _0x5f22b = document.querySelector("#sendmsg");
  let _0x128099 = document.querySelector("#createcap");
  let _0x2ed4be = xConfig.gn;
  let _0x1186eb = {};
  let _0x340674 = document.querySelector("#sndemail");
  let _0x12ce0f = document.querySelector("#sndfeedback");
  _0x54091d.addClass("d-none");
  _0x1186eb.GroupName = filter(_0x2ed4be);
  _0x1186eb.email = filter(_0x340674?.value);
  _0x1186eb.feedback = filter(_0x12ce0f?.value);
  _0x1186eb.submit = "Send";
  if (captcha) {
    _0x1186eb["g-recaptcha-response"] = turnstile.getResponse();
    _0x1186eb.ma = 1;
    _0x1186eb.ts = 1;
  }
  bodyCursor("wait");
  urlPost("http://localhost:6969/web_gear/chat/ownerfeedback2.php", filter(_0x1186eb)).then(function (_0x428ab5) {
    bodyCursor("default");
    allErrsOff();
    _0x128099?.classList?.remove("d-none");
    if (_0x428ab5.Err.captcha) {
      captcha = true;
      AddCap("createcap");
      _0x128099?.classList?.add("capspace");
      return;
    }
    if (_0x428ab5.Err.ownerfeedback) {
      _0x5f22b.reset();
      doSuccessMsg(_0x54091d, "<span data-localize=\"web.msgsent\">Your message has been sent.</span>", true);
      _0x128099?.classList?.add("d-none");
    } else {
      DoErrs(_0x428ab5);
    }
    captcha = false;
    _0x128099?.classList?.remove("capspace");
    localize(["chat", "web", "chats"]);
  });
}
function doEmbed() {
  if (directListener.embed) {
    return;
  }
  $("#embedmodal").modal();
  let _0x991100 = document.querySelector("#embed_width");
  let _0x29a454 = document.querySelector("#embed_height");
  let _0x85f619 = document.querySelector("#embed_code");
  let _0x5e3afd = $("#copy");
  let _0x1fd38d = 0;
  let _0x51faa2 = 0;
  let _0x3e2340 = xConfig.gn;
  let _0x146696 = xConfig.gid;
  let _0x3a7f2d = document.querySelector("#notrecomW");
  let _0x349e2e = document.querySelector("#notrecomH");
  let _0x473f27 = document.querySelector("#embFooter");
  let _0xfc178b = document.querySelector("#preview");
  _0x29a454.value = defaultheight;
  _0x991100.value = defaultwidth;
  _0x85f619.innerHTML = getEmbed(_0x3e2340, _0x146696, defaultwidth, defaultheight);
  [_0x991100, _0x29a454].forEach(_0x15df6a => {
    _0x15df6a?.addEventListener("keydown", () => {
      clearTimeout(update);
    });
    _0x15df6a?.addEventListener("keyup", _0x48c80a => {
      _0x473f27?.classList.add("d-none");
      clearTimeout(update);
      update = setTimeout(function () {
        const _0x3a039f = _0x15df6a.id;
        let _0x4b60da = _0x3a039f == "embed_width" ? 600 : 465;
        let _0x2df942 = _0x48c80a.target.value;
        if (isNaN(_0x2df942) || _0x2df942 > 2000 || _0x2df942 < _0x4b60da) {
          _0x2df942 = _0x3a039f == "embed_width" ? defaultwidth : defaultheight;
          if (_0x3a039f == "embed_width") {
            _0x3a7f2d?.classList.remove("d-none");
            _0x991100?.classList.add("inpshake");
            setTimeout(function () {
              _0x991100?.classList.remove("inpshake");
            }, 1000);
            setTimeout(function () {
              _0x3a7f2d?.classList.add("d-none");
            }, 3000);
          } else {
            _0x349e2e?.classList.remove("d-none");
            _0x29a454?.classList.add("inpshake");
            setTimeout(function () {
              _0x29a454?.classList.remove("inpshake");
            }, 1000);
            setTimeout(function () {
              _0x349e2e?.classList.add("d-none");
            }, 3000);
          }
        }
        _0x473f27?.classList.remove("d-none");
        _0x2df942 = parseInt(_0x2df942);
        _0x1fd38d = _0x3a039f == "embed_width" ? _0x2df942 : calculateProp(_0x2df942, false);
        _0x51faa2 = _0x3a039f == "embed_height" ? _0x2df942 : calculateProp(_0x2df942, false);
        _0x991100.value = _0x1fd38d;
        _0x29a454.value = _0x51faa2;
        _0x85f619.innerHTML = _0x3a039f == "embed_width" ? getEmbed(_0x3e2340, _0x146696, _0x2df942, _0x51faa2 == 0 ? _0x29a454.value : _0x51faa2) : getEmbed(_0x3e2340, _0x146696, _0x1fd38d == 0 ? _0x991100.value : _0x1fd38d, _0x2df942);
      }, 1000);
    });
  });
  _0x5e3afd.tooltip({
    trigger: "click",
    placetop: "top"
  });
  _0x5e3afd.off("click").on("click", function (_0x1336a1) {
    _0x1336a1.preventDefault();
    const _0x252f6c = document.getElementById("embed_code");
    _0x252f6c.select();
    _0x252f6c.setSelectionRange(0, 99999);
    document.execCommand("copy");
    _0x5e3afd.tooltip("show");
    setTimeout(function () {
      _0x5e3afd.tooltip("hide");
    }, 1000);
    localize(["chats"]);
  });
  _0xfc178b?.addEventListener("click", _0x3c3f1d => {
    _0x1fd38d = _0x1fd38d || _0x991100.value;
    _0x51faa2 = _0x51faa2 || _0x29a454.value;
    if (_0x1fd38d <= 650) {
      getEmbed(_0x3e2340, _0x146696, _0x1fd38d, _0x51faa2, true);
    }
    if (_0x1fd38d > 650) {
      getEmbed(_0x3e2340, _0x146696, _0x1fd38d, _0x51faa2, false, true);
    }
  });
  directListener.embed = true;
}
function main() {
  if (Direct) {
    document.getElementById("closeColLeft").classList.remove("d-none");
    sideBut();
    document.body.style.backgroundColor = "black";
    handleSideBars();
    document.querySelector("#navxatApps")?.classList.add("d-none");
  } else {
    document.body.style.backgroundColor = "white";
    document.getElementById("navLogo").src = "/content/img/xatsat.svg";
    let _0x465abc = document.querySelector("#rankdrop");
    _0x465abc?.classList.remove("d-block");
    _0x465abc?.classList.add("d-none");
  }
  newstuff(new Date());
  setupConsoleLogging();
  initLanguage();
  initAuser3();
  setLogo();
  if (xConfig.debugMainTemplate) {
    let _0x57aaab = "";
    let _0x4b2104 = document.createElement("style");
    _0x4b2104.appendChild(document.createTextNode(_0x57aaab));
    document.head.insertBefore(_0x4b2104, null);
    let _0x4ca267 = "";
    document.body.innerHTML = _0x4ca267;
  }
  readUser();
  fetchPromo().then(function (_0x4b57b7) {
    if (!Direct && _0x4b57b7) {
      xConfig.gn = _0x4b57b7.n;
      xConfig.debugBox = "box/embed.html?n=" + _0x4b57b7.n;
      if (Home) {
        doHome(_0x4b57b7);
      }
    }
    fetchGroupData().then(function () {
      localize();
      lookupForEmbed();
    });
  });
  if (xConfig.username) {
    document.getElementById("navLogin").addEventListener("click", function () {
      directConfig("login");
    });
    directConfig("login");
  } else {
    let _0x34ad39 = document.getElementById("navLogin");
    _0x34ad39.href = "/login";
    _0x34ad39.removeAttribute("data-toggle");
    _0x34ad39.removeAttribute("data-target");
    _0x34ad39.addEventListener("click", function () {
      window.location.href = "http://localhost:6969/login";
    });
  }
  if (xConfig.debugMainOwner) {
    directConfig("mainowner");
  }
  if (Direct) {
    directConfig("background");
  }
  directConfig("landscape");
  navClickHandlers();
  window.addEventListener("message", onMessage, false);
  if (xConfig.debugWorkbox && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js");
    });
  }
  let _0x51a56e = {
    30008: "trade",
    20010: "fourinrow",
    60002: "canvas",
    10001: "media",
    20047: "xavi",
    30012: "live"
  };
  window.setTimeout(() => {
    let _0x48e108 = new URLSearchParams(window.location.search).get("open");
    if (_0x48e108 && _0x51a56e.hasOwnProperty(_0x48e108)) {
      startSide(_0x51a56e[_0x48e108]);
    }
  }, 1500);
  if (window.innerWidth < 450) {
    document.querySelector("#promoframe")?.classList?.remove("d-none");
  }
  let _0x4f11f9 = document.getElementById("copyrightyear");
  if (_0x4f11f9) {
    _0x4f11f9.appendChild(document.createTextNode(new Date().getFullYear()));
  }
  let _0x3858ba = document.getElementById("navEmbedGrp");
  if (_0x3858ba) {
    _0x3858ba.addEventListener("click", doEmbed);
  }
  let _0x21623d = document.getElementById("navEmbedBottom");
  if (_0x21623d) {
    _0x21623d.addEventListener("click", doEmbed);
  }
  let _0x825166 = document.getElementById("sendmsg");
  if (_0x825166) {
    _0x825166.addEventListener("submit", DoSendMessage);
  }
  let _0x149c6e = document.querySelector("#navIframe");
  if (_0x149c6e) {
    _0x149c6e.addEventListener("click", doIframeModal);
  }
  localize(["chat", "web", "chats"]);
}
function lookupForEmbed() {
  let _0x33224d = getGET();
  if (_0x33224d.hash) {
    return _0x33224d.hash == "!embed" && doEmbed();
  }
}
function handleSideBars() {
  let _0x120b06 = document.querySelector(".sidebar");
  let _0x4a97f6 = document.querySelectorAll("[data-app]");
  if (_0x4a97f6.length > 0) {
    _0x4a97f6.forEach(_0x1b4250 => {
      _0x1b4250.addEventListener("click", _0x19f70e => {
        _0x120b06.classList.add("d-none");
        if (_0x19f70e.target.nodeName == "IMG") {
          _0x19f70e = _0x19f70e.target.parentElement || _0x19f70e.target.parentNode;
        }
        let _0x329170 = _0x19f70e.target.dataset || _0x19f70e.dataset;
        if (_0x329170 && (_0x329170 = _0x329170.app, _0x329170)) {
          switch (_0x329170) {
            case "media":
              startSide("media", null, null, null);
              break;
            case "doodle2":
            case "snakerace":
            case "pawns":
            case "grid":
              startSide(_0x329170, 0, 600);
              break;
            default:
              startSide(_0x329170, 0);
          }
        }
      });
    });
  }
}
function fetchGroupData() {
  return new Promise((_0x2b01eb, _0x317698) => {
    if (xConfig.debugJsonGroup) {
      const _0x1dbbf3 = JSON.parse(document.getElementById("xjson").innerHTML);
      if (_0x1dbbf3.id !== undefined && _0x1dbbf3.g !== undefined && _0x1dbbf3.d !== undefined && _0x1dbbf3.a !== undefined) {
        xConfig.gid = _0x1dbbf3.id;
        xConfig.gn = _0x1dbbf3.g == null ? "xat" : _0x1dbbf3.g;
        xConfig.gd = _0x1dbbf3.d.replace(/\\u00A0/g, "");
        xConfig.type = _0x1dbbf3.t;
        xConfig.background = _0x1dbbf3.gb;
        xConfig.tabs = _0x1dbbf3.tabs;
        if (_0x1dbbf3.g == null) {
          xConfig.groupNoName = true;
        }
        updatePage();
      } else {
        console.error("invalid embedded json");
      }
    } else {
      if (xConfig.debugFetchGroup) {
        let _0x1a70af;
        let _0x3d7526 = "http://localhost:6969/web_gear/chat/roomid.php?d=" + xConfig.gn;
        if (_0x1a70af = GET.params.cb) {
          _0x3d7526 += "&cb=" + _0x1a70af;
        }
        fetch(_0x3d7526).then(function (_0x39697e) {
          return _0x39697e.json();
        }).then(function (_0x100f7f) {
          if (_0x100f7f.id !== undefined && _0x100f7f.g !== undefined && _0x100f7f.d !== undefined && _0x100f7f.a !== undefined) {
            window.xConfig = xConfig;
            if (_0x100f7f.ni) {
              _0x100f7f.gb = "";
              _0x100f7f.if = "";
              _0x100f7f.a = "";
              _0x100f7f.tabs = "";
              _0x100f7f.d = "";
            }
            xConfig.gid = _0x100f7f.id;
            xConfig.fs = !!_0x100f7f.fs;
            xConfig.gn = _0x100f7f.g == null ? "xat" : _0x100f7f.g;
            xConfig.gd = _0x100f7f.d.replace(/\\u00A0/g, "");
            xConfig.type = _0x100f7f.t;
            xConfig.background = _0x100f7f.gb;
            xConfig.if = _0x100f7f.if || false;
            if (_0x100f7f.g == null) {
              xConfig.groupNoName = true;
            }
            let _0x55c5ab = guessIfXatFrame();
            if (_0x100f7f.if && _0x55c5ab) {
              let _0x4504fb = document.querySelector("#groupBackgroundFrame");
              if (_0x4504fb) {
                _0x4504fb.src = _0x100f7f.if;
              }
              displayXatFrameAlert();
            } else {
              xConfig.background = _0x100f7f.gb;
            }
            xConfig.tabs = _0x100f7f.tabs;
            if (GET.params.x && Direct && _0x100f7f.a) {
              let _0x501c3d = _0x100f7f.a.split(";=");
              xConfig.chatBg = _0x501c3d[0] || "";
            }
            let _0x5ed853 = !_0x100f7f.ni && _0x100f7f.a ? _0x100f7f.a.split(";=") : [];
            let _0x3481e6 = _0x5ed853[8];
            let _0x1c9cf7 = _0x5ed853[10];
            let _0x498b30 = _0x5ed853[11];
            let _0x412845 = _0x5ed853[12];
            let _0x18da4f = _0x100f7f[636] ? _0x100f7f[636] : "";
            let _0x13d8f7 = _0x100f7f.g.toLowerCase();
            if (!Home) {
              if (_0x18da4f && _0x18da4f >= 1) {
                let _0xd16b0c = document.getElementById("setflag");
                if (_0x3481e6 && _0xd16b0c) {
                  _0xd16b0c.classList.remove("d-none");
                  _0x3481e6 = _0x3481e6.replace(new RegExp("[/.]", "gi"), "");
                  _0xd16b0c.src = _0x3481e6 == "xat" ? "http://localhost:6969/images/smw/flag.png" : "http://localhost:6969/images/smw/flag/" + filter(_0x3481e6) + ".png";
                  _0xd16b0c.onerror = () => {
                    _0xd16b0c.removeAttribute("src");
                    _0xd16b0c.classList.add("d-none");
                  };
                  _0xd16b0c.onload = () => {
                    if (_0x3481e6 !== "xat" && _0xd16b0c.src.substr(0, 32) != "http://localhost:6969/images/smw/flag/") {
                      _0xd16b0c.removeAttribute("src");
                      _0xd16b0c.classList.add("d-none");
                    }
                  };
                  if (flagsLists[_0x3481e6]) {
                    _0xd16b0c.title = flagsLists[_0x3481e6];
                  }
                  if (!offgps.includes(_0x13d8f7) && _0x3481e6 == "xat") {
                    _0xd16b0c.classList.add("d-none");
                  }
                }
                let _0x191b82 = document.getElementById("navTop").style;
                let _0x47dc94 = document.getElementById("navBottom").style;
                if (_0x1c9cf7 == "navdefault") {
                  _0x191b82.background = "linear-gradient(#004, #008)";
                  _0x47dc94.background = "linear-gradient(#004, #008)";
                } else if (_0x1c9cf7 == "navplanet") {
                  _0x191b82.background = "linear-gradient(#006279, #02a9d2)";
                  _0x47dc94.background = "linear-gradient(#007a97, #02a9d2)";
                } else if (_0x1c9cf7 == "navspace") {
                  _0x191b82.background = "linear-gradient(#040404, #191919)";
                  _0x47dc94.background = "linear-gradient(#040404, #191919)";
                }
              }
              if (_0x18da4f && _0x18da4f >= 2 && _0x498b30) {
                document.getElementById("groupName").style.fontFamily = _0x498b30;
                document.getElementById("groupDescription").style.fontFamily = _0x498b30;
              }
              if (_0x18da4f && _0x18da4f >= 3 && _0x412845) {
                document.getElementById("groupName").style.textShadow = "1px 1px 5px" + _0x412845 + ", 1px 1px 5px" + _0x412845;
                document.getElementById("groupDescription").style.textShadow = "1px 1px 5px" + _0x412845 + ", 1px 1px 5px" + _0x412845;
              }
            }
            updatePage();
          } else {
            console.error("invalid fetched json");
          }
          _0x2b01eb();
        });
        return;
      }
      xConfig.gid = 42;
      xConfig.gn = "phoenix";
      xConfig.gd = "arising from the ashes of its predecessor";
      xConfig.background = "http://i47.tinypic.com/34hdvrn.png";
    }
    _0x2b01eb();
  });
}
function displayXatFrameAlert() {
  let _0x41414d = localStorage.getItem("xatframe_declined");
  if (_0x41414d && _0x41414d == "1" || isMobile) {
    return;
  }
  let _0x518e37 = document.querySelector("#xatFrameSet");
  let _0x376469 = document.querySelector("#xatframeAlert");
  let _0x4a3bc5 = document.querySelector("#xatframe_alert_close");
  _0x376469?.classList.remove("d-none");
  if (_0x4a3bc5) {
    _0x4a3bc5.addEventListener("click", _0x29d499 => {
      localStorage.setItem("xatframe_declined", "1");
    });
  }
  if (_0x518e37) {
    _0x518e37.addEventListener("click", doIframeModal);
  }
}
function guessIfXatFrame(_0x1035ce) {
  let _0x2ebe9f = getIndividualiFrames();
  let _0x42adf8 = _0x1035ce || xConfig.gn;
  _0x2ebe9f.list ||= [];
  _0x2ebe9f.disabled ||= [];
  return _0x2ebe9f.list.indexOf(_0x42adf8) >= 0 || !(_0x2ebe9f.disabled.indexOf(_0x42adf8) >= 0) && (!!_0x2ebe9f.global || _0x2ebe9f.list.indexOf(_0x42adf8) != -1 && _0x2ebe9f.disabled.indexOf(_0x42adf8) != -1);
}
function updatePage() {
  document.documentElement.setAttribute("lang", xConfig.lang);
  if (Direct) {
    document.title = xConfig.gn;
    document.querySelector("meta[name=\"description\"]").setAttribute("content", xConfig.gd);
    if (xConfig.background) {
      if (xConfig.background.charAt(0) == "#") {
        document.body.style.background = xConfig.background;
      } else {
        document.body.style.backgroundImage = "url('" + SafeImage(xConfig.background) + "')";
      }
    }
    if (document.getElementById("groupName")) {
      document.getElementById("groupName").appendChild(document.createTextNode(xConfig.gn));
    }
    if (document.getElementById("groupDescription")) {
      document.getElementById("groupDescription").appendChild(document.createTextNode(xConfig.gd));
    }
  }
  if (Home) {
    document.querySelector("meta[name=\"description\"]").setAttribute("content", "localhost:6969 is a fun social networking site, join a group, make friends, create your own xat group");
    document.title = "xat";
  }
  let _0x13ec0c = document.getElementById("embedframe");
  if (_0x13ec0c) {
    if (xConfig.chatBg && xConfig.chatBg.charAt(0) !== "#") {
      let _0x317ada = document.createElement("img");
      _0x317ada.width = 728;
      _0x317ada.height = 486;
      _0x317ada.src = xConfig.chatBg;
      _0x13ec0c.classList.add("d-none");
      _0x13ec0c.parentNode.insertBefore(_0x317ada, _0x13ec0c);
    } else {
      _0x13ec0c.src = dir + "box/embed.html?n=" + xConfig.gn;
    }
  }
  if (Direct && document.getElementById("bottomNavGroupName")) {
    document.getElementById("bottomNavGroupName").appendChild(document.createTextNode(xConfig.gn));
  }
  readUser();
  setUser();
  if (Direct) {
    let _0x33a22d = localStorage.getItem("TabsClosed");
    let _0x5dccbe = document.querySelector("#navBottomTabs");
    let _0x2bcc5d = document.querySelector("#navBottom");
    _0x5dccbe.innerHTML = "";
    if (xConfig.groupNoName || !xConfig.tabs || xConfig.tabs.length == 0 || xConfig.tabs.length == 1 && xConfig.tabs[0].label == "Comments") {
      _0x2bcc5d?.classList.add("d-none");
    } else {
      let _0x5767ce;
      let _0x4f20ad;
      if (xConfig.tabs !== undefined && xConfig.tabs.length > 0) {
        let _0xdce07d = xConfig.tabs;
        for (let _0xe3fac4 = 0; _0xe3fac4 < _0xdce07d.length; _0xe3fac4++) {
          if (_0xdce07d[_0xe3fac4].label == "Comments") {
            continue;
          }
          let _0x4052d2 = String(_0xdce07d[_0xe3fac4].url);
          if (_0x4052d2.search(/^http:\/\/[\.a-z]*xat.com\//) != -1) {
            _0x4052d2 = _0x4052d2.replace("http:", "https:");
          }
          _0x4052d2 = _0x4052d2.replace("http://chatsgroup.com", "https://chatsgroup.com");
          if (_0x4052d2 > 0) {
            _0x4052d2 = "https://chatsgroup.com/web_gear/chat/media.php?d=" + xConfig.gn + "&p=" + (_0x4052d2 - 1) + "&id=" + xConfig.gid;
          }
          if (_0x4f20ad = GET.params.cb) {
            _0x4052d2 += "&cb=" + _0x4f20ad;
          }
          createTab({
            navBottom: _0x5dccbe,
            index: _0xe3fac4,
            url: _0x4052d2,
            json: _0xdce07d[_0xe3fac4]
          });
          if ((!_0x33a22d || _0x33a22d == 0) && _0xe3fac4 == 0) {
            _0x5767ce = tabPress(0, _0x4052d2, 1);
          }
        }
      }
      createTab({
        navBottom: _0x5dccbe,
        url: "close",
        json: {
          label: getDefaultTranslationIfNotFound("mob2.close", "close")
        },
        close: _0x5767ce
      });
    }
  }
  if (xConfig.debugTooltips) {
    $(function () {
      $("[data-toggle=\"tooltip\"]").tooltip({
        trigger: "hover"
      });
    });
  }
  legacyLinks();
  cookieBar();
}
function createTab(_0x3671db) {
  let _0x5e2538 = makeElement(_0x3671db.navBottom, "li", "nav-item");
  let _0x2788b8 = makeElement(_0x5e2538, "a");
  _0x2788b8.className = "nav-link" + (_0x3671db.url == "close" ? _0x3671db.close ? "" : " d-none" : "");
  _0x2788b8.id = _0x3671db.url == "close" ? "navClose" : "navTab" + _0x3671db.index;
  _0x2788b8.href = "#/";
  _0x2788b8.dataset.url = _0x3671db.url;
  _0x2788b8.addEventListener("click", tabPress);
  let _0xf4afe9 = makeElement(_0x2788b8, "img", "mr-1");
  _0xf4afe9.src = xConfig.dir + "img/navbar/" + (_0x3671db.url == "close" ? "close" : "userframe") + ".svg";
  _0xf4afe9.width = 19;
  _0xf4afe9.alt = "userframe";
  _0x2788b8.innerHTML += _0x3671db.json.label;
}
function tabPress(_0x3997ff, _0x55e816, _0x4bd041) {
  if (_0x3997ff) {
    _0x3997ff.preventDefault();
  }
  _0x55e816 ||= _0x3997ff.target.dataset.url;
  if (!_0x55e816) {
    return 0;
  }
  let _0x42a091 = document.querySelector("#navBottom");
  let _0x50a035 = document.querySelector("#navClose");
  let _0x46c00 = document.querySelector("#navBottomTabs");
  let _0x39c20f = document.querySelector("#groupUserFrame");
  let _0x4b2961 = document.querySelector("#privacyGroupUrl");
  let _0x5af0dd = document.querySelector("#privacyGroupFrame");
  localStorage.setItem("TabsClosed", "0");
  if (_0x55e816 == "close") {
    localStorage.setItem("TabsClosed", "1");
    if (document.getElementById("groupUserFrame")) {
      document.getElementById("groupUserFrame").src = "";
    }
    _0x42a091?.classList?.add("fixed-bottom");
    _0x50a035?.classList?.add("d-none");
    let _0x40bdfe = _0x46c00.querySelectorAll("[id^=\"navTab\"]");
    if (_0x40bdfe.length) {
      _0x40bdfe.forEach(_0x1bfcc8 => {
        _0x1bfcc8?.classList?.remove("active");
      });
    }
    _0x39c20f?.classList?.add("d-none");
    return 0;
  }
  let _0x91e990 = 0;
  _0x91e990 = xConfig.cookies & 4;
  if (_0x4bd041 && xConfig.type & 256) {
    _0x91e990 = 1;
  }
  _0x91e990 ||= _0x55e816.search(/^https:\/\/xat.com\//) != -1;
  _0x91e990 ||= _0x55e816.search(/^https:\/\/[a-z]*\.xat.com\//) != -1;
  _0x91e990 ||= _0x55e816.search(/^https:\/\/chatsgroup.com\//) != -1;
  _0x91e990 ||= _0x55e816.search(/^https:\/\/xat.wiki\//) != -1;
  _0x91e990 ||= _0x55e816.search(/^https:\/\/[a-z]*\.xat.wiki\//) != -1;
  if (!_0x4bd041 && !_0x3997ff) {
    _0x91e990 = 1;
  }
  if (_0x3997ff && !_0x91e990) {
    _0x4b2961.innerText = _0x55e816;
    _0x5af0dd?.classList?.remove("d-none");
    $("#privacyModal").modal("show");
    return 0;
  } else if (_0x91e990) {
    if (_0x4bd041 || _0x55e816.substr(0, 5) != "http:") {
      if (document.getElementById("groupUserFrame")) {
        document.getElementById("groupUserFrame").src = _0x55e816;
      }
      _0x42a091?.classList?.remove("fixed-bottom");
      _0x50a035?.classList?.remove("d-none");
      _0x3997ff.target?.classList.add("active");
      _0x39c20f?.classList?.remove("d-none");
      return 1;
    } else {
      window.open(_0x55e816, "_blank");
      return 0;
    }
  } else {
    return 0;
  }
}
function sideBut(_0x31ca43, _0x334f4a) {
  const _0x220f1a = document.getElementById("closeApp");
  let _0x23aaa8 = document.querySelector(".sidebar");
  _0x220f1a.style.display = _0x31ca43 ? "block" : "none";
  const _0x2a8ac0 = document.getElementById("helpApp");
  if (_0x2a8ac0) {
    _0x2a8ac0.style.display = _0x31ca43 ? "block" : "none";
    _0x2a8ac0.href = "https://xat.wiki/" + getAppName(_0x334f4a);
  }
  const _0x246c1a = document.getElementById("appMenu");
  if (_0x246c1a) {
    _0x246c1a.style.display = _0x334f4a && _0x334f4a !== "apps" ? "block" : "none";
    _0x246c1a.onclick = () => startSide("apps");
  }
  if (_0x220f1a.style.display == "none" && _0x23aaa8) {
    _0x23aaa8.classList.remove("d-none");
  }
  if (!sbe) {
    _0x220f1a.addEventListener("click", function () {
      startSide("");
    });
  }
  sbe = 1;
}
function startSide(_0x48f07d, _0x35de9e, _0x16a591, _0x3768ce, _0x26b453) {
  _0x16a591 ||= 425;
  if (shimFrame) {
    shimFrame.style.display = "none";
  }
  let _0x2eec9f = xConfig.dir + "apps/" + _0x48f07d + "/" + _0x48f07d + ".html";
  if (_0x3768ce && _0x48f07d == "media") {
    _0x2eec9f += "?link=" + _0x3768ce;
  } else if (_0x3768ce) {
    _0x2eec9f += "#" + _0x3768ce;
  }
  if (_0x48f07d == "shim") {
    lcFrame = shimFrame;
    shimFrame.style.width = _0x16a591 + 16 + "px";
    shimFrame.style.display = "block";
    shimFrame.src = _0x2eec9f;
    sideBut(1, _0x26b453);
    return;
  }
  shimFrame.style.width = "16px";
  if (_0x48f07d === "") {
    if (sideFrame) {
      sideFrame.style.display = "none";
      sideFrame.src = "";
    }
    if (appID >= 10000) {
      let _0x4da1d4 = {
        channel: 0,
        user: 0,
        msg: "",
        tobox: 1
      };
      window.box.postMessage(JSON.stringify(_0x4da1d4), xConfig.origin);
    }
    shimFrame.contentWindow.postMessage(JSON.stringify({
      channel: "stopOnMessage"
    }), xConfig.origin);
    shimFrame.src = "";
    lcFrame = null;
    sideBut(0);
    appID = 0;
    return;
  }
  shimFrame.src = "";
  sideFrame = document.getElementById(_0x35de9e ? "rightsideframe" : "sideframe");
  lcFrame = sideFrame;
  if (sideFrame) {
    sideFrame.style.width = _0x16a591 + "px";
    sideFrame.style.display = "block";
    sideFrame.style.height = _0x48f07d == "media" ? "576px" : "600px";
    if (_0x48f07d === "fshim") {
      if (sideFrame.src == _0x2eec9f) {
        sideFrame.contentWindow.postMessage(JSON.stringify({
          OpenByN: LastApp,
          cn: cn
        }), xConfig.origin);
      } else {
        sideFrame.src = _0x2eec9f;
      }
    } else {
      let _0x25118d = sideFrame.src.split("#");
      let _0x17ef29 = _0x2eec9f.split("#");
      sideFrame.src = _0x2eec9f;
      if (_0x25118d[1] == _0x17ef29[0]) {
        sideFrame.contentDocument.location.reload(true);
      }
    }
    sideBut(1, _0x48f07d);
  }
}
function onMessage(_0x4c5503) {
  if (_0x4c5503.origin !== xConfig.origin) {
    return;
  }
  let _0x300e26;
  try {
    _0x300e26 = JSON.parse(_0x4c5503.data);
  } catch (_0x1878b9) {
    return;
  }
  if (_0x300e26.action == "sideload") {
    if (_0x300e26.o || _0x300e26.i === "doodle" || [60193, 60201, 60257, 60239, 60225, 60247].includes(parseInt(_0x300e26.i))) {
      if (_0x300e26.i === "doodle") {
        _0x300e26.i = 10000;
        _0x300e26.f = "doodle";
      }
      if (sideFrame) {
        sideFrame.src = "";
        sideFrame.style.display = "none";
      }
      let _0x534a87 = 425;
      if (_0x300e26.i & 1) {
        _0x534a87 = 600;
      }
      appID = _0x300e26.i;
      startSide("shim", 0, _0x534a87, null, _0x300e26.n);
      shimFrame.onload = function (_0x3c37cb) {
        let _0x44a1ed = _0x300e26.i;
        if (_0x300e26.f) {
          _0x44a1ed = _0x300e26.f;
        }
        if (shimFrame.parentElement) {
          shimFrame.parentElement.classList.remove("d-none");
        }
        shimFrame.contentWindow.postMessage(JSON.stringify({
          channel: "startUp",
          id: _0x44a1ed,
          id2: _0x300e26.i,
          cn: cn,
          n: _0x300e26.n
        }), xConfig.origin);
      };
      return;
    }
    {
      const _0x2a56d1 = ["xavi", "supercycle", "stick", "nuclear", "count", "grid", "doodle2", "doodlerace", "pool", "chess"];
      if (_0x300e26.n == "media") {
        startSide(_0x300e26.n, null, null, _0x300e26.l);
      } else if (_0x2a56d1.includes(_0x300e26.n) || _0x300e26.i.toString().substr(0, 2) == "60") {
        startSide(_0x300e26.n, 0, 600);
      } else {
        startSide(_0x300e26.n, 0);
      }
      return;
    }
  }
  if (_0x300e26.tobox) {
    if (lcFrame && _0x300e26.channel == 13) {
      lcFrame.style.width = (_0x300e26.msg == 600 ? 600 : 425) + "px";
      return;
    } else {
      window.box.postMessage(_0x4c5503.data, xConfig.origin);
      return;
    }
  }
  if (lcFrame) {
    lcFrame.contentWindow.postMessage(_0x4c5503.data, xConfig.origin);
  }
}
function setupConsoleLogging() {
  console.log.bind(console);
  xConfig.name;
  xConfig.debugLogIgnore;
  console.log = function () {
    xConfig.debugNoLogs;
  };
  trace = console.log;
}
function SelectAll(_0x24b9d4) {
  document.getElementById(_0x24b9d4).focus();
  document.getElementById(_0x24b9d4).select();
}
function xInt(_0x253b8e) {
  _0x253b8e = parseInt(_0x253b8e);
  if (isNaN(_0x253b8e)) {
    return 0;
  } else {
    return _0x253b8e;
  }
}
function xpromo(_0x696b02, _0x5b3fe3) {
  let _0x25b34b = "\n        <a href=\"//localhost:6969/" + _0x696b02 + "\">" + _0x696b02 + "</a> \n        <small>(<span data-localize=\"index.notrun\">Note: this chat is not run by xat</span>)</small><br>\n        <span data-localize=\"index.promotedgroups\">Promoted groups</span>: \n    ";
  for (let _0x1ab835 in xConfig.xpromo) {
    _0x25b34b += "<a href=\"//localhost:6969/" + xConfig.xpromo[_0x1ab835].n + "\">" + xConfig.xpromo[_0x1ab835].n + "</a> | ";
  }
  let _0xeeaacf = "\n\t\t<div class=\"col-12 mb-2\" id=\"mobpromo\">\n\t\t\t<div class=\"card h-100 border mb-2\">\n\t\t\t\t<a class=\"overlayLink\" href=\"http://localhost:6969/" + _0x696b02 + "\"></a>\n\t\t\t\t<div class=\"card-body p-2\">\n\t\t\t\t\t<img class=\"card-img-top img-fluid promoImg\" loading=\"lazy\" src=\"" + GetImageToNl(_0x5b3fe3) + "\" alt=\"" + _0x696b02 + "\">\n\t\t\t\t\t<div class=\"centered\"><img class=\"mb-1 mr-1 promostar\" width=\"19\" src=\"" + xConfig.dir + "img/navbar/star.svg\" alt=\"star\">" + _0x696b02 + "</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t";
  if (window.matchMedia("(max-width: 540px)").matches && isMobile) {
    document.querySelector(".hmemb").remove();
  }
  _0x25b34b += "<a href=\"//localhost:6969/promotion\"><span data-localize=\"index.promomine\">Promote my group</span></a>";
  document.querySelector("#promo").innerHTML = _0xeeaacf + _0x25b34b;
}
function pmain() {
  let _0x4e2287 = document.querySelector("#groups");
  let _0xd50fb9 = ["featured", "popular", "supported", "games"];
  let _0x1795b8 = ["p1", "p2", "p3", "p4", "p5", "pp1", "pp2", "pp3", "pp4", "pp5"];
  let _0x1557d3 = ["prev", "xprev", "next", "xnext"];
  for (let _0x224407 in _0xd50fb9) {
    let _0x33d955 = document.querySelector("#x" + _0xd50fb9[_0x224407]);
    _0x33d955?.addEventListener("click", _0x1cafd2 => {
      _0x1cafd2.preventDefault();
      clist(_0x1cafd2.currentTarget, "p1", _0x1cafd2.currentTarget.id);
      location.hash = "#" + _0x1cafd2.currentTarget.id.substr(1);
      return false;
    });
  }
  for (let _0x47e3bc in _0x1795b8) {
    let _0x5e22e9 = document.querySelector("#" + _0x1795b8[_0x47e3bc]);
    _0x5e22e9?.addEventListener("click", _0xc9696e => {
      _0xc9696e.preventDefault();
      clist(this, _0xc9696e.target.id);
      _0x4e2287?.scrollIntoView({
        behavior: "smooth"
      });
      return false;
    });
  }
  for (let _0x32f99b in _0x1557d3) {
    let _0x5384f3 = document.querySelector("#" + _0x1557d3[_0x32f99b]);
    _0x5384f3?.addEventListener("click", _0x16a60b => {
      _0x16a60b.preventDefault();
      clist(this, _0x16a60b.currentTarget.id);
      _0x4e2287?.scrollIntoView({
        behavior: "smooth"
      });
      return false;
    });
  }
}
function prender() {
  if (xConfig.xlist) {
    xlist("#thumbs", xConfig.xlist);
  }
}
function pupdate() {
  if (xConfig.lang && xConfig.loadlist) {
    let _0xc3dc5e = "http://localhost:6969/json/lists/";
    if (xConfig.list == "games") {
      _0xc3dc5e += xConfig.list;
    } else {
      _0xc3dc5e += parseInt(xConfig.page) + "_" + (xConfig.loadlistfail ? "en" : xConfig.lang.substr(0, 2)) + "_" + xConfig.list;
    }
    _0xc3dc5e += ".php";
    fetch(_0xc3dc5e).then(function (_0x3f75f9) {
      if (_0x3f75f9.status === 200) {
        _0x3f75f9.json().then(function (_0x230fb8) {
          xConfig.loadlist = false;
          xConfig.loadlistfail = false;
          xConfig.xlist = _0x230fb8;
          prender();
        });
      } else if (!xConfig.loadlistfail && xConfig.lang.substr(0, 2) != "en") {
        throw Error(_0x3f75f9.status);
      }
    }).catch(function (_0x192ecb) {
      if (!xConfig.loadlistfail && xConfig.lang.substr(0, 2) != "en") {
        xConfig.loadlistfail = true;
        xConfig.loadlist = true;
        pupdate();
      }
    });
  }
}
function clist(_0x52dab3, _0x58de4c, _0x467f42) {
  const _0x4505f4 = {
    p1: 0,
    p2: 1,
    p3: 2,
    p4: 3,
    p5: 4,
    prev: "-",
    xprev: "-",
    next: "+",
    xnext: "+"
  };
  if (_0x467f42 != null) {
    document.querySelector("#x" + xConfig.list)?.classList?.remove("active");
    xConfig.list = _0x467f42.substr(1);
    xConfig.page = 0;
  }
  if (_0x58de4c.substr(0, 2) == "pp") {
    _0x58de4c = _0x58de4c.substr(1);
  }
  if (_0x4505f4[_0x58de4c] == "+") {
    xConfig.page++;
  } else if (_0x4505f4[_0x58de4c] == "-") {
    xConfig.page--;
  } else {
    xConfig.page = _0x4505f4[_0x58de4c];
  }
  if (xConfig.page < 0) {
    xConfig.page = xConfig.numPages - 1;
  } else if (xConfig.page > xConfig.numPages - 1) {
    xConfig.page = 0;
  }
  if (_0x52dab3 && _0x52dab3[0]) {
    _0x52dab3 = _0x52dab3[0];
  }
  _0x52dab3?.classList?.add("active");
  $("#p" + (xConfig.page + 1)).parent().addClass("active").siblings().removeClass("active");
  $("#pp" + (xConfig.page + 1)).parent().addClass("active").siblings().removeClass("active");
  xConfig.loadlist = true;
  pupdate();
}
function GetImageToNl(_0x234134) {
  if (!_0x234134) {
    return xConfig.dir + "img/bluebox.png";
  }
  let _0x339398 = _0x234134.split("&U=");
  if (_0x339398[1]) {
    if (_0x339398[1].charAt(0) == "#") {
      return xConfig.dir + "img/bluebox.png";
    }
    _0x234134 = _0x339398[1];
  }
  return "https://images.weserv.nl/?output=jpg&w=200&h=134&q=80&t=absolute&url=" + encodeURIComponent(_0x234134) + "&default=" + xConfig.origin + xConfig.dir + "img/bluebox.png";
}
function xlist(_0x1c545a, _0x3470fa) {
  let _0x4cf35e = "<div class=\"container-fluid p-0\"><div class=\"row ml-0 mr-0\">";
  let _0x321673 = "groups";
  if (xConfig.list == "supported") {
    _0x321673 = "supported";
  }
  if (["supported", "popular"].indexOf(xConfig.list) >= 0) {
    _0x3470fa = _0x3470fa.sort(function (_0x48e06e, _0x4753be) {
      return _0x4753be.n - _0x48e06e.n;
    });
  }
  if (_0x3470fa.length > 0) {
    for (let _0x574ab8 in _0x3470fa) {
      if (_0x3470fa[_0x574ab8].l == null) {
        _0x3470fa[_0x574ab8].g = _0x3470fa[_0x574ab8].g.replace(/\s/g, "");
        _0x4cf35e += "\n                    <div class=\"col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4\">\n                        <div class=\"card h-100\">\n                            <a class=\"overlayLink\" href=\"/" + _0x3470fa[_0x574ab8].g + "\"></a>\n                            <div class=\"card-header text-center font-weight-bold text-truncate p-2\">" + _0x3470fa[_0x574ab8].g + "</div>\n                            <div class=\"card-body p-2\">\n                                <img class=\"card-img-top img-fluid mb-2\" loading=\"lazy\" src=\"" + GetImageToNl(_0x3470fa[_0x574ab8].a) + "\" alt=\"" + _0x3470fa[_0x574ab8].g + "\">\n                                <p class=\"card-text\">" + (_0x3470fa[_0x574ab8].d + (_0x3470fa[_0x574ab8].t != null ? "<br><b>(" + _0x3470fa[_0x574ab8].t + ")</b>" : "")) + "</p>\n                            </div>\n                            <div class=\"card-footer bg-transparent p-2\">\n                                <p class=\"card-text text-muted float-right\">" + _0x3470fa[_0x574ab8].n + "\n                                    <img class=\"ml-1\" src=\"" + xConfig.dir + "img/navbar/" + _0x321673 + ".svg\" alt=\"\">\n                                </p>\n                            </div>\n                        </div>\n                    </div>\n                ";
      } else {
        xConfig.numPages = _0x3470fa[_0x574ab8].l;
        for (let _0x46d48a = 1; _0x46d48a <= 5; _0x46d48a++) {
          let _0x4a5206 = document.querySelector("#p" + _0x46d48a);
          let _0x5e234b = document.querySelector("#pp" + _0x46d48a);
          if (_0x46d48a > xConfig.numPages) {
            _0x4a5206?.classList.add("d-none");
            _0x5e234b?.classList.add("d-none");
          } else {
            _0x4a5206?.classList.remove("d-none");
            _0x5e234b?.classList.remove("d-none");
          }
        }
      }
    }
  }
  _0x4cf35e += "</div></div>";
  document.querySelector(_0x1c545a).innerHTML = _0x4cf35e;
  if (xConfig.list) {
    loadHash(xConfig.list);
  }
}
function doHome(_0x295b76) {
  xpromo(_0x295b76.n, _0x295b76.a);
  xConfig.page = 0;
  let _0x22633f = "featured";
  switch (GET.hash) {
    case "popular":
    case "promoted":
    case "supported":
    case "games":
      _0x22633f = GET.hash;
  }
  _0x22633f = "x" + _0x22633f;
  clist(document.querySelector("#" + _0x22633f), "p1", _0x22633f);
  pmain();
}
function doIframeModal() {
  let _0x118f6f = xConfig.gn;
  let _0x253de5 = getIndividualiFrames();
  let _0x404035 = document.querySelector("#groupsList");
  let _0x44b8b4 = document.querySelector("#groupListSpan");
  let _0x425a9b = document.querySelector("#iframeSave");
  let _0x5744ec = document.querySelector("#globalIframe");
  let _0x5d458b = document.querySelector("#IndividualIframe");
  _0x253de5.disabled ||= [];
  _0x253de5.list ||= [];
  _0x5744ec.checked = _0x253de5.global;
  _0x5d458b.checked = guessIfXatFrame(_0x118f6f);
  if (_0x253de5.list && _0x253de5.list.length > 0) {
    _0x404035.classList.remove("d-none");
    _0x44b8b4.innerHTML = _0x253de5.list.join(", ");
  } else {
    _0x404035.classList.add("d-none");
  }
  _0x425a9b.addEventListener("click", _0x5ec6ab => {
    _0x5ec6ab.preventDefault();
    _0x253de5.global = _0x5744ec.checked;
    if (_0x253de5.list) {
      let _0x15f189 = _0x253de5.list.indexOf(_0x118f6f);
      if (_0x5d458b.checked) {
        if (_0x15f189 == -1) {
          _0x253de5.list.push(_0x118f6f);
          if (_0x253de5.disabled && _0x253de5.disabled.indexOf(_0x118f6f) >= 0) {
            _0x253de5.disabled.splice(_0x253de5.disabled.indexOf(_0x118f6f), 1);
          }
        }
      } else {
        if (_0x253de5.list.indexOf(_0x118f6f) >= 0 && _0x15f189 !== -1) {
          _0x253de5.list.splice(_0x15f189, 1);
        }
        if (_0x253de5.disabled && _0x253de5.disabled.indexOf(_0x118f6f) == -1) {
          _0x253de5.disabled.push(_0x118f6f);
        }
      }
    }
    localStorage.setItem(iframeStorage, JSON.stringify(_0x253de5));
    updateIframe();
  });
  localize(["web", "chats"]);
}
function updateIframe() {
  let _0x454440 = guessIfXatFrame();
  let _0x20d06d = document.querySelector("#groupBackgroundFrame");
  if (_0x454440) {
    if (xConfig.if && _0x20d06d) {
      _0x20d06d.setAttribute("src", xConfig.if);
    }
  } else {
    if (_0x20d06d) {
      _0x20d06d.removeAttribute("src");
    }
    if (xConfig.background) {
      if (xConfig.background.charAt(0) == "#") {
        document.body.style.background = xConfig.background;
      } else {
        document.body.style.backgroundImage = "url('" + xConfig.background + "')";
      }
    }
  }
}
function getIndividualiFrames() {
  let _0x4a0437 = {
    global: true,
    list: [xConfig.gn],
    disabled: []
  };
  try {
    let _0x257eae = localStorage.getItem(iframeStorage);
    if (_0x257eae == null) {
      return _0x4a0437;
    } else {
      _0x257eae = JSON.parse(_0x257eae);
      return _0x257eae;
    }
  } catch (_0x283883) {
    return _0x4a0437;
  }
  localize(["web", "chats"]);
}
function getAppName(_0xc0f0d9) {
  if (_0xc0f0d9 === "doodle2") {
    return "doodle";
  } else {
    return _0xc0f0d9;
  }
}
if (!mDirect) {
  initConfig();
  main();
}
xConfig.debugBox = "box/embed.html?n=" + n;
xConfig.gn = n;
xConfig.debugNoLogs = true;
xConfig.debugFetchGroup = true;
xConfig.debugTooltips = true;
let newBut = document.querySelector(".newBut");
if (newBut && new Date() <= new Date("2024-11-20") && new Date() >= new Date("2024-11-10")) {
  newBut.classList.remove("d-none");
}