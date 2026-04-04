const kNumRows = 2;
const kGifTileFudge = 2;
const kGifTileSize = 100;
class Quickbar {
  constructor() {
    this.currentPage = "main";
    this.originalWidthQb = "171px";
    this.cachedGroupsPowers = [];
    this.cachedGifsData = [];
    this.done = !1;
    this.doneGif = !1;
    this.sidebarOpened = !1;
    this.onlineInterval = null;
    this.onlineIntervalTimer = 10000;
    this.powerNameForAssign = null;
    this.gifOffset = 0;
    this.gifLimit = 14;
    this.gifValue = null;
    this.giphyDomain = "https://xat.com/web_gear/chat/Giphy.php";
    this.giphyTypingTimer = null;
    this.giphyTypingInterval = 500;
    this.giphyType = null;
    this.gifUtility = new GifUtility();
    this.sideBardiv = findNodeInWindowOrParent("#sideBardiv");
    this.sideBarItems = findNodeInWindowOrParent(".sideBarItems");
    this.dataMenu = findNodeInWindowOrParent("[data-menu]");
    this.dataFavoris = findNodeInWindowOrParent(".sidebar [data-favorite]");
    this.dataIgnored = findNodeInWindowOrParent(".sidebar [data-ignored]");
    this.dataBlocked = findNodeInWindowOrParent(".sidebar [data-blocked]");
    this.sideBarIcon = _Activity.instance.IsClassic ? findNodeInWindowOrParent("#sideBar") : findNodeInWindowOrParent("#sideBarMob");
    this.sideBarIconImg = findNodeInWindowOrParent("#sideBarMobId");
    this.sidebarGoBack = findNodeInWindowOrParent("#sideBarGoBack");
    this.sideBarClass = findNodeInWindowOrParent(".sidebar");
    this.sideBarFavTitle = findNodeInWindowOrParent("#sideBarFavTitle");
    this.sideBarIgnTitle = findNodeInWindowOrParent("#sideBarIgnTitle");
    this.sideBarblkTitle = findNodeInWindowOrParent("#sideBarblkTitle");
    this.sideBarSwitchOnlineCounter = findNodeInWindowOrParent("#sideBarSwitchOnlineCounter");
    this.quickhr = findNodeInWindowOrParent(".quickhr");
    this.favoriteList = findNodeInWindowOrParent("[data-favorite-list]");
    this.favoriteName = findNodeInWindowOrParent("[data-favorite-name]");
    this.favNoGifs = findNodeInWindowOrParent("[no-fav-gifs]");
    this.ignoredList = findNodeInWindowOrParent("[data-ignored-list]");
    this.blockedList = findNodeInWindowOrParent("[data-blocked-list]");
    this.favoriteT = findNodeInWindowOrParent("[data-sidebar-switch-settings=\"favorite_t\"]");
    this.usersOnline = findNodeInWindowOrParent("[data-online]");
    this.dataGifs = findNodeInWindowOrParent(".sidebar [data-gifs]");
    this.sideBarGifsTitle = findNodeInWindowOrParent("#sideBarGifsTitle");
    this.gifList = findNodeInWindowOrParent("[data-gifs-list]");
    this.gifFavoritesList = findNodeInWindowOrParent("[data-gifs-favorite-list]");
    this.poweredby = findNodeInWindowOrParent("#poweredby");
    this.gifsType = findNodeInWindowOrParent("#gifsType");
    this.noResults = findNodeInWindowOrParent("#noResults");
    this.giphySearchBar = findNodeInWindowOrParent("#doSearch");
    this.gifSearchLabel = findNodeInWindowOrParent(".gifSearchLabel");
    this.sidebarGifsSearch = findNodeInWindowOrParent("#sidebarGifsSearch");
    this.timeOut = null;
    this.items = {
      favorites: {
        function: "doFavorite",
        name: "Favorites",
        pageName: "favorites",
        translation: "mob2.favs",
        svg: "star",
        goBack: !0,
        hideOnMobile: !0
      },
      gifs: {
        function: "doGifs",
        name: "GIFs",
        pageName: "gifs",
        translation: "mob2.gifs",
        svg: "giphy",
        mustBeRegistered: !0
      },
      stealthmode: {
        function: "doStealthMode",
        name: "Stealth",
        translation: "mob2.stealth",
        svg: "stealth",
        switchIcon: !0,
        function_preset: "hasStealthMode",
        mustHaveCookieEnabled: !0
      },
      hideuserslist: {
        function: "doHideUserslist",
        name: "Visitors",
        translation: "mob2.visitors",
        svg: "visitors",
        switchIcon: !0,
        function_preset: "hasHideUserlist",
        hideOnMobile: !0
      },
      darkmode: {
        function: "doDarkMode",
        name: "Night",
        translation: "mob2.nightmode",
        svg: "dark1",
        switchIcon: !0,
        function_preset: "hasDarkMode",
        mustHaveCookieEnabled: !0
      },
      smilies: {
        function: "getStuffPressed",
        name: "Smilies",
        translation: "mob2.smilies",
        svg: "8bsmilies"
      },
      ignored: {
        function: "doIgnored",
        name: "Ignored",
        pageName: "ignored",
        translation: "mob2.ignored",
        svg: "ignored",
        children: !0,
        goBack: !0
      },
      blocked: {
        function: "doBlocked",
        name: "Blocked",
        pageName: "blocked",
        translation: "mob2.blocked",
        svg: "report2",
        children: !0,
        goBack: !0
      },
      translator: {
        function: "doClassicDialog",
        name: "Translator",
        translation: "mob2.translator",
        svg: "translator",
        args: "translator"
      },
      groupspowers: {
        function: "doGroupsPowers",
        name: "Group powers",
        translation: "mob2.grouppowers",
        svg: "Powers",
        args: "false"
      },
      vote: {
        function: "initVote",
        name: "Vote",
        pageName: "vote",
        translation: "mob2.vote",
        svg: "vote",
        goBack: !0
      },
      settings: {
        function: "doClassicDialog",
        name: "Settings",
        translation: "mob2.settings",
        svg: "actSettings",
        args: "settings"
      },
      events: {
        function: "doHitEvents",
        name: "Events",
        translation: "mob2.events",
        svg: "events",
        children: !0
      },
      more: {
        name: "More",
        pageName: "more",
        translation: "mob2.more",
        svg: "moreqb",
        childrens: ["blocked", "ignored", "events"],
        goBack: !0
      },
      whatsnew: {
        function: "doHitWiki",
        name: "What's new?",
        translation: "mob2.whatsnew",
        svg: "x",
        args: "xat.wiki/news"
      }
    };
    this.voteComponent = new VoteComponent(this);
  }
  init(_0xc29f5e) {
    if (!this.done || !_Activity.instance.IsClassic || !!_0xc29f5e) {
      this.registerItems();
      this.registerEvents();
      if (_Activity.instance.IsClassic) {
        this.setHideUserlist(hasHideUserlist());
      }
      this.done = true;
    }
  }
  registerItems() {
    if (this.dataMenu) {
      this.dataMenu.innerHTML = "";
    }
    for (let _0xa19809 in this.items) {
      let _0x250c36 = makeElement(this.dataMenu, "div", "", "sideBarItem" + _0xa19809);
      _0x250c36.dataset.sidebarSettings = _0xa19809;
      if (this.items[_0xa19809]?.mustBeRegistered && !config?.MyRegName.length) {
        _0x250c36.style.display = "none";
      }
      if (!_Activity.instance.IsClassic && this.items[_0xa19809]?.mustHaveCookieEnabled && localStorage.getItem("mobCookies") != 1) {
        _0x250c36.style.display = "none";
      }
      if (this.items[_0xa19809]?.children) {
        _0x250c36.classList.add("d-none");
      }
      if (this.items[_0xa19809]?.hideOnMobile && !_Activity.instance.IsClassic) {
        _0x250c36.classList.add("notMobile");
      }
      _0x250c36.dataset.isChildren = this.items[_0xa19809]?.children || !1;
      if (this.items[_0xa19809]?.svg) {
        let _0x3e3a67 = makeElement(_0x250c36, "img");
        _0x3e3a67.src = (_Activity.instance.IsClassic ? "" : "www/") + "svg/" + this.items[_0xa19809]?.svg + ".svg";
        _0x3e3a67.alt = _0xa19809;
        _0x3e3a67.width = 13;
        _0x3e3a67.style.margin = "0 3px 2px 0";
      }
      let _0x2f2802 = makeElement(_0x250c36, "span", "", "sideBarSpan" + _0xa19809);
      _0x2f2802.innerText = this.items[_0xa19809]?.name;
      _0x2f2802.dataset.localize = this.items[_0xa19809]?.translation;
      if (this.items[_0xa19809]?.switchIcon) {
        let _0x5f03e0 = makeElement(_0x250c36, "span", null, "sideBarSwitch" + _0xa19809);
        let _0x16808e = makeElement(_0x5f03e0, "label", _Activity.instance.IsClassic ? "switch" : "switch switchMob");
        let _0x30ee55 = makeElement(_0x16808e, "input", null, "sideBarSwitchSet" + _0xa19809);
        _0x30ee55.type = "checkbox";
        _0x30ee55.dataset.sideBarSwitchSettings = _0xa19809;
        makeElement(_0x16808e, "span", "slider", "sideBarSwitchSetSlider" + _0xa19809);
        if (this.items[_0xa19809]?.function_preset && typeof window[this.items[_0xa19809]?.function_preset] == "function") {
          let _0x46e77e = window[this.items[_0xa19809]?.function_preset]();
          if (_0x46e77e && _0x46e77e != "disable") {
            _0x30ee55.classList.add("active");
          } else {
            _0x30ee55.classList.remove("active");
          }
        }
        _0x30ee55.addEventListener("click", _0x4b3c67 => {
          _0x4b3c67.preventDefault();
          if (typeof window[this.items[_0xa19809]?.function] == "function") {
            window[this.items[_0xa19809]?.function](_0x4b3c67, true);
          }
        });
      }
      _0x250c36.addEventListener("click", _0x5c4bd4 => {
        _0x5c4bd4.preventDefault();
        this.currentPage = this.items[_0xa19809]?.pageName ?? "main";
        this.clearOnlineInterval();
        if (typeof this[this.items[_0xa19809]?.function] == "function") {
          let _0x3feee8 = this.items[_0xa19809]?.args || _0x5c4bd4;
          this[this.items[_0xa19809]?.function](_0x3feee8);
        }
        if (this.items[_0xa19809]?.childrens) {
          this.handleChildrensFromItems(this.items[_0xa19809].childrens);
        }
        if (this.items[_0xa19809]?.goBack) {
          this.toggleGoBackButton(true, false);
        }
      });
    }
    TranslateAll();
  }
  handleChildrensFromItems(_0x14b6cc = []) {
    for (let _0x38a975 in _0x14b6cc) {
      let _0x25752f = findNodeInWindowOrParent("[data-sidebar-settings=\"" + _0x14b6cc[_0x38a975] + "\"]");
      if (_0x25752f) {
        _0x25752f?.classList?.remove("d-none");
      }
    }
    this.hideAllNonChildrens(!0);
  }
  hideAllNonChildrens(_0x43320f, _0x465704) {
    let _0x2b7d90 = _Activity.instance.IsClassic ? document.querySelectorAll("[data-is-children=\"" + !_0x43320f + "\"]") : parent.document.querySelectorAll("[data-is-children=\"" + !_0x43320f + "\"]");
    if (_0x2b7d90.length) {
      _0x2b7d90.forEach(_0x2f797e => _0x2f797e.classList.add("d-none"));
    }
    if (_0x465704) {
      let _0x5a4305 = _Activity.instance.IsClassic ? document.querySelectorAll("[data-is-children=\"false\"]") : parent.document.querySelectorAll("[data-is-children=\"false\"]");
      if (_0x5a4305.length) {
        _0x5a4305.forEach(_0x3f4fe6 => _0x3f4fe6.classList.remove("d-none"));
      }
    }
  }
  registerEvents() {
    this.sideBarIcon?.addEventListener("click", _0x29a144 => {
      _0x29a144.stopImmediatePropagation();
      if (!this.sidebarOpened) {
        this.resetMenu();
      }
      this.toggleSideBar(!this.sidebarOpened);
    }, !0);
    this.sidebarGoBack?.addEventListener("click", _0x89e1a5 => {
      _0x89e1a5.stopImmediatePropagation();
      this.hasPreviousPage();
    }, !0);
    document?.addEventListener("click", _0x93f539 => {
      this.shouldCloseQuickBar(_0x93f539);
    }, !0);
    parent?.document?.addEventListener("click", _0x360b08 => {
      this.shouldCloseQuickBar(_0x360b08);
    }, !0);
  }
  shouldCloseQuickBar(_0x74e7cc) {
    if (_0x74e7cc?.target?.className == "tooltip" || document?.activeElement == _Activity.instance.QuickBar?.giphySearchBar) {
      return;
    }
    let _0x50754b = !this?.sideBardiv.contains(_0x74e7cc.target) && _0x74e7cc?.target?.id != "sideBar";
    if (this?.sidebarOpened && _0x50754b) {
      this?.toggleSideBar(false);
    }
  }
  toggleSideBar(_0x2e0ad7) {
    if (!this.sideBarIcon || !this.sideBarClass) {
      return;
    }
    let _0x2d3733 = _Activity.instance.IsClassic ? this.sideBarIcon : this.sideBarIconImg;
    this.resetMenu();
    if (_0x2e0ad7) {
      _0x2d3733.style.transform = "scaleX(1)";
      this.sideBarClass.style.right = _Activity.instance.IsClassic ? "10px" : "0px";
      _Activity.instance.QuickBar.sidebarOpened = this.sidebarOpened = true;
      if (config?.MyRegName?.length) {
        this.getOnline();
      } else {
        this.toggleGoBackButton(false, false);
      }
    } else {
      _0x2d3733.style.transform = "scaleX(-1)";
      this.sideBarClass.style.right = _Activity.instance.IsClassic ? "-174px" : "";
      this.clearOnlineInterval();
      _Activity.instance.QuickBar.sidebarOpened = this.sidebarOpened = false;
    }
    let _0x23a673 = parent?.parent?.document?.location?.href;
    let _0x392526 = config?.background?.split(";=");
    if (["https://xat.com/", "https://xat.com/#featured", "https://xat.com/#popular", "https://xat.com/#supported", "https://xat.com/#games"].indexOf(_0x23a673) >= 0 && !_0x392526[0].length && this.sideBarClass) {
      this.sideBarClass.style.backgroundColor = "#efefef!important";
    }
  }
  toggleGoBackButton(_0x131633, _0x4bd346) {
    if (_0x4bd346 && !config?.MyRegName?.length) {
      _0x4bd346 = false;
    }
    if (_0x131633) {
      this?.sidebarGoBack?.classList?.remove("d-none");
    } else {
      this?.sidebarGoBack?.classList?.add("d-none");
    }
    if (_0x4bd346) {
      this?.sideBarSwitchOnlineCounter?.classList?.remove("d-none");
      this?.quickhr?.classList?.remove("d-none");
    } else {
      this?.sideBarSwitchOnlineCounter?.classList?.add("d-none");
      this?.quickhr?.classList?.add("d-none");
    }
    this.resetGifContainer();
  }
  clearOnlineInterval() {
    clearInterval(this.onlineInterval);
    clearInterval(_Activity.instance.QuickBar.onlineInterval);
    _Activity.instance.QuickBar.onlineInterval = this.onlineInterval = undefined;
  }
  getOnline(_0x2bd3a3) {
    if (this.sidebarOpened && _Activity?.instance?.QuickBar?.sidebarOpened) {
      ToC({
        Command: "getUsersOnline"
      });
      if (!_0x2bd3a3) {
        _Activity.instance.QuickBar.onlineInterval = this.onlineInterval = setInterval(() => {
          this.getOnline(true);
        }, this.onlineIntervalTimer);
      }
    } else {
      this.clearOnlineInterval();
    }
  }
  setTotalOnline(_0x19344f = {}) {
    let _0x4993e3 = "";
    let _0x213572 = 0;
    _0x19344f = Object.fromEntries(Object.entries(_0x19344f).sort((_0x35c966, _0x56b596) => {
      let [, _0xba8e93] = _0x35c966;
      let [, _0x25e22e] = _0x56b596;
      return _0x25e22e - _0xba8e93;
    }).filter(_0x5c3eb2 => {
      let [_0x1c4d3c, _0x2047fe] = _0x5c3eb2;
      return _0x2047fe > 0;
    }));
    if (this.usersOnline) {
      for (let _0x1ef818 in _0x19344f) {
        _0x213572 += parseInt(_0x19344f[_0x1ef818]);
        _0x4993e3 += this.appendPools(_0x1ef818, _0x19344f[_0x1ef818]);
      }
      addToolTip(this.sideBarSwitchOnlineCounter, _0x4993e3, {
        position: "top-tall",
        instant: !0
      });
      return this.usersOnline.innerText = _0x213572;
    }
  }
  appendPools(_0x20555e, _0x362345) {
    if (_0x20555e && _0x362345) {
      return _0x20555e + ": " + _0x362345 + "<br>";
    }
  }
  setToggle(_0x53e74e, _0x24906d) {
    if (_0x53e74e) {
      if (_0x24906d && _0x24906d != "disable") {
        _0x53e74e.classList.add("active");
      } else {
        _0x53e74e.classList.remove("active");
      }
    }
  }
  resetMenu() {
    this?.toggleGoBackButton(!1, !0);
    this.resetIgnoredBlockedSection();
    this.resetTitle();
    this.resetDataMenu();
    this?.dataFavoris?.classList?.add("d-none");
    this?.dataGifs?.classList?.add("d-none");
    this?.sideBarFavTitle?.classList?.add("d-none");
    this?.sideBarGifsTitle?.classList?.add("d-none");
    this?.sidebarGifsSearch?.classList?.add("d-none");
    this?.poweredby?.classList?.add("d-none");
    this.hideAllNonChildrens(!1, !0);
    this.gifOffset = 0;
    this.currentPage = "main";
    this.sideBarClass.style.display = "flex";
    if (_Activity.instance.QuickBar.voteComponent != null) {
      _Activity.instance.QuickBar.voteComponent.reset();
    }
  }
  resetDataMenu() {
    this?.dataMenu?.classList?.remove("d-none");
  }
  resetIgnoredBlockedSection() {
    this?.dataIgnored?.classList.add("d-none");
    this?.dataBlocked?.classList.add("d-none");
  }
  resetTitle() {
    this?.sideBarIgnTitle?.classList?.add("d-none");
    this?.sideBarblkTitle?.classList?.add("d-none");
  }
  resetMoreSection() {
    this.resetDataMenu();
    this.resetIgnoredBlockedSection();
    this.resetTitle();
    this.handleChildrensFromItems(this.items.more.childrens);
    this?.toggleGoBackButton(!0, !1);
  }
  hasPreviousPage() {
    if (this.currentPage == "main") {
      return this.resetMenu();
    }
    switch (this.currentPage) {
      case "favoritesgifs":
        this.currentPage = this.items.gifs.pageName;
        return this.doGifs();
      case "blocked":
      case "ignored":
        this.currentPage = this.items.more.pageName;
        return this.resetMoreSection();
    }
    return this.resetMenu();
  }
  doFavorite() {
    this?.dataMenu?.classList?.add("d-none");
    this?.dataFavoris?.classList?.remove("d-none");
    this?.favoriteT?.addEventListener("click", _0x436c6f => {
      _0x436c6f.preventDefault();
      let _0x2c92ee = hasGroupInFavorite() ? "disable" : "enable";
      this.setToggle(this.favoriteT, _0x2c92ee);
      addRemoveFavorites();
      setTimeout(() => {
        this.doLoadFavorite(!0);
      }, 400);
    });
    this.doLoadFavorite();
  }
  doLoadFavorite(_0x2e8201) {
    let _0x373cb8 = getFavoriteGroups();
    this?.sideBarFavTitle?.classList?.remove("d-none");
    let _0x2d1457 = config?.GroupName;
    _0x2d1457 = this.isNameTooLong(_0x2d1457);
    if (this.favoriteName) {
      this.favoriteName.innerText = _0x2d1457;
      addToolTip(this.favoriteName, config?.GroupName, {
        position: "low"
      });
    }
    if (!_0x2e8201) {
      this.setToggle(this.favoriteT, hasGroupInFavorite());
    }
    if (this.favoriteList && (this.favoriteList.innerHTML = "", Object.keys(_0x373cb8).length)) {
      for (let _0x20f2cf in _0x373cb8) {
        let _0x45babc = _0x373cb8[_0x20f2cf]?.g;
        let _0x321a96 = makeElement(this.favoriteList, "div");
        _0x321a96.id = "sideBar" + _0x45babc;
        let _0x1913ea = makeElement(_0x321a96, "img");
        _0x1913ea.src = (_Activity.instance.IsClassic ? "" : "www/") + "svg/favadded.svg";
        _0x1913ea.width = 15;
        _0x1913ea.style.margin = "-5px 7px 0px -1px";
        let _0x1b15e8 = makeElement(_0x321a96, "span");
        _0x1b15e8.id = "sideBarSpan" + _0x45babc;
        _0x1b15e8.innerHTML = this.isNameTooLong(_0x45babc);
        addToolTip(_0x1b15e8, ["mob2.opengrp", "Open $1", _0x45babc], {
          position: "low"
        });
        let _0x3507f6 = makeElement(_0x321a96, "img");
        _0x3507f6.id = "sideBarDelete" + _0x373cb8[_0x20f2cf]?.id;
        if (_Activity.instance.IsClassic) {
          _0x3507f6.src = "svg/remove" + (toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg";
        } else {
          _0x3507f6.src = "www/svg/removew.svg";
        }
        _0x3507f6.width = "15";
        _0x3507f6.classList.add("favdel");
        if (!_Activity.instance.IsClassic) {
          _0x3507f6.style.marginTop = "4px";
        }
        _0x3507f6.dataset.roomid = _0x373cb8[_0x20f2cf]?.id;
        _0x3507f6.dataset.roomname = _0x373cb8[_0x20f2cf]?.g;
        if (!_Activity.instance.IsClassic) {
          _0x3507f6.style.display = "inline-block";
        }
        _0x3507f6.addEventListener("click", _0x27bb02 => {
          addRemoveFavorites(_0x373cb8[_0x20f2cf]?.id, _0x373cb8[_0x20f2cf]?.g);
          setTimeout(() => {
            this.doLoadFavorite();
          }, 400);
        });
        _0x321a96.addEventListener("mouseover", () => {
          _0x3507f6.style.display = "inline-block";
        });
        _0x321a96.addEventListener("mouseout", () => {
          _0x3507f6.style.display = "none";
        });
        _0x1b15e8.addEventListener("click", () => {
          HitWeb(xatdomain + "/" + _0x20f2cf);
        });
      }
    }
    this.toggleGoBackButton(!0, !1);
  }
  isNameTooLong(_0x4aaff1) {
    let _0x148097 = _0x4aaff1?.replace(/[^A-Z]/g, "")?.length > 4;
    if (_0x4aaff1?.length > 13 && !_0x148097) {
      _0x4aaff1 = _0x4aaff1?.substr(0, 13) + "..";
    } else if (_0x148097) {
      _0x4aaff1 = _0x4aaff1?.substr(0, 9) + "..";
    }
    return _0x4aaff1;
  }
  doGifs() {
    this?.dataMenu?.classList?.add("d-none");
    this?.dataGifs?.classList?.remove("d-none");
    this?.favNoGifs?.classList?.add("d-none");
    this?.sideBarSwitchOnlineCounter?.classList?.add("d-none");
    this?.quickhr?.classList?.add("d-none");
    const _0x296559 = this.sideBarClass.scrollHeight - 150;
    this.gifList.style.maxHeight = _0x296559 + "px";
    this.gifList.style.marginLeft = "10px";
    this.gifLimit = Math.round(_0x296559 / 100) * 2 + 2;
    this.sideBarClass.style.display = "block";
    this.resetGifContainer(!0);
    this.doLoadGifs();
  }
  doLoadGifs() {
    let _0x4ee3b9 = findNodeInWindowOrParent("#sideBarFavGifs");
    this?.sideBarGifsTitle?.classList?.remove("d-none");
    this?.sidebarGifsSearch?.classList?.remove("d-none");
    this?.poweredby?.classList?.remove("d-none");
    this.toggleGoBackButton(!0, !1);
    this.gifOffset = 0;
    this.doGiphy({
      type: "trending",
      inputText: !1
    });
    if (this.doneGif) {
      return;
    }
    this.doneGif = !0;
    this?.giphySearchBar?.addEventListener("keyup", _0x59a110 => {
      _0x59a110.preventDefault();
      clearTimeout(this.giphyTypingTimer);
      if (this?.giphySearchBar?.value) {
        this.giphyTypingTimer = setTimeout(() => {
          this.gifValue = this?.giphySearchBar?.value;
          this.gifOffset = 0;
          this.doGiphy({
            type: "search",
            inputText: this?.giphySearchBar
          });
        }, this.giphyTypingInterval);
      } else {
        this.gifOffset = 0;
        this.gifValue = null;
        this.doGiphy({
          type: "trending",
          inputText: false
        });
      }
    });
    let _0x40c7ba = this.dataGifs;
    _0x40c7ba?.addEventListener("scroll", _0x1bb5bf => {
      if (this.currentPage == "favoritesgifs") {
        return;
      }
      _0x1bb5bf.preventDefault();
      const _0x1fdf5a = _0x40c7ba.scrollHeight - _0x40c7ba.scrollTop;
      if (_0x40c7ba.offsetHeight - _0x1fdf5a > -1) {
        this.doGiphy({
          type: this.gifValue == null ? "trending" : "search",
          inputText: this.giphySearchBar,
          noClear: true,
          noTypeCheck: true
        });
      }
    });
    _0x4ee3b9?.addEventListener("click", _0x13a54b => {
      _0x13a54b.preventDefault();
      this.doFavoriteGifs();
    });
  }
  doGiphy(_0x1c43a3 = {}) {
    if (!this.sidebarOpened) {
      return;
    }
    if (_0x1c43a3.noClear && _0x1c43a3.type != "trending" && !this.gifValue) {
      return;
    }
    if (!_0x1c43a3.noTypeCheck && _0x1c43a3.type == "trending" && this.giphyType == "trending") {
      return;
    }
    if (!_0x1c43a3.noClear) {
      this.resetGifContainer();
    }
    this.giphyType = _0x1c43a3.type;
    this.sideBarClass.style.width = "240px";
    let _0x21b91c = this.gifValue ? this.gifValue : _0x1c43a3.inputText?.value;
    let _0x5b0cce = this.giphyDomain + "?mode=" + _0x1c43a3.type + "&limit=" + this.gifLimit + "&offset=" + this.gifOffset;
    if (_0x1c43a3.type != "trending") {
      let _0x556387 = _0x21b91c.replace(new RegExp("['\"<>]", "gi"), "").replace(/\\/gi, "");
      _0x5b0cce += "&q=" + _0x556387.replace(/\s+/g, "+");
      if (_0x21b91c.length >= 20) {
        this.gifsType.innerText = _0x556387.substr(0, 20) + "..";
        addToolTip(this.gifsType, _0x21b91c, {
          position: "low"
        });
      } else {
        this.gifsType.innerText = _0x556387;
      }
    } else {
      this.gifsType.innerHTML = "<span data-localize='mob2.trending'>Trending</span>";
      TranslateAll();
    }
    fetch(_0x5b0cce).then(_0x1e876d => _0x1e876d.json()).then(_0x1c8741 => {
      this.loadGifsInList(_0x1c8741);
      if (_0x1c43a3.inputText && _0x1c8741.data == "" && !_0x1c43a3.noClear) {
        this.noResults?.classList?.remove("d-none");
      }
      this.gifOffset += this.gifLimit;
    }).catch(_0x2201fe => console.log("Giphy Error: ", _0x2201fe));
  }
  loadGifsInList(_0x3daec1) {
    if (_0x3daec1) {
      for (let _0x3da6c2 = 0; _0x3da6c2 < _0x3daec1?.data?.length; _0x3da6c2++) {
        let _0x5b7522 = this.getGiphyImageKey(!0);
        let _0x549220 = _0x3daec1?.data[_0x3da6c2]?.images?.[_0x5b7522];
        this.appendToGifList({
          width: _0x549220.width,
          height: _0x549220.height,
          id: _0x3daec1?.data[_0x3da6c2]?.id,
          url: _0x549220.url?.split("?")[0]
        }, !1, this.gifList);
      }
    }
  }
  appendToGifList(_0x25ff2c, _0x4b3122 = false, _0x160216 = null, _0x24a1b8 = false, _0x79f5cd = false) {
    if (_0x4b3122 && _0x160216) {
      _0x160216.innerHTML = "";
    }
    if (!_0x25ff2c.url) {
      return;
    }
    const _0x194400 = findNodeInWindowOrParent("#messagesContainer");
    const _0xbfaac8 = this.gifUtility;
    const _0x2a6ba6 = _0x25ff2c.url;
    let _0x388de8 = btoa(_0x25ff2c.id + "_" + _0x25ff2c.width + "_" + _0x25ff2c.height + "_" + (_0x24a1b8 ?? !1));
    if (_0x24a1b8) {
      _0xbfaac8.optimize(_0x194400);
      _0xbfaac8.dumpMemory();
      if (!_0xbfaac8.containers.has(_0x194400)) {
        _0xbfaac8.containers.add(_0x194400);
        _0x194400.addEventListener("scroll", _0x2929d5 => {
          if (!(Math.abs(_0xbfaac8.prevScrollY - _0x2929d5.target.scrollTop) < 90)) {
            _0xbfaac8.optimize(_0x194400);
            _0xbfaac8.prevScrollY = _0x2929d5.target.scrollTop;
          }
        });
      }
    }
    if (_0xbfaac8.gifs[_0x388de8]) {
      _0x388de8 += Math.random().toString(36).substring(2, 4);
    }
    let _0x37e223 = null;
    let _0x5aeb14 = makeElement(null, "span", "imgHolderGif");
    _0x5aeb14.style.position = "relative";
    _0x5aeb14.style.display = "inline-block";
    let _0x2ad490 = _0x25ff2c;
    _0x2ad490.hash = _0x388de8;
    if (_0x24a1b8 && _0xbfaac8.isInGifs(_0x2ad490)) {
      _0x5aeb14 = null;
      _0x37e223 = _0xbfaac8.gifs[_0x388de8].fullNode;
      _0x37e223.className = "imgHolderGif";
    }
    if (!_0x24a1b8) {
      this.sendGif(_0x5aeb14 || _0x37e223, _0x25ff2c.url);
    }
    _0x160216?.append(_0x5aeb14 || _0x37e223);
    if (_0x37e223) {
      if (_0x79f5cd) {
        messages?.scrollMessages();
      }
    } else {
      _0x25ff2c.message = _0x24a1b8;
      _0x25ff2c.scroll = _0x79f5cd;
      if (_0x24a1b8) {
        _0xbfaac8.gifs[_0x388de8] = new Image();
        _0xbfaac8.gifs[_0x388de8].url = _0x2a6ba6;
        _0xbfaac8.gifs[_0x388de8].id = _0x25ff2c?.id;
        _0xbfaac8.gifs[_0x388de8].container = _0x194400;
        _0xbfaac8.gifs[_0x388de8].span = _0x5aeb14;
        _0xbfaac8.gifs[_0x388de8].Hash = _0x388de8;
        _0xbfaac8.gifs[_0x388de8].width = _0x24a1b8 ? _0x25ff2c.width : 100;
        _0xbfaac8.gifs[_0x388de8].height = _0x24a1b8 ? _0x25ff2c.height : 100;
        _0xbfaac8.gifs[_0x388de8].loaded = !1;
        _0xbfaac8.gifs[_0x388de8].src = _0x2a6ba6;
        _0xbfaac8.gifs[_0x388de8].message = _0x24a1b8 ?? !1;
        _0xbfaac8.gifs[_0x388de8].obj = _0x25ff2c;
        _0xbfaac8.gifs[_0x388de8].className = "gifImageMsg";
        _0xbfaac8.gifs[_0x388de8].onload = this.gifLoaded.bind(this);
      } else {
        let _0x33025e = new Image(_0x25ff2c?.width, _0x25ff2c?.height);
        _0x33025e.src = _0x25ff2c?.url;
        _0x33025e.loading = "lazy";
        _0x33025e.className = "gifqbImage skeleton";
        _0x5aeb14.appendChild(_0x33025e);
        _0x33025e.onload = () => {
          _0x33025e.classList.remove("skeleton");
          this.addStarToImage(_0x5aeb14, _0x25ff2c);
        };
      }
    }
  }
  gifLoaded(_0x3a836b) {
    const _0x4a6c24 = _0x3a836b.target;
    const _0x211203 = _0x4a6c24.span;
    if (_0x4a6c24?.obj?.scroll) {
      messages?.scrollMessages(true);
    }
    if (!_0x4a6c24.loaded) {
      this.gifUtility.gifsMemory += _0x4a6c24.width * _0x4a6c24.height;
      this.gifUtility.gifs[_0x4a6c24.Hash].loaded = true;
      if (this.gifUtility.IsInViewport(_0x211203)) {
        _0x211203.appendChild(_0x4a6c24);
        this.addStarToImage(_0x211203, _0x4a6c24.obj);
      }
      this.gifUtility.gifs[_0x4a6c24.Hash].fullNode = _0x211203;
      this.gifUtility.gifs[_0x4a6c24.Hash].img = _0x4a6c24;
      this.setGifImageListeners(_0x4a6c24, _0x4a6c24.obj, true);
      _0x211203?.classList?.remove("skeleton");
    }
  }
  setGifImageListeners(_0x3657d6 = null, _0x383660 = {}, _0x581dea = false) {
    if (_0x3657d6 && _0x581dea && _0x383660) {
      _0x3657d6.dataset.big = _0x383660?.preview;
      _0x3657d6.addEventListener("click", this.doImageModal);
      if (this.getGifSettings() == "onhover") {
        _0x3657d6.onmouseover = () => {
          _0x3657d6.src = _0x383660?.animated;
          _0x3657d6.setAttribute("data-hover", _0x383660?.url);
        };
        _0x3657d6.onmouseout = () => {
          _0x3657d6.src = _0x383660?.url;
          _0x3657d6.setAttribute("data-hover", _0x383660?.animated);
        };
      }
    }
  }
  addStarToImage(_0x51a355 = null, _0x4d3069 = {}) {
    if (!_0x51a355 || !_0x4d3069.id || _0x4d3069.message && !config?.MyRegName.length) {
      return;
    }
    if (_0x51a355.querySelector("[data-gif-id=\"" + _0x4d3069.id + "\"]")) {
      return;
    }
    let _0x3a7e64 = makeElement(_0x51a355, "img", "gifFav" + (_0x4d3069.message && _Activity.instance.IsClassic ? " visibilityHidden" : ""), "sideBarFavGif");
    _0x3a7e64.src = (_0x4d3069.message || _Activity.instance.IsClassic ? "" : "www/") + "svg/star.svg";
    _0x3a7e64.width = 16;
    _0x3a7e64.dataset.gifId = _0x4d3069?.id;
    this.setClassOnStarFavorite(_0x3a7e64, this.isAddedAsGifFavorite(_0x4d3069?.id));
    _0x3a7e64.addEventListener("click", _0x55a3b2 => {
      _0x55a3b2.stopPropagation();
      this.setClassOnStarFavorite(_0x3a7e64, this.addRemoveGifFromFavorite(_0x4d3069?.id, _0x4d3069.message && _0x4d3069.animated ? _0x4d3069.animated : _0x4d3069?.url, _0x4d3069.message && _0x4d3069.aWidth ? _0x4d3069.aWidth : _0x4d3069?.width, _0x4d3069.message && _0x4d3069.aHeight ? _0x4d3069.aHeight : _0x4d3069?.height));
      if (_0x4d3069.updateIfNeeded) {
        setTimeout(() => {
          this.doFavoriteGifs(true);
        }, 400);
      }
    });
  }
  addRemoveGifFromFavorite(_0x5c86b9, _0x4bfd5e = null, _0x42328f = 100, _0x4a3b0d = 100) {
    let _0x2203dd = this.getFavoritesGifs();
    _0x2203dd ||= {};
    let _0x2c9bfc = !1;
    if (_0x2203dd[_0x5c86b9]) {
      delete _0x2203dd[_0x5c86b9];
    } else {
      _0x2203dd[_0x5c86b9] = _0x4bfd5e + "|" + _0x42328f + "|" + _0x4a3b0d;
      _0x2c9bfc = true;
    }
    this.updateGifInChat(_0x5c86b9, _0x2c9bfc);
    saveSetting("favoritesGifs", JSON.stringify(_0x2203dd));
    return _0x2c9bfc;
  }
  updateGifInChat(_0x5e85d0 = null, _0x19d2a2 = false) {
    if (!_0x5e85d0) {
      return;
    }
    let _0x5103c9 = document.querySelectorAll("#messages [data-gif-id=\"" + _0x5e85d0 + "\"]");
    if (_0x5103c9.length) {
      _0x5103c9.forEach(_0xf22ae4 => {
        this.setClassOnStarFavorite(_0xf22ae4, _0x19d2a2);
      });
      if (this.sidebarOpened && this.currentPage == "favoritesgifs") {
        setTimeout(() => {
          this.doFavoriteGifs(true);
        }, 400);
      }
    }
  }
  getFavoritesGifs() {
    try {
      let _0x3e1e5b = JSON.parse(localStorage.getItem("Settings"))?.favoritesGifs;
      if (_0x3e1e5b) {
        return JSON.parse(_0x3e1e5b.replace(/”/g, "\""));
      } else {
        return {};
      }
    } catch (_0x54f094) {
      return {};
    }
  }
  isAddedAsGifFavorite(_0x47d821) {
    if (!_0x47d821) {
      return !1;
    }
    let _0x1f7357 = this.getFavoritesGifs();
    return _0x1f7357 && _0x1f7357[_0x47d821];
  }
  setClassOnStarFavorite(_0x3e4f8f, _0x2df5f8) {
    if (!_0x3e4f8f) {
      return !1;
    }
    if (_0x2df5f8) {
      _0x3e4f8f.classList.add("gifActive");
    } else {
      _0x3e4f8f.classList.remove("gifActive");
    }
  }
  resetGifContainer(_0x510bc0) {
    this.gifList.innerHTML = "";
    this.giphyType = null;
    this.noResults?.classList?.add("d-none");
    this.dataGifs.scrollTop = 0;
    this.sideBarClass.style.width = this.originalWidthQb;
    this?.gifList?.classList?.remove("d-none");
    this?.gifFavoritesList?.classList?.add("d-none");
    if (_0x510bc0) {
      this.giphySearchBar.value = "";
      this.gifValue = null;
      this.currentPage = this.items.gifs.pageName;
    }
    if (this.giphySearchBar) {
      this.giphySearchBar.disabled = false;
      this.giphySearchBar.style.opacity = "1";
      this.gifSearchLabel.classList?.remove("gifSearchLabelDis");
    }
  }
  sendGif(_0x2ef173, _0x58cdd4) {
    if (_0x58cdd4) {
      _0x2ef173?.addEventListener("click", () => {
        this.sendGifAsMainOrPM(_0x58cdd4);
      });
    }
  }
  sendGifAsMainOrPM(_0xea47f6) {
    this.toggleSideBar(!1);
    if (!_Activity.instance.IsClassic) {
      return messages.sendMessage(_0xea47f6);
    }
    let _0xe75dc7 = document.getElementById("pmWrapper");
    if (_0xe75dc7 && _0xe75dc7.innerHTML.length) {
      setPmMode(false, null, null, document);
      return sendPm(_0xe75dc7.dataset.userno, _0xea47f6);
    } else {
      return messages.sendMessage(_0xea47f6);
    }
  }
  renderGif(_0x4e0f16 = {}) {
    if (!_0x4e0f16.node || !_0x4e0f16.text) {
      return;
    }
    let _0x315a2a = _0x4e0f16.node;
    _0x315a2a = _0x4e0f16.node.querySelector(".messageText");
    if (!_0x315a2a) {
      return;
    }
    let _0x50df9d = _0x4e0f16.text.split(" ");
    let _0x30a358 = !1;
    if (_0x50df9d.length > 0) {
      for (let _0xbf2973 in _0x50df9d) {
        if (!WordIsLink(_0x50df9d[_0xbf2973]) || !this.isGiphyLink(_0x50df9d[_0xbf2973]) || _0x30a358) {
          continue;
        }
        let _0x3c9f5c = _0x50df9d[_0xbf2973].split("/");
        let _0x3ad078 = !!_0x3c9f5c && _0x3c9f5c[_0x3c9f5c.length - 2];
        if (_0x3ad078) {
          this.getGifInformation({
            gifId: _0x3ad078,
            link: _0x50df9d[_0xbf2973]
          }, _0x29d57c => {
            if (_0x29d57c?.url && _0x29d57c?.statusCode == 200) {
              let _0x525091 = GetTranslation("mob2.giflinkremoved");
              _0x525091 ||= "Your GIF was not sent as it might be inappropriate.";
              let _0x2a0823 = false;
              if (_0x29d57c.rating == "" || _0x29d57c.rating && ["pg-13", "r"].indexOf(_0x29d57c.rating.toLowerCase()) >= 0) {
                _0x2a0823 = true;
              }
              if (_0x2a0823) {
                messages?.deleteMsg(_0x4e0f16.msgId);
                if (_0x4e0f16.isSelf && _0x4e0f16.showWarning) {
                  messages?.sendHelpMsg(_0x4e0f16.msgId, "<inf8> " + _0x525091, "Warning", true);
                }
              } else {
                _0x29d57c.id = _0x3ad078;
                this.appendToGifList(_0x29d57c, false, _0x315a2a, true, _0x4e0f16.shouldScroll);
              }
            } else {
              const _0x4d4663 = _0x315a2a?.querySelector("[data-giphy]");
              _0x4d4663?.classList?.remove("d-none");
            }
          });
          _0x30a358 = true;
        }
      }
    }
  }
  getGifInformation(_0x2e0d7b = {}, _0x2727a0) {
    if (!_0x2e0d7b.gifId) {
      return _0x2727a0(!1);
    }
    let _0x57781f = this.getGiphyImageKey();
    let _0x2e2c51 = this.getCacheKeyForGif(_0x2e0d7b.gifId);
    if (this.isGifDataInCache(_0x2e2c51)) {
      _0x2727a0(this.cachedGifsData[_0x2e2c51]);
    } else {
      fetch(this.giphyDomain + "?mode=getgif&gifId=" + _0x2e0d7b.gifId).then(_0x103af6 => {
        if (_0x103af6.ok) {
          return _0x103af6.json();
        }
        _0x2727a0({});
      }).then(_0x2be8a7 => {
        let _0x413dc8 = {};
        const _0xb38a32 = _0x2be8a7?.meta?.error_code ?? 200;
        if (_0x2be8a7?.data?.images?.[_0x57781f]) {
          let _0x32deb4 = _0x2be8a7?.data?.images?.[_0x57781f];
          let _0xfa2c6e = _0x2be8a7?.data?.images?.fixed_width_small;
          _0x413dc8 = {
            width: _0x32deb4?.width >= 300 ? _0x32deb4?.width / 2 : _0x32deb4?.width || 95,
            height: _0x32deb4?.height || 95,
            url: _0x32deb4?.url.split("?")[0] || _0x2e0d7b.link,
            preview: _0x2be8a7?.data?.images?.original?.url.split("?")[0],
            animated: _0xfa2c6e?.url.split("?")[0],
            aWidth: _0xfa2c6e?.width,
            aHeight: _0xfa2c6e?.height,
            rating: _0x2be8a7?.data?.rating
          };
        }
        _0x413dc8.statusCode = _0xb38a32;
        _0x2727a0(_0x413dc8);
        this.cachedGifsData[_0x2e2c51] = _0x413dc8;
      }).catch(_0x2d2979 => {
        console.info(_0x2d2979);
        _0x2727a0({});
      });
    }
  }
  isGifDataInCache(_0x96a750) {
    return !!_0x96a750 && this.cachedGifsData[_0x96a750];
  }
  getCacheKeyForGif(_0x36084d) {
    if (_0x36084d) {
      return _0x36084d + "_" + this.getGiphyImageKey();
    } else {
      return "";
    }
  }
  getGiphyImageKey(_0x586766) {
    if (_0x586766) {
      return "fixed_width_small";
    } else if (this.getGifSettings() === "enable") {
      return "fixed_height_small";
    } else {
      return "fixed_height_small_still";
    }
  }
  getGifSettings() {
    if (_Activity.instance.UserSettings && _Activity.instance.UserSettings?.gif) {
      return _Activity.instance.UserSettings?.gif;
    } else {
      return "enable";
    }
  }
  doImageModal(_0xbd4c79) {
    if (!_0xbd4c79) {
      return;
    }
    modalClose();
    let _0x336fdf = makeElement(document.body, "div", "modalDialog");
    _0x336fdf.id = "openModal";
    _0x336fdf.onclick = () => {
      modalClose();
    };
    let _0x434875 = makeElement(_0x336fdf, "div");
    let _0x34c7f7 = makeElement(_0x434875, "a");
    let _0x43c0e3 = _0xbd4c79?.target?.dataset?.big || _0xbd4c79?.target?.src;
    _0x34c7f7.href = _0x43c0e3;
    _0x34c7f7.target = "_blank";
    let _0x303135 = makeElement(_0x34c7f7, "img");
    _0x303135.src = _0x43c0e3;
    _0x303135.className = "imageModal";
    if (!_Activity.instance.IsClassic) {
      _0x303135.style.maxWidth = window.innerWidth - 100 + "px";
    }
    CacheHiddenDivs();
    _0x336fdf.style.opacity = 1;
    _0x336fdf.style.pointerEvents = "auto";
  }
  isGiphyLink(_0x488d7a) {
    if (!_0x488d7a || _0x488d7a.indexOf("giphy.com") == -1) {
      return !1;
    }
    try {
      let _0x116acb = new URL(_0x488d7a);
      let _0x216771 = _0x116acb?.hostname;
      if (_0x216771 && _0x216771.substring(_0x216771.length - 9) === "giphy.com" && _0x488d7a.match(/\.(gif)/g)) {
        return !0;
      }
    } catch (_0x40585a) {
      return !1;
    }
  }
  doFavoriteGifs(_0x419567 = false) {
    this.gifsType.innerHTML = "<span data-localize='mob2.favs'>Favorites</span>";
    this.giphySearchBar.value = null;
    TranslateAll();
    if (!_0x419567 && this.currentPage == "favoritesgifs") {
      return this.doGifs();
    }
    this.sideBarClass.style.width = "240px";
    this.currentPage = "favoritesgifs";
    if (this.gifFavoritesList) {
      const _0x5e66e2 = this.sideBarClass.scrollHeight - 150;
      this.gifFavoritesList.style.maxHeight = _0x5e66e2 + "px";
      this.gifFavoritesList.style.marginLeft = "10px";
      this.gifFavoritesList.innerHTML = "";
    }
    this?.favNoGifs?.classList?.add("d-none");
    this?.gifList?.classList?.add("d-none");
    this?.gifFavoritesList?.classList?.remove("d-none");
    if (this.giphySearchBar) {
      this.giphySearchBar.disabled = true;
      this.giphySearchBar.style.opacity = "0.4";
      this.gifSearchLabel.classList?.add("gifSearchLabelDis");
    }
    let _0x1db3a0 = this?.getFavoritesGifs();
    if (Object.keys(_0x1db3a0).length) {
      let _0xd42d36 = 0;
      for (let _0x5af959 in _0x1db3a0) {
        let _0x3cecf6 = _0x1db3a0[_0x5af959].split("|");
        if (!(_0x3cecf6.length < 3)) {
          this?.appendToGifList({
            width: _0x3cecf6[1],
            height: _0x3cecf6[2],
            id: _0x5af959,
            url: _0x3cecf6[0],
            updateIfNeeded: true
          }, _0xd42d36 === 0, this?.gifFavoritesList);
          _0xd42d36 += 1;
        }
      }
    } else {
      this?.favNoGifs?.classList?.remove("d-none");
    }
  }
  hasGiphyLinkInText(_0x217f68 = null) {
    if (!_0x217f68) {
      return !1;
    }
    _0x217f68 = _0x217f68.split(" ");
    for (let _0x2be371 in _0x217f68) {
      if (WordIsLink(_0x217f68[_0x2be371]) && this.isGiphyLink(_0x217f68[_0x2be371])) {
        return !0;
      }
    }
    return !1;
  }
  doIgnored() {
    this?.dataMenu?.classList?.add("d-none");
    this?.dataIgnored?.classList?.remove("d-none");
    this.doListFromObj({
      list: getIgnoredUsers(),
      classNode: this?.sideBarIgnTitle,
      htmlNode: this.ignoredList,
      type: "ignore",
      icon: "ignored"
    });
  }
  doBlocked() {
    this?.dataMenu?.classList?.add("d-none");
    this?.dataBlocked?.classList?.remove("d-none");
    this.doListFromObj({
      list: getBlockedUsers(),
      classNode: this?.sideBarblkTitle,
      htmlNode: this.blockedList,
      type: "block",
      icon: "ignored"
    });
  }
  doListFromObj(_0xd78fd5) {
    let _0x52dd63 = _0xd78fd5.list || {};
    if (_0xd78fd5.refreshList) {
      switch (_0xd78fd5.type) {
        case "ignore":
          _0x52dd63 = getIgnoredUsers();
          break;
        case "block":
          _0x52dd63 = getBlockedUsers();
      }
    }
    if (_0xd78fd5.classNode) {
      _0xd78fd5.classNode?.classList?.remove("d-none");
    }
    if (_0xd78fd5.htmlNode && (_0xd78fd5.htmlNode.innerHTML = "", Object.keys(_0x52dd63).length > 0)) {
      for (let _0x3950c7 in _0x52dd63) {
        let _0x1badb8 = makeElement(_0xd78fd5.htmlNode, "div");
        _0x1badb8.id = "sideBar" + _0x3950c7;
        let _0x1fb779 = makeElement(_0x1badb8, "img");
        _0x1fb779.src = (_Activity.instance.IsClassic ? "" : "www/") + "svg/" + (_0xd78fd5.icon ? _0xd78fd5.icon : "ignored") + ".svg";
        _0x1fb779.width = 16;
        _0x1fb779.style.margin = "-4px 6px 0 0";
        let _0x20e9b6 = makeElement(_0x1badb8, "span");
        _0x20e9b6.id = "sideBarSpan" + _0x3950c7;
        _0x20e9b6.innerHTML = _0xd78fd5.type == "block" ? _0x52dd63[_0x3950c7] : _0x3950c7;
        addToolTip(_0x20e9b6, ["box.140", "view xat.me"], {
          position: "low"
        });
        let _0x220b89 = makeElement(_0x1badb8, "img");
        _0x220b89.id = "sideBarDelete" + _0x3950c7;
        if (_Activity.instance.IsClassic) {
          _0x220b89.src = "svg/remove" + (toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg";
        } else {
          _0x220b89.src = "www/svg/removew.svg";
        }
        _0x220b89.width = "15";
        _0x220b89.classList.add("favdel");
        if (!_Activity.instance.IsClassic) {
          _0x220b89.style.marginTop = "4px";
        }
        _0x220b89.dataset.xatid = _0x3950c7;
        if (!_Activity.instance.IsClassic) {
          _0x220b89.style.display = "inline-block";
        }
        _0x220b89.addEventListener("click", _0x12a84f => {
          if (_0x12a84f.target.dataset.xatid) {
            if (_0xd78fd5.type && _0xd78fd5.type == "ignore") {
              unignoreUser(_0x3950c7);
            } else {
              unblockUser(_0x3950c7);
            }
            setTimeout(() => {
              _0xd78fd5.refreshList = true;
              this.doListFromObj(_0xd78fd5);
            }, 400);
          }
        });
        _0x1badb8.addEventListener("mouseover", () => {
          if (_0x220b89) {
            _0x220b89.style.display = "inline-block";
          }
        });
        _0x1badb8.addEventListener("mouseout", () => {
          if (_0x220b89) {
            _0x220b89.style.display = "none";
          }
        });
        _0x20e9b6.addEventListener("click", () => {
          HitWeb("https://xat.me/" + _0x3950c7);
        });
      }
    }
  }
  reloadSideBar() {
    let _0x15ca36 = hasDarkMode() ? "enable" : "disable";
    this.doHideUserslist(null, null, hasHideUserlist() || "disable");
    this.doDarkMode(null, null, hasDarkMode() || "disable");
    this.doStealthMode(null, null, hasStealthMode() || "disable");
    if (_Activity.instance.IsClassic) {
      this.updateScroll(_0x15ca36);
      this.updateChatDelIcon(_0x15ca36);
    }
    updateAllFrame(_0x15ca36);
  }
  doClassicDialog(_0x945749) {
    resetPstylePreview();
    const _0x1275b3 = {
      UserNo: config?.MyId
    };
    let _0x23b8ec = _0x1275b3;
    _0x23b8ec.tab = _0x945749 == "settings" ? "general" : "translator";
    this.toggleSideBar(!1);
    classicSetDialog("actions", config?.MyId);
    classicSetDialog("settings", _0x23b8ec);
  }
  doHitWiki(_0x28f3ab) {
    HitWeb(_0x28f3ab);
  }
  doHitEvents() {
    this.doHitWiki(xatdomain + "/" + keywords?.events);
  }
  doDarkMode(_0x3e2599, _0x444e29, _0x537e6f) {
    let _0x26c1ce = hasDarkMode();
    let _0x5e9437 = _0x537e6f || (_0x26c1ce ? "disable" : "enable");
    if (!_0x537e6f) {
      saveSetting("darkmode", _0x5e9437);
    }
    if (!_0x444e29 || !_0x3e2599) {
      _0x3e2599 = findNodeInWindowOrParent("#sideBarSwitchSetdarkmode");
    }
    this.setToggle(_0x3e2599, _0x5e9437);
    setdarkmode(_0x5e9437);
    updateAllFrame(_0x5e9437);
    if (_Activity.instance.IsClassic) {
      this.updateChatDelIcon(_0x5e9437);
      this.updateScroll(_0x5e9437);
    }
  }
  doHideUserslist(_0x38d6fc, _0x2cd82a, _0xabac94) {
    if (!Classic) {
      return;
    }
    let _0x3323e6 = hasHideUserlist();
    let _0x409442 = _0xabac94 || (_0x3323e6 == "enable" ? "disable" : "enable");
    if (!_0xabac94) {
      saveSetting("hideuserlist", _0x409442);
    }
    if (!_0x2cd82a || !_0x38d6fc) {
      _0x38d6fc = findNodeInWindowOrParent("#sideBarSwitchSethideuserslist");
    }
    this.setToggle(_0x38d6fc, _0x409442);
    this.setHideUserlist(_0x409442);
    bodyResize(null);
  }
  setHideUserlist(_0x2f6649) {
    if (_0x2f6649 && _0x2f6649 != "enable") {
      this.collapse();
    } else {
      this.expand();
    }
    bodyResize(null);
  }
  collapse() {
    document.getElementById("visitorsOverlay").style.display = "none";
    document.getElementById("visitorsTabContainer").style.display = "none";
    document.getElementById("listtabs").style.display = "none";
    document.getElementById("usrList").style.display = "none";
    document.getElementById("messagesTabContainer").style.width = "135%";
    document.getElementById("messagesOverlay").style.width = "97.1%";
  }
  expand() {
    document.getElementById("visitorsOverlay").style.display = "";
    document.getElementById("visitorsTabContainer").style.display = "";
    document.getElementById("listtabs").style.display = "";
    document.getElementById("usrList").style.display = "";
    document.getElementById("messagesTabContainer").style.width = "";
    document.getElementById("messagesOverlay").style.width = "524px";
  }
  doStealthMode(_0x2a6083, _0x22a59e, _0x558e6d) {
    let _0x1d5fe4 = hasStealthMode();
    let _0x5f29cf = _0x558e6d || (_0x1d5fe4 ? "disable" : "enable");
    if (!_0x558e6d) {
      saveSetting("Stealth", _0x5f29cf, true);
    }
    if (!_0x22a59e || !_0x2a6083) {
      _0x2a6083 = findNodeInWindowOrParent("#sideBarSwitchSetstealthmode");
    }
    this.setToggle(_0x2a6083, _0x5f29cf);
    if (!_0x558e6d && typeof reloadChat == "function") {
      window.reloadChat();
    }
  }
  updateScroll(_0x356858) {
    let _0x32a396 = document.querySelector("#scrollText");
    if (_0x32a396) {
      if (_0x32a396.dataset && _0x32a396.dataset.hasColor) {
        return _0x32a396.classList.remove("darkScroll");
      } else if (_0x356858 == "enable") {
        return _0x32a396.classList.add("darkScroll");
      } else {
        return _0x32a396.classList.remove("darkScroll");
      }
    }
  }
  updateChatDelIcon(_0x3a30db) {
    const _0x4f0d5d = findNodeInWindowOrParent(".chatdel .svgBack", !0);
    if (_0x4f0d5d) {
      _0x4f0d5d.forEach(_0x1cf915 => _0x3a30db == "enable" ? _0x1cf915.classList.add("darkDel") : _0x1cf915.classList.remove("darkDel"));
    }
  }
  doGroupsPowers(_0x31e875, _0x1a4759) {
    if (_0x31e875 == "false") {
      _0x31e875 = false;
    }
    let _0x3dcdd6 = !1;
    if (!Object.keys(this.cachedGroupsPowers).length || _0x31e875) {
      ToC({
        Command: "GetUsersGroupsPowers"
      });
      if (_0x31e875) {
        return;
      }
      _0x3dcdd6 = !0;
    }
    this.powerNameForAssign = _0x1a4759;
    this.toggleSideBar(!1);
    return this.setGroupsPowers(!1, _0x3dcdd6);
  }
  setGroupsPowers(_0x2f75bb, _0x2086cc) {
    if (_0x2f75bb) {
      try {
        _0x2f75bb = JSON.parse(_0x2f75bb);
        this.cachedGroupsPowers = _0x2f75bb;
        _0x2086cc = !1;
      } catch (_0x47b708) {
        this.cachedGroupsPowers = [];
      }
    }
    customModalWithMsg(["mob2.grouppowersmanager", "Group powers manager"], "", !0, !1, !0);
    let _0x322df8 = document.querySelector(".NewdialogBody");
    let _0x55e03e = document.querySelector("#wrapper");
    if (!_0x322df8 || !_0x55e03e) {
      return;
    }
    _0x55e03e?.classList?.remove("wrapper");
    let _0x378985 = GetTranslation("mob2.search");
    _0x378985 ||= "search";
    _0x55e03e.innerHTML += "\n            <div class=\"" + (Object.keys(this.cachedGroupsPowers).length || _0x2086cc ? "d-none" : "data-gp-error") + "\" data-localize=\"mob2.havenogp\">You have no group powers</div>\n            <div style=\"margin: 10px 0 5px 8px\" class=\"" + (_0x2086cc ? "data-gp-info" : "d-none") + "\" data-localize=\"mob2.loadinggroupspowers\">Loading group powers.</div>\n            <div class=\"d-none\" data-gp-info></div>\n            <div class=\"d-none\" data-gp-error></div>\n            <div class=\"d-none\" id=\"loading\"></div>\n            <div class=\"" + (!Object.keys(this.cachedGroupsPowers).length || _0x2086cc ? "d-none" : "") + "\" style=\"margin-top: .5rem; padding:9px\" data-gp>\n                <div class=\"row_gp\">\n                    <div class=\"xGroup horizontal\">\n                        <input type=\"text\" class=\"xInput wide\" id=\"searchGp\" style=\"padding:3px;\" placeholder=\"" + _0x378985 + "\" value=\"" + (this.powerNameForAssign ? this.powerNameForAssign : "") + "\">\n                    </div>\n                </div>\n                <table class=\"gptable\">\n                    <thead class=\"row_gp\" data-gp-header>\n                        <th scope=\"col\" data-localize=\"mob2.power\" class=\"head_col_pow\">Power</th>\n                        <th scope=\"col\" data-localize=\"mob2.left\">Left</th>\n                        <th scope=\"col\" data-localize=\"mob2.assigned\">Assigned</th>\n                        <th scope=\"col\" data-localize=\"mob2.amount\">Amount</th>\n                        <th scope=\"col\" data-localize=\"mob2.assign\">Assign</th>\n                        <th scope=\"col\" data-localize=\"mob2.unassign\">Unassign</th>\n                    </thead>\n                    <tbody data-gp-rows></tbody>\n                </table>\n            </div>\n        ";
    this.setGpHtml();
    this.setGpSearch();
    ColorTitle();
    setButCols(config.ButCol, config.ButColW);
    setCstyle();
    TranslateAll();
  }
  setGpHtml() {
    let _0x478d42 = document.querySelector("[data-gp-rows]");
    let _0x38254a = config?.chatid;
    _0x478d42.innerHTML = "";
    let _0x4946e0 = Object.keys(this.cachedGroupsPowers).length;
    if (_0x4946e0) {
      let _0x5e67d9 = 0;
      for (let _0x1c1b30 in this.cachedGroupsPowers) {
        try {
          let _0x4bc366 = JSON.parse(this.cachedGroupsPowers[_0x1c1b30].replace(/`/gi, "\""));
          let _0x2560be = {
            canUnassign: !1,
            amount: 0,
            left: parseInt(_0x4bc366?.amount)
          };
          if (_0x4bc366?.infos !== undefined) {
            let _0x239e57 = _0x4bc366?.infos?.split("|");
            let _0x37bd53 = 0;
            for (let _0x2dbbd2 in _0x239e57) {
              let _0x34b148 = _0x239e57[_0x2dbbd2]?.split("=");
              if (_0x34b148[0]) {
                _0x34b148[1] ||= 1;
                _0x37bd53 += parseInt(_0x34b148[1]);
                if (_0x34b148[0] == _0x38254a) {
                  _0x2560be.canUnassign = true;
                  _0x2560be.amount = parseInt(_0x34b148[1]);
                }
              }
            }
            let _0x3118b9 = _0x2560be?.left - _0x37bd53;
            _0x2560be.left = _0x3118b9 >= 0 ? _0x3118b9 : 0;
          }
          let _0x29ffa8 = makeElement(_0x478d42, "tr", "row_gp");
          _0x29ffa8.dataset.powerName = _0x4bc366?.name;
          _0x29ffa8.dataset.powerId = _0x1c1b30;
          _0x29ffa8.dataset.isPowerRow = !0;
          if (this.powerNameForAssign && _0x4bc366?.name !== this.powerNameForAssign) {
            _0x5e67d9++;
            _0x29ffa8.style.display = "none";
          }
          let _0x5a6809 = makeElement(_0x29ffa8, "td", "col_pow");
          let _0x2ef58b = makeElement(_0x5a6809, "img");
          _0x2ef58b.style.marginRight = "8px";
          _0x2ef58b.width = "23";
          _0x2ef58b.src = xatdomain + "/images/smw/" + _0x4bc366?.name + ".png";
          makeElement(_0x5a6809, "span").innerText = _0x4bc366?.name;
          let _0xcb2709 = makeElement(_0x29ffa8, "td", "col_left");
          _0xcb2709.setAttribute("data-label", "Left");
          _0xcb2709.innerText = _0x2560be?.left;
          let _0x2d9f22 = makeElement(_0x29ffa8, "td", "col_assigned");
          _0x2d9f22.setAttribute("data-label", "Assigned");
          _0x2d9f22.innerText = _0x2560be?.amount;
          let _0x204162 = makeElement(_0x29ffa8, "td", "col_amount");
          _0x204162.setAttribute("data-label", "Amount");
          let _0x2aecae = makeElement(_0x204162, "input", "xInput wide gpInput");
          _0x2aecae.type = "number";
          _0x2aecae.style.width = "65px";
          let _0x1848ad = makeElement(_0x29ffa8, "td", "col_assign");
          let _0x1e9be4 = makeElement(_0x1848ad, "button", "xButton gpButton gpAsigBut", "assign_" + _0x1c1b30);
          addText(_0x1e9be4, "+");
          if (_0x2560be?.left < 1) {
            _0x1e9be4.disabled = true;
          }
          _0x1e9be4.addEventListener("click", _0x1963c5 => {
            _0x1963c5.preventDefault();
            let _0x4e53b6 = parseInt(_0x2aecae.value);
            let _0x3cc740 = parseInt(_0x2560be?.left);
            let _0x1be123 = parseInt(_0x2560be?.amount);
            setLoader(!0);
            return this.handleAssignUnassign({
              amountToAssign: _0x4e53b6,
              total: _0x3cc740,
              assigned: _0x1be123,
              powerId: _0x1c1b30,
              type: "Assign"
            });
          });
          let _0xca18e7 = makeElement(_0x29ffa8, "td", "col_unassign");
          let _0x31840f = makeElement(_Activity.instance.IsClassic ? _0xca18e7 : _0x1848ad, "button", "xButton gpButton");
          addText(_0x31840f, "-");
          if (!_0x2560be?.canUnassign) {
            _0x31840f.disabled = true;
          }
          _0x31840f.addEventListener("click", _0x1bec33 => {
            _0x1bec33.preventDefault();
            let _0x5de7cc = parseInt(_0x2aecae.value);
            let _0x264f93 = parseInt(_0x2560be?.left);
            let _0x4c609e = parseInt(_0x2560be?.amount);
            setLoader(!0);
            return this.handleAssignUnassign({
              amountToAssign: _0x5de7cc,
              total: _0x264f93,
              assigned: _0x4c609e,
              powerId: _0x1c1b30,
              type: "Unassign"
            });
          });
        } catch (_0x4a05bf) {
          console.error(_0x4a05bf);
        }
      }
      if (_0x5e67d9 == _0x4946e0) {
        this.setGpError("<div data-localize=\"mob2.donthavepower\" data-do-not-have>You do not have the power</div>", 1);
      }
    }
  }
  setGpSearch(_0x5d4323) {
    let _0x12a9fd = document.querySelector("#searchGp");
    if (!_0x12a9fd) {
      return;
    }
    let _0x2980a5 = document.querySelectorAll("[data-is-power-row]");
    if (_0x2980a5.length) {
      this.updateGpHeader();
      if (_0x5d4323) {
        _0x12a9fd.value = "";
      }
      _0x12a9fd?.addEventListener("keyup", _0x269cf1 => {
        let _0x1c6abc = _0x269cf1?.target?.value;
        _0x1c6abc &&= _0x1c6abc.toLowerCase();
        _0x2980a5?.forEach(_0x1f481e => {
          let _0x483de5 = _0x1f481e?.dataset?.powerName;
          if (_0x483de5) {
            if (_0x1c6abc.length == 0 || _0x483de5.substring(0, _0x1c6abc.length) == _0x1c6abc || _0x483de5.indexOf(_0x1c6abc) >= 0) {
              _0x1f481e.style.display = "";
            } else {
              _0x1f481e.style.display = "none";
            }
          }
        });
        this.updateGpHeader();
      });
    }
  }
  updateGpHeader() {
    const _0x58a902 = document.querySelector("[data-gp-header]");
    if (!_0x58a902) {
      return;
    }
    const _0x5b16c5 = document.querySelectorAll("[data-gp] tr.row_gp:not([style*=\"display:none\"]):not([style*=\"display: none\"])");
    const _0x3bb4ed = document.querySelectorAll("[data-gp] tr.row_gp");
    _0x3bb4ed?.forEach(_0x59ff48 => _0x5b16c5.length > 1 ? _0x59ff48.classList.remove("noBorderRow") : _0x59ff48.classList.add("noBorderRow"));
    _0x58a902.style.display = _0x5b16c5?.length > 0 ? "" : "none";
  }
  handleAssignUnassign(_0x4c1d7e) {
    if (!_0x4c1d7e.amountToAssign || _0x4c1d7e.amountToAssign < 0) {
      _0x4c1d7e.amountToAssign = 1;
    }
    _0x4c1d7e.total ||= 0;
    _0x4c1d7e.assigned ||= 0;
    if (!_0x4c1d7e.powerId) {
      return;
    }
    let _0x63497f = _0x4c1d7e.type == "Assign" ? 1 : 0;
    ToC({
      Type: "Assign",
      p: _0x4c1d7e.powerId,
      a: _0x63497f,
      n: _0x63497f == 1 ? _0x4c1d7e.assigned + _0x4c1d7e.amountToAssign : _0x4c1d7e.assigned - _0x4c1d7e.amountToAssign
    });
  }
  setGpError(_0x548323, _0x1237d2) {
    if (!_0x548323) {
      return;
    }
    _0x1237d2 = parseInt(_0x1237d2);
    setLoader(!1);
    let _0x1185ca = document.querySelector("" + (_0x1237d2 == 1 ? "[data-gp-error]" : "[data-gp-info]"));
    if (!_0x1185ca) {
      AlertMessage(_0x548323);
      return;
    }
    _0x1185ca?.classList?.remove("d-none");
    _0x1185ca.innerHTML = _0x548323;
    let _0x33cc97 = document.querySelector(".gpModal .dialogPadding");
    if (_0x33cc97) {
      _0x33cc97.scrollIntoView({
        behavior: "smooth"
      });
    }
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      _0x1185ca?.classList?.add("d-none");
    }, 6000);
  }
  updateGroupower(_0x2f6a19, _0x334d15, _0x3542b2) {
    if (_0x2f6a19 && _0x334d15 && _0x3542b2) {
      try {
        _0x3542b2 = xInt(_0x3542b2);
        _0x334d15 = xInt(_0x334d15);
        let _0x1447b2 = this.cachedGroupsPowers;
        _0x1447b2 = _0x1447b2[_0x2f6a19];
        if (!_0x1447b2) {
          return;
        }
        let _0x503544 = {};
        try {
          _0x503544 = JSON.parse(_0x1447b2.replace(/`/gi, "\""));
          _0x503544.infos ||= "";
        } catch (_0x39ea6b) {}
        let _0x147188 = !1;
        let _0x3f289e = null;
        if (_0x503544?.infos !== undefined) {
          let _0x1dce64 = _0x503544?.infos?.split("|");
          _0x1dce64 = _0x1dce64.filter(_0x21fce6 => _0x21fce6);
          if (_0x1dce64.length) {
            for (let _0x594c43 in _0x1dce64) {
              let _0x5175f0 = _0x1dce64[_0x594c43]?.split("=");
              if (_0x5175f0 && _0x5175f0[0] && _0x5175f0[0] == config?.chatid) {
                _0x3f289e = _0x594c43;
                _0x5175f0[1] ||= 1;
                _0x5175f0[1] = _0x334d15;
                _0x147188 = !0;
                _0x5175f0 = _0x5175f0.join("=");
                _0x1dce64[_0x594c43] = _0x5175f0;
                break;
              }
            }
          }
          if (_0x3542b2 == 0 && _0x334d15 == 0 && _0x3f289e != null) {
            delete _0x1dce64[_0x3f289e];
          }
          if (!_0x147188 && _0x334d15 > 0) {
            _0x1dce64.push(config?.chatid + "=" + _0x334d15);
          }
          _0x1dce64 = _0x1dce64.join("|");
          _0x503544.infos = _0x1dce64;
          let _0x314cab = JSON.stringify(_0x503544);
          this.cachedGroupsPowers[_0x2f6a19] = _0x314cab.replace(/"/gi, "`");
          this.setGpHtml();
          this.setGpSearch(!0);
        }
      } catch (_0x11ffb2) {
        this.setGpError("Something went wrong when updating powers list.", 1);
      }
    }
  }
  resetGroupPowersCache() {
    this.cachedGroupsPowers = [];
    this.powerNameForAssign = null;
  }
  getStuffPressed() {
    const _0x4452e5 = document.querySelector(".dialogBody");
    if (_0x4452e5) {
      _0x4452e5.style.height = "90%";
    }
    this.toggleSideBar(!1);
    classicSetDialog("selector", {
      Type: "Smilies"
    });
  }
  initVote() {
    if (this.voteComponent != null) {
      return this.voteComponent.loadVoteData();
    }
  }
}
class GifUtility {
  constructor() {
    this.gifs = {};
    this.gifsMemory = 0;
    this.containers = new Set();
    this.prevScrollY = 0;
  }
  isInGifs(_0xa92c1 = {}) {
    if (!_0xa92c1.id || !_0xa92c1.hash) {
      return !1;
    }
    const _0x2daf39 = _0xa92c1.hash;
    return _0x2daf39 in this.gifs && _0xa92c1.id.toLowerCase() == this.gifs[_0x2daf39].id.toLowerCase() && this.gifs[_0x2daf39].loaded && this.gifs[_0x2daf39].width_ == _0xa92c1.width && this.gifs[_0x2daf39].height_ == _0xa92c1.height;
  }
  optimize(_0x50b22b) {
    const _0x4d8c13 = Object.fromEntries(Object.entries(this.gifs).filter(_0x837beb => {
      let [_0x2765ec, _0x59c53c] = _0x837beb;
      return _0x59c53c.container == _0x50b22b;
    }));
    for (let _0x494668 in _0x4d8c13) {
      const _0x2c15de = this.gifs[_0x494668];
      if (!_0x2c15de.loaded || !_0x2c15de.message) {
        continue;
      }
      const _0x23af14 = _0x2c15de.span;
      const _0x5967ac = this.IsInViewport(_0x23af14);
      if (!_0x5967ac && _0x23af14?.firstChild) {
        _0x23af14.removeChild(_0x23af14.firstChild);
      } else if (!!_0x5967ac && (!_0x23af14.innerHTML || !_0x23af14?.querySelector(".gifqbImage"))) {
        _0x23af14.appendChild(_0x2c15de.img);
        _Activity.instance.QuickBar?.addStarToImage(_0x23af14, _0x2c15de?.obj);
      }
    }
  }
  dumpMemory(_0x58b1f8 = 10000000) {
    if (!(this.gifsMemory <= _0x58b1f8)) {
      this.gifsMemory = 0;
      for (let _0x3bcfec in this.gifs) {
        const _0x2e48ed = this.gifs[_0x3bcfec];
        const _0x2807be = _0x2e48ed.span;
        if (_0x58b1f8 != 0) {
          if (_0x2807be.innerHTML && _0x2807be.parentNode) {
            this.gifsMemory += _0x2e48ed.width * _0x2e48ed.height;
          } else {
            delete this.gifs[_0x3bcfec];
          }
        } else {
          _0x2807be.parentNode?.removeChild(_0x2807be);
        }
      }
      if (!_0x58b1f8) {
        this.gifs = {};
      }
    }
  }
  IsInViewport(_0x538b3c) {
    const _0x21aa50 = _0x538b3c.getBoundingClientRect();
    return _0x21aa50.top >= -_0x21aa50.height / 2 && _0x21aa50.left >= -_0x21aa50.width / 2 && _0x21aa50.bottom <= (window.innerHeight || document.documentElement.clientHeight) && _0x21aa50.right <= (window.innerWidth || document.documentElement.clientWidth);
  }
}