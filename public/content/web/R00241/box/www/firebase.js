"use strict";
var FIREBASE_VERSION = "8.10.0";
_Activity.instance.LoadJsModule("https://www.gstatic.com/firebasejs/" + FIREBASE_VERSION + "/firebase-app.js").then(function () {
  return _Activity.instance.LoadJsModule("https://www.gstatic.com/firebasejs/" + FIREBASE_VERSION + "/firebase-messaging.js");
}).then(function () {
  firebase.initializeApp({
    apiKey: "AIzaSyAqzoQW31FchUw2v7wZuUmzXQsLtA_8hR4",
    authDomain: "com-xat-firepush.firebaseapp.com",
    databaseURL: "https://com-xat-firepush.firebaseio.com",
    projectId: "com-xat-firepush",
    storageBucket: "com-xat-firepush.appspot.com",
    messagingSenderId: "769893050604",
    appId: "1:769893050604:web:22837f1ded864de0181dc9"
  });
}).then(function () {
  var _0x12e8ed = firebase.messaging();
  function _0x56cdcf() {
    _0x12e8ed.getToken().then(function (_0x32a375) {
      if (_0x32a375) {
        (function (_0x341035) {
          _Activity.instance.OfflinePushToken = "g:" + _0x341035;
        })(_0x32a375);
      } else {
        console.log("FBM:No Instance ID token available. Request permission to generate one.");
      }
    }).catch(function (_0x2ce939) {
      console.error("FBM:An error occurred while retrieving token. ", _0x2ce939);
    });
  }
  _0x12e8ed.onTokenRefresh(function () {
    _0x12e8ed.getToken().then(function (_0x2ae7c0) {
      console.log("FBM:Token refreshed.");
      _0x56cdcf();
    }).catch(function (_0x257d2e) {
      console.error("FBM:Unable to retrieve refreshed token ", _0x257d2e);
    });
  });
  _0x12e8ed.onMessage(function (_0x38beee) {
    console.log("FBM:Message received. ", _0x38beee);
    var _0x30dfd1 = _0x38beee.notification.title;
    if (_0x30dfd1.substring(0, 6) != "CONF;=") {
      if (LocalNotify) {
        notify.show(_0x30dfd1, _0x38beee.notification.body);
      }
    } else {
      activityToC("PushRecieved", "", _0x30dfd1);
    }
  });
  _0x56cdcf();
}).catch(function (_0x15cae0) {
  console.error("FBM:", _0x15cae0);
});