#!/usr/bin/env node
/**
 * Capture real xat.com API responses using stealth puppeteer.
 * Bypasses Cloudflare to get actual data from endpoints the client needs.
 *
 * Usage: node scripts/capture-xat-apis.js
 *
 * Saves responses to data/ directory as JSON files.
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.resolve(__dirname, '..', 'data');

// Endpoints to capture with their expected response format
const ENDPOINTS = [
  {
    url: 'https://xat.com/web_gear/chat/kiss.php',
    output: 'kiss_real.json',
    description: 'Kiss smiley catalog'
  },
  {
    url: 'https://xat.com/web_gear/chat/gifts22.php?id=42&cb=1',
    output: 'gifts22_real.json',
    description: 'Gift catalog/user gifts'
  },
  {
    url: 'https://xat.com/web_gear/chat/avatareffects.php',
    output: 'avatareffects_real.json',
    description: 'Avatar effects list'
  },
  {
    url: 'https://xat.com/web_gear/chat/Announce.php',
    output: 'announce_real2.json',
    description: 'Announce/news data'
  },
  {
    url: 'https://xat.com/web_gear/chat/pow2.php',
    output: 'pow2_real2.json',
    description: 'Powers database (refresh)'
  },
  {
    url: 'https://xat.com/json/promo.php',
    output: 'promo_real2.json',
    description: 'Promoted groups'
  },
  {
    url: 'https://xat.com/json/lang/languages.php',
    output: 'languages_real2.json',
    description: 'Languages list'
  },
];

async function main() {
  let puppeteer, StealthPlugin;
  try {
    puppeteer = require('puppeteer-extra');
    StealthPlugin = require('puppeteer-extra-plugin-stealth');
  } catch (e) {
    console.error('Missing puppeteer-extra or stealth plugin. Run: npm install puppeteer-extra puppeteer-extra-plugin-stealth');
    process.exit(1);
  }

  puppeteer.use(StealthPlugin());

  console.log('[Capture] Launching stealth browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');

  // First visit xat.com to get past Cloudflare
  console.log('[Capture] Solving Cloudflare challenge on xat.com...');
  try {
    await page.goto('https://xat.com/', { waitUntil: 'networkidle2', timeout: 30000 });
    // Wait a bit for CF clearance
    await new Promise(r => setTimeout(r, 5000));
    console.log('[Capture] Cloudflare challenge passed');
  } catch (e) {
    console.warn('[Capture] Initial page load issue:', e.message);
  }

  let captured = 0;
  let failed = 0;

  for (const endpoint of ENDPOINTS) {
    const outputPath = path.join(DATA_DIR, endpoint.output);
    console.log(`\n[Capture] ${endpoint.description}: ${endpoint.url}`);

    try {
      const response = await page.goto(endpoint.url, {
        waitUntil: 'networkidle0',
        timeout: 20000
      });

      if (!response) {
        console.error(`  FAILED: No response`);
        failed++;
        continue;
      }

      const status = response.status();
      const contentType = response.headers()['content-type'] || '';
      const body = await response.text();

      console.log(`  Status: ${status}, Content-Type: ${contentType}, Size: ${body.length}`);

      // Check if we got a Cloudflare challenge page
      if (body.includes('challenge-platform') || body.includes('cf-chl-bypass')) {
        console.error(`  FAILED: Got Cloudflare challenge page`);
        // Wait and retry once
        console.log('  Retrying after 10s...');
        await new Promise(r => setTimeout(r, 10000));
        const retry = await page.goto(endpoint.url, { waitUntil: 'networkidle0', timeout: 20000 });
        if (retry) {
          const retryBody = await retry.text();
          if (!retryBody.includes('challenge-platform')) {
            try {
              JSON.parse(retryBody); // Validate JSON
              fs.writeFileSync(outputPath, retryBody);
              console.log(`  RETRY SUCCESS: Saved to ${endpoint.output}`);
              captured++;
              continue;
            } catch (e) {
              // Not JSON, save as-is for inspection
              fs.writeFileSync(outputPath + '.html', retryBody);
              console.error(`  RETRY FAILED: Response is not JSON, saved HTML for inspection`);
            }
          }
        }
        failed++;
        continue;
      }

      // Try to parse as JSON
      try {
        const json = JSON.parse(body);
        fs.writeFileSync(outputPath, JSON.stringify(json, null, 2));
        console.log(`  SUCCESS: Saved to ${endpoint.output}`);
        captured++;
      } catch (e) {
        // Not JSON — might be HTML for endpoints like hugs.php
        fs.writeFileSync(outputPath + '.raw', body);
        console.log(`  SAVED RAW: ${endpoint.output}.raw (not valid JSON)`);
        captured++;
      }
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
      failed++;
    }

    // Small delay between requests
    await new Promise(r => setTimeout(r, 2000));
  }

  // Also try to capture the protocol by loading a real chat room
  console.log('\n[Capture] Attempting to capture live WebSocket protocol...');
  try {
    const wsMessages = [];
    page.on('response', async (response) => {
      const url = response.url();
      if (url.includes('.php') || url.includes('/json/')) {
        try {
          const text = await response.text();
          wsMessages.push({ url, status: response.status(), body: text.substring(0, 2000) });
        } catch (e) {}
      }
    });

    // Navigate to a chat page to capture API calls
    await page.goto('https://xat.com/chat#Chat', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 10000));

    if (wsMessages.length > 0) {
      fs.writeFileSync(path.join(DATA_DIR, 'protocol_capture.json'), JSON.stringify(wsMessages, null, 2));
      console.log(`  Captured ${wsMessages.length} API responses from chat page load`);
    }
  } catch (e) {
    console.warn('  Protocol capture failed:', e.message);
  }

  await browser.close();

  console.log(`\n[Capture] Done: ${captured} captured, ${failed} failed`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
