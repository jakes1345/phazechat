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
  Debounce(func) {
    let timeout;
    return function (...args) {
      if (timeout) {
        cancelAnimationFrame(timeout);
      }
      timeout = requestAnimationFrame(() => {
        func(...args);
      });
    };
  }
  ReloadAll(animate) {
    this.Animation = animate;
    const avatarNames = Object.getOwnPropertyNames(this.Avatars);
    for (let i = 0; i < avatarNames.length; i++) {
      delete this.Avatars[avatarNames[i]];
    }
  }
  MakeAvatar(container, avatarCode, options) {
    const {
      userId,
      userName,
      size = 30,
      scrollParent,
      callback,
      callbackTarget,
      tooltip,
      tooltipPosition = "low",
      hasAnimate,
      isXatme,
      fallback,
      useDirectLink,
      avatarEffect
    } = options;
    if (!avatarCode) {
      return;
    }
    let decodedEffect = {};
    try {
      if (avatarEffect) {
        let decodedStr = decodeURIComponent(escape(atob(avatarEffect.replace(/\s+/g, ""))));
        decodedEffect = JSON.parse(decodedStr);
      }
    } catch (err) {
      console.error("Failed to decode avatarEffect:", err);
    }
    options.decodedAvatarEffect = decodedEffect;
    let isGif = options.isGif;
    let className = options.className ?? "messageAvatar";
    const isSvg = avatarCode[0] == "<";
    const isSmiley = avatarCode[0] == "(";
    const isToon = parseInt(avatarCode.split("#")[0]) > 0;
    if (isToon) {
      className += " avToon";
    }
    options.retries = options.retries ?? 0;
    if (!isXatme) {
      if (isSmiley || isSvg) {
        return _Activity.instance.Smilies.MakeSmiley(container, avatarCode, {
          size,
          addGback: !0,
          userID: userId,
          userName,
          tooltipPosition,
          scrollParent,
          className,
          tooltip,
          callback: () => this.ClickEvent(userName, userId),
          callbackTarget,
          avatarEffect: decodedEffect
        });
      }
      if (scrollParent && !this.Containers.has(scrollParent)) {
        this.Containers.add(scrollParent);
        scrollParent.intersectionObserver = new IntersectionObserver(this.IntersectionObserverCallback, {
          root: scrollParent,
          threshold: 0,
          rootMargin: "60px"
        });
      }
    }
    let isValidUrl = !0;
    let imageUrl = avatarCode.split("#")[0];
    let parsedUrl = null;
    if (!isToon && !isXatme) {
      try {
        parsedUrl = new URL(imageUrl);
      } catch {
        if (fallback) {
          imageUrl = fallback;
        } else {
          isValidUrl = false;
        }
      }
    }
    isGif = imageUrl.split(".").pop().toLowerCase() == "gif";
    if (!isXatme && (!!isToon || parsedUrl?.origin != "https://xat.com")) {
      imageUrl = isToon ? "https://xat.com/web_gear/chat/av/" + parseInt(imageUrl) + ".png" : hasAnimate && this.Animation && !isGif || useDirectLink ? "https://i0.xat.com/web_gear/chat/GetImage9.php?s&W=80&H=80&U=" + imageUrl : hasAnimate && this.Animation && isGif ? "https://i0.xat.com/web_gear/chat/GetImage7.php?W=80&H=80&U=" + imageUrl + "&g" : "https://i0.xat.com/web_gear/chat/GetImage7.php?s&W=80&H=80&U=" + imageUrl + "&we";
    }
    const cacheKey = imageUrl;
    const wrapper = useDirectLink ? container : this.MakeElement(container, "span", className);
    const tooltipOpts = {
      position: tooltipPosition
    };
    if (scrollParent) {
      scrollParent.intersectionObserver.observe(wrapper);
    } else {
      this.IntersectionObserver.observe(wrapper);
    }
    (callbackTarget ?? wrapper).addEventListener("click", event => {
      if (callback) {
        event.url = imageUrl;
        callback(event);
      } else {
        this.ClickEvent(userName, userId);
      }
    });
    wrapper.style.width = size + "px";
    wrapper.style.height = size + "px";
    wrapper.style.display = "inline-block";
    if (isValidUrl) {
      if (cacheKey in this.Avatars) {
        this.Avatars[cacheKey].wrappers.push(wrapper);
        this.Avatars[cacheKey].optionsArr.push(options);
        this.Avatars[cacheKey].avatarEffect = decodedEffect;
        if (this.Avatars[cacheKey].loaded) {
          this.AvatarLoaded(this.Avatars[cacheKey], true);
        }
      } else {
        this.Avatars[cacheKey] = new Image();
        this.Avatars[cacheKey].url = imageUrl;
        this.Avatars[cacheKey].wrappers = [wrapper];
        this.Avatars[cacheKey].hash = cacheKey;
        this.Avatars[cacheKey].size = size;
        this.Avatars[cacheKey].loaded = false;
        this.Avatars[cacheKey].holder = container;
        this.Avatars[cacheKey].optionsArr = [options];
        this.Avatars[cacheKey].avatarEffect = decodedEffect;
        this.Avatars[cacheKey].fallback = fallback;
        this.Avatars[cacheKey].onload = ev => this.AvatarLoaded.call(this, ev.target);
        this.Avatars[cacheKey].onerror = ev => this.AvatarError.call(this, ev.target);
        this.Avatars[cacheKey].src = imageUrl;
      }
      if (tooltip) {
        addToolTip(callbackTarget ?? wrapper, tooltip, tooltipOpts);
      }
      return wrapper;
    } else {
      return undefined;
    }
  }
  AvatarLoaded(avatarImg, isAppend) {
    const wrappers = isAppend ? avatarImg.wrappers.slice(-1) : avatarImg.wrappers;
    const optionsArr = isAppend ? avatarImg.optionsArr.slice(-1) : avatarImg.optionsArr;
    if (avatarImg.width && avatarImg.height) {
      avatarImg.loaded = !0;
      this.AvatarsMemory += avatarImg.width * avatarImg.height;
      for (let i = 0; i < wrappers.length; i++) {
        const wrapper = wrappers[i];
        const opts = optionsArr[i];
        const isXatme = opts.isXatme;
        if (!wrapper.loaded) {
          wrapper.loaded = !0;
          if (isXatme) {
            const clonedImg = avatarImg.cloneNode(!0);
            clonedImg.id = "avaShow";
            wrapper.style.display = "inline";
            clonedImg.className = opts.className;
            avatarImg.width = avatarImg.height = 240;
            wrapper.appendChild(clonedImg);
          } else {
            wrapper.style.width = opts.size + "px";
            wrapper.style.height = opts.size + "px";
            const bgOffset = opts.hasAnimate || !opts.hasShuffle ? 0 : -Math.floor(this.Random(opts.uniqueId) * Math.floor(avatarImg.width / avatarImg.height)) * opts.size;
            wrapper.style.cssText = avatarImg.cssBackup = "\n                        display: inline-block;\n                        width: " + opts.size + "px;\n                        height: " + opts.size + "px;\n                        background: url(\"" + avatarImg.src + "\");\n                        background-size: contain;\n                        background-position: " + bgOffset + "px !important;\n                        background-repeat: no-repeat no-repeat;\n                    ";
          }
          if (typeof initAvatarEffect == "function") {
            initAvatarEffect(avatarImg, wrapper, opts.decodedAvatarEffect);
          }
        }
      }
    } else {
      this.AvatarError(avatarImg);
    }
  }
  Random(seed = "") {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash += seed.charCodeAt(i);
    }
    const result = Math.sin(hash) * 10000;
    return result - Math.floor(result);
  }
  AvatarError(avatarImg) {
    avatarImg.retries = (avatarImg.retries || 0) + 1;
    if (avatarImg.retries < this.Retries) {
      setTimeout(() => avatarImg.src = avatarImg.url, this.RetryDelay * avatarImg.retries);
    } else if (avatarImg.fallback) {
      avatarImg.src = avatarImg.fallback;
    } else {
      delete this.Avatars[avatarImg.hash];
    }
  }
  IntersectionObserverCallback(entries, observer) {
    const count = entries.length;
    for (let i = 0; i < count; i++) {
      const entry = entries[i];
      const target = entry.target;
      if (entry.isIntersecting) {
        target.classList.remove("invisible");
      } else {
        target.classList.add("invisible");
      }
    }
  }
  ClickEvent(userName, userId) {
    if (userName) {
      HitWeb("https://xat.me/" + userName);
    } else if (typeof messages != "undefined") {
      messages.sendApp(0, userId);
    }
  }
  MakeElement(parentEl, tagName, className, id) {
    const el = document.createElement(tagName);
    if (className) {
      el.className = className;
    }
    if (parentEl) {
      parentEl.appendChild(el);
    }
    if (id) {
      el.id = id;
    }
    return el;
  }
  DumpMemory(maxMemory = 10000000) {
    if (!(this.AvatarsMemory <= maxMemory)) {
      this.AvatarsMemory = 0;
      Object.values(this.Avatars).forEach((avatarImg, index) => {
        for (let i = 0; i < avatarImg.wrappers.length; i++) {
          const wrapper = avatarImg.wrappers[i];
          const scrollParent = avatarImg.optionsArr[i].scrollParent ?? document.body;
          if (maxMemory == 0) {
            wrapper.parentNode?.removeChild(wrapper);
          } else if (wrapper.innerHTML && scrollParent.contains(wrapper)) {
            this.AvatarsMemory += avatarImg.width * avatarImg.height;
          } else {
            delete this.Avatars[index];
          }
        }
      });
      if (!maxMemory) {
        this.Avatars = {};
      }
    }
  }
}
var _Activity;
if (_Activity === undefined) {
  _Activity = parent._Activity !== undefined ? parent._Activity : parent.parent._Activity !== undefined ? parent.parent._Activity : parent.parent.parent._Activity !== undefined ? parent.parent.parent._Activity : parent.box !== undefined && parent.box._Activity !== undefined ? parent.box._Activity : {};
}