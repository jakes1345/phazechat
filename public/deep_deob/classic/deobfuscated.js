'use strict';

let menuState = 0;
let textRange = null;
let textSelection = null;
const mkTools = document.querySelector("#mkTools");
const textEntry = document.getElementById("textEntryEditable");
var _Activity;
function addMarkDown(_0xe8c493, _0x381dc8, _0x2e23bd) {
  let _0x1f9625 = textEntry.innerText;
  switch (_0xe8c493) {
    case "b":
      _0x1f9625 = _0x381dc8.slice(0, 2) == "*" && _0x381dc8.slice(-2) == "*" ? _0x1f9625.replace(_0x1f9625.slice(_0x2e23bd.startOffset, _0x2e23bd.endOffset), _0x381dc8.slice(2, _0x381dc8.length - 2)) : _0x1f9625.replace(_0x1f9625.slice(_0x2e23bd.startOffset, _0x2e23bd.endOffset), "*" + _0x381dc8 + "*");
      textEntry.innerText = _0x1f9625.replace(/nbsp;/gi, " ");
      break;
    case "i":
      _0x1f9625 = _0x381dc8.slice(0, 1) == "_" && _0x381dc8.slice(-1) == "_" ? _0x1f9625.replace(_0x1f9625.slice(_0x2e23bd.startOffset, _0x2e23bd.endOffset), _0x381dc8.slice(1, _0x381dc8.length - 1)) : _0x1f9625.replace(_0x1f9625.slice(_0x2e23bd.startOffset, _0x2e23bd.endOffset), "_" + _0x381dc8 + "_");
      textEntry.innerText = _0x1f9625.replace(/nbsp;/gi, " ");
      break;
    case "u":
      _0x1f9625 = _0x381dc8.slice(0, 1) == "~" && _0x381dc8.slice(-1) == "~" ? _0x1f9625.replace(_0x1f9625.slice(_0x2e23bd.startOffset, _0x2e23bd.endOffset), _0x381dc8.slice(1, _0x381dc8.length - 1)) : _0x1f9625.replace(_0x1f9625.slice(_0x2e23bd.startOffset, _0x2e23bd.endOffset), "~" + _0x381dc8 + "~");
      textEntry.innerText = _0x1f9625.replace(/nbsp;/gi, " ");
      break;
    case "q":
      _0x1f9625 = _0x381dc8.slice(0, 2) == ">[" && _0x381dc8.slice(-1) == "]" ? _0x1f9625.replace(_0x1f9625.slice(_0x2e23bd.startOffset, _0x2e23bd.endOffset + 4), _0x381dc8.slice(2, _0x381dc8.length - 1)) : _0x1f9625.replace(_0x1f9625.slice(_0x2e23bd.startOffset, _0x2e23bd.endOffset), ">[" + _0x381dc8 + "]");
      textEntry.innerText = cleanXatTagsIcons(_0x1f9625.replace(/nbsp;/gi, " "));
      break;
    case "link":
      _0x1f9625 = _0x1f9625.replace(_0x1f9625.slice(_0x2e23bd.startOffset, _0x2e23bd.endOffset), "[" + _0x381dc8 + "]()");
      textEntry.innerHTML = _0x1f9625.replace(/nbsp;/gi, " ");
  }
}
function toggleMenu(_0x2386f9) {
  if (menuState !== 1 && _0x2386f9) {
    menuState = 1;
    mkTools.classList.add("active");
  } else if (menuState !== 0 && !_0x2386f9) {
    menuState = 0;
    mkTools.classList.remove("active");
  }
}
function positionMenu(_0x4cff73) {
  const _0x53602f = getPosition(_0x4cff73);
  const _0x3fae00 = mkTools.offsetWidth;
  const _0xd9dd43 = mkTools.offsetHeight;
  const _0x38800a = Math.max(_0x53602f.x - _0x3fae00 / 2, 10);
  const _0x22e819 = textEntry.offsetTop - _0xd9dd43 - 5;
  const _0x30c72d = window.innerWidth;
  const _0x536112 = window.innerHeight;
  mkTools.style.left = _0x30c72d - _0x38800a < _0x3fae00 ? _0x30c72d - _0x3fae00 + "px" : _0x38800a + "px";
  mkTools.style.top = _0x536112 - _0x22e819 < _0xd9dd43 ? _0x536112 - _0xd9dd43 + "px" : _0x22e819 + "px";
}
function getPosition(_0x47827d) {
  let _0x31a166 = 0;
  let _0x3a4a46 = 0;
  _0x47827d ||= window.event;
  if (_0x47827d.pageX || _0x47827d.pageY) {
    _0x31a166 = _0x47827d.pageX;
    _0x3a4a46 = _0x47827d.pageY;
  } else if (_0x47827d.clientX || _0x47827d.clientY) {
    _0x31a166 = _0x47827d.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    _0x3a4a46 = _0x47827d.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  return {
    x: _0x31a166,
    y: _0x3a4a46
  };
}
setStuffAndListener();
if (_Activity === undefined) {
  _Activity = parent._Activity !== undefined ? parent._Activity : parent.parent._Activity !== undefined ? parent.parent._Activity : parent.parent.parent._Activity !== undefined ? parent.parent.parent._Activity : {};
}
const mkButtons = document.querySelectorAll("[data-mk]");
mkButtons.forEach(_0x1fc195 => {
  switch (_0x1fc195.dataset.mk) {
    case "b":
      addToolTip(_0x1fc195, ["mob2.bold", "Bold"], {
        position: "low"
      });
      break;
    case "i":
      addToolTip(_0x1fc195, ["mob2.italic", "Italic"], {
        position: "low"
      });
      break;
    case "u":
      addToolTip(_0x1fc195, ["mob2.strike", "Strikethrough"], {
        position: "low"
      });
      break;
    case "q":
      addToolTip(_0x1fc195, ["mob2.quote", "Quote"], {
        position: "low"
      });
      break;
    case "link":
      addToolTip(_0x1fc195, ["mob2.link", "Link"], {
        position: "low"
      });
  }
  _0x1fc195.addEventListener("click", () => {
    if (textRange && textSelection) {
      addMarkDown(_0x1fc195.dataset.mk, textSelection, textRange);
    }
  });
});
let pressed = false;
function addToTextEntry(_0x311b5c, _0x3f20e0 = false) {
  if (typeof messages != "undefined" && messages.activeEditMessageNode) {
    const _0x466ee7 = messages.activeEditMessageNode;
    if (_0x3f20e0) {
      placeCaretAtEnd(_0x466ee7);
    } else {
      _0x466ee7.focus();
      placeCaretAt(textEntryCaretPos, _0x466ee7.childNodes[0]);
    }
    pasteHtmlAtCaret(_0x311b5c);
    textEntryCaretPos = getCaretWithin(_0x466ee7.childNodes[0]);
    return;
  }
  pasteHtmlAtCaret(_0x311b5c);
  textEntryCaretPos = getCaretWithin(textEntry);
}
var totTabWidth;
var TabHeight;
var MainOwner;
var lastGroup;
var lastCurrentChat;
var BuddyOff;
var gotClearChats;
function classicSetHeight(_0x4c2514) {
  if (butsFrame) {
    var _0xf08353 = {
      mh: _0x4c2514 + 300
    };
    if (actions.getMe()) {
      _0xf08353.mw = 900;
    }
    _0xf08353.customHeight = actions.checkIfButtons();
    posModal(butsFrame, _0xf08353);
    butsFrame.style.visibility = "visible";
  }
}
function resizeTabs(_0x41dd7f) {
  _0x41dd7f ||= document.getElementById("chattabs");
  removeById("PadCell");
  var _0x5753c5;
  var _0x386dc5;
  for (var _0x2099d4 = _0x41dd7f.childNodes, _0x349650 = [], _0x1881cd = 0, _0x159099 = 0, _0x178487 = 0, _0x28831b = 0; _0x2099d4[_0x1881cd];) {
    if (_0x2099d4[_0x1881cd].but && _0x2099d4[_0x1881cd].but.active && _0x159099 < 1) {
      _0x159099++;
      _0x349650[_0x1881cd] = 1;
    }
    if (_0x2099d4[_0x1881cd].but.id == 10) {
      _0x349650[_0x1881cd] = 2;
    }
    _0x1881cd++;
  }
  var _0x5edfe3 = totTabWidth;
  if (_0x5edfe3 > 130) {
    _0x5edfe3 = 130;
  }
  var _0x6ae051 = xInt((totTabWidth - _0x5edfe3) / (_0x1881cd > 1 ? _0x1881cd - 1 : 1));
  if (_0x6ae051 > _0x5edfe3) {
    _0x6ae051 = _0x5edfe3;
  }
  _0x178487 = 0;
  for (; _0x178487 < _0x1881cd; _0x178487++) {
    _0x5753c5 = _0x6ae051;
    if (_0x349650[_0x178487] == 1) {
      _0x5753c5 = _0x5edfe3;
    }
    if (_0x349650[_0x178487] == 2) {
      _0x5753c5 = 27;
    }
    _0x5753c5 = xInt(_0x5753c5);
    _0x386dc5 = "height:" + Math.max(TabHeight, 24) + "px; width:" + _0x5753c5 + "px";
    if (typeof _0x2099d4[_0x178487] == "object") {
      try {
        _0x2099d4[_0x178487].style.cssText = _0x386dc5;
      } catch (_0x53e933) {}
      _0x2099d4[_0x178487].but.style.cssText = _0x386dc5;
      _0x28831b += _0x5753c5;
    }
  }
  if (_0x28831b < totTabWidth && totTabWidth - _0x28831b > 1) {
    (_0x178487 = makeElement(_0x41dd7f, "div", "cell", "PadCell")).style.cssText = "width:" + (totTabWidth - _0x28831b) + "px";
  }
}
function addChatTab(_0x57c39b, _0x33f76d, _0x49405d, _0xaefbb1, _0x147b8c, _0x5e79b3, _0x380e34, _0x3a9272, _0x27aa55) {
  var _0x3d88c3;
  var _0x3b5d1a = document.getElementById("chattabs");
  var _0x446097 = _0x3a9272;
  let _0x4e94e8 = _0x49405d == "10";
  let _0x27920c = _0xaefbb1;
  if (!_0x27aa55 && !_0x4e94e8) {
    _0x27920c = _0x27920c.substr(0, 10);
  }
  if (!_0x446097) {
    removeById("PadCell");
    if (_0x3b5d1a.childElementCount >= 11) {
      if (!_0x147b8c) {
        resizeTabs(_0x3b5d1a);
        return;
      }
      _0x3b5d1a.removeChild(_0x3b5d1a.lastChild);
    }
    (_0x5a3267 = makeElement(_0x3b5d1a, "div", "cell")).style.cssText = "width:0px";
    _0x3d88c3 = makeElement(_0x5a3267, "div", "chatdel");
    _0x446097 = makeElement(_0x5a3267, "button");
    _0x5a3267.DelDiv = _0x3d88c3;
    _0x5a3267.but = _0x446097;
    _0x446097.style.cssText = "width:0px";
    _0x446097.active = _0x147b8c;
    _0x446097.id = _0x49405d;
  }
  while (_0x446097.firstChild) {
    _0x446097.removeChild(_0x446097.firstChild);
  }
  _0x446097.id = _0x49405d;
  _0x446097.lit = _0x5e79b3;
  _0x446097.active = _0x147b8c;
  _0x446097.del = _0x380e34;
  if (_0x27920c || _0x446097.chatName == null) {
    _0x446097.chatName = _0x27920c;
  }
  if (_0x33f76d) {
    _0x446097.chatid = _0x33f76d;
  }
  _0x446097.className = "chatlinks";
  if (_0x147b8c) {
    _0x446097.className += " active";
  }
  _0x446097.onclick = function (_0xb25938) {
    messages.toggleMsgMenu(false);
    sendApp(_0xb25938, _0x49405d, _0x446097.chatid, 0, _0x446097.chatName);
    lightChat(_0x49405d, true, false);
    if (_0x446097.chatid == 10) {
      _Activity.instance.clickedTickleTab = true;
      clearDiv("idvisitors");
    } else {
      _Activity.instance.clickedTickleTab = false;
    }
  };
  resizeTabs(_0x3b5d1a);
  var _0x384132 = makeElement(_0x446097, "div");
  var _0x4b0839 = makeElement(_0x384132, "div");
  var _0x27fd32 = makeElement(_0x4b0839, "div");
  var _0x37ccd1 = makeElement(_0x27fd32, "div", "svgBack");
  _0x4b0839.style.cssText = "display: flex; align-items: center; justify-content: flex-start;";
  let _0x568713 = "bubble";
  if (_0x4e94e8) {
    _0x568713 = "notif";
  }
  if (!_0x5e79b3) {
    _0x568713 += 2;
  }
  let _0x324289 = Browser && Browser == "MS" ? "width:1.3rem;height:1.2rem" : "width:1.4rem;height:1.4rem";
  _0x37ccd1.style.cssText = "text-align:center; " + _0x324289 + "; background-image: url(svg/" + _0x568713 + ".svg)";
  _0x446097.count = makeElement(_0x37ccd1, "span");
  let _0x5aba6a = _0x4e94e8 ? 1.1 : 1.3;
  if (hasDarkMode()) {
    _0x446097.count.style.cssText = "font-size:0.7rem; color:#000; line-height: " + _0x5aba6a + "rem;";
  } else {
    _0x446097.count.style.cssText = "font-size:0.7rem; line-height: " + _0x5aba6a + "rem;";
  }
  if (_0x5e79b3) {
    changeText(_0x446097.count, 1);
  }
  var _0xb44fa2 = makeElement(_0x4b0839, "div");
  _0xb44fa2.style.cssText = "padding-left: 0.2rem;";
  if (_0x380e34 && _0x3d88c3) {
    _0xaefbb1 = _0xaefbb1.replace(/_/g, " ");
    _0x27920c = _0x27920c.replace(/_/g, " ");
  }
  addToolTip(_0x446097, _0xaefbb1, {
    position: "low"
  });
  addText(_0xb44fa2, " " + _0x27920c + " ");
  if (_0x380e34 && _0x3d88c3 && !_0x4e94e8) {
    let _0x34dea4 = hasDarkMode() ? " darkDel" : "";
    makeElement(_0x3d88c3, "div", "svgBack" + _0x34dea4);
    var _0x5a3267;
    _0x3d88c3.onclick = function (_0xc21afa) {
      sendApp(_0xc21afa, _0x49405d, _0x446097.chatid, 1);
    };
    (_0x5a3267 = _0x446097.parentNode).onmouseenter = function (_0x462560) {
      this.DelDiv.style.cssText = "display:table";
      _0x5a3267.querySelector(".chatlinks > div").style.cssText = "width: 100%; -webkit-mask-image: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(2, 0, 36, 1) 40%, rgba(0, 0, 0, 0) 75%)";
    };
    _0x5a3267.onmouseleave = function (_0x276dcd) {
      this.DelDiv.style.cssText = "";
      _0x5a3267.querySelector(".chatlinks > div").style.cssText = "";
    };
  }
  if (_0x147b8c) {
    var _0x224fb6 = _0x49405d.split("_");
    _0x224fb6 = xInt(_0x224fb6[1]);
    LoadBackground2(document.getElementById("background"), PcBacks[_0x224fb6]);
  }
  return _0x446097;
}
function navigate(_0x548f77) {
  const _0x41edd3 = document.querySelector(".chatlinks")?.id;
  const _0x53edc5 = (_0x2731b4 => document.querySelector(".chatlinks.active[id*=\"_\"], .chatlinks.active[id=\"" + _0x2731b4 + "\"], .chatlinks.active[id=\"10\"]"))(_0x41edd3);
  const _0x5c71cb = (_0x1c3084 => [...document.querySelectorAll(".chatlinks[id*=\"_\"], .chatlinks[id=\"" + _0x1c3084 + "\"], .chatlinks[id=\"10\"]")])(_0x41edd3);
  if (!_0x5c71cb.length) {
    return;
  }
  const _0x265d1d = _0x5c71cb.filter(_0x16422b => _0x16422b.id != "10");
  if (!_0x265d1d.length) {
    return;
  }
  document.querySelector(".chatlinks.active")?.classList.remove("active");
  const _0x3c10c3 = (_0x265d1d.indexOf(_0x53edc5) + _0x548f77 + _0x265d1d.length) % _0x265d1d.length;
  _0x265d1d[_0x3c10c3]?.classList.add("active");
  _0x265d1d[_0x3c10c3]?.click();
}
function sendApp(_0x4a6fcd, _0x1d59f2, _0x1d477c, _0x30bb7f, _0x365215) {
  var _0x2b94ab;
  var _0x2cd6fe = {
    ChatId: _0x1d477c,
    Command: "Click"
  };
  _0x4a6fcd.stopPropagation();
  _0x2b94ab = _0x2cd6fe;
  if (_0x1d477c.indexOf("_") < 0) {
    _0x2b94ab.Group = _0x365215;
  }
  if (_0x30bb7f) {
    _0x2b94ab.DeleteId = _0x1d477c;
    _0x2b94ab.Next = "1";
    removeById(_0x1d59f2, 1);
    resizeTabs();
  }
  ToC(_0x2b94ab);
  if (_0x30bb7f) {
    navigate(0);
  }
}
Classic = true;
bodyResize(null);
visitors.Classic = true;
friends.Classic = true;
messages.Classic = true;
friends.ScrollContainer = document.getElementById("visitorsContainer");
isWEB = true;
var translateLoaded = false;
var chats = new function () {
  this.main = function (_0x31ed7c) {
    let _0x1e73ad = JSON.parse(_0x31ed7c);
    if (_0x1e73ad.MyId) {
      MyObj = _0x1e73ad;
    }
  };
  this.SetEdit = function (_0x3b9de8) {};
  this.clearChats = function () {};
  this.clearChats2 = function () {
    gotClearChats = true;
  };
  this.addHelp = function (_0x74958f) {};
  this.addChat = function (_0x5a84a5, _0x3afd0e) {
    if (!translateLoaded) {
      translateLoaded = true;
      TranslateAll();
    }
    var _0x4a112f;
    var _0x2dc939 = JSON.parse(_0x5a84a5);
    if (!_0x2dc939.CurrentChat) {
      return;
    }
    let _0x141df6;
    var _0x2e76f3 = document.getElementById("alltabs");
    totTabWidth ||= _0x2e76f3.offsetWidth;
    TabHeight ||= _0x2e76f3.offsetHeight - 4;
    let _0x21d465 = (_0x170b20 = _0x2dc939.id) == "10";
    if (_0x170b20.search("_") < 0 && !_0x21d465) {
      _0x4a112f = _0x170b20;
    } else {
      BuddyOff = true;
    }
    const _0x135d29 = _0x2dc939.name || _0x2dc939.CurrentChat.split("_")[1];
    let _0xb86a85 = ProcessName(_0x135d29, "", ~NamePowers.nospace & 65535).name;
    if (_0xb86a85.indexOf("localhost:6969/") == -1) {
      _0xb86a85 = _0xb86a85.replace(/_/gi, " ");
    }
    _0xb86a85 = _0xb86a85.replace("localhost:6969/", "");
    _0xb86a85 = _0xb86a85.replace(/\s*\(.*?\)\s*/g, " ");
    _0xb86a85 = _0xb86a85.trim();
    if (!_0xb86a85 || _0xb86a85 == "﻿") {
      if (_0x2dc939.RegName) {
        _0xb86a85 = _0x2dc939.RegName;
      } else {
        if (_0x2dc939.RegName != "" || !_0x2dc939.id) {
          return;
        }
        _0xb86a85 = _0x2dc939.id.indexOf("_") > 0 ? _0x2dc939.id.split("_")[1] : _0x2dc939.id;
        _0x141df6 = 1;
      }
    }
    var _0xbdf80e = document.getElementById(_0x170b20);
    if ((!_0xbdf80e || gotClearChats && _0xbdf80e) && _0x4a112f) {
      clearDiv("chattabs");
      lastGroup = 0;
      _0xbdf80e = null;
      BuddyOff = false;
    }
    if (!_0xbdf80e || _0x4a112f && _0x4a112f !== lastGroup) {
      if (!(_0xbdf80e = addChatTab(0, _0x2dc939.id, _0x170b20, _0xb86a85, _0x2dc939.CurrentChat == _0x170b20, false, !_0x4a112f, _0xbdf80e, _0x4a112f))) {
        return;
      }
      if (_0x141df6) {
        _0xbdf80e.NoName = 1;
      }
      if (_0x4a112f && lastGroup == 0 && _0x2dc939.tickle) {
        addChatTab(1, "10", "10", "", 1, 0, 0, 0, 0);
      }
    }
    if (_0xbdf80e.NoName && _0xb86a85) {
      _0xbdf80e.NoName = 0;
      changeText(_0xbdf80e.firstChild.firstChild.children[1], " " + _0xb86a85.substr(0, 10) + " ");
    }
    if (_0x4a112f && _0x4a112f !== lastGroup) {
      lastGroup = _0x4a112f;
    }
    var _0x170b20;
    var _0x57c53a = xInt(_0x2dc939.GreenCnt);
    if (_0x2dc939.CurrentChat == _0x170b20) {
      _0x57c53a = 0;
    }
    if (_0x57c53a > 0) {
      let _0x47392e = _0xbdf80e.getElementsByClassName("cell");
      if (_0x47392e && _0x47392e[0]) {
        let _0x25deb5 = _0x21d465 ? ["mob2.clickedyou", "$1 users clicked you!", _0x57c53a] : ["mob2.unreadmessages", "$1 unread messages!", _0x57c53a];
        addToolTip(_0x47392e[0], _0x25deb5, {
          position: "low",
          maxWidth: true
        });
      }
      changeText(_0xbdf80e.count, _0x57c53a > 9 ? _0x21d465 ? "+" : "9+" : _0x57c53a);
      lightChat(_0x170b20, false, true);
    } else {
      _0xbdf80e.count.innerHTML = "";
    }
    if (_0x2dc939.CurrentChat != lastCurrentChat) {
      lightChat(_0x170b20 = _0x2dc939.CurrentChat, true, false);
      lastCurrentChat = _0x170b20;
    }
    if (!BuddyOff && _0x2dc939.buddyid) {
      if (!document.getElementById(_0x2dc939.buddyid)) {
        addChatTab(0, _0x2dc939.buddyid, _0x2dc939.buddyid, _0x2dc939.buddyname, false, false, false, null, _0x4a112f);
      }
      BuddyOff = true;
    }
    gotClearChats = false;
  };
}();
function lightChat(_0x1eefc8, _0xf25777, _0x55b1b4) {
  var _0x3b5cb2;
  var _0x204c14;
  var _0x1ab756;
  _0x204c14 = document.getElementsByClassName("chatlinks");
  _0x3b5cb2 = 0;
  for (; _0x3b5cb2 < _0x204c14.length; _0x3b5cb2++) {
    if ((_0x1ab756 = _0x204c14[_0x3b5cb2]).id == _0x1eefc8) {
      if ((_0x1ab756.lit === _0x55b1b4 || _0x55b1b4 === 0) && (_0x1ab756.active == _0xf25777 || _0xf25777 == 0)) {
        continue;
      }
      addChatTab(0, 0, _0x1eefc8, _0x1ab756.chatName, _0xf25777, _0x55b1b4, _0x1ab756.del, _0x1ab756);
    } else {
      if (_0x1ab756.active === false || _0xf25777 !== true) {
        continue;
      }
      addChatTab(0, 0, _0x1ab756.id, _0x1ab756.chatName, false, _0x1ab756.lit, _0x1ab756.del, _0x1ab756);
    }
  }
}
function setButCols(_0x364fa4, _0x403713) {
  var _0xd532d4;
  var _0x21d484 = ["butcontainer"];
  _0xd532d4 = "color:#" + toHex6(_0x403713) + "; background-color: #" + toHex6(_0x364fa4);
  let _0x300f43 = document.querySelector("#returnBtn");
  if (_0x300f43) {
    _0x300f43.style.stroke = "#" + toHex6(_0x403713);
  }
  const _0x52b9bd = "svg/remove" + (toHex6(_0x403713)[0] == "0" ? "b" : "w") + ".svg";
  document.getElementById("removeIcon").src = _0x52b9bd;
  for (var _0x29dfcb in _0x21d484) {
    var _0x427811;
    var _0x422bae = document.getElementsByClassName(_0x21d484[_0x29dfcb]);
    for (_0x427811 = 0; _0x427811 < _0x422bae.length; _0x427811++) {
      _0x422bae[_0x427811].style.cssText = _0xd532d4;
    }
  }
}
function setSignInButton(_0x34a671) {
  setTextNode("signIn", _0x34a671);
}
function setString(_0x17a609, _0x9a996d) {
  setTextNode(_0x17a609, isNaN(_0x9a996d) ? _0x9a996d : GetTranslation("box." + _0x9a996d));
}
let textEntryCaretPos = 0;
function getAChatBoxPressed() {
  var _0x2a9c80 = config.roomid;
  var _0x1ed6fd = MainOwner ? "#!editgroup&roomid=" + _0x2a9c80 + "&GroupName=" + MainOwner : "#!creategroup";
  window.open("//localhost:6969/chats" + _0x1ed6fd, "_blank");
}
function smiliePressed(_0x163147) {
  if (typeof messages != "undefined" && messages.activeEditMessageNode) {
    if (messages.activeEditMessageNode.innerText.length >= 256) {
      return;
    }
    insertTextAtCaret(_0x163147, messages.activeEditMessageNode, true);
  } else {
    placeCaretAt(textEntryCaretPos);
    pasteHtmlAtCaret(_0x163147);
    textEntryCaretPos = getCaretWithin(textEntry);
  }
}
function getCaretWithin(_0x8fd2b2) {
  var _0x17e801;
  var _0x438040 = 0;
  var _0x179845 = _0x8fd2b2.ownerDocument || _0x8fd2b2.document;
  var _0x18738f = _0x179845.defaultView || _0x179845.parentWindow;
  if (_0x18738f.getSelection !== undefined) {
    if ((_0x17e801 = _0x18738f.getSelection()).rangeCount > 0) {
      var _0x368b40 = _0x18738f.getSelection().getRangeAt(0);
      var _0x38c7b8 = _0x368b40.cloneRange();
      _0x38c7b8.selectNodeContents(_0x8fd2b2);
      _0x38c7b8.setEnd(_0x368b40.endContainer, _0x368b40.endOffset);
      _0x438040 = _0x38c7b8.toString().length;
    }
  } else if ((_0x17e801 = _0x179845.selection) && _0x17e801.type != "Control") {
    var _0x15e2b2 = _0x17e801.createRange();
    var _0x553933 = _0x179845.body.createTextRange();
    _0x553933.moveToElementText(_0x8fd2b2);
    _0x553933.setEndPoint("EndToEnd", _0x15e2b2);
    _0x438040 = _0x553933.text.length;
  }
  return _0x438040;
}
function buyPressed() {
  window.open("//localhost:6969/buy", "_blank");
}
function getStuffPressed() {
  const _0x300a29 = document.querySelector(".dialogBody");
  if (_0x300a29) {
    _0x300a29.style.height = "90%";
  }
  classicSetDialog("selector", {
    Type: "Smilies"
  });
}
function appPressed() {
  if (parent) {
    parent.postMessage(JSON.stringify({
      action: "sideload",
      n: "apps"
    }), "http://localhost:6969");
  }
}
function spkPressed() {
  var _0x53ff52 = document.getElementById("volumePopup");
  let _0xb17382 = document.getElementById("volumePopupContent");
  var _0x3a6e0d = document.getElementById("spkBut").getBoundingClientRect();
  var _0x3dc7eb = document.getElementById("volumePopupContent").getBoundingClientRect();
  var _0x46fbce = (_0x3a6e0d.left + _0x3a6e0d.right) / 2 - _0x3dc7eb.width / 2;
  if (window.innerWidth <= 500) {
    _0xb17382.classList.add("radioPopup");
    _0x46fbce -= 40;
  } else {
    _0xb17382.classList.remove("radioPopup");
  }
  _0x53ff52.style.left = _0x46fbce + "px";
  _0x53ff52.style.top = _0x3a6e0d.top + "px";
  var _0x2befe3 = document.getElementById("chatVolume0");
  var _0xd3ab27 = document.getElementById("radioVolume1");
  var _0x26f3f2 = document.getElementById("kissVolume2");
  var _0x54ab25 = document.getElementById("radioVolume3");
  var _0x3bd46d = document.getElementById("chatVolOnOff0");
  var _0x176435 = document.getElementById("kissVolOnOff2");
  var _0x586f8e = document.getElementById("radioVolOnOff1");
  var _0x14d00a = document.getElementById("radioVolOnOff3");
  function _0x4ca56a() {
    _0x3bd46d.src = "svg/" + (_Activity.instance.Sound & 1 ? "chatsnd" : "chatoff") + ".svg";
    _0x586f8e.src = "svg/" + (_Activity.instance.Sound & 2 ? "radio" : "radiooff") + ".svg";
    _0x176435.src = "svg/" + (_Activity.instance.Sound & 4 ? "kisseson" : "kissesoff") + ".svg";
    _0x14d00a.src = "svg/" + (_Activity.instance.Sound & 8 ? "playon" : "playoff") + ".svg";
    if (Player) {
      let _0x4cbc5a = _Activity.instance.Sound & 8 ? _Activity.instance.Volume[3] : 0;
      Player.setVolume(_0x4cbc5a);
    }
    SetSpkIcon(_Activity.instance.Sound);
    addToolTip(_0x3bd46d, ["mob2.xsound", "Chat"], {
      position: "low"
    });
    addToolTip(_0x176435, ["mob2.xkiss", "Kisses"], {
      position: "low"
    });
    addToolTip(_0x586f8e, ["mob2.xradio", "Radio"], {
      position: "low"
    });
    addToolTip(_0x14d00a, ["mob2.xyoutube", "YouTube"], {
      position: "low"
    });
  }
  function _0x5c420d(_0x21b150) {
    _0x21b150.stopPropagation();
    var _0x3ee195 = xInt(_0x21b150.target.id.charAt(_0x21b150.target.id.length - 1));
    let _0x45c1d3 = 1 << _0x3ee195;
    var _0x42bee2 = {
      Command: "Vol",
      id: _0x3ee195
    };
    var _0x452c03 = _0x42bee2;
    if (_0x21b150.target.id.charAt(_0x21b150.target.id.length - 2) == "f") {
      switch (_0x3ee195) {
        case 0:
        case 1:
        case 2:
        case 3:
          _Activity.instance.Sound = _Activity.instance.Sound ^ _0x45c1d3;
          _0x452c03.w_sound = _Activity.instance.Sound;
          _0x4ca56a();
      }
    } else {
      _Activity.instance.Volume[_0x3ee195] = _0x452c03.value = _0x21b150.target.value;
      if (_Activity.instance.Radio && _0x3ee195 == 1 && _Activity.instance.Sound & 2) {
        _Activity.instance.Radio.volume(_0x21b150.target.value / 100);
      }
      if (Player && _0x3ee195 == 3 && _Activity.instance.Sound & 8) {
        Player.setVolume(xInt(_0x21b150.target.value));
      }
    }
    if (["change", "click"].indexOf(_0x21b150.type) >= 0) {
      ToC(_0x452c03);
    }
  }
  _0x4ca56a();
  _0x2befe3.value = _Activity.instance.Volume[0];
  _0xd3ab27.value = _Activity.instance.Volume[1];
  _0x26f3f2.value = _Activity.instance.Volume[2];
  _0x54ab25.value = _Activity.instance.Volume[3];
  _0x2befe3.oninput = _0x5c420d;
  _0x2befe3.onchange = _0x5c420d;
  _0xd3ab27.oninput = _0x5c420d;
  _0xd3ab27.onchange = _0x5c420d;
  _0x26f3f2.oninput = _0x5c420d;
  _0x26f3f2.onchange = _0x5c420d;
  _0x54ab25.oninput = _0x5c420d;
  _0x54ab25.onchange = _0x5c420d;
  _0x3bd46d.onclick = _0x5c420d;
  _0x586f8e.onclick = _0x5c420d;
  _0x176435.onclick = _0x5c420d;
  _0x14d00a.onclick = _0x5c420d;
  document.getElementById("volumePopupContent").classList.toggle("show");
}
var SaveHasRadio;
function SetSpkIcon(_0x5293bb, _0x3c7650 = SaveHasRadio) {
  var _0x3dff54 = document.getElementById("spkBut");
  var _0x16609d = "radio";
  if ((_0x5293bb & 15) == 0) {
    _0x16609d += "off";
  }
  if (_0x3dff54) {
    _0x3dff54.style.backgroundImage = "url('svg/" + _0x16609d + ".svg')";
  }
}
function openList(_0x53b315, _0x5027a2, _0x239baf) {
  var _0x5c0aa5;
  var _0x5bc3f4;
  _0x5bc3f4 = document.getElementsByClassName("listlinks");
  _0x5c0aa5 = 0;
  for (; _0x5c0aa5 < _0x5bc3f4.length; _0x5c0aa5++) {
    _0x5bc3f4[_0x5c0aa5].className = _0x5bc3f4[_0x5c0aa5].className.replace(" active", "");
  }
  if (_0x53b315) {
    _0x53b315.currentTarget.className += " active";
  }
  if (_0x239baf !== undefined) {
    _0x5bc3f4[_0x239baf].className += " active";
  }
  var _0x2d16a1 = clearDiv("visitorsContainer");
  makeElement(_0x2d16a1, "ul", 0, "id" + _0x5027a2);
  var _0x2753dc = {
    Command: "QueNotify"
  };
  switch (_0x5027a2) {
    case "visitors":
      _0x2753dc.Notify = "VisitorsUpdateAll";
      break;
    case "friends":
      _0x2753dc.Notify = "FriendsUpdateAll";
  }
  ToC(_0x2753dc);
}
function bodyResize(_0x2f1742) {
  var _0x1ad40b = document.getElementById("messagesOverlay");
  var _0x5a890b = document.getElementById("messagesTabContainer");
  _0x1ad40b.style.cssText = _0x1ad40b.style.cssText + "; left: " + _0x5a890b.offsetLeft + "px; top: " + _0x5a890b.offsetTop + "px; width: " + _0x5a890b.offsetWidth + "px; height: " + _0x5a890b.offsetHeight + "px;";
  document.getElementById("messagesSuperContainer").style.height = _0x5a890b.offsetHeight + "px";
  var _0xbde078 = document.getElementById("visitorsOverlay");
  var _0x1045af = document.getElementById("visitorsTabContainer");
  if (Browser && ["MS", "FF"].indexOf(Browser) >= 0) {
    _0x1045af.style.cssText = "height:91.1%!important";
  }
  var _0x419f5d = _0x1045af.offsetLeft;
  if (_0x419f5d < 20) {
    _0x419f5d = 0;
    for (var _0x1e1975 = _0x1045af; _0x1e1975.offsetParent; _0x1e1975 = _0x1e1975.offsetParent) {
      _0x419f5d += _0x1e1975.offsetLeft;
    }
  }
  var _0x32949b = document.getElementById("scroller");
  var _0x1d32dd = document.getElementById("textEntryEditable");
  _0x32949b.style.cssText = "; left: " + _0x1d32dd.offsetLeft + "px; top: " + _0x1d32dd.offsetTop + "px; width: " + _0x1d32dd.offsetWidth + "px; height: " + _0x1d32dd.offsetHeight + "px;";
  _0x32949b.width = _0x1d32dd.offsetWidth + "px";
  _0xbde078.style.cssText = _0xbde078.style.cssText + "; left: " + _0x419f5d + "px; top: " + _0x1045af.offsetTop + "px; width: " + _0x1045af.offsetWidth + "px; height: " + _0x1045af.offsetHeight + "px;";
}
var LastBack;
var lastScroller;
var PcBacks = {};
function LoadBackground2(_0x4254fb, _0x4bb0b0) {
  _0x4bb0b0 ||= PcBacks[0];
  if (_0x4bb0b0 != LastBack) {
    LastBack = _0x4bb0b0;
    if (_0x4bb0b0 && _0x4bb0b0 != "transparent") {
      _0x4254fb.xImg = new Image();
      _0x4254fb.xCnt = 1000;
      new Date();
      _0x4254fb.xImg.onload = function (_0x3349db) {
        _0x4254fb.style.backgroundImage = "url(" + _0x4254fb.xImg.src + ")";
        new Date();
      };
      _0x4254fb.xImg.onerror = function (_0x1e5e42) {
        new Date();
        if (!(_0x4254fb.xCnt >= 8000)) {
          setTimeout(function () {
            _0x4254fb.xImg.src = _0x4bb0b0;
          }, _0x4254fb.xCnt);
          _0x4254fb.xCnt *= 2;
        }
      };
      _0x4254fb.xImg.src = _0x4bb0b0;
    } else {
      _0x4254fb.style.background = "";
    }
  }
}
function placeCaretAt(_0x2105a9, _0x424994 = textEntry.childNodes[0]) {
  const _0x2ec057 = document.createRange();
  const _0x3d1e20 = window.getSelection();
  if (!_0x424994) {
    (_0x424994 = textEntry).focus();
  }
  _0x2ec057.setStart(_0x424994, _0x2105a9);
  _0x2ec057.collapse(true);
  _0x3d1e20.removeAllRanges();
  _0x3d1e20.addRange(_0x2ec057);
}
function placeCaretAtEnd(_0x200fa9) {
  if (_0x200fa9) {
    _0x200fa9.focus();
    setTimeout(() => {
      if (window.getSelection !== undefined && document.createRange !== undefined) {
        var _0x205450 = document.createRange();
        var _0x13dae9 = window.getSelection();
        _0x205450.selectNodeContents(_0x200fa9);
        _0x205450.collapse(false);
        _0x13dae9.removeAllRanges();
        _0x13dae9.addRange(_0x205450);
      } else if (document.body.createTextRange !== undefined) {
        var _0x205450 = document.body.createTextRange();
        _0x205450.moveToElementText(_0x200fa9);
        _0x205450.collapse(false);
        _0x205450.select();
      }
    }, 5);
  }
}
function pasteHtmlAtCaret(_0x29bfe9) {
  if (!document.execCommand("insertText", false, _0x29bfe9) && typeof textEntry.setRangeText == "function") {
    const _0xe75597 = textEntry.selectionStart;
    textEntry.setRangeText(_0x29bfe9);
    textEntry.selectionStart = textEntry.selectionEnd = _0xe75597 + _0x29bfe9.length;
    const _0x315792 = document.createEvent("UIEvent");
    _0x315792.initEvent("input", true, false);
    textEntry.dispatchEvent(_0x315792);
  }
}
function newstuff(_0x5812d7) {
  var _0x47c4ea = new Date(2021, 2, 17, 0, 0, 0, 0);
  var _0x4708d8 = new Date(2021, 3, 4, 0, 0, 0, 0);
  let _0x5195d1 = document.getElementById("swPromo");
  let _0x41b595 = document.getElementById("sideBar");
  let _0xbdc55e = localStorage.getItem("swpromo");
  if (_0x47c4ea <= _0x5812d7 && _0x5812d7 <= _0x4708d8) {
    _0x5195d1.style.cssText = "display: inline-flex !important";
    _0x41b595.addEventListener("click", () => {
      _0x5195d1.style.cssText = "display: none !important";
      localStorage.setItem("swpromo", "1");
    });
    if (_0xbdc55e && _0xbdc55e == "1") {
      _0x5195d1.style.cssText = "display: none !important";
    }
  }
}
function setStuffAndListener() {
  let _0x1e4983 = document.getElementById("returnBut");
  addToolTip(_0x1e4983, ["box.4", "Send message"], {
    position: "low"
  });
  document.getElementById("defaultList").addEventListener("click", function (_0x413eaa) {
    openList(_0x413eaa, "visitors");
  });
  document.getElementById("friendsList").addEventListener("click", function (_0x50c2c1) {
    openList(_0x50c2c1, "friends");
  });
  let _0x5a02ed = document.getElementById("groupBut");
  _0x5a02ed.addEventListener("click", function () {
    window.open("//localhost:6969/#featured", "_blank");
  });
  addToolTip(_0x5a02ed, ["box.6", "Chat Groups"], {
    position: "low"
  });
  let _0x257017 = document.getElementById("helpBut");
  _0x257017.addEventListener("click", function () {
    window.open("//localhost:6969/help_", "_blank");
  });
  addToolTip(_0x257017, ["box.7", "View help"], {
    position: "low"
  });
  setXatLogo();
  document.getElementById("GetaChat").addEventListener("click", function () {
    getAChatBoxPressed();
  });
  document.getElementById("signIn").addEventListener("click", function () {
    signInButtonPressed();
  });
  textEntry.addEventListener("keydown", _0x314190 => {
    const _0x427aa8 = _0x314190.key;
    let _0x5d59d1 = window.getSelection().getRangeAt(0);
    let _0x12bd45 = window.getSelection().toString();
    if (_0x314190.ctrlKey && _0x12bd45.length > 2) {
      addMarkDown(_0x427aa8, _0x12bd45, _0x5d59d1);
    }
  });
  textEntry.addEventListener("contextmenu", _0x5a2f95 => {
    textRange = window.getSelection().getRangeAt(0);
    textSelection = window.getSelection().toString();
    if (textSelection.length > 2) {
      _0x5a2f95.preventDefault();
      toggleMenu(true);
      positionMenu(_0x5a2f95);
    } else {
      textRange = null;
      textSelection = null;
      toggleMenu(false);
    }
  });
  document.addEventListener("click", () => {
    toggleMenu(false);
  });
  window.onkeyup = () => {
    toggleMenu(false);
  };
  window.addEventListener("keydown", _0x4ef9d9 => {
    if (_0x4ef9d9.key == "q" && _0x4ef9d9.ctrlKey && !pressed) {
      let _0x2730eb = window.getSelection().toString();
      let _0x40459b = window.getSelection().anchorNode.parentNode.className;
      let _0x554386 = window.getSelection().anchorNode.parentNode.parentElement?.parentElement;
      let _0x943af1 = _0x554386 && _0x554386.dataset && _0x554386.dataset.unique ? "#" + _0x554386.dataset.unique : "";
      if (_0x2730eb.length > 2 && (_0x40459b == "message" || _0x40459b == "msgLink")) {
        textEntry.innerHTML += ">" + _0x943af1 + "[" + replaceBrakets(_0x2730eb.trim()) + "]";
      }
      pressed = true;
    }
  });
  window.addEventListener("keyup", () => {
    pressed = false;
  });
  document.getElementById("textEntryEditable").addEventListener("paste", function (_0x405912) {
    var _0x4f745e;
    _0x405912.stopPropagation();
    _0x405912.preventDefault();
    _0x4f745e = (_0x405912.clipboardData || window.clipboardData).getData("Text");
    const _0x53b68f = reduceTextLength(_0x4f745e);
    if (_0x53b68f.length > 0) {
      _0x4f745e = _0x53b68f;
    }
    pasteHtmlAtCaret(_0x4f745e = _0x4f745e.replace("﻿", ""));
    textEntryCaretPos = getCaretWithin(textEntry);
  });
  textEntry.addEventListener("keydown", () => {
    textEntryCaretPos = getCaretWithin(textEntry);
  });
  textEntry.addEventListener("keyup", () => {
    textEntryCaretPos = getCaretWithin(textEntry);
  });
  textEntry.addEventListener("input", _0x46f22e => {
    const _0x2ffd99 = _0x46f22e?.inputType ?? "";
    if (_0x2ffd99 && ["formatBold", "formatItalic"].indexOf(_0x2ffd99) >= 0) {
      textEntry.innerHTML = _0x46f22e.target.innerText;
    }
    textEntryCaretPos = getCaretWithin(textEntry);
  });
  textEntry.addEventListener("click", () => {
    textEntryCaretPos = getCaretWithin(textEntry);
  });
}
function setXatLogo() {
  let _0x68fa3f = document.getElementById("xatBut");
  _0x68fa3f.addEventListener("click", () => {
    window.open("//localhost:6969", "_blank");
  });
  if (isXatBirthday()) {
    const _0x1ac791 = ["anni1", "anni2", "anni3", "anni4", "anni5", "anni6", "anni7", "anni8", "anni9", "anni10", "anni11", "anni12"];
    const _0x42271d = "http://localhost:6969/images/logo/" + _0x1ac791[Math.floor(Math.random() * _0x1ac791.length)] + ".png";
    if (_0x68fa3f) {
      _0x68fa3f.style.backgroundImage = "url('" + _0x42271d + "')";
    }
  } else {
    addToolTip(_0x68fa3f, ["mob1.homepage", "Homepage"], {
      position: "low"
    });
  }
}
async function requestStorageAccessForEmbed() {
  const _0x5ee334 = _Activity.instance;
  _0x5ee334.returnPermissionForStorageAccess().then(_0x4df44f => {
    if (_0x5ee334.TRIGGERED_PERMISSIONS.includes(_0x4df44f)) {
      setTimeout(() => {
        customModalWithMsg("", "", true, false, true);
        var _0x213c6a = document.querySelector(".NewdialogBody");
        var _0x2a0783 = document.querySelector("#wrapper");
        if (!_0x213c6a || !_0x2a0783) {
          return;
        }
        _0x2a0783.classList.remove("wrapper");
        var _0x3838a2 = GetTranslation("mob2.requestaccess");
        _0x3838a2 ||= "Request access";
        var _0x1fe282 = GetTranslation("mob2.requestaccessmessage");
        _0x1fe282 ||= "You are on an embedded chat. For xat to work properly, please allow access to the storage on the browser. <span style=\"font-weight:bold\">After accepting, you must refresh the page.</span>";
        _0x2a0783.innerHTML += "\n                        <div style=\"margin-top: .5rem; padding:9px; text-align: center;\">\n                            <p>" + _0x1fe282 + "</p>\n                            <div class=\"butcontainer previewBut centered\" style=\"margin-top: 1rem\">\n                                <div class=\"butlayout\" id=\"acceptButton\">" + _0x3838a2 + "</div>\n                            </div>\n                        </div>\n                    ";
        var _0x4cb549 = document.querySelector("#acceptButton");
        _0x4cb549?.addEventListener("click", async () => {
          await _0x5ee334.requestStorageAccessApi();
          document.querySelector("#id_ModalClose_custom")?.click();
        });
      }, 1000);
    }
  }).catch(_0x37399a => console.error(_0x37399a));
}
this.setScroller = function (_0x4e523f) {
  if (lastScroller == _0x4e523f) {
    return;
  }
  var _0x29a5ad = clearDiv("scrollText");
  lastScroller = _0x4e523f;
  if (!_0x4e523f) {
    return;
  }
  let _0x264e59 = "";
  let _0x4a999b = _0x4e523f;
  let _0x5c0f16 = _0x4e523f.match(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})(?![0-9a-fA-F])/);
  if (_0x5c0f16) {
    let _0x40d6f2 = _0x5c0f16.index;
    _0x4a999b = _0x4e523f.slice(0, _0x40d6f2).trim();
    _0x264e59 = _0x5c0f16[0];
    _0x29a5ad.setAttribute("data-has-color", "1");
  } else {
    _0x29a5ad.removeAttribute("data-has-color");
  }
  let _0x275443 = _0x4a999b.split(" ");
  let _0x170d9c = [];
  let _0x573f0c = hasDarkMode() && !_0x264e59 ? "darkScroll" : "";
  let _0x10e966 = _0x264e59 ? "color:" + _0x264e59 + "; " : "";
  for (let _0x11adb6 = 0; _0x11adb6 < _0x275443.length; _0x11adb6++) {
    let _0x223806 = WordIsLink(_0x275443[_0x11adb6], undefined, true);
    if (_0x223806) {
      if (typeof _0x223806 == "object") {
        _0x223806 = _0x223806.l;
      }
      _0x170d9c.push("<a href=\"" + LinkValidator(null, _0x223806, true) + "\" target=\"blank\" class=\"scrollurl " + _0x573f0c + "\" style=\"" + _0x10e966 + "text-decoration: underline;\">" + _0x275443[_0x11adb6] + "</a>");
    } else {
      _0x170d9c.push(_0x275443[_0x11adb6]);
    }
  }
  _0x29a5ad.innerHTML = _0x170d9c.join(" ");
  if (hasDarkMode() && !_0x264e59) {
    _0x29a5ad.classList.add("darkScroll");
  } else {
    _0x29a5ad.classList.remove("darkScroll");
  }
  var _0x2ba0c2;
  var _0x26e5ad;
  var _0x319f8a;
  var _0x2318b9;
  var _0x2eec84 = document.getElementById("scrollText").offsetWidth;
  var _0x3f4a6e = document.getElementById("scroller").offsetWidth;
  if (_0x2eec84 >= _0x3f4a6e) {
    _0x2ba0c2 = Math.round(Math.min(_0x2eec84, 728) / 7);
    _0x26e5ad = _0x319f8a = Math.round(-_0x2eec84);
    _0x2318b9 = "infinite";
  } else {
    var _0x406db7 = (_0x3f4a6e - Math.max(_0x2eec84, 200)) / 2;
    _0x2ba0c2 = Math.round(_0x406db7 / 7);
    _0x26e5ad = _0x319f8a = (_0x3f4a6e - _0x2eec84) / 2;
    _0x2318b9 = 1;
  }
  let _0x1d181a = "scrollKeyframes_" + Math.random().toString(36).substr(2, 3);
  _0x29a5ad.style.cssText = _0x10e966 + "transform: translateX(" + _0x26e5ad + "px); animation: " + _0x1d181a + " " + _0x2ba0c2 + "s linear " + _0x2318b9 + "; transform: translateX(" + _0x26e5ad + "px);";
  let _0x1e801f = "@keyframes " + _0x1d181a + " { 0% { transform: translateX(" + _0x3f4a6e + "px); } 100% { transform: translateX(" + _0x319f8a + "px); } }";
  document.styleSheets[0].insertRule(_0x1e801f, 0);
  _0x29a5ad.style.animation = "none";
  window.requestAnimationFrame(() => {
    _0x29a5ad.style.animation = _0x1d181a + " " + _0x2ba0c2 + "s linear " + _0x2318b9;
  });
};
document.body.onresize = bodyResize;
newstuff(new Date());
(() => {
  const _0x590635 = () => document.querySelector(".textentry")?.textContent.trim() === "";
  let _0x2b3b1d = null;
  document.addEventListener("keydown", _0x15db87 => {
    if (_Activity.instance.QuickBar.sidebarOpened) {
      return;
    }
    if (_0x15db87.shiftKey || !_0x590635() || document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") {
      return;
    }
    if (window.isRinging !== undefined && window.isRinging) {
      return;
    }
    const {
      key: _0x4bcf8a
    } = _0x15db87;
    if (_0x4bcf8a === "ArrowRight" || _0x4bcf8a === "ArrowLeft") {
      if (messages.editMode) {
        return;
      }
      _0x15db87.preventDefault();
      _0x2b3b1d = _0x4bcf8a;
    } else if (_0x4bcf8a === "Escape" && _Activity.CurrentChat.includes("_")) {
      if (messages.editMode) {
        return;
      }
      _Activity.SendC("xatCommand", "", JSON.stringify({
        ChatId: _Activity.CurrentChat,
        Command: "Click",
        DeleteId: _Activity.CurrentChat,
        Next: "1",
        Type: "Click"
      }));
      document.querySelector("#FrameDialogCloseBut").click();
      navigate(-1);
    } else if (_0x4bcf8a === "ArrowUp" && typeof messages != "undefined") {
      messages.handleEditShortCut();
    }
  });
  document.addEventListener("keyup", _0x42bf1d => {
    if (messages.editMode) {
      return;
    }
    if (_0x42bf1d.shiftKey || !_0x590635() || document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") {
      return;
    }
    if (window.isRinging !== undefined && window.isRinging) {
      return;
    }
    const {
      key: _0xd5bec
    } = _0x42bf1d;
    if (_0xd5bec === _0x2b3b1d) {
      if (_0xd5bec === "ArrowRight") {
        navigate(1);
      } else if (_0xd5bec === "ArrowLeft") {
        navigate(-1);
      }
      _0x2b3b1d = null;
    }
  });
})();