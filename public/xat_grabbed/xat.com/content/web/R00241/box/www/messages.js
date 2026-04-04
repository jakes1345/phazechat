"use strict";
var messages = new function () {
  var _0x2a0e2f;
  var _0x397431;
  var _0x1340c8 = this;
  var _0x4faa88 = 0;
  var _0x21fe40 = document.getElementById("messagesContainer");
  var _0x204c39 = document.getElementById("messagesSuperContainer");
  let _0x1ea8ca = 0;
  var _0x45e6ff = 0;
  var _0x33db5d = 0;
  var _0x244e33 = 1;
  var _0x44d25c = null;
  var _0x5c21c8 = [];
  var _0x146026 = null;
  var _0x2fc4c8 = null;
  var _0x3e2dd2 = "";
  var _0x190d2a = "";
  var _0x470470 = null;
  var _0xd14e69 = findNodeInWindowOrParent(".autocomplete");
  var _0x2d527;
  function _0x5ddb71() {
    if (_0x33db5d > 1) {
      _0x33db5d = 2;
    }
  }
  function _0x153e3b() {
    if (_0x33db5d == 1) {
      messages?.sendMessage("/RTypeOn");
    }
    _0x33db5d = 10;
  }
  this.MessagesIntersectionObserverCallback = (_0xcd38f6, _0x12d8c8) => {
    const _0x5eaf82 = _0xcd38f6.length;
    for (let _0x181353 = 0; _0x181353 < _0x5eaf82; _0x181353++) {
      const _0x9b8b96 = _0xcd38f6[_0x181353];
      const _0x2363e8 = _0x9b8b96.target;
      if (_0x9b8b96.isIntersecting) {
        _0x2363e8.classList.remove("invisible");
      } else {
        _0x2363e8.classList.add("invisible");
      }
    }
  };
  this.MessagesIntersectionObserver = new IntersectionObserver(this.MessagesIntersectionObserverCallback, {
    root: _0x21fe40,
    rootMargin: "160px",
    threshold: 0
  });
  this.setChatName = function (_0x6d8e1, _0x529699) {
    var _0x170146 = document.getElementById("TitleBarTitle");
    if (_0x170146) {
      changeText(_0x170146, _0x6d8e1);
    }
    if (_0x4faa88 = _0x529699) {
      setTextNode("TitleBarRight", "");
    }
    if (_0x6d8e1 && _0x6d8e1.indexOf("[mob2.notifications,Notifications]") >= 0) {
      messages.resetFooter("none");
    }
  };
  this.GetXconst = GetXconst;
  this.sendApp = function (_0x17f669, _0x13cd40) {
    if (typeof _0x13cd40 == "string" && _0x13cd40.charAt(0) == "{") {
      _0x13cd40 = JSON.parse(_0x13cd40);
    } else {
      var _0x47fea5 = xInt(_0x13cd40);
      if (_0x47fea5 && _0x17f669 == "rapid") {
        _0x13cd40 = {
          UserNo: _0x47fea5,
          Page: "visitors",
          Command: "DoRapid"
        };
        ToC(_0x13cd40);
        return;
      }
    }
    if (_0x13cd40 !== null && typeof _0x13cd40 == "object") {
      switch (_0x13cd40.Type) {
        case "swipeleft":
          _0x13cd40.Next = _0x4faa88 ? "actions" : "visitors";
          _0x13cd40.UserNo = _0x4faa88;
          messages.resetFooter();
          document.getElementById("textEntryEditable").blur();
          _Activity.instance.CurrentChatC = null;
          break;
        case "swiperight":
          _0x13cd40.Next = "chats";
          document.getElementById("textEntryEditable").blur();
          break;
        case "isms":
        case "iemail":
        case "DeleteMsg":
          _0x13cd40.Command = _0x13cd40.Type;
          break;
        default:
          return;
      }
      _0x13cd40.Page = "messages";
    } else {
      var _0x13e100 = _0x13cd40;
      if (_0x13e100 == 0) {
        return;
      }
      if (messages.Classic && config.MyId <= 2) {
        _0x13cd40 = {
          Command: "MakeId"
        };
      } else {
        _0x13cd40 = {
          Type: "",
          UserNo: _0x13cd40,
          Page: "messages",
          Next: "actions",
          Command: "SaveId"
        };
        if (_0x13e100 == config.MyId) {
          _0x13cd40.Next = "profile";
        }
        if (_0x13e100 < 0) {
          delete _0x13cd40.Next;
        }
        if (_0x13e100 >= 0) {
          classicSetDialog(_0x13cd40.Next, _0x13e100);
          return;
        }
      }
    }
    ToC(_0x13cd40);
  };
  this.resetFooter = _0x4821f0 => {
    if (_Activity.instance.IsClassic) {
      return;
    }
    let _0x4349fb = document.querySelector("#footer");
    if (_0x4349fb) {
      if (_0x4821f0 || _0x4349fb.style.display != "none") {
        _0x4349fb.style.display = _0x4821f0;
        return;
      } else {
        _0x4349fb.style.display = "";
        _0x204c39.style.bottom = _0x4349fb.clientHeight + "px";
        return;
      }
    } else {
      return undefined;
    }
  };
  this.main = function (_0x23dc14) {
    xatMain(_0x23dc14);
    _Activity.instance.Reactions = [];
    _0x3e2dd2 = JSON.parse(_0x23dc14).roomid;
    if (_Activity.instance.UserSettings?.textDirection == "enable") {
      document.getElementById("textEntryEditable").style.direction = "rtl";
    } else {
      document.getElementById("textEntryEditable").style.direction = "ltr";
    }
    this.setTypingOff();
    if (userFlags & NamePowers.away && userFlags & NamePowers.hasdays) {
      _0x45e6ff = 1;
    }
    if (userFlags & NamePowers.typing) {
      _0x33db5d = 1;
    }
    messages.resetFooter();
    if (_0x2d527) {
      return;
    }
    _0x2d527 = !0;
    const _0x5c51dc = _Activity.instance.GetParameterByName("gotPurchase", parent.parent.location.href);
    function _0x4b8dfd() {
      const _0x118e85 = document.querySelector("#reactionsSelector");
      const _0x27a5d3 = _0x118e85.querySelector("[data-target=\"reactions\"]");
      (function () {
        const _0x31c6f5 = document.getElementById("searchSmilies");
        const _0x448648 = document.querySelector("#reactionsSelector");
        const _0x2c62c8 = _0x448648.querySelectorAll("#smiliesAll .box");
        if (_0x31c6f5 && _0x31c6f5.value !== "") {
          _0x31c6f5.value = "";
          _0x2c62c8.forEach(_0x42b603 => {
            if (!_0x42b603.classList.contains("flix")) {
              _0x42b603.style.display = "flex";
            }
          });
        }
      })();
      _0x118e85.scrollTop = 0;
      _0x118e85.classList.add("closed");
      _0x27a5d3.style.display = "block";
      _0x27a5d3.click();
    }
    function _0x48ecd5(_0x577080) {
      const _0x4d77ee = _0x577080 ?? localStorage.getItem("recentReactions")?.split(",") ?? [];
      const _0x5359a2 = document.querySelector("#reactionsSelector #recent");
      _0x5359a2.innerHTML = "";
      if (_0x4d77ee.length) {
        _0x5359a2.style.display = "flex";
        document.querySelector("#reactionsSelector .title").style.display = "flex";
        document.querySelectorAll("#reactionsSelector .title")[1].style.display = "flex";
        _0x4d77ee.forEach(_0x361fe6 => {
          _Activity.instance.Smilies.MakeSmiley(makeElement(_0x5359a2, "div", "box"), _0x361fe6, {
            size: 20,
            tooltipPosition: "low",
            callback: () => {
              ToC({
                Command: "DoReaction",
                Reaction: _0x361fe6,
                MsgId: _0x44d25c,
                reactionId: Math.random().toString(36).substr(2, 9)
              }, true);
              _0x4b8dfd();
              _0x44d25c = null;
            }
          });
        });
      } else {
        _0x5359a2.style.display = "none";
        document.querySelector("#reactionsSelector .title").style.display = "none";
        document.querySelectorAll("#reactionsSelector .title")[1].style.display = "none";
      }
    }
    if ((_Activity.instance.IsAndroidApp || _Activity.instance.IsIOSApp) && _0x5c51dc) {
      setTimeout(() => {
        ToC({
          Command: "GotPurchase"
        });
      }, 3000);
    }
    if (localStorage.getItem("xatLive.pendingCall") === "true") {
      localStorage.removeItem("xatLive.pendingCall");
      setTimeout(() => {
        parent.handleLiveApp(false, true);
      }, 750);
    }
    if (!_Activity.instance.IsClassic && !_Activity.instance.MyId) {
      _Activity.instance.Selector.DoLoginEtc("SignUp");
    }
    if (_Activity.instance.CurrentChatC && _Activity.instance.CurrentChatC == 10 && !_Activity.instance.IsClassic) {
      messages.resetFooter("none");
      setTimeout(() => {
        let _0x2524df = document.querySelector("#messages");
        if (_0x2524df && !_0x2524df.hasChildNodes()) {
          let _0x5cd2b7 = GetTranslation("mob2.nonotifs");
          _0x5cd2b7 ||= "You have no notifications yet.";
          this.sendHelpMsg(0, _0x5cd2b7);
        }
      }, 200);
    }
    const _0x17b468 = localStorage.getItem("recentReactions")?.split(",") ?? [];
    const _0x4e35bd = "smile,biggrin".split(",");
    const _0x4abfb6 = document.querySelector("#reactionsSelector");
    const _0x2183a7 = _0x4abfb6.querySelector("#all");
    _0x4abfb6.querySelectorAll("[data-target]").forEach(_0x57cb50 => {
      _0x57cb50.addEventListener("click", _0x386432 => {
        const _0xc4826c = _0x4abfb6.querySelector("li.active");
        const _0x3a1654 = _0x4abfb6.querySelector("[data-tab=\"" + _0x57cb50.dataset.target + "\"]");
        const _0x49b64c = _0x4abfb6.querySelector("[data-tab=\"" + _0xc4826c.dataset.target + "\"]");
        if (_0x57cb50 != _0xc4826c) {
          _0x57cb50.className = "active";
          _0xc4826c.className = "";
          _0x3a1654.className = "";
          _0x49b64c.className = "hidden";
        }
      });
    });
    _0x48ecd5();
    document.addEventListener("click", _0x131cf9 => {
      messages.toggleMsgMenu(!1);
      if (_0x4abfb6.className) {
        return;
      }
      let _0x45a583 = !1;
      let _0x3556dd = _0x131cf9.target;
      do {
        if (_0x3556dd == _0x4abfb6) {
          _0x45a583 = !0;
          break;
        }
        _0x3556dd = _0x3556dd.parentNode;
      } while (_0x3556dd);
      if (!_0x45a583) {
        _0x4b8dfd();
      }
    });
    _0x4e35bd.forEach(_0x220fcc => {
      _Activity.instance.Smilies.MakeSmiley(makeElement(_0x2183a7, "div", "box"), _0x220fcc, {
        size: 20,
        tooltipPosition: "low",
        callback: () => {
          ToC({
            Command: "DoReaction",
            Reaction: _0x220fcc,
            MsgId: _0x44d25c,
            reactionId: Math.random().toString(36).substr(2, 9)
          }, true);
          if (_0x17b468.length >= 6 && !_0x17b468.includes(_0x220fcc)) {
            _0x17b468.shift();
          }
          if (!_0x17b468.includes(_0x220fcc)) {
            _0x17b468.push(_0x220fcc);
          }
          _0x48ecd5(_0x17b468);
          if (_Activity.instance.IsClassic || !_Activity.instance.IsClassic && localStorage.getItem("mobCookies") == 1) {
            localStorage.setItem("recentReactions", _0x17b468.join(","));
          }
          _0x4b8dfd();
          _0x44d25c = null;
        }
      });
    });
    const _0x2fdce2 = document.querySelectorAll("[data-msgItem]");
    const _0x11186 = document.getElementById("textEntryEditable");
    const _0x22ecf5 = _0x4abfb6.querySelector("[data-tab=\"reacted\"]");
    const _0x1d0b64 = _0x4abfb6.querySelector("[data-target=\"reacted\"]");
    const _0x5a6bab = _0x4abfb6.querySelector("[data-target=\"reactions\"]");
    function _0xcb970e(_0x38535f) {
      if (_0x38efb1 && _0x38efb1 !== _0x482cf5.innerHTML) {
        _0x38efb1 = _0x482cf5.innerHTML;
        if (_0x38efb1.indexOf("<br>") > -1) {
          _0x1ea8ca = 0;
          messages?.sendMessage(_0x482cf5.textContent.replace(/\s/g, " "));
          if (!messages.editMode) {
            _0x2fc4c8 = null;
          }
          _0x482cf5.textContent = "";
          _0x38efb1 = "";
          if (userFlags & NamePowers.typing) {
            _0x5ddb71();
          }
        } else if (userFlags & NamePowers.typing) {
          _0x153e3b();
        }
      }
      if (_0x38535f.type === "blur") {
        _0x1ea8ca = 0;
        if (userFlags & NamePowers.typing) {
          _0x5ddb71();
        }
      }
    }
    let _0x38efb1;
    _0x2fdce2.forEach(_0x5140ec => {
      _0x5140ec.addEventListener("click", _0x14106 => {
        switch (_0x14106.target.dataset.msgitem) {
          case "edit":
            const _0x4defe1 = {
              msgId: _0x146026.msgId,
              message: _0x146026.text,
              node: _0x146026.li
            };
            if (_0x2a0e2f) {
              this.setupEditBlock(_0x4defe1);
            } else {
              _0x190d2a = _0x3e2dd2;
              _0x2fc4c8 = _0x146026.msgId;
              _0x11186.innerText = _0x146026.text;
            }
            break;
          case "translate":
            const _0x547a3b = _0x146026.p;
            const _0x3a7ec2 = _0x146026.pt;
            const _0x45690b = _0x146026.li;
            const _0xccdf50 = _0x146026.transPt;
            if (_0xccdf50.innerHTML && _0xccdf50.innerHTML.length > 0) {
              _0x3a7ec2.style.display = "";
              _0x547a3b.style.display = "none";
              _0x45690b.alreadyTranslated = !0;
            } else {
              const _0x421567 = _0x146026.id;
              const _0x333e5d = 2 + xInt(_0x146026.Big);
              const _0x4582f8 = _0x146026.registered;
              (function (_0x3bb6c1, _0x5221c1) {
                if (!_0x3bb6c1) {
                  return;
                }
                if (_0x3bb6c1.substr(0, 2) == "❯#") {
                  _0x3bb6c1 = _0x3bb6c1.replace(/❯.*\[.*?\]/g, "");
                }
                _0x3bb6c1 = _0x3bb6c1.replace(/&apos;/gi, "'");
                let _0x2d6eec = localStorage.getItem("todo");
                _0x2d6eec &&= JSON.parse(_0x2d6eec);
                if (!_0x2d6eec || !_0x2d6eec.w_d1) {
                  return;
                }
                const _0x33d9a2 = {
                  q: StripSmilies(_0x3bb6c1),
                  u: config.MyId,
                  deviceId: _0x2d6eec.DeviceId,
                  passHash: _0x2d6eec.PassHash
                };
                const _0x132af4 = (_Activity.instance.UserSettings.language != "default" ? _Activity.instance.UserSettings.language : _Activity.instance.UserSettings.yourLang) || "en";
                fetch(xatdomain + "/web_gear/chat/translate3.php?target=" + _0x132af4, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  body: "json=" + JSON.stringify(_0x33d9a2)
                }).then(_0x43f081 => _0x43f081.text()).then(_0x31e991 => {
                  let _0x6785f2 = null;
                  try {
                    if ((_0x31e991 = JSON.parse(_0x31e991)) && (_0x31e991.text || _0x31e991.err)) {
                      _0x6785f2 = _0x31e991.err ? _0x31e991.err : _0x31e991.text.replace(/&#39;/g, "'").replace(/&quot;/g, "\"").replace(/&lt;priv&gt;/g, "");
                    }
                  } catch (_0x513908) {
                    _0x6785f2 = null;
                  }
                  _0x5221c1(_0x6785f2);
                });
              })(_0x146026.text, _0x1b2386 => {
                if (_0x1b2386) {
                  createTextSm(_0xccdf50, _0x1b2386, {
                    flags: _0x333e5d,
                    userId: _0x421567,
                    userName: _0x4582f8,
                    className: "translateMessage"
                  });
                  _0x3a7ec2.style.display = "";
                  _0x547a3b.style.display = "none";
                  _0x45690b.alreadyTranslated = true;
                }
              });
            }
            break;
          case "quote":
            const _0xff9bed = replaceBrakets(_0x146026.text);
            const _0x41d0e2 = ">" + (_0x146026.msgId ? "#" + _0x146026.msgId : "") + "[" + _0xff9bed.trim() + "]";
            if (_0x41d0e2.length + _0x11186.innerHTML.length <= 256) {
              _0x11186.innerText += _0x41d0e2;
              _0x11186.focus();
              document.execCommand("selectAll", false, null);
              document.getSelection().collapseToEnd();
            }
            break;
          case "react":
            if (REACTIONS === null) {
              GetXconsts("messages", ["reactions"]);
            }
            _0x4abfb6.classList.remove("closed");
            if (_0x146026.id != _Activity.instance.MyId && config.MyRegName) {
              _0x5a6bab.click();
              _0x5a6bab.style.display = "block";
            } else {
              _0x1d0b64.click();
              _0x5a6bab.style.display = "none";
            }
            const _0xdde2e1 = _0x4abfb6.offsetWidth;
            const _0x4aba1b = _0x4abfb6.offsetHeight;
            let _0x41ce91 = event.clientY - 15 < 15 ? 15 : event.clientY + _0x4aba1b + 15 >= window.innerHeight ? event.clientY - (_0x4aba1b + 15) : event.clientY;
            let _0x39efd8 = event.clientX - 15 < 15 ? 15 : event.clientX + _0xdde2e1 + 15 >= window.innerWidth ? event.clientX - (_0xdde2e1 + 15) : event.clientX;
            if (window.innerWidth < 486) {
              _0x39efd8 = Math.max(_0x39efd8, 15);
            }
            if (!_0x2a0e2f) {
              _0x39efd8 = (window.innerWidth - _0xdde2e1) / 2;
              _0x41ce91 = (window.innerHeight - _0x4aba1b) / 2;
            }
            _0x4abfb6.style.top = _0x41ce91 + "px";
            _0x4abfb6.style.left = _0x39efd8 + "px";
            _0x22ecf5.innerHTML = "";
            const _0x36934f = _Activity.instance.Reactions.filter(_0x50dd9b => _0x50dd9b.msgId == _0x146026?.msgId).sort((_0x187b89, _0xa96ea5) => _0xa96ea5.time - _0x187b89.time);
            if (_0x36934f.length) {
              _0x36934f.forEach(_0x3c9203 => {
                const _0x53ad54 = makeElement(_0x22ecf5, "div", "reacted");
                _0x53ad54.innerHTML = _0x3c9203.userName + " <br> (" + _0x3c9203.userId + ")";
                _Activity.instance.Smilies.MakeSmiley(makeElement(_0x53ad54, "div", "box"), _0x3c9203.reaction, {
                  size: 20,
                  tooltipPosition: "low"
                });
                addToolTip(_0x53ad54, GetTimeToGo(xInt(_0x3c9203.time) * 1000), {
                  position: "low",
                  shortTime: !0,
                  timestamp: xInt(_0x3c9203.time) * 1000
                });
              });
            } else {
              const _0x17a570 = makeElement(_0x22ecf5, "span", "title");
              addText(_0x17a570, ["mob2.noReactions", "No reactions yet"]);
            }
            break;
          case "delete":
            _0x3c7363(_0x146026.i);
            messages.sendApp(0, {
              Type: "DeleteMsg",
              Num: _0x146026.canDelete
            });
            break;
          case "copy":
            const _0x1dfeee = cleanXatTagsIcons(_0x146026.text ?? "");
            copyToClipboard(_0x1dfeee.replace("﻿", ""));
            break;
          case "copyLink":
            copyToClipboard(_0x146026.message);
            break;
          case "copySmiley":
            copyToClipboard("(" + _0x146026.isSmiley + ")");
        }
        messages.toggleMsgMenu(!1);
        _0x14106.stopPropagation();
      });
    });
    document.querySelector(".sendMsg").addEventListener("click", () => {
      (function () {
        var _0x3b4a66 = document.getElementById("textEntryEditable");
        let _0x49782c = document.getElementById("pmWrapper");
        if (_0x49782c && _0x49782c.innerHTML && _0x3b4a66.textContent.length == 0) {
          setPmMode(false, null, null, document);
        }
        if (_0x49782c && _0x49782c.innerHTML) {
          sendPm(_0x49782c.dataset.userno, _0x3b4a66.textContent.replace(/\s/g, " "));
          setPmMode(false, null, null, document);
        } else {
          messages?.sendMessage(_0x3b4a66.textContent.replace(/\s/g, " "), !_Activity.instance.Classic && _0x2fc4c8 !== null);
          _0x1ea8ca = 0;
        }
        if (!messages.editMode) {
          _0x2fc4c8 = null;
        }
        _0x3b4a66.textContent = "";
        if (_0x2a0e2f) {
          textEntryCaretPos = 0;
        }
        if (!_0x2a0e2f) {
          _0x3b4a66.focus();
        }
      })();
    });
    GetXconsts("messages");
    document.body.addEventListener("mouseenter", () => {
      messages.turnOffAwayOrFail();
      _0x45e6ff = 1;
    });
    _0x2a0e2f = config.Flags & 1;
    addTitleBar("\xA0", [["", "❮ "], ["mob1.chats", "Chats"]], _0x4a6344, ["mob1.visitors", "Visitors"], _0x1bc0de, null, null, null, !0, !0);
    if (!_0x2a0e2f) {
      AddHammer(document.body, 0, messages.sendApp);
    }
    var _0x482cf5 = document.getElementById("textEntryEditable");
    _0x482cf5.addEventListener("keyup", this.doAutoComplete);
    let _0x53635f = "";
    if (isWEB && Browser == "MS") {
      _0x482cf5.addEventListener("focus", function (_0x5bf199) {
        _0x38efb1 = _0x482cf5.innerHTML;
      }, false);
      _0x482cf5.addEventListener("blur", _0xcb970e, false);
      _0x482cf5.addEventListener("keyup", _0xcb970e, false);
      _0x482cf5.addEventListener("paste", _0xcb970e, false);
      _0x482cf5.addEventListener("input", _0xcb970e, false);
    } else {
      _0x482cf5.addEventListener("paste", _0x3a221c => {
        const _0x51155b = reduceTextLength(_0x482cf5.textContent);
        if (_0x51155b.length > 0) {
          _0x482cf5.textContent = _0x51155b;
        }
        _0x53635f = _0x482cf5.textContent;
      });
      _0x482cf5.addEventListener("keydown", _0x1bbcbe => {
        if (_0x1bbcbe.which == 13 || _0x1bbcbe.keyCode == 13) {
          _0x1bbcbe.preventDefault();
          let _0x1d79d8 = document.getElementById("pmWrapper");
          if (_0x1d79d8 && _0x1d79d8.innerHTML && _0x482cf5.textContent.length == 0) {
            setPmMode(false, null, null, document);
          }
          if (_0x1d79d8 && _0x1d79d8.innerHTML) {
            sendPm(_0x1d79d8.dataset.userno, _0x482cf5.textContent.replace(/\s/g, " "));
            setPmMode(false, null, null, document);
            _0x1ea8ca = 0;
          } else {
            let _0x249e1a = _0x482cf5.textContent.replace(/\s/g, " ");
            if (_0x249e1a.substring(0, 5).toLowerCase() == "/away") {
              _Activity.instance.IsAway = true;
            }
            messages?.sendMessage(_0x249e1a, !_Activity.instance.IsClassic && _0x2fc4c8 !== null);
            _0x1ea8ca = 0;
            if (!messages.editMode) {
              _0x2fc4c8 = null;
            }
          }
          _0x482cf5.textContent = "";
          _0x53635f = "";
          _0x5ddb71();
        } else {
          handleMaxLength(_0x1bbcbe, _0x482cf5);
          if (userFlags & NamePowers.typing) {
            _0x153e3b();
          }
          _0x53635f = _0x482cf5.textContent;
          messages.turnOffAwayOrFail();
          _0x45e6ff = 1;
        }
        let _0x545aff = document.getElementById("textEntryEditable").getBoundingClientRect().width;
        let _0xb36fa6 = getTextWidth(document.getElementById("textEntryEditable").innerHTML, "bold 15px arial");
        if (document.getElementById("scroller")) {
          document.getElementById("scroller").style.display = _0xb36fa6 / _0x545aff >= 3 ? "none" : "block";
        }
      }, false);
      _0x482cf5.addEventListener("blur", function (_0x4539c5) {
        _0x1ea8ca = 0;
        if (userFlags & NamePowers.typing) {
          _0x5ddb71();
        }
      }, false);
    }
    document.body.style.display = "block";
    _0x21fe40.onscroll = _0x3e1b65 => {
      _0x1ea8ca = _0x21fe40.scrollTop + 40 >= _0x21fe40.scrollHeight - _0x21fe40.offsetHeight ? 0 : _Activity.instance.TickFPS * 5;
    };
    if (_0x2a0e2f) {
      _0x204c39.style.top = "0px";
    } else {
      _0x204c39.style.top = document.getElementById("titleBar").clientHeight + "px";
      _0x204c39.style.bottom = document.getElementById("footer").clientHeight + "px";
      document.getElementById("openSmilies").onclick = function () {
        messages.clickSmilieOpen();
      };
    }
    _0x204c39.clientWidth;
    TranslateAll();
  };
  this.setUpReactionsSelector = () => {
    function _0xe88ade() {
      const _0x5040d1 = document.querySelector("#reactionsSelector");
      const _0x1fa9a5 = _0x5040d1.querySelector("[data-target=\"reactions\"]");
      (function () {
        const _0x41980f = document.getElementById("searchSmilies");
        const _0x44ccaf = document.querySelector("#reactionsSelector");
        const _0x315e01 = _0x44ccaf.querySelectorAll("#smiliesAll .box");
        if (_0x41980f && _0x41980f.value !== "") {
          _0x41980f.value = "";
          _0x315e01.forEach(_0x35c14b => {
            if (!_0x35c14b.classList.contains("flix")) {
              _0x35c14b.style.display = "flex";
            }
          });
        }
      })();
      _0x5040d1.scrollTop = 0;
      _0x5040d1.classList.add("closed");
      _0x1fa9a5.style.display = "block";
      _0x1fa9a5.click();
    }
    function _0x33f04e(_0x10b58b) {
      const _0x5dd698 = _0x10b58b ?? localStorage.getItem("recentReactions")?.split(",") ?? [];
      const _0xdcf3e8 = document.querySelector("#reactionsSelector #recent");
      _0xdcf3e8.innerHTML = "";
      if (_0x5dd698.length) {
        _0xdcf3e8.style.display = "flex";
        document.querySelector("#reactionsSelector .title").style.display = "flex";
        document.querySelectorAll("#reactionsSelector .title")[1].style.display = "flex";
        _0x5dd698.forEach(_0x1bd03d => {
          _Activity.instance.Smilies.MakeSmiley(makeElement(_0xdcf3e8, "div", "box"), _0x1bd03d, {
            size: 20,
            scrollParent: _0x28ccfd,
            tooltipPosition: "low",
            callback: () => {
              ToC({
                Command: "DoReaction",
                Reaction: _0x1bd03d,
                MsgId: _0x44d25c,
                reactionId: Math.random().toString(36).substr(2, 9)
              }, true);
              _0xe88ade();
              _0x44d25c = null;
            }
          });
        });
      } else {
        _0xdcf3e8.style.display = "none";
        document.querySelector("#reactionsSelector .title").style.display = "none";
        document.querySelectorAll("#reactionsSelector .title")[1].style.display = "none";
      }
    }
    _0x5c21c8 = [];
    const _0x3a441e = localStorage.getItem("recentReactions")?.split(",") ?? [];
    const _0x28ccfd = document.querySelector("#reactionsSelector");
    const _0x1679b5 = _0x28ccfd.querySelector("#smiliesAll");
    const _0x3b2668 = _0x28ccfd.querySelectorAll("[data-target]");
    const _0x37dda6 = document.getElementById("searchSmilies");
    if (_0x37dda6) {
      _0x37dda6.addEventListener("input", function () {
        const _0x241277 = this.value.toLowerCase();
        _0x1679b5.querySelectorAll(".box").forEach(_0x3ad0c6 => {
          const _0x389ab8 = _0x3ad0c6.querySelector("span").getAttribute("data-sm")?.toLowerCase();
          _0x3ad0c6.style.display = _0x389ab8.includes(_0x241277) ? "flex" : "none";
        });
      });
    }
    _0x3b2668.forEach(_0x223926 => {
      _0x223926.addEventListener("click", _0x293a72 => {
        const _0x2aebdc = _0x28ccfd.querySelector("li.active");
        const _0x2735fb = _0x28ccfd.querySelector("[data-tab=\"" + _0x223926.dataset.target + "\"]");
        const _0x3ce6ed = _0x28ccfd.querySelector("[data-tab=\"" + _0x2aebdc.dataset.target + "\"]");
        if (_0x223926 != _0x2aebdc) {
          _0x223926.className = "active";
          _0x2aebdc.className = "";
          _0x2735fb.className = "";
          _0x3ce6ed.className = "hidden";
        }
      });
    });
    _0x33f04e();
    document.addEventListener("click", _0x338df1 => {
      if (_0x28ccfd.className) {
        return;
      }
      let _0x1b04a4 = !1;
      let _0x347b1e = _0x338df1.target;
      do {
        if (_0x347b1e == _0x28ccfd) {
          _0x1b04a4 = !0;
          break;
        }
        _0x347b1e = _0x347b1e.parentNode;
      } while (_0x347b1e);
      if (!_0x1b04a4) {
        _0xe88ade();
      }
    });
    REACTIONS.forEach(_0x59971f => {
      _Activity.instance.Smilies.MakeSmiley(makeElement(_0x1679b5, "div", "box"), _0x59971f, {
        size: 20,
        tooltipPosition: "low",
        scrollParent: _0x28ccfd,
        callback: () => {
          ToC({
            Command: "DoReaction",
            Reaction: _0x59971f,
            MsgId: _0x44d25c,
            reactionId: Math.random().toString(36).substr(2, 9)
          }, !0);
          if (_0x3a441e.length >= 6 && !_0x3a441e.includes(_0x59971f)) {
            _0x3a441e.shift();
          }
          if (!_0x3a441e.includes(_0x59971f)) {
            _0x3a441e.push(_0x59971f);
          }
          _0x33f04e(_0x3a441e);
          if (_Activity.instance.IsClassic || !_Activity.instance.IsClassic && localStorage.getItem("mobCookies") == 1) {
            localStorage.setItem("recentReactions", _0x3a441e.join(","));
          }
          _0xe88ade();
          _0x44d25c = null;
        }
      });
    });
  };
  this.doAutoComplete = function (_0x517454, _0x45ceb6 = null) {
    clearTimeout(_0x470470);
    const _0x5f2b4b = _Activity?.instance;
    let {
      textContent: _0x3cf69a
    } = _0x517454?.target;
    if (_0xd14e69) {
      if (_0x3cf69a?.length && _0x3cf69a.indexOf("(") !== -1 && _0x5f2b4b?.UserSettings?.autocomplete !== "disable") {
        _0x470470 = setTimeout(() => {
          _0x3cf69a = _0x3cf69a.toLowerCase();
          _0x3cf69a = _0x3cf69a.replace(/\)\(/g, ") (");
          const _0x269545 = _0x3cf69a.match(/\((?!\s)([^)]*)$/);
          if (!_0x269545 || !_0x269545[1].length) {
            _0x1340c8.resetAutoComplete();
            return;
          }
          let _0x17cbef = _0x269545[1];
          if (_0x17cbef.includes(" ")) {
            _0x17cbef = _0x17cbef.split(" ")[0];
          }
          const _0x58b5c3 = {
            o: _0x5f2b4b?.SOTH,
            isObject: false
          };
          const _0xf0c19b = {
            o: _0x5f2b4b?.SYEL,
            isObject: false
          };
          const _0x5b60d4 = [];
          const _0x2c7019 = {
            soth: _0x58b5c3,
            syel: _0xf0c19b,
            topshPssa: {
              o: returnOwnedPowers(),
              isObject: false
            }
          };
          for (const _0x241415 in _0x2c7019) {
            let {
              o: _0xb3eb32,
              isObject: _0x29a96d
            } = _0x2c7019[_0x241415];
            if (_0xb3eb32) {
              _0xb3eb32 = _0x29a96d ? Object.keys(_0xb3eb32) : _0xb3eb32;
              _0x5b60d4.push(..._0x1340c8.filterArray(_0xb3eb32, _0x17cbef));
            }
          }
          if (!_0x5b60d4.length) {
            _0x1340c8.resetAutoComplete();
            return;
          }
          const _0x4fd79d = _0x45ceb6 || document.getElementById("textEntryEditable");
          const _0x48b7fc = document.getElementById("textEntryEditable");
          if (_0x4fd79d && _0x48b7fc) {
            let _0x1e1d3c = document.getElementById("pmWrapper")?.clientWidth || 0;
            if (_0x1e1d3c > 0) {
              _0x1e1d3c += 10;
            }
            _0xd14e69.style.width = _Activity.IsClassic ? _0x48b7fc.clientWidth + _0x1e1d3c + "px" : "100%";
            if (!_0x2a0e2f) {
              let _0x3c415c = 0;
              let _0x141613 = 0;
              let _0xa19dc9 = 0;
              let _0x589b8e = 0;
              let _0x560457 = 0;
              let _0x4d3855 = 0;
              let _0x225392 = null;
              _0xd14e69.addEventListener("touchstart", _0x2b1467 => {
                _0x3c415c = _0x2b1467.touches[0].clientY;
                _0x141613 = _0xd14e69.scrollTop;
                _0x560457 = Date.now();
                if (_0x225392 !== null) {
                  cancelAnimationFrame(_0x225392);
                  _0x225392 = null;
                }
                _0x2b1467.stopPropagation();
              });
              _0xd14e69.addEventListener("touchmove", _0x465618 => {
                _0x465618.preventDefault();
                _0x465618.stopPropagation();
                const _0x565b = _0x465618.touches[0].clientY;
                const _0x3a67e7 = _0x3c415c - _0x565b;
                _0xd14e69.scrollTop = _0x141613 + _0x3a67e7;
              });
              _0xd14e69.addEventListener("touchend", _0x5f1d54 => {
                _0xa19dc9 = _0x3c415c - (_0xd14e69.scrollTop - _0x141613);
                _0x589b8e = Date.now();
                const _0x264bef = _0x589b8e - _0x560457;
                if (_0x264bef > 0) {
                  _0x4d3855 = (_0x3c415c - _0xa19dc9) / _0x264bef;
                  if (Math.abs(_0x4d3855) > 0.05) {
                    const _0x422cad = _0x4d3855 * 500;
                    const _0xe22ea9 = Date.now();
                    const _0x4e52fe = _0xd14e69.scrollTop;
                    const _0x1f11ea = () => {
                      const _0x2d5354 = Date.now() - _0xe22ea9;
                      const _0x463b39 = _0x422cad * Math.exp(-_0x2d5354 / 325);
                      if (Math.abs(_0x463b39) > 0.5) {
                        _0xd14e69.scrollTop = _0x4e52fe + _0x422cad * (1 - Math.exp(-_0x2d5354 / 325));
                        _0x225392 = requestAnimationFrame(_0x1f11ea);
                      } else {
                        _0x225392 = null;
                      }
                    };
                    _0x225392 = requestAnimationFrame(_0x1f11ea);
                  }
                }
              });
              _0xd14e69.style.webkitOverflowScrolling = "touch";
              _0xd14e69.style.overflowY = "auto";
              _0xd14e69.style.maxHeight = "200px";
            }
          }
          _0xd14e69.classList.remove("d-none");
          _0xd14e69.scrollTop = 0;
          _0xd14e69.innerHTML = "";
          _0x1340c8.displaySmiliesInAutoComplete(_0x17cbef, _0x5b60d4, _0x4fd79d);
        }, 300);
      } else {
        _0x1340c8.resetAutoComplete();
      }
    }
  };
  this.resetAutoComplete = () => {
    if (_0xd14e69) {
      _0xd14e69.classList.add("d-none");
      _0xd14e69.innerHTML = "";
    }
  };
  this.displaySmiliesInAutoComplete = (_0x53b9b0, _0x5b6bae, _0x55ae84) => {
    for (let _0x4dd156 in _0x5b6bae) {
      const _0x3d1dc8 = makeElement(_0xd14e69, "div", "", "sm");
      const _0x2b9574 = makeElement(_0x3d1dc8, "div", "cell acImage");
      const _0xf465f1 = {
        size: 20,
        align: !0,
        callback: () => {}
      };
      _Activity.instance.Smilies.MakeSmiley(_0x2b9574, _0x5b6bae[_0x4dd156], _0xf465f1);
      makeElement(_0x3d1dc8, "div", "cell").innerText = _0x5b6bae[_0x4dd156];
      _0x3d1dc8.addEventListener("click", () => {
        _0x55ae84.innerHTML = _0x55ae84.innerHTML.replace(new RegExp("\\(" + _0x53b9b0 + "(?!.*\\))", "gi"), "(" + _0x5b6bae[_0x4dd156] + ")");
        const _0x5bcb2b = "(" + _0x5b6bae[_0x4dd156] + ")";
        const _0x314442 = _0x55ae84.innerHTML.lastIndexOf(_0x5bcb2b) + _0x5bcb2b.length;
        _0xd14e69.scrollTop = 0;
        _0xd14e69.classList.add("d-none");
        _0xd14e69.innerHTML = "";
        focusAndPutCaretAtPosition(_0x55ae84, _0x314442);
      });
    }
  };
  this.filterArray = (_0x2cb84d, _0x287623) => _0x2cb84d.filter(_0x360736 => _0x360736.includes(_0x287623));
  this.addToTextEntry = function (_0x5a6a9f) {
    document.getElementById("textEntryEditable").textContent += _0x5a6a9f;
  };
  this.sendMessage = function (_0x2e467f, _0x39787a = false) {
    if (_Activity.instance.clickedTickleTab) {
      return;
    }
    let _0x1a695b;
    let _0x3cd522 = _0x2e467f.includes("giphy.com/media");
    let _0x5f04c1 = window.devicePixelRatio || 1;
    if (_0x39787a && _0x2fc4c8 && _0x2e467f[0] != "/") {
      _0x1a695b = {
        Command: "EditMsg",
        NewMsg: _0x2e467f,
        MsgId: _0x2fc4c8,
        RoomId: _0x190d2a
      };
    } else {
      if (_0x3cd522 && _0x2e467f.includes("(")) {
        _0x2e467f = (_0x2e467f = _0x2e467f.split("("))[0] + " (" + _0x2e467f[1];
      }
      if (_0x3cd522 && _0x2e467f.includes(")")) {
        _0x2e467f = (_0x2e467f = _0x2e467f.split(")"))[0] + ") " + _0x2e467f[1];
      }
      if ((_0x5f04c1 >= 2 || !_Activity.instance.IsClassic) && (_0x2e467f.startsWith("/hug") || _0x2e467f.startsWith("/jinx"))) {
        let _0x23af22 = GetTranslation("mob2.nomobilehugs");
        _0x23af22 ||= "Hugs and Jinxes are currently unavailable on mobile.";
        this.sendHelpMsg(9999999, "<inf8> " + _0x23af22, "Warning", true);
        return;
      }
      _0x1a695b = {
        Type: "Send",
        Message: _0x2e467f,
        Command: "Send",
        Page: "messages",
        msgId: _0x2e467f[0] != "/" ? Math.random().toString(36).substr(2, 9) : ""
      };
    }
    ToC(_0x1a695b, !0);
  };
  _Activity.instance.TickQueue.push(function () {
    if (_0x397431 != _0x204c39.clientHeight) {
      _0x397431 = _0x204c39.clientHeight;
      _0x1ea8ca = 0;
    }
    if (_0x45e6ff > 0 && config.pFlags & NamePowers.away && config.pFlags & NamePowers.hasdays && config.NotLoggedIn == "") {
      _0x45e6ff++;
      let _0x1cfae5 = xInt(Macros.away) * _Activity.instance.TickFPS;
      if (_0x1cfae5 < _Activity.instance.TickFPS * 60) {
        _0x1cfae5 = _Activity.instance.TickFPS * 300;
      } else if (_0x1cfae5 > _Activity.instance.TickFPS * 3600) {
        _0x1cfae5 = _Activity.instance.TickFPS * 3600;
      }
      if (_0x45e6ff == _0x1cfae5) {
        _0x45e6ff = 1;
        if (!_Activity.instance.IsAway) {
          _Activity.instance.IsAway = true;
          messages?.sendMessage("/away");
        }
      }
    }
    if (_0x33db5d > 1 && --_0x33db5d == 1) {
      messages?.sendMessage("/RTypeOff");
    }
  });
  this.scrollMessages = function (_0x4e93a9 = false) {
    if (!_0x4e93a9 && (this.editMode || _0x1ea8ca > 0)) {
      return;
    }
    let _0x17da6e = _0x204c39.clientHeight - document.getElementById("messages").clientHeight - 12;
    if (_0x17da6e < 0) {
      _0x17da6e = 0;
    }
    _0x21fe40.style.top = _0x17da6e + "px";
    _0x21fe40.scrollTop = _0x21fe40.scrollHeight;
  };
  function _0x4a6344() {
    ToC({
      Command: "EditToggle",
      Next: "chats"
    });
  }
  function _0x1bc0de() {
    ToC({
      Command: "",
      Next: "visitors"
    });
  }
  function _0xddef5b() {
    const _0x1a79e1 = document.getElementById("visitorsOverlay");
    const _0x3457b9 = document.querySelectorAll(".hugFrame");
    if (_0x3457b9.length && _0x1a79e1) {
      const _0x18ecea = window.getComputedStyle(_0x1a79e1).display === "none" ? "4.5rem" : "3.5rem";
      _0x3457b9.forEach(_0x27fec3 => {
        _0x27fec3.style.maxHeight = _0x18ecea;
      });
    }
  }
  this.doBump = (_0x5a6869, _0x2d8eab) => {
    setTimeout(() => {
      const _0x34b893 = document.getElementById(config.MyId + "_" + _0x5a6869);
      if (_0x34b893) {
        _0x34b893.querySelector(".svgBack").style.backgroundImage = "url('svg/bubble3.svg')";
      }
    }, 10);
    if (_0x2d8eab) {
      zapShake(true);
    }
  };
  this.DoZap = _0x47e861 => {
    zapShake(!1, _0x47e861);
  };
  this.deleteMsg = _0xbe7fc5 => {
    _0x3c7363(_0xbe7fc5);
  };
  this.unReactMsg = _0x63b890 => {
    const {
      msgId: _0x54416b,
      reaction: _0x1e18f7,
      reactionId: _0x4345e6,
      userId: _0x43a0d7
    } = JSON.parse(_0x63b890);
    const _0x19d3c5 = document.querySelector("[data-msgId=\"" + _0x54416b + "\"]");
    if (_0x19d3c5) {
      let _0x2d2163 = null;
      const _0xcfe644 = _0x19d3c5.querySelector(".reactions");
      const _0x2ae632 = _0xcfe644?.querySelectorAll(".reaction");
      if (_0x2ae632 && _Activity.instance.Reactions.find(_0x5cdba6 => _0x5cdba6.reactionId == _0x4345e6)) {
        _Activity.instance.Reactions = _Activity.instance.Reactions.filter(_0x4382cb => _0x4382cb.reactionId != _0x4345e6);
        for (let _0x19f067 = 0; _0x19f067 < _0x2ae632.length; _0x19f067++) {
          _0x2d2163 = _0x2ae632[_0x19f067];
          if (_0x2d2163.dataset.reaction == _0x1e18f7) {
            const _0x5985a0 = _0x2d2163.querySelector(".num");
            const _0x287566 = xInt(_0x5985a0.innerText) - 1;
            _0x5985a0.innerText = _0x287566;
            if (_0x287566 < 1) {
              _0xcfe644.removeChild(_0x2d2163);
              if (!_0xcfe644.querySelectorAll(".reaction").length) {
                _0xcfe644.parentNode.removeChild(_0xcfe644);
              }
            } else if (_0x43a0d7 == config.MyId) {
              _0x2d2163.style.borderColor = "rgba(255, 255, 255, 0)";
              addToolTip(_0x2d2163, ["mob2.react", "React"], {
                position: "low"
              });
              _0x2d2163.onclick = () => {
                ToC({
                  Command: "DoReaction",
                  Reaction: _0x1e18f7,
                  MsgId: _0x54416b,
                  reactionId: Math.random().toString(36).substr(2, 9)
                }, true);
              };
            }
            return;
          }
        }
      }
    }
  };
  this.reactMsg = _0x3ed8ad => {
    const {
      msgId: _0x1fc267,
      reaction: _0xcff4c5,
      reactionId: _0x497651,
      userId: _0x962d66
    } = JSON.parse(_0x3ed8ad);
    if (_Activity.instance.Reactions.find(_0x78422d => _0x78422d.reactionId == _0x497651)) {
      return;
    }
    const _0x225b0d = document.querySelector("[data-msgId=\"" + _0x1fc267 + "\"]");
    if (_0x225b0d) {
      let _0x4dda26 = null;
      const _0x25aa39 = _0x225b0d.querySelector(".reactions") ?? makeElement(_0x225b0d, "div", "reactions");
      const _0x29fd62 = _0x25aa39.querySelectorAll(".reaction");
      const _0x51ba0c = _0x225b0d.querySelectorAll("img");
      let _0x2ced94 = null;
      var _0x46e656 = 0;
      _0x51ba0c.forEach(_0x35dca3 => {
        if (_0x35dca3.closest("span.messageSm.big") && _0x35dca3.height > _0x46e656) {
          _0x46e656 = _0x35dca3.height;
          _0x2ced94 = _0x35dca3;
        }
      });
      if (_0x46e656 > 0 && _0x2ced94) {
        const _0x7f38a4 = 15;
        const _0x36f65c = 6;
        const _0x104dff = _0x2ced94.height - 40 + xInt(_0x2ced94.style.top);
        const _0x510097 = Math.min(_0x7f38a4, Math.max(_0x36f65c, _0x104dff));
        _0x25aa39.style.paddingTop = _0x510097 + "px";
      }
      _Activity.instance.Reactions.push(JSON.parse(_0x3ed8ad));
      if (_0x29fd62.length) {
        for (let _0xa90c04 = 0; _0xa90c04 < _0x29fd62.length; _0xa90c04++) {
          _0x4dda26 = _0x29fd62[_0xa90c04];
          if (_0x4dda26.dataset.reaction == _0xcff4c5) {
            const _0x43eece = _0x4dda26.querySelector(".num");
            const _0xc64f05 = xInt(_0x43eece.innerText) + 1;
            _0x43eece.innerText = _0xc64f05;
            if (_0xc64f05 < 1) {
              _0x25aa39.removeChild(_0x4dda26);
              if (!_0x25aa39.querySelectorAll(".reaction").length) {
                _0x25aa39.parentNode.removeChild(_0x25aa39);
              }
            } else if (_0x962d66 == config.MyId) {
              _0x4dda26.onclick = () => {
                ToC({
                  Command: "UndoReaction",
                  reactionId: _0x497651
                }, true);
              };
              _0x4dda26.style.borderColor = "rgba(255, 255, 255, .7)";
              addToolTip(_0x4dda26, ["mob2.unreact", "Remove Reaction"], {
                position: "low"
              });
            }
            return;
          }
        }
      }
      const _0x3626e1 = {
        size: 20,
        callback: () => {}
      };
      _0x4dda26 = makeElement(_0x25aa39, "span", "reaction");
      _Activity.instance.Smilies.MakeSmiley(_0x4dda26, _0xcff4c5, _0x3626e1);
      _0x4dda26.onclick = () => {
        if (_0x962d66 == config.MyId) {
          _0x4dda26.style.borderColor = "rgba(255, 255, 255, 0)";
          ToC({
            Command: "UndoReaction",
            reactionId: _0x497651
          }, true);
        } else if (config.pFlags & NamePowers.hasdays) {
          ToC({
            Command: "DoReaction",
            Reaction: _0xcff4c5,
            MsgId: _0x1fc267,
            reactionId: Math.random().toString(36).substr(2, 9)
          }, true);
        }
      };
      _0x4dda26.dataset.reaction = _0xcff4c5;
      makeElement(_0x4dda26, "span", "num").innerText = 1;
      if (_0x962d66 == config.MyId) {
        _0x4dda26.style.borderColor = "rgba(255, 255, 255, .7)";
        addToolTip(_0x4dda26, ["mob2.unreact", "Remove Reaction"], {
          position: "low"
        });
      } else if (config.pFlags & NamePowers.hasdays) {
        addToolTip(_0x4dda26, ["mob2.react", "React"], {
          position: "low"
        });
      } else {
        _0x4dda26.style.cursor = "default";
      }
      if (_0x1ea8ca === 0 || !_0x225b0d.nextSibling && _0x962d66 == config.MyId) {
        _0x1ea8ca = 0;
        messages.scrollMessages(true);
      }
    }
  };
  this.turnOffAwayOrFail = () => {
    if (_Activity.instance.IsAway && userFlags & NamePowers.away && userFlags & NamePowers.hasdays) {
      _Activity.instance.IsAway = false;
      messages?.sendMessage("/back");
    }
  };
  this.limitMessages = _0x9ef37e => {
    const _0xda8b51 = document.getElementById("messages");
    const _0x34898 = [..._0xda8b51.childNodes];
    const _0x2fbfc5 = _0x34898.length;
    if (!(_0x2fbfc5 <= _0x9ef37e)) {
      _0x34898.slice(0, _0x2fbfc5 - _0x9ef37e).forEach(_0xda8b51.removeChild.bind(_0xda8b51));
    }
  };
  this.getAvatarSize = function (_0x3b88be, _0x57c14e) {
    if (_0x57c14e || _0x3b88be[0] == "<" || _0x3b88be[0] == "(") {
      return 80;
    } else {
      return 30;
    }
  };
  this.addMessage = function (_0x36ef5f) {
    let _0x5baf11 = !1;
    const _0x5e9386 = JSON.parse(_0x36ef5f);
    let _0x4fad4e;
    let _0x38619e = _0x5e9386.text;
    if (_0x244e33) {
      let _0x1b7e6e = _0x38619e.match(/kk([a-z0-9]*)/i);
      if (_0x1b7e6e && _0x1b7e6e[1]) {
        _0x244e33 = _0x1b7e6e[1].charAt(0).toUpperCase() + _0x1b7e6e[1].substr(1);
        2;
      }
    }
    if (_0x5e9386.ignored) {
      _0x3c7363(_0x5e9386.i);
      return;
    }
    if (xInt(_0x5e9386.pFlags) & 268435456 && !_0x5e9386?.registered?.length && _Activity.instance.QuickBar?.hasGiphyLinkInText(_0x38619e.toLowerCase())) {
      _0x3c7363(_0x5e9386.i);
      if (parseInt(_0x5e9386.id) == parseInt(config.MyId)) {
        let _0x306990 = GetTranslation("mob2.unregcannotusegifs");
        _0x306990 ||= "Unregistered users cannot send GIFS. If you wish to send gifs in chat, register an account now!";
        this.sendHelpMsg(_0x5e9386.i, "<inf8> " + _0x306990, "Warning", !0);
      }
      return;
    }
    let _0x402354 = null;
    _0x4fad4e = document.getElementById("id_message_" + _0x5e9386.i);
    if (_0x4fad4e) {
      _0x402354 = _0x4fad4e.querySelector(".reactions");
      _0x4fad4e.innerHTML = "";
    } else {
      var _0x2bae9b = document.getElementById("messages");
      _0x4fad4e = makeElement(_0x2bae9b, "li", "message");
    }
    _0x4fad4e.setAttribute("data-msgId", _0x5e9386.msgId ?? "");
    const _0x1beab6 = _0x4fad4e.pFlags = xInt(_0x5e9386.pFlags);
    const _0x222ff1 = _0x4fad4e.pFlags2 = xInt(_0x5e9386.pFlags2);
    if (_0x222ff1 & NamePowers.isBlocked) {
      _0x4fad4e.style.opacity = 0.5;
    }
    iidLine++;
    _0x4fad4e.setAttribute("data-line", iidLine);
    _0x4fad4e.setAttribute("user-id", _0x5e9386.id);
    _0x4fad4e.setAttribute("data-msgTime", !_0x5e9386.isEdited && _0x5e9386.Time > 0 ? _0x5e9386.Time : 0);
    try {
      const _0x2c8890 = btoa(unescape(encodeURIComponent(_0x38619e)));
      _0x4fad4e.setAttribute("data-msg-ec", _0x2c8890);
    } catch (_0x475261) {}
    const _0xe395d9 = _0x5e9386.id;
    let _0x1a02ed;
    _0x4fad4e.id = "id_message_" + _0x5e9386.i;
    const _0x2d870f = _0x38619e.substring(0, 5) === "<h>;=";
    if (!_Activity.instance.IsClassic && _0x2d870f) {
      if (_0x38619e.split(";=")[1] < 100000) {
        _0x4fad4e.remove();
        return;
      }
    }
    _0x5e9386.image ||= "(smile#)";
    if (_0x5e9386.image && _0x5e9386.image.substr(-1) == "#") {
      let _0x36e420 = _0x5e9386.image?.split("#").filter(_0x9719c7 => _0x9719c7.length > 0);
      _0x5e9386.image = _0x36e420.join("#");
    }
    if (_Activity.instance.UserSettings.stickers !== "disable") {
      const _0x544f0e = _0x38619e.match(/^\(\uFEFF([0-9a-zA-Z]{2,}\.[^)]*?)\)(.*)$/i);
      if (_0x544f0e && _0x544f0e.length === 3) {
        _0x38619e = _0x544f0e[2];
        _0x1a02ed = _0x544f0e[1].split("#");
        if (_0x1a02ed.length > 2) {
          _0x1a02ed[1] = _0x1a02ed.slice(1).join("#");
        }
      } else {
        _0x1a02ed = null;
      }
    }
    let _0x346d42;
    if (_0x5e9386.id == config.MyId && _0x5e9386.registered && _0x5e9386.registered.length > 0) {
      _0x5e9386.xme = _0x5e9386.registered;
    }
    let _0x3a58aa = null;
    const _0x53763a = _0x222ff1 & NamePowers.zoom || config.pFlags2 & NamePowers.zoom;
    if (!_0x2d870f) {
      if (_0x1a02ed) {
        _0x346d42 = "message messageSticker";
        var _0x11582e = makeElement(_0x4fad4e, "iframe", "stickerFrame");
        _0x11582e.style.float = "left";
        var _0x461d17 = _0x1a02ed[0].replace(/[^0-9a-zA-Z]/g, "_").toLowerCase();
        _0x11582e.src = "https://xat.com/web_gear/chat/sticker.php?Ju77&s=" + _0x461d17 + (_0x1a02ed[1] ? "#" + encodeURIComponent(_0x1a02ed[1]) : "");
        let _0x1307e8 = _0x1a02ed[0];
        if (_0x1a02ed[1]) {
          _0x1307e8 += "#" + _0x1a02ed[1];
        }
        addToolTip(_0x11582e, "(" + _0x1307e8 + ")", {
          select: !0,
          position: "low"
        });
      } else if (_0x222ff1 & NamePowers.xavi && _0x5e9386.id != 0 && _Activity.instance.UserSettings.xavi != "disable") {
        _0x4fad4e.classList.add("hasXavi");
        if (_0x53763a) {
          makeElement(_0x4fad4e, "span", "avZoomArea");
        }
        _0x3a58aa = loadXavi(_0x4fad4e, _0x5e9386.id, _0x38619e, _0x222ff1 & NamePowers.isBot, _0x5e9386.cb, _0x5e9386.PowerO, _0x5e9386.Powers);
      } else {
        const _0x5c3c4a = "messageAvatar" + (_0x1beab6 & NamePowers.hasprofile && _0x5e9386.image.toLowerCase().indexOf("#noshadow") == -1 ? " avShadow" : "");
        let _0x659ee3;
        if (_0x53763a) {
          _0x659ee3 = makeElement(_0x4fad4e, "span", "avZoomArea");
        }
        const _0x5371e8 = _0x53763a ? makeElement(_0x4fad4e, "div", "avZoom") : _0x4fad4e;
        const _0x189b38 = this.getAvatarSize(_0x5e9386.image, _0x53763a);
        _0x3a58aa = _Activity.instance.Avatars.MakeAvatar(_0x5371e8, _0x5e9386.image, {
          size: _0x189b38,
          userId: _0xe395d9,
          userName: _0x5e9386.registered,
          hasAnimate: _0x1beab6 & NamePowers.animate,
          uniqueId: _0x5e9386.msgId,
          hasShuffle: _0x1beab6 & NamePowers.shuffle,
          className: _0x5c3c4a,
          avatarEffect: _0x5e9386.avatarEffect ?? "",
          callbackTarget: _0x659ee3 ?? _0x5371e8.toLowerCase,
          tooltip: ["box.140", "view xat.me"]
        });
      }
      _0x5e9386.name ||= _0xe395d9;
      var _0x282dad = makeElement(_0x4fad4e, "p");
      _0x282dad.onclick = _0x273ee0 => {
        if (_0x273ee0.ctrlKey) {
          messages.sendApp("rapid", _0xe395d9);
        } else {
          messages.sendApp(0, _0xe395d9);
        }
      };
      _0x282dad.style.cursor = "pointer";
      _0x282dad.className = "messagesName";
      const _0x110552 = createNameSm(_0x282dad, _0x5e9386.name, {
        flags: _0x5e9386.pFlags | NamePowers.nospace,
        pawn: _0x5e9386.pawn,
        userId: _0xe395d9,
        userName: _0x5e9386.registered,
        className: "userNick",
        isName: !0
      });
      if (!_0x5e9386.pawn) {
        _0x110552.style.marginLeft = "0.25rem";
      }
      if (_0x5e9386.id != 0) {
        let _0x4a4761 = !0;
        let _0xcfa1fa = getTooltipInfo(_0x5e9386);
        if (_0x5e9386.id == config.MyId || _0x5e9386.id == "2") {
          _0x4a4761 = false;
        }
        let _0x6c6d3e = _0x282dad.getElementsByClassName("userNick")[0];
        const _0xa8c2dd = {
          showRapid: _0x4a4761
        };
        addToolTip(_0x6c6d3e, _0xcfa1fa, _0xa8c2dd);
      }
    }
    const _0x10ab40 = makeElement(_0x4fad4e, "p");
    _0x10ab40.className = "messagesMessage";
    if (_0x5e9386.msgId) {
      const _0x37c0fc = makeElement(_0x10ab40, "div");
      _0x37c0fc.className = "editContainer";
      const _0x43533d = makeElement(_0x37c0fc, "span");
      _0x43533d.className = "editBlock";
      _0x43533d.id = "editBlock" + _0x5e9386.msgId;
      _0x43533d.contentEditable = !0;
      _0x43533d.innerText = _0x38619e;
      this.addEditListeners(_0x43533d, _0x4fad4e);
      const _0x2d0a82 = makeElement(_0x37c0fc, "a", "editSend");
      const _0x583c38 = makeElement(_0x2d0a82, "img", "editSendImg");
      _0x583c38.src = "svg/check" + (toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg";
      _0x583c38.width = "14";
      const _0xf4588b = makeElement(_0x37c0fc, "a", "editClose");
      const _0x593ba3 = makeElement(_0xf4588b, "img", "editCloseImg");
      _0x593ba3.src = "svg/remove" + (toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg";
      _0x593ba3.width = "12";
    }
    var _0x4becc9;
    var _0xf1865e;
    _0x4becc9 = _0x38619e;
    _0xf1865e = "֑-߿‏‫‮יִ-﷽ﹰ-ﻼ";
    if (new RegExp("^[^" + _0xf1865e + "]*?[" + _0xf1865e + "]").test(_0x4becc9) && _0x38619e[0] != "<") {
      _0x10ab40.style.direction = "rtl";
    }
    if (_0x5e9386.Time && _0x5e9386.id == 0) {
      setTimeout(() => {
        if (_0x2bae9b?.contains(_0x4fad4e)) {
          _0x2bae9b.removeChild(_0x4fad4e);
        }
      }, 10000);
    }
    _0x5e9386.id;
    config.MyId;
    let _0x3adb86 = 2;
    if (_0xe395d9 == 0) {
      _0x3adb86 |= 134217728;
    }
    if (_0x5e9386.flip) {
      _0x10ab40.className += " flipMe";
    }
    let _0x69ba4f = null;
    const _0x51f340 = _0xe395d9 === config.MyId;
    if (_0x222ff1 & NamePowers.istickle) {
      _0x10ab40.className = "chatsMinsAgo";
      const _0x40ee8c = GetTimeToGo(_0x38619e * 1000);
      _0x10ab40.dataset.dataSec = GetTimeToGo(_0x38619e * 1000, !1, !0);
      addText(_0x10ab40, _0x40ee8c);
    } else if (_0x2d870f) {
      this.handleHugs(_0x4fad4e, _0x38619e, _0xe395d9, _0x5e9386.i);
    } else {
      _0x38619e = _0x38619e.replace(/\s\s+/g, " ");
      _0x69ba4f = createTextSm(_0x10ab40, _0x38619e, {
        flags: _0x3adb86,
        userId: _0xe395d9,
        userName: _0x5e9386.registered,
        hasBig: !!_0x5e9386.Big,
        useMarkdown: !0,
        useLinks: !0,
        useMark: _0x5e9386.id != config.MyId,
        scrollParent: _0x21fe40
      });
      if (_0x69ba4f instanceof Error && _0x69ba4f.code === MessageErrorCodes.LinkInLinkMarkupDetected) {
        if (_0x51f340) {
          _0x38619e = GetTranslation("mob2.linkmarkupfailure");
          _0x38619e ||= "Info: Cannot add a hyperlink, the selected text is already linked to a different URL.";
          this.sendHelpMsg(_0x5e9386.i, "<inf8> " + _0x38619e, "Warning", true);
        } else {
          _0x3c7363(_0x5e9386.i);
        }
        return;
      }
      if (_0x1a02ed) {
        _0x69ba4f.style.width = "calc(100% - 105px)";
      }
      if (_0x5e9386.TransIcon) {
        const _0x561cfa = makeElement(null, "img");
        _0x561cfa.src = "svg/translator.svg";
        _0x561cfa.className = "translateImage";
        _0x561cfa.display = "default";
        _0x69ba4f.prepend(_0x561cfa);
        addToolTip(_0x561cfa, _0x5e9386.OriginalMsg, {
          position: "low"
        });
      }
    }
    if (_0x38619e.substring(0, 2) !== "<i" && _0x5e9386.registered && _0x5e9386.registered.length > 0 && ["enable", "noanimation", "onhover"].indexOf(_Activity.instance.QuickBar?.getGifSettings()) >= 0) {
      _Activity.instance.QuickBar?.renderGif({
        node: _0x10ab40,
        text: _0x38619e,
        shouldScroll: _0x1ea8ca === 0,
        msgId: _0x5e9386.i,
        isSelf: parseInt(_0x5e9386.id) === parseInt(config.MyId),
        showWarning: parseInt(_0x5e9386.Time) >= Math.floor(Date.now() / 1000) - 5
      });
    }
    this.MessagesIntersectionObserver.observe(_0x4fad4e);
    if (config.pFlags & NamePowers.hasdays && !(_0x222ff1 & NamePowers.istickle) && _0xe395d9 != config.MyId && !_0x436e6b(_0x38619e) && _0x38619e?.length >= 2 && !_0x27d093(_0x38619e) && _0x48282e(_0x38619e) && !_0x5e9386.TransIcon && !_0x2d870f) {
      let _0x451a4a = makeElement(_0x4fad4e, "div");
      _0x451a4a.className = "messagesMessage";
      _0x451a4a.style.display = "none";
      let _0x399364 = makeElement(_0x451a4a, "span");
      _0x399364.className = "messageText";
      let _0x3a44eb = makeElement(_0x399364, "img");
      _0x3a44eb.src = "svg/translator.svg";
      _0x3a44eb.className = "translateImage";
      let _0x12cb09 = makeElement(_0x399364, "div");
      addToolTip(_0x451a4a, ["mob2.originalmessage", "Show original message"], {
        position: "low"
      });
      _0x5e9386.pt = _0x451a4a;
      _0x5e9386.transPt = _0x12cb09;
      _0x451a4a.addEventListener("click", () => {
        _0x451a4a.style.display = "none";
        _0x10ab40.style.display = "";
        _0x4fad4e.alreadyTranslated = !1;
      });
    }
    if (_0x402354) {
      _0x4fad4e.appendChild(_0x402354);
    }
    if (_0x5e9386.isEdited) {
      const _0xe4df50 = makeElement(_0x69ba4f, "span", "editedIndicator");
      addText(_0xe4df50, ["mob2.edited", "edited"]);
      const _0x51a57e = _0x5e9386.isEdited.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
      addToolTip(_0xe4df50, "(" + new Date(_0x5e9386.editTime * 1000).toTimeString().split(" (")[0] + ")<hr>" + _0x51a57e, {
        position: "top-tall"
      });
    }
    _0x4fad4e.addEventListener("contextmenu", _0x25b7db => {
      if (!_0x2d870f) {
        _0x25b7db.p = _0x10ab40;
        _0x25b7db.li = _0x4fad4e;
        _0x25b7db.Obj = _0x5e9386;
        window.getSelection()?.removeAllRanges();
        _0x5f2ee9(_0x25b7db);
      }
    });
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      (function (_0x13f84b, _0x50cf77) {
        let _0x9f3904 = null;
        const _0x3ae35c = 500;
        let _0x1f738a = false;
        _0x13f84b.addEventListener("touchstart", _0x3f60c6 => {
          if (!_0x9f3904) {
            _0x1f738a = false;
            _0x9f3904 = setTimeout(() => {
              _0x50cf77(_0x3f60c6);
              _0x1f738a = true;
              if (_Activity.instance.IsIOSApp) {
                window.webkit.messageHandlers.hapticFeedback.postMessage("");
              }
            }, _0x3ae35c);
          }
        });
        _0x13f84b.addEventListener("touchend", _0x37a2ad => {
          if (_0x1f738a) {
            _0x37a2ad.preventDefault();
          }
          clearTimeout(_0x9f3904);
          _0x1f738a = false;
          _0x9f3904 = null;
        });
        _0x13f84b.addEventListener("touchmove", () => {
          clearTimeout(_0x9f3904);
          _0x9f3904 = null;
        });
      })(_0x4fad4e, _0x3b0669 => {
        if (!_0x2d870f) {
          _0x3b0669.p = _0x10ab40;
          _0x3b0669.li = _0x4fad4e;
          _0x3b0669.Obj = _0x5e9386;
          _0x5f2ee9(_0x3b0669);
        }
      });
    }
    if (xInt(_0x5e9386.pFlags) & NamePowers.nolinks && !_0x5e9386.NoWarning && _0xe395d9 != 0 && _0x38619e.substr(0, 6) != "<priv>") {
      let _0x42e9dc = _0x38619e.split(" ");
      for (let _0x4df8e1 = 0; _0x4df8e1 < _0x42e9dc.length; _0x4df8e1++) {
        if (keywords[_0x42e9dc[_0x4df8e1].toLowerCase()] == null) {
          const _0x17d1ef = WordIsLink(_0x42e9dc[_0x4df8e1], undefined, !1, !0);
          if (_0x51f340 && _0x17d1ef && typeof _0x17d1ef != "object" && _0x17d1ef.indexOf("http") != -1) {
            _0x38619e = GetTranslation("mob2.nolinks");
            _0x38619e ||= "Info: Cannot post links as guest.";
            this.sendHelpMsg(_0x5e9386.i, "<inf8> " + _0x38619e, "Warning", true);
            return;
          }
          if (_0x42e9dc[_0x4df8e1].length > 0 && _0x42e9dc[_0x4df8e1].charAt(0) === "%") {
            if (_0x51f340) {
              _0x38619e = GetTranslation("mob2.nochatshortcut");
              _0x38619e ||= "Info: Guests cannot post chat shortcuts. Click $1 to go there.";
              _0x38619e = _0x38619e.replace("$1", _0x42e9dc[_0x4df8e1].toString());
              this.sendHelpMsg(_0x5e9386.i, "<inf8> " + _0x38619e, "Warning", true);
            } else {
              _0x3c7363(_0x5e9386.i);
            }
            return;
          }
        }
      }
    }
  };
  this.handleEditShortCut = () => {
    const {
      MyId: _0x2021e6,
      MyRegName: _0x278e0b
    } = config;
    if (!_0x2021e6 || !_0x278e0b) {
      return;
    }
    const _0x309582 = [...document.querySelectorAll("#messages [user-id=\"" + _0x2021e6 + "\"]")];
    if (!_0x309582.length) {
      return;
    }
    _0x309582.reverse();
    const _0x3d6065 = Date.now() / 1000;
    let _0x9ccded = {};
    for (const _0x1b25d5 of _0x309582) {
      const {
        msgtime: _0x1990ff,
        msgid: _0x48cf57,
        msgEc: _0x3cd4b7
      } = _0x1b25d5.dataset;
      let _0x566289 = "";
      try {
        _0x566289 = decodeURIComponent(escape(atob(_0x3cd4b7)));
      } catch (_0x4c6010) {
        continue;
      }
      if (!_0x1990ff || !_0x48cf57 || !_0x566289 || _0x566289[0] === "<") {
        continue;
      }
      if (_0x3d6065 - Number(_0x1990ff) <= 120) {
        const _0x28bfe6 = {
          msgId: _0x48cf57,
          message: _0x566289,
          node: _0x1b25d5
        };
        _0x9ccded = _0x28bfe6;
        break;
      }
    }
    if (Object.keys(_0x9ccded).length) {
      this.setupEditBlock(_0x9ccded);
    }
  };
  this.setupEditBlock = _0xcdb5e0 => {
    this.editMode = !0;
    const {
      node: _0x1676ca,
      msgId: _0x4d1e2a,
      message: _0xb8f2ef
    } = _0xcdb5e0;
    const _0x4ddc0d = _0x1676ca.querySelector(".messageText");
    const _0x191907 = _0x1676ca.querySelector("#editBlock" + _0x4d1e2a);
    const _0x2636ae = _0x1676ca.querySelector(".editContainer");
    const _0x4adb78 = _0x1676ca.querySelector(".editClose");
    const _0x21574c = _0x1676ca.querySelector(".editSend");
    if (_0x4ddc0d && _0x191907 && _0x2636ae) {
      _0x4ddc0d.style.display = "none";
      _0x2636ae.style.display = "flex";
      _0x191907.innerText = "";
      this.activeEditMessageNode = _0x191907;
      addToTextEntry(_0xb8f2ef, true);
      if (_0x1676ca.nextSibling) {
        _0x1676ca.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });
      } else {
        _0x1ea8ca = 0;
        messages.scrollMessages(true);
      }
      _0x2fc4c8 = _0x4d1e2a;
      _0x190d2a = _0x3e2dd2;
      if (_0x191907.editListener) {
        _0x191907.removeEventListener("keydown", _0x191907.editListener);
      }
      _0x191907.editListener = _0x4812ce => this.handleEditAction(_0x4812ce, _0x191907, _0x4ddc0d, _0x2636ae);
      _0x191907.addEventListener("keydown", _0x191907.editListener);
      _0x191907.addEventListener("keydown", () => {
        textEntryCaretPos = getCaretWithin(_0x191907);
      });
      _0x191907.addEventListener("keyup", () => {
        textEntryCaretPos = getCaretWithin(_0x191907);
      });
      _0x191907.addEventListener("input", _0x1c3916 => {
        const _0x172383 = _0x1c3916?.inputType ?? "";
        if (_0x172383 && ["formatBold", "formatItalic"].indexOf(_0x172383) >= 0) {
          textEntry.innerHTML = _0x1c3916.target.innerText;
        }
        textEntryCaretPos = getCaretWithin(_0x191907);
      });
      _0x191907.addEventListener("click", () => {
        textEntryCaretPos = getCaretWithin(_0x191907);
      });
      if (_0x4adb78) {
        if (_0x4adb78.closeListener) {
          _0x4adb78.removeEventListener("click", _0x4adb78.closeListener);
        }
        _0x4adb78.closeListener = () => {
          if (this.editMode) {
            this.resetEditState(_0x4ddc0d, _0x191907, _0x2636ae, true);
          }
        };
        _0x4adb78.addEventListener("click", _0x4adb78.closeListener);
      }
      if (_0x21574c) {
        if (_0x21574c.sendListener) {
          _0x21574c.removeEventListener("click", _0x21574c.sendListener);
        }
        _0x21574c.sendListener = () => {
          if (this.editMode) {
            this.resetEditState(_0x4ddc0d, _0x191907, _0x2636ae);
          }
        };
        _0x21574c.addEventListener("click", _0x21574c.sendListener);
      }
    }
  };
  this.handleEditAction = (_0x848be1, _0x331f4b, _0x3561d1, _0x903bec) => {
    if (_0x848be1.key === "Enter") {
      _0x848be1.preventDefault();
      this.resetEditState(_0x3561d1, _0x331f4b, _0x903bec);
    } else if (_0x848be1.key === "Escape") {
      _0x848be1.preventDefault();
      this.resetEditState(_0x3561d1, _0x331f4b, _0x903bec, true);
    }
  };
  this.resetEditState = (_0x44251f, _0x373dfc, _0x5a6e54, _0x453519) => {
    if (_0x453519) {
      _0x44251f.style.display = "";
      _0x5a6e54.style.display = "none";
    } else {
      const _0x3811e1 = _0x373dfc.innerText.trim();
      if (!_0x3811e1.length) {
        return;
      }
      if (_0x3811e1.charAt(0) === "/") {
        return this.resetEditState(_0x44251f, _0x373dfc, _0x5a6e54, !0);
      }
      this.sendMessage(_0x3811e1, !0);
    }
    _0x2fc4c8 = null;
    _0x373dfc.removeEventListener("keydown", _0x373dfc.editListener);
    _0x373dfc.editListener = null;
    this.activeEditMessageNode = null;
    setTimeout(() => {
      this.editMode = !1;
      if (textEntry) {
        textEntry.focus();
      }
    }, 5);
  };
  this.addEditListeners = (_0x48ddbf, _0x229c77) => {
    _0x48ddbf.addEventListener("keyup", _0x277f09 => this.doAutoComplete(_0x277f09, _0x48ddbf));
    _0x48ddbf.addEventListener("keydown", _0x5f26db => handleMaxLength(_0x5f26db, _0x48ddbf));
    _0x48ddbf.addEventListener("paste", _0x645870 => {
      if (!handleMaxLength(_0x645870, _0x48ddbf)) {
        return;
      }
      _0x645870.preventDefault();
      _0x645870.stopPropagation();
      let _0x28abd4 = (_0x645870.clipboardData || window.clipboardData).getData("text/plain");
      const _0x8e6b7a = reduceTextLength(_0x28abd4);
      if (_0x8e6b7a.length > 0) {
        _0x28abd4 = _0x8e6b7a;
      }
      _0x28abd4 = _0x28abd4.replace("﻿", "");
      insertTextAtCaret(_0x28abd4, _0x48ddbf, !0);
    });
    _0x48ddbf.addEventListener("checkScroll", () => {
      if (!_0x229c77.nextSibling) {
        messages.scrollMessages(true);
      }
    });
  };
  this.handleHugs = (_0x2000c4, _0x46e188, _0x3f4b33, _0x446a88) => {
    if (!_0x2000c4 || !_0x46e188) {
      return;
    }
    _0x2000c4.classList.add("d-none");
    var _0x96c210 = window.devicePixelRatio;
    let [_0x477dd7, _0x513048, _0x3b48c4, _0x53a63a, _0x3cffaa, _0x64f967, _0x843bf5, _0x4bcb0b, _0x133aa3, _0x37fccf, _0x113f86, _0x925e8] = _0x46e188.split(";=");
    if (!_0x3b48c4) {
      return;
    }
    var _0x483ad5 = -1;
    var _0x497f76 = -1;
    var _0x324727 = "";
    if (_0x113f86.length !== 0) {
      const _0x347717 = _0x113f86.match(/(\d+)([a-zA-Z]+)(\d+)/).slice(1);
      if (_0x347717 && _0x347717.length === 3) {
        _0x483ad5 = xInt(_0x347717[0]);
        _0x324727 = _0x347717[1];
        _0x497f76 = xInt(_0x347717[2]);
      }
      const _0x19ba4a = this.getUserId(_0x3cffaa);
      const _0x17aa8a = this.getUserId(_0x4bcb0b);
      if ((_0x19ba4a === config.MyId || _0x17aa8a === config.MyId) && _0x497f76 <= 0) {
        _0x2000c4.remove();
        const _0x4e6212 = _0x3f4b33 === config.MyId;
        let _0x15caea = GetTranslation(_0x4e6212 ? "mob2.unjinx" : "mob2.unjinxed");
        _0x15caea ||= _0x4e6212 ? "You have unjinxed this user." : "You are now unjinxed.";
        this.sendHelpMsg(_0x446a88, "<inf8> " + _0x15caea, "Notice");
        return;
      }
    }
    _0x96c210 = window.devicePixelRatio || 1;
    if (_0x513048 > 100000 && (_0x96c210 >= 2 || !_Activity.instance.IsClassic)) {
      let _0x4c89b7 = Math.floor(Date.now() / 1000);
      let _0x22de58 = Math.max(_0x483ad5 - _0x4c89b7, 0);
      let _0x4b2736 = Math.floor(_0x22de58 / 60);
      let _0x17b56c = GetTranslation("mob2.jinxwarning");
      _0x17b56c ||= "You have been $1jinxed for $2 minutes with a probability of $3%!";
      _0x17b56c.replace("$1", _0x324727);
      _0x17b56c.replace("$2", _0x4b2736.toString());
      _0x17b56c.replace("$3", _0x497f76.toString());
      this.sendHelpMsg(_0x446a88, "" + _0x17b56c, "Help");
      return;
    }
    if (_0x96c210 >= 2) {
      return;
    }
    if (parseInt(_0x64f967) > 0) {
      _0x64f967 = "https://xat.com/web_gear/chat/av/" + parseInt(_0x64f967) + ".png";
    }
    if (parseInt(_0x133aa3) > 0) {
      _0x133aa3 = "https://xat.com/web_gear/chat/av/" + parseInt(_0x133aa3) + ".png";
    }
    let _0x36edd2 = "https://xat.com/web_gear/chat/hugs.php";
    const _0x2f023b = {
      h: _0x3b48c4,
      n: this.cleanHugNames(_0x3cffaa),
      n2: this.cleanHugNames(_0x4bcb0b),
      p1: _0x843bf5,
      av: _0x64f967,
      av2: _0x133aa3,
      p2: _0x37fccf,
      m: _0x53a63a,
      t: _0x483ad5,
      p: _0x497f76,
      j: _0x925e8
    };
    try {
      let _0x51af7b = JSON.stringify(_0x2f023b);
      _0x36edd2 += "?p=" + btoa(encodeURIComponent(_0x51af7b)) + "&cb=cc11";
    } catch (_0x394d91) {
      return;
    }
    const _0x4f2511 = makeElement(_0x2000c4, "iframe", "hugFrame");
    _0x4f2511.src = _0x36edd2;
    _0x4f2511.loading = "lazy";
    _0x4f2511.onload = () => {
      try {
        const _0x4f3573 = _0x4f2511.contentDocument || _0x4f2511.contentWindow.document;
        if (!_0x4f3573 || !_0x4f3573.body) {
          return;
        }
        _0xddef5b();
        if (_0x4f3573.body.innerText.length && !_0x4f3573.body.innerText.includes("(404)")) {
          _0x2000c4.classList.remove("d-none");
          messages.scrollMessages();
        }
      } catch (_0x54515d) {}
    };
  };
  this.cleanHugNames = _0x24b574 => {
    let _0x1e3380 = _0x24b574.split("|");
    let _0x119ad5 = _0x1e3380[0].replace(/\s*\([^)]*\)\s*/g, "").trim();
    if (_0x119ad5 === "" || _0x119ad5 === "_") {
      return _0x1e3380[1];
    } else {
      return _0x119ad5;
    }
  };
  this.getUserId = _0x4492c6 => {
    const _0x580b4a = _0x4492c6.split("|");
    if (!(_0x580b4a.length < 3)) {
      return _0x580b4a[2];
    }
  };
  this.sendHelpMsg = function (_0x5782e3 = 0, _0x42dfa8 = null, _0x197c54 = "Help", _0x5e576c = false) {
    _0x1340c8.addMessage(JSON.stringify({
      id: 0,
      i: _0x5782e3,
      text: _0x42dfa8,
      image: "<i>",
      name: _0x197c54,
      pFlags: 268500991,
      status: "",
      Time: !!_0x5e576c && Math.floor(Date.now() / 1000)
    }));
  };
  const _0x32369c = document.getElementById("visitorsOverlay");
  if (_0x32369c) {
    new MutationObserver(() => {
      _0xddef5b();
    }).observe(_0x32369c, {
      attributes: true,
      attributeFilter: ["style"]
    });
  }
  const _0x365a8b = document.querySelector("#msgMenu");
  function _0x5f2ee9(_0x122f9e) {
    _0x146026?.li.classList.remove("selected");
    (_0x146026 = _0x122f9e.Obj).p = _0x122f9e.p;
    _0x146026.li = _0x122f9e.li;
    let _0x2f3c07 = _0x122f9e?.target?.classList?.contains("msgLink") ? WordIsLink(_0x122f9e.target.innerText) : undefined;
    _0x146026.isLink = !1;
    if (_0x2f3c07 !== undefined) {
      let _0x2d3c83 = typeof _0x2f3c07 == "object" ? _0x2f3c07.l : _0x2f3c07;
      if (!_0x2d3c83.includes(" ")) {
        if (_0x2d3c83.charAt(0) == "%") {
          const _0x2ef41c = _0x2d3c83.substr(1);
          _0x2d3c83 = "https://xat.com/" + _0x2ef41c;
        }
        if (_0x2d3c83 != ">") {
          _0x146026.isLink = true;
          _0x146026.message = _0x2d3c83;
        }
      }
    }
    _0x146026.isSmiley = !1;
    const _0x39005b = _0x122f9e.target.closest(".messageSm");
    if (_0x39005b && _0x39005b?.dataset?.sm) {
      const _0x518a66 = _0x39005b?.dataset?.sm?.replace(/\*/gi, "#");
      _0x146026.isSmiley = _0x518a66.substring(0, 2) != "p1" && _0x518a66;
    }
    _0x122f9e.preventDefault();
    messages.toggleMsgMenu(!0);
    const _0x22cc80 = _0x122f9e.clientX ?? _0x122f9e.touches[0].clientX;
    const _0x520c50 = _0x122f9e.clientY ?? _0x122f9e.touches[0].clientY;
    const _0x345fb8 = _0x365a8b.offsetWidth;
    const _0x3a74ee = _0x365a8b.offsetHeight;
    const _0x1f0e38 = _0x520c50 - 15 < 15 ? 15 : _0x520c50 + _0x3a74ee + 15 >= window.innerHeight - 15 - _0x3a74ee / 2 ? Math.max(15, _0x520c50 - (_0x3a74ee + 15)) : _0x520c50;
    let _0xae727f = _0x22cc80 - 15 < 15 ? 15 : _0x22cc80 + _0x345fb8 + 15 >= window.innerWidth ? _0x22cc80 - (_0x345fb8 + 15) : _0x22cc80;
    if (!_0x2a0e2f) {
      _0xae727f = (window.innerWidth - _0x345fb8) / 2;
    }
    _0x365a8b.style.top = _0x1f0e38 + "px";
    _0x365a8b.style.left = _0xae727f + "px";
  }
  function _0x436e6b(_0x3f75f5) {
    return !!_0x3f75f5 && /^\((.*?)\)+$/.test(_0x3f75f5.replace(/ /, ""));
  }
  function _0x27d093(_0x463c8b) {
    return !!_0x463c8b && (_0x463c8b = _0x463c8b.split(" ")).length == 1 && WordIsLink(_0x463c8b[0]);
  }
  function _0x48282e(_0x3d5ea7) {
    if (!_0x3d5ea7) {
      return !1;
    }
    if (_0x3d5ea7.substr(0, 2) == "❯#") {
      if (_0x3d5ea7 = _0x3d5ea7.replace(/❯.*\[.*?\]/g, "")) {
        _0x3d5ea7 = _0x3d5ea7.trim();
      }
      let _0x5027c9 = _0x3d5ea7[0] == "(" && (_0x3d5ea7.charAt(_0x3d5ea7.length - 1) == ")" || _0x3d5ea7.charAt(_0x3d5ea7.length - 1) == " ");
      if (!_0x3d5ea7.length || _0x27d093(_0x3d5ea7) || _0x5027c9) {
        return !1;
      }
    }
    return !0;
  }
  function _0x3c7363(_0x4991b3) {
    var _0x15506f = document.getElementById("id_message_" + _0x4991b3);
    if (_0x15506f != null) {
      _0x15506f.parentNode.removeChild(_0x15506f);
    }
  }
  this.toggleMsgMenu = _0x155a0e => {
    if (!_0x155a0e || !_0x146026?.id || xInt(_0x146026.pFlags2) & NamePowers.istickle) {
      _0x146026?.li.classList.remove("selected");
      _0x365a8b.classList.remove("active");
    } else {
      _0x365a8b.classList.add("active");
      const _0x1c6dac = _0x146026.text;
      if (_0x155a0e) {
        _0x146026.li.classList.add("selected");
      }
      const _0x5b669e = document.querySelector(".msgMenuDivider");
      document.querySelectorAll("[data-msgItem]").forEach(_0x12db14 => {
        let _0x5502ba = !1;
        switch (_0x12db14.dataset.msgitem) {
          case "time":
            if (_0x146026.Time && _0x146026.id != 0) {
              _0x5502ba = true;
              _0x12db14.innerHTML = "";
              _0x5b669e.style.display = "block";
              _0x12db14.dataset.dataSec = GetTimeToGo(xInt(_0x146026.Time) * 1000, false, true);
              addText(_0x12db14, GetTimeToGo(xInt(_0x146026.Time) * 1000));
            } else {
              _0x5b669e.style.display = "none";
            }
            break;
          case "edit":
            const _0x9be598 = Date.now() / 1000 - _0x146026.Time;
            _0x5502ba = !messages.editMode && !_0x146026.isEdited && _0x146026.id == config.MyId && config.MyRegName && _0x9be598 <= 120 && _0x1c6dac[0] != "<";
            break;
          case "translate":
            _0x5502ba = config.pFlags & NamePowers.hasdays && _0x146026.id != config.MyId && !_0x436e6b(_0x1c6dac) && _0x1c6dac?.length >= 2 && !_0x27d093(_0x1c6dac) && _0x48282e(_0x1c6dac) && !_0x146026.TransIcon;
            break;
          case "quote":
            let _0x54700c = replaceBrakets(_0x1c6dac);
            _0x5502ba = _0x54700c.length > 2 && !_0x54700c.includes("giphy.com/media");
            break;
          case "react":
            _0x44d25c = _0x146026.msgId;
            _0x5502ba = _0x146026.msgId && _Activity.instance.UserSettings.displayReactions != "disable";
            break;
          case "delete":
            _0x5502ba = !!_0x146026.canDelete;
            break;
          case "copy":
            _0x5502ba = !(!_0x1c6dac.indexOf(" ") >= 0) || !_0x146026.isLink && !_0x146026.isSmiley;
            break;
          case "copyLink":
            _0x5502ba = _0x146026.isLink;
            break;
          case "copySmiley":
            _0x5502ba = _0x146026.isSmiley;
        }
        if (_0x5502ba) {
          _0x12db14.classList.remove("hidden");
        } else {
          _0x12db14.classList.add("hidden");
        }
      });
    }
  };
  this.clearMessages = function (_0x10efc4) {
    if (!_0x10efc4) {
      modalClose(true);
    }
    for (var _0x5a8208 = document.getElementById("messages"); _0x5a8208.firstChild;) {
      _0x5a8208.removeChild(_0x5a8208.firstChild);
    }
    _0x5c21c8.length = 0;
    _0x1ea8ca = 0;
  };
  this.setSettings = function (_0x574376) {
    _Activity.instance.UserSettings = JSON.parse(_0x574376);
  };
  this.setTypingOff = function () {
    if (_0x33db5d > 1 && userFlags & NamePowers.typing) {
      _0x33db5d = 1;
      return ToC({
        Type: "Send",
        Message: "/RTypeOff",
        Command: "Send",
        Page: "messages"
      }, !0);
    }
    return !1;
  };
  this.clickSmilieOpen = function () {
    classicSetDialog("selector", {
      Type: "Smilies"
    });
  };
  var _0x5805d8;
  var _0x3bb920;
  var _0x579f7e;
  var _0x3121f4;
  var _0x28d6bc;
  var _0x5e17b4;
  function _0x4fd2f9(_0x430737, _0x402e40) {
    if (_0x430737 > _0x402e40) {
      return -1;
    } else if (_0x430737 < _0x402e40) {
      return 1;
    } else {
      return 0;
    }
  }
  this.openSmiliesDialog = function () {
    if (!syel) {
      ToC({
        XC: 1,
        Command: "GetSmilies"
      });
    }
  };
  this.PaintPage = function (_0xde29f7) {
    var _0x58dd28;
    var _0x1455a8;
    var _0xd5a454;
    var _0x113348;
    var _0x35d008;
    var _0x4449db;
    _0x58dd28 = clearDiv("all");
    _0x1455a8 = makeElement(_0x58dd28, "div", "listTable");
    if ((_0x3bb920 = _0xde29f7) < 0) {
      _0x3bb920 = _0x579f7e - 1;
    }
    if (_0x3bb920 >= _0x579f7e) {
      _0x3bb920 = 0;
    }
    var _0x354662 = _0x3bb920 * _0x3121f4;
    for (var _0x114554 = 0; _0x114554 < _0x28d6bc; _0x114554++) {
      _0xd5a454 = makeElement(_0x1455a8, "div", "dialogRow");
      for (var _0x5edf1f = 0; _0x5edf1f < _0x5e17b4; _0x5edf1f++) {
        var _0x1a484d;
        (_0x35d008 = makeElement(_0xd5a454, "div", "dialogCell dialogCellCenter")).style.height = "40px";
        _0x35d008.style.width = "40px";
        if (_0x1a484d = messages.Current[_0x354662++]) {
          if (xInt(_0x1a484d) >= 10000) {
            _0x1a484d = _0x1a484d.substr(5);
          }
          _Activity.instance.Smilies.MakeSmiley(_0x35d008, _0x1a484d, {
            size: 30,
            showAd: !1,
            align: !0,
            className: "holder2"
          });
          if (_0x5805d8 == "pow") {
            if (!scount) {
              scount = {};
              for (var _0x72c873 in stop) {
                scount[stop[_0x72c873]] = scount[stop[_0x72c873]] ? scount[stop[_0x72c873]] + 1 : 1;
              }
            }
            if (scount[spow[_0x1a484d]]) {
              _0x1a484d = "$" + _0x1a484d;
            }
          }
          _0x35d008.setAttribute("data-code", _0x1a484d);
          _0x35d008.onclick = messages.clickSmilie;
        }
      }
    }
    _0x1455a8 = makeElement(_0x58dd28, "div", "dialogTable");
    _0xd5a454 = makeElement(_0x1455a8, "div", "dialogRow");
    _0x113348 = makeElement(_0xd5a454, "div", "dialogCell dialogCellCenter dialogCellMiddle");
    (_0x4449db = makeElement(_0x113348, "span")).innerHTML = "<span style=\"font-size:1.2rem;font-weight:700;\">&lt;</span>";
    _0x4449db.onclick = function () {
      messages.PaintPage(_0x3bb920 - 1);
    };
    _0x113348 = makeElement(_0xd5a454, "div", "dialogCell dialogCellCenter dialogCellMiddle");
    if (config.PhoneType == PhoneTypes.DROIDPHONE) {
      _0x113348.style.cssText = "font-size: 0.5rem;";
    }
    _0x354662 = 0;
    for (; _0x354662 < _0x579f7e; _0x354662++) {
      _0x4449db = makeElement(_0x113348, "span");
      addText(_0x4449db, "●");
      if (_0x354662 == _0x3bb920) {
        _0x4449db.style.color = "#000";
      } else {
        _0x4449db.style.color = "#999";
        _0x4449db.onclick = function () {
          messages.PaintPage(_0x354662);
        };
      }
    }
    _0x113348 = makeElement(_0xd5a454, "div", "dialogCell dialogCellCenter dialogCellMiddle");
    (_0x4449db = makeElement(_0x113348, "span")).innerHTML = "<span style=\"font-size:1.2rem;font-weight:700;\">&gt;</span>";
    _0x4449db.onclick = function () {
      messages.PaintPage(_0x3bb920 + 1);
    };
  };
  this.InitPages = function (_0x5649ee, _0x46b5f6, _0x41b93a, _0x4bbae7) {
    var _0xd12b3e;
    _0x5805d8 = _0x5649ee;
    messages.Current = [];
    if (!(_0x3bb920 = _0x4bbae7)) {
      _0x3bb920 = 0;
    }
    if (_0x41b93a) {
      _0x28d6bc = _0x41b93a;
    }
    if (_0x46b5f6) {
      _0x5e17b4 = _0x46b5f6;
    }
    _0x3121f4 = _0x5e17b4 * _0x28d6bc;
    switch (_0x5649ee) {
      case "yel":
        messages.Current = syel;
        break;
      case "oth":
        messages.Current = soth;
        break;
      case "pow":
        for (_0xd12b3e in spow) {
          if (_0xd12b3e.length != 0) {
            if (!(parseInt(_0xd12b3e) > 0) && !((_0x2905a1 = xInt(spow[_0xd12b3e])) <= 0)) {
              if (_0xd12b3e != "glow") {
                if (spowhave[_0x2905a1 >> 5] & 1 << _0x2905a1 % 32) {
                  _0x2905a1 += 90000;
                } else {
                  _0x2905a1 += 10000;
                }
                messages.Current.push(String(_0x2905a1) + _0xd12b3e);
              }
            }
          }
        }
        messages.Current.sort(_0x4fd2f9);
        break;
      default:
        messages.Current.push(_0x5649ee);
        var _0x2905a1 = spow[_0x5649ee];
        for (_0xd12b3e in stop) {
          if (stop[_0xd12b3e] == _0x2905a1) {
            messages.Current.push(_0xd12b3e);
          }
        }
    }
    _0x579f7e = parseInt(messages.Current.length / _0x3121f4 - 0.00001) + 1;
    messages.PaintPage(_0x3bb920);
  };
  this.clickSmilie = function () {
    var _0x49509d = event.currentTarget.dataset.code;
    switch (_0x49509d) {
      case "i1yel":
      case "i1oth":
      case "i1pow":
        messages.InitPages(_0x49509d.substr(2));
        return;
      default:
        if (_0x49509d.charAt(0) == "$") {
          messages.InitPages(_0x49509d.substr(1));
          return;
        }
        document.getElementById("textEntryEditable").textContent += " (" + _0x49509d + ") ";
        modalClose();
    }
  };
  this.setScroller = function (_0x1480a3) {};
}();