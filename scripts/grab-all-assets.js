#!/usr/bin/env node
/**
 * xat.com Comprehensive Asset Grabber
 * 
 * Uses Puppeteer with stealth plugin to bypass Cloudflare,
 * then intercepts ALL network responses to save:
 *   - WASM binaries (.wasm)
 *   - PHP-that-serves-JS (xatcorewasm.php, xatcore.php, etc.)
 *   - JavaScript files (.js)
 *   - CSS files (.css)
 *   - JSON API responses
 *   - Any other interesting assets
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const path = require('path');
const fs = require('fs');

puppeteer.use(StealthPlugin());

const OUTPUT_DIR = path.resolve(__dirname, '..', 'public', 'xat_grabbed');
const LOGS_DIR = path.resolve(OUTPUT_DIR, '_logs');

// File types we care about
const INTERESTING_TYPES = [
  'application/wasm',
  'application/javascript',
  'text/javascript',
  'application/json',
  'text/css',
  'application/octet-stream',
  'text/html',
];

// URL patterns to always capture regardless of content-type
const ALWAYS_CAPTURE_PATTERNS = [
  /xatcore/i,
  /\.wasm/i,
  /\.php/i,
  /activity/i,
  /quickbar/i,
  /smilies/i,
  /avatars/i,
  /count\./i,
  /howler/i,
  /firebase/i,
  /flix/i,
  /embed/i,
  /content\/web/i,
  /content\/js/i,
  /content\/sounds/i,
  /web_gear/i,
  /json\//i,
  /getlang/i,
  /roomid/i,
  /abx\.php/i,
  /auser/i,
  /register/i,
  /mlogin/i,
  /translate/i,
  /SaveUser/i,
];

function sanitizeFilename(url) {
  try {
    const u = new URL(url);
    let filePath = u.hostname + u.pathname;
    // Replace query params with hash for uniqueness
    if (u.search) {
      const hash = Buffer.from(u.search).toString('base64url').slice(0, 16);
      filePath += `__q_${hash}`;
    }
    // Clean up
    filePath = filePath.replace(/[^a-zA-Z0-9._\-\/]/g, '_');
    return filePath;
  } catch {
    return url.replace(/[^a-zA-Z0-9._\-]/g, '_').slice(0, 200);
  }
}

function shouldCapture(url, contentType) {
  // Always capture matching URL patterns
  if (ALWAYS_CAPTURE_PATTERNS.some(p => p.test(url))) return true;
  
  // Capture if content-type matches
  if (contentType && INTERESTING_TYPES.some(t => contentType.includes(t))) return true;
  
  // Capture JS files
  if (url.endsWith('.js') || url.endsWith('.mjs')) return true;
  
  // Capture WASM
  if (url.endsWith('.wasm')) return true;
  
  return false;
}

async function main() {
  // Create output dirs
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(LOGS_DIR, { recursive: true });

  const manifest = [];
  let capturedCount = 0;

  console.log('🚀 Launching browser with stealth mode...');
  
  const browser = await puppeteer.launch({
    headless: false, // Non-headless is better for Cloudflare bypass
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--window-size=1920,1080',
    ],
    defaultViewport: { width: 1920, height: 1080 },
  });

  const page = await browser.newPage();

  // Set realistic user agent
  await page.setUserAgent(
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
  );

  // Intercept ALL responses
  page.on('response', async (response) => {
    const url = response.url();
    const status = response.status();
    const contentType = response.headers()['content-type'] || '';

    if (status < 200 || status >= 400) return;
    if (!shouldCapture(url, contentType)) return;

    try {
      const buffer = await response.buffer();
      const relativePath = sanitizeFilename(url);
      const fullPath = path.join(OUTPUT_DIR, relativePath);

      // Create directory structure
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, buffer);

      capturedCount++;
      const sizeKb = (buffer.length / 1024).toFixed(1);
      const isWasm = contentType.includes('wasm') || url.includes('.wasm');
      const icon = isWasm ? '🔥' : contentType.includes('javascript') ? '📜' : 
                   contentType.includes('json') ? '📋' : contentType.includes('css') ? '🎨' : '📦';

      console.log(`${icon} [${capturedCount}] ${sizeKb}KB ${contentType || 'unknown'}`);
      console.log(`   └── ${url.slice(0, 120)}`);
      console.log(`   └── saved: ${relativePath}`);

      manifest.push({
        url,
        contentType,
        size: buffer.length,
        savedAs: relativePath,
        isWasm,
        timestamp: new Date().toISOString(),
      });

      // Special handling: if this is a WASM binary, also copy to a well-known location
      if (isWasm && buffer.length > 1000) {
        const wasmDest = path.resolve(__dirname, '..', 'public', 'xatcorewasm_full.wasm');
        fs.writeFileSync(wasmDest, buffer);
        console.log(`\n🎯🎯🎯 FULL WASM CAPTURED! ${buffer.length} bytes saved to xatcorewasm_full.wasm 🎯🎯🎯\n`);
      }
    } catch (err) {
      // Some responses can't be buffered (e.g., redirects)
      if (!err.message.includes('No resource with given identifier')) {
        console.log(`⚠️  Failed to capture: ${url.slice(0, 80)} — ${err.message}`);
      }
    }
  });

  // Also log all requests for analysis
  const requestLog = [];
  page.on('request', (request) => {
    requestLog.push({
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType(),
      timestamp: new Date().toISOString(),
    });
  });

  console.log('\n📡 Navigating to xat.com...');
  console.log('⏳ Waiting for Cloudflare challenge to resolve (may take 10-30s)...\n');

  try {
    await page.goto('https://xat.com/', {
      waitUntil: 'networkidle2',
      timeout: 120000, // 2 min for CF challenge
    });
  } catch (err) {
    console.log(`⚠️  Initial navigation timeout (expected with CF): ${err.message}`);
  }

  console.log('\n✅ Page loaded! Waiting for additional resources to load...');

  // Wait for WASM and other async loads
  await new Promise(r => setTimeout(r, 15000));

  // Try navigating to a chat room to trigger more asset loading
  console.log('\n📡 Navigating to xat.com/Lobby to trigger chat assets...');
  try {
    await page.goto('https://xat.com/Lobby', {
      waitUntil: 'networkidle2',
      timeout: 60000,
    });
  } catch (err) {
    console.log(`⚠️  Lobby navigation: ${err.message}`);
  }

  // Wait for chat to initialize and load WASM
  console.log('⏳ Waiting 30s for WASM/scripts to load...');
  await new Promise(r => setTimeout(r, 30000));

  // Try the direct WASM URL with the session cookies
  console.log('\n📡 Trying direct WASM fetch with session cookies...');
  try {
    const wasmResponse = await page.evaluate(async () => {
      const paths = [
        '/content/web/R00241/box/xatcorewasm.php',
        '/content/web/R00241/box/xatcorewasm.wasm',
        '/content/web/R00241/box/xatcore.php',
      ];
      const results = [];
      for (const p of paths) {
        try {
          const resp = await fetch(p);
          const contentType = resp.headers.get('content-type');
          const size = parseInt(resp.headers.get('content-length') || '0');
          results.push({ path: p, status: resp.status, contentType, size });
        } catch (e) {
          results.push({ path: p, error: e.message });
        }
      }
      return results;
    });
    console.log('Direct fetch results:', JSON.stringify(wasmResponse, null, 2));
  } catch (err) {
    console.log(`⚠️  Direct fetch failed: ${err.message}`);
  }

  // ================================================================
  // PHASE 2: Directly fetch ALL known xat.com asset paths
  // (discovered from deobfuscated code + WASM string analysis)
  // ================================================================
  console.log('\n' + '='.repeat(60));
  console.log('📡 PHASE 2: Direct-fetching all known asset paths...');
  console.log('='.repeat(60) + '\n');

  const KNOWN_TARGETS = [
    // === WASM & Core Engine ===
    '/content/web/R00241/box/xatcorewasm.php',  // WASM binary served as PHP
    '/content/web/R00241/box/xatcore.php',       // Fallback JS engine
    '/content/web/R00241/box/xatcorewasm.wasm',  // Direct WASM path (maybe)
    
    // === PHP API Endpoints (from WASM strings) ===
    '/web_gear/chat/roomid.php?v2&d=Lobby',
    '/json/abx.php',
    '/json/lang/getlang2.php?f=box&l=en',
    '/json/lang/customlang2.php?t=0',
    '/json/lists/0_en_featured.php',
    '/web_gear/chat/auser3.php?',
    '/web_gear/chat/ip3.php',
    '/web_gear/chat/translate3.php',
    '/web_gear/chat/mlogin2.php?v=',
    '/web_gear/chat/register5.php',
    '/web_gear/chat/SaveUser.php',
    '/web_gear/chat/xathlpuserid.php',
    '/web_gear/chat/getapp.php',
    '/web_gear/chat/chat.php',
    '/web_gear/chat/Giphy.php',
    
    // === JavaScript Modules ===
    '/content/js/howler.min.js',
    '/content/web/R00241/box/activity.js',
    '/content/web/R00241/box/xat.js',
    '/content/web/R00241/box/xat2.js',
    '/content/web/R00241/box/Quickbar.js',
    '/content/web/R00241/box/Smilies.js',
    '/content/web/R00241/box/Avatars.js',
    '/content/web/R00241/box/Count.js',
    '/content/web/R00241/www/firebase.js',
    '/content/web/R00241/www/flix.js',
    
    // === HTML Pages ===
    '/content/web/R00241/box/embed.html',
    '/content/web/R00241/box/chat-shim.html',
    
    // === CSS ===
    '/content/web/R00241/box/avatar.css',
    
    // === Avatar Assets ===
    '/web_gear/chat/av/',                        // Directory listing (maybe)
    
    // === Sound Assets (samples) ===
    '/content/sounds/audies/',
    '/web_gear/chat/snd/',
    
    // === Image/SVG Assets ===
    '/images/planet.svg',
    
    // === Economy/Store ===
    '/json/vote.php',
    
    // === Embed/Entry Points ===
    '/Lobby',
    '/embed/chat.php',
  ];

  for (const targetPath of KNOWN_TARGETS) {
    try {
      const result = await page.evaluate(async (urlPath) => {
        try {
          const resp = await fetch(urlPath, { credentials: 'include' });
          if (!resp.ok) return { status: resp.status, error: `HTTP ${resp.status}` };
          
          const contentType = resp.headers.get('content-type') || '';
          const buffer = await resp.arrayBuffer();
          const bytes = new Uint8Array(buffer);
          // Convert to base64 for transfer back to Node
          let binary = '';
          const chunkSize = 8192;
          for (let i = 0; i < bytes.length; i += chunkSize) {
            binary += String.fromCharCode.apply(null, bytes.slice(i, i + chunkSize));
          }
          return {
            status: resp.status,
            contentType,
            size: bytes.length,
            data: btoa(binary),
          };
        } catch (e) {
          return { error: e.message };
        }
      }, targetPath);

      if (result.data && result.size > 0) {
        const buffer = Buffer.from(result.data, 'base64');
        const relativePath = sanitizeFilename('https://xat.com' + targetPath);
        const fullFilePath = path.join(OUTPUT_DIR, relativePath);
        fs.mkdirSync(path.dirname(fullFilePath), { recursive: true });
        fs.writeFileSync(fullFilePath, buffer);

        capturedCount++;
        const sizeKb = (buffer.length / 1024).toFixed(1);
        const isWasm = result.contentType?.includes('wasm') || targetPath.includes('.wasm');
        const icon = isWasm ? '🔥' : result.contentType?.includes('javascript') ? '📜' : '📦';
        
        console.log(`${icon} [direct] ${sizeKb}KB [${result.contentType}] ${targetPath}`);

        manifest.push({
          url: 'https://xat.com' + targetPath,
          contentType: result.contentType,
          size: buffer.length,
          savedAs: relativePath,
          isWasm,
          method: 'direct-fetch',
          timestamp: new Date().toISOString(),
        });

        // Special: save large WASM to well-known path
        if (isWasm && buffer.length > 1000) {
          const wasmDest = path.resolve(__dirname, '..', 'public', 'xatcorewasm_full.wasm');
          fs.writeFileSync(wasmDest, buffer);
          console.log(`\n🎯🎯🎯 FULL WASM CAPTURED! ${buffer.length} bytes → xatcorewasm_full.wasm 🎯🎯🎯\n`);
        }
      } else {
        console.log(`   ❌ ${targetPath}: ${result.error || result.status}`);
      }
    } catch (err) {
      console.log(`   ⚠️  ${targetPath}: ${err.message}`);
    }
  }

  // Final wait for any remaining assets
  await new Promise(r => setTimeout(r, 5000));

  // Save manifest and request log
  fs.writeFileSync(
    path.join(LOGS_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  fs.writeFileSync(
    path.join(LOGS_DIR, 'all_requests.json'),
    JSON.stringify(requestLog, null, 2)
  );

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log(`📊 CAPTURE SUMMARY`);
  console.log('='.repeat(60));
  console.log(`Total assets captured: ${capturedCount}`);
  console.log(`Total requests logged: ${requestLog.length}`);
  
  const wasmFiles = manifest.filter(m => m.isWasm);
  if (wasmFiles.length > 0) {
    console.log(`\n🔥 WASM FILES FOUND:`);
    wasmFiles.forEach(w => console.log(`   ${w.size} bytes — ${w.url}`));
  } else {
    console.log(`\n❌ No WASM files captured. Check the request log for patterns.`);
  }

  const phpJs = manifest.filter(m => m.url.includes('.php') && 
    (m.contentType?.includes('javascript') || m.contentType?.includes('wasm')));
  if (phpJs.length > 0) {
    console.log(`\n📜 PHP-serving-JS/WASM:`);
    phpJs.forEach(p => console.log(`   ${p.size} bytes [${p.contentType}] — ${p.url}`));
  }

  console.log(`\n📁 All assets saved to: ${OUTPUT_DIR}`);
  console.log(`📋 Manifest: ${path.join(LOGS_DIR, 'manifest.json')}`);
  console.log(`📋 Request log: ${path.join(LOGS_DIR, 'all_requests.json')}`);

  // Print URL patterns we saw but didn't capture (for analysis)
  const uniqueDomains = [...new Set(requestLog.map(r => {
    try { return new URL(r.url).hostname; } catch { return 'unknown'; }
  }))];
  console.log(`\n🌐 Domains contacted: ${uniqueDomains.join(', ')}`);

  console.log('\n⏳ Keeping browser open for 10s for any final loads...');
  await new Promise(r => setTimeout(r, 10000));

  await browser.close();
  console.log('\n✅ Done! Browser closed.');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
