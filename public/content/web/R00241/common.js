'use strict';

let ReleaseMode = 0;
let listenersList = [];
let locationOrigin = window.location.origin;
if (locationOrigin !== "") {
  locationOrigin = "";
}
let Direct;
let Home;
let soltodo;
let mDirect;
let n;
let origin = locationOrigin !== "" ? "" : locationOrigin;
let endPoints = {
  register: origin + "/web_gear/chat/register5.php",
  powers: origin + "/web_gear/chat/powers.php",
  announce: origin + "/web_gear/chat/Announce.php",
  smw: origin + "/images/smw/",
  wiki: "https://xat.wiki/",
  pow2: origin + "/web_gear/chat/pow2.php",
  getImage7: "/web_gear/chat/GetImage7.php",
  avatarDirectory: origin + "/web_gear/chat/av/",
  store: {
    promotion: origin + "/web_gear/chat/promotion2.php",
    transfer: origin + "/web_gear/chat/TransferGroup2.php",
    shortname: origin + "/web_gear/chat/BuyShortName2.php",
    powersAces: origin + "/web_gear/chat/GetPowers5.php",
    acestime: origin + "/web_gear/chat/GetAces.php",
    buy: origin + "/web_gear/chat/buy2.php",
    auction: origin + "/web_gear/chat/Auction2.php",
    dx: origin + "/web_gear/chat/DaysToXats2.php",
    x2d: origin + "/web_gear/chat/XatsToDays2.php"
  }
};
let xConfig = {};
let GET = getGET();
let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const offgps = ["aiuto", "ajuda", "ajutor", "assistance", "ayuda", "cambio", "chat", "flirt", "game", "helfen", "help", "la_stanza", "loja", "mosa3adeh", "sohbet", "trade", "yardim", "xat"];
let dir = "../src/";
let json = document.getElementById("xjson");
json &&= JSON.parse(json.innerHTML);
if (json && (json.dir && (dir = json.dir), dir == "/" && (dir = ""), json.Direct && isMobile && JSON.parse(localStorage.getItem("Settings"))?.classic != "enable")) {
  let e = window.location.href.match(/\/\/.*?\/([a-zA-Z0-9_]*)/);
  if (e && e[1]) {
    document.body.innerHTML = "";
    let a = document.createElement("iframe");
    if (GET.params.n) {
      e[1] = GET.params.n;
    }
    a.src = dir + "box/embed.html#!&app=1&n=" + e[1];
    a.style.cssText = "position:fixed;top:0;left:0;bottom:0;right:0;width:100%;height:100%;border:none;margin:0;padding:0;overflow:hidden;z-index:999999;";
    document.body.appendChild(a);
    mDirect = 1;
  }
}
$("body").removeClass("d-none");
let scriptCont = $("#scriptCont");
if (scriptCont) {
  scriptCont.removeClass("d-none");
}
let lBackground = "#00004424";
const logoEvents = [{
  month: [12, 1],
  date: [28, 3],
  logos: ["newyear1", "newyear2", "newyear3", "newyear4", "newyear5", "newyear6", "newyear7", "newyear8", "newyear9", "newyear10"]
}, {
  month: 2,
  date: [7, 15],
  logos: ["valentine1", "valentine2", "valentine3", "valentine4", "valentine5", "valentine6", "valentine7", "valentine8", "valentine9", "valentine10", "valentine11", "valentine12", "valentine13", "valentine14", "valentine15", "valentine16", "valentine17", "valentine18", "valentine19", "valentine20"]
}, {
  month: 7,
  date: [3, 4],
  logos: ["fourth1", "fourth2", "fourth3", "fourth4", "fourth5", "fourth6", "fourth7", "fourth8", "fourth9", "fourth10", "fourth11", "fourth12"]
}, {
  month: 9,
  date: [13, 18],
  logos: ["anni1", "anni2", "anni3", "anni4", "anni5", "anni6", "anni7", "anni8", "anni9", "anni10", "anni11", "anni12"]
}, {
  month: 10,
  date: [20, 31],
  logos: ["halloween1", "halloween2", "halloween3", "halloween4", "halloween5", "halloween6", "halloween7", "halloween8", "halloween9", "halloween10", "halloween11", "halloween12", "halloween13", "halloween14", "halloween15", "halloween16", "halloween17", "halloween18", "halloween19", "halloween20", "halloween21", "halloween22", "halloween23", "halloween24"]
}, {
  month: 12,
  date: [1, 27],
  logos: ["xmas1", "xmas2", "xmas3", "xmas4", "xmas5", "xmas6", "xmas7", "xmas8", "xmas9", "xmas10", "xmas11", "xmas12", "xmas13", "xmas14", "xmas15", "xmas16", "xmas17", "xmas18", "xmas19", "xmas20", "xmas21", "xmas22", "xmas23", "xmas24"]
}, {
  month: 4,
  date: [17, 21],
  logos: ["easter1", "easter2", "easter3", "easter4", "easter5", "easter6", "easter7", "easter8", "easter9", "easter10", "easter11", "easter12"]
}, {
  month: 3,
  date: [15, 17],
  logos: ["patricks1", "patricks2", "patricks3", "patricks4", "patricks5", "patricks6", "patricks7", "patricks8"]
}];
function initConfig() {
  xConfig = {
    lang: "en",
    name: "direct",
    origin: location.origin
  };
  xConfig.dir = dir;
  if (!(xConfig.cookies & 2)) {
    xConfig.lang = GetWeb().lang;
    xConfig.lang ||= localStorage.getItem("xat_lang");
    xConfig.lang ||= getCookie("lang");
  }
  if (!xConfig.lang || xConfig.lang == "default") {
    xConfig.lang = getFirstBrowserLanguage();
  }
  let _0x4d72a1 = GET.params.lang;
  if (_0x4d72a1) {
    xConfig.lang = _0x4d72a1;
  }
  xConfig.lang ||= "en";
  xConfig.lang = xConfig.lang.toLowerCase();
  if (typeof mainJs == "function") {
    mainJs();
  }
  if (isXatBirthday()) {
    bdayNav();
  }
  sendRequest(endPoints.announce + "?c=" + Date.now(), null, null, null, _0x3d1699 => {
    const {
      BlackFriday: _0x53497f,
      Announce: _0x19dc82
    } = _0x3d1699;
    if (_0x53497f) {
      const {
        XatsBackBuy: _0x579c53,
        XatsBackSpend: _0xf550f1
      } = _0x53497f;
      if (_0x579c53 && _0x579c53.enabled) {
        xatsbackAd();
        document.getElementById("buygetxb")?.classList?.remove("d-none");
        document.getElementById("xbBuyInfo")?.classList?.remove("d-none");
        if (_0x579c53.ends) {
          countdown(_0x579c53.ends, document.getElementById("xatsBackBuyCountdown"));
        }
      }
      if (_0xf550f1 && _0xf550f1.enabled) {
        document.getElementById("xbCheckXback")?.classList?.remove("d-none");
        if (_0xf550f1.ends) {
          document.getElementById("xbUse")?.classList?.remove("d-none");
          countdown(_0xf550f1.ends, document.getElementById("xatsBackSpendCountdown"));
        }
      }
    }
    if (_0x19dc82) {
      for (let _0x396850 in _0x19dc82) {
        const _0x48326a = document.querySelector(_0x396850);
        if (_0x48326a) {
          _0x48326a.classList.remove("d-none");
          _0x48326a.innerHTML = "";
          if (typeof _0x19dc82[_0x396850] == "string") {
            makeElement(_0x48326a, "span").innerHTML = _0x19dc82[_0x396850];
            makeElement(_0x48326a, "br");
          } else {
            for (let _0xd4fe9a in _0x19dc82[_0x396850]) {
              makeElement(_0x48326a, "span").innerHTML = _0x19dc82[_0x396850][_0xd4fe9a];
              makeElement(_0x48326a, "br");
            }
          }
        }
      }
    }
  });
}
const debounce = _0x4bb30c => {
  let _0x4145fe;
  return function () {
    for (var _0xb531cf = arguments.length, _0x419fdd = new Array(_0xb531cf), _0x207387 = 0; _0x207387 < _0xb531cf; _0x207387++) {
      _0x419fdd[_0x207387] = arguments[_0x207387];
    }
    if (_0x4145fe) {
      cancelAnimationFrame(_0x4145fe);
    }
    _0x4145fe = requestAnimationFrame(() => {
      _0x4bb30c(..._0x419fdd);
    });
  };
};
const storeScroll = () => {
  document.documentElement.dataset.scroll = window.scrollY;
};
function startAnalyticsFour() {
  try {
    if (!(xConfig.cookies & 2)) {
      let _0x5e9119 = document.createElement("script");
      function _0x3fd176() {
        dataLayer.push(arguments);
      }
      _0x5e9119.async = true;
      _0x5e9119.src = "https://www.googletagmanager.com/gtag/js?id=G-P4SDK5JMQ9";
      document.head.append(_0x5e9119);
      window.dataLayer = window.dataLayer || [];
      _0x3fd176("js", new Date());
      _0x3fd176("config", "G-P4SDK5JMQ9");
    }
  } catch (_0x21b0d6) {}
}
function setUser() {
  if (xConfig.username) {
    document.querySelector("#navUsernameId").innerHTML = "\n            <div class=\"media m-0 ml-2\">\n                <img class=\"mr-0 ml-1\" src=\"" + xConfig.avatar + "\" width=\"33\" height=\"33\" alt=\"avatar\">\n                <div class=\"media-body\">\n                    <p class=\"m-0\">" + xConfig.username + "<br>" + xConfig.id + "</p>\n                </div>\n            </div>\n        ";
  }
  if (Home && xConfig.username !== undefined && xConfig.username.length > 0) {
    let _0x498562 = "<span data-localize=index.welcomereg>Find a xat group that shares your interests. Make your own xat group. Get and trade Powers. Play a multiplayer game. Design your own animated avatar character. Send stickers with custom text.</span>";
    let _0x47ffaf = document.querySelector("#newtoxat");
    let _0x1bb5af = document.querySelector("#newtodesc");
    _0x47ffaf?.removeAttribute("data-localize");
    _0x47ffaf.innerHTML = "<h4><span data-localize=index.hello>Hello</span>, " + xConfig.username + "!</h4>";
    _0x1bb5af?.removeAttribute("data-localize");
    _0x1bb5af.innerHTML = _0x498562;
    localize(["index"]);
  }
  let _0x5a2c28 = document.querySelector("#navAccountBadge");
  xConfig.accountBadge ||= 0;
  _0x5a2c28.innerText = xConfig.accountBadge || 0;
  if (xConfig.accountBadge == 0 || ReleaseMode) {
    _0x5a2c28?.classList.add("d-none");
  }
}
function setLoggedin() {
  var _navLogin = document.getElementById("navLogin");
  if (!_navLogin) return;
  if (xConfig.username) {
    _navLogin.addEventListener("click", function () {
      directConfig("login");
    });
    directConfig("login");
  } else {
    _navLogin.href = "/login";
    _navLogin.removeAttribute("data-toggle");
    _navLogin.removeAttribute("data-target");
    _navLogin.addEventListener("click", function () {
      window.location.href = "/login";
    });
  }
}
function readUser() {
  try {
    xConfig.cookies = localStorage.getItem("cookies");
  } catch (_0x54f96b) {
    return;
  }
  let _0x57bd8e = localStorage.getItem("todo");
  _0x57bd8e &&= JSON.parse(_0x57bd8e);
  if (_0x57bd8e && _0x57bd8e.w_userno) {
    xConfig.id = _0x57bd8e.w_userno;
    xConfig.k2 = _0x57bd8e.w_k2;
    xConfig.username = _0x57bd8e.w_registered ? _0x57bd8e.w_registered : "";
    xConfig.avatar = "";
    if (_0x57bd8e.w_avatar) {
      xConfig.avatar = _0x57bd8e.w_avatar.split("#");
      xConfig.avatar = xConfig.avatar[0];
    }
    xConfig.avatar = xConfig.avatar && xConfig.avatar.substring(0, 4) === "http" ? endPoints.getImage7 + "?s&W=30&H=30&U=" + xConfig.avatar : parseInt(xConfig.avatar) > 0 ? "" + endPoints.avatarDirectory + parseInt(xConfig.avatar) + ".png" : endPoints.avatarDirectory + "42.png";
  }
  if (xConfig.cookies != null && xConfig.cookies >= 0) {
    xConfig.cookies = xInt(xConfig.cookies) & -2;
    setPrivacy(xConfig.cookies);
  }
}
function fetchPromo(_0x56d81e) {
  return new Promise((_0x1d8311, _0x1abc74) => {
    let _0x3200f9 = {
      date: new Date()
    };
    _0x3200f9.cb60 = parseInt((_0x3200f9.date.getTime() + 30000) / 60000);
    _0x3200f9.lang = xConfig.lang;
    _0x3200f9.xcb_l = "996Vc";
    fetch("/json/promo.php?c=" + _0x3200f9.cb60).then(function (_0x49eb71) {
      return _0x49eb71.json();
    }).then(function (_0x1e494f) {
      let _0x2d12cd = _0x3200f9.lang.substr(0, 2);
      xConfig.xpromo = _0x2d12cd = _0x1e494f[_0x2d12cd];
      if (!_0x2d12cd) {
        xConfig.xpromo = _0x2d12cd = _0x1e494f.n0;
      }
      if (!$("#GroupsList").length) {
        $("#navGroupsItems").prepend("<div id=\"GroupsList\"></div>");
      }
      let _0x3ef064 = $("#GroupsList");
      if (_0x56d81e) {
        _0x3ef064.html("");
      }
      xConfig.xpromo = _0x2d12cd = Array.from(new Set(_0x2d12cd.map(_0x9db8ec => _0x9db8ec.n))).map(_0x89e5dd => _0x2d12cd.find(_0x5d7e17 => _0x5d7e17.n === _0x89e5dd));
      let _0x128c37 = "";
      for (let _0x4bd766 in _0x2d12cd) {
        _0x128c37 += "<a class=\"dropdown-item\" href=\"/" + _0x2d12cd[_0x4bd766].n + "\"><img class=\"mr-2\" src=\"" + xConfig.dir + "img/navbar/promoted.svg\" alt=\"promoted\">" + _0x2d12cd[_0x4bd766].n + "</a>";
      }
      if (_0x128c37 !== "") {
        _0x128c37 += "<div class=\"dropdown-divider\"></div>";
        _0x3ef064.append(_0x128c37);
        _0x3ef064.prepend("<h6 class=\"dropdown-header text-center\" data-localize=\"web.promgroups\">Promoted Groups</h6>");
      }
      if (!Direct) {
        _0x1d8311(_0x2d12cd[Math.floor(Math.random() * _0x2d12cd.length)]);
      }
    });
    if (Direct) {
      _0x1d8311();
    }
  });
}
function Sanitize(_0x2a6219, _0x4a8930) {
  _0x4a8930 ||= /[^0-9a-zA-Z_\-]/g;
  return _0x2a6219.replace(_0x4a8930, '');
}
function getFirstBrowserLanguage() {
  let _0x22bdc6;
  let _0x14c3f;
  let _0x4c89a5 = window.navigator;
  let _0x48d2f0 = ["language", "browserLanguage", "systemLanguage", "userLanguage"];
  if (Array.isArray(_0x4c89a5.languages)) {
    for (_0x22bdc6 = 0; _0x22bdc6 < _0x4c89a5.languages.length; _0x22bdc6++) {
      _0x14c3f = _0x4c89a5.languages[_0x22bdc6];
      if (_0x14c3f && _0x14c3f.length) {
        return _0x14c3f;
      }
    }
  }
  for (_0x22bdc6 = 0; _0x22bdc6 < _0x48d2f0.length; _0x22bdc6++) {
    _0x14c3f = _0x4c89a5[_0x48d2f0[_0x22bdc6]];
    if (_0x14c3f && _0x14c3f.length) {
      return _0x14c3f;
    }
  }
  return null;
}
function xInt(_0x1b7254) {
  _0x1b7254 = parseInt(_0x1b7254);
  if (isNaN(_0x1b7254)) {
    return 0;
  } else {
    return _0x1b7254;
  }
}
function Reset() {
  $(".HideDiv").addClass("d-none");
  $(".ClrDiv").html("");
  $(document.body).css({
    cursor: "default"
  });
  allErrsOff();
}
function allErrsOff() {
  $(".is-invalid").removeClass("is-invalid");
  $(".ClrErr").html("");
  $(".ClrErr").addClass("d-none");
}
function PassReveal(_0x2ddeb2) {
  let _0x4caa66 = _0x2ddeb2.parent().prev();
  if (_0x4caa66.prop("type") == "text") {
    _0x4caa66.prop("type", "password");
  } else {
    _0x4caa66.prop("type", "text");
  }
}
function commonPost() {
  let _0x8acbe1;
  try {
    _0x8acbe1 = localStorage.getItem("todo");
  } catch (_0x59e11f) {}
  _0x8acbe1 &&= JSON.parse(_0x8acbe1);
  _0x8acbe1 ||= {};
  let _0x5f051b = {
    DeviceId: _0x8acbe1.DeviceId,
    PassHash: _0x8acbe1.PassHash,
    YourEmail: $("#username").val(),
    password: $("#password").val(),
    agree: $("#agreeterms").prop("checked") ? "ON" : 0
  };
  if (GET.params.f) {
    _0x5f051b.f = Sanitize(GET.params.f);
  }
  if (GET.params.test) {
    _0x5f051b.test = Sanitize(GET.params.test);
  }
  soltodo = _0x8acbe1;
  return _0x5f051b;
}
function DoErrs(_0x203540, _0x2356ff) {
  let _0xf7ff83;
  $(".invalid-feedback").html("");
  if (_0x203540.Err) {
    let _0x5a97d8 = ["auctionphase", "moreinfo", "delsuccess", "settings"];
    for (let _0x4e71ca in _0x203540.Err) {
      let _0x50c42d = _0x4e71ca;
      if (_0x4e71ca == "promolang") {
        _0x50c42d = "promotion";
      }
      _0xf7ff83 = $("#" + _0x50c42d + "err");
      if (_0xf7ff83) {
        _0xf7ff83.html(_0x203540.Err[_0x4e71ca]);
        _0xf7ff83.removeClass("d-none");
        if (_0xf7ff83.hasClass("alert") && _0x5a97d8.indexOf(_0x4e71ca) === -1) {
          _0xf7ff83.removeClass("alert-success alertsuc alert-danger");
          if (_0x50c42d.endsWith("ok")) {
            _0xf7ff83.addClass("alert-success");
          } else {
            _0xf7ff83.addClass("alert-danger");
          }
        }
        _0xf7ff83 = $("#" + _0x50c42d);
        if (_0xf7ff83 && (_0xf7ff83.hasClass("form-control") || _0xf7ff83.hasClass("custom-control-input"))) {
          _0xf7ff83.addClass("is-invalid");
        }
      }
    }
  }
}
function isAprilFirst() {
  const _0x2d47c6 = new Date();
  _0x2d47c6.getDate();
  _0x2d47c6.getMonth();
  return false;
}
function bdayNav() {
  let _0x59d902 = document.getElementById("navTop");
  if (_0x59d902) {
    _0x59d902.classList.add("bdayTheme");
  }
  const _0x4cafe7 = document.querySelector("#navLogo");
  if (_0x4cafe7 && _0x4cafe7.dataset.placement == null) {
    _0x4cafe7.setAttribute("data-toggle-second", "tooltip");
    _0x4cafe7.setAttribute("data-placement", "top");
  }
}
function SetNewTodo(_0x266312) {
  if (_0x266312) {
    let _0x494815;
    try {
      _0x494815 = JSON.parse(localStorage.getItem("todo"));
    } catch (_0x130d20) {}
    if (!_0x494815 || typeof _0x494815 != "object") {
      _0x494815 = {};
    }
    _0x494815.MobNo = _0x266312.MobNo;
    _0x494815.DeviceId = _0x266312.DeviceId;
    _0x494815.PassHash = _0x266312.PassHash;
    _0x494815.w_userno = _0x266312.w_userno;
    _0x494815.w_registered = _0x266312.w_registered;
    _0x494815.mtime = _0x266312.mtime;
    if (!(xConfig.cookies & 2)) {
      const _0x4bef43 = _0x266312.DeviceId + "," + _0x266312.PassHash + "," + _0x266312.w_userno;
      setCookie("sca", _0x4bef43, 0);
      setCookie("sca", _0x4bef43, 30, true);
    }
    try {
      localStorage.setItem("todo", JSON.stringify(_0x494815));
    } catch (_0x14b9be) {}
  }
}
function AddCap(_0x533fbe) {
  const _0x4976fd = $("#" + _0x533fbe);
  _0x4976fd.empty();
  const _0x98e66e = $("<div class=\"cf-turnstile\" data-sitekey=\"0x4AAAAAAA9W0lpWWjpGMSxN\" data-theme=\"light\" data-size=\"normal\"></div>");
  _0x4976fd.append(_0x98e66e);
  if (window.turnstile) {
    window.turnstile.render(_0x98e66e[0]);
  } else {
    const _0x20fed3 = document.createElement("script");
    _0x20fed3.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?compat=recaptcha";
    _0x20fed3.async = true;
    _0x20fed3.defer = true;
    document.body.appendChild(_0x20fed3);
  }
}
function urlPost(_0x5c8361, _0x5dcd22) {
  return new Promise((_0x22685e, _0x20a3ee) => {
    let _0x3fd010 = {
      method: "GET",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    };
    if (_0x5dcd22) {
      _0x3fd010.method = "POST";
      _0x3fd010.body = $.param(_0x5dcd22);
    }
    fetch(_0x5c8361, _0x3fd010).then(function (_0x3ffbd2) {
      return _0x3ffbd2.json();
    }).then(function (_0x43a8aa) {
      _0x22685e(_0x43a8aa);
    }).catch(_0x435545 => {
      _0x20a3ee(new Error(_0x435545));
    });
  });
}
function makeElement(_0x2e5f84, _0x583a3d, _0x5c8609, _0x9097b4) {
  let _0x4d64dd = document.createElement(_0x583a3d);
  if (_0x5c8609) {
    _0x4d64dd.className = _0x5c8609;
  }
  if (_0x9097b4) {
    _0x4d64dd.id = _0x9097b4;
  }
  if (_0x2e5f84) {
    _0x2e5f84.appendChild(_0x4d64dd);
  }
  return _0x4d64dd;
}
function addText(_0x3946da, _0x200b57) {
  if (Array.isArray(_0x200b57)) {
    if (Array.isArray(_0x200b57[0])) {
      for (let _0x40d8c8 in _0x200b57) {
        addText(_0x3946da, _0x200b57[_0x40d8c8]);
      }
      return "";
    }
    if (_0x200b57[0]) {
      (_0x3946da = makeElement(_0x3946da, "span")).setAttribute("data-localize", _0x200b57[0]);
      let _0x4ac443 = GetTranslation(_0x200b57[0]);
      _0x200b57 = _0x200b57[1];
      if (_0x4ac443) {
        _0x200b57 = _0x4ac443;
      }
    } else {
      _0x200b57 = _0x200b57[1];
    }
  }
  let _0x1c085e = document.createTextNode(_0x200b57);
  if (_0x3946da) {
    _0x3946da.appendChild(_0x1c085e);
  }
  return _0x1c085e;
}
document.addEventListener("scroll", debounce(storeScroll));
storeScroll();
let lf;
let LangFiles = {};
function GetTranslation(_0x3c7b69) {
  let _0x3b5eb1 = _0x3c7b69.split(".");
  return !!LangFiles && !!LangFiles[_0x3b5eb1[0]] && !!LangFiles[_0x3b5eb1[0]][_0x3b5eb1[1]] && LangFiles[_0x3b5eb1[0]][_0x3b5eb1[1]];
}
function getDefaultTranslationIfNotFound(_0x28d224, _0x11837d) {
  const _0x1a1a1e = GetTranslation(_0x28d224);
  return _0x1a1a1e || _0x11837d;
}
function localize(_0xe3db2b) {
  if (xConfig.lang.substr(0, 2) != "en") {
    let _0x4e140c = xConfig.lang;
    if (!lf) {
      lf = ["web"];
      if (!Direct) {
        lf = lf.concat(["index", "groups", "main"]);
      }
      if (xConfig.isStore) {
        lf = lf.concat(["buy"]);
      }
      if (_0xe3db2b) {
        lf = lf.concat(_0xe3db2b);
      }
    }
    xConfig.localizeDue = lf.length;
    for (let _0x3fce4c in lf) {
      const _0x3edff3 = "/json/translate";
      const _0x3e081a = "php";
      $("[data-localize]").localize(lf[_0x3fce4c], {
        language: _0x4e140c,
        pathPrefix: _0x3edff3,
        fileExtension: _0x3e081a,
        failCallback: localizeFail,
        callback: localizeSuccess
      });
    }
  }
}
function localizeSuccess(_0x37c6ae, _0x326891) {
  xConfig.localizeDue--;
  _0x326891(_0x37c6ae);
  if (_0x37c6ae) {
    const _0x300723 = Object.keys(_0x37c6ae);
    if (_0x300723) {
      LangFiles[_0x300723[0]] = _0x37c6ae[_0x300723];
    }
  }
  if (xConfig.localizeDue == 0) {
    localizeDone();
  }
}
function localizeFail() {
  xConfig.localizeDue--;
  if (xConfig.localizeDue == 0) {
    localizeDone();
  }
}
function localizeDone() {
  if (Home) {
    $("#searchBox").attr("placeholder", $("#findout").text());
  }
  if ($("#search")) {
    $("#search").attr("placeholder", $("#searchTrans").text());
  }
  $("[data-localize]").show();
}
function privacyClose() {
  let _0x3a851b = 0;
  if ($("#privacyNecessary")) {
    _0x3a851b |= $("#privacyNecessary").is(":checked") ? 0 : 1;
    _0x3a851b |= $("#privacyPerformance").is(":checked") ? 0 : 2;
    _0x3a851b |= $("#privacyGroups").is(":checked") ? 4 : 0;
    if (_0x3a851b & 1) {
      localStorage.clear();
      clearCookies();
      location.reload();
    } else {
      localStorage.setItem("cookies", _0x3a851b);
    }
    xConfig.cookies = _0x3a851b;
    if (_0x3a851b & 4) {
      privacyOpenTab();
    }
  }
  privacyClose2();
}
function clearCookies() {
  let _0x5b85fb = document.cookie.split("; ");
  for (let _0x444e0c = 0; _0x444e0c < _0x5b85fb.length; _0x444e0c++) {
    let _0x35a28e = window.location.hostname.split(".");
    while (_0x35a28e.length > 0) {
      let _0x2af0aa = encodeURIComponent(_0x5b85fb[_0x444e0c].split(";")[0].split("=")[0]) + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=" + _0x35a28e.join(".") + " ;path=";
      let _0x471c6a = location.pathname.split("/");
      for (document.cookie = _0x2af0aa + "/"; _0x471c6a.length > 0;) {
        document.cookie = _0x2af0aa + _0x471c6a.join("/");
        _0x471c6a.pop();
      }
      _0x35a28e.shift();
    }
  }
}
function privacyClose2() {
  $("#privacyModal").modal("hide");
  $("#privacyGroupFrame").addClass("d-none");
  $("#privacyGroupUrl").text("");
}
function setPrivacy(_0x591554) {
  _0x591554 = xInt(_0x591554);
  $("#privacyNecessary").prop("checked", !(_0x591554 & 1));
  $("#privacyPerformance").prop("checked", !(_0x591554 & 2));
  $("#privacyGroups").prop("checked", _0x591554 & 4);
}
function privacyOpenTab() {
  let _0x21926a = $("#privacyGroupUrl").text();
  if (_0x21926a) {
    tabPress(0, _0x21926a);
  }
  privacyClose2();
}
function loadDialogs() {
  loadModalDialog("embed", "embedDialog", {
    gn: xConfig.gn
  });
  loadModalDialog("sendMessage", "sendMessageDialog", {
    gn: xConfig.gn
  });
  loadModalDialog("inapp", "inappDialog", {
    gn: xConfig.gn
  });
  loadModalDialog("terms", "termsDialog", {});
  loadModalDialog("privacy", "privacyDialog", {});
  loadModalDialog("language", "languageDialog", {});
}
function loadModalDialog(_0xf25c8a, _0x3ab5fd, _0x193936) {
  if (xConfig.debugCompileHandlebars === true) {
    return fetch(xConfig.dir + "dialog/_" + _0xf25c8a + ".html").then(function (_0x507041) {
      return _0x507041.text();
    }).then(function (_0x238151) {
      let _0x2aedea = Handlebars.compile(_0x238151);
      document.getElementById(_0x3ab5fd).innerHTML = _0x2aedea(_0x193936);
    });
  }
  new Promise(function (_0x56a41f, _0x53a0be) {
    let _0x4594ba = document.createElement("script");
    document.body.appendChild(_0x4594ba);
    _0x4594ba.onload = _0x56a41f;
    _0x4594ba.onerror = _0x53a0be;
    _0x4594ba.async = true;
    _0x4594ba.src = xConfig.dir + "dialog/" + _0xf25c8a + ".js";
  }).then(function () {
    let _0x579a81 = Handlebars.templates[_0xf25c8a + ".html"];
    document.getElementById(_0x3ab5fd).innerHTML = _0x579a81(_0x193936);
  });
}
function _setLink(id, href, target) {
  var el = document.getElementById(id);
  if (!el) return;
  el.href = href;
  if (target) el.target = target;
  el.removeAttribute("data-toggle");
  el.removeAttribute("data-target");
}
function legacyLinks() {
  if (document.querySelector("#navTop")) {
    _setLink("navCreate", "/chats#!creategroup", "_blank");
    _setLink("navGroupsFeatured", "/#featured");
    _setLink("navGroupsPopular", "/#popular");
    _setLink("navGroupsSupported", "/#supported");
    _setLink("navGroupsGames", "/#games");
    _setLink("navGroupsSearch", "/search");
    _setLink("navGroupsHelp", "/_help");
    _setLink("navGroupsTrade", "/_trade");
    _setLink("navStoreBuyXats", "/buy");
    _setLink("navStorePowers", "/powers");
    _setLink("navStoreAces", "/aces");
    _setLink("navStoreShortName", "/shortname");
    _setLink("navStoreAuctions", "/auction");
    _setLink("navStorePromotion", "/promotion");
    _setLink("navStoreAds", "/ad");
    _setLink("navStoreBuyGroup", "/buygroup");
    _setLink("navxatTerms", "/terms");
    if (xConfig.gid && xConfig.gn) {
      _setLink("navGroupEvents", "/chats#!events&roomid=" + xConfig.gid + "&GroupName=" + xConfig.gn, "_blank");
      _setLink("navCustomize", "/chats#!editgroup&roomid=" + xConfig.gid + "&GroupName=" + xConfig.gn, "_blank");
    }
    if (xConfig.gn) {
      _setLink("navInapp", "/report#!group&GroupName=" + xConfig.gn, "_blank");
    }
    _setLink("navAccountedit", "/editme#" + xConfig.username);
    _setLink("navAccountxatme", "https://xat.me/" + xConfig.username);
    var _navLogout = document.getElementById("navLogout");
    if (_navLogout) _navLogout.href = "/logout";
    var _navSettings = document.getElementById("navSettings");
    if (_navSettings) _navSettings.href = "/login";
  }
}
function navClickHandlers() {
  var el;
  el = document.getElementById("privacyClose");
  if (el) el.addEventListener("click", function () {
    privacyClose();
  });
  el = document.getElementById("openPolicy");
  if (el) el.addEventListener("click", function () {
    window.open("/privacy", "_blank");
  });
  el = document.getElementById("privacyGroupButton");
  if (el) el.addEventListener("click", function () {
    privacyOpenTab();
  });
  el = document.getElementById("navxatApps");
  if (el) el.addEventListener("click", function () {
    startSide("apps");
  });
}
function directConfig(_0x199b46) {
  if (_0x199b46 === "portrait") {
    let _0x13799e = document.getElementById("embedframe");
    _0x13799e.width = "375";
    _0x13799e.height = "667";
  }
  if (_0x199b46 === "landscape") {
    let _0x102d33 = document.getElementById("embedframe");
    if (Home) {
      _0x102d33.width = "650";
      _0x102d33.height = "400";
    }
    if (Direct) {
      _0x102d33.width = "728";
      _0x102d33.height = "486";
    }
  } else if (_0x199b46 == "ad") {
    document.getElementById("adframe").src = xConfig.dir + "apps/ad/ad2.html";
  } else if (_0x199b46 == "background") {
    document.body.style.backgroundImage = "url('')";
  } else if (_0x199b46 == "login") {
    $("#accountdrop").removeClass("d-none").addClass("d-block");
    $("#navLogin").removeClass("d-block").addClass("d-none");
    $("#navRegister").removeClass("d-block").addClass("d-none");
  } else if (_0x199b46 == "mainowner") {
    $("#rankdrop").removeClass("d-block").addClass("d-none");
    $("#admindrop").removeClass("d-none").addClass("d-block");
  }
}
function cookieBar() {
  let _0x45404c = document.getElementById("cookiePopup");
  let _0x3943e2 = document.getElementById("cookieAgree");
  let _0x1e48fa = document.getElementById("cookieSettings");
  _0x45404c.offsetHeight;
  if (!Number.isInteger(xConfig.cookies)) {
    _0x45404c.classList.add("show");
  }
  _0x3943e2.addEventListener("click", function () {
    _0x45404c.classList.remove("show");
    privacyClose();
  });
  _0x1e48fa.addEventListener("click", function () {
    _0x45404c.classList.remove("show");
    $("#privacyModal").modal("show");
  });
}
function shuffleArray(_0x7140a0) {
  let _0x24adcd;
  let _0x32bb42;
  let _0x19978c;
  for (_0x19978c = _0x7140a0.length - 1; _0x19978c > 0; _0x19978c--) {
    _0x24adcd = Math.floor(Math.random() * (_0x19978c + 1));
    _0x32bb42 = _0x7140a0[_0x19978c];
    _0x7140a0[_0x19978c] = _0x7140a0[_0x24adcd];
    _0x7140a0[_0x24adcd] = _0x32bb42;
  }
  return _0x7140a0;
}
function initAuser3() {
  let _0x3c828b = "/login?mode=1&";
  let _0x4e51e3 = localStorage.getItem("todo");
  let _0x3b1c33 = document.getElementById("navRegister");
  _0x4e51e3 &&= JSON.parse(_0x4e51e3);
  if (_0x4e51e3 && _0x4e51e3.w_userno) {
    _0x3c828b += "UserId=" + _0x4e51e3.w_userno + "&k2=" + _0x4e51e3.w_k2;
    _0x3b1c33.addEventListener("click", () => {
      window.location.href = _0x3c828b;
    });
  } else {
    fetch("/web_gear/chat/auser3.php").then(function (_0x91ded6) {
      return _0x91ded6.text();
    }).then(function (_0x5bd34d) {
      const _0x215edf = _0x5bd34d.split("&UserId=")[1].split("&")[0];
      const _0x20f4fa = _0x5bd34d.split("&k2=")[1];
      _0x3c828b += "UserId=" + _0x215edf + "&k2=" + _0x20f4fa;
      _0x3b1c33.addEventListener("click", () => {
        window.location.href = _0x3c828b;
      });
    });
  }
}
function initLanguage() {
  fetch("/json/lang/languages.php").then(function (_0x1e3ae9) {
    return _0x1e3ae9.json();
  }).then(function (_0x2a2ad8) {
    const _0xbea672 = document.getElementById("langdropdownitems");
    for (const _0x5b3bd2 in _0x2a2ad8) {
      if (_0x2a2ad8[_0x5b3bd2].i) {
        const _0x3d576f = document.createElement("a");
        _0x3d576f.href = "#";
        _0x3d576f.className = "dropdown-item";
        _0x3d576f.setAttribute("data-lang", _0x2a2ad8[_0x5b3bd2].c);
        _0x3d576f.setAttribute("data-lange", _0x2a2ad8[_0x5b3bd2].f + " (" + _0x2a2ad8[_0x5b3bd2].e + ")");
        if (_0xbea672) {
          _0xbea672.appendChild(_0x3d576f);
        }
        const _0x4abbc0 = document.createElement("span");
        _0x4abbc0.innerHTML = _0x2a2ad8[_0x5b3bd2].f;
        _0x3d576f.appendChild(_0x4abbc0);
        const _0x15898c = document.createElement("small");
        _0x15898c.innerHTML = " (" + _0x2a2ad8[_0x5b3bd2].e + ")";
        _0x4abbc0.parentNode.insertBefore(_0x15898c, _0x4abbc0.nextSibling);
        if (xConfig.lang.toLowerCase() === _0x2a2ad8[_0x5b3bd2].c) {
          _0x3d576f.style.background = lBackground;
          doToolTips(_0x2a2ad8[_0x5b3bd2].f + " (" + _0x2a2ad8[_0x5b3bd2].e + ")");
        }
      }
    }
    document.querySelectorAll("[data-lang]").forEach(_0xffe5e9 => _0xffe5e9.addEventListener("click", onLang));
  });
}
function doToolTips(_0x16dd4d) {
  let _0x4f6227 = document.getElementById("navLang");
  if (_0x4f6227) {
    if (_0x4f6227.dataset.placement == null) {
      _0x4f6227.setAttribute("data-toggle-second", "tooltip");
      _0x4f6227.setAttribute("data-placement", "top");
      _0x4f6227.setAttribute("title", _0x16dd4d);
    } else {
      $("[data-toggle-second=\"tooltip\"]").tooltip("hide").attr("data-original-title", _0x16dd4d);
    }
    $("[data-toggle-second=\"tooltip\"]").tooltip({
      placement: "right",
      trigger: "hover"
    });
  }
}
function GetWeb() {
  let _0x4971bd;
  try {
    _0x4971bd = JSON.parse(localStorage.getItem("Web"));
  } catch (_0x3d2711) {}
  if (!_0x4971bd || typeof _0x4971bd != "object") {
    _0x4971bd = {};
  }
  return _0x4971bd;
}
function SetWeb(_0x2b2abc, _0x53a980) {
  let _0x2a1e2e = GetWeb();
  _0x2a1e2e[_0x2b2abc] = _0x53a980;
  try {
    localStorage.setItem("Web", JSON.stringify(_0x2a1e2e));
  } catch (_0x584f2f) {}
}
function onLang(_0x1eb360) {
  let _0xaba813;
  let _0x1f0724;
  _0xaba813 = _0x1eb360.target.dataset.lang === undefined ? _0x1eb360.target.parentNode.dataset.lang : _0x1eb360.target.dataset.lang;
  _0x1f0724 = _0x1eb360.target.dataset.lange === undefined ? _0x1eb360.target.parentNode.dataset.lange : _0x1eb360.target.dataset.lange;
  _0x1eb360.preventDefault();
  if (_0xaba813.length && _0xaba813.length == 2) {
    let _0x36b8ce = xConfig.lang;
    if (_0x36b8ce) {
      let _0x395bd9 = document.querySelector("[data-lang=\"" + _0x36b8ce + "\"]");
      if (_0x395bd9) {
        _0x395bd9.style.background = "";
      }
    }
    if (!(xConfig.cookies & 2)) {
      setCookie("lang", _0xaba813);
      SetWeb("lang", _0xaba813);
    }
    if (_0xaba813 == "en") {
      window.location.href = "//" + location.host;
      return true;
    }
    let _0x3bd57c = document.querySelector("[data-lang=\"" + _0xaba813 + "\"]");
    if (_0x3bd57c) {
      _0x3bd57c.style.background = lBackground;
    }
    xConfig.lang = _0xaba813;
    localize();
    fetchPromo(true);
    if (Home) {
      clist(document.getElementById("xfeatured"), "p1", "xfeatured");
    }
    doToolTips(_0x1f0724);
  }
}
function setCookie(_0x4b6252, _0x4de9eb, _0x365c42, _0x4c7e52) {
  let _0x61b49e = "";
  if (_0x365c42) {
    const _0xde5705 = new Date();
    _0xde5705.setTime(_0xde5705.getTime() + _0x365c42 * 24 * 60 * 60 * 1000);
    _0x61b49e = "; expires=" + _0xde5705.toUTCString();
  }
  let _0x2db0de = _0x4b6252 + "=" + encodeURIComponent(_0x4de9eb || "") + _0x61b49e + "; path=/";
  if (_0x4c7e52) {
    _0x2db0de += " ;SameSite=None; Secure";
  }
  document.cookie = _0x2db0de;
}
function getCookie(_0x3e1a1a) {
  const _0x431c3a = _0x3e1a1a + "=";
  const _0x520ec4 = document.cookie.split(";");
  for (let _0x2fb686 = 0; _0x2fb686 < _0x520ec4.length; _0x2fb686++) {
    let _0x5a1b84 = _0x520ec4[_0x2fb686];
    while (_0x5a1b84.charAt(0) == " ") {
      _0x5a1b84 = _0x5a1b84.substring(1, _0x5a1b84.length);
    }
    if (_0x5a1b84.indexOf(_0x431c3a) == 0) {
      try { return decodeURIComponent(_0x5a1b84.substring(_0x431c3a.length, _0x5a1b84.length)); } catch(e) { return _0x5a1b84.substring(_0x431c3a.length, _0x5a1b84.length); }
    }
  }
  return null;
}
function getGET() {
  let _0x584ffa = window.location.href;
  let _0x557d1c = _0x584ffa;
  let _0x2a8035 = "";
  let _0x3d619c = {};
  let _0x4e4e21 = "";
  let _0x47ade1 = [];
  if (_0x584ffa.indexOf("#") > 0) {
    _0x4e4e21 = _0x584ffa.substr(_0x584ffa.indexOf("#") + 1);
    _0x557d1c = _0x584ffa = _0x584ffa.substr(0, _0x584ffa.indexOf("#"));
  }
  if (_0x584ffa.indexOf("?") > 0) {
    _0x557d1c = _0x584ffa.substr(0, _0x584ffa.indexOf("?"));
    _0x2a8035 = _0x584ffa.substr(_0x584ffa.indexOf("?") + 1);
    _0x47ade1 = _0x2a8035.split("&");
  }
  let _0xa6883a = _0x4e4e21.split("&");
  _0x4e4e21 = _0xa6883a.shift();
  _0x47ade1 = _0x47ade1.concat(_0xa6883a);
  for (let _0x2b03be = 0; _0x2b03be < _0x47ade1.length; _0x2b03be++) {
    let _0x49a910 = _0x47ade1[_0x2b03be].split("=");
    _0x3d619c[decodeURIComponent(_0x49a910[0])] = decodeURIComponent(_0x49a910[1]).replace(/[^0-9a-zA-Z_\-]/g, "");
  }
  let _0x53612e = /\/\/([\w.-]*)/.exec(_0x557d1c);
  let _0x397a8f = _0x53612e != null && _0x53612e.length > 1 ? _0x53612e[1] : "";
  _0x53612e = /\/\/[\w.-]*(?:\/([^?]*))/.exec(_0x557d1c);
  _0x557d1c = _0x53612e != null && _0x53612e.length > 1 ? _0x53612e[1] : "";
  return {
    hash: _0x4e4e21,
    params: _0x3d619c,
    path: _0x557d1c,
    host: _0x397a8f
  };
}
function setLogo() {
  let _0x3c0979 = [];
  const _0x4a0b04 = new Date();
  const _0x2713b1 = _0x4a0b04.getDate();
  const _0x314fa5 = _0x4a0b04.getMonth() + 1;
  const _0x1d8e02 = _0x4a0b04.getFullYear();
  const _0x468dd0 = logoEvents.find(_0x3d316f => Array.isArray(_0x3d316f.month) ? _0x3d316f.month.includes(_0x314fa5) && _0x2713b1 >= _0x3d316f.date[0] : _0x3d316f.month == _0x314fa5);
  if (_0x468dd0) {
    if (Array.isArray(_0x468dd0.date)) {
      if (Array.isArray(_0x468dd0.month)) {
        const _0x48f9bc = new Date(_0x1d8e02, _0x468dd0.month[0], _0x468dd0.date[0]).getTime();
        const _0x35db8d = new Date(_0x1d8e02, _0x314fa5, _0x2713b1).getTime();
        const _0x5e60e6 = new Date(_0x468dd0.month[0] > _0x468dd0.month[1] ? _0x1d8e02 + 1 : _0x1d8e02, _0x468dd0.month[1], _0x468dd0.date[1]).getTime();
        if (_0x35db8d >= _0x48f9bc && _0x35db8d <= _0x5e60e6) {
          _0x3c0979 = _0x468dd0.logos;
        }
      } else {
        _0x3c0979 = _0x2713b1 >= _0x468dd0.date[0] && _0x2713b1 <= _0x468dd0.date[1] ? _0x468dd0.logos : [];
      }
    } else {
      _0x3c0979 = _0x468dd0.date == _0x2713b1 ? _0x468dd0.logos : [];
    }
    if (_0x3c0979.length) {
      const _0x174810 = "/images/logo/" + _0x3c0979[Math.floor(Math.random() * _0x3c0979.length)] + ".png";
      let _0x4e37c3 = document.getElementById("navLogo");
      if (_0x4e37c3) {
        _0x4e37c3.src = _0x174810;
        _0x4e37c3.style.paddingRight = "10px";
      }
    }
  }
}
function filter(_0x143faf, _0x37f6aa) {
  const _0x594c35 = _0x37f6aa ? "[\\<>]" : "['\"<>&]";
  if (Array.isArray(_0x143faf) || typeof _0x143faf == "object") {
    for (let _0x25bab4 in _0x143faf) {
      if (typeof _0x143faf != "object" && isNaN(_0x143faf[_0x25bab4]) && _0x143faf[_0x25bab4] && _0x143faf[_0x25bab4] !== undefined) {
        if (_0x37f6aa) {
          _0x143faf[_0x25bab4] = decodeEntities(_0x143faf[_0x25bab4]);
        }
        _0x143faf[_0x25bab4] = _0x143faf[_0x25bab4].replace(new RegExp(_0x594c35, "gi"), "").replace(/\\/gi, "");
      }
    }
  } else if (isNaN(_0x143faf) && _0x143faf !== undefined) {
    if (_0x37f6aa) {
      _0x143faf = decodeEntities(_0x143faf);
    }
    _0x143faf = _0x143faf.replace(new RegExp(_0x594c35, "gi"), "").replace(/\\/gi, "");
  }
  return _0x143faf;
}
function doSuccessMsg(_0x5a6342, _0x3d00ce, _0x554cd2, _0x118e30, _0x2ae2ea) {
  if (!_0x5a6342) {
    return false;
  }
  if (_0x554cd2 == null) {
    _0x554cd2 = true;
  }
  if (_0x118e30 == null) {
    _0x118e30 = "chats";
  }
  let _0x569e05 = "<button class=\"close closesuc\" type=\"button\" data-hide=\"true\">×</button>";
  _0x569e05 += _0x3d00ce;
  if (_0x2ae2ea) {
    _0x5a6342.classList.add("alert-success", "alertsuc", "alert-dismissible");
    _0x5a6342.innerHTML = "";
    if (!_0x5a6342.classList.contains("alert")) {
      _0x5a6342.classList.add("alert");
    }
    _0x5a6342.classList.remove("alert-danger", "alerterr", "d-none");
    _0x5a6342.innerHTML = _0x554cd2 ? _0x569e05 : _0x3d00ce;
    document.querySelector("[data-hide]")?.addEventListener("click", _0x23f096 => {
      _0x23f096.preventDefault();
      _0x5a6342.classList.add("d-none");
    });
  } else {
    _0x5a6342.hide();
    _0x5a6342.html("");
    _0x5a6342.addClass("alert-success alertsuc");
    _0x5a6342.addClass("alert-dismissible");
    if (!_0x5a6342.hasClass("alert")) {
      _0x5a6342.addClass("alert");
    }
    _0x5a6342.removeClass("alert-danger alerterr");
    if (_0x554cd2) {
      _0x5a6342.html(_0x569e05);
    } else {
      _0x5a6342.html(_0x3d00ce);
    }
    _0x5a6342.show(100, function (_0x538200) {
      if (_0x5a6342.hasClass("d-none")) {
        _0x5a6342.removeClass("d-none");
      }
    });
    $("[data-hide]").off("click").on("click", function (_0x49ed0e) {
      _0x49ed0e.preventDefault();
      $(this).parent().addClass("d-none");
    });
  }
  let _0x184ef1 = ["buy", "edit"];
  if (_0x118e30) {
    if (Array.isArray(_0x118e30)) {
      for (let _0x2f5d9b in _0x118e30) {
        _0x184ef1.push(_0x118e30[_0x2f5d9b]);
      }
    } else {
      _0x184ef1.push(_0x118e30);
    }
  }
  localize(_0x118e30);
}
function doErrorMsg(_0x2861a0, _0x36b044, _0xae811c, _0x440e1b) {
  if (!_0x2861a0) {
    return false;
  }
  if (_0xae811c == null) {
    _0xae811c = true;
  }
  if (_0x440e1b == null) {
    _0x440e1b = "chats";
  }
  _0x2861a0.hide();
  _0x2861a0.html("");
  _0x2861a0.addClass("alert-danger alerterr");
  _0x2861a0.addClass("alert-dismissible");
  if (!_0x2861a0.hasClass("alert")) {
    _0x2861a0.addClass("alert");
  }
  _0x2861a0.removeClass("alert-success alertsuc");
  if (_0xae811c) {
    let _0xa2f405 = "<button class=\"close closeerr\" type=\"button\" data-hide=\"true\">×</button>";
    _0xa2f405 += _0x36b044;
    _0x2861a0.html(_0xa2f405);
  } else {
    let _0x414555 = _0x36b044;
    _0x2861a0.html(_0x414555);
  }
  _0x2861a0.show(100, function (_0x4b275d) {
    if (_0x2861a0.hasClass("d-none")) {
      _0x2861a0.removeClass("d-none");
    }
  });
  $("[data-hide]").off("click").on("click", function (_0x2bdc60) {
    _0x2bdc60.preventDefault();
    $(this).parent().addClass("d-none");
  });
  let _0x11d9d9 = ["buy"];
  if (_0x440e1b) {
    if (Array.isArray(_0x440e1b)) {
      for (let _0x1b1679 in _0x440e1b) {
        _0x11d9d9.push(_0x440e1b[_0x1b1679]);
      }
    } else {
      _0x11d9d9.push(_0x440e1b);
    }
  }
  localize(_0x440e1b);
}
function calculateProp(_0x4f8394, _0x5a6d91) {
  let _0x8382b5 = 0;
  if (_0x4f8394 < 600 || _0x4f8394 >= 600) {
    _0x8382b5 = _0x5a6d91 ? _0x4f8394 + 164 : _0x4f8394 - 164;
  }
  return _0x8382b5;
}
function getEmbed(_0x21538c, _0x98c72e, _0x4090d1, _0xa570ba, _0x2d5daa, _0x27b10f) {
  let _0x33fc01 = "<iframe src=\"/embed/chat.php#id=%CHAT_ID%&gn=%CHAT_NAME%\" allow=\"clipboard-write\" width=\"%CHAT_WIDTH%\" height=\"%CHAT_HEIGHT%\" frameborder=\"0\" scrolling=\"no\"></iframe>";
  _0x33fc01 += "<br><small><a target=\"_BLANK\" href=\"/web_gear/chat/embed.php?id=%CHAT_ID%&GroupName=%CHAT_NAME%\">Get %CHAT_NAME% chat group</a> | ";
  _0x33fc01 += "<a target=\"_BLANK\" href=\"/%CHAT_NAME%\"> Go to %CHAT_NAME% website</a></small><br>";
  _0x33fc01 = _0x33fc01.replace(/%CHAT_NAME%/gi, _0x21538c).replace(/%CHAT_ID%/gi, _0x98c72e).replace(/%CHAT_WIDTH%/gi, _0x4090d1).replace(/%CHAT_HEIGHT%/gi, _0xa570ba);
  if (_0x2d5daa) {
    document.getElementById("embedpreview").innerHTML = _0x33fc01;
  }
  if (_0x27b10f) {
    document.getElementById("embedpreview").innerHTML = "<span data-localize='chats.nopreview' class='prevbig'>Chat size too big to preview</span>";
    setTimeout(function () {
      document.getElementById("embedpreview").innerHTML = "";
    }, 3000);
  }
  localize(["chats"]);
  return _0x33fc01;
}
function getRealHash() {
  let _0x134370 = location.hash;
  if (_0x134370) {
    _0x134370 = _0x134370.substr(2);
    if (_0x134370.indexOf("&") >= 0) {
      _0x134370 = _0x134370.split("&");
      _0x134370 = _0x134370[0];
      if (_0x134370 && _0x134370.indexOf("=") >= 0) {
        _0x134370 = _0x134370.split("=");
        return _0x134370[0];
      } else {
        return _0x134370;
      }
    } else {
      return _0x134370;
    }
  } else {
    return "";
  }
}
function doRealHash(_0x27127a, _0x8da382) {
  let _0x15d60c = _0x8da382;
  if (_0x27127a.indexOf("&") >= 0) {
    delete (_0x27127a = _0x27127a.split("&"))[0];
    _0x15d60c += _0x27127a = _0x27127a.join("&");
  }
  return _0x15d60c;
}
function decodeEntities(_0x20c940) {
  return _0x20c940.replace(/&amp;/g, "&").replace(/&apos;/g, "'").replace(/&quot;/g, "\"").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}
let staticnav = "<button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNavDropdown\" aria-controls=\"navbarNavDropdown\" aria-expanded=\"false\" aria-label=\"Toggle navigation\"><span class=\"navbar-toggler-icon\"></span></button><div class=\"collapse navbar-collapse\" id=\"navbarNavDropdown\"><ul class=\"navbar-nav ml-auto mobpad\"><li class=\"nav-item\"><a id=\"newStf\" target=\"_blank\" class=\"nav-link d-none\" href=\"https://xat.wiki/news\"><img class=\"newstfic\" src=\"" + dir + "/img/navbar/pointing.svg\" alt=\"pointing\" width=\"35\"><button type=\"button\" class=\"btn btn-primary btn-sm newstfbut\"><span data-localize=\"web.newstf\">new stuff!</span><span id=\"newV\"></span></button></a></li><li class=\"nav-item meLink\"><a id=\"meView\" class=\"nav-link d-none\" target=\"_blank\" href=\"#\" aria-haspopup=\"true\" aria-expanded=\"false\"><img class=\"mr-1\" src=\"" + dir + "/img/navbar/xatme.svg\" alt=\"edit\" width=\"16\"><span>xat.me</span></a></li><li class=\"nav-item meLink\"><a id=\"meEdit\" class=\"nav-link d-none\" target=\"_blank\" href=\"#\" aria-haspopup=\"true\" aria-expanded=\"false\"><img class=\"mr-1\" src=\"" + dir + "/img/navbar/pencil.svg\" alt=\"edit\" width=\"16\"><span data-localize=\"chats.edit\">edit</span></a></li><li class=\"nav-item meLink\"><a id=\"meInapp\" class=\"nav-link d-none\" target=\"_blank\" href=\"#\" aria-haspopup=\"true\" aria-expanded=\"false\"><img class=\"mr-1\" src=\"" + dir + "/img/navbar/inappropriate.svg\" alt=\"inappropriate\" width=\"17\"><span data-localize=\"web.inappropriate\">inappropriate</span></a></li><li class=\"nav-item dropdown\"><a id=\"navGroups\" class=\"nav-link\" href=\"#\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"><img class=\"mr-1\" src=\"" + dir + "/img/navbar/groups.svg\" alt=\"groups\"><span data-localize=\"web.groups\">groups</span></a><div id=\"navGroupsItems\" class=\"dropdown-menu\" aria-labelledby=\"navGroups\"><!--<a id=\"navGroupsFavorites\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/favorites.svg\" alt=\"favorites\"><span data-localize=\"web.favorites\">favorites</span></a>--><a id=\"navCreate\" class=\"dropdown-item\" href=\"/create\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/community.svg\" alt=\"creategroup\"><span data-localize=\"web.create\">create</span></a><div class=\"dropdown-divider\"></div><a id=\"navGroupsFeatured\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/featured.svg\" alt=\"featured\"><span data-localize=\"web.featured\">featured</span></a><a id=\"navGroupsPopular\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/popular.svg\" alt=\"popular\"><span data-localize=\"web.popular\">popular</span></a><!--<a id=\"navGroupsSites\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/sites.svg\" alt=\"sites\"><span data-localize=\"web.sites\">sites</span></a>--><a id=\"navGroupsSupported\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/supported.svg\" alt=\"supported\"><span data-localize=\"web.supported\">supported</span></a><a id=\"navGroupsGames\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/games.svg\" alt=\"groups\"><span data-localize=\"web.games\">games</span></a><div class=\"dropdown-divider\"></div><a id=\"navGroupsSearch\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/search.svg\" alt=\"search\"><span data-localize=\"web.search\">search</span></a><div class=\"dropdown-divider\"></div><a id=\"navGroupsHelp\" class=\"dropdown-item\" href=\"/web_gear/chat/chats.php?v=yHv2&type=help\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/help.svg\" alt=\"help\" width=\"19\"><span data-localize=\"web.help\">help</span></a><a id=\"navGroupsTrade\" class=\"dropdown-item\" href=\"/web_gear/chat/chats.php?v=yHv2&type=trade\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/trade.svg\" alt=\"trade\" width=\"19\"><span data-localize=\"web.trade\">trade</span></a></div></li><li class=\"nav-item dropdown\"><a id=\"navStore\" class=\"nav-link\" href=\"#\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"><img class=\"mr-1\" src=\"" + dir + "/img/navbar/store.svg\" alt=\"store\"><span data-localize=\"web.store\">store</span></a><div class=\"dropdown-menu showxsbef\" aria-labelledby=\"navStore\"><a id=\"navStoreBuyXats\" class=\"dropdown-item\" href=\"../src/store.html#buy\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/buyxats.svg\" alt=\"buyxats\"><span data-localize=\"web.buyxats\">buy xats &amp; days</span></a><div class=\"dropdown-divider\"></div><a id=\"navStorePowers\" class=\"dropdown-item\" href=\"../src/store.html#powers\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/powers.svg\" alt=\"powers\"><span data-localize=\"web.powers\">powers</span></a><a id=\"navStoreAces\" class=\"dropdown-item\" href=\"../src/store.html#aces\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/aces.svg\" alt=\"powers\" width=\"19\"><span data-localize=\"web.aces\">aces</span></a><a id=\"navStoreShortName\" class=\"dropdown-item\" href=\"../src/store.html#shortname\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/shortname.svg\" alt=\"shortname\"><span data-localize=\"web.shortname\">short name</span></a><a id=\"navStoreAuctions\" class=\"dropdown-item\" href=\"../src/store.html#auctions\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/auctions.svg\" alt=\"auctions\"><span data-localize=\"web.auctions\">auctions</span></a><a id=\"navStorePromotion\" class=\"dropdown-item\" href=\"../src/store.html#promotion\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/promotion.svg\" alt=\"promotion\"><span data-localize=\"web.promotion\">promotion</span></a><a id=\"navStoreAds\" class=\"dropdown-item\" href=\"../src/store.html#ads\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/ads.svg\" alt=\"ads\"><span data-localize=\"web.ads\">ads</span></a><a id=\"navStoreBuyGroup\" class=\"dropdown-item\" href=\"../src/store.html#groups\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/buygroup.svg\" alt=\"group\"><span data-localize=\"web.buygroup\">groups</span></a></div></li><li class=\"nav-item dropdown\"><a id=\"navxat\" class=\"nav-link\" href=\"#\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"><img class=\"mr-0\" src=\"" + dir + "/img/xatplanet.svg\" alt=\"xat\"><span data-localize=\"web.xat\">xat</span></a><div class=\"dropdown-menu showxslast\" aria-labelledby=\"navxat\"><a id=\"navxatApps\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/apps.svg\" alt=\"apps\" width=\"20\"><span data-localize=\"web.apps\">apps</span></a><a id=\"navxatWiki\" class=\"dropdown-item\" href=\"/wiki\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/wiki.svg\" alt=\"wiki\"><span data-localize=\"web.wiki\">wiki</span></a><a id=\"navxatForum\" class=\"dropdown-item\" href=\"/forum\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/popular.svg\" alt=\"forum &amp; forum\"><span data-localize=\"web.forum\">forum</span></a><a id=\"navxatSupport\" class=\"dropdown-item\" href=\"/support\"><img class=\"mr-2 grlsupport\" src=\"" + dir + "/img/navbar/support.svg\" alt=\"support\"><span data-localize=\"web.support\">support</span></a><a id=\"navxatTicket\" class=\"dropdown-item\" href=\"/ticket\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/ticket.svg\" alt=\"open ticket\"><span data-localize=\"web.ticket\">ticket</span></a><a id=\"navxatTwitter\" class=\"dropdown-item\" href=\"/twitter\" rel=\"noopener\" target=\"_blank\"><img class=\"mr-2 xTLogo\" src=\"" + dir + "/img/navbar/x_b.svg\" alt=\"xat x\"><span data-localize=\"web.x\">x</span></a><a id=\"navxatFacebook\" class=\"dropdown-item\" href=\"/facebook\"  rel=\"noopener\" target=\"_blank\"><img class=\"mr-1\" src=\"" + dir + "/img/navbar/facebook.svg\" alt=\"xat facebook\" width=\"20\"><span data-localize=\"web.facebook\">facebook</span></a><a id=\"navxatInstagram\" class=\"dropdown-item\" href=\"/instagram\" rel=\"noopener\" target=\"_blank\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/instagram.svg\" alt=\"xat instagram\" width=\"19\"><span>instagram</span></a><a id=\"navxatHtml5\" class=\"dropdown-item h5logs\" href=\"https://xat.wiki/HTML5\"><img class=\"mr-2\" width=\"25\" src=\"" + dir + "/img/navbar/html5.svg\" alt=\"changelogs\"><span data-localize=\"web.changelogs\" class=\"h5logsicon\">changelogs</span></a><div class=\"dropdown-divider\"></div><a id=\"navxatPrivacy\" class=\"dropdown-item showxs\" href=\"#\" data-toggle=\"modal\" data-target=\"#privacyModal\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/privacy.svg\" alt=\"privacy\"><span data-localize=\"web.privacy\">privacy/cookies</span></a><a id=\"navxatTerms\" class=\"dropdown-item\" href=\"#\" data-toggle=\"modal\" data-target=\"#termsModal\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/terms.svg\" alt=\"terms\"><span data-localize=\"web.terms\">terms of service</span></a><a id=\"navxatSafety\" class=\"dropdown-item\" href=\"/safety\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/safety.svg\" alt=\"safety\"><span data-localize=\"web.safety\">safety</span></a><span class=\"d-none\" id=\"date\"></span><!--<div class=\"dropdown-divider\"></div><a id=\"navGroupFlashback\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/flashback.svg\" alt=\"flashback\"><span data-localize=\"web.flashback\">flashback</span></a>--></div></li><li id=\"rankdrop\" class=\"nav-item dropdown\"><a id=\"navGroup\" class=\"nav-link\" href=\"#\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"><img class=\"mr-1\" src=\"" + dir + "/img/navbar/group.svg\" alt=\"group\"><span data-localize=\"web.group\">group</span></a><div class=\"dropdown-menu\" aria-labelledby=\"navGroup\"><!--<a id=\"navGroupTimeline\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/timeline.svg\" alt=\"timeline\"><span data-localize=\"web.timeline\">timeline</span></a>--><!--<div class=\"dropdown-divider\"></div>--><a id=\"navEmbedGrp\" class=\"dropdown-item\" href=\"#\" data-toggle=\"modal\" data-target=\"#embedmodal\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/embed2.svg\" alt=\"embed\" width=\"19\"><span data-localize=\"web.embed\">embed</span></a><a id=\"navGroupEvents\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/events.svg\" alt=\"events\"><span data-localize=\"web.events\">events</span></a><a id=\"navCustomize\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/customize.svg\" alt=\"customize\"><span data-localize=\"web.customize\">customize</span></a><a id=\"navSendMessage\" class=\"dropdown-item\" href=\"#\" data-toggle=\"modal\" data-target=\"#msgModal\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/message.svg\" alt=\"message\"><span data-localize=\"web.message\">send message</span></a><a id=\"navInapp\" class=\"dropdown-item\" href=\"#\" data-toggle=\"modal\" data-target=\"#inappModal\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/inappropriate.svg\" alt=\"inappropriate\"><span data-localize=\"web.inappropriate\">inappropriate</span></a><a id=\"navIframe\" class=\"dropdown-item\" href=\"#\" data-toggle=\"modal\" data-target=\"#iframeModal\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/xatframe.svg\" alt=\"xatframe\" width=\"21\"><span class=\"h5logs\">xatframe</span></a></div></li><li id=\"admindrop\" class=\"nav-item dropdown d-none\"><a id=\"navGroup2\" class=\"nav-link\" href=\"#\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"><img class=\"mr-1\" src=\"" + dir + "/img/navbar/group.svg\" alt=\"group\"><span data-localize=\"web.group\">group</span></a><div class=\"dropdown-menu\" aria-labelledby=\"navGroup2\"><h6 class=\"dropdown-header text-center p-0\"><img class=\"mr-0\" src=\"" + dir + "/img/navbar/account.svg\" alt=\"account\">Main Owner</h6><div class=\"dropdown-divider\"></div><!--<a id=\"navGroupTimeline2\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/timeline.svg\" alt=\"timeline\"><span data-localize=\"web.timeline\">timeline</span></a>--><!--<div class=\"dropdown-divider\"></div> +--><!-- <a class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/customize.svg\" alt=\"customize\"><span data-localize=\"web.customize\">customize</span></a><a id=\"navGroupEvents\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/events.svg\" alt=\"events\"><span data-localize=\"web.events\">events</span></a> (MOVED UNDER \"GROUP\" for now)--><!--<a id=\"navGroupAffiliate\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/affiliate.svg\" alt=\"affiliate\"><span data-localize=\"web.affiliate\">affiliate</span></a>--><div class=\"dropdown-divider\"></div><a id=\"navGroupEmbed\" class=\"dropdown-item\" href=\"#\" data-toggle=\"modal\" data-target=\"#embedModal\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/embed.svg\" alt=\"embed\"><span data-localize=\"web.embed\">embed</span></a><!--<a id=\"navGroupMessage\" class=\"dropdown-item\" href=\"#\" data-toggle=\"modal\" data-target=\"#sendModal\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/message.svg\" alt=\"message\"><span data-localize=\"web.message\">send message</span></a>--><a id=\"navGroupInappropriate\" class=\"dropdown-item\" href=\"#\" data-toggle=\"modal\" data-target=\"#inappModal\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/inappropriate.svg\" alt=\"inappropriate\"><span data-localize=\"web.inappropriate\">inappropriate</span></a></div></li><li id=\"accountdrop\" class=\"nav-item dropdown d-none\"><a id=\"navAccount\" class=\"nav-link\" href=\"#\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"><img class=\"mr-0\" src=\"" + dir + "/img/navbar/account.svg\" alt=\"account\"><span data-localize=\"web.account\">account</span><span id=\"navAccountBadge\" class=\"badge badge-pill badge-primary align-text-top ml-1 mr-1\"></span></a><div class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"navAccount\"><h6 id=\"navUsernameId\" class=\"dropdown-header text-center p-0\"></h6><div class=\"dropdown-divider\"></div><!--<a id=\"navAccountStream\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/stream.svg\" alt=\"stream\"><span data-localize=\"web.stream\">stream</span><span id=\"navStreamBadge\" class=\"badge badge-pill badge-primary align-text-top ml-1\">0</span></a>--><a id=\"navAccountxatme\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/xatme.svg\" alt=\"xatme\">xat.me</a><a id=\"navAccountedit\" class=\"dropdown-item\" href=\"#\"><img class=\"mr-2 xsme\" src=\"" + dir + "/img/navbar/pencil2.svg\" alt=\"edit\"><span data-localize=\"web.edit\">edit</span></a><a id=\"navSettings\" class=\"dropdown-item\" href=\"../src/login.html#settings\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/settings.svg\" alt=\"settings\"><span data-localize=\"web.settings\">settings</span></a><div class=\"dropdown-divider\"></div><a id=\"navLogout\" class=\"dropdown-item\" href=\"../src/login.html#logout\"><img class=\"mr-2\" src=\"" + dir + "/img/navbar/logout.svg\" alt=\"logout\"><span data-localize=\"web.logout\">logout</span></a></div></li><li class=\"nav-item showxs\"><button id=\"navLogin\" class=\"btn btn-outline-primary btn-sm my-2 my-sm-0 mr-1\" type=\"button\"><img class=\"mr-0\" src=\"" + dir + "/img/navbar/account.svg\" alt=\"account\"><span data-localize=\"web.login\" class=\"text-light\">login</span></button><button id=\"navRegister\" class=\"btn btn-primary btn-sm my-2 my-sm-0 mr-1\" type=\"button\"><img class=\"mr-0\" src=\"" + dir + "/img/navbar/account.svg\" alt=\"account\"><span data-localize=\"web.register\">register</span></button></li><li class=\"nav-item dropdown\"><a id=\"navMobile\" class=\"nav-link\" href=\"#\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"><img class=\"mr-1\" src=\"" + dir + "/img/navbar/mobile.svg\" width=\"18\" alt=\"mobile\"></a><div class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"navMobile\"><a class=\"dropdown-item\" href=\"https://apps.apple.com/us/app/xat/id1003294391\" target=\"_blank\"><img src=\"" + dir + "/img/navbar/Apple-en.svg\" alt=\"apple\" width=\"150\"></a><a class=\"dropdown-item\" href=\"https://play.google.com/store/apps/details?id=com.xat.app\" target=\"_blank\"><img src=\"" + dir + "/img/navbar/Google-en.png\" alt=\"google\" width=\"150\"></a></div></li><li class=\"nav-item dropdown showxs\"><a id=\"navLang\" class=\"nav-link\" href=\"#\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"><img class=\"mr-0 globe\" src=\"" + dir + "/img/navbar/globe.svg\" width=\"18\" alt=\"globe\"></a><div id=\"langdropdownitems\" class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"navLang\"><!--<a class=\"dropdown-item\" href=\"#\">English <small>(English)</small></a>--></div></li></ul></div>";
let statnav = document.getElementById("statnav");
function addRemoveClass(_0x25cc58, _0x4ea45c, _0x27227b) {
  if (!_0x25cc58) {
    return;
  }
  let _0x135b71 = document.querySelector(_0x25cc58);
  if (_0x135b71) {
    if (_0x27227b) {
      return _0x135b71.classList.remove(_0x4ea45c);
    } else {
      return _0x135b71.classList.add(_0x4ea45c);
    }
  } else {
    return undefined;
  }
}
function createElement(_0x3e9420, _0x2898a3, _0x4256e2) {
  let _0x1927d2 = document.createElement(_0x2898a3);
  _0x1927d2.id = _0x4256e2;
  _0x3e9420.appendChild(_0x1927d2);
  return _0x1927d2;
}
if (statnav) {
  statnav.innerHTML = staticnav;
}
let Trusted;
let didQuery = false;
function handlePopover() {
  $("[data-toggle=\"popover\"]").popover({
    trigger: "focus",
    html: true
  });
  if (!didQuery) {
    let _0x1f1359 = document.querySelectorAll("[data-toggle=\"popover\"]");
    if (_0x1f1359.length > 0) {
      let _0x58cbd8 = [];
      _0x1f1359.forEach(function (_0x2efa9e) {
        _0x58cbd8.push(setTranslateDiv(_0x2efa9e, "popover"));
      });
      if (_0x58cbd8.length > 0 && xConfig.lang !== "en") {
        localize(["chats"]);
        updateNodeTranslate(_0x58cbd8);
      }
    }
    didQuery = true;
  }
}
function initToolTip(_0x56bd39) {
  let _0x224926 = [];
  if (_0x56bd39) {
    _0x56bd39.tooltip();
    _0x224926.push(setTranslateDiv(_0x56bd39[0] || _0x56bd39, "tooltips"));
  } else {
    $("[data-toggle=\"tooltip\"]").tooltip({
      trigger: "hover"
    });
    let _0x5a8823 = document.querySelectorAll("[data-toggle=\"tooltip\"]");
    if (_0x5a8823.length > 0) {
      _0x5a8823.forEach(function (_0xc6bbc1) {
        _0x224926.push(setTranslateDiv(_0xc6bbc1, "tooltips"));
      });
    }
  }
  if (_0x224926.length > 0 && xConfig.lang !== "en") {
    localize(["chats"]);
    updateNodeTranslate(_0x224926);
  }
}
function setTranslateDiv(_0x5e50f1, _0x2ca364) {
  let _0x49d5ec;
  let _0x5e9cc9;
  let _0x1e6180 = _0x5e50f1.dataset;
  if (_0x1e6180 && !_0x5e50f1.contains(document.getElementById(_0x2ca364))) {
    let _0x34605a = document.createElement("div");
    _0x5e50f1.appendChild(_0x34605a);
    if (_0x1e6180.content) {
      _0x49d5ec = createElement(_0x34605a, "div", "content");
      _0x49d5ec.innerHTML = _0x1e6180.content;
    }
    if (_0x1e6180.originalTitle) {
      _0x5e9cc9 = createElement(_0x34605a, "div", "originalTitle");
      _0x5e9cc9.innerHTML = _0x1e6180.originalTitle;
    }
    _0x34605a.id = _0x2ca364;
    _0x34605a.className = "d-none";
    return [_0x5e50f1, _0x49d5ec, _0x5e9cc9];
  }
}
function updateNodeTranslate(_0x2ec4fb) {
  if (!_0x2ec4fb) {
    return false;
  }
  for (let _0x922c63 in _0x2ec4fb) {
    if (_0x2ec4fb[_0x922c63][1]) {
      _0x2ec4fb[_0x922c63][0].setAttribute("data-content", _0x2ec4fb[_0x922c63][1].innerHTML);
    }
    if (_0x2ec4fb[_0x922c63][2]) {
      _0x2ec4fb[_0x922c63][0].setAttribute("data-original-title", _0x2ec4fb[_0x922c63][2].innerHTML);
    }
  }
}
function SafeImage(_0xd62a74, _0x306e51, _0x5a4984, _0x453b50) {
  if (_0xd62a74.length == 0) {
    return "";
  }
  let _0x25170c = parse_url(_0xd62a74);
  if (!_0x25170c && (_0x25170c = parse_url(_0xd62a74 = _0xd62a74.charAt(0) == "/" ? "https:" + _0xd62a74 : "https://" + _0xd62a74), !_0x25170c)) {
    return "";
  }
  if (!_0x25170c.host) {
    return "";
  }
  if (_0x25170c.host.indexOf(location.host) >= 0 && (_0x25170c.path.indexOf("GetImage") > 0 || _0x25170c.path.indexOf("/chat/av/") >= 0)) {
    return _0xd62a74;
  }
  if (_0x306e51 > 0 && _0x5a4984 > 0 && _0x306e51 == _0x5a4984 && !_0x453b50) {
    _0x306e51 = _0x5a4984 = calcAvSize(_0x306e51);
  }
  let _0x164a4e = "s&U=" + _0xd62a74;
  if (_0x306e51 > 0) {
    _0x164a4e += "&W=" + _0x306e51;
  }
  if (_0x5a4984 > 0) {
    _0x164a4e += "&H=" + _0x5a4984;
  }
  if (_0x453b50) {
    _0x164a4e += "&g";
  }
  return "/web_gear/chat/GetImage7.php?" + _0x164a4e;
}
function parse_url(_0x514c2a, _0x5573f4) {
  let _0x12106d;
  let _0x1d0508 = ["source", "scheme", "authority", "userInfo", "user", "pass", "host", "port", "relative", "path", "directory", "file", "query", "fragment"];
  let _0x201b65 = {};
  let _0x20b7cc = _0x201b65["phpjs.parse_url.mode"] && _0x201b65["phpjs.parse_url.mode"].local_value || "php";
  let _0x35bb0b = {
    php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
  };
  let _0x217526 = _0x35bb0b[_0x20b7cc].exec(_0x514c2a);
  let _0x2a562c = {};
  let _0x578c78 = 14;
  while (_0x578c78--) {
    if (_0x217526[_0x578c78]) {
      _0x2a562c[_0x1d0508[_0x578c78]] = _0x217526[_0x578c78];
    }
  }
  if (_0x5573f4) {
    return _0x2a562c[_0x5573f4.replace("PHP_URL_", "").toLowerCase()];
  }
  if (_0x20b7cc !== "php") {
    let _0x206bad = _0x201b65["phpjs.parse_url.queryKey"] && _0x201b65["phpjs.parse_url.queryKey"].local_value || "queryKey";
    _0x35bb0b = /(?:^|&)([^&=]*)=?([^&]*)/g;
    _0x2a562c[_0x206bad] = {};
    _0x12106d = _0x2a562c[_0x1d0508[12]] || "";
    _0x12106d.replace(_0x35bb0b, function (_0x5317bd, _0x444340, _0x3a1834) {
      if (_0x444340) {
        _0x2a562c[_0x206bad][_0x444340] = _0x3a1834;
      }
    });
  }
  delete _0x2a562c.source;
  return _0x2a562c;
}
function isColorLight(_0x1e874b) {
  let _0x3b8671;
  let _0x4296bb;
  let _0x582b40;
  let _0x29c281;
  return !!_0x1e874b && (_0x1e874b.match(/^rgb/) ? (_0x3b8671 = (_0x1e874b = _0x1e874b.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/))[1], _0x4296bb = _0x1e874b[2], _0x582b40 = _0x1e874b[3]) : (_0x3b8671 = (_0x1e874b = +("0x" + _0x1e874b.slice(1).replace(_0x1e874b.length < 5 && /./g, "$&$&"))) >> 16, _0x4296bb = _0x1e874b >> 8 & 255, _0x582b40 = _0x1e874b & 255), _0x29c281 = Math.sqrt(_0x3b8671 * _0x3b8671 * 0.299 + _0x4296bb * _0x4296bb * 0.587 + _0x582b40 * _0x582b40 * 0.114), _0x29c281 > 127.5);
}
function calcAvSize(_0x522908) {
  if (_0x522908 <= 30) {
    return 30;
  } else if (_0x522908 <= 35) {
    return 35;
  } else if (_0x522908 <= 80) {
    return 80;
  } else if (_0x522908 == 100) {
    return 100;
  } else if (_0x522908 <= 160) {
    return 160;
  } else if (_0x522908 <= 320) {
    return 320;
  } else {
    return 640;
  }
}
function GetTimeToGo(_0x1ec41b, _0x5dbfd5) {
  if (_0x1ec41b == 0) {
    return "";
  }
  let _0x14231c = Math.floor((new Date() - _0x1ec41b) / 1000);
  _0x14231c = parseInt(_0x14231c);
  if (_0x14231c <= 0) {
    return ["tools.justnow", "just now"];
  } else if (_0x14231c < 60) {
    return ["tools.secsago", "$1 secs ago", _0x14231c];
  } else if (_0x14231c < 120) {
    return ["tools.minago", "$1 min ago", 1];
  } else if (_0x14231c < 3600) {
    return ["tools.minsago", "$1 mins ago", parseInt(_0x14231c / 60)];
  } else if (_0x14231c < 86400) {
    return ["tools.hoursago", "$1 hours ago", parseInt(_0x14231c / 3600)];
  } else if (_0x5dbfd5) {
    return new Date(_0x1ec41b).toUTCString();
  } else {
    return ["tools.daysago", "$1 days ago", parseInt(_0x14231c / 86400)];
  }
}
function bodyCursor(_0x4b5ee8) {
  return document.body.style.cursor = _0x4b5ee8;
}
function updateFileName(_0x526a84, _0x3492bd, _0x307b51) {
  let _0x7c4119 = _0x3492bd ? "" : _0x526a84.val().split("\\").pop();
  _0x7c4119 = filter(_0x7c4119);
  let _0x54f152 = _0x526a84.siblings(".custom-file-label").html();
  if (_0x3492bd) {
    _0x7c4119 = _0x526a84.data("html") || "";
  } else {
    _0x526a84.attr("data-html", _0x54f152);
  }
  _0x526a84.siblings(".custom-file-label").addClass("selected").html(_0x7c4119);
}
function doDownload(_0x34aa05, _0x4c6aba) {
  let _0x4de170 = document.createElement("a");
  _0x4de170.href = "data:text/plain;charset=utf-8," + _0x34aa05;
  _0x4de170.setAttribute("download", _0x4c6aba);
  _0x4de170.style.display = "none";
  document.body.appendChild(_0x4de170);
  _0x4de170.click();
  document.body.removeChild(_0x4de170);
}
function uploadFile(_0x3f6970, _0x4b0679) {
  let _0x3c7e14 = new FileReader();
  _0x3c7e14.onload = function (_0x180cbd) {
    _0x4b0679(_0x180cbd.target.result);
  };
  _0x3c7e14.readAsText(_0x3f6970);
}
function setListener(_0x43d06f) {
  if (!_0x43d06f) {
    return;
  }
  let _0x192f8c = document.querySelectorAll(_0x43d06f);
  if (_0x192f8c?.length) {
    _0x192f8c.forEach(_0x2ffe50 => {
      _0x2ffe50.addEventListener("click", _0x57f1e8 => {
        _0x57f1e8.preventDefault();
        let _0x55aef5 = _0x57f1e8?.currentTarget?.id?.substr(3);
        if (_0x55aef5) {
          DoTask(_0x55aef5);
          location.hash = "#!" + doRealHash(location.hash, _0x55aef5);
        }
        return false;
      });
    });
  }
}
function loadModules(_0x4753e8) {
  if (Object.keys(_0x4753e8).length) {
    for (let _0x2e5f0d in _0x4753e8) {
      if (typeof window[_0x2e5f0d] == "function") {
        window[_0x2e5f0d]();
      }
    }
  }
}
function setLoadingButton(_0x13a726, _0x391a71) {
  if (!_0x13a726) {
    return;
  }
  let _0x4b0060 = document.querySelector(_0x13a726);
  if (!_0x4b0060) {
    return false;
  }
  let _0x4fa1dd;
  let _0x33f575 = _0x4b0060.querySelector("#buttonLoader");
  _0x4b0060.querySelectorAll("img").forEach(_0x535f2b => {
    _0x535f2b.style.display = _0x391a71 ? "" : "none";
  });
  if (_0x33f575 || _0x391a71) {
    _0x4fa1dd = document.querySelector("#buttonLoader");
    _0x4fa1dd?.remove();
    _0x4b0060.disabled = false;
    _0x4b0060.style.opacity = "1";
    _0x4b0060.style.cursor = "pointer";
  } else {
    _0x4fa1dd = makeElement(_0x4b0060, "span", "spinner-border spinner-border-sm ml-2");
    _0x4fa1dd.id = "buttonLoader";
    _0x4b0060.disabled = true;
    _0x4b0060.style.opacity = "0.6";
    _0x4b0060.style.cursor = "default";
  }
}
function sendRequest(_0x44dea5, _0x9789e3, _0x48aff8, _0x243cc7, _0x1059d6) {
  if (_0x48aff8) {
    setLoadingButton(_0x48aff8, false);
  }
  allErrsOff();
  urlPost(_0x44dea5, _0x9789e3).then(_0xd93298 => {
    Maintenance(_0xd93298);
    if (_0x1059d6) {
      _0x1059d6(_0xd93298);
    }
    if (_0x48aff8) {
      setLoadingButton(_0x48aff8, true);
    }
  }).catch(_0x5b989d => {
    if (_0x243cc7) {
      let _0x636543 = {
        Err: {},
        errorMsg: _0x5b989d
      };
      _0x636543.Err[_0x243cc7] = "<span data-localize=\"web.retrylater\">An error occurred. Please try again at a later time.</span>";
      _0x1059d6(_0x636543);
    }
    if (_0x48aff8) {
      setLoadingButton(_0x48aff8, true);
    }
  });
}
function ucfirst(_0x47aee9) {
  return _0x47aee9.charAt(0).toUpperCase() + _0x47aee9.slice(1);
}
function Maintenance(_0x2e43db) {
  if (_0x2e43db.Err && _0x2e43db.Err.Maintenance) {
    window.location.href = "/maintenance";
  }
}
function isUserRegistered() {
  if (!soltodo) {
    commonPost();
  }
  return soltodo?.w_registered;
}
const flagsLists = {
  "": "None",
  xat: "xat",
  af: "Afghanistan",
  ax: "Aland Islands",
  al: "Albania",
  dz: "Algeria",
  as: "American Samoa",
  ad: "Andorra",
  ao: "Angola",
  ai: "Anguilla",
  ag: "Antigua and Barbuda",
  ar: "Argentina",
  am: "Armenia",
  aw: "Aruba",
  au: "Australia",
  at: "Austria",
  az: "Azerbaijan",
  bs: "Bahamas",
  bh: "Bahrain",
  bd: "Bangladesh",
  bb: "Barbados",
  "es-pv": "Basque Country",
  by: "Belarus",
  be: "Belgium",
  bz: "Belize",
  bj: "Benin",
  bm: "Bermuda",
  bt: "Bhutan",
  bo: "Bolivia",
  ba: "Bosnia and Herzegovina",
  bw: "Botswana",
  br: "Brazil",
  bn: "Brunei Darussalam",
  bg: "Bulgaria",
  bf: "Burkina Faso",
  cv: "Cabo Verde",
  kh: "Cambodia",
  cm: "Cameroon",
  ca: "Canada",
  "es-ct": "Catalonia",
  ky: "Cayman Islands",
  cl: "Chile",
  cn: "China",
  cc: "Cocos (Keeling) Islands",
  co: "Colombia",
  km: "Comoros",
  cd: "Congo",
  cr: "Costa Rica",
  ci: "Cote d Ivoire",
  hr: "Croatia",
  cu: "Cuba",
  cy: "Cyprus",
  cz: "Czechia",
  dk: "Denmark",
  dj: "Djibouti",
  do: "Dominican Republic",
  dm: "Dominica",
  tl: "East Timor",
  ec: "Ecuador",
  eg: "Egypt",
  sv: "El Salvador",
  en: "England",
  gq: "Equatorial Guinea",
  er: "Eritrea",
  ee: "Estonia",
  sz: "Eswatini",
  et: "Ethiopia",
  eu: "European Union",
  fk: "Falkland Islands",
  fo: "Faroe Islands",
  fj: "Fiji",
  fi: "Finland",
  fr: "France",
  pf: "French Polynesia",
  ga: "Gabon",
  gm: "Gambia",
  ge: "Georgia",
  de: "Germany",
  gh: "Ghana",
  gi: "Gibraltar",
  gr: "Greece",
  gl: "Greenland",
  gd: "Grenada",
  gu: "Guam",
  gt: "Guatemala",
  gg: "Guernsey",
  gw: "Guinea-Bissau",
  gn: "Guinea",
  gy: "Guyana",
  ht: "Haiti",
  hn: "Honduras",
  hk: "Hong Kong",
  hu: "Hungary",
  is: "Iceland",
  in: "India",
  id: "Indonesia",
  ir: "Iran",
  iq: "Iraq",
  ie: "Ireland",
  cq: "Island of Sark",
  im: "Isle of Man",
  il: "Israel",
  it: "Italy",
  jm: "Jamaica",
  jp: "Japan",
  je: "Jersey",
  jr: "Jolly Roger",
  jo: "Jordan",
  kz: "Kazakhstan",
  ke: "Kenya",
  xk: "Kosovo",
  kw: "Kuwait",
  kg: "Kyrgyzstan",
  la: "Laos",
  lv: "Latvia",
  lb: "Lebanon",
  ls: "Lesotho",
  lr: "Liberia",
  ly: "Libya",
  li: "Liechtenstein",
  lt: "Lithuania",
  lu: "Luxembourg",
  mo: "Macao",
  mg: "Madagascar",
  mw: "Malawi",
  my: "Malaysia",
  mv: "Maldives",
  ml: "Mali",
  mt: "Malta",
  mh: "Marshall Islands",
  mr: "Mauritania",
  mu: "Mauritius",
  mx: "Mexico",
  fm: "Micronesia",
  md: "Moldova",
  mc: "Monaco",
  mn: "Mongolia",
  me: "Montenegro",
  ma: "Morocco",
  mz: "Mozambique",
  mm: "Myanmar",
  na: "Namibia",
  nr: "Nauru",
  np: "Nepal",
  an: "Netherlands Antilles",
  nl: "Netherlands",
  nc: "New Caledonia",
  nz: "New Zealand",
  ni: "Nicaragua",
  ng: "Nigeria",
  ne: "Niger",
  nu: "Niue",
  nf: "Norfolk Island",
  kp: "North Korea",
  mk: "North Macedonia",
  mp: "Northern Mariana Islands",
  no: "Norway",
  om: "Oman",
  pk: "Pakistan",
  pw: "Palau",
  ps: "Palestine",
  pa: "Panama",
  pg: "Papua New Guinea",
  py: "Paraguay",
  pe: "Peru",
  ph: "Philippines",
  pl: "Poland",
  pt: "Portugal",
  pr: "Puerto Rico",
  qa: "Qatar",
  redcross: "Red Cross",
  ro: "Romania",
  ru: "Russia",
  rw: "Rwanda",
  kn: "Saint Kitts and Nevis",
  lc: "Saint Lucia",
  vc: "Saint Vincent and the Grenadines",
  ws: "Samoa",
  sm: "San Marino",
  st: "Sao Tome and Principe",
  sa: "Saudi Arabia",
  "gb-sct": "Scotland",
  sn: "Senegal",
  rs: "Serbia",
  sc: "Seychelles",
  sl: "Sierra Leone",
  sg: "Singapore",
  sk: "Slovakia",
  si: "Slovenia",
  so: "Somalia",
  za: "South Africa",
  kr: "South Korea",
  es: "Spain",
  lk: "Sri Lanka",
  sd: "Sudan",
  sr: "Suriname",
  se: "Sweden",
  ch: "Switzerland",
  sy: "Syria",
  tw: "Taiwan",
  tj: "Tajikistan",
  tz: "Tanzania",
  th: "Thailand",
  tg: "Togo",
  tk: "Tokelau",
  to: "Tonga",
  tt: "Trinidad and Tobago",
  tn: "Tunisia",
  tr: "Turkey",
  tm: "Turkmenistan",
  tc: "Turks and Caicos Islands",
  tv: "Tuvalu",
  ug: "Uganda",
  ua: "Ukraine",
  ae: "United Arab Emirates",
  gb: "United Kingdom",
  us: "United States of America",
  uy: "Uruguay",
  uz: "Uzbekistan",
  vu: "Vanuatu",
  ve: "Venezuela",
  vn: "Vietnam",
  vg: "Virgin Islands",
  vi: "Virgin Islands of the United States",
  "gb-wls": "Wales",
  ye: "Yemen",
  zm: "Zambia",
  zw: "Zimbabwe"
};
const scrollDown = () => {
  const _0x233d28 = document.getElementById("scrollDown");
  if (!_0x233d28) {
    return;
  }
  const _0x42f5d9 = () => {
    const _0x63e1ca = document.body.scrollHeight - (window.innerHeight + window.scrollY) > 1000;
    const _0x4f15dd = window.scrollY > 400;
    _0x233d28.style.display = _0x4f15dd && _0x63e1ca ? "block" : "none";
  };
  window.addEventListener("scroll", _0x42f5d9);
  window.addEventListener("resize", _0x42f5d9);
  _0x233d28.addEventListener("click", () => {
    window.scrollTo({
      top: document.body.scrollHeight
    });
  });
};
function isXatBirthday() {
  let _0x330104 = new Date();
  return _0x330104.getDate() == 17 && _0x330104.getMonth() + 1 == 9;
}
function xatsbackAd() {
  const _0x588179 = document.getElementById("navTop");
  if (_0x588179) {
    _0x588179.style.position = "relative";
    _0x588179.style.marginBottom = "30px";
  }
  document.body.style.marginTop = "0";
  if (localStorage.getItem("hideBlackBar") !== "true") {
    const _0x137d1e = "\n        <div id=\"blackBar\" class=\"black-bar d-none\">\n            <img src=\"" + dir + "img/navbar/ss.svg\" class=\"blackRocket\">\n            <span class=\"blackTextPar\">\n                <span class=\"blackText\" data-localize=\"web.xbspecial\">BLACKFRIDAY SPECIAL!</span>\n                <span class=\"blackText xBack\" data-localize=\"web.xbbuy\">Buy xats, get xatsback.</span>\n            </span>\n            <span class=\"close-button float-right\">\n            <img src=\"" + dir + "img/navbar/removest.svg\" width=\"15\">\n            </span>\n        </div>\n        ";
    _0x588179.insertAdjacentHTML("beforebegin", _0x137d1e);
    const _0x5c9c0c = document.getElementById("blackBar");
    if (!_0x5c9c0c) {
      return;
    }
    if (localStorage.getItem("hideBlackBar") !== "true") {
      _0x5c9c0c.classList.remove("d-none");
    }
    document.addEventListener("click", function (_0x2a8ca3) {
      if (_0x2a8ca3.target.closest(".close-button") !== null) {
        localStorage.setItem("hideBlackBar", "true");
        _0x5c9c0c.classList.add("d-none");
      } else if (_0x2a8ca3.target.closest(".black-bar") !== null) {
        window.open("/buy", "_blank");
      }
    });
  }
}
const countdown = (_0x29cbd4, _0x1a47c1) => {
  if (!_0x1a47c1) {
    return;
  }
  const _0x1ed959 = () => {
    const _0x442d82 = Math.max(0, _0x29cbd4 - Math.floor(Date.now() / 1000));
    if (_0x442d82 === 0) {
      clearInterval(_0x18e2c8);
      _0x1a47c1.textContent = "Expired, updating..";
    } else {
      _0x1a47c1.textContent = (_0x339124 => {
        const _0x54d8a4 = Math.floor(_0x339124 / 86400);
        const _0x1e6aa9 = Math.floor(_0x339124 % 86400 / 3600);
        const _0x243ff5 = Math.floor(_0x339124 % 3600 / 60);
        const _0x249cb4 = _0x339124 % 60;
        return _0x54d8a4 + "d " + String(_0x1e6aa9).padStart(2, "0") + "h " + String(_0x243ff5).padStart(2, "0") + "m " + String(_0x249cb4).padStart(2, "0") + "s";
      })(_0x442d82);
    }
  };
  const _0x18e2c8 = setInterval(() => {
    _0x1ed959();
    clearInterval(_0x349622);
  }, 1000);
  const _0x349622 = setTimeout(_0x1ed959, 0);
};
function makeNumberInput(_0x5f0055) {
  _0x5f0055.oninput = _0x17ff4c => {
    let {
      target: _0x516b8a
    } = _0x17ff4c;
    return _0x516b8a.value = _0x516b8a.value.replace(/\D/g, "");
  };
}