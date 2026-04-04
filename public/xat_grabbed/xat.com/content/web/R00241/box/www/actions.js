"use strict";
var CurrentSec;
var actions = new function () {
  var _0x336d7c;
  var _0x596dab;
  var _0x48a474;
  var _0x5deb79;
  var _0xfe9d0b;
  var _0x2a87e7;
  var _0x304727;
  var _0x213b09;
  var _0x3a3704;
  var _0x70ff3a;
  var _0x1ae16c;
  var _0x429e87 = ["Actions", "Powers"];
  var _0x3459b4 = "Actions";
  var _0x1ef27e = 0;
  var _0x4a236b = [];
  var _0x1fd8a4 = false;
  var _0x5678ae = 1;
  var _0x29bb0d = false;
  var _0x550987 = false;
  function _0x203481() {
    const _0x67560f = _0x2b02c8(_0x48a474.user[0].pstyle);
    const _0x475286 = _0x67560f?.pStyle?.pstylegradient;
    return _0x475286;
  }
  function _0x54f17f() {
    if (ThisPage == "profile") {
      _0x29bb0d = config.NotLoggedIn;
      var _0x38ad48 = "Edit";
      if (_0x1fd8a4) {
        _0x38ad48 = "Done";
      }
      if (_0x29bb0d) {
        _0x38ad48 = "";
      }
      if (_0x3459b4 != "Profile" && _0x3459b4 != "xatme") {
        _0x38ad48 = "";
      }
      var _0x37c305 = _0x38ad48;
      if (_0x38ad48) {
        _0x37c305 = ["mob1." + _0x38ad48.toLowerCase(), _0x38ad48];
      }
      addTitleBar(["mob1.me", "Me"], _0x29bb0d ? ["mob1.login", "Login"] : ["mob1.logout", "Logout"], _0x29bb0d ? actions.doLoginDialog : _0x1522a8, _0x37c305, actions.EditClick);
      if (config.PhoneType == PhoneTypes.IPHONE) {
        (function (_0x4d4a42) {
          if (ThisPage == "actions") {
            return;
          }
          if (_0x4d4a42 === _0x5678ae) {
            return;
          }
          _0x5678ae = _0x4d4a42;
          if (_0x4d4a42 == "") {
            _0x4d4a42 = 0;
          }
          if (_0x4d4a42 == "Done") {
            return;
          }
          var _0x341eb5 = {
            name: "SetEditButton" + _0x4d4a42
          };
          ToC(_0x341eb5);
        })(_0x38ad48);
      }
    }
  }
  function _0x374464() {
    actions.Visible = false;
    parent.setFrameVis();
    modalClose();
  }
  this.main = function (_0x554b48) {
    xatMain(_0x554b48);
    _0x3a3704 = config.Flags & 1;
    setdarkmode();
    _0x1fd8a4 = false;
    _0x5678ae = null;
    _0x5deb79 = null;
    _0x3459b4 = _0x429e87[0];
    actions.Repaint();
    if (!_0x3a3704) {
      AddHammer(document.body, Hammer.DIRECTION_RIGHT, this.sendApp);
    }
    document.body.style.display = "block";
    window.addEventListener("orientationchange", function (_0xd63d87) {
      actions.Repaint();
    }, false);
    TranslateAll();
    document.getElementById("topSelector").style.display = "none";
    document.getElementById("openModal");
    if (!_0x3a3704) {
      parent.reloadPowersBank();
    }
    document.addEventListener("gesturestart", function (_0x10d9d0) {
      _0x10d9d0.preventDefault();
    });
    document.addEventListener("touchmove", function (_0x47cd4b) {
      _0x47cd4b.preventDefault();
    }, {
      passive: false
    });
  };
  this.Repaint = function () {
    if (!_0x48a474 || _0x3459b4 == "Profile" || _0x3459b4 == "Actions") {
      var _0x29fa20 = window.orientation != 90 && window.orientation != -90;
      if (_0x29fa20 !== _0x5deb79) {
        _0x5deb79 = _0x29fa20;
      }
    }
  };
  this.EditClick = function (_0x16ca89) {
    _0x1fd8a4 = _0x16ca89 === 1 || _0x16ca89 === 0 ? _0x16ca89 != 0 : !_0x1fd8a4;
    if (ThisPage == "profile") {
      if (_0x3459b4 == "Profile") {
        if (_0x1fd8a4) {
          actions.doProfileDialog();
        } else {
          modalClose();
        }
      }
    }
  };
  this.doBan = function (_0x257f63) {
    var _0x43cd13;
    var _0x51555b = ["Duration", "BootTo", "Reason", "ReasonKick"];
    for (var _0x5305d7 in _0x51555b) {
      if (_0x43cd13 = document.getElementById(_0x51555b[_0x5305d7])) {
        _0x2a87e7[_0x51555b[_0x5305d7]] = _0x43cd13.value;
      }
    }
    if (_0x2a87e7.ReasonKick) {
      _0x2a87e7.Reason = _0x2a87e7.ReasonKick;
    }
    _0x2a87e7.action = _0x2a87e7.Type;
    actions.sendApp(_0x257f63, _0x2a87e7);
  };
  this.sendApp = function (_0x4a048e, _0x3b5398, _0x5860a9) {
    var _0x3ca2ac;
    if (_0x4a048e) {
      _0x4a048e.stopPropagation();
    }
    if (_0x3b5398 !== null && typeof _0x3b5398 == "object") {
      _0x3ca2ac = _0x3b5398.icon ? _0x3b5398.action : _0x3b5398.Type;
      _0x5860a9 = _0x3b5398.Power;
    } else {
      _0x3ca2ac = _0x3b5398;
    }
    if (!isPstylePreviewEnabled()) {
      switch (_0x3ca2ac) {
        case "Login":
          if (_0x3a3704) {
            window.open("/login", "_top");
            return;
          } else {
            actions.doLoginDialog();
            return;
          }
        case "Register":
          if (_0x3a3704) {
            window.open("/login?mode=1", "_top");
            return;
          } else {
            actions.doRegisterDialog();
            return;
          }
        case "BuyXats":
          openBuyPage(true);
          return;
        case "Store":
          _0x374464();
          if (_Activity.instance.IsAndroidApp || _Activity.instance.IsIOSApp) {
            _Activity.instance.SetPage("store");
          } else {
            window.open("/powers", "_blank");
          }
          return;
        case "Settings":
          parent.classicSetDialog("settings", config.MyId);
          _0x4d60ba();
          return;
        case "Powers":
          _0x3e5887();
          actions.checkIfButtons(true);
          parent.classicSetDialog("selector", {
            Type: "Powers",
            UserNo: config.MyId,
            Powers: _0x70ff3a,
            MainObj: _0x48a474
          });
          _0x4d60ba();
          return;
        case "Gifts":
          parent.setAppIcon(20044);
          actions.checkIfButtons(true);
          parent.classicSetDialog("selector", {
            Type: "Gifts",
            MainObj: _0x48a474,
            Config: config
          });
          _0x4d60ba();
          return;
        case "ClassicCancel":
          parent.classicSetDialog("profile", config.MyId);
          return;
        case "Edit":
          actions.doProfileDialog();
          return;
      }
      switch (_0x3ca2ac) {
        case "Settings":
          parent.classicSetDialog("settings", config.MyId);
          return;
        case "location":
          ToC({
            Command: "StartGroup",
            Group: _0x5860a9
          });
          break;
        case "swiperight":
        case "GoBack":
          if (config.roomid == IDLE_ROOM) {
            return;
          }
          var _0x4d2fb9 = {
            Command: "GoBack"
          };
          if (config.PrevPage == "visitors" || config.PrevPage == "messages") {
            _0x4d2fb9 = {
              Command: "NOP",
              Next: config.PrevPage
            };
          } else if (config.PrevPage2 == "visitors" || config.PrevPage2 == "messages") {
            _0x4d2fb9 = {
              Command: "NOP",
              Next: config.PrevPage2
            };
          }
          ToC(_0x4d2fb9);
          break;
        case "Divorce":
        case "Marry":
        case "Transfer":
        case "BFF":
        case "PrivateMessage":
          let _0x5b6bb5 = document.querySelector("#transferror");
          _0x4d2fb9 = {
            name: _0x3ca2ac,
            UserNo: _0x1ef27e,
            Power: _0x5860a9,
            Page: "actions",
            Command: "Action",
            Next: "messages"
          };
          var _0x3a6d84;
          var _0x579353 = ["Message", "Password", "Xats", "Days"];
          for (var _0x5e2c0c in _0x579353) {
            if (_0x3a6d84 = document.getElementById(_0x579353[_0x5e2c0c])) {
              _0x4d2fb9[_0x579353[_0x5e2c0c]] = _0x3a6d84.value;
            }
          }
          if (_0x3ca2ac == "Transfer" && _0x3a3704) {
            let _0x4c7ae5 = actions.handleTransferForm(_0x4d2fb9);
            actions.setTransferErr(_0x5b6bb5, "");
            if (_0x4c7ae5) {
              _0x5b6bb5.style.display = "inline-block";
              return actions.setTransferErr(_0x5b6bb5, _0x4c7ae5);
            }
          }
          ToC(_0x4d2fb9);
          _0x374464();
          break;
        case "Actions":
        case "Profile":
          SetSection(_0x3ca2ac);
          actions.configurePage();
          _0x1fd8a4 = false;
          _0x54f17f();
          break;
        case "xatme":
          _0x4d2fb9 = {
            UserNo: _0x1ef27e,
            Next: "xatme",
            Command: "Xatme",
            name: "Xatme"
          };
          ToC(_0x4d2fb9);
          break;
        case "Powers":
          SetSection(_0x3ca2ac);
          _0x3e5887();
          loadJSON(xatdomain + "/web_gear/chat/powers.php", function (_0x465019) {
            (function (_0x47e55a) {
              var _0x54ba78;
              var _0x271106 = [];
              var _0x4a2524 = 0;
              var _0x2ded2d = _0x533d73();
              (_0xfe9d0b = makeElement(_0x2ded2d, "div")).id = "ScrollContainer";
              _0xfe9d0b.className = "xscrollContainer";
              _0xfe9d0b.style.top = document.getElementById("titleBar").clientHeight + document.getElementById("topSelector").clientHeight + "px";
              _0xfe9d0b.style.bottom = "0px";
              var _0x539d97 = makeElement(_0xfe9d0b, "ul");
              _0x539d97.style.cssText = "display: flex;flex-wrap: wrap;";
              var _0x2c4480 = 0;
              for (var _0x147f44 = 0; _0x147f44 < 9999 && (_0x271106[_0x147f44] = _0x47e55a[_0x147f44], _0x271106[_0x147f44] == null ? _0x4a2524++ : (_0x4a2524 = 0, _0x271106[_0x147f44].id = _0x147f44), !(_0x4a2524 > 10)); _0x147f44++);
              if (_0x1ab3bc) {
                for (var _0x147f44 in _0x1ab3bc) {
                  _0x271106[_0x147f44] = {};
                  _0x271106[_0x147f44].id = _0x147f44;
                  _0x271106[_0x147f44].s = _0x1ab3bc[_0x147f44];
                }
              }
              _0x271106.sort(function (_0x2a0cc6, _0x267b50) {
                return _0x2a0cc6.s.localeCompare(_0x267b50.s);
              });
              _0x54ba78 = _0x539d97;
              var _0x5864e4;
              var _0x292f23;
              var _0x3f2597 = _0x48a474.PowersMask;
              _0x3f2597 &&= _0x3f2597[0];
              for (var _0x147f44 in _0x271106) {
                if (_0x271106[_0x147f44] !== undefined && (!_0x70ff3a || (_0x5864e4 = _0x70ff3a[_0x271106[_0x147f44].id]))) {
                  _0x292f23 = _0x5864e4 = xInt(_0x5864e4);
                  if (_0x5864e4 < 1) {
                    _0x5864e4 = " ";
                  }
                  _0x2c4480++;
                  var _0x40d52c = makeElement(_0x54ba78, "li", "friend");
                  iidLine++;
                  _0x40d52c.setAttribute("data-line", iidLine);
                  _0x40d52c.setAttribute("data-visible", LineVisible);
                  _0x40d52c.style.cssText = "flex: 1 0 41%; margin: 10px;";
                  var _0x2725ca = makeElement(_0x40d52c, "div", "listTable");
                  var _0x339ceb = makeElement(_0x2725ca, "div", "dialogRow");
                  var _0x4d81d4 = makeElement(_0x339ceb, "div", "dialogCell dialogCellMiddle");
                  var _0x39eb1c = makeElement(_0x339ceb, "div", "dialogCell cellWide noPointer");
                  var _0x3e4782 = makeElement(_0x339ceb, "div", "dialogCell dialogCellMiddle");
                  var _0x23c725 = makeElement(_0x339ceb, "div", "dialogCell dialogCellMiddle");
                  _Activity.instance.Avatars.MakeAvatar(_0x4d81d4, xatdomain + "/images/smw/" + _0x271106[_0x147f44].s + ".png", {
                    size: 32,
                    scrollParent: _0xfe9d0b
                  });
                  addText(_0x39eb1c, _0x271106[_0x147f44].s);
                  addText(_0x3e4782, _0x5864e4);
                  if (_0x3f2597 && _0x292f23) {
                    var _0x25a7f9 = _0x271106[_0x147f44].id;
                    var _0x166c14 = makeElement(_0x23c725, "img", 0, "m" + _0x25a7f9);
                    _0x166c14.height = 24;
                    if (_0x3f2597[_0x25a7f9 >> 5] & 1 << _0x25a7f9 % 32) {
                      _0x166c14.src = "svg/off.svg";
                    } else {
                      _0x166c14.src = "svg/on.svg";
                    }
                    _0x40d52c.pid = _0x25a7f9;
                    _0x40d52c.onclick = function (_0x31b030) {
                      actions.doFav(_0x31b030, this.pid);
                    };
                  }
                }
              }
              if (_0x2c4480 == 0) {
                _0x539d97.appendChild(MakeHelpMessage(TransText("mob2.nopowers", "No powers or out of days")));
              }
            })(_0x465019);
          }, function (_0x33255b) {});
          _0x1fd8a4 = false;
          _0x54f17f();
          break;
        case "Gifts":
          SetSection(_0x3ca2ac);
          loadJSON(xatdomain + "/web_gear/chat/gifts22.php?id=" + _0x1ef27e, function (_0x36af58) {
            GiftsLoaded(_0x36af58);
          }, function (_0x2fa321) {});
          _0x1fd8a4 = false;
          _0x54f17f();
          break;
        case "Cancel":
          let _0x17aa37 = true;
          if (_0x4a236b?.length) {
            let _0x332362 = _0x4a236b[_0x4a236b.length - 2];
            if (_0x332362.length && _0x332362 == "Ban") {
              _0x17aa37 = false;
            }
          }
          if (_0x17aa37) {
            clearDiv("KickBan");
            removeClass("d-none", "avatarPosLeft");
            removeClass("d-none", "infoCell");
            removeClass("d-none", 0, _0x1ae16c);
          }
          _0x4a236b.pop();
          _0x1e2bfe(_0x4a236b.pop());
          break;
        default:
          if (_0x3ca2ac == "$doBan" || _0x3ca2ac == "$doKick") {
            _0x3ca2ac = _0x3b5398.Type;
            _0x5860a9 = _0x3b5398.Power;
            let _0x54fd88;
            let _0x415f75 = ["Duration", "BootTo", "Reason", "ReasonKick"];
            for (let _0x751447 in _0x415f75) {
              _0x54fd88 = document.getElementById(_0x415f75[_0x751447]);
              if (_0x54fd88) {
                _0x3b5398[_0x415f75[_0x751447]] = _0x54fd88.value;
              }
            }
            if (_0x3b5398.ReasonKick) {
              _0x3b5398.Reason = _0x3b5398.ReasonKick;
            }
            _0x3b5398.Reason &&= _0x3b5398.Reason.replace(/(?:\r\n|\r|\n)/g, " ");
          }
          if (_0x3ca2ac.charAt(0) == "$") {
            _0x1e2bfe(_0x3ca2ac.substr(1), _0x3b5398);
          } else {
            _0x2b2199(_0x4d2fb9 = {
              name: _0x3ca2ac,
              UserNo: _0x1ef27e,
              Power: _0x5860a9,
              Page: "actions",
              Command: "Action",
              ShiftKey: _0x4a048e && _0x4a048e.shiftKey ? 1 : 0
            }, document.getElementById("all2"));
            switch (_0x4d2fb9.name) {
              case "Powers":
              case "Gifts":
                _0x4d2fb9.LastActionHero = _0x3b5398.name;
                _0x4d2fb9.SavedId = _0x3b5398.UserNo;
                _0x4d2fb9.Next = "actions";
                _0x4d2fb9.Command = "";
                break;
              case "PrivateChat":
                _Activity.instance.clickedTickleTab = false;
                _0x28938e();
                _0x4d2fb9.Next = "messages";
                break;
              case "OK":
                actions.saveProfile();
              case "Cancel2":
                _0x374464();
                return;
              default:
                if (!_0x3a3704) {
                  _0x4d2fb9.Next = "pop";
                }
                _0x4d2fb9.Duration = _0x3b5398.Duration;
                _0x4d2fb9.Reason = _0x3b5398.Reason;
                _0x4d2fb9.BootTo = _0x3b5398.BootTo;
            }
            ToC(_0x4d2fb9);
            if (_0x4d2fb9.name == "PrivateChat" && _0x3a3704) {
              var _0x469d3e = window.parent.document.getElementById("friendsList");
              _0x469d3e &&= _0x469d3e.classList.contains("active");
              if (_0x469d3e) {
                window.parent.openList("", "visitors", 0);
              }
            }
            if (_0x4d2fb9.Next != "actions") {
              _0x374464();
            }
          }
      }
    }
  };
  this.handleTransferForm = function (_0x2fc8be) {
    if (typeof _0x2fc8be != "object") {
      return false;
    }
    let {
      Xats: _0x2ce928,
      Days: _0x450db5,
      Password: _0x473f6d
    } = _0x2fc8be;
    _0x2ce928 = parseInt(_0x2ce928);
    _0x450db5 = parseInt(_0x450db5);
    if (_0x473f6d) {
      if (_0x2ce928 == 0 && _0x450db5 == 0) {
        return ["mob2.transfernothing", "You must send at least 1 day or 10 xats"];
      } else if (_0x2ce928 != 0 && _0x2ce928 < 10) {
        return ["mob2.transf10xats", "You must send at least 10 xats"];
      } else {
        return _0x450db5 != 0 && _0x450db5 < 0 && ["mob2.transf1day", "You must send at least 1 day"];
      }
    } else {
      return ["mob2.transfPassword", "You must set a password"];
    }
  };
  this.setTransferErr = function (_0x248443, _0x1723d8) {
    if (_0x248443) {
      _0x248443.innerHTML = "";
    }
    addText(_0x248443, _0x1723d8);
    actions.checkIfButtons();
  };
  this.clearall = function () {
    modalClose();
    _0x48a474 = null;
    var _0x23f43f = clearDiv("avatarid");
    if (_0x23f43f) {
      _0x23f43f.parentNode.removeChild(_0x23f43f);
    }
    _0x23f43f = null;
    _0x533d73();
    _0x550987 = false;
    false;
  };
  var _0x3e8007 = "";
  function _0x1e2bfe(_0x5a22f8, _0x14ba7c) {
    if (isXatBirthday(true)) {
      let _0x489bfe = _0x3a3704 ? parent.document.getElementById("FrameDialogTitle") : document.querySelector(".htmlTitleBar");
      if (_0x3a3704 && !_0x304727) {
        let _0x80ae3d = makeElement(_0x489bfe, "img");
        _0x80ae3d.src = "svg/xatbd.png";
        _0x80ae3d.style.cssText = "width: 5rem;position: absolute;top: -1.5rem;left: -3rem;z-index: -1;";
        let _0x96d6b8 = makeElement(_0x489bfe, "img");
        _0x96d6b8.src = "svg/xatbd2.png";
        _0x96d6b8.style.cssText = "width: 5rem;position: absolute;top: 13.5rem;right: -4rem;z-index: -1;rotate: 55deg;";
        let _0x3b6933 = makeElement(_0x489bfe, "img");
        _0x3b6933.src = "svg/x.svg";
        _0x3b6933.style.cssText = "width: 37.7rem;position: absolute;top: -8.5rem;right: -6rem;z-index: -1;rotate: 13deg;";
      }
    }
    sendFunc = actions.sendApp;
    if (_0x3a3704 && ["Transfer", "Kick", "Ban"].indexOf(_0x5a22f8) >= 0) {
      actions.Visible = false;
    }
    if (_0x5a22f8 == "Transfer") {
      _0x5a22f8 = "NTransfer";
    }
    switch (_0x5a22f8) {
      case "PrivateMessage":
        if (_0x3a3704) {
          setPmMode(true, _0x48a474.user[0].id, _0x48a474.user[0].regname, parent.document);
          _0x374464();
          _0x28938e();
        } else {
          actions.locDoModal(_0x48a474[_0x5a22f8]);
        }
        return;
      case "Transfer":
      case "AddAsFriend":
      case "Unfriend":
        actions.locDoModal(_0x48a474[_0x5a22f8]);
        return;
      case "Divorce":
      case "Marry":
        actions.checkIfButtons(true);
        parent.classicSetDialog("selector", {
          Type: _0x5a22f8,
          MainObj: _0x48a474.user[0]
        });
        _0x4d60ba();
        return;
      case "doBan":
      case "doKick":
        _0x2a87e7 = _0x14ba7c;
        actions.locDoModal(_0x5a22f8);
        addText(document.getElementById("BanName"), _0x14ba7c.label);
        var _0x33ab60 = document.getElementById("DoIt");
        addText(_0x33ab60, _0x14ba7c.label);
        _0x33ab60.addEventListener("click", function (_0x4585a6) {
          actions.doBan(_0x4585a6);
        });
        if (_0x14ba7c.Type != "Boot") {
          setTextNode("BootToRow", "");
        }
        return;
    }
    var _0x397dfc = clearDiv(_0x213b09);
    var _0x12c049 = makeElement(_0x397dfc, "div", "table");
    if (!!_0x14ba7c && (_0x14ba7c.action == "$Ban" || _0x14ba7c.action == "$Kick" || _0x14ba7c.action == "$Transfer")) {
      addClass("d-none", "avatarPosLeft");
      addClass("d-none", "infoCell");
      addClass("d-none", 0, _0x1ae16c);
      addClass("d-none", "statusNewPar");
      if (_0x14ba7c.action != "$Transfer") {
        addClass("d-none", "walletUser");
      }
      if (_0x14ba7c.action == "$Transfer") {
        document.getElementById("KickBan").innerHTML = HiddenDivs.doTransfer;
      }
      if (["$Kick", "$Ban", "$Games"].indexOf(_0x14ba7c.action) >= 0) {
        document.getElementById("KickBan").innerHTML = _0x14ba7c.action == "$Ban" || _0x14ba7c.action == "$Games" ? HiddenDivs.doBan2 : HiddenDivs.doKick2;
      }
    }
    _0x12c049.style.width = "100%";
    if (_0x304727) {
      var _0x2739bd = document.getElementById("infoCell");
      _0x2739bd.style.width = "50%";
      _0x2739bd.style.textAlign = "center";
    }
    var _0x2682ea;
    var _0x2c1401 = 1;
    var _0x471f3a = 0;
    var _0x336664 = [];
    _0x4a236b.push(_0x5a22f8);
    if (_0x5a22f8 == "NTransfer") {
      _0x5a22f8 = "Transfer";
    }
    for (var _0x522782 in _0x48a474[_0x5a22f8]) {
      _0x2682ea = _0x48a474[_0x5a22f8][_0x522782];
      if (_0x304727 && _0x2682ea?.action === "BuyXats" && !hasMobCookiesEnabled()) {
        _0x2682ea.flags = 1;
      }
      if (_0x2682ea.Type == "select" && _0x2682ea.List) {
        actions.setBanRules(_0x2682ea.List);
      } else {
        var _0x9fdfa4 = false;
        switch (_0x2682ea.type) {
          case "title":
            if (_0x5a22f8 == "Transfer") {
              continue;
            }
            addEditBox(_0x397dfc, 0, _0x2682ea.name, "noedit", "bold");
            break;
          case "password":
            if (_0x5a22f8 == "Transfer") {
              continue;
            }
            addEditBox(_0x397dfc, _0x2682ea.id, _0x2682ea.name, 0, 0, "password");
            break;
          case "dialog":
            if (_0x5a22f8 == "Transfer") {
              continue;
            }
            addEditBox(_0x397dfc, _0x2682ea.id, _0x2682ea.name);
            break;
          case "text":
            if (_0x5a22f8 == "Transfer" && _0x2682ea.name.indexOf(",") >= 0) {
              actions.buildWallet(_0x2682ea.name);
            } else {
              _0x33ab60 = document.getElementById("xatsdays");
              addEditBox(_0x33ab60, 0, _0x2682ea.name, "noedit");
            }
            break;
          default:
            if (_0x2682ea.row > _0x2c1401) {
              _0x19f292(_0x12c049);
            }
            _0x336664.push(_0x2682ea);
            if (++_0x471f3a == 2) {
              _0x19f292(_0x12c049);
            }
            _0x9fdfa4 = true;
        }
        if (!_0x9fdfa4) {
          _0x19f292(_0x12c049);
        }
      }
    }
    if (_0x471f3a) {
      _0x19f292(_0x12c049);
    }
    if (_0x48a474.Ban && _0x48a474.Ban.length > 14) {
      _0x336664 = [{
        action: "",
        label: ""
      }];
      _0x19f292(_0x12c049).style.cssText = "visibility: hidden";
    }
    if (_0x3a3704 && parent.classicSetHeight) {
      parent.classicSetHeight(_0x397dfc.clientHeight);
      var _0x5d6e16 = document.body.scrollHeight;
      if (_0x304727 && _0x5d6e16 && _0x5d6e16 < 401) {
        document.body.style.fontSize = _0x5d6e16 / 401 * 0.85 + "rem";
      }
    }
    function _0x19f292(_0x164477) {
      if (!(_0x336664.length < 1)) {
        var _0x19b9a0 = makeElement(_0x164477, "div", "row");
        (function (_0x55b018, _0x1e8e7c) {
          _0x552cdd(_0x55b018, _0x1e8e7c[0], true, false);
          _0x552cdd(_0x55b018, _0x1e8e7c[1], false, true);
          _0x552cdd(_0x55b018, _0x1e8e7c[2]);
        })(_0x19b9a0, _0x336664);
        _0x471f3a = 0;
        _0x336664 = [];
        _0x2c1401++;
        return _0x19b9a0;
      }
    }
    const _0x27792e = findNodeInWindowOrParent("#settingsFrame");
    let _0x4fd7be = _0x203481();
    if (_0x27792e && !_0x27792e?.classList?.contains("d-none")) {
      _0x4fd7be = false;
    }
    cleanupPstyleClasses(parent.document, _0x304727);
    if (_0x4fd7be) {
      if (isXatBirthday(true)) {
        if (!hasDarkMode()) {
          (function () {
            let _0x7a9698 = _0x3a3704 ? parent.document.getElementById("FrameDialogTitle") : document.querySelector(".htmlTitleBar");
            let _0x199039 = document.getElementById("statusNew");
            let _0x105561 = document.querySelectorAll(".butcontainer");
            let _0x4f3fd5 = _0x3a3704 ? parent.document.querySelector(".dialogTitleBar") : document.querySelector(".htmlTitleBar");
            let _0x4ab865 = document.querySelectorAll(".butcontent");
            let _0xb36157 = document.getElementById("onP");
            let _0x5d7fb4 = document.querySelector(".onhref");
            let _0x146562 = _0x3a3704 ? parent.document.getElementById("removeIcon") : document.getElementById("TitleBarRight");
            let _0x102239 = _0x3a3704 ? parent.document.getElementById("reportIcon") : document.getElementById("repIcon");
            let _0x4c7da8 = _0x3a3704 ? parent.document.getElementById("callIcon") : document.getElementById("callIcon");
            let _0x3cbd0b = "linear-gradient(225deg, rgb(2 169 210) 50%, rgb(249 201 49) 100%)";
            let _0x375051 = "linear-gradient(225deg, rgb(2 169 210) 80%, rgb(249 201 49) 100%)";
            let _0x474199 = "linear-gradient(225deg, rgb(2 169 210) 20%, rgb(249 201 49) 100%)";
            _0x7a9698.style.color = "rgb(255 255 255)";
            _0x7a9698.classList.add("xatbd");
            _0x146562.style.filter = "brightness(10)";
            _0x102239.style.filter = "brightness(10)";
            _0x4c7da8.style.filter = "brightness(10)";
            if (!_0x304727) {
              _0xb36157.classList.add("psTextCol");
              _0xb36157.style.background = _0x375051;
              if (_0x5d7fb4) {
                _0x5d7fb4.style.color = _0x375051;
                _0x5d7fb4.classList.add("psTextCol");
              }
              _0x199039.classList.add("psStatus");
              _0x199039.style.background = _0x474199;
            }
            function _0x11fa41(_0x110512) {
              _0x105561.forEach(_0xd699dc => {
                _0xd699dc.style.background = _0x110512;
              });
              _0x4f3fd5.style.background = _0x110512;
            }
            function _0x50af1e() {
              _0x4ab865.forEach(_0x58a55d => {
                _0x58a55d.style.color = "#fff";
              });
            }
            _0x50af1e();
            _0x11fa41(_0x3cbd0b);
          })();
        }
      } else {
        _0x3a7ca4(_0x48a474.user[0].pstyle);
      }
    }
    setCstyle("", _0x4fd7be && _0x4fd7be !== "pgNone");
    actions.checkIfButtons();
    TranslateAll();
  }
  function _0x3de164(_0x5404b4, _0x89cafe) {
    var _0x5ba2d2;
    var _0x2a72df;
    var _0x1d4923 = makeElement(_0x5404b4, "div", "butcontainer");
    _0x1d4923.style.cssText = "position: relative; background-color: #" + (hasDarkMode() ? "313131" : toHex6(config.ButCol));
    if (!parent.Classic) {
      _0x1d4923.style.backgroundImage = "none";
    }
    var _0x36c6ba = makeElement(_0x1d4923, "div", "butlayout butcontent");
    _0x36c6ba.style.cssText = "padding: 0.3rem; font-size:0.83rem; color:#" + (hasDarkMode() ? "969696" : toHex6(config.ButColW));
    if (!_0x3a3704) {
      _0x36c6ba.style.color = "#ffffff";
      _0x1d4923.style.backgroundColor = "#15156C";
    }
    (_0x2a72df = makeElement(_0x36c6ba, "div", "table")).style.cssText = "width:100%";
    _0x5ba2d2 = makeElement(_0x2a72df, "div", "cell");
    if (_0x89cafe.Power) {
      if (_0x89cafe.Type && _0x89cafe.Type == "Boot") {
        let _0x5589e2 = document.querySelector("[data-boot-field]");
        if (_0x5589e2) {
          _0x5589e2.style.display = "";
        }
      }
      (_0x15eb5b = makeElement(_0x1d4923, "div", "butIcons")).style.cssText = "position: absolute; top:0; left:0; padding:0 0.15rem;";
      makeElement(_0x15eb5b, "div", "svgBack").style.cssText = " width:1.6rem; height:1.6rem; background-image:url(/images/smw/" + _0x89cafe.icon.toLowerCase() + ".png); ";
    } else {
      var _0x15eb5b;
      _0x89cafe.icon;
      if (_0x89cafe.icon) {
        (_0x15eb5b = makeElement(_0x1d4923, "div", "butIcons")).style.cssText = "position: absolute; top:0; left:0; padding:0 0.15rem;";
        makeElement(_0x15eb5b, "div", "svgBack").style.cssText = " width:1.5rem; height:1.5rem; background-image:url(svg/act" + _0x89cafe.icon + ".svg); ";
      }
    }
    var _0x334c7a = _0x89cafe.label;
    (_0x5ba2d2 = makeElement(_0x2a72df, "div", "cell")).style.width = "100%";
    addText(_0x5ba2d2, _0x334c7a);
    return;
  }
  function _0x552cdd(_0x23ea5b, _0xe5e839, _0x24c113, _0xfde7fe) {
    if (_0xe5e839) {
      var _0x520468;
      var _0x26ea91 = 0.25;
      var _0x57a7a7 = 0.25;
      if (_0x24c113) {
        _0x57a7a7 = 0.5;
      }
      if (_0xfde7fe) {
        _0x26ea91 = 0.5;
      }
      (_0x520468 = makeElement(_0x23ea5b, "div", "cell")).style.cssText = "width:50%; padding: 0.25rem " + _0x26ea91 + "rem 0.25rem " + _0x57a7a7 + "rem;";
      var _0x3eda69 = _0xe5e839.action;
      if (_0x3eda69.charAt(0) == "$") {
        _0x3eda69 = _0x3eda69.substr(1);
      }
      if (_0x48a474 && _0x48a474.user[0] && !_0x48a474.user[0].regname && ["Powers", "Divorce", "Marry", "BFF"].indexOf(_0x3eda69) >= 0) {
        _0xe5e839.flags = _0xe5e839.flags & 268435454 | 1;
      }
      if (_0x3eda69 == "GetXats") {
        let _0xd33ed = "";
        switch (_0xe5e839.icon) {
          case "Marry":
            _0xd33ed = ["mob2.needxats", "You need 200 xats to Marry or BFF"];
            break;
          case "Transfer":
            _0xd33ed = ["mob2.needxatstr", "You need xats or days to transfer"];
        }
        if (_0xd33ed) {
          addToolTip(_0x520468, _0xd33ed, {
            select: true,
            position: "low"
          });
          _0xe5e839.flags = _0xe5e839.flags & 268435454 | 1;
        }
      }
      if (parseInt(_0xe5e839.greyedOut) == 1) {
        addToolTip(_0x520468, ["mob2.gcontrolrestriction", "Restricted by Gcontrol"], {
          select: true,
          position: "low"
        });
        _0xe5e839.flags = _0xe5e839.flags & 268435454 | 1;
      }
      _0x520468.id = "act_" + _0x3eda69;
      _0x520468.flags = _0xe5e839.flags;
      if (_0xe5e839.flags & 1) {
        _0x520468.style.opacity = "0.5";
        _0x520468.style.pointerEvents = "none";
      }
      _0x520468.onclick = function (_0x1a05ad) {
        if (!(_0x520468.flags & 1)) {
          actions.sendApp(_0x1a05ad, _0xe5e839);
        }
      };
      _0xe5e839.divcol = _0x520468;
      _0x3de164(_0x520468, _0xe5e839);
    }
  }
  function _0x2b2199(_0x5d83c0, _0x44738c) {
    for (var _0x54371a = _0x44738c.childNodes, _0x3debe3 = 0; _0x3debe3 < _0x54371a.length; _0x3debe3++) {
      if ((_0x54371a[_0x3debe3].nodeName == "TEXTAREA" || _0x54371a[_0x3debe3].nodeName == "INPUT") && !!_0x54371a[_0x3debe3].id) {
        _0x5d83c0[_0x54371a[_0x3debe3].id] = _0x54371a[_0x3debe3].value;
      }
      _0x2b2199(_0x5d83c0, _0x54371a[_0x3debe3]);
    }
  }
  this.configurePage = function (_0x35cef1) {
    if (!actions.Visible) {
      return;
    }
    if (_0x35cef1) {
      _0x550987 = false;
      false;
      _0x35cef1 = _0x35cef1.replace(/\\/gi, "");
      _0x48a474 = JSON.parse(_0x35cef1);
      CacheHiddenDivs();
    }
    if (_0x48a474.main) {
      for (let _0x3b4d75 in _0x48a474.main) {
        let _0x2b36fd = _0x48a474.main[_0x3b4d75];
        if (_0x2b36fd && _0x2b36fd.row == 5) {
          _0x3b4d75 = parseInt(_0x3b4d75);
          let _0xdddabe = _0x48a474.main[_0x3b4d75 + 1];
          if (_0xdddabe) {
            _0xdddabe.row = "5";
          }
        }
      }
    }
    if (_0x1ae16c) {
      clearDiv(_0x1ae16c);
      if (_0x1ae16c) {
        _0x1ae16c.remove();
      }
    }
    _0x1ae16c = null;
    var _0x3b4e91 = _0x533d73();
    if (!_Activity.instance.MyId) {
      _Activity.instance.Selector.DoLoginEtc("SignUp");
      return;
    }
    if (!_0x48a474.user) {
      return;
    }
    if (!_0x3a3704 && _0x29bb0d) {
      return;
    }
    var _0x4385de = _0x48a474.user[0];
    const _0x548d94 = _0x4385de.me == "1";
    _0x304727 = _0x548d94 && !isPstylePreviewEnabled();
    let _0x5d63d1 = _0x1ef27e = _0x4385de.id.toString();
    if (_0x5d63d1.substr(-9, 9) == "000000000") {
      _0x5d63d1 = _0x5d63d1.substr(0, _0x5d63d1.length - 9) + "B";
    } else if (_0x5d63d1.substr(-6, 6) == "000000") {
      _0x5d63d1 = _0x5d63d1.substr(0, _0x5d63d1.length - 6) + "M";
    }
    var _0x3a6dc3 = _0x4385de.regname.length < 1 ? actions.IsToonsNoId(_0x5d63d1) ? "" : _0x5d63d1 : _0x4385de.regname.replace(/l/g, "L").replace(/I/g, "i") + " (" + _0x5d63d1 + ")";
    _0x3b4e91.innerHTML = _0x304727 ? HiddenDivs.PictureAndNameEdit : HiddenDivs.PictureAndName;
    _0x3e8007 = _0x3a6dc3;
    var _0x1c2d8e = _0x48a474.user[0].regname;
    let _0xe084fe;
    let _0x4d3ae1 = false;
    let _0x3d0f0a = !!(_0x4385de.flag0 & 8192);
    let _0x5c50c1 = false;
    let _0xc4ff0a = false;
    try {
      let _0x26a211 = _0x4385de.on2.replace(/`/gi, "\"");
      _0x26a211 = JSON.parse(_0x26a211);
      _0x4d3ae1 = _0x26a211.online == "Online";
      _0xc4ff0a = _0x4385de.addedAsFriend == "1";
      _0x5c50c1 = _0x4385de.calls == "friends" && _0xc4ff0a || _0x4385de.calls == "everyone" || _0x4385de.calls == "";
      if (_0x4385de.regname == null || _0x4385de.regname == "") {
        _0x5c50c1 = false;
      }
      if (_0x4385de.callsAccepted === "0") {
        _0x5c50c1 = false;
      }
    } catch (_0x5e1e67) {}
    if (config.MyRegName == null | config.MyRegName == "") {
      _0x5c50c1 = false;
    }
    try {
      const _0x2910ff = JSON.parse(localStorage.getItem("todo") || "{}");
      _0xe084fe = _0x2910ff.w_avatar || "";
    } catch {
      _0xe084fe = "";
    }
    const _0x3870c7 = _0x2f88dd => {
      if (isLiveAppConsentAccepted() === true) {
        const _0x199681 = _0x4385de.id;
        const _0x165cc5 = _0x4385de.regname ?? null;
        const _0x34426c = config.MyRegName ?? null;
        const _0x286e7d = ("XAT" + Math.random().toString(36).slice(2, 17) + Date.now().toString(36) + Math.random().toString(36).slice(2, 12)).slice(0, 35);
        const _0x582fa7 = _0x4385de.w_Powers ?? null;
        localStorage.setItem("xatLive.data", parent.liveAppEncode(JSON.stringify({
          action: "create",
          roomId: _0x286e7d,
          name: _0x165cc5,
          xatid: _0x199681,
          avatarUrl: _0x4385de.avatar,
          myName: _0x34426c,
          myXatId: config.MyId,
          myAvatarUrl: _0xe084fe,
          enableVideo: _0x2f88dd,
          powers: _0x582fa7
        })));
      }
      if (ThisPage === "visitors") {
        ToC({
          Command: "",
          Next: "messages"
        });
        localStorage.setItem("xatLive.pendingCall", "true");
        return;
      } else {
        return parent.handleLiveApp(false, true);
      }
    };
    if (_0x3a3704) {
      var _0x443cb0 = window.parent.document.getElementById("FrameDialogTitle");
      let _0x5460d8 = window.parent.document.getElementById("reportIconClassic");
      let _0x3ba767 = window.parent.document.getElementById("reportIcon");
      let _0x161c5c = window.parent.document.getElementById("removeIcon");
      let _0x326d08 = window.parent.document.getElementById("userReport");
      let _0x38d90d = window.parent.document.getElementById("callIconClassic");
      let _0x5bfa70 = window.parent.document.getElementById("callIconPar");
      let _0x4a8825 = window.parent.document.getElementById("callIcon");
      let _0x7221c8 = window.parent.document.getElementById("voiceCall");
      let _0x2418c3 = window.parent.document.getElementById("videoCall");
      if (_0x443cb0) {
        _0x443cb0.removeAttribute("data-localize");
        clearDiv(0, _0x443cb0);
        addText(_0x443cb0, _0x3a6dc3);
        if (_0x161c5c) {
          _0x161c5c.removeAttribute("style");
        }
        if (_0x3ba767) {
          _0x3ba767.removeAttribute("style");
        }
        if (_0x4a8825) {
          _0x4a8825.removeAttribute("style");
        }
        removeClass("d-none", 0, window.parent.document.getElementById("FrameDialog"));
        removeClass("d-none", 0, window.parent.document.getElementById("FrameBack"));
        _0x3ba767.src = "svg/report" + (toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg";
        _0x4a8825.src = "svg/call/call" + (toHex6(config.ButColW)[0] == "0" ? "b" : "") + ".svg";
        _0x5bfa70.style.display = _0x4d3ae1 && _0x5c50c1 && !_0x3d0f0a ? "block" : "none";
        const _0x139423 = window.parent.document.getElementById("callDropdownClassic");
        if (_0x139423) {
          _0x139423.style.display = "none";
        }
        const _0x332f60 = window.parent.document.getElementById("reportDropdownClassic");
        if (_0x332f60) {
          _0x332f60.style.display = "none";
        }
        if (_0x550987 == 0) {
          _0x5460d8.onclick = _0x41f526 => {
            _0x41f526.preventDefault();
            if (_0x5460d8) {
              parent.reportsDrop(_0x3e8007);
            }
          };
          _0x550987 = true;
        }
        if (_0x7221c8) {
          _0x7221c8.onclick = _0x3418c7 => {
            _0x3418c7.preventDefault();
            _0x374464();
            _0x3870c7(false);
          };
        }
        if (_0x2418c3) {
          _0x2418c3.onclick = _0x4402d0 => {
            _0x4402d0.preventDefault();
            _0x374464();
            _0x3870c7(true);
          };
        }
        if (_0x38d90d) {
          _0x38d90d.onclick = _0x1c1220 => {
            _0x1c1220.preventDefault();
            if (_0x38d90d) {
              parent.callsDrop(_0x3e8007);
            }
          };
        }
        if (_0x304727 || _0x548d94) {
          var _0x4e9dd9 = _0x443cb0.parentNode.parentNode;
          var _0x17531e = xInt(_0x4e9dd9.style.width) + xInt(_0x4e9dd9.style.left) * 2;
          _0x4e9dd9.style.left = xInt(_0x17531e * 0.05) + "px";
          _0x4e9dd9.style.width = xInt(_0x17531e * 0.9) + "px";
        } else {
          _0x5460d8.classList.remove("d-none");
          if (_0x1c2d8e.length <= 0) {
            _0x326d08.classList.add("d-none");
          }
          _0x38d90d.classList.remove("d-none");
        }
      }
    } else {
      addTitleBar(_0x3a6dc3, null, null, !_0x304727 || "", _0x304727 ? null : _0x374464, true, true, !_0x304727, false, false, true);
      this.Name = _0x3a6dc3;
      if (!_0x304727) {
        const _0x2c1b9e = document.getElementById("callDropdown");
        const _0x3c9ec9 = document.getElementById("voiceCall");
        const _0x3524e4 = document.getElementById("videoCall");
        if (_0x4d3ae1 && _0x5c50c1 && !_0x3d0f0a) {
          callIcon.classList.remove("d-none");
        } else {
          callIcon.classList.add("d-none");
        }
        if (_0x2c1b9e) {
          _0x2c1b9e.style.display = "none";
          const _0x5da4af = _0x2c1b9e.parentElement.parentElement.parentElement.parentElement;
          if (_0x5da4af) {
            _0x5da4af.style.display = _0x4d3ae1 && _0x5c50c1 && !_0x3d0f0a ? "block" : "none";
          }
        }
        const _0x1e6358 = document.getElementById("reportDropdown");
        if (_0x1e6358) {
          _0x1e6358.style.display = "none";
        }
        if (_0x3c9ec9) {
          _0x3c9ec9.onclick = _0x121c40 => {
            _0x121c40.preventDefault();
            _0x2c1b9e.style.display = "none";
            _0x374464();
            _0x3870c7(false);
          };
        }
        if (_0x3524e4) {
          _0x3524e4.onclick = _0x39b7ec => {
            _0x39b7ec.preventDefault();
            _0x2c1b9e.style.display = "none";
            _0x374464();
            _0x3870c7(true);
          };
        }
      }
    }
    _0x4385de.name = _0x4385de.name.replace(/_+/g, " ");
    _0x4385de.status = _0x4385de.status.replace(/_+/g, " ");
    var _0xa34270 = ProcessName(_0x4385de.name, _0x4385de.pFlags, _0x4385de.status);
    var _0x2cf01c = document.getElementById("name");
    _0x2cf01c.innerHTML = "";
    var _0x58e750 = makeElement(_0x2cf01c, "div");
    if (actions.stripParenthesesAndReduceString(_0x4385de.name).length) {
      _0x58e750.style.position = "relative";
      createNameSm(_0x58e750, _0x4385de.name, {
        flags: _0x4385de.pFlags | 268435456,
        userId: _0x4385de.id,
        userName: _0x4385de.regname,
        className: "userNick",
        fromActions: true,
        isName: true
      }).style.position = "";
      setValue("nameedit", _0x4385de.name);
    } else {
      let _0x470a27 = document.getElementById("name");
      var _0x16bb36 = makeElement(_0x470a27, "span");
      _0x58e750.innerHTML = _0x4385de.regname;
      _0x58e750.appendChild(_0x16bb36);
      setValue("nameedit", _0x4385de.name);
    }
    if (_0xa34270.status) {
      const _0x3d8be7 = _0x4385de.Statusfx ? _0x4385de.Statusfx.replaceAll("#", "").split(",") : [];
      const _0x10cee4 = _0x3d8be7.length ? xInt(_0x3d8be7[0]) : 0;
      let _0x1a9029 = {};
      try {
        _0x1a9029 = _0x3d8be7.length ? JSON.parse(decodeURIComponent(escape(atob(_0x3d8be7[1])))) : {};
      } catch (_0x2998cb) {}
      let _0x459c26 = _0xa34270.status.substr(0, 128);
      if (_0x304727) {
        const _0x4859b1 = document.getElementById("status");
        makeElement(_0x4859b1, "p", null, "statusText" + _0x4385de.id);
        _0x4859b1.style.cssText = "font-size:0.66rem;padding-left:0px;";
        if (_0xa34270.statusGlow !== undefined) {
          _0x4859b1.style["text-shadow"] = MakeGlow(_0xa34270.statusGlow);
        }
        if (_0xa34270.statusColor !== undefined) {
          _0x4859b1.style.color = "#" + toHex6(_0xa34270.statusColor);
        }
        createStatusfx(_0x459c26, _0x1a9029, _0x4385de.id, _0x10cee4, _0x1a9029.effect == "translucent" ? _0xa34270.statusGlow : null);
        if (_0x10cee4) {
          _0x4859b1.style.width = "115%";
          _0x4859b1.style.display = "block";
          _0x4859b1.style.overflow = "hidden";
          _0x4859b1.style.position = "relative";
        }
      } else if (_0x304727) {
        let _0x3cc47a = document.getElementById("status");
        addText(_0x3cc47a, _0x459c26);
        _0x3cc47a.className = "mobStatus";
      } else {
        document.getElementById("statusNewPar").className = "statuspar";
        let _0xff9b0b = document.getElementById("statusNew");
        _0xff9b0b.className = "statuschild";
        _0xff9b0b.innerHTML = _0x459c26;
      }
    }
    setValue("statusedit", _0x4385de.status);
    if (!_0x304727 && !actions.IsToonsNoId(_0x4385de.id) && _0x4385de.regname.length && typeof parent.isConnected == "function" && parent.isConnected()) {
      setTimeout(() => {
        let _0x4c3f2f = document.getElementById("act_Powers");
        if (_0x4c3f2f && _0x4c3f2f.flags && _0x4c3f2f.flags & 1) {
          _0x4c3f2f.flags = _0x4c3f2f.flags & 268435454 | 0;
          _0x4c3f2f.style.opacity = 1;
        }
      }, 60000);
    }
    var _0x480181 = _0x4385de.on;
    let _0x2bdbbf;
    let _0x1f03e5 = _0x4385de.on2.replace(/`/gi, "\"");
    try {
      _0x1f03e5 = JSON.parse(_0x1f03e5);
    } catch (_0x2ceb4d) {
      _0x1f03e5 = false;
    }
    if (_0x304727) {
      0;
    } else {
      var _0x30f9b1 = "";
      if (_0x1f03e5) {
        _0x480181 = "";
        _0x2bdbbf = "";
        if (_0x1f03e5.online) {
          _0x480181 += _0x1f03e5.online + " ";
        }
        if (_0x1f03e5.rank) {
          _0x480181 += _0x1f03e5.rank + " ";
        }
        if (_0x1f03e5.other) {
          _0x480181 += _0x1f03e5.other + " ";
        }
        let _0x59abac = _0x1f03e5.friend ? _0x1f03e5.friend.split(";=") : [];
        let _0x2035c4 = _0x59abac[0] || false;
        let _0x31d9d9 = _0x59abac[1] || false;
        if (_0x31d9d9 && _0x2035c4) {
          _0x2bdbbf += _0x2035c4;
        }
        if (!_0x1f03e5.Locating && !actions.IsToonsNoId(_0x4385de.id)) {
          if (_0x31d9d9) {
            _0x2bdbbf += (_0x2035c4 ? " & " : " ") + _0x31d9d9 + " ";
          }
          if (!_0x31d9d9 && _0x2035c4) {
            _0x2bdbbf += _0x2035c4 + " ";
          }
        }
      }
      if (_0x4385de.location) {
        var _0xe1bd29 = _0x4385de.location.substr(1);
        if (_0x4385de.location.charAt(0) !== "@") {
          _0x480181 += " " + _0x4385de.location;
        } else {
          let _0x454d82 = parent.defconfig;
          _0x454d82.GroupName ||= "";
          if (_0xe1bd29.toLowerCase() != _0x454d82.GroupName.toLowerCase()) {
            _0x30f9b1 = makeElement(0, "a", "onhref");
            var _0xc2a133 = _0x4385de.location.replace(/[^a-zA-Z0-9_@ ]/g, "");
            _0x30f9b1.href = "/" + _0xc2a133.substr(1);
            _0x30f9b1.target = "_blank";
            addText(_0x30f9b1, _0xc2a133);
          }
        }
      }
      setTextNode("onC1", _0x480181 + " ", _0x30f9b1);
      setTextNode("onC2", _0x2bdbbf === undefined ? "" : _0x2bdbbf);
      document.getElementById("onP").style.cssText = "font-size: 12px; color: #5f5f5f;";
      document.getElementById("labelname").style.display = "none";
      document.getElementById("labelon").style.display = "none";
    }
    var _0x288357 = _0x48a474.main[0];
    _0x288357 &&= _0x288357.name;
    if (_0x288357) {
      actions.buildWallet(_0x288357);
    }
    let _0x106102 = document.getElementById("profileIcons");
    _0x106102.style.display = _0x304727 ? "inline-block" : "grid";
    _0x106102.innerHTML = "";
    let _0x3e7534 = makeElement(_0x106102, "span");
    _0x3e7534.className = "profileIc";
    if (!_0x1f03e5.Locating && !_0x304727 || _0x304727 || isPstylePreviewEnabled()) {
      (function () {
        if (_0x1f03e5) {
          if (_0x1f03e5.reg) {
            let _0x456997 = makeElement(_0x3e7534, "a");
            _0x456997.style.marginLeft = "-1px";
            makeElement(_0x456997, "img", "iconRegSub").src = "svg/registered.svg";
            addToolTip(_0x456997, ["mob2.reg", "Registered"], {
              select: true,
              position: _0x304727 ? "left" : "low"
            });
          }
          if (_0x1f03e5.sub) {
            let _0x1b88e7 = makeElement(_0x3e7534, "a");
            _0x1b88e7.style.marginLeft = "-1px";
            makeElement(_0x1b88e7, "img", "iconRegSub").src = "svg/subscriber.svg";
            addToolTip(_0x1b88e7, ["mob2.sub", "Subscriber"], {
              select: true,
              position: _0x304727 ? "left" : "low"
            });
          }
          if (_0x1f03e5.married) {
            let _0x4d75f9 = _0x1f03e5.married.split(",");
            let _0x2f3249 = _0x4d75f9[1] || "";
            let _0x2b1c2e = _0x4d75f9[2] || "";
            _0x2b1c2e = parseInt(_0x2b1c2e);
            let _0x538f0a = makeElement(_0x3e7534, "a");
            _0x538f0a.style.marginLeft = _0x304727 ? "2px" : "-1px";
            makeElement(_0x538f0a, "img", "iconRegSub").src = "svg/heart2.svg";
            let _0x35611c = !isNaN(_0x2b1c2e) && new Date(_0x2b1c2e * 1000).toDateString();
            if (_0x2f3249) {
              _0x538f0a.addEventListener("click", () => {
                parent.openInNewTab("https://xat.me/" + _0x2f3249);
              });
            }
            addToolTip(_0x538f0a, _0x35611c ? ["mob2.marriedtosince", "Married to: $1, Since: $2", _0x2f3249, _0x35611c] : ["mob2.marriedto", "Married to: $1", _0x2f3249], {
              select: true,
              position: _0x304727 ? "left" : "low"
            });
          }
          if (_0x1f03e5.bff) {
            let _0x17ea0a = _0x1f03e5.bff.split(",");
            let _0x2b8248 = _0x17ea0a[1] || "";
            let _0xa354d6 = _0x17ea0a[2] || "";
            _0xa354d6 = parseInt(_0xa354d6);
            let _0x455583 = makeElement(_0x3e7534, "a");
            _0x455583.style.marginLeft = _0x304727 ? "2px" : "-1px";
            let _0x367697 = makeElement(_0x455583, "img", "bff", "iconRegSub");
            _0x367697.src = "svg/bff.svg";
            _0x367697.style.width = "17px";
            let _0x359ab4 = !isNaN(_0xa354d6) && new Date(_0xa354d6 * 1000).toDateString();
            if (_0x2b8248) {
              _0x455583.addEventListener("click", () => {
                parent.openInNewTab("https://xat.me/" + _0x2b8248);
              });
            }
            addToolTip(_0x455583, _0x359ab4 ? ["mob2.bfftosince", "BFF to: $1, Since: $2", _0x2b8248, _0x359ab4] : ["mob2.bffto", "BFF to: $1", _0x2b8248], {
              select: true,
              position: _0x304727 ? "left" : "low"
            });
          }
          let _0x3b1dfc = function (_0x57ab79) {
            if (!_0x57ab79) {
              return false;
            }
            let _0x44f0f2 = _0x57ab79.married ? _0x57ab79.married : _0x57ab79.bff;
            if (_0x44f0f2) {
              let _0x5f3850 = _0x44f0f2.split(",");
              if (!_0x5f3850[2]) {
                return false;
              }
              _0x5f3850[2] = parseInt(_0x5f3850[2]);
              if (isNaN(_0x5f3850[2])) {
                return;
              }
              let _0x18712e = new Date();
              let _0x32bb4e = new Date(_0x5f3850[2] * 1000);
              if (_0x18712e.getMonth() == _0x32bb4e.getMonth() && _0x18712e.getDate() == _0x32bb4e.getDate() && _0x18712e.getFullYear() != _0x32bb4e.getFullYear()) {
                return _0x18712e.getFullYear() - _0x32bb4e.getFullYear();
              }
            }
            return false;
          }(_0x1f03e5);
          if (_0x3b1dfc) {
            let _0x33cff4 = makeElement(_0x106102, "span");
            let _0xab8a60 = GetTranslation("mob2.anniversary", [_0x3b1dfc]);
            _0xab8a60 ||= "Happy $1 Anniversary!".replace("$1", _0x3b1dfc);
            _0x33cff4.innerText = _0xab8a60;
            _0x33cff4.className = "anBlink";
            if (!_0x304727) {
              _0x33cff4.style.cssText = "float: none; vertical-align: middle; margin-bottom: .2rem;";
            }
          }
        }
        if (_0x4385de.homepage) {
          setValue("homepageedit", _0x4385de.homepage);
          let _0xfbd823 = parent.WordIsLink(_0x4385de.homepage);
          if (_0xfbd823) {
            let _0x497b45 = makeElement(_0x3e7534, "a");
            _0x497b45.style.marginLeft = _0x304727 ? "2px" : "-1px";
            let _0x577d23 = makeElement(_0x497b45, "img", "iconHome");
            _0x577d23.src = "svg/home.svg";
            _0x577d23.style.width = "22px";
            addToolTip(_0x497b45, _0x4385de.homepage, {
              select: true,
              position: _0x304727 ? "left" : "low"
            });
            _0x497b45.addEventListener("click", _0x3b6099 => {
              parent.LinkValidator(_0x3b6099, _0xfbd823);
            });
          }
        }
        if (!_0x4385de.blockedUs && !_0x304727 && _0x48a474.user[0].regname) {
          let _0x47be01 = makeElement(_0x3e7534, "a");
          let _0x3c68d5 = makeElement(_0x47be01, "img");
          _0x3c68d5.src = "svg/gifts2.svg";
          _0x3c68d5.style.marginTop = "1px";
          addToolTip(_0x47be01, ["box.257", "Gifts"], {
            select: true,
            position: "low"
          });
          _0x47be01.addEventListener("click", () => {
            parent.setAppIcon(20044);
            actions.checkIfButtons(true);
            parent.classicSetDialog("selector", {
              Type: "Gifts",
              MainObj: _0x48a474
            });
            _0x4d60ba();
          });
        }
      })();
    }
    setValue("avataredit", _0x4385de.avatar);
    var _0x30a5a1 = false;
    var _0x5a63b0 = "avatarPosLeft";
    _0x213b09 = "buttonsBot";
    document.getElementById("butLeft").style.cssText = "width: 100%;";
    document.getElementById("infoCell").style.cssText = "width: 100%;";
    document.getElementById("infoCell").className = "cell profileInfo shadTxtClassic";
    _0x1e2bfe("main");
    var _0x4cb7c1;
    var _0x5d7563;
    var _0x4cb8a1;
    var _0x148cfb = _0x4385de.avatar;
    var _0x4cb282 = document.getElementById(_0x5a63b0);
    if (_0x304727) {
      _0x4cb7c1 = _0x4cb8a1 = 30;
      let _0x3de4cf = Pickr.create({
        el: "#nameColor",
        theme: "nano",
        preview: true,
        useAsButton: true,
        closeOnScroll: false,
        lockOpacity: true,
        components: {
          palette: true,
          preview: true,
          opacity: true,
          hue: true,
          interaction: {
            save: true,
            copy: true,
            input: true
          }
        }
      }).on("save", _0x113264 => {
        let _0x3b92ed = document.createElement("textarea");
        _0x3b92ed.value = _0x113264.toHEXA().toString();
        document.body.appendChild(_0x3b92ed);
        _0x3b92ed.select();
        document.execCommand("copy");
        document.body.removeChild(_0x3b92ed);
        _0x3de4cf.hide();
      }).on("show", () => {
        let _0x42fd5b = GetTranslation("mob2.copycolor");
        _0x42fd5b ||= "copy color";
        const _0x4e3657 = document.querySelectorAll(".pcr-save");
        _0x4e3657[_0x4e3657.length - 1].value = _0x42fd5b;
      });
      parent.addEventListener("click", () => {
        _0x3de4cf.hide();
      }, false);
      let _0x131373 = document.getElementById("colorWheel");
      if (!parent.Classic) {
        _0x131373.style.marginTop = "0.06rem";
      }
      addToolTip(_0x131373, ["mob2.colorpicker", "Color Picker"], {
        select: true,
        position: "left"
      });
    } else if (_0x304727) {
      _0x4cb282.style.cssText = "height: 100%; padding: 0.4rem;";
      _0x4cb7c1 = _0x4cb282.clientHeight - 12;
      _0x4cb8a1 = xInt((document.body.clientWidth - 24) * 0.5 * 1);
    } else {
      _0x4cb7c1 = _0x4cb8a1 = 75;
    }
    if (_0x4cb7c1 > _0x4cb8a1) {
      _0x4cb7c1 = _0x4cb8a1;
    }
    _0x5d7563 = calcAvSize(_0x4cb7c1);
    (_0x1ae16c = document.getElementById(_0x5a63b0)).style.cssText = _0x304727 ? "width: " + _0x5d7563 + "px; height: " + _0x5d7563 + "px; min-width: " + _0x5d7563 + "px; min-height: " + _0x5d7563 + "px; max-width: " + _0x5d7563 + "px; max-height: " + _0x5d7563 + "px; display: grid; place-content: center; margin: 10px; overflow: hidden;" : "";
    document.getElementById("botPad").style.cssText = "height: 100%;";
    document.getElementById("tgreen").style.height = "auto";
    document.getElementById("tgreen").parentNode.style.height = "auto";
    _0x1ae16c.offsetLeft;
    _0x1ae16c.offsetTop;
    _0x1ae16c.style.height = _0x5d7563 + "px";
    _0x1ae16c.style.overflow = "hidden";
    const _0x22a417 = _Activity.instance.Avatars.MakeAvatar(_0x1ae16c, _0x148cfb, {
      size: _0x5d7563,
      scrollParent: _0xfe9d0b,
      userId: _0x4385de.id,
      userName: _0x4385de.regname,
      className: "profileAvatar",
      hasAnimate: _0x4385de.pFlags & NamePowers.animate,
      hasShuffle: _0x4385de.pFlags & NamePowers.shuffle,
      avatarEffect: _0x48a474.user[0].avatarEffect ?? ""
    });
    var _0x54db08;
    if (_0x304727 && _0x22a417) {
      _0x22a417.className += " meAvatar";
    }
    _0x1ae16c.style.cursor = "pointer";
    if (_0x304727) {
      for (_0x54db08 in {
        name: 1,
        avatar: 1,
        status: 1,
        homepage: 1
      }) {
        if (_0x443cb0 = document.getElementById(_0x54db08 + "edit")) {
          _0x443cb0.onblur = function (_0x5e0e07) {
            actions.DoBlur(_0x5e0e07);
          };
        }
      }
    }
    actions.checkIfButtons();
    TranslateAll();
  };
  this.DoBlur = function (_0x49e813) {
    var _0x41f943 = _0x48a474.user[0];
    if ((_0x49e813 = _0x49e813.currentTarget).id) {
      _0x49e813.id.substr(_0x49e813.id.length - 4);
      _0x41f943[_0x49e813.id.substr(0, _0x49e813.id.length - 4)] = _0x49e813.value;
      actions.configurePage();
    }
  };
  this.updatePC = function (_0x1a1e47) {
    var _0xebd9a5 = ["PrivateChat", "PrivateMessage"];
    var _0x2382be = _0x1a1e47 ? 0 : 1;
    for (var _0x3ff7ed in _0xebd9a5) {
      var _0x3a185d = document.getElementById("act_" + _0xebd9a5[_0x3ff7ed]);
      if (_0x3a185d) {
        _0x3a185d.flags = _0x3a185d.flags & 268435454 | _0x2382be;
        _0x3a185d.style.opacity = _0x2382be ? "0.5" : "1";
      }
    }
  };
  this.LoginCancel = function () {
    modalClose();
    if (_0x29bb0d) {
      actions.doLoginDialog();
    }
  };
  this.Logout = function () {
    var _0x114fd4 = {
      Page: "profile",
      name: "Logout",
      Command: "Action",
      Next: "profile"
    };
    ToC(_0x114fd4);
    return false;
  };
  this.Login = function () {
    var _0x2e7e36 = document.getElementById("openModal");
    if (_0x2e7e36) {
      _0x2e7e36.style.visibility = "hidden";
    }
    var _0x107b05 = {
      Page: "profile",
      Command: "Login"
    };
    _0x107b05.Username = document.getElementById("lusername").value;
    _0x107b05.Password = document.getElementById("lpassword").value;
    if (FillInAll(_0x107b05, ["Username", "Password"])) {
      ToC(_0x107b05);
    }
    return false;
  };
  var _0x1ab3bc;
  function _0x1522a8() {
    actions.locDoModal("LogoutOK");
  }
  function _0x3e5887() {
    _0x70ff3a = [];
    _0x1ab3bc = [];
    var _0x40bfcd = _0x48a474.AllPowers[0];
    for (var _0x21ba91 in _0x40bfcd) {
      var _0x293beb = _0x21ba91 * 32;
      for (var _0x541c01 = 0; _0x541c01 < 32; _0x541c01++) {
        if (_0x40bfcd[_0x21ba91] & 1 << _0x541c01) {
          _0x70ff3a[_0x293beb + _0x541c01] = 1;
        }
      }
    }
    if (_0x48a474.Collections) {
      _0x1ab3bc = _0x48a474.Collections[0];
    }
    if (_0x1ab3bc) {
      for (var _0x21ba91 in _0x1ab3bc) {
        _0x70ff3a[_0x21ba91] = _0x1ab3bc[_0x21ba91];
      }
    }
    var _0x52034f = _0x48a474.PowersOflo;
    _0x52034f &&= _0x52034f[0];
    _0x52034f &&= _0x52034f[0];
    if (_0x52034f) {
      var _0x61b4da = _0x52034f.split("|");
      for (_0x541c01 = 0; _0x541c01 < _0x61b4da.length; _0x541c01++) {
        var _0x784ba = _0x61b4da[_0x541c01].split("=");
        var _0x118f46 = xInt(_0x784ba[1]);
        if (_0x118f46 == 0) {
          _0x118f46 = 1;
        }
        _0x70ff3a[_0x784ba[0]] = 1 + _0x118f46;
      }
    }
  }
  function _0x533d73() {
    return clearDiv("all2");
  }
  function _0x3a7ca4(_0xdefe22 = "", _0x4a3abd) {
    let _0x32efc6 = document.getElementById("sectionOne");
    if (_0xdefe22 && !hasDarkMode()) {
      const {
        pStyle: _0xde07c8,
        pStyleAmount: _0x10109d
      } = _0x2b02c8(_0xdefe22);
      if (isPstylePreviewEnabled()) {
        _0x13dacc(_0xde07c8, _0x4fa3eb => {
          _0xde07c8.pstylePos = _0x4fa3eb;
          localStorage.setItem("pstyleTmp", btoa(unescape(encodeURIComponent(JSON.stringify(_0xde07c8))).replace(/\s+/g, "")));
        });
      }
      let _0x4ddde2;
      let _0x3dc445;
      let _0x37903f = _0xde07c8?.pstyle?.includes("http") || isValidHex(_0xde07c8?.pstyle) ? _0xde07c8?.pstyle : "";
      let _0x3e73fd = document.querySelectorAll(".butcontainer");
      let _0x10e407 = _0x3a3704 ? parent.document.querySelector(".dialogTitleBar") : document.querySelector(".htmlTitleBar");
      let _0x1b7abf = document.getElementById("name");
      let _0x4f0803 = document.querySelector(".userNick") ? document.querySelector(".userNick") : document.querySelector(".profileName");
      let _0x5857aa = document.getElementById("onP");
      let _0x1e5169 = document.querySelector(".profileIc");
      let _0x5a0bfe = document.querySelectorAll(".profileIc img");
      let _0xfeb31f = document.querySelector(".iconRegSub");
      let _0x49e210 = _0x4a3abd?.querySelector(".dialogTitleBar");
      let _0x4f3d13 = _0x4a3abd?.querySelector(".dialogActionRight");
      _0x37903f = filter(_0x37903f);
      _0xde07c8.pstylePos = filter(_0xde07c8?.pstylePos);
      _0xde07c8.pstylecol = filter(_0xde07c8?.pstylecol);
      _0xde07c8.pstyleicon = filter(_0xde07c8?.pstyleicon);
      _0xde07c8.pstylegradient = filter(_0xde07c8?.pstylegradient);
      const _0x4ac608 = {
        pg7: "yellow",
        pg8: "cogu",
        pg9: "everypower",
        pg10: "everypower"
      };
      if (_0x4ac608[_0xde07c8.pstylegradient] && !_0x48a474.user[0][_0x4ac608[_0xde07c8.pstylegradient]]) {
        _0xde07c8.pstylegradient = "pgNone";
      }
      if (_0xde07c8.pstylePos) {
        _0xde07c8.pstylePos = _0xde07c8.pstylePos.split(",");
        _0x4ddde2 = _0xde07c8.pstylePos[0] + "% " + _0xde07c8.pstylePos[1] + "%";
        _0x3dc445 = _0xde07c8.pstylePos[2] + "%";
      }
      if (_0x32efc6) {
        if (_0x37903f?.includes("http")) {
          _0x32efc6.style.backgroundImage = "url(" + (_0x10109d >= 2 ? SafeImage(_0x37903f, false, false, true) : SafeImage(_0x37903f)) + ")";
          _0x32efc6.style.backgroundSize = _0x3dc445 || "cover";
          _0x32efc6.style.backgroundPosition = _0x4ddde2;
        } else if (isValidHex(_0x37903f)) {
          _0x32efc6.style.background = _0x37903f;
        }
      }
      if ((_0x37903f || _0x317ae0(_0xde07c8?.pstylegradient)) && !_0x304727) {
        let _0x3c967d = document.querySelector(".onhref");
        let _0x5bd9ac = document.querySelector(".bff");
        let _0xde996 = _0xde07c8?.pstylecol.substr(0, 7);
        let _0x3cddd7 = _0xde996 ? _0xde996 + "59" : "#99999959";
        let _0x141b03 = isColorLight(_0xde996) ? "#222222" : "#FFF";
        _0x1b7abf.classList.add("psbase");
        _0x1b7abf.style.background = _0x3cddd7;
        _0x4f0803.style.color = _0x141b03;
        if (_0x5857aa) {
          _0x5857aa.classList.add("psbase");
          _0x5857aa.style.background = _0x3cddd7;
          _0x5857aa.style.color = _0x141b03;
          _0x5857aa.style.display = "inline-block";
        }
        if (_0xfeb31f) {
          _0xfeb31f.classList.add("pRegSub");
        }
        if (_0x3c967d) {
          _0x3c967d.style.color = _0x141b03;
        }
        _0x1e5169.classList.add("psicons");
        if (_0x5bd9ac) {
          _0x5bd9ac.style.width = "21px";
        }
        _0x5a0bfe.forEach(_0x4f1f32 => {
          _0x4f1f32.style.background = _0x3cddd7;
        });
      }
      if (_0xde07c8?.pstyleicon && !_0x304727) {
        let _0x54b4dc = document.getElementById("profileIcons");
        let _0x2e720c = document.querySelector(".profileName");
        _0x54b4dc.style.display = "none";
        _0x2e720c.style.marginTop = "1.4rem";
      }
      if (_0x317ae0(_0xde07c8?.pstylegradient)) {
        let _0x10f81f = _0x304727 ? document.getElementById("status") : document.getElementById("statusNew");
        let _0x563bed = _0x3a3704 ? parent.document.getElementById("FrameDialogTitle") : document.querySelector(".htmlTitleBar");
        let _0x280f04 = _0x3a3704 ? parent.document.getElementById("removeIcon") : document.getElementById("TitleBarRight");
        let _0x1fa203 = _0x3a3704 ? parent.document.getElementById("reportIcon") : document.getElementById("repIcon");
        let _0x1d6c84 = _0x3a3704 ? parent.document.getElementById("callIcon") : document.getElementById("callIcon");
        let _0x3170a9 = document.querySelectorAll(".butcontent");
        let _0x30a490 = document.querySelector(".htmlTitleButton");
        let _0x4343d4 = document.querySelector(".onhref");
        let _0xbaec03 = document.querySelector(".iconHome");
        const _0x36705d = _0x48a474.user?.[0] ?? {};
        const _0x22efc4 = _0xde07c8.pstylegradient;
        if (!_0x304727) {
          _0x10f81f?.classList.add("psStatus");
        }
        if (_0x563bed) {
          _0x563bed.style.color = "#fff";
        }
        if (_0x280f04) {
          _0x280f04.style.filter = "brightness(10)";
        }
        if (_0x1fa203) {
          _0x1fa203.style.filter = "brightness(10)";
        }
        if (_0x1d6c84) {
          _0x1d6c84.style.filter = "brightness(10)";
        }
        if (_0x5857aa) {
          _0x5857aa.style.color = "#fff";
        }
        if (!_0x304727 && _0x4f0803) {
          _0x4f0803.style.color = "#fff";
        }
        if (_0x4343d4) {
          _0x4343d4.style.color = "#fff";
        }
        _0xeec441();
        if (_0xbaec03) {
          _0xbaec03.src = "svg/home2.svg";
        }
        if (!_0x3a3704 && _0x30a490) {
          _0x30a490.style.background = "none";
        }
        _0x37903f = _0x37903f && !_0x304727;
        switch (_0x22efc4) {
          case "pg1":
            _0x7f9bcb("pg1");
            _0x1dd210("pg1", _0x37903f);
            break;
          case "pg2":
            _0x7f9bcb("pg2");
            _0x1dd210("pg2", _0x37903f);
            break;
          case "pg3":
            _0x7f9bcb("pg3");
            _0x1dd210("pg3", _0x37903f);
            break;
          case "pg4":
            _0x7f9bcb("pg4");
            _0x1dd210("pg4", _0x37903f);
            break;
          case "pg5":
            _0x7f9bcb("pg5");
            _0x1dd210("pg5", _0x37903f);
            break;
          case "pg6":
            _0x7f9bcb("pg6");
            _0x1dd210("pg6", _0x37903f);
            break;
          case "pg7":
            if (_0x36705d.yellow) {
              _0x7f9bcb("pg7");
              _0x1dd210("pg7", _0x37903f);
            }
            break;
          case "pg8":
            if (_0x36705d.cogu) {
              _0x7f9bcb("pg8");
              _0x1dd210("pg8", _0x37903f);
              _0x5ce92d("mushRoom");
            }
            break;
          case "pg9":
            if (_0x36705d.everypower) {
              _0x7f9bcb("pg9");
              _0x1dd210("pg9", _0x37903f);
            }
            break;
          case "pg10":
            if (_0x36705d.everypower) {
              _0x7f9bcb("pg10");
              _0x1dd210("pg10", _0x37903f);
            }
            break;
          case "pg11":
            if (_0x36705d.horrorgal) {
              _0x7f9bcb("pg11");
              _0x1dd210("pg11", _0x37903f);
              _0x5ce92d("psHalloween");
            }
            break;
          case "pg12":
            if (_0x36705d.morgana) {
              _0x7f9bcb("pg12");
              _0x1dd210("pg12", _0x37903f);
              _0x5ce92d("psMorgana");
            }
            break;
          case "pg13":
            if (_0x36705d.lems) {
              _0x7f9bcb("pg13");
              _0x1dd210("pg13", _0x37903f);
              _0x5ce92d("psLems");
            }
            break;
          case "pg14":
            if (_0x36705d.kitsune) {
              _0x7f9bcb("pg14");
              _0x1dd210("pg14", _0x37903f);
              _0x5ce92d("psKitsune");
            }
        }
        function _0x7f9bcb(_0x38683d) {
          if (!_0x38683d) {
            return;
          }
          [..._0x3e73fd, _0x10e407, _0x49e210, _0x4f3d13, !_0x304727 && _0x10f81f ? _0x10f81f : null].filter(Boolean).forEach(_0x218acb => {
            window.kPstyleKeys.forEach(_0x1d741c => _0x218acb.classList.remove(_0x1d741c));
            if (_0x218acb.classList.contains("dialogTitleBar")) {
              _0x218acb.style.background = "";
            }
            _0x218acb.classList.remove("pstyleFx");
            _0x218acb.classList.add(_0x38683d);
            if (_0x38683d === "pg9" || _0x38683d === "pg10") {
              _0x218acb.classList.add("pstyleFx");
            }
          });
        }
        function _0xeec441() {
          _0x3170a9.forEach(_0x15123a => {
            _0x15123a.style.color = "#fff";
          });
        }
        function _0x1dd210(_0x24c46e, _0x4f8519) {
          if (_0x304727 || !_0x24c46e) {
            return;
          }
          [..._0x5a0bfe, _0x5857aa, _0x1b7abf].filter(Boolean).forEach(_0x4b2fc5 => {
            window.kPstyleKeys.forEach(_0xd80633 => _0x4b2fc5.classList.remove(_0xd80633));
            _0x4b2fc5.classList.remove("psinfo-front", "psinfo-back");
            _0x4b2fc5.classList.add(_0x24c46e);
            _0x4b2fc5.classList.add(_0x4f8519 ? "psinfo-back" : "psinfo-front");
          });
        }
        function _0x5ce92d(_0x236d1d) {
          _0x3e73fd.forEach(_0x5dd5b7 => {
            _0x5dd5b7.classList.add(_0x236d1d);
          });
        }
      }
      function _0x317ae0(_0x28c824) {
        return _0x28c824 && _0x28c824.slice(0, 2) == "pg" && _0x28c824.charAt(2) >= 1 && _0x28c824.charAt(2) <= 99;
      }
      function _0x13dacc(_0x376dda, _0x3ac83a) {
        let _0x9a57b5;
        let _0x423217;
        let _0x2495ba = false;
        let _0x276a2d = 50;
        let _0x4362d2 = 50;
        let _0x5049f7 = 100;
        let _0x1518b1 = null;
        let _0x1d315d = null;
        _0x32efc6.style.cursor = "grab";
        if (_0x376dda.pstylePos) {
          const [_0x2dab94, _0x5692a4, _0x16c02b] = _0x376dda.pstylePos.split(",").map(parseFloat);
          _0x276a2d = isNaN(_0x2dab94) ? _0x276a2d : _0x2dab94;
          _0x4362d2 = isNaN(_0x5692a4) ? _0x4362d2 : _0x5692a4;
          _0x5049f7 = isNaN(_0x16c02b) ? _0x5049f7 : _0x16c02b;
        }
        _0x32efc6.style.backgroundPosition = _0x276a2d + "% " + _0x4362d2 + "%";
        _0x32efc6.style.backgroundSize = _0x5049f7 + "%";
        const _0x2ef786 = () => {
          const _0x14e604 = _0x276a2d.toFixed(2) + "," + _0x4362d2.toFixed(2) + "," + _0x5049f7;
          if (typeof _0x3ac83a == "function") {
            _0x3ac83a(_0x14e604);
          }
        };
        const _0x5b71ca = _0x2a633c => {
          const [_0x1d7e5e, _0x162dec] = _0x2a633c;
          const _0x434568 = _0x162dec.clientX - _0x1d7e5e.clientX;
          const _0x24db59 = _0x162dec.clientY - _0x1d7e5e.clientY;
          return Math.sqrt(_0x434568 * _0x434568 + _0x24db59 * _0x24db59);
        };
        _0x32efc6.addEventListener("mousedown", _0x597a4f => {
          _0x2495ba = true;
          _0x9a57b5 = _0x597a4f.clientX;
          _0x423217 = _0x597a4f.clientY;
          _0x32efc6.style.cursor = "grabbing";
        });
        document.addEventListener("mousemove", _0x324c14 => {
          if (!_0x2495ba) {
            return;
          }
          const _0x4b9630 = _0x324c14.clientX - _0x9a57b5;
          const _0x4a4b6b = _0x324c14.clientY - _0x423217;
          _0x276a2d = Math.min(100, Math.max(0, _0x276a2d - _0x4b9630 / window.innerWidth * 100));
          _0x4362d2 = Math.min(100, Math.max(0, _0x4362d2 - _0x4a4b6b / window.innerHeight * 100));
          _0x32efc6.style.backgroundPosition = _0x276a2d.toFixed(2) + "% " + _0x4362d2.toFixed(2) + "%";
          _0x9a57b5 = _0x324c14.clientX;
          _0x423217 = _0x324c14.clientY;
        });
        document.addEventListener("mouseup", () => {
          if (_0x2495ba) {
            _0x2495ba = false;
            _0x32efc6.style.cursor = "grab";
            _0x2ef786();
          }
        });
        _0x32efc6.addEventListener("wheel", _0x29e517 => {
          _0x29e517.preventDefault();
          _0x5049f7 += _0x29e517.deltaY < 0 ? 10 : -10;
          _0x5049f7 = Math.min(200, Math.max(100, _0x5049f7));
          _0x32efc6.style.backgroundSize = _0x5049f7 + "%";
          _0x2ef786();
        });
        _0x32efc6.addEventListener("touchstart", _0x34adaf => {
          if (_0x34adaf.touches.length === 1) {
            _0x2495ba = true;
            _0x9a57b5 = _0x34adaf.touches[0].clientX;
            _0x423217 = _0x34adaf.touches[0].clientY;
          } else if (_0x34adaf.touches.length === 2) {
            _0x1518b1 = _0x5b71ca(_0x34adaf.touches);
            _0x1d315d = _0x5049f7;
          }
        });
        document.addEventListener("touchmove", _0xe76c6c => {
          if (_0xe76c6c.touches.length === 1 && _0x2495ba) {
            const _0x577f2a = _0xe76c6c.touches[0].clientX - _0x9a57b5;
            const _0x3de7a7 = _0xe76c6c.touches[0].clientY - _0x423217;
            _0x276a2d = Math.min(100, Math.max(0, _0x276a2d - _0x577f2a / window.innerWidth * 100));
            _0x4362d2 = Math.min(100, Math.max(0, _0x4362d2 - _0x3de7a7 / window.innerHeight * 100));
            _0x32efc6.style.backgroundPosition = _0x276a2d.toFixed(2) + "% " + _0x4362d2.toFixed(2) + "%";
            _0x9a57b5 = _0xe76c6c.touches[0].clientX;
            _0x423217 = _0xe76c6c.touches[0].clientY;
          } else if (_0xe76c6c.touches.length === 2 && _0x1518b1) {
            const _0x1ee35e = _0x5b71ca(_0xe76c6c.touches) / _0x1518b1;
            _0x5049f7 = Math.min(200, Math.max(100, _0x1d315d * _0x1ee35e));
            _0x32efc6.style.backgroundSize = _0x5049f7 + "%";
            _0x2ef786();
          }
        });
        document.addEventListener("touchend", () => {
          if (_0x2495ba) {
            _0x2495ba = false;
            _0x2ef786();
          }
          _0x1518b1 = null;
          _0x1d315d = null;
        });
      }
    }
  }
  function _0x2b02c8(_0x3ab676) {
    try {
      const _0xc36723 = _0x3ab676 ? _0x3ab676.split(",") : [];
      const _0x3459a8 = xInt(_0xc36723[0] || 0);
      if (isPstylePreviewEnabled()) {
        _0xc36723[1] = _Activity.instance.Settings.getPstyleForPreview();
      }
      const _0xc59f13 = _0xc36723[1] ? decodeURIComponent(atob(_0xc36723[1].replace(/\s+/g, ""))) : "";
      let _0x5c3b5f = {};
      if (_0xc59f13) {
        try {
          _0x5c3b5f = JSON.parse(_0xc59f13);
          if (typeof _0x5c3b5f != "object" || _0x5c3b5f === null) {
            throw new Error("Parsed data is not a valid JSON object");
          }
        } catch (_0x36ce24) {
          throw new Error("Invalid JSON format: " + _0x36ce24.message);
        }
      }
      return {
        pStyle: _0x5c3b5f,
        pStyleAmount: _0x3459a8
      };
    } catch (_0x4cc26b) {
      console.error("Exception: " + _0x4cc26b.message + " | PStyle object: " + _0x3ab676);
    }
  }
  function _0x28938e() {
    if (_0x3a3704) {
      var _0x313ae7 = parent.document.getElementById("textEntryEditable");
      if (_0x313ae7) {
        _0x313ae7.focus();
        if (_0x313ae7.value) {
          _0x313ae7.setSelectionRange(_0x313ae7.value.length, _0x313ae7.value.length);
        }
      }
    }
  }
  this.Register = function () {
    var _0x7adf88 = {
      Page: "profile",
      Command: "Register"
    };
    _0x7adf88.Username = document.getElementById("rusername").value;
    _0x596dab = _0x7adf88.Password1 = document.getElementById("rpassword1").value;
    _0x336d7c = _0x7adf88.Email = document.getElementById("remail").value;
    if (FillInAll(_0x7adf88, ["Username", "Password1", "Email"])) {
      ToC(_0x7adf88);
    }
    return false;
  };
  this.forgotPass = function (_0x8c60f8) {
    var _0x14d26d;
    var _0x1f37f9 = document.getElementById("lusername");
    _0x1f37f9 ||= document.getElementById("lemail");
    _0x1f37f9 &&= _0x1f37f9.value.toLowerCase();
    if (_0x8c60f8) {
      _0x14d26d = _0x8c60f8;
    }
    if (_0x8c60f8 && _0x8c60f8.charAt(0) == "{") {
      var _0x5f1b63 = JSON.parse(_0x8c60f8);
      if (_0x5f1b63.html) {
        actions.doLoginDialog();
        AlertMessage(_0x5f1b63.html, 1);
        if (_0x1f37f9) {
          document.getElementById("lusername").value = _0x1f37f9;
        }
        return;
      }
      _0x14d26d = "";
    }
    actions.locDoModal("ResetPassword");
    if (_0x14d26d) {
      AlertMessage(_0x14d26d, 1);
    }
    if (_0x1f37f9) {
      document.getElementById("lemail").value = _0x1f37f9;
    }
  };
  this.ResetPassword = function () {
    var _0x5496ae = {
      Page: "profile",
      Command: "ResetPassword"
    };
    _0x336d7c = _0x5496ae.Email = document.getElementById("lemail").value.toLowerCase();
    if (FillInAll(_0x5496ae, ["Email"])) {
      ToC(_0x5496ae);
    }
    return false;
  };
  this.RegisterError = function (_0x3215bb) {
    if (_0x3215bb.charAt(0) == "{") {
      actions.locDoModal("RegisterOK");
      var _0x11dc49 = JSON.parse(_0x3215bb);
      _0x3215bb = _0x11dc49.html;
      _0x11dc49.html = "";
      _0x11dc49.Page = "profile";
      _0x11dc49.Command = "SetUserId";
      ToC(_0x11dc49);
    }
    document.getElementById("RegErr").innerHTML = _0x3215bb;
  };
  this.doRegisterDialog = function (_0x1ffae1) {
    _Activity.instance.Selector.doRegisterDialog();
  };
  this.LoginSetName = function () {
    if (_0x336d7c && _0x336d7c.length > 0) {
      document.getElementById("lusername").value = _0x336d7c;
    }
    if (_0x596dab && _0x596dab.length > 0) {
      document.getElementById("lpassword").value = _0x596dab;
    }
  };
  this.doProfileDialog = function () {
    actions.locDoModal("EditProfileDialog");
    var _0x16a680 = _0x48a474.user[0];
    document.getElementById("iname").value = _0x16a680.name;
    document.getElementById("iavatar").value = _0x16a680.avatar;
    document.getElementById("istatus").value = _0x16a680.status;
    document.getElementById("ihomepage").value = _0x16a680.homepage;
  };
  this.doLoginDialog = function (_0x42b29) {
    _Activity.instance.Selector.DoLoginEtc("LoginForm");
  };
  this.quitEdit = function () {
    var _0x1b0a06 = {
      name: "SetEditButtonEdit"
    };
    ToC(_0x1b0a06);
    modalClose();
  };
  this.saveProfile = function () {
    var _0x33bb7f = {
      Page: "profile"
    };
    _0x33bb7f.name = _0x33bb7f.Type = _0x33bb7f.Command = "SaveXatspace";
    _0x33bb7f.Name = document.getElementById("nameedit").value;
    _0x33bb7f.Avatar = document.getElementById("avataredit").value;
    _0x33bb7f.status = document.getElementById("statusedit").value;
    _0x33bb7f.HomePage = document.getElementById("homepageedit").value;
    ToC(_0x33bb7f);
    return false;
  };
  this.termsOfService = function () {
    HitWeb("/terms?m=1");
  };
  this.doFav = function (_0xaeb081, _0x3d1c5f) {
    var _0x585bab = {
      Page: "profile",
      Command: "SetPower"
    };
    var _0xd8aab = _0x48a474.PowersMask[0];
    var _0x509c08 = document.getElementById("m" + _0x3d1c5f);
    if (_0xaeb081) {
      _0xaeb081.stopPropagation();
    }
    var _0x289cf6 = 0;
    if (_0x509c08.src.search("svg/off.svg") >= 0) {
      _0x509c08.src = "svg/on.svg";
    } else {
      _0x509c08.src = "svg/off.svg";
      _0x289cf6 = 1;
    }
    _0xd8aab[_0x3d1c5f >> 5] = _0xd8aab[_0x3d1c5f >> 5] & ~(1 << _0x3d1c5f % 32) | _0x289cf6 * (1 << _0x3d1c5f % 32);
    _0x585bab.Value = _0x289cf6;
    _0x585bab.Id = _0x3d1c5f;
    this.ReLogin = true;
    ToC(_0x585bab);
  };
  this.getMe = function () {
    return _0x304727;
  };
  this.IsToonsNoId = function (_0x1077c1) {
    return (_0x1077c1 = parseInt(_0x1077c1)) >= 1900000000;
  };
  this.checkIfButtons = function (_0xf58f06) {
    if (!_0x3a3704) {
      return false;
    }
    let _0x3924e1 = document.querySelector("#tgreen");
    let _0x11e557 = window?.parent?.document;
    let _0x4498c8 = _0x11e557?.getElementsByClassName("dialogBody");
    if (!_0x4498c8) {
      return false;
    }
    _0x4498c8[0].style.height = "90%";
    if (_0x304727 || !_0x3924e1 || _0xf58f06) {
      return false;
    }
    let _0x16f1ea = _0x3924e1.offsetHeight + 5;
    const _0x4ac518 = document.getElementById("walletUser");
    if (_0x4ac518.firstChild) {
      _0x16f1ea += _0x4ac518.offsetHeight + 5;
    }
    _0x4498c8[0].style.height = _0x16f1ea + "px";
    heightModal(_0x16f1ea);
    return _0x16f1ea;
  };
  this.buildWallet = function (_0x3c6017) {
    if (!_0x3c6017) {
      return;
    }
    let _0x580557 = _0x3c6017.split(", ");
    let _0x2ea60c = _0x304727 ? document.getElementById("on") : document.getElementById("walletUser");
    if (!_0x304727) {
      _0x2ea60c.innerHTML = "";
    }
    if (!_0x3a3704 && !_0x304727 && !!_0x2ea60c) {
      _0x2ea60c.classList.add("walletUserMobile");
    }
    let _0x2d0aa9 = makeElement(_0x2ea60c, "span");
    if (!_0x304727) {
      _0x2d0aa9.style.cssText = "position: relative; left: 7px; bottom: 5px; font-size: 14px;";
    }
    let _0x113101 = makeElement(_0x2d0aa9, "img");
    _0x113101.src = "svg/actBuyXats.svg";
    _0x113101.width = "18";
    _0x113101.style.margin = "0 3px 0 -2px";
    let _0x4b646f = makeElement(_0x2d0aa9, "span");
    _0x4b646f.innerHTML = _0x580557[0];
    _0x4b646f.className = "meWallet";
    let _0x361db3 = makeElement(_0x2ea60c, "span");
    if (_0x304727) {
      _0x361db3.style.marginLeft = "10px";
    } else {
      _0x361db3.style.cssText = "position: relative; right: 10px; bottom: 5px; float: right; font-size: 14px;";
    }
    let _0x284017 = makeElement(_0x361db3, "img");
    _0x284017.src = "svg/star.svg";
    _0x284017.width = "18";
    _0x284017.style.margin = "-4px 3px 0 0";
    let _0x1676e2 = makeElement(_0x361db3, "span");
    _0x1676e2.innerHTML = _0x580557[1];
    _0x1676e2.className = "meWallet";
  };
  this.setBanRules = function (_0x513f28) {
    if (!_0x513f28 || document.querySelector("#customBanField")) {
      return;
    }
    let _0x41731b = document.querySelector("#KickBan tbody");
    let _0xeeca2 = document.querySelector("#KickBan #Reason");
    let _0x36cca4 = document.querySelector("#KickBan #Duration");
    let _0x153d65 = _0x513f28.split("~");
    if (_0x153d65.length && _0x153d65[0] != "") {
      let _0x465e82 = makeElement(_0x41731b, "tr");
      let _0x5169d1 = makeElement(_0x465e82, "td", "text-nowrap");
      addText(_0x5169d1, ["mob1.or", "Or"]);
      let _0x563b77 = makeElement(_0x465e82, "td");
      let _0x514248 = makeElement(_0x563b77, "div", "xSelect wide");
      _0x514248.style.maxWidth = "200px";
      _0x514248.style.fontSize = "16px";
      let _0x16b516 = makeElement(_0x514248, "select", undefined, "customBanField");
      let _0x49f133 = makeElement(_0x16b516, "option");
      _0x49f133.value = "null";
      addText(_0x49f133, ["mob1.choosecustomrule", "Custom ban"]);
      for (let _0x2603c6 in _0x153d65) {
        let _0x1cf677 = _0x153d65[_0x2603c6].split(",");
        let _0x27eb5f = makeElement(_0x16b516, "option");
        _0x27eb5f.value = parseInt(_0x1cf677[1]);
        _0x27eb5f.dataset.reason = _0x1cf677[0]?.replace(/["<>';=\\]/gi, "");
        let _0xea08e1 = _0x1cf677[0] + " - " + _0x1cf677[1]?.replace(/h/gi, "") + "h";
        _0x27eb5f.appendChild(document.createTextNode(("" + _0x1cf677[0]).length > 20 ? ("" + _0x1cf677[0]).substr(0, 20) + ".. - " + (_0x1cf677[1]?.replace(/h/gi, "") + "h") : _0xea08e1));
        _0x27eb5f.title = "" + _0x1cf677[0];
      }
      _0x16b516.addEventListener("change", _0x40a615 => {
        if (_0xeeca2) {
          _0xeeca2.innerHTML = "";
        }
        if (_0x36cca4) {
          _0x36cca4.innerHTML = "";
        }
        let _0x5ac9aa = _0x40a615.target.selectedIndex;
        let _0x533ac3 = _0x40a615.target.options[_0x40a615.target.selectedIndex].dataset.reason || "";
        let _0x2596b1 = _0x40a615.target.value;
        if (_0x5ac9aa === 0) {
          _0x533ac3 = "";
          _0x2596b1 = 1;
        }
        _0xeeca2?.appendChild(document.createTextNode(_0x533ac3));
        _0x36cca4?.appendChild(document.createTextNode(_0x2596b1));
      });
    }
  };
  this.stripParenthesesAndReduceString = _0x2ba831 => {
    const _0x12a95a = _Activity.instance.IsClassic && !_0x304727;
    const _0x29e284 = _0x12a95a ? 30 : 90;
    if (_0x12a95a) {
      _0x2ba831 = _0x2ba831.replace(/\s*\([^)]*\)\s*/g, "");
    }
    return _0x2ba831.replace(/\(([^)]*)\)|([^()]+)/g, (_0x447b4b, _0x2b277d, _0x2ac5e1) => _0x2ac5e1 ? _0x2ac5e1.substr(0, _0x29e284) : "(" + _0x2b277d + ")");
  };
  var _0x8c51cd = {
    LoginCancel: function () {
      actions.LoginCancel();
    },
    forgotPass: function () {
      actions.forgotPass();
    },
    doRegisterDialog: function () {
      actions.doRegisterDialog();
    },
    Logout: function () {
      actions.Logout();
    },
    termsOfService: function () {
      actions.termsOfService();
    },
    doLoginDialog: function () {
      actions.doLoginDialog();
    },
    Register: function () {
      actions.Register();
    },
    getXats: function () {
      getXats();
    },
    quitEdit: function () {
      actions.quitEdit();
    },
    saveProfile: function () {
      actions.saveProfile();
    },
    clearLogin: function () {
      clearAlertMessage();
      actions.Login();
    },
    LoginAndSetName: function () {
      actions.doLoginDialog();
      actions.LoginSetName();
    },
    clearResetPassword: function () {
      clearAlertMessage();
      actions.ResetPassword();
    },
    modalClose: function () {
      modalClose();
    }
  };
  function _0x4d60ba() {
    let _0x225dac = window.parent.document.getElementById("removeIcon");
    if (_0x225dac) {
      _0x225dac.removeAttribute("style");
    }
  }
  this.locDoModal = function (_0x8df8e8) {
    var _0x11e36f;
    var _0x243a45;
    doModal(_0x8df8e8, null, null, null, _0x203481(), _0x420941 => {
      _0x3a7ca4(_0x48a474.user[0].pstyle, _0x420941);
    });
    for (_0x11e36f in _0x8c51cd) {
      if (_0x243a45 = document.getElementById(_0x11e36f)) {
        _0x243a45.addEventListener("click", _0x8c51cd[_0x11e36f]);
      }
    }
  };
}();