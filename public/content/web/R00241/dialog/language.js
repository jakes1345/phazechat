(function () {
  "use strict";

  var languages = [
    { code: "en", label: "English" },
    { code: "es", label: "Espa\u00f1ol" },
    { code: "fr", label: "Fran\u00e7ais" },
    { code: "pt", label: "Portugu\u00eas" },
    { code: "it", label: "Italiano" },
    { code: "de", label: "Deutsch" },
    { code: "tr", label: "T\u00fcrk\u00e7e" },
    { code: "ar", label: "\u0639\u0631\u0628\u064a" },
    { code: "ro", label: "Rom\u00e2n\u0103" },
    { code: "pl", label: "Polski" },
    { code: "nl", label: "Nederlands" },
    { code: "ru", label: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439" },
    { code: "id", label: "Indonesia" },
    { code: "hu", label: "Magyar" },
    { code: "cs", label: "\u010ce\u0161tina" }
  ];

  function buildGrid() {
    return languages.map(function (lang) {
      return '<div class="col mb-2">'
        + '<button type="button" class="btn btn-outline-secondary btn-block lang-btn" data-lang="' + lang.code + '">'
        + lang.label
        + '</button>'
        + '</div>';
    }).join("");
  }

  var templateSource = '<div class="modal fade" id="languageModal" tabindex="-1" role="dialog" aria-labelledby="languageModalTitle" aria-hidden="true">'
    + '<div class="modal-dialog modal-dialog-centered modal-lg" role="document">'
    + '<div class="modal-content">'
    + '<div class="modal-header">'
    + '<h5 class="modal-title" id="languageModalTitle"><span data-localize="web.language">language</span></h5>'
    + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
    + '</div>'
    + '<div class="modal-body">'
    + '<div class="row row-cols-3 row-cols-sm-4 row-cols-md-5 g-2" id="languageGrid">'
    + buildGrid()
    + '</div>'
    + '</div>'
    + '<div class="modal-footer">'
    + '<button type="button" class="btn btn-secondary" data-dismiss="modal"><span data-localize="web.cancel">cancel</span></button>'
    + '</div>'
    + '</div></div></div>';

  Handlebars.templates = Handlebars.templates || {};
  Handlebars.templates["language.html"] = Handlebars.compile(templateSource);

  /**
   * Set the active language. Persists to localStorage and reloads localization.
   * @param {string} code  BCP-47 language code, e.g. "en", "es"
   */
  window.setLanguage = function (code) {
    if (!code) return;
    try {
      localStorage.setItem("xat_lang", code);
    } catch (e) { /* ignore */ }

    // Dismiss the modal
    var modal = document.getElementById("languageModal");
    if (modal && window.$ && $.fn.modal) {
      $(modal).modal("hide");
    }

    // Reload the page so the new language takes effect, passing lang in the
    // query string so the server or client localization system can pick it up.
    var url = new URL(window.location.href);
    url.searchParams.set("lang", code);
    window.location.href = url.toString();
  };

  window.initLanguageDialog = function () {
    var grid = document.getElementById("languageGrid");
    if (!grid) return;

    // Highlight the currently active language
    var current = (window.xConfig && window.xConfig.lang) || localStorage.getItem("xat_lang") || "en";
    grid.querySelectorAll(".lang-btn").forEach(function (btn) {
      var lang = btn.getAttribute("data-lang");
      btn.classList.toggle("active", lang === current);
      btn.addEventListener("click", function () {
        window.setLanguage(lang);
      });
    });
  };

  document.addEventListener("DOMContentLoaded", function () {
    initLanguageDialog();
  });
}());
