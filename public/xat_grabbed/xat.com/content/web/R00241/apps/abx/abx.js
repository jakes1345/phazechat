class Ad {
  constructor(_0xae3939, _0x29517, _0x39cb3a) {
    this.pow2 = _0xae3939;
    this.text1 = null;
    this.text2 = null;
    this.wrapper = null;
    this.config = _0x39cb3a;
    this.adverts = _0x29517;
    this.latest = _0xae3939.last.id;
    this.status = _0xae3939.last.text;
    this.status = _0xae3939.last.text;
    this.countdownInterval = null;
    this.tooltip = null;
    this.timeoutId = null;
    this.xConfig = parent.xConfig;
    this.advertsUrl = "/json/abx.php";
    this.settings = JSON.parse(localStorage.getItem("Settings")) || {
      language: "en"
    };
    this.lang = this.settings.language;
    if (this.lang === "pt-br") {
      this.lang = "pt";
    }
    let _0x3773fa = 1;
    setTimeout(() => {
      if (this.xConfig?.fs) {
        this.showForSale();
      } else {
        this.setUpBanner(this.latest, this.status);
      }
    }, 100);
    window.setInterval(() => {
      if (this.adverts[this.lang]?.length) {
        if (_0x3773fa % 2 == 0) {
          if (this.xConfig?.fs.length) {
            this.showForSale();
          } else if (Math.random() >= 0.5) {
            this.showRandomPower();
          } else {
            this.setUpBanner(this.latest, this.status);
          }
        } else {
          this.showRandomGroup();
        }
      } else if (this.xConfig?.fs.length) {
        this.showForSale();
      } else if (_0x3773fa % 2 == 0) {
        this.setUpBanner(this.latest, this.status);
      } else {
        this.showRandomPower();
      }
      _0x3773fa++;
    }, 30000);
    window.setInterval(() => {
      fetch(this.advertsUrl + "?c=" + Date.now()).then(_0x4dc658 => _0x4dc658.json()).then(_0x11c3ad => this.adverts = _0x11c3ad);
    }, 300000);
  }
  showRandomPower() {
    const _0x3e7abf = Object.values(this.pow2.pssa);
    let _0x2ad04e = _0x3e7abf[Math.floor(Math.random() * _0x3e7abf.length)];
    if (_0x2ad04e == this.latest) {
      _0x2ad04e -= 1;
    }
    this.setUpBanner(_0x2ad04e);
  }
  showRandomGroup() {
    if (!this.adverts || !this.adverts[this.lang] || !this.adverts[this.lang].length) {
      return;
    }
    let _0x505863 = this.adverts[this.lang][Math.floor(Math.random() * this.adverts[this.lang].length)];
    this.setUpPromotion(_0x505863.adimg, _0x505863.group);
  }
  showForSale() {
    this.clearWrappers();
    this.showHideTextWrapper(!1);
    const _0x395d85 = this.makeElement(this.wrapper, "div", "forSale");
    const _0x10b28e = this.makeElement(_0x395d85, "img");
    _0x10b28e.src = "img/buygroup.svg";
    _0x10b28e.width = "23";
    const _0x4e0357 = this.makeElement(_0x395d85, "span");
    this.addText(_0x4e0357, ["mob2.forSale", "This group is for sale. Buy now!"]);
    document.addEventListener("click", _0x42958f => {
      _0x42958f.stopImmediatePropagation();
      window.top.location.href = "https://xat.com/store#!group";
    }, !0);
  }
  addText(_0x31db53, _0x581189, _0x592ef1) {
    if (!_0x581189) {
      return;
    }
    var _0x3f0a28;
    if (typeof _0x581189 == "string" && _0x581189.charAt(0) == "[" && _0x581189.search(/\[mob/) >= 0) {
      for (var _0x35727b in _0x581189 = _0x581189.split(/\[mob|\]/)) {
        if ((_0x3f0a28 = _0x581189[_0x35727b]).charAt(0) > 0 && _0x3f0a28.charAt(1) == ".") {
          _0x581189[_0x35727b] = _0x3f0a28.split(",");
          _0x581189[_0x35727b][0] = "mob" + _0x581189[_0x35727b][0];
        }
      }
    }
    if (Array.isArray(_0x581189)) {
      if (_0x581189[0]) {
        _0x31db53.setAttribute("data-localize", _0x581189[0]);
        let _0x4b04b5 = null;
        if (_0x581189.length > 2) {
          const _0x4dde3d = _0x581189.slice(2, _0x581189.length);
          _0x4b04b5 = this.GetTranslation(_0x581189[0], _0x4dde3d);
          _0x581189 = _0x581189[1];
          _0x4dde3d.forEach((_0x507321, _0x14537c) => {
            const _0x5e9b57 = new RegExp("\\$" + (_0x14537c + 1), "g");
            _0x581189 = _0x581189.replace(_0x5e9b57, _0x507321);
            _0x4b04b5 &&= _0x4b04b5.replace(_0x5e9b57, _0x507321);
          });
        } else {
          _0x4b04b5 = this.GetTranslation(_0x581189[0]);
          _0x581189 = _0x581189[1];
        }
        if (_0x4b04b5) {
          _0x581189 = _0x4b04b5;
        }
      } else {
        _0x581189 = _0x581189[1];
      }
    }
    if (_0x31db53 && typeof _0x581189 == "string" && _0x581189.indexOf("$1") >= 0 && _0x31db53?.dataset?.dataSec) {
      _0x581189 = _0x581189.replace("$1", _0x31db53.dataset.dataSec);
    }
    let _0x2e4c32 = null;
    if (_0x592ef1) {
      if (_0x31db53) {
        _0x31db53.innerHTML += _0x581189;
      }
    } else {
      _0x2e4c32 = document.createTextNode(_0x581189);
      if (_0x31db53) {
        _0x31db53.appendChild(_0x2e4c32);
      }
    }
    return _0x2e4c32;
  }
  GetTranslation(_0x493917, _0x2fba63) {
    var _0x29ebf8 = _0x493917.split(".");
    let _0xe7d7cd;
    if (_0x29ebf8[0] == "box" && _Activity.instance.CustomGroupLang && (_0xe7d7cd = _Activity.instance.CustomGroupLang[_0x29ebf8[1]])) {
      return _0xe7d7cd;
    }
    if (_Activity.instance?.LangFiles && _Activity.instance?.LangFiles[_0x29ebf8[0]] && _Activity.instance?.LangFiles[_0x29ebf8[0]][_0x29ebf8[1]]) {
      let _0x19d5e5 = _Activity.instance?.LangFiles[_0x29ebf8[0]][_0x29ebf8[1]];
      if (_0x2fba63) {
        _0x2fba63.forEach((_0x5e78a6, _0x2be629) => {
          const _0x1d6f5c = new RegExp("\\$" + (_0x2be629 + 1), "g");
          _0x19d5e5 = _0x19d5e5.replace(_0x1d6f5c, _0x5e78a6);
        });
      }
      return _0x19d5e5;
    }
    return !1;
  }
  makeElement(_0x2be6f5, _0xa96f33, _0x40f447, _0x22b05d, _0x4eec43) {
    var _0x42772 = document.createElement(_0xa96f33);
    if (_0x40f447) {
      _0x42772.className = _0x40f447;
    }
    if (_0x22b05d) {
      _0x42772.id = _0x22b05d;
    }
    if (_0x2be6f5) {
      _0x2be6f5.appendChild(_0x42772);
    }
    if (_0x4eec43) {
      _0x4eec43.prepend(_0x42772);
    }
    return _0x42772;
  }
  clearWrappers() {
    this.text1 = document.querySelector("#text1");
    this.text2 = document.querySelector("#text2");
    this.wrapper = document.querySelector("#contentWrapper");
    this.text1.innerHTML = "";
    this.text2.innerHTML = "";
    this.wrapper.innerHTML = "";
    clearInterval(this.countdownInterval);
  }
  setUpPromotion(_0x50fc69, _0x460677) {
    this.clearWrappers();
    this.showHideTextWrapper(!1);
    var _0x1134c4 = new Image(728, 90);
    _0x1134c4.src = "https://chatsgroup.com/css/abxpic.php?u=" + _0x50fc69;
    _0x1134c4.style.borderRadius = "5px";
    _0x1134c4.addEventListener("click", _0x3a9438 => {
      _0x3a9438.stopImmediatePropagation();
      if (_0x460677) {
        window.top.open("https://xat.com/" + _0x460677, "_blank");
      }
    });
    this.wrapper.appendChild(_0x1134c4);
  }
  setUpBanner(_0x58b2b3, _0x1ea046) {
    let _0x3d2218 = this.getPowerName(_0x58b2b3);
    let _0x5d97de = this.getRandomElements(this.getPowerSmileys(_0x58b2b3), 10);
    _0x5d97de.unshift(_0x3d2218);
    this.clearWrappers();
    this.showHideTextWrapper(!0);
    let _0x215a48 = this.makeElement(this.wrapper, "div", "flex-grid boxes");
    for (let _0x153d92 = 0; _0x153d92 < 10; _0x153d92++) {
      if (_0x5d97de[_0x153d92]) {
        Smilies.MakeSmiley(this.makeElement(_0x215a48, "div", "box"), _0x5d97de[_0x153d92], {
          size: 30,
          tooltipPosition: "bottom",
          tooltip: _0x5d97de[_0x153d92],
          adBanner: this
        });
      }
    }
    const _0x1eac59 = _0x3d2218.toLowerCase();
    const _0x186a7c = this?.pow2?.Aces && this.pow2.Aces[_0x1eac59] ? "ace" : "power";
    if (_0x1ea046) {
      this.text1.textContent = "New " + _0x3d2218.toUpperCase() + " " + _0x186a7c + " " + _0x1ea046;
      this.countdownInterval = setInterval(() => {
        this.text2.textContent = this.getTimeString();
      }, 500);
    } else {
      this.text1.textContent = _0x3d2218.toUpperCase() + " " + _0x186a7c;
    }
    document.addEventListener("click", _0x2b1b69 => {
      const {
        className: _0x36ca84,
        nodeName: _0x50b604
      } = _0x2b1b69?.target;
      if (_0x36ca84 != "tooltip" && _0x50b604 != "IMG") {
        _0x2b1b69.stopImmediatePropagation();
        window.top.open("https://xat.com/powers", "_blank");
      }
    }, !0);
  }
  getRandomElements(_0xa7ca95, _0x2075ce) {
    for (let _0xbf5a3b = _0xa7ca95.length - 1; _0xbf5a3b > 0; _0xbf5a3b--) {
      let _0x33c16a = _0xa7ca95[_0xbf5a3b];
      let _0x582d12 = Math.floor(Math.random() * (_0xbf5a3b + 1));
      _0xa7ca95[_0xbf5a3b] = _0xa7ca95[_0x582d12];
      _0xa7ca95[_0x582d12] = _0x33c16a;
    }
    return _0xa7ca95.slice(0, _0x2075ce);
  }
  getTimeString() {
    let _0x4391f4 = this.config.t * 1000 - Date.now();
    if (_0x4391f4 <= 0) {
      return this.config.m2;
    }
    {
      let _0x5e7ae9 = "";
      let _0x38c9e2 = Math.floor(_0x4391f4 / 1000) % 60;
      let _0x315148 = Math.floor(_0x4391f4 / 60000) % 60;
      let _0x612341 = Math.floor(_0x4391f4 / 3600000) % 24;
      _0x5e7ae9 = _0x612341 >= 24 ? Math.floor(_0x612341 / 24) + " days" : _0x612341 + ":" + (_0x315148 < 10 ? "0" : "") + _0x315148 + "." + (_0x38c9e2 < 10 ? "0" : "") + _0x38c9e2;
      let _0x54442c = this.config.m1;
      _0x54442c = _0x54442c.replace(/%1/g, _0x5e7ae9);
      return _0x54442c;
    }
  }
  getPowerName(_0x10604c) {
    for (let _0x296b18 in this.pow2.pssa) {
      if (this.pow2.pssa[_0x296b18] == _0x10604c) {
        return _0x296b18;
      }
    }
    for (let _0x13d69a in this.pow2.SuperP) {
      if (_0x13d69a == _0x10604c) {
        return this.pow2.SuperP[_0x13d69a].s.split(",")[0];
      }
    }
    return null;
  }
  getAllPromoGroups() {
    let _0xe69e7 = [];
    Object.values(this.adverts).forEach(_0x529db9 => {
      if (_0x529db9.length > 0) {
        _0xe69e7 = _0xe69e7.concat(_0x529db9);
      }
    });
    return _0xe69e7;
  }
  getIndexOnPromo(_0x20c7f7) {
    let _0x4774c8 = -1;
    this.getAllPromoGroups().forEach((_0x2df4c8, _0x298b92) => {
      if (_0x2df4c8.group.toLowerCase() == _0x20c7f7.toLowerCase()) {
        _0x4774c8 = _0x298b92;
      }
    });
    return _0x4774c8;
  }
  getPowerSmileys(_0x5c6d75) {
    let _0x2e39dc = [];
    for (let _0x373e2b in this.pow2.topsh) {
      if (this.pow2.topsh[_0x373e2b] == _0x5c6d75) {
        _0x2e39dc.push(_0x373e2b);
      }
    }
    if (_0x2e39dc.length == 0) {
      for (let _0x13ca62 in this.pow2.SuperP) {
        if (_0x13ca62 == _0x5c6d75) {
          let _0x53c795 = this.pow2.SuperP[_0x13ca62].s.split(",");
          for (let _0xc85bd2 = 1; _0xc85bd2 < _0x53c795.length; _0xc85bd2++) {
            _0x2e39dc.push(_0x53c795[_0xc85bd2]);
          }
        }
      }
    }
    return _0x2e39dc;
  }
  addToolTip(_0x4f4d01, _0xb9a798, _0xd85b83 = {}) {
    let {
      select: _0x24f69a,
      position: _0x55ac94,
      maxWidth: _0x56f2a8,
      Rect: _0x187a7c,
      showRapid: _0x119ccf,
      shortTime: _0xb1f72b,
      dom: _0x4aa4c5,
      timestamp: _0x52ef51,
      instant: _0x3835e9
    } = _0xd85b83;
    if (!_0x4f4d01 || _0xb9a798.length == 0) {
      return;
    }
    if (_0x55ac94 != "pointer") {
      _0x4f4d01.style.cursor = "pointer";
    }
    _0x4f4d01.style["pointer-events"] = "auto";
    _0x4aa4c5 ||= document;
    let _0x5cb55f = _0x3835e9 ? 1 : _0xb1f72b ? 500 : 1000;
    if (_0x52ef51 && !_0x4f4d01.dataset.timestamp) {
      _0x4f4d01.dataset.timestamp = _0x52ef51;
    }
    _0x4f4d01.addEventListener("mouseenter", _0x207c85 => {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = window.setTimeout(() => {
        if (!_0x4f4d01.dataset.key || !!document.querySelector("[data-key=\"" + _0x4f4d01.dataset.key + "\"]")) {
          this.hideTooltip();
          this.tooltip = this.addHintText(_0x207c85, _0xb9a798, _0x55ac94, _0x56f2a8, _0x187a7c, _0x4aa4c5);
          if (_0x24f69a) {
            this.tooltip.addEventListener("mouseenter", () => {
              window.clearTimeout(this.timeoutId);
            });
          }
          _0x4aa4c5.addEventListener("click", _0x2ad066 => {
            if (_0x2ad066.target != this.tooltip) {
              this.hideTooltip();
            }
          });
          this.tooltip.addEventListener("mouseleave", () => {
            window.clearTimeout(this.timeoutId);
            this.timeoutId = window.setTimeout(() => {
              let _0x2eebcd = _0x4aa4c5.querySelector("#tooltips");
              if (_0x2eebcd) {
                _0x2eebcd.parentNode.removeChild(_0x2eebcd);
              }
              this.tooltip = null;
            }, 100);
          });
          if (_0x24f69a) {
            this.tooltip.addEventListener("click", () => {
              if (_0x4aa4c5.body.createTextRange) {
                const _0x52f392 = _0x4aa4c5.body.createTextRange();
                _0x52f392.moveToElementText(this.tooltip);
                _0x52f392.select();
              } else if (window.getSelection) {
                const _0x56c34 = window.getSelection();
                const _0x5124c5 = _0x4aa4c5.createRange();
                _0x5124c5.selectNodeContents(this.tooltip);
                _0x56c34.removeAllRanges();
                _0x56c34.addRange(_0x5124c5);
              }
            });
          }
        }
      }, this.tooltip ? 0 : _0x5cb55f);
    });
    _0x4f4d01.addEventListener("mouseleave", () => {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = window.setTimeout(() => {
        let _0x554d1f = _0x4aa4c5.querySelector("#tooltips");
        if (_0x554d1f) {
          _0x554d1f.parentNode.removeChild(_0x554d1f);
        }
        this.tooltip = null;
      }, 500);
    });
  }
  hideTooltip() {
    this.tooltip = null;
    let _0x7200a6 = document.querySelector("#tooltips");
    if (_0x7200a6) {
      _0x7200a6.parentNode.removeChild(_0x7200a6);
    }
  }
  addHintText(_0x1fd653, _0x482c58, _0x489cfc, _0x574300, _0xb9cd8e, _0x1b61bb) {
    if (_0x482c58 && _0x482c58.length == 0) {
      return;
    }
    let _0x130339 = _0x1b61bb.querySelector("#tooltips");
    if (_0x130339) {
      _0x130339.parentNode.removeChild(_0x130339);
    }
    _0x130339 = this.makeElement(null, "div", "", "tooltips");
    _0x1b61bb.body.prepend(_0x130339);
    let _0x1a78b2 = this.makeElement(_0x130339, "div", "tooltip");
    if (_0x574300) {
      _0x1a78b2.style["max-width"] = "50%";
    }
    _0x1a78b2.innerText = _0x482c58;
    var _0xb1b04b = _0xb9cd8e ? _0xb9cd8e.getBoundingClientRect() : _0x1fd653.target.getBoundingClientRect();
    switch (_0x489cfc) {
      case "left":
        _0x1a78b2.style.top = _0xb1b04b.top + "px";
        _0x1a78b2.style.left = Math.min(_0xb1b04b.left) - _0x1a78b2.clientWidth - 10 + "px";
        if (_0x1a78b2.getBoundingClientRect().left < 15) {
          _0x1a78b2.style.left = "15px";
        } else if (_0x1a78b2.getBoundingClientRect().right >= window.innerWidth) {
          _0x1a78b2.style.left = window.innerWidth - _0x1a78b2.getBoundingClientRect().width - 15 + "px";
        }
        break;
      case "right":
        _0x1a78b2.style.top = _0xb1b04b.top + "px";
        _0x1a78b2.style.left = _0xb1b04b.width - (_0x1a78b2.clientWidth - 5) + "px";
        if (_0x1a78b2.getBoundingClientRect().right < 15) {
          _0x1a78b2.style.right = "15px";
        } else if (_0x1a78b2.getBoundingClientRect().right >= window.innerWidth) {
          _0x1a78b2.style.right = window.innerWidth - _0x1a78b2.getBoundingClientRect().width - 15 + "px";
        }
        break;
      case "low":
        _0x1a78b2.style.top = _0xb1b04b.top - 30 + "px";
        _0x1a78b2.style.left = _0xb1b04b.left + Math.abs(_0xb1b04b.left - _0xb1b04b.right) / 2 - _0x1a78b2.clientWidth / 2 + "px";
        if (_0x1a78b2.getBoundingClientRect().left < 15) {
          _0x1a78b2.style.left = "15px";
        } else if (_0x1a78b2.getBoundingClientRect().right >= window.innerWidth) {
          _0x1a78b2.style.left = window.innerWidth - _0x1a78b2.getBoundingClientRect().width - 15 + "px";
        }
        break;
      case "bottom":
        _0x1a78b2.style.top = "58px";
        _0x1a78b2.style.left = _0xb1b04b.left + Math.abs(_0xb1b04b.left - _0xb1b04b.right) / 2 - _0x1a78b2.clientWidth / 2 + "px";
        if (_0x1a78b2.getBoundingClientRect().left < 15) {
          _0x1a78b2.style.left = "15px";
        } else if (_0x1a78b2.getBoundingClientRect().right >= window.innerWidth) {
          _0x1a78b2.style.left = window.innerWidth - _0x1a78b2.getBoundingClientRect().width - 25 + "px";
        }
        break;
      case "pointer":
        _0x1a78b2.style.top = _0xb1b04b.top - 30 + "px";
        _0x1a78b2.style.left = _0x1fd653.clientX + "px";
        if (_0x1a78b2.getBoundingClientRect().left < 15) {
          _0x1a78b2.style.left = "15px";
        } else if (_0x1a78b2.getBoundingClientRect().right >= window.innerWidth) {
          _0x1a78b2.style.left = window.innerWidth - _0x1a78b2.getBoundingClientRect().width - 15 + "px";
        }
        break;
      case "top-tall":
        _0x1a78b2.style.top = _0xb1b04b.top - _0x1a78b2.getBoundingClientRect().height - 10 + "px";
        _0x1a78b2.style.left = _0xb1b04b.left + Math.abs(_0xb1b04b.left - _0xb1b04b.right) / 2 - _0x1a78b2.clientWidth / 2 + "px";
        if (_0x1a78b2.getBoundingClientRect().left < 15) {
          _0x1a78b2.style.left = "15px";
        } else if (_0x1a78b2.getBoundingClientRect().right >= window.innerWidth) {
          _0x1a78b2.style.left = window.innerWidth - (_0x1a78b2.getBoundingClientRect().width - 15) * 2 + "px";
        }
        if (xInt(_0x1a78b2.style.left) <= 0) {
          _0x1a78b2.style.left = "15px";
        }
        break;
      default:
        _0x1a78b2.style.top = _0xb1b04b.top - 50 + "px";
        _0x1a78b2.style.left = _0xb1b04b.left + Math.abs(_0xb1b04b.left - _0xb1b04b.right) / 2 - _0x1a78b2.clientWidth / 2 + "px";
        if (_0x1a78b2.getBoundingClientRect().left < 15) {
          _0x1a78b2.style.left = "15px";
        } else if (_0x1a78b2.getBoundingClientRect().right >= window.innerWidth) {
          _0x1a78b2.style.left = window.innerWidth - _0x1a78b2.getBoundingClientRect().width - 15 + "px";
        }
        if (xInt(_0x1a78b2.style.left) <= 0) {
          _0x1a78b2.style.left = "15px";
        }
    }
    if (_0x1a78b2.getBoundingClientRect().top < 0) {
      _0x1a78b2.style.top = "5px";
    }
    return _0x1a78b2;
  }
  showHideTextWrapper(_0x42c3d8) {
    const _0x48d2e5 = document.querySelector(".textWrapper");
    if (_0x48d2e5) {
      if (_0x42c3d8) {
        _0x48d2e5.classList.remove("d-none");
      } else {
        _0x48d2e5.classList.add("d-none");
      }
    }
  }
}