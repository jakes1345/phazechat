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
  Debounce(func) {
    let frameId;
    return function () {
      for (var argLen = arguments.length, args = new Array(argLen), i = 0; i < argLen; i++) {
        args[i] = arguments[i];
      }
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      frameId = requestAnimationFrame(() => {
        func(...args);
      });
    };
  }
  ReloadAll(animate) {
    this.Animation = animate;
    const smileyNames = Object.getOwnPropertyNames(this.Smilies);
    for (let i = 0; i < smileyNames.length; i++) {
      delete this.Smilies[smileyNames[i]];
    }
  }
  MakeSmiley(container, code, options) {
    const {
      addGback,
      scrollParent
    } = options;
    let size = options.size || 20;
    if (code[0] == "(") {
      code = code.split(")")[0].slice(1);
    }
    let sanitizedCode = (code = code.replace(/\#/g, "*").replace(/[\s]/g, ""));
    const endsWithStar = sanitizedCode.slice(-1) === "*";
    while (sanitizedCode.slice(-1) == "*") {
      sanitizedCode = sanitizedCode.slice(0, -1);
    }
    let parts = sanitizedCode.toLowerCase().split("*");
    const isSpecialIcon = sanitizedCode[0] == "<";
    const isCombo = parts.length > 1;
    const isSingleSmiley = parts.length == 1 && !endsWithStar;
    const isPawn = (options.isPawn = sanitizedCode.slice(0, 2) == "p1");
    const className = (options.className ?? "") + (isPawn ? " pawn" : "");
    options.isName = options.isName ?? !1;

    if (parts.length > 1) {
      const partsLen = parts.length;
      for (let i = 0; i < partsLen; i++) {
        const part = parts[i];
        if (part == "mi" || part == "im") {
          options.isMirrored = options.isInverted = true;
        }
        if (part == "m") {
          options.isMirrored = true;
        }
        if (part == "i") {
          options.isInverted = true;
        }
      }
    }

    if (
      sanitizedCode.toLowerCase().indexOf("num*num") == -1 &&
      sanitizedCode.toLowerCase().indexOf("pframe*w") == -1 &&
      sanitizedCode.toLowerCase().indexOf("stick*") == -1
    ) {
      sanitizedCode = sanitizedCode.toLowerCase();
    }

    if (scrollParent && !this.Containers.has(scrollParent)) {
      this.Containers.add(scrollParent);
      scrollParent.intersectionObserver = new IntersectionObserver(
        this.IntersectionObserverCallback,
        {
          root: scrollParent,
          threshold: 0,
          rootMargin: "60px",
        }
      );
    }

    let gbackPart = "";
    const gConfig = _Activity?.instance?.gConfig;
    const firstPart = parts[0]?.toLowerCase();
    const isBannedOrSoth =
      firstPart == "bump" ||
      (_Activity?.instance?.SOTH &&
        _Activity?.instance?.SOTH.indexOf(firstPart) >= 0);

    if (
      addGback &&
      !isBannedOrSoth &&
      gConfig &&
      !isPawn &&
      !isSpecialIcon &&
      isSingleSmiley &&
      _Activity?.instance?.UserSettings?.gback != "disable" &&
      (gConfig?.g130 && (gbackPart += "*" + gConfig?.g130),
      gConfig?.g106 && gConfig?.g106 != " - 1")
    ) {
      if (gConfig?.g106.indexOf("#") != -1) {
        let colorPart = gConfig?.g106?.split("#");
        colorPart = colorPart[0] != "-1" ? colorPart[0] : colorPart[1];
        gbackPart += "*" + toHex6(colorPart).toLowerCase();
      } else if (gConfig?.g106 != "-1") {
        gbackPart += "*" + toHex6(gConfig?.g106).toLowerCase();
      }
    }

    let gsSize = (options.gsSize = size);
    if (
      this.Animation &&
      options.applyEffects &&
      !parts.includes("angel") &&
      this.SmiliesGoBig.includes(parts[0])
    ) {
      options.gsSize = gsSize = 80;
    }

    const modeChar = this.Animation ? "a" : "S";
    const el = this.MakeElement(container, "span", className);
    const hashPrefix =
      modeChar + "_(" + sanitizedCode + gbackPart + ")_" + gsSize;
    const encodedHash = isSpecialIcon
      ? this.IconToLib(sanitizedCode, gsSize)
      : this.EncodeGetStrip(hashPrefix);
    const fullHash = isSpecialIcon
      ? this.IconToLib(sanitizedCode, gsSize)
      : modeChar +
        "_(" +
        code +
        gbackPart +
        ")_" +
        gsSize +
        this.GenerateAvatarEffectHash(options.avatarEffect);
    const url = "https://gs.xat.com/" + encodedHash;

    el.code = code;
    el.dataset.sm = sanitizedCode;
    el.dataset.smHash = fullHash;
    el.style.width = size + "px";
    el.style.height = size + "px";
    el.documentBody = document.body;
    el.createdAt = Date.now();

    if (sanitizedCode.substr(0, 4) == "none") {
      return el;
    }

    if (
      parts[0] != "count" ||
      options?.className == "appIcon" ||
      options?.className == "smSpan"
    ) {
      if (fullHash in this.Smilies) {
        this.Smilies[fullHash].lastUsed = Date.now();
        this.Smilies[fullHash].wrappers.push(el);
        this.Smilies[fullHash].optionsArr.push(options);
        this.Smilies[fullHash].avatarEffect = options.avatarEffect;
        this.SmileyLoaded(this.Smilies[fullHash]);
      } else {
        const img = new Image();
        this.Smilies[fullHash] = img;
        img.url = url;
        img.wrappers = [el];
        img.hash = fullHash;
        img.size = size;
        img.retries = 0;
        img.smileyName = sanitizedCode;
        img.smileyCode = code;
        img.isComboSmiley = isCombo;
        img.loaded = false;
        img.lastUsed = Date.now();
        img.optionsArr = [options];
        img.onload = (ev) => this.SmileyLoaded.call(this, ev.target);
        img.onerror = (ev) => this.SmileyError.call(this, ev.target);
        img.src = url;
        img.avatarEffect = options.avatarEffect;
      }
      this.ApplyClickEvent(this.Smilies[fullHash], el);
      return el;
    }

    {
      new Count(el, parts.slice(1, 5));
      const {
        _window = window,
        tooltip,
        tooltipPosition = "top",
        adBanner = !1,
      } = options;
      const tooltipOptions = {
        position: tooltipPosition,
        select: !0,
      };
      if (tooltip) {
        (adBanner || _window).addToolTip(el, tooltip, tooltipOptions);
      }
    }
  }
  ApplyClickEvent(smileyImg, wrapper) {
    if (!smileyImg) {
      return;
    }
    const smileyName = smileyImg.smileyName;
    const lastOptions = smileyImg.optionsArr[smileyImg.optionsArr.length - 1];
    const {
      showAd = !0,
      userID,
      userName,
      callback,
      callbackTarget,
      _window = window,
      tooltip,
      tooltipPosition = "top",
      adBanner = !1
    } = lastOptions;
    const tooltipOpts = {
      position: tooltipPosition,
      select: !0
    };
    if (tooltip) {
      (adBanner || _window).addToolTip(callbackTarget ?? wrapper, tooltip, tooltipOpts);
    }
    (callbackTarget ?? wrapper).addEventListener("click", ev => {
      if (callback) {
        callback(ev);
      } else if (_Activity?.instance.PSSA) {
        const nameParts = smileyName.split("*");
        const baseName = nameParts[0];
        const powerIndex = _Activity.instance.PSSA.indexOf(baseName) - 1;
        const userInfo = {
          id: userID,
          regname: userName
        };
        if (smileyName.slice(0, 13) == "radio*http://" || smileyName.slice(0, 14) == "radio*https://") {
          const radioUrl = nameParts[1];
          _Activity.instance.PlayRadio(radioUrl);
        } else if (baseName == "xavi") {
          openApp("xavi");
        } else if (baseName == "gifts") {
          setAppIcon(20044);
          openGift(userInfo);
        } else if (powerIndex > 0 && showAd && !smileyImg.isComboSmiley) {
          _window.powerAd(baseName, powerIndex);
        }
      }
    });
  }
  SmileyLoaded(img) {
    const wrappers = img.wrappers;
    const optionsArr = img.optionsArr;
    if (!img.width || !img.height) {
      this.SmileyError(img);
      return;
    }
    const offset = (img.height - (optionsArr[0].size || 20)) / 2;
    img.loaded = !0;
    img.lastUsed = Date.now();
    this.SmiliesMemory += img.width * img.height;
    for (let i = 0; i < wrappers.length; i++) {
      const wrapper = wrappers[i];
      const options = optionsArr[i];
      if (wrapper.loaded) {
        continue;
      }
      const isProfileAvatar = options.className == "profileAvatar";
      const smileyImg = img.cloneNode(!0);
      while (isProfileAvatar && smileyImg.width > 100 && smileyImg.height > 100) {
        smileyImg.width /= 2;
        smileyImg.height /= 2;
      }
      smileyImg.code = wrapper.code;
      smileyImg.wrapper = wrapper;
      smileyImg.options = options;
      wrapper.loaded = !0;
      wrapper.smileyHash = img.hash;
      wrapper.style.width = (img.width || options.size || 20) + "px";
      wrapper.style.height = (img.height || options.size || 20) + "px";
      if (options.useShadow) {
        wrapper.classList.add("avShadow");
      }
      const hasEffect =
        img.avatarEffect !== undefined &&
        (img.avatarEffect.avatareffect?.length > 0 ||
          img.avatarEffect.avatarframe?.length > 0);
      const needsMirroredOrInverted =
        hasEffect && (options.isMirrored || options.isInverted);
      if (!needsMirroredOrInverted) {
        if (options.isMirrored) {
          if (options.isPawn) {
            wrapper.style.transform = "scaleX(-1) translateX(6px)";
          } else {
            wrapper.style.transform = "scaleX(-1)";
          }
        }
        if (options.isInverted) {
          if (options.isPawn) {
            wrapper.style.transform = "scaleY(-1) translateY(4px)";
          } else {
            let topOffset = options.size === 40 ? 2 : 1;
            wrapper.style.transform = "scaleY(-1)";
            if (!options.isName) {
              wrapper.style.top =
                "calc(" + options.size + "px - " + topOffset + "rem)";
            }
          }
        }
        if (options.isMirrored && options.isInverted) {
          wrapper.style.transform = "scale(-1)";
        }
      }
      if (!wrapper.hasAttribute("data-noload")) {
        if (hasEffect && typeof xEncodeURIComponent == "function") {
          const encodedSrc = xEncodeURIComponent(smileyImg.src);
          wrapper.style.width = "30px";
          wrapper.style.height = "30px";
          if (needsMirroredOrInverted) {
            wrapper.style.position = "relative";
            const innerDiv = document.createElement("div");
            innerDiv.className = "avInner";
            innerDiv.style.cssText =
              'width:120%;height:120%;background-image:url("' +
              encodedSrc +
              '");background-repeat:no-repeat;background-size:contain;background-position:center;position:absolute;top:50%;left:50%;pointer-events:none;transform-origin:center;';
            if (options.isMirrored && options.isInverted) {
              innerDiv.setAttribute("data-both", "");
              innerDiv.style.transform = "translate(-50%, -50%) scale(-1, -1)";
            } else if (options.isMirrored) {
              innerDiv.setAttribute("data-mirror", "");
              innerDiv.style.transform = "translate(-50%, -50%) scaleX(-1)";
            } else if (options.isInverted) {
              innerDiv.setAttribute("data-invert", "");
              innerDiv.style.transform = "translate(-50%, -50%) scaleY(-1)";
            }
            wrapper.appendChild(innerDiv);
          } else {
            wrapper.style.backgroundImage = 'url("' + encodedSrc + '")';
            wrapper.style.backgroundRepeat = "no-repeat";
            wrapper.style.backgroundSize = "contain";
          }
        } else {
          wrapper.appendChild(smileyImg);
        }
      }
      this.AlignSmiley(smileyImg, offset);
      if (this.Animation && options.applyEffects) {
        this.ApplyEffects(smileyImg);
      }
      smileyImg.style["user-drag"] =
        smileyImg.style["user-select"] =
        smileyImg.style["-moz-user-select"] =
        smileyImg.style["-webkit-user-drag"] =
        smileyImg.style["-webkit-user-select"] =
        smileyImg.style["-ms-user-select"] =
        smileyImg.style["pointer-events"] =
          "none";
      if (typeof initAvatarEffect == "function") {
        initAvatarEffect(img, wrapper);
      }
      options.onloadCallback?.();
    }
  }
  AlignSmiley(smileyImg, offset) {
    const wrapper = smileyImg.wrapper;
    const opts = smileyImg.options;
    if (opts.align) {
      smileyImg.style.cssText = "\n                margin-top: " + -offset + "px;\n                margin-left: " + -offset + "px;\n            ";
    } else if (opts.align2 && offset) {
      smileyImg.style.cssText = "\n                position: relative;\n                left: " + -offset + "px;\n                bottom: " + (-offset - 4) + "px;\n            ";
    } else if (opts.align3) {
      wrapper.style.position = "relative";
      wrapper.style.display = "inline-flex";
      wrapper.style.width = wrapper.style.height = opts.size + "px";
      smileyImg.style.cssText = "\n                position: absolute;\n                left: " + -offset + "px;\n                top: " + -offset + "px;\n            ";
    }
    if (offset && opts.adjustWidth) {
      wrapper.style.margin = "0 " + offset / 2 + "px";
    }
  }
  ApplyEffects(smileyEl) {
    const code = smileyEl.code.toLowerCase();
    const codeParts = code.split("*");
    const opts = smileyEl.options;
    const wrapper = smileyEl.wrapper;
    const firstChild = wrapper.firstChild;
    if (!firstChild) {
      return;
    }
    if (codeParts.length == 1 && Object.values(_Activity?.instance?.PSSA ?? []).includes(code)) {
      const glowColor = this.GetSmileyGlowColor(code);
      const glowFrame1 = {
        filter: "drop-shadow(0 0 0.5px " + glowColor + ") drop-shadow(0 0 0.5px " + glowColor + ") drop-shadow(0 0 1px " + glowColor + ")",
        offset: 0.1
      };
      const glowFrame2 = {
        filter: "drop-shadow(0 0 0.5px " + glowColor + ") drop-shadow(0 0 0.5px " + glowColor + ") drop-shadow(0 0 1px " + glowColor + ")",
        offset: 0.2
      };
      firstChild.animate([{
        filter: "none",
        offset: 0
      }, glowFrame1, glowFrame2, {
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
    let activeAnim;
    let scaleFactor = 1;
    if (this.SmiliesGoBig.includes(codeParts[0])) {
      scaleFactor = opts.size / opts.gsSize;
      firstChild.style.transform = "scale(" + scaleFactor + ")";
    }
    if (codeParts.indexOf("angel") != -1 || codeParts.indexOf("balloon") != -1) {
      wrapper.addEventListener(_Activity.instance.IsClassic ? "mouseenter" : "mousedown", () => {
        if (activeAnim?.playState == "running") {
          return;
        }
        const wrapperRect = wrapper.getBoundingClientRect();
        const clone = wrapper.cloneNode("true");
        const startTransform = {
          transform: "translate(0, 0) scale(" + scaleFactor + ")"
        };
        wrapper.style.visibility = "hidden";
        clone.style.position = "absolute";
        clone.style.top = Math.round(wrapperRect.top) + "px";
        clone.style.left = Math.round(wrapperRect.left) + "px";
        this.UltraSmiliesContainer.appendChild(clone);
        activeAnim = clone.animate([startTransform, {
          transform: "translate(" + Math.random() * 5 + "vw, -15vh) scale(" + scaleFactor + ")"
        }, {
          transform: "translate(" + Math.random() * -5 + "vw, -30vh) scale(" + scaleFactor + ")"
        }, {
          transform: "translate(" + Math.random() * 5 + "vw, -45vh) scale(" + scaleFactor + ")"
        }, {
          transform: "translate(" + Math.random() * -5 + "vw, -60vh) scale(" + scaleFactor + ")"
        }, {
          transform: "translate(" + Math.random() * 5 + "vw, -75vh) scale(" + scaleFactor + ")"
        }, {
          transform: "translate(" + Math.random() * -5 + "vw, -90vh) scale(" + scaleFactor + ")"
        }, {
          transform: "translate(" + Math.random() * 5 + "vw, -100vh) scale(" + scaleFactor + ")"
        }], {
          duration: 6000
        });
        activeAnim.addEventListener("finish", () => {
          clone.remove();
          wrapper.style.visibility = "visible";
        });
      });
    } else if (codeParts[0] == "bugs" || codeParts[0] == "lb") {
      wrapper.addEventListener(_Activity.instance.IsClassic ? "mouseenter" : "mousedown", () => {
        if (activeAnim?.playState == "running") {
          return;
        }
        const wrapperRect = wrapper.getBoundingClientRect();
        const clone = wrapper.cloneNode("true");
        const cloneChild = clone.firstChild;
        const topPos = Math.round(wrapperRect.top) + "px";
        const leftPos = Math.round(wrapperRect.left) + "px";
        const initialScale = {
          transform: "scale(" + scaleFactor + ")"
        };
        clone.style.position = "absolute";
        wrapper.style.visibility = "hidden";
        this.UltraSmiliesContainer.appendChild(clone);
        cloneChild.animate([initialScale, {
          transform: "scale(1)"
        }], {
          duration: 1500,
          fill: "forwards",
          easing: "ease-out"
        });
        activeAnim = clone.animate([{
          transform: "rotate(0deg)",
          left: leftPos,
          top: topPos,
          offset: 0
        }, {
          transform: "rotate(0deg)",
          left: "calc(" + leftPos + " + 30%",
          top: topPos,
          easing: "ease-out",
          offset: 0.15
        }, {
          transform: "rotate(-90deg)",
          left: "calc(" + leftPos + " + 30%",
          top: topPos,
          easing: "ease-out",
          offset: 0.225
        }, {
          transform: "rotate(-125deg)",
          left: "calc(" + leftPos + " + 30%",
          top: topPos,
          easing: "ease-in-out",
          offset: 0.325
        }, {
          transform: "rotate(-125deg)",
          left: "calc(" + leftPos + " + 30%",
          top: topPos,
          offset: 0.355
        }, {
          transform: "rotate(-65deg)",
          left: "calc(" + leftPos + " + 30%",
          top: topPos,
          easing: "ease-in-out",
          offset: 0.485
        }, {
          transform: "rotate(-65deg)",
          left: "calc(" + leftPos + " + 30%",
          top: topPos,
          offset: 0.525
        }, {
          transform: "rotate(-180deg)",
          left: "calc(" + leftPos + " + 30%",
          top: topPos,
          offset: 0.565
        }, {
          transform: "rotate(-200deg)",
          left: "calc(" + leftPos + " + 10%",
          top: "calc(" + topPos + " + 20%)",
          easing: "ease-out",
          offset: 0.65
        }, {
          transform: "rotate(-180deg)",
          left: "calc(" + leftPos + " + 10%",
          top: "calc(" + topPos + " + 20%)",
          offset: 0.695
        }, {
          transform: "rotate(-180deg)",
          left: "calc(" + leftPos + " + 10%",
          top: "calc(" + topPos + " + 20%)",
          offset: 0.735
        }, {
          transform: "rotate(-270deg)",
          left: "calc(" + leftPos + " + 10%",
          top: "calc(" + topPos + " + 30%)",
          offset: 0.775
        }, {
          transform: "rotate(-300deg)",
          left: "calc(" + leftPos + " + 30%",
          top: "calc(" + topPos + " + 100%)",
          offset: 1
        }], {
          duration: 6000
        });
        activeAnim.addEventListener("finish", () => {
          clone.remove();
          wrapper.style.visibility = "visible";
        });
      });
    } else if (codeParts[0] == "parachute") {
      wrapper.addEventListener(_Activity.instance.IsClassic ? "mouseenter" : "mousedown", () => {
        if (activeAnim?.playState == "running") {
          return;
        }
        const wrapperRect = wrapper.getBoundingClientRect();
        const clone = wrapper.cloneNode("true");
        wrapper.style.visibility = "hidden";
        clone.style.position = "absolute";
        clone.style.top = Math.round(wrapperRect.top) + "px";
        clone.style.left = Math.round(wrapperRect.left) + "px";
        this.UltraSmiliesContainer.appendChild(clone);
        activeAnim = clone.animate([{
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
        activeAnim.addEventListener("finish", () => {
          clone.remove();
          wrapper.style.visibility = "visible";
        });
      });
    } else if (codeParts[0] == "shark") {
      wrapper.addEventListener(_Activity.instance.IsClassic ? "mouseenter" : "mousedown", () => {
        if (activeAnim?.playState == "running") {
          return;
        }
        const wrapperRect = wrapper.getBoundingClientRect();
        const clone = wrapper.cloneNode("true");
        wrapper.style.visibility = "hidden";
        clone.style.position = "absolute";
        clone.style.top = Math.round(wrapperRect.top) + "px";
        clone.style.left = Math.round(wrapperRect.left) + "px";
        this.UltraSmiliesContainer.appendChild(clone);
        activeAnim = clone.animate([{
          transform: "translate(0, 0)"
        }, {
          transform: "translateX(100vw)"
        }], {
          duration: 4000
        });
        activeAnim.addEventListener("finish", () => {
          clone.remove();
          wrapper.style.visibility = "visible";
        });
      });
    } else if (codeParts.indexOf("bomb") != -1) {
      if (this.BombAnimatedSvg) {
        this.DoBombAnimation(wrapper);
      } else {
        fetch("www/ultras/bomb.svg").then(resp => resp.text()).then(text => {
          this.BombAnimatedSvg = text;
          this.DoBombAnimation(wrapper);
        });
      }
    } else if (codeParts[0] == "ss" || codeParts[0] == "usss") {
      wrapper.addEventListener(_Activity.instance.IsClassic ? "mouseenter" : "mousedown", () => {
        if (activeAnim?.playState == "running") {
          return;
        }
        const wrapperRect = wrapper.getBoundingClientRect();
        const clone = wrapper.cloneNode("true");
        const cloneChild = clone.firstChild;
        const topPos = Math.round(wrapperRect.top) + "px";
        const leftPos = Math.round(wrapperRect.left) + "px";
        const initialScale = {
          transform: "scale(" + scaleFactor + ")",
          offset: 0
        };
        clone.style.position = "absolute";
        wrapper.style.visibility = "hidden";
        this.UltraSmiliesContainer.appendChild(clone);
        cloneChild.animate([initialScale, {
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
        activeAnim = clone.animate([{
          transform: "rotate(0deg)",
          left: leftPos,
          top: topPos,
          offset: 0
        }, {
          transform: "rotate(0deg)",
          left: "calc(" + leftPos + " + 100%",
          top: "calc(" + topPos + " - 100%)",
          easing: "ease-out",
          offset: 0.2
        }, {
          transform: "rotate(0deg)",
          left: "calc(" + leftPos + " + 100%",
          top: "calc(" + topPos + " - 100%)",
          easing: "ease-out",
          offset: 0.4
        }, {
          transform: "rotate(-120deg)",
          left: "calc(" + leftPos + " + 100%",
          top: "calc(" + topPos + " + 100%)",
          easing: "ease-out",
          offset: 0.45
        }, {
          transform: "rotate(-120deg)",
          left: "calc(" + leftPos + " - 100%",
          top: "calc(" + topPos + " - 50%)",
          easing: "ease-out",
          offset: 0.8
        }, {
          transform: "rotate(70deg)",
          left: "calc(" + leftPos + " - 100%",
          top: "calc(" + topPos + " - 50%)",
          easing: "ease-out",
          offset: 0.81
        }, {
          transform: "rotate(70deg)",
          left: "calc(" + leftPos + " + 120%",
          top: "calc(" + topPos + " + 120%)",
          easing: "ease-out",
          offset: 1
        }], {
          duration: 4000
        });
        activeAnim.addEventListener("finish", () => {
          clone.remove();
          wrapper.style.visibility = "visible";
        });
      });
    } else if (codeParts.indexOf("focushion") != -1) {
      wrapper.addEventListener(_Activity.instance.IsClassic ? "mouseenter" : "mousedown", () => {
        if (activeAnim?.playState != "running") {
          this.PlayUltraSound("fart");
          activeAnim = firstChild.animate([{
            transform: "scale(1) rotate(0deg)"
          }, {
            transform: "scale(0) rotate(-3turn) translateY(-6rem)"
          }], {
            duration: 2500,
            easing: "ease-out"
          });
        }
      });
    } else if (codeParts.indexOf("dibread") != -1) {
      wrapper.addEventListener(_Activity.instance.IsClassic ? "mouseenter" : "mousedown", () => {
        if (activeAnim?.playState == "running") {
          return;
        }
        this.PlayUltraSound("ghostLaugh");
        const wrapperRect = wrapper.getBoundingClientRect();
        const scaleVal = wrapperRect.width / 15;
        const leftVal = (wrapperRect.width - 20) / 2;
        const topVal = (wrapperRect.height - 20) / 2;
        const ghostImg = new Image();
        ghostImg.src = "ultras/ghost.svg";
        ghostImg.style.cssText = "position: absolute; bottom: 0; top: " + topVal + "px; left: " + leftVal + "px;";
        wrapper.appendChild(ghostImg);
        activeAnim = ghostImg.animate([{
          transform: "scale(0) rotate(0deg)",
          filter: "blur(3px)",
          opacity: 0
        }, {
          transform: "scale(" + scaleVal + ") rotate(0deg)",
          filter: "blur(0px)",
          opacity: 1,
          offset: 0.4
        }, {
          transform: "scale(" + scaleVal + ") rotate(5deg)",
          offset: 0.5
        }, {
          transform: "scale(" + scaleVal + ") rotate(0deg)",
          offset: 0.6
        }, {
          transform: "scale(" + scaleVal + ") rotate(-5deg)",
          offset: 0.7
        }, {
          transform: "scale(" + scaleVal + ") rotate(0deg)",
          offset: 0.8
        }, {
          transform: "scale(" + scaleVal + ") rotate(5deg)",
          filter: "blur(0px)",
          opacity: 1,
          offset: 0.9
        }, {
          transform: "scale(" + scaleVal + ") rotate(50deg) translateY(-20px)",
          filter: "blur(6px)",
          opacity: 0,
          offset: 1
        }], {
          duration: 2000,
          easing: "ease-out"
        });
        activeAnim.addEventListener("finish", () => {
          ghostImg.remove();
        });
      });
    } else if (codeParts[0] == "mario8") {
      const jumpHeight = wrapper.getBoundingClientRect().height / 1.5;
      wrapper.addEventListener(_Activity.instance.IsClassic ? "mouseenter" : "mousedown", () => {
        if (activeAnim?.playState != "running") {
          activeAnim = firstChild.animate([{
            transform: "translateY(0)"
          }, {
            transform: "translateY(-" + jumpHeight + "px)",
            easing: "ease-out"
          }, {
            transform: "translateY(0)",
            easing: "ease-out"
          }], {
            duration: 750
          });
        }
      });
    } else if (codeParts.indexOf("lights") != -1) {
      wrapper.addEventListener(_Activity.instance.IsClassic ? "mouseenter" : "mousedown", () => {
        if (activeAnim?.playState != "running") {
          activeAnim = _Activity.Window.document.body.animate([{
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
    } else if (codeParts[0] == "yellow") {
      wrapper.addEventListener(_Activity.instance.IsClassic ? "mouseenter" : "mousedown", () => {
        if (activeAnim?.playState != "running") {
          activeAnim = firstChild.animate([{
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
  PlayUltraSound(soundName) {
    if (_Activity?.instance?.Volume[0] != 0 && (_Activity?.instance?.Sound & 1) != 0) {
      new _Activity.instance.Window.Howl({
        src: ["www/ultras/" + soundName + ".mp3"],
        volume: _Activity.instance.Volume[0] / 100
      }).play();
    }
  }
  DoBombAnimation(wrapper) {
    let svg;
    const span = this.MakeElement(this.UltraSmiliesContainer, "span");
    wrapper.addEventListener(_Activity.instance.IsClassic ? "mouseenter" : "mousedown", () => {
      if (svg) {
        return;
      }
      this.PlayUltraSound("explosion");
      wrapper.style.visibility = "hidden";
      const rect = wrapper.getBoundingClientRect();
      const offset = (180 - rect.width) / 2;
      const top = rect.top - offset;
      const left = rect.left - offset;
      span.innerHTML = this.BombAnimatedSvg;
      svg = span.querySelector("svg");
      svg.style.cssText = "position: absolute; top: " + top + "px; left: " + left + "px";
      svg.querySelector("#lastFrame").addEventListener("endEvent", () => {
        wrapper.style.visibility = "visible";
        svg.remove();
        span.remove();
        svg = null;
      }, !1);
      this.UltraSmiliesContainer.appendChild(span);
    });
  }
  GetSmileyGlowColor(code) {
    const glowColors = Object.keys(this.SmiliesGlow);
    if (_Activity.instance.SUPERPOWERS[_Activity.instance.PSSA.indexOf(code) - 1]) {
      return "#D5C86F";
    }
    for (let i = 0; i < glowColors.length; i++) {
      const color = glowColors[i];
      if (this.SmiliesGlow[color] && this.SmiliesGlow[color].includes(code)) {
        return color;
      }
    }
    return "#0000FF";
  }
  SmileyError(img) {
    img.retries = (img.retries || 0) + 1;
    if (img.retries < this.Retries) {
      setTimeout(() => img.src = img.url, this.RetryDelay * img.retries);
    } else {
      delete this.Smilies[img.hash];
    }
  }
  IntersectionObserverCallback(entries, observer) {
    const len = entries.length;
    for (let i = 0; i < len; i++) {
      const entry = entries[i];
      const target = entry.target;
      if (entry.isIntersecting) {
        target.classList.remove("invisible");
      } else {
        target.classList.add("invisible");
      }
    }
  }
  IconToLib(code, size) {
    let libName;
    let type = 0;
    let flags = 0;
    switch (code = code.substr(1, code.length - 2)) {
      case "del":
        libName = "xdelete";
        type = 1;
        break;
      case "o":
        libName = "chatter2";
        type = 2;
        break;
      case "priv":
        libName = "lock";
        size = 12;
        break;
      case "i":
        libName = "HelpIcon";
        type = 1;
        break;
      case "inf8":
        flags = 39168;
      case "in":
        libName = "HelpIcon";
        type = 2;
        if (size == 20) {
          size = 18;
        }
        break;
      case "ho":
        libName = "ho";
        type = 1;
        break;
      default:
        return "";
    }
    return "g_" + libName + "_" + size + "_" + size + "_" + flags + "_" + type;
  }
  MakeElement(parent, tag, className) {
    const el = document.createElement(tag);
    if (className) {
      el.className = className;
    }
    if (parent) {
      parent.appendChild(el);
    }
    return el;
  }
  DumpMemory(limit = 300000) {
    this.DumpWrappers();
    this.DumpUnused();
    if (this.SmiliesMemory >= limit) {
      Object.values(this.Smilies).forEach(smiley => {
        if (!smiley.wrappers.length) {
          delete this.Smilies[smiley.hash];
          this.SmiliesMemory -= smiley.width * smiley.height;
        }
      });
    }
  }
  DumpUnused() {
    Object.values(this.Smilies).forEach(smiley => {
      if (!smiley.wrappers.length) {
        const lastUsed = smiley.lastUsed;
        if (Math.floor((Date.now() - lastUsed) / 60000) >= 1) {
          delete this.Smilies[smiley.hash];
          this.SmiliesMemory -= smiley.width * smiley.height;
        }
      }
    });
  }
  DumpWrappers() {
    Object.values(this.Smilies).forEach(smiley => {
      for (let i = 0; i < smiley.wrappers.length; i++) {
        const wrapper = smiley.wrappers[i];
        const scrollParent = smiley.optionsArr[i].scrollParent ?? document.body;
        const createdAt = wrapper.createdAt;
        if (Math.floor((Date.now() - createdAt) / 60000) > 1 && !scrollParent.contains(wrapper)) {
          smiley.optionsArr.splice(i, 1);
          smiley.wrappers.splice(i, 1);
          this.SmiliesMemory -= smiley.width * smiley.height;
        }
      }
    });
  }
  EncodeGetStrip(str) {
    if ((str = str.replace(/#/g, "*")).search(/[^0-9a-zA-Z_\*\(\)]/) >= 0) {
      let parts = str.split("*");
      for (let i in parts) {
        if (!(parts[i].search(/[^0-9a-zA-Z_\*\(\)]/) < 0)) {
          if (parts[i].search(/\)/) >= 0) {
            let subParts = parts[i].split(")");
            parts[i] = "!" + this.Base64EncodeUrl(subParts[0]) + ")" + subParts[1];
          } else {
            parts[i] = "!" + this.Base64EncodeUrl(parts[i]);
          }
        }
      }
      str = parts.join("*");
    }
    return str;
  }
  Base64EncodeUrl(str) {
    let encoded = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode("0x" + p1);
    });
    encoded = btoa(encoded);
    return encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/\=+$/, "");
  }
  GenerateAvatarEffectHash(opts) {
    if (opts === undefined || opts.avatareffect === undefined && opts.avatarframe === undefined) {
      return "";
    } else {
      return "_" + opts.avatarcolor + "_" + opts.avatareffect + "_" + opts.avatarframe + "_" + opts.avatarspeed;
    }
  }
}
var _Activity;
if (_Activity === undefined) {
  _Activity = parent?._Activity !== undefined ? parent._Activity : parent?.parent?._Activity !== undefined ? parent.parent._Activity : parent?.parent?.parent?._Activity !== undefined ? parent.parent.parent._Activity : parent?.box?._Activity !== undefined ? parent.box._Activity : {};
}