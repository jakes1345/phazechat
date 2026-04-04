#!/usr/bin/env node
/**
 * xat.com Missing Assets Downloader
 *
 * Downloads:
 * 1. animate.css from cdnjs CDN -> public/css/animate.css
 * 2. Homepage carousel images (create.png, powers.png, games.png) via Puppeteer stealth
 * 3. Logo images from xat.com/images/logo/ (anni1-12.png birthday logos) via Puppeteer stealth
 */

const puppeteer = require('/home/jack/projects/xat-clone/node_modules/puppeteer-extra');
const StealthPlugin = require('/home/jack/projects/xat-clone/node_modules/puppeteer-extra-plugin-stealth');
const https = require('https');
const http = require('http');
const path = require('path');
const fs = require('fs');

puppeteer.use(StealthPlugin());

const PROJECT_ROOT = path.resolve(__dirname, '..');

// ── Helpers ──────────────────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`  Created directory: ${dir}`);
  }
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Accept-Encoding': 'identity',
      },
      timeout: 30000,
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error(`Timeout: ${url}`)); });
  });
}

function saveFile(filePath, data) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, data);
  const size = data.length || data.byteLength || 0;
  console.log(`  Saved: ${filePath} (${(size / 1024).toFixed(1)} KB)`);
}

// ── Task 1: animate.css ───────────────────────────────────────────────────────

async function downloadAnimateCss() {
  console.log('\n[1/3] Downloading animate.css from cdnjs...');
  const url = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css';
  const dest = path.join(PROJECT_ROOT, 'public', 'css', 'animate.css');

  if (fs.existsSync(dest)) {
    console.log(`  Already exists, skipping: ${dest}`);
    return;
  }

  try {
    const data = await fetchUrl(url);
    saveFile(dest, data);
    console.log('  animate.css downloaded successfully.');
  } catch (err) {
    console.error(`  Failed to fetch from cdnjs: ${err.message}`);
    console.log('  Trying xat.com fallback...');
    // fallback: try to grab from xat.com directly
    try {
      const data = await fetchUrl('https://xat.com/css/animate.css');
      saveFile(dest, data);
      console.log('  animate.css downloaded from xat.com.');
    } catch (err2) {
      console.error(`  Fallback also failed: ${err2.message}`);
      throw err2;
    }
  }
}

// ── Task 2 & 3: Puppeteer stealth downloads ───────────────────────────────────

async function downloadWithPuppeteer() {
  console.log('\n[2/3] Starting Puppeteer stealth session for xat.com assets...');

  // Files to intercept and save
  const targets = [
    // Carousel / tour images (current xat.com set, as of 2024)
    // Note: the old create.png / powers.png / games.png are 404 on xat.com now;
    // xat.com replaced them with tour*.png variants.
    {
      url: 'https://xat.com/content/web/R00241/img/home/tourgroup.png',
      dest: path.join(PROJECT_ROOT, 'public', 'content', 'web', 'R00241', 'img', 'home', 'tourgroup.png'),
    },
    {
      url: 'https://xat.com/content/web/R00241/img/home/tourpowers.png',
      dest: path.join(PROJECT_ROOT, 'public', 'content', 'web', 'R00241', 'img', 'home', 'tourpowers.png'),
    },
    {
      url: 'https://xat.com/content/web/R00241/img/home/tourtrade.png',
      dest: path.join(PROJECT_ROOT, 'public', 'content', 'web', 'R00241', 'img', 'home', 'tourtrade.png'),
    },
    {
      url: 'https://xat.com/content/web/R00241/img/home/tourgames.png',
      dest: path.join(PROJECT_ROOT, 'public', 'content', 'web', 'R00241', 'img', 'home', 'tourgames.png'),
    },
    {
      url: 'https://xat.com/content/web/R00241/img/home/tourxavi.png',
      dest: path.join(PROJECT_ROOT, 'public', 'content', 'web', 'R00241', 'img', 'home', 'tourxavi.png'),
    },
    {
      url: 'https://xat.com/content/web/R00241/img/home/tourstickers.png',
      dest: path.join(PROJECT_ROOT, 'public', 'content', 'web', 'R00241', 'img', 'home', 'tourstickers.png'),
    },
    // Birthday anniversary logo images (anni1-12)
    ...Array.from({ length: 12 }, (_, i) => ({
      url: `https://xat.com/images/logo/anni${i + 1}.png`,
      dest: path.join(PROJECT_ROOT, 'public', 'images', 'logo', `anni${i + 1}.png`),
    })),
  ];

  // Filter out already-downloaded files
  const pending = targets.filter(t => !fs.existsSync(t.dest));
  if (pending.length === 0) {
    console.log('  All Puppeteer targets already exist, skipping.');
    return;
  }

  console.log(`  ${pending.length} files to download via Puppeteer.`);

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--window-size=1280,800',
      ],
    });

    const page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 800 });
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
    });

    // ── Phase 1: Hit xat.com homepage to get cookies / pass Cloudflare ──────
    console.log('  Navigating to xat.com homepage to establish session...');
    try {
      await page.goto('https://xat.com/', {
        waitUntil: 'networkidle2',
        timeout: 60000,
      });
      console.log('  Homepage loaded. Title:', await page.title());
    } catch (err) {
      console.warn('  Homepage load timed out or errored, continuing anyway:', err.message);
    }

    // Short pause to let Cloudflare settle
    await new Promise(r => setTimeout(r, 3000));

    // ── Phase 2: Download each target via page.goto on image URL ────────────
    const downloaded = [];
    const failed = [];

    for (const target of pending) {
      if (fs.existsSync(target.dest)) {
        console.log(`  Already exists: ${path.basename(target.dest)}`);
        continue;
      }

      try {
        console.log(`  Fetching: ${target.url}`);

        const response = await page.goto(target.url, {
          waitUntil: 'networkidle0',
          timeout: 30000,
        });

        if (!response) {
          throw new Error('No response received');
        }

        const status = response.status();
        if (status !== 200) {
          throw new Error(`HTTP ${status}`);
        }

        const buffer = await response.buffer();
        if (!buffer || buffer.length === 0) {
          throw new Error('Empty response body');
        }

        saveFile(target.dest, buffer);
        downloaded.push(target.url);

        // Brief pause between requests to avoid rate limiting
        await new Promise(r => setTimeout(r, 500));

      } catch (err) {
        console.error(`  FAILED: ${path.basename(target.url)} - ${err.message}`);
        failed.push({ url: target.url, error: err.message });
      }
    }

    console.log(`\n  Downloaded: ${downloaded.length} files`);
    if (failed.length > 0) {
      console.warn(`  Failed: ${failed.length} files`);
      failed.forEach(f => console.warn(`    - ${f.url}: ${f.error}`));
    }

  } finally {
    if (browser) {
      await browser.close();
      console.log('  Browser closed.');
    }
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== xat.com Missing Assets Downloader ===');
  console.log(`Project root: ${PROJECT_ROOT}`);

  try {
    await downloadAnimateCss();
  } catch (err) {
    console.error('animate.css download failed:', err.message);
  }

  try {
    await downloadWithPuppeteer();
  } catch (err) {
    console.error('Puppeteer download session failed:', err.message);
  }

  console.log('\n=== Done ===');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
