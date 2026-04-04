"use strict";
var CurrentSec;
var friends = new function () {
  this.ScrollContainer = document.getElementById("ScrollContainer");
  var _0x16e26d;
  var _0x43c597 = !1;
  let _0x32e1f4;
  let _0x1b9d79 = [];
  let _0x5863a0 = null;
  let _0x1007f2 = [];
  let _0x5ead89 = [];
  function _0x28a4fe() {
    return config.pFlags & NamePowers.category;
  }
  function _0xa355de(_0x38ee13) {
    addTitleBar(["mob1.friends", "Friends"], "", null, _0x38ee13 ? _0x43c597 ? ["mob1.done", "Done"] : ["mob1.edit", "Edit"] : "", _0x38ee13 ? friends.EditClick : null);
  }
  function _0x5ace3d(_0x255994, _0x4b5677, _0x679dd9) {
    if (!_0x5863a0 || _0x5863a0.length == 0 || !_0x28a4fe()) {
      return;
    }
    let _0x41bcd1 = makeElement(document.getElementById("idfriends"), "li", "section dropZone", _0x4b5677);
    if (_0x679dd9) {
      _0x41bcd1.style.color = isColorLight(_0x679dd9) ? "#000" : "#FFF";
      _0x41bcd1.style.backgroundColor = _0x679dd9;
    } else {
      _0x41bcd1.style.color = "#" + toHex6(config.ButColW);
      _0x41bcd1.style.backgroundColor = "#" + toHex6(config.ButCol);
    }
    makeElement(document.getElementById("idfriends"), "ul", "dropZone", _0x255994.replace(/ /g, "") + "_" + _0x4b5677);
    let _0x23750c = makeElement(_0x41bcd1, "span", "section");
    addText(_0x23750c, _0x255994);
    _0x41bcd1.style.fontWeight = 500;
    _0x41bcd1.style.textAlign = "center";
    _0x1007f2.push({
      id: _0x4b5677,
      name: _0x255994
    });
  }
  this.setSettings = function (_0x593ca3) {
    _Activity.instance.UserSettings = JSON.parse(_0x593ca3);
    _0x5863a0 = _Activity.instance.UserSettings.categories?.replace(/”/g, "\"");
    _0x5863a0 &&= _0x5863a0.indexOf("\"") == -1 ? JSON.parse(_0x5863a0.replace(/\?/g, "\"")) : JSON.parse(_0x5863a0);
    if (_Activity.instance.UserSettings?.friendscategories?.replace(/”/g, "\"").length) {
      _0x5ead89 = _Activity.instance.UserSettings.friendscategories.replace(/”/g, "\"");
    }
    if (_0x5ead89?.length) {
      _0x5ead89 = JSON.parse(_0x5ead89.replace(/\?/g, "\""));
    }
  };
  this.main = function (_0x3a539a) {
    xatMain(_0x3a539a);
    _0x16e26d = config.Flags & 1;
    _0xa355de(1);
    document.body.style.display = "block";
    debug("fake");
    if (!_0x16e26d) {
      this.ScrollContainer.style.top = document.getElementById("titleBar").clientHeight + document.getElementById("topSelector").clientHeight + "px";
    }
    this.ScrollContainer.style.bottom = "0px";
    TranslateAll();
    if (!document.querySelector(".friendSearchLabel") || !_Activity.instance.IsClassic) {
      friends.initFriendSearch();
    }
    if (_Activity.instance.UserSettings?.friendscategories) {
      _0x5ead89 = JSON.parse(_Activity.instance.UserSettings?.friendscategories?.replace(/”/g, "\""));
    }
  };
  this.initFriendSearch = function () {
    if (_Activity.instance.IsClassic) {
      let _0x4ec3f4 = document.getElementById("visitorsContainer");
      let _0x24fe12 = makeElement(null, "label", "friendSearchLabel", "", _0x4ec3f4);
      _0x32e1f4 = makeElement(_0x24fe12, "input", "friendSearch", "friendSearch");
      _0x32e1f4.setAttribute("autocomplete", "off");
    } else {
      let _0x33c0b5 = document.querySelector("#searchBar");
      if (_0x33c0b5) {
        resizeSearchBar(_0x33c0b5);
        _0x32e1f4 = _0x33c0b5;
      }
    }
    if (!_0x32e1f4) {
      return;
    }
    let _0xaa0c0c = setTimeout(() => {
      var _0x13fe15 = document.querySelectorAll("li.friend");
      _0x32e1f4.addEventListener("keyup", _0x42cf02 => {
        friends.updateFriendsListResults(_0x42cf02, _0x13fe15);
      });
      clearTimeout(_0xaa0c0c);
    }, 5);
  };
  this.updateFriendsListResults = function (_0x5ea400, _0x16ab51) {
    let _0x394d42 = _0x5ea400.target.value;
    if (_0x16ab51.length > 0) {
      for (let _0x3c15d0 = 0; _0x3c15d0 < _0x16ab51.length; _0x3c15d0++) {
        let _0x20322c = _0x16ab51[_0x3c15d0].dataset;
        let _0x3073d8 = _0x16ab51[_0x3c15d0].id.replace(/Friends/gi, "");
        let _0x416e5d = _0x16ab51[_0x3c15d0].getElementsByClassName("friendsName");
        let _0x58a815 = !1;
        if (_0x416e5d) {
          _0x416e5d = _0x416e5d[0].innerText.toLowerCase().normalize("NFD").replace(/[^\x00-\x7F]/g, "");
          if (_0x3073d8.substr(0, _0x394d42.length) == _0x394d42) {
            _0x58a815 = true;
          }
          if (_0x416e5d.indexOf(_0x394d42.toLowerCase()) >= 0) {
            _0x58a815 = true;
          }
          if (_0x20322c && _0x20322c.regname && _0x20322c.regname.toLowerCase().indexOf(_0x394d42.toLowerCase()) >= 0) {
            _0x58a815 = true;
          }
          if (_0x58a815) {
            friends.hideShowIfNeeded(_0x16ab51[_0x3c15d0], _0x3073d8, "");
          } else {
            friends.hideShowIfNeeded(_0x16ab51[_0x3c15d0], _0x3073d8, "none");
          }
        }
      }
    }
  };
  this.hideShowIfNeeded = function (_0x5d109b, _0x167bf7, _0x189db8) {
    if (_0x5d109b) {
      _0x5d109b.style.display = _0x189db8;
    }
    if (_0x167bf7) {
      let _0x10daf2 = document.querySelector("#Friends" + _0x167bf7);
      if (_0x10daf2) {
        _0x10daf2.style.display = _0x189db8;
      }
    }
  };
  this.setNoFriends = function () {
    var _0x52085d = document.getElementById("idfriends");
    let _0x410348 = document.querySelector(".friendSearchLabel");
    if (_0x410348) {
      _0x410348.style.display = "none";
    }
    _0x52085d.appendChild(MakeHelpMessage(TransText("mob2.nofriends", "No friends added")));
  };
  this.sendApp = function (_0x23056f, _0x5e35d6, _0x1400dd, _0x2dba4c) {
    var _0x434f86;
    _0x23056f.target;
    if (_0x23056f) {
      _0x23056f.stopPropagation();
    }
    if (_0x5e35d6 !== null && typeof _0x5e35d6 == "object") {
      if (_0x5e35d6.Type !== "swiperight") {
        return;
      }
      if (!(_0x2dba4c = _0x5e35d6.id)) {
        return;
      }
      _0x5e35d6 = _0x2dba4c.substring(7);
    }
    switch (_0x5e35d6) {
      case "Friends":
        _0x43c597 = !1;
      case "Contacts":
        (_0x434f86 = {
          Page: "friends",
          Command: "friends" + _0x5e35d6
        }).Type = _0x434f86.Command;
        _0xa355de(_0x5e35d6 == "Friends" ? 1 : 0);
        break;
      default:
        if (_0x5e35d6 == 0) {
          return;
        }
        var _0x172943 = {
          Type: "Click",
          UserNo: _0x5e35d6,
          Page: "friends",
          Command: "SaveId",
          Next: "actions"
        };
        if (!_0x2dba4c) {
          _0x434f86 = _0x172943;
          classicSetDialog(_0x434f86.Next, _0x5e35d6);
          return;
        }
        var _0x537682 = {
          UserNo: _0x5e35d6,
          Page: "friends",
          Command: "Action",
          name: "Unfriend"
        };
        _0x434f86 = _0x537682;
    }
    ToC(_0x434f86);
  };
  this.EditClick = function () {
    _0x43c597 = !_0x43c597;
    var _0x4d38d7 = {
      Command: "EditChange"
    };
    _0x4d38d7.OnOff = _0x43c597 ? "On" : "Off";
    ToC(_0x4d38d7);
    _0xa355de(1);
  };
  this.SetEdit = function (_0x14d00a) {
    var _0x53e4ab;
    var _0x4d0602 = document.getElementsByClassName("EditCell");
    var _0x376d68 = _0x14d00a == "1";
    for (_0x53e4ab = 0; _0x53e4ab < _0x4d0602.length; _0x53e4ab++) {
      var _0x4a1652 = _0x4d0602[_0x53e4ab];
      _0x4a1652.innerHTML = "";
      if (_0x376d68) {
        var _0x441a48 = makeElement(_0x4a1652, "img");
        _0x441a48.height = 24;
        _0x441a48.src = "svg/deleteicon.svg";
        _0x4a1652.onclick = function (_0x456230) {
          friends.sendApp(_0x456230, this.id.substring(3), 0, "del");
        };
      }
    }
  };
  this.addSection = function (_0x2e77d3) {
    var _0x24f29a;
    _0x24f29a = clearDiv("idfriends");
    makeElement(_0x24f29a, "div", "", "0");
    document.getElementById("idfriends");
    SetSection(_0x2e77d3);
    if (_Activity.instance.UserSettings.categories) {
      _0x5863a0 = JSON.parse(_Activity.instance.UserSettings.categories.replace(/”/g, "\""));
    }
    if (_0x5863a0 && _0x5863a0.length > 0 && _0x28a4fe()) {
      _0x5863a0.forEach(_0x3c2c72 => {
        _0x5ace3d(_0x3c2c72.name, _0x3c2c72.id, _0x3c2c72.color);
      });
      _0x5ace3d("", "others");
    }
  };
  this.addFriend = function (_0x14de8a, _0x31911b) {
    var _0x4ac16c = JSON.parse(_0x14de8a);
    let _0x4a7310 = !1;
    _0x1b9d79.push(_0x4ac16c);
    if (_Activity.instance.UserSettings && (_Activity.instance.UserSettings.hidefriends == "available" || _Activity.instance.UserSettings.hidefriends == "both") && _0x4ac16c.pawn == "(p1pwn#ff5800)") {
      return;
    }
    if (_Activity.instance.UserSettings && (_Activity.instance.UserSettings.hidefriends == "offline" || _Activity.instance.UserSettings.hidefriends == "both") && _0x4ac16c.pawn == "(p1pwn#ff0000)") {
      return;
    }
    var _0x462d4a = _0x4ac16c.id;
    if (_0x462d4a == 0) {
      return;
    }
    var _0x349c33;
    var _0x15f6a8;
    var _0x20c956;
    var _0x5e6a8a = "";
    var _0x533ecd = _0x4ac16c.list;
    var _0x62306a = _0x533ecd + _0x462d4a;
    var _0x447916 = document.getElementById("idfriends");
    if (_0x5863a0 && _0x5863a0.length > 0 && _0x28a4fe()) {
      _0x447916 = document.getElementById("_others");
      _0x5ead89?.forEach(_0xc7282f => {
        if (_0xc7282f.user == _0x62306a) {
          _0x447916 = document.getElementById(_0xc7282f.name.replace(/ /g, "") + "_" + _0xc7282f.id);
        }
      });
      _0x4a7310 = true;
    }
    if (!_0x447916) {
      return;
    }
    removeById(_0x62306a);
    var _0x485872;
    var _0x1b7bc5 = window;
    var _0x2fa0b1 = [];
    var _0x6fbab = window;
    var _0x33c4d9 = !1;
    var _0x204984 = !1;
    var _0x302182 = null;
    var _0x124106 = document.body;
    var _0x323be0 = document.documentElement;
    let _0x5660d5 = document.getElementById("visitorsContainer");
    let _0x44f6e2 = null;
    let _0x1dd9a3 = 0;
    function _0x551fc7(_0x2ebe38) {
      var _0x561c51 = Math.max(0, _0x1b7bc5.pageXOffset || _0x323be0.scrollLeft || _0x124106.scrollLeft || 0) - (_0x323be0.clientLeft || 0);
      scrollY = Math.max(0, _0x1b7bc5.pageYOffset || _0x323be0.scrollTop || _0x124106.scrollTop || 0) - (_0x323be0.clientTop || 0);
      if (_0x33c4d9) {
        var _0x2e65bb = _0x2ebe38 !== undefined && _0x2ebe38.targetTouches !== undefined ? _0x2ebe38.targetTouches[0] : {};
        var _0xab0ce6 = _0x2e65bb ? Math.max(0, _0x2e65bb.pageX || _0x2e65bb.clientX || 0) - _0x561c51 : 0;
        var _0x36b7ab = _0x2e65bb ? Math.max(0, _0x2e65bb.pageY || _0x2e65bb.clientY || 0) - scrollY : 0;
      } else {
        _0xab0ce6 = _0x2ebe38 ? Math.max(0, _0x2ebe38.pageX || _0x2ebe38.clientX || 0) - _0x561c51 : 0;
        _0x36b7ab = _0x2ebe38 ? Math.max(0, _0x2ebe38.pageY || _0x2ebe38.clientY || 0) - scrollY : 0;
      }
      var _0x34d961 = {
        x: _0xab0ce6,
        y: _0x36b7ab
      };
      return _0x34d961;
    }
    function _0x3e83f2(_0x1493ac, _0x35e436, _0x594468) {
      if (_0x1493ac) {
        var _0x20d735 = _0x1493ac.getBoundingClientRect();
        var _0xfe8405 = _0x35e436 > _0x20d735.left && _0x35e436 < _0x20d735.left + _0x20d735.width;
        var _0x860f4 = _0x594468 > _0x20d735.top && _0x594468 < _0x20d735.top + _0x20d735.height;
        return _0xfe8405 && _0x860f4;
      }
    }
    function _0x2df30f(_0xf3f183, _0x2ebe48) {
      if (_0x5863a0 && _0x5863a0.length > 0 && _0x28a4fe() && _0x302182) {
        setTimeout(() => _0x204984 = !1, 50);
        clearTimeout(_0x485872);
        _0x302182.style.top = "0px";
        clearInterval(_0x44f6e2);
        _0x44f6e2 = null;
        _0x1dd9a3 = 0;
        _0x2ebe48.classList.remove("friendActive");
        if (_0x33c4d9) {
          window.removeEventListener("touchmove", _0x5841bd);
        } else {
          window.removeEventListener("mousemove", _0x5841bd);
        }
        let _0xf992e8 = null;
        _0x5863a0.forEach(_0x24d802 => {
          _0xf992e8 = document.getElementById(_0x24d802.name.replace(/ /g, "") + "_" + _0x24d802.id);
          _0xf992e8.style.backgroundColor = "";
          _0xf992e8.style["border-radius"] = "";
        });
        _0xf992e8 = document.getElementById("_others");
        _0xf992e8.style.backgroundColor = "";
        _0xf992e8.style["border-radius"] = "";
        _0x1007f2.forEach(_0x200bac => {
          _0x33c4d9 = !1;
          _0x551fc7(_0xf3f183);
          var _0x58710d = document.getElementById(_0x200bac.id);
          var _0x2f21b7 = document.getElementById(_0x200bac.name.replace(/ /g, "") + "_" + _0x200bac.id);
          if (_0x3e83f2(_0x58710d, _0x2fa0b1[0], _0x2fa0b1[1]) || _0x3e83f2(_0x2f21b7, _0x2fa0b1[0], _0x2fa0b1[1])) {
            if (!_0x302182) {
              return;
            }
            let _0x5dadab = _0x302182.id;
            let _0x3ff4bb = _0x5ead89?.filter(_0x4330c7 => _0x4330c7.user == _0x5dadab);
            if (_0x3ff4bb && _0x3ff4bb[0] !== undefined && _0x3ff4bb[0].id == _0x200bac.id || _0x200bac.id == "others" && !_0x3ff4bb[0]) {
              return;
            }
            document.getElementById(_0x200bac.name.replace(/ /g, "") + "_" + _0x200bac.id).appendChild(document.getElementById(_0x5dadab));
            _0x5ead89 = _0x5ead89?.filter(_0x2bf320 => _0x2bf320.user != _0x5dadab) || [];
            if (_0x200bac.id != "others") {
              _0x5ead89?.push({
                user: _0x5dadab,
                name: _0x200bac.name,
                id: _0x200bac.id
              });
            }
            (function (_0x5dc111, _0x15fac9) {
              var _0x2ff238 = {
                Page: "Setting",
                Command: "Setting",
                Name: _0x5dc111,
                Value: _0x15fac9
              };
              let _0x1daec4 = _0x2ff238;
              _0x1daec4.Type = _0x1daec4.Command;
              ToC(_0x1daec4);
            })("friendscategories", JSON.stringify(_0x5ead89));
          }
        });
        _0x302182 = null;
      }
      if (_0x5660d5) {
        _0x5660d5.style["overflow-y"] = "auto";
      }
    }
    function _0x5841bd(_0x26e04c) {
      if (_0x204984 && _0x302182) {
        let _0x5dba0c = _0x551fc7(_0x26e04c);
        (function (_0x55ba0b, _0x3ae3db) {
          if (!_0x55ba0b) {
            return;
          }
          const _0xc71cd4 = _0x5660d5 || _0x55ba0b.parentNode;
          let _0x3f8710 = _0xc71cd4.getBoundingClientRect().height - Math.abs(Math.abs(_0x55ba0b.getBoundingClientRect().top) - _0xc71cd4.getBoundingClientRect().height);
          let _0x150de0 = _0x3f8710 >= _0xc71cd4.getBoundingClientRect().height - 15;
          let _0x4f46f2 = _0x3f8710 <= 15;
          if (_0x4f46f2 || _0x150de0) {
            _0xc71cd4.style["overflow-y"] = "auto";
            if (_0x150de0) {
              clearInterval(_0x44f6e2);
              _0x44f6e2 = null;
              _0x44f6e2 = setInterval(function () {
                if (_0xc71cd4 && document.getElementById("idfriends") && _0xc71cd4.scrollTop < document.getElementById("idfriends").getBoundingClientRect().height - _0xc71cd4.getBoundingClientRect().height) {
                  _0x1dd9a3 += 10;
                  _0xc71cd4.scrollTop += 10;
                }
                _0x55ba0b.style.top = _0x3ae3db + _0x1dd9a3 + "px";
              }, 25);
            } else if (_0x4f46f2) {
              clearInterval(_0x44f6e2);
              _0x44f6e2 = null;
              _0x44f6e2 = setInterval(function () {
                if (_0xc71cd4.scrollTop > 0) {
                  _0x1dd9a3 -= 10;
                  _0xc71cd4.scrollTop -= 10;
                }
                _0x55ba0b.style.top = _0x3ae3db + _0x1dd9a3 + "px";
              }, 25);
            }
          } else {
            _0xc71cd4.style["overflow-y"] = "hidden";
            clearInterval(_0x44f6e2);
            _0x44f6e2 = null;
          }
          let _0x563c51 = null;
          _0x5863a0.forEach(_0x531e54 => {
            _0x563c51 = document.getElementById(_0x531e54.name.replace(/ /g, "") + "_" + _0x531e54.id);
            if (_0x3e83f2(_0x563c51, _0x2fa0b1[0], _0x2fa0b1[1])) {
              _0x563c51.style["border-radius"] = "4px";
              _0x563c51.style.backgroundColor = "rgba(30, 30, 130, 0.6)";
            } else if (_0x563c51) {
              _0x563c51.style.backgroundColor = "";
              _0x563c51.style["border-radius"] = "";
            }
          });
          _0x563c51 = document.getElementById("_others");
          if (_0x3e83f2(_0x563c51, _0x2fa0b1[0], _0x2fa0b1[1])) {
            _0x563c51.style["border-radius"] = ".3rem";
            _0x563c51.style.backgroundColor = "rgba(0, 0, 130, .2)";
          } else if (_0x563c51) {
            _0x563c51.style.backgroundColor = "";
            _0x563c51.style["border-radius"] = "";
          }
          _0x55ba0b.style.top = _0x3ae3db + _0x1dd9a3 + "px";
          _0x55ba0b.style.position = "relative";
        })(_0x302182, _0x5dba0c.y - _0x6fbab.y);
        _0x2fa0b1 = [_0x5dba0c.x, _0x5dba0c.y];
      }
    }
    var _0x52b77a;
    var _0x3d13d5;
    var _0x21d591;
    var _0x1f9951 = makeElement(null, "li", "friend xfriend");
    iidLine++;
    _0x1f9951.setAttribute("data-line", iidLine);
    _0x1f9951.id = _0x62306a;
    _0x1f9951.setAttribute("data-regname", _0x4ac16c.regname);
    if (!_0x16e26d) {
      AddHammer(_0x1f9951, Hammer.DIRECTION_RIGHT, this.sendApp);
    }
    if (_0x5863a0 && _0x5863a0.length > 0 && _0x28a4fe()) {
      _0x1f9951.addEventListener("mousedown", function (_0x46dbcd) {
        clearInterval(_0x44f6e2);
        _0x302182 = this;
        _0x33c4d9 = false;
        _0x44f6e2 = null;
        _0x1dd9a3 = 0;
        _0x485872 = setTimeout(() => {
          if (_0x5863a0 && _0x5863a0.length > 0 && _0x28a4fe()) {
            window.addEventListener("mousemove", _0x5841bd, false);
            this.classList.add("friendActive");
            _0x204984 = true;
            _0x6fbab = _0x551fc7(_0x46dbcd);
            _0x5841bd(_0x46dbcd);
          }
        }, 250);
      }, false);
      _0x1f9951.addEventListener("touchstart", function (_0x56c5c3) {
        clearInterval(_0x44f6e2);
        _0x302182 = this;
        _0x33c4d9 = true;
        _0x44f6e2 = null;
        _0x1dd9a3 = 0;
        _0x485872 = setTimeout(() => {
          if (_0x5863a0 && _0x5863a0.length > 0 && _0x28a4fe()) {
            window.addEventListener("touchmove", _0x5841bd, false);
            this.classList.add("friendActive");
            _0x204984 = true;
            _0x6fbab = _0x551fc7(_0x56c5c3);
            _0x5841bd(_0x56c5c3);
          }
        }, 250);
      }, false);
      window.addEventListener("touchend", _0x2d9cd5 => {
        _0x2df30f(_0x2d9cd5, _0x1f9951);
      }, false);
      window.addEventListener("mouseup", _0x24ca6e => {
        _0x2df30f(_0x24ca6e, _0x1f9951);
      }, false);
      _0x52b77a = document;
      _0x3d13d5 = "mouseout";
      _0x21d591 = _0x2efea1 => {
        var _0x61fce8 = (_0x2efea1 = _0x2efea1 || window.event).relatedTarget || _0x2efea1.toElement;
        if (!_0x61fce8 || _0x61fce8.nodeName == "HTML") {
          _0x2df30f(_0x2efea1, _0x1f9951);
        }
      };
      if (_0x52b77a.addEventListener) {
        _0x52b77a.addEventListener(_0x3d13d5, _0x21d591, false);
      } else if (_0x52b77a.attachEvent) {
        _0x52b77a.attachEvent("on" + _0x3d13d5, _0x21d591);
      }
      _0x1f9951.addEventListener("touchcancel", _0x2df30f, false);
    }
    let _0x386b1c = getTooltipInfo(_0x4ac16c);
    addToolTip(_0x1f9951, _0x386b1c, {
      position: "left",
      maxWidth: !0
    });
    var _0x4e3f0b = makeElement(_0x1f9951, "div", "listTable");
    var _0x30449d = makeElement(_0x4e3f0b, "div", "dialogRow");
    makeElement(_0x30449d, "div", "dialogCell dialogCellMiddle EditCell", "del" + _0x462d4a);
    if (!_0x16e26d) {
      _0x20c956 = makeElement(_0x30449d, "div", "dialogCell dialogCellMiddle");
    }
    var _0x5af2a7 = makeElement(_0x30449d, "div", "dialogCell cellWide noPointer");
    var _0x485861 = makeElement(_0x5af2a7, "div", "");
    makeElement(_0x5af2a7, "div", "");
    var _0x1b180d = makeElement(_0x30449d, "div", "dialogCell dialogCellMiddle");
    var _0x59468e = {
      size: 30,
      scrollParent: this.ScrollContainer
    };
    _0x15f6a8 = makeElement(_0x1b180d, "div", "conimg", "arw" + _0x462d4a);
    if (_0x20c956) {
      _0x4ac16c.image ||= "(smile)";
      _Activity.instance.Avatars.MakeAvatar(_0x20c956, _0x4ac16c.image, _0x59468e);
    }
    if ((_0x349c33 = ProcessName(_0x4ac16c.name, _0x4ac16c.status, _0x4ac16c.pFlags | NamePowers.nospace)).name.length >= 35 && !_0x16e26d) {
      _0x349c33.name = _0x349c33.name.substr(0, 35) + "..";
    }
    _0x349c33.name = _0x4ac16c.pawn + _0x349c33.name;
    if (_0x349c33.status != null) {
      _0x5e6a8a = _0x349c33.status;
    }
    var _0x57f06a = makeElement(_0x485861, "p");
    _0x57f06a.className = "friendsName";
    createNameSm(_0x57f06a, _0x4ac16c.name, {
      flags: _0x4ac16c.pFlags,
      pawn: _0x4ac16c.pawn,
      userId: _0x4ac16c.id,
      userName: _0x4ac16c.regname,
      scrollParent: this.ScrollContainer,
      className: "userNick",
      parent: _0x1f9951
    });
    if (!_0x16e26d) {
      var _0x5af87c = makeElement(_0x485861, "p");
      _0x5af87c.className = "friendsStatus";
      if (_0x5e6a8a) {
        var _0x4441fc = document.createTextNode(_0x5e6a8a);
        if (_0x349c33.statusglow !== undefined) {
          _0x5af87c.style["text-shadow"] = MakeGlow(_0x349c33.statusglow);
        }
        if (_0x349c33.statuscol !== undefined) {
          _0x5af87c.style.color = "#" + toHex6(_0x349c33.statuscol);
        }
        _0x5af87c.appendChild(_0x4441fc);
      }
      createNameSm(_0x5af87c, _0x4ac16c.text);
      _0x15f6a8.innerHTML = "";
      var _0x4c5cc0 = makeElement(_0x15f6a8, "img", "conimg");
      var _0x1ec483 = !1;
      switch (_0x4ac16c.pawn) {
        case "(p1pwn#00c100)":
          _0x1ec483 = "arrowgreen";
          break;
        case "(p1pwn#ff5800)":
          _0x1ec483 = "arroworange";
          break;
        case "(p1pwn#ff0000)":
          _0x1ec483 = "arrowred";
      }
      if (_0x1ec483) {
        _0x4c5cc0.src = "svg/" + _0x1ec483 + ".svg";
      }
    }
    _0x1f9951.pid = [_0x462d4a, _0x4ac16c.name];
    _0x1f9951.onclick = function (_0x5394b1) {
      if (!_0x204984) {
        friends.sendApp(_0x5394b1, this.pid[0], this.pid[1]);
      }
    };
    if (_0x31911b >= 0) {
      const _0x51d0c4 = _0x533ecd + _0x31911b;
      if (_0x4a7310) {
        const _0x4a52db = _0x447916.firstChild;
        if (_0x31911b == 0) {
          _0x447916.insertBefore(_0x1f9951, _0x4a52db);
        } else {
          _0x447916.appendChild(_0x1f9951);
        }
      } else if (_0x31911b == 0) {
        const _0x12788d = _0x447916.firstChild;
        if (_0x12788d) {
          _0x447916.insertBefore(_0x1f9951, _0x12788d);
        } else {
          _0x447916.appendChild(_0x1f9951);
        }
      } else {
        insertAfter(_0x1f9951, document.getElementById(_0x51d0c4));
      }
    } else {
      _0x447916.appendChild(_0x1f9951);
    }
    _0x1f9951.id = _0x62306a;
    if (_0x32e1f4 && _0x32e1f4.value.length > 0) {
      _0x1f9951.style.display = "none";
    }
  };
}();