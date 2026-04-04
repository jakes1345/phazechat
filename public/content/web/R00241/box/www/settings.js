var _Activity;
if (_Activity === undefined) {
  _Activity = parent._Activity !== undefined ? parent._Activity : parent.parent._Activity !== undefined ? parent.parent._Activity : parent.parent.parent._Activity !== undefined ? parent.parent.parent._Activity : {};
}
class SettingsPage {
  constructor() {
    this.bkgTick = 0;
    this.background = null;
    this.Macros = null;
    this.toSave = null;
    this.doReload = !1;
    this.Classic = !0;
    this.translator = null;
    this.Config = null;
    this.currentPage = "general";
    this.pstyleTmpKey = "pstyleTmp";
    this.pstyleSettingName = "pstyle";
    this.macrosTbody = null;
    this.macroToEdit = null;
    this.macrosContainer = null;
    this.addMacroBtn = null;
    this.macroNameInput = null;
    this.macroValueInput = null;
    this.keywords = [];
    this.editKeyword = null;
    this.keywordColor = null;
    this.keywordsList = null;
    this.deleteKeyword = null;
    this.keywordToEdit = null;
    this.keywordNameInput = null;
    this.defaultKeywordColor = "#FFF400";
    this.categoryColor = null;
    this.categories = [];
    this.editCategory = null;
    this.deleteCategory = null;
    this.categoryToEdit = null;
    this.categoriesList = null;
    this.friendsCategories = null;
    this.categoryNameInput = null;
    this.defaultCategoryColor = "#000050";
    this.translator = null;
    this.translatorMsg = null;
    this.translatorContent = null;
    this.translatorContainer = null;
    this.translatorLangs = {
      en: "English",
      sq: "Albanian",
      ar: "Arabic",
      bs: "Bosnian",
      bg: "Bulgarian",
      zh: "Chinese",
      "zh-CN": "Chinese Simplified",
      "zh-TW": "Chinese Traditional",
      hr: "Croatian",
      cs: "Czech",
      da: "Danish",
      nl: "Dutch",
      et: "Estonian",
      tl: "Filipino",
      fi: "Finnish",
      fr: "French",
      gl: "Galician",
      de: "German",
      el: "Greek",
      iw: "Hebrew",
      hi: "Hindi",
      hu: "Hungarian",
      id: "Indonesian",
      it: "Italian",
      ja: "Japanese",
      ko: "Korean",
      lt: "Lithuanian",
      mt: "Maltese",
      no: "Norwegian",
      pl: "Polish",
      "pt-PT": "Portuguese",
      ro: "Romanian",
      ru: "Russian",
      es: "Spanish",
      sr: "Serbian",
      sk: "Slovak",
      sv: "Swedish",
      th: "Thai",
      tr: "Turkish",
      uk: "Ukrainian",
      vi: "Vietnamese"
    };
    this.chatLangs = {
      en: "English",
      es: "Español",
      "pt-br": "Português do Brasil",
      fr: "Français",
      bg: "Bulgarian",
      de: "Deutsch",
      it: "Italiano",
      ar: "العربية",
      bs: "Bosanski",
      el: "Greek",
      hr: "Croatian",
      da: "Dansk",
      et: "Eesti",
      fi: "Suomi",
      nl: "Nederlands",
      pl: "Polski",
      ro: "Română",
      sq: "Shqip",
      sr: "Српски / srpski",
      "sr-el": "srpski (latinica)‎",
      sv: "Svenska",
      th: "ไทย",
      tl: "Tagalog",
      tr: "Türkçe"
    };
    this.rapidActions = {
      ignore: 0,
      guest: 0,
      member: 0,
      kick: 0,
      ban: 0,
      unban: 0,
      gag: 41,
      mute: 46,
      zip: 184,
      snakeban: 134,
      spaceban: 136,
      matchban: 140,
      mazeban: 152,
      codeban: 162,
      reverse: 176,
      slotban: 236
    };
    this.powerIds = {
      kPink: "30",
      kPurple: "35",
      kBlueman: "64",
      kEverypower: "95",
      kGold: "153",
      kRuby: "430",
      kYellow: "700",
      kPawnHue: "728"
    };
    this.SettingsAlreadyBinded = !1;
    this.search = document.getElementById("search");
    this.closeBtn = document.getElementById("closeBtn");
    this.avatarHolder = _Activity.instance.IsClassic && !_Activity.instance.Device ? document.getElementById("avatarHolder") : document.getElementById("avatarHolder2");
    this.translatorMsg = document.getElementById("translatorMsg");
    this.translatorContent = document.getElementById("translatorContent");
    this.translatorContainer = document.getElementById("translator");
    this.keywordsL = document.getElementById("categoriesList");
    this.keywordsList = document.getElementById("keywordsList");
    this.categoriesList = document.getElementById("categoriesList");
    this.macrosContainer = document.getElementById("macrosContainer");
    this.savingSnackbar = new Snackbar(["mob2.saving", "Saving settings, please wait..."]);
    this.macroSnackbar = new Snackbar(["mob2.macroadded", "Macro added successfully."]);
    this.keywordAddedSnackbar = new Snackbar(["mob2.keywordadded", "Keyword added successfully."]);
    this.categoryAddedSnackbar = new Snackbar(["mob2.categoryadded", "Category added successfully."]);
    this.keywordEditedSnackbar = new Snackbar(["mob2.keywordedited", "Keyword edited successfully."]);
    this.categoryEditedSnackbar = new Snackbar(["mob2.categoryedited", "Category edited successfully."]);
    this.translatorSnackbar = new Snackbar(["mob2.translatoron", "Translator enabled successfuly."]);
    this.translatorDisabledSnackbar = new Snackbar(["mob2.translatoroff", "Translator disabled successfuly."]);
    this.settingsSnackbar = new Snackbar(["mob2.settingssaved", "Settings saved successfully."]);
    this.previewPstyle = document.getElementById("previewPstyle");
    this.pawnHueData = _Activity.pawnHueData;
    this.setCurrentPawnPreview(_Activity.pawnHuePreviewCode);
    let _0x320238 = 0;
    this.bkgTick = setInterval(() => {
      if (!this.background && _0x320238 % 12 == 0 && _0x320238 < 450) {
        this.background = this.loadBackground();
      }
      _0x320238++;
    }, 83);
    let _0x1a2f3f = "http://localhost:6969/web_gear/chat/av/" + Math.floor(Math.random() * 1758 + 1) + ".png";
    try {
      const _0x54f62f = JSON.parse(localStorage.getItem("todo"))?.w_avatar?.replace(/﻿/g, "");
      if (_0x54f62f) {
        _0x1a2f3f = _0x54f62f;
      }
    } catch (_0x279c7b) {
      doDebugLogs(3, "Failed to load avatar: " + _0x279c7b);
    }
    const _0x308070 = _0x1a2f3f[0] == "(" ? 30 : 35;
    this.renderAvatar = function () {
      const _0x381178 = localStorage.getItem("avatarSettingsTmp");
      const _0x1ed6db = JSON.parse(localStorage.getItem("Settings") || "{}");
      const _0x1c7c30 = _0x381178 ?? _0x1ed6db.avatarSettings ?? "";
      if (this.avatarHolder) {
        this.avatarHolder.innerHTML = "";
        _Activity.instance.Avatars.MakeAvatar(this.avatarHolder, _0x1a2f3f, {
          size: _0x308070,
          hasAnimate: true,
          hasShuffle: this.Config?.pFlags & NamePowers.shuffle,
          className: "avatar",
          avatarEffect: _0x1c7c30
        });
      }
    };
    this.renderAvatar();
    this.closeBtn.addEventListener("click", this.hideSettigs);
    document.querySelectorAll("[data-target]").forEach(_0x5df2e8 => {
      _0x5df2e8.addEventListener("click", () => {
        this.currentPage = _0x5df2e8.dataset.target;
        if (!_0x5df2e8.classList.contains("active")) {
          const _0x5ef507 = document.querySelector("li.active");
          const _0x3d1291 = document.querySelector(".settings.active");
          const _0x5416d8 = document.querySelector("[data-settings=" + _0x5df2e8.dataset.target + "]");
          _0x5df2e8.classList.add("active");
          _0x5ef507.classList.remove("active");
          _0x5416d8.classList.add("active");
          _0x3d1291.classList.remove("active");
        }
      });
    });
    document.querySelectorAll(".mobileApp").forEach(_0x1a8ddc => {
      if (_0x1a8ddc && (_Activity.instance.IsMobileApp || _Activity.instance.IsClassic && !_Activity.instance.Device)) {
        _0x1a8ddc.style.display = "none";
      }
    });
    TranslateAll();
    reloadPowersBank();
  }
  loadBackground() {
    let _0x18891e = document.getElementById("background");
    if (CSS.supports("backdrop-filter", "none") || CSS.supports("-webkit-backdrop-filter", "none")) {
      _0x18891e = document.body;
    }
    _0x18891e.classList.add("gradient");
    if (this.Config?.background) {
      const _0x25a0be = new Image();
      _0x25a0be.src = this.Config.background.split(";")[0];
      _0x25a0be.onload = () => _0x18891e.style.backgroundImage = "url(" + _0x25a0be.src + ")";
      clearInterval(this.bkgTick);
      return _0x25a0be;
    }
  }
  main(_0x282b32) {
    xatMain(_0x282b32);
    try {
      this.Config = JSON.parse(_0x282b32);
    } catch (_0x3ddb37) {
      doDebugLogs(3, "Failed to set config: " + _0x3ddb37);
    }
    this.Classic = this.Config.Flags & 1;
    reloadPowersBank();
    if (config.MyRegName === undefined || !config.MyRegName && !_Activity.instance.IsClassic) {
      document.querySelectorAll(".acc").forEach(_0x1b9f16 => {
        if (_0x1b9f16) {
          _0x1b9f16.classList.add("d-none");
        }
      });
    }
  }
  configurePage(_0x5adaed) {
    try {
      this.Config = JSON.parse(_0x5adaed);
    } catch (_0xbb1d0a) {
      doDebugLogs(3, "Failed to load config: " + _0xbb1d0a);
    }
  }
  setSettings(_0x4f63fb) {
    try {
      _Activity.instance.UserSettings = JSON.parse(_0x4f63fb);
    } catch (_0x203117) {
      doDebugLogs(3, "Failed to load user settings: " + _0x203117);
    }
    if (this.SettingsAlreadyBinded) {
      return;
    }
    this.SettingsAlreadyBinded = !0;
    if (_Activity.instance.UserSettings.language === "pt") {
      _Activity.instance.UserSettings.language = "pt-br";
    }
    for (const _0x2b0029 in this.chatLangs) {
      if (this.chatLangs.hasOwnProperty(_0x2b0029)) {
        const _0x9eb865 = makeElement(document.getElementById("language"), "option");
        _0x9eb865.text = this.chatLangs[_0x2b0029];
        _0x9eb865.value = _0x2b0029;
        if (_Activity.instance.UserSettings.language == _0x2b0029) {
          _0x9eb865.selected = true;
        }
      }
    }
    for (const _0x11c92b in this.rapidActions) {
      if (this.rapidActions.hasOwnProperty(_0x11c92b) && (hasPower(this.rapidActions[_0x11c92b]) || this.rapidActions[_0x11c92b] == 0)) {
        const _0x4136ae = makeElement(document.getElementById("rapidAction"), "option");
        _0x4136ae.text = _0x11c92b;
        _0x4136ae.value = _0x11c92b;
        _0x4136ae.dataset.localize = "mob2." + _0x11c92b;
      }
    }
    this.initAllSettings();
    const _0x108e99 = {};
    [...document.querySelectorAll("[data-keywords]")].forEach(_0xbd9c11 => {
      _0x108e99[_0xbd9c11.dataset.settings] = _0xbd9c11.dataset.keywords.split(",");
    });
    this.search.addEventListener("keyup", _0x207248 => {
      const _0x1f434b = this.search.value.trim();
      if (_0x1f434b.length) {
        for (const _0x32da0c in _0x108e99) {
          if (_0x108e99.hasOwnProperty(_0x32da0c) && this.currentPage != _0x32da0c) {
            const _0x2a02f6 = _0x108e99[_0x32da0c];
            for (let _0xb7ceac = 0; _0xb7ceac < _0x2a02f6.length; _0xb7ceac++) {
              if (_0x2a02f6[_0xb7ceac].substr(0, _0x1f434b.length) == _0x1f434b) {
                document.querySelector("[data-target=\"" + _0x32da0c + "\"]").click();
                break;
              }
            }
          }
        }
      }
    });
  }
  initAllSettings() {
    this.initGeneralSetting();
    this.initCallSetting();
    this.initNotificationsSetting();
    this.initMacrosSetting();
    this.initPowersSetting();
    this.initPstyleSetting();
    this.initTranslatorSetting();
    this.initKeywordsSetting();
    this.initCategoriesSetting();
    this.initAcesSetting();
    this.initAvatarSetting();
    this.initAboutSetting();
    this.initAccount();
    this.updateMacrosTable();
    this.updateCategories();
    this.updateKeywords();
  }
  initGeneralSetting() {
    this.saveGeneralBtn = document.getElementById("saveGeneralBtn");
    this.saveAppearanceBtn = document.getElementById("saveAppearanceBtn");
    document.querySelectorAll("[data-setting]").forEach(_0x53639a => {
      if (_0x53639a.dataset.setting == "Stealth" && this.Macros?.Stealth) {
        _0x53639a.value = this.Macros?.Stealth;
      } else if (_Activity.instance.UserSettings[_0x53639a.dataset.setting]) {
        _0x53639a.value = _Activity.instance.UserSettings[_0x53639a.dataset.setting];
      }
    });
    if (this.Config?.pFlags & NamePowers.verified) {
      document.getElementById("showVerified").classList.remove("hidden");
    }
    this.saveGeneralBtn.addEventListener("click", this.saveGeneralEvent.bind(this));
    this.saveAppearanceBtn.addEventListener("click", this.saveGeneralEvent.bind(this));
  }
  saveGeneralEvent(_0x4d3570) {
    this.DisableSaveButtons();
    document.querySelectorAll("[data-setting]").forEach(_0x2314dd => {
      if (_0x2314dd.dataset.setting == "Stealth") {
        this.addMacro(_0x2314dd.dataset.setting, _0x2314dd.value);
      } else {
        this.saveSetting(_0x2314dd.dataset.setting, _0x2314dd.value);
      }
      const _0x1b66e0 = parent.document.getElementById("textEntryEditable");
      if (_0x2314dd.dataset.setting == "textDirection" && _0x1b66e0) {
        _0x1b66e0.style.direction = _0x2314dd.value;
      }
      this.toSave = this.settingsSnackbar;
      this.savingSnackbar.show();
      this.doReload = !0;
      if (_0x2314dd.dataset.setting == "animation") {
        _Activity.instance.Smilies.ReloadAll(_0x2314dd.value == "enable");
        _Activity.instance.Avatars.ReloadAll(_0x2314dd.value == "enable");
      }
      if (_0x2314dd.dataset.setting == "banner" && _Activity.instance.AdBanner) {
        setTimeout(() => {
          _Activity.instance.AdBanner.contentDocument.location.reload(true);
        }, 5000);
      }
    });
  }
  initNotificationsSetting() {
    this.mainChat = document.getElementById("mainchat");
    this.mentions = document.getElementById("mentions");
    this.notifications = document.getElementById("notifications");
    this.saveNotificationsBtn = document.getElementById("saveNotificationsBtn");
    this.testNotif = document.getElementById("testNotif");
    this.mainChat.value = this.Macros?.notify ?? "";
    this.mentions.value = this.Macros?.mentions ?? "";
    this.notifications.value = _Activity.instance.UserSettings?.notifications || "enable";
    this.saveNotificationsBtn.addEventListener("click", () => {
      const _0x580df8 = this.Macros?.notify ?? "";
      const _0x402918 = this.Macros?.mentions ?? "";
      if ((_Activity.instance.UserSettings?.notifications || "enable") != this.notifications.value) {
        this.saveSetting("notifications", this.notifications.value);
      }
      if (_0x580df8 != this.mainChat.value) {
        this.addMacro("notify", this.mainChat.value);
      }
      if (_0x402918 != this.mentions.value) {
        this.addMacro("mentions", this.RemoveHtmlEntities(this.mentions.value).replace(/ /g, ""));
      }
      this.toSave = this.settingsSnackbar;
      this.savingSnackbar.show();
      this.doReload = !0;
      this.DisableSaveButtons();
    });
    this.testNotif.addEventListener("click", settings.sendTestNotification);
  }
  initCallSetting() {
    const _0x2d993b = ["LiveAcceptCalls", "LiveRingingSound", "LiveAppMode"];
    this.saveCalls = document.getElementById("saveCalls");
    this.saveCalls.addEventListener("click", () => {
      _0x2d993b.forEach(_0x120df4 => {
        const _0x1d760d = document.getElementById(_0x120df4);
        if (_0x1d760d && _0x1d760d.value) {
          saveSetting(_0x120df4, _0x1d760d.value);
        }
      });
      this.toSave = this.settingsSnackbar;
      this.savingSnackbar.show();
      this.doReload = !0;
      this.DisableSaveButtons();
    });
  }
  initMacrosSetting() {
    this.addMacroBtn = document.getElementById("addMacroBtn");
    this.macroNameInput = document.getElementById("macroName");
    this.macroValueInput = document.getElementById("macroValue");
    [this.macroNameInput, this.macroValueInput].forEach(_0x4a6fe0 => {
      _0x4a6fe0.addEventListener("keyup", () => {
        if (this.macroNameInput.value.length && this.macroValueInput.value.length) {
          this.addMacroBtn.disabled = false;
        } else {
          this.addMacroBtn.disabled = true;
        }
      });
    });
    this.addMacroBtn.addEventListener("click", () => {
      const _0x2591f0 = this.RemoveHtmlEntities(this.macroNameInput.value).replace(/ /g, "");
      const _0x3ff732 = this.RemoveHtmlEntities(this.macroValueInput.value);
      if (_0x2591f0.length && _0x3ff732.length) {
        this.macroNameInput.value = "";
        this.macroValueInput.value = "";
        if (["Statusfx", "Stealth"].includes(_0x2591f0)) {
          return;
        }
        if (!Object.keys(this.cleanMacrosObj(this.Macros))?.length) {
          this.macrosContainer.innerHTML = "";
        }
        if (this.macroToEdit != null) {
          this.removeMacro(this.macroToEdit);
          this.addMacroBtn.innerText = "";
          addText(this.addMacroBtn, ["mob2.add", "Add"]);
        }
        this.addMacro(_0x2591f0, _0x3ff732);
        this.Macros[_0x2591f0] = _0x3ff732;
        this.addMacroRow(_0x2591f0, _0x3ff732, this.macroToEdit);
        this.macroToEdit = null;
        this.toSave = this.macroSnackbar;
        this.savingSnackbar.show();
      }
    });
  }
  setMacros(_0x3f19ea) {
    try {
      this.Macros = JSON.parse(_0x3f19ea);
    } catch (_0xda4707) {
      doDebugLogs(3, "setMacro() error: " + _0xda4707);
    }
  }
  addMacro(_0x132eaa, _0x1af22f) {
    if (_0x132eaa == "zz") {
      _0x132eaa = _0x1af22f = "";
    }
    this.sendApp({
      Type: "Macro",
      Command: "Macro",
      Name: _0x132eaa,
      Value: _0x1af22f
    });
  }
  addMacroRow(_0x2ca13a, _0x133a5a, _0x8b66b3 = false) {
    if (!this.macrosTbody || !this.macrosContainer?.innerHTML) {
      this.addMacrosTable();
    }
    if (["Statusfx", "Stealth"].includes(_0x2ca13a)) {
      return;
    }
    const _0x21b720 = _0x8b66b3 ? this.macrosTbody?.querySelector("[data-id=\"" + _0x8b66b3 + "\"]") : this.macrosTbody?.querySelector("[data-id=\"" + _0x2ca13a + "\"]");
    if (_0x21b720) {
      _0x21b720.querySelector(".macroName").innerText = this.truncateMacroIfTooLong(_0x2ca13a);
      _0x21b720.querySelector(".macroValue").innerText = this.truncateMacroIfTooLong(_0x133a5a);
    } else {
      const _0x505af8 = makeElement(this.macrosTbody, "tr");
      _0x505af8.setAttribute("data-id", this.truncateMacroIfTooLong(_0x2ca13a));
      animateFrom(_0x505af8, {
        opacity: 0,
        transform: "translateY(1rem)",
        offset: 0
      }, {
        duration: 250,
        easing: "ease-in"
      });
      addText(makeElement(_0x505af8, "td", "macroName"), this.truncateMacroIfTooLong(_0x2ca13a));
      addText(makeElement(_0x505af8, "td", "macroValue"), this.truncateMacroIfTooLong(_0x133a5a));
      const _0x194efa = makeElement(makeElement(_0x505af8, "td"), "div", "macroTools");
      const _0x3fd391 = makeElement(_0x194efa, "span");
      _0x3fd391.setAttribute("data-edit", this.truncateMacroIfTooLong(_0x2ca13a));
      makeElement(_0x3fd391, "img").setAttribute("src", "svg/pencil.svg");
      const _0x4a7ed0 = makeElement(_0x194efa, "span");
      _0x4a7ed0.setAttribute("data-delete", this.truncateMacroIfTooLong(_0x2ca13a));
      makeElement(_0x4a7ed0, "img").setAttribute("src", "svg/xdelete.svg");
      addToolTip(_0x3fd391, ["mob2.editmacro", "Edit Macro"]);
      addToolTip(_0x4a7ed0, ["mob2.deletemacro", "Delete Macro"]);
      _0x4a7ed0.addEventListener("click", () => {
        animateTo(_0x505af8, [{
          opacity: 1,
          transform: "translateX(0rem)"
        }, {
          opacity: 0,
          transform: "translateX(10rem)"
        }], {
          duration: 300,
          easing: "ease-out"
        }, () => {
          if (Object.keys(this.cleanMacrosObj(this.Macros))?.length) {
            _0x505af8.remove();
          } else {
            this.macrosContainer.innerHTML = "";
            this.addAnimatedText(makeElement(this.macrosContainer, "p"), ["mob2.nomacros", "You haven't added any macro yet."]);
          }
        });
        this.removeMacro(_0x2ca13a);
      });
      _0x3fd391.addEventListener("click", () => {
        this.addMacroBtn.innerText = "";
        addText(this.addMacroBtn, ["mob2.edit", "Edit"]);
        this.macroToEdit = _0x2ca13a;
        this.macroNameInput.value = _0x2ca13a;
        this.macroValueInput.value = _0x133a5a;
      });
    }
    this.macrosContainer.scrollTop = this.macrosContainer.scrollHeight;
  }
  truncateMacroIfTooLong(_0x2bc079) {
    if (_0x2bc079) {
      if (_0x2bc079.length > 15) {
        return _0x2bc079.substr(0, 15) + "...";
      } else {
        return _0x2bc079;
      }
    } else {
      return "";
    }
  }
  removeMacro(_0x2e8ca3) {
    delete this.Macros[_0x2e8ca3];
    this.sendApp({
      Type: "Macro",
      Command: "Macro",
      Name: _0x2e8ca3,
      Value: ""
    });
  }
  cleanMacrosObj(_0x39aa3) {
    const _0x499282 = {
      ..._0x39aa3
    };
    const _0x2c62ca = _0x499282;
    for (let _0x121221 in _0x2c62ca) {
      if (!_0x2c62ca[_0x121221] || !!["sline", "away", "rapid", "status", "mentions", "notify", "Statusfx", "Stealth"].includes(_0x121221)) {
        delete _0x2c62ca[_0x121221];
      }
    }
    return _0x2c62ca;
  }
  addMacrosTable() {
    const _0x477303 = makeElement(this.macrosContainer, "table");
    _0x477303.setAttribute("class", "xTable centered");
    const _0xf6b4bb = makeElement(makeElement(_0x477303, "thead"), "tr");
    addText(makeElement(_0xf6b4bb, "th"), ["mob2.name", "Name"]);
    addText(makeElement(_0xf6b4bb, "th"), ["mob2.value", "Value"]);
    addText(makeElement(_0xf6b4bb, "th"), "&nbsp;", !0);
    this.macrosTbody = makeElement(_0x477303, "tbody");
  }
  updateMacrosTable(_0x1380e0) {
    _0x1380e0 ||= this.Macros;
    this.macrosContainer.innerHTML = "";
    _0x1380e0 = this.cleanMacrosObj(_0x1380e0);
    if (Object.keys(_0x1380e0)?.length) {
      const _0x27c72b = Object.keys(_0x1380e0);
      for (let _0x8f91a0 of _0x27c72b) {
        this.addMacroRow(_0x8f91a0, _0x1380e0[_0x8f91a0]);
      }
    } else {
      this.addAnimatedText(makeElement(this.macrosContainer, "p"), ["mob2.nomacros", "You haven't added any macro yet."]);
    }
  }
  initPowersSetting() {
    this.away = document.getElementById("away");
    this.statusfx = document.getElementById("statusfx");
    this.statusSpeed = document.getElementById("statusSpeed");
    this.status2 = document.getElementById("status2");
    this.waveFrequency = document.getElementById("waveFrequency");
    this.gback = document.getElementById("gback");
    this.stickers = document.getElementById("stickers");
    this.xavi = document.getElementById("xavi");
    this.pcplus = document.getElementById("pcplus");
    this.rapidAction = document.getElementById("rapidAction");
    this.rapidTime = document.getElementById("rapidTime");
    this.rapidReason = document.getElementById("rapidReason");
    this.sline = document.getElementById("sline");
    this.goodfriend_all = document.getElementById("goodfriend_all");
    this.goodfriend_list = document.getElementById("goodfriend_list");
    this.savePowers = document.getElementById("savePowers");
    this.wOption = document.getElementById("w_Options");
    let _0x43d6c6 = GetTranslation("mob2.goodfriendallplaceholder");
    if (_0x43d6c6) {
      this.goodfriend_all.placeholder = _0x43d6c6;
    }
    let _0x3e8cf3 = GetTranslation("mob2.goodfriendlistplaceholder");
    if (_0x3e8cf3) {
      this.goodfriend_list.placeholder = _0x3e8cf3;
    }
    document.querySelectorAll("[data-settings=\"powers\"] [data-power]").forEach(_0x21265c => {
      const _0x4b19d5 = _0x21265c.dataset.power;
      _0x21265c.classList.remove("disabled");
      if (!hasPower(_0x4b19d5)) {
        _0x21265c.classList.add("disabled");
      }
    });
    const _0x3a231d = hasPower(StatusfxId);
    StatusEffects.forEach(_0x203d66 => {
      if (_0x203d66.set <= _0x3a231d) {
        const _0x177629 = makeElement(this.statusfx, "option");
        _0x177629.dataset.localize = "mob2.statusfx" + _0x203d66.key;
        _0x177629.value = _0x203d66.key;
        _0x177629.innerText = _0x203d66.name;
      }
    });
    if (this.Macros?.away) {
      this.away.value = this.Macros.away;
    }
    if (this.Macros?.sline) {
      this.sline.value = this.Macros.sline.replace(/ /g, "");
    }
    if (_Activity.instance.UserSettings?.xavi) {
      this.xavi.value = _Activity.instance.UserSettings.xavi;
    }
    if (_Activity.instance.UserSettings?.pcplus) {
      this.pcplus.value = _Activity.instance.UserSettings.pcplus;
    }
    if (_Activity.instance.UserSettings?.gback) {
      this.gback.value = _Activity.instance.UserSettings.gback;
    }
    if (_Activity.instance.UserSettings?.sticker) {
      this.stickers.value = _Activity.instance.UserSettings.sticker;
    }
    if (_Activity.instance.UserSettings?.goodfriends) {
      this.goodfriend_list.value = _Activity.instance.UserSettings.goodfriends;
    }
    if (_Activity.instance.UserSettings?.goodfriends_all) {
      this.goodfriend_all.value = _Activity.instance.UserSettings.goodfriends_all;
    }
    if (_Activity.instance.UserSettings?.w_Options) {
      this.wOption.value = _Activity.instance.UserSettings.w_Options;
    }
    const _0x4a956f = () => {
      if (["fadeout", "scrollup", "scrolldown", "typing"].includes(this.statusfx.value)) {
        this.status2.classList.remove("hidden");
      } else {
        this.status2.classList.add("hidden");
      }
      if (this.statusfx.value == "wave") {
        this.waveFrequency.classList.remove("hidden");
      } else {
        this.waveFrequency.classList.add("hidden");
      }
    };
    const _0x4e6353 = makeElement(this.statusfx, "option");
    _0x4e6353.value = "noeffect";
    _0x4e6353.dataset.localize = "mob2.statusfxnoeffect";
    _0x4e6353.innerText = "No Effect";
    this.statusfx.value = "noeffect";
    TranslateAll();
    try {
      if (this.Macros?.Statusfx) {
        let _0x5dbaa5 = JSON.parse(decodeURIComponent(escape(atob(this.Macros.Statusfx.replace(/\s+/g, "")))));
        this.status2.value = _0x5dbaa5?.status2 || "";
        this.statusfx.value = _0x5dbaa5?.effect || "noeffect";
        this.statusSpeed.value = Math.max(1, Math.min(6, _0x5dbaa5?.speed || 3));
        this.waveFrequency.value = Math.max(1, Math.min(6, _0x5dbaa5?.waveFrequency || 3));
        _0x4a956f.bind(this)();
      }
    } catch (_0x22c128) {
      doDebugLogs(3, "Failed to load statusfx: " + _0x22c128 + ", " + this.Macros?.Statusfx);
    }
    addToolTip(this.statusfx, ["mob2.effect", "Effect"]);
    addToolTip(this.status2, ["mob2.status2", "Second Status"]);
    addToolTip(this.statusSpeed, ["mob2.statusspeed", "Status Speed"]);
    addToolTip(this.waveFrequency, ["mob2.wavefrequency", "Wave Frequency"]);
    this.statusfx.addEventListener("change", _0x4a956f.bind(this));
    if (hasPower(441)) {
      this.rapidReason.disabled = false;
    }
    const _0xdd9522 = this.Macros?.rapid?.split(",");
    if (_0xdd9522) {
      this.rapidAction.value = _0xdd9522[0];
      this.rapidTime.value = _0xdd9522[1] || 0;
      this.rapidReason.value = _0xdd9522[2]?.trim() ?? "";
    }
    this.savePowers.addEventListener("click", _0xe6206a => {
      if (xInt(this.away.value) < 60) {
        this.away.value = 60;
      } else if (xInt(this.away.value) > 3600) {
        this.away.value = 3600;
      }
      const _0x5d3668 = this.Macros.away;
      const _0x137522 = this.away.value;
      if (_0x137522 != _0x5d3668 && hasPower(144)) {
        this.addMacro("away", _0x137522);
      }
      const _0x381b17 = {
        effect: this.statusfx.value,
        speed: Math.max(1, Math.min(6, this.statusSpeed.value)),
        status2: this.status2.value || "",
        waveFrequency: Math.max(1, Math.min(6, this.waveFrequency.value))
      };
      const _0x9f9870 = btoa(unescape(encodeURIComponent(JSON.stringify(_0x381b17)))).replace(/\s+/g, "");
      this.addMacro("Statusfx", _0x9f9870);
      let _0x1b14dd = [];
      const _0x18c067 = this.Macros.rapid;
      _0x1b14dd.push(this.rapidAction.value ?? "");
      _0x1b14dd.push(this.rapidTime.value || 0);
      if (hasPower(441)) {
        _0x1b14dd.push(this.rapidReason.value.replace(/,/g, "").trim() ?? "");
      }
      _0x1b14dd = _0x1b14dd.join(",");
      if (_0x1b14dd != _0x18c067 && hasPower(91)) {
        this.addMacro("rapid", _0x1b14dd);
      }
      const _0x465490 = Macros?.sline;
      if (hasPower(452) && this.sline.value != _0x465490) {
        this.addMacro("sline", this.sline.value.replace(/ /g, ""));
      }
      const _0x1e1210 = _Activity.instance.UserSettings?.gback;
      if (_0x1e1210 != this.gback.value) {
        saveSetting("gback", this.gback.value);
      }
      const _0x14826e = _Activity.instance.UserSettings?.stickers;
      if (_0x14826e != this.stickers.value) {
        saveSetting("stickers", this.stickers.value);
      }
      const _0x3e2bd9 = _Activity.instance.UserSettings?.xavi;
      if (_0x3e2bd9 != this.xavi.value) {
        saveSetting("xavi", this.xavi.value);
      }
      const _0x272259 = _Activity.instance.UserSettings?.pcplus;
      if (_0x272259 != this.pcplus.value) {
        saveSetting("pcplus", this.pcplus.value);
      }
      const _0x557e09 = _Activity.instance.UserSettings?.goodfriends_all;
      if (_0x557e09 != this.goodfriend_all.value) {
        saveSetting("goodfriends_all", this.goodfriend_all.value);
      }
      const _0x4098d9 = _Activity.instance.UserSettings?.goodfriends;
      if (_0x4098d9 != this.goodfriend_list.value) {
        saveSetting("goodfriends", this.goodfriend_list.value);
      }
      const _0x467844 = _Activity.instance.UserSettings?.w_Options;
      if (_0x467844 != this.wOption.value) {
        saveSetting("w_Options", this.wOption.value);
      }
      this.toSave = this.settingsSnackbar;
      this.savingSnackbar.show();
      this.doReload = !0;
      this.DisableSaveButtons();
    });
  }
  initPstyleSetting() {
    this.keywordsList.innerHTML = "";
    const _0x25af3e = this.getPstyleToUse();
    this.pstyle = document.getElementById("pstyle");
    this.pstylePos = document.getElementById("pstylePos");
    this.pstylecol = document.getElementById("pstylecol");
    this.pstyleicon = document.getElementById("pstyleicon");
    this.pstylegradient = document.getElementById("pstylegradient");
    this.savePstyle = document.getElementById("savePstyle");
    this.pscircle = document.getElementById("pscircle");
    this.psThemeText = document.getElementById("psThemeText");
    this.needPstyle = document.querySelector(".needPstyle");
    this.sunBurst = document.querySelector("option[value=\"pg7\"]");
    this.mushRoom = document.querySelector("option[value=\"pg8\"]");
    this.emerald = document.querySelector("option[value=\"pg9\"]");
    this.superNova = document.querySelector("option[value=\"pg10\"]");
    this.halloween = document.querySelector("option[value=\"pg11\"]");
    this.morgana = document.querySelector("option[value=\"pg12\"]");
    this.lems = document.querySelector("option[value=\"pg13\"]");
    this.kitsune = document.querySelector("option[value=\"pg14\"]");
    let _0x15e2a6 = null;
    this.colorPicker();
    this.autoColor(this.pstyle);
    this.autoColor(this.pstylecol);
    doDebugLogs(1, "Loaded the following pstyle:\n\n" + _0x25af3e);
    this.pstyle.addEventListener("keyup", _0x1cec1f => {
      this.pickrSet(this.pstyle, this.pstyle.value, !0);
    });
    if (!hasPower(672)) {
      this.savePstyle.disabled = !0;
      this.previewPstyle.disabled = !0;
      this.addAnimatedText(this.needPstyle, ["mob2.needpower", "You need $1 power to use this feature.", "Pstyle"]);
      return;
    }
    if (!hasPower(700) && this.sunBurst) {
      this.sunBurst.disabled = true;
    }
    if (!hasPower(704) && this.mushRoom) {
      this.mushRoom.disabled = true;
    }
    if (!hasPower(95) && this.emerald) {
      this.emerald.disabled = true;
    }
    if (!hasPower(95) && this.superNova) {
      this.superNova.disabled = true;
    }
    if (!hasPower(729) && this.halloween) {
      this.halloween.disabled = true;
    }
    if (!hasPower(730) && this.morgana) {
      this.morgana.disabled = true;
    }
    if (!hasPower(731) && this.lems) {
      this.lems.disabled = true;
    }
    if (!hasPower(737) && this.kitsune) {
      this.kitsune.disabled = true;
    }
    if (this.isPstylePreviewSameAsSaved()) {
      this.needPstyle.classList.add("unsavedSettings");
      this.addAnimatedText(this.needPstyle, ["mob2.unsavedsettings", "You have unsaved settings. Save or discard changes."]);
    }
    this.pstylegradient.addEventListener("change", this.gradPreview);
    try {
      if (_0x25af3e) {
        const _0x51fccd = decodeURIComponent(escape(atob(_0x25af3e.replace(/\s+/g, ""))));
        doDebugLogs(1, "Decoded pstyle string:\n\n" + _0x51fccd);
        let _0x55528c = JSON.parse(_0x51fccd);
        doDebugLogs(1, "Parsed pstyle:");
        doDebugLogs(4, _0x55528c);
        if (_0x55528c?.pstyle) {
          this.pstyle.value = filter(_0x55528c.pstyle);
          _0x15e2a6 = _0x55528c.pstyle;
          if (this.pstyle.value.charAt(0) == "#") {
            this.pstyle.style.background = _0x55528c.pstyle;
            this.pstyle.style.color = isColorLight(_0x55528c.pstyle) ? "#000" : "#FFF";
          }
        }
        if (_0x55528c?.pstylePos) {
          this.pstylePos.value = filter(_0x55528c.pstylePos);
        }
        if (_0x55528c?.pstylecol) {
          this.pstylecol.value = filter(_0x55528c.pstylecol);
          this.pstylecol.style.background = _0x55528c.pstylecol;
          this.pstylecol.style.color = isColorLight(_0x55528c.pstylecol) ? "#000" : "#FFF";
        }
        if (_0x55528c?.pstyleicon) {
          this.pstyleicon.checked = filter(_0x55528c.pstyleicon);
        }
        if (_0x55528c?.pstylegradient) {
          const _0x5c620e = {
            pg7: 700,
            pg8: 704,
            pg9: 95,
            pg10: 95,
            pg11: 729,
            pg12: 730
          };
          if (_0x5c620e[_0x55528c.pstylegradient] && !hasPower(_0x5c620e[_0x55528c.pstylegradient])) {
            _0x55528c.pstylegradient = "pgNone";
          }
          this.pstylegradient.value = filter(_0x55528c.pstylegradient);
          this.gradPreview();
        }
      }
    } catch (_0x3a9e91) {
      doDebugLogs(3, "Failed to load pstyle: " + _0x3a9e91);
    }
    this.savePstyle.addEventListener("click", _0xc2dfc4 => {
      const _0x21ced4 = this.getJsonPStyleReady(this.pstyle, this.pstylePos, this.pstylecol, this.pstyleicon, this.pstylegradient);
      _0x15e2a6 = this.pstyle.value;
      this.saveSetting("pstyle", _0x21ced4);
      localStorage.removeItem(this.pstyleTmpKey);
      this.previewPstyle.disabled = !0;
      this.toSave = this.settingsSnackbar;
      this.savingSnackbar.show();
      this.doReload = !0;
      this.DisableSaveButtons();
    });
    this.previewPstyle.addEventListener("click", () => {
      if (_0x15e2a6 != null && _0x15e2a6 != this.pstyle.value) {
        this.pstylePos.value = "";
      }
      localStorage.setItem(this.pstyleTmpKey, this.getJsonPStyleReady(this.pstyle, this.pstylePos, this.pstylecol, this.pstyleicon, this.pstylegradient));
      localStorage.setItem("pstylePreviewMode", "1");
      _0x15e2a6 = this.pstyle.value;
      const _0x5dfabc = findNodeInWindowOrParent("#FrameDialog");
      if (_0x5dfabc) {
        _0x5dfabc.classList.add("d-none");
      }
      classicSetDialog("actions", this.Config.MyId);
    });
  }
  getJsonPStyleReady(_0x45ef58, _0x5f3b70, _0x162356, _0x5c80cd, _0x4de89a) {
    _0x45ef58.value = _0x45ef58.value.includes("http") || isValidHex(_0x45ef58.value) ? _0x45ef58.value : "";
    _0x162356.value = isValidHex(_0x162356.value.substring(0, 7)) ? _0x162356.value : "";
    const _0x22cd68 = {
      pstyle: filter(_0x45ef58.value) ?? "",
      pstylePos: filter(_0x5f3b70.value) ?? "",
      pstylecol: filter(_0x162356.value) ?? "",
      pstyleicon: filter(_0x5c80cd.checked) ?? "",
      pstylegradient: filter(_0x4de89a.value) ?? ""
    };
    return btoa(unescape(encodeURIComponent(JSON.stringify(_0x22cd68))).replace(/\s+/g, ""));
  }
  gradPreview() {
    const _0x4ac986 = pstylegradient.value;
    psThemeText.classList.remove("ps-theme-text--black");
    psThemeText.classList.remove("ps-theme-text--gradient");
    window.kPstyleClasslist.forEach(_0xb565f3 => pscircle.classList.remove(_0xb565f3));
    pscircle.classList.add(_0x4ac986);
    if (_0x4ac986 !== "pgNone") {
      psThemeText.classList.add("ps-theme-text--gradient");
      switch (_0x4ac986) {
        case "pg8":
          pscircle.classList.add("mushRoom");
          break;
        case "pg9":
        case "pg10":
          pscircle.classList.add("pstyleFx");
          break;
        case "pg11":
          pscircle.classList.add("psHalloween");
          break;
        case "pg12":
          pscircle.classList.add("psMorgana");
          break;
        case "pg13":
          pscircle.classList.add("psLems");
          break;
        case "pg14":
          pscircle.classList.add("psKitsune");
          psThemeText.classList.remove("ps-theme-text--gradient");
          psThemeText.classList.add("ps-theme-text--black");
      }
    }
  }
  initAcesSetting() {
    this.iconcolor = document.getElementById("iconcolor");
    this.pawnHue = document.getElementById("pawnHue");
    this.saveAces = document.getElementById("saveAces");
    this.colorPicker();
    this.autoColor(this.iconcolor);
    const _0x38ffbd = document.querySelectorAll("[data-settings=\"aces\"] [data-power]");
    let _0xbdc029 = !1;
    _0x38ffbd.forEach(_0x2bd942 => {
      const _0x46a7c4 = _0x2bd942.dataset.power;
      _0x2bd942.classList.remove("disabled");
      if (hasPower(_0x46a7c4)) {
        if (_0x46a7c4 === this.powerIds.kPawnHue) {
          if (!hasPower(this.powerIds.kPink) && !hasPower(this.powerIds.kBlueman) && !hasPower(this.powerIds.kYellow) && !hasPower(this.powerIds.kPurple) && !hasPower(this.powerIds.kGold) && !hasPower(this.powerIds.kRuby) && !hasPower(this.powerIds.kEverypower) && (!(this.Config?.pFlags & NamePowers.verified) || _Activity?.UserSettings?.Verified !== "enable")) {
            _0x2bd942.classList.add("disabled");
            if (!_0xbdc029) {
              this.needPawn = document.querySelector(".needPawn");
              this.addAnimatedText(this.needPawn, ["mob2.needpawn", "You need pawn powers to use this feature."]);
              _0xbdc029 = true;
            }
          }
        }
      } else {
        _0x2bd942.classList.add("disabled");
      }
    });
    let _0x1ce288 = _Activity.instance.UserSettings.iconcolor;
    if (_Activity.instance.UserSettings?.iconcolor) {
      this.iconcolor.value = _0x1ce288;
      this.iconcolor.style.background = _0x1ce288;
      this.iconcolor.style.color = isColorLight(_0x1ce288) ? "#000" : "#FFF";
    }
    const _0x2a3494 = _Activity.instance.UserSettings.pawnHue;
    let _0x26cab6 = _0x2a3494 || "0";
    this.hueSlider(_0x26cab6);
    this.saveAces.addEventListener("click", _0x5c56c1 => {
      const _0x5725ce = this.iconcolor.value;
      saveSetting("iconcolor", isValidHex(_0x5725ce) ? _0x5725ce : "");
      const _0x1bd15e = this.pawnHue.value;
      saveSetting("pawnHue", _0x1bd15e);
      this.toSave = this.settingsSnackbar;
      this.savingSnackbar.show();
      this.doReload = !0;
      this.DisableSaveButtons();
    });
  }
  hueSlider(_0x2d2912) {
    const _0x34c05e = document.getElementById("pawnHue");
    const _0x45ada2 = document.getElementById("pawnHuePreviewBut");
    const _0x181d6c = document.getElementById("pawnHueDefaultBut");
    _0x34c05e.style.background = "linear-gradient(to right, " + this.pawnHueData[0] + ", " + this.pawnHueData[1] + ")";
    _0x34c05e.min = parseInt(this.pawnHueData[2]);
    _0x34c05e.max = parseInt(this.pawnHueData[3]);
    _0x34c05e.value = parseInt(_0x2d2912);
    _0x45ada2.addEventListener("click", () => {
      ToC({
        Type: "GeneratePawnPreview",
        Value: _0x34c05e.value
      });
    });
    _0x181d6c.addEventListener("click", () => {
      _0x34c05e.value = 0;
    });
  }
  setCurrentPawnPreview(_0x3e67c9) {
    if (!_0x3e67c9) {
      return;
    }
    this.pawnHuePreviewCode = _0x3e67c9;
    const _0x8f1037 = document.getElementById("pawnHuePreview");
    _0x8f1037.innerHTML = "";
    _Activity.instance.Smilies.MakeSmiley(_0x8f1037, this.pawnHuePreviewCode, {
      size: 20
    });
  }
  setPawnHueSliderColor(_0x52e4ea, _0x48833e) {
    document.getElementById("pawnHue").style.background = "linear-gradient(to right, " + _0x52e4ea + ", " + _0x48833e + ")";
  }
  autoColor(_0x589baa) {
    _0x589baa.addEventListener("keyup", _0x20a0f3 => {
      this.pickrSet(_0x589baa, _0x589baa.value, !0);
    });
  }
  initAvatarSetting() {
    this.avatareffect = document.getElementById("avatareffect");
    this.avatarframe = document.getElementById("avatarframe");
    this.avatarspeed = document.getElementById("avatarspeed");
    this.avatarcolor = document.getElementById("avatarcolor");
    this.avatarrounded = document.getElementById("avatarrounded");
    this.saveAvatar = document.getElementById("saveAvatar");
    this.previewAvatar = document.getElementById("previewAvatar");
    this.avatarMsg = document.getElementById("avatarMsg");
    this.colorPicker();
    this.autoColor(this.avatarcolor);
    let _0x18e647 = config.MyRegName === undefined || !config.MyRegName;
    document.querySelectorAll("[data-settings=\"avatar\"] [data-avatar]").forEach(_0x3d49c0 => {
      _0x3d49c0.classList.remove("disabled");
      if (_0x18e647) {
        _0x3d49c0.classList.add("disabled");
      }
    });
    if (_0x18e647) {
      this.addAnimatedText(makeElement(this.avatarMsg, "span", "noDays"), ["mob2.noreg", "You need to be registered to use this feature"]);
    }
    this.avatareffect.innerHTML = "";
    this.avatarframe.innerHTML = "";
    const _0x109b41 = makeElement(this.avatareffect, "option");
    _0x109b41.dataset.localize = "mob2.disable";
    _0x109b41.text = "Disable";
    _0x109b41.value = "";
    const _0x2b205b = _Activity.instance.EFFECTS;
    if (Object.keys(_0x2b205b).length) {
      for (const _0x5c4268 in _0x2b205b) {
        const _0x26a26a = makeElement(this.avatareffect, "option");
        _0x26a26a.text = this.getTranslationAndRequiredTextForAvatarStuff(_0x5c4268, _0x2b205b[_0x5c4268]);
        _0x26a26a.value = _0x5c4268;
        _0x26a26a.disabled = this.disableEffectOrNot(_0x2b205b[_0x5c4268]);
        _0x26a26a.dataset.baseDisabled = _0x26a26a.disabled ? "1" : "0";
      }
    }
    const _0x5c01d5 = makeElement(this.avatarframe, "option");
    _0x5c01d5.dataset.localize = "mob2.disable";
    _0x5c01d5.text = "Disable";
    _0x5c01d5.value = "";
    const _0x32337b = _Activity.instance.FRAMES;
    if (Object.keys(_0x32337b).length) {
      for (const _0x3e8d21 in _0x32337b) {
        const _0x33a201 = makeElement(this.avatarframe, "option");
        _0x33a201.text = this.getTranslationAndRequiredTextForAvatarStuff(_0x3e8d21, _0x32337b[_0x3e8d21]);
        _0x33a201.value = _0x3e8d21;
        _0x33a201.disabled = this.disableEffectOrNot(_0x32337b[_0x3e8d21]);
      }
    }
    TranslateAll();
    let _0x324c5e = {};
    try {
      const _0x470d86 = _Activity.instance.UserSettings?.avatarSettings ?? "";
      if (_0x470d86) {
        const _0x1a716a = decodeURIComponent(escape(atob(_0x470d86)));
        _0x324c5e = JSON.parse(_0x1a716a);
      }
    } catch (_0x26738d) {
      console.error("Failed to parse avatarSettings:", _0x26738d);
    }
    if (_0x324c5e.avatareffect) {
      this.avatareffect.value = _0x324c5e.avatareffect;
    }
    if (_0x324c5e.avatarframe) {
      this.avatarframe.value = _0x324c5e.avatarframe;
    }
    if (_0x324c5e.avatarcolor) {
      const _0x2c59a6 = _0x324c5e.avatarcolor;
      this.avatarcolor.value = _0x2c59a6;
      this.avatarcolor.style.background = _0x2c59a6;
      this.avatarcolor.style.color = isColorLight(_0x2c59a6) ? "#000" : "#FFF";
    }
    if (_0x324c5e.avatarspeed) {
      this.avatarspeed.value = _0x324c5e.avatarspeed;
    }
    if (_0x324c5e.avatarrounded) {
      this.avatarrounded.checked = _0x324c5e.avatarrounded === "true" || _0x324c5e.avatarrounded === true;
    }
    const _0x407b6a = () => {
      const _0x381d7f = {
        avatareffect: filter(this.avatareffect.value) ?? "",
        avatarframe: filter(this.avatarframe.value) ?? "",
        avatarspeed: filter(this.avatarspeed.value) ?? "",
        avatarcolor: isValidHex(this.avatarcolor.value) ? filter(this.avatarcolor.value) : "",
        avatarrounded: this.avatarrounded.checked ? "true" : ""
      };
      const _0x2b4711 = JSON.stringify(_0x381d7f);
      return btoa(unescape(encodeURIComponent(_0x2b4711)));
    };
    this.saveAvatar.addEventListener("click", () => {
      const _0x35d588 = _0x407b6a();
      saveSetting("avatarSettings", _0x35d588);
      this.toSave = this.settingsSnackbar;
      this.savingSnackbar.show();
      this.doReload = !0;
      this.DisableSaveButtons();
    });
    this.previewAvatar.addEventListener("click", () => {
      const _0x5bb8fd = _0x407b6a();
      localStorage.setItem("avatarSettingsTmp", _0x5bb8fd);
      this.renderAvatar();
    });
  }
  getTranslationAndRequiredTextForAvatarStuff(_0x548aa2, _0x42a1ac) {
    let _0xe1bdf2 = _0x548aa2;
    if (_0x42a1ac >= 0) {
      switch (_0x42a1ac) {
        case 0:
          let _0x5a3447 = GetTranslation("mob2.subsonly");
          _0x5a3447 ||= "Subscribers only";
          _0xe1bdf2 += " - " + _0x5a3447;
          break;
        default:
          const _0x11f533 = _Activity.instance.PSSA ?? {};
          const _0x113f49 = _Activity.instance.ACES ?? {};
          const _0x15e7aa = !!_0x11f533 && _0x11f533[_0x42a1ac + 1];
          const _0xcbbac1 = _0x113f49 && _0x113f49[_0x42a1ac];
          if (_0x15e7aa || _0xcbbac1) {
            const _0x2fade9 = _0xcbbac1 ? "ace" : "power";
            const _0x372c07 = _0xcbbac1 ?? _0x15e7aa;
            let _0x71821d = GetTranslation("mob2.required" + _0x2fade9);
            _0x71821d ||= "Requires $0 " + _0x2fade9;
            _0x71821d = _0x71821d.replace("$0", _0x372c07);
            _0xe1bdf2 += " - " + _0x71821d;
            break;
          }
      }
    }
    return _0xe1bdf2;
  }
  disableEffectOrNot(_0x34498c) {
    if (_0x34498c === -1) {
      return !config?.MyRegName.length;
    } else if (_0x34498c === 0) {
      return !this.hasDays();
    } else {
      return !hasPower(_0x34498c);
    }
  }
  colorPicker() {
    const _0x16588f = {
      selector: "#ubcolPick",
      inputHandler: pstylecol
    };
    const _0x405538 = {
      selector: "#ubcolPick2",
      inputHandler: pstyle
    };
    const _0x22d717 = {
      selector: "#iconcolorPickr",
      inputHandler: iconcolor
    };
    const _0x301b14 = {
      selector: "#avatarcolorPickr",
      inputHandler: avatarcolor
    };
    [_0x16588f, _0x405538, _0x22d717, _0x301b14].forEach(_0x5685a1 => {
      const _0x537df2 = {
        input: !0,
        clear: !0
      };
      const _0x3818f9 = {
        palette: !0,
        preview: !0,
        opacity: !0,
        hue: !0,
        interaction: _0x537df2
      };
      let {
        selector: _0x5e88e0,
        inputHandler: _0x3e1338
      } = _0x5685a1;
      let _0x19b4f4 = Pickr.create({
        el: _0x5e88e0,
        theme: "nano",
        preview: !0,
        useAsButton: !0,
        closeOnScroll: !1,
        lockOpacity: !0,
        components: _0x3818f9
      }).on("change", (_0x3a76ff, _0x3389c7) => {
        let _0x297991 = _0x3a76ff.toHEXA().toString();
        this.pickrSet(_0x3e1338, _0x297991);
      }).on("clear", _0x247ec8 => {
        this.pickrSet(_0x3e1338, "");
      }).on("save", _0x89aa15 => {
        _0x19b4f4.hide();
      });
    });
  }
  pickrSet(_0x41e328, _0x4f2a03, _0x15a93c) {
    if (_0x4f2a03.charAt(0) == "#" && _0x4f2a03.length == 7 && isValidHex(_0x4f2a03) || !_0x15a93c) {
      _0x41e328.style.background = _0x4f2a03;
      _0x41e328.style.color = isColorLight(_0x4f2a03) ? "#000" : "#FFF";
      _0x41e328.value = _0x4f2a03;
    } else {
      _0x41e328.style.background = "";
      _0x41e328.style.color = "";
    }
  }
  initTranslatorSetting() {
    if (this.translatorMsg) {
      this.translatorMsg.style.display = "none";
    }
    this.translatorContent.style.display = "block";
    if (!this.hasDays()) {
      this.translatorMsg.innerHTML = "";
      this.translatorMsg.style.display = "block";
      this.translatorContent.style.display = "none";
      this.addAnimatedText(makeElement(this.translatorMsg, "span", "noDays"), ["mob2.nodays", "You need to have subscriber days to use this feature."]);
      return;
    }
    this.yourLang = document.getElementById("yourLang");
    this.translateTo = document.getElementById("translateTo");
    this.enableOnChat = document.getElementById("enableOnChat");
    this.saveTranslator = document.getElementById("saveTranslator");
    this.showTranslation = document.getElementById("showTranslation");
    this.includeOriginalMsg = document.getElementById("includeOriginalMsg");
    for (const _0x579574 in this.translatorLangs) {
      if (this.translatorLangs.hasOwnProperty(_0x579574)) {
        [this.yourLang, this.translateTo].forEach(_0x4eed1b => {
          const _0x2ba439 = makeElement(_0x4eed1b, "option");
          _0x2ba439.text = this.translatorLangs[_0x579574];
          _0x2ba439.value = _0x579574;
        });
      }
    }
    const _0x2b10e7 = this.Config?.chatid;
    let _0x2c365d = {};
    const _0x2c2e3f = _Activity.instance.UserSettings?.translatorChatsv2;
    if (_0x2c2e3f) {
      try {
        _0x2c365d = JSON.parse(_Activity.instance.UserSettings?.translatorChatsv2?.replace(/”/g, "\""));
      } catch (_0x24016f) {
        doDebugLogs(3, "Failed to load translator chats: " + _0x24016f);
      }
    }
    let _0x5feb61 = _0x2c365d[_0x2b10e7] ?? "";
    _0x5feb61 = _0x5feb61.split("|");
    this.enableOnChat.checked = _0x5feb61[0] == "enabled";
    this.translateTo.value = _0x5feb61[1] ?? "";
    this.yourLang.value = _0x5feb61[2] ?? "";
    this.showTranslation.value = _0x5feb61[3] || "both";
    this.includeOriginalMsg.checked = !!_0x5feb61[4] && _0x5feb61[4] != "off";
    this.saveTranslator.addEventListener("click", _0x5cffae => {
      const _0x38e63f = this.enableOnChat.checked ? "enabled" : "disabled";
      const _0x2b8a41 = this.includeOriginalMsg.checked ? "on" : "off";
      _0x2c365d[_0x2b10e7] = _0x38e63f + "|" + this.translateTo.value + "|" + this.yourLang.value + "|" + this.showTranslation.value + "|" + _0x2b8a41;
      saveSetting("translatorChatsv2", JSON.stringify(_0x2c365d));
      this.toSave = this.enableOnChat.checked ? this.translatorSnackbar : this.translatorDisabledSnackbar;
      this.savingSnackbar.show();
      this.doReload = !0;
      this.DisableSaveButtons();
    });
  }
  initKeywordsSetting() {
    this.keywordsList.innerHTML = "";
    if (this.hasMarkPower()) {
      const _0x1cfe1a = {
        input: !0,
        clear: !0
      };
      const _0x3555f4 = {
        palette: !0,
        preview: !0,
        opacity: !0,
        hue: !0,
        interaction: _0x1cfe1a
      };
      this.addKeywordBtn = document.getElementById("addKeyword");
      this.keywordNameInput = document.getElementById("keywordName");
      this.editKeyword = document.getElementById("editKeyword");
      this.deleteKeyword = document.getElementById("deleteKeyword");
      this.keywordNameInput.addEventListener("keyup", () => {
        if (this.keywordNameInput.value.length > 2) {
          this.addKeywordBtn.disabled = false;
        } else {
          this.addKeywordBtn.disabled = true;
        }
      });
      this.keywordColor = Pickr.create({
        el: "#keywordColor",
        theme: "nano",
        default: this.defaultKeywordColor,
        preview: !0,
        useAsButton: !0,
        closeOnScroll: !0,
        lockOpacity: !0,
        components: _0x3555f4
      });
      this.keywordColor.on("change", _0x1222c5 => {
        const _0x44ce0e = _0x1222c5.toHEXA().toString();
        this.keywordNameInput.style.background = _0x44ce0e;
        this.keywordNameInput.style.color = isColorLight(_0x44ce0e) ? "#000" : "#FFF";
      });
      this.keywordColor.on("clear", () => {
        this.keywordNameInput.style.background = "";
        this.keywordNameInput.style.color = "";
      });
      this.keywordColor.on("save", () => {
        this.keywordColor.hide();
      });
      this.addKeywordBtn.addEventListener("click", this.addKeywordEvent.bind(this));
      if (!parent?.keywordSortable) {
        parent.keywordSortable = !0;
        new Sortable(this.keywordsList, null, _0x12070e => {
          if (this.deleteKeyword.classList.contains("active")) {
            this.keywords = this.keywords.filter(_0x5e1f1c => _0x5e1f1c.id != _0x12070e.id);
            this.saveSetting("marks", JSON.stringify(this.keywords));
            animateTo(_0x12070e, {
              opacity: 0,
              transform: "translateY(10rem)",
              fill: "forwards"
            }, {
              duration: 400,
              easing: "ease-out"
            }, () => {
              _0x12070e.remove();
              if (!this.keywords?.length) {
                this.addAnimatedText(this.keywordsList, ["mob2.nokeywords", "You haven't added any keyword yet."]);
              }
            });
            this.keywordToEdit = null;
          } else if (this.editKeyword.classList.contains("active") && _0x12070e) {
            const _0x4eb7e1 = this.keywords.filter(_0xd8164a => _0xd8164a.id == _0x12070e.id)[0];
            const _0x4fc34e = _0x4eb7e1.color || this.defaultKeywordColor;
            this.keywordColor.setColor(_0x4fc34e);
            this.addKeywordBtn.disabled = !1;
            this.keywordNameInput.value = _0x4eb7e1.name;
            this.keywordNameInput.focus();
            this.keywordNameInput.style.background = _0x4fc34e;
            this.keywordNameInput.style.color = isColorLight(_0x4fc34e) ? "#000" : "#FFF";
            this.keywordToEdit = _0x4eb7e1.id;
          }
        }, this.editKeyword, this.deleteKeyword);
      }
    } else {
      this.addAnimatedText(this.keywordsList, ["mob2.needpower", "You need $1 power to use this feature.", "Mark"]);
    }
  }
  addKeywordEvent() {
    const _0x5c5bf1 = Math.random().toString(36).substr(2, 9);
    const _0xd347dd = this.keywordColor?.getColor().toHEXA().toString() || this.defaultCategoryColor;
    const _0xeb0fff = this.RemoveHtmlEntities(this.keywordNameInput?.value).substr(0, 20).replace(/\"/g, "").replace(/ /g, "");
    if (this.keywordToEdit) {
      if (!_0xeb0fff) {
        return;
      }
      const _0x5e0874 = this.keywords.filter(_0x5dcf9d => _0x5dcf9d.id == this.keywordToEdit)[0];
      _0x5e0874.name = _0xeb0fff;
      _0x5e0874.color = _0xd347dd;
      this.keywordNameInput.value = "";
      this.keywordNameInput.style.color = "#000";
      this.keywordNameInput.style.background = "#FFF";
      this.friendsCategories = null;
      if (_Activity.instance.UserSettings.friendskeywords) {
        try {
          this.friendsCategories = JSON.parse(_Activity.instance.UserSettings.friendskeywords.replace(/”/g, "\""));
        } catch (_0x244f33) {
          doDebugLogs(3, "Failed to load friends keywords: " + _0x244f33 + ", " + _Activity.instance.UserSettings.friendskeywords);
        }
      }
      const _0xfe6580 = this.friendsCategories?.filter(_0x59a545 => _0x59a545.id == this.keywordToEdit);
      this.friendsCategories = this.friendsCategories?.filter(_0x346b3e => _0x346b3e.id != this.keywordToEdit);
      _0xfe6580?.forEach(_0x5234eb => {
        this.friendsCategories.push({
          user: _0x5234eb.user,
          name: _0xeb0fff,
          id: this.keywordToEdit
        });
      });
      const _0x15d558 = document.getElementById(this.keywordToEdit);
      _0x15d558.classList.remove("editActive");
      _0x15d558.innerText = _0xeb0fff;
      _0x15d558.style.backgroundColor = _0xd347dd;
      _0x15d558.style.color = isColorLight(_0xd347dd) ? "#000" : "#FFF";
      this.keywordToEdit = null;
      saveSetting("marks", JSON.stringify(this.keywords));
      this.toSave = this.keywordEditedSnackbar;
      this.savingSnackbar.show();
    } else if (_0xeb0fff.length) {
      this.addKeywordBtn.disabled = !1;
      this.keywordNameInput.value = "";
      this.keywordNameInput.style.color = "#000";
      this.keywordNameInput.style.background = "#FFF";
      this.addKeywordItem(_0x5c5bf1, _0xeb0fff, _0xd347dd);
      const _0x24f002 = {
        name: _0xeb0fff,
        id: _0x5c5bf1,
        color: _0xd347dd
      };
      this.keywords.push(_0x24f002);
      this.saveSetting("marks", JSON.stringify(this.keywords));
      this.toSave = this.keywordAddedSnackbar;
      this.savingSnackbar.show();
    }
  }
  updateKeywords() {
    if (!this.keywordsList?.innerHTML) {
      if (this.hasMarkPower()) {
        if (_Activity.instance.UserSettings.marks) {
          try {
            this.keywords = JSON.parse(_Activity.instance.UserSettings.marks.replace(/”/g, "\""));
          } catch (_0x4fad60) {
            doDebugLogs(3, "Failed to load keywords: " + _0x4fad60 + ", " + _Activity.instance.UserSettings.marks);
          }
        }
        if (this.keywords?.length) {
          this.keywords.forEach(_0x91eb21 => this.addKeywordItem(_0x91eb21.id, _0x91eb21.name, _0x91eb21.color));
        } else {
          this.addAnimatedText(this.keywordsList, ["mob2.nokeywords", "You haven't added any keyword yet."]);
        }
      } else {
        this.addAnimatedText(this.keywordsList, ["mob2.needpower", "You need $1 power to use this feature.", "Mark"]);
      }
    }
  }
  hasMarkPower() {
    return hasPower(462);
  }
  addKeywordItem(_0x238abd, _0x51c3cf, _0x3b3d07) {
    if (!this.keywords?.length) {
      this.keywordsList.innerHTML = "";
    }
    const _0x2df5ba = makeElement(this.keywordsList, "li", "keyword", _0x238abd);
    animateFrom(_0x2df5ba, {
      opacity: 0,
      transform: "translateX(10rem)"
    }, {
      duration: 400,
      easing: "ease-in"
    });
    _0x2df5ba.style.backgroundColor = _0x3b3d07;
    _0x2df5ba.style.color = isColorLight(_0x3b3d07) ? "#000" : "#FFF";
    _0x2df5ba.innerHTML = _0x51c3cf;
    return _0x2df5ba;
  }
  initCategoriesSetting() {
    this.categoriesList.innerHTML = "";
    if (this.hasCategoryPower()) {
      const _0x58e584 = {
        input: !0,
        clear: !0
      };
      const _0x360cc6 = {
        palette: !0,
        preview: !0,
        opacity: !0,
        hue: !0,
        interaction: _0x58e584
      };
      this.addCategoryBtn = document.getElementById("addCategory");
      this.categoryNameInput = document.getElementById("categoryName");
      this.editCategory = document.getElementById("editCategory");
      this.deleteCategory = document.getElementById("deleteCategory");
      this.categoryNameInput.addEventListener("keyup", () => {
        if (this.categoryNameInput.value.length) {
          this.addCategoryBtn.disabled = false;
        } else {
          this.addCategoryBtn.disabled = true;
        }
      });
      this.categoryColor = Pickr.create({
        el: "#categoryColor",
        theme: "nano",
        default: this.defaultCategoryColor,
        preview: !0,
        useAsButton: !0,
        closeOnScroll: !0,
        lockOpacity: !0,
        components: _0x360cc6
      });
      this.categoryColor.on("change", _0x4e0efd => {
        const _0x3bd1e3 = _0x4e0efd.toHEXA().toString();
        this.categoryNameInput.style.background = _0x3bd1e3;
        this.categoryNameInput.style.color = isColorLight(_0x3bd1e3) ? "#000" : "#FFF";
      });
      this.categoryColor.on("clear", () => {
        this.categoryNameInput.style.background = "";
        this.categoryNameInput.style.color = "";
      });
      this.categoryColor.on("save", () => {
        this.keywordColor.hide();
      });
      this.addCategoryBtn.addEventListener("click", this.addCategoryEvent.bind(this));
      if (!parent?.categorySortable) {
        parent.categorySortable = !0;
        new Sortable(this.categoriesList, this.updateCategories.bind(this), _0x2da089 => {
          if (this.deleteCategory.classList.contains("active")) {
            this.categories = this.categories.filter(_0x2a48d0 => _0x2a48d0.id != _0x2da089.id);
            if (this.friendsCategories) {
              try {
                this.friendsCategories = JSON.parse(_Activity.instance.UserSettings?.friendscategories?.replace(/”/g, "\""));
                this.friendsCategories = this.friendsCategories.filter(_0x4bb2e3 => _0x4bb2e3.id != _0x2da089.id);
              } catch (_0x48238c) {
                doDebugLogs(3, "Failed to load friends categories: " + _0x48238c);
              }
            }
            this.saveSetting("categories", JSON.stringify(this.categories));
            this.saveSetting("friendscategories", JSON.stringify(this.friendsCategories));
            animateTo(_0x2da089, {
              opacity: 0,
              transform: "translateY(10rem)",
              fill: "forwards"
            }, {
              duration: 400,
              easing: "ease-out"
            }, () => {
              _0x2da089.remove();
              if (!this.categories?.length) {
                this.addAnimatedText(this.categoriesList, ["mob2.nocategories", "You haven't added any category yet."]);
              }
            });
            this.categoryToEdit = null;
          } else if (this.editCategory.classList.contains("active") && _0x2da089) {
            const _0x3ef79f = this.categories.filter(_0x5b814a => _0x5b814a.id == _0x2da089.id)[0];
            const _0x2c7769 = _0x3ef79f.color || this.defaultCategoryColor;
            this.categoryColor.setColor(_0x2c7769);
            this.addCategoryBtn.disabled = !1;
            this.categoryNameInput.value = _0x3ef79f.name;
            this.categoryNameInput.focus();
            this.categoryNameInput.style.background = _0x2c7769;
            this.categoryNameInput.style.color = isColorLight(_0x2c7769) ? "#000" : "#FFF";
            this.categoryToEdit = _0x3ef79f.id;
          }
        }, this.editCategory, this.deleteCategory);
      }
    } else {
      this.addAnimatedText(this.categoriesList, ["mob2.needpower", "You need $1 power to use this feature.", "Category"]);
    }
  }
  addCategoryEvent() {
    const _0x402976 = Math.random().toString(36).substr(2, 9);
    const _0x1f0b4c = this.categoryColor?.getColor().toHEXA().toString() || this.defaultCategoryColor;
    const _0x475f63 = this.RemoveHtmlEntities(this.categoryNameInput?.value);
    if (this.categoryToEdit) {
      if (!_0x475f63) {
        return;
      }
      const _0x27a849 = this.categories.filter(_0x2bc826 => _0x2bc826.id == this.categoryToEdit)[0];
      _0x27a849.name = _0x475f63;
      _0x27a849.color = _0x1f0b4c;
      this.categoryNameInput.value = "";
      this.categoryNameInput.style.color = "#000";
      this.categoryNameInput.style.background = "#FFF";
      this.friendsCategories = null;
      if (_Activity.instance.UserSettings.friendscategories) {
        try {
          this.friendsCategories = JSON.parse(_Activity.instance.UserSettings.friendscategories.replace(/”/g, "\""));
        } catch (_0x7ceba2) {
          doDebugLogs(3, "Failed to load friends categories (2): " + _0x7ceba2);
        }
      }
      const _0x59dc7e = this.friendsCategories?.filter(_0x541a77 => _0x541a77.id == this.categoryToEdit);
      this.friendsCategories = this.friendsCategories?.filter(_0x445211 => _0x445211.id != this.categoryToEdit);
      _0x59dc7e?.forEach(_0x2b770c => {
        this.friendsCategories.push({
          user: _0x2b770c.user,
          name: _0x475f63,
          id: this.categoryToEdit
        });
      });
      const _0xd1e6a7 = document.getElementById(this.categoryToEdit);
      _0xd1e6a7.classList.remove("editActive");
      _0xd1e6a7.innerText = _0x475f63;
      _0xd1e6a7.style.backgroundColor = _0x1f0b4c;
      _0xd1e6a7.style.color = isColorLight(_0x1f0b4c) ? "#000" : "#FFF";
      this.categoryToEdit = null;
      saveSetting("categories", JSON.stringify(this.categories));
      saveSetting("friendscategories", JSON.stringify(this.friendsCategories));
      this.toSave = this.categoryEditedSnackbar;
      this.savingSnackbar.show();
    } else if (_0x475f63.length) {
      this.addCategoryBtn.disabled = !1;
      this.categoryNameInput.value = "";
      this.categoryNameInput.style.color = "#000";
      this.categoryNameInput.style.background = "#FFF";
      this.addCategoryItem(_0x402976, _0x475f63, _0x1f0b4c);
      const _0x3a7fa0 = {
        name: _0x475f63,
        id: _0x402976,
        color: _0x1f0b4c
      };
      this.categories.push(_0x3a7fa0);
      this.saveSetting("categories", JSON.stringify(this.categories));
      this.toSave = this.categoryAddedSnackbar;
      this.savingSnackbar.show();
    }
  }
  updateCategories(_0xccec66) {
    if (!this.categoriesList?.innerHTML) {
      if (this.hasCategoryPower()) {
        if (_0xccec66?.length) {
          _0xccec66 = _0xccec66.split(":");
          this.categories.sort((_0x42f51f, _0x318fe4) => _0xccec66.indexOf(_0x42f51f.id) - _0xccec66.indexOf(_0x318fe4.id));
          saveSetting("categories", JSON.stringify(this.categories));
        } else {
          if (_Activity.instance.UserSettings.categories) {
            try {
              this.categories = JSON.parse(_Activity.instance.UserSettings.categories.replace(/”/g, "\""));
            } catch (_0x4e7a6e) {
              doDebugLogs(3, "Failed to load categories: " + _0x4e7a6e);
            }
          }
          if (this.categories?.length) {
            this.categories.forEach(_0x30ed77 => this.addCategoryItem(_0x30ed77.id, _0x30ed77.name, _0x30ed77.color));
          } else {
            this.addAnimatedText(this.categoriesList, ["mob2.nocategories", "You haven't added any category yet."]);
          }
        }
      } else {
        this.addAnimatedText(this.categoriesList, ["mob2.needpower", "You need $1 power to use this feature.", "Category"]);
      }
    }
  }
  hasCategoryPower() {
    return this.Config?.pFlags & NamePowers.category;
  }
  addCategoryItem(_0x59e19a, _0x728714, _0x46ec41) {
    if (!this.categories?.length) {
      this.categoriesList.innerHTML = "";
    }
    const _0x55f4df = makeElement(this.categoriesList, "li", "category", _0x59e19a);
    animateFrom(_0x55f4df, {
      opacity: 0,
      transform: "translateX(10rem)"
    }, {
      duration: 400,
      easing: "ease-in"
    });
    _0x55f4df.style.backgroundColor = _0x46ec41;
    _0x55f4df.style.color = isColorLight(_0x46ec41) ? "#000" : "#FFF";
    _0x55f4df.innerHTML = _0x728714;
    return _0x55f4df;
  }
  initAboutSetting() {
    document.getElementById("versionNumber").innerText = this.Config?.Version || parent?.config?.Version;
  }
  initAccount() {
    let _0x52f771 = document.getElementById("doDelete");
    let _0x4ea74a = document.getElementById("delErr");
    let _0x2ec701 = document.getElementById("delSent");
    _0x52f771.addEventListener("click", function (_0x42d864) {
      if (document.getElementById("confirmdelete").checked != 1) {
        _0x4ea74a.classList.remove("d-none");
        document.querySelector("#accDesc").scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
        _0x4ea74a.innerHTML = "<span data-localize=\"mob2.checkp\">You must check the box to proceed!</span>";
        return !1;
      }
      {
        _0x42d864.preventDefault();
        let _0x2175da = {};
        try {
          _0x2175da = JSON.parse(localStorage.getItem("todo"));
        } catch (_0x23e935) {
          _0x2175da = {};
        }
        let _0x49f737 = new FormData();
        _0x49f737.append("Delete", "1");
        _0x49f737.append("Permanent", "2");
        _0x49f737.append("UserId", _0x2175da.w_userno);
        _0x49f737.append("DeviceId", _0x2175da.DeviceId);
        _0x49f737.append("PassHash", _0x2175da.PassHash);
        urlPost("http://localhost:6969/web_gear/chat/register5.php", _0x49f737).then(function (_0xd42324) {
          _0x4ea74a.classList.remove("d-none");
          document.querySelector("#accDesc").scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
          if (_0xd42324.Err.deletep) {
            _0x2ec701.classList.add("d-none");
            _0x4ea74a.classList.add("delSuccess");
            _0x4ea74a.innerHTML = "<span data-localize=\"mob2.delpsuc\">An email has been sent to you for confirming the permanent deletion request.</span>";
          } else if (_0xd42324.Err.deleteallready) {
            _0x4ea74a.classList.add("delError");
            _0x4ea74a.innerHTML = "<span data-localize=\"mob2.deleteAlready\">You have already made a request recently, please check your email.</span>";
          } else {
            _0x4ea74a.classList.add("delError");
            _0x4ea74a.innerHTML = _0xd42324.Err.login;
          }
        });
      }
    });
  }
  hasDays() {
    return !!(this.Config?.pFlags & NamePowers.hasdays);
  }
  addAnimatedText(_0x4be3e8, _0x136c11) {
    const _0x1e2b3d = makeElement(_0x4be3e8, "span");
    addText(_0x1e2b3d, _0x136c11);
    animateFrom(_0x1e2b3d, {
      opacity: 0
    }, {
      duration: 250,
      easing: "ease-in-out"
    });
    return _0x1e2b3d;
  }
  saveSetting(_0x152a42, _0x4c75d0) {
    const _0x4ad288 = {
      Type: "Setting",
      Command: "Setting",
      Name: _0x152a42,
      Value: _0x4c75d0
    };
    this.sendApp(_0x4ad288);
  }
  sendApp(_0x4d89eb) {
    _0x4d89eb.Page = "settings";
    ToC(_0x4d89eb);
  }
  refresh() {
    parent.parent.location.href = parent.parent.location.href;
  }
  RemoveHtmlEntities(_0x4fd120) {
    return String(_0x4fd120).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  hideSettigs() {
    window.parent.setFrameVis();
  }
  doTab(_0xfaccd1) {
    document.querySelector("[data-target=\"" + _0xfaccd1 + "\"]")?.click();
  }
  doSave() {
    setTimeout(() => {
      this.savingSnackbar.hide();
      this.toSave?.show();
      this.toSave = null;
      parent.keywordSortable = false;
      parent.categorySortable = false;
    }, 2500);
  }
  DisableSaveButtons() {
    if (this.previewPstyle) {
      this.previewPstyle.disabled = true;
    }
    if (this.saveGeneralBtn) {
      this.saveGeneralBtn.disabled = true;
    }
    if (this.saveAppearanceBtn) {
      this.saveAppearanceBtn.disabled = true;
    }
    if (this.saveNotificationsBtn) {
      this.saveNotificationsBtn.disabled = true;
    }
    if (this.saveAvatar) {
      this.saveAvatar.disabled = true;
    }
    if (this.saveCalls) {
      this.saveCalls.disabled = true;
    }
    if (this.savePowers) {
      this.savePowers.disabled = true;
    }
    if (this.savePstyle) {
      this.savePstyle.disabled = true;
    }
    if (this.saveAces) {
      this.saveAces.disabled = true;
    }
    if (this.saveTranslator) {
      this.saveTranslator.disabled = true;
    }
    setTimeout(this.EnableSaveButtons, 5000);
  }
  EnableSaveButtons() {
    if (this.previewPstyle && hasPower(672)) {
      this.previewPstyle.disabled = false;
    }
    if (this.saveGeneralBtn) {
      this.saveGeneralBtn.disabled = false;
    }
    if (this.saveAppearanceBtn) {
      this.saveAppearanceBtn.disabled = false;
    }
    if (this.saveNotificationsBtn) {
      this.saveNotificationsBtn.disabled = false;
    }
    if (this.saveAvatar) {
      this.saveAvatar.disabled = false;
    }
    if (this.saveCalls) {
      this.saveCalls.disabled = false;
    }
    if (this.savePowers) {
      this.savePowers.disabled = false;
    }
    if (this.savePstyle && hasPower(672)) {
      this.savePstyle.disabled = false;
    }
    if (this.saveAces) {
      this.saveAces.disabled = false;
    }
    if (this.saveTranslator) {
      this.saveTranslator.disabled = false;
    }
  }
  sendTestNotification() {
    if (_Activity.instance.Notify.compatible()) {
      _Activity.instance.Notify.authorize();
    }
    _Activity.instance.Notify.show("Hello from xat", "This is a test notification!");
  }
  getPstyleForPreview() {
    return localStorage.getItem(this.pstyleTmpKey) ?? "";
  }
  getPstyleToUse() {
    if (this.getPstyleForPreview()) {
      return this.getPstyleForPreview();
    } else {
      return this.getPstyleFromStorage();
    }
  }
  isPstylePreviewSameAsSaved() {
    return !!this.getPstyleForPreview() && this.getPstyleForPreview() !== this.getPstyleFromStorage();
  }
  getPstyleFromStorage() {
    return getSettingsValue(this.pstyleSettingName);
  }
}
var settings = _Activity.instance.Settings = new SettingsPage();
class Sortable {
  constructor(_0xbdebbf, _0x16f3ed, _0x915cdb, _0x40a2b2, _0x30f139) {
    this._container = _0xbdebbf;
    this._clickItem = null;
    this._dragItem = null;
    this._hovItem = null;
    this._sortLists = [];
    this._click = {};
    this._isTouch = !1;
    this._dragging = !1;
    this._onSwap = _0x16f3ed;
    this._onReleaseUp = _0x915cdb;
    this.serialized = "";
    this._timer;
    this._touchduration = 500;
    this._container.setAttribute("data-is-sortable", 1);
    this._container.style.position = "static";
    this.editBtn = _0x40a2b2;
    this.deleteBtn = _0x30f139;
    window.addEventListener("mousedown", this._onPress.bind(this), !0);
    window.addEventListener("mouseup", this._onRelease.bind(this), !0);
    window.addEventListener("mousemove", this._onMove.bind(this), !0);
    window.addEventListener("touchstart", this._onPressTouch.bind(this), !1);
    window.addEventListener("touchmove", this._onMove.bind(this), !1);
    window.addEventListener("touchend", this._onRelease.bind(this), !1);
  }
  getPoint(_0x4ad1f0) {
    let _0x1a4a5f = null;
    let _0x195156 = null;
    const _0x4bdf8f = Math.max(0, window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0) - (document.documentElement.clientLeft || 0);
    const _0x50951d = Math.max(0, window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0) - (document.documentElement.clientTop || 0);
    if (this._isTouch) {
      const _0x38514a = _0x4ad1f0 !== undefined && _0x4ad1f0.targetTouches !== undefined ? _0x4ad1f0.targetTouches[0] : {};
      _0x1a4a5f = _0x38514a ? Math.max(0, _0x38514a.pageX || _0x38514a.clientX || 0) - _0x4bdf8f : 0;
      _0x195156 = _0x38514a ? Math.max(0, _0x38514a.pageY || _0x38514a.clientY || 0) - _0x50951d : 0;
    } else {
      _0x1a4a5f = _0x4ad1f0 ? Math.max(0, _0x4ad1f0.pageX || _0x4ad1f0.clientX || 0) - _0x4bdf8f : 0;
      _0x195156 = _0x4ad1f0 ? Math.max(0, _0x4ad1f0.pageY || _0x4ad1f0.clientY || 0) - _0x50951d : 0;
    }
    const _0x5da102 = {
      x: _0x1a4a5f,
      y: _0x195156
    };
    return _0x5da102;
  }
  toArray(_0x469005) {
    _0x469005 = _0x469005 ?? "id";
    const _0x56e5ef = [];
    let _0x4478aa = null;
    let _0x44c0cc = "";
    for (let _0x362578 = 0; _0x362578 < this._container.children.length; ++_0x362578) {
      _0x4478aa = this._container.children[_0x362578];
      _0x44c0cc = _0x4478aa.getAttribute(_0x469005) || "";
      _0x56e5ef.push(_0x44c0cc);
    }
    return _0x56e5ef;
  }
  toString(_0x2a1958, _0x3eddb2) {
    _0x3eddb2 = _0x3eddb2 ?? ":";
    return this.toArray(_0x2a1958).join(_0x3eddb2);
  }
  _isOnTop(_0x4a68a0, _0x36238a, _0x40c805) {
    const _0x45ac0e = _0x4a68a0.getBoundingClientRect();
    const _0x33070a = _0x36238a > _0x45ac0e.left && _0x36238a < _0x45ac0e.left + _0x45ac0e.width;
    const _0x4ab1e1 = _0x40c805 > _0x45ac0e.top && _0x40c805 < _0x45ac0e.top + _0x45ac0e.height;
    return _0x33070a && _0x4ab1e1;
  }
  _itemClass(_0x477610, _0x14a4e3, _0x32fa59) {
    const _0x293e08 = _0x477610.className.split(/\s+/);
    const _0x2f946f = _0x293e08.indexOf(_0x32fa59);
    if (_0x14a4e3 === "add" && _0x2f946f == -1) {
      _0x293e08.push(_0x32fa59);
      _0x477610.className = _0x293e08.join(" ");
    } else if (_0x14a4e3 === "remove" && _0x2f946f != -1) {
      _0x293e08.splice(_0x2f946f, 1);
      _0x477610.className = _0x293e08.join(" ");
    }
  }
  _swapItems(_0x359ab4, _0xf7cf06) {
    const _0x236107 = _0x359ab4.parentNode;
    const _0x33cd5a = _0xf7cf06.parentNode;
    if (_0x236107 !== _0x33cd5a) {
      _0x33cd5a.insertBefore(_0x359ab4, _0xf7cf06);
    } else {
      const _0x2f898a = document.createElement("div");
      _0x236107.insertBefore(_0x2f898a, _0x359ab4);
      _0x33cd5a.insertBefore(_0x359ab4, _0xf7cf06);
      _0x236107.insertBefore(_0xf7cf06, _0x2f898a);
      _0x236107.removeChild(_0x2f898a);
    }
  }
  _moveItem(_0x230af2, _0x2635fc, _0x7072c) {
    _0x230af2.style["-webkit-transform"] = "translateX( " + _0x2635fc + "px ) translateY( " + _0x7072c + "px )";
    _0x230af2.style["-moz-transform"] = "translateX( " + _0x2635fc + "px ) translateY( " + _0x7072c + "px )";
    _0x230af2.style["-ms-transform"] = "translateX( " + _0x2635fc + "px ) translateY( " + _0x7072c + "px )";
    _0x230af2.style.transform = "translateX( " + _0x2635fc + "px ) translateY( " + _0x7072c + "px )";
  }
  _makeDragItem(_0x320ab9) {
    this._trashDragItem();
    this._sortLists = document.querySelectorAll("[data-is-sortable]");
    this._clickItem = _0x320ab9;
    this._itemClass(this._clickItem, "add", "dragActive");
    this._dragItem = document.createElement(_0x320ab9.tagName);
    this._dragItem.className += this._clickItem.className + " dragging";
    this._dragItem.style.color = this._clickItem.style.color;
    this._dragItem.style.backgroundColor = this._clickItem.style.backgroundColor;
    this._dragItem.innerHTML = _0x320ab9.innerHTML;
    this._dragItem.style.position = "absolute";
    this._dragItem.style["z-index"] = "999";
    this._dragItem.style.left = (_0x320ab9.offsetLeft || 0) + "px";
    this._dragItem.style.top = (_0x320ab9.offsetTop || 0) + "px";
    this._container.appendChild(this._dragItem);
  }
  _trashDragItem() {
    if (this._dragItem && this._clickItem) {
      this._itemClass(this._clickItem, "remove", "dragActive");
      this._itemClass(this._clickItem, "remove", "dragRemove");
      this._clickItem = null;
      this._dragItem.remove();
      this._dragItem = null;
      this.editBtn.parentNode.classList.add("hidden");
    }
  }
  _onPress(_0x171261) {
    if (_0x171261?.target?.parentNode === this._container) {
      _0x171261.preventDefault();
      this._dragging = true;
      this._isTouch = false;
      this._click = this.getPoint(_0x171261);
      this._makeDragItem(_0x171261.target);
      this._onMove(_0x171261);
    }
  }
  _onPressTouch(_0x47d2a7) {
    if (_0x47d2a7?.target?.parentNode === this._container) {
      this._timer ||= setTimeout(() => {
        this._imer = null;
        this._dragging = true;
        this._isTouch = true;
        this._click = this.getPoint(_0x47d2a7);
        this._makeDragItem(_0x47d2a7.targetTouches[0].target);
        this._onMove(_0x47d2a7);
        _0x47d2a7.preventDefault();
      }, this._touchduration);
    }
  }
  _onRelease(_0x557006) {
    if (this._dragging) {
      this._dragging = false;
      this._onReleaseUp(this._clickItem);
      this._trashDragItem();
      if (this.serialized.length) {
        if (this.serialized != this.toString()) {
          this.serialized = this.toString();
          if (this._onSwap) {
            this._onSwap(this.serialized);
          }
        }
      } else {
        this.serialized = this.toString();
      }
      if (this._timer) {
        clearTimeout(this._timer);
        this._timer = null;
      }
    }
  }
  _onMove(_0x3d4f8c) {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
    if (this._dragItem && this._dragging) {
      const _0xd9312d = this.getPoint(_0x3d4f8c);
      let _0x5f3d4d = this._container;
      this.editBtn.parentNode.classList.remove("hidden");
      this._moveItem(this._dragItem, _0xd9312d.x - this._click.x, _0xd9312d.y - this._click.y);
      for (let _0x22d175 = 0; _0x22d175 < this._sortLists.length; ++_0x22d175) {
        const _0x2cf54a = this._sortLists[_0x22d175];
        if (this._isOnTop(_0x2cf54a, _0xd9312d.x, _0xd9312d.y)) {
          _0x5f3d4d = _0x2cf54a;
        }
      }
      if (this._isOnTop(_0x5f3d4d, _0xd9312d.x, _0xd9312d.y) && _0x5f3d4d.children.length === 0) {
        _0x5f3d4d.appendChild(this._clickItem);
        return;
      }
      for (let _0x26f0ad = 0; _0x26f0ad < _0x5f3d4d.children.length; ++_0x26f0ad) {
        let _0x56be5c = _0x5f3d4d.children[_0x26f0ad];
        if (_0x56be5c !== this._clickItem && _0x56be5c !== this._dragItem) {
          if (this._isOnTop(_0x56be5c, _0xd9312d.x, _0xd9312d.y)) {
            this._hovItem = _0x56be5c;
            if (this._onSwap) {
              this._swapItems(this._clickItem, _0x56be5c);
            }
          }
        }
      }
      if (this._isOnTop(this.deleteBtn, _0xd9312d.x, _0xd9312d.y)) {
        this._clickItem.classList.add("deleteActive");
        this.deleteBtn.classList.add("active");
        this._clickItem.classList.remove("editActive");
        this.editBtn.classList.remove("active");
      } else if (this._isOnTop(this.editBtn, _0xd9312d.x, _0xd9312d.y)) {
        this._clickItem.classList.add("editActive");
        this.editBtn.classList.add("active");
        this._clickItem.classList.remove("deleteActive");
        this.deleteBtn.classList.remove("active");
      } else {
        this.editBtn.classList.remove("active");
        this.deleteBtn.classList.remove("active");
        this._clickItem.classList.remove("editActive");
        this._clickItem.classList.remove("deleteActive");
      }
    }
  }
}
if (hasDarkMode()) {
  document.querySelector(".wrapper").classList.add("darkWrapper");
}