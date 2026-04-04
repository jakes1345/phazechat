"use strict";
var visitors = new function () {
  let _0x404d4d = this.PoolHeight = 0;
  const _0x14298b = this.ScrollHeight = 0;
  let _0x17547f;
  const _0x41150e = document.getElementById("visitorsContainer");
  let _0x426322;
  let _0x3afc7c;
  function _0x29d55c() {
    ToC({
      Command: "",
      Next: "messages"
    });
  }
  this.VisitorsIntersectionObserverCallback = (_0x1baf27, _0x3d59e7) => {
    const _0x5c501d = _0x1baf27.length;
    for (let _0x3d5625 = 0; _0x3d5625 < _0x5c501d; _0x3d5625++) {
      const _0x3d0abe = _0x1baf27[_0x3d5625];
      const _0x1fc476 = _0x3d0abe.target;
      if (_0x3d0abe.isIntersecting) {
        _0x1fc476.classList.remove("invisible");
      } else {
        _0x1fc476.classList.add("invisible");
      }
    }
  };
  this.VisitorsIntersectionObserver = new IntersectionObserver(this.VisitorsIntersectionObserverCallback, {
    root: _0x41150e,
    rootMargin: "160px",
    threshold: 0
  });
  this.sendApp = function (_0x3ed729, _0x32afcc) {
    if (typeof _0x32afcc == "string" && _0x32afcc.charAt(0) == "{") {
      _0x32afcc = JSON.parse(_0x32afcc);
    } else {
      const _0x15b074 = xInt(_0x32afcc);
      if (_0x15b074 && _0x3ed729 == "rapid") {
        _0x32afcc = {
          UserNo: _0x15b074,
          Page: "visitors",
          Command: "DoRapid"
        };
        ToC(_0x32afcc);
        return;
      }
    }
    if (_0x32afcc !== null && typeof _0x32afcc == "object") {
      if (_0x32afcc.Type !== "swiperight") {
        return;
      }
      _0x32afcc.Next = "messages";
      _0x32afcc.Page = "visitors";
      _0x32afcc.Command = "Click";
    } else {
      const _0x213ee2 = _0x32afcc;
      const _0xd1245f = {
        Type: "Click",
        UserNo: _0x213ee2,
        Page: "visitors",
        Command: "SaveId",
        Next: "actions"
      };
      _0x32afcc = _0xd1245f;
      if (_0x17547f == _0x213ee2) {
        _0x32afcc.Next = "profile";
      }
      if (!(_0x213ee2 <= 2) && !(_0x17547f <= 2)) {
        resetPstylePreview();
        classicSetDialog(_0x32afcc.Next, _0x213ee2);
        return;
      }
      _0x32afcc = {
        Command: "MakeId"
      };
    }
    ToC(_0x32afcc);
  };
  this.main = function (_0x5c05be) {
    _0x426322 = undefined;
    xatMain(_0x5c05be);
    _0x17547f = config.MyId;
    _0x3afc7c = config.Flags & 1;
    addTitleBar(["mob1.visitors", "Visitors"], [["", "❮ "], ["mob1.messages", "Messages"]], _0x29d55c, "", null);
    document.body.style.display = "block";
    _0x41150e.style.top = _0x3afc7c ? "0px" : document.getElementById("titleBar").clientHeight + "px";
    _0x41150e.style.bottom = "0px";
    if (!_0x3afc7c) {
      AddHammer(_0x41150e, Hammer.DIRECTION_RIGHT, visitors.sendApp);
    }
    TranslateAll();
  };
  this.setSettings = function (_0x38b0ff) {
    _Activity.instance.UserSettings = JSON.parse(_0x38b0ff);
  };
  this.glowVisitor = _0x3673a5 => {
    const _0x4d2763 = document.querySelector("[data-user=\"" + _0x3673a5 + "\"]");
    if (!_0x4d2763) {
      return;
    }
    const _0x80b4de = _0x4d2763.querySelector(".pawn");
    if (!_0x80b4de || _0x80b4de.animation) {
      return;
    }
    _0x80b4de.style.visibility = "visible";
    const _0x48469a = _0x80b4de.animate([{
      filter: "none",
      visibility: "visible"
    }, {
      filter: "drop-shadow(0 0 0.5px #00FF00) drop-shadow(0 0 0.5px #00FF00) drop-shadow(0 0 1px #00FF00)",
      offset: 0.2
    }, {
      filter: "drop-shadow(0 0 0.5px #00FF00) drop-shadow(0 0 0.5px #00FF00) drop-shadow(0 0 1px #00FF00)",
      offset: 0.8
    }, {
      filter: "none",
      visibility: "visible"
    }], {
      duration: 1000
    });
    _0x80b4de.animation = _0x48469a;
    _0x48469a.onfinish = () => {
      _0x80b4de.animation = null;
    };
  };
  this.doTyping = (_0x3b9eb9, _0x39e3da) => {
    const _0x4780c3 = document.querySelector("[data-user=\"" + _0x3b9eb9 + "\"]");
    if (!_0x4780c3) {
      return;
    }
    const _0x357205 = _0x4780c3.querySelector(".pawnStuff");
    let _0x5c84fb = _0x357205?.querySelector(".flagPawn");
    if (_0x39e3da == 1) {
      let _0x59bffd;
      let _0x36cc93;
      if (_0x59bffd = _0x357205.querySelector(".away")) {
        _0x59bffd.remove();
      }
      if (_0x36cc93 = _0x357205.querySelector(".typing")) {
        _0x36cc93.remove();
      }
      if (_0x5c84fb) {
        _0x5c84fb.style.display = "none";
      }
      _Activity.instance.Smilies.MakeSmiley(_0x357205, "(tickle#typing)", {
        size: 20,
        showAd: !1,
        scrollParent: _0x41150e,
        className: "typing"
      });
    } else {
      _0x357205.querySelector(".typing")?.remove();
      if (_0x5c84fb) {
        _0x5c84fb.style.display = "";
      }
    }
  };
  this.addVisitor = function (_0x45870a, _0x2a93f2) {
    const _0x31dd5d = JSON.parse(_0x45870a);
    const _0x4902d7 = parseInt(_0x31dd5d.id);
    if (!isConnected() && _0x4902d7 != parseInt(config.MyId)) {
      return;
    }
    if (_0x4902d7 == 0 || _Activity.instance.clickedTickleTab) {
      return;
    }
    let _0x1acc97 = "";
    let _0x5b8a99 = !1;
    const _0x29d32e = "idvisitors";
    const _0x48fc33 = _0x29d32e + _0x4902d7;
    let _0x26f5d3;
    let _0x66f874;
    let _0x28cf68;
    let _0x562aad = document.querySelector(".friendSearchLabel");
    if (_0x562aad && document.querySelector("#idvisitors")) {
      _0x562aad.parentNode.removeChild(_0x562aad);
    }
    const _0x4c3256 = document.getElementById(_0x29d32e);
    if (!_0x4c3256) {
      return;
    }
    const _0x229a39 = [..._0x4c3256.childNodes];
    const _0x2e0485 = _0x229a39.find(_0x48cbab => _0x48cbab.dataset.user && _0x48cbab.dataset.user == _0x4902d7);
    if (_0x2e0485) {
      _0x2e0485.remove();
    }
    if (_0x4902d7 < 400 && _0x4902d7 >= 300) {
      (function (_0x153ee0, _0x40830b, _0x4b58ec, _0x3e06a2) {
        const _0x11c4c6 = makeElement(_0x153ee0, "li", "section " + (_0x3e06a2 === 301 ? "rank" : _0x3e06a2 === 302 ? "ban" : _0x3e06a2 === 300 ? "grpName" : ""));
        _0x11c4c6.style.backgroundColor = "#" + toHex6(_0x40830b.PoolCol);
        _0x11c4c6.style.color = "#" + toHex6(_0x40830b.PoolColW);
        const _0x9232a9 = makeElement(_0x11c4c6, "span", "section");
        addText(_0x9232a9, _0x40830b.name);
        _0x11c4c6.style.textAlign = "center";
        _0x11c4c6.style.fontWeight = 500;
        _0x11c4c6.addEventListener("click", function () {
          visitors.SetPool(_0x3e06a2);
        });
        _0x404d4d += _0x11c4c6.offsetHeight;
        _0x426322 ||= _0x11c4c6;
      })(_0x4c3256, _0x31dd5d, 0, _0x4902d7);
      return;
    }
    const _0x4545b4 = makeElement(0, "li", "friend");
    iidLine++;
    _0x4545b4.dataset.user = _0x4902d7;
    _0x4545b4.setAttribute("data-line", iidLine);
    let _0x14da6e = !0;
    let _0x204044 = getTooltipInfo(_0x31dd5d);
    if (_0x31dd5d.id == config.MyId || _0x31dd5d.id == "2") {
      _0x14da6e = false;
    }
    const _0x4b711d = makeElement(_0x4545b4, "div", "listTable");
    const _0x68485c = makeElement(_0x4b711d, "div", "dialogRow");
    _0x26f5d3 = makeElement(_0x68485c, "div", "dialogCell dialogCellMiddle EditCell", "del" + _0x4902d7);
    if (!_0x3afc7c) {
      _0x28cf68 = makeElement(_0x68485c, "div", "visitorAvatarWrapper dialogCell dialogCellMiddle");
      _0x28cf68.pFlags = xInt(_0x31dd5d.pFlags);
      _0x28cf68.pFlags2 = xInt(_0x31dd5d.pFlags2);
    }
    const _0x256973 = makeElement(_0x68485c, "div", "dialogCell cellWide noPointer");
    const _0xa29d4c = makeElement(_0x256973, "div", "");
    _0x66f874 = makeElement(_0x256973, "div", "");
    if (_0x28cf68) {
      _Activity.instance.Avatars.MakeAvatar(_0x28cf68, _0x31dd5d.image, {
        size: 30,
        scrollParent: _0x41150e,
        userId: _0x4902d7,
        userName: _0x31dd5d.registered,
        className: "visitorAvatar",
        hasAnimate: _0x31dd5d.pFlags & NamePowers.animate,
        hasShuffle: _0x31dd5d.pFlags & NamePowers.shuffle,
        avatarEffect: _0x31dd5d.avatarEffect ?? ""
      });
    }
    const _0x56f8c6 = this.getUserStatus(_0x31dd5d);
    _0x1acc97 = _0x56f8c6.status;
    _0x5b8a99 = _0x56f8c6.defaultStatus;
    if (_0x31dd5d.pFlags2 & NamePowers.isBlocked) {
      _0x4545b4.className += " isBlocked";
    }
    const _0xde351c = makeElement(_0xa29d4c, "p");
    _0xde351c.className = "visitorsName";
    if (_0x31dd5d.F || _0x31dd5d.id == config.MyId || _0x31dd5d.id == "2") {
      _0xde351c.style.fontWeight = 600;
    }
    _0x4545b4.addEventListener("click", _0x4c677e => {
      if (_0x4c677e.ctrlKey || _0x4c677e.metaKey) {
        visitors.sendApp("rapid", _0x4902d7);
      } else {
        visitors.sendApp(0, _0x4902d7);
      }
    });
    if (_0x2a93f2 >= 0) {
      removeById(_0x48fc33);
      if (_0x2a93f2 == 0 || _0x2a93f2 == 2 && _0x48fc33 == "idvisitors2") {
        if (_0x426322) {
          insertAfter(_0x4545b4, _0x426322);
        } else {
          const _0x529823 = _0x4c3256.firstChild;
          if (_0x529823) {
            _0x4c3256.insertBefore(_0x4545b4, _0x529823);
          } else {
            _0x4c3256.appendChild(_0x4545b4);
          }
        }
      } else {
        const _0x565052 = _0x29d32e + _0x2a93f2;
        const _0x2ef64d = document.getElementById(_0x565052);
        if (_0x2ef64d) {
          insertAfter(_0x4545b4, _0x2ef64d);
        } else {
          _0x4c3256.appendChild(_0x4545b4);
        }
      }
    } else {
      _0x4c3256.appendChild(_0x4545b4);
    }
    if (!_0x3afc7c) {
      _0x4545b4.style.height = "34px";
      _0x4545b4.style.overflow = "initial";
    }
    if (_0x31dd5d.buddy) {
      _0x4545b4.dataset.buddy = _0x31dd5d.buddy;
    }
    if (_0x31dd5d.bride) {
      _0x4545b4.dataset.bride = _0x31dd5d.bride;
    }
    let _0x217d39;
    let _0x1028e6;
    let _0x14a1cf;
    let _0x4545a4 = 0;
    let _0x1df067 = !1;
    if (_0x31dd5d.pFlags & NamePowers.hasdays && !(_0x31dd5d.pFlags2 & NamePowers.subhide)) {
      _0x4545a4 |= PawnFlags.isSubscriber;
    }
    if (!!_0x31dd5d.registered && !(_0x31dd5d.pFlags2 & NamePowers.reghide)) {
      _0x4545a4 |= PawnFlags.isRegistered;
    }
    if (_0x31dd5d.pFlags & NamePowers.invisible) {
      _0x4545a4 |= PawnFlags.isInvisible;
    }
    if (_0x31dd5d.bride) {
      _0x4545a4 |= PawnFlags.isMarried;
    }
    if (_0x31dd5d.buddy) {
      _0x4545a4 |= PawnFlags.isBffed;
    }
    if (_0x31dd5d.isGagged) {
      _0x4545a4 |= PawnFlags.isGagged;
    }
    if (_0x31dd5d.pFlags2 & NamePowers.isBlocked) {
      _0x4545a4 |= PawnFlags.isBlocked;
    }
    if (_0x31dd5d.pFlags2 & NamePowers.isAway) {
      _0x4545a4 |= PawnFlags.isAway;
      _0x1df067 = true;
    }
    if (_0x31dd5d.FlagPawn && !_0x31dd5d.isGagged && !_0x1df067 && _0x31dd5d.FlagPawn.indexOf("F") != -1 && _0x31dd5d.pFlags2 & NamePowers.reghide) {
      _0x217d39 = _0x31dd5d.FlagPawn.substring(1);
    }
    if (_0x31dd5d.bride || _0x31dd5d.buddy) {
      _0x14a1cf = _0x229a39.find(_0xe81719 => _0xe81719.dataset.user && _0xe81719.dataset.user == _0x31dd5d.bride && _0xe81719.dataset.bride == _0x31dd5d.id);
      _0x1028e6 = _0x229a39.find(_0xeba323 => _0xeba323.dataset.user && _0xeba323.dataset.user == _0x31dd5d.buddy && _0xeba323.dataset.buddy == _0x31dd5d.id);
      if (_0x1028e6) {
        const _0x330e94 = _0x1028e6.querySelector(_0x3afc7c ? ".relIcon2" : ".rel2Mob");
        if (_0x330e94) {
          _0x330e94.parentNode.removeChild(_0x330e94);
        }
        if (_0x4545b4?.previousSibling?.dataset?.user == _0x1028e6.dataset.user) {
          _0x4545a4 |= PawnFlags.isBuddyAbove;
        } else {
          _0x4545a4 |= PawnFlags.isBuddyBelow;
        }
      } else if (_0x14a1cf) {
        if (_0x4545b4?.previousSibling?.dataset?.user == _0x14a1cf.dataset.user) {
          _0x4545a4 |= PawnFlags.isBuddyAbove;
        } else {
          _0x4545a4 |= PawnFlags.isBuddyBelow;
        }
      }
    }
    const _0x4c2402 = _0x31dd5d?.name?.length ? _0x31dd5d.name : " ";
    let _0x4c0035 = _0x31dd5d.Game ? _0x31dd5d.Game + "#wb1" : _0x31dd5d.xNum;
    if (customAppCodes[_0x31dd5d.xNum]) {
      _0x4c0035 = customAppCodes[_0x31dd5d.xNum];
    }
    if (isXatBirthday() && _0x31dd5d.registered && _0x31dd5d.name && _0x31dd5d.name.indexOf("(hat#") == -1) {
      let _0x476bca = _0x31dd5d.pawn;
      _0x476bca = _0x476bca.split(")");
      if (_0x476bca) {
        _0x476bca[0] += "#hat1#w0i0ip";
        _0x476bca = _0x476bca.join(")");
        _0x31dd5d.pawn = _0x476bca;
      }
    }
    createNameSm(_0xde351c, _0x4c2402, {
      flags: _0x31dd5d.pFlags,
      flags2: _0x31dd5d.pFlags2,
      pawn: _0x31dd5d.pawn,
      userId: _0x4902d7,
      userName: _0x31dd5d.registered,
      pawnFlags: _0x4545a4,
      xNum: _0x4c0035,
      className: "userNick",
      status: _0x1acc97,
      statusfx: _0x31dd5d.Statusfx,
      parent: _0x4545b4,
      showTooltip: !1,
      relation: _0x1028e6?.dataset.user || _0x14a1cf?.dataset.user,
      flagPawn: _0x217d39,
      pawnTooltip: _0x31dd5d.text,
      scrollParent: _0x41150e,
      forceStatus: _0x5b8a99,
      isName: !0
    });
    addToolTip(_0x4545b4, _0x204044, {
      position: "left",
      maxWidth: !0,
      showRapid: _0x14da6e
    });
    _0x4545b4.id = _0x48fc33;
    this.VisitorsIntersectionObserver.observe(_0x4545b4);
  };
  this.getUserStatus = _0x2b4335 => {
    let _0x3d4023 = "";
    let _0x584d88 = !1;
    if (!_Activity?.instance?.IsClassic) {
      _0x3d4023 = _0x2b4335.text;
      _0x584d88 = true;
    }
    if (_0x2b4335.status && _0x2b4335.pFlags & NamePowers.status) {
      _0x3d4023 = _0x2b4335.status;
      _0x584d88 = false;
    }
    if (!_0x3d4023 && !_Activity?.instance?.IsClassic) {
      _0x3d4023 = _0x2b4335.text;
      _0x584d88 = true;
    }
    if (_0x2b4335.pFlags2 & NamePowers.isBlocked) {
      _0x3d4023 = "";
      _0x584d88 = false;
    }
    return {
      status: _0x3d4023,
      defaultStatus: _0x584d88
    };
  };
  this.scrollMessages = function () {
    window.scrollTo(0, _0x14298b);
  };
  this.SetPool = function (_0x4f4249) {
    const _0x49d501 = {
      Type: "SetPool",
      Pool: _0x4f4249,
      Page: "visitors",
      Command: "SetPool"
    };
    const _0x1607cd = _0x49d501;
    if (!_Activity.instance.IsClassic) {
      _0x1607cd.Next = "messages";
    }
    ToC(_0x1607cd);
  };
}();