const kProfileSmileySizeThreshold = 100;
const kDefaultFrameSize = 30;
class Smilies {
  constructor() {
    if (Smilies.instance) {
      return Smilies.instance;
    }
    Smilies.instance = this;
    this.instance = this;
    this.Smilies = {};
    this.Retries = 14;
    this.Animation = !1;
    this.RetryDelay = 1000;
    this.SmiliesMemory = 0;
    this.Containers = new Set();
    this.BombAnimatedSvg = "";
    this.UltraSmiliesContainer = document.querySelector("#ultraSmiliesContainer");
    this.EmptyPixel = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=";
    this.IntersectionObserver = new IntersectionObserver(this.IntersectionObserverCallback, {
      threshold: 0,
      rootMargin: "60px"
    });
    this.SmiliesGlow = {
      "#FFFFFF": ["angel", "everypower", "namewave", "big"],
      "#00FF00": ["gkaoani", "gback", "boot", "namegrad"],
      "#00FFFF": ["yellow", "iconcolor", "pawnhue", "xaf", "vaf"]
    };
    this.SmiliesGoBig = ["ss", "usss", "lb", "bugs"];
    this.DumpMemoryInterval = window.setInterval(this.DumpMemory.bind(this), 10000);
  }
  Debounce(_0x1299b8) {
    let _0x18abd6;
    return function () {
      for (var _0x954d6d = arguments.length, _0x1232ea = new Array(_0x954d6d), _0x316856 = 0; _0x316856 < _0x954d6d; _0x316856++) {
        _0x1232ea[_0x316856] = arguments[_0x316856];
      }
      if (_0x18abd6) {
        cancelAnimationFrame(_0x18abd6);
      }
      _0x18abd6 = requestAnimationFrame(() => {
        _0x1299b8(..._0x1232ea);
      });
    };
  }
  ReloadAll(_0x1e0968) {
    this.Animation = _0x1e0968;
    const _0x3b7639 = Object.getOwnPropertyNames(this.Smilies);
    for (let _0x2d93e6 = 0; _0x2d93e6 < _0x3b7639.length; _0x2d93e6++) {
      delete this.Smilies[_0x3b7639[_0x2d93e6]];
    }
  }
  MakeSmiley(_0x5c9967, _0x20874e, _0x54fc24) {
    const {
      addGback: _0x35f8d5,
      scrollParent: _0x902ca2
    } = _0x54fc24;
    let _0x4a0ca9 = _0x54fc24.size || 20;
    if (_0x20874e[0] == "(") {
      _0x20874e = _0x20874e.split(")")[0].slice(1);
    }
    let _0x144018 = _0x20874e = _0x20874e.replace(/\#/g, "*").replace(/[\s]/g, "");
    const _0x40400d = _0x144018.slice(-1) === "*";
    while (_0x144018.slice(-1) == "*") {
      _0x144018 = _0x144018.slice(0, -1);
    }
    let _0x3a496a = _0x144018.toLowerCase().split("*");
    const _0x116566 = _0x144018[0] == "<";
    const _0x230887 = _0x3a496a.length > 1;
    const _0x25922a = _0x3a496a.length == 1 && !_0x40400d;
    const _0x383715 = _0x54fc24.isPawn = _0x144018.slice(0, 2) == "p1";
    const _0x108a5e = (_0x54fc24.className ?? "") + (_0x383715 ? " pawn" : "");
    _0x54fc24.isName = _0x54fc24.isName ?? !1;
    if (_0x3a496a.length > 1) {
      const _0x2a9547 = _0x3a496a.length;
      for (let _0x2def54 = 0; _0x2def54 < _0x2a9547; _0x2def54++) {
        const _0x5364e6 = _0x3a496a[_0x2def54];
        if (_0x5364e6 == "mi" || _0x5364e6 == "im") {
          _0x54fc24.isMirrored = _0x54fc24.isInverted = true;
        }
        if (_0x5364e6 == "m") {
          _0x54fc24.isMirrored = true;
        }
        if (_0x5364e6 == "i") {
          _0x54fc24.isInverted = true;
        }
      }
    }
    if (_0x144018.toLowerCase().indexOf("num*num") == -1 && _0x144018.toLowerCase().indexOf("pframe*w") == -1 && _0x144018.toLowerCase().indexOf("stick*") == -1) {
      _0x144018 = _0x144018.toLowerCase();
    }
    if (_0x902ca2 && !this.Containers.has(_0x902ca2)) {
      this.Containers.add(_0x902ca2);
      _0x902ca2.intersectionObserver = new IntersectionObserver(this.IntersectionObserverCallback, {
        root: _0x902ca2,
        threshold: 0,
        rootMargin: "60px"
      });
    }
    let _0x580c1a = "";
    const _0x800d8f = _Activity?.instance?.gConfig;
    const _0x40082d = _0x3a496a[0]?.toLowerCase();
    const _0x1b345e = _0x40082d == "bump" || _Activity?.instance?.SOTH && _Activity?.instance?.SOTH.indexOf(_0x40082d) >= 0;
    if (_0x35f8d5 && !_0x1b345e && _0x800d8f && !_0x383715 && !_0x116566 && _0x25922a && _Activity?.instance?.UserSettings?.gback != "disable" && (_0x800d8f?.g130 && (_0x580c1a += "*" + _0x800d8f?.g130), _0x800d8f?.g106 && _0x800d8f?.g106 != " - 1")) {
      if (_0x800d8f?.g106.indexOf("#") != -1) {
        let _0x368da8 = _0x800d8f?.g106?.split("#");
        _0x368da8 = _0x368da8[0] != "-1" ? _0x368da8[0] : _0x368da8[1];
        _0x580c1a += "*" + toHex6(_0x368da8).toLowerCase();
      } else if (_0x800d8f?.g106 != "-1") {
        _0x580c1a += "*" + toHex6(_0x800d8f?.g106).toLowerCase();
      }
    }
    let _0x2ed5d3 = _0x54fc24.gsSize = _0x4a0ca9;
    if (this.Animation && _0x54fc24.applyEffects && !_0x3a496a.includes("angel") && this.SmiliesGoBig.includes(_0x3a496a[0])) {
      _0x54fc24.gsSize = _0x2ed5d3 = 80;
    }
    const _0x4c8979 = this.Animation ? "a" : "S";
    const _0x131749 = this.MakeElement(_0x5c9967, "span", _0x108a5e);
    const _0x14244b = _0x116566 ? this.IconToLib(_0x144018, _0x2ed5d3) : this.EncodeGetStrip(_0x4c8979 + "_(" + _0x144018 + _0x580c1a + ")_" + _0x2ed5d3);
    const _0x487604 = _0x116566 ? this.IconToLib(_0x144018, _0x2ed5d3) : _0x4c8979 + "_(" + _0x20874e + _0x580c1a + ")_" + _0x2ed5d3 + this.GenerateAvatarEffectHash(_0x54fc24.avatarEffect);
    const _0xa3191c = "http://localhost:6969/" + _0x14244b;
    _0x131749.code = _0x20874e;
    _0x131749.dataset.sm = _0x144018;
    _0x131749.dataset.smHash = _0x487604;
    _0x131749.style.width = _0x4a0ca9 + "px";
    _0x131749.style.height = _0x4a0ca9 + "px";
    _0x131749.documentBody = document.body;
    _0x131749.createdAt = Date.now();
    if (_0x144018.substr(0, 4) == "none") {
      return _0x131749;
    }
    if (_0x3a496a[0] != "count" || _0x54fc24?.className == "appIcon" || _0x54fc24?.className == "smSpan") {
      if (_0x487604 in this.Smilies) {
        this.Smilies[_0x487604].lastUsed = Date.now();
        this.Smilies[_0x487604].wrappers.push(_0x131749);
        this.Smilies[_0x487604].optionsArr.push(_0x54fc24);
        this.Smilies[_0x487604].avatarEffect = _0x54fc24.avatarEffect;
        this.SmileyLoaded(this.Smilies[_0x487604]);
      } else {
        this.Smilies[_0x487604] = new Image();
        this.Smilies[_0x487604].url = _0xa3191c;
        this.Smilies[_0x487604].wrappers = [_0x131749];
        this.Smilies[_0x487604].hash = _0x487604;
        this.Smilies[_0x487604].size = _0x4a0ca9;
        this.Smilies[_0x487604].retries = 0;
        this.Smilies[_0x487604].smileyName = _0x144018;
        this.Smilies[_0x487604].smileyCode = _0x20874e;
        this.Smilies[_0x487604].isComboSmiley = _0x230887;
        this.Smilies[_0x487604].loaded = false;
        this.Smilies[_0x487604].lastUsed = Date.now();
        this.Smilies[_0x487604].optionsArr = [_0x54fc24];
        this.Smilies[_0x487604].onload = _0x36dcb6 => this.SmileyLoaded.call(this, _0x36dcb6.target);
        this.Smilies[_0x487604].onerror = _0x388c93 => this.SmileyError.call(this, _0x388c93.target);
        this.Smilies[_0x487604].src = _0xa3191c;
        this.Smilies[_0x487604].avatarEffect = _0x54fc24.avatarEffect;
      }
      this.ApplyClickEvent(this.Smilies[_0x487604], _0x131749);
      return _0x131749;
    }
    {
      new Count(_0x131749, _0x3a496a.slice(1, 5));
      const {
        _window: _0x438c15 = window,
        tooltip: _0x4053ad,
        tooltipPosition: _0x3d9c75 = "top",
        adBanner: _0x2a5586 = !1
      } = _0x54fc24;
      const _0x539c46 = {
        position: _0x3d9c75,
        select: !0
      };
      if (_0x4053ad) {
        (_0x2a5586 || _0x438c15).addToolTip(_0x131749, _0x4053ad, _0x539c46);
      }
    }
  }
  ApplyClickEvent(_0x323e52, _0x7d5514) {
    if (!_0x323e52) {
      return;
    }
    const _0x4a2041 = _0x323e52.smileyName;
    const _0x1142f7 = _0x323e52.optionsArr[_0x323e52.optionsArr.length - 1];
    const {
      showAd: _0x3ec4c5 = !0,
      userID: _0xcd9752,
      userName: _0x500e4d,
      callback: _0x57b944,
      callbackTarget: _0x39fad5,
      _window: _0x45f0f0 = window,
      tooltip: _0x175380,
      tooltipPosition: _0x30c053 = "top",
      adBanner: _0x579141 = !1
    } = _0x1142f7;
    const _0x8cf625 = {
      position: _0x30c053,
      select: !0
    };
    if (_0x175380) {
      (_0x579141 || _0x45f0f0).addToolTip(_0x39fad5 ?? _0x7d5514, _0x175380, _0x8cf625);
    }
    (_0x39fad5 ?? _0x7d5514).addEventListener("click", _0x3222c0 => {
      if (_0x57b944) {
        _0x57b944(_0x3222c0);
      } else if (_Activity?.instance.PSSA) {
        const _0x5c0f38 = _0x4a2041.split("*");
        const _0x3001c1 = _0x5c0f38[0];
        const _0x3d802f = _Activity.instance.PSSA.indexOf(_0x3001c1) - 1;
        const _0x3eaaf5 = {
          id: _0xcd9752,
          regname: _0x500e4d
        };
        if (_0x4a2041.slice(0, 13) == "radio*http://" || _0x4a2041.slice(0, 14) == "radio*https://") {
          const _0x2e7cf4 = _0x5c0f38[1];
          _Activity.instance.PlayRadio(_0x2e7cf4);
        } else if (_0x3001c1 == "xavi") {
          openApp("xavi");
        } else if (_0x3001c1 == "gifts") {
          setAppIcon(20044);
          openGift(_0x3eaaf5);
        } else if (_0x3d802f > 0 && _0x3ec4c5 && !_0x323e52.isComboSmiley) {
          _0x45f0f0.powerAd(_0x3001c1, _0x3d802f);
        }
      }
    });
  }
  SmileyLoaded(_0x42d5a8) {
    const _0x4300b0 = _0x42d5a8.wrappers;
    const _0x3f0e4e = _0x42d5a8.optionsArr;
    if (!_0x42d5a8.width || !_0x42d5a8.height) {
      this.SmileyError(_0x42d5a8);
      return;
    }
    const _0x2b13ec = (_0x42d5a8.height - (_0x3f0e4e[0].size || 20)) / 2;
    _0x42d5a8.loaded = !0;
    _0x42d5a8.lastUsed = Date.now();
    this.SmiliesMemory += _0x42d5a8.width * _0x42d5a8.height;
    for (let _0x56c94e = 0; _0x56c94e < _0x4300b0.length; _0x56c94e++) {
      const _0x933d9d = _0x4300b0[_0x56c94e];
      const _0x35396e = _0x3f0e4e[_0x56c94e];
      if (_0x933d9d.loaded) {
        continue;
      }
      const _0x3c35c8 = _0x35396e.className == "profileAvatar";
      const _0x5a7a8a = _0x42d5a8.cloneNode(!0);
      while (_0x3c35c8 && _0x5a7a8a.width > 100 && _0x5a7a8a.height > 100) {
        _0x5a7a8a.width /= 2;
        _0x5a7a8a.height /= 2;
      }
      _0x5a7a8a.code = _0x933d9d.code;
      _0x5a7a8a.wrapper = _0x933d9d;
      _0x5a7a8a.options = _0x35396e;
      _0x933d9d.loaded = !0;
      _0x933d9d.smileyHash = _0x42d5a8.hash;
      _0x933d9d.style.width = (_0x42d5a8.width || _0x35396e.size || 20) + "px";
      _0x933d9d.style.height = (_0x42d5a8.height || _0x35396e.size || 20) + "px";
      if (_0x35396e.useShadow) {
        _0x933d9d.classList.add("avShadow");
      }
      const _0x25bf43 = _0x42d5a8.avatarEffect !== undefined && (_0x42d5a8.avatarEffect.avatareffect?.length > 0 || _0x42d5a8.avatarEffect.avatarframe?.length > 0);
      const _0x48fd33 = _0x25bf43 && (_0x35396e.isMirrored || _0x35396e.isInverted);
      if (!_0x48fd33) {
        if (_0x35396e.isMirrored) {
          if (_0x35396e.isPawn) {
            _0x933d9d.style.transform = "scaleX(-1) translateX(6px)";
          } else {
            _0x933d9d.style.transform = "scaleX(-1)";
          }
        }
        if (_0x35396e.isInverted) {
          if (_0x35396e.isPawn) {
            _0x933d9d.style.transform = "scaleY(-1) translateY(4px)";
          } else {
            let _0x937d33 = _0x35396e.size === 40 ? 2 : 1;
            _0x933d9d.style.transform = "scaleY(-1)";
            if (!_0x35396e.isName) {
              _0x933d9d.style.top = "calc(" + _0x35396e.size + "px - " + _0x937d33 + "rem)";
            }
          }
        }
        if (_0x35396e.isMirrored && _0x35396e.isInverted) {
          _0x933d9d.style.transform = "scale(-1)";
        }
      }
      if (!_0x933d9d.hasAttribute("data-noload")) {
        if (_0x25bf43 && typeof xEncodeURIComponent == "function") {
          const _0x1f1429 = xEncodeURIComponent(_0x5a7a8a.src);
          _0x933d9d.style.width = "30px";
          _0x933d9d.style.height = "30px";
          if (_0x48fd33) {
            _0x933d9d.style.position = "relative";
            const _0x145473 = document.createElement("div");
            _0x145473.className = "avInner";
            _0x145473.style.cssText = "width:120%;height:120%;background-image:url(\"" + _0x1f1429 + "\");background-repeat:no-repeat;background-size:contain;background-position:center;position:absolute;top:50%;left:50%;pointer-events:none;transform-origin:center;";
            if (_0x35396e.isMirrored && _0x35396e.isInverted) {
              _0x145473.setAttribute("data-both", "");
              _0x145473.style.transform = "translate(-50%, -50%) scale(-1, -1)";
            } else if (_0x35396e.isMirrored) {
              _0x145473.setAttribute("data-mirror", "");
              _0x145473.style.transform = "translate(-50%, -50%) scaleX(-1)";
            } else if (_0x35396e.isInverted) {
              _0x145473.setAttribute("data-invert", "");
              _0x145473.style.transform = "translate(-50%, -50%) scaleY(-1)";
            }
            _0x933d9d.appendChild(_0x145473);
          } else {
            _0x933d9d.style.backgroundImage = "url(\"" + _0x1f1429 + "\")";
            _0x933d9d.style.backgroundRepeat = "no-repeat";
            _0x933d9d.style.backgroundSize = "contain";
          }
        } else {
          _0x933d9d.appendChild(_0x5a7a8a);
        }
      }
      this.AlignSmiley(_0x5a7a8a, _0x2b13ec);
      if (this.Animation && _0x35396e.applyEffects) {
        this.ApplyEffects(_0x5a7a8a);
      }
      _0x5a7a8a.style["user-drag"] = _0x5a7a8a.style["user-select"] = _0x5a7a8a.style["-moz-user-select"] = _0x5a7a8a.style["-webkit-user-drag"] = _0x5a7a8a.style["-webkit-user-select"] = _0x5a7a8a.style["-ms-user-select"] = _0x5a7a8a.style["pointer-events"] = "none";
      if (typeof initAvatarEffect == "function") {
        initAvatarEffect(_0x42d5a8, _0x933d9d);
      }
      _0x35396e.onloadCallback?.();
    }
  }
  AlignSmiley(_0x45a46f, _0x5894dd) {
    const _0x4f5f57 = _0x45a46f.wrapper;
    const _0x2d438e = _0x45a46f.options;
    if (_0x2d438e.align) {
      _0x45a46f.style.cssText = "\n                margin-top: " + -_0x5894dd + "px;\n                margin-left: " + -_0x5894dd + "px;\n            ";
    } else if (_0x2d438e.align2 && _0x5894dd) {
      _0x45a46f.style.cssText = "\n                position: relative;\n                left: " + -_0x5894dd + "px;\n                bottom: " + (-_0x5894dd - 4) + "px;\n            ";
    } else if (_0x2d438e.align3) {
      _0x4f5f57.style.position = "relative";
      _0x4f5f57.style.display = "inline-flex";
      _0x4f5f57.style.width = _0x4f5f57.style.height = _0x2d438e.size + "px";
      _0x45a46f.style.cssText = "\n                position: absolute;\n                left: " + -_0x5894dd + "px;\n                top: " + -_0x5894dd + "px;\n            ";
    }
    if (_0x5894dd && _0x2d438e.adjustWidth) {
      _0x4f5f57.style.margin = "0 " + _0x5894dd / 2 + "px";
    }
  }
  ApplyEffects(_0x18af28) {
    const _0x37a764 = _0x18af28.code.toLowerCase();
    const _0x2e8467 = _0x37a764.split("*");
    const _0x35d25f = _0x18af28.options;
    const _0x3e8a89 = _0x18af28.wrapper;
    const _0x4c4171 = _0x3e8a89.firstChild;
    if (!_0x4c4171) {
      return;
    }
    if (_0x2e8467.length == 1 && Object.values(_Activity?.instance?.PSSA ?? []).includes(_0x37a764)) {
      const _0x687bd = this.GetSmileyGlowColor(_0x37a764);
      const _0x10860f = {
        filter: "drop-shadow(0 0 0.5px " + _0x687bd + ") drop-shadow(0 0 0.5px " + _0x687bd + ") drop-shadow(0 0 1px " + _0x687bd + ")",
        offset: 0.1
      };
      const _0x2381e1 = {
        filter: "drop-shadow(0 0 0.5px " + _0x687bd + ") drop-shadow(0 0 0.5px " + _0x687bd + ") drop-shadow(0 0 1px " + _0x687bd + ")",
        offset: 0.2
      };
      _0x4c4171.animate([{
        filter: "none",
        offset: 0
      }, _0x10860f, _0x2381e1, {
        filter: "none",
        offset: 0.3
      }, {
        filter: "none",
        offset: 1
      }], {
        duration: 1500,
        iterations: "Infinity"
      });
    }
    let _0xf2e141;
    let _0x6fbbc3 = 1;
    if (this.SmiliesGoBig.includes(_0x2e8467[0])) {
      _0x6fbbc3 = _0x35d25f.size / _0x35d25f.gsSize;
      _0x4c4171.style.transform = "scale(" + _0x6fbbc3 + ")";
    }
    if (_0x2e8467.indexOf("angel") != -1 || _0x2e8467.indexOf("balloon") != -1) {
      _0x3e8a89.addEventListener(_Activity.instance.IsClassic ? "mouseenter" : "mousedown", () => {
        if (_0xf2e141?.playState == "running") {
          return;
        }
        const _0x28e555 = _0x3e8a89.getBoundingClientRect();
        const _0xa57e41 = _0x3e8a89.cloneNode("true");
        const _0x580540 = {
          transform: "translate(0, 0) scale(" + _0x6fbbc3 + ")"
        };
        _0x3e8a89.style.visibility = "hidden";
        _0xa57e41.style.position = "absolute";
        _0xa57e41.style.top = Math.round(_0x28e555.top) + "px";
        _0xa57e41.style.left = Math.round(_0x28e555.left) + "px";
        this.UltraSmiliesContainer.appendChild(_0xa57e41);
        _0xf2e141 = _0xa57e41.animate([_0x580540, {
          transform: "translate(" + Math.random() * 5 + "vw, -15vh) scale(" + _0x6fbbc3 + ")"
        }, {
          transform: "translate(" + Math.random() * -5 + "vw, -30vh) scale(" + _0x6fbbc3 + ")"
        }, {
          transform: "translate(" + Math.random() * 5 + "vw, -45vh) scale(" + _0x6fbbc3 + ")"
        }, {
          transform: "translate(" + Math.random() * -5 + "vw, -60vh) scale(" + _0x6fbbc3 + ")"
        }, {
          transform: "translate(" + Math.random() * 5 + "vw, -75vh) scale(" + _0x6fbbc3 + ")"
        }, {
          transform: "translate(" + Math.random() * -5 + "vw, -90vh) scale(" + _0x6fbbc3 + ")"
        }, {
          transform: "translate(" + Math.random() * 5 + "vw, -100vh) scale(" + _0x6fbbc3 + ")"
        }], {
          duration: 6000
        });
        _0xf2e141.addEventListener("finish", () => {
          _0xa57e41.remove();
          _0x3e8a89.style.visibility = "visible";
        });
      });
    } else if (_0x2e8467[0] == "bugs" || _0x2e8467[0] == "lb") {
      _0x3e8a89.addEventListener(_Activity.instance.IsClassic ? "mouseenter" : "mousedown", () => {
        if (_0xf2e141?.playState == "running") {
          return;
        }
        const _0x978374 = _0x3e8a89.getBoundingClientRect();
        const _0x2ba411 = _0x3e8a89.cloneNode("true");
        const _0x4e2ffe = _0x2ba411.firstChild;
        const _0x27849e = Math.round(_0x978374.top) + "px";
        const _0x310ee4 = Math.round(_0x978374.left) + "px";
        const _0x275806 = {
          transform: "scale(" + _0x6fbbc3 + ")"
        };
        _0x2ba411.style.position = "absolute";
        _0x3e8a89.style.visibility = "hidden";
        this.UltraSmiliesContainer.appendChild(_0x2ba411);
        _0x4e2ffe.animate([_0x275806, {
          transform: "scale(1)"
        }], {
          duration: 1500,
          fill: "forwards",
          easing: "ease-out"
        });
        _0xf2e141 = _0x2ba411.animate([{
          transform: "rotate(0deg)",
          left: _0x310ee4,
          top: _0x27849e,
          offset: 0
        }, {
          transform: "rotate(0deg)",
          left: "calc(" + _0x310ee4 + " + 30%",
          top: _0x27849e,
          easing: "ease-out",
          offset: 0.15
        }, {
          transform: "rotate(-90deg)",
          left: "calc(" + _0x310ee4 + " + 30%",
          top: _0x27849e,
          easing: "ease-out",
          offset: 0.225
        }, {
          transform: "rotate(-125deg)",
          left: "calc(" + _0x310ee4 + " + 30%",
          top: _0x27849e,
          easing: "ease-in-out",
          offset: 0.325
        }, {
          transform: "rotate(-125deg)",
          left: "calc(" + _0x310ee4 + " + 30%",
          top: _0x27849e,
          offset: 0.355
        }, {
          transform: "rotate(-65deg)",
          left: "calc(" + _0x310ee4 + " + 30%",
          top: _0x27849e,
          easing: "ease-in-out",
          offset: 0.485
        }, {
          transform: "rotate(-65deg)",
          left: "calc(" + _0x310ee4 + " + 30%",
          top: _0x27849e,
          offset: 0.525
        }, {
          transform: "rotate(-180deg)",
          left: "calc(" + _0x310ee4 + " + 30%",
          top: _0x27849e,
          offset: 0.565
        }, {
          transform: "rotate(-200deg)",
          left: "calc(" + _0x310ee4 + " + 10%",
          top: "calc(" + _0x27849e + " + 20%)",
          easing: "ease-out",
          offset: 0.65
        }, {
          transform: "rotate(-180deg)",
          left: "calc(" + _0x310ee4 + " + 10%",
          top: "calc(" + _0x27849e + " + 20%)",
          offset: 0.695
        }, {
          transform: "rotate(-180deg)",
          left: "calc(" + _0x310ee4 + " + 10%",
          top: "calc(" + _0x27849e + " + 20%)",
          offset: 0.735
        }, {
          transform: "rotate(-270deg)",
          left: "calc(" + _0x310ee4 + " + 10%",
          top: "calc(" + _0x27849e + " + 30%)",
          offset: 0.775
        }, {
          transform: "rotate(-300deg)",
          left: "calc(" + _0x310ee4 + " + 30%",
          top: "calc(" + _0x27849e + " + 100%)",
          offset: 1
        }], {
          duration: 6000
        });
        _0xf2e141.addEventListener("finish", () => {
          _0x2ba411.remove();
          _0x3e8a89.style.visibility = "visible";
        });
      });
    } else if (_0x2e8467[0] == "parachute") {
      _0x3e8a89.addEventListener(_Activity.instance.IsClassic ? "mouseenter" : "mousedown", () => {
        if (_0xf2e141?.playState == "running") {
          return;
        }
        const _0x4717f5 = _0x3e8a89.getBoundingClientRect();
        const _0x437828 = _0x3e8a89.cloneNode("true");
        _0x3e8a89.style.visibility = "hidden";
        _0x437828.style.position = "absolute";
        _0x437828.style.top = Math.round(_0x4717f5.top) + "px";
        _0x437828.style.left = Math.round(_0x4717f5.left) + "px";
        this.UltraSmiliesContainer.appendChild(_0x437828);
        _0xf2e141 = _0x437828.animate([{
          transform: "translate(0, 0) rotate(0deg)"
        }, {
          transform: "translate(" + Math.random() * 2 + "vw, 10vh) rotate(10deg)"
        }, {
          transform: "translate(" + Math.random() * -2 + "vw, 20vh) rotate(-10deg)"
        }, {
          transform: "translate(" + Math.random() * 2 + "vw, 30vh) rotate(10deg)"
        }, {
          transform: "translate(" + Math.random() * -2 + "vw, 40vh) rotate(-10deg)"
        }, {
          transform: "translate(" + Math.random() * 2 + "vw, 50vh) rotate(10deg)"
        }, {
          transform: "translate(" + Math.random() * -2 + "vw, 60vh) rotate(-10deg)"
        }, {
          transform: "translate(" + Math.random() * 2 + "vw, 70vh) rotate(10deg)"
        }, {
          transform: "translate(" + Math.random() * -2 + "vw, 80vh) rotate(-10deg)"
        }, {
          transform: "translate(" + Math.random() * 2 + "vw, 90vh) rotate(10deg)"
        }, {
          transform: "translate(" + Math.random() * -2 + "vw, 100vh) rotate(-10deg)"
        }], {
          duration: 5000
        });
        _0xf2e141.addEventListener("finish", () => {
          _0x437828.remove();
          _0x3e8a89.style.visibility = "visible";
        });
      });
    } else if (_0x2e8467[0] == "shark") {
      _0x3e8a89.addEventListener(_Activity.instance.IsClassic ? "mouseenter" : "mousedown", () => {
        if (_0xf2e141?.playState == "running") {
          return;
        }
        const _0x3d6af9 = _0x3e8a89.getBoundingClientRect();
        const _0x2fd47f = _0x3e8a89.cloneNode("true");
        _0x3e8a89.style.visibility = "hidden";
        _0x2fd47f.style.position = "absolute";
        _0x2fd47f.style.top = Math.round(_0x3d6af9.top) + "px";
        _0x2fd47f.style.left = Math.round(_0x3d6af9.left) + "px";
        this.UltraSmiliesContainer.appendChild(_0x2fd47f);
        _0xf2e141 = _0x2fd47f.animate([{
          transform: "translate(0, 0)"
        }, {
          transform: "translateX(100vw)"
        }], {
          duration: 4000
        });
        _0xf2e141.addEventListener("finish", () => {
          _0x2fd47f.remove();
          _0x3e8a89.style.visibility = "visible";
        });
      });
    } else if (_0x2e8467.indexOf("bomb") != -1) {
      if (this.BombAnimatedSvg) {
        this.DoBombAnimation(_0x3e8a89);
      } else {
        fetch("www/ultras/bomb.svg").then(_0x45e169 => _0x45e169.text()).then(_0x4df4a0 => {
          this.BombAnimatedSvg = _0x4df4a0;
          this.DoBombAnimation(_0x3e8a89);
        });
      }
    } else if (_0x2e8467[0] == "ss" || _0x2e8467[0] == "usss") {
      _0x3e8a89.addEventListener(_Activity.instance.IsClassic ? "mouseenter" : "mousedown", () => {
        if (_0xf2e141?.playState == "running") {
          return;
        }
        const _0x25e325 = _0x3e8a89.getBoundingClientRect();
        const _0x3be358 = _0x3e8a89.cloneNode("true");
        const _0x49c6f1 = _0x3be358.firstChild;
        const _0x24812f = Math.round(_0x25e325.top) + "px";
        const _0x1bc429 = Math.round(_0x25e325.left) + "px";
        const _0x332eec = {
          transform: "scale(" + _0x6fbbc3 + ")",
          offset: 0
        };
        _0x3be358.style.position = "absolute";
        _0x3e8a89.style.visibility = "hidden";
        this.UltraSmiliesContainer.appendChild(_0x3be358);
        _0x49c6f1.animate([_0x332eec, {
          transform: "scale(1)",
          offset: 0.2
        }, {
          transform: "scale(1)",
          offset: 0.8
        }, {
          transform: "scale(2)",
          offset: 0.81
        }, {
          transform: "scale(2)",
          offset: 1
        }], {
          duration: 4000,
          fill: "forwards",
          easing: "ease-out"
        });
        _0xf2e141 = _0x3be358.animate([{
          transform: "rotate(0deg)",
          left: _0x1bc429,
          top: _0x24812f,
          offset: 0
        }, {
          transform: "rotate(0deg)",
          left: "calc(" + _0x1bc429 + " + 100%",
          top: "calc(" + _0x24812f + " - 100%)",
          easing: "ease-out",
          offset: 0.2
        }, {
          transform: "rotate(0deg)",
          left: "calc(" + _0x1bc429 + " + 100%",
          top: "calc(" + _0x24812f + " - 100%)",
          easing: "ease-out",
          offset: 0.4
        }, {
          transform: "rotate(-120deg)",
          left: "calc(" + _0x1bc429 + " + 100%",
          top: "calc(" + _0x24812f + " + 100%)",
          easing: "ease-out",
          offset: 0.45
        }, {
          transform: "rotate(-120deg)",
          left: "calc(" + _0x1bc429 + " - 100%",
          top: "calc(" + _0x24812f + " - 50%)",
          easing: "ease-out",
          offset: 0.8
        }, {
          transform: "rotate(70deg)",
          left: "calc(" + _0x1bc429 + " - 100%",
          top: "calc(" + _0x24812f + " - 50%)",
          easing: "ease-out",
          offset: 0.81
        }, {
          transform: "rotate(70deg)",
          left: "calc(" + _0x1bc429 + " + 120%",
          top: "calc(" + _0x24812f + " + 120%)",
          easing: "ease-out",
          offset: 1
        }], {
          duration: 4000
        });
        _0xf2e141.addEventListener("finish", () => {
          _0x3be358.remove();
          _0x3e8a89.style.visibility = "visible";
        });
      });
    } else if (_0x2e8467.indexOf("focushion") != -1) {
      _0x3e8a89.addEventListener(_Activity.instance.IsClassic ? "mouseenter" : "mousedown", () => {
        if (_0xf2e141?.playState != "running") {
          this.PlayUltraSound("fart");
          _0xf2e141 = _0x4c4171.animate([{
            transform: "scale(1) rotate(0deg)"
          }, {
            transform: "scale(0) rotate(-3turn) translateY(-6rem)"
          }], {
            duration: 2500,
            easing: "ease-out"
          });
        }
      });
    } else if (_0x2e8467.indexOf("dibread") != -1) {
      _0x3e8a89.addEventListener(_Activity.instance.IsClassic ? "mouseenter" : "mousedown", () => {
        if (_0xf2e141?.playState == "running") {
          return;
        }
        this.PlayUltraSound("ghostLaugh");
        const _0x3b6773 = _0x3e8a89.getBoundingClientRect();
        const _0x20c115 = _0x3b6773.width / 15;
        const _0x2c8f84 = (_0x3b6773.width - 20) / 2;
        const _0x5aacf9 = (_0x3b6773.height - 20) / 2;
        const _0x5f660b = new Image();
        _0x5f660b.src = "ultras/ghost.svg";
        _0x5f660b.style.cssText = "position: absolute; bottom: 0; top: " + _0x5aacf9 + "px; left: " + _0x2c8f84 + "px;";
        _0x3e8a89.appendChild(_0x5f660b);
        _0xf2e141 = _0x5f660b.animate([{
          transform: "scale(0) rotate(0deg)",
          filter: "blur(3px)",
          opacity: 0
        }, {
          transform: "scale(" + _0x20c115 + ") rotate(0deg)",
          filter: "blur(0px)",
          opacity: 1,
          offset: 0.4
        }, {
          transform: "scale(" + _0x20c115 + ") rotate(5deg)",
          offset: 0.5
        }, {
          transform: "scale(" + _0x20c115 + ") rotate(0deg)",
          offset: 0.6
        }, {
          transform: "scale(" + _0x20c115 + ") rotate(-5deg)",
          offset: 0.7
        }, {
          transform: "scale(" + _0x20c115 + ") rotate(0deg)",
          offset: 0.8
        }, {
          transform: "scale(" + _0x20c115 + ") rotate(5deg)",
          filter: "blur(0px)",
          opacity: 1,
          offset: 0.9
        }, {
          transform: "scale(" + _0x20c115 + ") rotate(50deg) translateY(-20px)",
          filter: "blur(6px)",
          opacity: 0,
          offset: 1
        }], {
          duration: 2000,
          easing: "ease-out"
        });
        _0xf2e141.addEventListener("finish", () => {
          _0x5f660b.remove();
        });
      });
    } else if (_0x2e8467[0] == "mario8") {
      const _0x417b1a = _0x3e8a89.getBoundingClientRect().height / 1.5;
      _0x3e8a89.addEventListener(_Activity.instance.IsClassic ? "mouseenter" : "mousedown", () => {
        if (_0xf2e141?.playState != "running") {
          _0xf2e141 = _0x4c4171.animate([{
            transform: "translateY(0)"
          }, {
            transform: "translateY(-" + _0x417b1a + "px)",
            easing: "ease-out"
          }, {
            transform: "translateY(0)",
            easing: "ease-out"
          }], {
            duration: 750
          });
        }
      });
    } else if (_0x2e8467.indexOf("lights") != -1) {
      _0x3e8a89.addEventListener(_Activity.instance.IsClassic ? "mouseenter" : "mousedown", () => {
        if (_0xf2e141?.playState != "running") {
          _0xf2e141 = _Activity.Window.document.body.animate([{
            opacity: 0.4,
            offset: 0
          }, {
            opacity: 0.5,
            offset: 0.05
          }, {
            opacity: 0.6,
            offset: 0.1
          }, {
            opacity: 0.85,
            offset: 0.15
          }, {
            opacity: 0.5,
            offset: 0.25
          }, {
            opacity: 1,
            offset: 0.3
          }, {
            opacity: 0.1,
            offset: 0.35
          }, {
            opacity: 0.25,
            offset: 0.4
          }, {
            opacity: 0.5,
            offset: 0.45
          }, {
            opacity: 1,
            offset: 0.6
          }, {
            opacity: 0.85,
            offset: 0.7
          }, {
            opacity: 0.4,
            offset: 0.8
          }, {
            opacity: 0.5,
            offset: 0.9
          }, {
            opacity: 1,
            offset: 1
          }], {
            duration: 2000
          });
        }
      });
    } else if (_0x2e8467[0] == "yellow") {
      _0x3e8a89.addEventListener(_Activity.instance.IsClassic ? "mouseenter" : "mousedown", () => {
        if (_0xf2e141?.playState != "running") {
          _0xf2e141 = _0x4c4171.animate([{
            transform: "scale(0.8)",
            opacity: 0.5,
            filter: "drop-shadow(0 0 15px #FFFF00)"
          }, {
            transform: "scale(1)",
            opacity: 1
          }, {
            transform: "scale(0.8)",
            opacity: 0.5
          }, {
            transform: "scale(1)",
            opacity: 1
          }, {
            transform: "scale(0.8)",
            opacity: 0.5,
            filter: "drop-shadow(0 0 35px #FFFF00)"
          }, {
            transform: "scale(1)",
            opacity: 1
          }, {
            transform: "scale(0.8)",
            opacity: 0.5
          }, {
            transform: "scale(1)",
            opacity: 1
          }], {
            duration: 1000,
            easing: "ease-in-out",
            iterations: 2,
            delay: 1000
          });
        }
      });
    }
  }
  PlayUltraSound(_0x43951c) {
    if (_Activity?.instance?.Volume[0] != 0 && (_Activity?.instance?.Sound & 1) != 0) {
      new _Activity.instance.Window.Howl({
        src: ["www/ultras/" + _0x43951c + ".mp3"],
        volume: _Activity.instance.Volume[0] / 100
      }).play();
    }
  }
  DoBombAnimation(_0x24dd04) {
    let _0x400381;
    const _0x3b9579 = this.MakeElement(this.UltraSmiliesContainer, "span");
    _0x24dd04.addEventListener(_Activity.instance.IsClassic ? "mouseenter" : "mousedown", () => {
      if (_0x400381) {
        return;
      }
      this.PlayUltraSound("explosion");
      _0x24dd04.style.visibility = "hidden";
      const _0x3043a3 = _0x24dd04.getBoundingClientRect();
      const _0x4074b6 = (180 - _0x3043a3.width) / 2;
      const _0x3307a1 = _0x3043a3.top - _0x4074b6;
      const _0x482072 = _0x3043a3.left - _0x4074b6;
      _0x3b9579.innerHTML = this.BombAnimatedSvg;
      _0x400381 = _0x3b9579.querySelector("svg");
      _0x400381.style.cssText = "position: absolute; top: " + _0x3307a1 + "px; left: " + _0x482072 + "px";
      _0x400381.querySelector("#lastFrame").addEventListener("endEvent", () => {
        _0x24dd04.style.visibility = "visible";
        _0x400381.remove();
        _0x3b9579.remove();
        _0x400381 = null;
      }, !1);
      this.UltraSmiliesContainer.appendChild(_0x3b9579);
    });
  }
  GetSmileyGlowColor(_0x3b3fb3) {
    const _0x261fa5 = Object.keys(this.SmiliesGlow);
    if (_Activity.instance.SUPERPOWERS[_Activity.instance.PSSA.indexOf(_0x3b3fb3) - 1]) {
      return "#D5C86F";
    }
    for (let _0x682fc0 = 0; _0x682fc0 < _0x261fa5.length; _0x682fc0++) {
      const _0x5407b0 = _0x261fa5[_0x682fc0];
      if (this.SmiliesGlow[_0x5407b0] && this.SmiliesGlow[_0x5407b0].includes(_0x3b3fb3)) {
        return _0x5407b0;
      }
    }
    return "#0000FF";
  }
  SmileyError(_0x207b7b) {
    _0x207b7b.retries = (_0x207b7b.retries || 0) + 1;
    if (_0x207b7b.retries < this.Retries) {
      setTimeout(() => _0x207b7b.src = _0x207b7b.url, this.RetryDelay * _0x207b7b.retries);
    } else {
      delete this.Smilies[_0x207b7b.hash];
    }
  }
  IntersectionObserverCallback(_0x10487b, _0x404655) {
    const _0x314b68 = _0x10487b.length;
    for (let _0x1df1c7 = 0; _0x1df1c7 < _0x314b68; _0x1df1c7++) {
      const _0x3e2559 = _0x10487b[_0x1df1c7];
      const _0x16eee4 = _0x3e2559.target;
      if (_0x3e2559.isIntersecting) {
        _0x16eee4.classList.remove("invisible");
      } else {
        _0x16eee4.classList.add("invisible");
      }
    }
  }
  IconToLib(_0x4cc40f, _0x2c855d) {
    let _0x3cb408;
    let _0x5e7aa6 = 0;
    let _0x4712e9 = 0;
    switch (_0x4cc40f = _0x4cc40f.substr(1, _0x4cc40f.length - 2)) {
      case "del":
        _0x3cb408 = "xdelete";
        _0x5e7aa6 = 1;
        break;
      case "o":
        _0x3cb408 = "chatter2";
        _0x5e7aa6 = 2;
        break;
      case "priv":
        _0x3cb408 = "lock";
        _0x2c855d = 12;
        break;
      case "i":
        _0x3cb408 = "HelpIcon";
        _0x5e7aa6 = 1;
        break;
      case "inf8":
        _0x4712e9 = 39168;
      case "in":
        _0x3cb408 = "HelpIcon";
        _0x5e7aa6 = 2;
        if (_0x2c855d == 20) {
          _0x2c855d = 18;
        }
        break;
      case "ho":
        _0x3cb408 = "ho";
        _0x5e7aa6 = 1;
        break;
      default:
        return "";
    }
    return "g_" + _0x3cb408 + "_" + _0x2c855d + "_" + _0x2c855d + "_" + _0x4712e9 + "_" + _0x5e7aa6;
  }
  MakeElement(_0x3b3696, _0x562f03, _0x42c007) {
    const _0x3858cf = document.createElement(_0x562f03);
    if (_0x42c007) {
      _0x3858cf.className = _0x42c007;
    }
    if (_0x3b3696) {
      _0x3b3696.appendChild(_0x3858cf);
    }
    return _0x3858cf;
  }
  DumpMemory(_0x23a01d = 300000) {
    this.DumpWrappers();
    this.DumpUnused();
    if (this.SmiliesMemory >= _0x23a01d) {
      Object.values(this.Smilies).forEach(_0x64657e => {
        if (!_0x64657e.wrappers.length) {
          delete this.Smilies[_0x64657e.hash];
          this.SmiliesMemory -= _0x64657e.width * _0x64657e.height;
        }
      });
    }
  }
  DumpUnused() {
    Object.values(this.Smilies).forEach(_0x5d2354 => {
      if (!_0x5d2354.wrappers.length) {
        const _0x48d7ee = _0x5d2354.lastUsed;
        if (Math.floor((Date.now() - _0x48d7ee) / 60000) >= 1) {
          delete this.Smilies[_0x5d2354.hash];
          this.SmiliesMemory -= _0x5d2354.width * _0x5d2354.height;
        }
      }
    });
  }
  DumpWrappers() {
    Object.values(this.Smilies).forEach(_0x210b7f => {
      for (let _0xb10447 = 0; _0xb10447 < _0x210b7f.wrappers.length; _0xb10447++) {
        const _0x8897fc = _0x210b7f.wrappers[_0xb10447];
        const _0xee5349 = _0x210b7f.optionsArr[_0xb10447].scrollParent ?? document.body;
        const _0x391ceb = _0x8897fc.createdAt;
        if (Math.floor((Date.now() - _0x391ceb) / 60000) > 1 && !_0xee5349.contains(_0x8897fc)) {
          _0x210b7f.optionsArr.splice(_0xb10447, 1);
          _0x210b7f.wrappers.splice(_0xb10447, 1);
          this.SmiliesMemory -= _0x210b7f.width * _0x210b7f.height;
        }
      }
    });
  }
  EncodeGetStrip(_0x3454dd) {
    if ((_0x3454dd = _0x3454dd.replace(/#/g, "*")).search(/[^0-9a-zA-Z_\*\(\)]/) >= 0) {
      let _0x743c51 = _0x3454dd.split("*");
      for (let _0x863fbe in _0x743c51) {
        if (!(_0x743c51[_0x863fbe].search(/[^0-9a-zA-Z_\*\(\)]/) < 0)) {
          if (_0x743c51[_0x863fbe].search(/\)/) >= 0) {
            let _0x15045f = _0x743c51[_0x863fbe].split(")");
            _0x743c51[_0x863fbe] = "!" + this.Base64EncodeUrl(_0x15045f[0]) + ")" + _0x15045f[1];
          } else {
            _0x743c51[_0x863fbe] = "!" + this.Base64EncodeUrl(_0x743c51[_0x863fbe]);
          }
        }
      }
      _0x3454dd = _0x743c51.join("*");
    }
    return _0x3454dd;
  }
  Base64EncodeUrl(_0x3b9bee) {
    let _0x4e5735 = encodeURIComponent(_0x3b9bee).replace(/%([0-9A-F]{2})/g, function (_0x24a2e4, _0x1176d) {
      return String.fromCharCode("0x" + _0x1176d);
    });
    _0x4e5735 = btoa(_0x4e5735);
    return _0x4e5735.replace(/\+/g, "-").replace(/\//g, "_").replace(/\=+$/, "");
  }
  GenerateAvatarEffectHash(_0x57a6e3) {
    if (_0x57a6e3 === undefined || _0x57a6e3.avatareffect === undefined && _0x57a6e3.avatarframe === undefined) {
      return "";
    } else {
      return "_" + _0x57a6e3.avatarcolor + "_" + _0x57a6e3.avatareffect + "_" + _0x57a6e3.avatarframe + "_" + _0x57a6e3.avatarspeed;
    }
  }
}
var _Activity;
if (_Activity === undefined) {
  _Activity = parent?._Activity !== undefined ? parent._Activity : parent?.parent?._Activity !== undefined ? parent.parent._Activity : parent?.parent?.parent?._Activity !== undefined ? parent.parent.parent._Activity : parent?.box?._Activity !== undefined ? parent.box._Activity : {};
}