"use strict";
var DoneHiddenDivs;
var Language;
var defconfig = {
  fake: 0,
  xtrace: 1,
  trace: 0,
  xatback: "XatBackground.jpg"
};
var config = defconfig;
var uniqueid = 1;
var ImageHash = {};
var iidLine = 1;
var ImageMemory = 0;
var Seconds = 0;
var ThisPage = "";
var HiddenDivs = {};
var Fac72 = {
  1: 1,
  2: 1,
  3: 1,
  4: 1,
  6: 1,
  8: 1,
  9: 1,
  12: 1,
  18: 1,
  24: 1,
  36: 1,
  72: 1
};
var ToCq = [];
var HugKissDebug = false;
var Marks = null;
var Player = null;
var Playlist = false;
var PMMODE = false;
var reloadPowers = false;
var userFlags = 0;
var ISGRP = null;
var PSSA = null;
var TOPSH = null;
var SUPERPAWNS = null;
var SUPERPOWERS = null;
var STICKERS = null;
var REACTIONS = null;
var POWERS = null;
var MAXPOWER = null;
var MASKED = null;
var w_Powers = null;
var w_PowerO = null;
var w_Mask = null;
let forceUpdateAnimation = false;
var isWEB;
var sendFunc;
var Classic;
var PhoneTypes = {
  IPHONE: 1,
  DROIDPHONE: 5,
  WEB: 3,
  WINPHONE: 4
};
var CurrentPhoneType = null;
var xatdomain = "http://localhost:6969";
var chatUrl = xatdomain + "/web_gear/chat/";
var IDLE_ROOM = 3;
let audiesList = ["howl", "44", "44inside", "accessdeniedfemale", "accessdeniedmale", "accessgranted", "airbrake", "airbrake2", "airhorn", "alarmbeep", "alarmclockbeep", "allclear", "ambulance", "and", "angrywoman", "aoogahorn", "aoogahorn2", "applausesmall", "arrowhit", "babyrattle", "balloonblowout", "balloonblowup", "balloonstretchsnap", "bangecho", "banneropen", "basketballbounce", "bass", "bathtubsplash", "bbboard", "bbswish", "bee", "beeswarm", "birdfly", "biteonice", "blink", "blip", "bloop", "blowraspberry", "boatairhorn", "boatcreak", "boathorn", "boing", "boing2", "bookpages", "bottlerocket", "boxingbellmulti", "breakplate", "breakwindow", "bricksfall", "bubbling2", "bulletbody", "bulletricochet", "burp", "busdoorslide", "bushorn", "button", "buttonbeep", "buttondroop", "buttonflutter", "buttonzip", "buzzer", "buzzer2", "buzzer3", "buzzer4", "buzzer5", "buzzerheavy", "buzzthroughloud", "buzzthru", "buzzthruloud", "camel", "cameraclick", "cameraclick2", "camerashutter", "camerazoomout", "cannedlaugh2", "cannon", "caralarm", "carcrash", "cardoording", "cardooropen", "cardoorshut", "carhornold2", "carhornshort", "carhorntwice", "carscreech", "carscreech2", "carscreech3", "carscreechstop", "carstart", "cartooncharge", "cartoonfall", "cartoonhammer", "cartoonphone", "cartoonrise", "cartoonrun", "cartoonspinstop", "cartoonsplit", "cartoonsqueak", "cartoonyahoo", "cashregister", "catmeow", "catmeow2", "catscream", "catscreech", "catyell", "cellphone", "censoredbeep", "chaching", "chain", "chainrattle", "chainsaw", "chalkboard", "chimp", "choke", "chop", "chop2", "cicadachirp2", "clickfast", "clickon", "clockchime1", "clocktick", "clocktickfast", "closewindow", "clownbugle", "cockatiel", "cockatiel2", "cockgun", "cockgun2", "cockgun3", "codered", "coinstable", "cointable", "colt45", "computerbeep", "computerbeep2", "computerbeep3", "computerbeep4", "computerprocess", "computerprocess2", "computerspring", "coocoo3", "cough", "cowboy", "creakslam", "cricket", "crow", "crow2", "crowdohh", "crunch", "cupsaucer", "dice", "dissolve", "dissolve2", "dogbark", "dogbark2", "doggrowl", "dolphin", "donkey", "donyahoo", "doorbell", "doorbell2", "doorbell3", "doorcreak", "doorcreak2", "doorcreak3", "dooropen", "doorslam", "dotmatrix3", "doubleclick", "dovefly", "drain", "dream", "drillshort", "dropinwater", "duckquack", "dullthump", "eagle", "eatcookie", "eatlikeapig", "electricalcurrent2", "electricarc", "electricdrill", "electricshock", "electronicheart", "electronicping", "eleoogahorn", "elephant", "elephant2", "elevator", "elevatording", "elevatordoor", "error", "explode", "explosion", "explosion2", "fall", "fall2", "fanfare", "fanfare2", "fart", "fart2", "fart3", "fart4", "fasttalk", "faucet", "fight", "fightmotion", "fill", "firetrucksiren2", "fireworkfire", "fireworks", "fireworksparklepop", "fishingreel", "flagpole", "flashbulb", "flashbulbs", "flashbulbs2", "flatline2", "flicklighter", "flushtoilet", "fly", "flyacross", "flymetal", "foghorn", "foghorn2", "freezerdoor", "frog2", "funnycarburnout", "fuse", "futurebeep", "futurebeep2", "futurebeep3", "gavel", "giantalienlaugh", "giddy", "giddylaugh", "glassbreak", "glassbreaking", "goaway", "golfball", "goodbyefemale", "goodbyemale", "goodmorningfemale", "goopy", "gotaproblem", "gotgas", "gotmailrap", "gotmailrap2", "gotmega", "gravelwalk", "groan", "groan2", "grow", "grow2", "gunfight2", "gunshots3", "hallelujah", "hammer", "handbellchristmas", "happynewyear", "happythanksgiving", "hardknock", "harp", "heartbeat3", "heartmonitorbeep", "hellobaby", "highpitchsqueal", "hisexy", "hiss", "hithard", "hockeystick", "hohoho", "hornwarning", "horsegallop2", "horseneigh", "horseneigh2", "horserun", "horsesrun", "howl2", "huh", "hurryup", "hurtdog", "iceglass", "iloveyoufemale", "iloveyoumale", "implosion", "implosion2", "indiancall", "indiancall2", "indiandrums", "inhale", "insidejet", "interference", "intruderalert", "invaliduser", "jaildoorclose", "jaildoorclose2", "jarlidtwist", "jelly", "jetpass", "jetstart2", "jetstart3", "jokedrum", "keylock", "keys", "kick", "kickass", "kickdoor", "kickdoordown", "kidscheer", "kidsscream", "kiss", "kiss2", "knockdoor", "knockhard", "ladder", "laserfire", "laserfire2", "laserfire3", "lasersword", "lasersword2", "laughcartoon", "laughingman", "laughingman2", "laughingman3", "laughingman4", "laughingman6", "laughingman7", "laughslow", "launchexplode", "lick", "lick2", "lion", "lion2", "lionscream", "liquidblast", "loadclip", "luger", "lumbercrash", "m16", "m16singleshot", "m80", "machinegun", "machineshutdown", "magic", "manwah", "match", "meatsizzle", "merrychristmaself", "metal", "metal2", "metalclang", "metaldooropen", "metalspecial", "metronome", "mice", "missilebeep", "missilebeep2", "missilebeep3", "modem", "monitorflatline", "morsecode", "motorcycle", "mouse", "mousesqueak", "movieend", "musicalhorn", "muzzleloadshot", "navywhistle", "niceday", "nightingale", "officephone", "ohhh", "oldcarhorn", "oldphone", "oldphonering2", "outboard", "ovendoor", "ow", "owl", "pageturn", "paintcanclickfast", "pan", "pant", "panther", "paperturnquick", "parrott", "partyhorn", "pasqueal", "peellongrubber", "peelshortrubber", "penclick", "phonebusy", "phonepickup", "phonering", "pianosmash", "pig", "pigeon", "pinball", "ping", "pipebang", "pissmiss", "pistolshot", "planeidle", "planelow", "platebreak", "platesilverware", "ploop", "policebullhorn", "poolballhit", "poolbreak", "poolpocket", "poolsplash", "pop2", "pop3", "poptop", "potsandpans", "pourbeer", "poursoda", "poweroff", "poweron", "puke", "pukewet", "punch", "punch123", "punch5", "punchhard", "pushpin", "racecar", "radarping", "radioadjustecho", "radiobeep", "raspberryfart", "rattlespray", "reversecymbal", "rifleshotecho", "ringbellmedium", "ringbellsmall", "ringbellsmall2", "robotarm", "rockdoor", "rooster", "ropestretch", "rundoorslam", "runtowards", "safeclose", "saxophone", "scarycartoon", "scarynote", "schoolbellshort", "scratchneedle", "scratchneedlelong", "scream", "screamman", "screamshort", "screamshutup", "screamwhat", "screendoor", "screendoorclose", "shakerolldice", "sheep", "shockperson", "shootglass", "shortbeeptone", "shotclockhorn", "shotgun", "shotgun2", "showercurtain", "shrink", "shutdowninprocess", "shutupmexican", "silvercoin", "singlegunshot", "sirenhorn", "slambigdoor", "slap", "slash", "slice", "sliderock", "slowlaugh", "slurp", "slurpfast", "slurping", "smallbell", "smallchimes", "smallgiggle", "smallwaterfall", "smash", "snakehiss", "snaredrumroll", "sneeze", "sneezewoman", "snore", "snore2", "sodatwistoff", "spaceball", "spacebeep", "sparkle", "sparrow", "specialgift", "spin", "splat", "spookylaugh", "spraybottle", "spraypaint", "spurssteps4", "squeaky", "squeaky2", "stapler", "startinggate", "static", "staticlong", "stumblebreak", "success", "suck", "suck2", "swing", "sword", "takeone", "tapetearoff", "tearcloth", "telegraph", "tennis", "thankyoufemale", "thankyoumale", "thunderrumble2", "tincan", "tireblowout", "tiresquealcorner", "tminus", "toasterpopup", "toytrainhorn", "traffichorns", "trafficjam", "trainhorn", "trainpassfast", "trashcan", "trashcan2", "triangle", "triangle2", "truckairhorn", "truckbrake", "truckhorn", "trumpet", "tugboathorn", "turkey", "turnofftv", "turnontv", "typewriter", "typewriterding", "typewritershift", "ugh", "uhohcomputer", "uhohcomputer2", "uhohcomputer3", "uncork", "underwater", "urconnected", "voicesample", "vwhorn", "walkhall", "warning", "warningbass", "waterballoon", "waterflow", "waterflow2", "wawaahorn", "weatherwarning", "welcomefemale", "welcomewindows2k", "welder2", "whip", "whip2", "whipcrack", "whiskaway", "whistleblow", "whistleblowhere", "whistledown", "whistlehere", "whistleshort", "whistlesparkle", "whistleup", "whistlewolf", "wildcat", "wildcat2", "windchandelier", "windowclose", "windows2kgoodbye", "windowslide", "windup", "witchlaugh", "womancry", "womanlaugh", "womanscream", "womansneeze", "woodplaner", "woodsplinter", "write", "wronganswer", "wronganswer2", "wrongnumbertone", "xpgoodbye", "xylophone", "yawn", "yougotcheesypoofs", "yougotmailscary", "yougotmailwhispered", "zipper", "zoom", "zoomaway"];
let resizeBtn = null;
let minimized = false;
let playerToolBar = null;
let playerContainer = null;
let tooltip = null;
let timeoutId = null;
let showRapid = false;
const avatarFrames = [{
  name: "heartthorns",
  scale: 1.3,
  isRound: false
}, {
  name: "heartpunk",
  scale: 1.3,
  isRound: false
}, {
  name: "heartlocked",
  scale: 1.28,
  isRound: false
}, {
  name: "heartgarden",
  scale: 1.25,
  isRound: false
}, {
  name: "heartcloud",
  scale: 1.2,
  isRound: false
}, {
  name: "heartbloom",
  scale: 1.26,
  isRound: false
}, {
  name: "heartaurea",
  scale: 1.2,
  isRound: true
}, {
  name: "frost",
  scale: 1.25,
  isRound: false
}, {
  name: "christmas",
  scale: 1.3,
  isRound: false
}];
const kFreeId = 45;
const StatusfxId = 623;
const StatusEffects = [{
  set: 1,
  key: "scrollleft",
  name: "Scroll Left"
}, {
  set: 1,
  key: "scrollright",
  name: "Scroll Right"
}, {
  set: 1,
  key: "scrollup",
  name: "Scroll Up"
}, {
  set: 1,
  key: "scrolldown",
  name: "Scroll Down"
}, {
  set: 2,
  key: "bounce",
  name: "Bounce"
}, {
  set: 2,
  key: "fadeout",
  name: "Fade-Out"
}, {
  set: 2,
  key: "shake",
  name: "Shake"
}, {
  set: 2,
  key: "translucent",
  name: "Translucent"
}, {
  set: 3,
  key: "flip",
  name: "Flip"
}, {
  set: 3,
  key: "slidedown",
  name: "Slide Down"
}, {
  set: 3,
  key: "slideright",
  name: "Slide Right"
}, {
  set: 3,
  key: "typing",
  name: "Typing"
}, {
  set: 4,
  key: "wave",
  name: "Wave"
}];
window.kPstyleClasslist = Object.freeze(["pg1", "pg2", "pg3", "pg4", "pg5", "pg6", "pg7", "pg8", "pg9", "pg10", "pg11", "pg12", "pg13", "pg14", "pgNone", "mushRoom", "psHalloween", "psMorgana", "psLems", "psKitsune", "pstyleFx"]);
window.kPstyleKeys = Object.freeze(["pg1", "pg2", "pg3", "pg4", "pg5", "pg6", "pg7", "pg8", "pg9", "pg10", "pg11", "pg12", "pg13", "pg14"]);
const MessageErrorCodes = {
  LinkInLinkMarkupDetected: -1
};
var _Activity;
try {
  if (_Activity === undefined) {
    _Activity = parent._Activity !== undefined ? parent._Activity : parent.parent._Activity !== undefined ? parent.parent._Activity : parent.parent.parent._Activity !== undefined ? parent.parent.parent._Activity : parent?.box?._Activity !== undefined ? parent.box._Activity : {};
  }
} catch (a0_0x228a2d) {
  console.warn("Cross-origin restriction encountered while accessing _Activity.", a0_0x228a2d);
  _Activity = {};
}
let appFromUrl = null;
function xatMain(_0x1f5ada) {
  var _0x2cef30 = JSON.parse(_0x1f5ada);
  config = defconfig;
  setdarkmode();
  for (var _0x328e40 in _0x2cef30) {
    config[_0x328e40] = _0x2cef30[_0x328e40];
  }
  if (_0x2cef30.MyId !== undefined) {
    _Activity.instance.MyId = xInt(_0x2cef30.MyId);
  }
  if (!_Activity.instance.IsClassic && config.MyId && parent) {
    _Activity.instance.MyObj = config;
  }
  if (_Activity.instance.IsClassic && !_Activity.instance.QuickBar) {
    loadQuickBar();
  }
  config.PhoneType = xInt(config.PhoneType);
  config.GroupName ||= parent.ClassicGroup || "";
  xatdomain = config.dom;
  ThisPage = _0x2cef30.page;
  if (config.chatid) {
    setEventsLink(config.chatid);
  }
  let _0x3c2097 = Macros?.sline?.split(",");
  _0x3c2097 &&= _0x3c2097.filter(_0x168609 => _0x168609);
  if (_0x3c2097?.length && config.pFlags & NamePowers.sline) {
    addSmileyBar(Macros.sline, config.Flags & NamePowers.NoSmilieLine);
  } else if (gconfig && gconfig.g74) {
    addSmileyBar(gconfig.g74, config.Flags & NamePowers.NoSmilieLine);
  } else {
    addSmileyBar(null, config.Flags & NamePowers.NoSmilieLine);
  }
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
      document.body.classList.remove("noAnimations");
    } else {
      document.body.classList.add("noAnimations");
    }
  });
  window.addEventListener("pagehide", _0x1eab6a => {
    if (_0x1eab6a.persisted) {
      document.body.classList.add("noAnimations");
    }
  }, false);
  if (!appFromUrl && (appFromUrl = new URLSearchParams(parent.parent.location.search).get("open"), appFromUrl && appFromUrl.indexOf(".") != -1)) {
    const _0x38ef95 = appFromUrl.split(".")[0].toLowerCase();
    const _0x491a21 = capitalize(appFromUrl.split(".")[1].toLowerCase());
    let _0x1bff20;
    try {
      _0x1bff20 = appFromUrl.split(".")[2].toLowerCase();
    } catch (_0x4d57b4) {}
    classicSetDialog(_0x38ef95, {
      Type: _0x491a21,
      Pack: _0x1bff20,
      Config: config
    });
  }
  if (reloadPowers) {
    reloadPowersBank();
    reloadPowers = false;
  }
  isWEB = config.PhoneType == PhoneTypes.WEB;
  CurrentPhoneType = config.PhoneType;
  if (!(Language = config.lang.substr(0, 2).toLowerCase())) {
    Language = "en";
  }
  if (_0x2cef30.roomid) {
    _Activity.instance.CurrentChat = _0x2cef30.roomid;
  }
  if (_0x2cef30.pFlags) {
    userFlags = _0x2cef30.pFlags;
  }
}
function IsAnimationOn() {
  return _Activity.instance?.UserSettings?.animation !== "disable";
}
function isBackgroundAnimationOn() {
  return _Activity.instance?.UserSettings?.backgroundanimation !== "disable";
}
function isHugAnimationOn() {
  return _Activity.instance?.UserSettings?.huganimation !== "disable";
}
function isRingingSoundOn() {
  return _Activity.instance?.UserSettings?.LiveRingingSound !== "disable";
}
function liveModeType() {
  return _Activity.instance?.UserSettings?.LiveAppMode;
}
function loadQuickBar(_0x17b063) {
  if (typeof _Activity.instance.QuickBar != "object" || !_Activity.instance.IsClassic || _0x17b063) {
    try {
      _Activity.instance.QuickBar = new Quickbar();
      _Activity.instance.QuickBar.init(_0x17b063);
    } catch (_0x58613e) {}
  }
}
function SetPow() {
  if (PSSA || parent?.PSSA) {
    if (localStorage.getItem("w_Powers") && localStorage.getItem("todo")) {
      MAXPOWER = (PSSA || parent?.PSSA).length - 1;
      w_Powers = [];
      let _0x555ee1 = JSON.parse(localStorage.getItem("w_Powers"));
      for (let _0x578d7e in _0x555ee1) {
        w_Powers[xInt(_0x578d7e)] = xInt(_0x555ee1[_0x578d7e]);
      }
      w_PowerO = JSON.parse(localStorage.getItem("todo")).w_PowerO;
      if (w_Powers.length > 0) {
        setUserBank();
      }
    }
    if (localStorage.getItem("w_Mask") && (w_Mask = JSON.parse(localStorage.getItem("w_Mask")))) {
      setDisabledPowers();
    }
  }
}
function reloadPowersBank() {
  SetPow();
  setUserBank();
  setDisabledPowers();
}
function debug(_0x3e8297) {
  return config[_0x3e8297];
}
function xtrace(_0x3dff93) {
  if (debug("xtrace")) {
    ToC({
      Type: "xtrace",
      msg: _0x3dff93
    }, true);
  }
}
function FromObjC(_0x5a551f) {
  switch (_0x5a551f) {
    case "webViewDidFinishLoad":
    case "viewWillAppear":
    case "MessageUpdate":
    case "MessageUpdateAll":
    case "FriendsUpdate":
    case "ChatsUpdate":
    case "VisitorsUpdate":
      break;
    default:
      return;
  }
  if (ThisPage) {
    ToC({
      Type: _0x5a551f,
      Page: ThisPage
    });
  }
}
let commandRegex = /\/(\w+)(?: (\w+))?/;
function ToC(_0x393dbe, _0x33e148) {
  _0x393dbe.Type ||= _0x393dbe.Command;
  _0x393dbe.Command ||= _0x393dbe.Type;
  _0x393dbe.Page ||= ThisPage;
  if (_0x393dbe.Command == "LoadClassicDialog") {
    _Activity.instance.CurrentChatC = null;
  }
  if (typeof messages != "undefined" && _0x393dbe.Command === "Click") {
    messages.editMode = false;
  }
  if (_0x393dbe.ChatId && _0x393dbe.Page && _0x393dbe.Page == "chats") {
    if (_0x393dbe.ChatId.indexOf("_") >= 0) {
      _Activity.instance.CurrentChatC = null;
    } else if (_0x393dbe.ChatId > 0) {
      _Activity.instance.CurrentChatC = _0x393dbe.ChatId;
    }
  }
  if (Classic && _0x393dbe.Next == "pop") {
    _0x393dbe.Next = "";
  }
  if (!!_0x393dbe.Message && (_0x393dbe.Message.substr(0, 2) == "/+" || _0x393dbe.Message.substr(0, 2) == "/-")) {
    reloadPowers = true;
    messages.setTypingOff();
  }
  if (!Classic && typeof messages != "undefined") {
    if (_0x393dbe.Command && ["swipeleft", "swiperight"].indexOf(_0x393dbe.Command) >= 0 || _0x393dbe.Next && _0x393dbe.Next == "visitors") {
      messages.setTypingOff();
    }
  }
  if (_0x393dbe.Type == "Send" && _0x393dbe.Message[0] == "/") {
    let _0x485b68 = commandRegex.exec(_0x393dbe.Message);
    _0x485b68 &&= _0x485b68[1];
    if (_0x485b68) {
      switch (_0x485b68.toLowerCase()) {
        case "rtl":
        case "ltr":
          saveSetting("textDirection", _0x485b68);
          document.getElementById("textEntryEditable").style.direction = _0x485b68;
          break;
        case "away":
          messages.setTypingOff();
          break;
        case "gameban":
          GameBan(_0x393dbe.Message.split(" ")[1], Date.now() + 10000000);
          break;
        case "bump":
          document.body.classList.add("bump");
          setTimeout(() => {
            document.body.classList.remove("bump");
          }, 1300);
          doSound("laserfire3");
      }
    }
  }
  _Activity.instance.QueueCommand(_0x393dbe);
}
function GetXconst(_0x16c534, _0x84bfb7) {
  try {
    _0x84bfb7 = JSON.parse(_0x84bfb7);
  } catch (_0x1e02b8) {
    if (typeof _0x84bfb7 == "string") {
      _0x84bfb7 = _0x84bfb7.split(",");
    }
  }
  _Activity.instance.xConsts[_0x16c534] = _0x84bfb7;
  switch (_0x16c534) {
    case "isgrp":
      ISGRP = _0x84bfb7;
      break;
    case "pssa":
      _Activity.instance.PSSA = PSSA = _0x84bfb7;
      SetPow();
      break;
    case "topsh":
      _Activity.instance.TOPSH = TOPSH = _0x84bfb7;
      break;
    case "SuperPowers":
      _Activity.instance.SUPERPOWERS = SUPERPOWERS = _0x84bfb7;
      break;
    case "SuperPawns":
      SUPERPAWNS = _0x84bfb7;
      break;
    case "Stickers":
      STICKERS = _0x84bfb7;
      break;
    case "reactions":
      if (!_0x84bfb7 || _0x84bfb7.length === 0) {
        break;
      }
      REACTIONS = _0x84bfb7;
      if (!messages.reactionsInit) {
        messages.reactionsInit = true;
        messages.setUpReactionsSelector();
      }
      break;
    case "soth":
      _Activity.instance.SOTH = _0x84bfb7;
      break;
    case "syel":
      _Activity.instance.SYEL = _0x84bfb7;
      break;
    case "uCollections":
      _Activity.instance.UCOLLECTIONS = _0x84bfb7;
      break;
    case "effects":
      _Activity.instance.EFFECTS = _0x84bfb7;
      break;
    case "frames":
      _Activity.instance.FRAMES = _0x84bfb7;
      break;
    case "aces":
      _Activity.instance.ACES = _0x84bfb7;
  }
}
function GetXconsts(_0xb45e2a, _0x26e14e, _0x186669) {
  _0x26e14e ||= ["pssa", "topsh", "SuperPowers", "SuperPawns", "isgrp", "Stickers", "reactions", "soth", "syel", "uCollections", "effects", "frames", "aces"];
  if (_0x186669) {
    let _0x363be3 = [];
    for (let _0x1b0ab5 in _0x26e14e) {
      let _0x44b932 = _0x26e14e[_0x1b0ab5];
      if (!_0x186669[_0x44b932] || _0x44b932 == "end" || _0x44b932 == "MainObj") {
        _0x363be3.push(_0x44b932);
      }
    }
    _0x26e14e = _0x363be3;
  }
  if (_Activity.instance.xConsts) {
    delete _Activity.instance.xConsts.reactions;
    delete _Activity.instance.xConsts.pssa;
    delete _Activity.instance.xConsts.topsh;
  }
  for (let _0x2c5c96 in _0x26e14e) {
    if (_0xb45e2a === "selector" || !_Activity.instance.xConsts[_0x26e14e[_0x2c5c96]]) {
      ToC({
        Command: "GetXconst",
        js: _0xb45e2a,
        obj: _0x26e14e[_0x2c5c96]
      });
    }
  }
}
function loadXavi(_0x307036, _0x2cd275, _0x1c9f56, _0xfeb587, _0x1e0dd5, _0x42e626, _0x4bc197) {
  const _0x5eff92 = makeElement(_0x307036, "div", "messageAvatar xavi");
  const _0x4a6454 = makeElement(_0x5eff92, "iframe", "xaviFrame");
  _0x4a6454.scrolling = "no";
  _0x4a6454.loading = "lazy";
  _0x4a6454.src = "../../xavi/xavi.html#chat&" + _0x2cd275 + "&" + encodeURIComponent(_0x1c9f56) + "&" + _0xfeb587 + "&" + _0x42e626 + "&" + _0x4bc197 + "&" + encodeURIComponent(PSSA);
  return _0x5eff92;
}
function GameBan(_0x560a62, _0x2a682, _0x47f218 = 0, _0x1d1fc8 = 0) {
  let _0xd433c1 = document.querySelector("#gamesContainer");
  if (_0x560a62 == 0 || _0xd433c1.childNodes.length == 0) {
    if (_0x560a62 != 0) {
      if (_0xd433c1) {
        _0xd433c1.innerHTML = "";
        _0xd433c1.style.display = "block";
      }
      let _0x28a1fc = makeElement(_0xd433c1, "iframe", "gameFrame");
      switch (xInt(_0x560a62)) {
        case 162:
          _0x28a1fc.src = "../gameban/codeban/index.html#" + _0x2a682;
          break;
        case 134:
          _0x28a1fc.src = "../gameban/snakeban/index.html#" + _0x2a682;
          break;
        case 136:
          _0x28a1fc.src = "../gameban/spaceban/index.html#" + _0x2a682;
          break;
        case 236:
        case 152:
        case 140:
          const {
            innerWidth: _0x5ee3b8,
            innerHeight: _0x4d8012
          } = window;
          const _0x2bf318 = "" + [_0x2a682, _0x47f218, _0x1d1fc8, _0x560a62, config.MyId, _0x5ee3b8, _0x4d8012].join(",");
          _0x28a1fc.src = "../gameban/other/index.html#" + _0x2bf318;
          break;
        default:
          _0xd433c1.innerHTML = "";
          _0xd433c1.style.display = "none";
      }
    } else {
      closeGameBan();
    }
  }
}
function closeGameBan() {
  let _0x43c208 = document.querySelector("#gamesContainer") || parent.document.querySelector("#gamesContainer");
  if (_0x43c208) {
    _0x43c208.innerHTML = "";
    _0x43c208.style.display = "none";
  }
}
function openInNewTab(_0x4f0e16, _0x2b5777) {
  _0x2b5777 ||= "_blank";
  if (_0x2b5777 = window.open(_0x4f0e16, _0x2b5777)) {
    _0x2b5777.focus();
  }
}
function HitWeb(_0x3994c7, _0x5d48f3) {
  if (!(_0x3994c7.search(/app:/i) >= 0)) {
    if (_0x3994c7.search("://") < 0) {
      _0x3994c7 = "https://" + _0x3994c7;
    }
    openInNewTab(_0x3994c7);
  }
}
function HitWiki(_0x9dd69f, _0x329177) {
  HitWeb("https://util.localhost:6969/wiki/index.php?title=" + _0x9dd69f, _0x329177);
}
function LinkValidator(_0x122335, _0x406d72, _0x41111a) {
  if ((_0x406d72 = _0x406d72.replace(/＆/g, "&")).includes("linkvalidator.net/")) {
    return;
  }
  if (_0x122335) {
    _0x122335.stopPropagation();
  }
  var _0x80e268;
  var _0x93dc2f = _0x406d72.charAt(0);
  if (_0x93dc2f == "^") {
    ToC({
      Command: "StartApp",
      n: "canvas",
      a1: _0x406d72.substr(1)
    });
    return;
  }
  if (_0x93dc2f == "@") {
    _0x80e268 = "https://xat.me/" + _0x406d72.substr(1);
    if (_0x41111a) {
      return _0x80e268;
    } else {
      HitWeb(_0x80e268);
      return;
    }
  }
  if (_0x93dc2f == "%") {
    _0x80e268 = xatdomain + "/" + _0x406d72.substr(1);
    if (_0x41111a) {
      return _0x80e268;
    } else if (isWEB) {
      HitWeb(_0x80e268);
      return;
    } else {
      ToC({
        Command: "StartGroup",
        Group: _0x406d72.substr(1)
      });
      return;
    }
  }
  if (_0x406d72 === "vote") {
    _Activity.instance.QuickBar.toggleSideBar(true);
    let _0x29bbd2 = findNodeInWindowOrParent("#sideBarItemvote");
    if (!_Activity.IsClassic) {
      const _0xeba496 = findNodeInWindowOrParent("#textEntryEditable");
      _0xeba496?.blur();
    }
    if (_0x29bbd2) {
      _0x29bbd2.click();
    }
    return;
  }
  let _0x145115;
  _0x406d72 = _0x406d72?.replace(/\u00A0/, "");
  try {
    _0x145115 = new URL(_0x406d72);
  } catch (_0x39e68e) {
    _0x145115 = {};
  }
  if (_Activity.instance.UserSettings?.linkvalidator == "disable" && ["^", "@", "%"].indexOf(_0x406d72.charAt(0)) == -1 || ["localhost:6969", "xat.wiki", "forum.xat.com"].includes(_0x145115.host)) {
    if (_0x41111a) {
      return _0x406d72;
    } else {
      HitWeb(_0x406d72);
      return;
    }
  }
  var _0x38d659;
  var _0x36ed27 = new Array(64);
  for (_0x38d659 = 0; _0x38d659 < 26; _0x38d659++) {
    _0x36ed27[_0x38d659] = String.fromCharCode(_0x38d659 + 65);
  }
  for (_0x38d659 = 26; _0x38d659 < 52; _0x38d659++) {
    _0x36ed27[_0x38d659] = String.fromCharCode(_0x38d659 + 71);
  }
  for (_0x38d659 = 52; _0x38d659 < 62; _0x38d659++) {
    _0x36ed27[_0x38d659] = String.fromCharCode(_0x38d659 - 4);
  }
  _0x36ed27[62] = "+";
  _0x36ed27[63] = "/";
  var _0x3e3d31 = new Array();
  var _0x1ce7e8 = new Array();
  for (_0x38d659 = 0; _0x38d659 < _0x406d72.length; _0x38d659++) {
    _0x3e3d31[_0x38d659] = _0x406d72.charCodeAt(_0x38d659);
  }
  for (_0x38d659 = 0; _0x38d659 < _0x3e3d31.length; _0x38d659++) {
    switch (_0x38d659 % 3) {
      case 0:
        _0x1ce7e8.push(_0x36ed27[(_0x3e3d31[_0x38d659] & 252) >> 2]);
        break;
      case 1:
        _0x1ce7e8.push(_0x36ed27[(_0x3e3d31[_0x38d659 - 1] & 3) << 4 | (_0x3e3d31[_0x38d659] & 240) >> 4]);
        break;
      case 2:
        _0x1ce7e8.push(_0x36ed27[(_0x3e3d31[_0x38d659 - 1] & 15) << 2 | (_0x3e3d31[_0x38d659] & 192) >> 6]);
        _0x1ce7e8.push(_0x36ed27[_0x3e3d31[_0x38d659] & 63]);
    }
  }
  if (_0x38d659 % 3 == 1) {
    _0x1ce7e8.push(_0x36ed27[(_0x3e3d31[_0x38d659 - 1] & 3) << 4]);
  } else if (_0x38d659 % 3 == 2) {
    _0x1ce7e8.push(_0x36ed27[(_0x3e3d31[_0x38d659 - 1] & 15) << 2]);
  }
  _0x38d659 = _0x1ce7e8.length;
  for (; _0x38d659 % 4 != 0; _0x38d659++) {
    _0x1ce7e8.push("=");
  }
  var _0x583b92 = "m=1&";
  if (isWEB) {
    _0x583b92 = "";
  }
  var _0x2089f4 = "https://linkvalidator.net/warn.php?" + _0x583b92 + "p=";
  for (_0x38d659 = 0; _0x38d659 < _0x1ce7e8.length; _0x38d659++) {
    _0x2089f4 += _0x1ce7e8[_0x38d659];
  }
  if (_0x41111a) {
    return _0x2089f4;
  }
  HitWeb(_0x2089f4);
}
var gconfig;
var Macros;
function setGconfig(_0xed8dd0) {
  for (var _0x27a91b in gconfig = JSON.parse(_0xed8dd0)) {
    if (gconfig[_0x27a91b].charAt(0) == "{") {
      if (gconfig[_0x27a91b].charAt(1) == "`") {
        gconfig[_0x27a91b] = gconfig[_0x27a91b].replace(/`/g, "\"");
      }
      gconfig[_0x27a91b] = JSON.parse(gconfig[_0x27a91b]);
    }
  }
  if (gconfig.g100) {
    var _0x56850b = gconfig.g100.split(",");
    gconfig.g100 = {};
    for (var _0x24bb6e = 0; _0x24bb6e + 1 < _0x56850b.length; _0x24bb6e += 2) {
      gconfig.g100[_0x56850b[_0x24bb6e]] = _0x56850b[_0x24bb6e + 1];
    }
  }
  _Activity.instance.gConfig = gconfig;
}
function setMacros(_0x4db515) {
  Macros = JSON.parse(_0x4db515);
}
function setSettings(_0x3715c2) {
  _Activity.instance.UserSettings = JSON.parse(_0x3715c2);
}
function setAppIcon(_0x321aec) {
  let _0x430979 = {
    channel: _0x321aec,
    user: 0,
    msg: "",
    tobox: 1
  };
  parent.parent.parent.postMessage(JSON.stringify(_0x430979), "http://localhost:6969");
}
let prevSmilies = null;
let smTimeoutId = null;
let gotSmConfig = false;
let debugFlag = 0;
function addSmileyBar(_0x2ffa59, _0x2ce235) {
  if (!_0x2ffa59 || _0x2ffa59.replace(/ /g, "").length == 0) {
    _0x2ffa59 = "smile,biggrin,wink,eek,tongue,cool,mad,confused,redface,frown,crying,sleepy";
  }
  let _0x3b8310 = document.querySelector("#smileyBar");
  if (prevSmilies != _0x2ffa59 || debugFlag != (config.Flags & NamePowers.ChatIsDebug) || forceUpdateAnimation) {
    gotSmConfig = false;
  }
  if (gotSmConfig || !_0x3b8310 || window.innerHeight <= 300) {
    return;
  }
  if (gconfig && gconfig.hasOwnProperty("g74")) {
    gotSmConfig = true;
  }
  prevSmilies = _0x2ffa59;
  forceUpdateAnimation = false;
  _0x2ffa59 = _0x2ffa59.split(",");
  let _0x4fbbfc = ["smile", "biggrin", "wink", "eek", "tongue", "cool", "mad", "confused", "redface", "frown", "crying", "sleepy"];
  _0x3b8310.innerHTML = "";
  for (let _0x5f5fb3 = 0; _0x5f5fb3 < _0x2ffa59.length; _0x5f5fb3++) {
    if (_0x2ffa59[_0x5f5fb3]) {
      _0x4fbbfc[_0x5f5fb3] = _0x2ffa59[_0x5f5fb3];
    }
  }
  const _0x5cca82 = window.innerWidth > 500 ? 12 : 8;
  _0x4fbbfc.length = _0x5cca82;
  _0x4fbbfc.forEach((_0x582e18, _0x282581) => {
    let _0x2e9086 = _0x2ce235 && _0x282581 == 0 ? "smiley smToggle" : _0x2ce235 ? "smiley smToggle2 smOff" : "smiley";
    const _0x4042c2 = _Activity.instance.Smilies.MakeSmiley(makeElement(_0x3b8310, "div", _0x2e9086), _0x582e18, {
      size: 30,
      tooltip: "(" + _0x582e18 + ")",
      tooltipPosition: "low",
      showAd: false,
      align: true,
      addGback: true,
      callback: () => {
        smiliePressed("(" + _0x582e18 + ")");
      }
    });
    if (_0x2ce235 && !_0x282581) {
      _0x4042c2.addEventListener("mouseenter", _0x27f55f => {
        window.clearTimeout(smTimeoutId);
        smTimeoutId = window.setTimeout(() => {
          document.querySelectorAll(".smOff").forEach(_0x492f26 => {
            _0x492f26.classList.remove("smOff");
          });
          document.querySelectorAll(".smiley").forEach(_0x591c72 => {
            _0x591c72.addEventListener("mouseleave", _0x5b041c => {
              window.clearTimeout(smTimeoutId);
              smTimeoutId = window.setTimeout(() => {
                document.querySelectorAll(".smToggle2").forEach(_0x16ea4f => {
                  _0x16ea4f.classList.add("smOff");
                });
              }, 500);
            });
          });
        }, 500);
      });
    }
  });
  const _0x63d287 = makeElement(_0x3b8310, "div", "cell svgBack smline sideApp shake");
  _0x63d287.style.cssText = "width: 6%; height: 30px; right: 0; background-image: url('svg/8ball" + (config.Flags & NamePowers.ChatIsDebug ? "b" : "") + ".svg')";
  _0x63d287.onclick = getStuffPressed;
  const _0x2ff460 = makeElement(_0x3b8310, "div", "cell svgBack smline sideApp");
  _0x2ff460.style.cssText = "width: 6%; height: 30px; right: 0; background-image: url('svg/getx.svg')";
  _0x2ff460.onclick = buyPressed;
  const _0x53df32 = makeElement(_0x3b8310, "div", "cell svgBack smline sideApp", "spkBut");
  _0x53df32.style.cssText = "width: 6%; height: 30px; right: 0;";
  _0x53df32.onclick = spkPressed;
  addToolTip(_0x63d287, ["box.139", "Get Stuff"], {
    position: "low"
  });
  addToolTip(_0x2ff460, ["box.207", "Click to buy"], {
    position: "low"
  });
  addToolTip(_0x53df32, ["mob1.managesounds", "Manage sounds"], {
    position: "low"
  });
  debugFlag = config.Flags & NamePowers.ChatIsDebug;
}
var keywords = {
  xavi: 9,
  wiki: "wiki",
  twitter: "twitter",
  facebook: "facebook",
  instagram: "instagram",
  android: "android",
  search: "search",
  power: "power",
  powers: "power",
  store: "store",
  promote: "promotion",
  promotion: "promotion",
  shortname: "shortname",
  auction: "auction",
  audies: "audies",
  doodle: 9,
  trade: 9,
  smilie: 3,
  smilies: 3,
  smiley: 3,
  register: 5,
  login: 6,
  buy: 7,
  coin: 7,
  coins: 7,
  xats: 7,
  subscriber: 7,
  gift: 8,
  grid: 9,
  spacewar: 9,
  matchrace: 9,
  doodlerace: 9,
  snakerace: 9,
  switch: 9,
  hearts: 9,
  darts: 9,
  zwhack: 9,
  stick: 9,
  chess: 9,
  fourinarow: 9,
  canvas: 9,
  pool: 9,
  media: 10001,
  translator: 11,
  translate: 11,
  pawns: 9,
  vote: "vote",
  aces: "aces",
  nuclear: 9,
  supercycle: 9,
  count: 9,
  live: 9
};
const customAppCodes = {
  20008: "nuclear#freeze#w12#size#w7",
  20009: "count#",
  20012: "supercycle#",
  20038: "stick#"
};
function openApp(_0x381566) {
  if (!_0x381566) {
    return;
  }
  const _0x28ec5a = {
    trade: 30008,
    doodle: "doodle2",
    grid: 30004,
    live: 40000,
    spacewar: 60201,
    matchrace: 60193,
    doodlerace: 60189,
    snakerace: 60195,
    switch: 60239,
    hearts: 60225,
    darts: 60247,
    zwhack: 60257,
    stick: 20038,
    music: 20042,
    chess: 20002,
    fourinarow: 20010,
    canvas: 60002,
    pool: 20006,
    media: 10001,
    xavi: 20047,
    pawns: 60685,
    supercycle: 20012,
    nuclear: 20008,
    count: 20009,
    live: 30012
  };
  let _0x4bc45d = {};
  if (_0x381566.type && _0x381566.type == "media") {
    _0x4bc45d = {
      n: _0x381566.type,
      i: _0x28ec5a.media,
      l: _0x381566.link,
      action: "sideload"
    };
  } else if (_0x381566.toLowerCase() == "translator" || _0x381566.toLowerCase() == "translate") {
    let _0x22fc19 = {
      UserNo: config.MyId,
      tab: "translator"
    };
    classicSetDialog("actions", config.MyId);
    classicSetDialog("settings", _0x22fc19);
  } else {
    _0x4bc45d = {
      n: _0x381566,
      i: _0x28ec5a[_0x381566],
      action: "sideload"
    };
  }
  if (parent) {
    parent.postMessage(JSON.stringify(_0x4bc45d), "http://localhost:6969");
  }
}
function WordIsLink(_0x541243, _0x123ea9, _0x375a13, _0x2d67e0) {
  if (!_0x541243.match(/['"<>❯`]/) && (!_0x541243 || _0x541243[0] !== "(" || _0x541243[_0x541243.length - 1] !== ")" || !_0x541243.includes("#w"))) {
    var _0x2d0ea7;
    var _0x6bcaed = _0x541243.toLowerCase();
    if (!_0x2d67e0 || !_Activity.instance.QuickBar?.isGiphyLink(_0x541243)) {
      if (_0x541243.match(/^[@%][a-zA-Z0-9_]+$/)) {
        return _0x6bcaed;
      }
      if (_0x2d0ea7 = _0x541243.match(/^(play\.|app\.)([a-zA-Z0-9_]+)$/)) {
        return "^" + _0x2d0ea7[2];
      }
      if (keywords.hasOwnProperty(_0x6bcaed) && !_0x375a13) {
        switch (_0x85fe65 = xInt(_0x2d0ea7 = keywords[_0x6bcaed])) {
          case 9:
          case 11:
            if (_0x6bcaed == "doodle") {
              _0x6bcaed = "doodle2";
            }
            return {
              l: ">",
              c: "#000000",
              callBack: () => {
                openApp(_0x6bcaed);
              }
            };
          case 10001:
            return {
              l: ">",
              c: "#000000",
              callBack: () => {
                openApp({
                  type: "media",
                  link: null
                });
              }
            };
          case 5:
            if (isWEB) {
              return "http://localhost:6969/login?mode=1";
            }
          case 6:
            if (isWEB) {
              return "http://localhost:6969/login";
            }
          case 7:
            if (isWEB) {
              return openBuyPage();
            }
          default:
            if (_0x2d0ea7 == "vote") {
              return "vote";
            }
            if (_0x85fe65 < 1) {
              return "http://localhost:6969/" + _0x2d0ea7;
            }
        }
      }
      if (gconfig && (_0x2d0ea7 = gconfig.g100) && _0x2d0ea7.hasOwnProperty(_0x6bcaed)) {
        return {
          l: "https://bit.ly/" + (_0x2d0ea7 = _0x2d0ea7[_0x6bcaed]),
          c: "#000080"
        };
      }
      if (!_0x123ea9 && !(_0x541243.indexOf(".") < 0) && _0x541243[0] != "." && !(_0x6bcaed.indexOf("app:") >= 0)) {
        if (_0x6bcaed.indexOf("http") >= 0) {
          return _0x541243;
        }
        if (_0x6bcaed[0] == "(" && _0x6bcaed[_0x6bcaed.length - 1] == ")") {
          const _0x1b2a07 = _0x6bcaed.split(" ");
          if (_0x1b2a07.length > 1) {
            const _0x2f0215 = _0x1b2a07.filter(_0x5c4a52 => WordIsLink(_0x5c4a52.replace("(", "").replace(")", "")));
            if (_0x2f0215.length && _0x2f0215[0].length > 0) {
              _0x541243 = _0x2f0215[0].replace("(", "").replace(")", "");
            }
          }
        }
        var _0x2b139b = false;
        var _0x34eac8 = 2;
        if (_0x6bcaed.indexOf("www.") >= 0) {
          _0x2b139b = true;
        }
        var _0x3db1e7;
        var _0x17190d = _0x6bcaed.indexOf("/");
        if (_0x17190d == -1) {
          _0x17190d = _0x6bcaed.length;
        }
        for (var _0x85fe65 = 0; _0x85fe65 < _0x17190d; _0x85fe65++) {
          if (((_0x3db1e7 = _0x6bcaed.charCodeAt(_0x85fe65)) < 48 || _0x3db1e7 > 57) && _0x3db1e7 != 46) {
            _0x34eac8 = 0;
            break;
          }
        }
        if (_0x6bcaed.charAt(_0x17190d - 1) == ".") {
          _0x34eac8 = 2;
        }
        if (_0x6bcaed.charAt(_0x17190d - 2) == ".") {
          _0x34eac8 = 2;
        }
        if (_0x6bcaed.charAt(_0x17190d - 3) == ".") {
          _0x34eac8++;
        }
        if (_0x6bcaed.charAt(_0x17190d - 4) == ".") {
          _0x34eac8++;
        }
        if (_0x6bcaed.charAt(_0x17190d - 5) == ".") {
          _0x34eac8++;
        }
        if (_0x34eac8 == 1) {
          _0x2b139b = true;
        }
        if (_0x2b139b) {
          return "https://" + _0x541243;
        } else {
          return undefined;
        }
      }
    }
  }
}
function setEventsLink(_0xab8d65) {
  if (keywords && _0xab8d65) {
    keywords.events = "chats#!events&roomid=" + _0xab8d65 + "&GroupName=" + config.GroupName;
  }
}
const lut15 = [128, 180, 222, 249, 254, 238, 203, 154, 102, 53, 18, 2, 7, 34, 76];
const usefA = {
  1: 1,
  3: 2,
  4: 4
};
const RepeatA = {
  2: 50,
  3: 33.3
};
function toColor(_0x50965e) {
  return "#" + (16777216 + ((_0x50965e >>>= 0) & 255 | (_0x50965e & 65280) >>> 8 << 8 | (_0x50965e & 16711680) >>> 16 << 16)).toString(16).slice(1);
}
function MakeGrad(_0x451cb5) {
  let _0x25a623;
  let _0x545614;
  let _0x16fee2;
  let _0x5ccd42;
  let _0x23c567 = 0;
  let _0x478156 = 0;
  let _0x1c489b = false;
  let _0x26e20c = [];
  _0x451cb5.reverse();
  if ((_0x451cb5 = _0x451cb5.filter(Boolean)).length <= 1) {
    _0x451cb5 = [..._0x451cb5, 6359443, 2951035, 40440, 48184, 16578129, 16736060, 16711680];
  }
  _0x545614 = 0;
  for (; _0x545614 < _0x451cb5.length; _0x545614++) {
    let _0x54b034 = _0x451cb5[_0x545614];
    if (!_0x54b034) {
      continue;
    }
    _0x54b034 = _0x54b034.toString();
    if (_0x54b034 == "NW") {
      _0x1c489b = true;
      if (_0x25a623 === undefined) {
        _0x25a623 = true;
      }
      continue;
    }
    let _0x3d8e21;
    let _0xb4d7b1 = _0x54b034.charAt(0);
    _0x3d8e21 = xInt(_0x54b034.substr(1));
    if (_0xb4d7b1 != "r") {
      if (_0xb4d7b1 != "s") {
        if (_0xb4d7b1 != "f") {
          if (_0xb4d7b1 != "o") {
            _0x54b034 = xInt(_0x54b034);
            if (!_0x54b034) {
              break;
            }
            _0x26e20c.push(toColor(_0x54b034));
          } else {
            if (_0x3d8e21 == 0) {
              _0x25a623 = false;
              continue;
            }
            _0x25a623 = _0x1c489b;
            _0x5ccd42 = RepeatA[_0x3d8e21];
          }
        } else {
          _0x25a623 = _0x1c489b;
          _0x23c567 = usefA[_0x3d8e21];
        }
      } else {
        _0x478156 = _0x3d8e21;
      }
    } else {
      _0x16fee2 = _0x3d8e21;
    }
  }
  if (_0x26e20c.length > 15) {
    _0x26e20c.length = 15;
  }
  if (_0x26e20c.length < 2) {
    for (let _0x252c5b = 0; _0x252c5b < 15; _0x252c5b++) {
      let _0x5c3fda = lut15[(_0x252c5b + _0x478156) % 15];
      let _0x2075f5 = lut15[(_0x252c5b + _0x478156 + 10) % 15];
      let _0x404ca7 = lut15[(_0x252c5b + _0x478156 + 5) % 15];
      _0x26e20c[_0x252c5b] = (_0x5c3fda << 16) + (_0x2075f5 << 8) + _0x404ca7;
    }
  }
  if (_0x16fee2 === undefined) {
    _0x16fee2 = 45;
  }
  if (_0x25a623) {
    if (_0x16fee2 > 45) {
      _0x16fee2 = 45;
    } else if (_0x16fee2 < -45) {
      _0x16fee2 = -45;
    }
    _0x23c567 ||= usefA[4];
    _0x16fee2 = _0x16fee2 > 0 ? 90 - _0x16fee2 : -90 - _0x16fee2;
    if (_0x26e20c[0] != _0x26e20c[_0x26e20c.length - 1]) {
      _0x26e20c.push(_0x26e20c[0]);
    }
  }
  _0x16fee2 = -_0x16fee2;
  if (_0x5ccd42 || _0x25a623) {
    if (!_0x5ccd42 && _0x25a623) {
      _0x5ccd42 ||= 100;
    }
  } else {
    _0x5ccd42 ||= 200;
  }
  let _0x304f7f = (90 - Math.abs(_0x16fee2)) / 15 * _0x5ccd42 / 100;
  _0x5ccd42 = (_0x5ccd42 / 2 - _0x304f7f) / (_0x26e20c.length - 1);
  let _0x40bd25 = (IsAnimationOn() ? "repeating-" : "") + ("linear-gradient(" + _0x16fee2 + "deg");
  for (let _0xeaed91 = 0; _0xeaed91 < _0x26e20c.length; _0xeaed91++) {
    _0x40bd25 += "," + _0x26e20c[_0xeaed91];
    _0x40bd25 += _0x25a623 ? " " + (_0x304f7f + _0x5ccd42 * _0xeaed91) + "%" : " " + _0xeaed91 * 100 / (_0x26e20c.length - 1) + "%";
  }
  _0x40bd25 += ")";
  return [_0x23c567, _0x40bd25];
}
function nameFlag(_0x47eedb, _0x364763, _0x4febdb, _0x1ebaea) {
  const _0x5746e9 = {
    1: 12,
    3: 72
  };
  const _0x5cc205 = {
    1: 0,
    3: 0.2,
    4: 0.3
  };
  let _0x5b94f8;
  let _0x18fbb9 = 4;
  let _0x219b52 = 0.25;
  let _0x12baa9 = 36;
  let _0x181d18 = 1;
  let _0x180aa3 = -1;
  let _0x1e7f1c = _0x47eedb[0] == "jewel";
  let _0x2317cf = 2 / 3;
  let _0x1e7b1e = 36;
  let _0xdc655b = _0x1ebaea & NamePowers.everypower;
  if (_0x1e7f1c) {
    _0x5b94f8 = _0xdc655b ? "10A012" : "DC143C";
  }
  if (_0x47eedb.length) {
    if (_0x1e7f1c && _0x47eedb[1] && _0x47eedb[1].length == 6) {
      let _0x1f891c = getJewelCol(_0x47eedb[1], _0xdc655b);
      if (_0x1f891c) {
        _0x5b94f8 = _0x1f891c;
      }
    }
    for (let _0x18ae24 = 1; _0x18ae24 < _0x47eedb.length; _0x18ae24++) {
      if (!_0x47eedb[_0x18ae24]) {
        continue;
      }
      let _0x3f2cde = _0x47eedb[_0x18ae24].charAt(0);
      let _0x2d3fb7 = parseInt(_0x47eedb[_0x18ae24].substr(1));
      switch (_0x3f2cde) {
        case "r":
          _0x18fbb9 = 2;
          break;
        case "e":
          _0x18fbb9 = 3;
          break;
        case "u":
          _0x18fbb9 = 5;
          break;
        case "f":
          switch (_0x2d3fb7) {
            case 1:
              _0x1e7b1e = 72;
              break;
            case 2:
              _0x1e7b1e = 48;
              break;
            case 3:
              _0x1e7b1e = 36;
              break;
            case 4:
              _0x1e7b1e = 18;
          }
          break;
        case "c":
          _0x12baa9 = _0x5746e9[_0x2d3fb7];
          _0x12baa9 ||= 36;
          break;
        case "g":
          _0x219b52 = _0x5cc205[_0x2d3fb7];
          _0x219b52 ||= 0.1;
          break;
        case "d":
          _0x180aa3 = -_0x180aa3;
      }
    }
  }
  let _0x3bdbcc = _0x1e7b1e / 12;
  if (_0x18fbb9 == 5) {
    let _0x56663a = document.createElement("canvas");
    _0x56663a.width = Math.ceil(_0x364763.offsetWidth);
    _0x56663a.height = Math.round(_0x56663a.width * (_0x4febdb.naturalHeight / _0x4febdb.naturalWidth));
    let _0x5be60b = _0x56663a.getContext("2d");
    if (_0x1e7f1c) {
      _0x5be60b.fillStyle = "#" + _0x5b94f8;
      _0x5be60b.fillRect(0, 0, _0x56663a.width, _0x56663a.height);
    }
    _0x5be60b.drawImage(_0x4febdb, 0, 0, _0x56663a.width, _0x56663a.height);
    _0x364763.style.backgroundImage = "url('" + _0x56663a.toDataURL() + "')";
    if (IsAnimationOn()) {
      _0x364763.style.animation = "nameFlag " + _0x3bdbcc + "s ease-in-out infinite alternate";
    }
    addClass("nameFlag", 0, _0x364763);
    return;
  }
  if (!_0x364763) {
    return false;
  }
  if (_0x1e7f1c) {
    _0x2317cf = 1;
  }
  let _0x5e8529 = Math.ceil(_0x364763.offsetWidth);
  let _0x581098 = Math.ceil(_0x364763.offsetHeight);
  if (!_0x581098) {
    return;
  }
  let _0x4d5d22 = document.createElement("canvas");
  _0x4d5d22.width = _0x5e8529;
  _0x4d5d22.height = _0x581098 * _0x1e7b1e;
  let _0x28ab44 = _0x4d5d22.getContext("2d");
  let _0x2532b7 = document.createElement("canvas");
  _0x2532b7.width = _0x5e8529;
  _0x2532b7.height = _0x581098;
  let _0xae3a30 = _0x2532b7.getContext("2d");
  let _0x478c49 = _0x4febdb.naturalWidth;
  let _0x423388 = _0x4febdb.naturalHeight;
  let _0x2bfd1f = _0x5e8529 / _0x478c49;
  let _0x583713 = _0x478c49 * _0x2bfd1f * _0x2317cf;
  let _0x3dc336 = _0x423388 * _0x2bfd1f;
  if (_0x1e7f1c) {
    _0x28ab44.fillStyle = "#" + _0x5b94f8;
    _0x28ab44.fillRect(0, 0, _0x5e8529, _0x581098 * _0x1e7b1e);
  }
  let _0x478b1b = new Array();
  let _0xa930d1 = new Array();
  if (_0x18fbb9 == 2 || _0x18fbb9 == 3 || _0x18fbb9 == 4) {
    let _0x498252 = _0x478c49 / _0x423388;
    if (_0x498252 > _0x181d18) {
      _0x181d18 = _0x498252;
    }
  }
  if (_0x18fbb9 == 3 || _0x18fbb9 == 4) {
    for (var _0x1e564b = 0; _0x1e564b < _0x12baa9; _0x1e564b++) {
      if (_0x18fbb9 == 3 || _0x18fbb9 == 4) {
        _0x478b1b[_0x1e564b] = Math.sin(Math.PI * 2 * (_0x1e564b / _0x12baa9));
      }
      if (_0x18fbb9 == 4) {
        _0xa930d1[_0x1e564b] = Math.cos(Math.PI * 2 * (_0x1e564b / _0x12baa9));
      }
    }
  }
  for (let _0x5c3112 = 0; _0x5c3112 < _0x1e7b1e; _0x5c3112++) {
    let _0x3942e5 = _0x5e8529 / 2;
    let _0x9fcc73 = _0x581098 / 2;
    let _0x49eb28 = 0;
    let _0x41f4ca = 1;
    switch (_0x18fbb9) {
      case 2:
        _0x49eb28 = -360 / _0x1e7b1e * _0x5c3112 * _0x180aa3;
        _0x3942e5 = _0x5e8529 / 2;
        _0x9fcc73 = _0x581098 / 2;
        _0x41f4ca = _0x181d18;
        break;
      case 3:
        _0x49eb28 = -360 / _0x1e7b1e * _0x5c3112 * _0x180aa3;
        _0x3942e5 = _0x5e8529 / 2;
        _0x9fcc73 = _0x581098 / 2;
        _0x41f4ca = _0x181d18 + _0x181d18 * _0x219b52 + _0x181d18 * _0x219b52 * _0x478b1b[_0x5c3112 % _0x12baa9];
        break;
      case 4:
        _0x49eb28 = -360 / _0x1e7b1e * _0x5c3112 * _0x180aa3;
        _0x3942e5 = _0x5e8529 / 2 + _0x5e8529 * _0x219b52 * _0xa930d1[_0x5c3112 % _0x12baa9];
        _0x9fcc73 = _0x581098 / 2 + _0x581098 * _0x219b52 * _0x478b1b[_0x5c3112 % _0x12baa9];
        _0x41f4ca = _0x181d18 + _0x181d18 * _0x219b52 * 2;
    }
    _0xae3a30.clearRect(0, 0, _0x5e8529, _0x581098);
    _0xae3a30.save();
    _0xae3a30.translate(_0x3942e5, _0x9fcc73);
    _0xae3a30.rotate(_0x49eb28 * Math.PI / 180);
    _0xae3a30.scale(_0x41f4ca, _0x41f4ca);
    _0xae3a30.translate(-_0x5e8529 / 2, -_0x581098 / 2);
    _0xae3a30.drawImage(_0x4febdb, _0x5e8529 / 2 - _0x583713 / 2, _0x581098 / 2 - _0x3dc336 / 2, _0x583713, _0x3dc336);
    _0xae3a30.restore();
    _0x28ab44.drawImage(_0x2532b7, 0, _0x581098 * _0x5c3112, _0x5e8529, _0x581098);
  }
  _0x364763.style.backgroundImage = "url('" + _0x4d5d22.toDataURL() + "')";
  addClass("nameStrip", 0, _0x364763);
  if (IsAnimationOn()) {
    _0x364763.style.animation = "nameStrip" + _0x1e7b1e + " " + _0x3bdbcc + "s steps(" + _0x1e7b1e + ") infinite normal";
    _0x364763.style.backgroundSize = "100% " + _0x1e7b1e + "00%";
  }
}
function getJewelCol(_0x579379, _0x1187ab) {
  if (!_0x579379) {
    return false;
  }
  if (!_0x1187ab) {
    let _0x5d2e81 = parseInt(_0x579379, 16);
    if (isNaN(_0x5d2e81)) {
      _0x5d2e81 = 1;
    }
    let _0x3b14bc = _0x5d2e81 >> 16 & 255;
    let _0x3c3f80 = _0x5d2e81 >> 8 & 255;
    let _0x1503ae = _0x5d2e81 & 255;
    if (_0x3c3f80 > _0x3b14bc) {
      _0x3c3f80 = _0x3b14bc;
    }
    if (_0x3c3f80 > _0x1503ae) {
      _0x3c3f80 = _0x1503ae;
    }
    _0x5d2e81 = (_0x3b14bc << 16) + (_0x3c3f80 << 8) + _0x1503ae;
    _0x579379 = toHex6(_0x5d2e81);
  }
  return _0x579379;
}
function removeDodgy(_0x4bb2d0) {
  if (_0x4bb2d0.match(/&.*;/)) {
    _0x4bb2d0 = _0x4bb2d0.replace(/&apos;/g, "'").replace(/&quot;/g, "\"").replace(/&amp;/g, "＆").replace(/&slsh;/g, "\\").replace(/&gt;/g, "〉").replace(/&lt;/g, "〈");
  }
  return _0x4bb2d0;
}
function ProcessName(_0x42210c = "", _0x39c395 = 0, _0x2764f6 = "") {
  const _0x63fce4 = {};
  if (_0x2764f6 && typeof _0x2764f6 == "string") {
    const _0x12b376 = _0x2764f6.split("#");
    _0x63fce4.statusColor = hasDarkMode() ? "#969696" : 0;
    if (_0x39c395 & NamePowers.status) {
      _0x63fce4.status = _0x12b376[0].replace(/_/g, " ");
    }
    if (_0x39c395 & NamePowers.statusglow && _0x12b376.length > 1) {
      _0x63fce4.statusGlow = DecodeColor(_0x12b376[1], _0x39c395);
      if (_0x39c395 & NamePowers.statuscol && _0x12b376.length > 2) {
        _0x63fce4.statusColor = DecodeColor(_0x12b376[2], _0x39c395);
      }
    }
  }
  if (_0x42210c) {
    _0x63fce4.name = _0x42210c.replace(/\s*\(\uFEFF?hat#.*?\)\s*/gi, " ").replace(/\s*\(\uFEFF?glow.*?\)\s*/gi, " ").replace(/[\s_]*$/gi, "");
    if (_0x39c395 & NamePowers.nospace) {
      _0x63fce4.name = _0x63fce4.name.replace(/_/g, " ");
    }
    let _0x16624e = -1;
    if (_0x39c395 & NamePowers.glow && (_0x16624e = _0x42210c.toLowerCase().indexOf("(glow")) != -1) {
      const _0x2d4fb8 = _0x42210c.slice(_0x16624e, _0x42210c.indexOf(")", _0x16624e)).split("#");
      if (_0x2d4fb8[0]) {
        _0x63fce4.glow = 65280;
      }
      if (_0x2d4fb8[1]) {
        _0x63fce4.glow = DecodeColor(_0x2d4fb8[1], _0x39c395);
      }
      if (_0x2d4fb8[2] == "grad" && _0x39c395 & NamePowers.grad) {
        if (_0x2d4fb8.length - 3 == 1 && _0x2d4fb8[3]) {
          _0x63fce4.color = DecodeColor(_0x2d4fb8[3], _0x39c395);
        } else {
          _0x63fce4.grad = [];
          _0x39c395 |= NamePowers.valid;
          for (let _0x568aa1 = 3; _0x568aa1 < _0x2d4fb8.length; _0x568aa1++) {
            const _0x898cab = _0x2d4fb8[_0x568aa1][0];
            if (_0x898cab != "o" && (_0x898cab != "f" || _0x2d4fb8[_0x568aa1].length == 6) || _0x39c395 & NamePowers.wave) {
              _0x63fce4.grad.push(DecodeColor(_0x2d4fb8[_0x568aa1], _0x39c395));
            }
          }
          if (_0x39c395 & NamePowers.wave) {
            _0x63fce4.grad.push("NW");
          }
        }
      } else if (_0x2d4fb8[2] == "jewel" && _0x39c395 & NamePowers.jewel) {
        _0x63fce4.flag = [];
        for (let _0x59d248 = 2; _0x59d248 < _0x2d4fb8.length; _0x59d248++) {
          _0x63fce4.flag[_0x59d248 - 2] = _0x2d4fb8[_0x59d248];
        }
      } else if (_0x2d4fb8[2] == "flag" && _0x39c395 & NamePowers.flag) {
        _0x63fce4.flag = [];
        for (let _0x5d70b0 = 3; _0x5d70b0 < _0x2d4fb8.length; _0x5d70b0++) {
          _0x63fce4.flag[_0x5d70b0 - 3] = _0x2d4fb8[_0x5d70b0];
        }
      } else if (_0x39c395 & NamePowers.col && _0x2d4fb8[2]) {
        _0x63fce4.color = DecodeColor(_0x2d4fb8[2], _0x39c395);
      }
    }
  }
  return _0x63fce4;
}
function addGlow(_0x3e7c24, _0x24d4e1, _0x124911) {
  const _0x513f76 = _0x3e7c24.cloneNode(true);
  let _0xb4d636;
  _0x513f76.className = "userNick nameGlow";
  _0x513f76.style.cssText = "position: absolute; left: 0; z-index: -1;";
  if (_0xb4d636 = _0x513f76.querySelector(".nameGlow")) {
    _0xb4d636.remove();
  }
  _0x3e7c24.appendChild(_0x513f76);
  const _0x1446fe = [..._0x513f76.querySelectorAll("[data-sm]")];
  for (let _0x4d26b2 = 0; _0x4d26b2 < _0x1446fe.length; _0x4d26b2++) {
    const _0x574bfd = _0x1446fe[_0x4d26b2];
    _0x574bfd.innerHTML = "";
    _0x574bfd.dataset.noload = true;
  }
  _0x3e7c24.style.position = "relative";
  _0x513f76.style.textShadow = MakeGlow(_0x24d4e1.glow);
  _0x513f76.style["-webkit-text-fill-color"] = "transparent";
}
function createNameSm(_0x4db531, _0x16f92a, _0x548404 = {}) {
  const {
    flags: _0x39a630 = 0,
    pawn: _0x3aae54,
    status: _0x58351f = "",
    statusfx: _0x50c55b = "",
    userId: _0x4d576e,
    xNum: _0x2abc98 = 0,
    parent: _0x966de,
    fromActions: _0x471e2c = false,
    forceStatus: _0x1329a5 = false
  } = _0x548404;
  _0x548404.align3 = true;
  _0x548404.align2 = false;
  const _0x1bff1a = ProcessName(_0x16f92a = removeDodgy(_0x16f92a), _0x39a630 | NamePowers.nospace, removeDodgy(_0x58351f));
  if (_0x471e2c) {
    _0x1bff1a.name = actions.stripParenthesesAndReduceString(_0x1bff1a.name);
  }
  if (_0x1329a5 && _0x58351f) {
    _0x1bff1a.status = _0x58351f;
  }
  const _0x394a0e = createTextSm(_0x4db531, (_0x3aae54 || "") + _0x1bff1a.name, _0x548404);
  if (_0x1bff1a.status) {
    const _0x3bc1af = _0x50c55b ? _0x50c55b.replaceAll("#", "").split(",") : [];
    const _0x8851a5 = _0x3bc1af.length ? xInt(_0x3bc1af[0]) : 0;
    let _0x3824a5 = {};
    if (_0x3bc1af.length && IsAnimationOn()) {
      try {
        let _0xeaa9a8 = decodeURIComponent(escape(atob(_0x3bc1af[1])));
        if (!_0xeaa9a8.endsWith("}")) {
          _0xeaa9a8 += "}";
        }
        _0x3824a5 = JSON.parse(_0xeaa9a8);
      } catch (_0x347ca7) {
        _0x3824a5 = {};
      }
    }
    _0x966de.classList.add("hasStatus");
    const _0x2767ef = makeElement(_0x4db531, "p", null, "status" + _0x4d576e);
    _0x2767ef.className = "visitorsStatus darkStatus";
    const _0x26814b = makeElement(_0x2767ef, "p", null, "statusText" + _0x4d576e);
    _0x26814b.style.display = "inline-block";
    if ("statusGlow" in _0x1bff1a) {
      _0x2767ef.style["text-shadow"] = MakeGlow(_0x1bff1a.statusGlow);
    }
    if ("statusColor" in _0x1bff1a) {
      _0x2767ef.style.color = "#" + toHex6(_0x1bff1a.statusColor);
    }
    if (_0x2abc98) {
      _0x2767ef.style.left = "calc(1.2rem + 20px + .35rem)";
    }
    if (!_Activity?.instance?.IsClassic) {
      _0x2767ef.style.top = "1rem";
    }
    createStatusfx(_0x1bff1a.status, _0x3824a5, _0x4d576e, _0x8851a5, _0x3824a5.effect == "translucent" ? _0x1bff1a.statusGlow : null, _0x2767ef, _0x26814b);
  }
  if (_0x1bff1a.grad) {
    const _0x5968af = MakeGrad(_0x1bff1a.grad);
    _0x394a0e.classList.add("clip");
    _0x394a0e.style.backgroundImage = _0x5968af[1];
    if (_0x1bff1a.grad.join("").toLowerCase().includes("o3")) {
      _0x394a0e.style.backgroundSize = "220% 100%";
    }
    if (_0x5968af[0] && IsAnimationOn()) {
      _0x394a0e.className += " nameWave";
      _0x394a0e.style.animationDuration = _0x5968af[0] + "s";
    }
    addGlow(_0x394a0e, _0x1bff1a, _0x548404);
    return _0x394a0e;
  }
  if (_0x1bff1a.flag) {
    const _0x2c006e = _0x1bff1a.flag[0] || "x";
    const _0x1ee45b = _0x2c006e == "jewel" ? "png" : "svg";
    const _0x1d62d8 = new Image();
    _0x1d62d8.src = "/images/js/flag/" + _0x2c006e + "." + _0x1ee45b;
    _0x1d62d8.onload = _0x31aadf => {
      _0x394a0e.classList.add("clip");
      nameFlag(_0x1bff1a.flag, _0x394a0e, _0x31aadf.target, _0x39a630);
    };
    addGlow(_0x394a0e, _0x1bff1a, _0x548404);
    return _0x394a0e;
  }
  if (_0x1bff1a.glow || _0x1bff1a.glow == 0) {
    _0x394a0e.style.textShadow = MakeGlow(_0x1bff1a.glow);
  }
  if (_0x1bff1a.color) {
    _0x394a0e.style.color = "#" + toHex6(_0x1bff1a.color);
  }
  return _0x394a0e;
}
const appCodes = {
  30008: "trade",
  10000: "doodle2",
  30004: "grid",
  20034: "translator",
  40000: "live",
  60201: "spacewar",
  60193: "matchrace",
  60189: "doodlerace",
  60195: "snakerace",
  60239: "switch",
  60225: "hearts",
  60247: "darts",
  60257: "zwhack",
  20038: "stick",
  20042: "music",
  20002: "chess",
  20010: "fourinarow",
  60002: "canvas",
  20006: "pool",
  20012: "supercycle",
  20008: "nuclear",
  20009: "count",
  60685: "pawns",
  30012: "live"
};
function Debounce(_0x7b583e) {
  let _0x5e0ee1;
  return function () {
    for (var _0x1da9e0 = arguments.length, _0x6e5337 = new Array(_0x1da9e0), _0x560567 = 0; _0x560567 < _0x1da9e0; _0x560567++) {
      _0x6e5337[_0x560567] = arguments[_0x560567];
    }
    if (_0x5e0ee1) {
      cancelAnimationFrame(_0x5e0ee1);
    }
    _0x5e0ee1 = requestAnimationFrame(() => {
      _0x7b583e(..._0x6e5337);
    });
  };
}
function getOccurrencesCount(_0x41ce30, _0xd2a7b4) {
  return (_0xd2a7b4.match(new RegExp(_0x41ce30, "g")) || []).length;
}
function runWhen(_0x2d3b11, _0x2766da) {
  if (_0x2d3b11) {
    _0x2766da();
  } else {
    window.setTimeout(() => runWhen(_0x2d3b11, _0x2766da), 100);
  }
}
function createTextSm(_0x3f2f08, _0x1b7077, _0x5548af = {}) {
  const {
    maxSmilies: _0x1cf89c = 10,
    flags: _0x3e09d0 = 0,
    flags2: _0x11595f = 0,
    useMarkdown: _0x4b5f43,
    useLinks: _0x8d2304,
    smClass: _0x122b0f = "messageSm",
    align2: _0x3636b5,
    pawnFlags: _0x32d609,
    xNum: _0x340ea5 = 0,
    pawnTooltip: _0x3b02d4,
    scrollParent: _0x4204cc,
    userId: _0x2c49f7,
    userName: _0x3f83ae,
    useMark: _0x599be3,
    className: _0x57ee73 = "messageText",
    size: _0xd753f9 = 20,
    align3: _0x1bc0be = true,
    relation: _0x42a5dd,
    flagPawn: _0x2d7d36 = "",
    hasBig: _0x136103,
    showTooltip: _0x1ba294 = true,
    isName: _0x2bb5b5 = false
  } = _0x5548af;
  _0x1b7077 = removeDodgy(_0x1b7077);
  _0x3f2f08.documentBody = document.body;
  let _0x149a38 = _0x1b7077.trim().split(/(\([a-zA-Z0-9].*?\)|<.*?>|[ \t]+)/).filter(_0x5e9b30 => _0x5e9b30?.length);
  let _0x5adcf5 = "";
  for (const _0xcd1794 in _0x149a38) {
    if (_0x5adcf5 && _0x149a38[_0xcd1794].startsWith("(") && _0x5adcf5.slice(-1) == "﻿") {
      _0x149a38[_0xcd1794] = _0x149a38[_0xcd1794].replace("(", "(﻿");
      _0x5adcf5 = "";
    }
    _0x5adcf5 = _0x149a38[_0xcd1794];
  }
  const _0xc34cb6 = _0x136103 && _0x149a38.length == 1 && _0x149a38[0][0] == "(" && _0x149a38[0].indexOf("#size#w") == -1;
  const _0x228b77 = _Activity.instance.UserSettings?.inappwords != "disable";
  const _0x246776 = makeElement(_0x3f2f08, "span", _0x57ee73);
  _0x246776.holder = _0x3f2f08;
  if (_0x3e09d0 & NamePowers.italic || _0x1b7077.substr(0, 6) == "<inf8>" || _0x57ee73 != "userNick" && _0x2c49f7 == 0) {
    _0x246776.style.fontStyle = "italic";
  }
  let _0x482c2f = 0;
  let _0x376078 = false;
  let _0x1b018f = {
    bold: false,
    italic: false,
    strike: false,
    quote: false,
    quoteId: false,
    hyperText: false
  };
  let _0x45019a = "";
  let _0xd0dd3d = "";
  let _0x288232 = 0;
  const _0x34fdee = /\[.*?\]\(.*?\)/.test(_0x1b7077);
  for (let _0x3d11e9 = 0; _0x3d11e9 < _0x149a38.length; _0x3d11e9++) {
    let _0x8bb1d2 = _0x149a38[_0x3d11e9];
    let _0x1ede51 = false;
    let _0x47ee3 = WordIsLink(_0x8bb1d2);
    if (_0x4b5f43) {
      let _0xe6893d = 0;
      let _0xf2766b = 0;
      let _0x2ebc81 = 0;
      let _0x3cae4e = 0;
      if (_0x34fdee && (_0x1b018f.hyperText || (_0x2ebc81 = _0x8bb1d2.indexOf("[")) != -1 && _0x8bb1d2.indexOf("❯") == -1)) {
        _0x376078 = true;
        if ((_0x2ebc81 = _0x8bb1d2.indexOf("](")) != -1 && (_0x3cae4e = _0x8bb1d2.indexOf(")", _0x2ebc81 + 1)) > _0x2ebc81 && _0x3cae4e - _0x2ebc81 > 1) {
          const _0x518356 = _0x8bb1d2.split("](");
          const _0xaade65 = _0x518356[1].split(")");
          const _0x35bce3 = _0xaade65[0];
          const _0x11e543 = WordIsLink(_0x35bce3);
          if (_0x11e543) {
            if (_0x8bb1d2.indexOf("[") != -1) {
              const _0x12dbee = _0x518356[0].split("[");
              _0x45019a += _0x12dbee[1];
              _0xaade65[1] = _0x12dbee[0];
            } else {
              _0x45019a += _0x518356[0];
            }
            if (WordIsLink(_0x45019a)) {
              const _0x4b81e9 = new Error("Could not use link markup, text is a URL");
              _0x4b81e9.code = MessageErrorCodes.LinkInLinkMarkupDetected;
              return _0x4b81e9;
            }
            const _0x4e182e = makeElement(_0x246776, "a", "msgLink");
            _0x4e182e.style.color = "#190046";
            addText(_0x4e182e, _0x45019a, true);
            addToolTip(_0x4e182e, _0x11e543, {
              position: "low",
              instant: true
            });
            if (_0x11e543.c) {
              _0x4e182e.style.color = _0x11e543.c;
              if (_0x11e543.l && !_0x11e543.callBack) {
                _0x4e182e.addEventListener("click", _0x101747 => {
                  _0x101747.preventDefault();
                  handleLink(_0x101747, _0x11e543.l, _0x3f83ae);
                });
              } else {
                _0x4e182e.addEventListener("click", _0x11e543.callBack);
              }
            } else {
              _0x4e182e.addEventListener("mousedown", _0x4a7060 => {
                _0x4a7060.preventDefault();
                if (_0x4a7060.which == 2) {
                  handleLink(_0x4a7060, _0x35bce3, _0x3f83ae);
                }
              });
              _0x4e182e.addEventListener("click", _0x14a758 => {
                _0x14a758.preventDefault();
                handleLink(_0x14a758, _0x35bce3, _0x3f83ae);
              });
            }
            if (_0x11e543.c) {
              _0x4e182e.dataset.dark = true;
            } else {
              _0x4e182e.dataset.dark2 = true;
            }
            _0x1b018f.hyperText = false;
            numberOfHyperTexts++;
            _0x47ee3 = false;
            _0x45019a = "";
            if (!(_0x8bb1d2 = _0xaade65[1])) {
              continue;
            }
          } else {
            if (_0x45019a.length && _0x45019a[0] != "[") {
              _0x45019a = "[" + _0x45019a;
            }
            _0x1b018f.hyperText = false;
            _0x8bb1d2 = "" + _0x45019a + _0x8bb1d2;
            _0x45019a = "";
            _0x47ee3 = false;
          }
        } else if (_0x8bb1d2.indexOf("[") != -1) {
          if (_0x3d11e9 != _0x149a38.length - 1) {
            _0x1b018f.hyperText = true;
            const _0x3b11dd = _0x8bb1d2.split("[");
            _0x45019a += _0x3b11dd[1];
            _0x8bb1d2 = _0x3b11dd[0];
          }
        } else {
          _0x1b018f.hyperText = true;
          _0x45019a += _0x8bb1d2;
          if (_0x3d11e9 != _0x149a38.length - 1) {
            continue;
          }
          _0x1b018f.hyperText = false;
          _0x8bb1d2 = "[" + _0x45019a;
          _0x45019a = "";
          _0x47ee3 = false;
        }
      }
      if (_0x376078 && _0x1b018f.bold && _0x1b018f.bold || (_0x2ebc81 = _0x8bb1d2.indexOf("*")) != -1 && getOccurrencesCount("\\*", _0x1b7077) > 1) {
        if (!_0x1b018f.bold && (_0x3cae4e = _0x8bb1d2.lastIndexOf("*")) > _0x2ebc81 && _0x3cae4e - _0x2ebc81 > 1) {
          if (!_0x47ee3 || _0x2ebc81 <= 0 || _0x2ebc81 <= 0 && _0x3cae4e >= _0x8bb1d2.length - 1) {
            const _0x2fbb93 = _0x8bb1d2.slice(_0x2ebc81, _0x3cae4e + 1);
            const _0xede66d = _0x2fbb93.replace("*", "").replace(/\*$/, "");
            _0x8bb1d2 = _0x8bb1d2.replace(_0x2fbb93, "<strong style=\"font-family: Arial Black, Arial Bold, Gadget, sans-serif; user-select: auto;\">" + _0xede66d + "</strong>");
            _0x376078 = true;
            _0x47ee3 &&= WordIsLink(_0xede66d);
          }
        } else {
          _0x376078 = true;
          if (_0x1b018f.bold && _0x8bb1d2.indexOf("*") != -1) {
            _0x1b018f.bold = false;
          } else {
            _0x1b018f.bold = true;
          }
          const _0x1c0794 = _0x8bb1d2.replace("*", "");
          _0x8bb1d2 = "<strong style=\"font-family: Arial Black, Arial Bold, Gadget, sans-serif; user-select: auto;\">" + _0x1c0794 + "</strong>";
          _0x47ee3 &&= WordIsLink(_0x1c0794);
        }
      }
      if (_0x376078 && _0x1b018f.italic || (_0x2ebc81 = _0x8bb1d2.indexOf("_")) != -1 && getOccurrencesCount("_", _0x1b7077) > 1) {
        if (!_0x1b018f.italic && (_0x3cae4e = _0x8bb1d2.lastIndexOf("_")) > _0x2ebc81 && _0x3cae4e - _0x2ebc81 > 1) {
          if ((!(_0xe6893d = _0x8bb1d2[_0x2ebc81 - 1]) || _0xe6893d == " ") && (!(_0xf2766b = _0x8bb1d2[_0x3cae4e + 1]) || _0xf2766b == " ") && (!_0x47ee3 || _0x2ebc81 <= 0 || _0x2ebc81 <= 0 && _0x3cae4e >= _0x8bb1d2.length - 1)) {
            const _0x435723 = _0x8bb1d2.slice(_0x2ebc81, _0x3cae4e + 1);
            const _0x477222 = _0x435723.replace("_", "").replace(/_$/, "");
            _0x8bb1d2 = _0x8bb1d2.replace(_0x435723, "<em style='user-select: auto;'>" + _0x477222 + "</em>");
            _0x376078 = true;
            _0x47ee3 &&= WordIsLink(_0x477222);
          }
        } else {
          _0x376078 = true;
          if (_0x1b018f.italic && _0x8bb1d2.indexOf("_") != -1) {
            _0x1b018f.italic = false;
          } else {
            _0x1b018f.italic = true;
          }
          const _0x17e07a = _0x8bb1d2.replace("_", "");
          _0x8bb1d2 = "<em style='user-select: auto;'>" + _0x17e07a + "</em>";
          _0x47ee3 &&= WordIsLink(_0x17e07a);
        }
      }
      if (_0x376078 && _0x1b018f.strike || (_0x2ebc81 = _0x8bb1d2.indexOf("~")) != -1 && getOccurrencesCount("~", _0x1b7077) > 1) {
        if (!_0x1b018f.strike && (_0x3cae4e = _0x8bb1d2.lastIndexOf("~")) > _0x2ebc81 && _0x3cae4e - _0x2ebc81 > 1) {
          if (!_0x47ee3 || _0x2ebc81 <= 0 || _0x2ebc81 <= 0 && _0x3cae4e >= _0x8bb1d2.length - 1) {
            const _0xab1e60 = _0x8bb1d2.slice(_0x2ebc81, _0x3cae4e + 1);
            const _0x1bddad = _0xab1e60.replace("~", "").replace(/~$/, "");
            _0x8bb1d2 = _0x8bb1d2.replace(_0xab1e60, "<del style='user-select: auto;'>" + _0x1bddad + "</del>");
            _0x376078 = true;
            _0x47ee3 &&= WordIsLink(_0x1bddad);
          }
        } else {
          _0x376078 = true;
          if (_0x1b018f.strike && _0x8bb1d2.indexOf("~") != -1) {
            _0x1b018f.strike = false;
          } else {
            _0x1b018f.strike = true;
          }
          const _0x42cb1b = _0x8bb1d2.replace("~", "");
          _0x8bb1d2 = "<del style='user-select: auto;'>" + _0x42cb1b + "</del>";
          _0x47ee3 &&= WordIsLink(_0x42cb1b);
        }
      }
      if (_0x1b018f.quote || _0x288232 < 1 && (_0x2ebc81 = _0x8bb1d2.indexOf("❯[")) != -1 && _0x8bb1d2.indexOf("❯#") == -1) {
        if (!_0x1b018f.quote && (_0x3cae4e = _0x8bb1d2.indexOf("]", _0x2ebc81 + 1)) > _0x2ebc81 && _0x3cae4e - _0x2ebc81 > 1) {
          _0x288232++;
          let _0x5c33ee = _0x8bb1d2.slice(_0x2ebc81, _0x3cae4e + 1);
          _0x5c33ee = cleanXatTagsIcons(_0x5c33ee);
          _0x8bb1d2 = _0x8bb1d2.replace(_0x5c33ee, "<p class=\"blockquote\"><span class=\"pill\"></span>" + _0x5c33ee.replace("❯[", "").replace("]", "") + "</p>");
          _0x1ede51 = _0x376078 = true;
        } else {
          _0x376078 = true;
          if (_0x8bb1d2.indexOf("[") != -1) {
            if (_0x3d11e9 != _0x149a38.length - 1) {
              _0x1b018f.quote = true;
              const _0x2bcc66 = _0x8bb1d2.split("❯[");
              _0xd0dd3d += _0x2bcc66[1].replace("❯[", "");
              _0x8bb1d2 = _0x2bcc66[0] + "<p class=\"blockquoteContent\"></p>";
            }
          } else if (_0x8bb1d2.indexOf("]") != -1) {
            _0x288232++;
            const _0xfd4652 = _0x8bb1d2.split("]");
            _0xd0dd3d += _0xfd4652[0];
            _0xd0dd3d = cleanXatTagsIcons(_0xd0dd3d);
            _0x246776.querySelector(".blockquoteContent").insertAdjacentHTML("beforeend", "<p class=\"blockquote\"><span class=\"pill\"></span>" + _0xd0dd3d + "</p>");
            _0x1b018f.quote = false;
            _0xd0dd3d = "";
            if (_0x47ee3 && _0xfd4652[1]) {
              _0x47ee3 = WordIsLink(_0xfd4652[1]);
            }
            if (!(_0x8bb1d2 = _0xfd4652[1])) {
              continue;
            }
          } else {
            _0x1b018f.quote = true;
            _0xd0dd3d += _0x8bb1d2;
            if (_0x3d11e9 != _0x149a38.length - 1) {
              continue;
            }
            _0x1b018f.quote = false;
            _0x8bb1d2 = "❯[" + _0xd0dd3d;
          }
        }
      }
      if (_0x1b018f.quoteId || _0x288232 < 1 && (_0x2ebc81 = _0x8bb1d2.indexOf("❯#")) != -1 && _0x8bb1d2.indexOf("[") != -1) {
        if (!_0x1b018f.quoteId && (_0x3cae4e = _0x8bb1d2.indexOf("]", _0x2ebc81 + 1)) > _0x2ebc81 && _0x3cae4e - _0x2ebc81 > 1) {
          _0x288232++;
          let _0x725403 = _0x8bb1d2.slice(_0x2ebc81, _0x3cae4e + 1);
          _0x725403 = cleanXatTagsIcons(_0x725403);
          _0x8bb1d2 = _0x8bb1d2.replace(_0x725403, "<p class=\"blockquote\"><span class=\"pill\"></span>" + _0x725403.replace(/(\❯\#.*?)\[/, "").replace("]", "") + "</p>");
          _0x1ede51 = _0x376078 = true;
        } else {
          _0x376078 = true;
          if (_0x8bb1d2.indexOf("[") != -1) {
            if (_0x3d11e9 != _0x149a38.length - 1) {
              _0x1b018f.quoteId = true;
              const _0x40369a = _0x8bb1d2.split(/\❯\#.*?\[/);
              const _0x43f236 = _0x8bb1d2.match(/\❯\#(.*?)\[/)[1];
              _0xd0dd3d += _0x40369a[1].replace(/(\❯\#.*?)\[/, "");
              _0x8bb1d2 = _0x40369a[0] + "<p class=\"blockquoteContent\" data-quote=\"" + _0x43f236 + "\"></p>";
            }
          } else if (_0x8bb1d2.indexOf("]") != -1) {
            _0x288232++;
            const _0x49fd00 = _0x8bb1d2.split("]");
            _0xd0dd3d += _0x49fd00[0].replace(/\(.*?\)/g, "");
            _0xd0dd3d = cleanXatTagsIcons(_0xd0dd3d);
            const _0x455f39 = _0x246776.querySelector(".blockquoteContent");
            _0x455f39.insertAdjacentHTML("beforeend", "<p class=\"blockquote\"><span class=\"pill\"></span>" + _0xd0dd3d + "</p>");
            if (_0x47ee3 && _0x49fd00[1]) {
              _0x47ee3 = WordIsLink(_0x49fd00[1]);
            }
            let _0x1eff54 = document.querySelector("[data-msgid=\"" + _0x455f39.dataset.quote + "\"]");
            if (_0x1eff54) {
              addToolTip(_0x455f39, ["mob2.originalmsg", "Go to original message"], {
                position: "low"
              });
              _0x455f39.addEventListener("click", _0x5043b3 => {
                if (_0x1eff54) {
                  _0x1eff54.scrollIntoView({
                    behavior: "smooth",
                    block: "end"
                  });
                }
              });
            }
            _0x1b018f.quoteId = false;
            _0xd0dd3d = "";
            if (!(_0x8bb1d2 = _0x49fd00[1])) {
              continue;
            }
          } else {
            _0x1b018f.quoteId = true;
            _0xd0dd3d += _0x8bb1d2;
            _0xd0dd3d = cleanXatTagsIcons(_0xd0dd3d);
            if (_0x3d11e9 != _0x149a38.length - 1) {
              continue;
            }
            {
              const _0x1e83b1 = _0x246776.querySelector(".blockquoteContent");
              _0x1b018f.quoteId = false;
              _0x8bb1d2 = "❯#" + _0x1e83b1.dataset.quote + "[" + _0xd0dd3d;
            }
          }
        }
      }
    }
    if (!_0x8d2304 || !_0x47ee3 || _0x47ee3[0] == "(" && _0x47ee3[_0x47ee3.length - 1] == ")") {
      if (_0x8bb1d2.length > 2) {
        let _0x386553 = _0x8bb1d2;
        const _0x226ddc = _0x8bb1d2.match(/(\(.*?\))/);
        if (_0x226ddc) {
          _0x386553 = _0x226ddc[1];
        }
        if (_0x386553[0] == "(" && _0x386553[_0x386553.length - 1] == ")" && _0x386553[1] != "﻿" && _0x386553[1] != " ") {
          if (_0x482c2f == _0x1cf89c || _0x8bb1d2.toLowerCase() == "(glow)" || _0x8bb1d2.toLowerCase() == "(none)" || _0x8bb1d2.toLowerCase().indexOf("(none#") >= 0 || _0x8bb1d2.toLowerCase().indexOf("(glow#") >= 0) {
            continue;
          }
          const _0x468b3e = _0x386553.substr(0, 3) == "(p1";
          let _0x2ddf39 = _0x468b3e ? _0x3b02d4 : _0x386553;
          let _0x40513f = _0x468b3e ? "left" : "top";
          const _0x297e29 = _Activity.instance.Smilies.MakeSmiley(_0x246776, _0x386553, {
            size: _0xc34cb6 ? _0xd753f9 * 2 : _0xd753f9,
            align2: _0x3636b5,
            align3: _0x1bc0be,
            addGback: true,
            userID: _0x2c49f7,
            showAd: !_0x468b3e,
            userName: _0x3f83ae,
            scrollParent: _0x4204cc,
            className: _0x122b0f + (_0xc34cb6 ? " big" : ""),
            _window: window,
            applyEffects: !_0x468b3e && getSettingsValue("ultrasmiley") === "enable",
            pawnFlags: _0x468b3e ? _0x32d609 : 0,
            tooltip: _0x1ba294 || _0x468b3e ? _0x2ddf39 : "",
            tooltipPosition: _0x40513f,
            isName: _0x2bb5b5
          });
          if (_0x468b3e) {
            const _0x34d89c = _0x32d609 & PawnFlags.isBffed;
            const _0x1b6b63 = _0x32d609 & PawnFlags.isMarried;
            let _0x531ff6 = _0x297e29.querySelector(".pawnStuff");
            _0x531ff6 ||= makeElement(_0x297e29, "div", "pawnStuff");
            _0x531ff6.innerHTML = "";
            if (_0x340ea5) {
              _Activity.instance.Smilies.MakeSmiley(_0x246776, _0x340ea5, {
                size: 20,
                userID: _0x2c49f7,
                userName: _0x3f83ae,
                scrollParent: _0x4204cc,
                tooltip: ["box.143", "On App"],
                tooltipPosition: "left",
                showAd: false,
                className: "appIcon",
                align2: _0x3636b5,
                align3: _0x1bc0be,
                callback: _0x8034c7 => {
                  _0x8034c7.stopPropagation();
                  if (_0x340ea5.indexOf("#") >= 0) {
                    openApp(_0x340ea5.split("#")[0]);
                  } else if (_0x340ea5 == 10001) {
                    openApp({
                      type: "media",
                      link: null
                    });
                  } else if (_0x340ea5 == 20044) {
                    openGift({
                      id: _0x2c49f7,
                      regname: _0x3f83ae
                    });
                  } else {
                    openApp(appCodes[_0x340ea5]);
                  }
                }
              });
            }
            if (_0x32d609 & PawnFlags.isInvisible) {
              _0x297e29.style.opacity = 0.35;
            } else {
              _0x297e29.style.opacity = 1;
            }
            if (_0x11595f & NamePowers.isBlocked) {
              makeElement(_0x531ff6, "img", "blockIcon").src = "svg/report2.svg";
            } else {
              if (_0x2d7d36) {
                _Activity.instance.Smilies.MakeSmiley(_0x531ff6, "(tickle#flgpwn#w" + _0x2d7d36 + ")", {
                  size: 20,
                  align2: _0x3636b5,
                  align3: _0x1bc0be,
                  userID: _0x2c49f7,
                  showAd: false,
                  userName: _0x3f83ae,
                  scrollParent: _0x4204cc,
                  className: "flagPawn"
                });
              }
              if (_0x32d609 & PawnFlags.isAway) {
                _Activity.instance.Smilies.MakeSmiley(_0x531ff6, "(tickle#away)", {
                  size: 20,
                  align2: _0x3636b5,
                  align3: _0x1bc0be,
                  userID: _0x2c49f7,
                  showAd: false,
                  userName: _0x3f83ae,
                  scrollParent: _0x4204cc,
                  className: "away"
                });
              }
            }
            if (_0x1b6b63 || _0x34d89c) {
              let _0x13db3d;
              let _0x27f6fd;
              if (_0x42a5dd) {
                _0x13db3d = document.querySelector("[data-user=\"" + _0x42a5dd + "\"]");
                const _0x13ee63 = _0x13db3d.querySelector(".relIcon2");
                _0x13ee63?.parentNode.removeChild(_0x13ee63);
              }
              if (_0x32d609 & PawnFlags.isBuddyAbove && _0x34d89c) {
                _0x27f6fd = makeElement(_0x531ff6, "img", Classic ? "relIcon" : "relMob");
                _0x27f6fd.src = "svg/bffed.svg";
                if (Classic && _0x13db3d?.classList.contains("hasStatus")) {
                  _0x27f6fd.style.top = "-12px";
                }
              } else if (_0x32d609 & PawnFlags.isBuddyAbove && _0x1b6b63) {
                _0x27f6fd = makeElement(_0x531ff6, "img", Classic ? "relIcon" : "relMob");
                _0x27f6fd.src = "svg/married.svg";
                if (Classic && _0x13db3d?.classList.contains("hasStatus")) {
                  _0x27f6fd.style.top = "-12px";
                }
              } else if (!!(_0x32d609 & PawnFlags.isRegistered) && _0x386553.indexOf("#frnt1#w128") == -1 && _0x386553.indexOf("#frnt1#w288") == -1 && _0x386553.indexOf("#frnt1#w272") == -1 && _0x386553.indexOf("#frnt1#w32") == -1 && _0x386553.indexOf("#frnt1#w16") == -1 && _0x386553.indexOf("#frnt1w256") == -1 && !(_0x32d609 & PawnFlags.isBuddyBelow) && !(_0x32d609 & PawnFlags.isTyping) && !(_0x32d609 & PawnFlags.isAway) && !(_0x32d609 & PawnFlags.isGagged)) {
                if (_0x34d89c) {
                  _0x27f6fd = makeElement(_0x531ff6, "img", "relIcon2");
                  _0x27f6fd.src = "svg/bffed" + (_0x32d609 & PawnFlags.isSubscriber ? "" : 2) + ".svg";
                } else if (_0x1b6b63) {
                  _0x27f6fd = makeElement(_0x531ff6, "img", "relIcon2");
                  _0x27f6fd.src = "svg/married" + (_0x32d609 & PawnFlags.isSubscriber ? "" : 2) + ".svg";
                }
              }
            }
          }
          _0x482c2f++;
          continue;
        }
        if (_0x386553[0] == "#" && audiesList.includes(_0x8bb1d2.substr(1))) {
          const _0x4ab55f = makeElement(makeElement(_0x246776, "span"), "img", "speaker");
          _0x4ab55f.src = "svg/spk.svg";
          addToolTip(_0x4ab55f, _0x386553);
          _0x4ab55f.addEventListener("click", _0x31e3cb => {
            doSound(_0x386553.substr(1), true);
          });
          continue;
        }
        let _0x2abbd5;
        const _0x5e602e = JSON.parse(_Activity.instance.UserSettings?.marks?.replace(/”/g, "\"") ?? "{}");
        if (!_0x599be3 || _0x1ede51 || _0x386553[0] != "<" || _0x386553[1] != "s" || isNaN(_0x386553[2])) {
          if (!_0x1ede51 && _Activity.instance.UserSettings?.marks?.length && hasPower(462) && _0x599be3 && _0x386553.length > 2 && (_0x2abbd5 = _0x5e602e.find(_0x365471 => _0x386553.toLowerCase().indexOf(_0x365471.name.toLowerCase()) != -1))) {
            _0x8bb1d2 = "<span class=\"highlight\" style=\"color: " + (isColorLight(_0x2abbd5.color) ? "#000" : "#FFF") + "; background: " + _0x2abbd5.color + ";\">" + _0x8bb1d2 + "</span >";
          } else if (!_0x376078 && _0x386553[0] == "<" && _0x386553[_0x386553.length - 1] == ">") {
            _Activity.instance.Smilies.MakeSmiley(_0x246776, _0x386553, {
              size: _0xd753f9,
              align: true,
              scrollParent: _0x4204cc,
              className: "messageIcon"
            });
            continue;
          }
        } else {
          _0x8bb1d2 = "<span class=\"" + (!_0x228b77 || "swear" + _0x386553[2]) + "\">" + _0x386553.slice(3, -2) + "</span>";
        }
      }
      _0x246776.insertAdjacentHTML("beforeend", _0x8bb1d2);
    } else {
      const _0x3df1ec = makeElement(_0x246776, "a", "msgLink");
      _0x3df1ec.style.color = "#190046";
      let _0x255027 = false;
      if (_Activity?.instance?.QuickBar?.isGiphyLink(_0x8bb1d2)) {
        _0x255027 = _Activity?.instance?.QuickBar?.getGifSettings() != "disable" && _0x3f83ae;
      }
      if (_0x255027) {
        _0x3df1ec.classList.add("d-none");
        _0x3df1ec.dataset.giphy = "1";
      }
      addText(_0x3df1ec, _0x8bb1d2, _0x376078);
      addEventToLink(_0x47ee3, _0x3df1ec, _0x3f83ae);
      if (_0x47ee3.c) {
        _0x3df1ec.dataset.dark = true;
      } else {
        _0x3df1ec.dataset.dark2 = true;
      }
    }
  }
  const _0x5dc9ee = [..._0x246776.querySelectorAll("[class^=\"swear\"]")];
  for (let _0x318a73 = 0; _0x318a73 < _0x5dc9ee.length; _0x318a73++) {
    const _0x55f50d = _0x5dc9ee[_0x318a73];
    _0x55f50d.onclick = () => _0x55f50d.className = "";
  }
  return _0x246776;
}
function addEventToLink(_0x1e30d4, _0xf95ffd, _0x17b3de) {
  if (typeof _0x1e30d4 == "object") {
    _0xf95ffd.style.color = _0x1e30d4.c;
    if (_0x1e30d4.l && !_0x1e30d4.callBack) {
      _0xf95ffd.addEventListener("click", _0x47597c => {
        _0x47597c.preventDefault();
        handleLink(_0x47597c, _0x1e30d4.l, _0x17b3de);
      });
    } else {
      _0xf95ffd.addEventListener("click", _0x1e30d4.callBack);
    }
  } else {
    _0xf95ffd.addEventListener("mousedown", _0x208560 => {
      _0x208560.preventDefault();
      if (_0x208560.which == 2) {
        handleLink(_0x208560, _0x1e30d4, _0x17b3de);
      }
    });
    _0xf95ffd.addEventListener("click", _0x19ed74 => {
      _0x19ed74.preventDefault();
      handleLink(_0x19ed74, _0x1e30d4, _0x17b3de);
    });
  }
}
function createStatusfx(_0x4a611f, _0x1a1fe1, _0x5c656d, _0x81e9d3, _0x51395f) {
  let {
    effect: _0x33587f,
    status2: _0x5a1d1e = "",
    speed: _0x2d8ca4 = 2,
    waveFrequency: _0x38d776 = 4
  } = _0x1a1fe1;
  const _0x4352b9 = _0x5c656d === "new" ? document.querySelector("#statusNew") : document.querySelector("#statusText" + _0x5c656d);
  const _0x4dbafe = _0x4352b9.parentNode;
  _0x4352b9.innerText = _0x4a611f;
  if (_Activity.instance.UserSettings?.statusfxAnim == "disable") {
    return;
  }
  _0x5a1d1e = _0x5a1d1e.trim();
  _0x5a1d1e = _0x5a1d1e.replace(new RegExp("['\"<>&=]", "gi"), "");
  _0x2d8ca4 = Math.max(1, Math.min(6, _0x2d8ca4));
  _0x38d776 = Math.max(1, Math.min(6, _0x38d776));
  const _0x3b315b = Math.SQRT1_2 + 1;
  let _0x6d69ac = _0x4352b9.offsetWidth;
  if (_0x6d69ac < 26) {
    _0x6d69ac = 26;
  }
  let _0x14fb2e = Math.ceil(_0x4352b9.offsetHeight * _0x3b315b);
  const _0x51ead0 = _0x4352b9.parentNode.offsetWidth;
  const _0x1cee61 = _0x3b315b ** _0x2d8ca4 + 1;
  let _0x22cabe;
  let _0x5609c6;
  let _0x1d7d58;
  const _0x93e96 = 500;
  const _0x1c4e29 = StatusEffects.some(_0x135b5e => _0x81e9d3 >= _0x135b5e.set && _0x33587f == _0x135b5e.key);
  if (_0x33587f && _0x1c4e29) {
    switch (_0x33587f) {
      case "scrollleft":
        _0x4352b9.parentNode.style.overflow = "hidden";
        _0x22cabe = Math.round(_0x6d69ac / _0x1cee61) * 1000;
        _0x5609c6 = Math.round(-_0x6d69ac);
        _0x4352b9.animate([{
          transform: "translateX(" + _0x51ead0 + "px)"
        }, {
          transform: "translateX(" + _0x5609c6 + "px)"
        }], {
          duration: _0x22cabe,
          iterations: "Infinity"
        });
        break;
      case "scrollright":
        _0x4352b9.parentNode.style.overflow = "hidden";
        _0x22cabe = Math.round(_0x6d69ac / _0x1cee61) * 1000;
        _0x5609c6 = Math.round(-_0x6d69ac);
        _0x4352b9.animate([{
          transform: "translateX(" + _0x5609c6 + "px)"
        }, {
          transform: "translateX(" + _0x51ead0 + "px)"
        }], {
          duration: _0x22cabe,
          iterations: "Infinity"
        });
        break;
      case "scrollup":
        _0x4352b9.parentNode.style.overflow = "hidden";
        if (_0x5a1d1e) {
          _0x14fb2e = (_0x14fb2e / _0x3b315b + _0x1cee61) * 2;
          _0x22cabe = Math.round(_0x14fb2e / _0x1cee61) * 1000;
          _0x1d7d58 = Math.round(-_0x14fb2e);
          _0x4352b9.animate([{
            transform: "translateY(" + -_0x1d7d58 + "px)"
          }, {
            transform: "translateY(" + _0x1d7d58 + "px)"
          }], {
            duration: _0x22cabe,
            iterations: "Infinity"
          });
          const _0x5a24de = makeElement(_0x4352b9, "p");
          _0x5a24de.style.cssText = "position: absolute; top: " + _0x14fb2e * (_0x3b315b - 1) + "px;";
          _0x5a24de.innerHTML = _0x5a1d1e;
        } else {
          _0x22cabe = Math.round(_0x14fb2e / _0x1cee61) * 1000;
          _0x1d7d58 = Math.round(-_0x14fb2e);
          _0x4352b9.animate([{
            transform: "translateY(" + -_0x1d7d58 + "px)"
          }, {
            transform: "translateY(" + _0x1d7d58 + "px)"
          }], {
            duration: _0x22cabe,
            iterations: "Infinity"
          });
        }
        break;
      case "scrolldown":
        _0x4352b9.parentNode.style.overflow = "hidden";
        if (_0x5a1d1e) {
          _0x14fb2e = (_0x14fb2e / _0x3b315b + _0x1cee61) * 2;
          _0x22cabe = Math.round(_0x14fb2e / _0x1cee61) * 1000;
          _0x1d7d58 = Math.round(-_0x14fb2e);
          _0x4352b9.animate([{
            transform: "translateY(" + _0x1d7d58 + "px)"
          }, {
            transform: "translateY(" + -_0x1d7d58 + "px)"
          }], {
            duration: _0x22cabe,
            iterations: "Infinity"
          });
          const _0x5c975c = makeElement(_0x4352b9, "p");
          _0x5c975c.style.cssText = "position: absolute; top: -" + _0x14fb2e * (_0x3b315b - 1) + "px;";
          _0x5c975c.innerHTML = _0x5a1d1e;
        } else {
          _0x22cabe = Math.round(_0x14fb2e / _0x1cee61) * 1000;
          _0x1d7d58 = Math.round(-_0x14fb2e);
          _0x4352b9.animate([{
            transform: "translateY(" + _0x1d7d58 + "px)"
          }, {
            transform: "translateY(" + -_0x1d7d58 + "px)"
          }], {
            duration: _0x22cabe,
            iterations: "Infinity"
          });
        }
        break;
      case "fadeout":
        const _0x11f209 = 500;
        const _0x4af49d = 3500;
        const _0x5a5c53 = _0x4af49d - _0x2d8ca4 * _0x11f209;
        const _0x3a77d8 = _0x4af49d - _0x11f209 * _0x2d8ca4;
        if (_0x5a1d1e) {
          _0x4352b9.animate([{
            opacity: 1,
            offset: 0
          }, {
            opacity: 0,
            offset: _0x5a5c53 / (_0x5a5c53 + _0x3a77d8)
          }, {
            opacity: 0,
            offset: 1
          }], {
            duration: _0x5a5c53 + _0x3a77d8,
            iterations: "Infinity",
            direction: "alternate",
            delay: _0x3a77d8
          });
          const _0xb86b7 = makeElement(_0x4352b9.parentNode, "p");
          _0xb86b7.style.cssText = "position: absolute; top: 0; opacity: 0";
          _0xb86b7.innerHTML = _0x5a1d1e;
          _0xb86b7.animate([{
            opacity: 0,
            offset: 0
          }, {
            opacity: 0,
            offset: 1 - _0x5a5c53 / (_0x5a5c53 + _0x3a77d8)
          }, {
            opacity: 1,
            offset: 1
          }], {
            duration: _0x5a5c53 + _0x3a77d8,
            iterations: "Infinity",
            direction: "alternate",
            delay: _0x3a77d8
          });
        } else {
          _0x4352b9.animate([{
            opacity: 1
          }, {
            opacity: 0
          }], {
            duration: _0x5a5c53,
            iterations: "Infinity",
            direction: "alternate"
          });
        }
        break;
      case "translucent":
        _0x22cabe = Math.round(_0x6d69ac / _0x1cee61) * 350;
        const _0x3a9b69 = _0x4352b9.parentNode.style.color ? _0x4352b9.parentNode.style.color : document.body.classList.contains("dark") ? "rgb(207, 207, 207)" : "rgb(0, 0, 0)";
        const _0x414236 = _0x3a9b69.replace(/rgb/, "rgba").replace(")", ", 0)");
        const _0x208e22 = MakeStatusGlow(_0x51395f);
        _0x4352b9.parentNode.style.filter = "drop-shadow(" + _0x208e22 + ") drop-shadow(" + _0x208e22 + ")";
        _0x4352b9.parentNode.style.textShadow = "";
        _0x4352b9.style.cssText = "\n                    color: transparent;\n                    background: linear-gradient(90deg, " + _0x3a9b69 + " 0%, " + _0x414236 + " 30%, " + _0x414236 + " 70%, " + _0x3a9b69 + " 100%);\n                    background-size: 200%;\n                    background-clip: text;\n                    -webkit-background-clip: text;\n                ";
        _0x4352b9.animate([{
          backgroundPosition: "200%"
        }, {
          backgroundPosition: "0%"
        }], {
          duration: _0x22cabe,
          iterations: "Infinity"
        });
        break;
      case "bounce":
        const _0x234994 = 20;
        const _0xc3976e = _0x51ead0 - _0x6d69ac - _0x234994;
        if (_0xc3976e >= _0x234994) {
          _0x22cabe = _0xc3976e + 3500 / _0x2d8ca4;
          _0x4352b9.animate([{
            transform: "translateX(-5px)"
          }, {
            transform: "translateX(" + _0xc3976e + "px)"
          }], {
            duration: _0x22cabe,
            iterations: "Infinity",
            direction: "alternate",
            easing: "ease-in-out"
          });
        }
        break;
      case "shake":
        const _0x35176d = 350;
        _0x22cabe = _0x35176d * 7 - _0x2d8ca4 * _0x35176d + _0x35176d;
        const _0x151fac = _0x35176d * 1.7;
        _0x4352b9.animate([{
          transform: "translate(1px, 1px)"
        }, {
          transform: "translate(-1px, -2px)"
        }, {
          transform: "translate(-3px, 0px)"
        }, {
          transform: "translate(3px, 2px)"
        }, {
          transform: "translate(1px, -1px)"
        }, {
          transform: "translate(-1px, 2px)"
        }, {
          transform: "translate(-3px, 1px)"
        }, {
          transform: "translate(3px, 1px)"
        }, {
          transform: "translate(-1px, -1px)"
        }, {
          transform: "translate(1px, 2px)"
        }, {
          transform: "translate(1px, -2px)"
        }, {
          transform: "translate(0px)",
          offset: _0x22cabe / (_0x22cabe + _0x151fac)
        }], {
          duration: _0x22cabe + _0x151fac,
          iterations: "Infinity",
          direction: "alternate",
          easing: "ease-in-out"
        });
        break;
      case "wave":
        const _0x3b9f91 = 3;
        const _0x50b709 = 10;
        const _0x41b368 = _0x50b709 * 6 - (_0x38d776 - 1) * _0x50b709;
        _0x22cabe = (_0x3b9f91 * 6 - _0x2d8ca4 * _0x3b9f91 + _0x3b9f91) / 12;
        _0x4352b9.innerHTML = "";
        _0x4352b9.style.transform = "translateY(" + _0x3b9f91 / 2 + "px)";
        for (const _0xcecb91 of _0x4a611f) {
          const _0x30a9ed = document.createElement("span");
          if (_0xcecb91 === " ") {
            _0x30a9ed.innerHTML = "&nbsp;";
          } else {
            _0x30a9ed.textContent = _0xcecb91;
          }
          _0x30a9ed.style.cssText = "\n                        display: inline-block;\n                        animation-duration: " + _0x22cabe + "s;\n                        animation-name: wave-" + _0x5c656d + ";\n                        animation-iteration-count: infinite;\n                        animation-direction: alternate;\n                    ";
          _0x4352b9.appendChild(_0x30a9ed);
        }
        document.styleSheets[0].insertRule("\n                    @keyframes wave-" + _0x5c656d + " {\n                        from { transform : translateY(0); color: white; }\n                        to   { transform : translateY(-" + _0x3b9f91 + "px); }\n                    }\n                ", 0);
        for (let _0x588692 = 0; _0x588692 <= _0x41b368; _0x588692++) {
          document.styleSheets[0].insertRule("\n                        #statusText" + _0x5c656d + " :nth-child( " + _0x41b368 + "n + " + _0x588692 + " ) {\n                            animation-delay : -" + (_0x41b368 - _0x588692) * 2 * _0x22cabe / _0x41b368 + "s;\n                        }\n                    ", 0);
        }
        break;
      case "typing":
        const _0x13ba4a = 350 - _0x2d8ca4 * 50;
        _0x4352b9.innerHTML = "";
        typeWrite(_0x4352b9, [..._0x4a611f], [..._0x5a1d1e], _0x13ba4a);
        makeElement(_0x4dbafe, "div", "caret");
        _0x4dbafe.style.marginTop = "-1px";
        _0x4352b9.style.display = "inline-block";
        break;
      case "slideright":
        _0x22cabe = (3500 - _0x2d8ca4 * _0x93e96 + _0x93e96) * 2;
        _0x4352b9.innerHTML = "";
        for (const [_0x54bbf1, _0x3cd410] of [..._0x4a611f].entries()) {
          const _0x24e100 = makeElement(_0x4352b9, "span");
          if (_0x3cd410 === " ") {
            _0x24e100.innerHTML = "&nbsp;";
          } else {
            _0x24e100.textContent = _0x3cd410;
          }
          _0x24e100.style.cssText = "\n                        opacity: 0;\n                        display: inline-block;\n                        transform: translateX(-50px);\n                    ";
          _0x24e100.animate([{
            opacity: 0
          }, {
            opacity: 0.2
          }, {
            opacity: 0.5,
            transform: "scaleX(1.33)"
          }, {
            opacity: 1,
            transform: "scaleX(1)"
          }, {
            opacity: 1,
            transform: "translate(0px)",
            offset: 0.45
          }, {
            opacity: 1,
            transform: "translate(0px)",
            offset: 0.75
          }, {
            opacity: 1,
            transform: "scaleX(1)"
          }, {
            opacity: 0,
            transform: "translateX(75px) scaleX(1.33)"
          }], {
            delay: (_0x4a611f.length - _0x54bbf1) * 100,
            endDelay: (_0x4a611f.length - _0x54bbf1) * 100,
            duration: _0x22cabe,
            iterations: "Infinity",
            easing: "ease-out"
          });
        }
        break;
      case "slidedown":
        _0x4352b9.parentNode.style.overflow = "hidden";
        _0x22cabe = (3500 - _0x2d8ca4 * _0x93e96 + _0x93e96) * 2;
        _0x4352b9.innerHTML = "";
        for (const [_0x5284a9, _0x25c426] of [..._0x4a611f].entries()) {
          const _0x417af0 = makeElement(_0x4352b9, "span");
          if (_0x25c426 === " ") {
            _0x417af0.innerHTML = "&nbsp;";
          } else {
            _0x417af0.textContent = _0x25c426;
          }
          _0x417af0.style.cssText = "\n                        opacity: 0;\n                        display: inline-block;\n                        transform: translateY(-50px);\n                    ";
          _0x417af0.animate([{
            opacity: 0
          }, {
            opacity: 0.2
          }, {
            opacity: 0.5,
            transform: "scaleY(1.33)"
          }, {
            opacity: 1,
            transform: "scaleY(1)"
          }, {
            opacity: 1,
            transform: "translateY(0px)",
            offset: 0.45
          }, {
            opacity: 1,
            transform: "translateY(0px)",
            offset: 0.75
          }, {
            opacity: 1,
            transform: "scaleY(1)"
          }, {
            opacity: 0,
            transform: "translateY(75px) scaleY(1.33)"
          }], {
            delay: _0x5284a9 * 100,
            endDelay: (_0x4a611f.length - _0x5284a9) * 100,
            duration: _0x22cabe,
            iterations: "Infinity",
            easing: "ease-out"
          });
        }
        break;
      case "flip":
        _0x22cabe = (3500 - _0x2d8ca4 * _0x93e96 + _0x93e96) * 2;
        _0x4352b9.innerHTML = "";
        for (const [_0x617e7f, _0x8131c3] of [..._0x4a611f].entries()) {
          const _0x5dd970 = makeElement(_0x4352b9, "span");
          if (_0x8131c3 === " ") {
            _0x5dd970.innerHTML = "&nbsp;";
          } else {
            _0x5dd970.textContent = _0x8131c3;
          }
          _0x5dd970.style.cssText = "\n                        display: inline-block;\n                        transform-origin: bottom;\n                        transform: rotateY(-90deg);\n                    ";
          _0x5dd970.animate([{
            transform: "rotateY(-90deg)"
          }, {
            transform: "rotateY(0deg)",
            offset: 0.15
          }, {
            transform: "rotateY(0deg)",
            offset: 0.85
          }, {
            transform: "rotateY(-90deg)"
          }], {
            delay: _0x617e7f * 100,
            endDelay: (_0x4a611f.length - _0x617e7f) * 100,
            duration: _0x22cabe,
            iterations: "Infinity",
            easing: "ease-out"
          });
        }
    }
  }
  return _0x4352b9;
}
function typeWrite(_0x272844, _0x176e15, _0xacd25, _0x346249, _0x25a318 = 0, _0x39d1fc = 1) {
  if (!document.body.contains(_0x272844)) {
    return;
  }
  if (_0x39d1fc == 1) {
    if (_0x25a318 < _0x176e15.length) {
      if (_0x176e15[_0x25a318] === " ") {
        _0x272844.innerHTML += "&nbsp;";
      } else {
        _0x272844.textContent += _0x176e15[_0x25a318];
      }
      setTimeout(() => typeWrite(_0x272844, _0x176e15, _0xacd25, _0x346249, _0x25a318 + 1, 1), _0x346249);
    } else {
      setTimeout(() => typeWrite(_0x272844, _0x176e15, _0xacd25, _0x346249, 0, -1), _0x346249 + 500);
    }
  } else if (_0x25a318 <= _0x176e15.length) {
    const _0x40b737 = _0x176e15.slice(0, _0x176e15.length - _0x25a318).join("");
    _0x272844.textContent = _0x40b737;
    setTimeout(() => typeWrite(_0x272844, _0x176e15, _0xacd25, _0x346249, _0x25a318 + 1, -1), _0x346249);
  } else {
    setTimeout(() => typeWrite(_0x272844, _0xacd25, _0x176e15, _0x346249, 0, 1), _0x346249 + 500);
  }
}
function getTextWidth(_0x455e09, _0x3688d8) {
  const _0x5193c5 = (getTextWidth.canvas ||= document.createElement("canvas")).getContext("2d");
  _0x5193c5.font = _0x3688d8;
  return _0x5193c5.measureText(_0x455e09).width;
}
function doAudies(_0x5dde5f) {
  if (_0x5dde5f && _0x5dde5f.target.dataset.sound) {
    doSound(_0x5dde5f.target.dataset.sound, true);
  }
}
function zapShake(_0x517bff, _0x4470c1) {
  document.body.classList.add("bump");
  setTimeout(() => {
    document.body.classList.remove("bump");
  }, 1300);
  doSound(_0x517bff ? "laserfire3" : _0x4470c1 || "raspberry");
}
function handleLink(_0x2188c9, _0x218306, _0x43f113) {
  if (_0x218306.substring(0, 14) == "xat://buy-xats") {
    openBuyPage(true);
  } else if (_0x218306.indexOf("youtu.be/") != -1 || _0x218306.indexOf("youtube.com/shorts/") != -1 || _0x218306.indexOf("youtube.com/watch?") != -1 && _0x218306.indexOf("v=") != -1 && !_0x2188c9.ctrlKey) {
    displayVideo(_0x218306, _0x43f113);
  } else {
    LinkValidator(_0x2188c9, _0x218306);
  }
}
function displayVideo(_0x2c1729, _0x193a92) {
  let _0x5070 = _Activity?.instance?.UserSettings?.youtube;
  if (!_Activity?.instance?.IsClassic) {
    _0x5070 = "popup";
  }
  if (_0x5070 == "app") {
    openApp({
      type: "media",
      link: _0x2c1729.replace(/＆/g, "&")
    });
  } else {
    let _0x14dfb0 = null;
    let _0x458f3f = 0;
    let _0x468947 = null;
    let _0x31bcd1 = 0;
    setAppIcon(10001);
    _0x14dfb0 = _0x2c1729.indexOf("youtu.be/") != -1 ? _0x2c1729.split(".be/")[1].split("?")[0] : _0x2c1729.indexOf("youtube.com/shorts/") != -1 ? _0x2c1729.split("/shorts/")[1].split("?")[0] : _0x2c1729.split("v=")[1].split("＆")[0].split("&")[0];
    if (_0x2c1729.indexOf("t=") != -1) {
      _0x458f3f = xInt(_0x2c1729.split("t=")[1].split("＆")[0].split("&")[0]);
    }
    if (_0x2c1729.indexOf("list=") != -1) {
      _0x468947 = _0x2c1729.split("list=")[1].split("＆")[0].split("&")[0];
      if (_0x2c1729.indexOf("index=") != -1) {
        _0x31bcd1 = _0x2c1729.split("index=")[1].split("＆")[0].split("&")[0] - 1;
      }
    }
    resizeBtn = document.querySelector("#youtubeResize");
    playerToolBar = document.querySelector("#youtubeToolBar");
    playerContainer = document.querySelector("#youtubeContainer");
    let _0x575782 = _Activity.instance.Sound & 8 ? _Activity.instance.Volume[3] : 0;
    if (Player) {
      let _0x29601d = document.querySelector("#youtubeTitle");
      let _0x565cae = GetTranslation("mob2.sentby") + " " + _0x193a92;
      _0x565cae ||= "Sent by " + _0x193a92;
      _0x29601d.innerHTML = _0x565cae;
      playerContainer.style.display = "block";
      if (_0x468947) {
        Playlist = true;
        Player.loadPlaylist({
          list: _0x468947,
          listType: "playlist",
          index: _0x31bcd1,
          startSeconds: _0x458f3f
        });
      } else {
        Playlist = false;
        Player.loadVideoById(_0x14dfb0, _0x458f3f);
      }
      Player.setVolume(_0x575782);
    } else {
      let _0x1a8108 = document.createElement("script");
      _0x1a8108.src = "https://www.youtube.com/iframe_api";
      let _0x175280 = document.getElementsByTagName("script")[0];
      _0x175280.parentNode.insertBefore(_0x1a8108, _0x175280);
      addToolTip(playerToolBar, ["mob2.minimize", "Double-click to minimize"], {
        position: "low"
      });
      window.onYouTubeIframeAPIReady = () => {
        Player = new YT.Player("youtubePlayer", {
          width: "260",
          height: "146",
          playerVars: {
            playsinline: 1
          },
          events: {
            onStateChange: _0x48e995 => {
              if (_0x48e995.data == YT.PlayerState.ENDED && !Playlist) {
                setAppIcon(0);
                playerContainer.style.display = "none";
                Player.style.display = "none";
                Player.stopVideo();
              }
            },
            onError: _0x44f540 => {
              if (Playlist && _0x14dfb0) {
                Playlist = false;
                Player.loadVideoById(_0x14dfb0, _0x458f3f);
              }
            },
            onReady: _0x4a008b => {
              playerContainer.style.display = "block";
              Player.style.display = "block";
              if (_0x468947) {
                Playlist = true;
                Player.loadPlaylist({
                  list: _0x468947,
                  listType: "playlist",
                  index: _0x31bcd1,
                  startSeconds: _0x458f3f
                });
              } else {
                Playlist = false;
                Player.loadVideoById(_0x14dfb0, _0x458f3f);
              }
              Player.setVolume(_0x575782);
            }
          }
        });
      };
      let _0x26092c = document.querySelector("#youtubeTitle");
      let _0x2083d3 = GetTranslation("mob2.sentby") + " " + _0x193a92;
      _0x2083d3 ||= "Sent by " + _0x193a92;
      if (_0x26092c) {
        _0x26092c.innerHTML = _0x2083d3;
      }
      if (!Classic) {
        playerToolBar.style.top = "0px";
        playerToolBar.style.opacity = "1";
      }
      addToolTip(resizeBtn, ["mob2.resize", "Drag to resize"], {
        position: "low"
      });
      if (Classic) {
        playerToolBar.addEventListener("dblclick", () => {
          if (minimized) {
            minimized = false;
            playerContainer.className = "";
            resizeBtn.style.display = "block";
            playerContainer.style.top = (document.body.clientHeight - playerContainer.clientHeight) / 2 + "px";
            playerContainer.style.left = (document.body.clientWidth - playerContainer.clientWidth) / 2 + "px";
            addToolTip(playerToolBar, ["mob2.minimize", "Double-click to minimize"], {
              position: "low"
            });
            positionPlayer();
          } else {
            minimized = true;
            resizeBtn.style.display = "none";
            playerContainer.style.left = "0px";
            playerContainer.className = "min";
            playerContainer.style.top = document.body.clientHeight - 20 + "px";
            addToolTip(playerToolBar, ["mob2.maximize", "Double-click to maximize"], {
              position: "low"
            });
          }
        });
      }
      let _0x30a5ea = document.querySelector("#youtubeClose");
      addToolTip(_0x30a5ea, ["mob1.close", "Close"], {
        position: "low"
      });
      _0x30a5ea.style.display = "flex";
      let _0x15f5a9 = document.querySelector("#youtubeSet");
      if (_0x15f5a9) {
        _0x15f5a9.style.display = "flex";
        addToolTip(_0x15f5a9, ["mob1.settings", "Settings"], {
          position: "low"
        });
        _0x15f5a9.addEventListener("click", () => {
          classicSetDialog("actions", config.MyId);
          classicSetDialog("settings", {
            tab: "appearance",
            UserNo: config.MyId
          });
        });
      }
      let _0x3f0915 = document.querySelector("#youtubeSwitch");
      if (_0x3f0915) {
        _0x3f0915.style.display = "flex";
        addToolTip(_0x3f0915, ["mob1.switch", "Switch to media app"], {
          position: "low"
        });
        _0x3f0915.addEventListener("click", () => {
          let _0x5744e7 = Player.getVideoUrl().replace(/＆/g, "&");
          playerContainer.style.display = "none";
          Player.stopVideo();
          openApp({
            type: "media",
            link: _0x5744e7
          });
        });
      }
      _0x30a5ea.addEventListener("click", () => {
        setAppIcon(0);
        playerContainer.style.display = "none";
        Player.stopVideo();
      });
      window.addEventListener("touchstart", playerDragStart, false);
      window.addEventListener("touchend", playerDragEnd, false);
      window.addEventListener("touchmove", playerDrag, false);
      window.addEventListener("mousedown", playerDragStart, false);
      window.addEventListener("mouseup", playerDragEnd, false);
      window.addEventListener("mousemove", playerDrag, false);
      window.addEventListener("resize", () => {
        positionPlayer();
      });
      positionPlayer((document.body.clientWidth - 260) / 2, (document.body.clientHeight - 146) / 2);
    }
  }
}
function ColorTitle() {
  var _0x538b73;
  config.ButColW = config.ButColW ? config.ButColW : parent.config ? parent.config.ButColW : "";
  config.ButCol = config.ButCol ? config.ButCol : parent.config ? parent.config.ButCol : "";
  var _0x2a359f = ["dialogTitleBar"];
  _0x538b73 = hasDarkMode() ? "color:#969696; background-color: #313131; background-image: linear-gradient(rgba(255, 255, 255, 5%), rgba(0, 0, 0, 5%));" : "color:#" + toHex6(config.ButColW) + "; background-color: #" + toHex6(config.ButCol);
  if (config.ButColW && config.ButCol) {
    let _0x1169ae = document.getElementsByClassName("dialogTitle");
    for (let _0x27a177 = 0; _0x27a177 < _0x1169ae.length; _0x27a177++) {
      _0x1169ae[_0x27a177].style.cssText = "color:#" + (hasDarkMode() ? "969696" : toHex6(config.ButColW));
    }
    for (var _0x488479 in _0x2a359f) {
      var _0x143f17;
      var _0x2e339b = document.getElementsByClassName(_0x2a359f[_0x488479]);
      for (_0x143f17 = 0; _0x143f17 < _0x2e339b.length; _0x143f17++) {
        _0x2e339b[_0x143f17].style.cssText = _0x538b73;
      }
    }
  }
}
function powerAd(_0x269a2e, _0x1951f7) {
  let _0x361f95 = TOPSH || _Activity.instance.xConsts?.topsh;
  if (!_0x361f95 || _0x269a2e.toLowerCase() == "tickle") {
    return;
  }
  if (_Activity.instance.xConsts?.Stickers[_0x1951f7] || STICKERS && STICKERS[_0x1951f7]) {
    classicSetDialog("selector", {
      Type: "Stickers",
      Pack: _0x269a2e,
      Config: config
    });
    return;
  }
  let _0x839318 = [_0x269a2e];
  for (let _0x204b41 in _0x361f95) {
    if (_0x361f95[_0x204b41] == _0x1951f7) {
      _0x839318.push(_0x204b41);
    }
  }
  if (_0x839318.length > 14) {
    _0x839318 = _0x839318.splice(0, 14);
  }
  const _0x14c576 = "svg/remove" + (config.ButColW && toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg";
  let _0x59a9e3 = makeElement(null, "img");
  _0x59a9e3.src = _0x14c576;
  _0x59a9e3.width = "16";
  _0x59a9e3.alt = "close";
  let _0x266a21 = makeElement(null, "div");
  let _0x168289 = makeElement(_0x266a21, "div", "modalDialogContentClassic gpModal");
  let _0x2db32e = makeElement(_0x168289, "div", "dialogTitleBar");
  let _0x475cdf = makeElement(_0x2db32e, "span", "dialogTitle link", "openLink");
  makeElement(_0x2db32e, "span", "dialogTitleAction", "id_ModalClose").appendChild(_0x59a9e3);
  let _0x175c63 = makeElement(_0x168289, "div", "dialogBody");
  let _0x333e9a = makeElement(_0x175c63, "div", "dialogPadding");
  let _0x161b32 = makeElement(_0x333e9a, "div", "", "wrapper");
  let _0x29b48f = makeElement(_0x175c63, "div", "dialogActions");
  let _0x5b96bc = makeElement(_0x29b48f, "div", "butcontainer previewBut centered").appendChild(makeElement(null, "div", "butlayout", "actionButton"));
  _0x475cdf.appendChild(document.createTextNode(_0x269a2e.charAt(0).toUpperCase() + _0x269a2e.slice(1)));
  _0x168289.dataset.w = 0.6;
  let _0x4c5e2a = [];
  let _0xd5efee = [];
  let _0x57cb08 = SUPERPOWERS || _Activity.instance.xConsts?.SuperPowers;
  if (SUPERPOWERS && SUPERPOWERS[_0x1951f7] || _Activity.instance.xConsts?.SuperPowers[_0x1951f7]) {
    _0x5b96bc.appendChild(document.createTextNode("Required Powers"));
    let _0x497246 = SUPERPAWNS || _Activity.instance.xConsts?.SuperPawns;
    for (let _0x3c7d30 in _0x497246) {
      if (_0x497246.hasOwnProperty(_0x3c7d30) && _0x497246[_0x3c7d30] == _0x1951f7) {
        _0xd5efee.push(_0x3c7d30);
      }
    }
    if (_0xd5efee.length > 28) {
      _0xd5efee = _0xd5efee.splice(0, 28);
    }
    for (let _0x46dd0c in _0x57cb08) {
      if (_0x57cb08.hasOwnProperty(_0x46dd0c) && _0x46dd0c == _0x1951f7) {
        for (var _0x25a3ee = 0; _0x25a3ee < _0x57cb08[_0x46dd0c].length; _0x25a3ee++) {
          _0x4c5e2a.push(PSSA[_0x57cb08[_0x46dd0c][_0x25a3ee] + 1]);
        }
      }
    }
    let _0x568496 = makeElement(_0x161b32, "div", "superPowers");
    addText(makeElement(_0x568496, "span", "spTitle"), "Available Pawns:");
  } else {
    let _0x2c05e9 = ISGRP && ISGRP[_0x1951f7] || _Activity.instance.xConsts?.isgrp[_0x1951f7];
    addText(_0x5b96bc, _0x1951f7 == 700 ? ["mob2.storesubnow", "Subscribe Now"] : ["mob1.storebuynow", "Buy Now"]);
    if (_0x2c05e9) {
      addText(makeElement(_0x29b48f, "div", "butcontainer previewBut centered").appendChild(makeElement(null, "div", "butlayout", "gpButton")), ["mob1.assignunassign", "Assign/Unassign"]);
      _0x29b48f.style.display = "flex";
    }
  }
  HiddenDivs.AlertDialog = _0x266a21.innerHTML;
  doModal("AlertDialog");
  ColorTitle();
  setButCols(config.ButCol, config.ButColW);
  setCstyle();
  if (_0xd5efee.length > 0) {
    document.getElementById("openLink").innerHTML += " - COLLECTION";
    _0x161b32 = document.querySelector("#wrapper");
    _0xd5efee.forEach((_0x189c37, _0x5736d3) => {
      _Activity.instance.Smilies.MakeSmiley(_0x161b32, "p1" + _0x189c37 + "##", {
        size: 40,
        className: "smileyPreview",
        align: true,
        tooltip: "(hat#h#" + _0x189c37 + ")"
      });
    });
    document.querySelector("#actionButton").parentNode.addEventListener("click", () => {
      document.querySelector("#actionButton").innerHTML = "";
      addText(document.querySelector("#actionButton"), ["mob1.storebuynow", "Buy Now"]);
      document.querySelector("#actionButton").parentNode.addEventListener("click", () => {
        if (Classic) {
          window.open("http://localhost:6969/store", "_blank");
        } else {
          ToC({
            Command: "StartStore",
            Power: _0x1951f7
          });
          _Activity.instance.SetPage("store");
        }
      });
      _0x161b32.innerHTML = "";
      _0x839318.forEach((_0x4012ed, _0x4a7e9c) => {
        document.querySelector("#box" + _0x4a7e9c);
        _Activity.instance.Smilies.MakeSmiley(_0x161b32, _0x4012ed, {
          size: 40,
          className: "smileyPreview",
          align: true,
          callback: () => smiliePressed("(" + _0x4012ed + ")")
        });
      });
      let _0x488c09 = makeElement(_0x161b32, "div", "superPowers");
      addText(makeElement(_0x488c09, "span", "spTitle"), "Required Powers:");
      _0x4c5e2a.forEach((_0x1b5660, _0x75cd07) => {
        _Activity.instance.Smilies.MakeSmiley(_0x161b32, _0x1b5660, {
          size: 40,
          className: "smileyPreview",
          align: true
        });
      });
    });
  } else {
    _0x161b32 = document.querySelector("#wrapper");
    _0x839318.forEach((_0x293620, _0x211812) => {
      _Activity.instance.Smilies.MakeSmiley(_0x161b32, _0x293620, {
        size: 40,
        className: "smileyPreview",
        align: true,
        callback: () => smiliePressed("(" + _0x293620 + ")")
      });
    });
    document.querySelector("#actionButton").parentNode.addEventListener("click", () => {
      if (Classic) {
        window.open("http://localhost:6969/" + (_0x1951f7 == 700 ? "aces" : "store"), "_blank");
      } else {
        ToC({
          Command: "StartStore",
          Power: _0x1951f7
        });
        _Activity.instance.SetPage("store");
      }
    });
    if (document.querySelector("#gpButton")) {
      document.querySelector("#gpButton").parentNode.addEventListener("click", () => {
        _Activity.instance.QuickBar?.doGroupsPowers(false, _0x269a2e);
      });
    }
  }
  document.querySelector("#openLink").addEventListener("click", () => {
    HitWiki(_0x269a2e);
  });
  document.querySelector("#id_ModalClose").addEventListener("click", () => {
    modalClose();
  });
}
function doSound(_0x29689c, _0x15f2ce) {
  let _0x1c344a = _0x15f2ce && !_Activity?.instance?.IsIOSApp && Browser != "SF" ? "http://localhost:6969/content/sounds/audies/" + _0x29689c + ".webm" : "http://localhost:6969/web_gear/chat/snd/" + _0x29689c + ".mp3";
  new _Activity.instance.Window.Howl({
    src: [_0x1c344a],
    volume: _0x29689c == "laserfire3" ? 1 : _Activity.instance.Volume[1] / 100
  }).play();
}
let posX = 0;
let posY = 0;
let tolerance = 50;
let active = false;
let active2 = false;
let currentX = 0;
let currentY = 0;
let initialX = 0;
let initialY = 0;
let xOffset = null;
let yOffset = null;
function playerDrag(_0x47492e) {
  if (active) {
    _0x47492e.preventDefault();
    hideTooltip();
    let _0x45438a = document.body.clientWidth;
    let _0x23382b = document.body.clientHeight;
    let _0x57488c = 0;
    let _0x3600a4 = 0;
    if (_0x47492e.type === "touchmove") {
      _0x57488c = _0x47492e.touches[0].clientX - initialX;
      _0x3600a4 = _0x47492e.touches[0].clientY - initialY;
      currentX = Math.min(_0x45438a + tolerance, Math.max(-tolerance, _0x57488c));
      currentY = Math.min(_0x23382b + tolerance, Math.max(-tolerance, _0x3600a4));
    } else {
      _0x57488c = _0x47492e.clientX - initialX;
      _0x3600a4 = _0x47492e.clientY - initialY;
      currentX = Math.min(_0x45438a + tolerance, Math.max(-tolerance, _0x57488c));
      currentY = Math.min(_0x23382b + tolerance, Math.max(-tolerance, _0x3600a4));
      if (_0x47492e.clientX < -tolerance || _0x47492e.clientY < -tolerance || _0x47492e.clientX > _0x45438a + tolerance || _0x47492e.clientY > _0x23382b + tolerance) {
        posX = 0;
        posY = 0;
        active = false;
        active2 = false;
        positionPlayer();
        return false;
      }
    }
    xOffset = currentX;
    yOffset = currentY;
    positionPlayer(currentX, currentY);
  } else if (active2) {
    hideTooltip();
    let _0x17d0fd = 0;
    let _0x54709d = 0;
    if (_0x47492e.type === "touchmove") {
      _0x17d0fd = posX - _0x47492e.touches[0].clientX;
      posX = _0x47492e.touches[0].clientX;
      _0x54709d = posY - _0x47492e.touches[0].clientY;
      posY = _0x47492e.touches[0].clientY;
    } else {
      _0x17d0fd = posX - _0x47492e.clientX;
      posX = _0x47492e.clientX;
      _0x54709d = posY - _0x47492e.clientY;
      posY = _0x47492e.clientY;
    }
    let _0x49c425 = 200;
    let _0x3ced52 = 500;
    let _0x3575fa = parseInt(getComputedStyle(Player.getIframe(), "").width) + _0x17d0fd;
    let _0x24f122 = parseInt(getComputedStyle(Player.getIframe(), "").height) + _0x54709d;
    if (_0x3575fa > _0x3ced52 || _0x3575fa < _0x49c425) {
      _0x17d0fd = 0;
      _0x3575fa = parseInt(getComputedStyle(Player.getIframe(), "").width);
    }
    if (_0x24f122 > 281 || _0x24f122 < 112) {
      _0x54709d = 0;
      _0x24f122 = parseInt(getComputedStyle(Player.getIframe(), "").height);
    }
    if (_0x3575fa > _0x3ced52 && _0x24f122 > 281 || _0x3575fa < _0x49c425 && _0x24f122 < 112) {
      _0x17d0fd = 0;
      _0x3575fa = parseInt(getComputedStyle(Player.getIframe(), "").width);
      _0x54709d = 0;
      _0x24f122 = parseInt(getComputedStyle(Player.getIframe(), "").height);
    }
    Player.getIframe().style.width = _0x3575fa + "px";
    playerContainer.style.left = parseInt(playerContainer.style.left) - _0x17d0fd + "px";
    Player.getIframe().style.height = _0x24f122 + "px";
    playerContainer.style.top = parseInt(playerContainer.style.top) - _0x54709d + "px";
  }
}
function playerDragEnd(_0x3d383b) {
  posX = 0;
  posY = 0;
  active = false;
  active2 = false;
  positionPlayer();
  initialX = currentX;
  initialY = currentY;
  if (_0x3d383b.target === playerToolBar) {
    addToolTip(playerToolBar, minimized ? ["mob2.minimize", "Double-click to minimize"] : ["mob2.maximize", "Double-click to maximize"], {
      position: "low"
    });
  }
  if (_0x3d383b.target === resizeBtn) {
    addToolTip(resizeBtn, ["mob2.resize", "Drag to resize"], {
      position: "low"
    });
  }
}
function playerDragStart(_0x145e91) {
  const _0x600bd0 = document.querySelector("#youtubeContainer");
  if (_0x600bd0 && _0x600bd0.style.display !== "none") {
    xOffset = _0x600bd0.offsetLeft;
    yOffset = _0x600bd0.offsetTop;
    playerContainer = _0x600bd0;
  } else {
    xOffset = playerContainer?.offsetLeft || 0;
    yOffset = playerContainer?.offsetTop || 0;
  }
  if (_0x145e91.type === "touchstart") {
    initialX = _0x145e91.touches[0].clientX - xOffset;
    initialY = _0x145e91.touches[0].clientY - yOffset;
    posX = _0x145e91.touches[0].clientX;
    posY = _0x145e91.touches[0].clientY;
  } else {
    initialX = _0x145e91.clientX - xOffset;
    initialY = _0x145e91.clientY - yOffset;
    posX = _0x145e91.clientX;
    posY = _0x145e91.clientY;
  }
  const _0x456f55 = document.querySelector("#youtubeToolBar");
  const _0x17dd82 = document.querySelector("#youtubeResize");
  if (_0x145e91.target === playerToolBar || _0x145e91.target === _0x456f55) {
    active = true;
    active2 = false;
  }
  if (_0x145e91.target === resizeBtn || _0x145e91.target === _0x17dd82) {
    active2 = true;
    active = false;
  }
}
function positionPlayer(_0x1f648c, _0x2e0363) {
  let _0x29b06e = playerContainer.clientWidth;
  let _0x5c774e = playerContainer.clientHeight;
  let _0x440bfe = document.body.clientWidth;
  let _0x561902 = document.body.clientHeight;
  let _0x410d0a = 0;
  let _0x38887d = 0;
  if (_0x1f648c && _0x2e0363) {
    _0x410d0a = Math.min(_0x440bfe - _0x29b06e, Math.max(0, _0x1f648c));
    _0x38887d = Math.min(_0x561902 - _0x5c774e, Math.max(0, _0x2e0363));
  } else {
    _0x410d0a = Math.min(_0x440bfe - _0x29b06e, Math.max(0, parseInt(getComputedStyle(playerContainer, "").left)));
    _0x38887d = Math.min(_0x561902 - _0x5c774e, Math.max(0, parseInt(getComputedStyle(playerContainer, "").top)));
  }
  if (!minimized) {
    playerContainer.style.top = _0x38887d + "px";
  }
  playerContainer.style.left = _0x410d0a + "px";
}
function setButCols(_0x40675e, _0x105146) {
  _0x40675e ||= 80;
  _0x105146 ||= 16777215;
  var _0x2f7feb = "color:#" + toHex6(_0x105146) + "; background-color: #" + toHex6(_0x40675e);
  var _0x4a36be = ["butcontainer"];
  for (var _0x10def1 in _0x4a36be) {
    var _0x2377f6;
    var _0x419b1b = document.getElementsByClassName(_0x4a36be[_0x10def1]);
    for (_0x2377f6 = 0; _0x2377f6 < _0x419b1b.length; _0x2377f6++) {
      _0x419b1b[_0x2377f6].style.cssText = _0x2f7feb;
    }
  }
}
function getTooltipInfo(_0x299ea4) {
  if (_0x299ea4.id == config.MyId || _0x299ea4.id == "2") {
    return ["box.18", "Change your name, avatar and home page"];
  }
  if (xInt(_0x299ea4.id) != 0) {
    let _0x2ab76f = _0x299ea4.id;
    if (_0x2ab76f.substr(-9, 9) == "000000000") {
      _0x2ab76f = _0x2ab76f.substr(0, _0x2ab76f.length - 9) + "B";
    } else if (_0x2ab76f.substr(-6, 6) == "000000") {
      _0x2ab76f = _0x2ab76f.substr(0, _0x2ab76f.length - 6) + "M";
    }
    let _0x3189d5 = _0x299ea4.registered || _0x299ea4.regname;
    _0x3189d5 ||= _0x2ab76f;
    if (_0x299ea4.status && _0x299ea4.status.length > 0 && _0x299ea4.pFlags & NamePowers.status) {
      if (_0x299ea4.status.indexOf("#") != -1) {
        _0x3189d5 += "<br>" + _0x299ea4.status.split("#")[0];
      } else {
        _0x3189d5 += "<br>" + _0x299ea4.status;
      }
    }
    if (xInt(_0x299ea4.id) < 100) {
      _0x3189d5 += "<br>(xat staff)";
    } else {
      _0x3189d5 += "<br>(NOT xat staff)";
    }
    return ["box.16", "Interact with $1", _0x3189d5];
  }
}
function addToolTip(_0x4e8126, _0x1d4dc5, _0x49040b = {}) {
  let {
    select: _0x1f75eb,
    position: _0x1223a6,
    maxWidth: _0xf9394d,
    Rect: _0x159404,
    showRapid: _0x35bdb3,
    shortTime: _0x30bd88,
    dom: _0x3960ea,
    timestamp: _0x48996b,
    instant: _0x1b03f3
  } = _0x49040b;
  if (!_0x4e8126 || _0x1d4dc5.length == 0) {
    return;
  }
  if (_0x1223a6 != "pointer") {
    _0x4e8126.style.cursor = "pointer";
  }
  _0x4e8126.style["pointer-events"] = "auto";
  _0x3960ea ||= document;
  let _0x27c36e = _0x1b03f3 ? 1 : _0x30bd88 ? 500 : 1000;
  if (_0x48996b && !_0x4e8126.dataset.timestamp) {
    _0x4e8126.dataset.timestamp = _0x48996b;
  }
  _0x4e8126.addEventListener(_Activity.instance.IsClassic ? "mouseenter" : "mousedown", _0x5c5370 => {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }
    timeoutId = window.setTimeout(() => {
      if (!_0x4e8126.dataset.key || !!document.querySelector("[data-key=\"" + _0x4e8126.dataset.key + "\"]")) {
        hideTooltip();
        if (_0x4e8126.dataset.timestamp && !_0x35bdb3) {
          _0x1d4dc5 = GetTimeToGo(_0x4e8126.dataset.timestamp);
        }
        tooltip = (_0x5c5370.ctrlKey || _0x5c5370.metaKey) && _0x35bdb3 ? addHintText(_0x5c5370, "Rapid: " + Macros.rapid, _0x1223a6, _0xf9394d, _0x159404, _0x3960ea) : addHintText(_0x5c5370, _0x1d4dc5, _0x1223a6, _0xf9394d, _0x159404, _0x3960ea);
        if (_0x1f75eb) {
          tooltip.addEventListener("mouseenter", () => {
            window.clearTimeout(timeoutId);
          });
        }
        if (_0x35bdb3) {
          _0x3960ea.onkeydown = _0x33ca07 => {
            if (_0x33ca07.ctrlKey || _0x33ca07.key == "Control") {
              let _0x2d930b = _0x3960ea.querySelector("#tooltips");
              if (_0x2d930b) {
                _0x2d930b.parentNode.removeChild(_0x2d930b);
              }
              tooltip = addHintText(_0x5c5370, "Rapid: " + Macros.rapid, _0x1223a6, _0xf9394d, _0x159404, _0x3960ea);
            }
          };
          _0x3960ea.onkeyup = _0x3f5257 => {
            if (!_0x3f5257.ctrlKey && _0x3f5257.key == "Control") {
              let _0x248c82 = _0x3960ea.querySelector("#tooltips");
              if (_0x248c82) {
                _0x248c82.parentNode.removeChild(_0x248c82);
              }
              tooltip = addHintText(_0x5c5370, _0x1d4dc5, _0x1223a6, _0xf9394d, _0x159404, _0x3960ea);
            }
          };
        }
        _0x3960ea.addEventListener("click", _0x2cdb5d => {
          if (_0x2cdb5d.target != tooltip) {
            hideTooltip();
          }
        });
        tooltip.addEventListener("mouseleave", () => {
          window.clearTimeout(timeoutId);
          timeoutId = window.setTimeout(() => {
            let _0x794042 = _0x3960ea.querySelector("#tooltips");
            if (_0x794042) {
              _0x794042.parentNode.removeChild(_0x794042);
            }
            tooltip = null;
          }, 100);
        });
        if (_0x1f75eb) {
          tooltip.addEventListener("click", () => {
            if (_0x3960ea.body.createTextRange) {
              const _0xb9b3a9 = _0x3960ea.body.createTextRange();
              _0xb9b3a9.moveToElementText(tooltip);
              _0xb9b3a9.select();
            } else if (window.getSelection) {
              const _0x31cc3e = window.getSelection();
              const _0x7ab465 = _0x3960ea.createRange();
              _0x7ab465.selectNodeContents(tooltip);
              _0x31cc3e.removeAllRanges();
              _0x31cc3e.addRange(_0x7ab465);
            }
          });
        }
      }
    }, tooltip ? 0 : _0x27c36e);
  });
  _0x4e8126.addEventListener("mouseleave", () => {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }
    if (_0x35bdb3) {
      _0x3960ea.onkeyup = null;
      _0x3960ea.onkeydown = null;
    }
    timeoutId = window.setTimeout(() => {
      let _0x27c1f7 = _0x3960ea.querySelector("#tooltips");
      if (_0x27c1f7) {
        _0x27c1f7.parentNode.removeChild(_0x27c1f7);
      }
      tooltip = null;
    }, 500);
  });
}
function hideTooltip() {
  tooltip = null;
  let _0x31cedd = document.querySelector("#tooltips");
  if (_0x31cedd) {
    _0x31cedd.parentNode.removeChild(_0x31cedd);
  }
}
function openGift(_0xd85df9) {
  if (_0xd85df9) {
    if (_Activity.instance.IsClassic) {
      const _0x1f109f = document.getElementById("appframe")?.contentWindow;
      if (!_0x1f109f || !_0x1f109f?.document) {
        return;
      }
      const _0xc34156 = _0x1f109f.document.querySelector(".dialogBody");
      if (_0xc34156) {
        _0xc34156.style.height = "90%";
      }
      _0x1f109f?.classicSetDialog("selector", {
        Type: "Gifts",
        UserNo: _0xd85df9
      });
      return;
    }
    classicSetDialog("selector", {
      Type: "Gifts",
      UserNo: _0xd85df9
    });
  }
}
function GetRealBack(_0x2f66ce, _0x20d728, _0x2532b8, _0x58ead2) {
  if (!_0x2f66ce) {
    return "";
  }
  if (_0x2f66ce.charAt(0) == "h") {
    return "url(\"" + (_0x20d728 ? SafeImage(_0x2f66ce, 1136, 640) : SafeImage(_0x2f66ce, 640, _0x2532b8, _0x58ead2)) + "\") no-repeat 0 0 / cover fixed";
  }
  return _0x2f66ce;
}
function LoadBackground(_0x10b89c) {
  let _0x263464;
  let _0x1f8f66;
  let _0x5a6b16 = _0x10b89c.split(";=");
  _0x10b89c = config.xatback;
  let _0x412ea6 = 1136;
  let _0x4db707 = config.page;
  let _0x54ba19 = false;
  var _0xa3d85b = _Activity.IsFlixActive && _Activity.IsFlixVisible;
  var _0x44e8c9 = _Activity.CurrentChat;
  _0x4db707 ||= _Activity.instance.CurrentPage;
  switch (_0x4db707) {
    case "visitors":
    case "messages":
    case "classic":
      if (_0x5a6b16[1] && _0x5a6b16[2]) {
        const _0x1dad2d = _0x5a6b16[2].split(",");
        _0xa3d85b = false;
        if ((_0x10b89c = _0x1dad2d[0]).substring(0, 4) === "http") {
          _0x54ba19 = parseInt(_0x1dad2d[1]) === 1;
          if (window?.innerHeight > 0 && _0x54ba19) {
            _0x412ea6 = window.innerHeight;
          }
        } else if (/(^[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(_0x10b89c)) {
          _0x10b89c = "#" + _0x10b89c;
        }
      } else if (!_Activity.instance.IsLandscape && !Classic && _0x5a6b16[9].length > 0) {
        _0x10b89c = _0x5a6b16[9];
        _0x263464 = 1;
        _0xa3d85b = false;
      } else if (_Activity.instance.IsLandscape && !Classic && _0x5a6b16[10].length > 0) {
        _0x10b89c = _0x5a6b16[10];
        _0x1f8f66 = 1;
        _0xa3d85b = false;
      } else {
        _0x10b89c = _0x5a6b16[3];
        _0x44e8c9 = _Activity.FlixChatId;
      }
  }
  _Activity.FlixBackground = GetRealBack(_0x5a6b16[3], _0x263464, _0x412ea6, false);
  var _0x1cb0e4 = false;
  if (!_0xa3d85b) {
    _0x1cb0e4 = HandleFlix(_0x44e8c9);
  }
  if (!_0xa3d85b && !_0x1cb0e4) {
    document.body.style.background = GetRealBack(_0x10b89c, _0x263464, _0x412ea6, _0x54ba19);
    if (!Classic) {
      document.body.style.backgroundPosition = "left";
    }
  }
}
function calcAvSize(_0x119fda) {
  if (_0x119fda <= 30) {
    return 30;
  } else if (_0x119fda <= 35) {
    return 35;
  } else if (_0x119fda <= 80) {
    return 80;
  } else if (_0x119fda == 100) {
    return 100;
  } else if (_0x119fda <= 160) {
    return 160;
  } else if (_0x119fda <= 320) {
    return 320;
  } else {
    return 640;
  }
}
function calcStripSize(_0x45038e) {
  if (_0x45038e <= 20) {
    return 20;
  } else if (_0x45038e <= 30) {
    return 30;
  } else if (_0x45038e <= 35) {
    return 35;
  } else if (_0x45038e <= 40) {
    return 40;
  } else if (_0x45038e <= 80) {
    return 80;
  } else {
    return 160;
  }
}
function addHintText(_0x356f71, _0x119162, _0xa93981, _0x20ec04, _0x3ba32a, _0x34cff0) {
  if (_0x119162 && _0x119162.length == 0) {
    return;
  }
  let _0x503b77 = _0x34cff0.querySelector("#tooltips");
  if (_0x503b77) {
    _0x503b77.parentNode.removeChild(_0x503b77);
  }
  _0x503b77 = makeElement(null, "div", "", "tooltips");
  _0x34cff0.body.prepend(_0x503b77);
  let _0x671ba7 = makeElement(_0x503b77, "div", "tooltip");
  if (_0x20ec04) {
    _0x671ba7.style["max-width"] = "50%";
  }
  addText(_0x671ba7, _0x119162, true);
  var _0x431143 = _0x3ba32a ? _0x3ba32a.getBoundingClientRect() : _0x356f71.target.getBoundingClientRect();
  switch (_0xa93981) {
    case "left":
      _0x671ba7.style.top = _0x431143.top + "px";
      _0x671ba7.style.left = Math.min(_0x431143.left) - _0x671ba7.clientWidth - 10 + "px";
      if (_0x671ba7.getBoundingClientRect().left < 15) {
        _0x671ba7.style.left = "15px";
      } else if (_0x671ba7.getBoundingClientRect().right >= window.innerWidth) {
        _0x671ba7.style.left = window.innerWidth - _0x671ba7.getBoundingClientRect().width - 15 + "px";
      }
      break;
    case "right":
      _0x671ba7.style.top = _0x431143.top + "px";
      _0x671ba7.style.left = _0x431143.width - (_0x671ba7.clientWidth - 5) + "px";
      if (_0x671ba7.getBoundingClientRect().right < 15) {
        _0x671ba7.style.right = "15px";
      } else if (_0x671ba7.getBoundingClientRect().right >= window.innerWidth) {
        _0x671ba7.style.right = window.innerWidth - _0x671ba7.getBoundingClientRect().width - 15 + "px";
      }
      break;
    case "low":
      _0x671ba7.style.top = _0x431143.top - 30 + "px";
      _0x671ba7.style.left = _0x431143.left + Math.abs(_0x431143.left - _0x431143.right) / 2 - _0x671ba7.clientWidth / 2 + "px";
      if (_0x671ba7.getBoundingClientRect().left < 15) {
        _0x671ba7.style.left = "15px";
      } else if (_0x671ba7.getBoundingClientRect().right >= window.innerWidth) {
        _0x671ba7.style.left = window.innerWidth - _0x671ba7.getBoundingClientRect().width - 15 + "px";
      }
      break;
    case "bottom":
      _0x671ba7.style.top = "58px";
      _0x671ba7.style.left = _0x431143.left + Math.abs(_0x431143.left - _0x431143.right) / 2 - _0x671ba7.clientWidth / 2 + "px";
      if (_0x671ba7.getBoundingClientRect().left < 15) {
        _0x671ba7.style.left = "15px";
      } else if (_0x671ba7.getBoundingClientRect().right >= window.innerWidth) {
        _0x671ba7.style.left = window.innerWidth - _0x671ba7.getBoundingClientRect().width - 25 + "px";
      }
      break;
    case "pointer":
      _0x671ba7.style.top = _0x431143.top - 30 + "px";
      _0x671ba7.style.left = _0x356f71.clientX + "px";
      if (_0x671ba7.getBoundingClientRect().left < 15) {
        _0x671ba7.style.left = "15px";
      } else if (_0x671ba7.getBoundingClientRect().right >= window.innerWidth) {
        _0x671ba7.style.left = window.innerWidth - _0x671ba7.getBoundingClientRect().width - 15 + "px";
      }
      break;
    case "top-tall":
      _0x671ba7.style.top = _0x431143.top - _0x671ba7.getBoundingClientRect().height - 10 + "px";
      _0x671ba7.style.left = _0x431143.left + Math.abs(_0x431143.left - _0x431143.right) / 2 - _0x671ba7.clientWidth / 2 + "px";
      if (_0x671ba7.getBoundingClientRect().left < 15) {
        _0x671ba7.style.left = "15px";
      } else if (_0x671ba7.getBoundingClientRect().right >= window.innerWidth) {
        _0x671ba7.style.left = window.innerWidth - (_0x671ba7.getBoundingClientRect().width - 15) * 2 + "px";
      }
      if (xInt(_0x671ba7.style.left) <= 0) {
        _0x671ba7.style.left = "15px";
      }
      break;
    default:
      _0x671ba7.style.top = _0x431143.top - 50 + "px";
      _0x671ba7.style.left = _0x431143.left + Math.abs(_0x431143.left - _0x431143.right) / 2 - _0x671ba7.clientWidth / 2 + "px";
      if (_0x671ba7.getBoundingClientRect().left < 15) {
        _0x671ba7.style.left = "15px";
      } else if (_0x671ba7.getBoundingClientRect().right >= window.innerWidth) {
        _0x671ba7.style.left = window.innerWidth - _0x671ba7.getBoundingClientRect().width - 15 + "px";
      }
      if (xInt(_0x671ba7.style.left) <= 0) {
        _0x671ba7.style.left = "15px";
      }
  }
  if (_0x671ba7.getBoundingClientRect().top < 0) {
    _0x671ba7.style.top = "5px";
  }
  return _0x671ba7;
}
var LangFiles = _Activity.instance?.LangFiles ?? {};
function TranslateNodes(_0x2ce82e, _0x2de297) {
  if (!_0x2de297) {
    return;
  }
  var _0x2cc527 = false;
  for (var _0x53c47a in LangFiles) {
    if (LangFiles[_0x53c47a]) {
      _0x2cc527 = true;
      break;
    }
  }
  let _0x15249a;
  if (_0x2de297 == "box" && _Activity.instance.CustomGroupLang) {
    _0x15249a = _Activity.instance.CustomGroupLang;
    _0x2cc527 = true;
  }
  if (_0x2cc527) {
    var _0xb9c614;
    var _0x4fd815;
    var _0x7310ea;
    var _0x146998 = _0x2ce82e.querySelectorAll("[data-localize]");
    var _0x23d38a = _0x146998.length;
    for (_0x53c47a = 0; _0x53c47a < _0x23d38a; ++_0x53c47a) {
      if (_0x2de297 == (_0x7310ea = (_0x4fd815 = _0x146998[_0x53c47a]).getAttribute("data-localize").split("."))[0]) {
        _0xb9c614 = LangFiles[_0x7310ea[0]][_0x7310ea[1]];
        if (_0x15249a && _0x15249a[_0x7310ea[1]]) {
          _0xb9c614 = _0x15249a[_0x7310ea[1]];
        }
        if (_0xb9c614) {
          changeText(_0x4fd815, _0xb9c614, true);
        }
      }
    }
  }
}
function GotLang(_0x216bc9) {
  for (var _0x6acf47 in _0x216bc9) {
    if (_0x216bc9[_0x6acf47]) {
      LangFiles[_0x6acf47] = _0x216bc9[_0x6acf47];
    }
  }
  Translate(_0x216bc9);
  let _0x3bc93a = document.getElementById("appframe")?.contentWindow;
  if (_0x3bc93a && _0x3bc93a.Translate) {
    _0x3bc93a.Translate(_0x216bc9);
  }
}
function LoadLangAll(_0x937104 = false) {
  LoadLang({
    box: 0,
    mob2: 0,
    mob1: 0,
    login: 0
  }, false, _0x937104);
}
function TranslateAll() {
  Translate({
    box: 0,
    mob2: 0,
    mob1: 0,
    login: 0
  });
}
function Translate(_0x4bf1c7) {
  for (let _0x30e2d9 in _0x4bf1c7) {
    if (LangFiles[_0x30e2d9]) {
      TranslateNodes(document, _0x30e2d9);
    }
  }
}
function LoadLang(_0x282a58, _0x54465d, _0x10b686) {
  if (_0x54465d) {
    Language = _0x54465d;
    _Activity.instance.LangFiles = {};
    LangFiles = {};
  }
  for (let _0xd290f9 in _0x282a58) {
    loadJSON(xatdomain + "/json/lang/getlang2.php?f=" + _0xd290f9 + "&l=" + Language, GotLang);
  }
  if (_0x10b686) {
    TranslateAll();
  }
}
function makeElement(_0x1b269b, _0x11b17f, _0x4818e1, _0x31f84d, _0x1b0155) {
  var _0x477807 = document.createElement(_0x11b17f);
  if (_0x4818e1) {
    _0x477807.className = _0x4818e1;
  }
  if (_0x31f84d) {
    _0x477807.id = _0x31f84d;
  }
  if (_0x1b269b) {
    _0x1b269b.appendChild(_0x477807);
  }
  if (_0x1b0155) {
    _0x1b0155.prepend(_0x477807);
  }
  return _0x477807;
}
function addEditBox(_0x5258b1, _0x353dc9, _0x224827, _0xe44884, _0x2392cc, _0x57a570) {
  var _0x9533c2 = makeElement(_0x5258b1, "div");
  var _0x197f3b = makeElement(_0x9533c2, "span", "edittitle");
  if (_0x2392cc) {
    _0x197f3b.style.fontWeight = "bold";
  }
  addText(_0x197f3b, _0x224827);
  if (_0xe44884 === undefined) {
    _0xe44884 = "";
  }
  if (_0xe44884 !== "noedit") {
    var _0xada25b = makeElement(_0x9533c2, "input");
    if (_0x57a570 == "password") {
      _0xada25b.type = "password";
    } else {
      _0xada25b.type = "text";
      _0xada25b.value = _0xe44884;
    }
    _0xada25b.id = _0x353dc9;
  }
}
function GetTranslation(_0x2d53f5, _0x27f6c1) {
  var _0x451641 = _0x2d53f5.split(".");
  let _0x3f0b44;
  if (_0x451641[0] == "box" && _Activity.instance.CustomGroupLang && (_0x3f0b44 = _Activity.instance.CustomGroupLang[_0x451641[1]])) {
    return _0x3f0b44;
  }
  if (LangFiles && LangFiles[_0x451641[0]] && LangFiles[_0x451641[0]][_0x451641[1]]) {
    let _0x868d28 = LangFiles[_0x451641[0]][_0x451641[1]];
    if (_0x27f6c1) {
      _0x27f6c1.forEach((_0x2bcd3d, _0x55570c) => {
        const _0x2ba725 = new RegExp("\\$" + (_0x55570c + 1), "g");
        _0x868d28 = _0x868d28.replace(_0x2ba725, _0x2bcd3d);
      });
    }
    return _0x868d28;
  }
  return false;
}
function TransText(_0x337a75, _0x5616a4) {
  var _0x59516f = GetTranslation(_0x337a75);
  return _0x59516f || _0x5616a4;
}
function addText(_0x2476ff, _0x5e7ff2, _0xe54a18) {
  if (!_0x5e7ff2) {
    return;
  }
  var _0x496cef;
  if (typeof _0x5e7ff2 == "string" && _0x5e7ff2.charAt(0) == "[" && _0x5e7ff2.search(/\[mob/) >= 0) {
    for (var _0x423491 in _0x5e7ff2 = _0x5e7ff2.split(/\[mob|\]/)) {
      if ((_0x496cef = _0x5e7ff2[_0x423491]).charAt(0) > 0 && _0x496cef.charAt(1) == ".") {
        _0x5e7ff2[_0x423491] = _0x496cef.split(",");
        _0x5e7ff2[_0x423491][0] = "mob" + _0x5e7ff2[_0x423491][0];
      }
    }
  }
  if (Array.isArray(_0x5e7ff2)) {
    if (Array.isArray(_0x5e7ff2[0]) || _0x5e7ff2[1] && Array.isArray(_0x5e7ff2[1])) {
      for (var _0x423491 in _0x5e7ff2) {
        addText(_0x2476ff, _0x5e7ff2[_0x423491]);
      }
      return "";
    }
    if (_0x5e7ff2[0]) {
      _0x2476ff.setAttribute("data-localize", _0x5e7ff2[0]);
      let _0x4915cd = null;
      if (_0x5e7ff2.length > 2) {
        const _0x508629 = _0x5e7ff2.slice(2, _0x5e7ff2.length);
        _0x4915cd = GetTranslation(_0x5e7ff2[0], _0x508629);
        _0x5e7ff2 = _0x5e7ff2[1];
        _0x508629.forEach((_0x2ee0bf, _0x5e7e61) => {
          const _0x2c60ac = new RegExp("\\$" + (_0x5e7e61 + 1), "g");
          _0x5e7ff2 = _0x5e7ff2.replace(_0x2c60ac, _0x2ee0bf);
          _0x4915cd &&= _0x4915cd.replace(_0x2c60ac, _0x2ee0bf);
        });
      } else {
        _0x4915cd = GetTranslation(_0x5e7ff2[0]);
        _0x5e7ff2 = _0x5e7ff2[1];
      }
      if (_0x4915cd) {
        _0x5e7ff2 = _0x4915cd;
      }
    } else {
      _0x5e7ff2 = _0x5e7ff2[1];
    }
  }
  if (_0x2476ff && typeof _0x5e7ff2 == "string" && _0x5e7ff2.indexOf("$1") >= 0 && _0x2476ff?.dataset?.dataSec) {
    _0x5e7ff2 = _0x5e7ff2.replace("$1", _0x2476ff.dataset.dataSec);
  }
  let _0x4b73ce = null;
  if (_0xe54a18) {
    if (_0x2476ff) {
      _0x2476ff.innerHTML += _0x5e7ff2;
    }
  } else {
    _0x4b73ce = document.createTextNode(_0x5e7ff2);
    if (_0x2476ff) {
      _0x2476ff.appendChild(_0x4b73ce);
    }
  }
  return _0x4b73ce;
}
function changeText(_0x511405, _0x30ec5d, _0x338df7) {
  while (_0x511405.firstChild) {
    _0x511405.removeChild(_0x511405.firstChild);
  }
  if (_0x511405.tagName.toLowerCase() == "input") {
    _0x511405.placeholder = _0x30ec5d;
  } else {
    addText(_0x511405, _0x30ec5d, _0x338df7);
  }
}
function setValue(_0x25a969, _0x5c5dc9) {
  var _0x5bb309 = document.getElementById(_0x25a969);
  if (_0x5bb309) {
    _0x5c5dc9 ||= "";
    _0x5bb309.value = _0x5c5dc9;
  }
}
function setTextNode(_0x13f4ed, _0x5c3ff7, _0x39bbf5) {
  var _0x20a89c = document.getElementById(_0x13f4ed);
  if (_0x20a89c) {
    while (_0x20a89c.firstChild) {
      _0x20a89c.removeChild(_0x20a89c.firstChild);
    }
    if (_0x5c3ff7) {
      _0x20a89c.appendChild(document.createTextNode(_0x5c3ff7));
    }
    if (_0x39bbf5) {
      _0x20a89c.appendChild(_0x39bbf5);
    }
  }
}
function addTextNode(_0x5eb52e, _0x3a688a) {
  var _0x1d0287 = document.getElementById(_0x5eb52e);
  if (_0x1d0287 && _0x3a688a) {
    _0x1d0287.appendChild(document.createTextNode(_0x3a688a));
  }
}
const capitalize = _0x2a39be => typeof _0x2a39be != "string" ? "" : _0x2a39be.charAt(0).toUpperCase() + _0x2a39be.slice(1);
function clearDiv(_0x2f661f, _0x541f70) {
  _0x541f70 ||= document.getElementById(_0x2f661f);
  if (_0x541f70) {
    while (_0x541f70.firstChild) {
      _0x541f70.removeChild(_0x541f70.firstChild);
    }
  }
  return _0x541f70;
}
function setDNone(_0x291d20, _0x224ea2, _0x3d1fee) {
  if (_0x291d20) {
    removeClass("d-none", _0x224ea2, _0x3d1fee);
  } else {
    addClass("d-none", _0x224ea2, _0x3d1fee);
  }
}
function addClass(_0x57a469, _0x1c5e04, _0x164fc0) {
  if (_0x1c5e04) {
    _0x164fc0 = document.getElementById(_0x1c5e04);
  }
  if (_0x164fc0) {
    _0x164fc0.classList.add(_0x57a469);
  }
  return _0x164fc0;
}
function removeClass(_0x24f4d2, _0x49cb94, _0x2080f5) {
  if (_0x49cb94) {
    _0x2080f5 = document.getElementById(_0x49cb94);
  }
  if (_0x2080f5) {
    _0x2080f5.classList.remove(_0x24f4d2);
  }
  return _0x2080f5;
}
function removeById(_0x23fcf4, _0xe55789) {
  var _0xa68689 = document.getElementById(_0x23fcf4);
  for (; _0xe55789;) {
    _0xa68689 &&= _0xa68689.parentNode;
    _0xe55789--;
  }
  if (_0xa68689 != null) {
    _0xa68689.parentNode.removeChild(_0xa68689);
  }
}
function getById(_0x4c50ee) {
  return document.getElementById(_0x4c50ee);
}
function insertAfter(_0x5785d7, _0x2ed76a) {
  if (_0x2ed76a) {
    var _0x504d8a = _0x2ed76a.parentNode;
    if (_0x504d8a.lastchild == _0x2ed76a) {
      _0x504d8a.appendChild(_0x5785d7);
    } else {
      _0x504d8a.insertBefore(_0x5785d7, _0x2ed76a.nextSibling);
    }
  }
}
function animateTo(_0x321d05, _0x4dadfb, _0x2ebbd8, _0x53d420) {
  const _0x2d805c = _0x321d05.animate(_0x4dadfb, {
    ..._0x2ebbd8,
    fill: "both"
  });
  _0x2d805c.addEventListener("finish", () => {
    if (_0x53d420) {
      _0x53d420();
    }
  });
  return _0x2d805c;
}
function animateFrom(_0x60b77f, _0x21669b, _0xe16f8c, _0x5431be) {
  const _0x4839f6 = _0x60b77f.animate({
    ..._0x21669b,
    offset: 0
  }, {
    ..._0xe16f8c,
    fill: "backwards"
  });
  _0x4839f6.addEventListener("finish", () => {
    if (_0x5431be) {
      _0x5431be();
    }
  });
  return _0x4839f6;
}
function restrictCharacters(_0x2f8997, _0x4484be) {
  var _0x48c9eb;
  if (_0x2f8997.keyCode) {
    _0x48c9eb = _0x2f8997.keyCode;
  } else if (_0x2f8997.which) {
    _0x48c9eb = _0x2f8997.which;
  }
  return !!String.fromCharCode(_0x48c9eb).match(_0x4484be);
}
function isColorLight(_0x3f4af5) {
  let _0x19e359;
  let _0x3d45c9;
  let _0x222d15;
  let _0x2ed582;
  return !!_0x3f4af5 && (_0x3f4af5.match(/^rgb/) ? (_0x19e359 = (_0x3f4af5 = _0x3f4af5.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/))[1], _0x3d45c9 = _0x3f4af5[2], _0x222d15 = _0x3f4af5[3]) : (_0x19e359 = (_0x3f4af5 = +("0x" + _0x3f4af5.slice(1).replace(_0x3f4af5.length < 5 && /./g, "$&$&"))) >> 16, _0x3d45c9 = _0x3f4af5 >> 8 & 255, _0x222d15 = _0x3f4af5 & 255), _0x2ed582 = Math.sqrt(_0x19e359 * _0x19e359 * 0.299 + _0x3d45c9 * _0x3d45c9 * 0.587 + _0x222d15 * _0x222d15 * 0.114), _0x2ed582 > 127.5);
}
function restrictCharacters2(_0x5f3a02, _0x3e00ee) {
  _0x5f3a02.target.value = _0x5f3a02.target.value.replace(_0x3e00ee, "");
  return false;
}
function setTitleBarNum(_0x38d9ca) {
  var _0x1b1614 = document.getElementById("titleBar");
  if (_0x1b1614 && _0x1b1614.count) {
    if (_0x38d9ca > 0) {
      _0x1b1614.count.innerHTML = _0x38d9ca;
      _0x1b1614.count.style.visibility = "visible";
    } else {
      _0x1b1614.count.style.visibility = "hidden";
    }
  }
}
function addTitleBar(_0x1e987c, _0x4c9be0, _0x12d2f7, _0x5e5a20, _0x46e414, _0x2f9f31, _0x8be057, _0x588d4a, _0x40949b, _0x309c21, _0x3a65fb) {
  var _0x4f8a85 = clearDiv("titleBar");
  var _0x3e7744 = makeElement(_0x4f8a85, "div", "table htmlTitleBarButtons");
  var _0x7374bb = makeElement(_0x3e7744, "div", "row");
  var _0x505ddd = makeElement(_0x7374bb, "div", _0x8be057 ? "cell htmlTitleButton d-none" : "cell htmlTitleButton");
  if (_0x588d4a) {
    _0x505ddd.classList.remove("d-none");
  }
  _0x505ddd.addEventListener("click", _0x12d2f7);
  var _0x4cf443 = makeElement(_0x505ddd, "span", "");
  if (_0x2f9f31) {
    let _0x54ee78 = makeElement(_0x505ddd, "a", null, _0x8be057 ? "repIcon" : "");
    (_0x2f9f31 = makeElement(_0x54ee78, "img")).src = _0x8be057 ? "svg/reportw.svg" : "svg/plus.svg";
    _0x2f9f31.width = "18";
    if (!_0x8be057) {
      _0x2f9f31.style.marginTop = "-2px";
    }
    _0x505ddd.addEventListener("click", _0x5454d9 => {
      _0x5454d9.preventDefault();
      if (_0x8be057) {
        reportsDrop(_0x1e987c);
      } else {
        groupsDrop();
      }
    });
  } else {
    addText(_0x4cf443, _0x4c9be0);
  }
  if (_0x8be057 && !Classic) {
    var _0x46c70d = makeElement(_0x7374bb, "div", "cell htmlTitleButton");
    _0x46c70d.addEventListener("click", _0x573b81 => {
      _0x573b81.preventDefault();
      callsDrop(_0x1e987c);
    });
    let _0x3204b3 = makeElement(_0x46c70d, "a", null, "callIcon");
    let _0x255217 = makeElement(_0x3204b3, "img");
    _0x255217.src = "svg/call/call.svg";
    _0x255217.width = "18";
    _0x255217.style.display = _0x588d4a ? "inline" : "none";
  }
  makeElement(_0x7374bb, "div", "cell cellWide");
  var _0x3847a4 = makeElement(_0x7374bb, "div", "cell cellRight htmlTitleButton");
  _0x3847a4.addEventListener("click", _0x46e414);
  var _0x4bce4b = makeElement(_0x3847a4, "span", "", "TitleBarRight");
  if (_0x309c21) {
    _0x309c21 = makeElement(_0x4bce4b, "a");
    (_0x5e5a20 = makeElement(_0x309c21, "img")).src = "svg/visitors.svg";
    _0x5e5a20.width = "22";
  }
  if (_0x40949b) {
    var _0x10185b = makeElement(_0x7374bb, "div", "cell cellRight htmlTitleButton", "sideBarMob");
    makeElement(_0x10185b, "span", "", "TitleBarRight");
    let _0x217384 = makeElement(_0x10185b, "a");
    (_0x40949b = makeElement(_0x217384, "img")).id = "sideBarMobId";
    _0x40949b.src = "svg/arrowqb.svg";
    _0x40949b.style.cssText = "width: 10px; margin-top: 2px; transform: scaleX(-1)";
    if (!_Activity.instance.IsClassic) {
      loadQuickBar(typeof _Activity.instance.QuickBar != "object");
    }
  }
  if (typeof _0x5e5a20 == "boolean") {
    const _0x13f525 = "svg/removew.svg";
    let _0x242738 = makeElement(_0x4bce4b, "img");
    _0x242738.src = _0x13f525;
    _0x242738.width = "18";
  } else if (!_0x309c21) {
    addText(_0x4bce4b, _0x5e5a20);
  }
  var _0x517fa0 = makeElement(_0x4f8a85, "div", "table htmlTitleBar cellWide" + (_0x3a65fb ? " actionsDialog" : ""));
  var _0x4223d1 = makeElement(_0x517fa0, "div", "row");
  var _0x4633cf = makeElement(_0x4223d1, "div", "cell cellWide dialogCellCenter htmlTitleTitle");
  var _0x40555a = makeElement(_0x4633cf, "span", "", "TitleBarTitle");
  if (_0x1e987c.length > 0) {
    addText(_0x40555a, _0x1e987c);
  }
}
function groupsDrop() {
  const _0x232123 = document.getElementById("groupDropdown");
  _0x232123.style.display = _0x232123 && _0x232123.style.display == "block" ? "none" : "block";
}
function reportsDrop(_0xa9c6a0 = null) {
  const _0x23648e = Classic ? document.getElementById("reportDropdownClassic") : document.getElementById("reportDropdown");
  const _0x21affd = document.querySelector("#userBlock");
  const _0x2fde9a = document.querySelector("#userReport");
  if (!_0x23648e) {
    return;
  }
  if (!_0xa9c6a0) {
    _0x23648e.style.display = "none";
    return;
  }
  const _0x23096a = Classic ? document.getElementById("callDropdownClassic") : document.getElementById("callDropdown");
  if (_0x23096a && _0x23096a.style.display === "block") {
    _0x23096a.style.display = "none";
  }
  let _0x562d45 = _0xa9c6a0;
  if ((_0xa9c6a0.slice(-1) == "M" || _0xa9c6a0.slice(-1) == "B") && !isNaN(_0xa9c6a0.slice(0, -1))) {
    _0x562d45 = _0xa9c6a0.slice(0, -1);
  }
  let _0x666c51 = ["mob2.block", "Block"];
  let _0x160771 = /[a-zA-Z]/g.test(_0x562d45);
  const _0x2a8d90 = _0x21affd.querySelector("#blockText");
  let _0x138b68 = _0x160771 ? _0xa9c6a0.split("(")[1].slice(0, -1) : _0xa9c6a0;
  _0x138b68 = _0x138b68.replace("M", "000000");
  _0x138b68 = _0x138b68.replace("B", "000000000");
  if (getBlockedUsers()[_0x138b68]) {
    _0x666c51 = ["mob2.unblock", "Unblock"];
  }
  _0x2a8d90.innerText = "";
  addText(_0x2a8d90, _0x666c51);
  const _0x785cd6 = _0x23648e.style.display || "none";
  _0x23648e.style.display = _0x785cd6 === "block" ? "none" : "block";
  if (_0x160771) {
    _0x2fde9a.classList.remove("d-none");
    _0x2fde9a.setAttribute("href", "http://localhost:6969/report#!user&UserName=" + _0xa9c6a0.split(" ")[0].toLowerCase());
  } else {
    _0x2fde9a.classList.add("d-none");
  }
  _0x21affd.onclick = () => {
    ToC({
      Command: "Block",
      UserNo: _0x138b68
    });
    actions.Visible = false;
    if (Classic) {
      setFrameVis();
    } else {
      parent.setFrameVis();
    }
    modalClose();
  };
}
function callsDrop(_0x247d79 = null) {
  const _0x4d56a8 = Classic ? document.getElementById("callDropdownClassic") : document.getElementById("callDropdown");
  if (!_0x4d56a8) {
    return;
  }
  if (!_0x247d79) {
    _0x4d56a8.style.display = "none";
    return;
  }
  const _0x2a8e96 = Classic ? document.getElementById("reportDropdownClassic") : document.getElementById("reportDropdown");
  if (_0x2a8e96 && _0x2a8e96.style.display === "block") {
    _0x2a8e96.style.display = "none";
  }
  let _0x3cde54 = _0x247d79;
  if ((_0x247d79.slice(-1) == "M" || _0x247d79.slice(-1) == "B") && !isNaN(_0x247d79.slice(0, -1))) {
    _0x3cde54 = _0x247d79.slice(0, -1);
  }
  let _0x30cd48 = /[a-zA-Z]/g.test(_0x3cde54);
  let _0x286cff = _0x30cd48 ? _0x247d79.split("(")[1].slice(0, -1) : _0x247d79;
  if (!_0x30cd48) {
    _0x4d56a8.style.display = "none";
    return;
  }
  _0x286cff = _0x286cff.replace("M", "000000");
  _0x286cff = _0x286cff.replace("B", "000000000");
  if (getBlockedUsers()[_0x286cff]) {
    _0x4d56a8.style.display = "none";
    return;
  }
  const _0x309df0 = (_0x4d56a8.style.display || "none") === "block" ? "none" : "block";
  _0x4d56a8.style.display = _0x309df0;
}
function clickOut(_0xdf296e) {
  const _0x17f4c7 = document.getElementById("reportDropdown");
  let _0x1b75c1 = findNodeInWindowOrParent("#reportDropdownClassic");
  const _0x23a959 = findNodeInWindowOrParent("#groupDropdown");
  const _0x58d5f5 = findNodeInWindowOrParent("#callDropdownClassic");
  const _0x4fcfa1 = document.getElementById("callDropdown");
  const _0x19d108 = _Activity.instance.IsClassic ? findNodeInWindowOrParent("#reportIconClassic") : findNodeInWindowOrParent(".htmlTitleButton");
  const _0x5b8d88 = findNodeInWindowOrParent("#callIconClassic");
  let _0x368dd7 = _0x19d108 && !_0x19d108.contains(_0xdf296e.target);
  let _0x231d80 = _0x5b8d88 && !_0x5b8d88.contains(_0xdf296e.target);
  if (_0xdf296e && (_0x368dd7 || _0x231d80)) {
    if (_0x23a959) {
      _0x23a959.style.display = "none";
    }
    if (_0x17f4c7) {
      _0x17f4c7.style.display = "none";
    }
    if (_0x1b75c1) {
      _0x1b75c1.style.display = "none";
    }
    if (_0x58d5f5) {
      _0x58d5f5.style.display = "none";
    }
    if (_0x4fcfa1) {
      _0x4fcfa1.style.display = "none";
    }
  }
  let _0xcaddd5 = findNodeInWindowOrParent("#dropdown-content");
  if (_0xcaddd5 && _0xdf296e && !_0xdf296e.target.classList.contains("menuOpen")) {
    _0xcaddd5.style.display = "none";
  }
}
function findNodeInWindowOrParent(_0x44824b, _0x525655) {
  if (!_0x44824b) {
    return false;
  }
  let _0x11aec1 = _0x525655 ? document.querySelectorAll("" + _0x44824b) : document.querySelector("" + _0x44824b);
  _0x11aec1 ||= _0x525655 ? parent?.document?.querySelectorAll("" + _0x44824b) : parent?.document?.querySelector("" + _0x44824b);
  return _0x11aec1;
}
function AddSections(_0x3c829a, _0x5871b3, _0x48c0b5) {
  clearDiv("topSelector");
  var _0x450ab1 = makeElement(document.getElementById("topSelector"), "div", "listTable");
  var _0x138749 = makeElement(_0x450ab1, "div", "dialogRow");
  for (var _0x247879 in _0x3c829a) {
    var _0x39afb0 = _0x3c829a[_0x247879];
    var _0x15e25a = makeElement(_0x138749, "div", "dialogCell");
    if (_0x5871b3) {
      _0x15e25a.Click = _0x5871b3 + _0x39afb0 + "')";
      _0x15e25a.addEventListener("click", function (_0x4df63f) {
        let _0x453114 = this.Click.match(/(\w*).*?'(\w*)'/);
        switch (_0x453114[1]) {
          case "configurePage":
            configurePage(0, _0x453114[2]);
            break;
          case "configureStorePage":
            configureStorePage(_0x453114[2]);
        }
      });
    }
    var _0x52a717 = makeElement(_0x15e25a, "div", "listTable tabTable");
    var _0x2829ad = makeElement(_0x52a717, "div", "dialogRow");
    var _0x488379 = makeElement(_0x2829ad, "div", "dialogCell dialogCellCenter tabLabelCell", "Label" + _0x39afb0);
    var _0x37b4b9 = makeElement(_0x488379, "img", "selector");
    _0x37b4b9.height = 16;
    _0x37b4b9.width = 16;
    _0x37b4b9.src = _0x48c0b5 ? "svg/" + _0x48c0b5[_0x247879] + ".svg" : "svg/sel" + _0x39afb0 + ".svg";
    addText(makeElement(_0x488379, "span", "selector"), ["mob1." + _0x39afb0.toLowerCase(), _0x39afb0]);
    var _0x1a32ba = makeElement(_0x52a717, "div", "dialogRow");
    makeElement(_0x1a32ba, "div", "dialogCell tabIndicatorCell", "Indicator" + _0x39afb0);
  }
}
function SetSection(_0x357347) {
  var _0x53a8c5;
  var _0x143fe3;
  _0x53a8c5 = document.getElementsByClassName("tabLabelCellSelected");
  _0x143fe3 = 0;
  for (; _0x143fe3 < _0x53a8c5.length; _0x143fe3++) {
    _0x53a8c5[_0x143fe3].className = "dialogCell dialogCellCenter tabLabelCell";
  }
  _0x53a8c5 = document.getElementsByClassName("tabIndicatorCellSelected");
  _0x143fe3 = 0;
  for (; _0x143fe3 < _0x53a8c5.length; _0x143fe3++) {
    _0x53a8c5[_0x143fe3].className = "dialogCell tabIndicatorCell";
  }
  if (_0x53a8c5 = document.getElementById("Label" + _0x357347)) {
    _0x53a8c5.className += " tabLabelCellSelected";
  }
  if (_0x53a8c5 = document.getElementById("Indicator" + _0x357347)) {
    _0x53a8c5.className += " tabIndicatorCellSelected";
  }
  CurrentSec = _0x357347;
}
function FillInAll(_0x5e6fb1, _0x1792e9, _0x4f3c1a) {
  let _0x12b8bd = GetTranslation("mob2.fillall");
  _0x12b8bd ||= "Please fill in all boxes";
  for (var _0x3bee8c in _0x1792e9) {
    if (!_0x5e6fb1[_0x1792e9[_0x3bee8c]]) {
      if (_0x4f3c1a) {
        addText(_0x4f3c1a, _0x12b8bd);
      } else {
        AlertMessage(_0x12b8bd);
      }
      return false;
    }
  }
  return true;
}
function DoBanDialog(_0x4a86d8, _0x3a3e3e, _0x1b2959) {
  let _0x3bd55e = (_0x3a3e3e - Date.now() / 1000) / 3600;
  _0x3bd55e = Math.round(_0x3bd55e * 100) / 100;
  if (_0x3bd55e < 0) {
    _0x3bd55e = 0;
  }
  const _0x24bd94 = new Date().toLocaleString();
  _0x1b2959 = _0x1b2959.substr(0, 500);
  const _0x4a28e8 = "svg/remove" + (toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg";
  const _0x498799 = "BanDialog";
  HiddenDivs[_0x498799] = "<div class=\"modalDialogContentClassic\" data-w=\"0.65\"><div class=\"dialogTitleBar\"><span class=\"dialogTitle\"><img src=\"svg/actBan.svg\" alt=\"completed\" class=\"transcomp\"><span data-localize=\"mob2.banned\">Banned!</span></span><span class=\"dialogTitleAction\" id=\"id_ModalClose\"><img src=\"" + _0x4a28e8 + "\" width=\"16\" alt=\"close\"></span></div><div class=\"dialogBody\"><div class=\"dialogPadding\"><div id=\"newAlert\"><div class=\"table\" style=\"display: flex;\"><div class=\"column transdesc\"><div data-localize=\"mob2.time\">Time</div><div data-localize=\"mob2.by\">By</div><div data-localize=\"mob2.duration\">Duration</div><div data-localize=\"mob2.reason\">Reason</div></div><div class=\"column\"><div>" + _0x24bd94 + "</div><div>" + _0x4a86d8 + "</div><div>" + (_0x3bd55e == 0 ? "<span data-localize='mob2.forever'>Forever</span>" : _0x3bd55e + " <span data-localize=\"mob2.hours\">Hours</span> ") + "</div>" + (_0x1b2959.trim().length == 0 ? "<div style=\"overflow-y: auto; max-height: 70px;\" data-localize=\"mob2.noreason\">No reason given</div>" : "<div style=\"overflow-y: auto; max-height: 70px; word-break: break-word;\">" + _0x1b2959 + "</div>") + "</div></div><div class=\"banbuttons\" style=\"margin-top: 1rem;\"><a href=\"http://localhost:6969/report#!group&GroupName=" + config.GroupName + "\" target=\"_blank\"><button class=\"bButton\"><img src=\"svg/inappropriate.svg\" alt=\"report\" style=\"width: 12px\" class=\"inappIc\"><span data-localize=\"mob2.unfair\">Report unfair ban</span></button></a><a id=\"modalClose\"><button class=\"bButton\"><img src=\"svg/return2.svg\" alt=\"return\" class=\"inappIc\"><span data-localize=\"mob2.return\">Return to chat</span></button></a><a href=\"http://localhost:6969/groups\" target=\"_blank\"><button class=\"bButton\"><img src=\"svg/groups.svg\" alt=\"groups\" class=\"inappIc\"><span data-localize=\"mob2.findgroups\">Find other groups</span></button></a></div></div></div></div></div>";
  doModal(_0x498799);
  ColorTitle();
  setCstyle();
  TranslateAll();
  document.getElementById("id_ModalClose").addEventListener("click", function () {
    modalClose();
  });
  document.getElementById("modalClose").addEventListener("click", function () {
    modalClose();
  });
}
function DoTransfer(_0x15db1e, _0x5ecdb0, _0x7ae247, _0x222b29, _0x44b892) {
  _0x15db1e = _0x15db1e.substr(0, 500);
  var _0x4eed06 = "AlertDialog";
  const _0x7a3ef9 = new Date().toLocaleString();
  const _0x2a8941 = "svg/remove" + (toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg";
  HiddenDivs[_0x4eed06] = "<div class=\"modalDialogContentClassic\"><div class=\"dialogTitleBar\"><span class=\"dialogTitle\"><img src=\"svg/capyes.svg\" alt=\"completed\" class=\"transcomp\"><span data-localize=\"mob2.transfer\">Transfer</span></span><span class=\"dialogTitleAction\" id=\"id_ModalClose\"><img src=\"" + _0x2a8941 + "\" width=\"16\" alt=\"close\"></span></div><div class=\"dialogBody\"><div class=\"dialogPadding\"><div id=\"newAlert\"><div class=\"table\" style=\"display: flex;\"><div class=\"column transdesc\"><div data-localize=\"mob2.time\">Time</div><div data-localize=\"mob2.amount\">Amount</div><div data-localize=\"mob2.from\">From</div><div data-localize=\"mob2.to\">To</div>" + (_0x15db1e.trim().length == 0 ? "" : "<div data-localize=\"mob2.message\">Message</div>") + "</div><div class=\"column\"><div class=\"transimp\">" + _0x7a3ef9 + "</div><div class=\"transimp\">" + _0x222b29 + " xats & " + _0x44b892 + " days</div><div class=\"transimp\">" + _0x5ecdb0 + "</div><div class=\"transimp\">" + _0x7ae247 + "</div>" + (_0x15db1e.trim().length == 0 ? "" : "<div style=\"overflow-y: auto; max-height: 70px; color: inherit; word-break: break-word;\">" + _0x15db1e + "</div>") + "</div></div></div></div></div></div>";
  doModal(_0x4eed06);
  ColorTitle();
  setCstyle();
  TranslateAll();
  document.getElementById("id_ModalClose").addEventListener("click", function () {
    modalClose();
  });
}
function AlertMessage(_0x285787, _0x383861, _0x49b9fe, _0x50f025) {
  var _0x743d89 = clearAlertMessage();
  const _0x10fb96 = Classic ? "svg/remove" + (toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg" : "svg/removew.svg";
  if (!_0x743d89) {
    var _0x22a7ec = "AlertDialog";
    HiddenDivs[_0x22a7ec] = "<div class=\"modalDialogContentClassic\"><div class=\"dialogTitleBar\"><span data-localize=mob1.message class=\"dialogTitle\">Message</span><span class=\"dialogTitleAction\" id=\"id_ModalClose\"><img src=\"" + _0x10fb96 + "\" width=\"16\" alt=\"close\"></span></div><div class=\"dialogBody\"><div class=\"dialogPadding\"><div id=\"AlertMessage\"></div></div></div></div>";
    doModal(_0x22a7ec);
    document.getElementById("id_ModalClose").addEventListener("click", function () {
      modalClose();
      if (_Activity.instance.LoginBodge) {
        removeClass("d-none", 0, _Activity.instance.Window.getById("Overlays"));
        _Activity.instance.LoginBodge = false;
      }
    });
    _0x743d89 = clearAlertMessage();
    ColorTitle();
    TranslateAll();
    setCstyle();
  }
  var _0x58a5cf;
  if (_0x383861) {
    _0x285787 = _0x285787.replace(/<p>/g, "ZZZZ");
  }
  if (_0x49b9fe) {
    _0x285787 = _0x285787.replace(/<br>/g, "LLLLL");
  }
  _0x285787 = (_0x285787 = _0x285787.replace(/<.*?>/g, " ")).replace(/<.*/g, "");
  if (_0x383861) {
    _0x285787 = _0x285787.replace(/ZZZZ/g, "<p>");
  }
  if (_0x49b9fe) {
    _0x285787 = _0x285787.replace(/LLLLL/g, "<br>");
  }
  _0x285787 = _0x285787.replace(/\[link (.*?)\]/g, function (_0x3259c1, _0x391b4f) {
    _0x58a5cf = _0x391b4f;
    return "";
  });
  if (_0x383861) {
    _0x743d89.innerHTML = _0x285787;
  } else {
    _0x743d89.textContent = _0x285787;
  }
  if (_0x58a5cf) {
    var _0x3fb89c = makeElement(_0x743d89, "a");
    _0x3fb89c.href = "https://" + _0x58a5cf;
    _0x3fb89c.target = "_blank";
    addText(_0x3fb89c, _0x58a5cf);
  }
  _0x743d89.style.color = _0x50f025 ? "#00834d" : "#F00";
  _0x743d89.style.fontWeight = "bold";
  if (_0x743d89 = document.getElementById("openModal")) {
    _0x743d89.style.visibility = "visible";
  }
}
function clearAlertMessage() {
  ConnectingClose();
  let _0x939251 = document.getElementById("openModal");
  _0x939251 &&= _0x939251.getElementsByClassName("AlertMessage");
  if (_0x939251 && _0x939251.length > 0) {
    _0x939251[0].textContent = "";
    return _0x939251[0];
  } else {
    _0x939251 = document.getElementById("AlertMessage");
    if (_0x939251) {
      _0x939251.textContent = "";
      return _0x939251;
    } else {
      return null;
    }
  }
}
function BuildDialog(_0x39a2c1, _0x3d3fe9) {
  var _0x47dff7;
  var _0x1faa4f = _0x39a2c1 = makeElement(_0x39a2c1, "div", "modalDialogContentClassic");
  var _0x5c260a = _0x39a2c1;
  var _0x2598a2 = _0x39a2c1;
  for (var _0x2e975e in _0x3d3fe9) {
    var _0x161fbb = _0x3d3fe9[_0x2e975e];
    switch (_0x161fbb.type) {
      case "click":
        _0x47dff7 = addEditBox2(_0x1faa4f, 0, "dialogClick", _0x161fbb.name, "noedit");
        _0x161fbb.icon = _0x161fbb.name;
        _0x47dff7.Part = _0x161fbb;
        _0x47dff7.addEventListener("click", function (_0x40d608) {
          actions.sendApp(_0x40d608, this.Part);
        });
        break;
      case "title":
        addEditBox2(_0x39a2c1, 0, "dialogTitleBar", _0x161fbb.name, "noedit", "bold");
        _0x2598a2 = _0x5c260a = _0x1faa4f = makeElement(_0x39a2c1, "div", "dialogBody");
        _0x1faa4f = makeElement(_0x1faa4f, "div", "dialogPadding");
        makeElement(_0x1faa4f, "div", "AlertMessage");
        _0x5c260a = makeElement(_0x1faa4f, "div", "dialogBody");
        _0x5c260a = makeElement(_0x5c260a, "div", "dialogTable");
        ColorTitle();
        break;
      case "mw":
        _0x39a2c1.dataset.mw = _0x161fbb.mw;
        break;
      case "password":
        addEditBox2(_0x5c260a, _0x161fbb.id, "dialogRow", _0x161fbb.name, 0, 0, "password");
        break;
      case "dialog":
        addEditBox2(_0x5c260a, _0x161fbb.id, "dialogRow", _0x161fbb.name);
        break;
      case "text":
        addEditBox2(_0x1faa4f, 0, "", _0x161fbb.name, "noedit");
        break;
      default:
        addEditBox2(_0x2598a2, 0, "dialogActions", _0x161fbb);
    }
  }
}
function addEditBox2(_0x2ced56, _0x9c18af, _0x3b7039, _0x27b9ed, _0x5f5635, _0x40568a, _0x84a312) {
  var _0x2e8883 = makeElement(_0x2ced56, "div", _0x3b7039);
  const _0x14b590 = "svg/remove" + (toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg";
  switch (_0x3b7039) {
    case "dialogTitleBar":
      addText(_0x4effe2 = makeElement(_0x2e8883, "span", "dialogTitle"), _0x27b9ed + "\xA0");
      (_0x9eb5a5 = makeElement(_0x2e8883, "span", "dialogTitleAction")).id = "modalCancel";
      break;
    case "dialogRow":
      addText(_0x9eb5a5 = makeElement(_0x2e8883, "div", "dialogCell"), _0x27b9ed + "\xA0");
      if (_0x5f5635 === undefined) {
        _0x5f5635 = "";
      }
      if (_0x5f5635 === "noedit") {
        break;
      }
      var _0x9eb5a5 = makeElement(_0x2e8883, "div", "dialogCell cellWide");
      var _0x4bfc87 = makeElement(_0x9eb5a5, "input", "dialogInput");
      _0x4bfc87.setAttribute("autocomplete", _0x84a312 == "password" ? "new-password" : "off");
      if (_0x84a312 == "password") {
        _0x4bfc87.type = "password";
      } else {
        _0x4bfc87.type = "text";
        _0x4bfc87.value = _0x5f5635;
      }
      _0x4bfc87.id = _0x9c18af;
      break;
    case "dialogClick":
    case "":
      addText(_0x2e8883, _0x27b9ed + "\xA0");
      break;
    case "dialogActions":
      if (_0x27b9ed.action == "Cancel") {
        let _0x510d95 = makeElement(_0x9eb5a5 = document.getElementById("modalCancel"), "img");
        _0x510d95.src = _Activity.instance.IsClassic ? _0x14b590 : "svg/removew.svg";
        _0x510d95.width = "16";
        _0x510d95.alt = "close";
        _0x9eb5a5.addEventListener("click", function () {
          modalClose();
        });
        _0x2ced56.removeChild(_0x2e8883);
        break;
      }
      var _0x4effe2;
      var _0x53c4f8;
      addText(_0x2e8883, "\xA0");
      addText(_0x4effe2 = makeElement(_0x2e8883, "span", "dialogActionRight"), _0x27b9ed.label);
      if (_0x27b9ed.flags & 1) {
        _0x4effe2.style.opacity = "0.5";
        _0x4effe2.addEventListener("click", function () {
          modalClose();
        });
      } else {
        if (typeof sendApp == "function") {
          _0x53c4f8 = sendApp;
        }
        if (!_0x53c4f8 && sendFunc) {
          _0x53c4f8 = sendFunc;
        }
        _0x4effe2.addEventListener("click", function (_0x3167fa) {
          clearAlertMessage();
          _0x53c4f8(_0x3167fa, _0x27b9ed.action, _0x27b9ed.Power);
        });
      }
  }
  return _0x2e8883;
}
function doModal(_0x3093e8, _0x51e812, _0xe7f264, _0x43f65e, _0x251b05, _0x17668f = () => {}) {
  modalClose();
  var _0x2ce63c = makeElement(document.body, "div", _0x43f65e ? "modalDialog AnnounceFrame" : "modalDialog");
  _0x2ce63c.setAttribute("id", "openModal");
  var _0x552cf4;
  var _0x19b75f = makeElement(_0x2ce63c, "div");
  var _0x533380 = "";
  if (typeof _0x3093e8 == "string") {
    _0x533380 = _0x3093e8.charAt(0);
  }
  if (_0x533380 == "{" || _0x533380 == "[") {
    _0x3093e8 = JSON.parse(_0x3093e8);
  }
  if (_0x3093e8 !== null && typeof _0x3093e8 == "object") {
    BuildDialog(_0x19b75f, _0x3093e8);
    _0x552cf4 = _0x19b75f;
    _0x19b75f.PushUp = true;
  } else if (_0x3093e8.charAt(0) == "h") {
    var _0x28e28e = makeElement(_0x19b75f, "iframe");
    _0x28e28e.setAttribute("src", _0x3093e8);
    _0x28e28e.setAttribute("width", 300);
    _0x28e28e.setAttribute("height", 500);
    _0x552cf4 = _0x28e28e;
  } else {
    _0x552cf4 = makeElement(_0x19b75f, "div");
    CacheHiddenDivs();
    _0x552cf4.innerHTML = HiddenDivs[_0x3093e8];
    TranslateNodes(_0x552cf4);
    if (typeof messages != "undefined" && typeof messages.openSmiliesDialog == "function") {
      messages.openSmiliesDialog();
    }
  }
  _0x2ce63c.style.opacity = 1;
  _0x2ce63c.style.pointerEvents = "auto";
  _0x552cf4.addEventListener("click", function (_0x54712a) {
    _0x54712a.stopPropagation();
  });
  if (_0xe7f264) {
    posModal(_0x552cf4, _0x51e812, true);
  } else {
    posModal(_0x552cf4, _0x51e812);
  }
  _0x17668f(document);
  setCstyle(null, _0x251b05);
  return _0x552cf4;
}
function posModal(_0x4df380, _0x14e27f, _0xaaefbb) {
  if (_0x4df380) {
    _0x14e27f ||= {};
    var _0xec8349 = _0x4df380.firstElementChild;
    if (!_0xec8349) return;
    if (selector?.isCaptchaPage()) {
      _0x14e27f.mw = 100;
    }
    var _0x54bd80 = _0xec8349.dataset.w;
    if (_0x14e27f.w) {
      _0x54bd80 = _0x14e27f.w;
    }
    _0x54bd80 ||= 0.4;
    var _0xbcec04 = 0;
    if (_0x4df380.offsetParent) {
      _0xbcec04 = _0x4df380.offsetParent.offsetWidth;
    }
    _0xbcec04 ||= _0x4df380.parentNode.offsetWidth;
    var _0x358f0c = xInt(_0xec8349.dataset.mw);
    if (_0x14e27f.mw) {
      _0x358f0c = _0x14e27f.mw;
    }
    if (_0x358f0c < 10) {
      _0x358f0c = 270;
    }
    var _0x2edd73 = xInt(_0xec8349.dataset.maxw);
    if (_0x14e27f.maxw) {
      _0x2edd73 = _0x14e27f.maxw;
    }
    var _0x1f8df5 = _0x14e27f.h;
    _0x1f8df5 ||= _0xec8349.dataset.h;
    var _0x47a67b = xInt(_0xec8349.dataset.mh);
    if (_0x14e27f.mh) {
      _0x47a67b = _0x14e27f.mh;
    }
    if (_0x47a67b < 10) {
      _0x47a67b = 30;
    }
    var _0x186823 = Math.round(_0xbcec04 * _0x54bd80);
    if (_0x2edd73 && _0x186823 > _0x2edd73) {
      _0x186823 = _0x2edd73;
    }
    if (_0x186823 < _0x358f0c) {
      _0x186823 = _0x358f0c;
    }
    if (_0x186823 > Math.round(_0xbcec04 * 0.95)) {
      _0x186823 = Math.round(_0xbcec04 * 0.95);
    }
    var _0xafefb2 = (_0xbcec04 - _0x186823) / 2;
    var _0x2e20bd = _0xec8349.offsetHeight;
    var _0x1524c8 = 0;
    if (_0x4df380.offsetParent) {
      _0x1524c8 = _0x4df380.offsetParent.offsetHeight;
    }
    _0x1524c8 ||= _0x4df380.parentNode.offsetHeight;
    if (_0x2e20bd < _0x47a67b) {
      _0x2e20bd = _0x47a67b;
    }
    if (_0x1f8df5 && _0x2e20bd < _0x1524c8 * _0x1f8df5) {
      _0x2e20bd = _0x1524c8 * _0x1f8df5;
    }
    if (_0x2e20bd > _0x1524c8 - 40) {
      _0x2e20bd = _0x1524c8 - 40;
    }
    _0x47a67b = xInt(_0x2e20bd);
    var _0x33ca9c = _0xaaefbb ? (_0x1524c8 - _0x2e20bd) / 3.8 : (_0x1524c8 - _0x2e20bd) / 2;
    if (config.PhoneType == PhoneTypes.DROIDPHONE || config.PhoneType == PhoneTypes.WEB || _0xec8349.dataset.pu) {
      _0x4df380.PushUp = _0x4df380.PushUp || _0xec8349.dataset.pu || document.getElementById("PushUp");
    } else {
      _0x4df380.PushUp = false;
    }
    if (_0x4df380.PushUp) {
      _0x33ca9c = (_0x1524c8 - _0x2e20bd - 250) / 2;
    }
    if (_0x33ca9c < 10) {
      _0x33ca9c = 10;
    }
    _0x33ca9c = xInt(_0x33ca9c);
    var _0x42efb5 = xInt(_0xafefb2);
    var _0xc3da2 = _0x186823;
    if (Classic && _0x14e27f?.customHeight) {
      _0x2e20bd = _0x14e27f?.customHeight + 30;
    }
    var _0x2c96ca = "";
    if (_0x47a67b > 30) {
      _0x2c96ca = "height:" + _0x2e20bd + "px;";
    }
    _0xec8349.style.cssText = "width:" + _0xc3da2 + "px; left:" + _0x42efb5 + "px; top: " + _0x33ca9c + "px;" + _0x2c96ca;
  }
}
function modalClose(_0x158829) {
  removeById("openModal");
  if (_0x158829) {
    const _0x48f75d = findNodeInWindowOrParent("#FrameBack");
    if (_0x48f75d && !_0x48f75d.classList.contains("d-none")) {
      _0x48f75d.classList.add("d-none");
    }
  }
}
function heightModal(_0x2cb055) {
  if (!_0x2cb055) {
    return;
  }
  let _0xc4bad = window?.parent?.document;
  if (!_0xc4bad) {
    return;
  }
  let _0x5310d9 = _0xc4bad?.querySelector(".modalDialogContentClassic");
  if (_0x5310d9) {
    _0x5310d9.style.height = _0x2cb055 + 30 + "px";
  }
}
function CacheHiddenDivs() {
  if (!DoneHiddenDivs) {
    DoneHiddenDivs = true;
    var _0x5368be;
    var _0x2f73ee;
    var _0x2cc0b7 = document.getElementsByClassName("dialog");
    for (_0x5368be = 0; _0x5368be < _0x2cc0b7.length; _0x5368be++) {
      _0x2f73ee = _0x2cc0b7[_0x5368be];
      if (!Classic || _0x2f73ee.id != "LoginForm") {
        HiddenDivs[_0x2f73ee.id] = _0x2f73ee.innerHTML;
        _0x2f73ee.innerHTML = "";
      }
    }
  }
}
function AddHammer(_0x393afe, _0xeb0ec0, _0x5530d0) {
  var _0x1936ec;
  switch (_0xeb0ec0) {
    case Hammer.DIRECTION_LEFT:
      _0x1936ec = "swipeleft";
      break;
    case Hammer.DIRECTION_RIGHT:
      _0x1936ec = "swiperight";
      break;
    default:
      _0x1936ec = "swipeleft swiperight";
      _0xeb0ec0 = Hammer.DIRECTION_HORIZONTAL;
  }
  var _0x195146 = new Hammer(_0x393afe, {
    preventDefault: true,
    recognizers: [[Hammer.Swipe, {
      direction: _0xeb0ec0
    }]],
    cssProps: {
      userselect: false
    }
  });
  _0x195146.on(_0x1936ec, function (_0x4920f9) {
    if (!_Activity.instance.IsClassic && _Activity.instance.QuickBar) {
      _Activity.instance.QuickBar.shouldCloseQuickBar(_0x4920f9);
    }
    var _0x3faad1 = {
      Type: _0x4920f9.type
    };
    if (_0x4920f9.target.id) {
      _0x3faad1.id = _0x4920f9.target.id;
    } else if (_0x4920f9.target.parentNode.id) {
      _0x3faad1.id = _0x4920f9.target.parentNode.id;
    }
    _0x5530d0(0, _0x3faad1);
  });
  return _0x195146;
}
function SetTotalUnRead(_0x1ea2a3) {
  var _0x23c937 = document.getElementById("titleBar");
  if (_0x23c937 && _0x23c937.count) {
    if (_0x1ea2a3 == 0) {
      _0x23c937.count.style.visibility = "hidden";
    } else {
      if (_0x1ea2a3 > 9) {
        _0x1ea2a3 = "9+";
      }
      _0x23c937.count.innerHTML = _0x1ea2a3;
      _0x23c937.count.style.visibility = "visible";
    }
  }
}
function getXats() {
  modalClose();
  HitWeb(openBuyPage());
}
function ShowCaptcha(_0x335fb0) {
  _Activity.instance.Selector.CapJson = _0x335fb0;
  _Activity.instance.Selector.DoLoginEtc("AreYouABot");
}
function saveSetting(_0x5267b4, _0x2b3f65, _0x4c3446) {
  if (_0x4c3446) {
    return ToC({
      Type: "Macro",
      Command: "Macro",
      Name: _0x5267b4,
      Value: _0x2b3f65
    });
  }
  ToC({
    Page: "settings",
    Type: "Setting",
    Command: "Setting",
    Name: _0x5267b4,
    Value: _0x2b3f65
  });
}
function NOP() {}
function isEmpty(_0x19e51b) {
  for (var _0x66ca1f in _0x19e51b) {
    if (_0x19e51b.hasOwnProperty(_0x66ca1f)) {
      return false;
    }
  }
  return true;
}
function setPmMode(_0x12ecdb, _0x57daef, _0xffcc3f, _0x34099d) {
  _0x34099d ||= parent.document;
  const _0x3023aa = _0x34099d.getElementById("textEntryEditable");
  const _0x2695c5 = _0x34099d.getElementById("pmWrapper");
  _0x2695c5.innerHTML = "";
  _0x2695c5.style.display = "block";
  if (!_0x12ecdb) {
    _0x2695c5.style.pointerEvents = "none";
    _0x2695c5.style.display = "none";
    _0x3023aa.classList.remove("sided");
    PMMODE = false;
    return;
  }
  PMMODE = true;
  _0x3023aa.classList.add("sided");
  _0x2695c5.dataset.userno = _0x57daef;
  _0x2695c5.dataset.regname = _0xffcc3f;
  addToolTip(makeElement(_0x2695c5, "div", "pmLock"), ["mob2.sendingto", "Sending to: $1", _0xffcc3f], {
    position: "low",
    dom: _0x34099d
  });
  const _0x181abf = makeElement(_0x2695c5, "div", "pmDel");
  addToolTip(_0x181abf, ["box.66", "Cancel"], {
    dom: _0x34099d
  });
  _0x181abf.addEventListener("click", () => {
    setPmMode(false);
  });
  _0x181abf.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" preserveAspectRatio=\"none\" x=\"0px\" y=\"0px\" width=\"40px\" height=\"40px\" viewBox=\"0 0 40 40\">\n        <defs>\n            <g id=\"_App_Icons_cancel_0_Layer0_0_FILL\">\n                <path fill=\"#19191b\" stroke=\"none\" d=\"\n                M 12.2 3.85\n                Q 11.6 3.85 11.2 4.25\n                L 8.9 6.6 6.55 4.25\n                Q 6.35 4.05 6.15 4 5.9 3.85 5.6 3.85 5 3.85 4.55 4.3 4.1 4.75 4.1 5.3 4.1 5.9 4.55 6.3\n                L 6.85 8.6 4.5 11\n                Q 4.05 11.4 4.05 12 4.05 12.55 4.5 13 4.95 13.45 5.5 13.45 6.1 13.45 6.5 13\n                L 8.9 10.65 10.3 12.05 10.35 12.05 10.35 12.1 11.25 13\n                Q 11.7 13.45 12.25 13.45 12.85 13.45 13.3 13 13.7 12.55 13.7 12 13.7 11.4 13.3 11\n                L 10.9 8.6 13.25 6.3\n                Q 13.65 5.9 13.65 5.3 13.65 4.75 13.2 4.3 12.75 3.85 12.2 3.85 Z\"/>\n            </g>\n\n            <path id=\"_App_Icons_cancel_0_Layer0_0_1_STROKES\" stroke=\"#19191b\" stroke-width=\"1\" stroke-linejoin=\"round\" stroke-linecap=\"round\" fill=\"none\" d=\"\n            M 17.6 8.8\n            Q 17.6 12.45 15 15 12.45 17.6 8.8 17.6 5.15 17.6 2.55 15 0 12.45 0 8.8 0 5.15 2.55 2.55 5.15 0 8.8 0 12.45 0 15 2.55 17.6 5.15 17.6 8.8 Z\"/>\n        </defs>\n\n        <g transform=\"matrix( 1.76702880859375, 0, 0, 1.76702880859375, 4.5,4.4) \">\n            <g transform=\"matrix( 1, 0, 0, 1, 0,0) \">\n                <use xlink:href=\"#_App_Icons_cancel_0_Layer0_0_FILL\"/>\n\n                <use xlink:href=\"#_App_Icons_cancel_0_Layer0_0_1_STROKES\"/>\n            </g>\n        </g>\n    </svg>";
}
function sendPm(_0x282b59, _0x3ef7ea) {
  if (_0x3ef7ea.length !== 0) {
    ToC({
      Command: "Action",
      Message: _0x3ef7ea,
      Next: "messages",
      Page: "actions",
      Type: "Action",
      UserNo: _0x282b59,
      name: "PrivateMessage"
    });
  }
}
function MakeHelpMessage(_0x3c7fa7, _0xe3be37, _0x39d5d0) {
  _0xe3be37 ||= "";
  var _0x1b8949 = makeElement(0, "li", "message", _0xe3be37);
  var _0x5aa0c5 = makeElement(_0x1b8949, "div", "listTable");
  var _0x3280b9 = makeElement(_0x5aa0c5, "div", "dialogRow");
  var _0x255782 = makeElement(_0x3280b9, "div", "dialogCell cellWide noPointer");
  var _0x196168 = makeElement(_0x255782, "div", "noftxt");
  if (!Classic) {
    _0x196168.style.width = "100%";
  }
  _0x196168.innerHTML = "";
  var _0x63a6a0 = makeElement(_0x196168, "p");
  _0x63a6a0.className = "chatsMessage";
  if (!Classic) {
    _0x63a6a0.style.cssText = "white-space: normal; margin-left: 3px";
  }
  createTextSm(_0x63a6a0, _0x3c7fa7);
  if (_0x39d5d0) {
    _0x39d5d0.p = _0x63a6a0;
    _0x39d5d0.msg = _0x196168;
  }
  return _0x1b8949;
}
function InitPage(_0x212e32) {
  if (_0x212e32.length > 1) {
    ConnectingOpen(_0x212e32);
  } else {
    ConnectingClose();
  }
}
document.addEventListener("click", clickOut, true);
var connType;
var connTimeout = null;
function ConnectingClose() {
  if (connTimeout) {
    clearTimeout(connTimeout);
  }
  connTimeout = null;
  removeById("Connecting");
}
function ConnectingOpen(_0x51e530) {
  if (_0x51e530 && document.getElementById("Connecting")) {
    var _0x3eed24 = document.getElementById("loading");
    if (_0x3eed24) {
      _0x3eed24.innerHTML = _0x51e530 + "&nbsp;<span>.</span><span>.</span><span>.</span></div>";
      return;
    }
  }
  if (_0x51e530) {
    connType = _0x51e530;
    if (connTimeout) {
      clearTimeout(connTimeout);
    }
    connTimeout = setTimeout(ConnectingOpen, 500);
    return;
  }
  ConnectingClose();
  var _0xd1bd49 = makeElement(document.body, "div", "connectingDialog");
  _0xd1bd49.setAttribute("id", "Connecting");
  var _0x5e15c9 = makeElement(_0xd1bd49, "div");
  _0x5e15c9.innerHTML = "<!DOCTYPE html><html lang=\"en\"><body><div id=\"xatLoader\"><div id=\"xatLoaderInner\"><img id=\"planet\" src=\"svg/x.svg\"/><img id=\"rocket\" src=\"svg/ss.svg\" /><div id=\"loading\" class=\"txt\"><span id=\"ConMsgId\"></span>&nbsp;<span>.</span><span>.</span><span>.</span></div></div></div></body></html>";
  addText(document.getElementById("ConMsgId"), ["mod1." + connType.toLowerCase(), connType]);
  _0x5e15c9.style.top = xInt((_0xd1bd49.clientHeight - _0x5e15c9.clientHeight) / 2) + "px";
  _0xd1bd49.style.opacity = 1;
  _0xd1bd49.style.pointerEvents = "auto";
  document.getElementById("xatLoader").addEventListener("click", function () {
    ConnectingClose();
  });
}
function onSwear(_0x1b7c94) {
  var _0x9ead4d = _0x1b7c94.target;
  _0x9ead4d.className = "";
  _0x9ead4d.onclick = null;
  _0x1b7c94.preventDefault();
}
function ST2(_0x4f2bbb, _0x473d77, _0x11ef05, _0x55be98, _0x45df3a) {
  if (_0x473d77 != null) {
    _0x4f2bbb = _0x4f2bbb.slice(0, _0x4f2bbb.indexOf("$1")) + _0x473d77 + _0x4f2bbb.slice(_0x4f2bbb.indexOf("$1") + 2);
  }
  if (_0x11ef05 != null) {
    _0x4f2bbb = _0x4f2bbb.slice(0, _0x4f2bbb.indexOf("$2")) + _0x11ef05 + _0x4f2bbb.slice(_0x4f2bbb.indexOf("$2") + 2);
  }
  if (_0x55be98 != null) {
    _0x4f2bbb = _0x4f2bbb.slice(0, _0x4f2bbb.indexOf("$3")) + _0x55be98 + _0x4f2bbb.slice(_0x4f2bbb.indexOf("$3") + 2);
  }
  if (_0x45df3a != null) {
    _0x4f2bbb = _0x4f2bbb.slice(0, _0x4f2bbb.indexOf("$4")) + _0x45df3a + _0x4f2bbb.slice(_0x4f2bbb.indexOf("$4") + 2);
  }
  return _0x4f2bbb;
}
function GetAsMB(_0x52b399) {
  let _0x1e4060 = _0x52b399.toString();
  if (_0x1e4060.substr(-9, 9) == "000000000") {
    _0x1e4060 = _0x1e4060.substr(0, _0x1e4060.length - 9) + "B";
  }
  if (_0x1e4060.substr(-6, 6) == "000000") {
    _0x1e4060 = _0x1e4060.substr(0, _0x1e4060.length - 6) + "M";
  }
  return _0x1e4060;
}
function xInt(_0x562a43) {
  _0x562a43 = parseInt(_0x562a43);
  if (isNaN(_0x562a43)) {
    return 0;
  } else {
    return _0x562a43;
  }
}
function microtime(_0x4e1d45) {
  var _0x14bb24 = new Date().getTime() / 1000;
  var _0x5f4142 = parseInt(_0x14bb24, 10);
  if (_0x4e1d45) {
    return _0x14bb24;
  } else {
    return Math.round((_0x14bb24 - _0x5f4142) * 1000) / 1000 + " " + _0x5f4142;
  }
}
function urldecode(_0xef2ea6) {
  return decodeURIComponent((_0xef2ea6 + "").replace(/\+/g, "%20"));
}
function ObjToQuery(_0x456ebf) {
  return Object.keys(_0x456ebf).map(function (_0x3dbf28) {
    return _0x3dbf28 + "=" + _0x456ebf[_0x3dbf28];
  }).join("&");
}
function objToXatJson(_0x439a0b) {
  if (_0x439a0b) {
    return Object.keys(_0x439a0b).map(_0x4c681f => _0x4c681f + "/" + _0x439a0b[_0x4c681f]).join("//");
  } else {
    return "";
  }
}
function xatJsonToObj(_0x3f9335) {
  if (!_0x3f9335.length) {
    return {};
  }
  const _0x4c25ba = {};
  _0x3f9335.split("//").forEach(_0x1c90d8 => {
    _0x1c90d8 = _0x1c90d8.split("/");
    _0x4c25ba[_0x1c90d8[0]] = _0x1c90d8[1];
  });
  return _0x4c25ba;
}
function loadJSON(_0x4daee1, _0x599e18, _0x316804, _0x192b27) {
  var _0x31fd93 = new XMLHttpRequest();
  _0x31fd93.onreadystatechange = function () {
    if (_0x31fd93.readyState === 4) {
      if (_0x31fd93.status === 200) {
        if (_0x599e18) {
          var _0x1c5dee;
          try {
            _0x1c5dee = JSON.parse(_0x31fd93.responseText);
          } catch (_0x5c203a) {
            if (_0x316804) {
              _0x316804(_0x5c203a);
            }
          }
          if (_0x1c5dee) {
            _0x599e18(_0x1c5dee);
          }
        }
      } else if (_0x316804) {
        _0x316804(_0x31fd93);
      }
    }
  };
  if (_0x192b27) {
    _0x31fd93.open("POST", _0x4daee1, true);
    _0x31fd93.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    _0x31fd93.send(ObjToQuery(_0x192b27));
  } else {
    _0x31fd93.open("GET", _0x4daee1, true);
    _0x31fd93.send();
  }
}
function loadHTML(_0x4707ae, _0x3235fc, _0x3626f9, _0x585e42) {
  var _0x322cba = new XMLHttpRequest();
  _0x322cba.onreadystatechange = function () {
    if (_0x322cba.readyState === 4) {
      if (_0x322cba.status === 200) {
        if (_0x3235fc) {
          _0x3235fc(_0x322cba.responseText);
        }
      } else if (_0x3626f9) {
        _0x3626f9(_0x322cba);
      }
    }
  };
  if (_0x585e42) {
    _0x322cba.open("POST", _0x4707ae, true);
    _0x322cba.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    _0x322cba.send(ObjToQuery(_0x585e42));
  } else {
    _0x322cba.open("GET", _0x4707ae, true);
    _0x322cba.send();
  }
}
function iosAllowCookies() {
  localStorage.setItem("mobCookies", 1);
}
function openBuyPage(_0x20279f, _0x53b907) {
  let _0x3fffae = "_blank";
  let _0x524142 = "http://localhost:6969/buy";
  let _0x2be5c7 = {};
  try {
    _0x2be5c7 = JSON.parse(localStorage.getItem("todo"));
  } catch (_0x3902a7) {}
  _0x2be5c7 ||= {};
  if (_Activity.instance.IsAndroidApp && _0x2be5c7?.w_registered || !_0x20279f && _Activity.instance.IsIOSApp && _0x2be5c7?.w_registered) {
    _0x3fffae = "_self";
    _0x524142 = "xat://buy-xats?userId=" + _0x2be5c7.w_userno + "&userName=" + _0x2be5c7.w_registered + "&deviceId=" + _0x2be5c7.DeviceId + "&passHash=" + _0x2be5c7.PassHash;
  } else if (_0x20279f && _Activity.instance.IsIOSApp && _0x2be5c7?.w_registered) {
    _0x20279f = false;
    const _0x2f7060 = {
      userId: _0x2be5c7.w_userno,
      userName: _0x2be5c7.w_registered,
      deviceId: _0x2be5c7.DeviceId,
      passHash: _0x2be5c7.PassHash
    };
    window.webkit.messageHandlers.xatStore.postMessage(_0x2f7060);
  }
  const _0x1516ae = _0x53b907 ?? window;
  if (!_0x20279f) {
    return _0x524142;
  }
  _0x1516ae.open(_0x524142, _0x3fffae);
}
const PawnFlags = {
  isRegistered: 1,
  isSubscriber: 2,
  isBffed: 4,
  isMarried: 8,
  isBuddyAbove: 16,
  isBuddyBelow: 32,
  isInvisible: 64,
  isAway: 128,
  isGagged: 256
};
const NamePowers = {
  statusglow: 16,
  statuscol: 32,
  glow: 4,
  col: 8,
  status: 2,
  hat: 1,
  red: 64,
  green: 128,
  blue: 256,
  light: 512,
  nospace: 1024,
  jewel: 4096,
  flag: 8192,
  wave: 16384,
  grad: 32768,
  valid: 65536,
  everypower: 131072,
  bump: 262144,
  mirror: 524288,
  invert: 1048576,
  typing: 2097152,
  away: 4194304,
  hasdays: 8388608,
  invisible: 16777216,
  sline: 33554432,
  category: 67108864,
  nolinks: 268435456,
  hasprofile: 1073741824,
  animate: 2048,
  shuffle: 134217728,
  istickle: 1,
  mark: 2,
  xavi: 4,
  isBot: 8,
  zoom: 16,
  reghide: 32,
  subhide: 64,
  isBlocked: 128,
  blockedUs: 256,
  verified: 17,
  isAway: 512,
  Transparent: 65536,
  ChatIsDebug: 128,
  NoSmilieLine: 2048
};
function DecodeColor(_0x5a0ef6, _0x2f969e) {
  if (_0x5a0ef6 != null) {
    if (_0x2f969e & NamePowers.valid) {
      while (true) {
        if (_0x5a0ef6.length == 6 && _0x5a0ef6.replace(/[^0-9a-fA-F]/g, "").length == 6) {
          break;
        }
        if (_0x5a0ef6.length == _0x5a0ef6.replace(/[^rgb\-\+]/g, "").length) {
          break;
        }
        return _0x5a0ef6;
      }
    }
    var _0x24b313 = (_0x2f969e & NamePowers.red) > 0;
    var _0x1d0c85 = (_0x2f969e & NamePowers.green) > 0;
    var _0x45cbe4 = (_0x2f969e & NamePowers.blue) > 0;
    var _0xbfad1e = (_0x2f969e & NamePowers.light) > 0;
    if (_0x24b313 != 0 || _0x1d0c85 != 0 || _0x45cbe4 != 0 || _0xbfad1e != 0) {
      var _0x5408b8 = (_0x5a0ef6 = _0x5a0ef6.toLowerCase()).split("r").length - 1;
      var _0x305096 = _0x5a0ef6.split("g").length - 1;
      var _0x3f8c2a = _0x5a0ef6.split("b").length - 1;
      var _0x157293 = _0x5a0ef6.split("+").length - 1;
      var _0x12136f = _0x5a0ef6.split("-").length - 1;
      var _0x3f800a = 0.5;
      if (_0x5408b8 == 0 && _0x305096 == 0 && _0x157293 == 0 && _0x12136f == 0) {
        var _0x1aed50 = 0;
        for (var _0x1e522a = 0; _0x1e522a < _0x5a0ef6.length; _0x1e522a++) {
          var _0x1b3b33 = _0x5a0ef6.charAt(_0x1e522a);
          if ((_0x1aed50 = _0x1b3b33 >= "0" && _0x1b3b33 <= "9" || _0x1b3b33 >= "a" && _0x1b3b33 <= "f" ? _0x1aed50 + 1 : 0) == 6) {
            var _0x4c0447 = parseInt(_0x5a0ef6.substr(_0x1e522a - _0x1aed50 + 1, 6), 16);
            if (_0x24b313 != 0 && _0x1d0c85 != 0 && _0x45cbe4 != 0 && _0xbfad1e != 0) {
              return _0x4c0447;
            }
            _0x3f8c2a = _0x4c0447 & 255;
            _0x305096 = _0x4c0447 >> 8 & 255;
            _0x5408b8 = _0x4c0447 >> 16 & 255;
            _0x157293 = _0x12136f = 0;
            if (_0xbfad1e != 0) {
              _0x3f800a = (Math.min(_0x5408b8, Math.min(_0x305096, _0x3f8c2a)) + Math.max(_0x5408b8, Math.max(_0x305096, _0x3f8c2a))) / 512;
            }
            break;
          }
        }
      }
      if (_0x5408b8 != 0 || _0x305096 != 0 || _0x3f8c2a != 0 || _0x157293 != 0 || _0x12136f != 0) {
        if (_0x24b313 == 0) {
          _0x5408b8 = 0;
        }
        if (_0x1d0c85 == 0) {
          _0x305096 = 0;
        }
        if (_0x45cbe4 == 0) {
          _0x3f8c2a = 0;
        }
        if (_0xbfad1e == 0) {
          _0x157293 = _0x12136f = 0;
        }
        if (_0x5408b8 == 0 && _0x305096 == 0 && _0x3f8c2a == 0) {
          _0x5408b8 = _0x305096 = _0x3f8c2a = 1;
        }
        var _0x1c6fbd;
        var _0x49a392;
        var _0x40385d;
        var _0x9fa97d;
        var _0x2fede5;
        var _0x3b7b04;
        var _0xa6a42d = _0x5408b8 / (_0x5408b8 + _0x305096 + _0x3f8c2a);
        var _0x2df20c = _0x305096 / (_0x5408b8 + _0x305096 + _0x3f8c2a);
        var _0x232d6a = _0x3f8c2a / (_0x5408b8 + _0x305096 + _0x3f8c2a);
        var _0x52eba3 = Math.min(_0xa6a42d, Math.min(_0x2df20c, _0x232d6a));
        var _0x4a93b8 = Math.max(_0xa6a42d, Math.max(_0x2df20c, _0x232d6a));
        var _0x369672 = _0x4a93b8 - _0x52eba3;
        _0x3b7b04 = (_0x4a93b8 + _0x52eba3) / 2;
        if (_0x369672 == 0) {
          _0x9fa97d = _0x2fede5 = 0;
        } else {
          _0x2fede5 = _0x3b7b04 < 0.5 ? _0x369672 / (_0x4a93b8 + _0x52eba3) : _0x369672 / (2 - _0x4a93b8 - _0x52eba3);
          var _0x304e01 = ((_0x4a93b8 - _0xa6a42d) / 6 + _0x369672 / 2) / _0x369672;
          var _0x33f462 = ((_0x4a93b8 - _0x2df20c) / 6 + _0x369672 / 2) / _0x369672;
          var _0x316b83 = ((_0x4a93b8 - _0x232d6a) / 6 + _0x369672 / 2) / _0x369672;
          if (_0xa6a42d == _0x4a93b8) {
            _0x9fa97d = _0x316b83 - _0x33f462;
          } else if (_0x2df20c == _0x4a93b8) {
            _0x9fa97d = 1 / 3 + _0x304e01 - _0x316b83;
          } else if (_0x232d6a == _0x4a93b8) {
            _0x9fa97d = 2 / 3 + _0x33f462 - _0x304e01;
          }
          if (_0x9fa97d < 0) {
            _0x9fa97d += 1;
          }
          if (_0x9fa97d > 1) {
            _0x9fa97d -= 1;
          }
        }
        if ((_0x3b7b04 = _0x3f800a + _0x157293 * 0.0625 - _0x12136f * 0.0625) < 0) {
          _0x3b7b04 = 0;
        }
        if (_0x3b7b04 > 1) {
          _0x3b7b04 = 1;
        }
        if (_0x2fede5 == 0) {
          _0x1c6fbd = _0x49a392 = _0x40385d = _0x3b7b04;
        } else {
          var _0x2c5d43 = _0x3b7b04 * 2 - (_0x1e522a = _0x3b7b04 < 0.5 ? _0x3b7b04 * (1 + _0x2fede5) : _0x3b7b04 + _0x2fede5 - _0x2fede5 * _0x3b7b04);
          _0x1c6fbd = _0xd9c6a2(_0x2c5d43, _0x1e522a, _0x9fa97d + 1 / 3);
          _0x49a392 = _0xd9c6a2(_0x2c5d43, _0x1e522a, _0x9fa97d);
          _0x40385d = _0xd9c6a2(_0x2c5d43, _0x1e522a, _0x9fa97d - 1 / 3);
        }
        return ((_0x1c6fbd = Math.round(_0x1c6fbd * 255)) << 16) + ((_0x49a392 = Math.round(_0x49a392 * 255)) << 8) + (_0x40385d = Math.round(_0x40385d * 255));
      }
    }
  }
  function _0xd9c6a2(_0x37bfd5, _0x19ff19, _0x1bd495) {
    if (_0x1bd495 < 0) {
      _0x1bd495 += 1;
    }
    if (_0x1bd495 > 1) {
      _0x1bd495 -= 1;
    }
    if (_0x1bd495 * 6 < 1) {
      return _0x37bfd5 + (_0x19ff19 - _0x37bfd5) * 6 * _0x1bd495;
    } else if (_0x1bd495 * 2 < 1) {
      return _0x19ff19;
    } else if (_0x1bd495 * 3 < 2) {
      return _0x37bfd5 + (_0x19ff19 - _0x37bfd5) * (2 / 3 - _0x1bd495) * 6;
    } else {
      return _0x37bfd5;
    }
  }
}
function toHex6(_0x223719) {
  return ("00000" + Number(_0x223719).toString(16)).slice(-6).toUpperCase();
}
function MakeGlow(_0x26432b) {
  var _0x43f2c9 = "0 0 0.2rem #" + toHex6(_0x26432b);
  return _0x43f2c9 + "," + _0x43f2c9 + "," + _0x43f2c9;
}
function MakeStatusGlow(_0x1900bd) {
  return "0 0 0.134rem #" + toHex6(_0x1900bd);
}
function rgbtohsv(_0x3243ac) {
  var _0x5798cb;
  var _0x3cbb5a;
  var _0x3a8729 = (_0x3243ac >> 16 & 255) / 255;
  var _0x5226c1 = (_0x3243ac >> 8 & 255) / 255;
  var _0x530a5e = (_0x3243ac & 255) / 255;
  var _0x37e38e = Math.min(_0x3a8729, _0x5226c1, _0x530a5e);
  var _0x42740e = Math.max(_0x3a8729, _0x5226c1, _0x530a5e);
  _0x5798cb = _0x37e38e == _0x42740e ? 0 : _0x42740e == _0x3a8729 ? ((_0x5226c1 - _0x530a5e) * 60 / (_0x42740e - _0x37e38e) + 360) % 360 : _0x42740e == _0x5226c1 ? (_0x530a5e - _0x3a8729) * 60 / (_0x42740e - _0x37e38e) + 120 : (_0x3a8729 - _0x5226c1) * 60 / (_0x42740e - _0x37e38e) + 240;
  _0x3cbb5a = _0x42740e == 0 ? 0 : (_0x42740e - _0x37e38e) / _0x42740e;
  return new Array(_0x5798cb, _0x3cbb5a, _0x42740e);
}
function hsvtorgb(_0x5b8aca, _0x22e178, _0x51aca3) {
  var _0x228d5f;
  var _0x135ac4;
  var _0x479dca;
  var _0x472378;
  var _0x152f6a;
  var _0x57acf8;
  var _0x143f0d;
  var _0x6439ad;
  _0x5b8aca %= 360;
  if (_0x51aca3 == 0) {
    return 0;
  }
  _0x57acf8 = _0x51aca3 * (1 - _0x22e178);
  _0x143f0d = _0x51aca3 * (1 - _0x22e178 * (_0x152f6a = (_0x5b8aca /= 60) - (_0x472378 = Math.floor(_0x5b8aca))));
  _0x6439ad = _0x51aca3 * (1 - _0x22e178 * (1 - _0x152f6a));
  switch (_0x472378) {
    case 0:
      _0x228d5f = _0x51aca3;
      _0x135ac4 = _0x6439ad;
      _0x479dca = _0x57acf8;
      break;
    case 1:
      _0x228d5f = _0x143f0d;
      _0x135ac4 = _0x51aca3;
      _0x479dca = _0x57acf8;
      break;
    case 2:
      _0x228d5f = _0x57acf8;
      _0x135ac4 = _0x51aca3;
      _0x479dca = _0x6439ad;
      break;
    case 3:
      _0x228d5f = _0x57acf8;
      _0x135ac4 = _0x143f0d;
      _0x479dca = _0x51aca3;
      break;
    case 4:
      _0x228d5f = _0x6439ad;
      _0x135ac4 = _0x57acf8;
      _0x479dca = _0x51aca3;
      break;
    case 5:
      _0x228d5f = _0x51aca3;
      _0x135ac4 = _0x57acf8;
      _0x479dca = _0x143f0d;
  }
  return Math.floor(_0x228d5f * 255) << 16 | Math.floor(_0x135ac4 * 255) << 8 | Math.floor(_0x479dca * 255);
}
function Getms() {
  return Date.Now();
}
function GetTimeToGo(_0x528416, _0x37cb93, _0xd62088) {
  if (_0x528416 == 0) {
    return "";
  }
  let _0x3d2925 = Math.floor((new Date() - _0x528416) / 1000);
  _0x3d2925 = parseInt(_0x3d2925);
  if (_0x3d2925 <= 0) {
    return ["mob1.justnow", "just now"];
  } else if (_0x3d2925 < 60) {
    if (_0xd62088) {
      return _0x3d2925;
    } else {
      return ["mob1.secsago", "$1 secs ago", _0x3d2925];
    }
  } else if (_0x3d2925 < 120) {
    if (_0xd62088) {
      return 1;
    } else {
      return ["mob1.minago", "$1 min ago", 1];
    }
  } else if (_0x3d2925 < 3600) {
    if (_0xd62088) {
      return parseInt(_0x3d2925 / 60);
    } else {
      return ["mob1.minsago", "$1 mins ago", parseInt(_0x3d2925 / 60)];
    }
  } else if (_0x3d2925 < 86400) {
    if (_0xd62088) {
      return parseInt(_0x3d2925 / 3600);
    } else {
      return ["mob1.hoursago", "$1 hours ago", parseInt(_0x3d2925 / 3600)];
    }
  } else if (_0x37cb93) {
    return new Date(_0x528416).toUTCString();
  } else if (_0xd62088) {
    return parseInt(_0x3d2925 / 86400);
  } else {
    return ["mob1.daysago", "$1 days ago", parseInt(_0x3d2925 / 86400)];
  }
}
function setUserBank() {
  if (w_Powers === null) {
    return;
  }
  if (POWERS === null) {
    POWERS = [];
  }
  POWERS = [];
  for (let _0x48605a = 1; _0x48605a < MAXPOWER; _0x48605a++) {
    if (_0x48605a == 81 || _0x48605a != 95 && _0x48605a % 32 == 31) {
      continue;
    }
    let _0x5e64ed = _0x48605a % 32;
    let _0x345b77 = xInt(_0x48605a / 32);
    if (w_Powers[_0x345b77] & 1 << _0x5e64ed) {
      POWERS[_0x48605a] = 1;
    }
  }
  let _0x3af4d2 = PowDecode(w_PowerO);
  if (_0x3af4d2 !== null) {
    for (let _0x5f3686 = 1; _0x5f3686 < MAXPOWER; _0x5f3686++) {
      if (_0x5f3686 != 81 && (_0x5f3686 == 95 || _0x5f3686 % 32 != 31)) {
        if (_0x3af4d2[_0x5f3686]) {
          POWERS[_0x5f3686] = xInt(POWERS[_0x5f3686]) + _0x3af4d2[_0x5f3686];
        }
      }
    }
  }
}
function setDisabledPowers() {
  if (w_Mask != null && (MASKED = [], PSSA || parent?.PSSA)) {
    for (let _0x2829be in PSSA || parent?.PSSA) {
      let _0x399f38 = _0x2829be >> 5;
      let _0x19d133 = Math.pow(2, _0x2829be % 32);
      if (w_Mask[_0x399f38] && w_Mask[_0x399f38] & _0x19d133) {
        MASKED[_0x2829be] = 0;
      }
    }
  }
}
function PowDecode(_0x51535e) {
  if (_0x51535e == null || _0x51535e.length == 0) {
    return null;
  }
  let _0x3d4c27 = [];
  let _0x10b69f = (_0x51535e = _0x51535e.toString()).split("|");
  for (let _0x4f92f5 = 0; _0x4f92f5 < _0x10b69f.length; _0x4f92f5++) {
    let _0x4680b2 = _0x10b69f[_0x4f92f5].split("=");
    let _0x4b447e = xInt(_0x4680b2[1]);
    if (_0x4b447e <= 0) {
      _0x4b447e = 1;
    }
    if (_0x4b447e > 10000) {
      _0x4b447e = 1;
    }
    _0x3d4c27[_0x4680b2[0]] = _0x4b447e;
  }
  return _0x3d4c27;
}
function hasPower(_0x4564df, _0x45d2f7 = false) {
  if (!_0x45d2f7) {
    logHasPowerForPowerId(_0x4564df);
  }
  if (!POWERS || Object.keys(POWERS).length === 0) {
    return false;
  }
  const _0x1cc559 = !!POWERS.hasOwnProperty(_0x4564df) && POWERS[_0x4564df];
  return (!MASKED || !MASKED.hasOwnProperty(_0x4564df)) && _0x1cc559;
}
function logHasPowerForPowerId(_0x1113ee) {
  if (_0x1113ee != 672) {
    return;
  }
  let _0x3da8a5 = "--- DEBUG // Power Info ---\n\n";
  _0x3da8a5 += "Power ID: " + _0x1113ee + "\n";
  _0x3da8a5 += "Total Powers: " + Object.keys(POWERS ?? {}).length + "\n";
  _0x3da8a5 += "Total Masked: " + Object.keys(MASKED ?? {}).length + "\n";
  _0x3da8a5 += "hasPower(" + _0x1113ee + ") return value: " + hasPower(_0x1113ee, true) + "\n";
  _0x3da8a5 += "Is power enabled: " + !(MASKED ?? {}).hasOwnProperty(_0x1113ee) + "\n";
  _0x3da8a5 += "Is power disabled: " + (MASKED ?? {}).hasOwnProperty(_0x1113ee) + "\n";
  _0x3da8a5 += "Is w_Powers null: " + (w_Powers === null) + "\n";
  _0x3da8a5 += "Is PSSA (1) null : " + (PSSA === null) + "\n";
  _0x3da8a5 += "Is PSSA (2) null : " + (parent?.PSSA === null) + "\n";
  doDebugLogs(1, _0x3da8a5);
}
function doDebugLogs(_0x174c5d, _0x2a22d5) {
  const _0x513ed0 = "[XAT] " + _0x2a22d5;
  switch (_0x174c5d) {
    case 1:
      console.info(_0x513ed0);
      break;
    case 2:
      console.warn(_0x513ed0);
      break;
    case 3:
      console.error(_0x513ed0);
      break;
    case 4:
      console.table(_0x2a22d5);
  }
}
function iMux(_0x462708, _0x33429b) {
  _0x33429b ||= "i";
  var _0x2c70da = _0x462708.substr(-10);
  var _0x41ab02 = 0;
  for (var _0x1098b1 = 0; _0x1098b1 < 10; _0x1098b1++) {
    _0x41ab02 += _0x2c70da.charCodeAt(_0x1098b1);
  }
  return "https://" + _0x33429b + (_0x41ab02 & 1) + ".localhost:6969/web_gear/chat/" + _0x462708;
}
var Trusted;
var syel;
var soth;
var spowhave;
var spow;
var stop;
var scount;
var Browser;
var dialogFrame;
var actions;
var settings;
var settingsWindow;
var selector;
var butsFrame;
var MyObj;
function SafeImage(_0x4b3d64, _0x2f158c, _0x4c189f, _0x174d34) {
  if (_0x4b3d64.length == 0) {
    return "";
  }
  var _0x1aec41 = parse_url(_0x4b3d64);
  if (!_0x1aec41 && !(_0x1aec41 = parse_url(_0x4b3d64 = _0x4b3d64.charAt(0) == "/" ? "https:" + _0x4b3d64 : "https://" + _0x4b3d64))) {
    return "";
  }
  if (!_0x1aec41.host) {
    return "";
  }
  if (_0x1aec41.host.indexOf("localhost:6969") >= 0 && (_0x1aec41.path.indexOf("GetImage") > 0 || _0x1aec41.path.indexOf("/chat/av/") >= 0)) {
    return _0x4b3d64;
  }
  if (_0x2f158c == _0x4c189f && !_0x174d34) {
    _0x2f158c = _0x4c189f = calcAvSize(_0x2f158c);
  }
  const _0xe21b92 = IsAnimationOn() ? "s" : "S";
  if (!isBackgroundAnimationOn()) {
    _0x174d34 = false;
  }
  let _0x23e11b = _0xe21b92 + "&W=" + _0x2f158c + "&H=" + _0x4c189f + "&U=" + _0x4b3d64;
  if (_0x174d34) {
    _0x23e11b += "&g&otp";
  }
  return "http://localhost:6969/web_gear/chat/GetImage7.php?" + _0x23e11b;
}
function parse_url(_0x18df4f, _0x114ef9) {
  var _0x10485d = ["source", "scheme", "authority", "userInfo", "user", "pass", "host", "port", "relative", "path", "directory", "file", "query", "fragment"];
  var _0x235fac = {};
  var _0x313b87 = _0x235fac["phpjs.parse_url.mode"] && _0x235fac["phpjs.parse_url.mode"].local_value || "php";
  var _0x1ff625 = {
    php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
  };
  var _0x12ec41 = _0x1ff625[_0x313b87].exec(_0x18df4f);
  var _0x289bcb = {};
  for (var _0x1883e5 = 14; _0x1883e5--;) {
    if (_0x12ec41[_0x1883e5]) {
      _0x289bcb[_0x10485d[_0x1883e5]] = _0x12ec41[_0x1883e5];
    }
  }
  if (_0x114ef9) {
    return _0x289bcb[_0x114ef9.replace("PHP_URL_", "").toLowerCase()];
  }
  if (_0x313b87 !== "php") {
    var _0x5a8b13 = _0x235fac["phpjs.parse_url.queryKey"] && _0x235fac["phpjs.parse_url.queryKey"].local_value || "queryKey";
    _0x1ff625 = /(?:^|&)([^&=]*)=?([^&]*)/g;
    _0x289bcb[_0x5a8b13] = {};
    (_0x289bcb[_0x10485d[12]] || "").replace(_0x1ff625, function (_0x364825, _0x10c47d, _0x26cf01) {
      if (_0x10c47d) {
        _0x289bcb[_0x5a8b13][_0x10c47d] = _0x26cf01;
      }
    });
  }
  delete _0x289bcb.source;
  return _0x289bcb;
}
function xEscape(_0x2b3482) {
  return "%" + _0x2b3482.charCodeAt(0).toString(16).toUpperCase();
}
function rfc3986EncodeURIComponent(_0x5172a5) {
  return encodeURIComponent(_0x5172a5).replace(/[!'()*~]/g, xEscape);
}
function addSmilies(_0x2ee74a, _0x1219e2, _0x3c502b, _0x34ab3d, _0x529efc) {
  if (!syel) {
    syel = JSON.parse(_0x2ee74a);
    soth = JSON.parse(_0x1219e2);
    spow = JSON.parse(_0x3c502b);
    spowhave = JSON.parse(_0x34ab3d);
    stop = JSON.parse(_0x529efc);
  }
}
function detectIE() {
  var _0x121872 = window.navigator.userAgent;
  var _0xc0beba = _0x121872.indexOf("MSIE ");
  if (_0xc0beba > 0) {
    Browser = "MS";
    return parseInt(_0x121872.substring(_0xc0beba + 5, _0x121872.indexOf(".", _0xc0beba)), 10);
  }
  if (_0x121872.indexOf("Trident/") > 0) {
    Browser = "MS";
    var _0x4a3732 = _0x121872.indexOf("rv:");
    return parseInt(_0x121872.substring(_0x4a3732 + 3, _0x121872.indexOf(".", _0x4a3732)), 10);
  }
  var _0x12dfca = _0x121872.indexOf("Edge/");
  if (_0x12dfca > 0) {
    Browser = "MS";
    return parseInt(_0x121872.substring(_0x12dfca + 5, _0x121872.indexOf(".", _0x12dfca)), 10);
  } else {
    if (_0x121872.toLowerCase().indexOf("firefox") > -1) {
      Browser = "FF";
    } else if (_0x121872.indexOf("Chrome") > -1) {
      Browser = "CR";
    } else if (_0x121872.indexOf("Safari") > -1) {
      Browser = "SF";
    }
    return false;
  }
}
function setTextBoxEditable(_0x316f3d, _0x141db7) {
  var _0x9d9023 = document.getElementById(_0x316f3d);
  if (_0x9d9023) {
    _0x9d9023.setAttribute("contenteditable", _0x141db7);
    if (_0x141db7) {
      _0x9d9023.classList.add("textBox", "textBoxEdit");
    } else {
      _0x9d9023.classList.remove("textBox", "textBoxEdit");
    }
  }
  return _0x9d9023;
}
function isString(_0x549f48) {
  return Object.prototype.toString.call(_0x549f48) === "[object String]";
}
function isConnected() {
  return _Activity.instance.IsConnected();
}
function resizeSearchBar(_0xc7201) {
  if (_0xc7201) {
    _0xc7201.style.width = window.innerWidth - 20 + "px";
    window.addEventListener("resize", () => {
      _0xc7201.style.width = window.innerWidth - 20 + "px";
    });
  }
}
String.prototype.hashCode = function () {
  var _0x5dc306 = 0;
  if (this.length == 0) {
    return _0x5dc306;
  }
  for (var _0x4619a2 = 0; _0x4619a2 < this.length; _0x4619a2++) {
    _0x5dc306 = (_0x5dc306 << 5) - _0x5dc306 + this.charCodeAt(_0x4619a2);
    _0x5dc306 &= _0x5dc306;
  }
  return _0x5dc306;
};
detectIE();
var settingsPage = false;
function setFrameVis(_0x3e4887) {
  if (!settings?.toSave) {
    if (_0x3e4887 && _0x3e4887 === "settings") {
      settingsPage = true;
    }
    if (Classic) {
      reportsDrop();
    }
    for (var _0x509f7d in {
      selector: 1,
      settings: 1,
      actions: 1
    }) {
      var _0x571645 = document.getElementById(_0x509f7d + "Frame");
      if (_0x571645) {
        if (_0x509f7d == _0x3e4887) {
          _0x571645.classList.remove("d-none");
        } else {
          _0x571645.classList.add("d-none");
        }
      }
    }
    var _0x20b364 = document.getElementById("FrameDialog");
    var _0x2971c5 = document.getElementById("FrameBack");
    butsFrame = _0x20b364;
    var _0x1c8c96 = document.getElementById("reportIconClassic");
    if (_0x1c8c96) {
      _0x1c8c96.classList.add("d-none");
    }
    var _0x3939d2 = document.getElementById("callIconClassic");
    if (_0x3939d2) {
      _0x3939d2.classList.add("d-none");
    }
    if (_0x3e4887) {
      removeClass("d-none", "Overlays");
      removeClass("d-none", "OverlaysClassic");
      if (_0x20b364) {
        _0x20b364.classList.remove("d-none");
        _0x20b364.style.width = "100%";
        _0x20b364.style.height = "100%";
        var _0xfdcInner = _0x20b364.querySelector(".modalDialogContentClassic");
        if (_0xfdcInner) {
          var _0xfdcPw = _0x20b364.offsetWidth;
          var _0xfdcPh = _0x20b364.offsetHeight;
          var _0xfdcW = Math.min(Math.max(Math.round(_0xfdcPw * 0.5), 380), Math.round(_0xfdcPw * 0.95));
          var _0xfdcH = Math.round(_0xfdcPh * 0.9);
          var _0xfdcL = Math.round((_0xfdcPw - _0xfdcW) / 2);
          var _0xfdcT = Math.round((_0xfdcPh - _0xfdcH) / 2);
          _0xfdcInner.style.cssText = "position:absolute; width:" + _0xfdcW + "px; height:" + _0xfdcH + "px; left:" + _0xfdcL + "px; top:" + _0xfdcT + "px;";
        }
      }
      if (_0x2971c5) {
        _0x2971c5.classList.remove("d-none");
      }
    } else {
      addClass("d-none", "Overlays");
      addClass("d-none", "OverlaysClassic");
      if (_0x20b364) {
        _0x20b364.classList.add("d-none");
      }
      if (_0x2971c5) {
        _0x2971c5.classList.add("d-none");
      }
      if (actions) {
        actions?.clearall();
        actions.Visible = false;
        if (actions.ReLogin) {
          actions.ReLogin = false;
          ToC({
            Command: "CheckRestartAfterMePage"
          });
        }
      }
      if (selector) {
        if (selector.ReLogin) {
          selector.ReLogin = false;
          SetPow();
          ToC({
            Command: "CheckRestartAfterMePage"
          });
        }
        selector.clear();
      }
      if (settingsPage) {
        if (!isPstylePreviewEnabled()) {
          localStorage.removeItem("pstyleTmp");
        }
        if (localStorage.getItem("avatarSettingsTmp")) {
          localStorage.removeItem("avatarSettingsTmp");
        }
        reloadSettingsIframe();
        settingsPage = false;
      }
      if (settings?.doReload) {
        settings.doReload = false;
        if (Classic) {
          _Activity.instance.QuickBar?.reloadSideBar();
          forceUpdateAnimation = true;
        } else {
          updateAllFrame(hasDarkMode() ? "enable" : "disable");
        }
        if (settings?.currentPage !== "translator") {
          ToC({
            Command: "DoReload"
          });
        }
      }
    }
    ColorTitle();
  }
}
function isPstylePreviewEnabled() {
  const _0x5dbf49 = localStorage.getItem("pstylePreviewMode");
  return _0x5dbf49 && _0x5dbf49 === "1";
}
function reloadSettingsIframe() {
  let _0x407747 = findNodeInWindowOrParent("#settingsFrame");
  if (!_0x407747 || !_0x407747.contentWindow) {
    return;
  }
  let _0x9b389c = _0x407747.contentWindow;
  _0x9b389c?.location?.reload();
  if (isPstylePreviewEnabled()) {
    const _0x4a90dd = () => {
      loadPstyleTabInSettings(_0x407747);
      _0x407747.removeEventListener("load", _0x4a90dd);
    };
    _0x407747.addEventListener("load", _0x4a90dd);
  }
}
function loadPstyleTabInSettings(_0x3c4cb9) {
  const _0x13b40e = {
    UserNo: _Activity.instance.MyId,
    tab: "pstyle"
  };
  classicSetDialog("actions", _Activity.instance.MyId);
  classicSetDialog("settings", _0x13b40e);
  localStorage.removeItem("pstylePreviewMode");
}
function resetPstylePreview() {
  localStorage.removeItem("pstylePreviewMode");
  localStorage.removeItem("pstyleTmp");
}
function doSelector(_0x4669e6) {
  selector.initLang(Language);
  posModal(butsFrame, {
    mw: 900
  });
  selector.UserNo = _0x4669e6.UserNo;
  selector.MyObj = MyObj ? config : _0x4669e6.Config;
  switch (_0x4669e6.Type) {
    case "Powers":
      selector.Powers = _0x4669e6.Powers;
      selector.MainObj = _0x4669e6.MainObj;
      selector.Go = true;
      selector.hideWallet();
      selector.startPowers();
      break;
    case "Kiss":
      selector.doKisses();
      break;
    case "Smilies":
      selector.startSmilies();
      break;
    case "Stickers":
      selector.stickers(_0x4669e6.Pack);
      break;
    case "Gifts":
      let _0x358f98 = _0x4669e6.MainObj ? _0x4669e6.MainObj.user[0] : _0x4669e6.UserNo;
      selector.gifts(_0x358f98);
      break;
    case "Marry":
    case "Divorce":
      selector.id = _0x4669e6.MainObj.id;
      selector.regname = _0x4669e6.MainObj.regname;
      selector.doKisses(_0x4669e6.Type);
  }
}
let copyright = document.getElementById("copyrightyear");
function classicSetDialog(_0x2a9bee, _0x1e5132) {
  if (_0x2a9bee !== "profile" && _0x2a9bee !== "actions") {
    cleanupPstyleClasses(document);
  }
  let _0x4909c3 = document.getElementById("Overlays");
  _0x4909c3 ||= document.getElementById("OverlaysClassic");
  if (!_0x4909c3) {
    parent.classicSetDialog(_0x2a9bee, _0x1e5132);
    return;
  }
  let _0x442428 = xInt(_0x1e5132);
  var _0x4619d2;
  if (!_0x442428 && _0x1e5132.MainObj && _0x1e5132.MainObj.user) {
    _0x442428 = xInt(_0x1e5132.MainObj.user[0].id);
  }
  if (!_0x442428 && MyObj) {
    _0x442428 = xInt(MyObj.MyId);
  }
  switch (_0x2a9bee) {
    case "selector":
      _0x4619d2 = "selector";
      break;
    case "settings":
      _0x4619d2 = _0x2a9bee;
      break;
    default:
      _0x4619d2 = "actions";
  }
  setFrameVis(_0x4619d2);
  _0x4909c3 = document.getElementById("FrameDialogCloseBut");
  if (_0x4909c3) {
    _0x4909c3.onclick = function () {
      setFrameVis();
    };
  }
  _0x4909c3 = document.getElementById("FrameBack");
  if (_0x4909c3) {
    _0x4909c3.onclick = function () {
      setFrameVis();
    };
  }
  const _0x3d5c33 = document.getElementById(_0x4619d2 + "Frame").contentWindow;
  switch (_0x2a9bee) {
    case "settings":
      settingsWindow = _0x3d5c33;
      settings = _0x3d5c33.settings;
      if (_0x1e5132.tab) {
        _0x442428 = _0x1e5132.UserNo;
        setTimeout(() => {
          settings.doTab(_0x1e5132.tab);
        }, 250);
      }
      break;
    case "selector":
      removeClass("d-none", "FrameDialog");
      removeClass("d-none", "FrameBack");
      selector = _0x3d5c33.selector;
      doSelector(_0x1e5132);
      _0x442428 = _0x1e5132.UserNo;
      break;
    default:
      if (actions = _0x3d5c33.actions) {
        actions?.clearall();
        actions.Visible = true;
      }
  }
  let _0x13e2d8 = document.getElementById("appframe");
  if (_0x13e2d8) {
    _0x13e2d8 = _0x13e2d8.contentWindow;
    _0x13e2d8.actions = actions;
    _0x13e2d8.selector = selector;
    _0x13e2d8.settings = settings;
  }
  ToC({
    Command: "LoadClassicDialog",
    Type: _0x2a9bee,
    UserNo: _0x442428
  });
  if (["settings", "selector"].includes(_0x2a9bee)) {
    setCstyle();
  }
}
function getHash(_0x2a769e) {
  let _0x336885 = 0;
  let _0x5314cd = _0x2a769e.length;
  for (var _0x195edc = 0; _0x195edc < _0x5314cd; _0x195edc++) {
    _0x336885 = (_0x336885 << 5) - _0x336885 + _0x2a769e.charCodeAt(_0x195edc);
    _0x336885 |= 0;
  }
  return _0x336885;
}
function hasDarkMode() {
  let _0x267530 = JSON.parse(localStorage.getItem("Settings"))?.darkmode;
  return _0x267530 && _0x267530 == "enable";
}
function setdarkmode(_0x2b1c16) {
  let _0x388680 = _0x2b1c16 || hasDarkMode();
  if (_0x388680 && _0x388680 != "disable") {
    if (_0x388680 && _Activity.instance.IsClassic) {
      document.body.classList.add("dark");
    } else if (_0x388680 && !_Activity.instance.IsClassic) {
      document.body.classList.add("dark");
      document.body.classList.add("darkMobile");
      if (parent && parent.document) {
        parent.document.getElementById("dropdown-content").classList.add("darkMenu");
        parent.document.body?.classList?.add("dark");
        parent.document.body?.classList?.add("darkMobile");
      }
    }
  } else {
    document.body.classList.remove("dark");
    document.body.classList.remove("darkMobile");
    if (parent && parent.document) {
      parent.document.getElementById("dropdown-content")?.classList?.remove("darkMenu");
      parent.document.body?.classList?.remove("dark");
      parent.document.body?.classList?.remove("darkMobile");
    }
  }
}
function hasHideUserlist() {
  let _0x439507 = JSON.parse(localStorage.getItem("Settings"))?.hideuserlist;
  return _0x439507 || "enable";
}
function hasStealthMode() {
  let _0x2df0a5 = JSON.parse(localStorage.getItem("Macros"))?.Stealth;
  return _0x2df0a5 && _0x2df0a5 == "enable";
}
function getFavoriteGroups() {
  let _0x14ea61 = JSON.parse(localStorage.getItem("Settings"))?.favorites;
  if (_0x14ea61) {
    return JSON.parse(_0x14ea61.replace(/”/g, "\""));
  } else {
    return {};
  }
}
function hasGroupInFavorite() {
  let _0x527d75 = config.GroupName;
  if (!_0x527d75) {
    return;
  }
  let _0x595b8d = getFavoriteGroups();
  _0x595b8d ||= {};
  if (!Object.keys(_0x595b8d).length) {
    return false;
  }
  for (let _0x256538 in _0x595b8d) {
    if (_0x595b8d[_0x256538].g && _0x595b8d[_0x256538].g.toLowerCase() == _0x527d75.toLowerCase()) {
      return true;
    }
  }
  return false;
}
function addRemoveFavorites(_0x3d1e35, _0x4ea343) {
  let _0xb62c0a = getFavoriteGroups();
  let _0x3c8243 = _0x4ea343 || config.GroupName;
  let _0x15c6d3 = _0x3d1e35 || config.chatid;
  _0x3c8243 = _0x3c8243.toLowerCase();
  if (_0xb62c0a[_0x3c8243]) {
    delete _0xb62c0a[_0x3c8243];
  } else {
    _0xb62c0a[_0x3c8243] = {
      id: _0x15c6d3,
      g: _0x3c8243
    };
  }
  return saveSetting("favorites", JSON.stringify(_0xb62c0a));
}
function getIgnoredUsers() {
  const _0x49e53a = JSON.parse(localStorage.getItem("w_ignorelist2"));
  return _0x49e53a || {};
}
function getBlockedUsers() {
  const _0x378441 = JSON.parse(localStorage.getItem("w_friendlist3"));
  const _0x103b93 = {};
  for (const _0x47bc67 in _0x378441) {
    if (Object.hasOwnProperty.call(_0x378441, _0x47bc67) && _0x378441[_0x47bc67].f & 32) {
      _0x103b93[_0x47bc67] = _0x378441[_0x47bc67].R.length ? _0x378441[_0x47bc67].R : _0x47bc67;
    }
  }
  return _0x103b93;
}
function getSettingsValue(_0x11bac4) {
  let _0x307786 = {};
  try {
    const _0x559db3 = localStorage.getItem("Settings");
    if (_0x559db3) {
      _0x307786 = JSON.parse(_0x559db3);
    }
  } catch (_0x284739) {}
  return _0x307786[_0x11bac4] || "enable";
}
function unignoreUser(_0xf17bce) {
  if (!_0xf17bce) {
    return;
  }
  let _0x9ed96e = {
    name: "Unignore"
  };
  _0x9ed96e.UserNo = _0xf17bce;
  _0x9ed96e.Page = "actions";
  _0x9ed96e.Command = "Action";
  _0x9ed96e.Type = "Action";
  return ToC(_0x9ed96e);
}
function unblockUser(_0x206a89) {
  if (_0x206a89) {
    ToC({
      Command: "Block",
      UserNo: _0x206a89
    });
  }
}
function StripSmilies(_0x34a953) {
  var _0x38bc6f;
  var _0xb7aad1;
  for (_0x34a953 = Replace(_0x34a953, [":)", ":-)", ":d", ";)", ";-)", ":o", ":-o", ":p", ":@", ":s", ":$", ":(", ":-(", ":'(", "|-)", "8-)", ":|", ":-|", ":-*", ":[", ":-["]); _0x34a953.indexOf("<") != -1;) {
    _0x38bc6f = _0x34a953.indexOf("<");
    _0xb7aad1 = _0x34a953.indexOf(">", _0x38bc6f);
    _0x34a953 = _0xb7aad1 != -1 ? _0x34a953.substr(0, _0x38bc6f) + _0x34a953.substr(_0xb7aad1 + 1) : _0x34a953.substr(0, _0x38bc6f) + _0x34a953.substr(_0x38bc6f + 1);
  }
  while (_0x34a953.indexOf("(") != -1) {
    _0x38bc6f = _0x34a953.indexOf("(");
    _0xb7aad1 = _0x34a953.indexOf(")", _0x38bc6f);
    _0x34a953 = _0xb7aad1 != -1 ? _0x34a953.substr(0, _0x38bc6f) + _0x34a953.substr(_0xb7aad1 + 1) : _0x34a953.substr(0, _0x38bc6f) + _0x34a953.substr(_0x38bc6f + 1);
  }
  while (_0x34a953.indexOf("[") != -1) {
    _0x38bc6f = _0x34a953.indexOf("[");
    _0xb7aad1 = _0x34a953.indexOf("]", _0x38bc6f);
    _0x34a953 = _0xb7aad1 != -1 ? _0x34a953.substr(0, _0x38bc6f) + _0x34a953.substr(_0xb7aad1 + 1) : _0x34a953.substr(0, _0x38bc6f) + _0x34a953.substr(_0x38bc6f + 1);
  }
  return _0x34a953;
}
function Replace(_0x1fd4f9, _0x8fb903) {
  for (let _0x35f032 = 0; _0x35f032 < _0x8fb903.length; _0x35f032 += 2) {
    while (_0x1fd4f9.indexOf(_0x8fb903[_0x35f032]) != -1) {
      let _0x2e967a = _0x1fd4f9.indexOf(_0x8fb903[_0x35f032]);
      _0x1fd4f9 = _0x1fd4f9.substr(0, _0x2e967a) + _0x8fb903[_0x35f032 + 1] + _0x1fd4f9.substr(_0x2e967a + _0x8fb903[_0x35f032].length);
    }
  }
  return _0x1fd4f9;
}
function reloadChat() {
  ToC({
    Command: "DoReload"
  });
}
if (copyright) {
  copyright.appendChild(document.createTextNode(new Date().getFullYear()));
}
class Snackbar {
  constructor(_0x30931d) {
    this.text = _0x30931d;
    if (Array.isArray(this.text)) {
      this.id = Math.abs(getHash(this.text[0]));
    } else {
      this.id = Math.abs(getHash(this.text));
    }
    this.snackbars = document.querySelector("#snackbars");
    if (!this.snackbars) {
      this.snackbars = makeElement(null, "div", "snackbars", "snackbars");
      document.body.prepend(this.snackbars);
    }
    this.snackbar = document.getElementById(this.id) ?? makeElement(this.snackbars, "div", "snackbar", this.id);
  }
  show(_0x444ca6, _0x3406b0) {
    if (_0x3406b0 && Array.isArray(this.text)) {
      this.text.push(_0x3406b0);
    }
    this.snackbar.innerHTML = "";
    addText(this.snackbar, this.text);
    this.snackbar.classList.remove("hide");
    this.snackbar.classList.add("show");
    setTimeout(() => {
      this.hide();
    }, _0x444ca6 || 2000);
  }
  hide() {
    this.snackbar.classList.remove("show");
    this.snackbar.classList.add("hide");
  }
}
function signInButtonPressed(_0x26bd56) {
  var _0x163b3d;
  _0x163b3d = {
    Command: "signInButtonPressed"
  };
  if (_0x26bd56 !== undefined) {
    _0x163b3d.DoSignIn = _0x26bd56;
  }
  ToC(_0x163b3d);
}
const liveIsClassic = _Activity?.instance?.IsClassic;
const LiveState = {
  d: {
    on: false,
    x: 0,
    y: 0,
    ox: 0,
    oy: 0
  },
  r: {
    on: false,
    x: 0,
    y: 0,
    w: 0,
    h: 0
  },
  initialized: false,
  hostDoc: null
};
let callingSound = null;
let isConsentModalOpen = false;
function getLiveHostDocument() {
  if (!(() => {
    try {
      if (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) {
        return true;
      }
      if (window.navigator && window.navigator.standalone === true) {
        return true;
      }
    } catch (_0x3d79f1) {}
    return false;
  })()) {
    try {
      if (window.top && window.top.document && window.top.document.querySelector("#liveContainer")) {
        return {
          doc: window.top.document,
          container: window.top.document.querySelector("#liveContainer")
        };
      }
    } catch (_0x569fc) {}
  }
  try {
    let _0x1b774b = window;
    let _0x3ed37d = null;
    while (true) {
      try {
        const _0x2d1cc6 = _0x1b774b.document;
        if (_0x2d1cc6 && _0x2d1cc6.querySelector) {
          const _0xcfc7b8 = _0x2d1cc6.querySelector("#liveContainer");
          if (_0xcfc7b8) {
            if (!(_0x2d1cc6.location && _0x2d1cc6.location.href ? _0x2d1cc6.location.href : "").endsWith("messages.html")) {
              return {
                doc: _0x2d1cc6,
                container: _0xcfc7b8
              };
            }
            _0x3ed37d ||= {
              doc: _0x2d1cc6,
              container: _0xcfc7b8
            };
          }
        }
      } catch (_0x2fa336) {}
      if (_0x1b774b === _0x1b774b.parent) {
        break;
      }
      _0x1b774b = _0x1b774b.parent;
    }
    if (_0x3ed37d) {
      return _0x3ed37d;
    }
  } catch (_0x4d5796) {}
  try {
    const _0x5929d4 = [...document.querySelectorAll("iframe")].find(_0x573afb => _0x573afb.src?.endsWith("messages.html"));
    if (_0x5929d4?.contentDocument) {
      const _0x373042 = _0x5929d4.contentDocument;
      const _0x48444c = _0x373042.querySelector("#liveContainer");
      if (_0x48444c) {
        return {
          doc: _0x373042,
          container: _0x48444c
        };
      }
    }
  } catch (_0x4558eb) {}
  return {
    doc: document,
    container: document.querySelector("#liveContainer")
  };
}
function LiveUpdate() {
  try {
    const _0x5dea26 = getLiveHostDocument();
    const _0x50681c = _0x5dea26.doc;
    const _0x392c41 = _0x5dea26.container;
    const _0x5f4e70 = _0x50681c.querySelector("#livePlayer");
    const _0x4bb863 = _0x50681c.querySelector("#liveToolBar");
    if (_0x5f4e70 && _0x392c41) {
      _0x5f4e70.style.height = _0x392c41.offsetHeight - (_0x4bb863?.offsetHeight || 30) + "px";
      _0x5f4e70.style.width = "100%";
    }
  } catch (_0x538908) {}
}
function LivePointerDown(_0x48145f) {
  try {
    const _0x2ef18e = getLiveHostDocument();
    const _0x3e72f0 = _0x2ef18e.doc;
    const _0x660247 = _0x2ef18e.container;
    if (!_0x660247) {
      return;
    }
    const _0x256f80 = _0x3e72f0.querySelector("#livePlayer");
    const _0x107e30 = _0x3e72f0.querySelector("#liveResize");
    const _0x40ed3c = _0x3e72f0.querySelector("#liveToolBar");
    const _0x573ec3 = _0x48145f.touches ? _0x48145f.touches[0].clientX : _0x48145f.clientX || 0;
    const _0x538f35 = _0x48145f.touches ? _0x48145f.touches[0].clientY : _0x48145f.clientY || 0;
    const _0x5d59c7 = _0x86c723 => _0x86c723 ? _0x86c723.getBoundingClientRect() : null;
    const _0x485d1a = _0x5d59c7(_0x107e30);
    const _0x5689d4 = _0x5d59c7(_0x40ed3c);
    const _0x3c6e4a = _0x5d59c7(_0x660247);
    if (_0x485d1a && _0x573ec3 >= _0x485d1a.left && _0x573ec3 <= _0x485d1a.right && _0x538f35 >= _0x485d1a.top && _0x538f35 <= _0x485d1a.bottom) {
      LiveState.r.on = true;
      LiveState.r.x = _0x573ec3;
      LiveState.r.y = _0x538f35;
      LiveState.r.w = _0x660247.offsetWidth;
      LiveState.r.h = _0x660247.offsetHeight;
      try {
        _0x3e72f0.body.style.cursor = "nw-resize";
      } catch (_0x599850) {}
      try {
        if (_0x256f80 && _0x256f80.querySelector("iframe")) {
          _0x256f80.querySelector("iframe").style.pointerEvents = "none";
        }
      } catch (_0x9f39dc) {}
      try {
        if (_0x48145f.pointerId && _0x107e30 && _0x107e30.setPointerCapture) {
          _0x107e30.setPointerCapture(_0x48145f.pointerId);
        }
      } catch (_0x2fd642) {}
      _0x48145f.preventDefault();
      return;
    }
    if (_0x5689d4 && _0x573ec3 >= _0x5689d4.left && _0x573ec3 <= _0x5689d4.right && _0x538f35 >= _0x5689d4.top && _0x538f35 <= _0x5689d4.bottom || _0x3c6e4a && _0x573ec3 >= _0x3c6e4a.left && _0x573ec3 <= _0x3c6e4a.right && _0x538f35 >= _0x3c6e4a.top && _0x538f35 <= _0x3c6e4a.bottom) {
      const _0x26dbe1 = _0x3c6e4a || {
        left: 0,
        top: 0
      };
      LiveState.d.on = true;
      LiveState.d.x = _0x573ec3;
      LiveState.d.y = _0x538f35;
      LiveState.d.ox = _0x573ec3 - _0x26dbe1.left;
      LiveState.d.oy = _0x538f35 - _0x26dbe1.top;
      try {
        if (_0x256f80 && _0x256f80.querySelector("iframe")) {
          _0x256f80.querySelector("iframe").style.pointerEvents = "none";
        }
      } catch (_0x4a1511) {}
      try {
        if (_0x48145f.pointerId && (_0x40ed3c || _0x660247) && (_0x40ed3c || _0x660247).setPointerCapture) {
          (_0x40ed3c || _0x660247).setPointerCapture(_0x48145f.pointerId);
        }
      } catch (_0x12031c) {}
      _0x48145f.preventDefault();
      return;
    }
  } catch (_0x18e099) {}
}
function LivePointerMove(_0x586138) {
  try {
    const _0x4fafc4 = getLiveHostDocument().container;
    if (!_0x4fafc4) {
      return;
    }
    const _0x3e8306 = _0x586138.touches ? _0x586138.touches[0].clientX : _0x586138.clientX || 0;
    const _0x2ff4b4 = _0x586138.touches ? _0x586138.touches[0].clientY : _0x586138.clientY || 0;
    if (LiveState.r.on) {
      const _0x3ece58 = Math.max(230, Math.min(728, LiveState.r.w + (_0x3e8306 - LiveState.r.x)));
      const _0x156c6b = Math.max(275, Math.min(468, LiveState.r.h + (_0x2ff4b4 - LiveState.r.y)));
      _0x4fafc4.style.width = _0x3ece58 + "px";
      _0x4fafc4.style.height = _0x156c6b + "px";
      LiveUpdate();
      _0x586138.preventDefault();
      return;
    }
    if (LiveState.d.on) {
      const _0x3c1eee = _0x3e8306 - LiveState.d.ox;
      const _0x3e4c79 = _0x2ff4b4 - LiveState.d.oy;
      const _0x45e0a9 = _0x4fafc4.offsetWidth;
      const _0x8d5805 = _0x4fafc4.offsetHeight;
      const _0x22b358 = window.innerWidth;
      const _0x421f3b = window.innerHeight;
      const _0x427d16 = Math.min(_0x22b358 - _0x45e0a9, Math.max(0, _0x3c1eee));
      const _0x10783c = Math.min(_0x421f3b - _0x8d5805, Math.max(0, _0x3e4c79));
      _0x4fafc4.style.left = _0x427d16 + "px";
      _0x4fafc4.style.top = _0x10783c + "px";
      _0x586138.preventDefault();
      return;
    }
  } catch (_0x5b5384) {}
}
function LivePointerUp(_0x2273f4) {
  try {
    const _0x2239aa = getLiveHostDocument();
    const _0x17b2ee = _0x2239aa.doc;
    const _0x1fa3ff = _0x2239aa.container;
    const _0x280f3c = _0x17b2ee.querySelector("#livePlayer");
    if (_0x280f3c && _0x280f3c.querySelector("iframe")) {
      _0x280f3c.querySelector("iframe").style.pointerEvents = "auto";
    }
    if (LiveState.r.on) {
      LiveState.r.on = false;
      try {
        _0x17b2ee.body.style.cursor = "default";
      } catch (_0x2886a9) {}
    }
    LiveState.d.on &&= false;
    try {
      if (_0x2273f4.pointerId) {
        const _0x4c5b46 = getLiveHostDocument();
        const _0x3eec9a = _0x4c5b46.doc.querySelector("#liveToolBar");
        const _0x531084 = _0x4c5b46.doc.querySelector("#liveResize");
        try {
          if (_0x531084 && _0x531084.releasePointerCapture) {
            _0x531084.releasePointerCapture(_0x2273f4.pointerId);
          }
        } catch (_0x35c046) {}
        try {
          if (_0x3eec9a && _0x3eec9a.releasePointerCapture) {
            _0x3eec9a.releasePointerCapture(_0x2273f4.pointerId);
          }
        } catch (_0x3ea860) {}
        try {
          if (_0x1fa3ff && _0x1fa3ff.releasePointerCapture) {
            _0x1fa3ff.releasePointerCapture(_0x2273f4.pointerId);
          }
        } catch (_0x2f70c3) {}
      }
    } catch (_0x7bd459) {}
  } catch (_0x2d6a62) {}
}
function LiveInitBindings() {
  try {
    LiveCleanupBindings();
  } catch (_0x3c6f4a) {}
  try {
    const _0x599167 = getLiveHostDocument().doc;
    LiveState.hostDoc = _0x599167;
    try {
      const _0x39b9d3 = _0x599167.getElementById && _0x599167.getElementById("__live_pointer_overlay");
      if (_0x39b9d3 && _0x39b9d3.parentNode) {
        _0x39b9d3.parentNode.removeChild(_0x39b9d3);
      }
    } catch (_0x37f009) {}
    try {
      const _0x9081af = _0x599167.getElementById && _0x599167.getElementById("__live_debug_overlay");
      if (_0x9081af && _0x9081af.parentNode) {
        _0x9081af.parentNode.removeChild(_0x9081af);
      }
    } catch (_0x693ea8) {}
    _0x599167.addEventListener("pointerdown", LivePointerDown, {
      passive: false
    });
    _0x599167.addEventListener("pointermove", LivePointerMove, {
      passive: false
    });
    _0x599167.addEventListener("pointerup", LivePointerUp);
    _0x599167.addEventListener("pointercancel", LivePointerUp);
    window.addEventListener("resize", LiveUpdate);
    _0x599167.addEventListener("touchstart", LivePointerDown, {
      passive: false
    });
    _0x599167.addEventListener("touchmove", LivePointerMove, {
      passive: false
    });
    _0x599167.addEventListener("touchend", LivePointerUp);
    try {
      if (!LiveState._navListenerAttached) {
        const _0x190441 = _0x4f8061 => {
          try {
            const _0x1ef751 = _0x4f8061.target;
            if (_0x1ef751.closest && _0x1ef751.closest("[id^=\"sp_\"]")) {
              setTimeout(() => {
                try {
                  LiveInitBindings();
                } catch (_0x1a0830) {}
              }, 120);
            }
          } catch (_0x222fe0) {}
        };
        _0x599167.addEventListener("click", _0x190441);
        LiveState._navListenerAttached = true;
        LiveState._navHandler = _0x190441;
      }
    } catch (_0x32e872) {}
  } catch (_0x415564) {}
  LiveState.initialized = true;
}
function LiveCleanupBindings() {
  try {
    const _0x1b5a2a = getLiveHostDocument().doc;
    try {
      _0x1b5a2a.removeEventListener("pointerdown", LivePointerDown);
    } catch (_0x50bdb4) {}
    try {
      _0x1b5a2a.removeEventListener("pointermove", LivePointerMove);
    } catch (_0x463df0) {}
    try {
      _0x1b5a2a.removeEventListener("pointerup", LivePointerUp);
    } catch (_0x21bc2e) {}
    try {
      _0x1b5a2a.removeEventListener("pointercancel", LivePointerUp);
    } catch (_0x53bc4a) {}
    try {
      _0x1b5a2a.removeEventListener("touchstart", LivePointerDown);
    } catch (_0x3e89a2) {}
    try {
      _0x1b5a2a.removeEventListener("touchmove", LivePointerMove);
    } catch (_0x38f09b) {}
    try {
      _0x1b5a2a.removeEventListener("touchend", LivePointerUp);
    } catch (_0x2c9a86) {}
    try {
      window.removeEventListener("resize", LiveUpdate);
    } catch (_0x526d2b) {}
    try {
      if (LiveState._navListenerAttached && LiveState._navHandler) {
        try {
          _0x1b5a2a.removeEventListener("click", LiveState._navHandler);
        } catch (_0x1a6a0a) {}
        LiveState._navListenerAttached = false;
        LiveState._navHandler = null;
      }
    } catch (_0x264ecc) {}
  } catch (_0x295f1a) {}
  LiveState.initialized = false;
}
window.isRinging = false;
(function () {
  function _0x6a5f54(_0x5e21fb) {
    try {
      if (_0x5e21fb.target && _0x5e21fb.target.closest ? _0x5e21fb.target.closest("[id^=\"sp_\"]") : null) {
        setTimeout(() => {
          try {
            LiveInitBindings();
          } catch (_0x45869d) {}
        }, 120);
      }
    } catch (_0x47327a) {}
  }
  try {
    document.addEventListener("click", _0x6a5f54, true);
    window.__xat_live_nav_handler = _0x6a5f54;
  } catch (_0x1b8d6b) {}
})();
const LiveControls = {
  state: null
};
function initLiveControls(_0x3af654) {
  try {
    LiveCleanupBindings();
  } catch (_0x44811b) {}
  try {
    LiveInitBindings();
  } catch (_0x2926fb) {}
}
function cleanupLiveControls() {
  try {
    LiveCleanupBindings();
  } catch (_0xb2739a) {}
}
function sendLiveCommand(_0x54a493, _0x2ffe85 = 0, _0x4bac57 = 30012) {
  try {
    _Activity.SendC("xatCommand", "", JSON.stringify({
      Command: "lcAppToChat",
      channel: _0x4bac57,
      user: _0x2ffe85,
      msg: _0x54a493
    }));
  } catch (_0x4d96a5) {}
}
function liveAppEncode(_0x448079) {
  if (!_0x448079) {
    return "";
  }
  try {
    return btoa([...btoa(_0x448079)].map(_0x3d2279 => String.fromCharCode(_0x3d2279.charCodeAt(0) ^ 88)).join(""));
  } catch {
    return "";
  }
}
function liveAppDecode(_0x3e376c) {
  if (!_0x3e376c) {
    return "";
  }
  try {
    return atob([...atob(_0x3e376c)].map(_0x35666e => String.fromCharCode(_0x35666e.charCodeAt(0) ^ 88)).join(""));
  } catch {
    return "";
  }
}
function saveLiveAppConsent(_0x205661) {
  try {
    _Activity.SendC("xatCommand", "", JSON.stringify({
      Type: "Setting",
      Command: "Setting",
      Name: "LiveAppConsent",
      Value: _0x205661 ? "1" : "0"
    }));
    setTimeout(() => {
      _Activity.SendC("xatCommand", "", JSON.stringify({
        Command: "DoReload"
      }));
    }, 3000);
  } catch (_0x374a62) {}
}
function isLiveAppConsentAccepted() {
  const _0x39327d = "xatLive.privacyConsent";
  const _0x8ae465 = _Activity.instance?.UserSettings?.LiveAppConsent;
  let _0x43cfb2 = localStorage.getItem(_0x39327d);
  if (_0x8ae465 === "0" || _0x8ae465 === "1") {
    _0x43cfb2 = _0x8ae465 !== "0" ? "true" : "false";
    localStorage.setItem(_0x39327d, _0x43cfb2);
  } else if (_0x43cfb2 !== null) {
    saveLiveAppConsent(_0x43cfb2 === "true" ? "1" : "0");
  }
  if (_0x43cfb2 === null) {
    return "missing";
  } else {
    return _0x43cfb2 === "true";
  }
}
function closeLiveApp() {
  const _0x44ec69 = getLiveHostDocument();
  let _0x3b5797 = _0x44ec69.doc;
  let _0x4ac58a = _0x44ec69.container;
  let _0x44de18 = _0x3b5797.querySelector("#livePlayer");
  try {
    LiveCleanupBindings();
  } catch (_0x374421) {}
  if (_0x44de18) {
    _0x44de18.innerHTML = "";
  }
  if (_0x4ac58a) {
    _0x4ac58a.style.display = "none";
  }
  setAppIcon(0);
}
function handleLiveApp(_0x3a912f = false, _0x418bf2 = false) {
  if (isLiveAppConsentAccepted() !== true) {
    localStorage.removeItem("xatLive.data");
    setTimeout(() => liveAppRequestConsent(0, 0), 300);
    return;
  }
  setAppIcon(30012);
  let _0x179c2a = liveModeType() || "popup";
  if (!liveIsClassic || !!_0x3a912f) {
    _0x179c2a = "popup";
  }
  if (_0x179c2a === "app") {
    return openApp("live");
  }
  try {
    window.parent.parent.document.querySelector("#closeApp")?.click();
  } catch {}
  const _0x3af84c = getLiveHostDocument();
  let _0x50d164 = _0x3af84c.doc;
  let _0x3e0354 = _0x3af84c.container;
  let _0x12b3d7 = _0x50d164.querySelector("#liveResize");
  let _0xcab51b = _0x50d164.querySelector("#liveToolBar");
  let _0x3c7eee = _0x50d164.querySelector("#livePlayer");
  let _0x58e97e = _0x50d164.querySelector("#liveTitle");
  if (_0x3c7eee) {
    const _0x109c36 = JSON.parse(liveAppDecode(localStorage.getItem("xatLive.data")) || "{}");
    let _0x48960a = window?.parent?.parent?.xConfig?.dir;
    if (!_0x48960a) {
      let _0x2f0356 = window.parent.parent.document.getElementById("xjson");
      _0x2f0356 = JSON.parse(_0x2f0356.innerHTML);
      _0x48960a = _0x2f0356.dir;
    }
    const _0xa9e26 = "http://localhost:6969" + _0x48960a;
    const _0x1dd5a4 = _0x50d164.createElement("iframe");
    _0x1dd5a4.style.cssText = "border:none; width:100%; height:100%; border-radius:8px; overflow:hidden;";
    _0x1dd5a4.src = _0xa9e26 + "/apps/live/live.html#!standalone";
    _0x3c7eee.innerHTML = "";
    _0x3c7eee.appendChild(_0x1dd5a4);
    _0x1dd5a4.onload = () => {
      if (_0x418bf2 && _0x109c36.roomId && _0x109c36.xatid) {
        setTimeout(() => sendLiveCommand("C_" + _0x109c36.roomId, _0x109c36.xatid), 1000);
      }
    };
  }
  if (!_0x3e0354) {
    return false;
  }
  _0x3e0354.style.display = "block";
  if (_0x58e97e) {
    _0x58e97e.innerHTML = "xatLive";
  }
  if (!Classic) {
    _0xcab51b.style.top = "0px";
    _0xcab51b.style.opacity = "1";
  }
  addToolTip(_0x12b3d7, ["mob2.resize", "Drag to resize"], {
    position: "low"
  });
  LiveInitBindings();
  const _0x5738e5 = _0x50d164.querySelector("#liveSet");
  if (_0x5738e5) {
    _0x5738e5.style.display = "none";
  }
  const _0x2f13ec = _0x50d164.querySelector("#liveSwitch");
  if (_0x2f13ec) {
    _0x2f13ec.style.display = "none";
  }
  _0x3e0354.style.width = "230px";
  _0x3e0354.style.height = "275px";
  _0x3e0354.style.left = (window.innerWidth - 230) / 2 + "px";
  _0x3e0354.style.top = (window.innerHeight - 275) / 2 + "px";
  LiveUpdate();
}
function livePlayAudio(_0x187a76) {
  if (!isRingingSoundOn()) {
    return false;
  }
  let _0x56c40b = window?.parent?.parent?.xConfig?.dir;
  if (!_0x56c40b) {
    let _0x29f12c = window.parent.parent.document.getElementById("xjson");
    _0x29f12c = JSON.parse(_0x29f12c.innerHTML);
    _0x56c40b = _0x29f12c.dir;
  }
  const _0x2704cc = "http://localhost:6969" + _0x56c40b;
  try {
    callingSound = new _Activity.instance.Window.Howl({
      src: [_0x2704cc + "/apps/live/snd/" + _0x187a76 + ".mp3"],
      html5: true,
      volume: 1
    });
    callingSound.play();
  } catch (_0x4875c0) {}
}
function liveStopAudio() {
  if (callingSound) {
    callingSound.stop();
    callingSound = null;
  }
}
function createCallModal(_0x7dd3f3, _0x4a8c29) {
  const {
    title: _0x5a3649 = "",
    content: _0x1efca9 = "",
    showCloseButton: _0x48ce0a = false,
    onClose: _0x5ddf8c = null,
    buttons: _0x1b5a10 = [],
    isClassic: _0x1e3f94 = false
  } = _0x4a8c29;
  if (_0x1e3f94) {
    const _0x504339 = makeElement(null, "div");
    const _0x296309 = makeElement(_0x504339, "div", "CallDialog");
    const _0x1ee28e = makeElement(_0x296309, "div", "AnnounceHeaFoo");
    const _0x58c49e = makeElement(_0x1ee28e, "span", "dialogTitle link NewDialogTitle", "openLink");
    const _0x3cb063 = makeElement(_0x296309, "div", "AnnounceBody");
    const _0x59f3a3 = makeElement(_0x3cb063, "div", "dialogPadding");
    const _0x1180fd = makeElement(_0x59f3a3, "div", "", "wrapper");
    if (_0x5a3649) {
      addText(_0x58c49e, _0x5a3649, true);
    }
    if (_0x48ce0a) {
      addText(_0x58c49e, "<img class=\"call-close-btn\" src=\"svg/CloseBtn.svg\">", true);
    }
    _0x1180fd.innerHTML = _0x1efca9;
    HiddenDivs.AlertDialog = _0x504339.innerHTML;
    const _0x191214 = doModal("AlertDialog", {}, true, true);
    _0x1b5a10.forEach(_0x5293bd => {
      const _0x210349 = document.querySelector(_0x5293bd.selector);
      if (_0x210349) {
        _0x210349.addEventListener("click", _0x5293bd.onClick);
      }
    });
    if (_0x48ce0a) {
      const _0x2d4b85 = document.querySelector(".call-close-btn");
      if (_0x2d4b85) {
        _0x2d4b85.addEventListener("click", modalClose);
      }
    }
    return {
      close: modalClose,
      frame: _0x191214
    };
  }
  {
    const _0x4030fc = mobileModal(_0x7dd3f3, "\n            <div class=\"AnnounceHeaFoo\">\n                <span class=\"dialogTitle link NewDialogTitle\" id=\"openLink\">\n                    " + _0x5a3649 + "\n                    " + (_0x48ce0a ? "<img class=\"call-close-btn\" src=\"svg/CloseBtn.svg\">" : "") + "\n                </span>\n            </div>\n            <div class=\"AnnounceBody\">\n                <div class=\"dialogPadding\">\n                    <div id=\"wrapper\">\n                        " + _0x1efca9 + "\n                    </div>\n                </div>\n            </div>\n        ", _0x5ddf8c);
    _0x1b5a10.forEach(_0x3efaf5 => {
      const _0x355cf2 = _0x7dd3f3.querySelector(_0x3efaf5.selector);
      if (_0x355cf2) {
        _0x355cf2.addEventListener("click", _0x3efaf5.onClick);
      }
    });
    if (_0x48ce0a) {
      const _0x4e03dd = _0x7dd3f3.querySelector(".call-close-btn");
      if (_0x4e03dd) {
        _0x4e03dd.addEventListener("click", _0x4030fc.close);
      }
    }
    return _0x4030fc;
  }
}
function mobileModal(_0x2e4086, _0x5b2ccd, _0x3d2681) {
  const _0xeb0c84 = makeElement(null, "div");
  const _0x17c27c = makeElement(_0xeb0c84, "div", "CallDialog");
  _0x17c27c.innerHTML = _0x5b2ccd;
  _0xeb0c84.className = "modalDialog AnnounceFrame";
  _0xeb0c84.id = "openModal";
  _0xeb0c84.style.opacity = "1";
  _0xeb0c84.style.pointerEvents = "auto";
  _0xeb0c84.style.position = "relative";
  _0xeb0c84.style.top = "20vh";
  _0xeb0c84.style.height = "100%";
  _0xeb0c84.style.alignItems = "start";
  _0xeb0c84.style.zIndex = "9999";
  _0xeb0c84.style.margin = "30px";
  const _0x378b64 = _0x2e4086.querySelector("#openModal");
  if (_0x378b64) {
    _0x378b64.remove();
  }
  _0x2e4086.body.appendChild(_0xeb0c84);
  _0x17c27c.addEventListener("click", _0x54447d => {
    _0x54447d.stopPropagation();
  });
  return {
    modal: _0xeb0c84,
    modalDialog: _0x17c27c,
    close: () => {
      const _0x7504cb = _0x2e4086.querySelector("#openModal");
      if (_0x7504cb) {
        _0x7504cb.remove();
      }
      if (_0x3d2681) {
        _0x3d2681();
      }
    }
  };
}
function showConsentResultModal(_0x379f1c, _0x2e3288, _0x6aeecf) {
  createCallModal(getLiveHostDocument().doc, {
    title: "<img class=\"call-title\" src=\"img/xatlive.png\">",
    content: "\n        <div class=\"call-wrapper\" style=\"margin-top: -20px;\">\n            <img class=\"consent-result-icon\" alt=\"Privacy Consent\" src=\"svg/call/" + (_0x6aeecf ? "approve" : "decline") + ".svg\">\n            <p class=\"call-status\">\n                <h4>" + (_0x6aeecf ? "Consent Accepted" : "Consent Declined") + "</h4>\n            </p>\n            <p class=\"call-consent-text\">" + (_0x6aeecf ? _0x379f1c == 0 || _0x2e3288 == 0 ? "You can now make calls using Live app. Voice and video calling is now enabled for your account." : "You can now call <strong>" + _0x379f1c + "</strong> (<strong>" + _0x2e3288 + "</strong>) back or ask them to call you again. Voice and video calling is now enabled for your account." : "Voice and video calling has been disabled. You can change this decision anytime in the Live app settings if you want to enable calling features.") + "\n            </p>\n        </div>\n    ",
    showCloseButton: true,
    isClassic: liveIsClassic
  });
}
function liveAppRequestConsent(_0x5ae6bc, _0x5a5b53) {
  const _0xed21b6 = _0x245c09 => {
    isConsentModalOpen = false;
    localStorage.setItem("xatLive.privacyConsent", _0x245c09 ? "true" : "false");
    saveLiveAppConsent(_0x245c09);
    if (liveIsClassic) {
      modalClose();
    } else {
      const _0x18cacf = document.querySelector("#openModal") || document.querySelector("iframe")?.contentDocument?.querySelector("#openModal");
      if (_0x18cacf) {
        _0x18cacf.remove();
      }
    }
    setTimeout(() => {
      showConsentResultModal(_0x5ae6bc, _0x5a5b53, _0x245c09);
    }, 200);
  };
  createCallModal(getLiveHostDocument().doc, {
    title: "<img class=\"call-title\" src=\"img/xatlive.png\">",
    content: "\n        <div class=\"call-wrapper\" style=\"margin-top: -20px;\">\n            <p class=\"call-status\">\n                <h4>Privacy Consent</h4>\n            </p>\n            <p class=\"call-consent-text\">\n                By starting a voice or video call, our Live app will access your microphone and camera. \n                All calls are end-to-end encrypted, and we do not record or store any audio or video. \n                For additional information, please see our <a href=\"http://localhost:6969/privacy\" target=\"_blank\" rel=\"noopener noreferrer\">Privacy Policy</a>.\n            </p>\n            <div class=\"call-buttons\">\n                <button class=\"call-btn call-consent-accept\">Accept</button>\n                <button class=\"call-btn call-consent-decline\">Decline</button>\n            </div>\n            <p class=\"call-consent-note\">You can withdraw your consent at any time in the Live app settings.</p>\n        </div>\n    ",
    isClassic: liveIsClassic,
    buttons: [{
      selector: ".call-consent-accept",
      onClick: () => _0xed21b6(true)
    }, {
      selector: ".call-consent-decline",
      onClick: () => _0xed21b6(false)
    }]
  });
}
function sendStopCall(_0x65b3bc) {
  sendLiveCommand("C_CANCEL", _0x65b3bc);
  sendLiveCommand(0, _0x65b3bc, 0);
}
function receivingCall(_0x293240, _0x3bd736, _0x3cecf9, _0x4eae14, _0x62e086) {
  if (!isLiveAppConsentAccepted() || getBlockedUsers()[_0x293240] || isConsentModalOpen) {
    return;
  }
  if (isLiveAppConsentAccepted() === "missing") {
    isConsentModalOpen = true;
    localStorage.removeItem("xatLive.data");
    sendLiveCommand("DC_" + _0x3bd736, _0x293240);
    sendLiveCommand(0, _0x293240, 0);
    setAppIcon(0);
    return liveAppRequestConsent(_0x3cecf9, _0x293240);
  }
  if (_0x3bd736 === "CANCEL" && window.isRinging) {
    window.isRinging = false;
    liveStopAudio();
    closeLiveApp();
    localStorage.removeItem("xatLive.data");
    modalClose();
    return;
  }
  const _0x132a2c = localStorage.getItem("xatLive.isRunning") === "true";
  if (_0x3bd736.length < 29 || window.isRinging || _0x132a2c) {
    return;
  }
  window.isRinging = true;
  const _0x4fe7c0 = makeElement(null, "div");
  const _0x58074c = makeElement(_0x4fe7c0, "div", "CallDialog");
  const _0x2b9a72 = makeElement(_0x58074c, "div", "AnnounceHeaFoo");
  const _0x2b288d = makeElement(_0x2b9a72, "span", "dialogTitle link NewDialogTitle", "openLink");
  const _0x223b1f = makeElement(_0x58074c, "div", "AnnounceBody");
  const _0x4d202b = makeElement(_0x223b1f, "div", "dialogPadding");
  const _0xb64a9f = makeElement(_0x4d202b, "div", "", "wrapper");
  addText(_0x2b288d, "<img class=\"call-title\" src=\"img/xatlive.png\">", true);
  addText(_0x2b288d, "<img class=\"call-title\" id=\"call-profile\" src=\"svg/call/userarrow-white.svg\">", true);
  _0xb64a9f.innerHTML = "\n        <div class=\"call-wrapper\">\n            <div class=\"call-avatar\"></div>\n            <h2 class=\"call-name\">" + _0x3cecf9 + "</h2>\n            <h4 class=\"call-id\">(" + _0x293240 + ")</h4>\n            <p class=\"call-status\">incoming call...</p>\n            <div class=\"call-buttons\">\n                <button class=\"call-btn call-voiceOnly\"></button>\n                <button class=\"call-btn call-accept\"></button>\n                <button class=\"call-btn call-decline\"></button>\n            </div>\n        </div>\n    ";
  _0x58074c.dataset.w = 0.24;
  _0x58074c.dataset.maxw = 400;
  _0x58074c.dataset.mw = 240;
  HiddenDivs.AlertDialog = _0x4fe7c0.innerHTML;
  doModal("AlertDialog", {}, true, true);
  addToolTip(document.querySelector("#call-profile"), "Open caller profile (closes this window)", {
    position: "low",
    instant: true
  });
  const _0x3227a2 = _0x4eae14.startsWith("(") && _0x4eae14.endsWith(")");
  const _0x218d62 = document.querySelector(".call-avatar");
  _0x218d62.innerHTML = "";
  _Activity.Avatars.MakeAvatar(_0x218d62, _0x4eae14, {
    size: _0x3227a2 ? 20 : 30,
    hasAnimate: true,
    hasShuffle: false,
    className: "call-avatar-img"
  });
  livePlayAudio("calling");
  const _0xe5ef41 = setTimeout(() => {
    localStorage.removeItem("xatLive.data");
    window.isRinging = false;
    liveStopAudio();
    clearTimeout(_0xe5ef41);
    modalClose();
  }, 15000);
  let _0xab525b;
  let _0x197540;
  let _0x518e0c;
  try {
    const _0x30a0a9 = JSON.parse(localStorage.getItem("todo") || "{}");
    _0xab525b = _0x30a0a9.w_registered || _0x30a0a9.w_userno;
    _0x197540 = _0x30a0a9.w_avatar || "";
    _0x518e0c = _0x30a0a9.w_userno || 0;
  } catch {
    _0xab525b = "You";
    _0x197540 = "";
    _0x518e0c = 0;
  }
  const _0x1c2357 = () => {
    sendLiveCommand("DC_" + _0x3bd736, _0x293240);
    sendLiveCommand(0, _0x293240, 0);
    localStorage.removeItem("xatLive.data");
    setAppIcon(0);
  };
  const _0x2ce452 = _0x193588 => {
    localStorage.setItem("xatLive.data", liveAppEncode(JSON.stringify({
      action: "join",
      roomId: _0x3bd736,
      name: _0x3cecf9,
      xatid: _0x293240,
      avatarUrl: _0x4eae14,
      myName: _0xab525b,
      myXatId: _0x518e0c,
      myAvatarUrl: _0x197540,
      enableVideo: _0x193588,
      powers: _0x62e086
    })));
    handleLiveApp();
  };
  [{
    selector: "#call-profile",
    action: () => {
      _0x1c2357();
      setTimeout(() => classicSetDialog("actions", _0x293240), 0);
    }
  }, {
    selector: ".call-decline",
    action: () => _0x1c2357()
  }, {
    selector: ".call-accept",
    action: () => _0x2ce452(true)
  }, {
    selector: ".call-voiceOnly",
    action: () => _0x2ce452(false)
  }].forEach(_0x13ea4c => {
    let {
      selector: _0x16b2e0,
      action: _0x467a2f
    } = _0x13ea4c;
    return document.querySelector(_0x16b2e0)?.addEventListener("click", () => {
      _0x467a2f();
      window.isRinging = false;
      liveStopAudio();
      clearTimeout(_0xe5ef41);
      modalClose();
    });
  });
}
let xAreaMob = document.querySelectorAll(".xAreaMob");
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && xAreaMob) {
  for (var i = 0; i < xAreaMob.length; i++) {
    xAreaMob[i].classList.add("xAreaMobAct");
  }
}
function customModalWithMsg(_0x1ffb6d, _0x2406f9, _0x4dde09, _0x2bdfc9, _0xb2c687) {
  let _0x15e3a8 = makeElement(null, "div");
  let _0x14970d = makeElement(_0x15e3a8, "div", _0x2bdfc9 ? "AnnounceDialog" : "modalDialogContentClassic");
  let _0x25b1b7 = makeElement(_0x14970d, "div", _0x2bdfc9 ? "AnnounceHeaFoo" : "dialogTitleBar NewTitleBar");
  let _0x8ee34e = makeElement(_0x14970d, "img", "AnnounceFooLogo");
  let _0x339ab8 = makeElement(_0x25b1b7, "span", "dialogTitle link NewDialogTitle", "openLink");
  let _0x567c40 = makeElement(_0x14970d, "div", _0x2bdfc9 ? "AnnounceBody" : "dialogBody NewdialogBody");
  let _0x4ff5bb = makeElement(_0x567c40, "div", "dialogPadding");
  let _0x452e74 = makeElement(_0x4ff5bb, "div", _0x2bdfc9 ? "" : "wrapper", "wrapper");
  let _0x55bc6a = document.querySelector("#FrameBack");
  if (_0x2bdfc9) {
    _0x8ee34e.src = "svg/xatlogo.svg";
    _0x8ee34e.alt = "xat";
    _0x8ee34e.width = "65";
  }
  if (_0x4dde09) {
    const _0x1d581f = _0xb2c687 ? Classic ? "svg/remove" + (toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg" : "svg/removew.svg" : _0x2bdfc9 ? "svg/removew.svg" : "svg/removeb.svg";
    let _0x3291b0 = makeElement(null, "img");
    _0x3291b0.src = _0x1d581f;
    _0x3291b0.alt = "close";
    _0x3291b0.width = _0x2bdfc9 ? "11" : "16";
    _0x3291b0.classList.add("closeAnnounceImg");
    makeElement(_0x25b1b7, "span", _0x2bdfc9 ? "AnnounceClose" : "dialogTitleAction", "id_ModalClose_custom").appendChild(_0x3291b0);
  }
  if (_0xb2c687) {
    _0x14970d.classList.add("gpModal");
    _0x55bc6a?.classList?.remove("d-none");
  }
  addText(_0x339ab8, _0x2bdfc9 ? "" : _0x1ffb6d);
  _0x14970d.dataset.w = _0xb2c687 ? 0.9 : 0.6;
  addText(_0x452e74, _0x2bdfc9 ? atob(_0x2406f9) : _0x2406f9, !!_0x2bdfc9);
  HiddenDivs.AlertDialog = _0x15e3a8.innerHTML;
  doModal("AlertDialog", {}, true, true);
  document.querySelector("#id_ModalClose_custom")?.addEventListener("click", () => {
    modalClose();
    if (_0xb2c687) {
      _0x55bc6a?.classList?.add("d-none");
    }
    if (_0x2bdfc9) {
      updateAnnounceStorage(_0x2406f9);
    }
  });
}
function setAnnounce(_0x56313b) {
  let _0x80ef4c = localStorage.getItem("announce_message");
  if (!_0x80ef4c || _0x80ef4c && _0x80ef4c !== _0x56313b) {
    customModalWithMsg("Announcement", _0x56313b, true, true);
  }
  return false;
}
function updateAnnounceStorage(_0x487fd5) {
  if (_Activity.instance.IsClassic || !_Activity.instance.IsClassic && localStorage.getItem("mobCookies") == 1) {
    return localStorage.setItem("announce_message", _0x487fd5);
  }
}
function replaceBrakets(_0xce3c4c) {
  if (!_0xce3c4c) {
    return "";
  }
  if (_0xce3c4c.indexOf("[") >= 0 && _0xce3c4c.indexOf("❯") >= 0) {
    let _0x25857c = /❯.*\[.*?\]/g;
    let _0x1ba9ab = /\s+(?![^\[]*\]|[^(]*\)|[^\{]*})/;
    let _0x11734d = _0xce3c4c.split(_0x1ba9ab);
    if (_0x11734d.length > 0) {
      for (let _0x29617d in _0x11734d) {
        if (_0x11734d[_0x29617d].match(_0x25857c)) {
          _0x11734d[_0x29617d] = _0x11734d[_0x29617d].replace(_0x25857c, "");
        }
      }
    }
    return _0x11734d.join(" ").replace(/\[/gi, "{").replace(/\]/gi, "}");
  }
  return cleanXatTagsIcons(_0xce3c4c.replace(/\[/gi, "{").replace(/\]/gi, "}"));
}
function assignUnassign(_0x46c8b1, _0x28ab19) {
  if (!_0x46c8b1 || ["Assign", "Unassign"].indexOf(_0x28ab19) == -1) {
    return;
  }
  let _0x4fa3fb = _0x46c8b1.value;
  if (_0x4fa3fb) {
    return ToC({
      Type: "Assign",
      p: _0x4fa3fb,
      a: _0x28ab19 == "Assign" ? 1 : 0
    });
  } else {
    return undefined;
  }
}
function updateAllFrame(_0xbc8990) {
  if (!_0xbc8990) {
    return;
  }
  let _0x33bb51 = ["selectorFrame", "settingsFrame", "actionsFrame"];
  for (let _0x54897f in _0x33bb51) {
    let _0x69d359 = findNodeInWindowOrParent("#" + _0x33bb51[_0x54897f]);
    if (!_0x69d359 || !_0x69d359.contentWindow) {
      return;
    }
    let _0x23e27e = _0x69d359.contentWindow;
    if (_0xbc8990 == "enable") {
      if (_0x33bb51[_0x54897f] == "settingsFrame") {
        _0x23e27e.document.body?.querySelector(".wrapper")?.classList.add("darkWrapper");
        _0x23e27e.location.reload();
      } else {
        _0x23e27e.document.body.classList.add("dark");
      }
    } else if (_0x33bb51[_0x54897f] == "settingsFrame") {
      _0x23e27e.document.body?.querySelector(".wrapper")?.classList.remove("darkWrapper");
      _0x23e27e.location.reload();
    } else {
      _0x23e27e.document.body.classList.remove("dark");
    }
  }
}
function setLoader(_0x5c7734, _0x33f869) {
  let _0x32818d = document.querySelector(_0x33f869 ? "#" + _0x33f869 : "#loading");
  if (_0x32818d) {
    if (_0x5c7734) {
      _0x32818d.classList.remove("d-none");
      _0x32818d.innerHTML = "<div id=\"xatLoader\"><div id=\"xatLoaderInner\"><img id=\"planet\" src=\"svg/x.svg\"><img id=\"rocket\" src=\"svg/ss.svg\"></div></div>";
    } else {
      _0x32818d.classList.add("d-none");
      _0x32818d.innerHTML = "";
    }
  }
}
function urlPost(_0x253f61, _0x267b16) {
  return new Promise((_0x4fdeff, _0x2c499a) => {
    let _0x2ff049 = {
      method: "GET"
    };
    if (_0x267b16) {
      _0x2ff049.method = "POST";
      _0x2ff049.body = _0x267b16;
    }
    fetch(_0x253f61, _0x2ff049).then(function (_0x2bd335) {
      return _0x2bd335.json();
    }).then(function (_0x75057c) {
      _0x4fdeff(_0x75057c);
    }).catch(_0x55cf43 => _0x2c499a(_0x55cf43));
  });
}
function specialEvents(_0x54d2db, _0x55bfe8) {
  let _0x10ec9a = false;
  const _0x3fb93f = new Date();
  _0x3fb93f.getDate();
  _0x3fb93f.getMonth();
  if (Array.isArray(_0x54d2db)) {
    for (let _0x4a21a9 in _0x54d2db) {
      specialEvents(_0x54d2db[_0x4a21a9], _0x55bfe8);
    }
  }
  switch (_0x54d2db) {
    case "easter":
    case "xmas":
    case "xatbday":
      break;
    default:
      _0x10ec9a = false;
  }
  if (_0x10ec9a && _0x55bfe8) {
    _0x55bfe8();
  }
}
function initFools() {
  const _0x3f338a = config.GroupName.toLowerCase();
  let _0x530884 = localStorage.getItem("wasFooledList");
  if (!localStorage.getItem("foundFools")) {
    _0x530884 ||= [];
    try {
      _0x530884 = JSON.parse(_0x530884);
    } catch (_0x579511) {
      _0x530884 = [];
    }
    if (_0x530884.indexOf(_0x3f338a) == -1) {
      _0x530884.push(_0x3f338a);
      setTimeout(() => {
        xrRoot.document.body.animate([{
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
        }).addEventListener("finish", () => {
          xrRoot.document.body.style.filter = "grayscale(1)";
          localStorage.setItem("wasFooledList", JSON.stringify(_0x530884));
          customModalWithMsg(null, btoa("<div style=\"font-weight: 600; text-align: center;\"><img style=\"display:block; margin: 0 auto\" src=\"../gameban/codeban/assets/smilies/72.png\" /><br /><br />Oops! Lights are off. This chatroom does not have sufficient energy to power up. Please check <a target=\"_blank\" href=\"http://localhost:6969/store\">localhost:6969/store</a> for energy supply powers.</div>"), true, true);
        });
      }, 10000);
    } else {
      xrRoot.document.body.style.filter = "grayscale(1)";
    }
  }
}
function stopFools() {
  if (!localStorage.getItem("foundFools")) {
    xrRoot.document.body.style.filter = "none";
    customModalWithMsg(null, btoa("<div style=\"font-weight: 600; text-align: center; color: white;\"><img style=\"display:block; margin: 0 auto\" src=\"../gameban/codeban/assets/smilies/58.png\" /><br /><br />Lights on! Your chat has been powered up with energy. April Fools!\n</div>"), true, true);
    localStorage.setItem("foundFools", "1");
  }
}
function filter(_0x4586d6) {
  if (isNaN(_0x4586d6) && _0x4586d6 !== undefined) {
    _0x4586d6 = _0x4586d6.replace(new RegExp("['\"<>&]", "gi"), "").replace(/\\/gi, "");
  }
  return _0x4586d6;
}
function isValidHex(_0x510456) {
  return /^#[0-9A-F]{6}$/i.test(_0x510456);
}
function cleanXatTagsIcons(_0x53235b) {
  if (_0x53235b) {
    return _0x53235b.replace(/<priv>/gi, "").replace(/❮priv❯/gi, "").replace(/<inf8>/gi, "").replace(/❮inf8❯/gi, "").replace(/<i>/gi, "").replace(/❮i❯/gi, "").replace(/<in>/gi, "").replace(/❮in❯/gi, "");
  } else {
    return "";
  }
}
function isXatBirthday(_0xcbe98b = false) {
  const _0x438bc8 = new Date();
  const _0x53fc95 = _0x438bc8.getDate();
  return (_0xcbe98b ? _0x53fc95 == 17 : _0x53fc95 >= 15 && _0x53fc95 < 19) && _0x438bc8.getMonth() + 1 == 9;
}
function reduceTextLength(_0x14a546) {
  if (!_0x14a546) {
    return "";
  }
  let _0x2accf0 = 256;
  const _0x25534a = _0x14a546.toLowerCase();
  if (_0x25534a.includes("(stick#") || _0x25534a.includes("#stick#")) {
    _0x2accf0 = 512;
  }
  if (_0x14a546.length > _0x2accf0) {
    return _0x14a546.substring(0, _0x2accf0);
  } else {
    return "";
  }
}
function handleMaxLength(_0x548c41, _0x38fe76) {
  return !(_0x38fe76.textContent.length >= 256) || _0x548c41.code == "Backspace" || _0x548c41.code == "Delete" || _0x548c41.code == "Space" || _0x548c41.code == "ArrowLeft" || _0x548c41.code == "ArrowRight" || _0x548c41.code == "ArrowUp" || _0x548c41.code == "ArrowDown" || _0x548c41.code == "Home" || _0x548c41.code == "End" || _0x548c41.code == "ControlLeft" || !!_0x548c41.ctrlKey && (_0x548c41.code == "KeyA" || _0x548c41.code == "KeyE" || _0x548c41.code == "KeyV" || _0x548c41.code == "KeyC" || _0x548c41.code == "KeyX") || (_0x548c41.preventDefault(), false);
}
function setPageAndSendTtth(_0x44cb41 = null) {
  loadKiss("Ttth", _0x44cb41);
  setTimeout(() => {
    _Activity?.instance?.SetPage("chats");
  }, 1000);
}
function returnOwnedPowers() {
  let _0x497e1b = [];
  const _0x9236de = _Activity?.instance;
  const _0x1fca4b = _0x9236de?.PSSA;
  const _0x58ea1f = _0x9236de?.TOPSH;
  const _0x55063e = _0x9236de?.UCOLLECTIONS;
  if (_0x1fca4b) {
    const _0x5023dc = _0x1fca4b.filter((_0x36f08e, _0x15502c) => hasPower(_0x15502c - 1) || _0x55063e[_0x15502c - 1]);
    _0x497e1b.push(..._0x5023dc);
  }
  if (_0x58ea1f) {
    for (const [_0x2450eb, _0x375595] of Object.entries(_0x58ea1f)) {
      if ((hasPower(_0x375595) || _0x55063e[_0x375595]) && _0x375595 > 45) {
        _0x497e1b.push(_0x2450eb);
      }
    }
  }
  return _0x497e1b;
}
function hasMobCookiesEnabled() {
  if (_Activity.instance.IsClassic) {
    return true;
  }
  const _0x1bd87e = localStorage.getItem("todo");
  if (_0x1bd87e == null || !_0x1bd87e.length) {
    return false;
  }
  try {
    return localStorage.getItem("mobCookies") == 1;
  } catch (_0x2b9e60) {
    return false;
  }
}
function focusAndPutCaretAtPosition(_0x28fe33, _0x44cc1b) {
  if (!_0x28fe33) {
    return;
  }
  _0x28fe33.focus();
  const _0x58e2c2 = document.createRange();
  const _0xcd9f45 = window.getSelection();
  let _0x35d6bb = _0x28fe33;
  let _0x28fafa = _0x44cc1b;
  while (_0x35d6bb && _0x28fafa > 0) {
    if (_0x35d6bb.nodeType === 3) {
      if (_0x35d6bb.length >= _0x28fafa) {
        _0x58e2c2.setStart(_0x35d6bb, _0x28fafa);
        _0x58e2c2.collapse(true);
        break;
      }
      _0x28fafa -= _0x35d6bb.length;
    } else {
      _0x35d6bb = _0x35d6bb.firstChild;
    }
    if (!_0x35d6bb) {
      break;
    }
  }
  _0xcd9f45.removeAllRanges();
  _0xcd9f45.addRange(_0x58e2c2);
}
function insertTextAtCaret(_0x323d75, _0x4a299c, _0x44a173 = false) {
  if (!_0x4a299c) {
    return;
  }
  const _0x33b903 = _0x323d75.replace(/<\/?[^>]+(>|$)/g, "");
  if (!_0x4a299c.innerText.trim().length) {
    _0x4a299c.innerHTML = "";
  }
  if (window.getSelection) {
    const _0x371da4 = window.getSelection();
    let _0x5d734b;
    if (_0x371da4.rangeCount > 0 && _0x4a299c.contains(_0x371da4.anchorNode)) {
      _0x5d734b = _0x371da4.getRangeAt(0);
    } else {
      _0x5d734b = document.createRange();
      _0x5d734b.selectNodeContents(_0x4a299c);
      _0x5d734b.collapse(false);
    }
    _0x5d734b.deleteContents();
    const _0x5e3d9f = document.createTextNode(_0x33b903);
    try {
      _0x5d734b.insertNode(_0x5e3d9f);
    } catch (_0x5b9278) {
      document.execCommand("insertText", false, _0x33b903);
      return;
    }
    _0x5d734b.setStartAfter(_0x5e3d9f);
    _0x5d734b.setEndAfter(_0x5e3d9f);
    _0x371da4.removeAllRanges();
    _0x371da4.addRange(_0x5d734b);
  } else if (document.selection && document.selection.createRange) {
    _0x4a299c.focus();
    document.selection.createRange().text = _0x33b903;
  }
  _0x4a299c.focus();
  if (_0x44a173) {
    _0x4a299c.dispatchEvent(new CustomEvent("checkScroll"));
  }
}
function getAvatarFrameUrl(_0x4b45c4) {
  return "http://localhost:6969/images/avframes/" + _0x4b45c4 + ".webp";
}
function getAvatarEffectUrl(_0x56a42e, _0x18b537, _0x65d8ef) {
  return "http://localhost:6969/web_gear/chat/avatareffects.php?e=" + _0x56a42e + "&f=" + (_0x65d8ef !== undefined ? _0x65d8ef : 15) + "&c=" + (_0x18b537 || "").replace("#", "");
}
function initAvatarEffect(_0x3dfa71, _0x189f10, _0xd118e6) {
  const _0x4841a5 = _0xd118e6 !== undefined && _0xd118e6 != null && typeof _0xd118e6 == "object" ? _0xd118e6 : _0x3dfa71.avatarEffect || {};
  const _0x33cf06 = _0x4841a5 && _0x4841a5.avatarframe;
  const _0x4b1e9b = _0x4841a5 && _0x4841a5.avatareffect;
  const _0x53bb5a = _0x4841a5 && (_0x4841a5.avatarrounded === "true" || _0x4841a5.avatarrounded === true);
  function _0x5ae62d(_0x47ca9a) {
    const _0x580085 = _0x47ca9a || _0x189f10;
    const _0x2a191c = _0x189f10.style.backgroundImage || typeof getComputedStyle != "undefined" && getComputedStyle(_0x189f10).backgroundImage;
    if (!_0x2a191c || _0x2a191c === "none") {
      return;
    }
    let _0x21b69d = _0x580085.querySelector(".avInner");
    if (!_0x21b69d) {
      _0x21b69d = document.createElement("div");
      _0x21b69d.className = "avInner";
      _0x580085.insertBefore(_0x21b69d, _0x580085.firstChild);
    }
    _0x580085.style.setProperty("--av-inner-bg", _0x2a191c);
    _0x580085.style.setProperty("--av-inner-bg-size", "cover");
    _0x580085.style.setProperty("--av-inner-bg-position", _0x189f10.style.backgroundPosition || "center");
    _0x580085.style.setProperty("--av-inner-bg-repeat", "no-repeat");
    _0x189f10.style.backgroundImage = "none";
  }
  if (_0x33cf06) {
    const _0x1b9d2f = _0x4841a5.avatarframe;
    const _0xb909a4 = getAvatarFrameUrl(_0x1b9d2f);
    _0x189f10.classList.add("avBase", "avFrameNew");
    if (_0x189f10.parentElement) {
      _0x189f10.parentElement.style.overflow = "visible";
    }
    _0x189f10.style.setProperty("--av-frame", "url('" + _0xb909a4 + "')");
    let _0x5b73fd = _0x189f10.querySelector(".avCircle");
    if (!_0x5b73fd) {
      _0x5b73fd = document.createElement("div");
      _0x189f10.insertBefore(_0x5b73fd, _0x189f10.firstChild);
    }
    _0x5b73fd.className = _0x53bb5a ? "avCircle avCircleClip" : "avCircle";
    if (_0x4b1e9b) {
      const _0x3d7090 = getAvatarEffectUrl(_0x4841a5.avatareffect, _0x4841a5.avatarcolor, _0x4841a5.avatarspeed);
      _0x5b73fd.classList.add("avBase", "avEffect");
      if (_0x53bb5a) {
        _0x5b73fd.classList.add("avEffectRound");
      }
      _0x5b73fd.style.setProperty("--av-eff", "url('" + _0x3d7090 + "')");
    }
    const _0x26cca1 = String(_0x1b9d2f).toLowerCase();
    const _0x43394f = avatarFrames.find(_0x13ee2a => _0x13ee2a.name === _0x26cca1);
    if (_0x43394f) {
      _0x189f10.style.setProperty("--av-frame-scale", _0x43394f.scale);
    }
    _0x5ae62d(_0x5b73fd);
    let _0x5be6d7 = _0x189f10.querySelector(".avFrameLayer");
    if (!_0x5be6d7) {
      _0x5be6d7 = document.createElement("img");
      _0x5be6d7.className = "avFrameLayer";
      _0x5be6d7.alt = "";
      _0x5be6d7.draggable = false;
      _0x189f10.appendChild(_0x5be6d7);
    }
    _0x5be6d7.src = _0xb909a4;
    const _0x592478 = _0x43394f ? _0x43394f.scale : 1.2;
    _0x5be6d7.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;object-fit:contain;z-index:100;pointer-events:none;border:none;outline:none;display:block;transform:scale(" + _0x592478 + ");transform-origin:center center";
  } else if (_0x4b1e9b) {
    const _0x26c9e4 = getAvatarEffectUrl(_0x4841a5.avatareffect, _0x4841a5.avatarcolor, _0x4841a5.avatarspeed);
    _0x189f10.classList.add("avBase", "avEffect");
    _0x189f10.style.setProperty("--av-eff", "url('" + _0x26c9e4 + "')");
  }
  if (_0x53bb5a && !_0x33cf06) {
    _0x189f10.classList.add("avBase", "avRound", "avEffectRound");
    _0x5ae62d();
  }
}
function xEncodeURIComponent(_0x29523e) {
  return _0x29523e.replace(/[!'()*]/g, function (_0x2e47b9) {
    return "%" + _0x2e47b9.charCodeAt(0).toString(16);
  });
}
const gradientThemes = {
  csPulsar: {
    bgStart: "#2196F3",
    bgEnd: "#8419c1"
  },
  csNova: {
    bgStart: "#3F51B5",
    bgEnd: "#E91E63"
  },
  csMidnight: {
    bgStart: "#000031",
    bgEnd: "#0000bd"
  },
  csStellar: {
    bgStart: "#100d10",
    bgEnd: "#4e178f"
  },
  csAurora: {
    bgStart: "#064a37",
    bgEnd: "#2ab55a"
  },
  csFlare: {
    bgStart: "#e5b90f",
    bgEnd: "#e81b52"
  },
  csMystic: {
    bgStart: "#16b8c9",
    bgEnd: "#7e167f"
  }
};
const borderStyles = {
  rectangle: "0",
  skewedLeft: "1px 50px",
  skewedRight: "50px 10px",
  ellipse: "100px"
};
const smallFontStyles = ["FuzzyBubbles", "Aldrich", "DeliusSwashCaps", "Gabriela", "Courier"];
const setCstyle = function (_0x4ec4d5 = "", _0x2acb62 = false) {
  _0x4ec4d5 ||= _Activity.instance.cStyle;
  const _0x29fe2f = document.querySelectorAll("#visitorsContainer ul li.section, .butcontainer");
  const _0x543c87 = document.querySelectorAll("#visitorsContainer ul li.section");
  const _0x15c668 = document.querySelectorAll(".butcontent:not(.mainButtons)");
  let _0x1eba96 = {};
  try {
    _0x1eba96 = JSON.parse(_0x4ec4d5);
  } catch (_0x4d2226) {
    console.error("Failed:", _0x4d2226);
    return;
  }
  let {
    csTheme: _0x38204c,
    csPool: _0xa96166,
    csFont: _0x2159e6,
    csButtonBorder: _0x5da574,
    csNameFx: _0x242f9e,
    csChatShape: _0x405ba0,
    csChatBorder: _0x3ad7ab,
    csShadow: _0x4b2764,
    csRankBan: _0xbd33c
  } = _0x1eba96;
  const _0x1ba0a0 = gradientThemes[_0x38204c];
  if (_0x1ba0a0 && !_0x2acb62) {
    applyThemeStyles(_0x38204c, _0x29fe2f, _0x543c87, _0xbd33c, _0x15c668);
  } else if (_0xa96166) {
    applyPoolStyles(_0xa96166, _0x543c87, _0xbd33c);
  }
  if (_0x2159e6) {
    applyFontStyles(_0x2159e6, _0x29fe2f, _0x15c668);
  }
  if (borderStyles[_0x5da574]) {
    applyButtonBorder(_0x5da574, _0x29fe2f);
  }
  if (_0x242f9e) {
    applyNameFx(_0x242f9e, _0xa96166, _0x1ba0a0);
  }
  if (_0x405ba0 || _0x3ad7ab || _0x4b2764 && Classic) {
    applyChatBoxStyle(_0x405ba0, _0x3ad7ab, _0x4b2764);
  }
};
function applyPoolStyles(_0x53b529, _0x406088, _0x2fc161) {
  if (!_0x53b529 || !isValidHex(_0x53b529)) {
    return;
  }
  const _0x41c35a = _0x53b529;
  const _0x23bac2 = isColorLight(_0x41c35a) ? "#000" : "#fff";
  _0x406088?.forEach(_0x26167c => {
    const _0x1933c8 = _0x26167c.classList.contains("rank") || _0x26167c.classList.contains("ban");
    if (_0x2fc161 === "true" || !_0x1933c8) {
      _0x26167c.style.backgroundColor = _0x41c35a;
      _0x26167c.style.color = _0x23bac2;
    }
  });
}
function applyThemeStyles(_0x450f09, _0x460898, _0x1d371d, _0x1f7d60, _0x5e1dd9) {
  const {
    bgStart: _0x37120,
    bgEnd: _0xfa76b2
  } = gradientThemes[_0x450f09];
  const _0x2f064a = document.querySelector("#returnBtn");
  const _0x4de241 = parent.Classic ? findNodeInWindowOrParent(".dialogTitleBar") : document.querySelector(".actionsDialog");
  const _0x3919dc = findNodeInWindowOrParent(".dialogTitle");
  const _0x3850b8 = findNodeInWindowOrParent("#removeIcon");
  const _0xe53b92 = document.querySelector("#id_ModalClose_custom img, #modalCancel img, #id_ModalClose img");
  const _0x5cf21a = findNodeInWindowOrParent("#callIcon");
  const _0x1b54d4 = findNodeInWindowOrParent("#reportIcon");
  const _0x2493fd = document.querySelector(".dialogActionRight");
  _0x460898?.forEach(_0xf00e53 => {
    applyGradientStyle(_0xf00e53, _0x37120, _0xfa76b2);
  });
  _0x1d371d?.forEach(_0x2d4dbf => {
    if (_0x1f7d60 === "true") {
      applyGradientStyle(_0x2d4dbf, _0x37120, _0xfa76b2);
    } else if (_0x2d4dbf.classList.contains("rank")) {
      applyGradientStyle(_0x2d4dbf, "#484848", "#a6a6a6");
    } else if (_0x2d4dbf.classList.contains("ban")) {
      applyGradientStyle(_0x2d4dbf, "#462200", "#b95d00");
    } else {
      applyGradientStyle(_0x2d4dbf, _0x37120, _0xfa76b2);
    }
  });
  if (_0x2f064a) {
    returnBtn.style.stroke = "#fff";
  }
  applyTitleBarStyles(_0x4de241, _0x3919dc, _0x3850b8, _0x1b54d4, _0x37120, _0xfa76b2, _0xe53b92, _0x5cf21a);
  applyStyleForEach(_0x5e1dd9, "color", "#fff");
  applyGradientStyle(_0x2493fd, _0x37120, _0xfa76b2);
  ["dialogTitleBar"].forEach(_0x215ef0 => {
    findNodeInWindowOrParent("." + _0x215ef0, true)?.forEach(_0x265028 => {
      const _0x48934e = _0x265028.querySelector(".dialogTitle");
      applyTitleBarStyles(_0x265028, _0x48934e, null, null, _0x37120, _0xfa76b2);
    });
  });
}
function applyFontStyles(_0x57e182, _0x3a604f, _0x5f1ba7) {
  const _0x54e94e = document.querySelectorAll(".butIcons .svgBack");
  applyStyleForEach(_0x3a604f, "fontFamily", _0x57e182);
  if (smallFontStyles.includes(_0x57e182)) {
    applyStyleForEach(_0x5f1ba7, "fontSize", "10px");
    applyStyleForEach(_0x54e94e, "width", "1.3rem");
    applyStyleForEach(_0x54e94e, "height", "1.3rem");
  }
}
function applyButtonBorder(_0x4b6c37, _0x2839b1) {
  const _0x5907b5 = document.querySelectorAll(".butIcons");
  const _0x53451b = _0x4b6c37 === "skewedLeft" || _0x4b6c37 === "skewedRight";
  applyStyleForEach(_0x2839b1, "borderRadius", borderStyles[_0x4b6c37]);
  if (_0x53451b) {
    applyStyleForEach(_0x5907b5, "marginLeft", "6px");
  }
}
function applyNameFx(_0x537b8b, _0x4cb58d, _0x41d459) {
  if (!isValidHex(_0x537b8b)) {
    return;
  }
  const _0x1fa37c = document.querySelector(".grpName .section");
  const _0x540e3e = toHex6(config.ButColW);
  let _0x2efb47;
  if (_0x1fa37c) {
    if (_0x41d459) {
      _0x2efb47 = "ffffff";
    } else if (_0x4cb58d) {
      _0x2efb47 = isColorLight(_0x4cb58d) ? "000000" : "ffffff";
    } else if (_0x540e3e) {
      _0x2efb47 = _0x540e3e;
    }
    _0x1fa37c.style.color = "#" + _0x2efb47 + "63";
    _0x1fa37c.classList.add("csNameFx");
    _0x1fa37c.style.backgroundImage = "linear-gradient(70deg, #" + _0x2efb47 + " 45%, " + _0x537b8b + "9c 50%, #" + _0x2efb47 + " 55%)";
  }
}
function applyChatBoxStyle(_0x5a3705, _0x1d8da5, _0x397189) {
  const _0x288597 = parent?.parent?.document.querySelector("#embedframe:not(.hmemb)");
  var _0x10684e;
  if (_0x288597) {
    if (_0x10684e = _0x288597) {
      if (_0x5a3705 == "csRounded") {
        _0x10684e.style.borderRadius = "15px";
      }
      if (_0x1d8da5 && isValidHex(_0x1d8da5)) {
        _0x10684e.style.border = "2px solid " + _0x1d8da5;
      }
      if (_0x397189 && isValidHex(_0x397189)) {
        _0x10684e.style.boxShadow = "0 0 20px " + _0x397189;
      }
    }
  }
}
function applyGradientStyle(_0x3b49bf, _0x5bd421, _0x2bc75a) {
  if (_0x3b49bf) {
    _0x3b49bf.style.background = "linear-gradient(225deg, " + _0x5bd421 + " 0%, " + _0x2bc75a + " 100%)";
    _0x3b49bf.style.color = "#fff";
  }
}
function applyTitleBarStyles(_0x566010, _0x39c80d, _0x20ff81, _0x56c2ac, _0x364e55, _0x25649f, _0x396aa3, _0x2da343) {
  if (_0x566010) {
    applyGradientStyle(_0x566010, _0x364e55, _0x25649f);
  }
  if (_0x39c80d) {
    _0x39c80d.style.color = "#fff";
  }
  [_0x20ff81, _0x56c2ac, _0x396aa3, _0x2da343].forEach(_0x908fbe => {
    if (_0x908fbe && _0x908fbe === _0x2da343) {
      _0x908fbe.src = "svg/call/call.svg";
    } else if (_0x908fbe) {
      _0x908fbe.src = _0x908fbe === _0x56c2ac ? "svg/reportw.svg" : "svg/removew.svg";
    }
  });
}
function applyStyleForEach(_0x4aecf0, _0x4b8bc0, _0x28ef1f) {
  _0x4aecf0?.forEach(_0x412b0 => {
    _0x412b0.style[_0x4b8bc0] = _0x28ef1f;
  });
}
function initFlix(_0x183c90) {
  _Activity.initFlix(_0x183c90);
}
function HandleFlix(_0xbf0745) {
  return _Activity.HandleFlix(_0xbf0745);
}
function setPawnHueValues(_0x2fb31a) {
  _Activity.setPawnHueValues(_0x2fb31a);
}
function setCurrentPawnPreview(_0xd63259) {
  _Activity.instance.Settings.setCurrentPawnPreview(_0xd63259);
}
async function copyToClipboard(_0x5237ca) {
  if (!isSecureContext || !navigator.clipboard?.writeText) {
    let _0x2e599b = GetTranslation("mob2.clipboarderrorone");
    _0x2e599b ||= "Clipboard API is current unavailable. Ensure you are using a secure page and that your browser is up to date.";
    AlertMessage(_0x2e599b);
  }
  try {
    await navigator.clipboard.writeText(_0x5237ca);
    return;
  } catch (_0x295a25) {
    if ((_0x295a25?.name || "") === "NotAllowedError" && window.top !== window) {
      let _0x377673 = GetTranslation("mob2.clipboarderrortwo");
      _0x377673 ||= "Cannot copy to clipboard. Iframe must be allowed to write to clipboard, please contact the site administrator to resolve this issue.";
      AlertMessage(_0x377673);
      return;
    }
  }
  {
    let _0x588fe7 = GetTranslation("mob2.clipboarderrorthree");
    _0x588fe7 ||= "Cannot copy to clipboard, please contact the site administrator to resolve this issue.";
    AlertMessage(_0x588fe7);
  }
}
function cleanupPstyleClasses(_0x446d9b, _0x435e94) {
  const _0x2c1568 = _0x435e94 ? document.getElementById("status") : document.getElementById("statusNew");
  const _0x566b0e = document.querySelectorAll(".butcontainer");
  const _0x46240e = Classic ? parent.document.querySelector(".dialogTitleBar") : document.querySelector(".htmlTitleBar");
  const _0x536830 = document.getElementById("name");
  const _0x1f0e6a = document.getElementById("onP");
  const _0x143fff = document.querySelectorAll(".profileIc img");
  const _0x128897 = _0x446d9b?.querySelector(".dialogTitleBar");
  const _0x425d0e = _0x446d9b?.querySelector(".dialogActionRight");
  [..._0x143fff, _0x1f0e6a, _0x536830].filter(Boolean).forEach(_0x3e302f => {
    window.kPstyleKeys.forEach(_0x2a5152 => _0x3e302f.classList.remove(_0x2a5152));
    _0x3e302f.classList.remove("psinfo-front", "psinfo-back");
  });
  [..._0x566b0e, _0x46240e, _0x128897, _0x425d0e, !_0x435e94 && _0x2c1568 ? _0x2c1568 : null].filter(Boolean).forEach(_0x30736d => {
    window.kPstyleKeys.forEach(_0x22e91c => _0x30736d.classList.remove(_0x22e91c));
    _0x30736d.classList.remove("pstyleFx");
  });
}
function handleAgeVerification() {
  const _0x1a2562 = "svg/remove" + (config.ButColW && toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg";
  let _0x26b1f6 = makeElement(null, "img");
  _0x26b1f6.src = _0x1a2562;
  _0x26b1f6.width = "16";
  _0x26b1f6.alt = "close";
  let _0x2c428d = makeElement(null, "div");
  let _0x39a81f = makeElement(_0x2c428d, "div", "modalDialogContentClassic");
  let _0x2e4e7a = makeElement(_0x39a81f, "div", "dialogTitleBar");
  makeElement(_0x2e4e7a, "span", "dialogTitle").textContent = "Age Verification";
  makeElement(_0x2e4e7a, "span", "dialogTitleAction ageClose").appendChild(_0x26b1f6);
  let _0x557fe8 = makeElement(_0x39a81f, "div", "dialogBody");
  makeElement(_0x557fe8, "div", "dialogPadding").innerHTML = "\n        To continue, we need to confirm that you meet the minimum age requirement.\n        We use AgeWallet to confirm your eligibility.\n        We do <b>not</b> store your age or identification documents.\n        You can review AgeWallet's \n        <a href=\"https://agewallet.com/end-user-privacy-policy\" target=\"_blank\">Privacy Policy</a>\n        for information on how their data is processed.\n    ";
  let _0x37abb5 = makeElement(_0x557fe8, "div", "dialogActions");
  let _0x338366 = makeElement(_0x37abb5, "div", "butcontainer previewBut centered");
  makeElement(_0x338366, "div", "ageProceed").textContent = "Proceed";
  HiddenDivs.AgeVerifyDialog = _0x2c428d.innerHTML;
  doModal("AgeVerifyDialog");
  document.querySelector(".ageProceed").onclick = function () {
    modalClose();
    window.open("http://localhost:6969/web_gear/chat/ageverify.php", "_blank");
  };
  document.querySelector(".ageClose").onclick = modalClose;
}