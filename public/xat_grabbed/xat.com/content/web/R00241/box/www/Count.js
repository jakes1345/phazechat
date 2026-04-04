class Count {
  constructor(_0x169fab, _0x174280) {
    this.Interval;
    this.CurrentValue = 0;
    this.AnimationDuration = 300;
    this.WasPanelsColored = !1;
    this.IsDigitalStyle = !1;
    this.isUsingUTC = !1;
    this.Holder = this.MakeElement(_0x169fab, "span", "countP" + (this.IsDigitalStyle ? " digital" : " classic"));
    this.Panel1 = this.MakeElement(this.Holder, "span", "countPanel");
    this.Panel2 = this.MakeElement(this.Holder, "span", "countPanel");
    this.NextDigit1 = this.MakeElement(this.Panel1, "span", "countDigit countNextDigit");
    this.CurrDigit1 = this.MakeElement(this.Panel1, "span", "countDigit countCurrDigit");
    if (!this.IsDigitalStyle) {
      this.PrevDigit1 = this.MakeElement(this.Panel1, "span", "countDigit countPrevDigit");
    }
    this.NextDigit2 = this.MakeElement(this.Panel2, "span", "countDigit countNextDigit");
    this.CurrDigit2 = this.MakeElement(this.Panel2, "span", "countDigit countCurrDigit");
    if (!this.IsDigitalStyle) {
      this.PrevDigit2 = this.MakeElement(this.Panel2, "span", "countDigit countPrevDigit");
    }
    if (this.IsDigitalStyle) {
      this.NextDigit1.innerHTML = this.NextDigit2.innerHTML = 0;
    } else {
      this.NextDigit1.innerHTML = this.NextDigit2.innerHTML = 9;
      this.CurrDigit1.innerHTML = this.CurrDigit2.innerHTML = 0;
      this.PrevDigit1.innerHTML = this.PrevDigit2.innerHTML = 1;
    }
    let _0x1f14c9 = _0x174280[0];
    if (_0x174280.length > 1) {
      _0x1f14c9 += "#" + _0x174280[1];
    }
    this.SetTimer(_0x1f14c9);
    this.Customize(_0x174280.slice(1, 4));
  }
  getTrueMonth(_0x1a7251, _0x571ad5) {
    if (_0x1a7251 >= 1 && _0x1a7251 <= 12) {
      return _0x1a7251 - 1;
    } else {
      return _0x571ad5.getMonth();
    }
  }
  getUTCTimestamp() {
    const _0x337d56 = new Date();
    return Date.UTC(_0x337d56.getUTCFullYear(), _0x337d56.getUTCMonth(), _0x337d56.getUTCDate(), _0x337d56.getUTCHours(), _0x337d56.getUTCMinutes(), _0x337d56.getUTCSeconds());
  }
  getFutureTimestamp(_0x2d87f8, _0x16c7a6, _0x15eb6e, _0x4a5d0e, _0x458cf1, _0x577376) {
    if (this.isUsingUTC) {
      return new Date(Date.UTC(_0x2d87f8, _0x16c7a6, _0x15eb6e, _0x4a5d0e, _0x458cf1, _0x577376));
    } else {
      return new Date(_0x2d87f8, _0x16c7a6, _0x15eb6e, _0x4a5d0e, _0x458cf1, _0x577376);
    }
  }
  SetTimer(_0x246a60) {
    if (!_0x246a60) {
      return;
    }
    const _0xf185ba = _0x246a60.split("/");
    const _0x570aba = _0xf185ba[0].split("#");
    const _0x590c95 = _0x570aba[0].toLowerCase();
    if (_0x570aba.length > 1 && _0x570aba[1].toLowerCase() == "utc") {
      this.isUsingUTC = true;
    }
    if (_0x590c95 == "f") {
      this.SetValue(_0xf185ba[1], true);
      return;
    }
    const _0x6301ea = new Date();
    const _0x3556d9 = this.getTrueMonth(this.xInt(_0xf185ba[1]), _0x6301ea);
    const _0x40b239 = this.xInt(_0xf185ba[2]) || _0x6301ea.getDay();
    const _0x48df9a = 2000 + this.xInt(_0xf185ba[3]) || _0x6301ea.getFullYear();
    const _0x43d8fa = this.xInt(_0xf185ba[4]);
    const _0x4daf2e = this.xInt(_0xf185ba[5]);
    const _0x2dbac9 = this.xInt(_0xf185ba[6]);
    const _0x31a3d2 = this.getFutureTimestamp(_0x48df9a, _0x3556d9, _0x40b239, _0x43d8fa, _0x4daf2e, _0x2dbac9).getTime();
    this.UpdateCount(_0x590c95, _0x31a3d2);
    this.Interval = setInterval(() => this.UpdateCount(_0x590c95, _0x31a3d2), this.AnimationDuration);
  }
  UpdateCount(_0x48f8bf, _0x3db955) {
    let _0x45a79a;
    const _0x5691c5 = _0x3db955 - (this.isUsingUTC ? this.getUTCTimestamp() : Date.now());
    switch (_0x48f8bf) {
      case "d":
        _0x45a79a = Math.floor(_0x5691c5 / 86400000);
        break;
      case "h":
        _0x45a79a = Math.floor(_0x5691c5 / 3600000);
        break;
      case "m":
        _0x45a79a = Math.floor(_0x5691c5 / 60000);
        break;
      case "s":
        _0x45a79a = Math.floor(_0x5691c5 / 1000);
    }
    this.SetValue(_0x45a79a, this.CurrentValue == 0);
    if (_0x5691c5 <= 0) {
      clearInterval(this.Interval);
    }
  }
  SetValue(_0x5387bf, _0x5eb58e) {
    _0x5387bf = Math.max(Math.min(this.xInt(_0x5387bf), 99), 0);
    if (this.CurrentValue == _0x5387bf) {
      return;
    }
    this.CurrentValue = _0x5387bf;
    const _0x3bfa5c = this.CurrentValue.toString().padStart(2, "0");
    if (this.IsDigitalStyle || _0x5eb58e) {
      this.CurrDigit1.innerHTML = _0x3bfa5c[0];
      this.CurrDigit2.innerHTML = _0x3bfa5c[1];
    } else {
      if (this.CurrDigit1.innerText != _0x3bfa5c[0]) {
        this.NextDigit1.innerHTML = _0x3bfa5c[0];
        this.CurrDigit1.innerHTML = this.PrevDigit(_0x3bfa5c[0]);
        this.PrevDigit1.innerHTML = this.NextDigit(_0x3bfa5c[0]);
        this.Animate(this.NextDigit1, {
          transform: "translateY(0px)",
          opacity: 1
        }, () => {
          this.NextDigit1.style.opacity = 0.6;
          this.NextDigit1.style.transform = "translateY(-16px)";
          this.NextDigit1.innerHTML = this.NextDigit(_0x3bfa5c[0]);
        });
        this.Animate(this.CurrDigit1, {
          transform: "translateY(16px)",
          opacity: 0.6
        }, () => {
          this.CurrDigit1.style.opacity = 1;
          this.CurrDigit1.style.transform = "translateY(0px)";
          this.CurrDigit1.innerHTML = _0x3bfa5c[0];
        });
        this.PrevDigit1.style.transform = "translateY(-32px)";
        this.Animate(this.PrevDigit1, {
          transform: "translateY(-16px)",
          opacity: 0.6
        }, () => {
          this.PrevDigit1.style.opacity = 0.6;
          this.PrevDigit1.style.transform = "translateY(16px)";
          this.PrevDigit1.innerHTML = this.PrevDigit(_0x3bfa5c[0]);
        }, this.AnimationDuration);
      }
      if (this.CurrDigit2.innerText != _0x3bfa5c[1]) {
        this.NextDigit2.innerHTML = _0x3bfa5c[1];
        this.CurrDigit2.innerHTML = this.PrevDigit(_0x3bfa5c[1]);
        this.PrevDigit2.innerHTML = this.NextDigit(_0x3bfa5c[1]);
        this.Animate(this.NextDigit2, {
          transform: "translateY(0px)",
          opacity: 1
        }, () => {
          this.NextDigit2.style.opacity = 0.6;
          this.NextDigit2.style.transform = "translateY(-16px)";
          this.NextDigit2.innerHTML = this.NextDigit(_0x3bfa5c[1]);
        });
        this.Animate(this.CurrDigit2, {
          transform: "translateY(16px)",
          opacity: 0.6
        }, () => {
          this.CurrDigit2.style.opacity = 1;
          this.CurrDigit2.style.transform = "translateY(0px)";
          this.CurrDigit2.innerHTML = _0x3bfa5c[1];
        });
        this.PrevDigit2.style.transform = "translateY(-32px)";
        this.Animate(this.PrevDigit2, {
          transform: "translateY(-16px)",
          opacity: 0.6
        }, () => {
          this.PrevDigit2.style.opacity = 0.6;
          this.PrevDigit2.style.transform = "translateY(16px)";
          this.PrevDigit2.innerHTML = this.PrevDigit(_0x3bfa5c[1]);
        }, this.AnimationDuration);
      }
    }
  }
  Animate(_0x4554d7, _0x430ef6, _0x1c3c50, _0xff304a) {
    const _0x4ae121 = {
      duration: _0xff304a || this.AnimationDuration,
      easing: "ease-out"
    };
    const _0x1a59eb = _0x4554d7.animate(_0x430ef6, _0x4ae121);
    if (_0x1c3c50) {
      _0x1a59eb.addEventListener("finish", _0x1c3c50);
    }
    return _0x1a59eb;
  }
  Customize(_0x1a0a25) {
    for (let _0x544d76 = 0; _0x544d76 < _0x1a0a25.length; _0x544d76++) {
      const _0x478e5e = _0x1a0a25[_0x544d76];
      if (this.IsHexColor(_0x478e5e)) {
        const _0x3ca22c = "#" + _0x478e5e;
        if (this.WasPanelsColored) {
          this.SetTextColor(_0x3ca22c);
        } else {
          this.SetPanelColor(_0x3ca22c);
        }
      }
    }
  }
  SetTextColor(_0x5b288a) {
    this.NextDigit1.style.color = this.CurrDigit1.style.color = this.PrevDigit1.style.color = this.NextDigit2.style.color = this.CurrDigit2.style.color = this.PrevDigit2.style.color = _0x5b288a;
    this.NextDigit1.style["-webkit-text-fill-color"] = this.CurrDigit1.style["-webkit-text-fill-color"] = this.PrevDigit1.style["-webkit-text-fill-color"] = this.NextDigit2.style["-webkit-text-fill-color"] = this.CurrDigit2.style["-webkit-text-fill-color"] = this.PrevDigit2.style["-webkit-text-fill-color"] = _0x5b288a;
  }
  SetPanelColor(_0x1d69a5) {
    this.WasPanelsColored = !0;
    this.Panel1.style.background = this.Panel2.style.background = _0x1d69a5;
  }
  xInt(_0x3349f9) {
    _0x3349f9 = parseInt(_0x3349f9);
    if (isNaN(_0x3349f9)) {
      return 0;
    } else {
      return _0x3349f9;
    }
  }
  IsHexColor(_0x5269b2) {
    return /[0-9a-f]{6}$/i.test(_0x5269b2);
  }
  PrevDigit(_0x8d7cca) {
    const _0x2d610a = this.xInt(_0x8d7cca);
    if (_0x2d610a + 1 > 9) {
      return 0;
    } else {
      return _0x2d610a + 1;
    }
  }
  NextDigit(_0x5a75a3) {
    const _0x25f367 = this.xInt(_0x5a75a3);
    if (_0x25f367 - 1 < 0) {
      return 9;
    } else {
      return _0x25f367 - 1;
    }
  }
  MakeElement(_0x4ed7a5, _0x2abb7b, _0x521c66) {
    const _0x116443 = document.createElement(_0x2abb7b);
    if (_0x521c66) {
      _0x116443.className = _0x521c66;
    }
    if (_0x4ed7a5) {
      _0x4ed7a5.appendChild(_0x116443);
    }
    return _0x116443;
  }
}