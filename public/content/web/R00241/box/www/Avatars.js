class Avatars {
  constructor() {
    if (Avatars.instance) {
      return Avatars.instance;
    }
    Avatars.instance = this;
    this.instance = this;
    this.Avatars = {};
    this.Retries = 14;
    this.Animation = !1;
    this.RetryDelay = 600;
    this.AvatarsMemory = 0;
    this.Containers = new Set();
    this.IntersectionObserver = new IntersectionObserver(this.IntersectionObserverCallback, {
      threshold: 0,
      rootMargin: "160px"
    });
    this.DumpMemoryInterval = window.setInterval(this.DumpMemory.bind(this), 10000);
  }
  Debounce(_0x4e9159) {
    let _0x34ac4d;
    return function () {
      for (var _0x15f7a2 = arguments.length, _0x20e434 = new Array(_0x15f7a2), _0x415fc4 = 0; _0x415fc4 < _0x15f7a2; _0x415fc4++) {
        _0x20e434[_0x415fc4] = arguments[_0x415fc4];
      }
      if (_0x34ac4d) {
        cancelAnimationFrame(_0x34ac4d);
      }
      _0x34ac4d = requestAnimationFrame(() => {
        _0x4e9159(..._0x20e434);
      });
    };
  }
  ReloadAll(_0x2d86f9) {
    this.Animation = _0x2d86f9;
    const _0x533bbe = Object.getOwnPropertyNames(this.Avatars);
    for (let _0x200ae2 = 0; _0x200ae2 < _0x533bbe.length; _0x200ae2++) {
      delete this.Avatars[_0x533bbe[_0x200ae2]];
    }
  }
  MakeAvatar(_0x3aa911, _0x5e7adc, _0x2d9476) {
    const {
      userId: _0x207dec,
      userName: _0x3a4b7a,
      size: _0x43f61d = 30,
      scrollParent: _0x3e377f,
      callback: _0x4d9545,
      callbackTarget: _0x2e698b,
      tooltip: _0x516de7,
      tooltipPosition: _0x4aab17 = "low",
      hasAnimate: _0x2f5c70,
      isXatme: _0x28cfd6,
      fallback: _0x4d6396,
      useDirectLink: _0x39bbfd,
      avatarEffect: _0x5942af
    } = _0x2d9476;
    if (!_0x5e7adc) {
      return;
    }
    let _0x2c08a5 = {};
    try {
      if (_0x5942af) {
        let _0x5b5551 = decodeURIComponent(escape(atob(_0x5942af.replace(/\s+/g, ""))));
        _0x2c08a5 = JSON.parse(_0x5b5551);
      }
    } catch (_0x56c69f) {
      console.error("Failed to decode avatarEffect:", _0x56c69f);
    }
    _0x2d9476.decodedAvatarEffect = _0x2c08a5;
    let _0x2e1c5d = _0x2d9476.isGif;
    let _0x5e7289 = _0x2d9476.className ?? "messageAvatar";
    const _0x4c3e80 = _0x5e7adc[0] == "<";
    const _0x26a190 = _0x5e7adc[0] == "(";
    const _0x3333ad = parseInt(_0x5e7adc.split("#")[0]) > 0;
    if (_0x3333ad) {
      _0x5e7289 += " avToon";
    }
    _0x2d9476.retries = _0x2d9476.retries ?? 0;
    if (!_0x28cfd6) {
      if (_0x26a190 || _0x4c3e80) {
        return _Activity.instance.Smilies.MakeSmiley(_0x3aa911, _0x5e7adc, {
          size: _0x43f61d,
          addGback: !0,
          userID: _0x207dec,
          userName: _0x3a4b7a,
          tooltipPosition: _0x4aab17,
          scrollParent: _0x3e377f,
          className: _0x5e7289,
          tooltip: _0x516de7,
          callback: () => this.ClickEvent(_0x3a4b7a, _0x207dec),
          callbackTarget: _0x2e698b,
          avatarEffect: _0x2c08a5
        });
      }
      if (_0x3e377f && !this.Containers.has(_0x3e377f)) {
        this.Containers.add(_0x3e377f);
        _0x3e377f.intersectionObserver = new IntersectionObserver(this.IntersectionObserverCallback, {
          root: _0x3e377f,
          threshold: 0,
          rootMargin: "60px"
        });
      }
    }
    let _0x28ebec = !0;
    let _0x9f2f14 = _0x5e7adc.split("#")[0];
    let _0x42ccf5 = null;
    if (!_0x3333ad && !_0x39bbfd) {
      try {
        _0x42ccf5 = new URL(_0x9f2f14);
      } catch {
        if (_0x4d6396) {
          _0x9f2f14 = _0x4d6396;
        } else {
          _0x28ebec = false;
        }
      }
    }
    _0x2e1c5d = _0x9f2f14.split(".").pop().toLowerCase() == "gif";
    if (!_0x39bbfd && (!!_0x3333ad || _0x42ccf5?.origin != "http://localhost:6969")) {
      _0x9f2f14 = _0x3333ad ? "http://localhost:6969/web_gear/chat/av/" + parseInt(_0x9f2f14) + ".png" : _0x2f5c70 && this.Animation && !_0x2e1c5d || _0x28cfd6 ? "http://localhost:6969/web_gear/chat/GetImage9.php?s&W=80&H=80&U=" + _0x9f2f14 : _0x2f5c70 && this.Animation && _0x2e1c5d ? "http://localhost:6969/web_gear/chat/GetImage7.php?W=80&H=80&U=" + _0x9f2f14 + "&g" : "http://localhost:6969/web_gear/chat/GetImage7.php?s&W=80&H=80&U=" + _0x9f2f14 + "&we";
    }
    const _0x22a8a4 = _0x9f2f14;
    const _0x58ae49 = _0x28cfd6 ? _0x3aa911 : this.MakeElement(_0x3aa911, "span", _0x5e7289);
    const _0x2a026 = {
      position: _0x4aab17
    };
    if (_0x3e377f) {
      _0x3e377f.intersectionObserver.observe(_0x58ae49);
    } else {
      this.IntersectionObserver.observe(_0x58ae49);
    }
    (_0x2e698b ?? _0x58ae49).addEventListener("click", _0x5e004b => {
      if (_0x4d9545) {
        _0x5e004b.url = _0x9f2f14;
        _0x4d9545(_0x5e004b);
      } else {
        this.ClickEvent(_0x3a4b7a, _0x207dec);
      }
    });
    _0x58ae49.style.width = _0x43f61d + "px";
    _0x58ae49.style.height = _0x43f61d + "px";
    _0x58ae49.style.display = "inline-block";
    if (_0x28ebec) {
      if (_0x22a8a4 in this.Avatars) {
        this.Avatars[_0x22a8a4].wrappers.push(_0x58ae49);
        this.Avatars[_0x22a8a4].optionsArr.push(_0x2d9476);
        this.Avatars[_0x22a8a4].avatarEffect = _0x2c08a5;
        if (this.Avatars[_0x22a8a4].loaded) {
          this.AvatarLoaded(this.Avatars[_0x22a8a4], true);
        }
      } else {
        this.Avatars[_0x22a8a4] = new Image();
        this.Avatars[_0x22a8a4].url = _0x9f2f14;
        this.Avatars[_0x22a8a4].wrappers = [_0x58ae49];
        this.Avatars[_0x22a8a4].hash = _0x22a8a4;
        this.Avatars[_0x22a8a4].size = _0x43f61d;
        this.Avatars[_0x22a8a4].loaded = false;
        this.Avatars[_0x22a8a4].holder = _0x3aa911;
        this.Avatars[_0x22a8a4].optionsArr = [_0x2d9476];
        this.Avatars[_0x22a8a4].avatarEffect = _0x2c08a5;
        this.Avatars[_0x22a8a4].fallback = _0x4d6396;
        this.Avatars[_0x22a8a4].onload = _0x3ad89a => this.AvatarLoaded.call(this, _0x3ad89a.target);
        this.Avatars[_0x22a8a4].onerror = _0x475aee => this.AvatarError.call(this, _0x475aee.target);
        this.Avatars[_0x22a8a4].src = _0x9f2f14;
      }
      if (_0x516de7) {
        addToolTip(_0x2e698b ?? _0x58ae49, _0x516de7, _0x2a026);
      }
      return _0x58ae49;
    } else {
      return undefined;
    }
  }
  AvatarLoaded(_0x6e1652, _0x56eb44) {
    const _0x4b6c0e = _0x56eb44 ? _0x6e1652.wrappers.slice(-1) : _0x6e1652.wrappers;
    const _0x3b527c = _0x56eb44 ? _0x6e1652.optionsArr.slice(-1) : _0x6e1652.optionsArr;
    if (_0x6e1652.width && _0x6e1652.height) {
      _0x6e1652.loaded = !0;
      this.AvatarsMemory += _0x6e1652.width * _0x6e1652.height;
      for (let _0x33f109 = 0; _0x33f109 < _0x4b6c0e.length; _0x33f109++) {
        const _0x342c8a = _0x4b6c0e[_0x33f109];
        const _0x568319 = _0x3b527c[_0x33f109];
        const _0x1a71d7 = _0x568319.isXatme;
        if (!_0x342c8a.loaded) {
          _0x342c8a.loaded = !0;
          if (_0x1a71d7) {
            const _0x327669 = _0x6e1652.cloneNode(!0);
            _0x327669.id = "avaShow";
            _0x342c8a.style.display = "inline";
            _0x327669.className = _0x568319.className;
            _0x6e1652.width = _0x6e1652.height = 240;
            _0x342c8a.appendChild(_0x327669);
          } else {
            _0x342c8a.style.width = _0x568319.size + "px";
            _0x342c8a.style.height = _0x568319.size + "px";
            const _0x3d6fc4 = _0x568319.hasAnimate || !_0x568319.hasShuffle ? 0 : -Math.floor(this.Random(_0x568319.uniqueId) * Math.floor(_0x6e1652.width / _0x6e1652.height)) * _0x568319.size;
            _0x342c8a.style.cssText = _0x6e1652.cssBackup = "\n                        display: inline-block;\n                        width: " + _0x568319.size + "px;\n                        height: " + _0x568319.size + "px;\n                        background: url(\"" + _0x6e1652.src + "\");\n                        background-size: contain;\n                        background-position: " + _0x3d6fc4 + "px !important;\n                        background-repeat: no-repeat no-repeat;\n                    ";
          }
          if (typeof initAvatarEffect == "function") {
            initAvatarEffect(_0x6e1652, _0x342c8a, _0x568319.decodedAvatarEffect);
          }
        }
      }
    } else {
      this.AvatarError(_0x6e1652);
    }
  }
  Random(_0x156b1c = "") {
    let _0x57893d = 0;
    for (let _0xc432a4 = 0; _0xc432a4 < _0x156b1c.length; _0xc432a4++) {
      _0x57893d += _0x156b1c.charCodeAt(_0xc432a4);
    }
    const _0x20a7e8 = Math.sin(_0x57893d) * 10000;
    return _0x20a7e8 - Math.floor(_0x20a7e8);
  }
  AvatarError(_0x3e3410) {
    _0x3e3410.retries = (_0x3e3410.retries || 0) + 1;
    if (_0x3e3410.retries < this.Retries) {
      setTimeout(() => _0x3e3410.src = _0x3e3410.url, this.RetryDelay * _0x3e3410.retries);
    } else if (_0x3e3410.fallback) {
      _0x3e3410.src = _0x3e3410.fallback;
    } else {
      delete this.Avatars[_0x3e3410.hash];
    }
  }
  IntersectionObserverCallback(_0x3af850, _0x326636) {
    const _0x31886f = _0x3af850.length;
    for (let _0x31cd8b = 0; _0x31cd8b < _0x31886f; _0x31cd8b++) {
      const _0x587924 = _0x3af850[_0x31cd8b];
      const _0x512668 = _0x587924.target;
      if (_0x587924.isIntersecting) {
        _0x512668.classList.remove("invisible");
      } else {
        _0x512668.classList.add("invisible");
      }
    }
  }
  ClickEvent(_0x102053, _0x297cda) {
    if (_0x102053) {
      HitWeb("https://xat.me/" + _0x102053);
    } else if (typeof messages != "undefined") {
      messages.sendApp(0, _0x297cda);
    }
  }
  MakeElement(_0x5f2e59, _0x2969f9, _0x1f84d4, _0x19248b) {
    const _0x52b8c3 = document.createElement(_0x2969f9);
    if (_0x1f84d4) {
      _0x52b8c3.className = _0x1f84d4;
    }
    if (_0x5f2e59) {
      _0x5f2e59.appendChild(_0x52b8c3);
    }
    if (_0x19248b) {
      _0x52b8c3.id = _0x19248b;
    }
    return _0x52b8c3;
  }
  DumpMemory(_0x255c1f = 10000000) {
    if (!(this.AvatarsMemory <= _0x255c1f)) {
      this.AvatarsMemory = 0;
      Object.values(this.Avatars).forEach((_0x1ea257, _0x34b20d) => {
        for (let _0x1b7594 = 0; _0x1b7594 < _0x1ea257.wrappers.length; _0x1b7594++) {
          const _0x751dff = _0x1ea257.wrappers[_0x1b7594];
          const _0x3c9bf9 = _0x1ea257.optionsArr[_0x1b7594].scrollParent ?? document.body;
          if (_0x255c1f == 0) {
            _0x751dff.parentNode?.removeChild(_0x751dff);
          } else if (_0x751dff.innerHTML && _0x3c9bf9.contains(_0x751dff)) {
            this.AvatarsMemory += _0x1ea257.width * _0x1ea257.height;
          } else {
            delete this.Avatars[_0x34b20d];
          }
        }
      });
      if (!_0x255c1f) {
        this.Avatars = {};
      }
    }
  }
}
var _Activity;
if (_Activity === undefined) {
  _Activity = parent._Activity !== undefined ? parent._Activity : parent.parent._Activity !== undefined ? parent.parent._Activity : parent.parent.parent._Activity !== undefined ? parent.parent.parent._Activity : parent.box !== undefined && parent.box._Activity !== undefined ? parent.box._Activity : {};
}