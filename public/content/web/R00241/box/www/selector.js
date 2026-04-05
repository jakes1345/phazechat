"use strict";
var _Activity;
isWEB = !0;
if (_Activity === undefined) {
  _Activity = parent._Activity !== undefined ? parent._Activity : parent.parent._Activity !== undefined ? parent.parent._Activity : parent.parent.parent._Activity !== undefined ? parent.parent.parent._Activity : {};
}
var selector = new function () {
  if (!_Activity.instance.IsClassic) {
    document.querySelector(".powersScroll").style.height = "78%";
  }
  let _0x2f877b = 0;
  let _0x1458aa = null;
  let _0x44d9f5 = "Powers";
  let _0xc88add = {
    gesture: "wb",
    glasses: "w1",
    samba: "w1",
    acting: {
      rrh: ["wa", "wb", "ww", "wt", "wh", "ws", "wg", "wm"]
    },
    easterland: {
      eggfx: ["wc", "we", "wf", "wl", "wx"]
    },
    valfx: {
      vthrow: ["wh", "wc", "wC", "wH", "we", "wp", "wP", "ws", "wS", "wx", "ww"],
      vkiss: ["wh", "wc", "wC", "wH", "we", "wp", "wP", "ws", "wS", "wx", "ww"],
      vrain: ["wh", "wc", "wC", "wH", "we", "wp", "wP", "ws", "wS", "wx", "ww"]
    },
    allhallows: {
      candyfx: ["wc", "ws", "we", "wb", "wd", "wg", "wx", "ww"]
    },
    lovespring: {
      lovespring: ["wb", "wu", "wf", "wr", "ws", "wx"]
    }
  };
  ThisPage = "selector";
  const _0x567bf6 = document.querySelector("#goBack");
  setdarkmode();
  TranslateAll();
  if (!_Activity.instance.IsClassic) {
    _0x567bf6.className = "gobackMob";
  }
  let _0x977f8a = !1;
  var _0x2dc0e2;
  var _0x19f816;
  function _0x2043c7(_0x3470e1, _0x59c6d6, _0x4d27f4) {
    if (_0x59c6d6 && !_0x4d27f4) {
      _0x4d27f4 = document.getElementById(_0x59c6d6);
    }
    if (_0x4d27f4) {
      _0x4d27f4.classList.remove(_0x3470e1);
    }
    return _0x4d27f4;
  }
  this.DoLoginEtc = function (_0x4bfaf3) {
    let _0x3fc59a = {
      LoginRegEtc: 1
    };
    _0x3fc59a[_0x4bfaf3] = 1;
    selector.clear(_0x3fc59a);
    _Activity.instance.LoginBodge = !1;
    parent.removeClass("d-none", "selectorFrame");
    _0x50c38e(document.getElementById(_0x4bfaf3).childNodes[1].innerText);
    if (!_0x977f8a) {
      selector.addLoginListerners();
      _0x977f8a = true;
    }
    if (_0x4bfaf3 == "AreYouABot") {
      addClass("d-none", "captchaErr");
      setLoader(!0, "loader");
      if (_Activity.instance.IsClassic) {
        selector.isCaptcha = !0;
        parent.classicSetDialog("selector", 0);
        let _0x339b06 = parent.document.querySelector(".dialogBody");
        if (_0x339b06) {
          _0x339b06.style.cssText = "height: 40%;";
        }
        let _0x4ddbf8 = parent.document.querySelector(".modalDialogContentClassic");
        if (_0x4ddbf8) {
          _0x4ddbf8.style.top = "85px";
        }
        parent.ConnectingClose();
      }
      selector.loadCaptcha(_0x13dd46 => selector.sendCaptcha(_0x13dd46));
    }
    if (_0x4bfaf3 == "LoginForm" && _Activity.instance.CanInstallPWA()) {
      _0x2043c7("d-none", "installpwa");
    }
    TranslateAll();
  };
  this.DoLoginMessage = function (_0x232fac) {
    let _0x1d3109 = clearDiv("loginErr");
    if (_0x232fac.includes("ageverify")) {
      handleAgeVerification();
    } else {
      if (_0x232fac.includes("authorize")) {
        addText(_0x1d3109, ["mob2.authMob", _0x232fac]);
      } else {
        addText(_0x1d3109, _0x232fac);
      }
      _Activity.instance.Window.document.getElementById("Overlays").classList.remove("d-none");
    }
  };
  this.LoginCancel = function () {
    modalClose();
    if (NotLoggedIn) {
      selector.doLoginDialog();
    }
  };
  this.Logout = function () {
    localStorage.removeItem('xat_token');
    localStorage.removeItem('xat_user');
    localStorage.removeItem('xat_userid');
    let _0x45909 = parent;
    if (_0x45909.parent) {
      _0x45909 = _0x45909.parent;
    }
    _0x45909.location.reload();
  };
  this.Login = function () {
    var _0x375292 = document.getElementById("openModal");
    if (_0x375292) {
      _0x375292.style.visibility = "hidden";
    }
    let _0x4b6dfc = document.querySelector("#loginErr");
    if (_0x4b6dfc) {
      _0x4b6dfc.innerHTML = "";
    }
    var _0x114276 = {
      Page: "profile",
      Command: "Login"
    };
    _0x114276.Username = document.getElementById("lusername").value;
    _0x114276.Password = document.getElementById("lpassword").value;
    if (FillInAll(_0x114276, ["Username", "Password"], _0x4b6dfc)) {
      ToC(_0x114276);
      _Activity.instance.LoginBodge = !0;
      let _0x4c7857 = _Activity.instance.Window.document.getElementById("Overlays");
      addClass("d-none", 0, _0x4c7857);
    }
    return !1;
  };
  var _0x1c0dad = /[^0-9A-Za-z]/g;
  var _0x5d62d3 = /[^0-9A-Za-z\.\-@_]/g;
  this.Register = function () {
    let _0x390dfe = document.querySelector("#registerErr");
    if (_0x390dfe) {
      _0x390dfe.innerHTML = "";
    }
    var _0x5c20a6 = {
      Page: "profile",
      Command: "Register"
    };
    _0x5c20a6.Username = document.getElementById("rusername").value;
    _0x2dc0e2 = _0x5c20a6.Password1 = document.getElementById("rpassword1").value;
    _0x19f816 = _0x5c20a6.Email = document.getElementById("remail").value;
    if (FillInAll(_0x5c20a6, ["Username", "Password1", "Email"], _0x390dfe)) {
      _0x5c20a6["g-recaptcha-response"] = selector.getCaptchaResponse();
      _0x5c20a6.ts = 1;
      ToC(_0x5c20a6);
    }
    return !1;
  };
  this.forgotPass = function (_0x289fd4) {
    let _0x110c0a;
    let _0x121eed = document.querySelector("#lostErr");
    if (_0x121eed) {
      _0x121eed.innerHTML = "";
      _0x121eed.style.color = "red";
    }
    selector.loadCaptcha(_0x235c19 => selector.setCaptchaResponse(_0x235c19));
    let _0x3df234 = document.getElementById("lusername");
    _0x3df234 ||= document.getElementById("lemail");
    _0x3df234 &&= _0x3df234.value.toLowerCase();
    if (_0x289fd4) {
      _0x110c0a = _0x289fd4;
    }
    document.getElementById("lostForm").classList.remove("d-none");
    _0x2043c7("d-none", "Overlays");
    if (_0x289fd4 && _0x289fd4.charAt(0) == "{") {
      let _0x2f478d = JSON.parse(_0x289fd4);
      if (_0x2f478d.html) {
        if (_0x121eed) {
          _0x121eed.style.color = "green";
        }
        addText(_0x121eed, _0x2f478d.html, !0);
        document.getElementById("lostForm").classList.add("d-none");
        TranslateAll();
        return;
      }
      if (_0x2f478d.Err && _0x2f478d.Err.login) {
        if (_0x121eed) {
          _0x121eed.style.color = "red";
        }
        _0x110c0a = _0x2f478d.Err.login;
      } else {
        _0x110c0a = "";
      }
    }
    selector.DoLoginEtc("ResetPassword");
    if (_0x110c0a) {
      addText(_0x121eed, _0x110c0a, true);
    }
    if (_0x3df234) {
      document.getElementById("lemail").value = _0x3df234;
    }
    TranslateAll();
  };
  this.ResetPassword = function () {
    let _0x3d803f = document.querySelector("#lostErr");
    if (_0x3d803f) {
      _0x3d803f.innerHTML = "";
    }
    var _0x3b09ef = {
      Page: "profile",
      Command: "ResetPassword"
    };
    _0x19f816 = _0x3b09ef.Email = document.getElementById("lemail").value.toLowerCase();
    if (FillInAll(_0x3b09ef, ["Email"], _0x3d803f)) {
      _0x3b09ef["g-recaptcha-response"] = selector.getCaptchaResponse();
      _0x3b09ef.ts = 1;
      ToC(_0x3b09ef);
    }
    TranslateAll();
    return !1;
  };
  this.RegisterError = function (_0x5a09f2) {
    let _0x15433b = document.querySelector("#registerErr");
    if (_0x15433b) {
      _0x15433b.innerHTML = "";
      _0x15433b.style.color = "red";
    }
    selector.loadCaptcha(_0x5e132e => selector.setCaptchaResponse(_0x5e132e));
    _0x2043c7("d-none", "Overlays");
    if (_0x5a09f2.charAt(0) == "{") {
      let _0xfa444a = JSON.parse(_0x5a09f2);
      if (_0xfa444a?.Err?.ageverify) {
        handleAgeVerification();
        return;
      }
      if (_0x15433b) {
        addText(_0x15433b, _0xfa444a.html, true);
        _0x15433b.style.color = "green";
        document.getElementById("regForm").classList.add("d-none");
      }
      _0xfa444a.Page = "profile";
      _0xfa444a.Command = "SetUserId";
      ToC(_0xfa444a);
    } else {
      addText(_0x15433b, _0x5a09f2, !0);
    }
    TranslateAll();
  };
  this.doRegisterDialog = function (_0x5c9f9b) {
    selector.DoLoginEtc("RegisterDialog");
    selector.loadCaptcha(_0x2aa22f => selector.setCaptchaResponse(_0x2aa22f));
    if (_0x5c9f9b) {
      if ((_0x5c9f9b = JSON.parse(_0x5c9f9b)).RegisterName) {
        document.getElementById("rusername").value = _0x5c9f9b.RegisterName;
      }
      if (_0x5c9f9b.RegisterPass) {
        document.getElementById("rpassword1").value = _0x5c9f9b.RegisterPass;
      }
      if (_0x5c9f9b.RegisterEmail) {
        document.getElementById("remail").value = _0x5c9f9b.RegisterEmail;
      }
    }
    document.getElementById("rpassword1").onkeyup = function (_0x255ea2) {
      return restrictCharacters2(_0x255ea2, _0x1c0dad);
    };
    document.getElementById("remail").onkeyup = function (_0x6421af) {
      return restrictCharacters2(_0x6421af, _0x5d62d3);
    };
  };
  this.loadCaptcha = function (_0x2da9b6) {
    if (typeof turnstile != "undefined") {
      let _0x285b57 = document.getElementById("captcha-container");
      if (!_0x285b57) {
        return;
      }
      if (_0x285b57.dataset.widgetId) {
        turnstile.remove(_0x285b57.dataset.widgetId);
        delete _0x285b57.dataset.widgetId;
      }
      _0x285b57.innerHTML = "";
      let _0x456fd5 = turnstile.render(_0x285b57, {
        sitekey: "0x4AAAAAAA9EZmss0YydDlgD",
        callback: function (_0x53e8b2) {
          let _0x1b1726 = document.getElementById("g-recaptcha-response");
          if (_0x1b1726) {
            _0x1b1726.value = _0x53e8b2;
            _0x2da9b6(_0x53e8b2);
          }
        }
      });
      _0x285b57.dataset.widgetId = _0x456fd5;
      turnstile.execute(_0x456fd5);
    }
  };
  this.setCaptchaResponse = function (_0x46642d) {
    let _0x2dc05b = document.querySelector("#g-recaptcha-response");
    if (_0x2dc05b) {
      _0x2dc05b.value = _0x46642d;
    }
  };
  this.getCaptchaResponse = function () {
    // Private server: skip CAPTCHA verification, return bypass token
    return "private-server-bypass";
  };
  this.sendCaptcha = function (_0x510541 = null) {
    let _0xdd11e6 = {
      m: 3,
      j: selector.CapJson,
      ts: 1,
      "g-recaptcha-response": _0x510541 || selector.getCaptchaResponse()
    };
    loadJSON("/web_gear/chat/AreYouaHuman.php", selector.GotCap, selector.GotCapFailed, _0xdd11e6);
  };
  this.GotCap = function (_0x189f4b) {
    if (_0x189f4b.error) {
      return selector.GotCapFailed(_0x189f4b);
    }
    setLoader(!1, "loader");
    addClass("d-none", "verification");
    _0x2043c7("d-none", "captchaOk");
    _0x2043c7("d-none", "capYes");
    addClass("d-none", "captchaErr");
    addClass("d-none", "capNo");
    setTimeout(() => {
      ToC(_0x189f4b);
      _Activity.instance.Window.setFrameVis();
    }, 3000);
  };
  this.GotCapFailed = function (_0x4f30a0) {
    setLoader(false, "loader");
    addClass("d-none", "verification");
    _0x2043c7("d-none", "captchaErr");
    _0x2043c7("d-none", "capNo");
    addClass("d-none", "captchaOk");
    addClass("d-none", "capYes");
  };
  this.isCaptchaPage = function () {
    let _0x5bc33e = document.querySelector("#AreYouABot");
    return !!_0x5bc33e && !_0x5bc33e.classList.contains("d-none");
  };
  this.LoginSetName = function () {
    if (_0x19f816 && _0x19f816.length > 0) {
      document.getElementById("lusername").value = _0x19f816;
    }
    if (_0x2dc0e2 && _0x2dc0e2.length > 0) {
      document.getElementById("lpassword").value = _0x2dc0e2;
    }
  };
  this.doProfileDialog = function () {
    selector.DoLoginEtc("EditProfileDialog");
    var _0xe2541d = MainObj.user[0];
    document.getElementById("iname").value = _0xe2541d.name;
    document.getElementById("iavatar").value = _0xe2541d.avatar;
    document.getElementById("istatus").value = _0xe2541d.status;
    document.getElementById("ihomepage").value = _0xe2541d.homepage;
  };
  this.doLoginDialog = function (_0x13fd45) {
    _Activity.instance.Selector.DoLoginEtc("LoginForm");
  };
  this.termsOfService = function () {
    var _0x560e8a = {
      Next: "help"
    };
    parent.setFrameVis();
    modalClose();
    ToC(_0x560e8a);
  };
  this.doChat = function () {
    ToC({
      Command: "MakeId",
      Next: "chats"
    });
  };
  this.PwaInstall = function () {
    _Activity.instance.Parent?.PWAinstall();
  };
  var _0x3005fe = {
    pwaInstall: function () {
      selector.PwaInstall();
    },
    LoginCancel: function () {
      selector.LoginCancel();
    },
    forgotPass: function () {
      selector.forgotPass();
    },
    doRegisterDialog: function () {
      selector.doRegisterDialog();
    },
    Logout: function () {
      selector.Logout();
    },
    termsOfService: function () {
      selector.termsOfService();
    },
    doLoginDialog: function () {
      selector.doLoginDialog();
    },
    Register: function () {
      selector.Register();
    },
    getXats: function () {
      getXats();
    },
    quitEdit: function () {
      selector.quitEdit();
    },
    saveProfile: function () {
      selector.saveProfile();
    },
    clearLogin: function () {
      clearAlertMessage();
      selector.Login();
    },
    LoginAndSetName: function () {
      selector.doLoginDialog();
      selector.LoginSetName();
    },
    clearResetPassword: function () {
      clearAlertMessage();
      selector.ResetPassword();
    },
    modalClose: function () {
      modalClose();
    },
    doSignup: function () {
      selector.doRegisterDialog();
    },
    doLogin: function () {
      selector.DoLoginEtc("LoginForm");
    },
    doHelp: function () {
      _Activity.instance.Window.setFrameVis();
      _Activity.instance.SetPage("help");
    },
    doChatNow: function () {
      addClass("d-none", "SignUp");
      addClass("d-none", "LoginRegEtc");
      _Activity.instance.Window.setFrameVis();
      selector.doChat();
    }
  };
  this.addLoginListerners = function () {
    var _0x3057ac;
    var _0x5410f4;
    if (_0x567bf6) {
      _0x567bf6.classList.add("d-none");
    }
    for (_0x3057ac in _0x3005fe) {
      if (_0x5410f4 = document.getElementById(_0x3057ac)) {
        _0x5410f4.addEventListener("click", _0x3005fe[_0x3057ac]);
      }
    }
  };
  const _0x1c8ddd = 1;
  const _0x1254a5 = 2;
  const _0x3da525 = 4;
  function _0x51ff75(_0x5e6bf9) {
    let _0x38ecaa;
    let _0x131f45 = clearDiv("stiff");
    let _0x49f547 = makeElement(_0x131f45, "div");
    let _0x315028 = makeElement(_0x49f547, "ul", "nav nav-tabs buytab");
    for (let _0x54e6d0 in _0x5e6bf9.catagory) {
      let _0xab4dcf = _0x5e6bf9.catagory[_0x54e6d0][0];
      if (_0xab4dcf.charAt(0) != "@") {
        continue;
      }
      let _0x111a72 = makeElement(_0x315028, "li", "nav nav-tabs buytab");
      _0xab4dcf = _0xab4dcf.substr(1);
      addText(_0x111a72, _0xab4dcf.toLowerCase());
      _0x111a72.Catagory = _0xab4dcf;
      if (!_0x38ecaa) {
        _0x38ecaa = _0xab4dcf;
        addClass("active", 0, _0x111a72);
      }
      _0x111a72.addEventListener("click", _0x20a2ef);
    }
    makeElement(_0x131f45, "div", 0, "ToBuy");
    _0x131f45.Obj = _0x5e6bf9;
    _0x20a2ef(_0x38ecaa);
    if (_Activity.instance.IsClassic) {
      _0x31dd75();
    }
  }
  function _0x20a2ef(_0x13da9a) {
    if (typeof _0x13da9a != "string") {
      let _0x2b144d = document.getElementsByClassName("active");
      while (_0x2b144d.length) {
        _0x2043c7("active", 0, _0x2b144d[0]);
      }
      addClass("active", 0, _0x13da9a.currentTarget);
      _0x13da9a = _0x13da9a.currentTarget.Catagory;
    }
    let _0x468cd4 = document.getElementById("stiff");
    let _0x108341 = clearDiv("ToBuy");
    let _0x405760 = _0x468cd4.Obj;
    let _0x3b044c = makeElement(_0x108341, "div", "box buygiftlist");
    let _0x5a8ddc = document.querySelector("#front").value;
    let _0x4829bc = document.querySelector("#message").value;
    let _0x523438 = xInt(microtime(!0));
    for (let _0x22c477 in _0x405760.catagory) {
      let _0x4ba8cf = _0x405760.catagory[_0x22c477];
      if (_0x13da9a == _0x4ba8cf[0] || _0x13da9a == _0x4ba8cf[0].substr(1)) {
        for (let _0x325f56 = 1; _0x325f56 < 3; _0x325f56++) {
          let _0x4d92d6 = _0x4ba8cf[_0x325f56];
          if (!_0x4d92d6) {
            break;
          }
          _0x4d92d6 = _0x4d92d6.split(",");
          let _0x122312 = _0x4d92d6[1];
          let _0x8e8502 = _0x4d92d6[0] == "category";
          let _0x45fc21 = 2;
          while (true) {
            let _0x1bed94 = _0x4d92d6[_0x45fc21];
            if (!_0x1bed94) {
              break;
            }
            if (_0x8e8502) {
              _0x8e8502 = _0x1bed94 = _0x1bed94.substr(1);
              for (let _0x5135ad in _0x405760.catagory) {
                if (_0x1bed94 == _0x405760.catagory[_0x5135ad][0]) {
                  _0x1bed94 = _0x405760.catagory[_0x5135ad][1];
                  _0x1bed94 = _0x1bed94.split(",");
                  _0x1bed94 = _0x1bed94[2];
                  break;
                }
              }
            }
            let _0x5a8e56 = makeElement(_0x3b044c, "div", "box2");
            let _0x527f01 = _0x468cd4.Obj.params[_0x1bed94.toLowerCase()];
            _0x527f01 ||= {};
            _0x527f01.n = selector.MyRegName;
            _0x527f01.id = selector.MyObj.MyId;
            _0x527f01.m = _0x4829bc;
            _0x527f01.g = _0x1bed94;
            _0x527f01.c = _0x122312;
            _0x527f01.f = _0x122312 == 100 ? 4 : 0;
            _0x527f01.Time = _0x523438;
            let _0x3a3d1b = _0x269f1f(_0x5a8e56, _0x527f01, _0x1254a5 | (_0x8e8502 ? _0x3da525 : 0));
            _0x3a3d1b.Scene.CardObj = _0x527f01;
            let _0x388631 = _0x1bed94;
            if (_0x122312 > 0) {
              _0x388631 += ", " + _0x122312 + " xats";
            }
            addToolTip(_0x3a3d1b, _0x388631, {
              select: true,
              position: "low",
              shortTime: true
            });
            if (_0x8e8502) {
              makeElement(_0x5a8e56, "br");
              let _0x5e6a3e = makeElement(_0x5a8e56, "div", "", "giftuname");
              addText(_0x5e6a3e, _0x8e8502);
              _0x3a3d1b.Scene.Catagory = _0x8e8502;
            } else {
              _0x527f01.s = _0x5a8ddc;
            }
            _0x45fc21++;
          }
        }
        break;
      }
    }
  }
  function _0x327247(_0x189ff1) {
    clearAlertMessage();
    if (_0x189ff1 == "OK") {
      document.querySelector("#front").value = "";
      document.querySelector("#message").value = "";
      document.querySelector("#password").value = "";
      document.querySelector("#pm").checked = !1;
      _0x34bca0();
      selector.clear();
      return;
    }
    AlertMessage(_0x189ff1);
  }
  this.BuyGifts = function () {
    if (!_0x2ec9a3("BuyGifts")) {
      selector.clear({
        stiff: 1
      });
      _0x2043c7("d-none", "messageBlock");
      _0x2043c7("d-none", "FrontId");
      _0x50c38e([["box.312", "Send a gift to"], " " + selector.Name + " (" + selector.UserNo + ")"]);
      GetXconsts("selector", ["Auth", "MainObj", "end"]);
    }
  };
  let _0x282220;
  let _0x388e3d;
  let _0x44dc4a = "all";
  let _0x3209bb = [];
  this.gifts = function (_0x41031e) {
    if (_0x567bf6) {
      _0x567bf6.classList.add("d-none");
    }
    if (!_0x2ec9a3("Gifts")) {
      selector.clear({
        Tabs: 1,
        stiff: 1
      });
      addClass("active", "GiftsBut");
      if (_0x41031e) {
        if (_0x41031e.id) {
          selector.UserNo = _0x41031e.id;
        }
        if (_0x41031e.regname) {
          selector.Name = _0x41031e.regname;
        }
        if (_0x41031e.cb) {
          selector.cb = _0x41031e.cb;
        }
      }
      if (selector.MyObj && selector.UserNo && selector.UserNo != selector.MyObj?.MyId) {
        selector.gotGifts1();
      } else {
        selector.UserNo = selector.MyObj?.MyId;
        if (!selector.UserNo) {
          selector.MyObj = _Activity.instance.MyObj;
          selector.UserNo = selector.MyObj.MyId;
        }
        selector.Name = selector.MyObj.MyRegName;
        selector.cb = selector.MyObj.cb;
        GetXconsts("selector", ["Auth", "end"]);
      }
    }
  };
  this.gotGifts1 = function () {
    let _0x4a6b09;
    let _0x45ec81 = "/web_gear/chat/gifts22.php";
    if (selector.MyObj && selector.UserNo == selector.MyObj.MyId) {
      selector.Name = selector.Auth.RegName;
    }
    _0x50c38e([["box.257", "Gifts"], "" + selector.Name == "undefined" ? " - " + selector.UserNo : " - " + selector.Name + " (" + selector.UserNo + ")"]);
    if (selector.UserNo == selector.MyObj.MyId) {
      _0x4a6b09 = {};
      _0x4a6b09.PassHash = selector.Auth.PassHash;
      _0x4a6b09.DeviceId = selector.Auth.DeviceId;
      _0x4a6b09.id = selector.MyObj.MyId;
      _0x4a6b09.k = _0x282220 || _0x3209bb[1];
      if (_0x4a6b09.k && !_0x3209bb[0]) {
        _0x4a6b09.old = 1;
      }
      if (_0x3209bb[1]) {
        _0x4a6b09.flags = _0x3209bb[0];
      }
      _0x4a6b09.del = _0x388e3d;
      _0x388e3d = 0;
      _0x3209bb = [];
    } else {
      _0x45ec81 += "?id=" + selector.UserNo + "&cb=" + selector.cb;
    }
    _0x44dc4a = "all";
    setLoader(!0);
    loadJSON(_0x45ec81, _0x177d8e, _0x9fa54a, _0x4a6b09);
  };
  function _0x177d8e(_0x18cd29) {
    if (_0x44d9f5 !== "Gifts") {
      return;
    }
    if (_0x18cd29.cb) {
      ToC({
        Page: "selector",
        Command: "CacheBust"
      });
      delete _0x18cd29.cb;
    }
    let _0x529c0f = clearDiv("stiff");
    _0x5c9921(_0x18cd29);
    let _0x26f5f7 = makeElement(_0x529c0f, "div", "box");
    let _0x10c290 = Object.keys(_0x18cd29).sort().reverse();
    for (let _0x29d3a4 in _0x10c290) {
      let _0x56eb4e = _0x10c290[_0x29d3a4];
      _0x18cd29[_0x56eb4e].Time = _0x56eb4e;
      let _0x4c0dfa = makeElement(_0x26f5f7, "div", "box2");
      let _0x12b555 = _0x18cd29[_0x56eb4e].f == null || (parseInt(_0x18cd29[_0x56eb4e].f) & 1) == 0;
      _0x4c0dfa.setAttribute("data-gFlag", _0x18cd29[_0x56eb4e].f);
      _0x269f1f(_0x4c0dfa, _0x18cd29[_0x56eb4e]);
      makeElement(_0x4c0dfa, "br");
      let _0xdb3b30 = _0x18cd29[_0x56eb4e].n;
      let _0x1c6b14 = makeElement(_0x4c0dfa, "div", "", "giftuname");
      addText(_0x1c6b14, _0xdb3b30);
      if (_0xdb3b30.length > 6) {
        _0x1c6b14.style.fontSize = "12px";
        _0x1c6b14.style.marginTop = "5px";
      }
      if (_0xdb3b30.length > 9) {
        _0x1c6b14.style.fontSize = "10px";
        _0x1c6b14.style.marginTop = "5px";
      }
      if (_0xdb3b30.length > 14) {
        _0x1c6b14.style.fontSize = "8px";
        _0x1c6b14.style.marginTop = "5px";
      }
      if (_0x12b555) {
        let _0x3cf1a8 = makeElement(_0x4c0dfa, "img", "privateGift");
        _0x3cf1a8.src = "svg/lock.svg";
        _0x3cf1a8.width = "25";
      }
    }
    setLoader(!1);
  }
  function _0x5c9921(_0x557cff) {
    let _0x462910 = document.querySelector("#stiff");
    let _0x3330e0 = makeElement(_0x462910, "div", "totalbut", "total");
    let _0x3d33eb = makeElement(_0x462910, "div", "sendgiftbut", "total");
    let _0x434fae = selector.MyObj.MyId == selector.UserNo;
    let _0x2be102 = makeElement(_0x3d33eb, "div", _0x434fae ? "sendinv" : "", "giftTotal");
    if (selector.MyObj.MyId !== selector.UserNo) {
      let _0x17f647 = makeElement(_0x2be102, "img");
      addText(_0x2be102, ["box.311", "send gift"]);
      _0x17f647.src = "svg/giftssend.svg";
      _0x17f647.width = "19";
      _0x17f647.addClass = "sendgifticon";
      _0x2be102.addEventListener("click", selector.BuyGifts);
    }
    let _0x3b5c4f = Object.keys(_0x557cff).length || "0";
    let _0x5c18e9 = makeElement(_0x3330e0, "div", "", "giftTotal");
    let _0x287840 = makeElement(_0x5c18e9, "img");
    _0x287840.src = "svg/actGifts.svg";
    _0x5c18e9.classList.add("giftActiveFilter");
    _0x287840.setAttribute("data-filter", "all");
    _0x5c18e9.setAttribute("data-filter", "all");
    addText(_0x5c18e9, _0x3b5c4f);
    _0x5c18e9.addEventListener("click", _0xa5d0b7 => {
      if (_0x3b5c4f != 0) {
        _0x486ecf(_0xa5d0b7);
      }
    });
    let _0x45b543 = makeElement(_0x3330e0, "div", "", "giftTotal");
    let _0x22e6a5 = makeElement(_0x45b543, "img");
    var _0x4d638f = Object.keys(_0x557cff).filter((_0x41df96, _0x3a5202) => _0x557cff[_0x41df96].f == null || (parseInt(_0x557cff[_0x41df96].f) & 1) == 0);
    _0x22e6a5.src = "svg/giftslock.svg";
    _0x22e6a5.setAttribute("data-filter", "public");
    _0x45b543.setAttribute("data-filter", "public");
    addText(_0x45b543, Object.keys(_0x4d638f).length || "0");
    _0x45b543.addEventListener("click", _0x50e814 => {
      if (_0x4d638f.length != 0) {
        _0x486ecf(_0x50e814);
      }
    });
    let _0x3e7e6e = makeElement(_0x3330e0, "div", "", "giftTotal");
    let _0x28b84b = makeElement(_0x3e7e6e, "img");
    var _0x4d42d4 = Object.keys(_0x557cff).filter((_0x37b2c7, _0x1f4a65) => parseInt(_0x557cff[_0x37b2c7].f) & 1);
    _0x28b84b.src = "svg/giftsunlock.svg";
    _0x28b84b.setAttribute("data-filter", "private");
    _0x3e7e6e.setAttribute("data-filter", "private");
    addText(_0x3e7e6e, Object.keys(_0x4d42d4).length || "0");
    _0x3e7e6e.addEventListener("click", _0x7772c9 => {
      if (_0x4d42d4.length != 0) {
        _0x486ecf(_0x7772c9);
      }
    });
  }
  function _0x9fa54a(_0x41d18e) {
    let _0x4f3378 = clearDiv("stiff");
    let _0x6411d7 = selector.UserNo == selector.MyObj.MyId ? ["box.313", "You have no gifts."] : ["box.314", "User has no gifts."];
    _0x5c9921({});
    setLoader(!1);
    let _0xa09f58 = makeElement(_0x4f3378, "span", "text-center nogift");
    addText(_0xa09f58, _0x6411d7);
  }
  function _0x486ecf(_0x10eec7) {
    let _0x19abc6 = _0x10eec7.target.dataset;
    if (!_0x19abc6 || !_0x19abc6.filter) {
      return;
    }
    if (_0x10eec7.target.nodeName == "IMG") {
      _0x10eec7.target.parentNode.classList.add("giftActiveFilter");
    } else {
      _0x10eec7.target.classList.add("giftActiveFilter");
    }
    let _0x42f5d4 = _0x19abc6.filter;
    if (_0x42f5d4 !== _0x44dc4a) {
      let _0x48ba04 = document.querySelector("[data-filter=\"" + _0x44dc4a + "\"]");
      if (_0x48ba04) {
        _0x48ba04.classList.remove("giftActiveFilter");
      }
      let _0x2c34b6 = document.querySelectorAll(".box2");
      if (_0x2c34b6.length > 0) {
        for (let _0x496d20 = 0; _0x496d20 < _0x2c34b6.length; _0x496d20++) {
          let _0x55c0ee = _0x2c34b6[_0x496d20].dataset;
          let _0x39514a = parseInt(_0x55c0ee.gflag);
          switch (_0x42f5d4) {
            case "all":
              _0x2c34b6[_0x496d20].style.display = "inline-block";
              break;
            case "public":
              _0x2c34b6[_0x496d20].style.display = _0x39514a & 1 ? "none" : "inline-block";
              break;
            case "private":
              _0x2c34b6[_0x496d20].style.display = _0x39514a == null || (_0x39514a & 1) == 0 ? "none" : "inline-block";
          }
        }
      }
      _0x44dc4a = _0x42f5d4;
    }
  }
  function _0x5a4804(_0x59db14) {
    _0x282220 = _0x59db14.currentTarget.Time;
    selector.gifts();
  }
  function _0xab97ea(_0x23e821) {
    _0x3209bb = [_0x23e821.currentTarget.Flags, _0x23e821.currentTarget.Time];
    selector.gifts();
  }
  function _0x50dc55() {
    let _0x3e78fb = clearDiv("BigCard");
    _0x3e78fb.removeEventListener("click", _0x1d2f2e);
    addClass("d-none", 0, _0x3e78fb);
    return _0x3e78fb;
  }
  function _0x1d2f2e(_0x410e94) {
    if (isNaN(_0x410e94)) {
      _0x410e94 = 0;
    }
    setTimeout(function () {
      document.getElementById("BigCard").Small.style.visibility = "visible";
      _0x50dc55();
    }, _0x410e94);
  }
  function _0x269f1f(_0x168ac6, _0x214804, _0x525fe9) {
    _0x525fe9 ||= 0;
    let _0x51846d = 224;
    let _0x11b8cb = 284;
    let _0x40976d = selector.UserNo == selector.MyObj.MyId;
    let _0x2f80d6 = makeElement(_0x168ac6, "div", "hold");
    let _0x235e12 = _0x2f80d6.Scene = makeElement(_0x2f80d6, "div", "scene" + (_0x525fe9 & _0x1c8ddd ? "-big" : ""), "tt" + _0x214804.Time);
    let _0x254efb = makeElement(_0x235e12, "div", "gift");
    let _0x349eed = makeElement(_0x254efb, "div", "giftFace giftFaceFront");
    let _0x50e951 = SVG().addTo(_0x349eed).viewbox(0, 0, _0x11b8cb, 320);
    let _0x3d64dd = _0x214804.f == null || (parseInt(_0x214804.f) & 1) == 0;
    let _0x55012a = _0x214804.g.replace(/[^0-9a-zA-Z]/g, "_").toLowerCase();
    if (_0x214804.f & 2) {
      _0x55012a = _0x214804.f & 4 ? "unopenedgift" : "unreadcard";
    }
    let _0x10dfc4 = _0x50e951.image("/images/js/gift/" + _0x55012a + ".svg?z1");
    if (_0x214804.f & 2) {
      if (_0x40976d) {
        _0x235e12.Time = _0x214804.Time;
        _0x235e12.addEventListener("click", _0x5a4804);
        return;
      } else {
        addToolTip(_0x2f80d6, ["box.309", "User must read gift first"]);
        _0x2f80d6.style.opacity = "0.4";
        return;
      }
    }
    if (_0x214804.f & 4 && _0x214804.s) {
      _0x10dfc4.scale(0.9);
      _0x10dfc4.translate(15, 20);
    }
    if (_0x525fe9 & _0x1254a5 && !_0x40976d) {
      let _0x3f19a7 = document.querySelector("#message");
      let _0x385746 = document.querySelector("#front");
      if (_0x3f19a7 && _0x3f19a7.value.length) {
        _0x214804.m = _0x3f19a7.value;
      }
      if (_0x385746 && _0x385746.value.length) {
        _0x214804.s = _0x385746.value;
      }
      _0x214804.n = selector.Auth.RegName || "";
      _0x214804.id = selector.MyObj.MyId;
    }
    _0x214804.s ||= "\u2003";
    {
      let _0x17f78e = "M30,96 C77,25 192,25 254,96";
      let _0x10c7e7 = _0x214804.f & 8;
      if (_0x10c7e7) {
        _0x51846d = _0x11b8cb;
        if (_0x214804.s != "\u2003") {
          let _0x13fd49 = "0,46 284,1 284,48 0,93";
          _0x50e951.polygon(_0x13fd49).fill({
            color: "#000",
            opacity: 0.3
          }).transform({
            translateY: 6
          });
          _0x50e951.polygon(_0x13fd49).fill("#" + toHex6(_0x214804.FrontColBkg));
        }
        _0x17f78e = "M10,83 C100,65 183,52 274,38";
      }
      let _0x319197 = _0x214804.FrontColText;
      if (!Array.isArray(_0x319197)) {
        _0x319197 = [_0x319197, _0x319197];
      }
      if (typeof _0x319197[0] == "number") {
        _0x319197[0] = "#" + toHex6(_0x319197[0]);
        _0x319197[1] = "#" + toHex6(_0x319197[1]);
      }
      let _0x4532d5 = _0x50e951.text(function (_0x2c81d8) {
        _0x2c81d8.tspan(_0x214804.s);
      });
      _0x4532d5.path(_0x17f78e);
      let _0x22d3aa = 5;
      let _0x329481 = _0x319197[0];
      if (_0x319197[0] != _0x319197[1] && !_0x10c7e7) {
        _0x329481 = _0x50e951.gradient("radial", function (_0x29b7f8) {
          _0x29b7f8.stop(0.45, _0x319197[1]);
          _0x29b7f8.stop(1, _0x319197[0]);
        });
        _0x329481.attr({
          cx: 0.5,
          cy: 0.73
        });
      }
      _0x4532d5.font({
        fill: _0x329481,
        size: _0x22d3aa,
        family: "Arial, Helvetica, sans-serif"
      });
      let _0x242d1c = 0;
      while (_0x242d1c++ < 10 && _0x4532d5.length() < _0x51846d / 2) {
        _0x22d3aa *= 1.2;
        _0x4532d5.font("size", _0x22d3aa);
      }
      _0x22d3aa = _0x22d3aa * 2 / 1.1;
      if (_0x22d3aa > 40) {
        _0x22d3aa = 40;
      }
      _0x4532d5.font("size", _0x22d3aa);
      _0x4532d5.textPath().attr("startOffset", Math.round((142 - _0x4532d5.bbox().cx) * 100 / _0x11b8cb) + "%");
    }
    if (_0x525fe9 & _0x1c8ddd) {
      let _0x1725ba = makeElement(_0x254efb, "div", "giftFace giftFaceBack");
      let _0x34f7af = makeElement(_0x1725ba, "div", "giftTitle");
      let _0x1db7ee = makeElement(_0x1725ba, "div", "giftMessage");
      let _0xf24b80 = makeElement(_0x1725ba, "div", "giftAcc");
      var _0x5a36b4 = GetTimeToGo(_0x214804.Time * 1000, !0);
      let _0x483e03 = makeElement(_0x1725ba, "div", "giftFooter");
      addText(_0x34f7af, _0x5a36b4);
      makeElement(_0x34f7af, "br");
      if (!(_0x525fe9 & _0x1254a5)) {
        if (_0x3d64dd) {
          if (!_0x40976d) {
            _0x214804.m = ["box.305", "Message is private"];
            _0x1db7ee.style.opacity = "0.4";
          }
        }
        if (_0x214804.m === "" || _0x214804.noMessage) {
          _0x214804.m = ["box.304", "No message included"];
          _0x1db7ee.style.opacity = "0.4";
          _0x214804.noMessage = true;
        }
      }
      if (_0x214804.m.length > 80 || _0x214804.topgap) {
        _0x1db7ee.style.top = "36%";
        _0x214804.topgap = true;
      }
      if (_0x214804.m.length > 170 || _0x214804.bigtext) {
        _0x1db7ee.style.fontSize = "17px";
        _0x214804.bigtext = true;
      }
      if (_0x214804.m.length < 80 || _0x214804.topgaporg) {
        _0x1db7ee.style.top = "40% !important";
        _0x214804.topgaporg = true;
      }
      if (_0x214804.m.length < 170 || _0x214804.bigtextorg) {
        _0x1db7ee.style.fontSize = "22px !important";
        _0x214804.bigtextorg = true;
      }
      addText(_0x1db7ee, _0x214804.m);
      makeElement(_0x1db7ee, "br");
      addText(_0xf24b80, _0x214804.n + " (" + _0x214804.id + ")");
      if (_0x40976d && !(_0x525fe9 & _0x1254a5)) {
        let _0x26ab04 = makeElement(_0x483e03, "button", "giftDelete GiftMake");
        let _0x1c52db = makeElement(_0x26ab04, "img");
        _0x1c52db.src = "svg/giftsdelete.svg";
        _0x1c52db.width = "22";
        _0x26ab04.Time = _0x214804.Time;
        _0x26ab04.addEventListener("click", _0x57ab52 => {
          setTimeout(() => {
            (function (_0x132351) {
              const _0x12eb00 = "svg/remove" + (config.ButColW && toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg";
              let _0x427637 = makeElement(null, "img");
              _0x427637.src = _0x12eb00;
              _0x427637.width = "16";
              _0x427637.alt = "close";
              let _0x583707 = makeElement(null, "div");
              let _0x31300a = makeElement(_0x583707, "div", "modalDialogContentClassic");
              let _0x2b9a30 = makeElement(_0x31300a, "div", "dialogTitleBar");
              let _0x50927a = makeElement(_0x2b9a30, "span", "dialogTitle link", "openLink");
              makeElement(_0x2b9a30, "span", "dialogTitleAction", "id_ModalClose").appendChild(_0x427637);
              let _0x469a33 = makeElement(_0x31300a, "div", "dialogBody");
              let _0x50a20f = makeElement(_0x469a33, "div", "dialogPadding");
              let _0x1f94e0 = makeElement(_0x50a20f, "div", "wrapper", "wrapper");
              let _0xbd04c6 = makeElement(_0x469a33, "div", "dialogActions");
              let _0x266194 = makeElement(_0xbd04c6, "div", "butcontainer previewBut centered").appendChild(makeElement(null, "div", "butlayout", "actionButton"));
              addText(_0x50927a, ["box.306", "Confirm deletion"]);
              _0x31300a.dataset.w = 0.6;
              addText(_0x1f94e0, ["box.307", "Delete this gift?"]);
              _0x266194.innerHTML = "";
              addText(_0x266194, ["box.308", "Delete"]);
              HiddenDivs.AlertDialog = _0x583707.innerHTML;
              doModal("AlertDialog");
              ColorTitle();
              setButCols(parent.config.ButCol, parent.config.ButColW);
              let _0x215f80 = _0x132351;
              document.querySelector("#actionButton").addEventListener("click", () => {
                _0x388e3d = _0x215f80.target.Time;
                if (_0x388e3d == null) {
                  _0x388e3d = _0x215f80.target.parentElement.Time;
                }
                modalClose();
                selector.gifts();
              });
              document.querySelector("#id_ModalClose").addEventListener("click", () => {
                modalClose();
              });
            })(_0x57ab52);
          }, 1250);
        });
        let _0x2701b1 = makeElement(_0x483e03, "button", "GiftMake");
        addText(_0x2701b1, _0x3d64dd ? ["box.302", "Make public"] : ["box.303", "Make private"]);
        _0x2701b1.Time = _0x214804.Time;
        _0x2701b1.Flags = _0x3d64dd ? "1" : "0";
        _0x2701b1.addEventListener("click", _0xab97ea);
      }
    }
    function _0x22029e(_0xb9d6b6) {
      if (_0xb9d6b6) {
        _0xb9d6b6.stopPropagation();
      }
      if (_0x525fe9 & _0x3da525) {
        _0x20a2ef(_0xb9d6b6.currentTarget.Catagory);
        return;
      }
      if (_0x525fe9 & _0x1254a5 && document.getElementById("password").value.length > 1) {
        (function (_0x47eb5c) {
          let _0x4b6a9f = _0x47eb5c.currentTarget.CardObj;
          let _0x3f114a = selector.Auth;
          _0x4b6a9f.b = selector.UserNo;
          _0x4b6a9f.u = _0x3f114a.UserNo;
          _0x4b6a9f.r = _0x3f114a.RoomId;
          _0x4b6a9f.w = GetAsMB(_0x3f114a.RegName) + "|" + GetAsMB(selector.Name) + "|" + (_0x4b6a9f.f & 4 ? "gift\xA0" : "card");
          _0x4b6a9f.t = _0x3f114a.dt;
          _0x4b6a9f.p = document.getElementById("password").value;
          _0x4b6a9f.s = document.getElementById("front").value + " ";
          _0x4b6a9f.m = document.getElementById("message").value + " ";
          _0x4b6a9f.f = 1;
          if (document.getElementById("pm").checked) {
            _0x4b6a9f.f &= -2;
          }
          customModalWithMsg(["mob2.sending", "Sending..."], ["mob2.pleasewait", "Please wait"]);
          loadHTML(chatUrl + "buygifts.php", _0x327247, 0, _0x4b6a9f);
        })(_0xb9d6b6);
        return;
      }
      let _0x5fa5f9 = _0x50dc55();
      _0x2043c7("d-none", 0, _0x5fa5f9);
      let _0x5bdfeb = _0x5fa5f9.Rect = _0x2f80d6.getBoundingClientRect();
      let _0x3b0ccd = _0x269f1f(_0x5fa5f9, _0x214804, _0x525fe9 | _0x1c8ddd);
      _0x5fa5f9.Big = _0x3b0ccd;
      _0x5fa5f9.Small = _0x2f80d6;
      _0x3b0ccd.style.left = _0x5bdfeb.left - 10 + "px";
      _0x3b0ccd.style.top = _0x5bdfeb.top - 10 + "px";
      _0x2f80d6.style.visibility = "hidden";
      _0x5fa5f9.addEventListener("click", _0x1d2f2e);
    }
    if (_0x525fe9 & _0x1c8ddd) {
      _0x235e12.Big = 1;
      let _0x1c43f1 = document.getElementById("BigCard");
      _0x235e12.addEventListener("click", function (_0x5b839a) {
        if (_0x5b839a) {
          _0x5b839a.stopPropagation();
        }
        let _0x2fbf32 = document.getElementById("BigCard").Big.Scene;
        if (_0x2fbf32.Big != 0) {
          if (_0x2fbf32.classList.contains("is-zoomed")) {
            if (_0x254efb.classList.contains("is-flipped")) {
              _0x2fbf32.style.transform = "";
              _0x2fbf32.classList.toggle("is-zoomed");
              _0x254efb.classList.toggle("is-flipped");
              _0x1d2f2e(1250);
            } else {
              _0x254efb.classList.toggle("is-flipped");
            }
          } else {
            _0x2fbf32.classList.toggle("is-zoomed");
          }
        }
      });
      _0x235e12.classList.toggle("is-zoomed");
      let _0x139cb6 = _0x1c43f1.offsetWidth / 2 - 35;
      _0x235e12.style.transform = "translate(" + (_0x139cb6 - _0x1c43f1.Rect.left) + "px," + (180 - _0x1c43f1.Rect.top) + "px) scale(0.85) rotate(360deg)";
    } else {
      _0x235e12.Big = 0;
      _0x235e12.addEventListener("click", _0x22029e);
      if (_0x282220 == _0x214804.Time) {
        _0x282220 = 0;
        _0x22029e();
      }
    }
    return _0x2f80d6;
  }
  function _0x41db24(_0x8d6485, _0x53d5d6, _0x28a867) {
    let _0x15aa0a = makeElement(_0x8d6485, "div", "stickercell");
    _0x15aa0a.style.float = "left";
    let _0x51378e = makeElement(_0x15aa0a, "img");
    _0x51378e.border = 0;
    _0x51378e.width = 100;
    _0x51378e.height = 100;
    _0x51378e.draggable = !1;
    let _0xeacc23 = _0x53d5d6[0].replace(/[^0-9a-zA-Z]/g, "_").toLowerCase();
    _0x51378e.src = "/h_s_" + _0xeacc23 + "_" + (_0x53d5d6[1] ? encodeURIComponent(_0x53d5d6[1]) : "") + ".png";
    new Image().src = _0x51378e.src;
    _0x15aa0a.addEventListener("click", _0x28a867);
    return _0x15aa0a;
  }
  this.stickers = _0x49f277 => {
    selector.hideWallet();
    if (_0x567bf6) {
      _0x567bf6.classList.add("d-none");
    }
    if (!_0x2ec9a3("Sticker")) {
      _0x1458aa = typeof _0x49f277 == "string" ? _0x49f277 : null;
      selector.clear({
        Tabs: 1
      });
      setLoader(true);
      addClass("active", "StickBut");
      GetXconsts("selector", ["Stickers", "w_Powers", "pssa", "end"]);
    }
  };
  let _0x2760ac = null;
  let _0x3a863b = null;
  function _0x5c5d18(_0x124429) {
    selector.hideWallet();
    let _0x342367 = selector;
    let _0x1f744a = {};
    let _0x21e0ba = {};
    _0x342367.AllStickers = _0x124429;
    document.querySelector("#stickMessage").value = "";
    _0x50c38e(["box.295", "Send a sticker"]);
    const _0x4f2cc9 = parent.document.getElementById("textEntryEditable");
    if (_0x4f2cc9) {
      _0x4f2cc9.focus();
    }
    addToolTip(document.querySelector("#stickColor1"), ["box.315", "Add inner color"], {
      select: !0,
      position: "low"
    });
    addToolTip(document.querySelector("#stickColor2"), ["box.316", "Add outer color"], {
      select: !0,
      position: "left"
    });
    ["#stickColor1", "#stickColor2"].forEach(_0x3c1cbc => {
      const _0x3d15a5 = {
        save: !0,
        input: !0
      };
      const _0x9f5494 = {
        palette: !0,
        preview: !0,
        opacity: !0,
        hue: !0,
        interaction: _0x3d15a5
      };
      const _0x38782b = {
        el: _0x3c1cbc,
        theme: "nano",
        preview: !0,
        useAsButton: !0,
        closeOnScroll: !1,
        lockOpacity: !0,
        components: _0x9f5494
      };
      let _0x4d0fe9 = Pickr.create(_0x38782b).on("change", (_0x2080db, _0x5e098d) => {
        if (_0x3c1cbc == "#stickColor1") {
          _0x2760ac = _0x2080db.toHEXA().toString();
          document.querySelector("#stickMessage").style.color = _0x2760ac;
        } else {
          _0x3a863b = _0x2080db.toHEXA().toString();
          document.querySelector("#stickMessage").style.background = _0x3a863b;
        }
      }).on("save", (_0x43ca20, _0x532a95) => {
        _0x4d0fe9.hide();
      });
    });
    for (let _0x3eb1fa in _0x342367.Stickers) {
      let _0x3d96c1 = _0x342367.pssa[xInt(_0x3eb1fa) + 1];
      let _0x5b1ef0 = _0x124429[_0x3d96c1];
      if (_0x414369(_0x3eb1fa)) {
        _0x1f744a[_0x3d96c1] = _0x5b1ef0;
      } else {
        _0x21e0ba[_0x3d96c1] = _0x5b1ef0;
      }
    }
    let _0x2c7afc = document.getElementById("stiff");
    function _0x32a682(_0x237e6d) {
      let _0x532e1a = document.querySelector("#stickMessage").value;
      if (_0x2760ac == _0x3a863b) {
        _0x2760ac = _0x3a863b = "";
      }
      selector.clear();
      let _0x48bb06 = {
        Page: "messages",
        Command: "Paste"
      };
      _0x48bb06.Paste = "(" + _0x237e6d.target.parentNode.name + "#" + _0x532e1a.replace(/'/gi, "’") + _0x2760ac + _0x3a863b + ")";
      ToC(_0x48bb06);
      _0x34bca0();
    }
    function _0x5e5bda(_0x3ed46a) {
      clearDiv("stiff");
      _0x2043c7("d-none", "stickMessageBlock");
      if (navigator.userAgent.indexOf("Firefox") > 0) {
        document.querySelector(".powersScroll").style.height = "94%";
      }
      for (let _0x36e347 in _0x342367.AllStickers[_0x3ed46a]) {
        const _0x299a32 = _0x3ed46a + "." + _0x342367.AllStickers[_0x3ed46a][_0x36e347];
        const _0x13d648 = _0x41db24(_0x2c7afc, [_0x299a32, ""], _0x32a682);
        addToolTip(_0x13d648, "(" + _0x299a32 + ")", {
          select: !0,
          position: "low"
        });
        _0x13d648.name = _0x299a32;
      }
    }
    function _0x413afc(_0x596806, _0xa49625, _0x392ea1) {
      if (_0x1458aa) {
        _0x5e5bda(_0x1458aa);
      } else {
        for (let _0x4eeae7 in _0xa49625) {
          if (_0xa49625[_0x4eeae7]) {
            const _0x353906 = _0x41db24(_0x596806, [_0x4eeae7 + "." + _0xa49625[_0x4eeae7][Math.floor(Math.random() * _0xa49625[_0x4eeae7].length)], _0x4eeae7], () => {
              _0x5e5bda(_0x4eeae7);
            });
            if (_0x392ea1) {
              _0x353906.style.opacity = "0.6";
              addToolTip(_0x353906, ["mob2.nostickers", "You need $1 power to use these stickers.", capitalize(_0x4eeae7)], {
                select: true,
                position: "low"
              });
            } else {
              addToolTip(_0x353906, ["box.301", "View stickers"], {
                select: true,
                position: "low"
              });
            }
          }
        }
      }
    }
    _0x2043c7("d-none", "stiff");
    let _0x5c612d = makeElement(_0x2c7afc, "div");
    _0x413afc(_0x5c612d, _0x1f744a);
    _0x5c612d = makeElement(_0x2c7afc, "div");
    _0x413afc(_0x5c612d, _0x21e0ba, 1);
    setLoader(!1);
  }
  const _0x1e03c7 = {
    Snow: 56,
    Animal: -116,
    WildHorses: 124,
    SteamTrain: 124,
    Rocket: 133,
    Stoneage: 135
  };
  const _0x3b68cd = _0x1e03c7;
  function _0xec985a(_0x4bc451) {
    selector.clear();
    const _0x183d4c = parent.document.getElementById("textEntryEditable");
    if (_0x183d4c) {
      _0x183d4c.focus();
    }
    let _0x7347f6 = {
      Page: "messages",
      Command: "Paste"
    };
    let _0xffc3f9 = _0x4bc451.target?.dataset?.sm;
    _0xffc3f9 = _0xffc3f9.replace(/\*/gi, "#");
    _0x7347f6.Paste = "(" + (_0xffc3f9.indexOf("#") >= 0 ? _0xffc3f9 : _0xffc3f9 + "#") + ")";
    ToC(_0x7347f6);
    _0x34bca0();
  }
  function _0x2588d9(_0x393451, _0x398e8f, _0x473111) {
    let _0x3728be = selector.pssa && selector.pssa.indexOf(_0x398e8f) >= 0;
    const _0x4c77eb = _Activity.instance.Smilies.MakeSmiley(_0x393451, _0x398e8f, {
      size: 30,
      tooltipPosition: "low",
      className: "smSpan",
      tooltip: !!_Activity.instance.IsClassic && _0x398e8f,
      callback: _0x486224 => {},
      scrollParent: document.querySelector(".powersScroll")
    });
    _0x4c77eb.name = _0x398e8f;
    if (_0x3728be && _0x289d49) {
      _0x4c77eb.classList.add("mainPower", "powind");
    }
    if (_0x3728be && _0x289d49) {
      _0x4c77eb.addEventListener("click", _0x536c66 => {
        _0x289d49 = false;
        _0x536c66.target.dataset.smw = _0x398e8f;
        _0x12f064(_0x536c66);
      });
    } else {
      _0x4c77eb.addEventListener("click", _0x36f4c2 => {
        _0x289d49 = false;
        _0x473111(_0x36f4c2);
      });
    }
    return _0x4c77eb;
  }
  function _0x12f064(_0x2e75a6) {
    let _0x3c036d = document.getElementById("stiff");
    selector.clear({
      Tabs: 1,
      stiff: 1
    });
    addClass("active", "SmBut");
    let _0x2504de;
    let _0x2977a8 = _0x2e75a6.target.dataset.smw;
    switch (_0x2977a8) {
      case "yellows":
        _0x2504de = selector.syel;
        document.querySelector("#stiff").style.height = "";
        if (Classic) {
          document.querySelector(".powersScroll").style.height = "";
        }
        if (navigator.userAgent.indexOf("Firefox") > 0) {
          document.querySelector(".powersScroll").style.height = "29%";
        }
      case "others":
        _0x2504de ||= selector.soth;
        _0x2504de = _0x2504de.split(",");
        document.querySelector("#stiff").style.height = "";
        if (Classic) {
          document.querySelector(".powersScroll").style.height = "";
        }
        if (navigator.userAgent.indexOf("Firefox") > 0) {
          document.querySelector(".powersScroll").style.height = "26%";
        }
        break;
      default:
        let _0x352470;
        for (let _0x11bbd7 in selector.pssa) {
          if (_0x2977a8 == selector.pssa[_0x11bbd7]) {
            _0x352470 = xInt(_0x11bbd7) - 1;
            break;
          }
        }
        if (navigator.userAgent.indexOf("Firefox") > 0) {
          document.querySelector(".powersScroll").style.height = "88%";
        }
        _0x2504de = [_0x2977a8];
        for (let _0x17f3f7 in selector.topsh) {
          if (_0x352470 == selector.topsh[_0x17f3f7]) {
            _0x2504de.push(_0x17f3f7);
          }
        }
    }
    for (let _0x5e756f in _0x2504de) {
      _0x2588d9(_0x3c036d, _0x2504de[_0x5e756f], _0xec985a);
    }
    if (_0xc88add[_0x2977a8]) {
      let _0x3cb77d = makeElement(_0x3c036d, "div");
      let _0x493835 = Object.prototype.toString.call(_0xc88add[_0x2977a8]);
      if (_0x493835 == "[object Object]") {
        let _0xe047f0 = _0xc88add[_0x2977a8];
        for (let _0x2f6652 in _0xe047f0) {
          for (let _0xd8ea55 in _0xe047f0[_0x2f6652]) {
            _0x2588d9(_0x3cb77d, _0x2f6652 + "#" + _0xe047f0[_0x2f6652][_0xd8ea55], _0xec985a);
          }
        }
      } else {
        for (let _0x3efe79 in _0x2504de) {
          if (_0x493835 == "[object Array]") {
            for (let _0x11a34e in _0xc88add[_0x2977a8]) {
              _0x2588d9(_0x3cb77d, _0x2504de[_0x3efe79] + "#" + _0xc88add[_0x2977a8][_0x11a34e], _0xec985a);
            }
          } else {
            _0x2588d9(_0x3cb77d, _0x2504de[_0x3efe79] + "#" + _0xc88add[_0x2977a8], _0xec985a);
          }
        }
      }
    }
    if (_0x567bf6) {
      _0x567bf6.classList.remove("d-none");
      _0x567bf6.addEventListener("click", () => {
        selector.startSmilies();
        setTimeout(() => {
          let _0x448332 = document.getElementById(_0x2977a8 + "Container");
          if (_0x448332) {
            let _0x3d6999 = {
              behavior: "smooth"
            };
            if (Browser && Browser === "FF") {
              _0x3d6999.block = "center";
            }
            _0x448332.scrollIntoView(_0x3d6999);
          }
        }, 700);
      });
    }
  }
  this.clicKiss = function (_0x578c4d) {
    let _0x260caf = document.getElementById("password").value;
    let _0x2b02c7 = document.getElementById("message").value;
    let _0x8875fe = {
      Page: "selector",
      Command: "TestKiss",
      Name: _0x578c4d.target.name,
      Message: _0x2b02c7
    };
    if (_0x260caf) {
      _0x8875fe.Command = "SendKiss";
      _0x8875fe.Password = _0x260caf;
      if (_0x578c4d.target.Type) {
        _0x8875fe.Command = "Action";
        _0x8875fe.n = _0x578c4d.target.name;
        _0x8875fe.name = _0x578c4d.target.Type;
        switch (selector.MarryType) {
          case "Divorce":
            _0x8875fe.UserNo = 1;
            break;
          case "Marry":
            _0x8875fe.UserNo = selector.id;
        }
      }
      document.getElementById("password").value = "";
      document.getElementById("message").value = "";
      _0x34bca0();
    }
    ToC(_0x8875fe);
  };
  this.doKisses = function (_0x3e885b) {
    this.MarryType = _0x3e885b;
    if (_0x567bf6) {
      _0x567bf6.classList.add("d-none");
    }
    if (_0x2ec9a3("Kiss")) {
      return;
    }
    selector.clear({
      Tabs: 1
    });
    addClass("active", "KissBut");
    let _0xbe5c83 = ["box.224", "Send a kiss"];
    switch (_0x3e885b) {
      case "Divorce":
        _0xbe5c83 = ["box.222", "Get Divorced"];
        break;
      case "Marry":
        _0xbe5c83 = ["box.221", "Get Married"];
    }
    _0x50c38e(_0x3e885b ? [_0xbe5c83, " - " + selector.regname + " (" + selector.id + ")"] : [_0xbe5c83]);
    setLoader(!0);
    _0xbe5c83 = ["w_Powers", "w_GroupPowers", "MainObj", "end"];
    if (_0x3e885b) {
      _0xbe5c83.unshift("Marry");
    }
    GetXconsts("selector", _0xbe5c83);
  };
  this.doKisses2 = function () {
    let _0x494785 = document.getElementById("stiff");
    function _0x593d98(_0x254f2c, _0x363053, _0x576d64) {
      let _0x4a639e = makeElement(_0x494785, "img", "kisscell");
      _0x4a639e.border = 0;
      _0x4a639e.width = 83;
      _0x4a639e.height = 60;
      _0x4a639e.src = "/f_ks-t" + _0x254f2c + "_166_120_2_.png";
      new Image().src = _0x4a639e.src;
      _0x4a639e.Cost = _0x363053;
      _0x4a639e.Type = _0x576d64;
      _0x4a639e.name = _0x254f2c;
      _0x4a639e.draggable = !1;
      addToolTip(_0x4a639e, _0x254f2c + ", " + _0x363053 + " xats", {
        select: !0,
        position: "low",
        shortTime: !0
      });
      _0x4a639e.addEventListener("click", selector.clicKiss);
    }
    function _0x314161(_0x5c1a17) {
      (_0x5c1a17 = _0x5c1a17.split(",")).shift();
      let _0x45ac91 = _0x5c1a17.shift();
      for (let _0x846858 in _0x5c1a17) {
        let _0xecc93b = _0x5c1a17[_0x846858];
        if (!_0xecc93b) {
          continue;
        }
        let _0x2a5675 = _0x3b68cd[_0xecc93b];
        if (!_0x2a5675 || !!_0x414369(_0x2a5675)) {
          _0x593d98(_0xecc93b, _0x45ac91);
        }
      }
      setLoader(!1);
    }
    _0x2043c7("d-none", "messageBlock");
    _0x2043c7("d-none", "stiff");
    if (this.MarryType) {
      let _0xe77361;
      _0xe77361 = this.MarryType == "Marry" ? ["Marry", "BFF"] : ["Divorce"];
      for (let _0x6f7809 in _0xe77361) {
        let _0x590d6f = makeElement(_0x494785, "div", "marBff");
        if (_0xe77361[_0x6f7809] == "Marry") {
          addText(_0x590d6f, ["mob2.marry", "Marry"]);
        } else if (_0xe77361[_0x6f7809] == "BFF") {
          addText(_0x590d6f, ["box.160", "BFF"]);
        } else if (_0xe77361[_0x6f7809] == "Divorce") {
          addText(_0x590d6f, ["box.150", "Divorce"]);
        }
        _0x590d6f = this.Marry[_0xe77361[_0x6f7809]].split(",");
        for (let _0x1c96b9 in _0x590d6f) {
          _0x593d98(_0x590d6f[_0x1c96b9], _0xe77361[_0x6f7809] != "Divorce" ? 200 : 0, _0xe77361[_0x6f7809]);
        }
      }
      setLoader(!1);
    } else {
      loadJSON("/web_gear/chat/kiss.php", function (_0x27d33b) {
        for (let _0xd59bd1 in _0x27d33b) {
          _0x314161(_0x27d33b[_0xd59bd1][1]);
          _0x314161(_0x27d33b[_0xd59bd1][2]);
        }
      });
    }
    if (_Activity.instance.IsClassic) {
      _0x31dd75();
    }
  };
  this.startSmilies = function () {
    if (_0x567bf6) {
      _0x567bf6.classList.add("d-none");
    }
    if (!_0x2ec9a3("Smilies")) {
      selector.clear({
        Tabs: 1,
        searchBlock: 1
      });
      addClass("active", "SmBut");
      addClass("d-none", "s__mem");
      GetXconsts("selector", ["SuperPowers", "Types", "MainObj", "w_Powers", "topsh", "syel", "soth", "pssa", "end"], selector);
      _0x50c38e(["box.296", "Select a smiley"]);
      hideTooltip();
      document.querySelector(".dropdown-content").style.top = "100px";
    }
  };
  this.doSmilies = function (_0x15960e) {
    selector.hideWallet();
    let _0x15e0c2 = this.MainObj && this.MainObj.AllPowers ? this.MainObj.AllPowers[0] : {};
    this.Powers = function (_0x4f8767) {
      let _0x1842cc = [];
      for (var _0x177fe3 in _0x4f8767) {
        var _0x2cc5f0 = _0x177fe3 * 32;
        for (var _0x237466 = 0; _0x237466 < 32; _0x237466++) {
          if (_0x4f8767[_0x177fe3] & 1 << _0x237466) {
            _0x1842cc[_0x2cc5f0 + _0x237466] = 1;
          }
        }
      }
      return _0x1842cc;
    }(_0x15e0c2);
    _0x15960e = this.initPowers();
    let _0x4efa58 = _0x5555eb();
    _0x15960e ||= "";
    let _0x1154c9 = _0x15960e;
    _0x1154c9 = _0x1154c9.replace(/\./g, ":");
    let _0x2b727b = _0x420d64(_0x1154c9, _0x4efa58);
    if (!_0x2b727b.sort) {
      _0x808f09(0, 0, _0x2b727b);
    }
    for (let _0x1acc14 in _0x4efa58) {
      let _0xbf6798;
      if (_0x2b727b[_0xbf6798 = _0x4efa58[_0x1acc14][0]] && _0x2b727b[_0xbf6798] == _0x4efa58[_0x1acc14][1] || _0x2b727b[_0xbf6798 = _0x4efa58[_0x1acc14][1]]) {
        _0x808f09(_0xbf6798, _0x2b727b[_0xbf6798], _0x2b727b);
      }
    }
    _0x808f09("s", _0x2b727b.s, _0x2b727b);
    TranslateAll();
  };
  this.initPowers = function () {
    if (this.MainObj && this.MainObj.PowersMask) {
      this.Mask = this.MainObj.PowersMask[0];
    } else {
      this.Mask = null;
    }
    let _0x5754dd = document.getElementById("search");
    if (!_0x5754dd.value.includes(":mem")) {
      _0x5754dd.value = "";
    }
    let _0x17a995 = _0x5555eb();
    _0x5754dd.value = _0x20519a(_0x420d64(_0x5754dd.value, _0x17a995), _0x17a995);
    _0x5754dd.oninput = _0x3543ed;
    _0x5754dd.onfocus = _0x54c0d7;
    _0x2043c7("d-none", "searchBlock");
    if (this.Mask) {
      _0x2043c7("d-none", "s__miss");
      _0x2043c7("d-none", "s__off");
    } else {
      addClass("d-none", "s__miss");
      addClass("d-none", "s__off");
      _0x5754dd.value = _0x5754dd.value.replace(":miss", "");
      _0x5754dd.value = _0x5754dd.value.replace(":off", "");
    }
    this.order = {
      epic: 1,
      function: 1,
      collection: 1,
      smiley: 1,
      other: 1
    };
    if (_0x44d9f5 == "Smilies") {
      this.order = {
        standard: 1,
        smiley: 1,
        collection: 1,
        other: 1,
        epic: 1,
        function: 1
      };
      this.Types.standard = "0,1,standard,10001,10002";
      this.Powers[10001] = 1;
      this.Powers[10002] = 1;
      this.pssa[10002] = "yellows";
      this.pssa[10003] = "others";
    }
    this.categories = {};
    for (let _0x3d43dc in this.Types) {
      if (_0x3d43dc == "standard" && _0x44d9f5 !== "Smilies") {
        continue;
      }
      let _0x364125 = this.Types[_0x3d43dc].split(",");
      {
        let _0x8f96c3 = _0x364125[2];
        if (_0x8f96c3 == "yellow") {
          _0x8f96c3 = "Yell0w";
        }
        this.categories[_0x8f96c3] ||= {};
        this.categories[_0x8f96c3][_0x3d43dc] = _0x364125;
        this.order[_0x8f96c3] ||= 1;
      }
    }
    this.categories.epic.epic[0] = 0;
    this.Powers[127] = 0;
    let _0x4f0172 = this.categories.collection;
    if (_0x4f0172) {
      let _0x1def85 = _0x4f0172.supers;
      delete _0x4f0172.supers;
      _0x4f0172.supers = _0x1def85;
    }
    document.getElementById("morebut").onclick = _0x462d50;
    window.onclick = _0x942bfe => {
      if (_0x942bfe.target.id != "morebut") {
        let _0x5e6034 = document.getElementById("searchopts");
        if (_0x5e6034.style.display == "block") {
          _0x5e6034.style.display = "none";
        }
      }
    };
    _0x54c0d7();
    let _0x1f3971 = document.querySelectorAll(".searchopt");
    for (let _0x51807b = 0; _0x51807b < _0x1f3971.length; ++_0x51807b) {
      _0x1f3971[_0x51807b].onclick = _0x458ed5;
    }
    this.Go = !1;
    return _0x5754dd.value;
  };
  this.startPowers = function () {
    if (!_0x2ec9a3("Powers")) {
      _0x2043c7("d-none", "s__mem");
      GetXconsts("selector", ["SuperPowers", "Types", "pssa", "end"], selector);
      document.querySelector(".dropdown-content").style.top = "calc(2.25rem + 2px)";
      if (parent.actions.Name) {
        _0x50c38e(parent.actions.Name);
      }
    }
  };
  let _0x285c8b = !1;
  let _0x5f3544 = "";
  function _0x7250f0(_0x24cc30, _0x13489e) {
    let _0x166389 = document.getElementById(_0x24cc30);
    if (_0x166389) {
      _0x166389.innerHTML += _0x13489e;
    }
  }
  function _0x808f09(_0x19b301, _0x3dcc87, _0x2cccc5, _0x1eedf0) {
    let _0x1c2631 = "";
    let _0x96f8c2 = selector.pssa.length;
    let _0x491a07 = [];
    let _0x1095a8 = _0x19b301 + ":" + _0x3dcc87;
    let _0x516482 = 0;
    let _0x394eb9 = _0x44d9f5 == "Powers";
    let _0x5f39f4 = selector.pssa[96];
    {
      let _0x1056a1;
      let _0x11abd4;
      let _0x555a82;
      let _0x529f4b = 0;
      let _0x1718ad = 1;
      switch (_0x1095a8) {
        case "sort:91":
          _0x1718ad = -1;
          _0x529f4b = selector.Powers.length - 1;
        case "sort:19":
          _0x555a82 = _0x529f4b;
          if (_0x1095a8 == "sort:19" && selector.Powers[95]) {
            _0x1c2631 += _0x43c666(95, _0x5f39f4, 1, _0x394eb9);
            if (_0x491a07.indexOf(_0x5f39f4) == -1) {
              _0x491a07.push(_0x5f39f4);
            }
          }
          while (_0x1056a1 = selector.Powers[_0x555a82], _0x11abd4 = selector.pssa[1 + _0x555a82], _0x1056a1 && _0x516482++, _0x11abd4 && _0x555a82 != 95 && (_0x1c2631 += _0x43c666(_0x555a82, _0x11abd4, _0x1056a1, _0x394eb9), _0x491a07.push(_0x11abd4)), _0x555a82 += _0x1718ad, !(_0x555a82 > _0x96f8c2) && !(_0x555a82 < 0));
          if (_0x1095a8 == "sort:91" && selector.Powers[95]) {
            _0x1c2631 += _0x43c666(95, _0x5f39f4, 1, _0x394eb9);
            if (_0x491a07.indexOf(_0x5f39f4) == -1) {
              _0x491a07.push(_0x5f39f4);
            }
          }
          break;
        case "sort:za":
          _0x1718ad = 0;
        case "sort:az":
          let _0x3a916a = [];
          for (_0x555a82 = _0x529f4b; _0x1056a1 = selector.Powers[_0x555a82], _0x11abd4 = selector.pssa[1 + _0x555a82], _0x1056a1 && _0x516482++, _0x11abd4 && (_0x3a916a.push([_0x11abd4, _0x43c666(_0x555a82, _0x11abd4, _0x1056a1, _0x394eb9)]), _0x491a07.push(_0x11abd4)), _0x555a82++, !(_0x555a82 > _0x96f8c2););
          _0x3a916a.sort(_0x1718ad ? _0x1f44ff : _0x4a2de3);
          for (let _0x5f4f43 in _0x3a916a) {
            _0x1c2631 += _0x3a916a[_0x5f4f43][1];
          }
          break;
        case ":all":
        case "on:true":
        case "off:true":
        case "miss:true":
          return;
        default:
          if (_0x19b301 == "s") {
            _0x3dcc87 ||= "";
            let _0x509d38;
            let _0x398cc8 = _0x3dcc87;
            _0x398cc8.charAt(0);
            let _0x533b52 = _0x398cc8.length <= 1;
            _0x398cc8 = _0x398cc8.toLowerCase();
            let _0x203875 = 0;
            Object.values(document.querySelectorAll("[data-sm]")).forEach(_0x2a11b7 => {
              let _0xd9f701 = _0x2a11b7.dataset.sm;
              _0x509d38 = !0;
              let _0x284f34 = _0x2a11b7.dataset.pn;
              while ((!_0x3dcc87 || (_0x509d38 = _0x533b52 ? _0xd9f701.startsWith(_0x398cc8) : _0xd9f701.indexOf(_0x398cc8) >= 0, _0x509d38)) && (!_0x2cccc5.off || (_0x509d38 = selector.Mask[_0x284f34 >> 5] & 1 << _0x284f34 % 32, _0x509d38))) {
                let _0x3ee022 = !!selector.Powers[_0x284f34];
                if (_0x2cccc5.miss) {
                  _0x509d38 = !_0x3ee022;
                  if (_0x284f34 == _0xd9f701) {
                    _0x509d38 = false;
                  }
                  break;
                }
                if (_0x2cccc5.all) {
                  break;
                }
                _0x509d38 = _0x3ee022;
                break;
              }
              if (!_0x509d38) {
                _0x203875++;
              }
              _0x2a11b7.style.display = _0x509d38 ? null : "none";
              if (!_0x509d38 && _0x2a11b7.parentNode && _0x2a11b7.parentNode.classList.contains("mainPower")) {
                _0x2a11b7.parentNode.style.display = "none";
              }
            });
            _0x5ea8ba(_0x203875);
            _0x237b1b();
            return;
          }
      }
    }
    if (!_0x1eedf0) {
      if (_0x1c2631) {
        document.getElementById("flexy").innerHTML = "<div class=\"selectorContainer\">" + _0x1c2631 + "</div>";
      } else {
        let _0x5f5a7a = !!selector.Mask;
        let _0x59c06b = document.getElementById("flexy");
        _0x59c06b.innerHTML = "";
        let _0x1c5620 = _0x394eb9 ? "" : "d-none";
        for (let _0x170970 in selector.order) {
          let _0x11597c = 0;
          let _0x4a77d4 = 0;
          _0x59c06b.innerHTML += "<div id=\"" + _0x170970 + "Container\" class=\"selectorContainer sectionText " + _0x1c5620 + "\" data-sub=\"" + _0x170970 + "\">" + _0x170970.replace("0", "o") + "</div>\n            <div id=\"" + _0x170970 + "Category\" class=\"selectorContainer\"></div>";
          for (let _0x1a5e81 in selector.categories[_0x170970]) {
            let _0x431331 = 0;
            let _0x1cf746 = 0;
            document.getElementById(_0x170970 + "Category").innerHTML += "<div id=\"" + _0x1a5e81 + "ScContainer\" class=\"selectorContainer subSectionText\" data-sub=\"" + _0x1a5e81 + "\" data-localize=\"mob2.pc" + _0x1a5e81 + "\">" + _0x1a5e81 + "</div>\n              <div id=\"" + _0x1a5e81 + "ScCategory\" class=\"selectorContainer\"></div>";
            _0x1c2631 = "";
            for (let _0x54cd63 = 3;; _0x54cd63++) {
              let _0x1412da = parseInt(selector.categories[_0x170970][_0x1a5e81][_0x54cd63]);
              if (!_0x1412da & _0x1412da !== 0) {
                break;
              }
              let _0x1ec071 = selector.Powers[_0x1412da];
              _0x4a77d4++;
              _0x1cf746++;
              if (_0x1ec071) {
                _0x11597c++;
                _0x431331++;
                _0x516482++;
              }
              let _0x3daedf = selector.pssa[1 + _0x1412da];
              _0x1c2631 += _0x43c666(_0x1412da, _0x3daedf, _0x1ec071, _0x394eb9);
              _0x491a07.push(_0x3daedf);
              let _0x720dc0 = _0x44d9f5 == "Smilies" ? 140 : 229;
              let _0x4ca750 = selector.categories[_0x170970][_0x1a5e81].length - 3;
              let _0x464602 = Math.round(document.body.clientWidth / _0x720dc0);
              if (_0x431331 == _0x4ca750 && _0x4ca750 % _0x464602 > 0) {
                while (_0x4ca750 % _0x464602 > 0) {
                  _0x1c2631 += "<div class='selectorPow' style='width: " + (_0x44d9f5 == "Smilies" ? 130 : _Activity.instance.IsClassic ? 200 : 160) + "px; margin: 0 auto;'></div>";
                  _0x4ca750++;
                }
              }
            }
            _0x7250f0(_0x1a5e81 + "ScCategory", _0x1c2631);
            if (_0x5f5a7a) {
              _0x7250f0(_0x1a5e81 + "ScContainer", " [" + _0x431331 + "/" + _0x1cf746 + "]");
            }
          }
          if (_0x5f5a7a) {
            _0x7250f0(_0x170970 + "Container", " [" + _0x11597c + "/" + _0x4a77d4 + "]");
          }
        }
      }
      if (!_0x516482) {
        addClass("d-none", "flexy");
        _0x2043c7("d-none", "nopowers");
        addClass("d-none", "searchBlock");
        addClass("d-none", "nopowersfound");
        addClass("d-none", "nopowersmissing");
        return;
      }
      _0x237b1b();
      _0x5ea8ba();
      _0x2043c7("d-none", "flexy");
      addClass("d-none", "nopowers");
      (function () {
        let _0xa9ebf1 = xatdomain + "/images/smw/all/spritesheet.";
        function _0x354fbb(_0x5ae45d) {
          let _0x6834fc = document.createElement("img");
          _0x6834fc.src = _0xa9ebf1 + "png?cb=" + _0x5ae45d.cachebust;
          _0x6834fc.Obj = _0x5ae45d;
          _0x6834fc.onload = function (_0x28c2d9) {
            let _0x400a9b = _0x28c2d9.target.Obj;
            let _0x25463a = document.querySelectorAll(".smwImage");
            for (let _0x4c56ff = 0; _0x4c56ff < _0x25463a.length; ++_0x4c56ff) {
              let _0x12a54f = _0x25463a[_0x4c56ff].dataset.smw;
              if (_0x400a9b[_0x12a54f]) {
                _0x25463a[_0x4c56ff].style.background = "url(" + _0x6834fc.src + ") -" + _0x400a9b[_0x12a54f][0] + "px -" + _0x400a9b[_0x12a54f][1] + "px";
              } else {
                _0x12a54f = "url('/images/smw/" + _0x12a54f + ".png')";
                _0x25463a[_0x4c56ff].style.background = _0x12a54f;
              }
            }
          };
        }
        function _0x15ec68(_0x104d6c) {}
        loadJSON(_0xa9ebf1 + "php", _0x354fbb, _0x15ec68);
      })();
      Object.values(_0x491a07).forEach(_0x4a6b08 => {
        let _0x13c5e2 = document.getElementById(_0x4a6b08 + "Image");
        if (_0x13c5e2) {
          _0x13c5e2.addEventListener("click", _0x452520);
        }
        if (_0x394eb9) {
          _0x13c5e2 = document.getElementById(_0x4a6b08 + "Switch");
          if (_0x13c5e2) {
            _0x13c5e2.addEventListener("click", selector.clickSwitch);
          }
        } else {
          _0x13c5e2 = document.getElementById(_0x4a6b08 + "Text");
          if (_0x13c5e2) {
            _0x13c5e2.addEventListener("click", _0x12f064);
          }
        }
      });
      document.querySelectorAll(".selectorPowText").forEach(_0x2b2f46 => {
        if (_Activity?.instance?.IsClassic && _0x2b2f46 && _0x2b2f46.dataset && _0x2b2f46.dataset.smw) {
          addToolTip(_0x2b2f46, _0x2b2f46.dataset.smw, {
            select: true,
            position: "low"
          });
        }
      });
    }
  }
  function _0x5ea8ba(_0x453933) {
    if (!_0x453933) {
      return;
    }
    addClass("d-none", "nopowersmissing");
    addClass("d-none", "nopowersfound");
    let _0x24cd1b = document.querySelector("#search");
    let _0x32f819 = _0x24cd1b && _0x24cd1b.value.trim() == ":miss";
    let _0x2470ae = document.querySelectorAll("[data-sm]");
    let _0x3d7036 = document.querySelector("#nopowers");
    if (!_0x3d7036 || !!_0x3d7036.classList.contains("d-none")) {
      if (_0x2470ae && _0x2470ae.length == _0x453933) {
        _0x2043c7("d-none", _0x32f819 ? "nopowersmissing" : "nopowersfound");
      } else {
        addClass("d-none", _0x32f819 ? "nopowersmissing" : "nopowersfound");
      }
    }
  }
  function _0x462d50(_0x19ee6b) {
    let _0x3198f0 = document.getElementById("searchopts");
    _0x3198f0.style.display = _0x3198f0.style.display == "none" ? "block" : "none";
  }
  function _0x54c0d7(_0x45aa4f) {
    document.getElementById("searchopts").style.display = "none";
  }
  function _0x458ed5(_0x45ab54) {
    if (_0x45ab54) {
      _0x45ab54.stopPropagation();
    }
    let _0x20a845 = document.getElementById("search").value;
    _0x20a845 = _0x20a845.replace(/\./g, ":");
    let _0x3c719d = _0x5555eb();
    let _0x30a0b2 = _0x420d64(_0x20a845, _0x3c719d);
    let _0x56aa4e = _0x45ab54.currentTarget.id;
    if (_0x56aa4e == "s_clear") {
      _0x30a0b2 = {};
    } else {
      _0x56aa4e = _0x56aa4e.split("_");
      if (_0x56aa4e[1]) {
        _0x30a0b2[_0x56aa4e[1]] = _0x56aa4e[2];
      } else {
        _0x30a0b2[_0x56aa4e[2]] = !_0x30a0b2[_0x56aa4e[2]];
      }
    }
    _0x20a845 = _0x20519a(_0x30a0b2, _0x3c719d);
    document.getElementById("search").value = _0x20a845;
    _0x54c0d7();
    selector.doPowers(_0x20a845);
  }
  function _0x5555eb() {
    if (!selector.keys) {
      let _0xbfc866 = [];
      let _0x14a869 = document.querySelectorAll(".searchopt");
      for (let _0x1f90ae = 0; _0x1f90ae < _0x14a869.length; ++_0x1f90ae) {
        let _0x28d732 = _0x14a869[_0x1f90ae].id;
        _0x28d732 = _0x28d732.split("_");
        if (_0x28d732[2]) {
          _0xbfc866.push([_0x28d732[1], _0x28d732[2]]);
        }
      }
      selector.keys = _0xbfc866;
    }
    return selector.keys;
  }
  function _0x420d64(_0x429467, _0x44c6dd) {
    let _0x331e5b = {};
    _0x429467 = _0x429467.split(" ");
    for (let _0x184baa in _0x44c6dd) {
      for (let _0x127c43 in _0x429467) {
        if (_0x429467[_0x127c43].includes(":")) {
          let _0x222872 = _0x429467[_0x127c43].toLowerCase().split(":");
          if (_0x44c6dd[_0x184baa][0].startsWith(_0x222872[0]) && _0x44c6dd[_0x184baa][1].startsWith(_0x222872[1])) {
            if (_0x44c6dd[_0x184baa][0]) {
              _0x331e5b[_0x44c6dd[_0x184baa][0]] = _0x44c6dd[_0x184baa][1];
            } else {
              _0x331e5b[_0x44c6dd[_0x184baa][1]] = true;
            }
            break;
          }
        } else {
          _0x331e5b.s = _0x429467[_0x127c43];
        }
      }
    }
    return _0x331e5b;
  }
  function _0x20519a(_0x46a3fe, _0x2b59f3) {
    let _0x255df2 = "";
    for (let _0x45ef09 in _0x2b59f3) {
      let _0xfb0272 = _0x2b59f3[_0x45ef09][0];
      _0xfb0272 ||= _0x2b59f3[_0x45ef09][1];
      if (typeof _0x46a3fe[_0xfb0272] == "string") {
        if (_0x46a3fe[_0xfb0272] == _0x2b59f3[_0x45ef09][1]) {
          _0x255df2 += _0xfb0272 + ":" + _0x46a3fe[_0xfb0272] + " ";
        }
      } else if (_0x46a3fe[_0xfb0272]) {
        _0x255df2 += ":" + _0xfb0272 + " ";
      }
    }
    if (_0x46a3fe.s) {
      _0x255df2 += _0x46a3fe.s;
    }
    return _0x255df2;
  }
  function _0x43c666(_0x18181c, _0x535a24, _0x208559, _0x406f03) {
    if (_0x535a24 === undefined) {
      return "";
    }
    let _0x2d40bd = _0x535a24;
    let _0x2f366c = !selector.Mask || !(selector.Mask[_0x18181c >> 5] & 1 << _0x18181c % 32);
    let _0x5ce7cf = _Activity.instance.IsClassic ? 200 : 160;
    if (!_0x406f03) {
      if (!_0x2f366c) {
        return "";
      }
      _0x208559 = 1;
      _0x5ce7cf = 130;
    }
    if (_0x2d40bd.length > 7 && _0x208559 > 1) {
      _0x2d40bd = _0x2d40bd.substr(0, 7) + "...";
    }
    if (_0x208559 > 1) {
      _0x2d40bd += " [" + _0x208559 + "]";
    }
    let _0xa39269 = "<div id=\"" + _0x535a24 + "Container\" class=\"selectorPow " + (_0x208559 ? "" : "grayout") + "\" data-sm=\"" + _0x535a24 + "\" data-pn=\"" + _0x18181c + "\" style=\"width: " + _0x5ce7cf + "px;\">\n<div id=\"" + _0x535a24 + "Image\" class=\"selectorPowImage smwImage\" data-smw=\"" + _0x535a24 + "\" style=\"width: 30px; height: 30px;\"></div>\n<div id=\"" + _0x535a24 + "Text\" class=\"selectorPowText " + (_0x208559 ? "" : "grayout") + "\" data-smw=\"" + _0x535a24 + "\" " + (["yellows", "others"].indexOf(_0x535a24) >= 0 ? "data-localize=\"mob2.pc" + _0x535a24 + "\"" : "") + ">" + _0x2d40bd + "</div>";
    if (selector.Mask && _0x208559 && _0x406f03) {
      _0xa39269 += "<div id=\"" + _0x535a24 + "Switch\" class=\"svgBack " + (_0x2f366c ? "poweron" : "poweroff") + "\" data-pn=\"" + _0x18181c + "\"></div>";
    }
    _0xa39269 += "</div>";
    return _0xa39269;
  }
  this.doPowers = function (_0x194891) {
    if (_0x567bf6) {
      _0x567bf6.classList.add("d-none");
    }
    if (this.Go) {
      _0x285c8b = false;
      _0x194891 = this.initPowers();
    }
    let _0x128a60 = _0x5555eb();
    _0x194891 ||= "";
    let _0x37efbd = _0x194891;
    _0x37efbd = _0x37efbd.replace(/\./g, ":");
    let _0x2785df = _0x420d64(_0x37efbd, _0x128a60);
    if (_0x44d9f5 == "Smilies" && _0x2785df.s.length < 1) {
      _0x285c8b = false;
    }
    if (_0x2785df.s.length > 2 && _0x44d9f5 == "Smilies") {
      (function (_0x3935e2) {
        let _0x5db5c9;
        let _0x40f822 = [];
        selector.clear({
          Tabs: 1,
          stiff: 1,
          searchBlock: 1
        });
        for (let _0xcc47a2 in selector.topsh) {
          if (_0xcc47a2.search(_0x3935e2) < 0) {
            continue;
          }
          let _0x3b4da3 = selector.topsh[_0xcc47a2];
          if (!(_0x3b4da3 < kFreeId)) {
            if (_0x414369(_0x3b4da3)) {
              _0x40f822.push(_0xcc47a2);
            }
          }
        }
        _0x5db5c9 = selector.syel + "," + selector.soth;
        _0x5db5c9 = _0x5db5c9.split(",");
        for (let _0x4143a5 in _0x5db5c9) {
          if (!(_0x5db5c9[_0x4143a5].search(_0x3935e2) < 0)) {
            _0x40f822.push(_0x5db5c9[_0x4143a5]);
          }
        }
        for (let _0x1e4332 in selector.pssa) {
          if (selector.pssa[_0x1e4332].toString().search(_0x3935e2) < 0) {
            continue;
          }
          if (_0x414369(xInt(_0x1e4332) - 1)) {
            _0x40f822.push(selector.pssa[_0x1e4332]);
          }
        }
        clearDiv("flexy");
        let _0x2ee1b0 = clearDiv("stiff");
        for (let _0x15a021 in _0x40f822) {
          _0x2588d9(_0x2ee1b0, _0x40f822[_0x15a021], _0xec985a);
        }
      })(_0x2785df.s);
    } else {
      if (_0x5f3544 !== "" && !_0x2785df.sort) {
        _0x285c8b = false;
        _0x5f3544 = "";
      }
      if (!_0x2785df.sort) {
        _0x808f09(0, 0, _0x2785df, _0x285c8b);
        if (navigator.userAgent.indexOf("Firefox") > 0) {
          document.querySelector(".powersScroll").style.height = "59%";
        }
      }
      for (let _0x496c20 in _0x128a60) {
        let _0x482551;
        if (_0x2785df[_0x482551 = _0x128a60[_0x496c20][0]] && _0x2785df[_0x482551] == _0x128a60[_0x496c20][1] || _0x2785df[_0x482551 = _0x128a60[_0x496c20][1]]) {
          _0x808f09(_0x482551, _0x2785df[_0x482551], _0x2785df);
        }
      }
      _0x808f09("s", _0x2785df.s, _0x2785df);
      _0x285c8b ||= true;
      _0x5f3544 = _0x2785df.sort || "";
    }
  };
  let _0x289d49 = !1;
  function _0x3543ed(_0x332234) {
    _0x289d49 = !0;
    let _0x76e329 = _0x332234.target.value.toLowerCase();
    selector.doPowers(_0x76e329);
  }
  function _0x237b1b() {
    let _0x44f063;
    let _0x4d85cc;
    let _0x201a4c;
    for (let _0x4f979d in selector.categories) {
      _0x4d85cc = 0;
      for (let _0x5a0f22 in selector.categories[_0x4f979d]) {
        _0x44f063 = 0;
        _0x201a4c = document.getElementById(_0x5a0f22 + "ScCategory");
        if (_0x201a4c) {
          _0x201a4c.childNodes.forEach(function (_0x336176) {
            if (_0x336176.style.display !== "none" && _0x336176.dataset.pn) {
              _0x44f063++;
            }
          });
          _0x201a4c = document.getElementById(_0x5a0f22 + "ScContainer");
          if (_0x4f979d == "standard") {
            _0x44f063 = 1;
          }
          if (_0x201a4c) {
            _0x201a4c.style.display = _0x44f063 > 0 ? null : "none";
          }
          _0x4d85cc += _0x44f063;
        }
      }
      _0x201a4c = document.getElementById(_0x4f979d + "Container");
      if (_0x201a4c) {
        _0x201a4c.style.display = _0x4d85cc > 0 ? null : "none";
      }
    }
  }
  function _0x1f44ff(_0x5b24f4, _0x44d023) {
    if (_0x5b24f4[0] < _0x44d023[0]) {
      return -1;
    } else if (_0x5b24f4[0] > _0x44d023[0]) {
      return 1;
    } else {
      return 0;
    }
  }
  function _0x4a2de3(_0x5792b6, _0x7a31ec) {
    if (_0x5792b6[0] > _0x7a31ec[0]) {
      return -1;
    } else if (_0x5792b6[0] < _0x7a31ec[0]) {
      return 1;
    } else {
      return 0;
    }
  }
  function _0x452520(_0x558e1c) {
    if (_0x44d9f5 != "Smilies") {
      HitWiki(_0x558e1c.target.dataset.smw);
    } else {
      _0x12f064(_0x558e1c);
    }
  }
  function _0x2ec9a3(_0x49d79b) {
    let _0x5b8bee = new Date().getTime();
    if (_0x49d79b != _0x44d9f5) {
      _0x2f877b = -1000000;
    }
    _0x44d9f5 = _0x49d79b;
    return _0x5b8bee - _0x2f877b < 500 || (_0x2f877b = _0x5b8bee, !1);
  }
  function _0x414369(_0x48f4c6) {
    let _0x22dd0b = 0;
    if (_0x48f4c6 < 0) {
      _0x22dd0b = 1;
      _0x48f4c6 = -_0x48f4c6;
    }
    let _0x5bc595 = _0x48f4c6 >> 5;
    if (_0x48f4c6 < 0) {
      _0x5bc595 = -1;
    }
    let _0x2b1b1d;
    let _0x1c05dd = _0x48f4c6 % 32;
    _0x2b1b1d = _0x22dd0b ? xInt(selector.w_GroupPowers[_0x5bc595]) : xInt(selector.w_Powers[_0x5bc595]);
    return (_0x2b1b1d & 1 << _0x1c05dd) != 0;
  }
  this.clickSwitch = function (_0x10fe04) {
    if (!selector.Mask) {
      return;
    }
    let _0x4d22a6 = _0x10fe04.target.classList.contains("poweron");
    _0x10fe04.target.classList = _0x4d22a6 ? "poweroff" : "poweron";
    var _0x13a5bf = {
      Page: "selector",
      Command: "SetPower"
    };
    let _0x153270 = _0x10fe04.target.dataset.pn;
    _0x153270 = _0x153270 == 0 ? -1 : _0x153270;
    selector.Mask[_0x153270 >> 5] = selector.Mask[_0x153270 >> 5] & ~(1 << _0x153270 % 32) | (_0x4d22a6 ? 1 : 0) * (1 << _0x153270 % 32);
    _0x13a5bf.Value = _0x4d22a6 ? 1 : 0;
    _0x13a5bf.Id = _0x10fe04.target.dataset.pn;
    selector.ReLogin = !0;
    ToC(_0x13a5bf);
  };
  let _0x17bac4 = document.getElementById("SmBut");
  if (_0x17bac4) {
    _0x17bac4.addEventListener("click", this.startSmilies);
  }
  let _0x4e3a22 = document.getElementById("StickBut");
  if (_0x4e3a22) {
    _0x4e3a22.addEventListener("click", this.stickers);
  }
  let _0x358005 = document.getElementById("KissBut");
  if (_0x358005) {
    _0x358005.addEventListener("click", () => {
      selector.clear({
        Tabs: 1
      });
      this.doKisses();
    });
  }
  let _0x20a7d1 = document.getElementById("GiftsBut");
  function _0x34bca0() {
    window.parent.setFrameVis();
  }
  function _0x50c38e(_0x47404d) {
    let _0x466d59 = window.parent.document.getElementById("FrameDialogTitle");
    if (_0x466d59) {
      window.parent.clearDiv(0, _0x466d59);
      window.parent.addText(_0x466d59, _0x47404d);
    } else {
      addTitleBar(_0x47404d, "", null, true, _0x34bca0);
    }
  }
  function _0x31dd75() {
    let _0x5abf00 = document.querySelector(".walletInfos");
    let _0x208623 = document.querySelector("#wallet_days");
    let _0x1c3865 = document.querySelector("#wallet_xats");
    if (_0x5abf00 && _0x208623 && _0x1c3865) {
      let _0x301710 = selector.MainObj;
      if (!_0x301710) {
        return;
      }
      _0x301710 = _0x301710.main;
      if (_0x301710.length) {
        let _0x4edc5c = null;
        for (let _0x36c514 in _0x301710) {
          if (_0x301710[_0x36c514].name && _0x301710[_0x36c514].name.match(/\d+/g)) {
            _0x4edc5c = _0x301710[_0x36c514].name;
          }
        }
        if (_0x4edc5c) {
          _0x4edc5c = _0x4edc5c.split(", ");
          _0x1c3865.innerHTML = "";
          _0x208623.innerHTML = "";
          let _0x109fd8 = makeElement(_0x1c3865, "img");
          _0x109fd8.src = "svg/actBuyXats.svg";
          _0x109fd8.style.width = "30px";
          makeElement(_0x1c3865, "span").innerHTML = _0x4edc5c[0];
          let _0x18ce09 = makeElement(_0x208623, "img");
          _0x18ce09.src = "svg/star.svg";
          _0x18ce09.style.cssText = "width:30px;vertical-align:-8px!important";
          makeElement(_0x208623, "span").innerHTML = _0x4edc5c[1];
          _0x5abf00.classList.remove("d-none");
        }
      }
    }
  }
  if (_0x20a7d1) {
    _0x20a7d1.addEventListener("click", () => {
      this.gifts();
    });
  }
  this.clear = function (_0x5c3855) {
    _0x5c3855 ||= {};
    clearDiv("flexy");
    clearDiv("stiff");
    const _0xd480e2 = ["AreYouABot", "SignUp", "LoginRegEtc", "LoginForm", "ResetPassword", "RegisterOK", "LogoutOK", "RegisterDialog", "stiff", "flexy", "nopowers", "nopowersfound", "nopowersmissing", "messageBlock", "Tabs", "searchBlock", "stickMessageBlock", "FrontId"];
    for (let _0x39be7c in _0xd480e2) {
      let _0x206942 = _0xd480e2[_0x39be7c];
      if (_0x5c3855[_0x206942]) {
        _0x2043c7("d-none", _0x206942);
        parent.removeClass("d-none", "Overlays");
      } else {
        addClass("d-none", _0x206942);
      }
    }
    _0x2043c7("active", "SmBut");
    _0x2043c7("active", "KissBut");
    _0x2043c7("active", "StickBut");
    _0x2043c7("active", "GiftsBut");
    modalClose();
    _0x50dc55();
  };
  this.GetXconst = function (_0x37c943, _0xe38e9e) {
    let _0xb24d19;
    try {
      _0xb24d19 = JSON.parse(_0xe38e9e);
    } catch (_0x1f4421) {
      _0xb24d19 = _0xe38e9e;
    }
    this[_0x37c943] = _0xb24d19;
    if (_0x37c943 == "end") {
      switch (_0x44d9f5) {
        case "Smilies":
          selector.doSmilies();
          const _0x5e988f = config?.MyRegName?.length ? "3.3%" : "100vh";
          if (navigator.userAgent.indexOf("Firefox") > 0 && _Activity.instance.IsClassic) {
            document.querySelector(".powersScroll").style.height = _0x5e988f;
          }
          if (!_Activity.instance.IsClassic) {
            document.querySelector(".powersScroll").style.height = "72%";
          }
          break;
        case "Powers":
          selector.doPowers();
          if (navigator.userAgent.indexOf("Firefox") > 0 && _Activity.instance.IsClassic) {
            document.querySelector(".powersScroll").style.height = "3.3%";
          }
          break;
        case "Sticker":
          setLoader(!0);
          loadJSON(chatUrl + "sticker.php?a=1", _0x5c5d18);
          if (navigator.userAgent.indexOf("Firefox") > 0) {
            document.querySelector(".powersScroll").style.height = "53%";
          }
          break;
        case "Kiss":
          selector.doKisses2();
          if (navigator.userAgent.indexOf("Firefox") > 0) {
            document.querySelector(".powersScroll").style.height = "25%";
          }
          break;
        case "Gifts":
          selector.gotGifts1();
          if (navigator.userAgent.indexOf("Firefox") > 0) {
            document.querySelector(".powersScroll").style.height = "88%";
          }
          break;
        case "BuyGifts":
          loadJSON("/web_gear/chat/gift2.php?v2=1", _0x51ff75);
          if (navigator.userAgent.indexOf("Firefox") > 0) {
            document.querySelector(".powersScroll").style.height = "88%";
          }
      }
    }
  };
  this.hideWallet = function () {
    let _0x262414 = document.querySelector(".walletInfos");
    if (_0x262414) {
      _0x262414.classList.add("d-none");
    }
  };
  this.initLang = function (_0x90809a) {};
}();
_Activity.instance.Selector = selector;