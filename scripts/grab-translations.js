#!/usr/bin/env node
/**
 * Download xat.com translation/localization files.
 *
 * The xat client uses jquery.localize to fetch per-domain translation files
 * from: //xat.com/json/translate/{stem}-{lang}.php
 *
 * Stems loaded by the client: web, index, groups, main, buy (+ chats, login, etc.)
 * These are only fetched for non-English languages; English is the built-in default.
 *
 * Uses puppeteer-extra + stealth to bypass Cloudflare.
 */
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

puppeteer.use(StealthPlugin());

const SAVE_DIR = path.resolve(__dirname, '..', 'public', 'json', 'translate');
if (!fs.existsSync(SAVE_DIR)) fs.mkdirSync(SAVE_DIR, { recursive: true });

// Stems the xat client requests translations for
const STEMS = ['web', 'index', 'groups', 'main', 'buy', 'chats', 'login'];

// Languages to download (en is built-in/default, skip it)
const LANGS = ['es', 'pt', 'fr', 'de', 'tr', 'ro', 'pl', 'nl', 'it', 'ru', 'ar', 'hu'];

function buildUrl(stem, lang) {
  return `https://xat.com/json/translate/${stem}-${lang}.php`;
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  let saved = 0;
  let skipped = 0;

  for (const lang of LANGS) {
    for (const stem of STEMS) {
      const url = buildUrl(stem, lang);
      const filename = `${stem}-${lang}.php`;
      const savePath = path.join(SAVE_DIR, filename);

      try {
        const resp = await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
        const status = resp.status();
        const body = await resp.text();

        if (status === 200 && body.length > 10) {
          // Validate it's JSON before saving
          try {
            JSON.parse(body);
            fs.writeFileSync(savePath, body);
            console.log(`  saved  ${filename} (${body.length} bytes)`);
            saved++;
          } catch (e) {
            console.log(`  skip   ${filename} - not valid JSON (status ${status})`);
            skipped++;
          }
        } else {
          console.log(`  skip   ${filename} - status ${status}, size ${body.length}`);
          skipped++;
        }
      } catch (e) {
        console.log(`  error  ${filename} - ${e.message}`);
        skipped++;
      }
    }
  }

  await browser.close();
  console.log(`\nDone. Saved: ${saved}, Skipped/failed: ${skipped}`);
  console.log(`Files in: ${SAVE_DIR}`);
})();
