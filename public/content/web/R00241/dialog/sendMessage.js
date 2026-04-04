(function () {
  "use strict";

  var templateSource = '<div class="modal fade" id="sendMessageModal" tabindex="-1" role="dialog" aria-labelledby="sendMessageModalTitle" aria-hidden="true">'
    + '<div class="modal-dialog modal-dialog-centered modal-lg" role="document">'
    + '<div class="modal-content">'
    + '<div class="modal-header">'
    + '<h5 class="modal-title" id="sendMessageModalTitle">'
    + '<img class="mr-2 pb-1" src="../src/img/navbar/send.svg" width="19" alt="send message">'
    + '<span data-localize="web.message">send message</span>'
    + '</h5>'
    + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
    + '</div>'
    + '<form id="sendMessageForm" class="needs-validation" novalidate action="/web_gear/chat/ownerfeedback2.php" method="post">'
    + '<input type="hidden" name="gn" value="{{gn}}">'
    + '<div class="modal-body">'
    + '<p data-localize="web.msgdesc">If you would like to contact the owner of this group you can do so here.</p>'
    + '<div id="sendMessageErr" class="alert alert-danger HideDiv ClrErr d-none" role="alert"></div>'
    + '<div class="row mb-3"><div class="col-lg">'
    + '<label for="sendMsgEmail"><span data-localize="chats.email">email</span>:</label>'
    + '<input name="email" class="form-control form-control-sm" id="sendMsgEmail" maxlength="60" required>'
    + '<div class="invalid-feedback"><span data-localize="web.validemail">Please enter a valid email address.</span></div>'
    + '</div></div>'
    + '<div class="row mb-3"><div class="col-lg">'
    + '<label for="sendMsgSubject"><span data-localize="web.subject">subject</span>:</label>'
    + '<input name="subject" class="form-control form-control-sm" id="sendMsgSubject" maxlength="120" required>'
    + '<div class="invalid-feedback"><span data-localize="web.requiredfield">This field is required.</span></div>'
    + '</div></div>'
    + '<div class="row mb-3"><div class="col-lg">'
    + '<label for="sendMsgBody"><span data-localize="web.msg">message</span>:</label>'
    + '<textarea class="form-control cssareamin" id="sendMsgBody" name="message" rows="5" maxlength="1000" required></textarea>'
    + '<div class="invalid-feedback ClrErr" id="sendMsgBodyErr"></div>'
    + '</div></div>'
    + '<div class="row"><div class="col-lg"><div id="sendMsgCap" class="ClrDiv"></div></div></div>'
    + '</div>'
    + '<div class="modal-footer">'
    + '<button type="submit" class="btn btn-primary">'
    + '<img class="mr-2 pb-1" src="../src/img/navbar/send.svg" width="19" alt="send message">'
    + '<span data-localize="web.message">send message</span>'
    + '</button>'
    + '</div>'
    + '</form>'
    + '</div></div></div>';

  Handlebars.templates = Handlebars.templates || {};
  Handlebars.templates["sendMessage.html"] = Handlebars.compile(templateSource);

  window.initSendMessageDialog = function () {
    var form = document.getElementById("sendMessageForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
        form.classList.add("was-validated");
        return;
      }
      form.classList.add("was-validated");
    });
  };

  document.addEventListener("DOMContentLoaded", function () {
    initSendMessageDialog();
  });
}());
