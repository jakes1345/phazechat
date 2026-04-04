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
  init(force) {
    if (!this.done || !_Activity.instance.IsClassic || !!force) {
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
    for (let key in this.items) {
      let itemEl = makeElement(this.dataMenu, "div", "", "sideBarItem" + key);
      itemEl.dataset.sidebarSettings = key;
      if (this.items[key]?.mustBeRegistered && !config?.MyRegName.length) {
        itemEl.style.display = "none";
      }
      if (!_Activity.instance.IsClassic && this.items[key]?.mustHaveCookieEnabled && localStorage.getItem("mobCookies") != 1) {
        itemEl.style.display = "none";
      }
      if (this.items[key]?.children) {
        itemEl.classList.add("d-none");
      }
      if (this.items[key]?.hideOnMobile && !_Activity.instance.IsClassic) {
        itemEl.classList.add("notMobile");
      }
      itemEl.dataset.isChildren = this.items[key]?.children || !1;
      if (this.items[key]?.svg) {
        let img = makeElement(itemEl, "img");
        img.src = (_Activity.instance.IsClassic ? "" : "www/") + "svg/" + this.items[key]?.svg + ".svg";
        img.alt = key;
        img.width = 13;
        img.style.margin = "0 3px 2px 0";
      }
      let span = makeElement(itemEl, "span", "", "sideBarSpan" + key);
      span.innerText = this.items[key]?.name;
      span.dataset.localize = this.items[key]?.translation;
      if (this.items[key]?.switchIcon) {
        let switchSpan = makeElement(itemEl, "span", null, "sideBarSwitch" + key);
        let label = makeElement(switchSpan, "label", _Activity.instance.IsClassic ? "switch" : "switch switchMob");
        let input = makeElement(label, "input", null, "sideBarSwitchSet" + key);
        input.type = "checkbox";
        input.dataset.sideBarSwitchSettings = key;
        makeElement(label, "span", "slider", "sideBarSwitchSetSlider" + key);
        if (this.items[key]?.function_preset && typeof window[this.items[key]?.function_preset] == "function") {
          let presetValue = window[this.items[key]?.function_preset]();
          if (presetValue && presetValue != "disable") {
            input.classList.add("active");
          } else {
            input.classList.remove("active");
          }
        }
        input.addEventListener("click", e => {
          e.preventDefault();
          if (typeof window[this.items[key]?.function] == "function") {
            window[this.items[key]?.function](e, true);
          }
        });
      }
      itemEl.addEventListener("click", e => {
        e.preventDefault();
        this.currentPage = this.items[key]?.pageName ?? "main";
        this.clearOnlineInterval();
        if (typeof this[this.items[key]?.function] == "function") {
          let args = this.items[key]?.args || e;
          this[this.items[key]?.function](args);
        }
        if (this.items[key]?.childrens) {
          this.handleChildrensFromItems(this.items[key].childrens);
        }
        if (this.items[key]?.goBack) {
          this.toggleGoBackButton(true, false);
        }
      });
    }
    TranslateAll();
  }
  handleChildrensFromItems(childrenKeys = []) {
    for (let i in childrenKeys) {
      let el = findNodeInWindowOrParent("[data-sidebar-settings=\"" + childrenKeys[i] + "\"]");
      if (el) {
        el?.classList?.remove("d-none");
      }
    }
    this.hideAllNonChildrens(!0);
  }
  hideAllNonChildrens(isChildren, showAll) {
    let elements = _Activity.instance.IsClassic ? document.querySelectorAll("[data-is-children=\"" + !isChildren + "\"]") : parent.document.querySelectorAll("[data-is-children=\"" + !isChildren + "\"]");
    if (elements.length) {
      elements.forEach(el => el.classList.add("d-none"));
    }
    if (showAll) {
      let nonChildren = _Activity.instance.IsClassic ? document.querySelectorAll("[data-is-children=\"false\"]") : parent.document.querySelectorAll("[data-is-children=\"false\"]");
      if (nonChildren.length) {
        nonChildren.forEach(el => el.classList.remove("d-none"));
      }
    }
  }
  registerEvents() {
    this.sideBarIcon?.addEventListener("click", e => {
      e.stopImmediatePropagation();
      if (!this.sidebarOpened) {
        this.resetMenu();
      }
      this.toggleSideBar(!this.sidebarOpened);
    }, !0);
    this.sidebarGoBack?.addEventListener("click", e => {
      e.stopImmediatePropagation();
      this.hasPreviousPage();
    }, !0);
    document?.addEventListener("click", e => {
      this.shouldCloseQuickBar(e);
    }, !0);
    parent?.document?.addEventListener("click", e => {
      this.shouldCloseQuickBar(e);
    }, !0);
  }
  shouldCloseQuickBar(e) {
    if (e?.target?.className == "tooltip" || document?.activeElement == _Activity.instance.QuickBar?.giphySearchBar) {
      return;
    }
    let isOutside = !this?.sideBardiv.contains(e.target) && e?.target?.id != "sideBar";
    if (this?.sidebarOpened && isOutside) {
      this?.toggleSideBar(false);
    }
  }
  toggleSideBar(open) {
    if (!this.sideBarIcon || !this.sideBarClass) {
      return;
    }
    let icon = _Activity.instance.IsClassic ? this.sideBarIcon : this.sideBarIconImg;
    this.resetMenu();
    if (open) {
      icon.style.transform = "scaleX(1)";
      this.sideBarClass.style.right = _Activity.instance.IsClassic ? "10px" : "0px";
      _Activity.instance.QuickBar.sidebarOpened = this.sidebarOpened = true;
      if (config?.MyRegName?.length) {
        this.getOnline();
      } else {
        this.toggleGoBackButton(false, false);
      }
    } else {
      icon.style.transform = "scaleX(-1)";
      this.sideBarClass.style.right = _Activity.instance.IsClassic ? "-174px" : "";
      this.clearOnlineInterval();
      _Activity.instance.QuickBar.sidebarOpened = this.sidebarOpened = false;
    }
    let url = parent?.parent?.document?.location?.href;
    let bgParts = config?.background?.split(";=");
    if (["https://xat.com/", "https://xat.com/#featured", "https://xat.com/#popular", "https://xat.com/#supported", "https://xat.com/#games"].indexOf(url) >= 0 && !bgParts[0].length && this.sideBarClass) {
      this.sideBarClass.style.backgroundColor = "#efefef!important";
    }
  }
  toggleGoBackButton(show, showCounters) {
    if (showCounters && !config?.MyRegName?.length) {
      showCounters = false;
    }
    if (show) {
      this?.sidebarGoBack?.classList?.remove("d-none");
    } else {
      this?.sidebarGoBack?.classList?.add("d-none");
    }
    if (showCounters) {
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
  getOnline(isInterval) {
    if (this.sidebarOpened && _Activity?.instance?.QuickBar?.sidebarOpened) {
      ToC({
        Command: "getUsersOnline"
      });
      if (!isInterval) {
        _Activity.instance.QuickBar.onlineInterval = this.onlineInterval = setInterval(() => {
          this.getOnline(true);
        }, this.onlineIntervalTimer);
      }
    } else {
      this.clearOnlineInterval();
    }
  }
  setTotalOnline(pools = {}) {
    let tooltipContent = "";
    let total = 0;
    pools = Object.fromEntries(Object.entries(pools).sort((a, b) => {
      let [, countA] = a;
      let [, countB] = b;
      return countB - countA;
    }).filter(entry => {
      let [key, count] = entry;
      return count > 0;
    }));
    if (this.usersOnline) {
      for (let pool in pools) {
        total += parseInt(pools[pool]);
        tooltipContent += this.appendPools(pool, pools[pool]);
      }
      addToolTip(this.sideBarSwitchOnlineCounter, tooltipContent, {
        position: "top-tall",
        instant: !0
      });
      return this.usersOnline.innerText = total;
    }
  }
  appendPools(pool, count) {
    if (pool && count) {
      return pool + ": " + count + "<br>";
    }
  }
  setToggle(el, val) {
    if (el) {
      if (val && val != "disable") {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
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
    this?.favoriteT?.addEventListener("click", e => {
      e.preventDefault();
      let val = hasGroupInFavorite() ? "disable" : "enable";
      this.setToggle(this.favoriteT, val);
      addRemoveFavorites();
      setTimeout(() => {
        this.doLoadFavorite(!0);
      }, 400);
    });
    this.doLoadFavorite();
  }
  doLoadFavorite(isUpdate) {
    let favorites = getFavoriteGroups();
    this?.sideBarFavTitle?.classList?.remove("d-none");
    let groupName = config?.GroupName;
    groupName = this.isNameTooLong(groupName);
    if (this.favoriteName) {
      this.favoriteName.innerText = groupName;
      addToolTip(this.favoriteName, config?.GroupName, {
        position: "low"
      });
    }
    if (!isUpdate) {
      this.setToggle(this.favoriteT, hasGroupInFavorite());
    }
    if (this.favoriteList && (this.favoriteList.innerHTML = "", Object.keys(favorites).length)) {
      for (let key in favorites) {
        let label = favorites[key]?.g;
        let itemEl = makeElement(this.favoriteList, "div");
        itemEl.id = "sideBar" + label;
        let starImg = makeElement(itemEl, "img");
        starImg.src = (_Activity.instance.IsClassic ? "" : "www/") + "svg/favadded.svg";
        starImg.width = 15;
        starImg.style.margin = "-5px 7px 0px -1px";
        let span = makeElement(itemEl, "span");
        span.id = "sideBarSpan" + label;
        span.innerHTML = this.isNameTooLong(label);
        addToolTip(span, ["mob2.opengrp", "Open $1", label], {
          position: "low"
        });
        let delImg = makeElement(itemEl, "img");
        delImg.id = "sideBarDelete" + favorites[key]?.id;
        if (_Activity.instance.IsClassic) {
          delImg.src = "svg/remove" + (toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg";
        } else {
          delImg.src = "www/svg/removew.svg";
        }
        delImg.width = "15";
        delImg.classList.add("favdel");
        if (!_Activity.instance.IsClassic) {
          delImg.style.marginTop = "4px";
        }
        delImg.dataset.roomid = favorites[key]?.id;
        delImg.dataset.roomname = favorites[key]?.g;
        if (!_Activity.instance.IsClassic) {
          delImg.style.display = "inline-block";
        }
        delImg.addEventListener("click", e => {
          addRemoveFavorites(favorites[key]?.id, favorites[key]?.g);
          setTimeout(() => {
            this.doLoadFavorite();
          }, 400);
        });
        itemEl.addEventListener("mouseover", () => {
          delImg.style.display = "inline-block";
        });
        itemEl.addEventListener("mouseout", () => {
          delImg.style.display = "none";
        });
        span.addEventListener("click", () => {
          HitWeb(xatdomain + "/" + key);
        });
      }
    }
    this.toggleGoBackButton(!0, !1);
  }
  isNameTooLong(name) {
    let isCapitalized = name?.replace(/[^A-Z]/g, "")?.length > 4;
    if (name?.length > 13 && !isCapitalized) {
      name = name?.substr(0, 13) + "..";
    } else if (isCapitalized) {
      name = name?.substr(0, 9) + "..";
    }
    return name;
  }
  doGifs() {
    this?.dataMenu?.classList?.add("d-none");
    this?.dataGifs?.classList?.remove("d-none");
    this?.favNoGifs?.classList?.add("d-none");
    this?.sideBarSwitchOnlineCounter?.classList?.add("d-none");
    this?.quickhr?.classList?.add("d-none");
    const height = this.sideBarClass.scrollHeight - 150;
    this.gifList.style.maxHeight = height + "px";
    this.gifList.style.marginLeft = "10px";
    this.gifLimit = Math.round(height / 100) * 2 + 2;
    this.sideBarClass.style.display = "block";
    this.resetGifContainer(!0);
    this.doLoadGifs();
  }
  doLoadGifs() {
    let favGifsButton = findNodeInWindowOrParent("#sideBarFavGifs");
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
    this?.giphySearchBar?.addEventListener("keyup", e => {
      e.preventDefault();
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
    let container = this.dataGifs;
    container?.addEventListener("scroll", e => {
      if (this.currentPage == "favoritesgifs") {
        return;
      }
      e.preventDefault();
      const remainingHeight = container.scrollHeight - container.scrollTop;
      if (container.offsetHeight - remainingHeight > -1) {
        this.doGiphy({
          type: this.gifValue == null ? "trending" : "search",
          inputText: this.giphySearchBar,
          noClear: true,
          noTypeCheck: true
        });
      }
    });
    favGifsButton?.addEventListener("click", e => {
      e.preventDefault();
      this.doFavoriteGifs();
    });
  }
  doGiphy(options = {}) {
    if (!this.sidebarOpened) {
      return;
    }
    if (options.noClear && options.type != "trending" && !this.gifValue) {
      return;
    }
    if (!options.noTypeCheck && options.type == "trending" && this.giphyType == "trending") {
      return;
    }
    if (!options.noClear) {
      this.resetGifContainer();
    }
    this.giphyType = options.type;
    this.sideBarClass.style.width = "240px";
    let searchQuery = this.gifValue ? this.gifValue : options.inputText?.value;
    let apiUrl = this.giphyDomain + "?mode=" + options.type + "&limit=" + this.gifLimit + "&offset=" + this.gifOffset;
    if (options.type != "trending") {
      let cleanQuery = searchQuery.replace(new RegExp("['\"<>]", "gi"), "").replace(/\\/gi, "");
      apiUrl += "&q=" + cleanQuery.replace(/\s+/g, "+");
      if (searchQuery.length >= 20) {
        this.gifsType.innerText = cleanQuery.substr(0, 20) + "..";
        addToolTip(this.gifsType, searchQuery, {
          position: "low"
        });
      } else {
        this.gifsType.innerText = cleanQuery;
      }
    } else {
      this.gifsType.innerHTML = "<span data-localize='mob2.trending'>Trending</span>";
      TranslateAll();
    }
    fetch(apiUrl).then(response => response.json()).then(data => {
      this.loadGifsInList(data);
      if (options.inputText && data.data == "" && !options.noClear) {
        this.noResults?.classList?.remove("d-none");
      }
      this.gifOffset += this.gifLimit;
    }).catch(err => console.log("Giphy Error: ", err));
  }
  loadGifsInList(data) {
    if (data) {
      for (let i = 0; i < data?.data?.length; i++) {
        let imgKey = this.getGiphyImageKey(!0);
        let imgData = data?.data[i]?.images?.[imgKey];
        this.appendToGifList({
          width: imgData.width,
          height: imgData.height,
          id: data?.data[i]?.id,
          url: imgData.url?.split("?")[0]
        }, !1, this.gifList);
      }
    }
  }
  appendToGifList(gifData, clear = false, container = null, isMessage = false, scroll = false) {
    if (clear && container) {
      container.innerHTML = "";
    }
    if (!gifData.url) {
      return;
    }
    const msgContainer = findNodeInWindowOrParent("#messagesContainer");
    const util = this.gifUtility;
    const gifUrl = gifData.url;
    let hash = btoa(gifData.id + "_" + gifData.width + "_" + gifData.height + "_" + (isMessage ?? !1));
    if (isMessage) {
      util.optimize(msgContainer);
      util.dumpMemory();
      if (!util.containers.has(msgContainer)) {
        util.containers.add(msgContainer);
        msgContainer.addEventListener("scroll", e => {
          if (!(Math.abs(util.prevScrollY - e.target.scrollTop) < 90)) {
            util.optimize(msgContainer);
            util.prevScrollY = e.target.scrollTop;
          }
        });
      }
    }
    if (util.gifs[hash]) {
      hash += Math.random().toString(36).substring(2, 4);
    }
    let existingNode = null;
    let span = makeElement(null, "span", "imgHolderGif");
    span.style.position = "relative";
    span.style.display = "inline-block";
    let params = gifData;
    params.hash = hash;
    if (isMessage && util.isInGifs(params)) {
      span = null;
      existingNode = util.gifs[hash].fullNode;
      existingNode.className = "imgHolderGif";
    }
    if (!isMessage) {
      this.sendGif(span || existingNode, gifData.url);
    }
    container?.append(span || existingNode);
    if (existingNode) {
      if (scroll) {
        messages?.scrollMessages();
      }
    } else {
      gifData.message = isMessage;
      gifData.scroll = scroll;
      if (isMessage) {
        util.gifs[hash] = new Image();
        util.gifs[hash].url = gifUrl;
        util.gifs[hash].id = gifData?.id;
        util.gifs[hash].container = msgContainer;
        util.gifs[hash].span = span;
        util.gifs[hash].Hash = hash;
        util.gifs[hash].width = isMessage ? gifData.width : 100;
        util.gifs[hash].height = isMessage ? gifData.height : 100;
        util.gifs[hash].loaded = !1;
        util.gifs[hash].src = gifUrl;
        util.gifs[hash].message = isMessage ?? !1;
        util.gifs[hash].obj = gifData;
        util.gifs[hash].className = "gifImageMsg";
        util.gifs[hash].onload = this.gifLoaded.bind(this);
      } else {
        let img = new Image(gifData?.width, gifData?.height);
        img.src = gifData?.url;
        img.loading = "lazy";
        img.className = "gifqbImage skeleton";
        span.appendChild(img);
        img.onload = () => {
          img.classList.remove("skeleton");
          this.addStarToImage(span, gifData);
        };
      }
    }
  }
  gifLoaded(e) {
    const img = e.target;
    const span = img.span;
    if (img?.obj?.scroll) {
      messages?.scrollMessages(true);
    }
    if (!img.loaded) {
      this.gifUtility.gifsMemory += img.width * img.height;
      this.gifUtility.gifs[img.Hash].loaded = true;
      if (this.gifUtility.IsInViewport(span)) {
        span.appendChild(img);
        this.addStarToImage(span, img.obj);
      }
      this.gifUtility.gifs[img.Hash].fullNode = span;
      this.gifUtility.gifs[img.Hash].img = img;
      this.setGifImageListeners(img, img.obj, true);
      span?.classList?.remove("skeleton");
    }
  }
  setGifImageListeners(img = null, data = {}, isFull = false) {
    if (img && isFull && data) {
      img.dataset.big = data?.preview;
      img.addEventListener("click", this.doImageModal);
      if (this.getGifSettings() == "onhover") {
        img.onmouseover = () => {
          img.src = data?.animated;
          img.setAttribute("data-hover", data?.url);
        };
        img.onmouseout = () => {
          img.src = data?.url;
          img.setAttribute("data-hover", data?.animated);
        };
      }
    }
  }
  addStarToImage(container = null, gifData = {}) {
    if (!container || !gifData.id || gifData.message && !config?.MyRegName.length) {
      return;
    }
    if (container.querySelector("[data-gif-id=\"" + gifData.id + "\"]")) {
      return;
    }
    let starImg = makeElement(container, "img", "gifFav" + (gifData.message && _Activity.instance.IsClassic ? " visibilityHidden" : ""), "sideBarFavGif");
    starImg.src = (gifData.message || _Activity.instance.IsClassic ? "" : "www/") + "svg/star.svg";
    starImg.width = 16;
    starImg.dataset.gifId = gifData?.id;
    this.setClassOnStarFavorite(starImg, this.isAddedAsGifFavorite(gifData?.id));
    starImg.addEventListener("click", e => {
      e.stopPropagation();
      this.setClassOnStarFavorite(starImg, this.addRemoveGifFromFavorite(gifData?.id, gifData.message && gifData.animated ? gifData.animated : gifData?.url, gifData.message && gifData.aWidth ? gifData.aWidth : gifData?.width, gifData.message && gifData.aHeight ? gifData.aHeight : gifData?.height));
      if (gifData.updateIfNeeded) {
        setTimeout(() => {
          this.doFavoriteGifs(true);
        }, 400);
      }
    });
  }
  addRemoveGifFromFavorite(gifId, url = null, width = 100, height = 100) {
    let favorites = this.getFavoritesGifs();
    favorites ||= {};
    let added = !1;
    if (favorites[gifId]) {
      delete favorites[gifId];
    } else {
      favorites[gifId] = url + "|" + width + "|" + height;
      added = true;
    }
    this.updateGifInChat(gifId, added);
    saveSetting("favoritesGifs", JSON.stringify(favorites));
    return added;
  }
  updateGifInChat(gifId = null, added = false) {
    if (!gifId) {
      return;
    }
    let stars = document.querySelectorAll("#messages [data-gif-id=\"" + gifId + "\"]");
    if (stars.length) {
      stars.forEach(starImg => {
        this.setClassOnStarFavorite(starImg, added);
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
      let settings = JSON.parse(localStorage.getItem("Settings"))?.favoritesGifs;
      if (settings) {
        return JSON.parse(settings.replace(/”/g, "\""));
      } else {
        return {};
      }
    } catch (e) {
      return {};
    }
  }
  isAddedAsGifFavorite(gifId) {
    if (!gifId) {
      return !1;
    }
    let favorites = this.getFavoritesGifs();
    return favorites && favorites[gifId];
  }
  setClassOnStarFavorite(starImg, active) {
    if (!starImg) {
      return !1;
    }
    if (active) {
      starImg.classList.add("gifActive");
    } else {
      starImg.classList.remove("gifActive");
    }
  }
  resetGifContainer(clearSearch) {
    this.gifList.innerHTML = "";
    this.giphyType = null;
    this.noResults?.classList?.add("d-none");
    this.dataGifs.scrollTop = 0;
    this.sideBarClass.style.width = this.originalWidthQb;
    this?.gifList?.classList?.remove("d-none");
    this?.gifFavoritesList?.classList?.add("d-none");
    if (clearSearch) {
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
  sendGif(el, url) {
    if (url) {
      el?.addEventListener("click", () => {
        this.sendGifAsMainOrPM(url);
      });
    }
  }
  sendGifAsMainOrPM(url) {
    this.toggleSideBar(!1);
    if (!_Activity.instance.IsClassic) {
      return messages.sendMessage(url);
    }
    let pmWrapper = document.getElementById("pmWrapper");
    if (pmWrapper && pmWrapper.innerHTML.length) {
      setPmMode(false, null, null, document);
      return sendPm(pmWrapper.dataset.userno, url);
    } else {
      return messages.sendMessage(url);
    }
  }
  renderGif(options = {}) {
    if (!options.node || !options.text) {
      return;
    }
    let msgTextEl = options.node;
    msgTextEl = options.node.querySelector(".messageText");
    if (!msgTextEl) {
      return;
    }
    let words = options.text.split(" ");
    let found = !1;
    if (words.length > 0) {
      for (let i in words) {
        if (!WordIsLink(words[i]) || !this.isGiphyLink(words[i]) || found) {
          continue;
        }
        let parts = words[i].split("/");
        let gifId = !!parts && parts[parts.length - 2];
        if (gifId) {
          this.getGifInformation({
            gifId: gifId,
            link: words[i]
          }, info => {
            if (info?.url && info?.statusCode == 200) {
              let errMsg = GetTranslation("mob2.giflinkremoved");
              errMsg ||= "Your GIF was not sent as it might be inappropriate.";
              let isInappropriate = false;
              if (info.rating == "" || info.rating && ["pg-13", "r"].indexOf(info.rating.toLowerCase()) >= 0) {
                isInappropriate = true;
              }
              if (isInappropriate) {
                messages?.deleteMsg(options.msgId);
                if (options.isSelf && options.showWarning) {
                  messages?.sendHelpMsg(options.msgId, "<inf8> " + errMsg, "Warning", true);
                }
              } else {
                info.id = gifId;
                this.appendToGifList(info, false, msgTextEl, true, options.shouldScroll);
              }
            } else {
              const giphyEl = msgTextEl?.querySelector("[data-giphy]");
              giphyEl?.classList?.remove("d-none");
            }
          });
          found = true;
        }
      }
    }
  }
  getGifInformation(options = {}, callback) {
    if (!options.gifId) {
      return callback(!1);
    }
    let imgKey = this.getGiphyImageKey();
    let cacheKey = this.getCacheKeyForGif(options.gifId);
    if (this.isGifDataInCache(cacheKey)) {
      callback(this.cachedGifsData[cacheKey]);
    } else {
      fetch(this.giphyDomain + "?mode=getgif&gifId=" + options.gifId).then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        callback({});
      }).then(json => {
        let info = {};
        const statusCode = json?.meta?.error_code ?? 200;
        if (json?.data?.images?.[imgKey]) {
          let img = json?.data?.images?.[imgKey];
          let smallImg = json?.data?.images?.fixed_width_small;
          info = {
            width: img?.width >= 300 ? img?.width / 2 : img?.width || 95,
            height: img?.height || 95,
            url: img?.url.split("?")[0] || options.link,
            preview: json?.data?.images?.original?.url.split("?")[0],
            animated: smallImg?.url.split("?")[0],
            aWidth: smallImg?.width,
            aHeight: smallImg?.height,
            rating: json?.data?.rating
          };
        }
        info.statusCode = statusCode;
        callback(info);
        this.cachedGifsData[cacheKey] = info;
      }).catch(err => {
        console.info(err);
        callback({});
      });
    }
  }
  isGifDataInCache(key) {
    return !!key && this.cachedGifsData[key];
  }
  getCacheKeyForGif(gifId) {
    if (gifId) {
      return gifId + "_" + this.getGiphyImageKey();
    } else {
      return "";
    }
  }
  getGiphyImageKey(isSmall) {
    if (isSmall) {
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
  doImageModal(e) {
    if (!e) {
      return;
    }
    modalClose();
    let modal = makeElement(document.body, "div", "modalDialog");
    modal.id = "openModal";
    modal.onclick = () => {
      modalClose();
    };
    let div = makeElement(modal, "div");
    let link = makeElement(div, "a");
    let imgUrl = e?.target?.dataset?.big || e?.target?.src;
    link.href = imgUrl;
    link.target = "_blank";
    let img = makeElement(link, "img");
    img.src = imgUrl;
    img.className = "imageModal";
    if (!_Activity.instance.IsClassic) {
      img.style.maxWidth = window.innerWidth - 100 + "px";
    }
    CacheHiddenDivs();
    modal.style.opacity = 1;
    modal.style.pointerEvents = "auto";
  }
  isGiphyLink(url) {
    if (!url || url.indexOf("giphy.com") == -1) {
      return !1;
    }
    try {
      let uri = new URL(url);
      let hostname = uri?.hostname;
      if (hostname && hostname.substring(hostname.length - 9) === "giphy.com" && url.match(/\.(gif)/g)) {
        return !0;
      }
    } catch (e) {
      return !1;
    }
  }
  doFavoriteGifs(force = false) {
    this.gifsType.innerHTML = "<span data-localize='mob2.favs'>Favorites</span>";
    this.giphySearchBar.value = null;
    TranslateAll();
    if (!force && this.currentPage == "favoritesgifs") {
      return this.doGifs();
    }
    this.sideBarClass.style.width = "240px";
    this.currentPage = "favoritesgifs";
    if (this.gifFavoritesList) {
      const height = this.sideBarClass.scrollHeight - 150;
      this.gifFavoritesList.style.maxHeight = height + "px";
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
    let favorites = this?.getFavoritesGifs();
    if (Object.keys(favorites).length) {
      let i = 0;
      for (let gifId in favorites) {
        let parts = favorites[gifId].split("|");
        if (!(parts.length < 3)) {
          this?.appendToGifList({
            width: parts[1],
            height: parts[2],
            id: gifId,
            url: parts[0],
            updateIfNeeded: true
          }, i === 0, this?.gifFavoritesList);
          i += 1;
        }
      }
    } else {
      this?.favNoGifs?.classList?.remove("d-none");
    }
  }
  hasGiphyLinkInText(text = null) {
    if (!text) {
      return !1;
    }
    text = text.split(" ");
    for (let i in text) {
      if (WordIsLink(text[i]) && this.isGiphyLink(text[i])) {
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
  doListFromObj(opts) {
    let list = opts.list || {};
    if (opts.refreshList) {
      switch (opts.type) {
        case "ignore":
          list = getIgnoredUsers();
          break;
        case "block":
          list = getBlockedUsers();
      }
    }
    if (opts.classNode) {
      opts.classNode?.classList?.remove("d-none");
    }
    if (opts.htmlNode && (opts.htmlNode.innerHTML = "", Object.keys(list).length > 0)) {
      for (let xatId in list) {
        let itemEl = makeElement(opts.htmlNode, "div");
        itemEl.id = "sideBar" + xatId;
        let img = makeElement(itemEl, "img");
        img.src = (_Activity.instance.IsClassic ? "" : "www/") + "svg/" + (opts.icon ? opts.icon : "ignored") + ".svg";
        img.width = 16;
        img.style.margin = "-4px 6px 0 0";
        let span = makeElement(itemEl, "span");
        span.id = "sideBarSpan" + xatId;
        span.innerHTML = opts.type == "block" ? list[xatId] : xatId;
        addToolTip(span, ["box.140", "view xat.me"], {
          position: "low"
        });
        let delImg = makeElement(itemEl, "img");
        delImg.id = "sideBarDelete" + xatId;
        if (_Activity.instance.IsClassic) {
          delImg.src = "svg/remove" + (toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg";
        } else {
          delImg.src = "www/svg/removew.svg";
        }
        delImg.width = "15";
        delImg.classList.add("favdel");
        if (!_Activity.instance.IsClassic) {
          delImg.style.marginTop = "4px";
        }
        delImg.dataset.xatid = xatId;
        if (!_Activity.instance.IsClassic) {
          delImg.style.display = "inline-block";
        }
        delImg.addEventListener("click", e => {
          if (e.target.dataset.xatid) {
            if (opts.type && opts.type == "ignore") {
              unignoreUser(xatId);
            } else {
              unblockUser(xatId);
            }
            setTimeout(() => {
              opts.refreshList = true;
              this.doListFromObj(opts);
            }, 400);
          }
        });
        itemEl.addEventListener("mouseover", () => {
          if (delImg) {
            delImg.style.display = "inline-block";
          }
        });
        itemEl.addEventListener("mouseout", () => {
          if (delImg) {
            delImg.style.display = "none";
          }
        });
        span.addEventListener("click", () => {
          HitWeb("https://xat.me/" + xatId);
        });
      }
    }
  }
  reloadSideBar() {
    let status = hasDarkMode() ? "enable" : "disable";
    this.doHideUserslist(null, null, hasHideUserlist() || "disable");
    this.doDarkMode(null, null, hasDarkMode() || "disable");
    this.doStealthMode(null, null, hasStealthMode() || "disable");
    if (_Activity.instance.IsClassic) {
      this.updateScroll(status);
      this.updateChatDelIcon(status);
    }
    updateAllFrame(status);
  }
  doClassicDialog(page) {
    resetPstylePreview();
    const params = {
      UserNo: config?.MyId
    };
    let opts = params;
    opts.tab = page == "settings" ? "general" : "translator";
    this.toggleSideBar(!1);
    classicSetDialog("actions", config?.MyId);
    classicSetDialog("settings", opts);
  }
  doHitWiki(url) {
    HitWeb(url);
  }
  doHitEvents() {
    this.doHitWiki(xatdomain + "/" + keywords?.events);
  }
  doDarkMode(el, isInput, forceStatus) {
    let isDark = hasDarkMode();
    let status = forceStatus || (isDark ? "disable" : "enable");
    if (!forceStatus) {
      saveSetting("darkmode", status);
    }
    if (!isInput || !el) {
      el = findNodeInWindowOrParent("#sideBarSwitchSetdarkmode");
    }
    this.setToggle(el, status);
    setdarkmode(status);
    updateAllFrame(status);
    if (_Activity.instance.IsClassic) {
      this.updateChatDelIcon(status);
      this.updateScroll(status);
    }
  }
  doHideUserslist(el, isInput, forceStatus) {
    if (!Classic) {
      return;
    }
    let hasHide = hasHideUserlist();
    let status = forceStatus || (hasHide == "enable" ? "disable" : "enable");
    if (!forceStatus) {
      saveSetting("hideuserlist", status);
    }
    if (!isInput || !el) {
      el = findNodeInWindowOrParent("#sideBarSwitchSethideuserslist");
    }
    this.setToggle(el, status);
    this.setHideUserlist(status);
    bodyResize(null);
  }
  setHideUserlist(status) {
    if (status && status != "enable") {
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
  doStealthMode(el, isInput, forceStatus) {
    let isStealth = hasStealthMode();
    let status = forceStatus || (isStealth ? "disable" : "enable");
    if (!forceStatus) {
      saveSetting("Stealth", status, true);
    }
    if (!isInput || !el) {
      el = findNodeInWindowOrParent("#sideBarSwitchSetstealthmode");
    }
    this.setToggle(el, status);
    if (!forceStatus && typeof reloadChat == "function") {
      window.reloadChat();
    }
  }
  updateScroll(status) {
    let el = document.querySelector("#scrollText");
    if (el) {
      if (el.dataset && el.dataset.hasColor) {
        return el.classList.remove("darkScroll");
      } else if (status == "enable") {
        return el.classList.add("darkScroll");
      } else {
        return el.classList.remove("darkScroll");
      }
    }
  }
  updateChatDelIcon(status) {
    const icons = findNodeInWindowOrParent(".chatdel .svgBack", !0);
    if (icons) {
      icons.forEach(path => status == "enable" ? path.classList.add("darkDel") : path.classList.remove("darkDel"));
    }
  }
  doGroupsPowers(isRefresh, powerName) {
    if (isRefresh == "false") {
      isRefresh = false;
    }
    let isLoading = !1;
    if (!Object.keys(this.cachedGroupsPowers).length || isRefresh) {
      ToC({
        Command: "GetUsersGroupsPowers"
      });
      if (isRefresh) {
        return;
      }
      isLoading = !0;
    }
    this.powerNameForAssign = powerName;
    this.toggleSideBar(!1);
    return this.setGroupsPowers(!1, isLoading);
  }
  setGroupsPowers(data, isLoading) {
    if (data) {
      try {
        data = JSON.parse(data);
        this.cachedGroupsPowers = data;
        isLoading = !1;
      } catch (e) {
        this.cachedGroupsPowers = [];
      }
    }
    customModalWithMsg(["mob2.grouppowersmanager", "Group powers manager"], "", !0, !1, !0);
    let body = document.querySelector(".NewdialogBody");
    let wrapper = document.querySelector("#wrapper");
    if (!body || !wrapper) {
      return;
    }
    wrapper?.classList?.remove("wrapper");
    let searchTranslation = GetTranslation("mob2.search");
    searchTranslation ||= "search";
    wrapper.innerHTML += "\n            <div class=\"" + (Object.keys(this.cachedGroupsPowers).length || isLoading ? "d-none" : "data-gp-error") + "\" data-localize=\"mob2.havenogp\">You have no group powers</div>\n            <div style=\"margin: 10px 0 5px 8px\" class=\"" + (isLoading ? "data-gp-info" : "d-none") + "\" data-localize=\"mob2.loadinggroupspowers\">Loading group powers.</div>\n            <div class=\"d-none\" data-gp-info></div>\n            <div class=\"d-none\" data-gp-error></div>\n            <div class=\"d-none\" id=\"loading\"></div>\n            <div class=\"" + (!Object.keys(this.cachedGroupsPowers).length || isLoading ? "d-none" : "") + "\" style=\"margin-top: .5rem; padding:9px\" data-gp>\n                <div class=\"row_gp\">\n                    <div class=\"xGroup horizontal\">\n                        <input type=\"text\" class=\"xInput wide\" id=\"searchGp\" style=\"padding:3px;\" placeholder=\"" + searchTranslation + "\" value=\"" + (this.powerNameForAssign ? this.powerNameForAssign : "") + "\">\n                    </div>\n                </div>\n                <table class=\"gptable\">\n                    <thead class=\"row_gp\" data-gp-header>\n                        <th scope=\"col\" data-localize=\"mob2.power\" class=\"head_col_pow\">Power</th>\n                        <th scope=\"col\" data-localize=\"mob2.left\">Left</th>\n                        <th scope=\"col\" data-localize=\"mob2.assigned\">Assigned</th>\n                        <th scope=\"col\" data-localize=\"mob2.amount\">Amount</th>\n                        <th scope=\"col\" data-localize=\"mob2.assign\">Assign</th>\n                        <th scope=\"col\" data-localize=\"mob2.unassign\">Unassign</th>\n                    </thead>\n                    <tbody data-gp-rows></tbody>\n                </table>\n            </div>\n        ";
    this.setGpHtml();
    this.setGpSearch();
    ColorTitle();
    setButCols(config.ButCol, config.ButColW);
    setCstyle();
    TranslateAll();
  }
  setGpHtml() {
    let tbody = document.querySelector("[data-gp-rows]");
    let chatId = config?.chatid;
    tbody.innerHTML = "";
    let totalPowers = Object.keys(this.cachedGroupsPowers).length;
    if (totalPowers) {
      let hiddenCount = 0;
      for (let powerId in this.cachedGroupsPowers) {
        try {
          let powerData = JSON.parse(this.cachedGroupsPowers[powerId].replace(/`/gi, "\""));
          let info = {
            canUnassign: !1,
            amount: 0,
            left: parseInt(powerData?.amount)
          };
          if (powerData?.infos !== undefined) {
            let infoParts = powerData?.infos?.split("|");
            let totalAssigned = 0;
            for (let j in infoParts) {
              let part = infoParts[j]?.split("=");
              if (part[0]) {
                part[1] ||= 1;
                totalAssigned += parseInt(part[1]);
                if (part[0] == chatId) {
                  info.canUnassign = true;
                  info.amount = parseInt(part[1]);
                }
              }
            }
            let remaining = info?.left - totalAssigned;
            info.left = remaining >= 0 ? remaining : 0;
          }
          let row = makeElement(tbody, "tr", "row_gp");
          row.dataset.powerName = powerData?.name;
          row.dataset.powerId = powerId;
          row.dataset.isPowerRow = !0;
          if (this.powerNameForAssign && powerData?.name !== this.powerNameForAssign) {
            hiddenCount++;
            row.style.display = "none";
          }
          let nameCell = makeElement(row, "td", "col_pow");
          let icon = makeElement(nameCell, "img");
          icon.style.marginRight = "8px";
          icon.width = "23";
          icon.src = xatdomain + "/images/smw/" + powerData?.name + ".png";
          makeElement(nameCell, "span").innerText = powerData?.name;
          let leftCell = makeElement(row, "td", "col_left");
          leftCell.setAttribute("data-label", "Left");
          leftCell.innerText = info?.left;
          let assignedCell = makeElement(row, "td", "col_assigned");
          assignedCell.setAttribute("data-label", "Assigned");
          assignedCell.innerText = info?.amount;
          let amountCell = makeElement(row, "td", "col_amount");
          amountCell.setAttribute("data-label", "Amount");
          let amountInput = makeElement(amountCell, "input", "xInput wide gpInput");
          amountInput.type = "number";
          amountInput.style.width = "65px";
          let assignCell = makeElement(row, "td", "col_assign");
          let assignBtn = makeElement(assignCell, "button", "xButton gpButton gpAsigBut", "assign_" + powerId);
          addText(assignBtn, "+");
          if (info?.left < 1) {
            assignBtn.disabled = true;
          }
          assignBtn.addEventListener("click", e => {
            e.preventDefault();
            let val = parseInt(amountInput.value);
            let left = parseInt(info?.left);
            let assigned = parseInt(info?.amount);
            setLoader(!0);
            return this.handleAssignUnassign({
              amountToAssign: val,
              total: left,
              assigned: assigned,
              powerId: powerId,
              type: "Assign"
            });
          });
          let unassignCell = makeElement(row, "td", "col_unassign");
          let unassignBtn = makeElement(_Activity.instance.IsClassic ? unassignCell : assignCell, "button", "xButton gpButton");
          addText(unassignBtn, "-");
          if (!info?.canUnassign) {
            unassignBtn.disabled = true;
          }
          unassignBtn.addEventListener("click", e => {
            e.preventDefault();
            let val = parseInt(amountInput.value);
            let left = parseInt(info?.left);
            let assigned = parseInt(info?.amount);
            setLoader(!0);
            return this.handleAssignUnassign({
              amountToAssign: val,
              total: left,
              assigned: assigned,
              powerId: powerId,
              type: "Unassign"
            });
          });
        } catch (err) {
          console.error(err);
        }
      }
      if (hiddenCount == totalPowers) {
        this.setGpError("<div data-localize=\"mob2.donthavepower\" data-do-not-have>You do not have the power</div>", 1);
      }
    }
  }
  setGpSearch(clear = false) {
    let input = document.querySelector("#searchGp");
    if (!input) {
      return;
    }
    let rows = document.querySelectorAll("[data-is-power-row]");
    if (rows.length) {
      this.updateGpHeader();
      if (clear) {
        input.value = "";
      }
      input?.addEventListener("keyup", e => {
        let query = e?.target?.value;
        query &&= query.toLowerCase();
        rows?.forEach(row => {
          let powerName = row?.dataset?.powerName;
          if (powerName) {
            if (query.length == 0 || powerName.substring(0, query.length) == query || powerName.indexOf(query) >= 0) {
              row.style.display = "";
            } else {
              row.style.display = "none";
            }
          }
        });
        this.updateGpHeader();
      });
    }
  }
  updateGpHeader() {
    const header = document.querySelector("[data-gp-header]");
    if (!header) {
      return;
    }
    const visibleRows = document.querySelectorAll("[data-gp] tr.row_gp:not([style*=\"display:none\"]):not([style*=\"display: none\"])");
    const allRows = document.querySelectorAll("[data-gp] tr.row_gp");
    allRows?.forEach(row => visibleRows.length > 1 ? row.classList.remove("noBorderRow") : row.classList.add("noBorderRow"));
    header.style.display = visibleRows?.length > 0 ? "" : "none";
  }
  handleAssignUnassign(options) {
    if (!options.amountToAssign || options.amountToAssign < 0) {
      options.amountToAssign = 1;
    }
    options.total ||= 0;
    options.assigned ||= 0;
    if (!options.powerId) {
      return;
    }
    let isAssign = options.type == "Assign" ? 1 : 0;
    ToC({
      Type: "Assign",
      p: options.powerId,
      a: isAssign,
      n: isAssign == 1 ? options.assigned + options.amountToAssign : options.assigned - options.amountToAssign
    });
  }
  setGpError(msg, type) {
    if (!msg) {
      return;
    }
    type = parseInt(type);
    setLoader(!1);
    let el = document.querySelector("" + (type == 1 ? "[data-gp-error]" : "[data-gp-info]"));
    if (!el) {
      AlertMessage(msg);
      return;
    }
    el?.classList?.remove("d-none");
    el.innerHTML = msg;
    let modalPadding = document.querySelector(".gpModal .dialogPadding");
    if (modalPadding) {
      modalPadding.scrollIntoView({
        behavior: "smooth"
      });
    }
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      el?.classList?.add("d-none");
    }, 6000);
  }
  updateGroupower(powerId, assigned, left) {
    if (powerId && assigned && left) {
      try {
        left = xInt(left);
        assigned = xInt(assigned);
        let powers = this.cachedGroupsPowers;
        let powerEntry = powers[powerId];
        if (!powerEntry) {
          return;
        }
        let powerObj = {};
        try {
          powerObj = JSON.parse(powerEntry.replace(/`/gi, "\""));
          powerObj.infos ||= "";
        } catch (e) {}
        let updated = !1;
        let indexToRemove = null;
        if (powerObj?.infos !== undefined) {
          let infoParts = powerObj?.infos?.split("|");
          infoParts = infoParts.filter(p => p);
          if (infoParts.length) {
            for (let i in infoParts) {
              let part = infoParts[i]?.split("=");
              if (part && part[0] && part[0] == config?.chatid) {
                indexToRemove = i;
                part[1] ||= 1;
                part[1] = assigned;
                updated = !0;
                part = part.join("=");
                infoParts[i] = part;
                break;
              }
            }
          }
          if (left == 0 && assigned == 0 && indexToRemove != null) {
            delete infoParts[indexToRemove];
          }
          if (!updated && assigned > 0) {
            infoParts.push(config?.chatid + "=" + assigned);
          }
          infoParts = infoParts.join("|");
          powerObj.infos = infoParts;
          let jsonString = JSON.stringify(powerObj);
          this.cachedGroupsPowers[powerId] = jsonString.replace(/"/gi, "`");
          this.setGpHtml();
          this.setGpSearch(!0);
        }
      } catch (err) {
        this.setGpError("Something went wrong when updating powers list.", 1);
      }
    }
  }
  resetGroupPowersCache() {
    this.cachedGroupsPowers = [];
    this.powerNameForAssign = null;
  }
  getStuffPressed() {
    const body = document.querySelector(".dialogBody");
    if (body) {
      body.style.height = "90%";
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
  isInGifs(params = {}) {
    if (!params.id || !params.hash) {
      return !1;
    }
    const hash = params.hash;
    return hash in this.gifs && params.id.toLowerCase() == this.gifs[hash].id.toLowerCase() && this.gifs[hash].loaded && this.gifs[hash].width_ == params.width && this.gifs[hash].height_ == params.height;
  }
  optimize(container) {
    const gifsInContainer = Object.fromEntries(Object.entries(this.gifs).filter(entry => {
      let [hash, gif] = entry;
      return gif.container == container;
    }));
    for (let hash in gifsInContainer) {
      const gif = this.gifs[hash];
      if (!gif.loaded || !gif.message) {
        continue;
      }
      const span = gif.span;
      const inViewport = this.IsInViewport(span);
      if (!inViewport && span?.firstChild) {
        span.removeChild(span.firstChild);
      } else if (!!inViewport && (!span.innerHTML || !span?.querySelector(".gifqbImage"))) {
        span.appendChild(gif.img);
        _Activity.instance.QuickBar?.addStarToImage(span, gif?.obj);
      }
    }
  }
  dumpMemory(limit = 10000000) {
    if (!(this.gifsMemory <= limit)) {
      this.gifsMemory = 0;
      for (let hash in this.gifs) {
        const gif = this.gifs[hash];
        const span = gif.span;
        if (limit != 0) {
          if (span.innerHTML && span.parentNode) {
            this.gifsMemory += gif.width * gif.height;
          } else {
            delete this.gifs[hash];
          }
        } else {
          span.parentNode?.removeChild(span);
        }
      }
      if (!limit) {
        this.gifs = {};
      }
    }
  }
  IsInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top >= -rect.height / 2 && rect.left >= -rect.width / 2 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  }
}