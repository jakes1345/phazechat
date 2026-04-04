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
const frameHeartThorns = {
  name: "heartthorns",
  scale: 1.3,
  isRound: !1
};
const frameHeartPunk = {
  name: "heartpunk",
  scale: 1.3,
  isRound: !1
};
const frameHeartLocked = {
  name: "heartlocked",
  scale: 1.28,
  isRound: !1
};
const frameHeartGarden = {
  name: "heartgarden",
  scale: 1.25,
  isRound: !1
};
const frameHeartCloud = {
  name: "heartcloud",
  scale: 1.2,
  isRound: !1
};
const frameHeartBloom = {
  name: "heartbloom",
  scale: 1.26,
  isRound: !1
};
const frameHeartAurea = {
  name: "heartaurea",
  scale: 1.2,
  isRound: !0
};
const frameFrost = {
  name: "frost",
  scale: 1.25,
  isRound: !1
};
const frameChristmas = {
  name: "christmas",
  scale: 1.3,
  isRound: !1
};
const avatarFrames = [frameHeartThorns, frameHeartPunk, frameHeartLocked, frameHeartGarden, frameHeartCloud, frameHeartBloom, frameHeartAurea, frameFrost, frameChristmas];
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
const ErrorCodes = {
  LinkInLinkMarkupDetected: -1
};
const MessageErrorCodes = ErrorCodes;
var _Activity;
try {
  if (_Activity === undefined) {
    _Activity = parent._Activity !== undefined ? parent._Activity : parent.parent._Activity !== undefined ? parent.parent._Activity : parent.parent.parent._Activity !== undefined ? parent.parent.parent._Activity : parent?.box?._Activity !== undefined ? parent.box._Activity : {};
  }
} catch (e) {
  console.warn("Cross-origin restriction encountered while accessing _Activity.", e);
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
  ThisPage = dataObj.page;
  if (config.chatid) {
    setEventsLink(config.chatid);
  }
  let slineMacros = Macros?.sline?.split(",");
  slineMacros &&= slineMacros.filter(item => item);
  if (slineMacros?.length && config.pFlags & NamePowers.sline) {
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
  window.addEventListener("pagehide", ev => {
    if (ev.persisted) {
      document.body.classList.add("noAnimations");
    }
  }, !1);
  if (!appFromUrl && (appFromUrl = new URLSearchParams(parent.parent.location.search).get("open"), appFromUrl && appFromUrl.indexOf(".") != -1)) {
    const dialogType = appFromUrl.split(".")[0].toLowerCase();
    const dialogPackage = capitalize(appFromUrl.split(".")[1].toLowerCase());
    let dialogPack;
    try {
      dialogPack = appFromUrl.split(".")[2].toLowerCase();
    } catch (err) {}
    const dialogArgs = {
      Type: dialogPackage,
      Pack: dialogPack,
      Config: config
    };
    classicSetDialog(dialogType, dialogArgs);
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
  if (dataObj.roomid) {
    _Activity.instance.CurrentChat = dataObj.roomid;
  }
  if (dataObj.pFlags) {
    userFlags = dataObj.pFlags;
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
    } catch (err) {}
  }
}
function SetPow() {
  if (PSSA || parent?.PSSA) {
    if (localStorage.getItem("w_Powers") && localStorage.getItem("todo")) {
      MAXPOWER = (PSSA || parent?.PSSA).length - 1;
      w_Powers = [];
      let powers = JSON.parse(localStorage.getItem("w_Powers"));
      for (let id in powers) {
        w_Powers[xInt(id)] = xInt(powers[id]);
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
function debug(key) {
  return config[key];
}
function xtrace(msg) {
  if (debug("xtrace")) {
    ToC({
      Type: "xtrace",
      msg: msg
    }, true);
  }
}
function FromObjC(type) {
  switch (type) {
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
      Type: type,
      Page: ThisPage
    });
  }
}
let commandRegex = /\/(\w+)(?: (\w+))?/;
function ToC(cmd, isTrace) {
  cmd.Type ||= cmd.Command;
  cmd.Command ||= cmd.Type;
  cmd.Page ||= ThisPage;
  if (cmd.Command == "LoadClassicDialog") {
    _Activity.instance.CurrentChatC = null;
  }
  if (typeof messages != "undefined" && cmd.Command === "Click") {
    messages.editMode = false;
  }
  if (cmd.ChatId && cmd.Page && cmd.Page == "chats") {
    if (cmd.ChatId.indexOf("_") >= 0) {
      _Activity.instance.CurrentChatC = null;
    } else if (cmd.ChatId > 0) {
      _Activity.instance.CurrentChatC = cmd.ChatId;
    }
  }
  if (Classic && cmd.Next == "pop") {
    cmd.Next = "";
  }
  if (!!cmd.Message && (cmd.Message.substr(0, 2) == "/+" || cmd.Message.substr(0, 2) == "/-")) {
    reloadPowers = true;
    messages.setTypingOff();
  }
  if (!Classic && typeof messages != "undefined") {
    if (cmd.Command && ["swipeleft", "swiperight"].indexOf(cmd.Command) >= 0 || cmd.Next && cmd.Next == "visitors") {
      messages.setTypingOff();
    }
  }
  if (cmd.Type == "Send" && cmd.Message[0] == "/") {
    let match = commandRegex.exec(cmd.Message);
    match &&= match[1];
    if (match) {
      switch (match.toLowerCase()) {
        case "rtl":
        case "ltr":
          saveSetting("textDirection", match);
          document.getElementById("textEntryEditable").style.direction = match;
          break;
        case "away":
          messages.setTypingOff();
          break;
        case "gameban":
          GameBan(cmd.Message.split(" ")[1], Date.now() + 10000000);
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
  _Activity.instance.QueueCommand(cmd);
}
function GetXconst(name, data) {
  try {
    data = JSON.parse(data);
  } catch (err) {
    if (typeof data == "string") {
      data = data.split(",");
    }
  }
  _Activity.instance.xConsts[name] = data;
  switch (name) {
    case "isgrp":
      ISGRP = data;
      break;
    case "pssa":
      _Activity.instance.PSSA = PSSA = data;
      SetPow();
      break;
    case "topsh":
      _Activity.instance.TOPSH = TOPSH = data;
      break;
    case "SuperPowers":
      _Activity.instance.SUPERPOWERS = SUPERPOWERS = data;
      break;
    case "SuperPawns":
      SUPERPAWNS = data;
      break;
    case "Stickers":
      STICKERS = data;
      break;
    case "reactions":
      if (!data || data.length === 0) {
        break;
      }
      REACTIONS = data;
      if (!messages.reactionsInit) {
        messages.reactionsInit = true;
        messages.setUpReactionsSelector();
      }
      break;
    case "soth":
      _Activity.instance.SOTH = data;
      break;
    case "syel":
      _Activity.instance.SYEL = data;
      break;
    case "uCollections":
      _Activity.instance.UCOLLECTIONS = data;
      break;
    case "effects":
      _Activity.instance.EFFECTS = data;
      break;
    case "frames":
      _Activity.instance.FRAMES = data;
      break;
    case "aces":
      _Activity.instance.ACES = data;
  }
}
function GetXconsts(jsType, list = null, existing = null) {
  list ||= ["pssa", "topsh", "SuperPowers", "SuperPawns", "isgrp", "Stickers", "reactions", "soth", "syel", "uCollections", "effects", "frames", "aces"];
  if (existing) {
    let subList = [];
    for (let i in list) {
      let key = list[i];
      if (!existing[key] || key == "end" || key == "MainObj") {
        subList.push(key);
      }
    }
    list = subList;
  }
  if (_Activity.instance.xConsts) {
    delete _Activity.instance.xConsts.reactions;
    delete _Activity.instance.xConsts.pssa;
    delete _Activity.instance.xConsts.topsh;
  }
  for (let i in list) {
    if (jsType === "selector" || !_Activity.instance.xConsts[list[i]]) {
      ToC({
        Command: "GetXconst",
        js: jsType,
        obj: list[i]
      });
    }
  }
}
function loadXavi(parentEl, userId, userName, avatarCode, p5, p6, p7) {
  const container = makeElement(parentEl, "div", "messageAvatar xavi");
  const iframe = makeElement(container, "iframe", "xaviFrame");
  iframe.scrolling = "no";
  iframe.loading = "lazy";
  iframe.src = "../../xavi/xavi.html#chat&" + userId + "&" + encodeURIComponent(userName) + "&" + avatarCode + "&" + p6 + "&" + p7 + "&" + encodeURIComponent(PSSA);
  return container;
}
function GameBan(powerId, time, p3 = 0, p4 = 0) {
  let container = document.querySelector("#gamesContainer");
  if (powerId == 0 || container.childNodes.length == 0) {
    if (powerId != 0) {
      if (container) {
        container.innerHTML = "";
        container.style.display = "block";
      }
      let iframe = makeElement(container, "iframe", "gameFrame");
      switch (xInt(powerId)) {
        case 162:
          iframe.src = "../gameban/codeban/index.html#" + time;
          break;
        case 134:
          iframe.src = "../gameban/snakeban/index.html#" + time;
          break;
        case 136:
          iframe.src = "../gameban/spaceban/index.html#" + time;
          break;
        case 236:
        case 152:
        case 140:
          const {
            innerWidth: width,
            innerHeight: height
          } = window;
          const params = "" + [time, p3, p4, powerId, config.MyId, width, height].join(",");
          iframe.src = "../gameban/other/index.html#" + params;
          break;
        default:
          container.innerHTML = "";
          container.style.display = "none";
      }
    } else {
      closeGameBan();
    }
  }
}
function closeGameBan() {
  let container = document.querySelector("#gamesContainer") || parent.document.querySelector("#gamesContainer");
  if (container) {
    container.innerHTML = "";
    container.style.display = "none";
  }
}
function openInNewTab(url, name) {
  name ||= "_blank";
  const newWindow = window.open(url, name);
  if (newWindow) {
    newWindow.focus();
  }
}
function HitWeb(url, name) {
  if (!(url.search(/app:/i) >= 0)) {
    if (url.search("://") < 0) {
      url = "https://" + url;
    }
    openInNewTab(url);
  }
}
function HitWiki(title, name) {
  HitWeb("https://util.xat.com/wiki/index.php?title=" + title, name);
}
function LinkValidator(e, url, isManual) {
  if ((url = url.replace(/＆/g, "&")).includes("linkvalidator.net/")) {
    return;
  }
  if (e) {
    e.stopPropagation();
  }
  var link;
  var firstChar = url.charAt(0);
  if (firstChar == "^") {
    ToC({
      Command: "StartApp",
      n: "canvas",
      a1: url.substr(1)
    });
    return;
  }
  if (firstChar == "@") {
    link = "https://xat.me/" + url.substr(1);
    if (isManual) {
      return link;
    } else {
      HitWeb(link);
      return;
    }
  }
  if (firstChar == "%") {
    link = xatdomain + "/" + url.substr(1);
    if (isManual) {
      return link;
    } else if (isWEB) {
      HitWeb(link);
      return;
    } else {
      ToC({
        Command: "StartGroup",
        Group: url.substr(1)
      });
      return;
    }
  }
  if (url === "vote") {
    _Activity.instance.QuickBar.toggleSideBar(!0);
    let item = findNodeInWindowOrParent("#sideBarItemvote");
    if (!_Activity.IsClassic) {
      const entry = findNodeInWindowOrParent("#textEntryEditable");
      entry?.blur();
    }
    if (item) {
      item.click();
    }
    return;
  }
  let uri;
  url = url?.replace(/\u00A0/, "");
  try {
    uri = new URL(url);
  } catch (err) {
    uri = {};
  }
  if (_Activity.instance.UserSettings?.linkvalidator == "disable" && ["^", "@", "%"].indexOf(url.charAt(0)) == -1 || ["xat.com", "xat.wiki", "forum.xat.com"].includes(uri.host)) {
    if (isManual) {
      return url;
    } else {
      HitWeb(url);
      return;
    }
  }
  var i;
  var charArray = Array.from({ length: 64 });
  for (i = 0; i < 26; i++) {
    charArray[i] = String.fromCharCode(i + 65);
  }
  for (i = 26; i < 52; i++) {
    charArray[i] = String.fromCharCode(i + 71);
  }
  for (i = 52; i < 62; i++) {
    charArray[i] = String.fromCharCode(i - 4);
  }
  charArray[62] = "+";
  charArray[63] = "/";
  var charCodes = new Array();
  var encoded = new Array();
  for (i = 0; i < url.length; i++) {
    charCodes[i] = url.charCodeAt(i);
  }
  for (i = 0; i < charCodes.length; i++) {
    switch (i % 3) {
      case 0:
        encoded.push(charArray[(charCodes[i] & 252) >> 2]);
        break;
      case 1:
        encoded.push(charArray[(charCodes[i - 1] & 3) << 4 | (charCodes[i] & 240) >> 4]);
        break;
      case 2:
        encoded.push(charArray[(charCodes[i - 1] & 15) << 2 | (charCodes[i] & 192) >> 6]);
        encoded.push(charArray[charCodes[i] & 63]);
    }
  }
  if (i % 3 == 1) {
    encoded.push(charArray[(charCodes[i - 1] & 3) << 4]);
  } else if (i % 3 == 2) {
    encoded.push(charArray[(charCodes[i - 1] & 15) << 2]);
  }
  i = encoded.length;
  for (; i % 4 != 0; i++) {
    encoded.push("=");
  }
  var mode = "m=1&";
  if (isWEB) {
    mode = "";
  }
  var warnUrl = "https://linkvalidator.net/warn.php?" + mode + "p=";
  for (i = 0; i < encoded.length; i++) {
    warnUrl += encoded[i];
  }
  if (isManual) {
    return warnUrl;
  }
  HitWeb(warnUrl);
}
var gconfig;
var Macros;
function setGconfig(json) {
  gconfig = JSON.parse(json);
  for (var key in gconfig) {
    if (gconfig[key].charAt(0) == "{") {
      if (gconfig[key].charAt(1) == "`") {
        gconfig[key] = gconfig[key].replace(/`/g, "\"");
      }
      gconfig[key] = JSON.parse(gconfig[key]);
    }
  }
  if (gconfig.g100) {
    var parts = gconfig.g100.split(",");
    gconfig.g100 = {};
    for (var i = 0; i + 1 < parts.length; i += 2) {
      gconfig.g100[parts[i]] = parts[i + 1];
    }
  }
  _Activity.instance.gConfig = gconfig;
}
function setMacros(json) {
  Macros = JSON.parse(json);
}
function setSettings(json) {
  _Activity.instance.UserSettings = JSON.parse(json);
}
function setAppIcon(channel) {
  const message = {
    channel: channel,
    user: 0,
    msg: "",
    tobox: 1
  };
  parent.parent.parent.postMessage(JSON.stringify(message), "https://xat.com");
}
let prevSmilies = null;
let smTimeoutId = null;
let gotSmConfig = !1;
let debugFlag = 0;
function addSmileyBar(smileyListStr, hideFirst) {
  if (!smileyListStr || smileyListStr.replace(/ /g, "").length == 0) {
    smileyListStr = "smile,biggrin,wink,eek,tongue,cool,mad,confused,redface,frown,crying,sleepy";
  }
  let smileyBarEl = document.querySelector("#smileyBar");
  if (prevSmilies != smileyListStr || debugFlag != (config.Flags & NamePowers.ChatIsDebug) || forceUpdateAnimation) {
    gotSmConfig = false;
  }
  if (gotSmConfig || !smileyBarEl || window.innerHeight <= 300) {
    return;
  }
  if (gconfig && gconfig.hasOwnProperty("g74")) {
    gotSmConfig = true;
  }
  prevSmilies = smileyListStr;
  forceUpdateAnimation = !1;
  const smileys = smileyListStr.split(",");
  let displaySmileys = ["smile", "biggrin", "wink", "eek", "tongue", "cool", "mad", "confused", "redface", "frown", "crying", "sleepy"];
  smileyBarEl.innerHTML = "";
  for (let i = 0; i < smileys.length; i++) {
    if (smileys[i]) {
      displaySmileys[i] = smileys[i];
    }
  }
  const maxSmileys = window.innerWidth > 500 ? 12 : 8;
  displaySmileys.length = maxSmileys;
  displaySmileys.forEach((name, index) => {
    let className = hideFirst && index == 0 ? "smiley smToggle" : hideFirst ? "smiley smToggle2 smOff" : "smiley";
    const smileyObj = _Activity.instance.Smilies.MakeSmiley(makeElement(smileyBarEl, "div", className), name, {
      size: 30,
      tooltip: "(" + name + ")",
      tooltipPosition: "low",
      showAd: !1,
      align: !0,
      addGback: !0,
      callback: () => {
        smiliePressed("(" + name + ")");
      }
    });
    if (hideFirst && !index) {
      smileyObj.addEventListener("mouseenter", ev => {
        window.clearTimeout(smTimeoutId);
        smTimeoutId = window.setTimeout(() => {
          document.querySelectorAll(".smOff").forEach(el => {
            el.classList.remove("smOff");
          });
          document.querySelectorAll(".smiley").forEach(el => {
            el.addEventListener("mouseleave", ev2 => {
              window.clearTimeout(smTimeoutId);
              smTimeoutId = window.setTimeout(() => {
                document.querySelectorAll(".smToggle2").forEach(el2 => {
                  el2.classList.add("smOff");
                });
              }, 500);
            });
          });
        }, 500);
      });
    }
  });
  const stuffBtn = makeElement(smileyBarEl, "div", "cell svgBack smline sideApp shake");
  stuffBtn.style.cssText = "width: 6%; height: 30px; right: 0; background-image: url('svg/8ball" + (config.Flags & NamePowers.ChatIsDebug ? "b" : "") + ".svg')";
  stuffBtn.onclick = getStuffPressed;
  const buyBtn = makeElement(smileyBarEl, "div", "cell svgBack smline sideApp");
  buyBtn.style.cssText = "width: 6%; height: 30px; right: 0; background-image: url('svg/getx.svg')";
  buyBtn.onclick = buyPressed;
  const soundBtn = makeElement(smileyBarEl, "div", "cell svgBack smline sideApp", "spkBut");
  soundBtn.style.cssText = "width: 6%; height: 30px; right: 0;";
  soundBtn.onclick = spkPressed;
  addToolTip(stuffBtn, ["box.139", "Get Stuff"], {
    position: "low"
  });
  addToolTip(buyBtn, ["box.207", "Click to buy"], {
    position: "low"
  });
  addToolTip(soundBtn, ["mob1.managesounds", "Manage sounds"], {
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
function openApp(app) {
  if (!app) {
    return;
  }
  const appIds = {
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
  let params = {};
  if (app.type && app.type == "media") {
    params = {
      n: app.type,
      i: appIds.media,
      l: app.link,
      action: "sideload"
    };
  } else if (app.toLowerCase() == "translator" || app.toLowerCase() == "translate") {
    const translatorParams = {
      UserNo: config.MyId,
      tab: "translator"
    };
    let diagParams = translatorParams;
    classicSetDialog("actions", config.MyId);
    classicSetDialog("settings", diagParams);
  } else {
    params = {
      n: app,
      i: appIds[app],
      action: "sideload"
    };
  }
  if (parent) {
    parent.postMessage(JSON.stringify(params), "https://xat.com");
  }
}
function WordIsLink(word, p2, p3, isChat) {
  if (!word.match(/['"<>❯`]/) && (!word || word[0] !== "(" || word[word.length - 1] !== ")" || !word.includes("#w"))) {
    var match;
    var lowerWord = word.toLowerCase();
    if (!isChat || !_Activity.instance.QuickBar?.isGiphyLink(word)) {
      if (word.match(/^[@%][a-zA-Z0-9_]+$/)) {
        return lowerWord;
      }
      if ((match = word.match(/^(play\.|app\.)([a-zA-Z0-9_]+)$/))) {
        return "^" + match[2];
      }
      if (keywords.hasOwnProperty(lowerWord) && !p3) {
        let val;
        switch ((val = xInt(match = keywords[lowerWord]))) {
          case 9:
          case 11:
            if (lowerWord == "doodle") {
              lowerWord = "doodle2";
            }
            return {
              l: ">",
              c: "#000000",
              callBack: () => {
                openApp(lowerWord);
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
            if (match == "vote") {
              return "vote";
            }
            if (val < 1) {
              return "https://xat.com/" + match;
            }
        }
      }
      if (gconfig && (match = gconfig.g100) && match.hasOwnProperty(lowerWord)) {
        return {
          l: "https://bit.ly/" + (match = match[lowerWord]),
          c: "#000080"
        };
      }
      if (!p2 && !(word.indexOf(".") < 0) && word[0] != "." && !(lowerWord.indexOf("app:") >= 0)) {
        if (lowerWord.indexOf("http") >= 0) {
          return word;
        }
        if (lowerWord[0] == "(" && lowerWord[lowerWord.length - 1] == ")") {
          const parts = lowerWord.split(" ");
          if (parts.length > 1) {
            const filtered = parts.filter(p => WordIsLink(p.replace("(", "").replace(")", "")));
            if (filtered.length && filtered[0].length > 0) {
              word = filtered[0].replace("(", "").replace(")", "");
            }
          }
        }
        var isLink = !1;
        var dotCount = 2;
        if (lowerWord.indexOf("www.") >= 0) {
          isLink = true;
        }
        var code;
        var slashIndex = lowerWord.indexOf("/");
        if (slashIndex == -1) {
          slashIndex = lowerWord.length;
        }
        for (var val = 0; val < slashIndex; val++) {
          if (((code = lowerWord.charCodeAt(val)) < 48 || code > 57) && code != 46) {
            dotCount = 0;
            break;
          }
        }
        if (lowerWord.charAt(slashIndex - 1) == ".") {
          dotCount = 2;
        }
        if (lowerWord.charAt(slashIndex - 2) == ".") {
          dotCount = 2;
        }
        if (lowerWord.charAt(slashIndex - 3) == ".") {
          dotCount++;
        }
        if (lowerWord.charAt(slashIndex - 4) == ".") {
          dotCount++;
        }
        if (lowerWord.charAt(slashIndex - 5) == ".") {
          dotCount++;
        }
        if (dotCount == 1) {
          isLink = true;
        }
        if (isLink) {
          return "https://" + word;
        } else {
          return undefined;
        }
      }
    }
  }
}
function setEventsLink(roomId) {
  if (keywords && roomId) {
    keywords.events = "chats#!events&roomid=" + roomId + "&GroupName=" + config.GroupName;
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
function toColor(val) {
  return "#" + (16777216 + ((val >>>= 0) & 255 | (val & 65280) >>> 8 << 8 | (val & 16711680) >>> 16 << 16)).toString(16).slice(1);
}
function MakeGrad(params) {
  let isWave;
  let i;
  let angle;
  let size;
  let type = 0;
  let step = 0;
  let hasNW = !1;
  let colors = [];
  params.reverse();
  if ((params = params.filter(Boolean)).length <= 1) {
    params = [...params, 6359443, 2951035, 40440, 48184, 16578129, 16736060, 16711680];
  }
  i = 0;
  for (; i < params.length; i++) {
    let p = params[i];
    if (!p) {
      continue;
    }
    p = p.toString();
    if (p == "NW") {
      hasNW = !0;
      if (isWave === undefined) {
        isWave = true;
      }
      continue;
    }
    let val;
    let firstChar = p.charAt(0);
    val = xInt(p.substr(1));
    if (firstChar != "r") {
      if (firstChar != "s") {
        if (firstChar != "f") {
          if (firstChar != "o") {
            p = xInt(p);
            if (!p) {
              break;
            }
            colors.push(toColor(p));
          } else {
            if (val == 0) {
              isWave = !1;
              continue;
            }
            isWave = hasNW;
            size = RepeatA[val];
          }
        } else {
          isWave = hasNW;
          type = usefA[val];
        }
      } else {
        step = val;
      }
    } else {
      angle = val;
    }
  }
  if (colors.length > 15) {
    colors.length = 15;
  }
  if (colors.length < 2) {
    for (let j = 0; j < 15; j++) {
      let r = lut15[(j + step) % 15];
      let g = lut15[(j + step + 10) % 15];
      let b = lut15[(j + step + 5) % 15];
      colors[j] = (r << 16) + (g << 8) + b;
    }
  }
  if (angle === undefined) {
    angle = 45;
  }
  if (isWave) {
    if (angle > 45) {
      angle = 45;
    } else if (angle < -45) {
      angle = -45;
    }
    type ||= usefA[4];
    angle = angle > 0 ? 90 - angle : -90 - angle;
    if (colors[0] != colors[colors.length - 1]) {
      colors.push(colors[0]);
    }
  }
  angle = -angle;
  if (size || isWave) {
    if (!size && isWave) {
      size ||= 100;
    }
  } else {
    size ||= 200;
  }
  let stepPct = (90 - Math.abs(angle)) / 15 * size / 100;
  size = (size / 2 - stepPct) / (colors.length - 1);
  let css = (IsAnimationOn() ? "repeating-" : "") + ("linear-gradient(" + angle + "deg");
  for (let j = 0; j < colors.length; j++) {
    css += "," + colors[j];
    css += isWave ? " " + (stepPct + size * j) + "%" : " " + j * 100 / (colors.length - 1) + "%";
  }
  css += ")";
  return [type, css];
}
function nameFlag(parts, el, img, pFlags) {
  const charCounts = {
    "1": 12,
    "3": 72
  };
  const gradCounts = {
    "1": 0,
    "3": 0.2,
    "4": 0.3
  };
  let jewelCol;
  let type = 4;
  let density = 0.25;
  let count = 36;
  let ratio = 1;
  let direction = -1;
  let isJewel = parts[0] == "jewel";
  let scale = 2 / 3;
  let frames = 36;
  let hasEveryPower = pFlags & NamePowers.everypower;
  if (isJewel) {
    jewelCol = hasEveryPower ? "10A012" : "DC143C";
  }
  if (parts.length) {
    if (isJewel && parts[1] && parts[1].length == 6) {
      let col = getJewelCol(parts[1], hasEveryPower);
      if (col) {
        jewelCol = col;
      }
    }
    for (let i = 1; i < parts.length; i++) {
      if (!parts[i]) {
        continue;
      }
      let firstChar = parts[i].charAt(0);
      let val = parseInt(parts[i].substr(1));
      switch (firstChar) {
        case "r":
          type = 2;
          break;
        case "e":
          type = 3;
          break;
        case "u":
          type = 5;
          break;
        case "f":
          switch (val) {
            case 1:
              frames = 72;
              break;
            case 2:
              frames = 48;
              break;
            case 3:
              frames = 36;
              break;
            case 4:
              frames = 18;
          }
          break;
        case "c":
          count = charCounts[val];
          count ||= 36;
          break;
        case "g":
          density = gradCounts[val];
          density ||= 0.1;
          break;
        case "d":
          direction = -direction;
      }
    }
  }
  let duration = frames / 12;
  if (type == 5) {
    let canvas = document.createElement("canvas");
    canvas.width = Math.ceil(el.offsetWidth);
    canvas.height = Math.round(canvas.width * (img.naturalHeight / img.naturalWidth));
    let ctx = canvas.getContext("2d");
    if (isJewel) {
      ctx.fillStyle = "#" + jewelCol;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    el.style.backgroundImage = "url('" + canvas.toDataURL() + "')";
    if (IsAnimationOn()) {
      el.style.animation = "nameFlag " + duration + "s ease-in-out infinite alternate";
    }
    addClass("nameFlag", 0, el);
    return;
  }
  if (!el) {
    return !1;
  }
  if (isJewel) {
    scale = 1;
  }
  let width = Math.ceil(el.offsetWidth);
  let height = Math.ceil(el.offsetHeight);
  if (!height) {
    return;
  }
  let stripCanvas = document.createElement("canvas");
  stripCanvas.width = width;
  stripCanvas.height = height * frames;
  let stripCtx = stripCanvas.getContext("2d");
  let frameCanvas = document.createElement("canvas");
  frameCanvas.width = width;
  frameCanvas.height = height;
  let frameCtx = frameCanvas.getContext("2d");
  let imgWidth = img.naturalWidth;
  let imgHeight = img.naturalHeight;
  let imgScale = width / imgWidth;
  let drawWidth = imgWidth * imgScale * scale;
  let drawHeight = imgHeight * imgScale;
  if (isJewel) {
    stripCtx.fillStyle = "#" + jewelCol;
    stripCtx.fillRect(0, 0, width, height * frames);
  }
  let sinArr = new Array();
  let cosArr = new Array();
  if (type == 2 || type == 3 || type == 4) {
    let imgRatio = imgWidth / imgHeight;
    if (imgRatio > ratio) {
      ratio = imgRatio;
    }
  }
  if (type == 3 || type == 4) {
    for (var i = 0; i < count; i++) {
      if (type == 3 || type == 4) {
        sinArr[i] = Math.sin(Math.PI * 2 * (i / count));
      }
      if (type == 4) {
        cosArr[i] = Math.cos(Math.PI * 2 * (i / count));
      }
    }
  }
  for (let j = 0; j < frames; j++) {
    let centerX = width / 2;
    let centerY = height / 2;
    let angle = 0;
    let scaleVal = 1;
    switch (type) {
      case 2:
        angle = -360 / frames * j * direction;
        centerX = width / 2;
        centerY = height / 2;
        scaleVal = ratio;
        break;
      case 3:
        angle = -360 / frames * j * direction;
        centerX = width / 2;
        centerY = height / 2;
        scaleVal = ratio + ratio * density + ratio * density * sinArr[j % count];
        break;
      case 4:
        angle = -360 / frames * j * direction;
        centerX = width / 2 + width * density * cosArr[j % count];
        centerY = height / 2 + height * density * sinArr[j % count];
        scaleVal = ratio + ratio * density * 2;
    }
    frameCtx.clearRect(0, 0, width, height);
    frameCtx.save();
    frameCtx.translate(centerX, centerY);
    frameCtx.rotate(angle * Math.PI / 180);
    frameCtx.scale(scaleVal, scaleVal);
    frameCtx.translate(-width / 2, -height / 2);
    frameCtx.drawImage(img, width / 2 - drawWidth / 2, height / 2 - drawHeight / 2, drawWidth, drawHeight);
    frameCtx.restore();
    stripCtx.drawImage(frameCanvas, 0, height * j, width, height);
  }
  el.style.backgroundImage = "url('" + stripCanvas.toDataURL() + "')";
  addClass("nameStrip", 0, el);
  if (IsAnimationOn()) {
    el.style.animation = "nameStrip" + frames + " " + duration + "s steps(" + frames + ") infinite normal";
    el.style.backgroundSize = "100% " + frames + "00%";
  }
}
function getJewelCol(col, isPawn) {
  if (!col) {
    return !1;
  }
  if (!isPawn) {
    let val = parseInt(col, 16);
    if (isNaN(val)) {
      val = 1;
    }
    let r = val >> 16 & 255;
    let g = val >> 8 & 255;
    let b = val & 255;
    if (g > r) {
      g = r;
    }
    if (g > b) {
      g = b;
    }
    val = (r << 16) + (g << 8) + b;
    col = toHex6(val);
  }
  return col;
}
function removeDodgy(text) {
  if (text.match(/&.*;/)) {
    text = text.replace(/&apos;/g, "'").replace(/&quot;/g, "\"").replace(/&amp;/g, "＆").replace(/&slsh;/g, "\\").replace(/&gt;/g, "〉").replace(/&lt;/g, "〈");
  }
  return text;
}
function ProcessName(name = "", pFlags = 0, status = "") {
  const res = {};
  if (status && typeof status == "string") {
    const statusParts = status.split("#");
    res.statusColor = hasDarkMode() ? "#969696" : 0;
    if (pFlags & NamePowers.status) {
      res.status = statusParts[0].replace(/_/g, " ");
    }
    if (pFlags & NamePowers.statusglow && statusParts.length > 1) {
      res.statusGlow = DecodeColor(statusParts[1], pFlags);
      if (pFlags & NamePowers.statuscol && statusParts.length > 2) {
        res.statusColor = DecodeColor(statusParts[2], pFlags);
      }
    }
  }
  if (name) {
    res.name = name.replace(/\s*\(\uFEFF?hat#.*?\)\s*/gi, " ").replace(/\s*\(\uFEFF?glow.*?\)\s*/gi, " ").replace(/[\s_]*$/gi, "");
    if (pFlags & NamePowers.nospace) {
      res.name = res.name.replace(/_/g, " ");
    }
    let glowIndex = -1;
    if (pFlags & NamePowers.glow && (glowIndex = name.toLowerCase().indexOf("(glow")) != -1) {
      const glowParts = name.slice(glowIndex, name.indexOf(")", glowIndex)).split("#");
      if (glowParts[0]) {
        res.glow = 65280;
      }
      if (glowParts[1]) {
        res.glow = DecodeColor(glowParts[1], pFlags);
      }
      if (glowParts[2] == "grad" && pFlags & NamePowers.grad) {
        if (glowParts.length - 3 == 1 && glowParts[3]) {
          res.color = DecodeColor(glowParts[3], pFlags);
        } else {
          res.grad = [];
          pFlags |= NamePowers.valid;
          for (let i = 3; i < glowParts.length; i++) {
            const firstChar = glowParts[i][0];
            if (firstChar != "o" && (firstChar != "f" || glowParts[i].length == 6) || pFlags & NamePowers.wave) {
              res.grad.push(DecodeColor(glowParts[i], pFlags));
            }
          }
          if (pFlags & NamePowers.wave) {
            res.grad.push("NW");
          }
        }
      } else if (glowParts[2] == "jewel" && pFlags & NamePowers.jewel) {
        res.flag = [];
        for (let i = 2; i < glowParts.length; i++) {
          res.flag[i - 2] = glowParts[i];
        }
      } else if (glowParts[2] == "flag" && pFlags & NamePowers.flag) {
        res.flag = [];
        for (let i = 3; i < glowParts.length; i++) {
          res.flag[i - 3] = glowParts[i];
        }
      } else if (pFlags & NamePowers.col && glowParts[2]) {
        res.color = DecodeColor(glowParts[2], pFlags);
      }
    }
  }
  return res;
}
function addGlow(el, data, p3) {
  const glowEl = el.cloneNode(!0);
  let existingGlow;
  glowEl.className = "userNick nameGlow";
  glowEl.style.cssText = "position: absolute; left: 0; z-index: -1;";
  if ((existingGlow = glowEl.querySelector(".nameGlow"))) {
    existingGlow.remove();
  }
  el.appendChild(glowEl);
  const smilies = [...glowEl.querySelectorAll("[data-sm]")];
  for (let i = 0; i < smilies.length; i++) {
    const sm = smilies[i];
    sm.innerHTML = "";
    sm.dataset.noload = !0;
  }
  el.style.position = "relative";
  glowEl.style.textShadow = MakeGlow(data.glow);
  glowEl.style["-webkit-text-fill-color"] = "transparent";
}
function createNameSm(parent, name, options = {}) {
  const {
    flags = 0,
    pawn: pawn,
    status = "",
    statusfx = "",
    userId: userId,
    xNum = 0,
    parent: parentEl,
    fromActions = !1,
    forceStatus = !1
  } = options;
  options.align3 = !0;
  options.align2 = !1;
  const processed = ProcessName(name = removeDodgy(name), flags | NamePowers.nospace, removeDodgy(status));
  if (fromActions) {
    processed.name = actions.stripParenthesesAndReduceString(processed.name);
  }
  if (forceStatus && status) {
    processed.status = status;
  }
  const textEl = createTextSm(parent, (pawn || "") + processed.name, options);
  if (processed.status) {
    const fxParts = statusfx ? statusfx.replaceAll("#", "").split(",") : [];
    const fxType = fxParts.length ? xInt(fxParts[0]) : 0;
    let fxData = {};
    if (fxParts.length && IsAnimationOn()) {
      try {
        let decodedFx = decodeURIComponent(escape(atob(fxParts[1])));
        if (!decodedFx.endsWith("}")) {
          decodedFx += "}";
        }
        fxData = JSON.parse(decodedFx);
      } catch (err) {
        fxData = {};
      }
    }
    parentEl.classList.add("hasStatus");
    const statusEl = makeElement(parent, "p", null, "status" + userId);
    statusEl.className = "visitorsStatus darkStatus";
    const statusTextEl = makeElement(statusEl, "p", null, "statusText" + userId);
    statusTextEl.style.display = "inline-block";
    if ("statusGlow" in processed) {
      statusEl.style["text-shadow"] = MakeGlow(processed.statusGlow);
    }
    if ("statusColor" in processed) {
      statusEl.style.color = "#" + toHex6(processed.statusColor);
    }
    if (xNum) {
      statusEl.style.left = "calc(1.2rem + 20px + .35rem)";
    }
    if (!_Activity?.instance?.IsClassic) {
      statusEl.style.top = "1rem";
    }
    createStatusfx(processed.status, fxData, userId, fxType, fxData.effect == "translucent" ? processed.statusGlow : null, statusEl, statusTextEl);
  }
  if (processed.grad) {
    const gradData = MakeGrad(processed.grad);
    textEl.classList.add("clip");
    textEl.style.backgroundImage = gradData[1];
    if (processed.grad.join("").toLowerCase().includes("o3")) {
      textEl.style.backgroundSize = "220% 100%";
    }
    if (gradData[0] && IsAnimationOn()) {
      textEl.className += " nameWave";
      textEl.style.animationDuration = gradData[0] + "s";
    }
    addGlow(textEl, processed, options);
    return textEl;
  }
  if (processed.flag) {
    const flagName = processed.flag[0] || "x";
    const ext = flagName == "jewel" ? "png" : "svg";
    const flagImg = new Image();
    flagImg.src = "/images/js/flag/" + flagName + "." + ext;
    flagImg.onload = ev => {
      textEl.classList.add("clip");
      nameFlag(processed.flag, textEl, ev.target, flags);
    };
    addGlow(textEl, processed, options);
    return textEl;
  }
  if (processed.glow || processed.glow == 0) {
    textEl.style.textShadow = MakeGlow(processed.glow);
  }
  if (processed.color) {
    textEl.style.color = "#" + toHex6(processed.color);
  }
  return textEl;
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
function Debounce(func) {
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
function getOccurrencesCount(sub, str) {
  return (str.match(new RegExp(sub, "g")) || []).length;
}
function runWhen(cond, func) {
  if (cond) {
    func();
  } else {
    window.setTimeout(() => runWhen(cond, func), 100);
  }
}
function createTextSm(parent, text, options = {}) {
  const {
    maxSmilies: maxSmilies = 10,
    flags: flags = 0,
    flags2: flags2 = 0,
    useMarkdown: useMarkdown,
    useLinks: useLinks,
    smClass: smClass = "messageSm",
    align2: align2,
    pawnFlags: pawnFlags,
    xNum: xNum = 0,
    pawnTooltip: pawnTooltip,
    scrollParent: scrollParent,
    userId: userId,
    userName: userName,
    useMark: useMark,
    className: className = "messageText",
    size: size = 20,
    align3: align3 = !0,
    relation: relation,
    flagPawn: flagPawn = "",
    hasBig: hasBig,
    showTooltip: showTooltip = !0,
    isName: isName = !1
  } = options;
  text = removeDodgy(text);
  parent.documentBody = document.body;
  let wordList = text.trim().split(/(\([a-zA-Z0-9].*?\)|<.*?>|[ \t]+)/).filter(word => word?.length);
  let prevWord = "";
  for (const i in wordList) {
    if (prevWord && wordList[i].startsWith("(") && prevWord.slice(-1) == "﻿") {
      wordList[i] = wordList[i].replace("(", "(﻿");
      prevWord = "";
    }
    prevWord = wordList[i];
  }
  const isOneBigSmiley = hasBig && wordList.length == 1 && wordList[0][0] == "(" && wordList[0].indexOf("#size#w") == -1;
  const showChatWords = _Activity.instance.UserSettings?.inappwords != "disable";
  const el = makeElement(parent, "span", className);
  el.holder = parent;
  if (flags & NamePowers.italic || text.substr(0, 6) == "<inf8>" || className != "userNick" && userId == 0) {
    el.style.fontStyle = "italic";
  }
  const stateTemplate = {
    bold: !1,
    italic: !1,
    strike: !1,
    quote: !1,
    quoteId: !1,
    hyperText: !1
  };
  let smCount = 0;
  let hasStyle = !1;
  let state = stateTemplate;
  let hyperTextBuffer = "";
  let quoteBuffer = "";
  let quoteDepth = 0;
  const hasMarkdownLinks = /\[.*?\]\(.*?\)/.test(text);
  for (let i = 0; i < wordList.length; i++) {
    let word = wordList[i];
    let skipSmilies = !1;
    let isWordLink = WordIsLink(word);
    if (useMarkdown) {
      let idx1 = 0;
      let idx2 = 0;
      let idxL = 0;
      let idxR = 0;
      if (hasMarkdownLinks && (state.hyperText || (idxL = word.indexOf("[")) != -1 && word.indexOf("❯") == -1)) {
        hasStyle = !0;
        if ((idxL = word.indexOf("](")) != -1 && (idxR = word.indexOf(")", idxL + 1)) > idxL && idxR - idxL > 1) {
          const parts = word.split("](");
          const subParts = parts[1].split(")");
          const bracketUrl = subParts[0];
          const linkData = WordIsLink(bracketUrl);
          if (linkData) {
            if (word.indexOf("[") != -1) {
              const textParts = parts[0].split("[");
              hyperTextBuffer += textParts[1];
              subParts[1] = textParts[0];
            } else {
              hyperTextBuffer += parts[0];
            }
            if (WordIsLink(hyperTextBuffer)) {
              const error = new Error("Could not use link markup, text is a URL");
              error.code = MessageErrorCodes.LinkInLinkMarkupDetected;
              return error;
            }
            const linkEl = makeElement(el, "a", "msgLink");
            linkEl.style.color = "#190046";
            addText(linkEl, hyperTextBuffer, !0);
            addToolTip(linkEl, linkData, {
              position: "low",
              instant: !0
            });
            if (linkData.c) {
              linkEl.style.color = linkData.c;
              if (linkData.l && !linkData.callBack) {
                linkEl.addEventListener("click", ev => {
                  ev.preventDefault();
                  handleLink(ev, linkData.l, userName);
                });
              } else {
                linkEl.addEventListener("click", linkData.callBack);
              }
            } else {
              linkEl.addEventListener("mousedown", ev => {
                ev.preventDefault();
                if (ev.which == 2) {
                  handleLink(ev, bracketUrl, userName);
                }
              });
              linkEl.addEventListener("click", ev => {
                ev.preventDefault();
                handleLink(ev, bracketUrl, userName);
              });
            }
            if (linkData.c) {
              linkEl.dataset.dark = true;
            } else {
              linkEl.dataset.dark2 = true;
            }
            state.hyperText = !1;
            numberOfHyperTexts++;
            isWordLink = !1;
            hyperTextBuffer = "";
            if (!(word = subParts[1])) {
              continue;
            }
          } else {
            if (hyperTextBuffer.length && hyperTextBuffer[0] != "[") {
              hyperTextBuffer = "[" + hyperTextBuffer;
            }
            state.hyperText = !1;
            word = "" + hyperTextBuffer + word;
            hyperTextBuffer = "";
            isWordLink = !1;
          }
        } else if (word.indexOf("[") != -1) {
          if (i != wordList.length - 1) {
            state.hyperText = !0;
            const bracketParts = word.split("[");
            hyperTextBuffer += bracketParts[1];
            word = bracketParts[0];
          }
        } else {
          state.hyperText = !0;
          hyperTextBuffer += word;
          if (i != wordList.length - 1) {
            continue;
          }
          state.hyperText = !1;
          word = "[" + hyperTextBuffer;
          hyperTextBuffer = "";
          isWordLink = !1;
        }
      }
      if (hasStyle && state.bold && state.bold || (idxL = word.indexOf("*")) != -1 && getOccurrencesCount("\\*", text) > 1) {
        if (!state.bold && (idxR = word.lastIndexOf("*")) > idxL && idxR - idxL > 1) {
          if (!isWordLink || idxL <= 0 || idxL <= 0 && idxR >= word.length - 1) {
            const starMatch = word.slice(idxL, idxR + 1);
            const content = starMatch.replace("*", "").replace(/\*$/, "");
            word = word.replace(starMatch, "<strong style=\"font-family: Arial Black, Arial Bold, Gadget, sans-serif; user-select: auto;\">" + content + "</strong>");
            hasStyle = !0;
            isWordLink &&= WordIsLink(content);
          }
        } else {
          hasStyle = !0;
          if (state.bold && word.indexOf("*") != -1) {
            state.bold = false;
          } else {
            state.bold = true;
          }
          const content = word.replace("*", "");
          word = "<strong style=\"font-family: Arial Black, Arial Bold, Gadget, sans-serif; user-select: auto;\">" + content + "</strong>";
          isWordLink &&= WordIsLink(content);
        }
      }
      if (hasStyle && state.italic || (idxL = word.indexOf("_")) != -1 && getOccurrencesCount("_", text) > 1) {
        if (!state.italic && (idxR = word.lastIndexOf("_")) > idxL && idxR - idxL > 1) {
          if ((!(idx1 = word[idxL - 1]) || idx1 == " ") && (!(idx2 = word[idxR + 1]) || idx2 == " ") && (!isWordLink || idxL <= 0 || idxL <= 0 && idxR >= word.length - 1)) {
            const underscoreMatch = word.slice(idxL, idxR + 1);
            const content = underscoreMatch.replace("_", "").replace(/_$/, "");
            word = word.replace(underscoreMatch, "<em style='user-select: auto;'>" + content + "</em>");
            hasStyle = !0;
            isWordLink &&= WordIsLink(content);
          }
        } else {
          hasStyle = !0;
          if (state.italic && word.indexOf("_") != -1) {
            state.italic = false;
          } else {
            state.italic = true;
          }
          const content = word.replace("_", "");
          word = "<em style='user-select: auto;'>" + content + "</em>";
          isWordLink &&= WordIsLink(content);
        }
      }
      if (hasStyle && state.strike || (idxL = word.indexOf("~")) != -1 && getOccurrencesCount("~", text) > 1) {
        if (!state.strike && (idxR = word.lastIndexOf("~")) > idxL && idxR - idxL > 1) {
          if (!isWordLink || idxL <= 0 || idxL <= 0 && idxR >= word.length - 1) {
            const tildeMatch = word.slice(idxL, idxR + 1);
            const content = tildeMatch.replace("~", "").replace(/~$/, "");
            word = word.replace(tildeMatch, "<del style='user-select: auto;'>" + content + "</em>");
            hasStyle = !0;
            isWordLink &&= WordIsLink(content);
          }
        } else {
          hasStyle = !0;
          if (state.strike && word.indexOf("~") != -1) {
            state.strike = false;
          } else {
            state.strike = true;
          }
          const content = word.replace("~", "");
          word = "<del style='user-select: auto;'>" + content + "</del>";
          isWordLink &&= WordIsLink(content);
        }
      }
      if (state.quote || quoteDepth < 1 && (idxL = word.indexOf("❯[")) != -1 && word.indexOf("❯#") == -1) {
        if (!state.quote && (idxR = word.indexOf("]", idxL + 1)) > idxL && idxR - idxL > 1) {
          quoteDepth++;
          let qMatch = word.slice(idxL, idxR + 1);
          qMatch = cleanXatTagsIcons(qMatch);
          word = word.replace(qMatch, "<p class=\"blockquote\"><span class=\"pill\"></span>" + qMatch.replace("❯[", "").replace("]", "") + "</p>");
          skipSmilies = hasStyle = !0;
        } else {
          hasStyle = !0;
          if (word.indexOf("[") != -1) {
            if (i != wordList.length - 1) {
              state.quote = !0;
              const qParts = word.split("❯[");
              quoteBuffer += qParts[1].replace("❯[", "");
              word = qParts[0] + "<p class=\"blockquoteContent\"></p>";
            }
          } else if (word.indexOf("]") != -1) {
            quoteDepth++;
            const qEndParts = word.split("]");
            quoteBuffer += qEndParts[0];
            quoteBuffer = cleanXatTagsIcons(quoteBuffer);
            el.querySelector(".blockquoteContent").insertAdjacentHTML("beforeend", "<p class=\"blockquote\"><span class=\"pill\"></span>" + quoteBuffer + "</p>");
            state.quote = !1;
            quoteBuffer = "";
            if (isWordLink && qEndParts[1]) {
              isWordLink = WordIsLink(qEndParts[1]);
            }
            if (!(word = qEndParts[1])) {
              continue;
            }
          } else {
            state.quote = !0;
            quoteBuffer += word;
            if (i != wordList.length - 1) {
              continue;
            }
            state.quote = !1;
            word = "❯[" + quoteBuffer;
          }
        }
      }
      if (state.quoteId || quoteDepth < 1 && (idxL = word.indexOf("❯#")) != -1 && word.indexOf("[") != -1) {
        if (!state.quoteId && (idxR = word.indexOf("]", idxL + 1)) > idxL && idxR - idxL > 1) {
          quoteDepth++;
          let qIdMatch = word.slice(idxL, idxR + 1);
          qIdMatch = cleanXatTagsIcons(qIdMatch);
          word = word.replace(qIdMatch, "<p class=\"blockquote\"><span class=\"pill\"></span>" + qIdMatch.replace(/(❯#.*?)\[/, "").replace("]", "") + "</p>");
          skipSmilies = hasStyle = !0;
        } else {
          hasStyle = !0;
          if (word.indexOf("[") != -1) {
            if (i != wordList.length - 1) {
              state.quoteId = !0;
              const qIdParts = word.split(/❯#.*?\[/);
              const qId = word.match(/❯#(.*?)\[/)[1];
              quoteBuffer += qIdParts[1].replace(/(❯#.*?)\[/, "");
              word = qIdParts[0] + "<p class=\"blockquoteContent\" data-quote=\"" + qId + "\"></p>";
            }
          } else if (word.indexOf("]") != -1) {
            quoteDepth++;
            const qIdEndParts = word.split("]");
            quoteBuffer += qIdEndParts[0].replace(/\(.*?\)/g, "");
            quoteBuffer = cleanXatTagsIcons(quoteBuffer);
            const qEl = el.querySelector(".blockquoteContent");
            qEl.insertAdjacentHTML("beforeend", "<p class=\"blockquote\"><span class=\"pill\"></span>" + quoteBuffer + "</p>");
            if (isWordLink && qIdEndParts[1]) {
              isWordLink = WordIsLink(qIdEndParts[1]);
            }
            let sourceMsg = document.querySelector("[data-msgid=\"" + qEl.dataset.quote + "\"]");
            if (sourceMsg) {
              addToolTip(qEl, ["mob2.originalmsg", "Go to original message"], {
                position: "low"
              });
              qEl.addEventListener("click", ev => {
                if (sourceMsg) {
                  sourceMsg.scrollIntoView({
                    behavior: "smooth",
                    block: "end"
                  });
                }
              });
            }
            state.quoteId = !1;
            quoteBuffer = "";
            if (!(word = qIdEndParts[1])) {
              continue;
            }
          } else {
            state.quoteId = !0;
            quoteBuffer += word;
            quoteBuffer = cleanXatTagsIcons(quoteBuffer);
            if (i != wordList.length - 1) {
              continue;
            }
            {
              const currQEl = el.querySelector(".blockquoteContent");
              state.quoteId = !1;
              word = "❯#" + currQEl.dataset.quote + "[" + quoteBuffer;
            }
          }
        }
      }
    }
    if (!useLinks || !isWordLink || isWordLink[0] == "(" && isWordLink[isWordLink.length - 1] == ")") {
      if (word.length > 2) {
        let smName = word;
        const smMatch = word.match(/(\(.*?\))/);
        if (smMatch) {
          smName = smMatch[1];
        }
        if (smName[0] == "(" && smName[smName.length - 1] == ")" && smName[1] != "﻿" && smName[1] != " ") {
          if (smCount == maxSmilies || word.toLowerCase() == "(glow)" || word.toLowerCase() == "(none)" || word.toLowerCase().indexOf("(none#") >= 0 || word.toLowerCase().indexOf("(glow#") >= 0) {
            continue;
          }
          const isPawnSm = smName.substr(0, 3) == "(p1";
          let smTooltip = isPawnSm ? pawnTooltip : smName;
          let smTooltipPos = isPawnSm ? "left" : "top";
          const smObj = _Activity.instance.Smilies.MakeSmiley(el, smName, {
            size: isOneBigSmiley ? size * 2 : size,
            align2: align2,
            align3: align3,
            addGback: !0,
            userID: userId,
            showAd: !isPawnSm,
            userName: userName,
            scrollParent: scrollParent,
            className: smClass + (isOneBigSmiley ? " big" : ""),
            _window: window,
            applyEffects: !isPawnSm && getSettingsValue("ultrasmiley") === "enable",
            pawnFlags: isPawnSm ? pawnFlags : 0,
            tooltip: showTooltip || isPawnSm ? smTooltip : "",
            tooltipPosition: smTooltipPos,
            isName: isName
          });
          if (isPawnSm) {
            const isBffed = pawnFlags & PawnFlags.isBffed;
            const isMarried = pawnFlags & PawnFlags.isMarried;
            let pawnStuffEl = smObj.querySelector(".pawnStuff");
            pawnStuffEl ||= makeElement(smObj, "div", "pawnStuff");
            pawnStuffEl.innerHTML = "";
            if (xNum) {
              _Activity.instance.Smilies.MakeSmiley(el, xNum, {
                size: 20,
                userID: userId,
                userName: userName,
                scrollParent: scrollParent,
                tooltip: ["box.143", "On App"],
                tooltipPosition: "left",
                showAd: false,
                className: "appIcon",
                align2: align2,
                align3: align3,
                callback: ev => {
                  const userParams = {
                    id: userId,
                    regname: userName
                  };
                  ev.stopPropagation();
                  if (xNum.indexOf("#") >= 0) {
                    openApp(xNum.split("#")[0]);
                  } else if (xNum == 10001) {
                    openApp({
                      type: "media",
                      link: null
                    });
                  } else if (xNum == 20044) {
                    openGift(userParams);
                  } else {
                    openApp(appCodes[xNum]);
                  }
                }
              });
            }
            if (pawnFlags & PawnFlags.isInvisible) {
              smObj.style.opacity = 0.35;
            } else {
              smObj.style.opacity = 1;
            }
            if (flags2 & NamePowers.isBlocked) {
              makeElement(pawnStuffEl, "img", "blockIcon").src = "svg/report2.svg";
            } else {
              if (flagPawn) {
                _Activity.instance.Smilies.MakeSmiley(pawnStuffEl, "(tickle#flgpwn#w" + flagPawn + ")", {
                  size: 20,
                  align2: align2,
                  align3: align3,
                  userID: userId,
                  showAd: false,
                  userName: userName,
                  scrollParent: scrollParent,
                  className: "flagPawn"
                });
              }
              if (pawnFlags & PawnFlags.isAway) {
                _Activity.instance.Smilies.MakeSmiley(pawnStuffEl, "(tickle#away)", {
                  size: 20,
                  align2: align2,
                  align3: align3,
                  userID: userId,
                  showAd: false,
                  userName: userName,
                  scrollParent: scrollParent,
                  className: "away"
                });
              }
            }
            if (isMarried || isBffed) {
              let relUserEl;
              let relIconImg;
              if (relation) {
                relUserEl = document.querySelector("[data-user=\"" + relation + "\"]");
                const oldRelIcon = relUserEl.querySelector(".relIcon2");
                oldRelIcon?.parentNode.removeChild(oldRelIcon);
              }
              if (pawnFlags & PawnFlags.isBuddyAbove && isBffed) {
                relIconImg = makeElement(pawnStuffEl, "img", Classic ? "relIcon" : "relMob");
                relIconImg.src = "svg/bffed.svg";
                if (Classic && relUserEl?.classList.contains("hasStatus")) {
                  relIconImg.style.top = "-12px";
                }
              } else if (pawnFlags & PawnFlags.isBuddyAbove && isMarried) {
                relIconImg = makeElement(pawnStuffEl, "img", Classic ? "relIcon" : "relMob");
                relIconImg.src = "svg/married.svg";
                if (Classic && relUserEl?.classList.contains("hasStatus")) {
                  relIconImg.style.top = "-12px";
                }
              } else if (!!(pawnFlags & PawnFlags.isRegistered) && smName.indexOf("#frnt1#w128") == -1 && smName.indexOf("#frnt1#w288") == -1 && smName.indexOf("#frnt1#w272") == -1 && smName.indexOf("#frnt1#w32") == -1 && smName.indexOf("#frnt1#w16") == -1 && smName.indexOf("#frnt1w256") == -1 && !(pawnFlags & PawnFlags.isBuddyBelow) && !(pawnFlags & PawnFlags.isTyping) && !(pawnFlags & PawnFlags.isAway) && !(pawnFlags & PawnFlags.isGagged)) {
                if (isBffed) {
                  relIconImg = makeElement(pawnStuffEl, "img", "relIcon2");
                  relIconImg.src = "svg/bffed" + (pawnFlags & PawnFlags.isSubscriber ? "" : 2) + ".svg";
                } else if (isMarried) {
                  relIconImg = makeElement(pawnStuffEl, "img", "relIcon2");
                  relIconImg.src = "svg/married" + (pawnFlags & PawnFlags.isSubscriber ? "" : 2) + ".svg";
                }
              }
            }
          }
          smCount++;
          continue;
        }
        if (smName[0] == "#" && audiesList.includes(word.substr(1))) {
          const speakerEl = makeElement(makeElement(el, "span"), "img", "speaker");
          speakerEl.src = "svg/spk.svg";
          addToolTip(speakerEl, smName);
          speakerEl.addEventListener("click", ev => {
            doSound(smName.substr(1), !0);
          });
          continue;
        }
        let mark;
        const userMarks = JSON.parse(_Activity.instance.UserSettings?.marks?.replace(/”/g, "\"") ?? "{}");
        if (!useMark || skipSmilies || smName[0] != "<" || smName[1] != "s" || isNaN(smName[2])) {
          if (!skipSmilies && _Activity.instance.UserSettings?.marks?.length && hasPower(462) && useMark && smName.length > 2 && (mark = userMarks.find(m => smName.toLowerCase().indexOf(m.name.toLowerCase()) != -1))) {
            word = "<span class=\"highlight\" style=\"color: " + (isColorLight(mark.color) ? "#000" : "#FFF") + "; background: " + mark.color + ";\">" + word + "</span >";
          } else if (!hasStyle && smName[0] == "<" && smName[smName.length - 1] == ">") {
            const smOptions = {
              size: size,
              align: !0,
              scrollParent: scrollParent,
              className: "messageIcon"
            };
            _Activity.instance.Smilies.MakeSmiley(el, smName, smOptions);
            continue;
          }
        } else {
          word = "<span class=\"" + (!showChatWords || "swear" + smName[2]) + "\">" + smName.slice(3, -2) + "</span>";
        }
      }
      el.insertAdjacentHTML("beforeend", word);
    } else {
      const giphyLinkEl = makeElement(el, "a", "msgLink");
      giphyLinkEl.style.color = "#190046";
      let showGiphy = !1;
      if (_Activity?.instance?.QuickBar?.isGiphyLink(word)) {
        showGiphy = _Activity?.instance?.QuickBar?.getGifSettings() != "disable" && userName;
      }
      if (showGiphy) {
        giphyLinkEl.classList.add("d-none");
        giphyLinkEl.dataset.giphy = "1";
      }
      addText(giphyLinkEl, word, hasStyle);
      addEventToLink(isWordLink, giphyLinkEl, userName);
      if (isWordLink.c) {
        giphyLinkEl.dataset.dark = true;
      } else {
        giphyLinkEl.dataset.dark2 = true;
      }
    }
  }
  const swearEls = [...el.querySelectorAll("[class^=\"swear\"]")];
  for (let j = 0; j < swearEls.length; j++) {
    const swearEl = swearEls[j];
    swearEl.onclick = () => swearEl.className = "";
  }
  return el;
}
function addEventToLink(data, el, userName) {
  if (typeof data == "object") {
    el.style.color = data.c;
    if (data.l && !data.callBack) {
      el.addEventListener("click", ev => {
        ev.preventDefault();
        handleLink(ev, data.l, userName);
      });
    } else {
      el.addEventListener("click", data.callBack);
    }
  } else {
    el.addEventListener("mousedown", ev => {
      ev.preventDefault();
      if (ev.which == 2) {
        handleLink(ev, data, userName);
      }
    });
    el.addEventListener("click", ev => {
      ev.preventDefault();
      handleLink(ev, data, userName);
    });
  }
}
function createStatusfx(status, data, userId, pFlags, glow) {
  let {
    effect: effect,
    status2: status2 = "",
    speed: speed = 2,
    waveFrequency: waveFreq = 4
  } = data;
  const statusEl = userId === "new" ? document.querySelector("#statusNew") : document.querySelector("#statusText" + userId);
  const holder = statusEl.parentNode;
  statusEl.innerText = status;
  if (_Activity.instance.UserSettings?.statusfxAnim == "disable") {
    return;
  }
  status2 = status2.trim();
  status2 = status2.replace(new RegExp("['\"<>&=]", "gi"), "");
  speed = Math.max(1, Math.min(6, speed));
  waveFreq = Math.max(1, Math.min(6, waveFreq));
  const goldenRatio = Math.SQRT1_2 + 1;
  let width = statusEl.offsetWidth;
  if (width < 26) {
    width = 26;
  }
  let height = Math.ceil(statusEl.offsetHeight * goldenRatio);
  const holderWidth = statusEl.parentNode.offsetWidth;
  const animScale = goldenRatio ** speed + 1;
  let duration;
  let distX;
  let distY;
  const tick = 500;
  const hasPower = StatusEffects.some(fx => pFlags >= fx.set && effect == fx.key);
  if (effect && hasPower) {
    switch (effect) {
      case "scrollleft":
        const styleLeft = {
          transform: "translateX(" + holderWidth + "px)"
        };
        statusEl.parentNode.style.overflow = "hidden";
        duration = Math.round(width / animScale) * 1000;
        distX = Math.round(-width);
        statusEl.animate([styleLeft, {
          transform: "translateX(" + distX + "px)"
        }], {
          duration: duration,
          iterations: "Infinity"
        });
        break;
      case "scrollright":
        const styleRight = {
          transform: "translateX(" + holderWidth + "px)"
        };
        statusEl.parentNode.style.overflow = "hidden";
        duration = Math.round(width / animScale) * 1000;
        distX = Math.round(-width);
        statusEl.animate([{
          transform: "translateX(" + distX + "px)"
        }, styleRight], {
          duration: duration,
          iterations: "Infinity"
        });
        break;
      case "scrollup":
        statusEl.parentNode.style.overflow = "hidden";
        if (status2) {
          height = (height / goldenRatio + animScale) * 2;
          duration = Math.round(height / animScale) * 1000;
          distY = Math.round(-height);
          statusEl.animate([{
            transform: "translateY(" + -distY + "px)"
          }, {
            transform: "translateY(" + distY + "px)"
          }], {
            duration: duration,
            iterations: "Infinity"
          });
          const cloneEl = makeElement(statusEl, "p");
          cloneEl.style.cssText = "position: absolute; top: " + height * (goldenRatio - 1) + "px;";
          cloneEl.innerHTML = status2;
        } else {
          duration = Math.round(height / animScale) * 1000;
          distY = Math.round(-height);
          statusEl.animate([{
            transform: "translateY(" + -distY + "px)"
          }, {
            transform: "translateY(" + distY + "px)"
          }], {
            duration: duration,
            iterations: "Infinity"
          });
        }
        break;
      case "scrolldown":
        statusEl.parentNode.style.overflow = "hidden";
        if (status2) {
          height = (height / goldenRatio + animScale) * 2;
          duration = Math.round(height / animScale) * 1000;
          distY = Math.round(-height);
          statusEl.animate([{
            transform: "translateY(" + distY + "px)"
          }, {
            transform: "translateY(" + -distY + "px)"
          }], {
            duration: duration,
            iterations: "Infinity"
          });
          const cloneEl = makeElement(statusEl, "p");
          cloneEl.style.cssText = "position: absolute; top: -" + height * (goldenRatio - 1) + "px;";
          cloneEl.innerHTML = status2;
        } else {
          duration = Math.round(height / animScale) * 1000;
          distY = Math.round(-height);
          statusEl.animate([{
            transform: "translateY(" + distY + "px)"
          }, {
            transform: "translateY(" + -distY + "px)"
          }], {
            duration: duration,
            iterations: "Infinity"
          });
        }
        break;
      case "fadeout":
        const fadeTick = 500;
        const fadeMax = 3500;
        const fadeOutDur = fadeMax - speed * fadeTick;
        const fadeInDur = fadeMax - fadeTick * speed;
        if (status2) {
          statusEl.animate([{
            opacity: 1,
            offset: 0
          }, {
            opacity: 0,
            offset: fadeOutDur / (fadeOutDur + fadeInDur)
          }, {
            opacity: 0,
            offset: 1
          }], {
            duration: fadeOutDur + fadeInDur,
            iterations: "Infinity",
            direction: "alternate",
            delay: fadeInDur
          });
          const cloneEl = makeElement(statusEl.parentNode, "p");
          cloneEl.style.cssText = "position: absolute; top: 0; opacity: 0";
          cloneEl.innerHTML = status2;
          cloneEl.animate([{
            opacity: 0,
            offset: 0
          }, {
            opacity: 0,
            offset: 1 - fadeOutDur / (fadeOutDur + fadeInDur)
          }, {
            opacity: 1,
            offset: 1
          }], {
            duration: fadeOutDur + fadeInDur,
            iterations: "Infinity",
            direction: "alternate",
            delay: fadeInDur
          });
        } else {
          statusEl.animate([{
            opacity: 1
          }, {
            opacity: 0
          }], {
            duration: fadeOutDur,
            iterations: "Infinity",
            direction: "alternate"
          });
        }
        break;
      case "translucent":
        duration = Math.round(width / animScale) * 350;
        const baseColor = statusEl.parentNode.style.color ? statusEl.parentNode.style.color : document.body.classList.contains("dark") ? "rgb(207, 207, 207)" : "rgb(0, 0, 0)";
        const transColor = baseColor.replace(/rgb/, "rgba").replace(")", ", 0)");
        const glowStyle = MakeStatusGlow(glow);
        const animOptions = {
          duration: duration,
          iterations: "Infinity"
        };
        statusEl.parentNode.style.filter = "drop-shadow(" + glowStyle + ") drop-shadow(" + glowStyle + ")";
        statusEl.parentNode.style.textShadow = "";
        statusEl.style.cssText = "\n                    color: transparent;\n                    background: linear-gradient(90deg, " + baseColor + " 0%, " + transColor + " 30%, " + transColor + " 70%, " + baseColor + " 100%);\n                    background-size: 200%;\n                    background-clip: text;\n                    -webkit-background-clip: text;\n                ";
        statusEl.animate([{
          backgroundPosition: "200%"
        }, {
          backgroundPosition: "0%"
        }], animOptions);
        break;
      case "bounce":
        const margin = 20;
        const bounceDist = holderWidth - width - margin;
        if (bounceDist >= margin) {
          duration = bounceDist + 3500 / speed;
          statusEl.animate([{
            transform: "translateX(-5px)"
          }, {
            transform: "translateX(" + bounceDist + "px)"
          }], {
            duration: duration,
            iterations: "Infinity",
            direction: "alternate",
            easing: "ease-in-out"
          });
        }
        break;
      case "shake":
        const shakeInterval = 350;
        duration = shakeInterval * 7 - speed * shakeInterval + shakeInterval;
        const shakeScale = shakeInterval * 1.7;
        statusEl.animate([{
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
          offset: 1
        }], {
          duration: duration + shakeScale,
          iterations: "Infinity",
          direction: "alternate",
          easing: "ease-in-out"
        });
        break;
      case "wave":
        const waveAmp = 3;
        const waveScale = 10;
        const waveDensity = waveScale * 6 - (waveFreq - 1) * waveScale;
        duration = (waveAmp * 6 - speed * waveAmp + waveAmp) / 12;
        statusEl.innerHTML = "";
        statusEl.style.transform = "translateY(" + waveAmp / 2 + "px)";
        for (const char of status) {
          const charSpan = document.createElement("span");
          if (char === " ") {
            charSpan.innerHTML = "&nbsp;";
          } else {
            charSpan.textContent = char;
          }
          charSpan.style.cssText = "\n                        display: inline-block;\n                        animation-duration: " + duration + "s;\n                        animation-name: wave-" + userId + ";\n                        animation-iteration-count: infinite;\n                        animation-direction: alternate;\n                    ";
          statusEl.appendChild(charSpan);
        }
        document.styleSheets[0].insertRule("\n                    @keyframes wave-" + userId + " {\n                        from { transform : translateY(0); color: white; }\n                        to   { transform : translateY(-" + waveAmp + "px); }\n                    }\n                ", 0);
        for (let i = 0; i <= waveDensity; i++) {
          document.styleSheets[0].insertRule("\n                        #statusText" + userId + " :nth-child( " + waveDensity + "n + " + i + " ) {\n                            animation-delay : -" + (waveDensity - i) * 2 * duration / waveDensity + "s;\n                        }\n                    ", 0);
        }
        break;
      case "typing":
        const typingSpeed = 350 - speed * 50;
        statusEl.innerHTML = "";
        typeWrite(statusEl, [...status], [...status2], typingSpeed);
        makeElement(holder, "div", "caret");
        holder.style.marginTop = "-1px";
        statusEl.style.display = "inline-block";
        break;
      case "slideright":
        duration = (3500 - speed * tick + tick) * 2;
        statusEl.innerHTML = "";
        for (const [idx, char] of [...status].entries()) {
          const charSpan = makeElement(statusEl, "span");
          if (char === " ") {
            charSpan.innerHTML = "&nbsp;";
          } else {
            charSpan.textContent = char;
          }
          charSpan.style.cssText = "\n                        opacity: 0;\n                        display: inline-block;\n                        transform: translateX(-50px);\n                    ";
          charSpan.animate([{
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
            delay: (status.length - idx) * 100,
            endDelay: (status.length - idx) * 100,
            duration: duration,
            iterations: "Infinity",
            easing: "ease-out"
          });
        }
        break;
      case "slidedown":
        statusEl.parentNode.style.overflow = "hidden";
        duration = (3500 - speed * tick + tick) * 2;
        statusEl.innerHTML = "";
        for (const [idx, char] of [...status].entries()) {
          const charSpan = makeElement(statusEl, "span");
          if (char === " ") {
            charSpan.innerHTML = "&nbsp;";
          } else {
            charSpan.textContent = char;
          }
          charSpan.style.cssText = "\n                        opacity: 0;\n                        display: inline-block;\n                        transform: translateY(-50px);\n                    ";
          charSpan.animate([{
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
            delay: idx * 100,
            endDelay: (status.length - idx) * 100,
            duration: duration,
            iterations: "Infinity",
            easing: "ease-out"
          });
        }
        break;
      case "flip":
        duration = (3500 - speed * tick + tick) * 2;
        statusEl.innerHTML = "";
        for (const [idx, char] of [...status].entries()) {
          const charSpan = makeElement(statusEl, "span");
          if (char === " ") {
            charSpan.innerHTML = "&nbsp;";
          } else {
            charSpan.textContent = char;
          }
          charSpan.style.cssText = "\n                        display: inline-block;\n                        transform-origin: bottom;\n                        transform: rotateY(-90deg);\n                    ";
          charSpan.animate([{
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
            delay: idx * 100,
            endDelay: (status.length - idx) * 100,
            duration: duration,
            iterations: "Infinity",
            easing: "ease-out"
          });
        }
    }
  }
  return statusEl;
}
function typeWrite(el, charArr, backupArr, speed, idx = 0, dir = 1) {
  if (!document.body.contains(el)) {
    return;
  }
  if (dir == 1) {
    if (idx < charArr.length) {
      if (charArr[idx] === " ") {
        el.innerHTML += "&nbsp;";
      } else {
        el.textContent += charArr[idx];
      }
      setTimeout(() => typeWrite(el, charArr, backupArr, speed, idx + 1, 1), speed);
    } else {
      setTimeout(() => typeWrite(el, charArr, backupArr, speed, 0, -1), speed + 500);
    }
  } else if (idx <= charArr.length) {
    const subStr = charArr.slice(0, charArr.length - idx).join("");
    el.textContent = subStr;
    setTimeout(() => typeWrite(el, charArr, backupArr, speed, idx + 1, -1), speed);
  } else {
    setTimeout(() => typeWrite(el, backupArr, charArr, speed, 0, 1), speed + 500);
  }
}
function getTextWidth(text, font) {
  const ctx = (getTextWidth.canvas ||= document.createElement("canvas")).getContext("2d");
  ctx.font = font;
  return ctx.measureText(text).width;
}
function doAudies(ev) {
  if (ev && ev.target.dataset.sound) {
    doSound(ev.target.dataset.sound, true);
  }
}
function zapShake(isLaser, sound) {
  document.body.classList.add("bump");
  setTimeout(() => {
    document.body.classList.remove("bump");
  }, 1300);
  doSound(isLaser ? "laserfire3" : sound || "raspberry");
}
function handleLink(ev, url, userName) {
  if (url.substring(0, 14) == "xat://buy-xats") {
    openBuyPage(true);
  } else if (url.indexOf("youtu.be/") != -1 || url.indexOf("youtube.com/shorts/") != -1 || url.indexOf("youtube.com/watch?") != -1 && url.indexOf("v=") != -1 && !ev.ctrlKey) {
    displayVideo(url, userName);
  } else {
    LinkValidator(ev, url);
  }
}
function displayVideo(url, userName) {
  let ytSetting = _Activity?.instance?.UserSettings?.youtube;
  if (!_Activity?.instance?.IsClassic) {
    ytSetting = "popup";
  }
  if (ytSetting == "app") {
    openApp({
      type: "media",
      link: url.replace(/＆/g, "&")
    });
  } else {
    let vidId = null;
    let startTime = 0;
    let listId = null;
    let listIdx = 0;
    setAppIcon(10001);
    vidId = url.indexOf("youtu.be/") != -1 ? url.split(".be/")[1].split("?")[0] : url.indexOf("youtube.com/shorts/") != -1 ? url.split("/shorts/")[1].split("?")[0] : url.split("v=")[1].split("＆")[0].split("&")[0];
    if (url.indexOf("t=") != -1) {
      startTime = xInt(url.split("t=")[1].split("＆")[0].split("&")[0]);
    }
    if (url.indexOf("list=") != -1) {
      listId = url.split("list=")[1].split("＆")[0].split("&")[0];
      if (url.indexOf("index=") != -1) {
        listIdx = url.split("index=")[1].split("＆")[0].split("&")[0] - 1;
      }
    }
    resizeBtn = document.querySelector("#playerResize");
    playerToolBar = document.querySelector("#playerToolBar");
    playerContainer = document.querySelector("#playerContainer");
    let volume = _Activity.instance.Sound & 8 ? _Activity.instance.Volume[3] : 0;
    if (Player) {
      let titleEl = document.querySelector("#playerTitle");
      let titleText = GetTranslation("mob2.sentby") + " " + userName;
      titleText ||= "Sent by " + userName;
      titleEl.innerHTML = titleText;
      playerContainer.style.display = "block";
      if (listId) {
        Playlist = true;
        Player.loadPlaylist({
          list: listId,
          listType: "playlist",
          index: listIdx,
          startSeconds: startTime
        });
      } else {
        Playlist = false;
        Player.loadVideoById(vidId, startTime);
      }
      Player.setVolume(volume);
    } else {
      let scriptEl = document.createElement("script");
      scriptEl.src = "https://www.youtube.com/iframe_api";
      let firstScript = document.getElementsByTagName("script")[0];
      firstScript.parentNode.insertBefore(scriptEl, firstScript);
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
            onStateChange: event => {
              if (event.data == YT.PlayerState.ENDED && !Playlist) {
                setAppIcon(0);
                playerContainer.style.display = "none";
                Player.stopVideo();
              }
            },
            onError: error => {
              if (Playlist && vidId) {
                Playlist = false;
                Player.loadVideoById(vidId, startTime);
              }
            },
            onReady: ready => {
              playerContainer.style.display = "block";
              if (listId) {
                Playlist = true;
                Player.loadPlaylist({
                  list: listId,
                  listType: "playlist",
                  index: listIdx,
                  startSeconds: startTime
                });
              } else {
                Playlist = false;
                Player.loadVideoById(vidId, startTime);
              }
              Player.setVolume(volume);
            }
          }
        });
      };
      let titleEl = document.querySelector("#playerTitle");
      let titleText = GetTranslation("mob2.sentby") + " " + userName;
      titleText ||= "Sent by " + userName;
      if (titleEl) {
        titleEl.innerHTML = titleText;
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
      let closeBtn = document.querySelector("#playerClose");
      addToolTip(closeBtn, ["mob1.close", "Close"], {
        position: "low"
      });
      let settingsBtn = document.querySelector("#playerSet");
      if (settingsBtn) {
        addToolTip(settingsBtn, ["mob1.settings", "Settings"], {
          position: "low"
        });
        settingsBtn.addEventListener("click", () => {
          classicSetDialog("actions", config.MyId);
          classicSetDialog("settings", {
            tab: "appearance",
            UserNo: config.MyId
          });
        });
      }
      let switchBtn = document.querySelector("#playerSwitch");
      if (switchBtn) {
        addToolTip(switchBtn, ["mob1.switch", "Switch to media app"], {
          position: "low"
        });
        switchBtn.addEventListener("click", () => {
          let vidUrl = Player.getVideoUrl().replace(/＆/g, "&");
          playerContainer.style.display = "none";
          Player.stopVideo();
          openApp({
            type: "media",
            link: vidUrl
          });
        });
      }
      closeBtn.addEventListener("click", () => {
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
  var styleText;
  config.ButColW = config.ButColW ? config.ButColW : parent.config ? parent.config.ButColW : "";
  config.ButCol = config.ButCol ? config.ButCol : parent.config ? parent.config.ButCol : "";
  var classes = ["dialogTitleBar"];
  styleText = hasDarkMode() ? "color:#969696; background-color: #313131; background-image: linear-gradient(rgba(255, 255, 255, 5%), rgba(0, 0, 0, 5%));" : "color:#" + toHex6(config.ButColW) + "; background-color: #" + toHex6(config.ButCol);
  if (config.ButColW && config.ButCol) {
    let titles = document.getElementsByClassName("dialogTitle");
    for (let i = 0; i < titles.length; i++) {
      titles[i].style.cssText = "color:#" + (hasDarkMode() ? "969696" : toHex6(config.ButColW));
    }
    for (var key in classes) {
      var j;
      var elements = document.getElementsByClassName(classes[key]);
      for (j = 0; j < elements.length; j++) {
        elements[j].style.cssText = styleText;
      }
    }
  }
}
function powerAd(packName, powerId) {
  let topsh = TOPSH || _Activity.instance.xConsts?.topsh;
  if (!topsh || packName.toLowerCase() == "tickle") {
    return;
  }
  if (_Activity.instance.xConsts?.Stickers[powerId] || STICKERS && STICKERS[powerId]) {
    classicSetDialog("selector", {
      Type: "Stickers",
      Pack: packName,
      Config: config
    });
    return;
  }
  let powers = [packName];
  for (let key in topsh) {
    if (topsh[key] == powerId) {
      powers.push(key);
    }
  }
  if (powers.length > 14) {
    powers = powers.splice(0, 14);
  }
  const closeImgSrc = "svg/remove" + (config.ButColW && toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg";
  let closeImg = makeElement(null, "img");
  closeImg.src = closeImgSrc;
  closeImg.width = "16";
  closeImg.alt = "close";
  let dialog = makeElement(null, "div");
  let content = makeElement(dialog, "div", "modalDialogContentClassic gpModal");
  let titleBar = makeElement(content, "div", "dialogTitleBar");
  let titleTextEl = makeElement(titleBar, "span", "dialogTitle link", "openLink");
  makeElement(titleBar, "span", "dialogTitleAction", "id_ModalClose").appendChild(closeImg);
  let body = makeElement(content, "div", "dialogBody");
  let padding = makeElement(body, "div", "dialogPadding");
  let wrapper = makeElement(padding, "div", "", "wrapper");
  let actions = makeElement(body, "div", "dialogActions");
  let butContainer = makeElement(actions, "div", "butcontainer previewBut centered").appendChild(makeElement(null, "div", "butlayout", "actionButton"));
  titleTextEl.appendChild(document.createTextNode(packName.charAt(0).toUpperCase() + packName.slice(1)));
  content.dataset.w = 0.6;
  let reqPowers = [];
  let availablePawns = [];
  let superPowers = SUPERPOWERS || _Activity.instance.xConsts?.SuperPowers;
  if (SUPERPOWERS && SUPERPOWERS[powerId] || _Activity.instance.xConsts?.SuperPowers[powerId]) {
    butContainer.appendChild(document.createTextNode("Required Powers"));
    let superPawns = SUPERPAWNS || _Activity.instance.xConsts?.SuperPawns;
    for (let k in superPawns) {
      if (superPawns.hasOwnProperty(k) && superPawns[k] == powerId) {
        availablePawns.push(k);
      }
    }
    if (availablePawns.length > 28) {
      availablePawns = availablePawns.splice(0, 28);
    }
    for (let p in superPowers) {
      if (superPowers.hasOwnProperty(p) && p == powerId) {
        for (var i = 0; i < superPowers[p].length; i++) {
          reqPowers.push(PSSA[superPowers[p][i] + 1]);
        }
      }
    }
    let spDiv = makeElement(wrapper, "div", "superPowers");
    addText(makeElement(spDiv, "span", "spTitle"), "Available Pawns:");
  } else {
    let isGrpPower = ISGRP && ISGRP[powerId] || _Activity.instance.xConsts?.isgrp[powerId];
    addText(butContainer, powerId == 700 ? ["mob2.storesubnow", "Subscribe Now"] : ["mob1.storebuynow", "Buy Now"]);
    if (isGrpPower) {
      addText(makeElement(actions, "div", "butcontainer previewBut centered").appendChild(makeElement(null, "div", "butlayout", "gpButton")), ["mob1.assignunassign", "Assign/Unassign"]);
      actions.style.display = "flex";
    }
  }
  HiddenDivs.AlertDialog = dialog.innerHTML;
  doModal("AlertDialog");
  ColorTitle();
  setButCols(config.ButCol, config.ButColW);
  setCstyle();
  if (availablePawns.length > 0) {
    document.getElementById("openLink").innerHTML += " - COLLECTION";
    wrapper = document.querySelector("#wrapper");
    availablePawns.forEach((pName, idx) => {
      _Activity.instance.Smilies.MakeSmiley(wrapper, "p1" + pName + "##", {
        size: 40,
        className: "smileyPreview",
        align: true,
        tooltip: "(hat#h#" + pName + ")"
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
            Power: powerId
          });
          _Activity.instance.SetPage("store");
        }
      });
      wrapper.innerHTML = "";
      powers.forEach((pName, idx) => {
        document.querySelector("#box" + idx);
        _Activity.instance.Smilies.MakeSmiley(wrapper, pName, {
          size: 40,
          className: "smileyPreview",
          align: true,
          callback: () => smiliePressed("(" + pName + ")")
        });
      });
      let rpDiv = makeElement(wrapper, "div", "superPowers");
      addText(makeElement(rpDiv, "span", "spTitle"), "Required Powers:");
      reqPowers.forEach((spName, idx) => {
        _Activity.instance.Smilies.MakeSmiley(wrapper, spName, {
          size: 40,
          className: "smileyPreview",
          align: true
        });
      });
    });
  } else {
    wrapper = document.querySelector("#wrapper");
    powers.forEach((pName, idx) => {
      _Activity.instance.Smilies.MakeSmiley(wrapper, pName, {
        size: 40,
        className: "smileyPreview",
        align: true,
        callback: () => smiliePressed("(" + pName + ")")
      });
    });
    document.querySelector("#actionButton").parentNode.addEventListener("click", () => {
      if (Classic) {
        window.open("https://xat.com/" + (powerId == 700 ? "aces" : "store"), "_blank");
      } else {
        ToC({
          Command: "StartStore",
          Power: powerId
        });
        _Activity.instance.SetPage("store");
      }
    });
    if (document.querySelector("#gpButton")) {
      document.querySelector("#gpButton").parentNode.addEventListener("click", () => {
        _Activity.instance.QuickBar?.doGroupsPowers(false, packName);
      });
    }
  }
  document.querySelector("#openLink").addEventListener("click", () => {
    HitWiki(packName);
  });
  document.querySelector("#id_ModalClose").addEventListener("click", () => {
    modalClose();
  });
}
function doSound(sound, isAudie) {
  let soundUrl = isAudie && !_Activity?.instance?.IsIOSApp && Browser != "SF" ? "https://xat.com/content/sounds/audies/" + sound + ".webm" : "https://xat.com/web_gear/chat/snd/" + sound + ".mp3";
  new _Activity.instance.Window.Howl({
    src: [soundUrl],
    volume: sound == "laserfire3" ? 1 : _Activity.instance.Volume[1] / 100
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
function playerDrag(ev) {
  if (active) {
    ev.preventDefault();
    hideTooltip();
    let winW = document.body.clientWidth;
    let winH = document.body.clientHeight;
    let deltaX = 0;
    let deltaY = 0;
    if (ev.type === "touchmove") {
      deltaX = ev.touches[0].clientX - initialX;
      deltaY = ev.touches[0].clientY - initialY;
      currentX = Math.min(winW + tolerance, Math.max(-tolerance, deltaX));
      currentY = Math.min(winH + tolerance, Math.max(-tolerance, deltaY));
    } else {
      deltaX = ev.clientX - initialX;
      deltaY = ev.clientY - initialY;
      currentX = Math.min(winW + tolerance, Math.max(-tolerance, deltaX));
      currentY = Math.min(winH + tolerance, Math.max(-tolerance, deltaY));
      if (ev.clientX < -tolerance || ev.clientY < -tolerance || ev.clientX > winW + tolerance || ev.clientY > winH + tolerance) {
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
    let deltaW = 0;
    let deltaH = 0;
    if (ev.type === "touchmove") {
      deltaW = posX - ev.touches[0].clientX;
      posX = ev.touches[0].clientX;
      deltaH = posY - ev.touches[0].clientY;
      posY = ev.touches[0].clientY;
    } else {
      deltaW = posX - ev.clientX;
      posX = ev.clientX;
      deltaH = posY - ev.clientY;
      posY = ev.clientY;
    }
    let minW = 200;
    let maxW = 500;
    let newW = parseInt(getComputedStyle(Player.getIframe(), "").width) + deltaW;
    let newH = parseInt(getComputedStyle(Player.getIframe(), "").height) + deltaH;
    if (newW > maxW || newW < minW) {
      deltaW = 0;
      newW = parseInt(getComputedStyle(Player.getIframe(), "").width);
    }
    if (newH > 281 || newH < 112) {
      deltaH = 0;
      newH = parseInt(getComputedStyle(Player.getIframe(), "").height);
    }
    if (newW > maxW && newH > 281 || newW < minW && newH < 112) {
      deltaW = 0;
      newW = parseInt(getComputedStyle(Player.getIframe(), "").width);
      deltaH = 0;
      newH = parseInt(getComputedStyle(Player.getIframe(), "").height);
    }
    Player.getIframe().style.width = newW + "px";
    playerContainer.style.left = parseInt(playerContainer.style.left) - deltaW + "px";
    Player.getIframe().style.height = newH + "px";
    playerContainer.style.top = parseInt(playerContainer.style.top) - deltaH + "px";
  }
}
function playerDragEnd(ev) {
  posX = 0;
  posY = 0;
  active = !1;
  active2 = !1;
  positionPlayer();
  initialX = currentX;
  initialY = currentY;
  if (ev.target === playerToolBar) {
    addToolTip(playerToolBar, minimized ? ["mob2.minimize", "Double-click to minimize"] : ["mob2.maximize", "Double-click to maximize"], {
      position: "low"
    });
  }
  if (ev.target === resizeBtn) {
    addToolTip(resizeBtn, ["mob2.resize", "Drag to resize"], {
      position: "low"
    });
  }
}
function playerDragStart(ev) {
  xOffset = playerContainer.offsetLeft;
  yOffset = playerContainer.offsetTop;
  if (ev.type === "touchstart") {
    initialX = ev.touches[0].clientX - xOffset;
    initialY = ev.touches[0].clientY - yOffset;
    posX = ev.touches[0].clientX;
    posY = ev.touches[0].clientY;
  } else {
    initialX = ev.clientX - xOffset;
    initialY = ev.clientY - yOffset;
    posX = ev.clientX;
    posY = ev.clientY;
  }
  if (ev.target === playerToolBar) {
    active = true;
    active2 = false;
  }
  if (ev.target === resizeBtn) {
    active2 = true;
    active = false;
  }
}
function positionPlayer(inX, inY) {
  let elW = playerContainer.clientWidth;
  let elH = playerContainer.clientHeight;
  let bodyW = document.body.clientWidth;
  let bodyH = document.body.clientHeight;
  let finalX = 0;
  let finalY = 0;
  if (inX && inY) {
    finalX = Math.min(bodyW - elW, Math.max(0, inX));
    finalY = Math.min(bodyH - elH, Math.max(0, inY));
  } else {
    finalX = Math.min(bodyW - elW, Math.max(0, parseInt(getComputedStyle(playerContainer, "").left)));
    finalY = Math.min(bodyH - elH, Math.max(0, parseInt(getComputedStyle(playerContainer, "").top)));
  }
  if (!minimized) {
    playerContainer.style.top = finalY + "px";
  }
  playerContainer.style.left = finalX + "px";
}
function setButCols(col1, col2) {
  col1 ||= 80;
  col2 ||= 16777215;
  var css = "color:#" + toHex6(col2) + "; background-color: #" + toHex6(col1);
  var classes = ["butcontainer"];
  for (var key in classes) {
    var i;
    var elements = document.getElementsByClassName(classes[key]);
    for (i = 0; i < elements.length; i++) {
      elements[i].style.cssText = css;
    }
  }
}
function getTooltipInfo(data) {
  if (data.id == config.MyId || data.id == "2") {
    return ["box.18", "Change your name, avatar and home page"];
  }
  if (xInt(data.id) != 0) {
    let userId = data.id;
    if (userId.substr(-9, 9) == "000000000") {
      userId = userId.substr(0, userId.length - 9) + "B";
    } else if (userId.substr(-6, 6) == "000000") {
      userId = userId.substr(0, userId.length - 6) + "M";
    }
    let text = data.registered || data.regname;
    text ||= userId;
    if (data.status && data.status.length > 0 && data.pFlags & NamePowers.status) {
      if (data.status.indexOf("#") != -1) {
        text += "<br>" + data.status.split("#")[0];
      } else {
        text += "<br>" + data.status;
      }
    }
    if (xInt(data.id) < 100) {
      text += "<br>(xat staff)";
    } else {
      text += "<br>(NOT xat staff)";
    }
    return ["box.16", "Interact with $1", text];
  }
}
function addToolTip(targetEl, hint, options = {}) {
  let {
    select: select,
    position: position,
    maxWidth: maxWidth,
    Rect: rect,
    showRapid: showRapid,
    shortTime: shortTime,
    dom: dom,
    timestamp: timestamp,
    instant: instant
  } = options;
  if (!targetEl || hint.length == 0) {
    return;
  }
  if (position != "pointer") {
    targetEl.style.cursor = "pointer";
  }
  targetEl.style["pointer-events"] = "auto";
  dom ||= document;
  let delay = instant ? 1 : shortTime ? 500 : 1000;
  if (timestamp && !targetEl.dataset.timestamp) {
    targetEl.dataset.timestamp = timestamp;
  }
  targetEl.addEventListener(_Activity.instance.IsClassic ? "mouseenter" : "mousedown", ev => {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }
    timeoutId = window.setTimeout(() => {
      if (!targetEl.dataset.key || !!document.querySelector("[data-key=\"" + targetEl.dataset.key + "\"]")) {
        hideTooltip();
        if (targetEl.dataset.timestamp && !showRapid) {
          hint = GetTimeToGo(targetEl.dataset.timestamp);
        }
        tooltip = (ev.ctrlKey || ev.metaKey) && showRapid ? addHintText(ev, "Rapid: " + Macros.rapid, position, maxWidth, rect, dom) : addHintText(ev, hint, position, maxWidth, rect, dom);
        if (select) {
          tooltip.addEventListener("mouseenter", () => {
            window.clearTimeout(timeoutId);
          });
        }
        if (showRapid) {
          dom.onkeydown = keyEv => {
            if (keyEv.ctrlKey || keyEv.key == "Control") {
              let ttEl = dom.querySelector("#tooltips");
              if (ttEl) {
                ttEl.parentNode.removeChild(ttEl);
              }
              tooltip = addHintText(ev, "Rapid: " + Macros.rapid, position, maxWidth, rect, dom);
            }
          };
          dom.onkeyup = keyEv => {
            if (!keyEv.ctrlKey && keyEv.key == "Control") {
              let ttEl = dom.querySelector("#tooltips");
              if (ttEl) {
                ttEl.parentNode.removeChild(ttEl);
              }
              tooltip = addHintText(ev, hint, position, maxWidth, rect, dom);
            }
          };
        }
        dom.addEventListener("click", clickEv => {
          if (clickEv.target != tooltip) {
            hideTooltip();
          }
        });
        tooltip.addEventListener("mouseleave", () => {
          window.clearTimeout(timeoutId);
          timeoutId = window.setTimeout(() => {
            let ttEl = dom.querySelector("#tooltips");
            if (ttEl) {
              ttEl.parentNode.removeChild(ttEl);
            }
            tooltip = null;
          }, 100);
        });
        if (select) {
          tooltip.addEventListener("click", () => {
            if (dom.body.createTextRange) {
              const range = dom.body.createTextRange();
              range.moveToElementText(tooltip);
              range.select();
            } else if (window.getSelection) {
              const sel = window.getSelection();
              const range = dom.createRange();
              range.selectNodeContents(tooltip);
              sel.removeAllRanges();
              sel.addRange(range);
            }
          });
        }
      }
    }, tooltip ? 0 : delay);
  });
  targetEl.addEventListener("mouseleave", () => {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }
    if (showRapid) {
      dom.onkeyup = null;
      dom.onkeydown = null;
    }
    timeoutId = window.setTimeout(() => {
      let ttEl = dom.querySelector("#tooltips");
      if (ttEl) {
        ttEl.parentNode.removeChild(ttEl);
      }
      tooltip = null;
    }, 500);
  });
}
function hideTooltip() {
  tooltip = null;
  let ttEl = document.querySelector("#tooltips");
  if (ttEl) {
    ttEl.parentNode.removeChild(ttEl);
  }
}
function openGift(userId) {
  if (userId) {
    if (_Activity.instance.IsClassic) {
      const appFrameWin = document.getElementById("appframe")?.contentWindow;
      if (!appFrameWin || !appFrameWin?.document) {
        return;
      }
      const dialogBody = appFrameWin.document.querySelector(".dialogBody");
      if (dialogBody) {
        dialogBody.style.height = "90%";
      }
      appFrameWin?.classicSetDialog("selector", {
        Type: "Gifts",
        UserNo: userId
      });
      return;
    }
    classicSetDialog("selector", {
      Type: "Gifts",
      UserNo: userId
    });
  }
}
function GetRealBack(bgUrl, isLandscape, winH, isFixed) {
  if (!bgUrl) {
    return "";
  }
  if (bgUrl.charAt(0) == "h") {
    return "url(\"" + (isLandscape ? SafeImage(bgUrl, 1136, 640) : SafeImage(bgUrl, 640, winH, isFixed)) + "\") no-repeat 0 0 / cover fixed";
  }
  return bgUrl;
}
function LoadBackground(bgStr) {
  let landscapeMode;
  let portraitMode;
  let parts = bgStr.split(";=");
  bgStr = config.xatback;
  let heightVal = 1136;
  let pageName = config.page;
  let isFixedVal = !1;
  var isFlixActive = _Activity.IsFlixActive && _Activity.IsFlixVisible;
  var chatId = _Activity.CurrentChat;
  pageName ||= _Activity.instance.CurrentPage;
  switch (pageName) {
    case "visitors":
    case "messages":
    case "classic":
      if (parts[1] && parts[2]) {
        const bgParts = parts[2].split(",");
        isFlixActive = !1;
        if ((bgStr = bgParts[0]).substring(0, 4) === "http") {
          isFixedVal = parseInt(bgParts[1]) === 1;
          if (window?.innerHeight > 0 && isFixedVal) {
            heightVal = window.innerHeight;
          }
        } else if (/(^[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(bgStr)) {
          bgStr = "#" + bgStr;
        }
      } else if (!_Activity.instance.IsLandscape && !Classic && parts[9].length > 0) {
        bgStr = parts[9];
        landscapeMode = 1;
        isFlixActive = false;
      } else if (_Activity.instance.IsLandscape && !Classic && parts[10].length > 0) {
        bgStr = parts[10];
        portraitMode = 1;
        isFlixActive = false;
      } else {
        bgStr = parts[3];
        chatId = _Activity.FlixChatId;
      }
  }
  _Activity.FlixBackground = GetRealBack(parts[3], landscapeMode, heightVal, !1);
  var handleFlixResult = !1;
  if (!isFlixActive) {
    handleFlixResult = HandleFlix(chatId);
  }
  if (!isFlixActive && !handleFlixResult) {
    document.body.style.background = GetRealBack(bgStr, landscapeMode, heightVal, isFixedVal);
    if (!Classic) {
      document.body.style.backgroundPosition = "left";
    }
  }
}
function calcAvSize(size) {
  if (size <= 30) {
    return 30;
  } else if (size <= 35) {
    return 35;
  } else if (size <= 80) {
    return 80;
  } else if (size == 100) {
    return 100;
  } else if (size <= 160) {
    return 160;
  } else if (size <= 320) {
    return 320;
  } else {
    return 640;
  }
}
function calcStripSize(size) {
  if (size <= 20) {
    return 20;
  } else if (size <= 30) {
    return 30;
  } else if (size <= 35) {
    return 35;
  } else if (size <= 40) {
    return 40;
  } else if (size <= 80) {
    return 80;
  } else {
    return 160;
  }
}
function addHintText(ev, hint, position, maxWidth, rect, dom) {
  if (hint && hint.length == 0) {
    return;
  }
  let ttEl = dom.querySelector("#tooltips");
  if (ttEl) {
    ttEl.parentNode.removeChild(ttEl);
  }
  ttEl = makeElement(null, "div", "", "tooltips");
  dom.body.prepend(ttEl);
  let tooltip = makeElement(ttEl, "div", "tooltip");
  if (maxWidth) {
    tooltip.style["max-width"] = "50%";
  }
  addText(tooltip, hint, !0);
  var targetRect = rect ? rect.getBoundingClientRect() : ev.target.getBoundingClientRect();
  switch (position) {
    case "left":
      tooltip.style.top = targetRect.top + "px";
      tooltip.style.left = Math.min(targetRect.left) - tooltip.clientWidth - 10 + "px";
      if (tooltip.getBoundingClientRect().left < 15) {
        tooltip.style.left = "15px";
      } else if (tooltip.getBoundingClientRect().right >= window.innerWidth) {
        tooltip.style.left = window.innerWidth - tooltip.getBoundingClientRect().width - 15 + "px";
      }
      break;
    case "right":
      tooltip.style.top = targetRect.top + "px";
      tooltip.style.left = targetRect.width - (tooltip.clientWidth - 5) + "px";
      if (tooltip.getBoundingClientRect().right < 15) {
        tooltip.style.right = "15px";
      } else if (tooltip.getBoundingClientRect().right >= window.innerWidth) {
        tooltip.style.right = window.innerWidth - tooltip.getBoundingClientRect().width - 15 + "px";
      }
      break;
    case "low":
      tooltip.style.top = targetRect.top - 30 + "px";
      tooltip.style.left = targetRect.left + Math.abs(targetRect.left - targetRect.right) / 2 - tooltip.clientWidth / 2 + "px";
      if (tooltip.getBoundingClientRect().left < 15) {
        tooltip.style.left = "15px";
      } else if (tooltip.getBoundingClientRect().right >= window.innerWidth) {
        tooltip.style.left = window.innerWidth - tooltip.getBoundingClientRect().width - 15 + "px";
      }
      break;
    case "bottom":
      tooltip.style.top = "58px";
      tooltip.style.left = targetRect.left + Math.abs(targetRect.left - targetRect.right) / 2 - tooltip.clientWidth / 2 + "px";
      if (tooltip.getBoundingClientRect().left < 15) {
        tooltip.style.left = "15px";
      } else if (tooltip.getBoundingClientRect().right >= window.innerWidth) {
        tooltip.style.left = window.innerWidth - tooltip.getBoundingClientRect().width - 25 + "px";
      }
      break;
    case "pointer":
      tooltip.style.top = targetRect.top - 30 + "px";
      tooltip.style.left = ev.clientX + "px";
      if (tooltip.getBoundingClientRect().left < 15) {
        tooltip.style.left = "15px";
      } else if (tooltip.getBoundingClientRect().right >= window.innerWidth) {
        tooltip.style.left = window.innerWidth - tooltip.getBoundingClientRect().width - 15 + "px";
      }
      break;
    case "top-tall":
      tooltip.style.top = targetRect.top - tooltip.getBoundingClientRect().height - 10 + "px";
      tooltip.style.left = targetRect.left + Math.abs(targetRect.left - targetRect.right) / 2 - tooltip.clientWidth / 2 + "px";
      if (tooltip.getBoundingClientRect().left < 15) {
        tooltip.style.left = "15px";
      } else if (tooltip.getBoundingClientRect().right >= window.innerWidth) {
        tooltip.style.left = window.innerWidth - (tooltip.getBoundingClientRect().width - 15) * 2 + "px";
      }
      if (xInt(tooltip.style.left) <= 0) {
        tooltip.style.left = "15px";
      }
      break;
    default:
      tooltip.style.top = targetRect.top - 50 + "px";
      tooltip.style.left = targetRect.left + Math.abs(targetRect.left - targetRect.right) / 2 - tooltip.clientWidth / 2 + "px";
      if (tooltip.getBoundingClientRect().left < 15) {
        tooltip.style.left = "15px";
      } else if (tooltip.getBoundingClientRect().right >= window.innerWidth) {
        tooltip.style.left = window.innerWidth - tooltip.getBoundingClientRect().width - 15 + "px";
      }
      if (xInt(tooltip.style.left) <= 0) {
        tooltip.style.left = "15px";
      }
  }
  if (tooltip.getBoundingClientRect().top < 0) {
    tooltip.style.top = "5px";
  }
  return tooltip;
}
var LangFiles = _Activity.instance?.LangFiles ?? {};
function TranslateNodes(el, file) {
  if (!file) {
    return;
  }
  var hasLang = !1;
  for (var key in LangFiles) {
    if (LangFiles[key]) {
      hasLang = !0;
      break;
    }
  }
  let customLang;
  if (file == "box" && _Activity.instance.CustomGroupLang) {
    customLang = _Activity.instance.CustomGroupLang;
    hasLang = true;
  }
  if (hasLang) {
    var translated;
    var node;
    var localizeParts;
    var nodes = el.querySelectorAll("[data-localize]");
    var len = nodes.length;
    for (key = 0; key < len; ++key) {
      if (file == (localizeParts = (node = nodes[key]).getAttribute("data-localize").split("."))[0]) {
        translated = LangFiles[localizeParts[0]][localizeParts[1]];
        if (customLang && customLang[localizeParts[1]]) {
          translated = customLang[localizeParts[1]];
        }
        if (translated) {
          changeText(node, translated, true);
        }
      }
    }
  }
}
function GotLang(langData) {
  for (var key in langData) {
    if (langData[key]) {
      LangFiles[key] = langData[key];
    }
  }
  Translate(langData);
  let frameWin = document.getElementById("appframe")?.contentWindow;
  if (frameWin && frameWin.Translate) {
    frameWin.Translate(langData);
  }
}
function LoadLangAll(translateAfter = false) {
  LoadLang({
    box: 0,
    mob2: 0,
    mob1: 0,
    login: 0
  }, !1, translateAfter);
}
function TranslateAll() {
  Translate({
    box: 0,
    mob2: 0,
    mob1: 0,
    login: 0
  });
}
function Translate(files) {
  for (let key in files) {
    if (LangFiles[key]) {
      TranslateNodes(document, key);
    }
  }
}
function LoadLang(files, lang, translateAfter) {
  if (lang) {
    Language = lang;
    _Activity.instance.LangFiles = {};
    LangFiles = {};
  }
  for (let key in files) {
    loadJSON(xatdomain + "/json/lang/getlang2.php?f=" + key + "&l=" + Language, GotLang);
  }
  if (translateAfter) {
    TranslateAll();
  }
}
function makeElement(parent, tag, className, id, beforeEl) {
  var el = document.createElement(tag);
  if (className) {
    el.className = className;
  }
  if (id) {
    el.id = id;
  }
  if (parent) {
    parent.appendChild(el);
  }
  if (beforeEl) {
    beforeEl.prepend(el);
  }
  return el;
}
function addEditBox(parent, id, title, value, isBold, type) {
  var wrapper = makeElement(parent, "div");
  var titleEl = makeElement(wrapper, "span", "edittitle");
  if (isBold) {
    titleEl.style.fontWeight = "bold";
  }
  addText(titleEl, title);
  if (value === undefined) {
    value = "";
  }
  if (value !== "noedit") {
    var input = makeElement(wrapper, "input");
    if (type == "password") {
      input.type = "password";
    } else {
      input.type = "text";
      input.value = value;
    }
    input.id = id;
  }
}
function GetTranslation(key, args) {
  var parts = key.split(".");
  let custom;
  if (parts[0] == "box" && _Activity.instance.CustomGroupLang && (custom = _Activity.instance.CustomGroupLang[parts[1]])) {
    return custom;
  }
  if (LangFiles && LangFiles[parts[0]] && LangFiles[parts[0]][parts[1]]) {
    let text = LangFiles[parts[0]][parts[1]];
    if (args) {
      args.forEach((arg, idx) => {
        const regex = new RegExp("\\$" + (idx + 1), "g");
        text = text.replace(regex, arg);
      });
    }
    return text;
  }
  return !1;
}
function TransText(key, fallback) {
  var translated = GetTranslation(key);
  return translated || fallback;
}
function addText(el, text, asHTML) {
  if (!text) {
    return;
  }
  var val;
  if (typeof text == "string" && text.charAt(0) == "[" && text.search(/\[mob/) >= 0) {
    for (var i in text = text.split(/\[mob|\]/)) {
      if ((val = text[i]).charAt(0) > 0 && val.charAt(1) == ".") {
        text[i] = val.split(",");
        text[i][0] = "mob" + text[i][0];
      }
    }
  }
  if (Array.isArray(text)) {
    if (Array.isArray(text[0]) || text[1] && Array.isArray(text[1])) {
      for (var i in text) {
        addText(el, text[i]);
      }
      return "";
    }
    if (text[0]) {
      el.setAttribute("data-localize", text[0]);
      let translated = null;
      if (text.length > 2) {
        const args = text.slice(2, text.length);
        translated = GetTranslation(text[0], args);
        text = text[1];
        args.forEach((v, idx) => {
          const regex = new RegExp("\\$" + (idx + 1), "g");
          text = text.replace(regex, v);
          translated &&= translated.replace(regex, v);
        });
      } else {
        translated = GetTranslation(text[0]);
        text = text[1];
      }
      if (translated) {
        text = translated;
      }
    } else {
      text = text[1];
    }
  }
  if (el && typeof text == "string" && text.indexOf("$1") >= 0 && el?.dataset?.dataSec) {
    text = text.replace("$1", el.dataset.dataSec);
  }
  let node = null;
  if (asHTML) {
    if (el) {
      el.innerHTML += text;
    }
  } else {
    node = document.createTextNode(text);
    if (el) {
      el.appendChild(node);
    }
  }
  return node;
}
function changeText(el, text, asHTML) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
  if (el.tagName.toLowerCase() == "input") {
    el.placeholder = text;
  } else {
    addText(el, text, asHTML);
  }
}
function setValue(id, val) {
  var el = document.getElementById(id);
  if (el) {
    val ||= "";
    el.value = val;
  }
}
function setTextNode(id, text, child) {
  var el = document.getElementById(id);
  if (el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    if (text) {
      el.appendChild(document.createTextNode(text));
    }
    if (child) {
      el.appendChild(child);
    }
  }
}
function addTextNode(id, text) {
  var el = document.getElementById(id);
  if (el && text) {
    el.appendChild(document.createTextNode(text));
  }
}
const capitalize = str => typeof str != "string" ? "" : str.charAt(0).toUpperCase() + str.slice(1);
function clearDiv(id, el) {
  el ||= document.getElementById(id);
  if (el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }
  return el;
}
function setDNone(show, id, el) {
  if (show) {
    removeClass("d-none", id, el);
  } else {
    addClass("d-none", id, el);
  }
}
function addClass(className, id, el) {
  if (id) {
    el = document.getElementById(id);
  }
  if (el) {
    el.classList.add(className);
  }
  return el;
}
function removeClass(className, id, el) {
  if (id) {
    el = document.getElementById(id);
  }
  if (el) {
    el.classList.remove(className);
  }
  return el;
}
function removeById(id, levels) {
  var el = document.getElementById(id);
  for (; levels;) {
    el &&= el.parentNode;
    levels--;
  }
  if (el != null) {
    el.parentNode.removeChild(el);
  }
}
function getById(id) {
  return document.getElementById(id);
}
function insertAfter(newEl, refEl) {
  if (refEl) {
    var parent = refEl.parentNode;
    if (parent.lastchild == refEl) {
      parent.appendChild(newEl);
    } else {
      parent.insertBefore(newEl, refEl.nextSibling);
    }
  }
}
function animateTo(el, keyframes, options, callback) {
  const animOptions = {
    ...options
  };
  animOptions.fill = "both";
  const animation = el.animate(keyframes, animOptions);
  animation.addEventListener("finish", () => {
    if (callback) {
      callback();
    }
  });
  return animation;
}
function animateFrom(el, fromStyles, options, callback) {
  const keyframes = {
    ...fromStyles
  };
  keyframes.offset = 0;
  const animOptions = {
    ...options
  };
  animOptions.fill = "backwards";
  const animation = el.animate(keyframes, animOptions);
  animation.addEventListener("finish", () => {
    if (callback) {
      callback();
    }
  });
  return animation;
}
function restrictCharacters(ev, regex) {
  var keyCode;
  if (ev.keyCode) {
    keyCode = ev.keyCode;
  } else if (ev.which) {
    keyCode = ev.which;
  }
  return !!String.fromCharCode(keyCode).match(regex);
}
function isColorLight(color) {
  let r;
  let g;
  let b;
  let brightness;
  return !!color && (color.match(/^rgb/) ? (r = (color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/))[1], g = color[2], b = color[3]) : (r = (color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"))) >> 16, g = color >> 8 & 255, b = color & 255), brightness = Math.sqrt(r * r * 0.299 + g * g * 0.587 + b * b * 0.114), brightness > 127.5);
}
function restrictCharacters2(ev, regex) {
  ev.target.value = ev.target.value.replace(regex, "");
  return !1;
}
function setTitleBarNum(num) {
  var titleBar = document.getElementById("titleBar");
  if (titleBar && titleBar.count) {
    if (num > 0) {
      titleBar.count.innerHTML = num;
      titleBar.count.style.visibility = "visible";
    } else {
      titleBar.count.style.visibility = "hidden";
    }
  }
}
function addTitleBar(title, leftText, leftCallback, rightText, rightCallback, showPlus, showReport, showLeft, showSideBar, showVisitors, isActions) {
  var titleBarWrapper = clearDiv("titleBar");
  var btnContainer = makeElement(titleBarWrapper, "div", "table htmlTitleBarButtons");
  var row = makeElement(btnContainer, "div", "row");
  var leftBtn = makeElement(row, "div", showReport ? "cell htmlTitleButton d-none" : "cell htmlTitleButton");
  if (showLeft) {
    leftBtn.classList.remove("d-none");
  }
  leftBtn.addEventListener("click", leftCallback);
  var leftSpan = makeElement(leftBtn, "span", "");
  if (showPlus) {
    let link = makeElement(leftBtn, "a", null, showReport ? "repIcon" : "");
    (showPlus = makeElement(link, "img")).src = showReport ? "svg/reportw.svg" : "svg/plus.svg";
    showPlus.width = "18";
    if (!showReport) {
      showPlus.style.marginTop = "-2px";
    }
    leftBtn.addEventListener("click", ev => {
      ev.preventDefault();
      if (showReport) {
        reportsDrop(title);
      } else {
        groupsDrop();
      }
    });
  } else {
    addText(leftSpan, leftText);
  }
  makeElement(row, "div", "cell cellWide");
  var rightBtn = makeElement(row, "div", "cell cellRight htmlTitleButton");
  rightBtn.addEventListener("click", rightCallback);
  var rightSpan = makeElement(rightBtn, "span", "", "TitleBarRight");
  if (showVisitors) {
    showVisitors = makeElement(rightSpan, "a");
    (rightText = makeElement(showVisitors, "img")).src = "svg/visitors.svg";
    rightText.width = "22";
  }
  if (showSideBar) {
    var sideBarBtn = makeElement(row, "div", "cell cellRight htmlTitleButton", "sideBarMob");
    makeElement(sideBarBtn, "span", "", "TitleBarRight");
    let sideBarLink = makeElement(sideBarBtn, "a");
    (showSideBar = makeElement(sideBarLink, "img")).id = "sideBarMobId";
    showSideBar.src = "svg/arrowqb.svg";
    showSideBar.style.cssText = "width: 10px; margin-top: 2px; transform: scaleX(-1)";
    if (!_Activity.instance.IsClassic) {
      loadQuickBar(typeof _Activity.instance.QuickBar != "object");
    }
  }
  if (typeof rightText == "boolean") {
    const removeImgSrc = "svg/removew.svg";
    let removeImg = makeElement(rightSpan, "img");
    removeImg.src = removeImgSrc;
    removeImg.width = "18";
  } else if (!showVisitors) {
    addText(rightSpan, rightText);
  }
  var titleTable = makeElement(titleBarWrapper, "div", "table htmlTitleBar cellWide" + (isActions ? " actionsDialog" : ""));
  var titleRow = makeElement(titleTable, "div", "row");
  var titleCell = makeElement(titleRow, "div", "cell cellWide dialogCellCenter htmlTitleTitle");
  var titleSpan = makeElement(titleCell, "span", "", "TitleBarTitle");
  if (title.length > 0) {
    addText(titleSpan, title);
  }
}
function groupsDrop() {
  const el = document.getElementById("groupDropdown");
  el.style.display = el && el.style.display == "block" ? "none" : "block";
}
function reportsDrop(userName = null) {
  const dropdown = Classic ? document.getElementById("reportDropdownClassic") : document.getElementById("reportDropdown");
  const blockBtn = document.querySelector("#userBlock");
  const reportBtn = document.querySelector("#userReport");
  if (!userName) {
    dropdown.style.display = "none";
    return;
  }
  let cleanName = userName;
  if ((userName.slice(-1) == "M" || userName.slice(-1) == "B") && !isNaN(userName.slice(0, -1))) {
    cleanName = userName.slice(0, -1);
  }
  let btnText = ["mob2.block", "Block"];
  let isUser = /[a-zA-Z]/g.test(cleanName);
  const blockTextEl = blockBtn.querySelector("#blockText");
  let userId = isUser ? userName.split("(")[1].slice(0, -1) : userName;
  userId = userId.replace("M", "000000");
  userId = userId.replace("B", "000000000");
  if (getBlockedUsers()[userId]) {
    btnText = ["mob2.unblock", "Unblock"];
  }
  blockTextEl.innerText = "";
  addText(blockTextEl, btnText);
  dropdown.style.display = dropdown && dropdown.style.display == "block" ? "none" : "block";
  if (isUser) {
    reportBtn.classList.remove("d-none");
    reportBtn.setAttribute("href", "https://xat.com/report#!user&UserName=" + userName.split(" ")[0].toLowerCase());
  } else {
    reportBtn.classList.add("d-none");
  }
  blockBtn.onclick = () => {
    ToC({
      Command: "Block",
      UserNo: userId
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
function clickOut(ev) {
  const reportDd = document.getElementById("reportDropdown");
  let reportDdClassic = findNodeInWindowOrParent("#reportDropdownClassic");
  const groupDd = findNodeInWindowOrParent("#groupDropdown");
  const titleBtn = _Activity.instance.IsClassic ? findNodeInWindowOrParent("#reportIconClassic") : findNodeInWindowOrParent(".htmlTitleButton");
  let isOutside = titleBtn && !titleBtn.contains(ev.target);
  if (ev && isOutside) {
    if (groupDd) {
      groupDd.style.display = "none";
    }
    if (reportDd) {
      reportDd.style.display = "none";
    }
    if (reportDdClassic) {
      reportDdClassic.style.display = "none";
    }
  }
  let dropdownContent = findNodeInWindowOrParent("#dropdown-content");
  if (dropdownContent && ev && !ev.target.classList.contains("menuOpen")) {
    dropdownContent.style.display = "none";
  }
}
function findNodeInWindowOrParent(selector, all) {
  if (!selector) {
    return !1;
  }
  let node = all ? document.querySelectorAll("" + selector) : document.querySelector("" + selector);
  node ||= all ? parent?.document?.querySelectorAll("" + selector) : parent?.document?.querySelector("" + selector);
  return node;
}
function AddSections(sections, callbackStr, icons) {
  clearDiv("topSelector");
  var table = makeElement(document.getElementById("topSelector"), "div", "listTable");
  var row = makeElement(table, "div", "dialogRow");
  for (var i in sections) {
    var name = sections[i];
    var cell = makeElement(row, "div", "dialogCell");
    if (callbackStr) {
      cell.Click = callbackStr + name + "')";
      cell.addEventListener("click", function (ev) {
        let match = this.Click.match(/(\w*).*?'(\w*)'/);
        switch (match[1]) {
          case "configurePage":
            configurePage(0, match[2]);
            break;
          case "configureStorePage":
            configureStorePage(match[2]);
        }
      });
    }
    var tabTable = makeElement(cell, "div", "listTable tabTable");
    var labelRow = makeElement(tabTable, "div", "dialogRow");
    var labelCell = makeElement(labelRow, "div", "dialogCell dialogCellCenter tabLabelCell", "Label" + name);
    var iconImg = makeElement(labelCell, "img", "selector");
    iconImg.height = 16;
    iconImg.width = 16;
    iconImg.src = icons ? "svg/" + icons[i] + ".svg" : "svg/sel" + name + ".svg";
    addText(makeElement(labelCell, "span", "selector"), ["mob1." + name.toLowerCase(), name]);
    var indicatorRow = makeElement(tabTable, "div", "dialogRow");
    makeElement(indicatorRow, "div", "dialogCell tabIndicatorCell", "Indicator" + name);
  }
}
function SetSection(sectionName) {
  var els;
  var i;
  els = document.getElementsByClassName("tabLabelCellSelected");
  i = 0;
  for (; i < els.length; i++) {
    els[i].className = "dialogCell dialogCellCenter tabLabelCell";
  }
  els = document.getElementsByClassName("tabIndicatorCellSelected");
  i = 0;
  for (; i < els.length; i++) {
    els[i].className = "dialogCell tabIndicatorCell";
  }
  if ((els = document.getElementById("Label" + sectionName))) {
    els.className += " tabLabelCellSelected";
  }
  if ((els = document.getElementById("Indicator" + sectionName))) {
    els.className += " tabIndicatorCellSelected";
  }
  CurrentSec = sectionName;
}
function FillInAll(values, keys, errorEl) {
  let msg = GetTranslation("mob2.fillall");
  msg ||= "Please fill in all boxes";
  for (var i in keys) {
    if (!values[keys[i]]) {
      if (errorEl) {
        addText(errorEl, msg);
      } else {
        AlertMessage(msg);
      }
      return !1;
    }
  }
  return !0;
}
function DoBanDialog(duration, expiry, reason) {
  let hoursLeft = (expiry - Date.now() / 1000) / 3600;
  hoursLeft = Math.round(hoursLeft * 100) / 100;
  if (hoursLeft < 0) {
    hoursLeft = 0;
  }
  const timeStr = new Date().toLocaleString();
  reason = reason.substr(0, 500);
  const removeIcon = "svg/remove" + (toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg";
  const dialogId = "BanDialog";
  HiddenDivs[dialogId] = "<div class=\"modalDialogContentClassic\" data-w=\"0.65\"><div class=\"dialogTitleBar\"><span class=\"dialogTitle\"><img src=\"svg/actBan.svg\" alt=\"completed\" class=\"transcomp\"><span data-localize=\"mob2.banned\">Banned!</span></span><span class=\"dialogTitleAction\" id=\"id_ModalClose\"><img src=\"" + removeIcon + "\" width=\"16\" alt=\"close\"></span></div><div class=\"dialogBody\"><div class=\"dialogPadding\"><div id=\"newAlert\"><div class=\"table\" style=\"display: flex;\"><div class=\"column transdesc\"><div data-localize=\"mob2.time\">Time</div><div data-localize=\"mob2.by\">By</div><div data-localize=\"mob2.duration\">Duration</div><div data-localize=\"mob2.reason\">Reason</div></div><div class=\"column\"><div>" + timeStr + "</div><div>" + duration + "</div><div>" + (hoursLeft == 0 ? "<span data-localize='mob2.forever'>Forever</span>" : hoursLeft + " <span data-localize=\"mob2.hours\">Hours</span> ") + "</div>" + (reason.trim().length == 0 ? "<div style=\"overflow-y: auto; max-height: 70px;\" data-localize=\"mob2.noreason\">No reason given</div>" : "<div style=\"overflow-y: auto; max-height: 70px; word-break: break-word;\">" + reason + "</div>") + "</div></div><div class=\"banbuttons\" style=\"margin-top: 1rem;\"><a href=\"https://xat.com/report#!group&GroupName=" + config.GroupName + "\" target=\"_blank\"><button class=\"bButton\"><img src=\"svg/inappropriate.svg\" alt=\"report\" style=\"width: 12px\" class=\"inappIc\"><span data-localize=\"mob2.unfair\">Report unfair ban</span></button></a><a id=\"modalClose\"><button class=\"bButton\"><img src=\"svg/return2.svg\" alt=\"return\" class=\"inappIc\"><span data-localize=\"mob2.return\">Return to chat</span></button></a><a href=\"https://xat.com/groups\" target=\"_blank\"><button class=\"bButton\"><img src=\"svg/groups.svg\" alt=\"groups\" class=\"inappIc\"><span data-localize=\"mob2.findgroups\">Find other groups</span></button></a></div></div></div></div></div>";
  doModal(dialogId);
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
function DoTransfer(message, fromUser, toUser, xatAmount, dayAmount) {
  message = message.substr(0, 500);
  var dialogId = "AlertDialog";
  const timeStr = new Date().toLocaleString();
  const removeIcon = "svg/remove" + (toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg";
  HiddenDivs[dialogId] = "<div class=\"modalDialogContentClassic\"><div class=\"dialogTitleBar\"><span class=\"dialogTitle\"><img src=\"svg/capyes.svg\" alt=\"completed\" class=\"transcomp\"><span data-localize=\"mob2.transfer\">Transfer</span></span><span class=\"dialogTitleAction\" id=\"id_ModalClose\"><img src=\"" + removeIcon + "\" width=\"16\" alt=\"close\"></span></div><div class=\"dialogBody\"><div class=\"dialogPadding\"><div id=\"newAlert\"><div class=\"table\" style=\"display: flex;\"><div class=\"column transdesc\"><div data-localize=\"mob2.time\">Time</div><div data-localize=\"mob2.amount\">Amount</div><div data-localize=\"mob2.from\">From</div><div data-localize=\"mob2.to\">To</div>" + (message.trim().length == 0 ? "" : "<div data-localize=\"mob2.message\">Message</div>") + "</div><div class=\"column\"><div class=\"transimp\">" + timeStr + "</div><div class=\"transimp\">" + xatAmount + " xats & " + dayAmount + " days</div><div class=\"transimp\">" + fromUser + "</div><div class=\"transimp\">" + toUser + "</div>" + (message.trim().length == 0 ? "" : "<div style=\"overflow-y: auto; max-height: 70px; color: inherit; word-break: break-word;\">" + message + "</div>") + "</div></div></div></div></div></div>";
  doModal(dialogId);
  ColorTitle();
  setCstyle();
  TranslateAll();
  document.getElementById("id_ModalClose").addEventListener("click", function () {
    modalClose();
  });
}
function AlertMessage(msg, asHTML, asBR, isSuccess) {
  var alertEl = clearAlertMessage();
  const removeIcon = Classic ? "svg/remove" + (toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg" : "svg/removew.svg";
  if (!alertEl) {
    var dialogId = "AlertDialog";
    HiddenDivs[dialogId] = "<div class=\"modalDialogContentClassic\"><div class=\"dialogTitleBar\"><span data-localize=mob1.message class=\"dialogTitle\">Message</span><span class=\"dialogTitleAction\" id=\"id_ModalClose\"><img src=\"" + removeIcon + "\" width=\"16\" alt=\"close\"></span></div><div class=\"dialogBody\"><div class=\"dialogPadding\"><div id=\"AlertMessage\"></div></div></div></div>";
    doModal(dialogId);
    document.getElementById("id_ModalClose").addEventListener("click", function () {
      modalClose();
      if (_Activity.instance.LoginBodge) {
        removeClass("d-none", 0, _Activity.instance.Window.getById("Overlays"));
        _Activity.instance.LoginBodge = !1;
      }
    });
    alertEl = clearAlertMessage();
    ColorTitle();
    TranslateAll();
    setCstyle();
  }
  var linkUrl;
  if (asHTML) {
    msg = msg.replace(/<p>/g, "ZZZZ");
  }
  if (asBR) {
    msg = msg.replace(/<br>/g, "LLLLL");
  }
  msg = (msg = msg.replace(/<.*?>/g, " ")).replace(/<.*/g, "");
  if (asHTML) {
    msg = msg.replace(/ZZZZ/g, "<p>");
  }
  if (asBR) {
    msg = msg.replace(/LLLLL/g, "<br>");
  }
  msg = msg.replace(/\[link (.*?)\]/g, function (match, url) {
    linkUrl = url;
    return "";
  });
  if (asHTML) {
    alertEl.innerHTML = msg;
  } else {
    alertEl.textContent = msg;
  }
  if (linkUrl) {
    var linkEl = makeElement(alertEl, "a");
    linkEl.href = "https://" + linkUrl;
    linkEl.target = "_blank";
    addText(linkEl, linkUrl);
  }
  alertEl.style.color = isSuccess ? "#00834d" : "#F00";
  alertEl.style.fontWeight = "bold";
  if ((alertEl = document.getElementById("openModal"))) {
    alertEl.style.visibility = "visible";
  }
}
function clearAlertMessage() {
  ConnectingClose();
  let openModal = document.getElementById("openModal");
  openModal &&= openModal.getElementsByClassName("AlertMessage");
  if (openModal && openModal.length > 0) {
    openModal[0].textContent = "";
    return openModal[0];
  } else {
    openModal = document.getElementById("AlertMessage");
    if (openModal) {
      openModal.textContent = "";
      return openModal;
    } else {
      return null;
    }
  }
}
function BuildDialog(parent, items) {
  var btnEl;
  var contentWrapper = parent = makeElement(parent, "div", "modalDialogContentClassic");
  var bodyWrapper = parent;
  var actionWrapper = parent;
  for (var i in items) {
    var item = items[i];
    switch (item.type) {
      case "click":
        btnEl = addEditBox2(contentWrapper, 0, "dialogClick", item.name, "noedit");
        item.icon = item.name;
        btnEl.Part = item;
        btnEl.addEventListener("click", function (ev) {
          actions.sendApp(ev, this.Part);
        });
        break;
      case "title":
        addEditBox2(parent, 0, "dialogTitleBar", item.name, "noedit", "bold");
        actionWrapper = bodyWrapper = contentWrapper = makeElement(parent, "div", "dialogBody");
        contentWrapper = makeElement(contentWrapper, "div", "dialogPadding");
        makeElement(contentWrapper, "div", "AlertMessage");
        bodyWrapper = makeElement(contentWrapper, "div", "dialogBody");
        bodyWrapper = makeElement(bodyWrapper, "div", "dialogTable");
        ColorTitle();
        break;
      case "mw":
        parent.dataset.mw = item.mw;
        break;
      case "password":
        addEditBox2(bodyWrapper, item.id, "dialogRow", item.name, 0, 0, "password");
        break;
      case "dialog":
        addEditBox2(bodyWrapper, item.id, "dialogRow", item.name);
        break;
      case "text":
        addEditBox2(contentWrapper, 0, "", item.name, "noedit");
        break;
      default:
        addEditBox2(actionWrapper, 0, "dialogActions", item);
    }
  }
}
function addEditBox2(parent, id, className, item, value, isBold, type) {
  var wrapper = makeElement(parent, "div", className);
  const removeIcon = "svg/remove" + (toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg";
  switch (className) {
    case "dialogTitleBar":
      addText(makeElement(wrapper, "span", "dialogTitle"), item + "\xA0");
      makeElement(wrapper, "span", "dialogTitleAction").id = "modalCancel";
      break;
    case "dialogRow":
      addText(makeElement(wrapper, "div", "dialogCell"), item + "\xA0");
      if (value === undefined) {
        value = "";
      }
      if (value === "noedit") {
        break;
      }
      var cell = makeElement(wrapper, "div", "dialogCell cellWide");
      var input = makeElement(cell, "input", "dialogInput");
      input.setAttribute("autocomplete", type == "password" ? "new-password" : "off");
      if (type == "password") {
        input.type = "password";
      } else {
        input.type = "text";
        input.value = value;
      }
      input.id = id;
      break;
    case "dialogClick":
    case "":
      addText(wrapper, item + "\xA0");
      break;
    case "dialogActions":
      if (item.action == "Cancel") {
        let cancelBtn = document.getElementById("modalCancel");
        let img = makeElement(cancelBtn, "img");
        img.src = _Activity.instance.IsClassic ? removeIcon : "svg/removew.svg";
        img.width = "16";
        img.alt = "close";
        cancelBtn.addEventListener("click", function () {
          modalClose();
        });
        parent.removeChild(wrapper);
        break;
      }
      var actionBtn;
      var sendHandler;
      addText(wrapper, "\xA0");
      addText(actionBtn = makeElement(wrapper, "span", "dialogActionRight"), item.label);
      if (item.flags & 1) {
        actionBtn.style.opacity = "0.5";
        actionBtn.addEventListener("click", function () {
          modalClose();
        });
      } else {
        if (typeof sendApp == "function") {
          sendHandler = sendApp;
        }
        if (!sendHandler && sendFunc) {
          sendHandler = sendFunc;
        }
        actionBtn.addEventListener("click", function (ev) {
          clearAlertMessage();
          sendHandler(ev, item.action, item.Power);
        });
      }
  }
  return wrapper;
}
function doModal(idOrConfig, options, center, isAnnounce, styleConfig, callback = () => {}) {
  modalClose();
  var modalEl = makeElement(document.body, "div", isAnnounce ? "modalDialog AnnounceFrame" : "modalDialog");
  modalEl.setAttribute("id", "openModal");
  var contentEl;
  var wrapperEl = makeElement(modalEl, "div");
  var firstChar = "";
  if (typeof idOrConfig == "string") {
    firstChar = idOrConfig.charAt(0);
  }
  if (firstChar == "{" || firstChar == "[") {
    idOrConfig = JSON.parse(idOrConfig);
  }
  if (idOrConfig !== null && typeof idOrConfig == "object") {
    BuildDialog(wrapperEl, idOrConfig);
    contentEl = wrapperEl;
    wrapperEl.PushUp = !0;
  } else if (idOrConfig.charAt(0) == "h") {
    var iframe = makeElement(wrapperEl, "iframe");
    iframe.setAttribute("src", idOrConfig);
    iframe.setAttribute("width", 300);
    iframe.setAttribute("height", 500);
    contentEl = iframe;
  } else {
    contentEl = makeElement(wrapperEl, "div");
    CacheHiddenDivs();
    contentEl.innerHTML = HiddenDivs[idOrConfig];
    TranslateNodes(contentEl);
    if (typeof messages != "undefined" && typeof messages.openSmiliesDialog == "function") {
      messages.openSmiliesDialog();
    }
  }
  modalEl.style.opacity = 1;
  modalEl.style.pointerEvents = "auto";
  contentEl.addEventListener("click", function (ev) {
    ev.stopPropagation();
  });
  if (center) {
    posModal(contentEl, options, true);
  } else {
    posModal(contentEl, options);
  }
  callback(document);
  setCstyle(null, styleConfig);
  return contentEl;
}
function posModal(contentEl, options, center) {
  if (contentEl) {
    options ||= {};
    var firstEl = contentEl.firstElementChild;
    if (selector?.isCaptchaPage()) {
      options.mw = 100;
    }
    var widthFactor = firstEl.dataset.w;
    if (options.w) {
      widthFactor = options.w;
    }
    widthFactor ||= 0.4;
    var parentWidth = 0;
    if (contentEl.offsetParent) {
      parentWidth = contentEl.offsetParent.offsetWidth;
    }
    parentWidth ||= contentEl.parentNode.offsetWidth;
    var minWidth = xInt(firstEl.dataset.mw);
    if (options.mw) {
      minWidth = options.mw;
    }
    if (minWidth < 10) {
      minWidth = 270;
    }
    var heightFactor = options.h;
    heightFactor ||= firstEl.dataset.h;
    var minHeight = xInt(firstEl.dataset.mh);
    if (options.mh) {
      minHeight = options.mh;
    }
    if (minHeight < 10) {
      minHeight = 30;
    }
    if (parentWidth * widthFactor < minWidth && (widthFactor = minWidth / parentWidth) > 0.95) {
      widthFactor = 0.95;
    }
    var leftFactor = (1 - widthFactor) / 2;
    var elHeight = firstEl.offsetHeight;
    var parentHeight = 0;
    if (contentEl.offsetParent) {
      parentHeight = contentEl.offsetParent.offsetHeight;
    }
    parentHeight ||= contentEl.parentNode.offsetHeight;
    if (elHeight < minHeight) {
      elHeight = minHeight;
    }
    if (heightFactor && elHeight < parentHeight * heightFactor) {
      elHeight = parentHeight * heightFactor;
    }
    if (elHeight > parentHeight - 40) {
      elHeight = parentHeight - 40;
    }
    minHeight = xInt(elHeight);
    var topPos = center ? (parentHeight - elHeight) / 3.8 : (parentHeight - elHeight) / 2;
    if (config.PhoneType == PhoneTypes.DROIDPHONE || config.PhoneType == PhoneTypes.WEB || firstEl.dataset.pu) {
      contentEl.PushUp = contentEl.PushUp || firstEl.dataset.pu || document.getElementById("PushUp");
    } else {
      contentEl.PushUp = false;
    }
    if (contentEl.PushUp) {
      topPos = (parentHeight - elHeight - 250) / 2;
    }
    if (topPos < 10) {
      topPos = 10;
    }
    topPos = xInt(topPos);
    var leftPos = xInt(parentWidth * leftFactor);
    parentWidth -= leftPos * 2;
    if (Classic && options?.customHeight) {
      elHeight = options?.customHeight + 30;
    }
    var styleStr = "";
    if (minHeight > 30) {
      styleStr = "height:" + elHeight + "px;";
    }
    firstEl.style.cssText = "width:" + parentWidth + "px; left:" + leftPos + "px; top: " + topPos + "px;" + styleStr;
  }
}
function modalClose(closeBack) {
  removeById("openModal");
  if (closeBack) {
    const frameBack = findNodeInWindowOrParent("#FrameBack");
    if (frameBack && !frameBack.classList.contains("d-none")) {
      frameBack.classList.add("d-none");
    }
  }
}
function heightModal(height) {
  if (!height) {
    return;
  }
  let parentDoc = window?.parent?.document;
  if (!parentDoc) {
    return;
  }
  let modalContent = parentDoc?.querySelector(".modalDialogContentClassic");
  if (modalContent) {
    modalContent.style.height = height + 30 + "px";
  }
}
function CacheHiddenDivs() {
  if (!DoneHiddenDivs) {
    DoneHiddenDivs = !0;
    var i;
    var el;
    var dialogs = document.getElementsByClassName("dialog");
    for (i = 0; i < dialogs.length; i++) {
      el = dialogs[i];
      if (!Classic || el.id != "LoginForm") {
        HiddenDivs[el.id] = el.innerHTML;
        el.innerHTML = "";
      }
    }
  }
}
function AddHammer(el, direction, callback) {
  var eventName;
  switch (direction) {
    case Hammer.DIRECTION_LEFT:
      eventName = "swipeleft";
      break;
    case Hammer.DIRECTION_RIGHT:
      eventName = "swiperight";
      break;
    default:
      eventName = "swipeleft swiperight";
      direction = Hammer.DIRECTION_HORIZONTAL;
  }
  const swipeOptions = {
    direction: direction
  };
  const cssProps = {
    userselect: !1
  };
  var hammerInst = new Hammer(el, {
    preventDefault: !0,
    recognizers: [[Hammer.Swipe, swipeOptions]],
    cssProps: cssProps
  });
  hammerInst.on(eventName, function (ev) {
    if (!_Activity.instance.IsClassic && _Activity.instance.QuickBar) {
      _Activity.instance.QuickBar.shouldCloseQuickBar(ev);
    }
    const data = {
      Type: ev.type
    };
    if (ev.target.id) {
      data.id = ev.target.id;
    } else if (ev.target.parentNode.id) {
      data.id = ev.target.parentNode.id;
    }
    callback(0, data);
  });
  return hammerInst;
}
function SetTotalUnRead(count) {
  var titleBar = document.getElementById("titleBar");
  if (titleBar && titleBar.count) {
    if (count == 0) {
      titleBar.count.style.visibility = "hidden";
    } else {
      if (count > 9) {
        count = "9+";
      }
      titleBar.count.innerHTML = count;
      titleBar.count.style.visibility = "visible";
    }
  }
}
function getXats() {
  modalClose();
  HitWeb(openBuyPage());
}
function ShowCaptcha(capJson) {
  _Activity.instance.Selector.CapJson = capJson;
  _Activity.instance.Selector.DoLoginEtc("AreYouABot");
}
function saveSetting(name, value, isMacro) {
  if (isMacro) {
    return ToC({
      Type: "Macro",
      Command: "Macro",
      Name: name,
      Value: value
    });
  }
  ToC({
    Page: "settings",
    Type: "Setting",
    Command: "Setting",
    Name: name,
    Value: value
  });
}
function NOP() {}
function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return !1;
    }
  }
  return !0;
}
function setPmMode(enable, userId, userName, targetDoc) {
  targetDoc ||= parent.document;
  const textEntry = targetDoc.getElementById("textEntryEditable");
  const pmWrapper = targetDoc.getElementById("pmWrapper");
  pmWrapper.innerHTML = "";
  pmWrapper.style.display = "block";
  if (!enable) {
    pmWrapper.style.pointerEvents = "none";
    pmWrapper.style.display = "none";
    textEntry.classList.remove("sided");
    PMMODE = false;
    return;
  }
  PMMODE = !0;
  textEntry.classList.add("sided");
  pmWrapper.dataset.userno = userId;
  pmWrapper.dataset.regname = userName;
  addToolTip(makeElement(pmWrapper, "div", "pmLock"), ["mob2.sendingto", "Sending to: $1", userName], {
    position: "low",
    dom: targetDoc
  });
  const pmDel = makeElement(pmWrapper, "div", "pmDel");
  const tooltipOptions = {
    dom: targetDoc
  };
  addToolTip(pmDel, ["box.66", "Cancel"], tooltipOptions);
  pmDel.addEventListener("click", () => {
    setPmMode(!1);
  });
  pmDel.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" preserveAspectRatio=\"none\" x=\"0px\" y=\"0px\" width=\"40px\" height=\"40px\" viewBox=\"0 0 40 40\">\n        <defs>\n            <g id=\"_App_Icons_cancel_0_Layer0_0_FILL\">\n                <path fill=\"#19191b\" stroke=\"none\" d=\"\n                M 12.2 3.85\n                Q 11.6 3.85 11.2 4.25\n                L 8.9 6.6 6.55 4.25\n                Q 6.35 4.05 6.15 4 5.9 3.85 5.6 3.85 5 3.85 4.55 4.3 4.1 4.75 4.1 5.3 4.1 5.9 4.55 6.3\n                L 6.85 8.6 4.5 11\n                Q 4.05 11.4 4.05 12 4.05 12.55 4.5 13 4.95 13.45 5.5 13.45 6.1 13.45 6.5 13\n                L 8.9 10.65 10.3 12.05 10.35 12.05 10.35 12.1 11.25 13\n                Q 11.7 13.45 12.25 13.45 12.85 13.45 13.3 13 13.7 12.55 13.7 12 13.7 11.4 13.3 11\n                L 10.9 8.6 13.25 6.3\n                Q 13.65 5.9 13.65 5.3 13.65 4.75 13.2 4.3 12.75 3.85 12.2 3.85 Z\"/>\n            </g>\n\n            <path id=\"_App_Icons_cancel_0_Layer0_0_1_STROKES\" stroke=\"#19191b\" stroke-width=\"1\" stroke-linejoin=\"round\" stroke-linecap=\"round\" fill=\"none\" d=\"\n            M 17.6 8.8\n            Q 17.6 12.45 15 15 12.45 17.6 8.8 17.6 5.15 17.6 2.55 15 0 12.45 0 8.8 0 5.15 2.55 2.55 5.15 0 8.8 0 12.45 0 15 2.55 17.6 5.15 17.6 8.8 Z\"/>\n        </defs>\n\n        <g transform=\"matrix( 1.76702880859375, 0, 0, 1.76702880859375, 4.5,4.4) \">\n            <g transform=\"matrix( 1, 0, 0, 1, 0,0) \">\n                <use xlink:href=\"#_App_Icons_cancel_0_Layer0_0_FILL\"/>\n\n                <use xlink:href=\"#_App_Icons_cancel_0_Layer0_0_1_STROKES\"/>\n            </g>\n        </g>\n    </svg>";
}
function sendPm(userId, msg) {
  if (msg.length !== 0) {
    ToC({
      Command: "Action",
      Message: msg,
      Next: "messages",
      Page: "actions",
      Type: "Action",
      UserNo: userId,
      name: "PrivateMessage"
    });
  }
}
function MakeHelpMessage(text, id, target) {
  id ||= "";
  var li = makeElement(0, "li", "message", id);
  var table = makeElement(li, "div", "listTable");
  var row = makeElement(table, "div", "dialogRow");
  var cell = makeElement(row, "div", "dialogCell cellWide noPointer");
  var msgDiv = makeElement(cell, "div", "noftxt");
  if (!Classic) {
    msgDiv.style.width = "100%";
  }
  msgDiv.innerHTML = "";
  var p = makeElement(msgDiv, "p");
  p.className = "chatsMessage";
  if (!Classic) {
    p.style.cssText = "white-space: normal; margin-left: 3px";
  }
  createTextSm(p, text);
  if (target) {
    target.p = p;
    target.msg = msgDiv;
  }
  return li;
}
function InitPage(connType) {
  if (connType.length > 1) {
    ConnectingOpen(connType);
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
function ConnectingOpen(type) {
  if (type && document.getElementById("Connecting")) {
    var loadingEl = document.getElementById("loading");
    if (loadingEl) {
      loadingEl.innerHTML = type + "&nbsp;<span>.</span><span>.</span><span>.</span></div>";
      return;
    }
  }
  if (type) {
    connType = type;
    if (connTimeout) {
      clearTimeout(connTimeout);
    }
    connTimeout = setTimeout(ConnectingOpen, 500);
    return;
  }
  ConnectingClose();
  var dialogEl = makeElement(document.body, "div", "connectingDialog");
  dialogEl.setAttribute("id", "Connecting");
  var wrapperEl = makeElement(dialogEl, "div");
  wrapperEl.innerHTML = "<!DOCTYPE html><html lang=\"en\"><body><div id=\"xatLoader\"><div id=\"xatLoaderInner\"><img id=\"planet\" src=\"svg/x.svg\"/><img id=\"rocket\" src=\"svg/ss.svg\" /><div id=\"loading\" class=\"txt\"><span id=\"ConMsgId\"></span>&nbsp;<span>.</span><span>.</span><span>.</span></div></div></div></body></html>";
  addText(document.getElementById("ConMsgId"), ["mod1." + connType.toLowerCase(), connType]);
  wrapperEl.style.top = xInt((dialogEl.clientHeight - wrapperEl.clientHeight) / 2) + "px";
  dialogEl.style.opacity = 1;
  dialogEl.style.pointerEvents = "auto";
  document.getElementById("xatLoader").addEventListener("click", function () {
    ConnectingClose();
  });
}
function onSwear(ev) {
  var el = ev.target;
  el.className = "";
  el.onclick = null;
  ev.preventDefault();
}
function ST2(str, a1, a2, a3, a4) {
  if (a1 != null) {
    str = str.slice(0, str.indexOf("$1")) + a1 + str.slice(str.indexOf("$1") + 2);
  }
  if (a2 != null) {
    str = str.slice(0, str.indexOf("$2")) + a2 + str.slice(str.indexOf("$2") + 2);
  }
  if (a3 != null) {
    str = str.slice(0, str.indexOf("$3")) + a3 + str.slice(str.indexOf("$3") + 2);
  }
  if (a4 != null) {
    str = str.slice(0, str.indexOf("$4")) + a4 + str.slice(str.indexOf("$4") + 2);
  }
  return str;
}
function GetAsMB(num) {
  let str = num.toString();
  if (str.substr(-9, 9) == "000000000") {
    str = str.substr(0, str.length - 9) + "B";
  }
  if (str.substr(-6, 6) == "000000") {
    str = str.substr(0, str.length - 6) + "M";
  }
  return str;
}
function xInt(val) {
  val = parseInt(val);
  if (isNaN(val)) {
    return 0;
  } else {
    return val;
  }
}
function microtime(getFloat) {
  var now = new Date().getTime() / 1000;
  var sec = parseInt(now, 10);
  if (getFloat) {
    return now;
  } else {
    return Math.round((now - sec) * 1000) / 1000 + " " + sec;
  }
}
function urldecode(str) {
  return decodeURIComponent((str + "").replace(/\+/g, "%20"));
}
function ObjToQuery(obj) {
  return Object.keys(obj).map(function (key) {
    return key + "=" + obj[key];
  }).join("&");
}
function objToXatJson(obj) {
  if (obj) {
    return Object.keys(obj).map(key => key + "/" + obj[key]).join("//");
  } else {
    return "";
  }
}
function xatJsonToObj(str) {
  if (!str.length) {
    return {};
  }
  const obj = {};
  str.split("//").forEach(part => {
    part = part.split("/");
    obj[part[0]] = part[1];
  });
  return obj;
}
function loadJSON(url, onSuccess, onError, postData) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        if (onSuccess) {
          var json;
          try {
            json = JSON.parse(xhr.responseText);
          } catch (err) {
            if (onError) {
              onError(err);
            }
          }
          if (json) {
            onSuccess(json);
          }
        }
      } else if (onError) {
        onError(xhr);
      }
    }
  };
  if (postData) {
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(ObjToQuery(postData));
  } else {
    xhr.open("GET", url, true);
    xhr.send();
  }
}
function loadHTML(url, successCallback, errorCallback, postData) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        if (successCallback) {
          successCallback(xhr.responseText);
        }
      } else if (errorCallback) {
        errorCallback(xhr);
      }
    }
  };
  if (postData) {
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(ObjToQuery(postData));
  } else {
    xhr.open("GET", url, true);
    xhr.send();
  }
}
function iosAllowCookies() {
  localStorage.setItem("mobCookies", 1);
}
function openBuyPage(shouldPost, win) {
  let target = "_blank";
  let url = "https://xat.com/buy";
  let userStoreData = {};
  try {
    userStoreData = JSON.parse(localStorage.getItem("todo"));
  } catch (err) {}
  userStoreData ||= {};
  if (_Activity.instance.IsAndroidApp && userStoreData?.w_registered || !shouldPost && _Activity.instance.IsIOSApp && userStoreData?.w_registered) {
    target = "_self";
    url = "xat://buy-xats?userId=" + userStoreData.w_userno + "&userName=" + userStoreData.w_registered + "&deviceId=" + userStoreData.DeviceId + "&passHash=" + userStoreData.PassHash;
  } else if (shouldPost && _Activity.instance.IsIOSApp && userStoreData?.w_registered) {
    shouldPost = !1;
    const msgObj = {
      userId: userStoreData.w_userno,
      userName: userStoreData.w_registered,
      deviceId: userStoreData.DeviceId,
      passHash: userStoreData.PassHash
    };
    window.webkit.messageHandlers.xatStore.postMessage(msgObj);
  }
  const targetWin = win ?? window;
  if (!shouldPost) {
    return url;
  }
  targetWin.open(url, target);
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
function DecodeColor(color, flags) {
  if (color != null) {
    if (flags & NamePowers.valid) {
      while (true) {
        if (color.length == 6 && color.replace(/[^0-9a-fA-F]/g, "").length == 6) {
          break;
        }
        if (color.length == color.replace(/[^rgb\-+]/g, "").length) {
          break;
        }
        return null;
      }
    }
    var hasRedPower = (flags & NamePowers.red) > 0;
    var hasGreenPower = (flags & NamePowers.green) > 0;
    var hasBluePower = (flags & NamePowers.blue) > 0;
    var hasLightPower = (flags & NamePowers.light) > 0;
    if (hasRedPower != 0 || hasGreenPower != 0 || hasBluePower != 0 || hasLightPower != 0) {
      var r = (color = color.toLowerCase()).split("r").length - 1;
      var g = color.split("g").length - 1;
      var b = color.split("b").length - 1;
      var plus = color.split("+").length - 1;
      var minus = color.split("-").length - 1;
      var luminance = 0.5;
      if (r == 0 && g == 0 && plus == 0 && minus == 0) {
        var charCount = 0;
        for (var i = 0; i < color.length; i++) {
          var char = color.charAt(i);
          if ((charCount = char >= "0" && char <= "9" || char >= "a" && char <= "f" ? charCount + 1 : 0) == 6) {
            var hexVal = parseInt(color.substr(i - charCount + 1, 6), 16);
            if (hasRedPower != 0 && hasGreenPower != 0 && hasBluePower != 0 && hasLightPower != 0) {
              return hexVal;
            }
            b = hexVal & 255;
            g = hexVal >> 8 & 255;
            r = hexVal >> 16 & 255;
            plus = minus = 0;
            if (hasLightPower != 0) {
              luminance = (Math.min(r, Math.min(g, b)) + Math.max(r, Math.max(g, b))) / 512;
            }
            break;
          }
        }
      }
      if (r != 0 || g != 0 || b != 0 || plus != 0 || minus != 0) {
        if (hasRedPower == 0) {
          r = 0;
        }
        if (hasGreenPower == 0) {
          g = 0;
        }
        if (hasBluePower == 0) {
          b = 0;
        }
        if (hasLightPower == 0) {
          plus = minus = 0;
        }
        if (r == 0 && g == 0 && b == 0) {
          r = g = b = 1;
        }
        var rFinal;
        var gFinal;
        var bFinal;
        var rRatio = r / (r + g + b);
        var gRatio = g / (r + g + b);
        var bRatio = b / (r + g + b);
        var min = Math.min(rRatio, Math.min(gRatio, bRatio));
        var max = Math.max(rRatio, Math.max(gRatio, bRatio));
        var delta = max - min;
        var hue;
        var saturation;
        var lightness = (max + min) / 2;
        if (delta == 0) {
          hue = saturation = 0;
        } else {
          saturation = lightness < 0.5 ? delta / (max + min) : delta / (2 - max - min);
          var delR = ((max - rRatio) / 6 + delta / 2) / delta;
          var delG = ((max - gRatio) / 6 + delta / 2) / delta;
          var delB = ((max - bRatio) / 6 + delta / 2) / delta;
          if (rRatio == max) {
            hue = delB - delG;
          } else if (gRatio == max) {
            hue = 1 / 3 + delR - delB;
          } else if (bRatio == max) {
            hue = 2 / 3 + delG - delR;
          }
          if (hue < 0) {
            hue += 1;
          }
          if (hue > 1) {
            hue -= 1;
          }
        }
        if ((lightness = luminance + plus * 0.0625 - minus * 0.0625) < 0) {
          lightness = 0;
        }
        if (lightness > 1) {
          lightness = 1;
        }
        if (saturation == 0) {
          rFinal = gFinal = bFinal = lightness;
        } else {
          var q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - saturation * lightness;
          var p = lightness * 2 - q;
          rFinal = hueToRgb(p, q, hue + 1 / 3);
          gFinal = hueToRgb(p, q, hue);
          bFinal = hueToRgb(p, q, hue - 1 / 3);
        }
        return (Math.round(rFinal * 255) << 16) + (Math.round(gFinal * 255) << 8) + Math.round(bFinal * 255);
      }
    }
  }
  function hueToRgb(p, q, t) {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t * 6 < 1) {
      return p + (q - p) * 6 * t;
    } else if (t * 2 < 1) {
      return q;
    } else if (t * 3 < 2) {
      return p + (q - p) * (2 / 3 - t) * 6;
    } else {
      return p;
    }
  }
}
function toHex6(num) {
  return ("00000" + Number(num).toString(16)).slice(-6).toUpperCase();
}
function MakeGlow(colorNum) {
  var glowStr = "0 0 0.2rem #" + toHex6(colorNum);
  return glowStr + "," + glowStr + "," + glowStr;
}
function MakeStatusGlow(colorNum) {
  return "0 0 0.134rem #" + toHex6(colorNum);
}
function rgbtohsv(colorNum) {
  var hue;
  var saturation;
  var r = (colorNum >> 16 & 255) / 255;
  var g = (colorNum >> 8 & 255) / 255;
  var b = (colorNum & 255) / 255;
  var min = Math.min(r, g, b);
  var max = Math.max(r, g, b);
  hue = min == max ? 0 : max == r ? ((g - b) * 60 / (max - min) + 360) % 360 : max == g ? (b - r) * 60 / (max - min) + 120 : (r - g) * 60 / (max - min) + 240;
  saturation = max == 0 ? 0 : (max - min) / max;
  return new Array(hue, saturation, max);
}
function hsvtorgb(h, s, v) {
  var r;
  var g;
  var b;
  var i;
  var f;
  var p;
  var q;
  var t;
  h %= 360;
  if (v == 0) {
    return 0;
  }
  p = v * (1 - s);
  q = v * (1 - s * (f = (h /= 60) - (i = Math.floor(h))));
  t = v * (1 - s * (1 - f));
  switch (i) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
  }
  return Math.floor(r * 255) << 16 | Math.floor(g * 255) << 8 | Math.floor(b * 255);
}
function Getms() {
  return Date.Now();
}
function GetTimeToGo(timestamp, shortMode, fullDate) {
  if (timestamp == 0) {
    return "";
  }
  let diffSecs = Math.floor((new Date() - timestamp) / 1000);
  diffSecs = parseInt(diffSecs);
  if (diffSecs <= 0) {
    return ["mob1.justnow", "just now"];
  } else if (diffSecs < 60) {
    if (shortMode) {
      return diffSecs;
    } else {
      return ["mob1.secsago", "$1 secs ago", diffSecs];
    }
  } else if (diffSecs < 120) {
    if (shortMode) {
      return 1;
    } else {
      return ["mob1.minago", "$1 min ago", 1];
    }
  } else if (diffSecs < 3600) {
    if (shortMode) {
      return parseInt(diffSecs / 60);
    } else {
      return ["mob1.minsago", "$1 mins ago", parseInt(diffSecs / 60)];
    }
  } else if (diffSecs < 86400) {
    if (shortMode) {
      return parseInt(diffSecs / 3600);
    } else {
      return ["mob1.hoursago", "$1 hours ago", parseInt(diffSecs / 3600)];
    }
  } else if (fullDate) {
    return new Date(timestamp).toUTCString();
  } else if (shortMode) {
    return parseInt(diffSecs / 86400);
  } else {
    return ["mob1.daysago", "$1 days ago", parseInt(diffSecs / 86400)];
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
  for (let i = 1; i < MAXPOWER; i++) {
    if (i == 81 || i != 95 && i % 32 == 31) {
      continue;
    }
    let bit = i % 32;
    let index = xInt(i / 32);
    if (w_Powers[index] & 1 << bit) {
      POWERS[i] = 1;
    }
  }
  let extraPowers = PowDecode(w_PowerO);
  if (extraPowers !== null) {
    for (let id = 1; id < MAXPOWER; id++) {
      if (id != 81 && (id == 95 || id % 32 != 31)) {
        if (extraPowers[id]) {
          POWERS[id] = xInt(POWERS[id]) + extraPowers[id];
        }
      }
    }
  }
}
function setDisabledPowers() {
  if (w_Mask != null && (MASKED = [], PSSA || parent?.PSSA)) {
    for (let powerId in PSSA || parent?.PSSA) {
      let index = powerId >> 5;
      let bitTarget = Math.pow(2, powerId % 32);
      if (w_Mask[index] && w_Mask[index] & bitTarget) {
        MASKED[powerId] = 0;
      }
    }
  }
}
function PowDecode(str) {
  if (str == null || str.length == 0) {
    return null;
  }
  let obj = [];
  let parts = (str = str.toString()).split("|");
  for (let i = 0; i < parts.length; i++) {
    let kv = parts[i].split("=");
    let val = xInt(kv[1]);
    if (val <= 0) {
      val = 1;
    }
    if (val > 10000) {
      val = 1;
    }
    obj[kv[0]] = val;
  }
  return obj;
}
function hasPower(powerId, noLog = false) {
  if (!noLog) {
    logHasPowerForPowerId(powerId);
  }
  if (!POWERS || Object.keys(POWERS).length === 0) {
    return !1;
  }
  const isOwned = !!POWERS.hasOwnProperty(powerId) && POWERS[powerId];
  return (!MASKED || !MASKED.hasOwnProperty(powerId)) && isOwned;
}
function logHasPowerForPowerId(powerId) {
  if (powerId != 672) {
    return;
  }
  let logStr = "--- DEBUG // Power Info ---\n\n";
  logStr += "Power ID: " + powerId + "\n";
  logStr += "Total Powers: " + Object.keys(POWERS ?? {}).length + "\n";
  logStr += "Total Masked: " + Object.keys(MASKED ?? {}).length + "\n";
  logStr += "hasPower(" + powerId + ") return value: " + hasPower(powerId, !0) + "\n";
  logStr += "Is power enabled: " + !(MASKED ?? {}).hasOwnProperty(powerId) + "\n";
  logStr += "Is power disabled: " + (MASKED ?? {}).hasOwnProperty(powerId) + "\n";
  logStr += "Is w_Powers null: " + (w_Powers === null) + "\n";
  logStr += "Is PSSA (1) null : " + (PSSA === null) + "\n";
  logStr += "Is PSSA (2) null : " + (parent?.PSSA === null) + "\n";
  doDebugLogs(1, logStr);
}
function doDebugLogs(level, msg) {
  const prefixedMsg = "[XAT] " + msg;
  switch (level) {
    case 1:
      console.info(prefixedMsg);
      break;
    case 2:
      console.warn(prefixedMsg);
      break;
    case 3:
      console.error(prefixedMsg);
      break;
    case 4:
      console.table(msg);
  }
}
function iMux(path, prefix) {
  prefix ||= "i";
  var lastPart = path.substr(-10);
  var sum = 0;
  for (var i = 0; i < 10; i++) {
    sum += lastPart.charCodeAt(i);
  }
  return "https://" + prefix + (sum & 1) + ".xat.com/web_gear/chat/" + path;
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
function SafeImage(url, width, height, isGif) {
  if (url.length == 0) {
    return "";
  }
  var urlObj = parse_url(url);
  if (!urlObj && !(urlObj = parse_url(url = url.charAt(0) == "/" ? "https:" + url : "https://" + url))) {
    return "";
  }
  if (!urlObj.host) {
    return "";
  }
  if (urlObj.host.indexOf("xat.com") >= 0 && (urlObj.path.indexOf("GetImage") > 0 || urlObj.path.indexOf("/chat/av/") >= 0)) {
    return url;
  }
  if (width == height && !isGif) {
    width = height = calcAvSize(width);
  }
  const suffix = IsAnimationOn() ? "s" : "S";
  if (!isBackgroundAnimationOn()) {
    isGif = false;
  }
  let query = suffix + "&W=" + width + "&H=" + height + "&U=" + url;
  if (isGif) {
    query += "&g&otp";
  }
  return "https://i0.xat.com/web_gear/chat/GetImage7.php?" + query;
}
function parse_url(url, component) {
  var keys = ["source", "scheme", "authority", "userInfo", "user", "pass", "host", "port", "relative", "path", "directory", "file", "query", "fragment"];
  var modeData = {};
  var mode = modeData["phpjs.parse_url.mode"] && modeData["phpjs.parse_url.mode"].local_value || "php";
  var patterns = {
    php: /^(?:([^:/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    strict: /^(?:([^:/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:/?#]*)(?::(\d*))?)?((?:[^?#/]*\/)*)([^?#]*)(?:\?([^#]*))?(?:#(.*))?)/,
    loose: /^(?:(?![^:@]+:[^:@/]*@)([^:/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#/]*\.[^?#/.]+(?:[?#]|$)))*\/?)?([^?#/]*))(?:\?([^#]*))?(?:#(.*))?)/
  };
  var matches = patterns[mode].exec(url);
  var result = {};
  for (var i = 14; i--;) {
    if (matches[i]) {
      result[keys[i]] = matches[i];
    }
  }
  if (component) {
    return result[component.replace("PHP_URL_", "").toLowerCase()];
  }
  if (mode !== "php") {
    var queryKeyName = modeObj["phpjs.parse_url.queryKey"] && modeObj["phpjs.parse_url.queryKey"].local_value || "queryKey";
    var regexes = /(?:^|&)([^&=]*)=?([^&]*)/g;
    result[queryKeyName] = {};
    (result[keys[12]] || "").replace(regexes, function (fullMatch, key, val) {
      if (key) {
        result[queryKeyName][key] = val;
      }
    });
  }
  delete result.source;
  return result;
}
function xEscape(char) {
  return "%" + char.charCodeAt(0).toString(16).toUpperCase();
}
function rfc3986EncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*~]/g, xEscape);
}
function addSmilies(smilieJson, otherJson, powerJson, ownedPowerJson, stopJson) {
  if (!syel) {
    syel = JSON.parse(smilieJson);
    soth = JSON.parse(otherJson);
    spow = JSON.parse(powerJson);
    spowhave = JSON.parse(ownedPowerJson);
    stop = JSON.parse(stopJson);
  }
}
function detectIE() {
  var ua = window.navigator.userAgent;
  var msiePos = ua.indexOf("MSIE ");
  if (msiePos > 0) {
    Browser = "MS";
    return parseInt(ua.substring(msiePos + 5, ua.indexOf(".", msiePos)), 10);
  }
  if (ua.indexOf("Trident/") > 0) {
    Browser = "MS";
    var rvPos = ua.indexOf("rv:");
    return parseInt(ua.substring(rvPos + 3, ua.indexOf(".", rvPos)), 10);
  }
  var edgePos = ua.indexOf("Edge/");
  if (edgePos > 0) {
    Browser = "MS";
    return parseInt(ua.substring(edgePos + 5, ua.indexOf(".", edgePos)), 10);
  } else {
    if (ua.toLowerCase().indexOf("firefox") > -1) {
      Browser = "FF";
    } else if (ua.indexOf("Chrome") > -1) {
      Browser = "CR";
    } else if (ua.indexOf("Safari") > -1) {
      Browser = "SF";
    }
    return false;
  }
}
function setTextBoxEditable(id, isEditable) {
  var el = document.getElementById(id);
  if (el) {
    el.setAttribute("contenteditable", isEditable);
    if (isEditable) {
      el.classList.add("textBox", "textBoxEdit");
    } else {
      el.classList.remove("textBox", "textBoxEdit");
    }
  }
  return el;
}
function isString(val) {
  return Object.prototype.toString.call(val) === "[object String]";
}
function isConnected() {
  return _Activity.instance.IsConnected();
}
function resizeSearchBar(el) {
  if (el) {
    el.style.width = window.innerWidth - 20 + "px";
    window.addEventListener("resize", () => {
      el.style.width = window.innerWidth - 20 + "px";
    });
  }
}
String.prototype.hashCode = function () {
  var hash = 0;
  if (this.length == 0) {
    return hash;
  }
  for (var i = 0; i < this.length; i++) {
    hash = (hash << 5) - hash + this.charCodeAt(i);
    hash &= hash;
  }
  return hash;
};
detectIE();
var settingsPage = !1;
function setFrameVis(frameName) {
  if (!settings?.toSave) {
    const frameMap = {
      selector: 1,
      settings: 1,
      actions: 1
    };
    if (frameName && frameName === "settings") {
      settingsPage = true;
    }
    if (Classic) {
      reportsDrop();
    }
    for (var key in frameMap) {
      var frameEl = document.getElementById(key + "Frame");
      if (frameEl) {
        if (key == frameName) {
          frameEl.classList.remove("d-none");
        } else {
          frameEl.classList.add("d-none");
        }
      }
    }
    var dialogEl = document.getElementById("FrameDialog");
    var backEl = document.getElementById("FrameBack");
    butsFrame = dialogEl;
    var reportIcon = document.getElementById("reportIconClassic");
    if (reportIcon) {
      reportIcon.classList.add("d-none");
    }
    if (frameName) {
      removeClass("d-none", "Overlays");
      removeClass("d-none", "OverlaysClassic");
    } else {
      addClass("d-none", "Overlays");
      addClass("d-none", "OverlaysClassic");
      if (dialogEl) {
        dialogEl.classList.add("d-none");
      }
      if (backEl) {
        backEl.classList.add("d-none");
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
  const mode = localStorage.getItem("pstylePreviewMode");
  return mode && mode === "1";
}
function reloadSettingsIframe() {
  let frame = findNodeInWindowOrParent("#settingsFrame");
  if (!frame || !frame.contentWindow) {
    return;
  }
  let win = frame.contentWindow;
  win?.location?.reload();
  if (isPstylePreviewEnabled()) {
    const onLoad = () => {
      loadPstyleTabInSettings(frame);
      frame.removeEventListener("load", onLoad);
    };
    frame.addEventListener("load", onLoad);
  }
}
function loadPstyleTabInSettings(frame) {
  const params = {
    UserNo: _Activity.instance.MyId,
    tab: "pstyle"
  };
  const pstyleParams = params;
  classicSetDialog("actions", _Activity.instance.MyId);
  classicSetDialog("settings", pstyleParams);
  localStorage.removeItem("pstylePreviewMode");
}
function resetPstylePreview() {
  localStorage.removeItem("pstylePreviewMode");
  localStorage.removeItem("pstyleTmp");
}
function doSelector(data) {
  selector.initLang(Language);
  posModal(butsFrame, {
    mw: 900
  });
  selector.UserNo = data.UserNo;
  selector.MyObj = MyObj ? config : data.Config;
  switch (data.Type) {
    case "Powers":
      selector.Powers = data.Powers;
      selector.MainObj = data.MainObj;
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
      selector.stickers(data.Pack);
      break;
    case "Gifts":
      let targetUserId = data.MainObj ? data.MainObj.user[0] : data.UserNo;
      selector.gifts(targetUserId);
      break;
    case "Marry":
    case "Divorce":
      selector.id = data.MainObj.id;
      selector.regname = data.MainObj.regname;
      selector.doKisses(data.Type);
  }
}
let copyright = document.getElementById("copyrightyear");
function classicSetDialog(type, data) {
  if (type !== "profile" && type !== "actions") {
    cleanupPstyleClasses(document);
  }
  let overlayEl = document.getElementById("Overlays");
  overlayEl ||= document.getElementById("OverlaysClassic");
  if (!overlayEl) {
    parent.classicSetDialog(type, data);
    return;
  }
  let userId = xInt(data);
  var targetFrameName;
  if (!userId && data.MainObj && data.MainObj.user) {
    userId = xInt(data.MainObj.user[0].id);
  }
  if (!userId && MyObj) {
    userId = xInt(MyObj.MyId);
  }
  switch (type) {
    case "selector":
      targetFrameName = "selector";
      break;
    case "settings":
      targetFrameName = type;
      break;
    default:
      targetFrameName = "actions";
  }
  setFrameVis(targetFrameName);
  overlayEl = document.getElementById("FrameDialogCloseBut");
  if (overlayEl) {
    overlayEl.onclick = function () {
      setFrameVis();
    };
  }
  overlayEl = document.getElementById("FrameBack");
  if (overlayEl) {
    overlayEl.onclick = function () {
      setFrameVis();
    };
  }
  const frameWin = document.getElementById(targetFrameName + "Frame").contentWindow;
  switch (type) {
    case "settings":
      settingsWindow = frameWin;
      settings = frameWin.settings;
      if (data.tab) {
        userId = data.UserNo;
        setTimeout(() => {
          settings.doTab(data.tab);
        }, 250);
      }
      break;
    case "selector":
      removeClass("d-none", "FrameDialog");
      removeClass("d-none", "FrameBack");
      selector = frameWin.selector;
      doSelector(data);
      userId = data.UserNo;
      break;
    default:
      if ((actions = frameWin.actions)) {
        actions?.clearall();
        actions.Visible = true;
      }
  }
  let appFrameEl = document.getElementById("appframe");
  if (appFrameEl) {
    appFrameEl = appFrameEl.contentWindow;
    appFrameEl.actions = actions;
    appFrameEl.selector = selector;
    appFrameEl.settings = settings;
  }
  ToC({
    Command: "LoadClassicDialog",
    Type: type,
    UserNo: userId
  });
  if (["settings", "selector"].includes(type)) {
    setCstyle();
  }
}
function getHash(str) {
  let hash = 0;
  let len = str.length;
  for (var i = 0; i < len; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}
function hasDarkMode() {
  let val = JSON.parse(localStorage.getItem("Settings"))?.darkmode;
  return val && val == "enable";
}
function setdarkmode(mode) {
  let effectiveMode = mode || hasDarkMode();
  if (effectiveMode && effectiveMode != "disable") {
    if (effectiveMode && _Activity.instance.IsClassic) {
      document.body.classList.add("dark");
    } else if (effectiveMode && !_Activity.instance.IsClassic) {
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
  let val = JSON.parse(localStorage.getItem("Settings"))?.hideuserlist;
  return val || "enable";
}
function hasStealthMode() {
  let val = JSON.parse(localStorage.getItem("Macros"))?.Stealth;
  return val && val == "enable";
}
function getFavoriteGroups() {
  let favsStr = JSON.parse(localStorage.getItem("Settings"))?.favorites;
  if (favsStr) {
    return JSON.parse(favsStr.replace(/”/g, "\""));
  } else {
    return {};
  }
}
function hasGroupInFavorite() {
  let groupName = config.GroupName;
  if (!groupName) {
    return;
  }
  let favs = getFavoriteGroups();
  favs ||= {};
  if (!Object.keys(favs).length) {
    return !1;
  }
  for (let key in favs) {
    if (favs[key].g && favs[key].g.toLowerCase() == groupName.toLowerCase()) {
      return !0;
    }
  }
  return !1;
}
function addRemoveFavorites(chatId, groupName) {
  let favs = getFavoriteGroups();
  let targetGroupName = groupName || config.GroupName;
  let targetChatId = chatId || config.chatid;
  targetGroupName = targetGroupName.toLowerCase();
  if (favs[targetGroupName]) {
    delete favs[targetGroupName];
  } else {
    favs[targetGroupName] = {
      id: targetChatId,
      g: targetGroupName
    };
  }
  return saveSetting("favorites", JSON.stringify(favs));
}
function getIgnoredUsers() {
  const list = JSON.parse(localStorage.getItem("w_ignorelist2"));
  return list || {};
}
function getBlockedUsers() {
  const friends = JSON.parse(localStorage.getItem("w_friendlist3"));
  const blocked = {};
  for (const userId in friends) {
    if (Object.hasOwnProperty.call(friends, userId) && friends[userId].f & 32) {
      blocked[userId] = friends[userId].R.length ? friends[userId].R : userId;
    }
  }
  return blocked;
}
function getSettingsValue(settingKey) {
  let settingsObj = {};
  try {
    const settingsStr = localStorage.getItem("Settings");
    if (settingsStr) {
      settingsObj = JSON.parse(settingsStr);
    }
  } catch (err) {}
  return settingsObj[settingKey] || "enable";
}
function unignoreUser(userId) {
  if (!userId) {
    return;
  }
  let payload = {
    name: "Unignore"
  };
  payload.UserNo = userId;
  payload.Page = "actions";
  payload.Command = "Action";
  payload.Type = "Action";
  return ToC(payload);
}
function unblockUser(userId) {
  if (userId) {
    ToC({
      Command: "Block",
      UserNo: userId
    });
  }
}
function StripSmilies(str) {
  var openIdx;
  var closeIdx;
  for (str = Replace(str, [":)", ":-)", ":d", ";)", ";-)", ":o", ":-o", ":p", ":@", ":s", ":$", ":(", ":-(", ":'(", "|-)", "8-)", ":|", ":-|", ":-*", ":[", ":-["]); str.indexOf("<") != -1;) {
    openIdx = str.indexOf("<");
    closeIdx = str.indexOf(">", openIdx);
    str = closeIdx != -1 ? str.substr(0, openIdx) + str.substr(closeIdx + 1) : str.substr(0, openIdx) + str.substr(openIdx + 1);
  }
  while (str.indexOf("(") != -1) {
    openIdx = str.indexOf("(");
    closeIdx = str.indexOf(")", openIdx);
    str = closeIdx != -1 ? str.substr(0, openIdx) + str.substr(closeIdx + 1) : str.substr(0, openIdx) + str.substr(openIdx + 1);
  }
  while (str.indexOf("[") != -1) {
    openIdx = str.indexOf("[");
    closeIdx = str.indexOf("]", openIdx);
    str = closeIdx != -1 ? str.substr(0, openIdx) + str.substr(closeIdx + 1) : str.substr(0, openIdx) + str.substr(openIdx + 1);
  }
  return str;
}
function Replace(str, pairs) {
  for (let i = 0; i < pairs.length; i += 2) {
    while (str.indexOf(pairs[i]) != -1) {
      let idx = str.indexOf(pairs[i]);
      str = str.substr(0, idx) + pairs[i + 1] + str.substr(idx + pairs[i].length);
    }
  }
  return str;
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
  constructor(text) {
    this.text = text;
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
  show(duration, extraText) {
    if (extraText && Array.isArray(this.text)) {
      this.text.push(extraText);
    }
    this.snackbar.innerHTML = "";
    addText(this.snackbar, this.text);
    this.snackbar.classList.remove("hide");
    this.snackbar.classList.add("show");
    setTimeout(() => {
      this.hide();
    }, duration || 2000);
  }
  hide() {
    this.snackbar.classList.remove("show");
    this.snackbar.classList.add("hide");
  }
}
function signInButtonPressed(doSignIn) {
  var payload;
  payload = {
    Command: "signInButtonPressed"
  };
  if (doSignIn !== undefined) {
    payload.DoSignIn = doSignIn;
  }
  ToC(payload);
}
let xAreaMob = document.querySelectorAll(".xAreaMob");
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && xAreaMob) {
  for (var i = 0; i < xAreaMob.length; i++) {
    xAreaMob[i].classList.add("xAreaMobAct");
  }
}
function customModalWithMsg(title, msg, showClose, isAnnounce, isGroupPage) {
  let container = makeElement(null, "div");
  let content = makeElement(container, "div", isAnnounce ? "AnnounceDialog" : "modalDialogContentClassic");
  let header = makeElement(content, "div", isAnnounce ? "AnnounceHeaFoo" : "dialogTitleBar NewTitleBar");
  let logo = makeElement(content, "img", "AnnounceFooLogo");
  let titleEl = makeElement(header, "span", "dialogTitle link NewDialogTitle", "openLink");
  let body = makeElement(content, "div", isAnnounce ? "AnnounceBody" : "dialogBody NewdialogBody");
  let padding = makeElement(body, "div", "dialogPadding");
  let wrapper = makeElement(padding, "div", isAnnounce ? "" : "wrapper", "wrapper");
  let frameBack = document.querySelector("#FrameBack");
  if (isAnnounce) {
    logo.src = "svg/xatlogo.svg";
    logo.alt = "xat";
    logo.width = "65";
  }
  if (showClose) {
    const closeIconPath = isGroupPage ? Classic ? "svg/remove" + (toHex6(config.ButColW)[0] == "0" ? "b" : "w") + ".svg" : "svg/removew.svg" : isAnnounce ? "svg/removew.svg" : "svg/removeb.svg";
    let closeImg = makeElement(null, "img");
    closeImg.src = closeIconPath;
    closeImg.alt = "close";
    closeImg.width = isAnnounce ? "11" : "16";
    closeImg.classList.add("closeAnnounceImg");
    makeElement(header, "span", isAnnounce ? "AnnounceClose" : "dialogTitleAction", "id_ModalClose_custom").appendChild(closeImg);
  }
  if (isGroupPage) {
    content.classList.add("gpModal");
    frameBack?.classList?.remove("d-none");
  }
  addText(titleEl, isAnnounce ? "" : title);
  content.dataset.w = isGroupPage ? 0.9 : 0.6;
  addText(wrapper, isAnnounce ? atob(msg) : msg, !!isAnnounce);
  HiddenDivs.AlertDialog = container.innerHTML;
  doModal("AlertDialog", {}, !0, !0);
  document.querySelector("#id_ModalClose_custom")?.addEventListener("click", () => {
    modalClose();
    if (isGroupPage) {
      frameBack?.classList?.add("d-none");
    }
    if (isAnnounce) {
      updateAnnounceStorage(msg);
    }
  });
}
function setAnnounce(msg) {
  let savedMsg = localStorage.getItem("announce_message");
  if (!savedMsg || savedMsg && savedMsg !== msg) {
    customModalWithMsg("Announcement", msg, true, true);
  }
  return !1;
}
function updateAnnounceStorage(msg) {
  if (_Activity.instance.IsClassic || !_Activity.instance.IsClassic && localStorage.getItem("mobCookies") == 1) {
    return localStorage.setItem("announce_message", msg);
  }
}
function replaceBrackets(str) {
  if (!str) {
    return "";
  }
  if (str.indexOf("[") >= 0 && str.indexOf("❯") >= 0) {
    let bracketRegex = /❯.*\[.*?\]/g;
    let splitRegex = /\s+(?![^\[]*\]|[^(]*\)|[^\{]*})/;
    let parts = str.split(splitRegex);
    if (parts.length > 0) {
      for (let partIdx in parts) {
        if (parts[partIdx].match(bracketRegex)) {
          parts[partIdx] = parts[partIdx].replace(bracketRegex, "");
        }
      }
    }
    return parts.join(" ").replace(/\[/gi, "{").replace(/\]/gi, "}");
  }
  return cleanXatTagsIcons(str.replace(/\[/gi, "{").replace(/\]/gi, "}"));
}
function assignUnassign(selectEl, action) {
  if (!selectEl || ["Assign", "Unassign"].indexOf(action) == -1) {
    return;
  }
  let val = selectEl.value;
  if (val) {
    return ToC({
      Type: "Assign",
      p: val,
      a: action == "Assign" ? 1 : 0
    });
  } else {
    return undefined;
  }
}
function updateAllFrame(mode) {
  if (!mode) {
    return;
  }
  let frameIds = ["selectorFrame", "settingsFrame", "actionsFrame"];
  for (let idx in frameIds) {
    let frameNode = findNodeInWindowOrParent("#" + frameIds[idx]);
    if (!frameNode || !frameNode.contentWindow) {
      return;
    }
    let frameWin = frameNode.contentWindow;
    if (mode == "enable") {
      if (frameIds[idx] == "settingsFrame") {
        frameWin.document.body?.querySelector(".wrapper")?.classList.add("darkWrapper");
        frameWin.location.reload();
      } else {
        frameWin.document.body.classList.add("dark");
      }
    } else if (frameIds[idx] == "settingsFrame") {
      frameWin.document.body?.querySelector(".wrapper")?.classList.remove("darkWrapper");
      frameWin.location.reload();
    } else {
      frameWin.document.body.classList.remove("dark");
    }
  }
}
function setLoader(show, id) {
  let el = document.querySelector(id ? "#" + id : "#loading");
  if (el) {
    if (show) {
      el.classList.remove("d-none");
      el.innerHTML = "<div id=\"xatLoader\"><div id=\"xatLoaderInner\"><img id=\"planet\" src=\"svg/x.svg\"><img id=\"rocket\" src=\"svg/ss.svg\"></div></div>";
    } else {
      el.classList.add("d-none");
      el.innerHTML = "";
    }
  }
}
function urlPost(url, body) {
  return new Promise((resolve, reject) => {
    let opts = {
      method: "GET"
    };
    if (body) {
      opts.method = "POST";
      opts.body = body;
    }
    fetch(url, opts).then(function (resp) {
      return resp.json();
    }).then(function (data) {
      resolve(data);
    }).catch(err => reject(err));
  });
}
function specialEvents(eventType, callback) {
  let match = !1;
  const now = new Date();
  now.getDate();
  now.getMonth();
  if (Array.isArray(eventType)) {
    for (let idx in eventType) {
      specialEvents(eventType[idx], callback);
    }
  }
  switch (eventType) {
    case "easter":
    case "xmas":
    case "xatbday":
      break;
    default:
      match = !1;
  }
  if (match && callback) {
    callback();
  }
}
function initFools() {
  const groupName = config.GroupName.toLowerCase();
  let fooledList = localStorage.getItem("wasFooledList");
  if (!localStorage.getItem("foundFools")) {
    fooledList ||= [];
    try {
      fooledList = JSON.parse(fooledList);
    } catch (err) {
      fooledList = [];
    }
    if (fooledList.indexOf(groupName) == -1) {
      fooledList.push(groupName);
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
          localStorage.setItem("wasFooledList", JSON.stringify(fooledList));
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
function filter(val) {
  if (isNaN(val) && val !== undefined) {
    val = val.replace(new RegExp("['\"<>&]", "gi"), "").replace(/\\/gi, "");
  }
  return val;
}
function isValidHex(val) {
  return /^#[0-9A-F]{6}$/i.test(val);
}
function cleanXatTagsIcons(str) {
  if (str) {
    return str.replace(/<priv>/gi, "").replace(/❮priv❯/gi, "").replace(/<inf8>/gi, "").replace(/❮inf8❯/gi, "").replace(/<i>/gi, "").replace(/❮i❯/gi, "").replace(/<in>/gi, "").replace(/❮in❯/gi, "");
  } else {
    return "";
  }
}
function isXatBirthday(exact = false) {
  const now = new Date();
  const day = now.getDate();
  return (exact ? day == 17 : day >= 15 && day < 19) && now.getMonth() + 1 == 9;
}
function reduceTextLength(text) {
  if (!text) {
    return "";
  }
  let limit = 256;
  const lowerText = text.toLowerCase();
  if (lowerText.includes("(stick#") || lowerText.includes("#stick#")) {
    limit = 512;
  }
  if (text.length > limit) {
    return text.substring(0, limit);
  } else {
    return "";
  }
}
function handleMaxLength(ev, el) {
  return !(el.textContent.length >= 256) || ev.code == "Backspace" || ev.code == "Delete" || ev.code == "Space" || ev.code == "ArrowLeft" || ev.code == "ArrowRight" || ev.code == "ArrowUp" || ev.code == "ArrowDown" || ev.code == "Home" || ev.code == "End" || ev.code == "ControlLeft" || !!ev.ctrlKey && (ev.code == "KeyA" || ev.code == "KeyE" || ev.code == "KeyV" || ev.code == "KeyC" || ev.code == "KeyX") || (ev.preventDefault(), !1);
}
function setPageAndSendTtth(targetUserId = null) {
  loadKiss("Ttth", targetUserId);
  setTimeout(() => {
    _Activity?.instance?.SetPage("chats");
  }, 1000);
}
function returnOwnedPowers() {
  let owned = [];
  const instance = _Activity?.instance;
  const pssa = instance?.PSSA;
  const topsh = instance?.TOPSH;
  const collections = instance?.UCOLLECTIONS;
  if (pssa) {
    const filteredPssa = pssa.filter((val, idx) => hasPower(idx - 1) || collections[idx - 1]);
    owned.push(...filteredPssa);
  }
  if (topsh) {
    for (const [key, id] of Object.entries(topsh)) {
      if ((hasPower(id) || collections[id]) && id > 45) {
        owned.push(key);
      }
    }
  }
  return owned;
}
function hasMobCookiesEnabled() {
  if (_Activity.instance.IsClassic) {
    return !0;
  }
  const todoVal = localStorage.getItem("todo");
  if (todoVal == null || !todoVal.length) {
    return !1;
  }
  try {
    return localStorage.getItem("mobCookies") == 1;
  } catch (err) {
    return !1;
  }
}
function focusAndPutCaretAtPosition(el, targetPos) {
  if (!el) {
    return;
  }
  el.focus();
  const range = document.createRange();
  const sel = window.getSelection();
  let node = el;
  let pos = targetPos;
  while (node && pos > 0) {
    if (node.nodeType === 3) {
      if (node.length >= pos) {
        range.setStart(node, pos);
        range.collapse(true);
        break;
      }
      pos -= node.length;
    } else {
      node = node.firstChild;
    }
    if (!node) {
      break;
    }
  }
  sel.removeAllRanges();
  sel.addRange(range);
}
function insertTextAtCaret(text, el, doScroll = false) {
  if (!el) {
    return;
  }
  const cleanText = text.replace(/<\/?[^>]+(>|$)/g, "");
  if (!el.innerText.trim().length) {
    el.innerHTML = "";
  }
  if (window.getSelection) {
    const sel = window.getSelection();
    let range;
    if (sel.rangeCount > 0 && el.contains(sel.anchorNode)) {
      range = sel.getRangeAt(0);
    } else {
      range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
    }
    range.deleteContents();
    const node = document.createTextNode(cleanText);
    try {
      range.insertNode(node);
    } catch (err) {
      document.execCommand("insertText", false, cleanText);
      return;
    }
    range.setStartAfter(node);
    range.setEndAfter(node);
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (document.selection && document.selection.createRange) {
    el.focus();
    document.selection.createRange().text = cleanText;
  }
  el.focus();
  if (doScroll) {
    el.dispatchEvent(new CustomEvent("checkScroll"));
  }
}
function getAvatarFrameUrl(frameId) {
  return "https://i0.xat.com/images/avframes/" + frameId + ".webp";
}
function getAvatarEffectUrl(effectId, color, speed) {
  return "https://i0.xat.com/web_gear/chat/avatareffects.php?e=" + effectId + "&f=" + (speed !== undefined ? speed : 15) + "&c=" + (color || "").replace("#", "");
}
function initAvatarEffect(userObj, containerEl, overriddenEffect) {
  const effect = overriddenEffect !== undefined && overriddenEffect != null && typeof overriddenEffect == "object" ? overriddenEffect : userObj.avatarEffect || {};
  const frameId = effect && effect.avatarframe;
  const effectId = effect && effect.avatareffect;
  const isRounded = effect && (effect.avatarrounded === "true" || !0 === effect.avatarrounded);
  function moveBgToInner(targetOverride) {
    const target = targetOverride || containerEl;
    const bgImg = containerEl.style.backgroundImage || typeof getComputedStyle != "undefined" && getComputedStyle(containerEl).backgroundImage;
    if (!bgImg || bgImg === "none") {
      return;
    }
    let innerDiv = target.querySelector(".avInner");
    if (!innerDiv) {
      innerDiv = document.createElement("div");
      innerDiv.className = "avInner";
      target.insertBefore(innerDiv, target.firstChild);
    }
    target.style.setProperty("--av-inner-bg", bgImg);
    target.style.setProperty("--av-inner-bg-size", "cover");
    target.style.setProperty("--av-inner-bg-position", containerEl.style.backgroundPosition || "center");
    target.style.setProperty("--av-inner-bg-repeat", "no-repeat");
    containerEl.style.backgroundImage = "none";
  }
  if (frameId) {
    const frameIdVar = effect.avatarframe;
    const frameUrl = getAvatarFrameUrl(frameIdVar);
    containerEl.classList.add("avBase", "avFrameNew");
    if (containerEl.parentElement) {
      containerEl.parentElement.style.overflow = "visible";
    }
    containerEl.style.setProperty("--av-frame", "url('" + frameUrl + "')");
    let circleDiv = containerEl.querySelector(".avCircle");
    if (!circleDiv) {
      circleDiv = document.createElement("div");
      containerEl.insertBefore(circleDiv, containerEl.firstChild);
    }
    circleDiv.className = isRounded ? "avCircle avCircleClip" : "avCircle";
    if (effectId) {
      const effectUrl = getAvatarEffectUrl(effect.avatareffect, effect.avatarcolor, effect.avatarspeed);
      circleDiv.classList.add("avBase", "avEffect");
      if (isRounded) {
        circleDiv.classList.add("avEffectRound");
      }
      circleDiv.style.setProperty("--av-eff", "url('" + effectUrl + "')");
    }
    const frameNameLower = String(frameIdVar).toLowerCase();
    const frameDef = avatarFrames.find(f => f.name === frameNameLower);
    if (frameDef) {
      containerEl.style.setProperty("--av-frame-scale", frameDef.scale);
    }
    moveBgToInner(circleDiv);
    let frameImg = containerEl.querySelector(".avFrameLayer");
    if (!frameImg) {
      frameImg = document.createElement("img");
      frameImg.className = "avFrameLayer";
      frameImg.alt = "";
      frameImg.draggable = false;
      containerEl.appendChild(frameImg);
    }
    frameImg.src = frameUrl;
    const scale = frameDef ? frameDef.scale : 1.2;
    frameImg.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;object-fit:contain;z-index:100;pointer-events:none;border:none;outline:none;display:block;transform:scale(" + scale + ");transform-origin:center center";
  } else if (effectId) {
    const effectUrlOnly = getAvatarEffectUrl(effect.avatareffect, effect.avatarcolor, effect.avatarspeed);
    containerEl.classList.add("avBase", "avEffect");
    containerEl.style.setProperty("--av-eff", "url('" + effectUrlOnly + "')");
  }
  if (isRounded && !frameId) {
    containerEl.classList.add("avBase", "avRound", "avEffectRound");
    moveBgToInner();
  }
}
function xEncodeURIComponent(str) {
  return str.replace(/[!'()*]/g, function (char) {
    return "%" + char.charCodeAt(0).toString(16);
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
const setCstyle = function (jsonStr = "", forcePool = false) {
  jsonStr ||= _Activity.instance.cStyle;
  const allButtons = document.querySelectorAll("#visitorsContainer ul li.section, .butcontainer");
  const rankSections = document.querySelectorAll("#visitorsContainer ul li.section");
  const innerButtons = document.querySelectorAll(".butcontent:not(.mainButtons)");
  let styleObj = {};
  try {
    styleObj = JSON.parse(jsonStr);
  } catch (err) {
    console.error("Failed:", err);
    return;
  }
  let {
    csTheme: themeId,
    csPool: poolColor,
    csFont: fontFamily,
    csButtonBorder: buttonBorderStyle,
    csNameFx: nameFxColor,
    csChatShape: chatShape,
    csChatBorder: chatBorderColor,
    csShadow: shadowColor,
    csRankBan: styleRankBan
  } = styleObj;
  const theme = gradientThemes[themeId];
  if (theme && !forcePool) {
    applyThemeStyles(themeId, allButtons, rankSections, styleRankBan, innerButtons);
  } else if (poolColor) {
    applyPoolStyles(poolColor, rankSections, styleRankBan);
  }
  if (fontFamily) {
    applyFontStyles(fontFamily, allButtons, innerButtons);
  }
  if (borderStyles[buttonBorderStyle]) {
    applyButtonBorder(buttonBorderStyle, allButtons);
  }
  if (nameFxColor) {
    applyNameFx(nameFxColor, poolColor, theme);
  }
  if (chatShape || chatBorderColor || shadowColor && Classic) {
    applyChatBoxStyle(chatShape, chatBorderColor, shadowColor);
  }
};
function applyPoolStyles(poolColor, rankSections, styleRankBan) {
  if (!poolColor || !isValidHex(poolColor)) {
    return;
  }
  const color = poolColor;
  const contrastColor = isColorLight(color) ? "#000" : "#fff";
  rankSections?.forEach(section => {
    const isRankOrBan = section.classList.contains("rank") || section.classList.contains("ban");
    if (styleRankBan === "true" || !isRankOrBan) {
      section.style.backgroundColor = color;
      section.style.color = contrastColor;
    }
  });
}
function applyThemeStyles(themeId, allButtons, rankSections, styleRankBan, innerButtons) {
  const {
    bgStart: bgStart,
    bgEnd: bgEnd
  } = gradientThemes[themeId];
  const returnBtn = document.querySelector("#returnBtn");
  const titleBar = parent.Classic ? findNodeInWindowOrParent(".dialogTitleBar") : document.querySelector(".actionsDialog");
  const titleText = findNodeInWindowOrParent(".dialogTitle");
  const removeIcon = findNodeInWindowOrParent("#removeIcon");
  const modalCloseImgs = document.querySelector("#id_ModalClose_custom img, #modalCancel img, #id_ModalClose img");
  const reportIcon = findNodeInWindowOrParent("#reportIcon");
  const actionRight = document.querySelector(".dialogActionRight");
  allButtons?.forEach(btn => {
    applyGradientStyle(btn, bgStart, bgEnd);
  });
  rankSections?.forEach(section => {
    if (styleRankBan === "true") {
      applyGradientStyle(section, bgStart, bgEnd);
    } else if (section.classList.contains("rank")) {
      applyGradientStyle(section, "#484848", "#a6a6a6");
    } else if (section.classList.contains("ban")) {
      applyGradientStyle(section, "#462200", "#b95d00");
    } else {
      applyGradientStyle(section, bgStart, bgEnd);
    }
  });
  if (returnBtn) {
    returnBtn.style.stroke = "#fff";
  }
  applyTitleBarStyles(titleBar, titleText, removeIcon, reportIcon, bgStart, bgEnd, modalCloseImgs);
  applyStyleForEach(innerButtons, "color", "#fff");
  applyGradientStyle(actionRight, bgStart, bgEnd);
  ["dialogTitleBar"].forEach(className => {
    findNodeInWindowOrParent("." + className, !0)?.forEach(el => {
      const title = el.querySelector(".dialogTitle");
      applyTitleBarStyles(el, title, null, null, bgStart, bgEnd);
    });
  });
}
function applyFontStyles(fontFamily, allButtons, innerButtons) {
  const svgBacks = document.querySelectorAll(".butIcons .svgBack");
  applyStyleForEach(allButtons, "fontFamily", fontFamily);
  if (smallFontStyles.includes(fontFamily)) {
    applyStyleForEach(innerButtons, "fontSize", "10px");
    applyStyleForEach(svgBacks, "width", "1.3rem");
    applyStyleForEach(svgBacks, "height", "1.3rem");
  }
}
function applyButtonBorder(buttonBorderStyle, allButtons) {
  const butIcons = document.querySelectorAll(".butIcons");
  const isSkewed = buttonBorderStyle === "skewedLeft" || buttonBorderStyle === "skewedRight";
  applyStyleForEach(allButtons, "borderRadius", borderStyles[buttonBorderStyle]);
  if (isSkewed) {
    applyStyleForEach(butIcons, "marginLeft", "6px");
  }
}
function applyNameFx(nameFxColor, poolColor, theme) {
  if (!isValidHex(nameFxColor)) {
    return;
  }
  const nameEl = document.querySelector(".grpName .section");
  const butColW = toHex6(config.ButColW);
  let baseColor;
  if (nameEl) {
    if (theme) {
      baseColor = "ffffff";
    } else if (poolColor) {
      baseColor = isColorLight(poolColor) ? "000000" : "ffffff";
    } else if (butColW) {
      baseColor = butColW;
    }
    nameEl.style.color = "#" + baseColor + "63";
    nameEl.classList.add("csNameFx");
    nameEl.style.backgroundImage = "linear-gradient(70deg, #" + baseColor + " 45%, " + nameFxColor + "9c 50%, #" + baseColor + " 55%)";
  }
}
function applyChatBoxStyle(chatShape, chatBorderColor, shadowColor) {
  const embedFrame = parent?.parent?.document.querySelector("#embedframe:not(.hmemb)");
  var frame;
  if (embedFrame) {
    if ((frame = embedFrame)) {
      if (chatShape == "csRounded") {
        frame.style.borderRadius = "15px";
      }
      if (chatBorderColor && isValidHex(chatBorderColor)) {
        frame.style.border = "2px solid " + chatBorderColor;
      }
      if (shadowColor && isValidHex(shadowColor)) {
        frame.style.boxShadow = "0 0 20px " + shadowColor;
      }
    }
  }
}
function applyGradientStyle(el, bgStart, bgEnd) {
  if (el) {
    el.style.background = "linear-gradient(225deg, " + bgStart + " 0%, " + bgEnd + " 100%)";
    el.style.color = "#fff";
  }
}
function applyTitleBarStyles(titleBar, titleText, removeIcon, reportIcon, bgStart, bgEnd, modalCloseImgs) {
  if (titleBar) {
    applyGradientStyle(titleBar, bgStart, bgEnd);
  }
  if (titleText) {
    titleText.style.color = "#fff";
  }
  [removeIcon, reportIcon, modalCloseImgs].forEach(el => {
    if (el) {
      el.src = el === reportIcon ? "svg/reportw.svg" : "svg/removew.svg";
    }
  });
}
function applyStyleForEach(elements, styleProp, styleVal) {
  elements?.forEach(el => {
    el.style[styleProp] = styleVal;
  });
}
function initFlix(id) {
  _Activity.initFlix(id);
}
function HandleFlix(data) {
  return _Activity.HandleFlix(data);
}
function setPawnHueValues(vals) {
  _Activity.setPawnHueValues(vals);
}
function setCurrentPawnPreview(pawn) {
  _Activity.instance.Settings.setCurrentPawnPreview(pawn);
}
async function copyToClipboard(text) {
  if (!isSecureContext || !navigator.clipboard?.writeText) {
    let err1 = GetTranslation("mob2.clipboarderrorone");
    err1 ||= "Clipboard API is current unavailable. Ensure you are using a secure page and that your browser is up to date.";
    AlertMessage(err1);
  }
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch (err) {
    if ((err?.name || "") === "NotAllowedError" && window.top !== window) {
      let err2 = GetTranslation("mob2.clipboarderrortwo");
      err2 ||= "Cannot copy to clipboard. Iframe must be allowed to write to clipboard, please contact the site administrator to resolve this issue.";
      AlertMessage(err2);
      return;
    }
  }
  {
    let err3 = GetTranslation("mob2.clipboarderrorthree");
    err3 ||= "Cannot copy to clipboard, please contact the site administrator to resolve this issue.";
    AlertMessage(err3);
  }
}
function cleanupPstyleClasses(root, isLegacy) {
  const statusEl = isLegacy ? document.getElementById("status") : document.getElementById("statusNew");
  const buttons = document.querySelectorAll(".butcontainer");
  const titleBar = Classic ? parent.document.querySelector(".dialogTitleBar") : document.querySelector(".htmlTitleBar");
  const nameEl = document.getElementById("name");
  const onPEl = document.getElementById("onP");
  const profileImgs = document.querySelectorAll(".profileIc img");
  const innerTitleBar = root?.querySelector(".dialogTitleBar");
  const innerActionRight = root?.querySelector(".dialogActionRight");
  [...profileImgs, onPEl, nameEl].filter(Boolean).forEach(el => {
    window.kPstyleKeys.forEach(key => el.classList.remove(key));
    el.classList.remove("psinfo-front", "psinfo-back");
  });
  [...buttons, titleBar, innerTitleBar, innerActionRight, !isLegacy && statusEl ? statusEl : null].filter(Boolean).forEach(el => {
    window.kPstyleKeys.forEach(key => el.classList.remove(key));
    el.classList.remove("pstyleFx");
  });
}