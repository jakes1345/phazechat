#!/usr/bin/env node
/**
 * Crawl xat.com pages with stealth Puppeteer to understand the full site structure.
 * Takes screenshots and saves HTML of every major page.
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

puppeteer.use(StealthPlugin());

const SAVE_DIR = path.resolve(__dirname, '..', 'data', 'xat_crawl');
if (!fs.existsSync(SAVE_DIR)) fs.mkdirSync(SAVE_DIR, { recursive: true });

const PAGES = [
  { name: 'homepage', url: 'https://xat.com/' },
  { name: 'chat_group', url: 'https://xat.com/Chat' },
  { name: 'help_group', url: 'https://xat.com/Help' },
  { name: 'login', url: 'https://xat.com/login' },
  { name: 'register', url: 'https://xat.com/register' },
];

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080'],
  });

  for (const pg of PAGES) {
    console.log(`\n=== Crawling: ${pg.name} (${pg.url}) ===`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    try {
      await page.goto(pg.url, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise(r => setTimeout(r, 3000)); // wait for JS rendering

      // Screenshot
      const ssPath = path.join(SAVE_DIR, `${pg.name}.png`);
      await page.screenshot({ path: ssPath, fullPage: true });
      console.log(`  Screenshot: ${ssPath}`);

      // Save HTML
      const html = await page.content();
      const htmlPath = path.join(SAVE_DIR, `${pg.name}.html`);
      fs.writeFileSync(htmlPath, html);
      console.log(`  HTML: ${htmlPath} (${html.length} bytes)`);

      // Get page title and meta
      const title = await page.title();
      console.log(`  Title: ${title}`);

      // Get all iframes
      const frames = page.frames();
      console.log(`  Frames: ${frames.length}`);
      for (const frame of frames) {
        const furl = frame.url();
        if (furl !== pg.url && furl !== 'about:blank') {
          console.log(`    - ${furl}`);
        }
      }

      // For homepage specifically, get the main content structure
      if (pg.name === 'homepage') {
        const structure = await page.evaluate(() => {
          const result = {};
          // Check for featured groups section
          const groups = document.querySelectorAll('[data-groups], .group-card, .groupCard, #groups, .featured');
          result.groupElements = groups.length;
          // Check for promo/featured section
          const promo = document.querySelector('#promo, .promo, [data-promo]');
          result.hasPromo = !!promo;
          // Get main sections
          const sections = [];
          document.querySelectorAll('section, [class*="section"], [id*="section"], .container, .maincon').forEach(el => {
            sections.push({ tag: el.tagName, id: el.id, class: el.className?.substring?.(0, 80) });
          });
          result.sections = sections.slice(0, 20);
          // Get nav items
          const navItems = [];
          document.querySelectorAll('nav a, .navbar a, #navTop a').forEach(a => {
            navItems.push({ text: a.textContent?.trim()?.substring(0,30), href: a.href?.substring(0,80) });
          });
          result.navItems = navItems.slice(0, 20);
          return result;
        });
        console.log(`  Page structure:`, JSON.stringify(structure, null, 2));
      }

      // For chat group page, check embed state
      if (pg.name === 'chat_group') {
        // Wait longer for embed to load
        await new Promise(r => setTimeout(r, 5000));
        await page.screenshot({ path: path.join(SAVE_DIR, `${pg.name}_loaded.png`), fullPage: true });

        // Check the embed iframe
        const embedInfo = await page.evaluate(() => {
          const embed = document.getElementById('embedframe');
          const result = {
            embedExists: !!embed,
            embedSrc: embed?.src || 'none',
            embedVisible: embed ? (embed.offsetWidth > 0 && embed.offsetHeight > 0) : false,
            embedSize: embed ? `${embed.width}x${embed.height}` : 'none',
          };
          return result;
        });
        console.log(`  Embed info:`, embedInfo);
      }

    } catch (e) {
      console.log(`  Error: ${e.message}`);
    }
    await page.close();
  }

  // Also grab the homepage promo.php and pow2.php API responses
  console.log('\n=== Fetching API endpoints ===');
  const apiPage = await browser.newPage();

  const apis = [
    'https://xat.com/json/promo.php',
    'https://xat.com/web_gear/chat/pow2.php',
    'https://xat.com/web_gear/chat/Announce.php',
    'https://xat.com/json/lang/languages.php',
  ];

  for (const apiUrl of apis) {
    try {
      const resp = await apiPage.goto(apiUrl, { waitUntil: 'networkidle2', timeout: 15000 });
      const body = await resp.text();
      const safeName = apiUrl.replace(/[^a-zA-Z0-9]/g, '_').slice(-60);
      fs.writeFileSync(path.join(SAVE_DIR, `api_${safeName}.json`), body);
      console.log(`  ${apiUrl}: ${body.length} bytes`);
      if (body.length < 2000) console.log(`    ${body.substring(0, 500)}`);
    } catch (e) {
      console.log(`  ${apiUrl}: ${e.message}`);
    }
  }

  await browser.close();
  console.log('\nDone!');
})();
