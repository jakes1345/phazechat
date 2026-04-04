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
  "1": 1,
  "2": 1,
  "3": 1,
  "4": 1,
  "6": 1,
  "8": 1,
  "9": 1,
  "12": 1,
  "18": 1,
  "24": 1,
  "36": 1,
  "72": 1
};
var ToCq = [];
var HugKissDebug = !1;
var Marks = null;
var Player = null;
var Playlist = !1;
var PMMODE = !1;
var reloadPowers = !1;
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
let forceUpdateAnimation = !1;
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
var xatdomain = "https://xat.com";
var chatUrl = xatdomain + "/web_gear/chat/";
var IDLE_ROOM = 3;
let audiesList = ["howl", "44", "44inside", "accessdeniedfemale", "accessdeniedmale", "accessgranted", "airbrake", "airbrake2", "airhorn", "alarmbeep", "alarmclockbeep", "allclear", "ambulance", "and", "angrywoman", "aoogahorn", "aoogahorn2", "applausesmall", "arrowhit", "babyrattle", "balloonblowout", "balloonblowup", "balloonstretchsnap", "bangecho", "banneropen", "basketballbounce", "bass", "bathtubsplash", "bbboard", "bbswish", "bee", "beeswarm", "birdfly", "biteonice", "blink", "blip", "bloop", "blowraspberry", "boatairhorn", "boatcreak", "boathorn", "boing", "boing2", "bookpages", "bottlerocket", "boxingbellmulti", "breakplate", "breakwindow", "bricksfall", "bubbling2", "bulletbody", "bulletricochet", "burp", "busdoorslide", "bushorn", "button", "buttonbeep", "buttondroop", "buttonflutter", "buttonzip", "buzzer", "buzzer2", "buzzer3", "buzzer4", "buzzer5", "buzzerheavy", "buzzthroughloud", "buzzthru", "buzzthruloud", "camel", "cameraclick", "cameraclick2", "camerashutter", "camerazoomout", "cannedlaugh2", "cannon", "caralarm", "carcrash", "cardoording", "cardooropen", "cardoorshut", "carhornold2", "carhornshort", "carhorntwice", "carscreech", "carscreech2", "carscreech3", "carscreechstop", "carstart", "cartooncharge", "cartoonfall", "cartoonhammer", "cartoonphone", "cartoonrise", "cartoonrun", "cartoonspinstop", "cartoonsplit", "cartoonsqueak", "cartoonyahoo", "cashregister", "catmeow", "catmeow2", "catscream", "catscreech", "catyell", "cellphone", "censoredbeep", "chaching", "chain", "chainrattle", "chainsaw", "chalkboard", "chimp", "choke", "chop", "chop2", "cicadachirp2", "clickfast", "clickon", "clockchime1", "clocktick", "clocktickfast", "closewindow", "clownbugle", "cockatiel", "cockatiel2", "cockgun", "cockgun2", "cockgun3", "codered", "coinstable", "cointable", "colt45", "computerbeep", "computerbeep2", "computerbeep3", "computerbeep4", "computerprocess", "computerprocess2", "computerspring", "coocoo3", "cough", "cowboy", "creakslam", "cricket", "crow", "crow2", "crowdohh", "crunch", "cupsaucer", "dice", "dissolve", "dissolve2", "dogbark", "dogbark2", "doggrowl", "dolphin", "donkey", "donyahoo", "doorbell", "doorbell2", "doorbell3", "doorcreak", "doorcreak2", "doorcreak3", "dooropen", "doorslam", "dotmatrix3", "doubleclick", "dovefly", "drain", "dream", "drillshort", "dropinwater", "duckquack", "dullthump", "eagle", "eatcookie", "eatlikeapig", "electricalcurrent2", "electricarc", "electricdrill", "electricshock", "electronicheart", "electronicping", "eleoogahorn", "elephant", "elephant2", "elevator", "elevatording", "elevatordoor", "error", "explode", "explosion", "explosion2", "fall", "fall2", "fanfare", "fanfare2", "fart", "fart2", "fart3", "fart4", "fasttalk", "faucet", "fight", "fightmotion", "fill", "firetrucksiren2", "fireworkfire", "fireworks", "fireworksparklepop", "fishingreel", "flagpole", "flashbulb", "flashbulbs", "flashbulbs2", "flatline2", "flicklighter", "flushtoilet", "fly", "flyacross", "flymetal", "foghorn", "foghorn2", "freezerdoor", "frog2", "funnycarburnout", "fuse", "futurebeep", "futurebeep2", "futurebeep3", "gavel", "giantalienlaugh", "giddy", "giddylaugh", "glassbreak", "glassbreaking", "goaway", "golfball", "goodbyefemale", "goodbyemale", "goodmorningfemale", "goopy", "gotaproblem", "gotgas", "gotmailrap", "gotmailrap2", "gotmega", "gravelwalk", "groan", "groan2", "grow", "grow2", "gunfight2", "gunshots3", "hallelujah", "hammer", "handbellchristmas", "happynewyear", "happythanksgiving", "hardknock", "harp", "heartbeat3", "heartmonitorbeep", "hellobaby", "highpitchsqueal", "hisexy", "hiss", "hithard", "hockeystick", "hohoho", "hornwarning", "horsegallop2", "horseneigh", "horseneigh2", "horserun", "horsesrun", "howl2", "huh", "hurryup", "hurtdog", "iceglass", "iloveyoufemale", "iloveyoumale", "implosion", "implosion2", "indiancall", "indiancall2", "indiandrums", "inhale", "insidejet", "interference", "intruderalert", "invaliduser", "jaildoorclose", "jaildoorclose2", "jarlidtwist", "jelly", "jetpass", "jetstart2", "jetstart3", "jokedrum", "keylock", "keys", "kick", "kickass", "kickdoor", "kickdoordown", "kidscheer", "kidsscream", "kiss", "kiss2", "knockdoor", "knockhard", "ladder", "laserfire", "laserfire2", "laserfire3", "lasersword", "lasersword2", "laughcartoon", "laughingman", "laughingman2", "laughingman3", "laughingman4", "laughingman6", "laughingman7", "laughslow", "launchexplode", "lick", "lick2", "lion", "lion2", "lionscream", "liquidblast", "loadclip", "luger", "lumbercrash", "m16", "m16singleshot", "m80", "machinegun", "machineshutdown", "magic", "manwah", "match", "meatsizzle", "merrychristmaself", "metal", "metal2", "metalclang", "metaldooropen", "metalspecial", "metronome", "mice", "missilebeep", "missilebeep2", "missilebeep3", "modem", "monitorflatline", "morsecode", "motorcycle", "mouse", "mousesqueak", "movieend", "musicalhorn", "muzzleloadshot", "navywhistle", "niceday", "nightingale", "officephone", "ohhh", "oldcarhorn", "oldphone", "oldphonering2", "outboard", "ovendoor", "ow", "owl", "pageturn", "paintcanclickfast", "pan", "pant", "panther", "paperturnquick", "parrott", "partyhorn", "pasqueal", "peellongrubber", "peelshortrubber", "penclick", "phonebusy", "phonepickup", "phonering", "pianosmash", "pig", "pigeon", "pinball", "ping", "pipebang", "pissmiss", "pistolshot", "planeidle", "planelow", "platebreak", "platesilverware", "ploop", "policebullhorn", "poolballhit", "poolbreak", "poolpocket", "poolsplash", "pop2", "pop3", "poptop", "potsandpans", "pourbeer", "poursoda", "poweroff", "poweron", "puke", "pukewet", "punch", "punch123", "punch5", "punchhard", "pushpin", "racecar", "radarping", "radioadjustecho", "radiobeep", "raspberryfart", "rattlespray", "reversecymbal", "rifleshotecho", "ringbellmedium", "ringbellsmall", "ringbellsmall2", "robotarm", "rockdoor", "rooster", "ropestretch", "rundoorslam", "runtowards", "safeclose", "saxophone", "scarycartoon", "scarynote", "schoolbellshort", "scratchneedle", "scratchneedlelong", "scream", "screamman", "screamshort", "screamshutup", "screamwhat", "screendoor", "screendoorclose", "shakerolldice", "sheep", "shockperson", "shootglass", "shortbeeptone", "shotclockhorn", "shotgun", "shotgun2", "showercurtain", "shrink", "shutdowninprocess", "shutupmexican", "silvercoin", "singlegunshot", "sirenhorn", "slambigdoor", "slap", "slash", "slice", "sliderock", "slowlaugh", "slurp", "slurpfast", "slurping", "smallbell", "smallchimes", "smallgiggle", "smallwaterfall", "smash", "snakehiss", "snaredrumroll", "sneeze", "sneezewoman", "snore", "snore2", "sodatwistoff", "spaceball", "spacebeep", "sparkle", "sparrow", "specialgift", "spin", "splat", "spookylaugh", "spraybottle", "spraypaint", "spurssteps4", "squeaky", "squeaky2", "stapler", "startinggate", "static", "staticlong", "stumblebreak", "success", "suck", "suck2", "swing", "sword", "takeone", "tapetearoff", "tearcloth", "telegraph", "tennis", "thankyoufemale", "thankyoumale", "thunderrumble2", "tincan", "tireblowout", "tiresquealcorner", "tminus", "toasterpopup", "toytrainhorn", "traffichorns", "trafficjam", "trainhorn", "trainpassfast", "trashcan", "trashcan2", "triangle", "triangle2", "truckairhorn", "truckbrake", "truckhorn", "trumpet", "tugboathorn", "turkey", "turnofftv", "turnontv", "typewriter", "typewriterding", "typewritershift", "ugh", "uhohcomputer", "uhohcomputer2", "uhohcomputer3", "uncork", "underwater", "urconnected", "voicesample", "vwhorn", "walkhall", "warning", "warningbass", "waterballoon", "waterflow", "waterflow2", "wawaahorn", "weatherwarning", "welcomefemale", "welcomewindows2k", "welder2", "whip", "whip2", "whipcrack", "whiskaway", "whistleblow", "whistleblowhere", "whistledown", "whistlehere", "whistleshort", "whistlesparkle", "whistleup", "whistlewolf", "wildcat", "wildcat2", "windchandelier", "windowclose", "windows2kgoodbye", "windowslide", "windup", "witchlaugh", "womancry", "womanlaugh", "womanscream", "womansneeze", "woodplaner", "woodsplinter", "write", "wronganswer", "wronganswer2", "wrongnumbertone", "xpgoodbye", "xylophone", "yawn", "yougotcheesypoofs", "yougotmailscary", "yougotmailwhispered", "zipper", "zoom", "zoomaway"];
let resizeBtn = null;
let minimized = !1;
let playerToolBar = null;
let playerContainer = null;
let tooltip = null;
let timeoutId = null;
let showRapid = !1;
const a0_0x507689 = {
  name: "heartthorns",
  scale: 1.3,
  isRound: !1
};
const a0_0x423057 = {
  name: "heartpunk",
  scale: 1.3,
  isRound: !1
};
const a0_0xfd1f50 = {
  name: "heartlocked",
  scale: 1.28,
  isRound: !1
};
const a0_0x11242f = {
  name: "heartgarden",
  scale: 1.25,
  isRound: !1
};
const a0_0x3fd9b = {
  name: "heartcloud",
  scale: 1.2,
  isRound: !1
};
const a0_0x17b0c0 = {
  name: "heartbloom",
  scale: 1.26,
  isRound: !1
};
const a0_0x488188 = {
  name: "heartaurea",
  scale: 1.2,
  isRound: !0
};
const a0_0x2815f4 = {
  name: "frost",
  scale: 1.25,
  isRound: !1
};
const a0_0xfc0720 = {
  name: "christmas",
  scale: 1.3,
  isRound: !1
};
const avatarFrames = [a0_0x507689, a0_0x423057, a0_0xfd1f50, a0_0x11242f, a0_0x3fd9b, a0_0x17b0c0, a0_0x488188, a0_0x2815f4, a0_0xfc0720];
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
const a0_0x540822 = {
  LinkInLinkMarkupDetected: -1
};
const MessageErrorCodes = a0_0x540822;
var _Activity;
try {
  if (_Activity === undefined) {
    _Activity = parent._Activity !== undefined ? parent._Activity : parent.parent._Activity !== undefined ? parent.parent._Activity : parent.parent.parent._Activity !== undefined ? parent.parent.parent._Activity : parent?.box?._Activity !== undefined ? parent.box._Activity : {};
  }
} catch (a0_0x55ab1e) {
  console.warn("Cross-origin restriction encountered while accessing _Activity.", a0_0x55ab1e);
  _Activity = {};
}
let appFromUrl = null;
function xatMain(dataStr) {
  var dataObj = JSON.parse(dataStr);
  config = defconfig;
  setdarkmode();
  for (var key in dataObj) {
    config[key] = dataObj[key];
  }
  if (dataObj.MyId !== undefined) {
    _Activity.instance.MyId = xInt(dataObj.MyId);
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
  ThisPage = _0x39e702.page;
  if (config.chatid) {
    setEventsLink(config.chatid);
  }
  let _0x12327a = Macros?.sline?.split(",");
  _0x12327a &&= _0x12327a.filter(_0x11e835 => _0x11e835);
  if (_0x12327a?.length && config.pFlags & NamePowers.sline) {
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
  window.addEventListener("pagehide", _0x12c0a9 => {
    if (_0x12c0a9.persisted) {
      document.body.classList.add("noAnimations");
    }
  }, !1);
  if (!appFromUrl && (appFromUrl = new URLSearchParams(parent.parent.location.search).get("open"), appFromUrl && appFromUrl.indexOf(".") != -1)) {
    const _0x3021e7 = appFromUrl.split(".")[0].toLowerCase();
    const _0x1523f4 = capitalize(appFromUrl.split(".")[1].toLowerCase());
    let _0x4a65ea;
    try {
      _0x4a65ea = appFromUrl.split(".")[2].toLowerCase();
    } catch (_0x4dea4e) {}
    const _0x546a6d = {
      Type: _0x1523f4,
      Pack: _0x4a65ea,
      Config: config
    };
    classicSetDialog(_0x3021e7, _0x546a6d);
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
  if (_0x39e702.roomid) {
    _Activity.instance.CurrentChat = _0x39e702.roomid;
  }
  if (_0x39e702.pFlags) {
    userFlags = _0x39e702.pFlags;
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
function loadQuickBar(force) {
  if (typeof _Activity.instance.QuickBar != "object" || !_Activity.instance.IsClassic || force) {
    try {
      _Activity.instance.QuickBar = new Quickbar();
      _Activity.instance.QuickBar.init(force);
    } catch (e) {}
  }
}
function SetPow() {
  if (PSSA || parent?.PSSA) {
    if (localStorage.getItem("w_Powers") && localStorage.getItem("todo")) {
      MAXPOWER = (PSSA || parent?.PSSA).length - 1;
      w_Powers = [];
      let _0x174a1a = JSON.parse(localStorage.getItem("w_Powers"));
      for (let _0x130307 in _0x174a1a) {
        w_Powers[xInt(_0x130307)] = xInt(_0x174a1a[_0x130307]);
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
function debug(_0x11072e) {
  return config[_0x11072e];
}
function xtrace(_0x5154a7) {
  if (debug("xtrace")) {
    ToC({
      Type: "xtrace",
      msg: _0x5154a7
    }, true);
  }
}
function FromObjC(_0x1c515b) {
  switch (_0x1c515b) {
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
      Type: _0x1c515b,
      Page: ThisPage
    });
  }
}
let commandRegex = /\/(\w+)(?: (\w+))?/;
function ToC(_0x4abd4b, _0x3058e4) {
  _0x4abd4b.Type ||= _0x4abd4b.Command;
  _0x4abd4b.Command ||= _0x4abd4b.Type;
  _0x4abd4b.Page ||= ThisPage;
  if (_0x4abd4b.Command == "LoadClassicDialog") {
    _Activity.instance.CurrentChatC = null;
  }
  if (typeof messages != "undefined" && _0x4abd4b.Command === "Click") {
    messages.editMode = false;
  }
  if (_0x4abd4b.ChatId && _0x4abd4b.Page && _0x4abd4b.Page == "chats") {
    if (_0x4abd4b.ChatId.indexOf("_") >= 0) {
      _Activity.instance.CurrentChatC = null;
    } else if (_0x4abd4b.ChatId > 0) {
      _Activity.instance.CurrentChatC = _0x4abd4b.ChatId;
    }
  }
  if (Classic && _0x4abd4b.Next == "pop") {
    _0x4abd4b.Next = "";
  }
  if (!!_0x4abd4b.Message && (_0x4abd4b.Message.substr(0, 2) == "/+" || _0x4abd4b.Message.substr(0, 2) == "/-")) {
    reloadPowers = true;
    messages.setTypingOff();
  }
  if (!Classic && typeof messages != "undefined") {
    if (_0x4abd4b.Command && ["swipeleft", "swiperight"].indexOf(_0x4abd4b.Command) >= 0 || _0x4abd4b.Next && _0x4abd4b.Next == "visitors") {
      messages.setTypingOff();
    }
  }
  if (_0x4abd4b.Type == "Send" && _0x4abd4b.Message[0] == "/") {
    let _0x155313 = commandRegex.exec(_0x4abd4b.Message);
    _0x155313 &&= _0x155313[1];
    if (_0x155313) {
      switch (_0x155313.toLowerCase()) {
        case "rtl":
        case "ltr":
          saveSetting("textDirection", _0x155313);
          document.getElementById("textEntryEditable").style.direction = _0x155313;
          break;
        case "away":
          messages.setTypingOff();
          break;
        case "gameban":
          GameBan(_0x4abd4b.Message.split(" ")[1], Date.now() + 10000000);
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
  _Activity.instance.QueueCommand(_0x4abd4b);
}
function GetXconst(_0x130ce2, _0x213308) {
  try {
    _0x213308 = JSON.parse(_0x213308);
  } catch (_0xa2d210) {
    if (typeof _0x213308 == "string") {
      _0x213308 = _0x213308.split(",");
    }
  }
  _Activity.instance.xConsts[_0x130ce2] = _0x213308;
  switch (_0x130ce2) {
    case "isgrp":
      ISGRP = _0x213308;
      break;
    case "pssa":
      _Activity.instance.PSSA = PSSA = _0x213308;
      SetPow();
      break;
    case "topsh":
      _Activity.instance.TOPSH = TOPSH = _0x213308;
      break;
    case "SuperPowers":
      _Activity.instance.SUPERPOWERS = SUPERPOWERS = _0x213308;
      break;
    case "SuperPawns":
      SUPERPAWNS = _0x213308;
      break;
    case "Stickers":
      STICKERS = _0x213308;
      break;
    case "reactions":
      if (!_0x213308 || _0x213308.length === 0) {
        break;
      }
      REACTIONS = _0x213308;
      if (!messages.reactionsInit) {
        messages.reactionsInit = true;
        messages.setUpReactionsSelector();
      }
      break;
    case "soth":
      _Activity.instance.SOTH = _0x213308;
      break;
    case "syel":
      _Activity.instance.SYEL = _0x213308;
      break;
    case "uCollections":
      _Activity.instance.UCOLLECTIONS = _0x213308;
      break;
    case "effects":
      _Activity.instance.EFFECTS = _0x213308;
      break;
    case "frames":
      _Activity.instance.FRAMES = _0x213308;
      break;
    case "aces":
      _Activity.instance.ACES = _0x213308;
  }
}
function GetXconsts(_0x51ece8, _0x2fcbd0, _0x40fa72) {
  _0x2fcbd0 ||= ["pssa", "topsh", "SuperPowers", "SuperPawns", "isgrp", "Stickers", "reactions", "soth", "syel", "uCollections", "effects", "frames", "aces"];
  if (_0x40fa72) {
    let _0x10be4b = [];
    for (let _0x14423f in _0x2fcbd0) {
      let _0x2f40fc = _0x2fcbd0[_0x14423f];
      if (!_0x40fa72[_0x2f40fc] || _0x2f40fc == "end" || _0x2f40fc == "MainObj") {
        _0x10be4b.push(_0x2f40fc);
      }
    }
    _0x2fcbd0 = _0x10be4b;
  }
  if (_Activity.instance.xConsts) {
    delete _Activity.instance.xConsts.reactions;
    delete _Activity.instance.xConsts.pssa;
    delete _Activity.instance.xConsts.topsh;
  }
  for (let _0x55b917 in _0x2fcbd0) {
    if (_0x51ece8 === "selector" || !_Activity.instance.xConsts[_0x2fcbd0[_0x55b917]]) {
      ToC({
        Command: "GetXconst",
        js: _0x51ece8,
        obj: _0x2fcbd0[_0x55b917]
      });
    }
  }
}
function loadXavi(_0xd429ba, _0x3e6fd8, _0x5a692f, _0x39c85a, _0x412242, _0x506dd8, _0x47e65e) {
  const _0x1b5ee4 = makeElement(_0xd429ba, "div", "messageAvatar xavi");
  const _0x553103 = makeElement(_0x1b5ee4, "iframe", "xaviFrame");
  _0x553103.scrolling = "no";
  _0x553103.loading = "lazy";
  _0x553103.src = "../../xavi/xavi.html#chat&" + _0x3e6fd8 + "&" + encodeURIComponent(_0x5a692f) + "&" + _0x39c85a + "&" + _0x506dd8 + "&" + _0x47e65e + "&" + encodeURIComponent(PSSA);
  return _0x1b5ee4;
}
function GameBan(_0x50429f, _0x2c064e, _0x24f50b = 0, _0x242891 = 0) {
  let _0x2ffd6b = document.querySelector("#gamesContainer");
  if (_0x50429f == 0 || _0x2ffd6b.childNodes.length == 0) {
    if (_0x50429f != 0) {
      if (_0x2ffd6b) {
        _0x2ffd6b.innerHTML = "";
        _0x2ffd6b.style.display = "block";
      }
      let _0x11dbec = makeElement(_0x2ffd6b, "iframe", "gameFrame");
      switch (xInt(_0x50429f)) {
        case 162:
          _0x11dbec.src = "../gameban/codeban/index.html#" + _0x2c064e;
          break;
        case 134:
          _0x11dbec.src = "../gameban/snakeban/index.html#" + _0x2c064e;
          break;
        case 136:
          _0x11dbec.src = "../gameban/spaceban/index.html#" + _0x2c064e;
          break;
        case 236:
        case 152:
        case 140:
          const {
            innerWidth: _0x2190a5,
            innerHeight: _0x1b3cb6
          } = window;
          const _0x5141da = "" + [_0x2c064e, _0x24f50b, _0x242891, _0x50429f, config.MyId, _0x2190a5, _0x1b3cb6].join(",");
          _0x11dbec.src = "../gameban/other/index.html#" + _0x5141da;
          break;
        default:
          _0x2ffd6b.innerHTML = "";
          _0x2ffd6b.style.display = "none";
      }
    } else {
      closeGameBan();
    }
  }
}
function closeGameBan() {
  let _0x501a9a = document.querySelector("#gamesContainer") || parent.document.querySelector("#gamesContainer");
  if (_0x501a9a) {
    _0x501a9a.innerHTML = "";
    _0x501a9a.style.display = "none";
  }
}
function openInNewTab(_0x4e6cc5, _0x375678) {
  _0x375678 ||= "_blank";
  if (_0x375678 = window.open(_0x4e6cc5, _0x375678)) {
    _0x375678.focus();
  }
}
function HitWeb(_0x5106c3, _0x177f10) {
  if (!(_0x5106c3.search(/app:/i) >= 0)) {
    if (_0x5106c3.search("://") < 0) {
      _0x5106c3 = "https://" + _0x5106c3;
    }
    openInNewTab(_0x5106c3);
  }
}
function HitWiki(_0x3156ba, _0xee6c15) {
  HitWeb("https://util.xat.com/wiki/index.php?title=" + _0x3156ba, _0xee6c15);
}
function LinkValidator(_0x5f447e, _0x1147ae, _0x563ef5) {
  if ((_0x1147ae = _0x1147ae.replace(/＆/g, "&")).includes("linkvalidator.net/")) {
    return;
  }
  if (_0x5f447e) {
    _0x5f447e.stopPropagation();
  }
  var _0x53310e;
  var _0x58e3fa = _0x1147ae.charAt(0);
  if (_0x58e3fa == "^") {
    ToC({
      Command: "StartApp",
      n: "canvas",
      a1: _0x1147ae.substr(1)
    });
    return;
  }
  if (_0x58e3fa == "@") {
    _0x53310e = "https://xat.me/" + _0x1147ae.substr(1);
    if (_0x563ef5) {
      return _0x53310e;
    } else {
      HitWeb(_0x53310e);
      return;
    }
  }
  if (_0x58e3fa == "%") {
    _0x53310e = xatdomain + "/" + _0x1147ae.substr(1);
    if (_0x563ef5) {
      return _0x53310e;
    } else if (isWEB) {
      HitWeb(_0x53310e);
      return;
    } else {
      ToC({
        Command: "StartGroup",
        Group: _0x1147ae.substr(1)
      });
      return;
    }
  }
  if (_0x1147ae === "vote") {
    _Activity.instance.QuickBar.toggleSideBar(!0);
    let _0x2b5c9d = findNodeInWindowOrParent("#sideBarItemvote");
    if (!_Activity.IsClassic) {
      const _0x5da252 = findNodeInWindowOrParent("#textEntryEditable");
      _0x5da252?.blur();
    }
    if (_0x2b5c9d) {
      _0x2b5c9d.click();
    }
    return;
  }
  let _0x5d22f9;
  _0x1147ae = _0x1147ae?.replace(/\u00A0/, "");
  try {
    _0x5d22f9 = new URL(_0x1147ae);
  } catch (_0x4d5b55) {
    _0x5d22f9 = {};
  }
  if (_Activity.instance.UserSettings?.linkvalidator == "disable" && ["^", "@", "%"].indexOf(_0x1147ae.charAt(0)) == -1 || ["xat.com", "xat.wiki", "forum.xat.com"].includes(_0x5d22f9.host)) {
    if (_0x563ef5) {
      return _0x1147ae;
    } else {
      HitWeb(_0x1147ae);
      return;
    }
  }
  var _0x173387;
  var _0x38d993 = new Array(64);
  for (_0x173387 = 0; _0x173387 < 26; _0x173387++) {
    _0x38d993[_0x173387] = String.fromCharCode(_0x173387 + 65);
  }
  for (_0x173387 = 26; _0x173387 < 52; _0x173387++) {
    _0x38d993[_0x173387] = String.fromCharCode(_0x173387 + 71);
  }
  for (_0x173387 = 52; _0x173387 < 62; _0x173387++) {
    _0x38d993[_0x173387] = String.fromCharCode(_0x173387 - 4);
  }
  _0x38d993[62] = "+";
  _0x38d993[63] = "/";
  var _0x3c2ad8 = new Array();
  var _0x222caa = new Array();
  for (_0x173387 = 0; _0x173387 < _0x1147ae.length; _0x173387++) {
    _0x3c2ad8[_0x173387] = _0x1147ae.charCodeAt(_0x173387);
  }
  for (_0x173387 = 0; _0x173387 < _0x3c2ad8.length; _0x173387++) {
    switch (_0x173387 % 3) {
      case 0:
        _0x222caa.push(_0x38d993[(_0x3c2ad8[_0x173387] & 252) >> 2]);
        break;
      case 1:
        _0x222caa.push(_0x38d993[(_0x3c2ad8[_0x173387 - 1] & 3) << 4 | (_0x3c2ad8[_0x173387] & 240) >> 4]);
        break;
      case 2:
        _0x222caa.push(_0x38d993[(_0x3c2ad8[_0x173387 - 1] & 15) << 2 | (_0x3c2ad8[_0x173387] & 192) >> 6]);
        _0x222caa.push(_0x38d993[_0x3c2ad8[_0x173387] & 63]);
    }
  }
  if (_0x173387 % 3 == 1) {
    _0x222caa.push(_0x38d993[(_0x3c2ad8[_0x173387 - 1] & 3) << 4]);
  } else if (_0x173387 % 3 == 2) {
    _0x222caa.push(_0x38d993[(_0x3c2ad8[_0x173387 - 1] & 15) << 2]);
  }
  _0x173387 = _0x222caa.length;
  for (; _0x173387 % 4 != 0; _0x173387++) {
    _0x222caa.push("=");
  }
  var _0x4ef267 = "m=1&";
  if (isWEB) {
    _0x4ef267 = "";
  }
  var _0x3a03ba = "https://linkvalidator.net/warn.php?" + _0x4ef267 + "p=";
  for (_0x173387 = 0; _0x173387 < _0x222caa.length; _0x173387++) {
    _0x3a03ba += _0x222caa[_0x173387];
  }
  if (_0x563ef5) {
    return _0x3a03ba;
  }
  HitWeb(_0x3a03ba);
}
var gconfig;
var Macros;
function setGconfig(_0x4a823e) {
  for (var _0x5280e1 in gconfig = JSON.parse(_0x4a823e)) {
    if (gconfig[_0x5280e1].charAt(0) == "{") {
      if (gconfig[_0x5280e1].charAt(1) == "`") {
        gconfig[_0x5280e1] = gconfig[_0x5280e1].replace(/`/g, "\"");
      }
      gconfig[_0x5280e1] = JSON.parse(gconfig[_0x5280e1]);
    }
  }
  if (gconfig.g100) {
    var _0x2fd51 = gconfig.g100.split(",");
    gconfig.g100 = {};
    for (var _0x5d3fd4 = 0; _0x5d3fd4 + 1 < _0x2fd51.length; _0x5d3fd4 += 2) {
      gconfig.g100[_0x2fd51[_0x5d3fd4]] = _0x2fd51[_0x5d3fd4 + 1];
    }
  }
  _Activity.instance.gConfig = gconfig;
}
function setMacros(_0x221cc7) {
  Macros = JSON.parse(_0x221cc7);
}
function setSettings(_0x97d10) {
  _Activity.instance.UserSettings = JSON.parse(_0x97d10);
}
function setAppIcon(_0x1c4e83) {
  const _0x1a16a6 = {
    channel: _0x1c4e83,
    user: 0,
    msg: "",
    tobox: 1
  };
  let _0x3f773f = _0x1a16a6;
  parent.parent.parent.postMessage(JSON.stringify(_0x3f773f), "https://xat.com");
}
let prevSmilies = null;
let smTimeoutId = null;
let gotSmConfig = !1;
let debugFlag = 0;
function addSmileyBar(_0x44a2f4, _0x1b2e88) {
  if (!_0x44a2f4 || _0x44a2f4.replace(/ /g, "").length == 0) {
    _0x44a2f4 = "smile,biggrin,wink,eek,tongue,cool,mad,confused,redface,frown,crying,sleepy";
  }
  let _0x427d49 = document.querySelector("#smileyBar");
  if (prevSmilies != _0x44a2f4 || debugFlag != (config.Flags & NamePowers.ChatIsDebug) || forceUpdateAnimation) {
    gotSmConfig = false;
  }
  if (gotSmConfig || !_0x427d49 || window.innerHeight <= 300) {
    return;
  }
  if (gconfig && gconfig.hasOwnProperty("g74")) {
    gotSmConfig = true;
  }
  prevSmilies = _0x44a2f4;
  forceUpdateAnimation = !1;
  _0x44a2f4 = _0x44a2f4.split(",");
  let _0x381275 = ["smile", "biggrin", "wink", "eek", "tongue", "cool", "mad", "confused", "redface", "frown", "crying", "sleepy"];
  _0x427d49.innerHTML = "";
  for (let _0x59313d = 0; _0x59313d < _0x44a2f4.length; _0x59313d++) {
    if (_0x44a2f4[_0x59313d]) {
      _0x381275[_0x59313d] = _0x44a2f4[_0x59313d];
    }
  }
  const _0x19fd17 = window.innerWidth > 500 ? 12 : 8;
  _0x381275.length = _0x19fd17;
  _0x381275.forEach((_0x4a5dfb, _0x1807b4) => {
    let _0x2315b7 = _0x1b2e88 && _0x1807b4 == 0 ? "smiley smToggle" : _0x1b2e88 ? "smiley smToggle2 smOff" : "smiley";
    const _0x598f0c = _Activity.instance.Smilies.MakeSmiley(makeElement(_0x427d49, "div", _0x2315b7), _0x4a5dfb, {
      size: 30,
      tooltip: "(" + _0x4a5dfb + ")",
      tooltipPosition: "low",
      showAd: !1,
      align: !0,
      addGback: !0,
      callback: () => {
        smiliePressed("(" + _0x4a5dfb + ")");
      }
    });
    if (_0x1b2e88 && !_0x1807b4) {
      _0x598f0c.addEventListener("mouseenter", _0x47f1d7 => {
        window.clearTimeout(smTimeoutId);
        smTimeoutId = window.setTimeout(() => {
          document.querySelectorAll(".smOff").forEach(_0x386603 => {
            _0x386603.classList.remove("smOff");
          });
          document.querySelectorAll(".smiley").forEach(_0x5d68eb => {
            _0x5d68eb.addEventListener("mouseleave", _0xf42213 => {
              window.clearTimeout(smTimeoutId);
              smTimeoutId = window.setTimeout(() => {
                document.querySelectorAll(".smToggle2").forEach(_0x24d081 => {
                  _0x24d081.classList.add("smOff");
                });
              }, 500);
            });
          });
        }, 500);
      });
    }
  });
  const _0x213f14 = makeElement(_0x427d49, "div", "cell svgBack smline sideApp shake");
  _0x213f14.style.cssText = "width: 6%; height: 30px; right: 0; background-image: url('svg/8ball" + (config.Flags & NamePowers.ChatIsDebug ? "b" : "") + ".svg')";
  _0x213f14.onclick = getStuffPressed;
  const _0x2db5ba = makeElement(_0x427d49, "div", "cell svgBack smline sideApp");
  _0x2db5ba.style.cssText = "width: 6%; height: 30px; right: 0; background-image: url('svg/getx.svg')";
  _0x2db5ba.onclick = buyPressed;
  const _0x5ec3b7 = makeElement(_0x427d49, "div", "cell svgBack smline sideApp", "spkBut");
  _0x5ec3b7.style.cssText = "width: 6%; height: 30px; right: 0;";
  _0x5ec3b7.onclick = spkPressed;
  addToolTip(_0x213f14, ["box.139", "Get Stuff"], {
    position: "low"
  });
  addToolTip(_0x2db5ba, ["box.207", "Click to buy"], {
    position: "low"
  });
  addToolTip(_0x5ec3b7, ["mob1.managesounds", "Manage sounds"], {
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
  count: 9
};
const customAppCodes = {
  "20008": "nuclear#freeze#w12#size#w7",
  "20009": "count#",
  "20012": "supercycle#",
  "20038": "stick#"
};
function openApp(_0x26a938) {
  if (!_0x26a938) {
    return;
  }
  const _0x3b4b54 = {
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
    count: 20009
  };
  let _0x4e09cd = {};
  if (_0x26a938.type && _0x26a938.type == "media") {
    _0x4e09cd = {
      n: _0x26a938.type,
      i: _0x3b4b54.media,
      l: _0x26a938.link,
      action: "sideload"
    };
  } else if (_0x26a938.toLowerCase() == "translator" || _0x26a938.toLowerCase() == "translate") {
    const _0x2a0e87 = {
      UserNo: config.MyId,
      tab: "translator"
    };
    let _0x45ac13 = _0x2a0e87;
    classicSetDialog("actions", config.MyId);
    classicSetDialog("settings", _0x45ac13);
  } else {
    _0x4e09cd = {
      n: _0x26a938,
      i: _0x3b4b54[_0x26a938],
      action: "sideload"
    };
  }
  if (parent) {
    parent.postMessage(JSON.stringify(_0x4e09cd), "https://xat.com");
  }
}
function WordIsLink(_0x2830df, _0x215904, _0x254399, _0x186bc3) {
  if (!_0x2830df.match(/['"<>❯`]/) && (!_0x2830df || _0x2830df[0] !== "(" || _0x2830df[_0x2830df.length - 1] !== ")" || !_0x2830df.includes("#w"))) {
    var _0x462420;
    var _0x189580 = _0x2830df.toLowerCase();
    if (!_0x186bc3 || !_Activity.instance.QuickBar?.isGiphyLink(_0x2830df)) {
      if (_0x2830df.match(/^[@%][a-zA-Z0-9_]+$/)) {
        return _0x189580;
      }
      if (_0x462420 = _0x2830df.match(/^(play\.|app\.)([a-zA-Z0-9_]+)$/)) {
        return "^" + _0x462420[2];
      }
      if (keywords.hasOwnProperty(_0x189580) && !_0x254399) {
        switch (_0x4d19e2 = xInt(_0x462420 = keywords[_0x189580])) {
          case 9:
          case 11:
            if (_0x189580 == "doodle") {
              _0x189580 = "doodle2";
            }
            return {
              l: ">",
              c: "#000000",
              callBack: () => {
                openApp(_0x189580);
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
              return "https://xat.com/login?mode=1";
            }
          case 6:
            if (isWEB) {
              return "https://xat.com/login";
            }
          case 7:
            if (isWEB) {
              return openBuyPage();
            }
          default:
            if (_0x462420 == "vote") {
              return "vote";
            }
            if (_0x4d19e2 < 1) {
              return "https://xat.com/" + _0x462420;
            }
        }
      }
      if (gconfig && (_0x462420 = gconfig.g100) && _0x462420.hasOwnProperty(_0x189580)) {
        return {
          l: "https://bit.ly/" + (_0x462420 = _0x462420[_0x189580]),
          c: "#000080"
        };
      }
      if (!_0x215904 && !(_0x2830df.indexOf(".") < 0) && _0x2830df[0] != "." && !(_0x189580.indexOf("app:") >= 0)) {
        if (_0x189580.indexOf("http") >= 0) {
          return _0x2830df;
        }
        if (_0x189580[0] == "(" && _0x189580[_0x189580.length - 1] == ")") {
          const _0xaba09b = _0x189580.split(" ");
          if (_0xaba09b.length > 1) {
            const _0x29f5ad = _0xaba09b.filter(_0xd993ba => WordIsLink(_0xd993ba.replace("(", "").replace(")", "")));
            if (_0x29f5ad.length && _0x29f5ad[0].length > 0) {
              _0x2830df = _0x29f5ad[0].replace("(", "").replace(")", "");
            }
          }
        }
        var _0x2a98d1 = !1;
        var _0x4fa6fa = 2;
        if (_0x189580.indexOf("www.") >= 0) {
          _0x2a98d1 = true;
        }
        var _0x51e6e8;
        var _0x25d6fe = _0x189580.indexOf("/");
        if (_0x25d6fe == -1) {
          _0x25d6fe = _0x189580.length;
        }
        for (var _0x4d19e2 = 0; _0x4d19e2 < _0x25d6fe; _0x4d19e2++) {
          if (((_0x51e6e8 = _0x189580.charCodeAt(_0x4d19e2)) < 48 || _0x51e6e8 > 57) && _0x51e6e8 != 46) {
            _0x4fa6fa = 0;
            break;
          }
        }
        if (_0x189580.charAt(_0x25d6fe - 1) == ".") {
          _0x4fa6fa = 2;
        }
        if (_0x189580.charAt(_0x25d6fe - 2) == ".") {
          _0x4fa6fa = 2;
        }
        if (_0x189580.charAt(_0x25d6fe - 3) == ".") {
          _0x4fa6fa++;
        }
        if (_0x189580.charAt(_0x25d6fe - 4) == ".") {
          _0x4fa6fa++;
        }
        if (_0x189580.charAt(_0x25d6fe - 5) == ".") {
          _0x4fa6fa++;
        }
        if (_0x4fa6fa == 1) {
          _0x2a98d1 = true;
        }
        if (_0x2a98d1) {
          return "https://" + _0x2830df;
        } else {
          return undefined;
        }
      }
    }
  }
}
function setEventsLink(_0x224380) {
  if (keywords && _0x224380) {
    keywords.events = "chats#!events&roomid=" + _0x224380 + "&GroupName=" + config.GroupName;
  }
}
const lut15 = [128, 180, 222, 249, 254, 238, 203, 154, 102, 53, 18, 2, 7, 34, 76];
const usefA = {
  "1": 1,
  "3": 2,
  "4": 4
};
const RepeatA = {
  "2": 50,
  "3": 33.3
};
function toColor(_0x4ae558) {
  return "#" + (16777216 + ((_0x4ae558 >>>= 0) & 255 | (_0x4ae558 & 65280) >>> 8 << 8 | (_0x4ae558 & 16711680) >>> 16 << 16)).toString(16).slice(1);
}
function MakeGrad(_0x472997) {
  let _0x571b;
  let _0x5c117c;
  let _0x1efc1a;
  let _0x39fb5e;
  let _0x58f058 = 0;
  let _0x5ac7cd = 0;
  let _0x1ad394 = !1;
  let _0x3c10e9 = [];
  _0x472997.reverse();
  if ((_0x472997 = _0x472997.filter(Boolean)).length <= 1) {
    _0x472997 = [..._0x472997, 6359443, 2951035, 40440, 48184, 16578129, 16736060, 16711680];
  }
  _0x5c117c = 0;
  for (; _0x5c117c < _0x472997.length; _0x5c117c++) {
    let _0x1e065a = _0x472997[_0x5c117c];
    if (!_0x1e065a) {
      continue;
    }
    _0x1e065a = _0x1e065a.toString();
    if (_0x1e065a == "NW") {
      _0x1ad394 = !0;
      if (_0x571b === undefined) {
        _0x571b = true;
      }
      continue;
    }
    let _0x2c06cd;
    let _0xa07967 = _0x1e065a.charAt(0);
    _0x2c06cd = xInt(_0x1e065a.substr(1));
    if (_0xa07967 != "r") {
      if (_0xa07967 != "s") {
        if (_0xa07967 != "f") {
          if (_0xa07967 != "o") {
            _0x1e065a = xInt(_0x1e065a);
            if (!_0x1e065a) {
              break;
            }
            _0x3c10e9.push(toColor(_0x1e065a));
          } else {
            if (_0x2c06cd == 0) {
              _0x571b = !1;
              continue;
            }
            _0x571b = _0x1ad394;
            _0x39fb5e = RepeatA[_0x2c06cd];
          }
        } else {
          _0x571b = _0x1ad394;
          _0x58f058 = usefA[_0x2c06cd];
        }
      } else {
        _0x5ac7cd = _0x2c06cd;
      }
    } else {
      _0x1efc1a = _0x2c06cd;
    }
  }
  if (_0x3c10e9.length > 15) {
    _0x3c10e9.length = 15;
  }
  if (_0x3c10e9.length < 2) {
    for (let _0x387500 = 0; _0x387500 < 15; _0x387500++) {
      let _0x2f351e = lut15[(_0x387500 + _0x5ac7cd) % 15];
      let _0x3f46d9 = lut15[(_0x387500 + _0x5ac7cd + 10) % 15];
      let _0x371942 = lut15[(_0x387500 + _0x5ac7cd + 5) % 15];
      _0x3c10e9[_0x387500] = (_0x2f351e << 16) + (_0x3f46d9 << 8) + _0x371942;
    }
  }
  if (_0x1efc1a === undefined) {
    _0x1efc1a = 45;
  }
  if (_0x571b) {
    if (_0x1efc1a > 45) {
      _0x1efc1a = 45;
    } else if (_0x1efc1a < -45) {
      _0x1efc1a = -45;
    }
    _0x58f058 ||= usefA[4];
    _0x1efc1a = _0x1efc1a > 0 ? 90 - _0x1efc1a : -90 - _0x1efc1a;
    if (_0x3c10e9[0] != _0x3c10e9[_0x3c10e9.length - 1]) {
      _0x3c10e9.push(_0x3c10e9[0]);
    }
  }
  _0x1efc1a = -_0x1efc1a;
  if (_0x39fb5e || _0x571b) {
    if (!_0x39fb5e && _0x571b) {
      _0x39fb5e ||= 100;
    }
  } else {
    _0x39fb5e ||= 200;
  }
  let _0x40deb1 = (90 - Math.abs(_0x1efc1a)) / 15 * _0x39fb5e / 100;
  _0x39fb5e = (_0x39fb5e / 2 - _0x40deb1) / (_0x3c10e9.length - 1);
  let _0x17b934 = (IsAnimationOn() ? "repeating-" : "") + ("linear-gradient(" + _0x1efc1a + "deg");
  for (let _0xfac281 = 0; _0xfac281 < _0x3c10e9.length; _0xfac281++) {
    _0x17b934 += "," + _0x3c10e9[_0xfac281];
    _0x17b934 += _0x571b ? " " + (_0x40deb1 + _0x39fb5e * _0xfac281) + "%" : " " + _0xfac281 * 100 / (_0x3c10e9.length - 1) + "%";
  }
  _0x17b934 += ")";
  return [_0x58f058, _0x17b934];
}
function nameFlag(_0x4d4e93, _0x1c34d4, _0x5d662c, _0x5c4752) {
  const _0x28e8e2 = {
    "1": 12,
    "3": 72
  };
  const _0x1346c4 = {
    "1": 0,
    "3": 0.2,
    "4": 0.3
  };
  let _0x1b8bd6;
  let _0x35ea18 = 4;
  let _0x424278 = 0.25;
  let _0x305b11 = 36;
  let _0x1049b6 = 1;
  let _0x21e6c7 = -1;
  let _0x58f18b = _0x4d4e93[0] == "jewel";
  let _0x189047 = 2 / 3;
  let _0x1a3d91 = 36;
  let _0x452b65 = _0x5c4752 & NamePowers.everypower;
  if (_0x58f18b) {
    _0x1b8bd6 = _0x452b65 ? "10A012" : "DC143C";
  }
  if (_0x4d4e93.length) {
    if (_0x58f18b && _0x4d4e93[1] && _0x4d4e93[1].length == 6) {
      let _0x57ca4d = getJewelCol(_0x4d4e93[1], _0x452b65);
      if (_0x57ca4d) {
        _0x1b8bd6 = _0x57ca4d;
      }
    }
    for (let _0x2b93ae = 1; _0x2b93ae < _0x4d4e93.length; _0x2b93ae++) {
      if (!_0x4d4e93[_0x2b93ae]) {
        continue;
      }
      let _0x3c2b01 = _0x4d4e93[_0x2b93ae].charAt(0);
      let _0x14ceec = parseInt(_0x4d4e93[_0x2b93ae].substr(1));
      switch (_0x3c2b01) {
        case "r":
          _0x35ea18 = 2;
          break;
        case "e":
          _0x35ea18 = 3;
          break;
        case "u":
          _0x35ea18 = 5;
          break;
        case "f":
          switch (_0x14ceec) {
            case 1:
              _0x1a3d91 = 72;
              break;
            case 2:
              _0x1a3d91 = 48;
              break;
            case 3:
              _0x1a3d91 = 36;
              break;
            case 4:
              _0x1a3d91 = 18;
          }
          break;
        case "c":
          _0x305b11 = _0x28e8e2[_0x14ceec];
          _0x305b11 ||= 36;
          break;
        case "g":
          _0x424278 = _0x1346c4[_0x14ceec];
          _0x424278 ||= 0.1;
          break;
        case "d":
          _0x21e6c7 = -_0x21e6c7;
      }
    }
  }
  let _0x351da6 = _0x1a3d91 / 12;
  if (_0x35ea18 == 5) {
    let _0x44bf24 = document.createElement("canvas");
    _0x44bf24.width = Math.ceil(_0x1c34d4.offsetWidth);
    _0x44bf24.height = Math.round(_0x44bf24.width * (_0x5d662c.naturalHeight / _0x5d662c.naturalWidth));
    let _0x5b5267 = _0x44bf24.getContext("2d");
    if (_0x58f18b) {
      _0x5b5267.fillStyle = "#" + _0x1b8bd6;
      _0x5b5267.fillRect(0, 0, _0x44bf24.width, _0x44bf24.height);
    }
    _0x5b5267.drawImage(_0x5d662c, 0, 0, _0x44bf24.width, _0x44bf24.height);
    _0x1c34d4.style.backgroundImage = "url('" + _0x44bf24.toDataURL() + "')";
    if (IsAnimationOn()) {
      _0x1c34d4.style.animation = "nameFlag " + _0x351da6 + "s ease-in-out infinite alternate";
    }
    addClass("nameFlag", 0, _0x1c34d4);
    return;
  }
  if (!_0x1c34d4) {
    return !1;
  }
  if (_0x58f18b) {
    _0x189047 = 1;
  }
  let _0xb8d134 = Math.ceil(_0x1c34d4.offsetWidth);
  let _0x433e80 = Math.ceil(_0x1c34d4.offsetHeight);
  if (!_0x433e80) {
    return;
  }
  let _0x296dbb = document.createElement("canvas");
  _0x296dbb.width = _0xb8d134;
  _0x296dbb.height = _0x433e80 * _0x1a3d91;
  let _0x49863d = _0x296dbb.getContext("2d");
  let _0x92244a = document.createElement("canvas");
  _0x92244a.width = _0xb8d134;
  _0x92244a.height = _0x433e80;
  let _0x58e574 = _0x92244a.getContext("2d");
  let _0x3b0a36 = _0x5d662c.naturalWidth;
  let _0x32bcd7 = _0x5d662c.naturalHeight;
  let _0x2130ac = _0xb8d134 / _0x3b0a36;
  let _0x540318 = _0x3b0a36 * _0x2130ac * _0x189047;
  let _0xbbdc07 = _0x32bcd7 * _0x2130ac;
  if (_0x58f18b) {
    _0x49863d.fillStyle = "#" + _0x1b8bd6;
    _0x49863d.fillRect(0, 0, _0xb8d134, _0x433e80 * _0x1a3d91);
  }
  let _0x1d782b = new Array();
  let _0x1cd741 = new Array();
  if (_0x35ea18 == 2 || _0x35ea18 == 3 || _0x35ea18 == 4) {
    let _0x217415 = _0x3b0a36 / _0x32bcd7;
    if (_0x217415 > _0x1049b6) {
      _0x1049b6 = _0x217415;
    }
  }
  if (_0x35ea18 == 3 || _0x35ea18 == 4) {
    for (var _0x30569d = 0; _0x30569d < _0x305b11; _0x30569d++) {
      if (_0x35ea18 == 3 || _0x35ea18 == 4) {
        _0x1d782b[_0x30569d] = Math.sin(Math.PI * 2 * (_0x30569d / _0x305b11));
      }
      if (_0x35ea18 == 4) {
        _0x1cd741[_0x30569d] = Math.cos(Math.PI * 2 * (_0x30569d / _0x305b11));
      }
    }
  }
  for (let _0x2fbb60 = 0; _0x2fbb60 < _0x1a3d91; _0x2fbb60++) {
    let _0x32562d = _0xb8d134 / 2;
    let _0x34964c = _0x433e80 / 2;
    let _0x3ba6ae = 0;
    let _0x2b6840 = 1;
    switch (_0x35ea18) {
      case 2:
        _0x3ba6ae = -360 / _0x1a3d91 * _0x2fbb60 * _0x21e6c7;
        _0x32562d = _0xb8d134 / 2;
        _0x34964c = _0x433e80 / 2;
        _0x2b6840 = _0x1049b6;
        break;
      case 3:
        _0x3ba6ae = -360 / _0x1a3d91 * _0x2fbb60 * _0x21e6c7;
        _0x32562d = _0xb8d134 / 2;
        _0x34964c = _0x433e80 / 2;
        _0x2b6840 = _0x1049b6 + _0x1049b6 * _0x424278 + _0x1049b6 * _0x424278 * _0x1d782b[_0x2fbb60 % _0x305b11];
        break;
      case 4:
        _0x3ba6ae = -360 / _0x1a3d91 * _0x2fbb60 * _0x21e6c7;
        _0x32562d = _0xb8d134 / 2 + _0xb8d134 * _0x424278 * _0x1cd741[_0x2fbb60 % _0x305b11];
        _0x34964c = _0x433e80 / 2 + _0x433e80 * _0x424278 * _0x1d782b[_0x2fbb60 % _0x305b11];
        _0x2b6840 = _0x1049b6 + _0x1049b6 * _0x424278 * 2;
    }
    _0x58e574.clearRect(0, 0, _0xb8d134, _0x433e80);
    _0x58e574.save();
    _0x58e574.translate(_0x32562d, _0x34964c);
    _0x58e574.rotate(_0x3ba6ae * Math.PI / 180);
    _0x58e574.scale(_0x2b6840, _0x2b6840);
    _0x58e574.translate(-_0xb8d134 / 2, -_0x433e80 / 2);
    _0x58e574.drawImage(_0x5d662c, _0xb8d134 / 2 - _0x540318 / 2, _0x433e80 / 2 - _0xbbdc07 / 2, _0x540318, _0xbbdc07);
    _0x58e574.restore();
    _0x49863d.drawImage(_0x92244a, 0, _0x433e80 * _0x2fbb60, _0xb8d134, _0x433e80);
  }
  _0x1c34d4.style.backgroundImage = "url('" + _0x296dbb.toDataURL() + "')";
  addClass("nameStrip", 0, _0x1c34d4);
  if (IsAnimationOn()) {
    _0x1c34d4.style.animation = "nameStrip" + _0x1a3d91 + " " + _0x351da6 + "s steps(" + _0x1a3d91 + ") infinite normal";
    _0x1c34d4.style.backgroundSize = "100% " + _0x1a3d91 + "00%";
  }
}
function getJewelCol(_0x179b50, _0x3ccf24) {
  if (!_0x179b50) {
    return !1;
  }
  if (!_0x3ccf24) {
    let _0x37cdcd = parseInt(_0x179b50, 16);
    if (isNaN(_0x37cdcd)) {
      _0x37cdcd = 1;
    }
    let _0x48eefa = _0x37cdcd >> 16 & 255;
    let _0x152d01 = _0x37cdcd >> 8 & 255;
    let _0x2da78d = _0x37cdcd & 255;
    if (_0x152d01 > _0x48eefa) {
      _0x152d01 = _0x48eefa;
    }
    if (_0x152d01 > _0x2da78d) {
      _0x152d01 = _0x2da78d;
    }
    _0x37cdcd = (_0x48eefa << 16) + (_0x152d01 << 8) + _0x2da78d;
    _0x179b50 = toHex6(_0x37cdcd);
  }
  return _0x179b50;
}
function removeDodgy(_0x4a491d) {
  if (_0x4a491d.match(/&.*;/)) {
    _0x4a491d = _0x4a491d.replace(/&apos;/g, "'").replace(/&quot;/g, "\"").replace(/&amp;/g, "＆").replace(/&slsh;/g, "\\").replace(/&gt;/g, "〉").replace(/&lt;/g, "〈");
  }
  return _0x4a491d;
}
function ProcessName(_0x2f9713 = "", _0x16e661 = 0, _0x4c5753 = "") {
  const _0x59d11e = {};
  if (_0x4c5753 && typeof _0x4c5753 == "string") {
    const _0x16611c = _0x4c5753.split("#");
    _0x59d11e.statusColor = hasDarkMode() ? "#969696" : 0;
    if (_0x16e661 & NamePowers.status) {
      _0x59d11e.status = _0x16611c[0].replace(/_/g, " ");
    }
    if (_0x16e661 & NamePowers.statusglow && _0x16611c.length > 1) {
      _0x59d11e.statusGlow = DecodeColor(_0x16611c[1], _0x16e661);
      if (_0x16e661 & NamePowers.statuscol && _0x16611c.length > 2) {
        _0x59d11e.statusColor = DecodeColor(_0x16611c[2], _0x16e661);
      }
    }
  }
  if (_0x2f9713) {
    _0x59d11e.name = _0x2f9713.replace(/\s*\(\uFEFF?hat#.*?\)\s*/gi, " ").replace(/\s*\(\uFEFF?glow.*?\)\s*/gi, " ").replace(/[\s_]*$/gi, "");
    if (_0x16e661 & NamePowers.nospace) {
      _0x59d11e.name = _0x59d11e.name.replace(/_/g, " ");
    }
    let _0x551864 = -1;
    if (_0x16e661 & NamePowers.glow && (_0x551864 = _0x2f9713.toLowerCase().indexOf("(glow")) != -1) {
      const _0x5776ae = _0x2f9713.slice(_0x551864, _0x2f9713.indexOf(")", _0x551864)).split("#");
      if (_0x5776ae[0]) {
        _0x59d11e.glow = 65280;
      }
      if (_0x5776ae[1]) {
        _0x59d11e.glow = DecodeColor(_0x5776ae[1], _0x16e661);
      }
      if (_0x5776ae[2] == "grad" && _0x16e661 & NamePowers.grad) {
        if (_0x5776ae.length - 3 == 1 && _0x5776ae[3]) {
          _0x59d11e.color = DecodeColor(_0x5776ae[3], _0x16e661);
        } else {
          _0x59d11e.grad = [];
          _0x16e661 |= NamePowers.valid;
          for (let _0x5ee27c = 3; _0x5ee27c < _0x5776ae.length; _0x5ee27c++) {
            const _0x487d21 = _0x5776ae[_0x5ee27c][0];
            if (_0x487d21 != "o" && (_0x487d21 != "f" || _0x5776ae[_0x5ee27c].length == 6) || _0x16e661 & NamePowers.wave) {
              _0x59d11e.grad.push(DecodeColor(_0x5776ae[_0x5ee27c], _0x16e661));
            }
          }
          if (_0x16e661 & NamePowers.wave) {
            _0x59d11e.grad.push("NW");
          }
        }
      } else if (_0x5776ae[2] == "jewel" && _0x16e661 & NamePowers.jewel) {
        _0x59d11e.flag = [];
        for (let _0x485748 = 2; _0x485748 < _0x5776ae.length; _0x485748++) {
          _0x59d11e.flag[_0x485748 - 2] = _0x5776ae[_0x485748];
        }
      } else if (_0x5776ae[2] == "flag" && _0x16e661 & NamePowers.flag) {
        _0x59d11e.flag = [];
        for (let _0x1d7a81 = 3; _0x1d7a81 < _0x5776ae.length; _0x1d7a81++) {
          _0x59d11e.flag[_0x1d7a81 - 3] = _0x5776ae[_0x1d7a81];
        }
      } else if (_0x16e661 & NamePowers.col && _0x5776ae[2]) {
        _0x59d11e.color = DecodeColor(_0x5776ae[2], _0x16e661);
      }
    }
  }
  return _0x59d11e;
}
function addGlow(_0x261fd4, _0x8d7e1b, _0x3dfb05) {
  const _0x300810 = _0x261fd4.cloneNode(!0);
  let _0x4b0b34;
  _0x300810.className = "userNick nameGlow";
  _0x300810.style.cssText = "position: absolute; left: 0; z-index: -1;";
  if (_0x4b0b34 = _0x300810.querySelector(".nameGlow")) {
    _0x4b0b34.remove();
  }
  _0x261fd4.appendChild(_0x300810);
  const _0xb4cda2 = [..._0x300810.querySelectorAll("[data-sm]")];
  for (let _0x12e8dc = 0; _0x12e8dc < _0xb4cda2.length; _0x12e8dc++) {
    const _0x5e6c4a = _0xb4cda2[_0x12e8dc];
    _0x5e6c4a.innerHTML = "";
    _0x5e6c4a.dataset.noload = !0;
  }
  _0x261fd4.style.position = "relative";
  _0x300810.style.textShadow = MakeGlow(_0x8d7e1b.glow);
  _0x300810.style["-webkit-text-fill-color"] = "transparent";
}
function createNameSm(_0x5f3db2, _0x1e86e3, _0x1c3d6c = {}) {
  const {
    flags: _0x261453 = 0,
    pawn: _0x11c166,
    status: _0x471fe7 = "",
    statusfx: _0x37e4af = "",
    userId: _0x456578,
    xNum: _0x419f9d = 0,
    parent: _0x230846,
    fromActions: _0x371f1a = !1,
    forceStatus: _0x5751fe = !1
  } = _0x1c3d6c;
  _0x1c3d6c.align3 = !0;
  _0x1c3d6c.align2 = !1;
  const _0x39224a = ProcessName(_0x1e86e3 = removeDodgy(_0x1e86e3), _0x261453 | NamePowers.nospace, removeDodgy(_0x471fe7));
  if (_0x371f1a) {
    _0x39224a.name = actions.stripParenthesesAndReduceString(_0x39224a.name);
  }
  if (_0x5751fe && _0x471fe7) {
    _0x39224a.status = _0x471fe7;
  }
  const _0x5684cc = createTextSm(_0x5f3db2, (_0x11c166 || "") + _0x39224a.name, _0x1c3d6c);
  if (_0x39224a.status) {
    const _0x3e570e = _0x37e4af ? _0x37e4af.replaceAll("#", "").split(",") : [];
    const _0x2800c1 = _0x3e570e.length ? xInt(_0x3e570e[0]) : 0;
    let _0x560204 = {};
    if (_0x3e570e.length && IsAnimationOn()) {
      try {
        let _0x4b4801 = decodeURIComponent(escape(atob(_0x3e570e[1])));
        if (!_0x4b4801.endsWith("}")) {
          _0x4b4801 += "}";
        }
        _0x560204 = JSON.parse(_0x4b4801);
      } catch (_0x5cb51c) {
        _0x560204 = {};
      }
    }
    _0x230846.classList.add("hasStatus");
    const _0xe587d2 = makeElement(_0x5f3db2, "p", null, "status" + _0x456578);
    _0xe587d2.className = "visitorsStatus darkStatus";
    const _0x2a3147 = makeElement(_0xe587d2, "p", null, "statusText" + _0x456578);
    _0x2a3147.style.display = "inline-block";
    if ("statusGlow" in _0x39224a) {
      _0xe587d2.style["text-shadow"] = MakeGlow(_0x39224a.statusGlow);
    }
    if ("statusColor" in _0x39224a) {
      _0xe587d2.style.color = "#" + toHex6(_0x39224a.statusColor);
    }
    if (_0x419f9d) {
      _0xe587d2.style.left = "calc(1.2rem + 20px + .35rem)";
    }
    if (!_Activity?.instance?.IsClassic) {
      _0xe587d2.style.top = "1rem";
    }
    createStatusfx(_0x39224a.status, _0x560204, _0x456578, _0x2800c1, _0x560204.effect == "translucent" ? _0x39224a.statusGlow : null, _0xe587d2, _0x2a3147);
  }
  if (_0x39224a.grad) {
    const _0xa1d2c6 = MakeGrad(_0x39224a.grad);
    _0x5684cc.classList.add("clip");
    _0x5684cc.style.backgroundImage = _0xa1d2c6[1];
    if (_0x39224a.grad.join("").toLowerCase().includes("o3")) {
      _0x5684cc.style.backgroundSize = "220% 100%";
    }
    if (_0xa1d2c6[0] && IsAnimationOn()) {
      _0x5684cc.className += " nameWave";
      _0x5684cc.style.animationDuration = _0xa1d2c6[0] + "s";
    }
    addGlow(_0x5684cc, _0x39224a, _0x1c3d6c);
    return _0x5684cc;
  }
  if (_0x39224a.flag) {
    const _0x3022a8 = _0x39224a.flag[0] || "x";
    const _0x215e6a = _0x3022a8 == "jewel" ? "png" : "svg";
    const _0x4ddbd1 = new Image();
    _0x4ddbd1.src = "/images/js/flag/" + _0x3022a8 + "." + _0x215e6a;
    _0x4ddbd1.onload = _0x2db1d2 => {
      _0x5684cc.classList.add("clip");
      nameFlag(_0x39224a.flag, _0x5684cc, _0x2db1d2.target, _0x261453);
    };
    addGlow(_0x5684cc, _0x39224a, _0x1c3d6c);
    return _0x5684cc;
  }
  if (_0x39224a.glow || _0x39224a.glow == 0) {
    _0x5684cc.style.textShadow = MakeGlow(_0x39224a.glow);
  }
  if (_0x39224a.color) {
    _0x5684cc.style.color = "#" + toHex6(_0x39224a.color);
  }
  return _0x5684cc;
}
const appCodes = {
  "30008": "trade",
  "10000": "doodle2",
  "30004": "grid",
  "20034": "translator",
  "40000": "live",
  "60201": "spacewar",
  "60193": "matchrace",
  "60189": "doodlerace",
  "60195": "snakerace",
  "60239": "switch",
  "60225": "hearts",
  "60247": "darts",
  "60257": "zwhack",
  "20038": "stick",
  "20042": "music",
  "20002": "chess",
  "20010": "fourinarow",
  "60002": "canvas",
  "20006": "pool",
  "20012": "supercycle",
  "20008": "nuclear",
  "20009": "count",
  "60685": "pawns"
};
function Debounce(_0xabda83) {
  let _0x1d8718;
  return function () {
    for (var _0x14dcf5 = arguments.length, _0x3eeb73 = new Array(_0x14dcf5), _0x29162f = 0; _0x29162f < _0x14dcf5; _0x29162f++) {
      _0x3eeb73[_0x29162f] = arguments[_0x29162f];
    }
    if (_0x1d8718) {
      cancelAnimationFrame(_0x1d8718);
    }
    _0x1d8718 = requestAnimationFrame(() => {
      _0xabda83(..._0x3eeb73);
    });
  };
}
function getOccurrencesCount(_0xaa8d4c, _0x14ac72) {
  return (_0x14ac72.match(new RegExp(_0xaa8d4c, "g")) || []).length;
}
function runWhen(_0x537ad9, _0x159326) {
  if (_0x537ad9) {
    _0x159326();
  } else {
    window.setTimeout(() => runWhen(_0x537ad9, _0x159326), 100);
  }
}
function createTextSm(_0x272a43, _0x3b11f7, _0x34129d = {}) {
  const {
    maxSmilies: _0x68303d = 10,
    flags: _0x516ce9 = 0,
    flags2: _0x8e6537 = 0,
    useMarkdown: _0x3c9db3,
    useLinks: _0x471d28,
    smClass: _0x5217c9 = "messageSm",
    align2: _0x1f925f,
    pawnFlags: _0x47d90f,
    xNum: _0x46f135 = 0,
    pawnTooltip: _0x5abd5c,
    scrollParent: _0x44626a,
    userId: _0x10fdd9,
    userName: _0xcb3546,
    useMark: _0x2000c0,
    className: _0x3194b4 = "messageText",
    size: _0x43ffc9 = 20,
    align3: _0x374059 = !0,
    relation: _0x3ad2aa,
    flagPawn: _0x16b337 = "",
    hasBig: _0x1d6e18,
    showTooltip: _0x48484f = !0,
    isName: _0x2a1084 = !1
  } = _0x34129d;
  _0x3b11f7 = removeDodgy(_0x3b11f7);
  _0x272a43.documentBody = document.body;
  let _0x540502 = _0x3b11f7.trim().split(/(\([a-zA-Z0-9].*?\)|<.*?>|[ \t]+)/).filter(_0x2e4572 => _0x2e4572?.length);
  let _0x3c80f6 = "";
  for (const _0x5a055e in _0x540502) {
    if (_0x3c80f6 && _0x540502[_0x5a055e].startsWith("(") && _0x3c80f6.slice(-1) == "﻿") {
      _0x540502[_0x5a055e] = _0x540502[_0x5a055e].replace("(", "(﻿");
      _0x3c80f6 = "";
    }
    _0x3c80f6 = _0x540502[_0x5a055e];
  }
  const _0x5039ab = _0x1d6e18 && _0x540502.length == 1 && _0x540502[0][0] == "(" && _0x540502[0].indexOf("#size#w") == -1;
  const _0x4e9902 = _Activity.instance.UserSettings?.inappwords != "disable";
  const _0x4fbaed = makeElement(_0x272a43, "span", _0x3194b4);
  _0x4fbaed.holder = _0x272a43;
  if (_0x516ce9 & NamePowers.italic || _0x3b11f7.substr(0, 6) == "<inf8>" || _0x3194b4 != "userNick" && _0x10fdd9 == 0) {
    _0x4fbaed.style.fontStyle = "italic";
  }
  const _0x2a6d77 = {
    bold: !1,
    italic: !1,
    strike: !1,
    quote: !1,
    quoteId: !1,
    hyperText: !1
  };
  let _0x13a482 = 0;
  let _0x5a728c = !1;
  let _0x34cd12 = _0x2a6d77;
  let _0x25a57a = "";
  let _0x2d3cec = "";
  let _0x396879 = 0;
  const _0xd7a7a2 = /\[.*?\]\(.*?\)/.test(_0x3b11f7);
  for (let _0x42d409 = 0; _0x42d409 < _0x540502.length; _0x42d409++) {
    let _0x3c96db = _0x540502[_0x42d409];
    let _0xbd055c = !1;
    let _0x3df224 = WordIsLink(_0x3c96db);
    if (_0x3c9db3) {
      let _0x479451 = 0;
      let _0x1ec533 = 0;
      let _0x21e54c = 0;
      let _0x162e32 = 0;
      if (_0xd7a7a2 && (_0x34cd12.hyperText || (_0x21e54c = _0x3c96db.indexOf("[")) != -1 && _0x3c96db.indexOf("❯") == -1)) {
        _0x5a728c = !0;
        if ((_0x21e54c = _0x3c96db.indexOf("](")) != -1 && (_0x162e32 = _0x3c96db.indexOf(")", _0x21e54c + 1)) > _0x21e54c && _0x162e32 - _0x21e54c > 1) {
          const _0x9f5e55 = _0x3c96db.split("](");
          const _0x59f059 = _0x9f5e55[1].split(")");
          const _0x2317e7 = _0x59f059[0];
          const _0x5930b2 = WordIsLink(_0x2317e7);
          if (_0x5930b2) {
            if (_0x3c96db.indexOf("[") != -1) {
              const _0x518c4a = _0x9f5e55[0].split("[");
              _0x25a57a += _0x518c4a[1];
              _0x59f059[1] = _0x518c4a[0];
            } else {
              _0x25a57a += _0x9f5e55[0];
            }
            if (WordIsLink(_0x25a57a)) {
              const _0x2d9274 = new Error("Could not use link markup, text is a URL");
              _0x2d9274.code = MessageErrorCodes.LinkInLinkMarkupDetected;
              return _0x2d9274;
            }
            const _0x3c0aeb = makeElement(_0x4fbaed, "a", "msgLink");
            _0x3c0aeb.style.color = "#190046";
            addText(_0x3c0aeb, _0x25a57a, !0);
            addToolTip(_0x3c0aeb, _0x5930b2, {
              position: "low",
              instant: !0
            });
            if (_0x5930b2.c) {
              _0x3c0aeb.style.color = _0x5930b2.c;
              if (_0x5930b2.l && !_0x5930b2.callBack) {
                _0x3c0aeb.addEventListener("click", _0x39d4f9 => {
                  _0x39d4f9.preventDefault();
                  handleLink(_0x39d4f9, _0x5930b2.l, _0xcb3546);
                });
              } else {
                _0x3c0aeb.addEventListener("click", _0x5930b2.callBack);
              }
            } else {
              _0x3c0aeb.addEventListener("mousedown", _0x1b5bce => {
                _0x1b5bce.preventDefault();
                if (_0x1b5bce.which == 2) {
                  handleLink(_0x1b5bce, _0x2317e7, _0xcb3546);
                }
              });
              _0x3c0aeb.addEventListener("click", _0x814e78 => {
                _0x814e78.preventDefault();
                handleLink(_0x814e78, _0x2317e7, _0xcb3546);
              });
            }
            if (_0x5930b2.c) {
              _0x3c0aeb.dataset.dark = true;
            } else {
              _0x3c0aeb.dataset.dark2 = true;
            }
            _0x34cd12.hyperText = !1;
            numberOfHyperTexts++;
            _0x3df224 = !1;
            _0x25a57a = "";
            if (!(_0x3c96db = _0x59f059[1])) {
              continue;
            }
          } else {
            if (_0x25a57a.length && _0x25a57a[0] != "[") {
              _0x25a57a = "[" + _0x25a57a;
            }
            _0x34cd12.hyperText = !1;
            _0x3c96db = "" + _0x25a57a + _0x3c96db;
            _0x25a57a = "";
            _0x3df224 = !1;
          }
        } else if (_0x3c96db.indexOf("[") != -1) {
          if (_0x42d409 != _0x540502.length - 1) {
            _0x34cd12.hyperText = !0;
            const _0x25793c = _0x3c96db.split("[");
            _0x25a57a += _0x25793c[1];
            _0x3c96db = _0x25793c[0];
          }
        } else {
          _0x34cd12.hyperText = !0;
          _0x25a57a += _0x3c96db;
          if (_0x42d409 != _0x540502.length - 1) {
            continue;
          }
          _0x34cd12.hyperText = !1;
          _0x3c96db = "[" + _0x25a57a;
          _0x25a57a = "";
          _0x3df224 = !1;
        }
      }
      if (_0x5a728c && _0x34cd12.bold && _0x34cd12.bold || (_0x21e54c = _0x3c96db.indexOf("*")) != -1 && getOccurrencesCount("\\*", _0x3b11f7) > 1) {
        if (!_0x34cd12.bold && (_0x162e32 = _0x3c96db.lastIndexOf("*")) > _0x21e54c && _0x162e32 - _0x21e54c > 1) {
          if (!_0x3df224 || _0x21e54c <= 0 || _0x21e54c <= 0 && _0x162e32 >= _0x3c96db.length - 1) {
            const _0x4073c8 = _0x3c96db.slice(_0x21e54c, _0x162e32 + 1);
            const _0xe52b0a = _0x4073c8.replace("*", "").replace(/\*$/, "");
            _0x3c96db = _0x3c96db.replace(_0x4073c8, "<strong style=\"font-family: Arial Black, Arial Bold, Gadget, sans-serif; user-select: auto;\">" + _0xe52b0a + "</strong>");
            _0x5a728c = !0;
            _0x3df224 &&= WordIsLink(_0xe52b0a);
          }
        } else {
          _0x5a728c = !0;
          if (_0x34cd12.bold && _0x3c96db.indexOf("*") != -1) {
            _0x34cd12.bold = false;
          } else {
            _0x34cd12.bold = true;
          }
          const _0xd225c7 = _0x3c96db.replace("*", "");
          _0x3c96db = "<strong style=\"font-family: Arial Black, Arial Bold, Gadget, sans-serif; user-select: auto;\">" + _0xd225c7 + "</strong>";
          _0x3df224 &&= WordIsLink(_0xd225c7);
        }
      }
      if (_0x5a728c && _0x34cd12.italic || (_0x21e54c = _0x3c96db.indexOf("_")) != -1 && getOccurrencesCount("_", _0x3b11f7) > 1) {
        if (!_0x34cd12.italic && (_0x162e32 = _0x3c96db.lastIndexOf("_")) > _0x21e54c && _0x162e32 - _0x21e54c > 1) {
          if ((!(_0x479451 = _0x3c96db[_0x21e54c - 1]) || _0x479451 == " ") && (!(_0x1ec533 = _0x3c96db[_0x162e32 + 1]) || _0x1ec533 == " ") && (!_0x3df224 || _0x21e54c <= 0 || _0x21e54c <= 0 && _0x162e32 >= _0x3c96db.length - 1)) {
            const _0x56696c = _0x3c96db.slice(_0x21e54c, _0x162e32 + 1);
            const _0x4056c5 = _0x56696c.replace("_", "").replace(/_$/, "");
            _0x3c96db = _0x3c96db.replace(_0x56696c, "<em style='user-select: auto;'>" + _0x4056c5 + "</em>");
            _0x5a728c = !0;
            _0x3df224 &&= WordIsLink(_0x4056c5);
          }
        } else {
          _0x5a728c = !0;
          if (_0x34cd12.italic && _0x3c96db.indexOf("_") != -1) {
            _0x34cd12.italic = false;
          } else {
            _0x34cd12.italic = true;
          }
          const _0xcc520d = _0x3c96db.replace("_", "");
          _0x3c96db = "<em style='user-select: auto;'>" + _0xcc520d + "</em>";
          _0x3df224 &&= WordIsLink(_0xcc520d);
        }
      }
      if (_0x5a728c && _0x34cd12.strike || (_0x21e54c = _0x3c96db.indexOf("~")) != -1 && getOccurrencesCount("~", _0x3b11f7) > 1) {
        if (!_0x34cd12.strike && (_0x162e32 = _0x3c96db.lastIndexOf("~")) > _0x21e54c && _0x162e32 - _0x21e54c > 1) {
          if (!_0x3df224 || _0x21e54c <= 0 || _0x21e54c <= 0 && _0x162e32 >= _0x3c96db.length - 1) {
            const _0x49ad42 = _0x3c96db.slice(_0x21e54c, _0x162e32 + 1);
            const _0x4f6b04 = _0x49ad42.replace("~", "").replace(/~$/, "");
            _0x3c96db = _0x3c96db.replace(_0x49ad42, "<del style='user-select: auto;'>" + _0x4f6b04 + "</del>");
            _0x5a728c = !0;
            _0x3df224 &&= WordIsLink(_0x4f6b04);
          }
        } else {
          _0x5a728c = !0;
          if (_0x34cd12.strike && _0x3c96db.indexOf("~") != -1) {
            _0x34cd12.strike = false;
          } else {
            _0x34cd12.strike = true;
          }
          const _0x582526 = _0x3c96db.replace("~", "");
          _0x3c96db = "<del style='user-select: auto;'>" + _0x582526 + "</del>";
          _0x3df224 &&= WordIsLink(_0x582526);
        }
      }
      if (_0x34cd12.quote || _0x396879 < 1 && (_0x21e54c = _0x3c96db.indexOf("❯[")) != -1 && _0x3c96db.indexOf("❯#") == -1) {
        if (!_0x34cd12.quote && (_0x162e32 = _0x3c96db.indexOf("]", _0x21e54c + 1)) > _0x21e54c && _0x162e32 - _0x21e54c > 1) {
          _0x396879++;
          let _0x4051f4 = _0x3c96db.slice(_0x21e54c, _0x162e32 + 1);
          _0x4051f4 = cleanXatTagsIcons(_0x4051f4);
          _0x3c96db = _0x3c96db.replace(_0x4051f4, "<p class=\"blockquote\"><span class=\"pill\"></span>" + _0x4051f4.replace("❯[", "").replace("]", "") + "</p>");
          _0xbd055c = _0x5a728c = !0;
        } else {
          _0x5a728c = !0;
          if (_0x3c96db.indexOf("[") != -1) {
            if (_0x42d409 != _0x540502.length - 1) {
              _0x34cd12.quote = !0;
              const _0x3563c7 = _0x3c96db.split("❯[");
              _0x2d3cec += _0x3563c7[1].replace("❯[", "");
              _0x3c96db = _0x3563c7[0] + "<p class=\"blockquoteContent\"></p>";
            }
          } else if (_0x3c96db.indexOf("]") != -1) {
            _0x396879++;
            const _0x3c5980 = _0x3c96db.split("]");
            _0x2d3cec += _0x3c5980[0];
            _0x2d3cec = cleanXatTagsIcons(_0x2d3cec);
            _0x4fbaed.querySelector(".blockquoteContent").insertAdjacentHTML("beforeend", "<p class=\"blockquote\"><span class=\"pill\"></span>" + _0x2d3cec + "</p>");
            _0x34cd12.quote = !1;
            _0x2d3cec = "";
            if (_0x3df224 && _0x3c5980[1]) {
              _0x3df224 = WordIsLink(_0x3c5980[1]);
            }
            if (!(_0x3c96db = _0x3c5980[1])) {
              continue;
            }
          } else {
            _0x34cd12.quote = !0;
            _0x2d3cec += _0x3c96db;
            if (_0x42d409 != _0x540502.length - 1) {
              continue;
            }
            _0x34cd12.quote = !1;
            _0x3c96db = "❯[" + _0x2d3cec;
          }
        }
      }
      if (_0x34cd12.quoteId || _0x396879 < 1 && (_0x21e54c = _0x3c96db.indexOf("❯#")) != -1 && _0x3c96db.indexOf("[") != -1) {
        if (!_0x34cd12.quoteId && (_0x162e32 = _0x3c96db.indexOf("]", _0x21e54c + 1)) > _0x21e54c && _0x162e32 - _0x21e54c > 1) {
          _0x396879++;
          let _0x188458 = _0x3c96db.slice(_0x21e54c, _0x162e32 + 1);
          _0x188458 = cleanXatTagsIcons(_0x188458);
          _0x3c96db = _0x3c96db.replace(_0x188458, "<p class=\"blockquote\"><span class=\"pill\"></span>" + _0x188458.replace(/(\❯\#.*?)\[/, "").replace("]", "") + "</p>");
          _0xbd055c = _0x5a728c = !0;
        } else {
          _0x5a728c = !0;
          if (_0x3c96db.indexOf("[") != -1) {
            if (_0x42d409 != _0x540502.length - 1) {
              _0x34cd12.quoteId = !0;
              const _0x46bcb5 = _0x3c96db.split(/\❯\#.*?\[/);
              const _0x3e316b = _0x3c96db.match(/\❯\#(.*?)\[/)[1];
              _0x2d3cec += _0x46bcb5[1].replace(/(\❯\#.*?)\[/, "");
              _0x3c96db = _0x46bcb5[0] + "<p class=\"blockquoteContent\" data-quote=\"" + _0x3e316b + "\"></p>";
            }
          } else if (_0x3c96db.indexOf("]") != -1) {
            _0x396879++;
            const _0x405d6d = _0x3c96db.split("]");
            _0x2d3cec += _0x405d6d[0].replace(/\(.*?\)/g, "");
            _0x2d3cec = cleanXatTagsIcons(_0x2d3cec);
            const _0x43b9b4 = _0x4fbaed.querySelector(".blockquoteContent");
            _0x43b9b4.insertAdjacentHTML("beforeend", "<p class=\"blockquote\"><span class=\"pill\"></span>" + _0x2d3cec + "</p>");
            if (_0x3df224 && _0x405d6d[1]) {
              _0x3df224 = WordIsLink(_0x405d6d[1]);
            }
            let _0x861be8 = document.querySelector("[data-msgid=\"" + _0x43b9b4.dataset.quote + "\"]");
            if (_0x861be8) {
              addToolTip(_0x43b9b4, ["mob2.originalmsg", "Go to original message"], {
                position: "low"
              });
              _0x43b9b4.addEventListener("click", _0x481fe1 => {
                if (_0x861be8) {
                  _0x861be8.scrollIntoView({
                    behavior: "smooth",
                    block: "end"
                  });
                }
              });
            }
            _0x34cd12.quoteId = !1;
            _0x2d3cec = "";
            if (!(_0x3c96db = _0x405d6d[1])) {
              continue;
            }
          } else {
            _0x34cd12.quoteId = !0;
            _0x2d3cec += _0x3c96db;
            _0x2d3cec = cleanXatTagsIcons(_0x2d3cec);
            if (_0x42d409 != _0x540502.length - 1) {
              continue;
            }
            {
              const _0x2199b5 = _0x4fbaed.querySelector(".blockquoteContent");
              _0x34cd12.quoteId = !1;
              _0x3c96db = "❯#" + _0x2199b5.dataset.quote + "[" + _0x2d3cec;
            }
          }
        }
      }
    }
    if (!_0x471d28 || !_0x3df224 || _0x3df224[0] == "(" && _0x3df224[_0x3df224.length - 1] == ")") {
      if (_0x3c96db.length > 2) {
        let _0x1c98c7 = _0x3c96db;
        const _0x2cfa29 = _0x3c96db.match(/(\(.*?\))/);
        if (_0x2cfa29) {
          _0x1c98c7 = _0x2cfa29[1];
        }
        if (_0x1c98c7[0] == "(" && _0x1c98c7[_0x1c98c7.length - 1] == ")" && _0x1c98c7[1] != "﻿" && _0x1c98c7[1] != " ") {
          if (_0x13a482 == _0x68303d || _0x3c96db.toLowerCase() == "(glow)" || _0x3c96db.toLowerCase() == "(none)" || _0x3c96db.toLowerCase().indexOf("(none#") >= 0 || _0x3c96db.toLowerCase().indexOf("(glow#") >= 0) {
            continue;
          }
          const _0x15b553 = _0x1c98c7.substr(0, 3) == "(p1";
          let _0x3a7530 = _0x15b553 ? _0x5abd5c : _0x1c98c7;
          let _0x5ed1f3 = _0x15b553 ? "left" : "top";
          const _0x183c3a = _Activity.instance.Smilies.MakeSmiley(_0x4fbaed, _0x1c98c7, {
            size: _0x5039ab ? _0x43ffc9 * 2 : _0x43ffc9,
            align2: _0x1f925f,
            align3: _0x374059,
            addGback: !0,
            userID: _0x10fdd9,
            showAd: !_0x15b553,
            userName: _0xcb3546,
            scrollParent: _0x44626a,
            className: _0x5217c9 + (_0x5039ab ? " big" : ""),
            _window: window,
            applyEffects: !_0x15b553 && getSettingsValue("ultrasmiley") === "enable",
            pawnFlags: _0x15b553 ? _0x47d90f : 0,
            tooltip: _0x48484f || _0x15b553 ? _0x3a7530 : "",
            tooltipPosition: _0x5ed1f3,
            isName: _0x2a1084
          });
          if (_0x15b553) {
            const _0x210918 = _0x47d90f & PawnFlags.isBffed;
            const _0x165f71 = _0x47d90f & PawnFlags.isMarried;
            let _0x282600 = _0x183c3a.querySelector(".pawnStuff");
            _0x282600 ||= makeElement(_0x183c3a, "div", "pawnStuff");
            _0x282600.innerHTML = "";
            if (_0x46f135) {
              _Activity.instance.Smilies.MakeSmiley(_0x4fbaed, _0x46f135, {
                size: 20,
                userID: _0x10fdd9,
                userName: _0xcb3546,
                scrollParent: _0x44626a,
                tooltip: ["box.143", "On App"],
                tooltipPosition: "left",
                showAd: false,
                className: "appIcon",
                align2: _0x1f925f,
                align3: _0x374059,
                callback: _0x515d89 => {
                  const _0x497a2d = {
                    id: _0x10fdd9,
                    regname: _0xcb3546
                  };
                  _0x515d89.stopPropagation();
                  if (_0x46f135.indexOf("#") >= 0) {
                    openApp(_0x46f135.split("#")[0]);
                  } else if (_0x46f135 == 10001) {
                    openApp({
                      type: "media",
                      link: null
                    });
                  } else if (_0x46f135 == 20044) {
                    openGift(_0x497a2d);
                  } else {
                    openApp(appCodes[_0x46f135]);
                  }
                }
              });
            }
            if (_0x47d90f & PawnFlags.isInvisible) {
              _0x183c3a.style.opacity = 0.35;
            } else {
              _0x183c3a.style.opacity = 1;
            }
            if (_0x8e6537 & NamePowers.isBlocked) {
              makeElement(_0x282600, "img", "blockIcon").src = "svg/report2.svg";
            } else {
              if (_0x16b337) {
                _Activity.instance.Smilies.MakeSmiley(_0x282600, "(tickle#flgpwn#w" + _0x16b337 + ")", {
                  size: 20,
                  align2: _0x1f925f,
                  align3: _0x374059,
                  userID: _0x10fdd9,
                  showAd: false,
                  userName: _0xcb3546,
                  scrollParent: _0x44626a,
                  className: "flagPawn"
                });
              }
              if (_0x47d90f & PawnFlags.isAway) {
                _Activity.instance.Smilies.MakeSmiley(_0x282600, "(tickle#away)", {
                  size: 20,
                  align2: _0x1f925f,
                  align3: _0x374059,
                  userID: _0x10fdd9,
                  showAd: false,
                  userName: _0xcb3546,
                  scrollParent: _0x44626a,
                  className: "away"
                });
              }
            }
            if (_0x165f71 || _0x210918) {
              let _0x34a38b;
              let _0x5ce4c8;
              if (_0x3ad2aa) {
                _0x34a38b = document.querySelector("[data-user=\"" + _0x3ad2aa + "\"]");
                const _0xa3904f = _0x34a38b.querySelector(".relIcon2");
                _0xa3904f?.parentNode.removeChild(_0xa3904f);
              }
              if (_0x47d90f & PawnFlags.isBuddyAbove && _0x210918) {
                _0x5ce4c8 = makeElement(_0x282600, "img", Classic ? "relIcon" : "relMob");
                _0x5ce4c8.src = "svg/bffed.svg";
                if (Classic && _0x34a38b?.classList.contains("hasStatus")) {
                  _0x5ce4c8.style.top = "-12px";
                }
              } else if (_0x47d90f & PawnFlags.isBuddyAbove && _0x165f71) {
                _0x5ce4c8 = makeElement(_0x282600, "img", Classic ? "relIcon" : "relMob");
                _0x5ce4c8.src = "svg/married.svg";
                if (Classic && _0x34a38b?.classList.contains("hasStatus")) {
                  _0x5ce4c8.style.top = "-12px";
                }
              } else if (!!(_0x47d90f & PawnFlags.isRegistered) && _0x1c98c7.indexOf("#frnt1#w128") == -1 && _0x1c98c7.indexOf("#frnt1#w288") == -1 && _0x1c98c7.indexOf("#frnt1#w272") == -1 && _0x1c98c7.indexOf("#frnt1#w32") == -1 && _0x1c98c7.indexOf("#frnt1#w16") == -1 && _0x1c98c7.indexOf("#frnt1w256") == -1 && !(_0x47d90f & PawnFlags.isBuddyBelow) && !(_0x47d90f & PawnFlags.isTyping) && !(_0x47d90f & PawnFlags.isAway) && !(_0x47d90f & PawnFlags.isGagged)) {
                if (_0x210918) {
                  _0x5ce4c8 = makeElement(_0x282600, "img", "relIcon2");
                  _0x5ce4c8.src = "svg/bffed" + (_0x47d90f & PawnFlags.isSubscriber ? "" : 2) + ".svg";
                } else if (_0x165f71) {
                  _0x5ce4c8 = makeElement(_0x282600, "img", "relIcon2");
                  _0x5ce4c8.src = "svg/married" + (_0x47d90f & PawnFlags.isSubscriber ? "" : 2) + ".svg";
                }
              }
            }
          }
          _0x13a482++;
          continue;
        }
        if (_0x1c98c7[0] == "#" && audiesList.includes(_0x3c96db.substr(1))) {
          const _0x183062 = makeElement(makeElement(_0x4fbaed, "span"), "img", "speaker");
          _0x183062.src = "svg/spk.svg";
          addToolTip(_0x183062, _0x1c98c7);
          _0x183062.addEventListener("click", _0x5d1b1a => {
            doSound(_0x1c98c7.substr(1), !0);
          });
          continue;
        }
        let _0x1c61f8;
        const _0x35b0a2 = JSON.parse(_Activity.instance.UserSettings?.marks?.replace(/”/g, "\"") ?? "{}");
        if (!_0x2000c0 || _0xbd055c || _0x1c98c7[0] != "<" || _0x1c98c7[1] != "s" || isNaN(_0x1c98c7[2])) {
          if (!_0xbd055c && _Activity.instance.UserSettings?.marks?.length && hasPower(462) && _0x2000c0 && _0x1c98c7.length > 2 && (_0x1c61f8 = _0x35b0a2.find(_0x2c4fa4 => _0x1c98c7.toLowerCase().indexOf(_0x2c4fa4.name.toLowerCase()) != -1))) {
            _0x3c96db = "<span class=\"highlight\" style=\"color: " + (isColorLight(_0x1c61f8.color) ? "#000" : "#FFF") + "; background: " + _0x1c61f8.color + ";\">" + _0x3c96db + "</span >";
          } else if (!_0x5a728c && _0x1c98c7[0] == "<" && _0x1c98c7[_0x1c98c7.length - 1] == ">") {
            const _0x1bac7b = {
              size: _0x43ffc9,
              align: !0,
              scrollParent: _0x44626a,
              className: "messageIcon"
            };
            _Activity.instance.Smilies.MakeSmiley(_0x4fbaed, _0x1c98c7, _0x1bac7b);
            continue;
          }
        } else {
          _0x3c96db = "<span class=\"" + (!_0x4e9902 || "swear" + _0x1c98c7[2]) + "\">" + _0x1c98c7.slice(3, -2) + "</span>";
        }
      }
      _0x4fbaed.insertAdjacentHTML("beforeend", _0x3c96db);
    } else {
      const _0x3cfb2b = makeElement(_0x4fbaed, "a", "msgLink");
      _0x3cfb2b.style.color = "#190046";
      let _0x2076eb = !1;
      if (_Activity?.instance?.QuickBar?.isGiphyLink(_0x3c96db)) {
        _0x2076eb = _Activity?.instance?.QuickBar?.getGifSettings() != "disable" && _0xcb3546;
      }
      if (_0x2076eb) {
        _0x3cfb2b.classList.add("d-none");
        _0x3cfb2b.dataset.giphy = "1";
      }
      addText(_0x3cfb2b, _0x3c96db, _0x5a728c);
      addEventToLink(_0x3df224, _0x3cfb2b, _0xcb3546);
      if (_0x3df224.c) {
        _0x3cfb2b.dataset.dark = true;
      } else {
        _0x3cfb2b.dataset.dark2 = true;
      }
    }
  }
  const _0x489668 = [..._0x4fbaed.querySelectorAll("[class^=\"swear\"]")];
  for (let _0x5ac5ee = 0; _0x5ac5ee < _0x489668.length; _0x5ac5ee++) {
    const _0x44af61 = _0x489668[_0x5ac5ee];
    _0x44af61.onclick = () => _0x44af61.className = "";
  }
  return _0x4fbaed;
}
function addEventToLink(_0x3386f5, _0x1a5807, _0x3fb52b) {
  if (typeof _0x3386f5 == "object") {
    _0x1a5807.style.color = _0x3386f5.c;
    if (_0x3386f5.l && !_0x3386f5.callBack) {
      _0x1a5807.addEventListener("click", _0x4e36e2 => {
        _0x4e36e2.preventDefault();
        handleLink(_0x4e36e2, _0x3386f5.l, _0x3fb52b);
      });
    } else {
      _0x1a5807.addEventListener("click", _0x3386f5.callBack);
    }
  } else {
    _0x1a5807.addEventListener("mousedown", _0x3ab091 => {
      _0x3ab091.preventDefault();
      if (_0x3ab091.which == 2) {
        handleLink(_0x3ab091, _0x3386f5, _0x3fb52b);
      }
    });
    _0x1a5807.addEventListener("click", _0x5115d7 => {
      _0x5115d7.preventDefault();
      handleLink(_0x5115d7, _0x3386f5, _0x3fb52b);
    });
  }
}
function createStatusfx(_0x213353, _0x405901, _0x23dbcd, _0x47ee0a, _0x353069) {
  let {
    effect: _0x239f03,
    status2: _0x1f633b = "",
    speed: _0x119acf = 2,
    waveFrequency: _0x351c42 = 4
  } = _0x405901;
  const _0x2aadbe = _0x23dbcd === "new" ? document.querySelector("#statusNew") : document.querySelector("#statusText" + _0x23dbcd);
  const _0x70626f = _0x2aadbe.parentNode;
  _0x2aadbe.innerText = _0x213353;
  if (_Activity.instance.UserSettings?.statusfxAnim == "disable") {
    return;
  }
  _0x1f633b = _0x1f633b.trim();
  _0x1f633b = _0x1f633b.replace(new RegExp("['\"<>&=]", "gi"), "");
  _0x119acf = Math.max(1, Math.min(6, _0x119acf));
  _0x351c42 = Math.max(1, Math.min(6, _0x351c42));
  const _0x15e2d0 = Math.SQRT1_2 + 1;
  let _0x429b68 = _0x2aadbe.offsetWidth;
  if (_0x429b68 < 26) {
    _0x429b68 = 26;
  }
  let _0x4b2f20 = Math.ceil(_0x2aadbe.offsetHeight * _0x15e2d0);
  const _0x1a817c = _0x2aadbe.parentNode.offsetWidth;
  const _0x434265 = _0x15e2d0 ** _0x119acf + 1;
  let _0x4d53e8;
  let _0xd0d94d;
  let _0xd9a40f;
  const _0x1874d8 = 500;
  const _0x17471f = StatusEffects.some(_0x36880c => _0x47ee0a >= _0x36880c.set && _0x239f03 == _0x36880c.key);
  if (_0x239f03 && _0x17471f) {
    switch (_0x239f03) {
      case "scrollleft":
        const _0x3aed1e = {
          transform: "translateX(" + _0x1a817c + "px)"
        };
        _0x2aadbe.parentNode.style.overflow = "hidden";
        _0x4d53e8 = Math.round(_0x429b68 / _0x434265) * 1000;
        _0xd0d94d = Math.round(-_0x429b68);
        _0x2aadbe.animate([_0x3aed1e, {
          transform: "translateX(" + _0xd0d94d + "px)"
        }], {
          duration: _0x4d53e8,
          iterations: "Infinity"
        });
        break;
      case "scrollright":
        const _0x58e618 = {
          transform: "translateX(" + _0x1a817c + "px)"
        };
        _0x2aadbe.parentNode.style.overflow = "hidden";
        _0x4d53e8 = Math.round(_0x429b68 / _0x434265) * 1000;
        _0xd0d94d = Math.round(-_0x429b68);
        _0x2aadbe.animate([{
          transform: "translateX(" + _0xd0d94d + "px)"
        }, _0x58e618], {
          duration: _0x4d53e8,
          iterations: "Infinity"
        });
        break;
      case "scrollup":
        _0x2aadbe.parentNode.style.overflow = "hidden";
        if (_0x1f633b) {
          _0x4b2f20 = (_0x4b2f20 / _0x15e2d0 + _0x434265) * 2;
          _0x4d53e8 = Math.round(_0x4b2f20 / _0x434265) * 1000;
          _0xd9a40f = Math.round(-_0x4b2f20);
          _0x2aadbe.animate([{
            transform: "translateY(" + -_0xd9a40f + "px)"
          }, {
            transform: "translateY(" + _0xd9a40f + "px)"
          }], {
            duration: _0x4d53e8,
            iterations: "Infinity"
          });
          const _0xbb6ed5 = makeElement(_0x2aadbe, "p");
          _0xbb6ed5.style.cssText = "position: absolute; top: " + _0x4b2f20 * (_0x15e2d0 - 1) + "px;";
          _0xbb6ed5.innerHTML = _0x1f633b;
        } else {
          _0x4d53e8 = Math.round(_0x4b2f20 / _0x434265) * 1000;
          _0xd9a40f = Math.round(-_0x4b2f20);
          _0x2aadbe.animate([{
            transform: "translateY(" + -_0xd9a40f + "px)"
          }, {
            transform: "translateY(" + _0xd9a40f + "px)"
          }], {
            duration: _0x4d53e8,
            iterations: "Infinity"
          });
        }
        break;
      case "scrolldown":
        _0x2aadbe.parentNode.style.overflow = "hidden";
        if (_0x1f633b) {
          _0x4b2f20 = (_0x4b2f20 / _0x15e2d0 + _0x434265) * 2;
          _0x4d53e8 = Math.round(_0x4b2f20 / _0x434265) * 1000;
          _0xd9a40f = Math.round(-_0x4b2f20);
          _0x2aadbe.animate([{
            transform: "translateY(" + _0xd9a40f + "px)"
          }, {
            transform: "translateY(" + -_0xd9a40f + "px)"
          }], {
            duration: _0x4d53e8,
            iterations: "Infinity"
          });
          const _0x2ad36b = makeElement(_0x2aadbe, "p");
          _0x2ad36b.style.cssText = "position: absolute; top: -" + _0x4b2f20 * (_0x15e2d0 - 1) + "px;";
          _0x2ad36b.innerHTML = _0x1f633b;
        } else {
          _0x4d53e8 = Math.round(_0x4b2f20 / _0x434265) * 1000;
          _0xd9a40f = Math.round(-_0x4b2f20);
          _0x2aadbe.animate([{
            transform: "translateY(" + _0xd9a40f + "px)"
          }, {
            transform: "translateY(" + -_0xd9a40f + "px)"
          }], {
            duration: _0x4d53e8,
            iterations: "Infinity"
          });
        }
        break;
      case "fadeout":
        const _0x9585cf = 500;
        const _0x252bb0 = 3500;
        const _0xb5449a = _0x252bb0 - _0x119acf * _0x9585cf;
        const _0x122607 = _0x252bb0 - _0x9585cf * _0x119acf;
        if (_0x1f633b) {
          _0x2aadbe.animate([{
            opacity: 1,
            offset: 0
          }, {
            opacity: 0,
            offset: _0xb5449a / (_0xb5449a + _0x122607)
          }, {
            opacity: 0,
            offset: 1
          }], {
            duration: _0xb5449a + _0x122607,
            iterations: "Infinity",
            direction: "alternate",
            delay: _0x122607
          });
          const _0x44e24 = makeElement(_0x2aadbe.parentNode, "p");
          _0x44e24.style.cssText = "position: absolute; top: 0; opacity: 0";
          _0x44e24.innerHTML = _0x1f633b;
          _0x44e24.animate([{
            opacity: 0,
            offset: 0
          }, {
            opacity: 0,
            offset: 1 - _0xb5449a / (_0xb5449a + _0x122607)
          }, {
            opacity: 1,
            offset: 1
          }], {
            duration: _0xb5449a + _0x122607,
            iterations: "Infinity",
            direction: "alternate",
            delay: _0x122607
          });
        } else {
          _0x2aadbe.animate([{
            opacity: 1
          }, {
            opacity: 0
          }], {
            duration: _0xb5449a,
            iterations: "Infinity",
            direction: "alternate"
          });
        }
        break;
      case "translucent":
        _0x4d53e8 = Math.round(_0x429b68 / _0x434265) * 350;
        const _0x5f1ca0 = _0x2aadbe.parentNode.style.color ? _0x2aadbe.parentNode.style.color : document.body.classList.contains("dark") ? "rgb(207, 207, 207)" : "rgb(0, 0, 0)";
        const _0x5adf62 = _0x5f1ca0.replace(/rgb/, "rgba").replace(")", ", 0)");
        const _0x5871b1 = MakeStatusGlow(_0x353069);
        const _0x356667 = {
          duration: _0x4d53e8,
          iterations: "Infinity"
        };
        _0x2aadbe.parentNode.style.filter = "drop-shadow(" + _0x5871b1 + ") drop-shadow(" + _0x5871b1 + ")";
        _0x2aadbe.parentNode.style.textShadow = "";
        _0x2aadbe.style.cssText = "\n                    color: transparent;\n                    background: linear-gradient(90deg, " + _0x5f1ca0 + " 0%, " + _0x5adf62 + " 30%, " + _0x5adf62 + " 70%, " + _0x5f1ca0 + " 100%);\n                    background-size: 200%;\n                    background-clip: text;\n                    -webkit-background-clip: text;\n                ";
        _0x2aadbe.animate([{
          backgroundPosition: "200%"
        }, {
          backgroundPosition: "0%"
        }], _0x356667);
        break;
      case "bounce":
        const _0xfef6bf = 20;
        const _0x4b282f = _0x1a817c - _0x429b68 - _0xfef6bf;
        if (_0x4b282f >= _0xfef6bf) {
          _0x4d53e8 = _0x4b282f + 3500 / _0x119acf;
          _0x2aadbe.animate([{
            transform: "translateX(-5px)"
          }, {
            transform: "translateX(" + _0x4b282f + "px)"
          }], {
            duration: _0x4d53e8,
            iterations: "Infinity",
            direction: "alternate",
            easing: "ease-in-out"
          });
        }
        break;
      case "shake":
        const _0x51005a = 350;
        _0x4d53e8 = _0x51005a * 7 - _0x119acf * _0x51005a + _0x51005a;
        const _0x32bd9d = _0x51005a * 1.7;
        _0x2aadbe.animate([{
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
          offset: _0x4d53e8 / (_0x4d53e8 + _0x32bd9d)
        }], {
          duration: _0x4d53e8 + _0x32bd9d,
          iterations: "Infinity",
          direction: "alternate",
          easing: "ease-in-out"
        });
        break;
      case "wave":
        const _0xfae80f = 3;
        const _0x3e94b1 = 10;
        const _0x5d8189 = _0x3e94b1 * 6 - (_0x351c42 - 1) * _0x3e94b1;
        _0x4d53e8 = (_0xfae80f * 6 - _0x119acf * _0xfae80f + _0xfae80f) / 12;
        _0x2aadbe.innerHTML = "";
        _0x2aadbe.style.transform = "translateY(" + _0xfae80f / 2 + "px)";
        for (const _0x275670 of _0x213353) {
          const _0x5b5931 = document.createElement("span");
          if (_0x275670 === " ") {
            _0x5b5931.innerHTML = "&nbsp;";
          } else {
            _0x5b5931.textContent = _0x275670;
          }
          _0x5b5931.style.cssText = "\n                        display: inline-block;\n                        animation-duration: " + _0x4d53e8 + "s;\n                        animation-name: wave-" + _0x23dbcd + ";\n                        animation-iteration-count: infinite;\n                        animation-direction: alternate;\n                    ";
          _0x2aadbe.appendChild(_0x5b5931);
        }
        document.styleSheets[0].insertRule("\n                    @keyframes wave-" + _0x23dbcd + " {\n                        from { transform : translateY(0); color: white; }\n                        to   { transform : translateY(-" + _0xfae80f + "px); }\n                    }\n                ", 0);
        for (let _0x367195 = 0; _0x367195 <= _0x5d8189; _0x367195++) {
          document.styleSheets[0].insertRule("\n                        #statusText" + _0x23dbcd + " :nth-child( " + _0x5d8189 + "n + " + _0x367195 + " ) {\n                            animation-delay : -" + (_0x5d8189 - _0x367195) * 2 * _0x4d53e8 / _0x5d8189 + "s;\n                        }\n                    ", 0);
        }
        break;
      case "typing":
        const _0x525974 = 350 - _0x119acf * 50;
        _0x2aadbe.innerHTML = "";
        typeWrite(_0x2aadbe, [..._0x213353], [..._0x1f633b], _0x525974);
        makeElement(_0x70626f, "div", "caret");
        _0x70626f.style.marginTop = "-1px";
        _0x2aadbe.style.display = "inline-block";
        break;
      case "slideright":
        _0x4d53e8 = (3500 - _0x119acf * _0x1874d8 + _0x1874d8) * 2;
        _0x2aadbe.innerHTML = "";
        for (const [_0x47dbd5, _0xcc0510] of [..._0x213353].entries()) {
          const _0x263bb4 = makeElement(_0x2aadbe, "span");
          if (_0xcc0510 === " ") {
            _0x263bb4.innerHTML = "&nbsp;";
          } else {
            _0x263bb4.textContent = _0xcc0510;
          }
          _0x263bb4.style.cssText = "\n                        opacity: 0;\n                        display: inline-block;\n                        transform: translateX(-50px);\n                    ";
          _0x263bb4.animate([{
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
            delay: (_0x213353.length - _0x47dbd5) * 100,
            endDelay: (_0x213353.length - _0x47dbd5) * 100,
            duration: _0x4d53e8,
            iterations: "Infinity",
            easing: "ease-out"
          });
        }
        break;
      case "slidedown":
        _0x2aadbe.parentNode.style.overflow = "hidden";
        _0x4d53e8 = (3500 - _0x119acf * _0x1874d8 + _0x1874d8) * 2;
        _0x2aadbe.innerHTML = "";
        for (const [_0x57a703, _0x4b2b4d] of [..._0x213353].entries()) {
          const _0x183c82 = makeElement(_0x2aadbe, "span");
          if (_0x4b2b4d === " ") {
            _0x183c82.innerHTML = "&nbsp;";
          } else {
            _0x183c82.textContent = _0x4b2b4d;
          }
          _0x183c82.style.cssText = "\n                        opacity: 0;\n                        display: inline-block;\n                        transform: translateY(-50px);\n                    ";
          _0x183c82.animate([{
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
            delay: _0x57a703 * 100,
            endDelay: (_0x213353.length - _0x57a703) * 100,
            duration: _0x4d53e8,
            iterations: "Infinity",
            easing: "ease-out"
          });
        }
        break;
      case "flip":
        _0x4d53e8 = (3500 - _0x119acf * _0x1874d8 + _0x1874d8) * 2;
        _0x2aadbe.innerHTML = "";
        for (const [_0x4863f8, _0x393969] of [..._0x213353].entries()) {
          const _0x50cb89 = makeElement(_0x2aadbe, "span");
          if (_0x393969 === " ") {
            _0x50cb89.innerHTML = "&nbsp;";
          } else {
            _0x50cb89.textContent = _0x393969;
          }
          _0x50cb89.style.cssText = "\n                        display: inline-block;\n                        transform-origin: bottom;\n                        transform: rotateY(-90deg);\n                    ";
          _0x50cb89.animate([{
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
            delay: _0x4863f8 * 100,
            endDelay: (_0x213353.length - _0x4863f8) * 100,
            duration: _0x4d53e8,
            iterations: "Infinity",
            easing: "ease-out"
          });
        }
    }
  }
  return _0x2aadbe;
}
function typeWrite(_0x4a880c, _0x322539, _0x298c56, _0x1ebc1a, _0x4463c7 = 0, _0x12f6b4 = 1) {
  if (!document.body.contains(_0x4a880c)) {
    return;
  }
  if (_0x12f6b4 == 1) {
    if (_0x4463c7 < _0x322539.length) {
      if (_0x322539[_0x4463c7] === " ") {
        _0x4a880c.innerHTML += "&nbsp;";
      } else {
        _0x4a880c.textContent += _0x322539[_0x4463c7];
      }
      setTimeout(() => typeWrite(_0x4a880c, _0x322539, _0x298c56, _0x1ebc1a, _0x4463c7 + 1, 1), _0x1ebc1a);
    } else {
      setTimeout(() => typeWrite(_0x4a880c, _0x322539, _0x298c56, _0x1ebc1a, 0, -1), _0x1ebc1a + 500);
    }
  } else if (_0x4463c7 <= _0x322539.length) {
    const _0x3a4df5 = _0x322539.slice(0, _0x322539.length - _0x4463c7).join("");
    _0x4a880c.textContent = _0x3a4df5;
    setTimeout(() => typeWrite(_0x4a880c, _0x322539, _0x298c56, _0x1ebc1a, _0x4463c7 + 1, -1), _0x1ebc1a);
  } else {
    setTimeout(() => typeWrite(_0x4a880c, _0x298c56, _0x322539, _0x1ebc1a, 0, 1), _0x1ebc1a + 500);
  }
}
function getTextWidth(_0x2a4d1d, _0x372f54) {
  const _0x5b6b08 = (getTextWidth.canvas ||= document.createElement("canvas")).getContext("2d");
  _0x5b6b08.font = _0x372f54;
  return _0x5b6b08.measureText(_0x2a4d1d).width;
}
function doAudies(_0x16562d) {
  if (_0x16562d && _0x16562d.target.dataset.sound) {
    doSound(_0x16562d.target.dataset.sound, true);
  }
}
function zapShake(_0x16771a, _0x493202) {
  document.body.classList.add("bump");
  setTimeout(() => {
    document.body.classList.remove("bump");
  }, 1300);
  doSound(_0x16771a ? "laserfire3" : _0x493202 || "raspberry");
}
function handleLink(_0x5d5e12, _0x2e775b, _0x4fad20) {
  if (_0x2e775b.substring(0, 14) == "xat://buy-xats") {
    openBuyPage(true);
  } else if (_0x2e775b.indexOf("youtu.be/") != -1 || _0x2e775b.indexOf("youtube.com/shorts/") != -1 || _0x2e775b.indexOf("youtube.com/watch?") != -1 && _0x2e775b.indexOf("v=") != -1 && !_0x5d5e12.ctrlKey) {
    displayVideo(_0x2e775b, _0x4fad20);
  } else {
    LinkValidator(_0x5d5e12, _0x2e775b);
  }
}
function displayVideo(_0x1b8810, _0xa92e) {
  let _0x52cc2b = _Activity?.instance?.UserSettings?.youtube;
  if (!_Activity?.instance?.IsClassic) {
    _0x52cc2b = "popup";
  }
  if (_0x52cc2b == "app") {
    openApp({
      type: "media",
      link: _0x1b8810.replace(/＆/g, "&")
    });
  } else {
    let _0x2b2346 = null;
    let _0x5eac6e = 0;
    let _0x2515c2 = null;
    let _0x4c2c21 = 0;
    setAppIcon(10001);
    _0x2b2346 = _0x1b8810.indexOf("youtu.be/") != -1 ? _0x1b8810.split(".be/")[1].split("?")[0] : _0x1b8810.indexOf("youtube.com/shorts/") != -1 ? _0x1b8810.split("/shorts/")[1].split("?")[0] : _0x1b8810.split("v=")[1].split("＆")[0].split("&")[0];
    if (_0x1b8810.indexOf("t=") != -1) {
      _0x5eac6e = xInt(_0x1b8810.split("t=")[1].split("＆")[0].split("&")[0]);
    }
    if (_0x1b8810.indexOf("list=") != -1) {
      _0x2515c2 = _0x1b8810.split("list=")[1].split("＆")[0].split("&")[0];
      if (_0x1b8810.indexOf("index=") != -1) {
        _0x4c2c21 = _0x1b8810.split("index=")[1].split("＆")[0].split("&")[0] - 1;
      }
    }
    resizeBtn = document.querySelector("#playerResize");
    playerToolBar = document.querySelector("#playerToolBar");
    playerContainer = document.querySelector("#playerContainer");
    let _0x1cad4d = _Activity.instance.Sound & 8 ? _Activity.instance.Volume[3] : 0;
    if (Player) {
      let _0x5d848e = document.querySelector("#playerTitle");
      let _0x1edf96 = GetTranslation("mob2.sentby") + " " + _0xa92e;
      _0x1edf96 ||= "Sent by " + _0xa92e;
      _0x5d848e.innerHTML = _0x1edf96;
      playerContainer.style.display = "block";
      if (_0x2515c2) {
        Playlist = true;
        Player.loadPlaylist({
          list: _0x2515c2,
          listType: "playlist",
          index: _0x4c2c21,
          startSeconds: _0x5eac6e
        });
      } else {
        Playlist = false;
        Player.loadVideoById(_0x2b2346, _0x5eac6e);
      }
      Player.setVolume(_0x1cad4d);
    } else {
      let _0x1b16a1 = document.createElement("script");
      _0x1b16a1.src = "https://www.youtube.com/iframe_api";
      let _0x2be4b3 = document.getElementsByTagName("script")[0];
      _0x2be4b3.parentNode.insertBefore(_0x1b16a1, _0x2be4b3);
      addToolTip(playerToolBar, ["mob2.minimize", "Double-click to minimize"], {
        position: "low"
      });
      window.onYouTubeIframeAPIReady = () => {
        Player = new YT.Player("player", {
          width: "260",
          height: "146",
          playerVars: {
            playsinline: 1
          },
          events: {
            onStateChange: _0x1411a2 => {
              if (_0x1411a2.data == YT.PlayerState.ENDED && !Playlist) {
                setAppIcon(0);
                playerContainer.style.display = "none";
                Player.stopVideo();
              }
            },
            onError: _0x32fe43 => {
              if (Playlist && _0x2b2346) {
                Playlist = false;
                Player.loadVideoById(_0x2b2346, _0x5eac6e);
              }
            },
            onReady: _0x278469 => {
              playerContainer.style.display = "block";
              if (_0x2515c2) {
                Playlist = true;
                Player.loadPlaylist({
                  list: _0x2515c2,
                  listType: "playlist",
                  index: _0x4c2c21,
                  startSeconds: _0x5eac6e
                });
              } else {
                Playlist = false;
                Player.loadVideoById(_0x2b2346, _0x5eac6e);
              }
              Player.setVolume(_0x1cad4d);
            }
          }
        });
      };
      let _0x10fcf7 = document.querySelector("#playerTitle");
      let _0x207bec = GetTranslation("mob2.sentby") + " " + _0xa92e;
      _0x207bec ||= "Sent by " + _0xa92e;
      if (_0x10fcf7) {
        _0x10fcf7.innerHTML = _0x207bec;
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
      let _0x37b8d8 = document.querySelector("#playerClose");
      addToolTip(_0x37b8d8, ["mob1.close", "Close"], {
        position: "low"
      });
      let _0x5deb07 = document.querySelector("#playerSet");
      if (_0x5deb07) {
        addToolTip(_0x5deb07, ["mob1.settings", "Settings"], {
          position: "low"
        });
        _0x5deb07.addEventListener("click", () => {
          classicSetDialog("actions", config.MyId);
          classicSetDialog("settings", {
            tab: "appearance",
            UserNo: config.MyId
          });
        });
      }
      let _0x854642 = document.querySelector("#playerSwitch");
      if (_0x854642) {
        addToolTip(_0x854642, ["mob1.switch", "Switch to media app"], {
          position: "low"
        });
        _0x854642.addEventListener("click", () => {
          let _0x265128 = Player.getVideoUrl().replace(/＆/g, "&");
          playerContainer.style.display = "none";
          Player.stopVideo();
          openApp({
            type: "media",
            link: _0x265128
          });
        });
      }
      _0x37b8d8.addEventListener("click", () => {
        setAppIcon(0);
        playerContainer.style.display = "none";
        Player.stopVideo();
      });
      window.addEventListener("touchstart", playerDragStart, !1);
      window.addEventListener("touchend", playerDragEnd, !1);
      window.addEventListener("touchmove", playerDrag, !1);
      window.addEventListener("mousedown", playerDragStart, !1);
      window.addEventListener("mouseup", playerDragEnd, !1);
      window.addEventListener("mousemove", playerDrag, !1);
      window.addEventListener("resize", () => {
        positionPlayer();
      });
      positionPlayer((document.body.clientWidth - 260) / 2, (document.body.clientHeight - 146) / 2);
    }
  }
}
function ColorTitle() {
  var _0x4a01c6;
  config.ButColW = config.ButColW ? config.ButColW : parent.config ? parent.config.ButColW : "";
  config.ButCol = config.ButCol ? config.ButCol : parent.config ? parent.config.ButCol : "";
  var _0x338392 = ["dialogTitleBar"];
  _0x4a01c6 = hasDarkMode() ? "color:#969696; background-color: #313131; background-image: linear-gradient(rgba(255, 255, 255, 5%), rgba(0, 0, 0, 5%));" : "color:#" + toHex6(config.ButColW) + "; background-color: #" + toHex6(config.ButCol);
  if (config.ButColW && config.ButCol) {
    let _0x5034ed = document.getElementsByClassName("dialogTitle");
    for (let _0xb1200e = 0; _0xb1200e < _0x5034ed.length; _0xb1200e++) {
      _0x5034ed[_0xb1200e].style.cssText = "color:#" + (hasDarkMode() ? "969696" : toHex6(config.ButColW));
    }
    for (var _0x1b3891 in _0x338392) {
      var _0x24699c;
      var _0x5d36ab = document.getElementsByClassName(_0x338392[_0x1b3891]);
      for (_0x24699c = 0; _0x24699c < _0x5d36ab.length; _0x24699c++) {
        _0x5d36ab[_0x24699c].style.cssText = _0x4a01c6;
      }
    }
  }
}
function powerAd(_0xe6643d, _0x1fc076) {
  let _0x14e5ba = TOPSH || _Activity.instance.xConsts?.topsh;
  if (!_0x14e5ba || _0xe6643d.toLowerCase() == "tickle") {
    return;
  }
  if (_Activity.instance.xConsts?.Stickers[_0x1fc076] || STICKERS && STICKERS[_0x1fc076]) {
    classicSetDialog("selector", {
      Type: "Stickers",
      Pack: _0xe6643d,
      Config: config
    });
    return;
  }
  let _0x4a29d4 = [_0xe6643d];
  for (let _0x1c344f in _0x14e5ba) {
    if (_0x14e5ba[_0x1c344f] == _0x1fc076) {
      _0x4a29d4.push(_0x1c344f);
    }
  }
  if (_0x4a29d4.length > 14) {
    _0x4a29d4 = _0x4a29d4.splice(0, 14);
  }
  const _0x1cda5e = "svg/remove" + (config.ButColW && toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg";
  let _0x4ca960 = makeElement(null, "img");
  _0x4ca960.src = _0x1cda5e;
  _0x4ca960.width = "16";
  _0x4ca960.alt = "close";
  let _0x479c72 = makeElement(null, "div");
  let _0x27c395 = makeElement(_0x479c72, "div", "modalDialogContentClassic gpModal");
  let _0x4710db = makeElement(_0x27c395, "div", "dialogTitleBar");
  let _0x18cc5c = makeElement(_0x4710db, "span", "dialogTitle link", "openLink");
  makeElement(_0x4710db, "span", "dialogTitleAction", "id_ModalClose").appendChild(_0x4ca960);
  let _0xd7fcf5 = makeElement(_0x27c395, "div", "dialogBody");
  let _0x525f3c = makeElement(_0xd7fcf5, "div", "dialogPadding");
  let _0x57b3df = makeElement(_0x525f3c, "div", "", "wrapper");
  let _0x5696d5 = makeElement(_0xd7fcf5, "div", "dialogActions");
  let _0x47c359 = makeElement(_0x5696d5, "div", "butcontainer previewBut centered").appendChild(makeElement(null, "div", "butlayout", "actionButton"));
  _0x18cc5c.appendChild(document.createTextNode(_0xe6643d.charAt(0).toUpperCase() + _0xe6643d.slice(1)));
  _0x27c395.dataset.w = 0.6;
  let _0x79b317 = [];
  let _0xb9f31c = [];
  let _0x49010a = SUPERPOWERS || _Activity.instance.xConsts?.SuperPowers;
  if (SUPERPOWERS && SUPERPOWERS[_0x1fc076] || _Activity.instance.xConsts?.SuperPowers[_0x1fc076]) {
    _0x47c359.appendChild(document.createTextNode("Required Powers"));
    let _0x400e25 = SUPERPAWNS || _Activity.instance.xConsts?.SuperPawns;
    for (let _0x4df4db in _0x400e25) {
      if (_0x400e25.hasOwnProperty(_0x4df4db) && _0x400e25[_0x4df4db] == _0x1fc076) {
        _0xb9f31c.push(_0x4df4db);
      }
    }
    if (_0xb9f31c.length > 28) {
      _0xb9f31c = _0xb9f31c.splice(0, 28);
    }
    for (let _0x467e96 in _0x49010a) {
      if (_0x49010a.hasOwnProperty(_0x467e96) && _0x467e96 == _0x1fc076) {
        for (var _0x36c34e = 0; _0x36c34e < _0x49010a[_0x467e96].length; _0x36c34e++) {
          _0x79b317.push(PSSA[_0x49010a[_0x467e96][_0x36c34e] + 1]);
        }
      }
    }
    let _0x4514bb = makeElement(_0x57b3df, "div", "superPowers");
    addText(makeElement(_0x4514bb, "span", "spTitle"), "Available Pawns:");
  } else {
    let _0x504d51 = ISGRP && ISGRP[_0x1fc076] || _Activity.instance.xConsts?.isgrp[_0x1fc076];
    addText(_0x47c359, _0x1fc076 == 700 ? ["mob2.storesubnow", "Subscribe Now"] : ["mob1.storebuynow", "Buy Now"]);
    if (_0x504d51) {
      addText(makeElement(_0x5696d5, "div", "butcontainer previewBut centered").appendChild(makeElement(null, "div", "butlayout", "gpButton")), ["mob1.assignunassign", "Assign/Unassign"]);
      _0x5696d5.style.display = "flex";
    }
  }
  HiddenDivs.AlertDialog = _0x479c72.innerHTML;
  doModal("AlertDialog");
  ColorTitle();
  setButCols(config.ButCol, config.ButColW);
  setCstyle();
  if (_0xb9f31c.length > 0) {
    document.getElementById("openLink").innerHTML += " - COLLECTION";
    _0x57b3df = document.querySelector("#wrapper");
    _0xb9f31c.forEach((_0x7c28ef, _0x5db14d) => {
      _Activity.instance.Smilies.MakeSmiley(_0x57b3df, "p1" + _0x7c28ef + "##", {
        size: 40,
        className: "smileyPreview",
        align: true,
        tooltip: "(hat#h#" + _0x7c28ef + ")"
      });
    });
    document.querySelector("#actionButton").parentNode.addEventListener("click", () => {
      document.querySelector("#actionButton").innerHTML = "";
      addText(document.querySelector("#actionButton"), ["mob1.storebuynow", "Buy Now"]);
      document.querySelector("#actionButton").parentNode.addEventListener("click", () => {
        if (Classic) {
          window.open("https://xat.com/store", "_blank");
        } else {
          ToC({
            Command: "StartStore",
            Power: _0x1fc076
          });
          _Activity.instance.SetPage("store");
        }
      });
      _0x57b3df.innerHTML = "";
      _0x4a29d4.forEach((_0x2f111d, _0x40de41) => {
        document.querySelector("#box" + _0x40de41);
        _Activity.instance.Smilies.MakeSmiley(_0x57b3df, _0x2f111d, {
          size: 40,
          className: "smileyPreview",
          align: true,
          callback: () => smiliePressed("(" + _0x2f111d + ")")
        });
      });
      let _0x1e78f4 = makeElement(_0x57b3df, "div", "superPowers");
      addText(makeElement(_0x1e78f4, "span", "spTitle"), "Required Powers:");
      _0x79b317.forEach((_0x5e869f, _0x52ba9c) => {
        _Activity.instance.Smilies.MakeSmiley(_0x57b3df, _0x5e869f, {
          size: 40,
          className: "smileyPreview",
          align: true
        });
      });
    });
  } else {
    _0x57b3df = document.querySelector("#wrapper");
    _0x4a29d4.forEach((_0x3bdd22, _0x1e59c6) => {
      _Activity.instance.Smilies.MakeSmiley(_0x57b3df, _0x3bdd22, {
        size: 40,
        className: "smileyPreview",
        align: true,
        callback: () => smiliePressed("(" + _0x3bdd22 + ")")
      });
    });
    document.querySelector("#actionButton").parentNode.addEventListener("click", () => {
      if (Classic) {
        window.open("https://xat.com/" + (_0x1fc076 == 700 ? "aces" : "store"), "_blank");
      } else {
        ToC({
          Command: "StartStore",
          Power: _0x1fc076
        });
        _Activity.instance.SetPage("store");
      }
    });
    if (document.querySelector("#gpButton")) {
      document.querySelector("#gpButton").parentNode.addEventListener("click", () => {
        _Activity.instance.QuickBar?.doGroupsPowers(false, _0xe6643d);
      });
    }
  }
  document.querySelector("#openLink").addEventListener("click", () => {
    HitWiki(_0xe6643d);
  });
  document.querySelector("#id_ModalClose").addEventListener("click", () => {
    modalClose();
  });
}
function doSound(_0xb610cb, _0x18bc6c) {
  let _0x38d112 = _0x18bc6c && !_Activity?.instance?.IsIOSApp && Browser != "SF" ? "https://xat.com/content/sounds/audies/" + _0xb610cb + ".webm" : "https://xat.com/web_gear/chat/snd/" + _0xb610cb + ".mp3";
  new _Activity.instance.Window.Howl({
    src: [_0x38d112],
    volume: _0xb610cb == "laserfire3" ? 1 : _Activity.instance.Volume[1] / 100
  }).play();
}
let posX = 0;
let posY = 0;
let tolerance = 50;
let active = !1;
let active2 = !1;
let currentX = 0;
let currentY = 0;
let initialX = 0;
let initialY = 0;
let xOffset = null;
let yOffset = null;
function playerDrag(_0x319c79) {
  if (active) {
    _0x319c79.preventDefault();
    hideTooltip();
    let _0x49fba7 = document.body.clientWidth;
    let _0x1ee58d = document.body.clientHeight;
    let _0x35599f = 0;
    let _0x2823a2 = 0;
    if (_0x319c79.type === "touchmove") {
      _0x35599f = _0x319c79.touches[0].clientX - initialX;
      _0x2823a2 = _0x319c79.touches[0].clientY - initialY;
      currentX = Math.min(_0x49fba7 + tolerance, Math.max(-tolerance, _0x35599f));
      currentY = Math.min(_0x1ee58d + tolerance, Math.max(-tolerance, _0x2823a2));
    } else {
      _0x35599f = _0x319c79.clientX - initialX;
      _0x2823a2 = _0x319c79.clientY - initialY;
      currentX = Math.min(_0x49fba7 + tolerance, Math.max(-tolerance, _0x35599f));
      currentY = Math.min(_0x1ee58d + tolerance, Math.max(-tolerance, _0x2823a2));
      if (_0x319c79.clientX < -tolerance || _0x319c79.clientY < -tolerance || _0x319c79.clientX > _0x49fba7 + tolerance || _0x319c79.clientY > _0x1ee58d + tolerance) {
        posX = 0;
        posY = 0;
        active = !1;
        active2 = !1;
        positionPlayer();
        return !1;
      }
    }
    xOffset = currentX;
    yOffset = currentY;
    positionPlayer(currentX, currentY);
  } else if (active2) {
    hideTooltip();
    let _0x18ef64 = 0;
    let _0x568a98 = 0;
    if (_0x319c79.type === "touchmove") {
      _0x18ef64 = posX - _0x319c79.touches[0].clientX;
      posX = _0x319c79.touches[0].clientX;
      _0x568a98 = posY - _0x319c79.touches[0].clientY;
      posY = _0x319c79.touches[0].clientY;
    } else {
      _0x18ef64 = posX - _0x319c79.clientX;
      posX = _0x319c79.clientX;
      _0x568a98 = posY - _0x319c79.clientY;
      posY = _0x319c79.clientY;
    }
    let _0x166ef1 = 200;
    let _0x323b9d = 500;
    let _0x5268d0 = parseInt(getComputedStyle(Player.getIframe(), "").width) + _0x18ef64;
    let _0x1a5fb4 = parseInt(getComputedStyle(Player.getIframe(), "").height) + _0x568a98;
    if (_0x5268d0 > _0x323b9d || _0x5268d0 < _0x166ef1) {
      _0x18ef64 = 0;
      _0x5268d0 = parseInt(getComputedStyle(Player.getIframe(), "").width);
    }
    if (_0x1a5fb4 > 281 || _0x1a5fb4 < 112) {
      _0x568a98 = 0;
      _0x1a5fb4 = parseInt(getComputedStyle(Player.getIframe(), "").height);
    }
    if (_0x5268d0 > _0x323b9d && _0x1a5fb4 > 281 || _0x5268d0 < _0x166ef1 && _0x1a5fb4 < 112) {
      _0x18ef64 = 0;
      _0x5268d0 = parseInt(getComputedStyle(Player.getIframe(), "").width);
      _0x568a98 = 0;
      _0x1a5fb4 = parseInt(getComputedStyle(Player.getIframe(), "").height);
    }
    Player.getIframe().style.width = _0x5268d0 + "px";
    playerContainer.style.left = parseInt(playerContainer.style.left) - _0x18ef64 + "px";
    Player.getIframe().style.height = _0x1a5fb4 + "px";
    playerContainer.style.top = parseInt(playerContainer.style.top) - _0x568a98 + "px";
  }
}
function playerDragEnd(_0x2e82cc) {
  posX = 0;
  posY = 0;
  active = !1;
  active2 = !1;
  positionPlayer();
  initialX = currentX;
  initialY = currentY;
  if (_0x2e82cc.target === playerToolBar) {
    addToolTip(playerToolBar, minimized ? ["mob2.minimize", "Double-click to minimize"] : ["mob2.maximize", "Double-click to maximize"], {
      position: "low"
    });
  }
  if (_0x2e82cc.target === resizeBtn) {
    addToolTip(resizeBtn, ["mob2.resize", "Drag to resize"], {
      position: "low"
    });
  }
}
function playerDragStart(_0x1e02f6) {
  xOffset = playerContainer.offsetLeft;
  yOffset = playerContainer.offsetTop;
  if (_0x1e02f6.type === "touchstart") {
    initialX = _0x1e02f6.touches[0].clientX - xOffset;
    initialY = _0x1e02f6.touches[0].clientY - yOffset;
    posX = _0x1e02f6.touches[0].clientX;
    posY = _0x1e02f6.touches[0].clientY;
  } else {
    initialX = _0x1e02f6.clientX - xOffset;
    initialY = _0x1e02f6.clientY - yOffset;
    posX = _0x1e02f6.clientX;
    posY = _0x1e02f6.clientY;
  }
  if (_0x1e02f6.target === playerToolBar) {
    active = true;
    active2 = false;
  }
  if (_0x1e02f6.target === resizeBtn) {
    active2 = true;
    active = false;
  }
}
function positionPlayer(_0x1a2284, _0xc018d6) {
  let _0xde6068 = playerContainer.clientWidth;
  let _0x24d699 = playerContainer.clientHeight;
  let _0x28277d = document.body.clientWidth;
  let _0x58ce35 = document.body.clientHeight;
  let _0x1eaf15 = 0;
  let _0x70ba69 = 0;
  if (_0x1a2284 && _0xc018d6) {
    _0x1eaf15 = Math.min(_0x28277d - _0xde6068, Math.max(0, _0x1a2284));
    _0x70ba69 = Math.min(_0x58ce35 - _0x24d699, Math.max(0, _0xc018d6));
  } else {
    _0x1eaf15 = Math.min(_0x28277d - _0xde6068, Math.max(0, parseInt(getComputedStyle(playerContainer, "").left)));
    _0x70ba69 = Math.min(_0x58ce35 - _0x24d699, Math.max(0, parseInt(getComputedStyle(playerContainer, "").top)));
  }
  if (!minimized) {
    playerContainer.style.top = _0x70ba69 + "px";
  }
  playerContainer.style.left = _0x1eaf15 + "px";
}
function setButCols(_0x596993, _0x3d88ef) {
  _0x596993 ||= 80;
  _0x3d88ef ||= 16777215;
  var _0x842e9e = "color:#" + toHex6(_0x3d88ef) + "; background-color: #" + toHex6(_0x596993);
  var _0x1c132d = ["butcontainer"];
  for (var _0x4d989e in _0x1c132d) {
    var _0x25c344;
    var _0x4387f5 = document.getElementsByClassName(_0x1c132d[_0x4d989e]);
    for (_0x25c344 = 0; _0x25c344 < _0x4387f5.length; _0x25c344++) {
      _0x4387f5[_0x25c344].style.cssText = _0x842e9e;
    }
  }
}
function getTooltipInfo(_0x81d300) {
  if (_0x81d300.id == config.MyId || _0x81d300.id == "2") {
    return ["box.18", "Change your name, avatar and home page"];
  }
  if (xInt(_0x81d300.id) != 0) {
    let _0x321e15 = _0x81d300.id;
    if (_0x321e15.substr(-9, 9) == "000000000") {
      _0x321e15 = _0x321e15.substr(0, _0x321e15.length - 9) + "B";
    } else if (_0x321e15.substr(-6, 6) == "000000") {
      _0x321e15 = _0x321e15.substr(0, _0x321e15.length - 6) + "M";
    }
    let _0x397e63 = _0x81d300.registered || _0x81d300.regname;
    _0x397e63 ||= _0x321e15;
    if (_0x81d300.status && _0x81d300.status.length > 0 && _0x81d300.pFlags & NamePowers.status) {
      if (_0x81d300.status.indexOf("#") != -1) {
        _0x397e63 += "<br>" + _0x81d300.status.split("#")[0];
      } else {
        _0x397e63 += "<br>" + _0x81d300.status;
      }
    }
    if (xInt(_0x81d300.id) < 100) {
      _0x397e63 += "<br>(xat staff)";
    } else {
      _0x397e63 += "<br>(NOT xat staff)";
    }
    return ["box.16", "Interact with $1", _0x397e63];
  }
}
function addToolTip(_0x4029eb, _0x1a7399, _0x30334f = {}) {
  let {
    select: _0xd7209e,
    position: _0x13bb52,
    maxWidth: _0x2b4df9,
    Rect: _0x1b3b6d,
    showRapid: _0x13282e,
    shortTime: _0x60cd22,
    dom: _0x31eb22,
    timestamp: _0x56a927,
    instant: _0x46eee9
  } = _0x30334f;
  if (!_0x4029eb || _0x1a7399.length == 0) {
    return;
  }
  if (_0x13bb52 != "pointer") {
    _0x4029eb.style.cursor = "pointer";
  }
  _0x4029eb.style["pointer-events"] = "auto";
  _0x31eb22 ||= document;
  let _0x96f9ac = _0x46eee9 ? 1 : _0x60cd22 ? 500 : 1000;
  if (_0x56a927 && !_0x4029eb.dataset.timestamp) {
    _0x4029eb.dataset.timestamp = _0x56a927;
  }
  _0x4029eb.addEventListener(_Activity.instance.IsClassic ? "mouseenter" : "mousedown", _0x52e1b7 => {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }
    timeoutId = window.setTimeout(() => {
      if (!_0x4029eb.dataset.key || !!document.querySelector("[data-key=\"" + _0x4029eb.dataset.key + "\"]")) {
        hideTooltip();
        if (_0x4029eb.dataset.timestamp && !_0x13282e) {
          _0x1a7399 = GetTimeToGo(_0x4029eb.dataset.timestamp);
        }
        tooltip = (_0x52e1b7.ctrlKey || _0x52e1b7.metaKey) && _0x13282e ? addHintText(_0x52e1b7, "Rapid: " + Macros.rapid, _0x13bb52, _0x2b4df9, _0x1b3b6d, _0x31eb22) : addHintText(_0x52e1b7, _0x1a7399, _0x13bb52, _0x2b4df9, _0x1b3b6d, _0x31eb22);
        if (_0xd7209e) {
          tooltip.addEventListener("mouseenter", () => {
            window.clearTimeout(timeoutId);
          });
        }
        if (_0x13282e) {
          _0x31eb22.onkeydown = _0x1b9acc => {
            if (_0x1b9acc.ctrlKey || _0x1b9acc.key == "Control") {
              let _0x4bccf2 = _0x31eb22.querySelector("#tooltips");
              if (_0x4bccf2) {
                _0x4bccf2.parentNode.removeChild(_0x4bccf2);
              }
              tooltip = addHintText(_0x52e1b7, "Rapid: " + Macros.rapid, _0x13bb52, _0x2b4df9, _0x1b3b6d, _0x31eb22);
            }
          };
          _0x31eb22.onkeyup = _0x23dd9c => {
            if (!_0x23dd9c.ctrlKey && _0x23dd9c.key == "Control") {
              let _0x2f9e6b = _0x31eb22.querySelector("#tooltips");
              if (_0x2f9e6b) {
                _0x2f9e6b.parentNode.removeChild(_0x2f9e6b);
              }
              tooltip = addHintText(_0x52e1b7, _0x1a7399, _0x13bb52, _0x2b4df9, _0x1b3b6d, _0x31eb22);
            }
          };
        }
        _0x31eb22.addEventListener("click", _0x123bbc => {
          if (_0x123bbc.target != tooltip) {
            hideTooltip();
          }
        });
        tooltip.addEventListener("mouseleave", () => {
          window.clearTimeout(timeoutId);
          timeoutId = window.setTimeout(() => {
            let _0x4129a3 = _0x31eb22.querySelector("#tooltips");
            if (_0x4129a3) {
              _0x4129a3.parentNode.removeChild(_0x4129a3);
            }
            tooltip = null;
          }, 100);
        });
        if (_0xd7209e) {
          tooltip.addEventListener("click", () => {
            if (_0x31eb22.body.createTextRange) {
              const _0x322685 = _0x31eb22.body.createTextRange();
              _0x322685.moveToElementText(tooltip);
              _0x322685.select();
            } else if (window.getSelection) {
              const _0x31a3cc = window.getSelection();
              const _0x1aa507 = _0x31eb22.createRange();
              _0x1aa507.selectNodeContents(tooltip);
              _0x31a3cc.removeAllRanges();
              _0x31a3cc.addRange(_0x1aa507);
            }
          });
        }
      }
    }, tooltip ? 0 : _0x96f9ac);
  });
  _0x4029eb.addEventListener("mouseleave", () => {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }
    if (_0x13282e) {
      _0x31eb22.onkeyup = null;
      _0x31eb22.onkeydown = null;
    }
    timeoutId = window.setTimeout(() => {
      let _0x1590cc = _0x31eb22.querySelector("#tooltips");
      if (_0x1590cc) {
        _0x1590cc.parentNode.removeChild(_0x1590cc);
      }
      tooltip = null;
    }, 500);
  });
}
function hideTooltip() {
  tooltip = null;
  let _0x2b542e = document.querySelector("#tooltips");
  if (_0x2b542e) {
    _0x2b542e.parentNode.removeChild(_0x2b542e);
  }
}
function openGift(_0x4cd0c3) {
  if (_0x4cd0c3) {
    if (_Activity.instance.IsClassic) {
      const _0x189d1e = document.getElementById("appframe")?.contentWindow;
      if (!_0x189d1e || !_0x189d1e?.document) {
        return;
      }
      const _0x397166 = _0x189d1e.document.querySelector(".dialogBody");
      if (_0x397166) {
        _0x397166.style.height = "90%";
      }
      _0x189d1e?.classicSetDialog("selector", {
        Type: "Gifts",
        UserNo: _0x4cd0c3
      });
      return;
    }
    classicSetDialog("selector", {
      Type: "Gifts",
      UserNo: _0x4cd0c3
    });
  }
}
function GetRealBack(_0x2b6be2, _0x243a21, _0x29f822, _0x3d857c) {
  if (!_0x2b6be2) {
    return "";
  }
  if (_0x2b6be2.charAt(0) == "h") {
    return "url(\"" + (_0x243a21 ? SafeImage(_0x2b6be2, 1136, 640) : SafeImage(_0x2b6be2, 640, _0x29f822, _0x3d857c)) + "\") no-repeat 0 0 / cover fixed";
  }
  return _0x2b6be2;
}
function LoadBackground(_0x4ad60b) {
  let _0x27d0a8;
  let _0x51ad74;
  let _0xa661a5 = _0x4ad60b.split(";=");
  _0x4ad60b = config.xatback;
  let _0x511cd5 = 1136;
  let _0x5320f0 = config.page;
  let _0x11db7c = !1;
  var _0x107b58 = _Activity.IsFlixActive && _Activity.IsFlixVisible;
  var _0x12b4e1 = _Activity.CurrentChat;
  _0x5320f0 ||= _Activity.instance.CurrentPage;
  switch (_0x5320f0) {
    case "visitors":
    case "messages":
    case "classic":
      if (_0xa661a5[1] && _0xa661a5[2]) {
        const _0x15efd7 = _0xa661a5[2].split(",");
        _0x107b58 = !1;
        if ((_0x4ad60b = _0x15efd7[0]).substring(0, 4) === "http") {
          _0x11db7c = parseInt(_0x15efd7[1]) === 1;
          if (window?.innerHeight > 0 && _0x11db7c) {
            _0x511cd5 = window.innerHeight;
          }
        } else if (/(^[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(_0x4ad60b)) {
          _0x4ad60b = "#" + _0x4ad60b;
        }
      } else if (!_Activity.instance.IsLandscape && !Classic && _0xa661a5[9].length > 0) {
        _0x4ad60b = _0xa661a5[9];
        _0x27d0a8 = 1;
        _0x107b58 = false;
      } else if (_Activity.instance.IsLandscape && !Classic && _0xa661a5[10].length > 0) {
        _0x4ad60b = _0xa661a5[10];
        _0x51ad74 = 1;
        _0x107b58 = false;
      } else {
        _0x4ad60b = _0xa661a5[3];
        _0x12b4e1 = _Activity.FlixChatId;
      }
  }
  _Activity.FlixBackground = GetRealBack(_0xa661a5[3], _0x27d0a8, _0x511cd5, !1);
  var _0x470186 = !1;
  if (!_0x107b58) {
    _0x470186 = HandleFlix(_0x12b4e1);
  }
  if (!_0x107b58 && !_0x470186) {
    document.body.style.background = GetRealBack(_0x4ad60b, _0x27d0a8, _0x511cd5, _0x11db7c);
    if (!Classic) {
      document.body.style.backgroundPosition = "left";
    }
  }
}
function calcAvSize(_0x5b7426) {
  if (_0x5b7426 <= 30) {
    return 30;
  } else if (_0x5b7426 <= 35) {
    return 35;
  } else if (_0x5b7426 <= 80) {
    return 80;
  } else if (_0x5b7426 == 100) {
    return 100;
  } else if (_0x5b7426 <= 160) {
    return 160;
  } else if (_0x5b7426 <= 320) {
    return 320;
  } else {
    return 640;
  }
}
function calcStripSize(_0x378491) {
  if (_0x378491 <= 20) {
    return 20;
  } else if (_0x378491 <= 30) {
    return 30;
  } else if (_0x378491 <= 35) {
    return 35;
  } else if (_0x378491 <= 40) {
    return 40;
  } else if (_0x378491 <= 80) {
    return 80;
  } else {
    return 160;
  }
}
function addHintText(_0x2f54d1, _0x2679a7, _0x15ba3b, _0x2d2e79, _0x16f451, _0x2feee7) {
  if (_0x2679a7 && _0x2679a7.length == 0) {
    return;
  }
  let _0x15971d = _0x2feee7.querySelector("#tooltips");
  if (_0x15971d) {
    _0x15971d.parentNode.removeChild(_0x15971d);
  }
  _0x15971d = makeElement(null, "div", "", "tooltips");
  _0x2feee7.body.prepend(_0x15971d);
  let _0x7f1297 = makeElement(_0x15971d, "div", "tooltip");
  if (_0x2d2e79) {
    _0x7f1297.style["max-width"] = "50%";
  }
  addText(_0x7f1297, _0x2679a7, !0);
  var _0x13488b = _0x16f451 ? _0x16f451.getBoundingClientRect() : _0x2f54d1.target.getBoundingClientRect();
  switch (_0x15ba3b) {
    case "left":
      _0x7f1297.style.top = _0x13488b.top + "px";
      _0x7f1297.style.left = Math.min(_0x13488b.left) - _0x7f1297.clientWidth - 10 + "px";
      if (_0x7f1297.getBoundingClientRect().left < 15) {
        _0x7f1297.style.left = "15px";
      } else if (_0x7f1297.getBoundingClientRect().right >= window.innerWidth) {
        _0x7f1297.style.left = window.innerWidth - _0x7f1297.getBoundingClientRect().width - 15 + "px";
      }
      break;
    case "right":
      _0x7f1297.style.top = _0x13488b.top + "px";
      _0x7f1297.style.left = _0x13488b.width - (_0x7f1297.clientWidth - 5) + "px";
      if (_0x7f1297.getBoundingClientRect().right < 15) {
        _0x7f1297.style.right = "15px";
      } else if (_0x7f1297.getBoundingClientRect().right >= window.innerWidth) {
        _0x7f1297.style.right = window.innerWidth - _0x7f1297.getBoundingClientRect().width - 15 + "px";
      }
      break;
    case "low":
      _0x7f1297.style.top = _0x13488b.top - 30 + "px";
      _0x7f1297.style.left = _0x13488b.left + Math.abs(_0x13488b.left - _0x13488b.right) / 2 - _0x7f1297.clientWidth / 2 + "px";
      if (_0x7f1297.getBoundingClientRect().left < 15) {
        _0x7f1297.style.left = "15px";
      } else if (_0x7f1297.getBoundingClientRect().right >= window.innerWidth) {
        _0x7f1297.style.left = window.innerWidth - _0x7f1297.getBoundingClientRect().width - 15 + "px";
      }
      break;
    case "bottom":
      _0x7f1297.style.top = "58px";
      _0x7f1297.style.left = _0x13488b.left + Math.abs(_0x13488b.left - _0x13488b.right) / 2 - _0x7f1297.clientWidth / 2 + "px";
      if (_0x7f1297.getBoundingClientRect().left < 15) {
        _0x7f1297.style.left = "15px";
      } else if (_0x7f1297.getBoundingClientRect().right >= window.innerWidth) {
        _0x7f1297.style.left = window.innerWidth - _0x7f1297.getBoundingClientRect().width - 25 + "px";
      }
      break;
    case "pointer":
      _0x7f1297.style.top = _0x13488b.top - 30 + "px";
      _0x7f1297.style.left = _0x2f54d1.clientX + "px";
      if (_0x7f1297.getBoundingClientRect().left < 15) {
        _0x7f1297.style.left = "15px";
      } else if (_0x7f1297.getBoundingClientRect().right >= window.innerWidth) {
        _0x7f1297.style.left = window.innerWidth - _0x7f1297.getBoundingClientRect().width - 15 + "px";
      }
      break;
    case "top-tall":
      _0x7f1297.style.top = _0x13488b.top - _0x7f1297.getBoundingClientRect().height - 10 + "px";
      _0x7f1297.style.left = _0x13488b.left + Math.abs(_0x13488b.left - _0x13488b.right) / 2 - _0x7f1297.clientWidth / 2 + "px";
      if (_0x7f1297.getBoundingClientRect().left < 15) {
        _0x7f1297.style.left = "15px";
      } else if (_0x7f1297.getBoundingClientRect().right >= window.innerWidth) {
        _0x7f1297.style.left = window.innerWidth - (_0x7f1297.getBoundingClientRect().width - 15) * 2 + "px";
      }
      if (xInt(_0x7f1297.style.left) <= 0) {
        _0x7f1297.style.left = "15px";
      }
      break;
    default:
      _0x7f1297.style.top = _0x13488b.top - 50 + "px";
      _0x7f1297.style.left = _0x13488b.left + Math.abs(_0x13488b.left - _0x13488b.right) / 2 - _0x7f1297.clientWidth / 2 + "px";
      if (_0x7f1297.getBoundingClientRect().left < 15) {
        _0x7f1297.style.left = "15px";
      } else if (_0x7f1297.getBoundingClientRect().right >= window.innerWidth) {
        _0x7f1297.style.left = window.innerWidth - _0x7f1297.getBoundingClientRect().width - 15 + "px";
      }
      if (xInt(_0x7f1297.style.left) <= 0) {
        _0x7f1297.style.left = "15px";
      }
  }
  if (_0x7f1297.getBoundingClientRect().top < 0) {
    _0x7f1297.style.top = "5px";
  }
  return _0x7f1297;
}
var LangFiles = _Activity.instance?.LangFiles ?? {};
function TranslateNodes(_0x4ec0db, _0x4b2612) {
  if (!_0x4b2612) {
    return;
  }
  var _0x369f01 = !1;
  for (var _0x348e91 in LangFiles) {
    if (LangFiles[_0x348e91]) {
      _0x369f01 = !0;
      break;
    }
  }
  let _0x4643c3;
  if (_0x4b2612 == "box" && _Activity.instance.CustomGroupLang) {
    _0x4643c3 = _Activity.instance.CustomGroupLang;
    _0x369f01 = true;
  }
  if (_0x369f01) {
    var _0x2f1b0f;
    var _0x20f72e;
    var _0x4c9021;
    var _0xdcbcc1 = _0x4ec0db.querySelectorAll("[data-localize]");
    var _0x365b5c = _0xdcbcc1.length;
    for (_0x348e91 = 0; _0x348e91 < _0x365b5c; ++_0x348e91) {
      if (_0x4b2612 == (_0x4c9021 = (_0x20f72e = _0xdcbcc1[_0x348e91]).getAttribute("data-localize").split("."))[0]) {
        _0x2f1b0f = LangFiles[_0x4c9021[0]][_0x4c9021[1]];
        if (_0x4643c3 && _0x4643c3[_0x4c9021[1]]) {
          _0x2f1b0f = _0x4643c3[_0x4c9021[1]];
        }
        if (_0x2f1b0f) {
          changeText(_0x20f72e, _0x2f1b0f, true);
        }
      }
    }
  }
}
function GotLang(_0x3a29f0) {
  for (var _0x1f8d13 in _0x3a29f0) {
    if (_0x3a29f0[_0x1f8d13]) {
      LangFiles[_0x1f8d13] = _0x3a29f0[_0x1f8d13];
    }
  }
  Translate(_0x3a29f0);
  let _0x39f2b0 = document.getElementById("appframe")?.contentWindow;
  if (_0x39f2b0 && _0x39f2b0.Translate) {
    _0x39f2b0.Translate(_0x3a29f0);
  }
}
function LoadLangAll(_0x1512d2 = false) {
  LoadLang({
    box: 0,
    mob2: 0,
    mob1: 0,
    login: 0
  }, !1, _0x1512d2);
}
function TranslateAll() {
  Translate({
    box: 0,
    mob2: 0,
    mob1: 0,
    login: 0
  });
}
function Translate(_0x39f5b7) {
  for (let _0x9d7d6a in _0x39f5b7) {
    if (LangFiles[_0x9d7d6a]) {
      TranslateNodes(document, _0x9d7d6a);
    }
  }
}
function LoadLang(_0x513cbf, _0x4d61d6, _0x6c4c3d) {
  if (_0x4d61d6) {
    Language = _0x4d61d6;
    _Activity.instance.LangFiles = {};
    LangFiles = {};
  }
  for (let _0x3e12d8 in _0x513cbf) {
    loadJSON(xatdomain + "/json/lang/getlang2.php?f=" + _0x3e12d8 + "&l=" + Language, GotLang);
  }
  if (_0x6c4c3d) {
    TranslateAll();
  }
}
function makeElement(_0x6d34d6, _0x306102, _0x1065ce, _0x66455e, _0x5a98b9) {
  var _0x546475 = document.createElement(_0x306102);
  if (_0x1065ce) {
    _0x546475.className = _0x1065ce;
  }
  if (_0x66455e) {
    _0x546475.id = _0x66455e;
  }
  if (_0x6d34d6) {
    _0x6d34d6.appendChild(_0x546475);
  }
  if (_0x5a98b9) {
    _0x5a98b9.prepend(_0x546475);
  }
  return _0x546475;
}
function addEditBox(_0x20d62f, _0x4735a9, _0x58dfc3, _0xaba393, _0x1155a9, _0xfc5f49) {
  var _0xc2eca2 = makeElement(_0x20d62f, "div");
  var _0xdd7eea = makeElement(_0xc2eca2, "span", "edittitle");
  if (_0x1155a9) {
    _0xdd7eea.style.fontWeight = "bold";
  }
  addText(_0xdd7eea, _0x58dfc3);
  if (_0xaba393 === undefined) {
    _0xaba393 = "";
  }
  if (_0xaba393 !== "noedit") {
    var _0x3cabb2 = makeElement(_0xc2eca2, "input");
    if (_0xfc5f49 == "password") {
      _0x3cabb2.type = "password";
    } else {
      _0x3cabb2.type = "text";
      _0x3cabb2.value = _0xaba393;
    }
    _0x3cabb2.id = _0x4735a9;
  }
}
function GetTranslation(_0x1ffab2, _0x16c27a) {
  var _0x4dd8e6 = _0x1ffab2.split(".");
  let _0x5082d8;
  if (_0x4dd8e6[0] == "box" && _Activity.instance.CustomGroupLang && (_0x5082d8 = _Activity.instance.CustomGroupLang[_0x4dd8e6[1]])) {
    return _0x5082d8;
  }
  if (LangFiles && LangFiles[_0x4dd8e6[0]] && LangFiles[_0x4dd8e6[0]][_0x4dd8e6[1]]) {
    let _0x4fa380 = LangFiles[_0x4dd8e6[0]][_0x4dd8e6[1]];
    if (_0x16c27a) {
      _0x16c27a.forEach((_0x14d751, _0x520d45) => {
        const _0x36febf = new RegExp("\\$" + (_0x520d45 + 1), "g");
        _0x4fa380 = _0x4fa380.replace(_0x36febf, _0x14d751);
      });
    }
    return _0x4fa380;
  }
  return !1;
}
function TransText(_0x5cea99, _0x1ce921) {
  var _0x527110 = GetTranslation(_0x5cea99);
  return _0x527110 || _0x1ce921;
}
function addText(_0x716363, _0x4f9501, _0x542775) {
  if (!_0x4f9501) {
    return;
  }
  var _0x13b589;
  if (typeof _0x4f9501 == "string" && _0x4f9501.charAt(0) == "[" && _0x4f9501.search(/\[mob/) >= 0) {
    for (var _0x528523 in _0x4f9501 = _0x4f9501.split(/\[mob|\]/)) {
      if ((_0x13b589 = _0x4f9501[_0x528523]).charAt(0) > 0 && _0x13b589.charAt(1) == ".") {
        _0x4f9501[_0x528523] = _0x13b589.split(",");
        _0x4f9501[_0x528523][0] = "mob" + _0x4f9501[_0x528523][0];
      }
    }
  }
  if (Array.isArray(_0x4f9501)) {
    if (Array.isArray(_0x4f9501[0]) || _0x4f9501[1] && Array.isArray(_0x4f9501[1])) {
      for (var _0x528523 in _0x4f9501) {
        addText(_0x716363, _0x4f9501[_0x528523]);
      }
      return "";
    }
    if (_0x4f9501[0]) {
      _0x716363.setAttribute("data-localize", _0x4f9501[0]);
      let _0x45697c = null;
      if (_0x4f9501.length > 2) {
        const _0x2c8830 = _0x4f9501.slice(2, _0x4f9501.length);
        _0x45697c = GetTranslation(_0x4f9501[0], _0x2c8830);
        _0x4f9501 = _0x4f9501[1];
        _0x2c8830.forEach((_0x3cbb99, _0x293adf) => {
          const _0x1a002d = new RegExp("\\$" + (_0x293adf + 1), "g");
          _0x4f9501 = _0x4f9501.replace(_0x1a002d, _0x3cbb99);
          _0x45697c &&= _0x45697c.replace(_0x1a002d, _0x3cbb99);
        });
      } else {
        _0x45697c = GetTranslation(_0x4f9501[0]);
        _0x4f9501 = _0x4f9501[1];
      }
      if (_0x45697c) {
        _0x4f9501 = _0x45697c;
      }
    } else {
      _0x4f9501 = _0x4f9501[1];
    }
  }
  if (_0x716363 && typeof _0x4f9501 == "string" && _0x4f9501.indexOf("$1") >= 0 && _0x716363?.dataset?.dataSec) {
    _0x4f9501 = _0x4f9501.replace("$1", _0x716363.dataset.dataSec);
  }
  let _0x41072a = null;
  if (_0x542775) {
    if (_0x716363) {
      _0x716363.innerHTML += _0x4f9501;
    }
  } else {
    _0x41072a = document.createTextNode(_0x4f9501);
    if (_0x716363) {
      _0x716363.appendChild(_0x41072a);
    }
  }
  return _0x41072a;
}
function changeText(_0x3d21e0, _0x4328ad, _0x3aac9b) {
  while (_0x3d21e0.firstChild) {
    _0x3d21e0.removeChild(_0x3d21e0.firstChild);
  }
  if (_0x3d21e0.tagName.toLowerCase() == "input") {
    _0x3d21e0.placeholder = _0x4328ad;
  } else {
    addText(_0x3d21e0, _0x4328ad, _0x3aac9b);
  }
}
function setValue(_0x5bf627, _0x18aab8) {
  var _0x12401e = document.getElementById(_0x5bf627);
  if (_0x12401e) {
    _0x18aab8 ||= "";
    _0x12401e.value = _0x18aab8;
  }
}
function setTextNode(_0x33b932, _0x170da3, _0x154719) {
  var _0x2da556 = document.getElementById(_0x33b932);
  if (_0x2da556) {
    while (_0x2da556.firstChild) {
      _0x2da556.removeChild(_0x2da556.firstChild);
    }
    if (_0x170da3) {
      _0x2da556.appendChild(document.createTextNode(_0x170da3));
    }
    if (_0x154719) {
      _0x2da556.appendChild(_0x154719);
    }
  }
}
function addTextNode(_0x3982c8, _0x3c35e2) {
  var _0x291994 = document.getElementById(_0x3982c8);
  if (_0x291994 && _0x3c35e2) {
    _0x291994.appendChild(document.createTextNode(_0x3c35e2));
  }
}
const capitalize = _0x479426 => typeof _0x479426 != "string" ? "" : _0x479426.charAt(0).toUpperCase() + _0x479426.slice(1);
function clearDiv(_0x3ecacc, _0x368795) {
  _0x368795 ||= document.getElementById(_0x3ecacc);
  if (_0x368795) {
    while (_0x368795.firstChild) {
      _0x368795.removeChild(_0x368795.firstChild);
    }
  }
  return _0x368795;
}
function setDNone(_0x5bf41b, _0x19e040, _0x1a8a8e) {
  if (_0x5bf41b) {
    removeClass("d-none", _0x19e040, _0x1a8a8e);
  } else {
    addClass("d-none", _0x19e040, _0x1a8a8e);
  }
}
function addClass(_0x474f31, _0x4d3c36, _0xc66ee2) {
  if (_0x4d3c36) {
    _0xc66ee2 = document.getElementById(_0x4d3c36);
  }
  if (_0xc66ee2) {
    _0xc66ee2.classList.add(_0x474f31);
  }
  return _0xc66ee2;
}
function removeClass(_0x53d8ab, _0x4c150a, _0x41a744) {
  if (_0x4c150a) {
    _0x41a744 = document.getElementById(_0x4c150a);
  }
  if (_0x41a744) {
    _0x41a744.classList.remove(_0x53d8ab);
  }
  return _0x41a744;
}
function removeById(_0x582b40, _0x147896) {
  var _0x44e6da = document.getElementById(_0x582b40);
  for (; _0x147896;) {
    _0x44e6da &&= _0x44e6da.parentNode;
    _0x147896--;
  }
  if (_0x44e6da != null) {
    _0x44e6da.parentNode.removeChild(_0x44e6da);
  }
}
function getById(_0xcb63f0) {
  return document.getElementById(_0xcb63f0);
}
function insertAfter(_0x1c7b8a, _0x10d43d) {
  if (_0x10d43d) {
    var _0x2c9c8b = _0x10d43d.parentNode;
    if (_0x2c9c8b.lastchild == _0x10d43d) {
      _0x2c9c8b.appendChild(_0x1c7b8a);
    } else {
      _0x2c9c8b.insertBefore(_0x1c7b8a, _0x10d43d.nextSibling);
    }
  }
}
function animateTo(_0x46dbe7, _0x5c4a12, _0x5ac7e2, _0x5b3164) {
  const _0x14b342 = {
    ..._0x5ac7e2
  };
  _0x14b342.fill = "both";
  const _0x241508 = _0x46dbe7.animate(_0x5c4a12, _0x14b342);
  _0x241508.addEventListener("finish", () => {
    if (_0x5b3164) {
      _0x5b3164();
    }
  });
  return _0x241508;
}
function animateFrom(_0x1db8f5, _0x2ea8e1, _0x39733f, _0x479436) {
  const _0x962746 = {
    ..._0x2ea8e1
  };
  _0x962746.offset = 0;
  const _0x13ea51 = {
    ..._0x39733f
  };
  _0x13ea51.fill = "backwards";
  const _0x541f12 = _0x1db8f5.animate(_0x962746, _0x13ea51);
  _0x541f12.addEventListener("finish", () => {
    if (_0x479436) {
      _0x479436();
    }
  });
  return _0x541f12;
}
function restrictCharacters(_0x33f934, _0x42253f) {
  var _0x26b3ef;
  if (_0x33f934.keyCode) {
    _0x26b3ef = _0x33f934.keyCode;
  } else if (_0x33f934.which) {
    _0x26b3ef = _0x33f934.which;
  }
  return !!String.fromCharCode(_0x26b3ef).match(_0x42253f);
}
function isColorLight(_0x31d285) {
  let _0x5b5936;
  let _0x5c62d4;
  let _0x319dae;
  let _0x5c2279;
  return !!_0x31d285 && (_0x31d285.match(/^rgb/) ? (_0x5b5936 = (_0x31d285 = _0x31d285.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/))[1], _0x5c62d4 = _0x31d285[2], _0x319dae = _0x31d285[3]) : (_0x5b5936 = (_0x31d285 = +("0x" + _0x31d285.slice(1).replace(_0x31d285.length < 5 && /./g, "$&$&"))) >> 16, _0x5c62d4 = _0x31d285 >> 8 & 255, _0x319dae = _0x31d285 & 255), _0x5c2279 = Math.sqrt(_0x5b5936 * _0x5b5936 * 0.299 + _0x5c62d4 * _0x5c62d4 * 0.587 + _0x319dae * _0x319dae * 0.114), _0x5c2279 > 127.5);
}
function restrictCharacters2(_0x5bc30b, _0x2acf18) {
  _0x5bc30b.target.value = _0x5bc30b.target.value.replace(_0x2acf18, "");
  return !1;
}
function setTitleBarNum(_0x50d27c) {
  var _0x2952e7 = document.getElementById("titleBar");
  if (_0x2952e7 && _0x2952e7.count) {
    if (_0x50d27c > 0) {
      _0x2952e7.count.innerHTML = _0x50d27c;
      _0x2952e7.count.style.visibility = "visible";
    } else {
      _0x2952e7.count.style.visibility = "hidden";
    }
  }
}
function addTitleBar(_0x146ac1, _0x1ed63a, _0x49a423, _0x268c75, _0x1ca4f0, _0x504e26, _0x4fa32d, _0x1ccea6, _0x45c723, _0xd41ee, _0x380d96) {
  var _0x49dbbf = clearDiv("titleBar");
  var _0x1412b0 = makeElement(_0x49dbbf, "div", "table htmlTitleBarButtons");
  var _0x2d4554 = makeElement(_0x1412b0, "div", "row");
  var _0x16bf6d = makeElement(_0x2d4554, "div", _0x4fa32d ? "cell htmlTitleButton d-none" : "cell htmlTitleButton");
  if (_0x1ccea6) {
    _0x16bf6d.classList.remove("d-none");
  }
  _0x16bf6d.addEventListener("click", _0x49a423);
  var _0x464076 = makeElement(_0x16bf6d, "span", "");
  if (_0x504e26) {
    let _0x6bf9fa = makeElement(_0x16bf6d, "a", null, _0x4fa32d ? "repIcon" : "");
    (_0x504e26 = makeElement(_0x6bf9fa, "img")).src = _0x4fa32d ? "svg/reportw.svg" : "svg/plus.svg";
    _0x504e26.width = "18";
    if (!_0x4fa32d) {
      _0x504e26.style.marginTop = "-2px";
    }
    _0x16bf6d.addEventListener("click", _0x2c76f5 => {
      _0x2c76f5.preventDefault();
      if (_0x4fa32d) {
        reportsDrop(_0x146ac1);
      } else {
        groupsDrop();
      }
    });
  } else {
    addText(_0x464076, _0x1ed63a);
  }
  makeElement(_0x2d4554, "div", "cell cellWide");
  var _0x5bcb69 = makeElement(_0x2d4554, "div", "cell cellRight htmlTitleButton");
  _0x5bcb69.addEventListener("click", _0x1ca4f0);
  var _0x3be700 = makeElement(_0x5bcb69, "span", "", "TitleBarRight");
  if (_0xd41ee) {
    _0xd41ee = makeElement(_0x3be700, "a");
    (_0x268c75 = makeElement(_0xd41ee, "img")).src = "svg/visitors.svg";
    _0x268c75.width = "22";
  }
  if (_0x45c723) {
    var _0x455f2c = makeElement(_0x2d4554, "div", "cell cellRight htmlTitleButton", "sideBarMob");
    makeElement(_0x455f2c, "span", "", "TitleBarRight");
    let _0x5703c3 = makeElement(_0x455f2c, "a");
    (_0x45c723 = makeElement(_0x5703c3, "img")).id = "sideBarMobId";
    _0x45c723.src = "svg/arrowqb.svg";
    _0x45c723.style.cssText = "width: 10px; margin-top: 2px; transform: scaleX(-1)";
    if (!_Activity.instance.IsClassic) {
      loadQuickBar(typeof _Activity.instance.QuickBar != "object");
    }
  }
  if (typeof _0x268c75 == "boolean") {
    const _0x4b6ea9 = "svg/removew.svg";
    let _0x56dac1 = makeElement(_0x3be700, "img");
    _0x56dac1.src = _0x4b6ea9;
    _0x56dac1.width = "18";
  } else if (!_0xd41ee) {
    addText(_0x3be700, _0x268c75);
  }
  var _0x1a8db1 = makeElement(_0x49dbbf, "div", "table htmlTitleBar cellWide" + (_0x380d96 ? " actionsDialog" : ""));
  var _0x48b586 = makeElement(_0x1a8db1, "div", "row");
  var _0x498fdd = makeElement(_0x48b586, "div", "cell cellWide dialogCellCenter htmlTitleTitle");
  var _0x1d0fda = makeElement(_0x498fdd, "span", "", "TitleBarTitle");
  if (_0x146ac1.length > 0) {
    addText(_0x1d0fda, _0x146ac1);
  }
}
function groupsDrop() {
  const _0x43f47e = document.getElementById("groupDropdown");
  _0x43f47e.style.display = _0x43f47e && _0x43f47e.style.display == "block" ? "none" : "block";
}
function reportsDrop(_0x40297f = null) {
  const _0x59c549 = Classic ? document.getElementById("reportDropdownClassic") : document.getElementById("reportDropdown");
  const _0x543963 = document.querySelector("#userBlock");
  const _0x484f18 = document.querySelector("#userReport");
  if (!_0x40297f) {
    _0x59c549.style.display = "none";
    return;
  }
  let _0x4b886a = _0x40297f;
  if ((_0x40297f.slice(-1) == "M" || _0x40297f.slice(-1) == "B") && !isNaN(_0x40297f.slice(0, -1))) {
    _0x4b886a = _0x40297f.slice(0, -1);
  }
  let _0x595c82 = ["mob2.block", "Block"];
  let _0x416e0a = /[a-zA-Z]/g.test(_0x4b886a);
  const _0x3afe35 = _0x543963.querySelector("#blockText");
  let _0x1b95fc = _0x416e0a ? _0x40297f.split("(")[1].slice(0, -1) : _0x40297f;
  _0x1b95fc = _0x1b95fc.replace("M", "000000");
  _0x1b95fc = _0x1b95fc.replace("B", "000000000");
  if (getBlockedUsers()[_0x1b95fc]) {
    _0x595c82 = ["mob2.unblock", "Unblock"];
  }
  _0x3afe35.innerText = "";
  addText(_0x3afe35, _0x595c82);
  _0x59c549.style.display = _0x59c549 && _0x59c549.style.display == "block" ? "none" : "block";
  if (_0x416e0a) {
    _0x484f18.classList.remove("d-none");
    _0x484f18.setAttribute("href", "https://xat.com/report#!user&UserName=" + _0x40297f.split(" ")[0].toLowerCase());
  } else {
    _0x484f18.classList.add("d-none");
  }
  _0x543963.onclick = () => {
    ToC({
      Command: "Block",
      UserNo: _0x1b95fc
    });
    actions.Visible = !1;
    if (Classic) {
      setFrameVis();
    } else {
      parent.setFrameVis();
    }
    modalClose();
  };
}
function clickOut(_0x47c9a9) {
  const _0x273815 = document.getElementById("reportDropdown");
  let _0x34add8 = findNodeInWindowOrParent("#reportDropdownClassic");
  const _0x5416e9 = findNodeInWindowOrParent("#groupDropdown");
  const _0x33f1cb = _Activity.instance.IsClassic ? findNodeInWindowOrParent("#reportIconClassic") : findNodeInWindowOrParent(".htmlTitleButton");
  let _0x1eb54c = _0x33f1cb && !_0x33f1cb.contains(_0x47c9a9.target);
  if (_0x47c9a9 && _0x1eb54c) {
    if (_0x5416e9) {
      _0x5416e9.style.display = "none";
    }
    if (_0x273815) {
      _0x273815.style.display = "none";
    }
    if (_0x34add8) {
      _0x34add8.style.display = "none";
    }
  }
  let _0x384cdd = findNodeInWindowOrParent("#dropdown-content");
  if (_0x384cdd && _0x47c9a9 && !_0x47c9a9.target.classList.contains("menuOpen")) {
    _0x384cdd.style.display = "none";
  }
}
function findNodeInWindowOrParent(_0x4925d7, _0x1c78a5) {
  if (!_0x4925d7) {
    return !1;
  }
  let _0x4b2718 = _0x1c78a5 ? document.querySelectorAll("" + _0x4925d7) : document.querySelector("" + _0x4925d7);
  _0x4b2718 ||= _0x1c78a5 ? parent?.document?.querySelectorAll("" + _0x4925d7) : parent?.document?.querySelector("" + _0x4925d7);
  return _0x4b2718;
}
function AddSections(_0x2a2c58, _0x4e888b, _0x365a29) {
  clearDiv("topSelector");
  var _0x745af7 = makeElement(document.getElementById("topSelector"), "div", "listTable");
  var _0x44c50a = makeElement(_0x745af7, "div", "dialogRow");
  for (var _0x4f04c0 in _0x2a2c58) {
    var _0x2db271 = _0x2a2c58[_0x4f04c0];
    var _0x50c28a = makeElement(_0x44c50a, "div", "dialogCell");
    if (_0x4e888b) {
      _0x50c28a.Click = _0x4e888b + _0x2db271 + "')";
      _0x50c28a.addEventListener("click", function (_0xe50eb0) {
        let _0x4158fb = this.Click.match(/(\w*).*?'(\w*)'/);
        switch (_0x4158fb[1]) {
          case "configurePage":
            configurePage(0, _0x4158fb[2]);
            break;
          case "configureStorePage":
            configureStorePage(_0x4158fb[2]);
        }
      });
    }
    var _0x5582ae = makeElement(_0x50c28a, "div", "listTable tabTable");
    var _0x3ce0de = makeElement(_0x5582ae, "div", "dialogRow");
    var _0x519cd7 = makeElement(_0x3ce0de, "div", "dialogCell dialogCellCenter tabLabelCell", "Label" + _0x2db271);
    var _0x2877ed = makeElement(_0x519cd7, "img", "selector");
    _0x2877ed.height = 16;
    _0x2877ed.width = 16;
    _0x2877ed.src = _0x365a29 ? "svg/" + _0x365a29[_0x4f04c0] + ".svg" : "svg/sel" + _0x2db271 + ".svg";
    addText(makeElement(_0x519cd7, "span", "selector"), ["mob1." + _0x2db271.toLowerCase(), _0x2db271]);
    var _0xd1fd60 = makeElement(_0x5582ae, "div", "dialogRow");
    makeElement(_0xd1fd60, "div", "dialogCell tabIndicatorCell", "Indicator" + _0x2db271);
  }
}
function SetSection(_0x307b19) {
  var _0xc01845;
  var _0x32ef85;
  _0xc01845 = document.getElementsByClassName("tabLabelCellSelected");
  _0x32ef85 = 0;
  for (; _0x32ef85 < _0xc01845.length; _0x32ef85++) {
    _0xc01845[_0x32ef85].className = "dialogCell dialogCellCenter tabLabelCell";
  }
  _0xc01845 = document.getElementsByClassName("tabIndicatorCellSelected");
  _0x32ef85 = 0;
  for (; _0x32ef85 < _0xc01845.length; _0x32ef85++) {
    _0xc01845[_0x32ef85].className = "dialogCell tabIndicatorCell";
  }
  if (_0xc01845 = document.getElementById("Label" + _0x307b19)) {
    _0xc01845.className += " tabLabelCellSelected";
  }
  if (_0xc01845 = document.getElementById("Indicator" + _0x307b19)) {
    _0xc01845.className += " tabIndicatorCellSelected";
  }
  CurrentSec = _0x307b19;
}
function FillInAll(_0x398e7e, _0xa7bf4d, _0x21c29f) {
  let _0x4f0313 = GetTranslation("mob2.fillall");
  _0x4f0313 ||= "Please fill in all boxes";
  for (var _0x3d05f3 in _0xa7bf4d) {
    if (!_0x398e7e[_0xa7bf4d[_0x3d05f3]]) {
      if (_0x21c29f) {
        addText(_0x21c29f, _0x4f0313);
      } else {
        AlertMessage(_0x4f0313);
      }
      return !1;
    }
  }
  return !0;
}
function DoBanDialog(_0x51394e, _0x149b32, _0x4ba73f) {
  let _0x24bd90 = (_0x149b32 - Date.now() / 1000) / 3600;
  _0x24bd90 = Math.round(_0x24bd90 * 100) / 100;
  if (_0x24bd90 < 0) {
    _0x24bd90 = 0;
  }
  const _0x576e2d = new Date().toLocaleString();
  _0x4ba73f = _0x4ba73f.substr(0, 500);
  const _0x25daea = "svg/remove" + (toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg";
  const _0x328b08 = "BanDialog";
  HiddenDivs[_0x328b08] = "<div class=\"modalDialogContentClassic\" data-w=\"0.65\"><div class=\"dialogTitleBar\"><span class=\"dialogTitle\"><img src=\"svg/actBan.svg\" alt=\"completed\" class=\"transcomp\"><span data-localize=\"mob2.banned\">Banned!</span></span><span class=\"dialogTitleAction\" id=\"id_ModalClose\"><img src=\"" + _0x25daea + "\" width=\"16\" alt=\"close\"></span></div><div class=\"dialogBody\"><div class=\"dialogPadding\"><div id=\"newAlert\"><div class=\"table\" style=\"display: flex;\"><div class=\"column transdesc\"><div data-localize=\"mob2.time\">Time</div><div data-localize=\"mob2.by\">By</div><div data-localize=\"mob2.duration\">Duration</div><div data-localize=\"mob2.reason\">Reason</div></div><div class=\"column\"><div>" + _0x576e2d + "</div><div>" + _0x51394e + "</div><div>" + (_0x24bd90 == 0 ? "<span data-localize='mob2.forever'>Forever</span>" : _0x24bd90 + " <span data-localize=\"mob2.hours\">Hours</span> ") + "</div>" + (_0x4ba73f.trim().length == 0 ? "<div style=\"overflow-y: auto; max-height: 70px;\" data-localize=\"mob2.noreason\">No reason given</div>" : "<div style=\"overflow-y: auto; max-height: 70px; word-break: break-word;\">" + _0x4ba73f + "</div>") + "</div></div><div class=\"banbuttons\" style=\"margin-top: 1rem;\"><a href=\"https://xat.com/report#!group&GroupName=" + config.GroupName + "\" target=\"_blank\"><button class=\"bButton\"><img src=\"svg/inappropriate.svg\" alt=\"report\" style=\"width: 12px\" class=\"inappIc\"><span data-localize=\"mob2.unfair\">Report unfair ban</span></button></a><a id=\"modalClose\"><button class=\"bButton\"><img src=\"svg/return2.svg\" alt=\"return\" class=\"inappIc\"><span data-localize=\"mob2.return\">Return to chat</span></button></a><a href=\"https://xat.com/groups\" target=\"_blank\"><button class=\"bButton\"><img src=\"svg/groups.svg\" alt=\"groups\" class=\"inappIc\"><span data-localize=\"mob2.findgroups\">Find other groups</span></button></a></div></div></div></div></div>";
  doModal(_0x328b08);
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
function DoTransfer(_0x1d1e9c, _0x122201, _0x47f52f, _0x27a712, _0x40de85) {
  _0x1d1e9c = _0x1d1e9c.substr(0, 500);
  var _0x1406cc = "AlertDialog";
  const _0x2aae9e = new Date().toLocaleString();
  const _0x41ea73 = "svg/remove" + (toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg";
  HiddenDivs[_0x1406cc] = "<div class=\"modalDialogContentClassic\"><div class=\"dialogTitleBar\"><span class=\"dialogTitle\"><img src=\"svg/capyes.svg\" alt=\"completed\" class=\"transcomp\"><span data-localize=\"mob2.transfer\">Transfer</span></span><span class=\"dialogTitleAction\" id=\"id_ModalClose\"><img src=\"" + _0x41ea73 + "\" width=\"16\" alt=\"close\"></span></div><div class=\"dialogBody\"><div class=\"dialogPadding\"><div id=\"newAlert\"><div class=\"table\" style=\"display: flex;\"><div class=\"column transdesc\"><div data-localize=\"mob2.time\">Time</div><div data-localize=\"mob2.amount\">Amount</div><div data-localize=\"mob2.from\">From</div><div data-localize=\"mob2.to\">To</div>" + (_0x1d1e9c.trim().length == 0 ? "" : "<div data-localize=\"mob2.message\">Message</div>") + "</div><div class=\"column\"><div class=\"transimp\">" + _0x2aae9e + "</div><div class=\"transimp\">" + _0x27a712 + " xats & " + _0x40de85 + " days</div><div class=\"transimp\">" + _0x122201 + "</div><div class=\"transimp\">" + _0x47f52f + "</div>" + (_0x1d1e9c.trim().length == 0 ? "" : "<div style=\"overflow-y: auto; max-height: 70px; color: inherit; word-break: break-word;\">" + _0x1d1e9c + "</div>") + "</div></div></div></div></div></div>";
  doModal(_0x1406cc);
  ColorTitle();
  setCstyle();
  TranslateAll();
  document.getElementById("id_ModalClose").addEventListener("click", function () {
    modalClose();
  });
}
function AlertMessage(_0x304d3d, _0x19575e, _0x23196b, _0x50b81d) {
  var _0x50a3c6 = clearAlertMessage();
  const _0xb9c010 = Classic ? "svg/remove" + (toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg" : "svg/removew.svg";
  if (!_0x50a3c6) {
    var _0x25d7de = "AlertDialog";
    HiddenDivs[_0x25d7de] = "<div class=\"modalDialogContentClassic\"><div class=\"dialogTitleBar\"><span data-localize=mob1.message class=\"dialogTitle\">Message</span><span class=\"dialogTitleAction\" id=\"id_ModalClose\"><img src=\"" + _0xb9c010 + "\" width=\"16\" alt=\"close\"></span></div><div class=\"dialogBody\"><div class=\"dialogPadding\"><div id=\"AlertMessage\"></div></div></div></div>";
    doModal(_0x25d7de);
    document.getElementById("id_ModalClose").addEventListener("click", function () {
      modalClose();
      if (_Activity.instance.LoginBodge) {
        removeClass("d-none", 0, _Activity.instance.Window.getById("Overlays"));
        _Activity.instance.LoginBodge = !1;
      }
    });
    _0x50a3c6 = clearAlertMessage();
    ColorTitle();
    TranslateAll();
    setCstyle();
  }
  var _0x181209;
  if (_0x19575e) {
    _0x304d3d = _0x304d3d.replace(/<p>/g, "ZZZZ");
  }
  if (_0x23196b) {
    _0x304d3d = _0x304d3d.replace(/<br>/g, "LLLLL");
  }
  _0x304d3d = (_0x304d3d = _0x304d3d.replace(/<.*?>/g, " ")).replace(/<.*/g, "");
  if (_0x19575e) {
    _0x304d3d = _0x304d3d.replace(/ZZZZ/g, "<p>");
  }
  if (_0x23196b) {
    _0x304d3d = _0x304d3d.replace(/LLLLL/g, "<br>");
  }
  _0x304d3d = _0x304d3d.replace(/\[link (.*?)\]/g, function (_0x48a865, _0x2501ae) {
    _0x181209 = _0x2501ae;
    return "";
  });
  if (_0x19575e) {
    _0x50a3c6.innerHTML = _0x304d3d;
  } else {
    _0x50a3c6.textContent = _0x304d3d;
  }
  if (_0x181209) {
    var _0x2a1356 = makeElement(_0x50a3c6, "a");
    _0x2a1356.href = "https://" + _0x181209;
    _0x2a1356.target = "_blank";
    addText(_0x2a1356, _0x181209);
  }
  _0x50a3c6.style.color = _0x50b81d ? "#00834d" : "#F00";
  _0x50a3c6.style.fontWeight = "bold";
  if (_0x50a3c6 = document.getElementById("openModal")) {
    _0x50a3c6.style.visibility = "visible";
  }
}
function clearAlertMessage() {
  ConnectingClose();
  let _0x14d29c = document.getElementById("openModal");
  _0x14d29c &&= _0x14d29c.getElementsByClassName("AlertMessage");
  if (_0x14d29c && _0x14d29c.length > 0) {
    _0x14d29c[0].textContent = "";
    return _0x14d29c[0];
  } else {
    _0x14d29c = document.getElementById("AlertMessage");
    if (_0x14d29c) {
      _0x14d29c.textContent = "";
      return _0x14d29c;
    } else {
      return null;
    }
  }
}
function BuildDialog(_0x169cca, _0x4e2808) {
  var _0x598804;
  var _0x501a72 = _0x169cca = makeElement(_0x169cca, "div", "modalDialogContentClassic");
  var _0x2d6797 = _0x169cca;
  var _0x4cb700 = _0x169cca;
  for (var _0x4e1c3d in _0x4e2808) {
    var _0x2e0994 = _0x4e2808[_0x4e1c3d];
    switch (_0x2e0994.type) {
      case "click":
        _0x598804 = addEditBox2(_0x501a72, 0, "dialogClick", _0x2e0994.name, "noedit");
        _0x2e0994.icon = _0x2e0994.name;
        _0x598804.Part = _0x2e0994;
        _0x598804.addEventListener("click", function (_0x557413) {
          actions.sendApp(_0x557413, this.Part);
        });
        break;
      case "title":
        addEditBox2(_0x169cca, 0, "dialogTitleBar", _0x2e0994.name, "noedit", "bold");
        _0x4cb700 = _0x2d6797 = _0x501a72 = makeElement(_0x169cca, "div", "dialogBody");
        _0x501a72 = makeElement(_0x501a72, "div", "dialogPadding");
        makeElement(_0x501a72, "div", "AlertMessage");
        _0x2d6797 = makeElement(_0x501a72, "div", "dialogBody");
        _0x2d6797 = makeElement(_0x2d6797, "div", "dialogTable");
        ColorTitle();
        break;
      case "mw":
        _0x169cca.dataset.mw = _0x2e0994.mw;
        break;
      case "password":
        addEditBox2(_0x2d6797, _0x2e0994.id, "dialogRow", _0x2e0994.name, 0, 0, "password");
        break;
      case "dialog":
        addEditBox2(_0x2d6797, _0x2e0994.id, "dialogRow", _0x2e0994.name);
        break;
      case "text":
        addEditBox2(_0x501a72, 0, "", _0x2e0994.name, "noedit");
        break;
      default:
        addEditBox2(_0x4cb700, 0, "dialogActions", _0x2e0994);
    }
  }
}
function addEditBox2(_0xa4853e, _0x32f5f4, _0x542af0, _0x16b9d0, _0x4a743e, _0x31fbfd, _0x90996b) {
  var _0x435214 = makeElement(_0xa4853e, "div", _0x542af0);
  const _0x3f5f43 = "svg/remove" + (toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg";
  switch (_0x542af0) {
    case "dialogTitleBar":
      addText(_0x2c4ff8 = makeElement(_0x435214, "span", "dialogTitle"), _0x16b9d0 + "\xA0");
      (_0x341d48 = makeElement(_0x435214, "span", "dialogTitleAction")).id = "modalCancel";
      break;
    case "dialogRow":
      addText(_0x341d48 = makeElement(_0x435214, "div", "dialogCell"), _0x16b9d0 + "\xA0");
      if (_0x4a743e === undefined) {
        _0x4a743e = "";
      }
      if (_0x4a743e === "noedit") {
        break;
      }
      var _0x341d48 = makeElement(_0x435214, "div", "dialogCell cellWide");
      var _0x426dea = makeElement(_0x341d48, "input", "dialogInput");
      _0x426dea.setAttribute("autocomplete", _0x90996b == "password" ? "new-password" : "off");
      if (_0x90996b == "password") {
        _0x426dea.type = "password";
      } else {
        _0x426dea.type = "text";
        _0x426dea.value = _0x4a743e;
      }
      _0x426dea.id = _0x32f5f4;
      break;
    case "dialogClick":
    case "":
      addText(_0x435214, _0x16b9d0 + "\xA0");
      break;
    case "dialogActions":
      if (_0x16b9d0.action == "Cancel") {
        let _0x9ed061 = makeElement(_0x341d48 = document.getElementById("modalCancel"), "img");
        _0x9ed061.src = _Activity.instance.IsClassic ? _0x3f5f43 : "svg/removew.svg";
        _0x9ed061.width = "16";
        _0x9ed061.alt = "close";
        _0x341d48.addEventListener("click", function () {
          modalClose();
        });
        _0xa4853e.removeChild(_0x435214);
        break;
      }
      var _0x2c4ff8;
      var _0x14c848;
      addText(_0x435214, "\xA0");
      addText(_0x2c4ff8 = makeElement(_0x435214, "span", "dialogActionRight"), _0x16b9d0.label);
      if (_0x16b9d0.flags & 1) {
        _0x2c4ff8.style.opacity = "0.5";
        _0x2c4ff8.addEventListener("click", function () {
          modalClose();
        });
      } else {
        if (typeof sendApp == "function") {
          _0x14c848 = sendApp;
        }
        if (!_0x14c848 && sendFunc) {
          _0x14c848 = sendFunc;
        }
        _0x2c4ff8.addEventListener("click", function (_0x330ae2) {
          clearAlertMessage();
          _0x14c848(_0x330ae2, _0x16b9d0.action, _0x16b9d0.Power);
        });
      }
  }
  return _0x435214;
}
function doModal(_0x361aca, _0x18753a, _0x1f6df3, _0x2fc362, _0x233d0e, _0x29dc5b = () => {}) {
  modalClose();
  var _0x3010f6 = makeElement(document.body, "div", _0x2fc362 ? "modalDialog AnnounceFrame" : "modalDialog");
  _0x3010f6.setAttribute("id", "openModal");
  var _0x4ebce3;
  var _0x415008 = makeElement(_0x3010f6, "div");
  var _0x1a5249 = "";
  if (typeof _0x361aca == "string") {
    _0x1a5249 = _0x361aca.charAt(0);
  }
  if (_0x1a5249 == "{" || _0x1a5249 == "[") {
    _0x361aca = JSON.parse(_0x361aca);
  }
  if (_0x361aca !== null && typeof _0x361aca == "object") {
    BuildDialog(_0x415008, _0x361aca);
    _0x4ebce3 = _0x415008;
    _0x415008.PushUp = !0;
  } else if (_0x361aca.charAt(0) == "h") {
    var _0x25b29c = makeElement(_0x415008, "iframe");
    _0x25b29c.setAttribute("src", _0x361aca);
    _0x25b29c.setAttribute("width", 300);
    _0x25b29c.setAttribute("height", 500);
    _0x4ebce3 = _0x25b29c;
  } else {
    _0x4ebce3 = makeElement(_0x415008, "div");
    CacheHiddenDivs();
    _0x4ebce3.innerHTML = HiddenDivs[_0x361aca];
    TranslateNodes(_0x4ebce3);
    if (typeof messages != "undefined" && typeof messages.openSmiliesDialog == "function") {
      messages.openSmiliesDialog();
    }
  }
  _0x3010f6.style.opacity = 1;
  _0x3010f6.style.pointerEvents = "auto";
  _0x4ebce3.addEventListener("click", function (_0x30c8e4) {
    _0x30c8e4.stopPropagation();
  });
  if (_0x1f6df3) {
    posModal(_0x4ebce3, _0x18753a, true);
  } else {
    posModal(_0x4ebce3, _0x18753a);
  }
  _0x29dc5b(document);
  setCstyle(null, _0x233d0e);
  return _0x4ebce3;
}
function posModal(_0x23b424, _0x3171c0, _0x386a23) {
  if (_0x23b424) {
    _0x3171c0 ||= {};
    var _0x5cfd30 = _0x23b424.firstElementChild;
    if (selector?.isCaptchaPage()) {
      _0x3171c0.mw = 100;
    }
    var _0x4da97b = _0x5cfd30.dataset.w;
    if (_0x3171c0.w) {
      _0x4da97b = _0x3171c0.w;
    }
    _0x4da97b ||= 0.4;
    var _0x1fc787 = 0;
    if (_0x23b424.offsetParent) {
      _0x1fc787 = _0x23b424.offsetParent.offsetWidth;
    }
    _0x1fc787 ||= _0x23b424.parentNode.offsetWidth;
    var _0x37d282 = xInt(_0x5cfd30.dataset.mw);
    if (_0x3171c0.mw) {
      _0x37d282 = _0x3171c0.mw;
    }
    if (_0x37d282 < 10) {
      _0x37d282 = 270;
    }
    var _0x55e71e = _0x3171c0.h;
    _0x55e71e ||= _0x5cfd30.dataset.h;
    var _0x8e31a9 = xInt(_0x5cfd30.dataset.mh);
    if (_0x3171c0.mh) {
      _0x8e31a9 = _0x3171c0.mh;
    }
    if (_0x8e31a9 < 10) {
      _0x8e31a9 = 30;
    }
    if (_0x1fc787 * _0x4da97b < _0x37d282 && (_0x4da97b = _0x37d282 / _0x1fc787) > 0.95) {
      _0x4da97b = 0.95;
    }
    var _0x2e8568 = (1 - _0x4da97b) / 2;
    var _0x5a3680 = _0x5cfd30.offsetHeight;
    var _0x360e05 = 0;
    if (_0x23b424.offsetParent) {
      _0x360e05 = _0x23b424.offsetParent.offsetHeight;
    }
    _0x360e05 ||= _0x23b424.parentNode.offsetHeight;
    if (_0x5a3680 < _0x8e31a9) {
      _0x5a3680 = _0x8e31a9;
    }
    if (_0x55e71e && _0x5a3680 < _0x360e05 * _0x55e71e) {
      _0x5a3680 = _0x360e05 * _0x55e71e;
    }
    if (_0x5a3680 > _0x360e05 - 40) {
      _0x5a3680 = _0x360e05 - 40;
    }
    _0x8e31a9 = xInt(_0x5a3680);
    var _0x173735 = _0x386a23 ? (_0x360e05 - _0x5a3680) / 3.8 : (_0x360e05 - _0x5a3680) / 2;
    if (config.PhoneType == PhoneTypes.DROIDPHONE || config.PhoneType == PhoneTypes.WEB || _0x5cfd30.dataset.pu) {
      _0x23b424.PushUp = _0x23b424.PushUp || _0x5cfd30.dataset.pu || document.getElementById("PushUp");
    } else {
      _0x23b424.PushUp = false;
    }
    if (_0x23b424.PushUp) {
      _0x173735 = (_0x360e05 - _0x5a3680 - 250) / 2;
    }
    if (_0x173735 < 10) {
      _0x173735 = 10;
    }
    _0x173735 = xInt(_0x173735);
    var _0x4e50b9 = xInt(_0x1fc787 * _0x2e8568);
    _0x1fc787 -= _0x4e50b9 * 2;
    if (Classic && _0x3171c0?.customHeight) {
      _0x5a3680 = _0x3171c0?.customHeight + 30;
    }
    var _0x451246 = "";
    if (_0x8e31a9 > 30) {
      _0x451246 = "height:" + _0x5a3680 + "px;";
    }
    _0x5cfd30.style.cssText = "width:" + _0x1fc787 + "px; left:" + _0x4e50b9 + "px; top: " + _0x173735 + "px;" + _0x451246;
  }
}
function modalClose(_0x11f847) {
  removeById("openModal");
  if (_0x11f847) {
    const _0x1bd980 = findNodeInWindowOrParent("#FrameBack");
    if (_0x1bd980 && !_0x1bd980.classList.contains("d-none")) {
      _0x1bd980.classList.add("d-none");
    }
  }
}
function heightModal(_0x5d50a7) {
  if (!_0x5d50a7) {
    return;
  }
  let _0x302dde = window?.parent?.document;
  if (!_0x302dde) {
    return;
  }
  let _0x43d85e = _0x302dde?.querySelector(".modalDialogContentClassic");
  if (_0x43d85e) {
    _0x43d85e.style.height = _0x5d50a7 + 30 + "px";
  }
}
function CacheHiddenDivs() {
  if (!DoneHiddenDivs) {
    DoneHiddenDivs = !0;
    var _0x4bcdd7;
    var _0x489e66;
    var _0x36efb6 = document.getElementsByClassName("dialog");
    for (_0x4bcdd7 = 0; _0x4bcdd7 < _0x36efb6.length; _0x4bcdd7++) {
      _0x489e66 = _0x36efb6[_0x4bcdd7];
      if (!Classic || _0x489e66.id != "LoginForm") {
        HiddenDivs[_0x489e66.id] = _0x489e66.innerHTML;
        _0x489e66.innerHTML = "";
      }
    }
  }
}
function AddHammer(_0x42a19e, _0x4c9f41, _0x386549) {
  var _0x5ea06e;
  switch (_0x4c9f41) {
    case Hammer.DIRECTION_LEFT:
      _0x5ea06e = "swipeleft";
      break;
    case Hammer.DIRECTION_RIGHT:
      _0x5ea06e = "swiperight";
      break;
    default:
      _0x5ea06e = "swipeleft swiperight";
      _0x4c9f41 = Hammer.DIRECTION_HORIZONTAL;
  }
  const _0x5962f0 = {
    direction: _0x4c9f41
  };
  const _0x4741ed = {
    userselect: !1
  };
  var _0x1c4bf8 = new Hammer(_0x42a19e, {
    preventDefault: !0,
    recognizers: [[Hammer.Swipe, _0x5962f0]],
    cssProps: _0x4741ed
  });
  _0x1c4bf8.on(_0x5ea06e, function (_0x3161f8) {
    if (!_Activity.instance.IsClassic && _Activity.instance.QuickBar) {
      _Activity.instance.QuickBar.shouldCloseQuickBar(_0x3161f8);
    }
    const _0x52b3c2 = {
      Type: _0x3161f8.type
    };
    var _0x29dd63 = _0x52b3c2;
    if (_0x3161f8.target.id) {
      _0x29dd63.id = _0x3161f8.target.id;
    } else if (_0x3161f8.target.parentNode.id) {
      _0x29dd63.id = _0x3161f8.target.parentNode.id;
    }
    _0x386549(0, _0x29dd63);
  });
  return _0x1c4bf8;
}
function SetTotalUnRead(_0x3a097e) {
  var _0x202c0f = document.getElementById("titleBar");
  if (_0x202c0f && _0x202c0f.count) {
    if (_0x3a097e == 0) {
      _0x202c0f.count.style.visibility = "hidden";
    } else {
      if (_0x3a097e > 9) {
        _0x3a097e = "9+";
      }
      _0x202c0f.count.innerHTML = _0x3a097e;
      _0x202c0f.count.style.visibility = "visible";
    }
  }
}
function getXats() {
  modalClose();
  HitWeb(openBuyPage());
}
function ShowCaptcha(_0x12b27f) {
  _Activity.instance.Selector.CapJson = _0x12b27f;
  _Activity.instance.Selector.DoLoginEtc("AreYouABot");
}
function saveSetting(_0x136800, _0x313053, _0x5d61db) {
  if (_0x5d61db) {
    return ToC({
      Type: "Macro",
      Command: "Macro",
      Name: _0x136800,
      Value: _0x313053
    });
  }
  ToC({
    Page: "settings",
    Type: "Setting",
    Command: "Setting",
    Name: _0x136800,
    Value: _0x313053
  });
}
function NOP() {}
function isEmpty(_0x1fa3c6) {
  for (var _0x300ec3 in _0x1fa3c6) {
    if (_0x1fa3c6.hasOwnProperty(_0x300ec3)) {
      return !1;
    }
  }
  return !0;
}
function setPmMode(_0x515d63, _0x699ffc, _0x1eee0c, _0x1aab26) {
  _0x1aab26 ||= parent.document;
  const _0x139456 = _0x1aab26.getElementById("textEntryEditable");
  const _0x45cfb1 = _0x1aab26.getElementById("pmWrapper");
  _0x45cfb1.innerHTML = "";
  _0x45cfb1.style.display = "block";
  if (!_0x515d63) {
    _0x45cfb1.style.pointerEvents = "none";
    _0x45cfb1.style.display = "none";
    _0x139456.classList.remove("sided");
    PMMODE = false;
    return;
  }
  PMMODE = !0;
  _0x139456.classList.add("sided");
  _0x45cfb1.dataset.userno = _0x699ffc;
  _0x45cfb1.dataset.regname = _0x1eee0c;
  addToolTip(makeElement(_0x45cfb1, "div", "pmLock"), ["mob2.sendingto", "Sending to: $1", _0x1eee0c], {
    position: "low",
    dom: _0x1aab26
  });
  const _0x10073c = makeElement(_0x45cfb1, "div", "pmDel");
  const _0x54b332 = {
    dom: _0x1aab26
  };
  addToolTip(_0x10073c, ["box.66", "Cancel"], _0x54b332);
  _0x10073c.addEventListener("click", () => {
    setPmMode(!1);
  });
  _0x10073c.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" preserveAspectRatio=\"none\" x=\"0px\" y=\"0px\" width=\"40px\" height=\"40px\" viewBox=\"0 0 40 40\">\n        <defs>\n            <g id=\"_App_Icons_cancel_0_Layer0_0_FILL\">\n                <path fill=\"#19191b\" stroke=\"none\" d=\"\n                M 12.2 3.85\n                Q 11.6 3.85 11.2 4.25\n                L 8.9 6.6 6.55 4.25\n                Q 6.35 4.05 6.15 4 5.9 3.85 5.6 3.85 5 3.85 4.55 4.3 4.1 4.75 4.1 5.3 4.1 5.9 4.55 6.3\n                L 6.85 8.6 4.5 11\n                Q 4.05 11.4 4.05 12 4.05 12.55 4.5 13 4.95 13.45 5.5 13.45 6.1 13.45 6.5 13\n                L 8.9 10.65 10.3 12.05 10.35 12.05 10.35 12.1 11.25 13\n                Q 11.7 13.45 12.25 13.45 12.85 13.45 13.3 13 13.7 12.55 13.7 12 13.7 11.4 13.3 11\n                L 10.9 8.6 13.25 6.3\n                Q 13.65 5.9 13.65 5.3 13.65 4.75 13.2 4.3 12.75 3.85 12.2 3.85 Z\"/>\n            </g>\n\n            <path id=\"_App_Icons_cancel_0_Layer0_0_1_STROKES\" stroke=\"#19191b\" stroke-width=\"1\" stroke-linejoin=\"round\" stroke-linecap=\"round\" fill=\"none\" d=\"\n            M 17.6 8.8\n            Q 17.6 12.45 15 15 12.45 17.6 8.8 17.6 5.15 17.6 2.55 15 0 12.45 0 8.8 0 5.15 2.55 2.55 5.15 0 8.8 0 12.45 0 15 2.55 17.6 5.15 17.6 8.8 Z\"/>\n        </defs>\n\n        <g transform=\"matrix( 1.76702880859375, 0, 0, 1.76702880859375, 4.5,4.4) \">\n            <g transform=\"matrix( 1, 0, 0, 1, 0,0) \">\n                <use xlink:href=\"#_App_Icons_cancel_0_Layer0_0_FILL\"/>\n\n                <use xlink:href=\"#_App_Icons_cancel_0_Layer0_0_1_STROKES\"/>\n            </g>\n        </g>\n    </svg>";
}
function sendPm(_0x50763d, _0x2f8a1a) {
  if (_0x2f8a1a.length !== 0) {
    ToC({
      Command: "Action",
      Message: _0x2f8a1a,
      Next: "messages",
      Page: "actions",
      Type: "Action",
      UserNo: _0x50763d,
      name: "PrivateMessage"
    });
  }
}
function MakeHelpMessage(_0x4b6a1d, _0x16ec5e, _0x9eee21) {
  _0x16ec5e ||= "";
  var _0x2fb22d = makeElement(0, "li", "message", _0x16ec5e);
  var _0x2d4de3 = makeElement(_0x2fb22d, "div", "listTable");
  var _0x2eafe3 = makeElement(_0x2d4de3, "div", "dialogRow");
  var _0x31fe7d = makeElement(_0x2eafe3, "div", "dialogCell cellWide noPointer");
  var _0x13bf95 = makeElement(_0x31fe7d, "div", "noftxt");
  if (!Classic) {
    _0x13bf95.style.width = "100%";
  }
  _0x13bf95.innerHTML = "";
  var _0x253bab = makeElement(_0x13bf95, "p");
  _0x253bab.className = "chatsMessage";
  if (!Classic) {
    _0x253bab.style.cssText = "white-space: normal; margin-left: 3px";
  }
  createTextSm(_0x253bab, _0x4b6a1d);
  if (_0x9eee21) {
    _0x9eee21.p = _0x253bab;
    _0x9eee21.msg = _0x13bf95;
  }
  return _0x2fb22d;
}
function InitPage(_0x569e7c) {
  if (_0x569e7c.length > 1) {
    ConnectingOpen(_0x569e7c);
  } else {
    ConnectingClose();
  }
}
document.addEventListener("click", clickOut, !0);
var connType;
var connTimeout = null;
function ConnectingClose() {
  if (connTimeout) {
    clearTimeout(connTimeout);
  }
  connTimeout = null;
  removeById("Connecting");
}
function ConnectingOpen(_0x16e287) {
  if (_0x16e287 && document.getElementById("Connecting")) {
    var _0x27f4b6 = document.getElementById("loading");
    if (_0x27f4b6) {
      _0x27f4b6.innerHTML = _0x16e287 + "&nbsp;<span>.</span><span>.</span><span>.</span></div>";
      return;
    }
  }
  if (_0x16e287) {
    connType = _0x16e287;
    if (connTimeout) {
      clearTimeout(connTimeout);
    }
    connTimeout = setTimeout(ConnectingOpen, 500);
    return;
  }
  ConnectingClose();
  var _0x3f62e9 = makeElement(document.body, "div", "connectingDialog");
  _0x3f62e9.setAttribute("id", "Connecting");
  var _0x53aa13 = makeElement(_0x3f62e9, "div");
  _0x53aa13.innerHTML = "<!DOCTYPE html><html lang=\"en\"><body><div id=\"xatLoader\"><div id=\"xatLoaderInner\"><img id=\"planet\" src=\"svg/x.svg\"/><img id=\"rocket\" src=\"svg/ss.svg\" /><div id=\"loading\" class=\"txt\"><span id=\"ConMsgId\"></span>&nbsp;<span>.</span><span>.</span><span>.</span></div></div></div></body></html>";
  addText(document.getElementById("ConMsgId"), ["mod1." + connType.toLowerCase(), connType]);
  _0x53aa13.style.top = xInt((_0x3f62e9.clientHeight - _0x53aa13.clientHeight) / 2) + "px";
  _0x3f62e9.style.opacity = 1;
  _0x3f62e9.style.pointerEvents = "auto";
  document.getElementById("xatLoader").addEventListener("click", function () {
    ConnectingClose();
  });
}
function onSwear(_0x4e31f0) {
  var _0x11f75c = _0x4e31f0.target;
  _0x11f75c.className = "";
  _0x11f75c.onclick = null;
  _0x4e31f0.preventDefault();
}
function ST2(_0x479c8a, _0x53dc21, _0x2a4759, _0x5dd416, _0x21afa8) {
  if (_0x53dc21 != null) {
    _0x479c8a = _0x479c8a.slice(0, _0x479c8a.indexOf("$1")) + _0x53dc21 + _0x479c8a.slice(_0x479c8a.indexOf("$1") + 2);
  }
  if (_0x2a4759 != null) {
    _0x479c8a = _0x479c8a.slice(0, _0x479c8a.indexOf("$2")) + _0x2a4759 + _0x479c8a.slice(_0x479c8a.indexOf("$2") + 2);
  }
  if (_0x5dd416 != null) {
    _0x479c8a = _0x479c8a.slice(0, _0x479c8a.indexOf("$3")) + _0x5dd416 + _0x479c8a.slice(_0x479c8a.indexOf("$3") + 2);
  }
  if (_0x21afa8 != null) {
    _0x479c8a = _0x479c8a.slice(0, _0x479c8a.indexOf("$4")) + _0x21afa8 + _0x479c8a.slice(_0x479c8a.indexOf("$4") + 2);
  }
  return _0x479c8a;
}
function GetAsMB(_0x38eea4) {
  let _0x16755c = _0x38eea4.toString();
  if (_0x16755c.substr(-9, 9) == "000000000") {
    _0x16755c = _0x16755c.substr(0, _0x16755c.length - 9) + "B";
  }
  if (_0x16755c.substr(-6, 6) == "000000") {
    _0x16755c = _0x16755c.substr(0, _0x16755c.length - 6) + "M";
  }
  return _0x16755c;
}
function xInt(_0x2b2e6d) {
  _0x2b2e6d = parseInt(_0x2b2e6d);
  if (isNaN(_0x2b2e6d)) {
    return 0;
  } else {
    return _0x2b2e6d;
  }
}
function microtime(_0x250c2b) {
  var _0x32b86a = new Date().getTime() / 1000;
  var _0x2f24ca = parseInt(_0x32b86a, 10);
  if (_0x250c2b) {
    return _0x32b86a;
  } else {
    return Math.round((_0x32b86a - _0x2f24ca) * 1000) / 1000 + " " + _0x2f24ca;
  }
}
function urldecode(_0x28a4be) {
  return decodeURIComponent((_0x28a4be + "").replace(/\+/g, "%20"));
}
function ObjToQuery(_0x916b59) {
  return Object.keys(_0x916b59).map(function (_0x46e3c9) {
    return _0x46e3c9 + "=" + _0x916b59[_0x46e3c9];
  }).join("&");
}
function objToXatJson(_0x292646) {
  if (_0x292646) {
    return Object.keys(_0x292646).map(_0xc8c01f => _0xc8c01f + "/" + _0x292646[_0xc8c01f]).join("//");
  } else {
    return "";
  }
}
function xatJsonToObj(_0x31182c) {
  if (!_0x31182c.length) {
    return {};
  }
  const _0xd7114a = {};
  _0x31182c.split("//").forEach(_0x153d9f => {
    _0x153d9f = _0x153d9f.split("/");
    _0xd7114a[_0x153d9f[0]] = _0x153d9f[1];
  });
  return _0xd7114a;
}
function loadJSON(_0x376998, _0x179124, _0x5943b7, _0x34a9de) {
  var _0x4719f9 = new XMLHttpRequest();
  _0x4719f9.onreadystatechange = function () {
    if (_0x4719f9.readyState === 4) {
      if (_0x4719f9.status === 200) {
        if (_0x179124) {
          var _0x4e472f;
          try {
            _0x4e472f = JSON.parse(_0x4719f9.responseText);
          } catch (_0x520138) {
            if (_0x5943b7) {
              _0x5943b7(_0x520138);
            }
          }
          if (_0x4e472f) {
            _0x179124(_0x4e472f);
          }
        }
      } else if (_0x5943b7) {
        _0x5943b7(_0x4719f9);
      }
    }
  };
  if (_0x34a9de) {
    _0x4719f9.open("POST", _0x376998, true);
    _0x4719f9.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    _0x4719f9.send(ObjToQuery(_0x34a9de));
  } else {
    _0x4719f9.open("GET", _0x376998, true);
    _0x4719f9.send();
  }
}
function loadHTML(_0x1edce2, _0x4e8655, _0xd6f6e3, _0x3c0e3c) {
  var _0x4b7b52 = new XMLHttpRequest();
  _0x4b7b52.onreadystatechange = function () {
    if (_0x4b7b52.readyState === 4) {
      if (_0x4b7b52.status === 200) {
        if (_0x4e8655) {
          _0x4e8655(_0x4b7b52.responseText);
        }
      } else if (_0xd6f6e3) {
        _0xd6f6e3(_0x4b7b52);
      }
    }
  };
  if (_0x3c0e3c) {
    _0x4b7b52.open("POST", _0x1edce2, true);
    _0x4b7b52.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    _0x4b7b52.send(ObjToQuery(_0x3c0e3c));
  } else {
    _0x4b7b52.open("GET", _0x1edce2, true);
    _0x4b7b52.send();
  }
}
function iosAllowCookies() {
  localStorage.setItem("mobCookies", 1);
}
function openBuyPage(_0x40cf19, _0x2158f3) {
  let _0x381197 = "_blank";
  let _0x560c2a = "https://xat.com/buy";
  let _0x21f513 = {};
  try {
    _0x21f513 = JSON.parse(localStorage.getItem("todo"));
  } catch (_0x1cc9c2) {}
  _0x21f513 ||= {};
  if (_Activity.instance.IsAndroidApp && _0x21f513?.w_registered || !_0x40cf19 && _Activity.instance.IsIOSApp && _0x21f513?.w_registered) {
    _0x381197 = "_self";
    _0x560c2a = "xat://buy-xats?userId=" + _0x21f513.w_userno + "&userName=" + _0x21f513.w_registered + "&deviceId=" + _0x21f513.DeviceId + "&passHash=" + _0x21f513.PassHash;
  } else if (_0x40cf19 && _Activity.instance.IsIOSApp && _0x21f513?.w_registered) {
    _0x40cf19 = !1;
    const _0x15b2a9 = {
      userId: _0x21f513.w_userno,
      userName: _0x21f513.w_registered,
      deviceId: _0x21f513.DeviceId,
      passHash: _0x21f513.PassHash
    };
    const _0x2f7f83 = _0x15b2a9;
    window.webkit.messageHandlers.xatStore.postMessage(_0x2f7f83);
  }
  const _0x150c45 = _0x2158f3 ?? window;
  if (!_0x40cf19) {
    return _0x560c2a;
  }
  _0x150c45.open(_0x560c2a, _0x381197);
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
function DecodeColor(_0x1a51ba, _0x4d870b) {
  if (_0x1a51ba != null) {
    if (_0x4d870b & NamePowers.valid) {
      while (true) {
        if (_0x1a51ba.length == 6 && _0x1a51ba.replace(/[^0-9a-fA-F]/g, "").length == 6) {
          break;
        }
        if (_0x1a51ba.length == _0x1a51ba.replace(/[^rgb\-\+]/g, "").length) {
          break;
        }
        return _0x1a51ba;
      }
    }
    var _0x4475e1 = (_0x4d870b & NamePowers.red) > 0;
    var _0x20dac8 = (_0x4d870b & NamePowers.green) > 0;
    var _0x292cab = (_0x4d870b & NamePowers.blue) > 0;
    var _0x3947d8 = (_0x4d870b & NamePowers.light) > 0;
    if (_0x4475e1 != 0 || _0x20dac8 != 0 || _0x292cab != 0 || _0x3947d8 != 0) {
      var _0x3bd328 = (_0x1a51ba = _0x1a51ba.toLowerCase()).split("r").length - 1;
      var _0x1a2a88 = _0x1a51ba.split("g").length - 1;
      var _0xa1d264 = _0x1a51ba.split("b").length - 1;
      var _0x38df23 = _0x1a51ba.split("+").length - 1;
      var _0xc1f1dd = _0x1a51ba.split("-").length - 1;
      var _0x558436 = 0.5;
      if (_0x3bd328 == 0 && _0x1a2a88 == 0 && _0x38df23 == 0 && _0xc1f1dd == 0) {
        var _0x47fe2c = 0;
        for (var _0x742ecb = 0; _0x742ecb < _0x1a51ba.length; _0x742ecb++) {
          var _0x45f57d = _0x1a51ba.charAt(_0x742ecb);
          if ((_0x47fe2c = _0x45f57d >= "0" && _0x45f57d <= "9" || _0x45f57d >= "a" && _0x45f57d <= "f" ? _0x47fe2c + 1 : 0) == 6) {
            var _0x3badaa = parseInt(_0x1a51ba.substr(_0x742ecb - _0x47fe2c + 1, 6), 16);
            if (_0x4475e1 != 0 && _0x20dac8 != 0 && _0x292cab != 0 && _0x3947d8 != 0) {
              return _0x3badaa;
            }
            _0xa1d264 = _0x3badaa & 255;
            _0x1a2a88 = _0x3badaa >> 8 & 255;
            _0x3bd328 = _0x3badaa >> 16 & 255;
            _0x38df23 = _0xc1f1dd = 0;
            if (_0x3947d8 != 0) {
              _0x558436 = (Math.min(_0x3bd328, Math.min(_0x1a2a88, _0xa1d264)) + Math.max(_0x3bd328, Math.max(_0x1a2a88, _0xa1d264))) / 512;
            }
            break;
          }
        }
      }
      if (_0x3bd328 != 0 || _0x1a2a88 != 0 || _0xa1d264 != 0 || _0x38df23 != 0 || _0xc1f1dd != 0) {
        if (_0x4475e1 == 0) {
          _0x3bd328 = 0;
        }
        if (_0x20dac8 == 0) {
          _0x1a2a88 = 0;
        }
        if (_0x292cab == 0) {
          _0xa1d264 = 0;
        }
        if (_0x3947d8 == 0) {
          _0x38df23 = _0xc1f1dd = 0;
        }
        if (_0x3bd328 == 0 && _0x1a2a88 == 0 && _0xa1d264 == 0) {
          _0x3bd328 = _0x1a2a88 = _0xa1d264 = 1;
        }
        var _0x1454d2;
        var _0x3c8158;
        var _0x56da10;
        var _0x509ff8;
        var _0x123ff8;
        var _0x840755;
        var _0x23e4b2 = _0x3bd328 / (_0x3bd328 + _0x1a2a88 + _0xa1d264);
        var _0x100712 = _0x1a2a88 / (_0x3bd328 + _0x1a2a88 + _0xa1d264);
        var _0x289b91 = _0xa1d264 / (_0x3bd328 + _0x1a2a88 + _0xa1d264);
        var _0x440ed5 = Math.min(_0x23e4b2, Math.min(_0x100712, _0x289b91));
        var _0x16b1c5 = Math.max(_0x23e4b2, Math.max(_0x100712, _0x289b91));
        var _0x5350e7 = _0x16b1c5 - _0x440ed5;
        _0x840755 = (_0x16b1c5 + _0x440ed5) / 2;
        if (_0x5350e7 == 0) {
          _0x509ff8 = _0x123ff8 = 0;
        } else {
          _0x123ff8 = _0x840755 < 0.5 ? _0x5350e7 / (_0x16b1c5 + _0x440ed5) : _0x5350e7 / (2 - _0x16b1c5 - _0x440ed5);
          var _0x10f87a = ((_0x16b1c5 - _0x23e4b2) / 6 + _0x5350e7 / 2) / _0x5350e7;
          var _0x2c2e70 = ((_0x16b1c5 - _0x100712) / 6 + _0x5350e7 / 2) / _0x5350e7;
          var _0x4e73bb = ((_0x16b1c5 - _0x289b91) / 6 + _0x5350e7 / 2) / _0x5350e7;
          if (_0x23e4b2 == _0x16b1c5) {
            _0x509ff8 = _0x4e73bb - _0x2c2e70;
          } else if (_0x100712 == _0x16b1c5) {
            _0x509ff8 = 1 / 3 + _0x10f87a - _0x4e73bb;
          } else if (_0x289b91 == _0x16b1c5) {
            _0x509ff8 = 2 / 3 + _0x2c2e70 - _0x10f87a;
          }
          if (_0x509ff8 < 0) {
            _0x509ff8 += 1;
          }
          if (_0x509ff8 > 1) {
            _0x509ff8 -= 1;
          }
        }
        if ((_0x840755 = _0x558436 + _0x38df23 * 0.0625 - _0xc1f1dd * 0.0625) < 0) {
          _0x840755 = 0;
        }
        if (_0x840755 > 1) {
          _0x840755 = 1;
        }
        if (_0x123ff8 == 0) {
          _0x1454d2 = _0x3c8158 = _0x56da10 = _0x840755;
        } else {
          var _0x499ddc = _0x840755 * 2 - (_0x742ecb = _0x840755 < 0.5 ? _0x840755 * (1 + _0x123ff8) : _0x840755 + _0x123ff8 - _0x123ff8 * _0x840755);
          _0x1454d2 = _0x2a0262(_0x499ddc, _0x742ecb, _0x509ff8 + 1 / 3);
          _0x3c8158 = _0x2a0262(_0x499ddc, _0x742ecb, _0x509ff8);
          _0x56da10 = _0x2a0262(_0x499ddc, _0x742ecb, _0x509ff8 - 1 / 3);
        }
        return ((_0x1454d2 = Math.round(_0x1454d2 * 255)) << 16) + ((_0x3c8158 = Math.round(_0x3c8158 * 255)) << 8) + (_0x56da10 = Math.round(_0x56da10 * 255));
      }
    }
  }
  function _0x2a0262(_0x300225, _0x22a5f3, _0x3d106d) {
    if (_0x3d106d < 0) {
      _0x3d106d += 1;
    }
    if (_0x3d106d > 1) {
      _0x3d106d -= 1;
    }
    if (_0x3d106d * 6 < 1) {
      return _0x300225 + (_0x22a5f3 - _0x300225) * 6 * _0x3d106d;
    } else if (_0x3d106d * 2 < 1) {
      return _0x22a5f3;
    } else if (_0x3d106d * 3 < 2) {
      return _0x300225 + (_0x22a5f3 - _0x300225) * (2 / 3 - _0x3d106d) * 6;
    } else {
      return _0x300225;
    }
  }
}
function toHex6(_0x92c680) {
  return ("00000" + Number(_0x92c680).toString(16)).slice(-6).toUpperCase();
}
function MakeGlow(_0x584fdc) {
  var _0x37b384 = "0 0 0.2rem #" + toHex6(_0x584fdc);
  return _0x37b384 + "," + _0x37b384 + "," + _0x37b384;
}
function MakeStatusGlow(_0xf2c571) {
  return "0 0 0.134rem #" + toHex6(_0xf2c571);
}
function rgbtohsv(_0x32220e) {
  var _0x3518be;
  var _0x1c41fb;
  var _0x5d49d2 = (_0x32220e >> 16 & 255) / 255;
  var _0x140605 = (_0x32220e >> 8 & 255) / 255;
  var _0x18535b = (_0x32220e & 255) / 255;
  var _0x5aabfd = Math.min(_0x5d49d2, _0x140605, _0x18535b);
  var _0x267152 = Math.max(_0x5d49d2, _0x140605, _0x18535b);
  _0x3518be = _0x5aabfd == _0x267152 ? 0 : _0x267152 == _0x5d49d2 ? ((_0x140605 - _0x18535b) * 60 / (_0x267152 - _0x5aabfd) + 360) % 360 : _0x267152 == _0x140605 ? (_0x18535b - _0x5d49d2) * 60 / (_0x267152 - _0x5aabfd) + 120 : (_0x5d49d2 - _0x140605) * 60 / (_0x267152 - _0x5aabfd) + 240;
  _0x1c41fb = _0x267152 == 0 ? 0 : (_0x267152 - _0x5aabfd) / _0x267152;
  return new Array(_0x3518be, _0x1c41fb, _0x267152);
}
function hsvtorgb(_0x131898, _0x5130e1, _0x31771a) {
  var _0x2363c1;
  var _0x3d216a;
  var _0x3011da;
  var _0x86a960;
  var _0x42d554;
  var _0x25736c;
  var _0xa2752f;
  var _0x23ac90;
  _0x131898 %= 360;
  if (_0x31771a == 0) {
    return 0;
  }
  _0x25736c = _0x31771a * (1 - _0x5130e1);
  _0xa2752f = _0x31771a * (1 - _0x5130e1 * (_0x42d554 = (_0x131898 /= 60) - (_0x86a960 = Math.floor(_0x131898))));
  _0x23ac90 = _0x31771a * (1 - _0x5130e1 * (1 - _0x42d554));
  switch (_0x86a960) {
    case 0:
      _0x2363c1 = _0x31771a;
      _0x3d216a = _0x23ac90;
      _0x3011da = _0x25736c;
      break;
    case 1:
      _0x2363c1 = _0xa2752f;
      _0x3d216a = _0x31771a;
      _0x3011da = _0x25736c;
      break;
    case 2:
      _0x2363c1 = _0x25736c;
      _0x3d216a = _0x31771a;
      _0x3011da = _0x23ac90;
      break;
    case 3:
      _0x2363c1 = _0x25736c;
      _0x3d216a = _0xa2752f;
      _0x3011da = _0x31771a;
      break;
    case 4:
      _0x2363c1 = _0x23ac90;
      _0x3d216a = _0x25736c;
      _0x3011da = _0x31771a;
      break;
    case 5:
      _0x2363c1 = _0x31771a;
      _0x3d216a = _0x25736c;
      _0x3011da = _0xa2752f;
  }
  return Math.floor(_0x2363c1 * 255) << 16 | Math.floor(_0x3d216a * 255) << 8 | Math.floor(_0x3011da * 255);
}
function Getms() {
  return Date.Now();
}
function GetTimeToGo(_0x311e5b, _0x9ca786, _0x110f32) {
  if (_0x311e5b == 0) {
    return "";
  }
  let _0x43a471 = Math.floor((new Date() - _0x311e5b) / 1000);
  _0x43a471 = parseInt(_0x43a471);
  if (_0x43a471 <= 0) {
    return ["mob1.justnow", "just now"];
  } else if (_0x43a471 < 60) {
    if (_0x110f32) {
      return _0x43a471;
    } else {
      return ["mob1.secsago", "$1 secs ago", _0x43a471];
    }
  } else if (_0x43a471 < 120) {
    if (_0x110f32) {
      return 1;
    } else {
      return ["mob1.minago", "$1 min ago", 1];
    }
  } else if (_0x43a471 < 3600) {
    if (_0x110f32) {
      return parseInt(_0x43a471 / 60);
    } else {
      return ["mob1.minsago", "$1 mins ago", parseInt(_0x43a471 / 60)];
    }
  } else if (_0x43a471 < 86400) {
    if (_0x110f32) {
      return parseInt(_0x43a471 / 3600);
    } else {
      return ["mob1.hoursago", "$1 hours ago", parseInt(_0x43a471 / 3600)];
    }
  } else if (_0x9ca786) {
    return new Date(_0x311e5b).toUTCString();
  } else if (_0x110f32) {
    return parseInt(_0x43a471 / 86400);
  } else {
    return ["mob1.daysago", "$1 days ago", parseInt(_0x43a471 / 86400)];
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
  for (let _0x41963a = 1; _0x41963a < MAXPOWER; _0x41963a++) {
    if (_0x41963a == 81 || _0x41963a != 95 && _0x41963a % 32 == 31) {
      continue;
    }
    let _0x28b2c8 = _0x41963a % 32;
    let _0x14b338 = xInt(_0x41963a / 32);
    if (w_Powers[_0x14b338] & 1 << _0x28b2c8) {
      POWERS[_0x41963a] = 1;
    }
  }
  let _0x53d56d = PowDecode(w_PowerO);
  if (_0x53d56d !== null) {
    for (let _0x1d2d8b = 1; _0x1d2d8b < MAXPOWER; _0x1d2d8b++) {
      if (_0x1d2d8b != 81 && (_0x1d2d8b == 95 || _0x1d2d8b % 32 != 31)) {
        if (_0x53d56d[_0x1d2d8b]) {
          POWERS[_0x1d2d8b] = xInt(POWERS[_0x1d2d8b]) + _0x53d56d[_0x1d2d8b];
        }
      }
    }
  }
}
function setDisabledPowers() {
  if (w_Mask != null && (MASKED = [], PSSA || parent?.PSSA)) {
    for (let _0x28da76 in PSSA || parent?.PSSA) {
      let _0x21cfea = _0x28da76 >> 5;
      let _0x532a0b = Math.pow(2, _0x28da76 % 32);
      if (w_Mask[_0x21cfea] && w_Mask[_0x21cfea] & _0x532a0b) {
        MASKED[_0x28da76] = 0;
      }
    }
  }
}
function PowDecode(_0x2b051d) {
  if (_0x2b051d == null || _0x2b051d.length == 0) {
    return null;
  }
  let _0x5219b2 = [];
  let _0x20d715 = (_0x2b051d = _0x2b051d.toString()).split("|");
  for (let _0x1c8f37 = 0; _0x1c8f37 < _0x20d715.length; _0x1c8f37++) {
    let _0x322ad0 = _0x20d715[_0x1c8f37].split("=");
    let _0x1956ed = xInt(_0x322ad0[1]);
    if (_0x1956ed <= 0) {
      _0x1956ed = 1;
    }
    if (_0x1956ed > 10000) {
      _0x1956ed = 1;
    }
    _0x5219b2[_0x322ad0[0]] = _0x1956ed;
  }
  return _0x5219b2;
}
function hasPower(_0x42d619, _0x493c86 = false) {
  if (!_0x493c86) {
    logHasPowerForPowerId(_0x42d619);
  }
  if (!POWERS || Object.keys(POWERS).length === 0) {
    return !1;
  }
  const _0x4f423 = !!POWERS.hasOwnProperty(_0x42d619) && POWERS[_0x42d619];
  return (!MASKED || !MASKED.hasOwnProperty(_0x42d619)) && _0x4f423;
}
function logHasPowerForPowerId(_0x46c79a) {
  if (_0x46c79a != 672) {
    return;
  }
  let _0xe7984b = "--- DEBUG // Power Info ---\n\n";
  _0xe7984b += "Power ID: " + _0x46c79a + "\n";
  _0xe7984b += "Total Powers: " + Object.keys(POWERS ?? {}).length + "\n";
  _0xe7984b += "Total Masked: " + Object.keys(MASKED ?? {}).length + "\n";
  _0xe7984b += "hasPower(" + _0x46c79a + ") return value: " + hasPower(_0x46c79a, !0) + "\n";
  _0xe7984b += "Is power enabled: " + !(MASKED ?? {}).hasOwnProperty(_0x46c79a) + "\n";
  _0xe7984b += "Is power disabled: " + (MASKED ?? {}).hasOwnProperty(_0x46c79a) + "\n";
  _0xe7984b += "Is w_Powers null: " + (w_Powers === null) + "\n";
  _0xe7984b += "Is PSSA (1) null : " + (PSSA === null) + "\n";
  _0xe7984b += "Is PSSA (2) null : " + (parent?.PSSA === null) + "\n";
  doDebugLogs(1, _0xe7984b);
}
function doDebugLogs(_0x40b017, _0x4c0caa) {
  const _0x1a7493 = "[XAT] " + _0x4c0caa;
  switch (_0x40b017) {
    case 1:
      console.info(_0x1a7493);
      break;
    case 2:
      console.warn(_0x1a7493);
      break;
    case 3:
      console.error(_0x1a7493);
      break;
    case 4:
      console.table(_0x4c0caa);
  }
}
function iMux(_0x4cbe83, _0x43232e) {
  _0x43232e ||= "i";
  var _0x11dcab = _0x4cbe83.substr(-10);
  var _0x5a26cf = 0;
  for (var _0x4ad4d4 = 0; _0x4ad4d4 < 10; _0x4ad4d4++) {
    _0x5a26cf += _0x11dcab.charCodeAt(_0x4ad4d4);
  }
  return "https://" + _0x43232e + (_0x5a26cf & 1) + ".xat.com/web_gear/chat/" + _0x4cbe83;
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
function SafeImage(_0x4a4875, _0x356bdb, _0x3cda9e, _0x50a633) {
  if (_0x4a4875.length == 0) {
    return "";
  }
  var _0x87ab05 = parse_url(_0x4a4875);
  if (!_0x87ab05 && !(_0x87ab05 = parse_url(_0x4a4875 = _0x4a4875.charAt(0) == "/" ? "https:" + _0x4a4875 : "https://" + _0x4a4875))) {
    return "";
  }
  if (!_0x87ab05.host) {
    return "";
  }
  if (_0x87ab05.host.indexOf("xat.com") >= 0 && (_0x87ab05.path.indexOf("GetImage") > 0 || _0x87ab05.path.indexOf("/chat/av/") >= 0)) {
    return _0x4a4875;
  }
  if (_0x356bdb == _0x3cda9e && !_0x50a633) {
    _0x356bdb = _0x3cda9e = calcAvSize(_0x356bdb);
  }
  const _0x1ab91e = IsAnimationOn() ? "s" : "S";
  if (!isBackgroundAnimationOn()) {
    _0x50a633 = false;
  }
  let _0x4542ff = _0x1ab91e + "&W=" + _0x356bdb + "&H=" + _0x3cda9e + "&U=" + _0x4a4875;
  if (_0x50a633) {
    _0x4542ff += "&g&otp";
  }
  return "https://i0.xat.com/web_gear/chat/GetImage7.php?" + _0x4542ff;
}
function parse_url(_0x5a1ea1, _0x391ec6) {
  var _0x1d438e = ["source", "scheme", "authority", "userInfo", "user", "pass", "host", "port", "relative", "path", "directory", "file", "query", "fragment"];
  var _0xff261 = {};
  var _0x4209f5 = _0xff261["phpjs.parse_url.mode"] && _0xff261["phpjs.parse_url.mode"].local_value || "php";
  var _0x1a72e5 = {
    php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
  };
  var _0xdcabb3 = _0x1a72e5[_0x4209f5].exec(_0x5a1ea1);
  var _0x32da10 = {};
  for (var _0x38d490 = 14; _0x38d490--;) {
    if (_0xdcabb3[_0x38d490]) {
      _0x32da10[_0x1d438e[_0x38d490]] = _0xdcabb3[_0x38d490];
    }
  }
  if (_0x391ec6) {
    return _0x32da10[_0x391ec6.replace("PHP_URL_", "").toLowerCase()];
  }
  if (_0x4209f5 !== "php") {
    var _0x117b19 = _0xff261["phpjs.parse_url.queryKey"] && _0xff261["phpjs.parse_url.queryKey"].local_value || "queryKey";
    _0x1a72e5 = /(?:^|&)([^&=]*)=?([^&]*)/g;
    _0x32da10[_0x117b19] = {};
    (_0x32da10[_0x1d438e[12]] || "").replace(_0x1a72e5, function (_0x2bceae, _0x3fd1c5, _0x396b11) {
      if (_0x3fd1c5) {
        _0x32da10[_0x117b19][_0x3fd1c5] = _0x396b11;
      }
    });
  }
  delete _0x32da10.source;
  return _0x32da10;
}
function xEscape(_0x54f308) {
  return "%" + _0x54f308.charCodeAt(0).toString(16).toUpperCase();
}
function rfc3986EncodeURIComponent(_0x31a556) {
  return encodeURIComponent(_0x31a556).replace(/[!'()*~]/g, xEscape);
}
function addSmilies(_0x3db3f2, _0xeac203, _0x32872c, _0x5b666d, _0x55b4a0) {
  if (!syel) {
    syel = JSON.parse(_0x3db3f2);
    soth = JSON.parse(_0xeac203);
    spow = JSON.parse(_0x32872c);
    spowhave = JSON.parse(_0x5b666d);
    stop = JSON.parse(_0x55b4a0);
  }
}
function detectIE() {
  var _0x3704b3 = window.navigator.userAgent;
  var _0x363f3b = _0x3704b3.indexOf("MSIE ");
  if (_0x363f3b > 0) {
    Browser = "MS";
    return parseInt(_0x3704b3.substring(_0x363f3b + 5, _0x3704b3.indexOf(".", _0x363f3b)), 10);
  }
  if (_0x3704b3.indexOf("Trident/") > 0) {
    Browser = "MS";
    var _0x1bc0a8 = _0x3704b3.indexOf("rv:");
    return parseInt(_0x3704b3.substring(_0x1bc0a8 + 3, _0x3704b3.indexOf(".", _0x1bc0a8)), 10);
  }
  var _0x375e11 = _0x3704b3.indexOf("Edge/");
  if (_0x375e11 > 0) {
    Browser = "MS";
    return parseInt(_0x3704b3.substring(_0x375e11 + 5, _0x3704b3.indexOf(".", _0x375e11)), 10);
  } else {
    if (_0x3704b3.toLowerCase().indexOf("firefox") > -1) {
      Browser = "FF";
    } else if (_0x3704b3.indexOf("Chrome") > -1) {
      Browser = "CR";
    } else if (_0x3704b3.indexOf("Safari") > -1) {
      Browser = "SF";
    }
    return false;
  }
}
function setTextBoxEditable(_0x59e2e3, _0xa8c047) {
  var _0x5c7cc5 = document.getElementById(_0x59e2e3);
  if (_0x5c7cc5) {
    _0x5c7cc5.setAttribute("contenteditable", _0xa8c047);
    if (_0xa8c047) {
      _0x5c7cc5.classList.add("textBox", "textBoxEdit");
    } else {
      _0x5c7cc5.classList.remove("textBox", "textBoxEdit");
    }
  }
  return _0x5c7cc5;
}
function isString(_0x19860e) {
  return Object.prototype.toString.call(_0x19860e) === "[object String]";
}
function isConnected() {
  return _Activity.instance.IsConnected();
}
function resizeSearchBar(_0x1ebd43) {
  if (_0x1ebd43) {
    _0x1ebd43.style.width = window.innerWidth - 20 + "px";
    window.addEventListener("resize", () => {
      _0x1ebd43.style.width = window.innerWidth - 20 + "px";
    });
  }
}
String.prototype.hashCode = function () {
  var _0x214b37 = 0;
  if (this.length == 0) {
    return _0x214b37;
  }
  for (var _0x514aba = 0; _0x514aba < this.length; _0x514aba++) {
    _0x214b37 = (_0x214b37 << 5) - _0x214b37 + this.charCodeAt(_0x514aba);
    _0x214b37 &= _0x214b37;
  }
  return _0x214b37;
};
detectIE();
var settingsPage = !1;
function setFrameVis(_0x27c88b) {
  if (!settings?.toSave) {
    const _0x364e46 = {
      selector: 1,
      settings: 1,
      actions: 1
    };
    if (_0x27c88b && _0x27c88b === "settings") {
      settingsPage = true;
    }
    if (Classic) {
      reportsDrop();
    }
    for (var _0x3888f6 in _0x364e46) {
      var _0x498626 = document.getElementById(_0x3888f6 + "Frame");
      if (_0x498626) {
        if (_0x3888f6 == _0x27c88b) {
          _0x498626.classList.remove("d-none");
        } else {
          _0x498626.classList.add("d-none");
        }
      }
    }
    var _0x3643e7 = document.getElementById("FrameDialog");
    var _0x556a73 = document.getElementById("FrameBack");
    butsFrame = _0x3643e7;
    var _0x1ebf6c = document.getElementById("reportIconClassic");
    if (_0x1ebf6c) {
      _0x1ebf6c.classList.add("d-none");
    }
    if (_0x27c88b) {
      removeClass("d-none", "Overlays");
      removeClass("d-none", "OverlaysClassic");
    } else {
      addClass("d-none", "Overlays");
      addClass("d-none", "OverlaysClassic");
      if (_0x3643e7) {
        _0x3643e7.classList.add("d-none");
      }
      if (_0x556a73) {
        _0x556a73.classList.add("d-none");
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
  const _0x5c3a23 = localStorage.getItem("pstylePreviewMode");
  return _0x5c3a23 && _0x5c3a23 === "1";
}
function reloadSettingsIframe() {
  let _0x53ecad = findNodeInWindowOrParent("#settingsFrame");
  if (!_0x53ecad || !_0x53ecad.contentWindow) {
    return;
  }
  let _0x50de19 = _0x53ecad.contentWindow;
  _0x50de19?.location?.reload();
  if (isPstylePreviewEnabled()) {
    const _0xa2e0cb = () => {
      loadPstyleTabInSettings(_0x53ecad);
      _0x53ecad.removeEventListener("load", _0xa2e0cb);
    };
    _0x53ecad.addEventListener("load", _0xa2e0cb);
  }
}
function loadPstyleTabInSettings(_0x1bd2cc) {
  const _0x46a28a = {
    UserNo: _Activity.instance.MyId,
    tab: "pstyle"
  };
  const _0x54b935 = _0x46a28a;
  classicSetDialog("actions", _Activity.instance.MyId);
  classicSetDialog("settings", _0x54b935);
  localStorage.removeItem("pstylePreviewMode");
}
function resetPstylePreview() {
  localStorage.removeItem("pstylePreviewMode");
  localStorage.removeItem("pstyleTmp");
}
function doSelector(_0x3a95a2) {
  selector.initLang(Language);
  posModal(butsFrame, {
    mw: 900
  });
  selector.UserNo = _0x3a95a2.UserNo;
  selector.MyObj = MyObj ? config : _0x3a95a2.Config;
  switch (_0x3a95a2.Type) {
    case "Powers":
      selector.Powers = _0x3a95a2.Powers;
      selector.MainObj = _0x3a95a2.MainObj;
      selector.Go = !0;
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
      selector.stickers(_0x3a95a2.Pack);
      break;
    case "Gifts":
      let _0xe5c2 = _0x3a95a2.MainObj ? _0x3a95a2.MainObj.user[0] : _0x3a95a2.UserNo;
      selector.gifts(_0xe5c2);
      break;
    case "Marry":
    case "Divorce":
      selector.id = _0x3a95a2.MainObj.id;
      selector.regname = _0x3a95a2.MainObj.regname;
      selector.doKisses(_0x3a95a2.Type);
  }
}
let copyright = document.getElementById("copyrightyear");
function classicSetDialog(_0x2eb8e5, _0x2ca55d) {
  if (_0x2eb8e5 !== "profile" && _0x2eb8e5 !== "actions") {
    cleanupPstyleClasses(document);
  }
  let _0x5c791e = document.getElementById("Overlays");
  _0x5c791e ||= document.getElementById("OverlaysClassic");
  if (!_0x5c791e) {
    parent.classicSetDialog(_0x2eb8e5, _0x2ca55d);
    return;
  }
  let _0x38addd = xInt(_0x2ca55d);
  var _0x1df3dc;
  if (!_0x38addd && _0x2ca55d.MainObj && _0x2ca55d.MainObj.user) {
    _0x38addd = xInt(_0x2ca55d.MainObj.user[0].id);
  }
  if (!_0x38addd && MyObj) {
    _0x38addd = xInt(MyObj.MyId);
  }
  switch (_0x2eb8e5) {
    case "selector":
      _0x1df3dc = "selector";
      break;
    case "settings":
      _0x1df3dc = _0x2eb8e5;
      break;
    default:
      _0x1df3dc = "actions";
  }
  setFrameVis(_0x1df3dc);
  _0x5c791e = document.getElementById("FrameDialogCloseBut");
  if (_0x5c791e) {
    _0x5c791e.onclick = function () {
      setFrameVis();
    };
  }
  _0x5c791e = document.getElementById("FrameBack");
  if (_0x5c791e) {
    _0x5c791e.onclick = function () {
      setFrameVis();
    };
  }
  const _0x5a6f69 = document.getElementById(_0x1df3dc + "Frame").contentWindow;
  switch (_0x2eb8e5) {
    case "settings":
      settingsWindow = _0x5a6f69;
      settings = _0x5a6f69.settings;
      if (_0x2ca55d.tab) {
        _0x38addd = _0x2ca55d.UserNo;
        setTimeout(() => {
          settings.doTab(_0x2ca55d.tab);
        }, 250);
      }
      break;
    case "selector":
      removeClass("d-none", "FrameDialog");
      removeClass("d-none", "FrameBack");
      selector = _0x5a6f69.selector;
      doSelector(_0x2ca55d);
      _0x38addd = _0x2ca55d.UserNo;
      break;
    default:
      if (actions = _0x5a6f69.actions) {
        actions?.clearall();
        actions.Visible = true;
      }
  }
  let _0x1c9d42 = document.getElementById("appframe");
  if (_0x1c9d42) {
    _0x1c9d42 = _0x1c9d42.contentWindow;
    _0x1c9d42.actions = actions;
    _0x1c9d42.selector = selector;
    _0x1c9d42.settings = settings;
  }
  ToC({
    Command: "LoadClassicDialog",
    Type: _0x2eb8e5,
    UserNo: _0x38addd
  });
  if (["settings", "selector"].includes(_0x2eb8e5)) {
    setCstyle();
  }
}
function getHash(_0x2c3eea) {
  let _0xa9c503 = 0;
  let _0xd7b3d6 = _0x2c3eea.length;
  for (var _0x16c83b = 0; _0x16c83b < _0xd7b3d6; _0x16c83b++) {
    _0xa9c503 = (_0xa9c503 << 5) - _0xa9c503 + _0x2c3eea.charCodeAt(_0x16c83b);
    _0xa9c503 |= 0;
  }
  return _0xa9c503;
}
function hasDarkMode() {
  let _0x3a974f = JSON.parse(localStorage.getItem("Settings"))?.darkmode;
  return _0x3a974f && _0x3a974f == "enable";
}
function setdarkmode(_0x369d9d) {
  let _0x292df = _0x369d9d || hasDarkMode();
  if (_0x292df && _0x292df != "disable") {
    if (_0x292df && _Activity.instance.IsClassic) {
      document.body.classList.add("dark");
    } else if (_0x292df && !_Activity.instance.IsClassic) {
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
  let _0x5cca8e = JSON.parse(localStorage.getItem("Settings"))?.hideuserlist;
  return _0x5cca8e || "enable";
}
function hasStealthMode() {
  let _0x4c366d = JSON.parse(localStorage.getItem("Macros"))?.Stealth;
  return _0x4c366d && _0x4c366d == "enable";
}
function getFavoriteGroups() {
  let _0x298072 = JSON.parse(localStorage.getItem("Settings"))?.favorites;
  if (_0x298072) {
    return JSON.parse(_0x298072.replace(/”/g, "\""));
  } else {
    return {};
  }
}
function hasGroupInFavorite() {
  let _0x2280dd = config.GroupName;
  if (!_0x2280dd) {
    return;
  }
  let _0x3d0686 = getFavoriteGroups();
  _0x3d0686 ||= {};
  if (!Object.keys(_0x3d0686).length) {
    return !1;
  }
  for (let _0x1787a8 in _0x3d0686) {
    if (_0x3d0686[_0x1787a8].g && _0x3d0686[_0x1787a8].g.toLowerCase() == _0x2280dd.toLowerCase()) {
      return !0;
    }
  }
  return !1;
}
function addRemoveFavorites(_0x875baa, _0x5a6402) {
  let _0x3b8ecc = getFavoriteGroups();
  let _0xf6108a = _0x5a6402 || config.GroupName;
  let _0x11e567 = _0x875baa || config.chatid;
  _0xf6108a = _0xf6108a.toLowerCase();
  if (_0x3b8ecc[_0xf6108a]) {
    delete _0x3b8ecc[_0xf6108a];
  } else {
    _0x3b8ecc[_0xf6108a] = {
      id: _0x11e567,
      g: _0xf6108a
    };
  }
  return saveSetting("favorites", JSON.stringify(_0x3b8ecc));
}
function getIgnoredUsers() {
  const _0x5c020c = JSON.parse(localStorage.getItem("w_ignorelist2"));
  return _0x5c020c || {};
}
function getBlockedUsers() {
  const _0xe51009 = JSON.parse(localStorage.getItem("w_friendlist3"));
  const _0x45001f = {};
  for (const _0x351fd8 in _0xe51009) {
    if (Object.hasOwnProperty.call(_0xe51009, _0x351fd8) && _0xe51009[_0x351fd8].f & 32) {
      _0x45001f[_0x351fd8] = _0xe51009[_0x351fd8].R.length ? _0xe51009[_0x351fd8].R : _0x351fd8;
    }
  }
  return _0x45001f;
}
function getSettingsValue(_0x1d83ac) {
  let _0x403496 = {};
  try {
    const _0x305016 = localStorage.getItem("Settings");
    if (_0x305016) {
      _0x403496 = JSON.parse(_0x305016);
    }
  } catch (_0x1d3903) {}
  return _0x403496[_0x1d83ac] || "enable";
}
function unignoreUser(_0xc03e56) {
  if (!_0xc03e56) {
    return;
  }
  let _0x528eaa = {
    name: "Unignore"
  };
  _0x528eaa.UserNo = _0xc03e56;
  _0x528eaa.Page = "actions";
  _0x528eaa.Command = "Action";
  _0x528eaa.Type = "Action";
  return ToC(_0x528eaa);
}
function unblockUser(_0x4f90f4) {
  if (_0x4f90f4) {
    ToC({
      Command: "Block",
      UserNo: _0x4f90f4
    });
  }
}
function StripSmilies(_0x126275) {
  var _0x3c8c99;
  var _0x44a403;
  for (_0x126275 = Replace(_0x126275, [":)", ":-)", ":d", ";)", ";-)", ":o", ":-o", ":p", ":@", ":s", ":$", ":(", ":-(", ":'(", "|-)", "8-)", ":|", ":-|", ":-*", ":[", ":-["]); _0x126275.indexOf("<") != -1;) {
    _0x3c8c99 = _0x126275.indexOf("<");
    _0x44a403 = _0x126275.indexOf(">", _0x3c8c99);
    _0x126275 = _0x44a403 != -1 ? _0x126275.substr(0, _0x3c8c99) + _0x126275.substr(_0x44a403 + 1) : _0x126275.substr(0, _0x3c8c99) + _0x126275.substr(_0x3c8c99 + 1);
  }
  while (_0x126275.indexOf("(") != -1) {
    _0x3c8c99 = _0x126275.indexOf("(");
    _0x44a403 = _0x126275.indexOf(")", _0x3c8c99);
    _0x126275 = _0x44a403 != -1 ? _0x126275.substr(0, _0x3c8c99) + _0x126275.substr(_0x44a403 + 1) : _0x126275.substr(0, _0x3c8c99) + _0x126275.substr(_0x3c8c99 + 1);
  }
  while (_0x126275.indexOf("[") != -1) {
    _0x3c8c99 = _0x126275.indexOf("[");
    _0x44a403 = _0x126275.indexOf("]", _0x3c8c99);
    _0x126275 = _0x44a403 != -1 ? _0x126275.substr(0, _0x3c8c99) + _0x126275.substr(_0x44a403 + 1) : _0x126275.substr(0, _0x3c8c99) + _0x126275.substr(_0x3c8c99 + 1);
  }
  return _0x126275;
}
function Replace(_0x37e115, _0x8e9eda) {
  for (let _0x1ef682 = 0; _0x1ef682 < _0x8e9eda.length; _0x1ef682 += 2) {
    while (_0x37e115.indexOf(_0x8e9eda[_0x1ef682]) != -1) {
      let _0xc7ff55 = _0x37e115.indexOf(_0x8e9eda[_0x1ef682]);
      _0x37e115 = _0x37e115.substr(0, _0xc7ff55) + _0x8e9eda[_0x1ef682 + 1] + _0x37e115.substr(_0xc7ff55 + _0x8e9eda[_0x1ef682].length);
    }
  }
  return _0x37e115;
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
  constructor(_0xc063da) {
    this.text = _0xc063da;
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
  show(_0x2f3015, _0x2c867f) {
    if (_0x2c867f && Array.isArray(this.text)) {
      this.text.push(_0x2c867f);
    }
    this.snackbar.innerHTML = "";
    addText(this.snackbar, this.text);
    this.snackbar.classList.remove("hide");
    this.snackbar.classList.add("show");
    setTimeout(() => {
      this.hide();
    }, _0x2f3015 || 2000);
  }
  hide() {
    this.snackbar.classList.remove("show");
    this.snackbar.classList.add("hide");
  }
}
function signInButtonPressed(_0x860933) {
  var _0x211631;
  _0x211631 = {
    Command: "signInButtonPressed"
  };
  if (_0x860933 !== undefined) {
    _0x211631.DoSignIn = _0x860933;
  }
  ToC(_0x211631);
}
let xAreaMob = document.querySelectorAll(".xAreaMob");
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && xAreaMob) {
  for (var i = 0; i < xAreaMob.length; i++) {
    xAreaMob[i].classList.add("xAreaMobAct");
  }
}
function customModalWithMsg(_0x2f3114, _0x11cfae, _0x3890ac, _0x510c3f, _0x7c4447) {
  let _0x4ee44a = makeElement(null, "div");
  let _0x5bec68 = makeElement(_0x4ee44a, "div", _0x510c3f ? "AnnounceDialog" : "modalDialogContentClassic");
  let _0x257505 = makeElement(_0x5bec68, "div", _0x510c3f ? "AnnounceHeaFoo" : "dialogTitleBar NewTitleBar");
  let _0x676bc1 = makeElement(_0x5bec68, "img", "AnnounceFooLogo");
  let _0x4d496f = makeElement(_0x257505, "span", "dialogTitle link NewDialogTitle", "openLink");
  let _0x33db75 = makeElement(_0x5bec68, "div", _0x510c3f ? "AnnounceBody" : "dialogBody NewdialogBody");
  let _0x5f471d = makeElement(_0x33db75, "div", "dialogPadding");
  let _0x491741 = makeElement(_0x5f471d, "div", _0x510c3f ? "" : "wrapper", "wrapper");
  let _0xd6d57f = document.querySelector("#FrameBack");
  if (_0x510c3f) {
    _0x676bc1.src = "svg/xatlogo.svg";
    _0x676bc1.alt = "xat";
    _0x676bc1.width = "65";
  }
  if (_0x3890ac) {
    const _0x4bf653 = _0x7c4447 ? Classic ? "svg/remove" + (toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg" : "svg/removew.svg" : _0x510c3f ? "svg/removew.svg" : "svg/removeb.svg";
    let _0x41b497 = makeElement(null, "img");
    _0x41b497.src = _0x4bf653;
    _0x41b497.alt = "close";
    _0x41b497.width = _0x510c3f ? "11" : "16";
    _0x41b497.classList.add("closeAnnounceImg");
    makeElement(_0x257505, "span", _0x510c3f ? "AnnounceClose" : "dialogTitleAction", "id_ModalClose_custom").appendChild(_0x41b497);
  }
  if (_0x7c4447) {
    _0x5bec68.classList.add("gpModal");
    _0xd6d57f?.classList?.remove("d-none");
  }
  addText(_0x4d496f, _0x510c3f ? "" : _0x2f3114);
  _0x5bec68.dataset.w = _0x7c4447 ? 0.9 : 0.6;
  addText(_0x491741, _0x510c3f ? atob(_0x11cfae) : _0x11cfae, !!_0x510c3f);
  HiddenDivs.AlertDialog = _0x4ee44a.innerHTML;
  doModal("AlertDialog", {}, !0, !0);
  document.querySelector("#id_ModalClose_custom")?.addEventListener("click", () => {
    modalClose();
    if (_0x7c4447) {
      _0xd6d57f?.classList?.add("d-none");
    }
    if (_0x510c3f) {
      updateAnnounceStorage(_0x11cfae);
    }
  });
}
function setAnnounce(_0x1ee023) {
  let _0x21cbef = localStorage.getItem("announce_message");
  if (!_0x21cbef || _0x21cbef && _0x21cbef !== _0x1ee023) {
    customModalWithMsg("Announcement", _0x1ee023, true, true);
  }
  return !1;
}
function updateAnnounceStorage(_0x2607ac) {
  if (_Activity.instance.IsClassic || !_Activity.instance.IsClassic && localStorage.getItem("mobCookies") == 1) {
    return localStorage.setItem("announce_message", _0x2607ac);
  }
}
function replaceBrakets(_0x5c0829) {
  if (!_0x5c0829) {
    return "";
  }
  if (_0x5c0829.indexOf("[") >= 0 && _0x5c0829.indexOf("❯") >= 0) {
    let _0xe19e22 = /❯.*\[.*?\]/g;
    let _0x50feff = /\s+(?![^\[]*\]|[^(]*\)|[^\{]*})/;
    let _0x36f310 = _0x5c0829.split(_0x50feff);
    if (_0x36f310.length > 0) {
      for (let _0x25b916 in _0x36f310) {
        if (_0x36f310[_0x25b916].match(_0xe19e22)) {
          _0x36f310[_0x25b916] = _0x36f310[_0x25b916].replace(_0xe19e22, "");
        }
      }
    }
    return _0x36f310.join(" ").replace(/\[/gi, "{").replace(/\]/gi, "}");
  }
  return cleanXatTagsIcons(_0x5c0829.replace(/\[/gi, "{").replace(/\]/gi, "}"));
}
function assignUnassign(_0x15864a, _0x89c32f) {
  if (!_0x15864a || ["Assign", "Unassign"].indexOf(_0x89c32f) == -1) {
    return;
  }
  let _0x4fa073 = _0x15864a.value;
  if (_0x4fa073) {
    return ToC({
      Type: "Assign",
      p: _0x4fa073,
      a: _0x89c32f == "Assign" ? 1 : 0
    });
  } else {
    return undefined;
  }
}
function updateAllFrame(_0x256a9f) {
  if (!_0x256a9f) {
    return;
  }
  let _0x17e776 = ["selectorFrame", "settingsFrame", "actionsFrame"];
  for (let _0x58fd6f in _0x17e776) {
    let _0x4392b5 = findNodeInWindowOrParent("#" + _0x17e776[_0x58fd6f]);
    if (!_0x4392b5 || !_0x4392b5.contentWindow) {
      return;
    }
    let _0x1da5d6 = _0x4392b5.contentWindow;
    if (_0x256a9f == "enable") {
      if (_0x17e776[_0x58fd6f] == "settingsFrame") {
        _0x1da5d6.document.body?.querySelector(".wrapper")?.classList.add("darkWrapper");
        _0x1da5d6.location.reload();
      } else {
        _0x1da5d6.document.body.classList.add("dark");
      }
    } else if (_0x17e776[_0x58fd6f] == "settingsFrame") {
      _0x1da5d6.document.body?.querySelector(".wrapper")?.classList.remove("darkWrapper");
      _0x1da5d6.location.reload();
    } else {
      _0x1da5d6.document.body.classList.remove("dark");
    }
  }
}
function setLoader(_0x2ea1ee, _0x53e4e8) {
  let _0x16b44b = document.querySelector(_0x53e4e8 ? "#" + _0x53e4e8 : "#loading");
  if (_0x16b44b) {
    if (_0x2ea1ee) {
      _0x16b44b.classList.remove("d-none");
      _0x16b44b.innerHTML = "<div id=\"xatLoader\"><div id=\"xatLoaderInner\"><img id=\"planet\" src=\"svg/x.svg\"><img id=\"rocket\" src=\"svg/ss.svg\"></div></div>";
    } else {
      _0x16b44b.classList.add("d-none");
      _0x16b44b.innerHTML = "";
    }
  }
}
function urlPost(_0x5367bf, _0x11bafa) {
  return new Promise((_0x48cfab, _0x4980e9) => {
    let _0x2198be = {
      method: "GET"
    };
    if (_0x11bafa) {
      _0x2198be.method = "POST";
      _0x2198be.body = _0x11bafa;
    }
    fetch(_0x5367bf, _0x2198be).then(function (_0x2060e9) {
      return _0x2060e9.json();
    }).then(function (_0x1fabb6) {
      _0x48cfab(_0x1fabb6);
    }).catch(_0x58181e => _0x4980e9(_0x58181e));
  });
}
function specialEvents(_0x38ea73, _0x1915ad) {
  let _0x13e7af = !1;
  const _0x401d4e = new Date();
  _0x401d4e.getDate();
  _0x401d4e.getMonth();
  if (Array.isArray(_0x38ea73)) {
    for (let _0x3c61d1 in _0x38ea73) {
      specialEvents(_0x38ea73[_0x3c61d1], _0x1915ad);
    }
  }
  switch (_0x38ea73) {
    case "easter":
    case "xmas":
    case "xatbday":
      break;
    default:
      _0x13e7af = !1;
  }
  if (_0x13e7af && _0x1915ad) {
    _0x1915ad();
  }
}
function initFools() {
  const _0x33199a = config.GroupName.toLowerCase();
  let _0x3af358 = localStorage.getItem("wasFooledList");
  if (!localStorage.getItem("foundFools")) {
    _0x3af358 ||= [];
    try {
      _0x3af358 = JSON.parse(_0x3af358);
    } catch (_0x2de1b3) {
      _0x3af358 = [];
    }
    if (_0x3af358.indexOf(_0x33199a) == -1) {
      _0x3af358.push(_0x33199a);
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
          localStorage.setItem("wasFooledList", JSON.stringify(_0x3af358));
          customModalWithMsg(null, btoa("<div style=\"font-weight: 600; text-align: center;\"><img style=\"display:block; margin: 0 auto\" src=\"../gameban/codeban/assets/smilies/72.png\" /><br /><br />Oops! Lights are off. This chatroom does not have sufficient energy to power up. Please check <a target=\"_blank\" href=\"https://xat.com/store\">xat.com/store</a> for energy supply powers.</div>"), true, true);
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
function filter(_0x2724cc) {
  if (isNaN(_0x2724cc) && _0x2724cc !== undefined) {
    _0x2724cc = _0x2724cc.replace(new RegExp("['\"<>&]", "gi"), "").replace(/\\/gi, "");
  }
  return _0x2724cc;
}
function isValidHex(_0x57bd10) {
  return /^#[0-9A-F]{6}$/i.test(_0x57bd10);
}
function cleanXatTagsIcons(_0x9dcd39) {
  if (_0x9dcd39) {
    return _0x9dcd39.replace(/<priv>/gi, "").replace(/❮priv❯/gi, "").replace(/<inf8>/gi, "").replace(/❮inf8❯/gi, "").replace(/<i>/gi, "").replace(/❮i❯/gi, "").replace(/<in>/gi, "").replace(/❮in❯/gi, "");
  } else {
    return "";
  }
}
function isXatBirthday(_0x2d1b7f = false) {
  const _0x258e32 = new Date();
  const _0x4be9ee = _0x258e32.getDate();
  return (_0x2d1b7f ? _0x4be9ee == 17 : _0x4be9ee >= 15 && _0x4be9ee < 19) && _0x258e32.getMonth() + 1 == 9;
}
function reduceTextLength(_0x7bff0c) {
  if (!_0x7bff0c) {
    return "";
  }
  let _0x462135 = 256;
  const _0x53cd6f = _0x7bff0c.toLowerCase();
  if (_0x53cd6f.includes("(stick#") || _0x53cd6f.includes("#stick#")) {
    _0x462135 = 512;
  }
  if (_0x7bff0c.length > _0x462135) {
    return _0x7bff0c.substring(0, _0x462135);
  } else {
    return "";
  }
}
function handleMaxLength(_0x283680, _0x55e4e8) {
  return !(_0x55e4e8.textContent.length >= 256) || _0x283680.code == "Backspace" || _0x283680.code == "Delete" || _0x283680.code == "Space" || _0x283680.code == "ArrowLeft" || _0x283680.code == "ArrowRight" || _0x283680.code == "ArrowUp" || _0x283680.code == "ArrowDown" || _0x283680.code == "Home" || _0x283680.code == "End" || _0x283680.code == "ControlLeft" || !!_0x283680.ctrlKey && (_0x283680.code == "KeyA" || _0x283680.code == "KeyE" || _0x283680.code == "KeyV" || _0x283680.code == "KeyC" || _0x283680.code == "KeyX") || (_0x283680.preventDefault(), !1);
}
function setPageAndSendTtth(_0x306fbe = null) {
  loadKiss("Ttth", _0x306fbe);
  setTimeout(() => {
    _Activity?.instance?.SetPage("chats");
  }, 1000);
}
function returnOwnedPowers() {
  let _0x3a443c = [];
  const _0x344860 = _Activity?.instance;
  const _0x3a961d = _0x344860?.PSSA;
  const _0x48dc61 = _0x344860?.TOPSH;
  const _0x2e0f83 = _0x344860?.UCOLLECTIONS;
  if (_0x3a961d) {
    const _0x90ee88 = _0x3a961d.filter((_0x215217, _0x1b6d5e) => hasPower(_0x1b6d5e - 1) || _0x2e0f83[_0x1b6d5e - 1]);
    _0x3a443c.push(..._0x90ee88);
  }
  if (_0x48dc61) {
    for (const [_0x5e164a, _0x31ee6b] of Object.entries(_0x48dc61)) {
      if ((hasPower(_0x31ee6b) || _0x2e0f83[_0x31ee6b]) && _0x31ee6b > 45) {
        _0x3a443c.push(_0x5e164a);
      }
    }
  }
  return _0x3a443c;
}
function hasMobCookiesEnabled() {
  if (_Activity.instance.IsClassic) {
    return !0;
  }
  const _0x14a16b = localStorage.getItem("todo");
  if (_0x14a16b == null || !_0x14a16b.length) {
    return !1;
  }
  try {
    return localStorage.getItem("mobCookies") == 1;
  } catch (_0x3aa280) {
    return !1;
  }
}
function focusAndPutCaretAtPosition(_0x22940f, _0x17b81c) {
  if (!_0x22940f) {
    return;
  }
  _0x22940f.focus();
  const _0x4ce507 = document.createRange();
  const _0x41e77c = window.getSelection();
  let _0x2f5512 = _0x22940f;
  let _0x25a644 = _0x17b81c;
  while (_0x2f5512 && _0x25a644 > 0) {
    if (_0x2f5512.nodeType === 3) {
      if (_0x2f5512.length >= _0x25a644) {
        _0x4ce507.setStart(_0x2f5512, _0x25a644);
        _0x4ce507.collapse(true);
        break;
      }
      _0x25a644 -= _0x2f5512.length;
    } else {
      _0x2f5512 = _0x2f5512.firstChild;
    }
    if (!_0x2f5512) {
      break;
    }
  }
  _0x41e77c.removeAllRanges();
  _0x41e77c.addRange(_0x4ce507);
}
function insertTextAtCaret(_0x1b1fd8, _0x5bb14a, _0x2396c5 = false) {
  if (!_0x5bb14a) {
    return;
  }
  const _0x26d388 = _0x1b1fd8.replace(/<\/?[^>]+(>|$)/g, "");
  if (!_0x5bb14a.innerText.trim().length) {
    _0x5bb14a.innerHTML = "";
  }
  if (window.getSelection) {
    const _0x267bce = window.getSelection();
    let _0x490c0a;
    if (_0x267bce.rangeCount > 0 && _0x5bb14a.contains(_0x267bce.anchorNode)) {
      _0x490c0a = _0x267bce.getRangeAt(0);
    } else {
      _0x490c0a = document.createRange();
      _0x490c0a.selectNodeContents(_0x5bb14a);
      _0x490c0a.collapse(false);
    }
    _0x490c0a.deleteContents();
    const _0x19f065 = document.createTextNode(_0x26d388);
    try {
      _0x490c0a.insertNode(_0x19f065);
    } catch (_0x394419) {
      document.execCommand("insertText", false, _0x26d388);
      return;
    }
    _0x490c0a.setStartAfter(_0x19f065);
    _0x490c0a.setEndAfter(_0x19f065);
    _0x267bce.removeAllRanges();
    _0x267bce.addRange(_0x490c0a);
  } else if (document.selection && document.selection.createRange) {
    _0x5bb14a.focus();
    document.selection.createRange().text = _0x26d388;
  }
  _0x5bb14a.focus();
  if (_0x2396c5) {
    _0x5bb14a.dispatchEvent(new CustomEvent("checkScroll"));
  }
}
function getAvatarFrameUrl(_0xcf4032) {
  return "https://i0.xat.com/images/avframes/" + _0xcf4032 + ".webp";
}
function getAvatarEffectUrl(_0x4bac39, _0x49670f, _0x343cc7) {
  return "https://i0.xat.com/web_gear/chat/avatareffects.php?e=" + _0x4bac39 + "&f=" + (_0x343cc7 !== undefined ? _0x343cc7 : 15) + "&c=" + (_0x49670f || "").replace("#", "");
}
function initAvatarEffect(_0x3bcd65, _0x583474, _0x59b355) {
  const _0x4aa2ba = _0x59b355 !== undefined && _0x59b355 != null && typeof _0x59b355 == "object" ? _0x59b355 : _0x3bcd65.avatarEffect || {};
  const _0x3f78d2 = _0x4aa2ba && _0x4aa2ba.avatarframe;
  const _0x8f12a1 = _0x4aa2ba && _0x4aa2ba.avatareffect;
  const _0x1e529d = _0x4aa2ba && (_0x4aa2ba.avatarrounded === "true" || !0 === _0x4aa2ba.avatarrounded);
  function _0x4ffd9c(_0x4a678d) {
    const _0x9b3c41 = _0x4a678d || _0x583474;
    const _0x317cd0 = _0x583474.style.backgroundImage || typeof getComputedStyle != "undefined" && getComputedStyle(_0x583474).backgroundImage;
    if (!_0x317cd0 || _0x317cd0 === "none") {
      return;
    }
    let _0x25d397 = _0x9b3c41.querySelector(".avInner");
    if (!_0x25d397) {
      _0x25d397 = document.createElement("div");
      _0x25d397.className = "avInner";
      _0x9b3c41.insertBefore(_0x25d397, _0x9b3c41.firstChild);
    }
    _0x9b3c41.style.setProperty("--av-inner-bg", _0x317cd0);
    _0x9b3c41.style.setProperty("--av-inner-bg-size", "cover");
    _0x9b3c41.style.setProperty("--av-inner-bg-position", _0x583474.style.backgroundPosition || "center");
    _0x9b3c41.style.setProperty("--av-inner-bg-repeat", "no-repeat");
    _0x583474.style.backgroundImage = "none";
  }
  if (_0x3f78d2) {
    const _0x33bcf1 = _0x4aa2ba.avatarframe;
    const _0x12c867 = getAvatarFrameUrl(_0x33bcf1);
    _0x583474.classList.add("avBase", "avFrameNew");
    if (_0x583474.parentElement) {
      _0x583474.parentElement.style.overflow = "visible";
    }
    _0x583474.style.setProperty("--av-frame", "url('" + _0x12c867 + "')");
    let _0x42b933 = _0x583474.querySelector(".avCircle");
    if (!_0x42b933) {
      _0x42b933 = document.createElement("div");
      _0x583474.insertBefore(_0x42b933, _0x583474.firstChild);
    }
    _0x42b933.className = _0x1e529d ? "avCircle avCircleClip" : "avCircle";
    if (_0x8f12a1) {
      const _0x50bb1c = getAvatarEffectUrl(_0x4aa2ba.avatareffect, _0x4aa2ba.avatarcolor, _0x4aa2ba.avatarspeed);
      _0x42b933.classList.add("avBase", "avEffect");
      if (_0x1e529d) {
        _0x42b933.classList.add("avEffectRound");
      }
      _0x42b933.style.setProperty("--av-eff", "url('" + _0x50bb1c + "')");
    }
    const _0x269704 = String(_0x33bcf1).toLowerCase();
    const _0x53267f = avatarFrames.find(_0x2054b7 => _0x2054b7.name === _0x269704);
    if (_0x53267f) {
      _0x583474.style.setProperty("--av-frame-scale", _0x53267f.scale);
    }
    _0x4ffd9c(_0x42b933);
    let _0x525a53 = _0x583474.querySelector(".avFrameLayer");
    if (!_0x525a53) {
      _0x525a53 = document.createElement("img");
      _0x525a53.className = "avFrameLayer";
      _0x525a53.alt = "";
      _0x525a53.draggable = false;
      _0x583474.appendChild(_0x525a53);
    }
    _0x525a53.src = _0x12c867;
    const _0x59657d = _0x53267f ? _0x53267f.scale : 1.2;
    _0x525a53.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;object-fit:contain;z-index:100;pointer-events:none;border:none;outline:none;display:block;transform:scale(" + _0x59657d + ");transform-origin:center center";
  } else if (_0x8f12a1) {
    const _0x5be344 = getAvatarEffectUrl(_0x4aa2ba.avatareffect, _0x4aa2ba.avatarcolor, _0x4aa2ba.avatarspeed);
    _0x583474.classList.add("avBase", "avEffect");
    _0x583474.style.setProperty("--av-eff", "url('" + _0x5be344 + "')");
  }
  if (_0x1e529d && !_0x3f78d2) {
    _0x583474.classList.add("avBase", "avRound", "avEffectRound");
    _0x4ffd9c();
  }
}
function xEncodeURIComponent(_0xff831e) {
  return _0xff831e.replace(/[!'()*]/g, function (_0x2def66) {
    return "%" + _0x2def66.charCodeAt(0).toString(16);
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
const setCstyle = function (_0x155ff5 = "", _0x4ee2ea = false) {
  _0x155ff5 ||= _Activity.instance.cStyle;
  const _0x423eeb = document.querySelectorAll("#visitorsContainer ul li.section, .butcontainer");
  const _0x12a04d = document.querySelectorAll("#visitorsContainer ul li.section");
  const _0x3b110f = document.querySelectorAll(".butcontent:not(.mainButtons)");
  let _0x234ac9 = {};
  try {
    _0x234ac9 = JSON.parse(_0x155ff5);
  } catch (_0x14940a) {
    console.error("Failed:", _0x14940a);
    return;
  }
  let {
    csTheme: _0x42c5fc,
    csPool: _0x2b1a5f,
    csFont: _0x599803,
    csButtonBorder: _0x16a489,
    csNameFx: _0x32bf85,
    csChatShape: _0x46a699,
    csChatBorder: _0x2b6b5a,
    csShadow: _0xcb92e4,
    csRankBan: _0x8b0709
  } = _0x234ac9;
  const _0x204382 = gradientThemes[_0x42c5fc];
  if (_0x204382 && !_0x4ee2ea) {
    applyThemeStyles(_0x42c5fc, _0x423eeb, _0x12a04d, _0x8b0709, _0x3b110f);
  } else if (_0x2b1a5f) {
    applyPoolStyles(_0x2b1a5f, _0x12a04d, _0x8b0709);
  }
  if (_0x599803) {
    applyFontStyles(_0x599803, _0x423eeb, _0x3b110f);
  }
  if (borderStyles[_0x16a489]) {
    applyButtonBorder(_0x16a489, _0x423eeb);
  }
  if (_0x32bf85) {
    applyNameFx(_0x32bf85, _0x2b1a5f, _0x204382);
  }
  if (_0x46a699 || _0x2b6b5a || _0xcb92e4 && Classic) {
    applyChatBoxStyle(_0x46a699, _0x2b6b5a, _0xcb92e4);
  }
};
function applyPoolStyles(_0x52a658, _0x44eac8, _0x29f380) {
  if (!_0x52a658 || !isValidHex(_0x52a658)) {
    return;
  }
  const _0x153fcf = _0x52a658;
  const _0x3c3cf5 = isColorLight(_0x153fcf) ? "#000" : "#fff";
  _0x44eac8?.forEach(_0x3478ac => {
    const _0x186a51 = _0x3478ac.classList.contains("rank") || _0x3478ac.classList.contains("ban");
    if (_0x29f380 === "true" || !_0x186a51) {
      _0x3478ac.style.backgroundColor = _0x153fcf;
      _0x3478ac.style.color = _0x3c3cf5;
    }
  });
}
function applyThemeStyles(_0x291340, _0x5d3c50, _0x4430a9, _0x770a6f, _0x1b0a01) {
  const {
    bgStart: _0x3e1d6e,
    bgEnd: _0x4f66a9
  } = gradientThemes[_0x291340];
  const _0x4cf0f7 = document.querySelector("#returnBtn");
  const _0x10699d = parent.Classic ? findNodeInWindowOrParent(".dialogTitleBar") : document.querySelector(".actionsDialog");
  const _0x4cf396 = findNodeInWindowOrParent(".dialogTitle");
  const _0xedab78 = findNodeInWindowOrParent("#removeIcon");
  const _0x4551c1 = document.querySelector("#id_ModalClose_custom img, #modalCancel img, #id_ModalClose img");
  const _0x287a40 = findNodeInWindowOrParent("#reportIcon");
  const _0x573adf = document.querySelector(".dialogActionRight");
  _0x5d3c50?.forEach(_0xd14236 => {
    applyGradientStyle(_0xd14236, _0x3e1d6e, _0x4f66a9);
  });
  _0x4430a9?.forEach(_0x12cc5d => {
    if (_0x770a6f === "true") {
      applyGradientStyle(_0x12cc5d, _0x3e1d6e, _0x4f66a9);
    } else if (_0x12cc5d.classList.contains("rank")) {
      applyGradientStyle(_0x12cc5d, "#484848", "#a6a6a6");
    } else if (_0x12cc5d.classList.contains("ban")) {
      applyGradientStyle(_0x12cc5d, "#462200", "#b95d00");
    } else {
      applyGradientStyle(_0x12cc5d, _0x3e1d6e, _0x4f66a9);
    }
  });
  if (_0x4cf0f7) {
    returnBtn.style.stroke = "#fff";
  }
  applyTitleBarStyles(_0x10699d, _0x4cf396, _0xedab78, _0x287a40, _0x3e1d6e, _0x4f66a9, _0x4551c1);
  applyStyleForEach(_0x1b0a01, "color", "#fff");
  applyGradientStyle(_0x573adf, _0x3e1d6e, _0x4f66a9);
  ["dialogTitleBar"].forEach(_0x148569 => {
    findNodeInWindowOrParent("." + _0x148569, !0)?.forEach(_0x1ad431 => {
      const _0x69bf97 = _0x1ad431.querySelector(".dialogTitle");
      applyTitleBarStyles(_0x1ad431, _0x69bf97, null, null, _0x3e1d6e, _0x4f66a9);
    });
  });
}
function applyFontStyles(_0x5edd19, _0x1032af, _0x35accb) {
  const _0x260ef2 = document.querySelectorAll(".butIcons .svgBack");
  applyStyleForEach(_0x1032af, "fontFamily", _0x5edd19);
  if (smallFontStyles.includes(_0x5edd19)) {
    applyStyleForEach(_0x35accb, "fontSize", "10px");
    applyStyleForEach(_0x260ef2, "width", "1.3rem");
    applyStyleForEach(_0x260ef2, "height", "1.3rem");
  }
}
function applyButtonBorder(_0x46ab6b, _0x131768) {
  const _0x13569e = document.querySelectorAll(".butIcons");
  const _0x6c45bd = _0x46ab6b === "skewedLeft" || _0x46ab6b === "skewedRight";
  applyStyleForEach(_0x131768, "borderRadius", borderStyles[_0x46ab6b]);
  if (_0x6c45bd) {
    applyStyleForEach(_0x13569e, "marginLeft", "6px");
  }
}
function applyNameFx(_0x2ed232, _0xaf6f25, _0x236cf4) {
  if (!isValidHex(_0x2ed232)) {
    return;
  }
  const _0x7afeac = document.querySelector(".grpName .section");
  const _0xba84fd = toHex6(config.ButColW);
  let _0x3def08;
  if (_0x7afeac) {
    if (_0x236cf4) {
      _0x3def08 = "ffffff";
    } else if (_0xaf6f25) {
      _0x3def08 = isColorLight(_0xaf6f25) ? "000000" : "ffffff";
    } else if (_0xba84fd) {
      _0x3def08 = _0xba84fd;
    }
    _0x7afeac.style.color = "#" + _0x3def08 + "63";
    _0x7afeac.classList.add("csNameFx");
    _0x7afeac.style.backgroundImage = "linear-gradient(70deg, #" + _0x3def08 + " 45%, " + _0x2ed232 + "9c 50%, #" + _0x3def08 + " 55%)";
  }
}
function applyChatBoxStyle(_0x500d8a, _0x19918b, _0x222f97) {
  const _0x5370bb = parent?.parent?.document.querySelector("#embedframe:not(.hmemb)");
  var _0x48fd04;
  if (_0x5370bb) {
    if (_0x48fd04 = _0x5370bb) {
      if (_0x500d8a == "csRounded") {
        _0x48fd04.style.borderRadius = "15px";
      }
      if (_0x19918b && isValidHex(_0x19918b)) {
        _0x48fd04.style.border = "2px solid " + _0x19918b;
      }
      if (_0x222f97 && isValidHex(_0x222f97)) {
        _0x48fd04.style.boxShadow = "0 0 20px " + _0x222f97;
      }
    }
  }
}
function applyGradientStyle(_0x1db63b, _0x2bb731, _0x3ced4a) {
  if (_0x1db63b) {
    _0x1db63b.style.background = "linear-gradient(225deg, " + _0x2bb731 + " 0%, " + _0x3ced4a + " 100%)";
    _0x1db63b.style.color = "#fff";
  }
}
function applyTitleBarStyles(_0x1b7618, _0x449481, _0x1dd273, _0x149c0e, _0x3b26a2, _0x231bb3, _0x41fcc4) {
  if (_0x1b7618) {
    applyGradientStyle(_0x1b7618, _0x3b26a2, _0x231bb3);
  }
  if (_0x449481) {
    _0x449481.style.color = "#fff";
  }
  [_0x1dd273, _0x149c0e, _0x41fcc4].forEach(_0x99f0bf => {
    if (_0x99f0bf) {
      _0x99f0bf.src = _0x99f0bf === _0x149c0e ? "svg/reportw.svg" : "svg/removew.svg";
    }
  });
}
function applyStyleForEach(_0x1e0f33, _0x52791f, _0x1f28e3) {
  _0x1e0f33?.forEach(_0x5c028a => {
    _0x5c028a.style[_0x52791f] = _0x1f28e3;
  });
}
function initFlix(_0x2edddf) {
  _Activity.initFlix(_0x2edddf);
}
function HandleFlix(_0x504e82) {
  return _Activity.HandleFlix(_0x504e82);
}
function setPawnHueValues(_0x21ae63) {
  _Activity.setPawnHueValues(_0x21ae63);
}
function setCurrentPawnPreview(_0x1410f3) {
  _Activity.instance.Settings.setCurrentPawnPreview(_0x1410f3);
}
async function copyToClipboard(_0x369133) {
  if (!isSecureContext || !navigator.clipboard?.writeText) {
    let _0x191cae = GetTranslation("mob2.clipboarderrorone");
    _0x191cae ||= "Clipboard API is current unavailable. Ensure you are using a secure page and that your browser is up to date.";
    AlertMessage(_0x191cae);
  }
  try {
    await navigator.clipboard.writeText(_0x369133);
    return;
  } catch (_0x47206c) {
    if ((_0x47206c?.name || "") === "NotAllowedError" && window.top !== window) {
      let _0x3b34eb = GetTranslation("mob2.clipboarderrortwo");
      _0x3b34eb ||= "Cannot copy to clipboard. Iframe must be allowed to write to clipboard, please contact the site administrator to resolve this issue.";
      AlertMessage(_0x3b34eb);
      return;
    }
  }
  {
    let _0x28f3bc = GetTranslation("mob2.clipboarderrorthree");
    _0x28f3bc ||= "Cannot copy to clipboard, please contact the site administrator to resolve this issue.";
    AlertMessage(_0x28f3bc);
  }
}
function cleanupPstyleClasses(_0x1dea3f, _0x5a9243) {
  const _0x2a15f0 = _0x5a9243 ? document.getElementById("status") : document.getElementById("statusNew");
  const _0x3634a5 = document.querySelectorAll(".butcontainer");
  const _0x118f27 = Classic ? parent.document.querySelector(".dialogTitleBar") : document.querySelector(".htmlTitleBar");
  const _0x3c0055 = document.getElementById("name");
  const _0x2aa9a0 = document.getElementById("onP");
  const _0x21d214 = document.querySelectorAll(".profileIc img");
  const _0x547091 = _0x1dea3f?.querySelector(".dialogTitleBar");
  const _0x171557 = _0x1dea3f?.querySelector(".dialogActionRight");
  [..._0x21d214, _0x2aa9a0, _0x3c0055].filter(Boolean).forEach(_0x9f605d => {
    window.kPstyleKeys.forEach(_0x1dd725 => _0x9f605d.classList.remove(_0x1dd725));
    _0x9f605d.classList.remove("psinfo-front", "psinfo-back");
  });
  [..._0x3634a5, _0x118f27, _0x547091, _0x171557, !_0x5a9243 && _0x2a15f0 ? _0x2a15f0 : null].filter(Boolean).forEach(_0x315121 => {
    window.kPstyleKeys.forEach(_0x279b40 => _0x315121.classList.remove(_0x279b40));
    _0x315121.classList.remove("pstyleFx");
  });
}