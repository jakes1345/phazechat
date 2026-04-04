(function () {
  "use strict";

  var templateSource = '<div class="modal fade" id="embedModal" tabindex="-1" role="dialog" aria-labelledby="embedModalTitle" aria-hidden="true">'
    + '<div class="modal-dialog modal-dialog-centered modal-lg embedresp" role="document">'
    + '<div class="modal-content">'
    + '<div class="modal-header">'
    + '<h5 class="modal-title" id="embedModalTitle">'
    + '<img class="mr-2 mb-1" width="25" src="../src/img/navbar/embed2.svg" alt="embed">'
    + '<span data-localize="chats.embedgrp">embed your group</span>'
    + '</h5>'
    + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
    + '</div>'
    + '<div class="modal-body">'
    + '<div class="row form-group">'
    + '<div class="col-sm-2"><label for="embed_width"><span data-localize="chats.width">width</span>:</label></div>'
    + '<div class="col-sm-3"><input name="embed_width" class="form-control form-control-sm" id="embed_width" maxlength="64" value="600" required></div>'
    + '<div class="col-sm-2 heembed"><label for="embed_height"><span data-localize="chats.height">height</span>:</label></div>'
    + '<div class="col-sm-3"><input name="embed_height" class="form-control form-control-sm" id="embed_height" maxlength="64" value="450" required></div>'
    + '</div>'
    + '<div class="row form-group d-none" id="notrecomW"><div class="col text-danger"><span data-localize="chats.notrec">Size not recommended.</span> <span data-localize="chats.usewidth">Use width 600-2000.</span></div></div>'
    + '<div class="row form-group d-none" id="notrecomH"><div class="col text-danger"><span data-localize="chats.notrec">Size not recommended.</span> <span data-localize="chats.useheight">Use height 465-2000.</span></div></div>'
    + '<div class="row"><div class="col-sm-12"><textarea class="form-control txembed" rows="4" id="embed_code" readonly></textarea></div></div>'
    + '</div>'
    + '<div class="modal-footer" id="embFooter">'
    + '<button type="button" class="btn btn-primary" id="embedPreviewBtn"><span data-localize="chats.preview">preview</span></button>'
    + '<button type="button" class="btn btn-primary" id="embedCopyBtn" data-toggle-sec="tooltip" data-placement="top" data-html="true" title="<span data-localize=\'chats.copied\'>Copied</span>!">'
    + '<span data-localize="chats.copy">copy</span></button>'
    + '</div>'
    + '<div class="modal-body embedflow d-flex justify-content-center"><div id="embedpreview"></div></div>'
    + '</div></div></div>';

  Handlebars.templates = Handlebars.templates || {};
  Handlebars.templates["embed.html"] = Handlebars.compile(templateSource);

  // Wire up embed dialog interactions after the modal is inserted into the DOM
  document.addEventListener("DOMContentLoaded", function () {
    initEmbedDialog();
  });

  // Also allow manual init for when the dialog is injected after page load
  window.initEmbedDialog = function () {
    var widthInput = document.getElementById("embed_width");
    var heightInput = document.getElementById("embed_height");
    var codeArea = document.getElementById("embed_code");
    var copyBtn = document.getElementById("embedCopyBtn");
    var previewBtn = document.getElementById("embedPreviewBtn");
    var notrecomW = document.getElementById("notrecomW");
    var notrecomH = document.getElementById("notrecomH");
    var previewContainer = document.getElementById("embedpreview");

    if (!widthInput || !heightInput || !codeArea) return;

    function getGroupName() {
      return (window.xConfig && window.xConfig.gn) ? window.xConfig.gn : "GROUPNAME";
    }

    function buildEmbedCode(w, h) {
      return '<iframe src="/web_gear/chat/embed.php?GroupName=' + getGroupName()
        + '" width="' + w + '" height="' + h + '" frameborder="0"></iframe>';
    }

    function updateCode() {
      var w = widthInput.value || "600";
      var h = heightInput.value || "450";
      codeArea.value = buildEmbedCode(w, h);

      if (notrecomW) notrecomW.classList.toggle("d-none", !(parseInt(w) < 600 || parseInt(w) > 2000));
      if (notrecomH) notrecomH.classList.toggle("d-none", !(parseInt(h) < 465 || parseInt(h) > 2000));
    }

    updateCode();
    widthInput.addEventListener("input", updateCode);
    heightInput.addEventListener("input", updateCode);

    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        codeArea.select();
        try {
          document.execCommand("copy");
        } catch (e) {
          navigator.clipboard && navigator.clipboard.writeText(codeArea.value);
        }
      });
    }

    if (previewBtn && previewContainer) {
      previewBtn.addEventListener("click", function () {
        var w = widthInput.value || "600";
        var h = heightInput.value || "450";
        previewContainer.innerHTML = buildEmbedCode(w, h);
      });
    }
  };
}());
