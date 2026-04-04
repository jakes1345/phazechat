'use strict';

// ====================== CONFIG & CONSTANTS ======================
let ReleaseMode = 0;
let listenersList = [];

let locationOrigin = window.location.origin;
if (locationOrigin === 'https://xat.me') {
    locationOrigin = 'https://xat.com';
}

let Direct, Home, soltodo, mDirect;
let origin = (locationOrigin !== 'https://xat.com') ? 'https://xat.com' : locationOrigin;

const endPoints = {
    register: origin + '/web_gear/chat/register5.php',
    powers: origin + '/web_gear/chat/GetPowers5.php',
    announce: origin + '/web_gear/chat/Announce.php',
    smw: origin + '/images/smw/',
    wiki: 'https://xat.wiki/',
    pow2: origin + '/web_gear/chat/pow2.php',
    getImage7: 'https://i0.xat.com/web_gear/chat/GetImage7.php',
    avatarDirectory: origin + '/web_gear/chat/av/',
    store: {
        promotion: origin + '/web_gear/chat/promotion2.php',
        transfer: origin + '/web_gear/chat/TransferGroup2.php',
        shortname: origin + '/web_gear/chat/BuyShortName2.php',
        powersAces: origin + '/web_gear/chat/GetAces.php',
        acestime: origin + '/web_gear/chat/acestime.php',
        buy: origin + '/web_gear/chat/buy2.php',
        auction: origin + '/web_gear/chat/Auction2.php',
        dx: origin + '/web_gear/chat/DaysToXats2.php',
        x2d: origin + '/web_gear/chat/XatsToDays2.php'
    }
};

let xConfig = {};
let GET = getGET();

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const offgps = [
    'help', 'ajuda', 'ajutor', 'assistance', 'hilfe', 'ayuda', 'aiuto',
    'ajuto', 'helfen', 'mosa3adeh', 'yardim', 'cambio', 'loja', 'sohbet', 'flirt'
];

let dir = ''; // base directory for assets

// Load config from inline JSON (if present)
let jsonEl = document.getElementById('xatConfig');
if (jsonEl) {
    try {
        jsonEl = JSON.parse(jsonEl.textContent);
        if (jsonEl.dir) dir = jsonEl.dir;
        if (dir === '/') dir = '';
    } catch (e) {}
}

// ====================== UTILITY FUNCTIONS ======================
function Sanitize(str, regex) {
    if (!regex) regex = /[^0-9a-zA-Z_\-]/g;
    return str.replace(regex, '');
}

function xInt(val) {
    val = parseInt(val);
    return isNaN(val) ? 0 : val;
}

function getFirstBrowserLanguage() {
    const nav = window.navigator;
    const keys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'];

    if (Array.isArray(nav.languages)) {
        for (let lang of nav.languages) {
            if (lang) return lang;
        }
    }

    for (let key of keys) {
        if (nav[key]) return nav[key];
    }
    return null;
}

function setCookie(name, value, days, secure) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    let cookieStr = name + '=' + (value || '') + expires + '; path=/';
    if (secure) cookieStr += '; SameSite=None; Secure';
    document.cookie = cookieStr;
}

function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let c of ca) {
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function getGET() {
    // ... (parses location hash, query params, etc. - kept logic identical)
    // Returns object with { hash, params, path, host }
}

// ====================== CORE INIT ======================
function initConfig() {
    xConfig = {
        lang: 'en',
        name: 'direct',
        origin: 'https://xat.com'
    };

    xConfig.dir = dir;

    if (!(0x2 & xConfig.cookies)) {
        xConfig.lang = GetWeb().lang || getCookie('lang') || getFirstBrowserLanguage() || 'en';
    }

    // Override with URL param
    if (GET.params.lang) xConfig.lang = GET.params.lang.toLowerCase();

    if (typeof mainJs === 'function') mainJs();
    if (isXatBirthday()) bdayNav();

    // Fetch announcements / Black Friday promo etc.
    sendRequest(endPoints.announce + '?c=' + Date.now(), null, null, null, handleAnnounceResponse);
}

// Seasonal logo handler (Christmas, Halloween, Valentine, etc.)
function setLogo() {
    // ... logic that picks from logoEvents array based on current date
}

// User session handling
function readUser() {
    try {
        xConfig.cookies = localStorage.getItem('cookies');
    } catch (e) {}

    let userData = localStorage.getItem('user');
    if (userData) userData = JSON.parse(userData);

    if (userData && userData.w_userno) {
        xConfig.id = userData.w_userno;
        xConfig.k2 = userData.w_k2;
        xConfig.username = userData.w_registered || '';
        // avatar logic ...
    }
}

function setUser() {
    // Updates navbar with username, avatar, xats count, welcome text, etc.
}

function setLoggedin() {
    // Switches between logged-in and logged-out navbar states
}

// Promo / language / localization
function fetchPromo(clearFirst) {
    // Fetches promoted groups and renders dropdown
}

function localize(keys) {
    // Loads language files and applies translations via jQuery.localize or similar
}

function handleAnnounceResponse(data) {
    const { BlackFriday, Announce } = data;
    // Handles xatsback promotions, countdowns, announcements
}

// Modal / dialog loading (Handlebars templates)
function loadModalDialog(templateName, targetId, data) {
    // Loads and renders dialog templates
}

// Event handlers
function navClickHandlers() {
    // Privacy, language, side menu, etc.
}

// Other utilities
function debounce(fn) {
    let raf;
    return function(...args) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => fn(...args));
    };
}

function Reset() {
    $('.HideDiv').addClass('d-none');
    $('.ClrDiv').html('');
    $(document.body).css('cursor', 'default');
    allErrsOff();
}

// ====================== INITIALIZATION ======================
$(function() {
    initConfig();
    readUser();
    setUser();
    setLoggedin();
    setLogo();
    legacyLinks();           // converts old links to new structure
    navClickHandlers();
    cookieBar();
    loadDialogs();
    initLanguage();
    // ... more init calls (analytics, scroll handlers, etc.)
});

document.addEventListener('scroll', debounce(storeScroll));
storeScroll();
