#!/usr/bin/env node
/**
 * Deep-dive script to find ALL files loaded by xat.com,
 * especially WASM, xatcore, xatcoremem, and any hidden PHP endpoints.
 * Uses Puppeteer stealth to bypass Cloudflare.
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

puppeteer.use(StealthPlugin());

const SAVE_DIR = path.resolve(__dirname, '..', 'data', 'wasm_grab');
if (!fs.existsSync(SAVE_DIR)) fs.mkdirSync(SAVE_DIR, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
  });

  const page = await browser.newPage();

  // Track ALL network requests
  const allRequests = [];
  const allResponses = [];
  const wasmFiles = [];
  const phpFiles = [];
  const jsFiles = [];

  // Intercept all requests
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const url = req.url();
    const type = req.resourceType();
    allRequests.push({ url, type, method: req.method() });

    // Log interesting files
    if (url.includes('xatcore') || url.includes('wasm') || url.includes('mem') || url.includes('.php')) {
      console.log(`[REQUEST] ${type}: ${url}`);
    }

    req.continue();
  });

  page.on('response', async (response) => {
    const url = response.url();
    const status = response.status();
    const contentType = response.headers()['content-type'] || '';

    allResponses.push({ url, status, contentType });

    // Save interesting files
    const isInteresting =
      url.includes('xatcore') ||
      url.includes('xatcoremem') ||
      url.includes('.wasm') ||
      url.includes('activity') ||
      (url.includes('.php') && url.includes('/box/')) ||
      url.includes('xat2') ||
      contentType.includes('wasm');

    if (isInteresting && status === 200) {
      console.log(`[RESPONSE] ${status} ${contentType}: ${url}`);
      try {
        const buffer = await response.buffer();
        // Create a safe filename
        const urlObj = new URL(url);
        const safeName = (urlObj.hostname + urlObj.pathname + urlObj.search)
          .replace(/[^a-zA-Z0-9._-]/g, '_')
          .slice(0, 200);
        const savePath = path.join(SAVE_DIR, safeName);
        fs.writeFileSync(savePath, buffer);
        console.log(`  -> Saved: ${savePath} (${buffer.length} bytes)`);

        if (url.includes('.wasm') || contentType.includes('wasm')) {
          wasmFiles.push({ url, size: buffer.length, savePath });
        }
        if (url.includes('.php')) {
          phpFiles.push({ url, size: buffer.length, contentType, savePath });
        }
        if (url.includes('.js') || contentType.includes('javascript')) {
          jsFiles.push({ url, size: buffer.length, savePath });
        }
      } catch (e) {
        console.log(`  -> Failed to save: ${e.message}`);
      }
    }
  });

  // Also capture console logs from the page
  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('wasm') || text.includes('WASM') || text.includes('xatcore') || text.includes('Module')) {
      console.log(`[PAGE CONSOLE] ${text}`);
    }
  });

  console.log('\n=== Loading xat.com/Chat ===\n');

  try {
    await page.goto('https://xat.com/Chat', {
      waitUntil: 'networkidle0',
      timeout: 60000,
    });
  } catch (e) {
    console.log(`Page load timeout/error: ${e.message}`);
  }

  // Wait a bit more for lazy-loaded resources
  console.log('\nWaiting 10s for lazy-loaded resources...');
  await new Promise(r => setTimeout(r, 10000));

  // Also try to navigate into the embed iframe
  const frames = page.frames();
  console.log(`\n=== Found ${frames.length} frames ===`);
  for (const frame of frames) {
    console.log(`  Frame: ${frame.url()}`);
  }

  // Summary
  console.log('\n\n========================================');
  console.log('=== SUMMARY ===');
  console.log('========================================\n');

  console.log(`Total requests: ${allRequests.length}`);
  console.log(`Total responses: ${allResponses.length}`);

  console.log('\n--- WASM Files ---');
  wasmFiles.forEach(f => console.log(`  ${f.url} (${f.size} bytes)`));

  console.log('\n--- PHP Files (from /box/) ---');
  phpFiles.forEach(f => console.log(`  ${f.url} (${f.size} bytes, ${f.contentType})`));

  console.log('\n--- JS Files ---');
  jsFiles.forEach(f => console.log(`  ${f.url} (${f.size} bytes)`));

  // Log ALL requests that contain interesting keywords
  console.log('\n--- All requests containing "xatcore", "mem", "wasm", "core" ---');
  allRequests.forEach(r => {
    if (r.url.includes('xatcore') || r.url.includes('coremem') || r.url.includes('.wasm') || r.url.includes('xatmem')) {
      console.log(`  [${r.method}] ${r.type}: ${r.url}`);
    }
  });

  // Log ALL PHP requests
  console.log('\n--- All PHP requests ---');
  allRequests.forEach(r => {
    if (r.url.includes('.php')) {
      console.log(`  [${r.method}] ${r.type}: ${r.url}`);
    }
  });

  // Write full request log
  const logPath = path.join(SAVE_DIR, '_request_log.json');
  fs.writeFileSync(logPath, JSON.stringify({ allRequests, allResponses, wasmFiles, phpFiles, jsFiles }, null, 2));
  console.log(`\nFull request log: ${logPath}`);

  await browser.close();
  console.log('\nDone!');
})();
