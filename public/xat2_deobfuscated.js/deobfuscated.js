"use strict";
var _Activity;
function loadKiss(_0x3d9d4b, _0x3e672b, _0x1a79a8, _0x2bf587, _0x5779fa, _0x40c8f9) {
  let _0x288c28 = _0x3d9d4b && _0x3d9d4b.substr(0, 5) == "blast";
  let _0x3c5aaa = _0x288c28 ? getCorrectId() : "kissContainer";
  let _0x5a3ec1 = document.getElementById(_0x3c5aaa);
  _0x5a3ec1 ||= _Activity.instance.Window.document.getElementById(_0x3c5aaa);
  _0x5a3ec1 = clearDiv(0, _0x5a3ec1);
  if (!_0x5a3ec1) {
    return;
  }
  let _0x35a743 = _Activity.instance.IsClassic ? -1 : 0;
  _0x5a3ec1.style.display = "";
  _0x5a3ec1.style.zIndex = _0x288c28 ? _0x35a743 : 100000;
  var _0x450f9c = posKiss(_0x5a3ec1);
  _0x1a79a8 ||= undefined;
  var _0x3e6568 = document.createElement("iframe");
  _0x3e6568.id = "kissFrame";
  _0x3e6568.className = "kissFrame";
  _0x3e6568.style.border = "0";
  _0x3e6568.width = _Activity.instance.IsClassic ? _0x450f9c[0] : _0x450f9c[0] + 100;
  _0x3e6568.height = _0x450f9c[1];
  _0x3e6568.style.display = "none";
  _0x5a3ec1.appendChild(_0x3e6568);
  window.addEventListener("message", onMessage, !1);
  _0x3e6568.onload = function (_0x26fbce) {
    var _0xe57889 = {
      action: "kiss",
      name: _0x3d9d4b,
      Message: _0x3e672b,
      color: _0x1a79a8,
      xatdomain: xatdomain,
      Cols: _0x5779fa,
      Bust: _0x40c8f9
    };
    var _0x4e86e3 = _0xe57889;
    _0x3e6568.style.display = "block";
    _0x3e6568.contentWindow.postMessage(JSON.stringify(_0x4e86e3), "*");
  };
  _0x3e6568.src = _Activity.instance.IsClassic && _0x288c28 ? "kiss.html" : "www/kiss.html";
  return _0x5a3ec1;
}
function onMessage(_0x409925) {
  switch (JSON.parse(_0x409925.data).action) {
    case "kissLoaded":
      break;
    case "kissDone":
    case "kissClick":
      clearDiv(getCorrectId()).style.display = "none";
  }
}
function posKiss(_0x5cb77b) {
  var _0x2fe7f3;
  var _0x3036f4;
  var _0x12ea29;
  var _0x249608;
  var _0x56fdef = window.innerWidth;
  var _0x3e65bb = window.innerHeight;
  if (_0x56fdef / _0x3e65bb > 640 / 480) {
    _0x249608 = 0;
    _0x12ea29 = (_0x56fdef - (_0x2fe7f3 = _0x3036f4 = _0x3e65bb / 480) * 640) / 2;
    if (_0x56fdef / _0x3e65bb <= 1.5) {
      _0x12ea29 = 0;
      _0x2fe7f3 = _0x56fdef / 640;
    }
  } else {
    _0x2fe7f3 = _0x3036f4 = _0x56fdef / 640;
    _0x12ea29 = 0;
    _0x249608 = (_0x3e65bb - _0x3036f4 * 480) / 2;
  }
  _0x12ea29 = xInt(_0x12ea29);
  _0x249608 = xInt(_0x249608);
  var _0xb81d21 = xInt(_0x3036f4 * 480);
  var _0x47d019 = xInt(_0x2fe7f3 * 640);
  _0x5cb77b.style.left = _0x12ea29 + "px";
  _0x5cb77b.style.top = _0x249608 + "px";
  _0x5cb77b.style.width = _0x47d019 + "px";
  _0x5cb77b.style.height = _0xb81d21 + "px";
  return [_0x47d019, _0xb81d21];
}
function getCorrectId() {
  if (!_Activity.instance.IsClassic) {
    return "kissContainer";
  } else {
    return "kissContainerOld";
  }
}
if (_Activity === undefined) {
  _Activity = parent._Activity !== undefined ? parent._Activity : parent.parent._Activity !== undefined ? parent.parent._Activity : parent.parent.parent._Activity !== undefined ? parent.parent.parent._Activity : {};
}