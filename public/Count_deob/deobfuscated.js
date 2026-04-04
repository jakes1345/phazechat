class Count {
  constructor(parentEl, params) {
    this.Interval;
    this.CurrentValue = 0;
    this.AnimationDuration = 300;
    this.WasPanelsColored = !1;
    this.IsDigitalStyle = !1;
    this.isUsingUTC = !1;
    this.Holder = this.MakeElement(parentEl, "span", "countP" + (this.IsDigitalStyle ? " digital" : " classic"));
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
    let timerStr = params[0];
    if (params.length > 1) {
      timerStr += "#" + params[1];
    }
    this.SetTimer(timerStr);
    this.Customize(params.slice(1, 4));
  }
  getTrueMonth(month, dateObj) {
    if (month >= 1 && month <= 12) {
      return month - 1;
    } else {
      return dateObj.getMonth();
    }
  }
  getUTCTimestamp() {
    const now = new Date();
    return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
  }
  getFutureTimestamp(year, month, day, hours, minutes, seconds) {
    if (this.isUsingUTC) {
      return new Date(Date.UTC(year, month, day, hours, minutes, seconds));
    } else {
      return new Date(year, month, day, hours, minutes, seconds);
    }
  }
  SetTimer(timerInput) {
    if (!timerInput) {
      return;
    }
    const parts = timerInput.split("/");
    const modeParts = parts[0].split("#");
    const mode = modeParts[0].toLowerCase();
    if (modeParts.length > 1 && modeParts[1].toLowerCase() == "utc") {
      this.isUsingUTC = true;
    }
    if (mode == "f") {
      this.SetValue(parts[1], true);
      return;
    }
    const now = new Date();
    const month = this.getTrueMonth(this.xInt(parts[1]), now);
    const day = this.xInt(parts[2]) || now.getDay();
    const year = 2000 + this.xInt(parts[3]) || now.getFullYear();
    const hours = this.xInt(parts[4]);
    const minutes = this.xInt(parts[5]);
    const seconds = this.xInt(parts[6]);
    const targetTime = this.getFutureTimestamp(year, month, day, hours, minutes, seconds).getTime();
    this.UpdateCount(mode, targetTime);
    this.Interval = setInterval(() => this.UpdateCount(mode, targetTime), this.AnimationDuration);
  }
  UpdateCount(mode, targetTime) {
    let displayValue;
    const remaining = targetTime - (this.isUsingUTC ? this.getUTCTimestamp() : Date.now());
    switch (mode) {
      case "d":
        displayValue = Math.floor(remaining / 86400000);
        break;
      case "h":
        displayValue = Math.floor(remaining / 3600000);
        break;
      case "m":
        displayValue = Math.floor(remaining / 60000);
        break;
      case "s":
        displayValue = Math.floor(remaining / 1000);
    }
    this.SetValue(displayValue, this.CurrentValue == 0);
    if (remaining <= 0) {
      clearInterval(this.Interval);
    }
  }
  SetValue(newValue, isInitial) {
    newValue = Math.max(Math.min(this.xInt(newValue), 99), 0);
    if (this.CurrentValue == newValue) {
      return;
    }
    this.CurrentValue = newValue;
    const digits = this.CurrentValue.toString().padStart(2, "0");
    if (this.IsDigitalStyle || isInitial) {
      this.CurrDigit1.innerHTML = digits[0];
      this.CurrDigit2.innerHTML = digits[1];
    } else {
      if (this.CurrDigit1.innerText != digits[0]) {
        this.NextDigit1.innerHTML = digits[0];
        this.CurrDigit1.innerHTML = this.PrevDigit(digits[0]);
        this.PrevDigit1.innerHTML = this.NextDigit(digits[0]);
        this.Animate(this.NextDigit1, {
          transform: "translateY(0px)",
          opacity: 1
        }, () => {
          this.NextDigit1.style.opacity = 0.6;
          this.NextDigit1.style.transform = "translateY(-16px)";
          this.NextDigit1.innerHTML = this.NextDigit(digits[0]);
        });
        this.Animate(this.CurrDigit1, {
          transform: "translateY(16px)",
          opacity: 0.6
        }, () => {
          this.CurrDigit1.style.opacity = 1;
          this.CurrDigit1.style.transform = "translateY(0px)";
          this.CurrDigit1.innerHTML = digits[0];
        });
        this.PrevDigit1.style.transform = "translateY(-32px)";
        this.Animate(this.PrevDigit1, {
          transform: "translateY(-16px)",
          opacity: 0.6
        }, () => {
          this.PrevDigit1.style.opacity = 0.6;
          this.PrevDigit1.style.transform = "translateY(16px)";
          this.PrevDigit1.innerHTML = this.PrevDigit(digits[0]);
        }, this.AnimationDuration);
      }
      if (this.CurrDigit2.innerText != digits[1]) {
        this.NextDigit2.innerHTML = digits[1];
        this.CurrDigit2.innerHTML = this.PrevDigit(digits[1]);
        this.PrevDigit2.innerHTML = this.NextDigit(digits[1]);
        this.Animate(this.NextDigit2, {
          transform: "translateY(0px)",
          opacity: 1
        }, () => {
          this.NextDigit2.style.opacity = 0.6;
          this.NextDigit2.style.transform = "translateY(-16px)";
          this.NextDigit2.innerHTML = this.NextDigit(digits[1]);
        });
        this.Animate(this.CurrDigit2, {
          transform: "translateY(16px)",
          opacity: 0.6
        }, () => {
          this.CurrDigit2.style.opacity = 1;
          this.CurrDigit2.style.transform = "translateY(0px)";
          this.CurrDigit2.innerHTML = digits[1];
        });
        this.PrevDigit2.style.transform = "translateY(-32px)";
        this.Animate(this.PrevDigit2, {
          transform: "translateY(-16px)",
          opacity: 0.6
        }, () => {
          this.PrevDigit2.style.opacity = 0.6;
          this.PrevDigit2.style.transform = "translateY(16px)";
          this.PrevDigit2.innerHTML = this.PrevDigit(digits[1]);
        }, this.AnimationDuration);
      }
    }
  }
  Animate(element, keyframes, onFinish, duration) {
    const animOptions = {
      duration: duration || this.AnimationDuration,
      easing: "ease-out"
    };
    const animation = element.animate(keyframes, animOptions);
    if (onFinish) {
      animation.addEventListener("finish", onFinish);
    }
    return animation;
  }
  Customize(colorParams) {
    for (let i = 0; i < colorParams.length; i++) {
      const param = colorParams[i];
      if (this.IsHexColor(param)) {
        const hexColor = "#" + param;
        if (this.WasPanelsColored) {
          this.SetTextColor(hexColor);
        } else {
          this.SetPanelColor(hexColor);
        }
      }
    }
  }
  SetTextColor(color) {
    this.NextDigit1.style.color = this.CurrDigit1.style.color = this.PrevDigit1.style.color = this.NextDigit2.style.color = this.CurrDigit2.style.color = this.PrevDigit2.style.color = color;
    this.NextDigit1.style["-webkit-text-fill-color"] = this.CurrDigit1.style["-webkit-text-fill-color"] = this.PrevDigit1.style["-webkit-text-fill-color"] = this.NextDigit2.style["-webkit-text-fill-color"] = this.CurrDigit2.style["-webkit-text-fill-color"] = this.PrevDigit2.style["-webkit-text-fill-color"] = color;
  }
  SetPanelColor(color) {
    this.WasPanelsColored = !0;
    this.Panel1.style.background = this.Panel2.style.background = color;
  }
  xInt(value) {
    value = parseInt(value);
    if (isNaN(value)) {
      return 0;
    } else {
      return value;
    }
  }
  IsHexColor(str) {
    return /[0-9a-f]{6}$/i.test(str);
  }
  PrevDigit(digitStr) {
    const digit = this.xInt(digitStr);
    if (digit + 1 > 9) {
      return 0;
    } else {
      return digit + 1;
    }
  }
  NextDigit(digitStr) {
    const digit = this.xInt(digitStr);
    if (digit - 1 < 0) {
      return 9;
    } else {
      return digit - 1;
    }
  }
  MakeElement(parentEl, tagName, className) {
    const el = document.createElement(tagName);
    if (className) {
      el.className = className;
    }
    if (parentEl) {
      parentEl.appendChild(el);
    }
    return el;
  }
}