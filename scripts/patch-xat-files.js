#!/usr/bin/env node
/**
 * patch-xat-files.js
 *
 * Takes grabbed xat.com files and patches all domain references
 * to point to our private server. Based on the lazarus/xat-html5
 * approach but updated for the modern WASM-based xat client.
 *
 * Usage: node scripts/patch-xat-files.js [host:port]
 * Default: localhost:6969
 */

const fs = require('fs');
const path = require('path');

const SITE_HOST = process.argv[2] || 'localhost:6969';
const SITE_PROTO = SITE_HOST.includes('localhost') ? 'http:' : 'https:';
const SITE_URL = `${SITE_PROTO}//${SITE_HOST}`;

const SRC_DIR = path.join(__dirname, '..', 'public', 'xat_grabbed', 'xat.com', 'content', 'web', 'R00241');
const DEST_DIR = path.join(__dirname, '..', 'public', 'content', 'web', 'R00241');

// Additional source dirs for non-R00241 assets
const SRC_ROOT = path.join(__dirname, '..', 'public', 'xat_grabbed', 'xat.com');
const DEST_ROOT = path.join(__dirname, '..', 'public');

// Stats
let stats = { copied: 0, patched: 0, skipped: 0, binary_patched: 0 };

// ===== DOMAIN REPLACEMENT RULES =====
// Smart replacements - order matters (longer matches first)

const TEXT_REPLACEMENTS = [
  // Protocol + domain URLs
  ['https://xat.com', SITE_URL],
  ['http://xat.com', SITE_URL],
  ['//xat.com', `//${SITE_HOST}`],

  // xatech.com (alternate xat domain)
  ['https://xatech.com', SITE_URL],
  ['http://xatech.com', SITE_URL],
  ['//xatech.com', `//${SITE_HOST}`],
  ['xatech.com', SITE_HOST],

  // CDN domains -> point to our server
  ['https://gs.xat.com', SITE_URL],
  ['//gs.xat.com', `//${SITE_HOST}`],
  ['gs.xat.com', SITE_HOST],

  ['https://i0.xat.com', SITE_URL],
  ['//i0.xat.com', `//${SITE_HOST}`],
  ['i0.xat.com', SITE_HOST],

  ['https://i1.xat.com', SITE_URL],
  ['//i1.xat.com', `//${SITE_HOST}`],
  ['i1.xat.com', SITE_HOST],

  ['https://s0.xat.com', SITE_URL],
  ['//s0.xat.com', `//${SITE_HOST}`],
  ['s0.xat.com', SITE_HOST],

  ['https://s1.xat.com', SITE_URL],
  ['//s1.xat.com', `//${SITE_HOST}`],
  ['s1.xat.com', SITE_HOST],

  // Bare domain (must come AFTER all subdomain replacements)
  // Only replace when it's clearly a URL/domain context, not wiki/docs
  // We'll handle this with the smart replacer below
];

// Patterns to PRESERVE (don't replace xat.com in these contexts)
const PRESERVE_PATTERNS = [
  /xat\.wiki/g,           // wiki links
  /xat\.fandom\.com/g,    // fandom wiki
  /wiki\.xat\.com/g,      // old wiki
  /forum\.xat\.com/g,     // forum (keep as reference but won't work)
];

// ===== FILE HANDLING =====

const TEXT_EXTENSIONS = new Set([
  '.html', '.htm', '.js', '.css', '.json', '.php', '.svg',
  '.txt', '.md', '.xml', '.webmanifest', '.map'
]);

const BINARY_EXTENSIONS = new Set([
  '.wasm', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico',
  '.woff', '.woff2', '.ttf', '.eot', '.mp3', '.mp4', '.wav'
]);

function isTextFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (TEXT_EXTENSIONS.has(ext)) return true;
  if (BINARY_EXTENSIONS.has(ext)) return false;
  // Unknown extension - try to detect
  try {
    const buf = fs.readFileSync(filePath);
    // Check for null bytes in first 8KB (binary indicator)
    const check = buf.slice(0, 8192);
    for (let i = 0; i < check.length; i++) {
      if (check[i] === 0) return false;
    }
    return true;
  } catch {
    return false;
  }
}

// ===== SMART TEXT PATCHER =====

function patchTextContent(content, filePath) {
  let patched = content;
  const fileName = path.basename(filePath);

  // Apply all fixed replacements
  for (const [from, to] of TEXT_REPLACEMENTS) {
    patched = patched.split(from).join(to);
  }

  // Smart bare domain replacement:
  // Replace "xat.com" only when it looks like a URL/domain reference
  // NOT in comments, wiki references, human-readable text about xat.com
  patched = patched.replace(/(?<!\w)(xat\.com)(?=\/|["'\s;,\)]|$)/gm, (match, p1, offset) => {
    // Check surrounding context - is this in a URL-like pattern?
    const before = patched.substring(Math.max(0, offset - 50), offset);

    // Preserve wiki/forum references
    if (/wiki|forum|fandom|learn more|visit|about/i.test(before)) {
      return match;
    }

    return SITE_HOST;
  });

  return patched;
}

// ===== WASM BINARY PATCHER =====
// Patches string data in the WASM data section

function patchWasmBinary(wasmBuffer) {
  const buf = Buffer.from(wasmBuffer);
  let patchCount = 0;

  // Domain strings to find and replace in WASM data section
  const binaryReplacements = [
    ['xat.com', SITE_HOST],
    ['xatech.com', SITE_HOST],
    ['gs.xat.com', SITE_HOST],
    ['i0.xat.com', SITE_HOST],
    ['i1.xat.com', SITE_HOST],
    ['s0.xat.com', SITE_HOST],
    ['s1.xat.com', SITE_HOST],
  ];

  for (const [from, to] of binaryReplacements) {
    const fromBuf = Buffer.from(from, 'utf8');
    const toBuf = Buffer.from(to, 'utf8');

    let pos = 0;
    while ((pos = buf.indexOf(fromBuf, pos)) !== -1) {
      if (toBuf.length <= fromBuf.length) {
        // Replacement is same size or smaller - write in place, pad with nulls
        toBuf.copy(buf, pos);
        for (let i = toBuf.length; i < fromBuf.length; i++) {
          buf[pos + i] = 0;
        }
        patchCount++;
      } else {
        // Replacement is LONGER - this is tricky for binary.
        // For WASM data section, we can't easily extend strings.
        // Instead we'll rely on the JS glue code hook (see patchEmscriptenGlue)
        console.log(`  [WASM] Cannot in-place patch "${from}" -> "${to}" (replacement longer). Will use JS hook.`);
      }
      pos += fromBuf.length;
    }
  }

  // Also patch https: -> http: for localhost
  if (SITE_HOST.includes('localhost')) {
    const httpsBytes = Buffer.from('https:', 'utf8');
    const httpBytes = Buffer.from('http:\x00', 'utf8'); // null-pad to same length
    let pos = 0;
    while ((pos = buf.indexOf(httpsBytes, pos)) !== -1) {
      httpBytes.copy(buf, pos);
      patchCount++;
      pos += httpsBytes.length;
    }
  }

  console.log(`  [WASM] Patched ${patchCount} domain references in binary`);
  return buf;
}

// ===== EMSCRIPTEN GLUE PATCHER =====
// Patches xatcorewasm.php (the JS glue code) to hook memory initialization
// This is the lazarus/ixat approach adapted for WASM

function patchEmscriptenGlue(content) {
  // The ixat approach: prepend a Config object and hook applyMemoryInitializer
  // But for WASM, the mechanism is slightly different - we need to hook
  // the instantiateArrayBuffer or the memory init callback

  const configBlock = `
// === IXAT PRIVATE SERVER PATCH ===
var IXAT_HOST = "${SITE_HOST}";
var IXAT_PROTO = "${SITE_PROTO}";
var IXAT_URL = IXAT_PROTO + "//" + IXAT_HOST;

// Override any remaining xat.com references after WASM memory loads
var _origInstantiateAsync = Module.instantiateAsync;
if (typeof Module === 'undefined') var Module = {};
Module._patchMemory = function() {
  if (typeof HEAPU8 === 'undefined') return;
  // Search and replace domain strings in linear memory
  var domains = ['xat.com', 'xatech.com', 'gs.xat.com'];
  domains.forEach(function(domain) {
    var bytes = [];
    for (var i = 0; i < domain.length; i++) bytes.push(domain.charCodeAt(i));
    var replacement = IXAT_HOST;
    var pos = 0;
    while (pos < HEAPU8.length - bytes.length) {
      var found = true;
      for (var j = 0; j < bytes.length; j++) {
        if (HEAPU8[pos + j] !== bytes[j]) { found = false; break; }
      }
      if (found) {
        for (var j = 0; j < replacement.length && j < domain.length; j++) {
          HEAPU8[pos + j] = replacement.charCodeAt(j);
        }
        for (var j = replacement.length; j < domain.length; j++) {
          HEAPU8[pos + j] = 0;
        }
      }
      pos++;
    }
  });
};
// === END PATCH ===
`;

  // Prepend the config
  let patched = configBlock + '\n' + content;

  // Also do text-level replacements on the JS glue
  patched = patchTextContent(patched, 'xatcorewasm.php');

  return patched;
}

// ===== ACTIVITY.JS PATCHER =====
// The critical file - patches WebSocket connection to point to our server

function patchActivityJs(content) {
  let patched = patchTextContent(content, 'activity.js');

  // The WebSocket CONNECT handler in activity.js hardcodes the server IP.
  // We need to replace it to connect to our server instead.
  // Pattern from ixat: (o="ws://198.251.80.169",t=337)
  // In modern xat, the CONNECT command comes from WASM with the server IP.
  // We intercept it and redirect to our server.

  // Find and patch the WebSocket creation to use our host
  // Look for patterns like: new WebSocket(ConnectIp+":"+ConnectPort)
  // and override ConnectIp/ConnectPort

  const wsOverride = `
// === IXAT: Override WebSocket connection to private server ===
var _origWebSocket = WebSocket;
var _ixatWS = function(url, protocols) {
  // Redirect any xat.com WebSocket to our server
  var wsProto = location.protocol === 'https:' ? 'wss:' : 'ws:';
  var newUrl = wsProto + '//' + location.host + '/ws';
  console.log('[ixat] WebSocket redirect: ' + url + ' -> ' + newUrl);
  return new _origWebSocket(newUrl, protocols);
};
_ixatWS.CONNECTING = _origWebSocket.CONNECTING;
_ixatWS.OPEN = _origWebSocket.OPEN;
_ixatWS.CLOSING = _origWebSocket.CLOSING;
_ixatWS.CLOSED = _origWebSocket.CLOSED;
_ixatWS.prototype = _origWebSocket.prototype;
WebSocket = _ixatWS;
// === END IXAT OVERRIDE ===
`;

  patched = wsOverride + '\n' + patched;

  return patched;
}

// ===== COPY & PATCH ENGINE =====

function mkdirp(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function processFile(srcPath, destPath) {
  const ext = path.extname(srcPath).toLowerCase();
  const fileName = path.basename(srcPath);

  mkdirp(path.dirname(destPath));

  // Special handling for specific files
  if (fileName === 'xatcorewasm.wasm') {
    console.log(`  [BINARY] Patching WASM: ${fileName}`);
    const buf = fs.readFileSync(srcPath);
    const patched = patchWasmBinary(buf);
    fs.writeFileSync(destPath, patched);
    stats.binary_patched++;
    stats.copied++;
    return;
  }

  if (fileName === 'xatcorewasm.php') {
    console.log(`  [GLUE] Patching Emscripten glue: ${fileName}`);
    const content = fs.readFileSync(srcPath, 'utf8');
    const patched = patchEmscriptenGlue(content);
    fs.writeFileSync(destPath, patched);
    stats.patched++;
    stats.copied++;
    return;
  }

  if (fileName === 'activity.js') {
    console.log(`  [ACTIVITY] Patching WebSocket bridge: ${fileName}`);
    const content = fs.readFileSync(srcPath, 'utf8');
    const patched = patchActivityJs(content);
    fs.writeFileSync(destPath, patched);
    stats.patched++;
    stats.copied++;
    return;
  }

  if (isTextFile(srcPath)) {
    const content = fs.readFileSync(srcPath, 'utf8');
    const patched = patchTextContent(content, srcPath);

    if (patched !== content) {
      fs.writeFileSync(destPath, patched);
      stats.patched++;
    } else {
      fs.writeFileSync(destPath, patched);
      stats.skipped++;
    }
    stats.copied++;
    return;
  }

  // Binary file - just copy
  fs.copyFileSync(srcPath, destPath);
  stats.copied++;
}

function processDirectory(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) {
    console.error(`Source directory not found: ${srcDir}`);
    return;
  }

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      processDirectory(srcPath, destPath);
    } else if (entry.isFile()) {
      // Skip cache-busted duplicates (files with __q_ in name)
      if (entry.name.includes('__q_')) continue;

      processFile(srcPath, destPath);
    }
  }
}

// ===== MAIN =====

console.log('=== xat Private Server File Patcher ===');
console.log(`Source:  ${SRC_DIR}`);
console.log(`Dest:    ${DEST_DIR}`);
console.log(`Target:  ${SITE_URL}`);
console.log('');

if (!fs.existsSync(SRC_DIR)) {
  console.error('ERROR: Grabbed files not found at ' + SRC_DIR);
  console.error('Run the scraper first: node scripts/grab-all-assets.js');
  process.exit(1);
}

// Process R00241 directory (main app files)
console.log('[1/3] Patching R00241 files...');
processDirectory(SRC_DIR, DEST_DIR);

// Copy additional web_gear/chat assets if they exist
const webGearSrc = path.join(SRC_ROOT, 'web_gear');
const webGearDest = path.join(DEST_ROOT, 'web_gear');
if (fs.existsSync(webGearSrc)) {
  console.log('\n[2/3] Patching web_gear files...');
  processDirectory(webGearSrc, webGearDest);
}

// Copy JSON API responses if they exist
const jsonSrc = path.join(SRC_ROOT, 'json');
const jsonDest = path.join(DEST_ROOT, 'json');
if (fs.existsSync(jsonSrc)) {
  console.log('\n[3/3] Patching JSON files...');
  processDirectory(jsonSrc, jsonDest);
}

console.log('\n=== DONE ===');
console.log(`Files copied:   ${stats.copied}`);
console.log(`Text patched:   ${stats.patched}`);
console.log(`Binary patched: ${stats.binary_patched}`);
console.log(`Unchanged:      ${stats.skipped}`);
console.log(`\nPatched files are in: ${DEST_DIR}`);
console.log(`Server should serve /content/web/R00241/* from this directory`);
