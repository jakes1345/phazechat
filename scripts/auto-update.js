#!/usr/bin/env node
/**
 * auto-update.js
 *
 * Automatically checks xat.com for new versions, re-scrapes assets,
 * and re-patches them for the private server.
 *
 * Usage:
 *   node scripts/auto-update.js              # Check and update once
 *   node scripts/auto-update.js --watch 3600 # Check every hour
 *   node scripts/auto-update.js --force      # Force re-scrape even if same version
 *
 * How it works:
 *   1. Fetches xat.com/embed/chat.php to discover the current build path (e.g., R00241)
 *   2. Compares with the local version stored in data/xat-version.json
 *   3. If different (or --force), runs grab-all-assets.js to re-scrape
 *   4. Runs patch-xat-files.js to patch all domain references
 *   5. Saves the new version to data/xat-version.json
 */

const { execSync, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const VERSION_FILE = path.join(ROOT, 'data', 'xat-version.json');
const SCRAPER = path.join(__dirname, 'grab-all-assets.js');
const PATCHER = path.join(__dirname, 'patch-xat-files.js');

const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const WATCH_IDX = args.indexOf('--watch');
const WATCH_INTERVAL = WATCH_IDX !== -1 ? parseInt(args[WATCH_IDX + 1] || '3600') : 0;

// ===== VERSION CHECK =====

function getLocalVersion() {
  try {
    return JSON.parse(fs.readFileSync(VERSION_FILE, 'utf8'));
  } catch {
    return { build: null, lastCheck: null, lastUpdate: null };
  }
}

function saveVersion(version) {
  fs.mkdirSync(path.dirname(VERSION_FILE), { recursive: true });
  fs.writeFileSync(VERSION_FILE, JSON.stringify(version, null, 2));
}

async function getRemoteVersion() {
  // Try to detect the current build path from xat.com
  // The lazarus approach: fetch embed/chat.php and extract the path
  try {
    const puppeteer = require('puppeteer-extra');
    const StealthPlugin = require('puppeteer-extra-plugin-stealth');
    puppeteer.use(StealthPlugin());

    console.log('[Update] Launching headless browser to check xat.com version...');
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    let buildPath = null;

    // Intercept requests to find the R00XXX version path
    page.on('request', (req) => {
      const url = req.url();
      const match = url.match(/\/content\/web\/(R\d+)\//);
      if (match) buildPath = match[1];
    });

    page.on('response', (res) => {
      const url = res.url();
      const match = url.match(/\/content\/web\/(R\d+)\//);
      if (match) buildPath = match[1];
    });

    await page.goto('https://xat.com/embed/chat.php', { waitUntil: 'networkidle2', timeout: 30000 });

    // Also try to extract from page content
    if (!buildPath) {
      const content = await page.content();
      const match = content.match(/\/content\/web\/(R\d+)\//);
      if (match) buildPath = match[1];
    }

    // Try the main page too
    if (!buildPath) {
      await page.goto('https://xat.com/', { waitUntil: 'networkidle2', timeout: 30000 });
      const content = await page.content();
      const match = content.match(/\/content\/web\/(R\d+)\//);
      if (match) buildPath = match[1];
    }

    await browser.close();
    return buildPath;
  } catch (err) {
    console.error('[Update] Failed to check remote version:', err.message);

    // Fallback: try simple fetch (might fail with Cloudflare)
    try {
      const res = await fetch('https://xat.com/embed/chat.php', {
        headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0.0.0' }
      });
      const text = await res.text();
      const match = text.match(/\/content\/web\/(R\d+)\//);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  }
}

// ===== SCRAPE & PATCH =====

function runScraper() {
  console.log('[Update] Running asset scraper...');
  try {
    execSync(`node "${SCRAPER}"`, {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 300000 // 5 minutes
    });
    return true;
  } catch (err) {
    console.error('[Update] Scraper failed:', err.message);
    return false;
  }
}

function runPatcher(host) {
  console.log(`[Update] Running patcher for ${host}...`);
  try {
    execSync(`node "${PATCHER}" ${host}`, {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 60000
    });
    return true;
  } catch (err) {
    console.error('[Update] Patcher failed:', err.message);
    return false;
  }
}

// ===== MAIN =====

async function checkAndUpdate() {
  const local = getLocalVersion();

  console.log(`[Update] Local version: ${local.build || 'none'}`);
  console.log(`[Update] Last check: ${local.lastCheck || 'never'}`);

  const remote = await getRemoteVersion();
  console.log(`[Update] Remote version: ${remote || 'unknown'}`);

  const needsUpdate = FORCE || !local.build || (remote && remote !== local.build);

  if (!needsUpdate) {
    console.log('[Update] Already up to date!');
    local.lastCheck = new Date().toISOString();
    saveVersion(local);
    return;
  }

  if (FORCE) {
    console.log('[Update] Force update requested');
  } else if (remote && remote !== local.build) {
    console.log(`[Update] New version detected: ${local.build} -> ${remote}`);
  }

  // Step 1: Scrape
  const scraped = runScraper();
  if (!scraped) {
    console.error('[Update] Scrape failed. Will try patching existing files...');
  }

  // Step 2: Patch
  const host = process.env.IXAT_HOST || 'localhost:6969';
  const patched = runPatcher(host);

  if (patched) {
    const version = {
      build: remote || local.build || 'R00241',
      lastCheck: new Date().toISOString(),
      lastUpdate: new Date().toISOString(),
    };
    saveVersion(version);
    console.log(`[Update] Done! Version: ${version.build}`);
  } else {
    console.error('[Update] Patch failed!');
  }
}

// ===== ENTRY POINT =====

(async () => {
  if (WATCH_INTERVAL > 0) {
    console.log(`[Update] Watch mode: checking every ${WATCH_INTERVAL} seconds`);
    while (true) {
      await checkAndUpdate();
      console.log(`[Update] Next check in ${WATCH_INTERVAL}s...\n`);
      await new Promise(r => setTimeout(r, WATCH_INTERVAL * 1000));
    }
  } else {
    await checkAndUpdate();
  }
})();
