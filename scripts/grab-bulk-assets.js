#!/usr/bin/env node
/**
 * grab-bulk-assets.js
 *
 * Downloads bulk xat.com assets that the main scraper misses:
 *   - Avatars (1758 default avatar PNGs)
 *   - Smilies/SMW images (flag icons, smiley sprites)
 *   - Sounds (audies, chat sounds)
 *   - Powers data (pow2.php, powers.php)
 *   - Language packs
 *   - Logo images (seasonal)
 *   - Gift/sticker data
 *   - JSON API data (lists, promo, etc)
 *
 * Usage: node scripts/grab-bulk-assets.js [--avatars] [--smilies] [--sounds] [--api] [--all]
 *        Default: --all
 *
 * This uses direct HTTP fetch (no Puppeteer). Some endpoints may be
 * blocked by Cloudflare - for those, use the main grab-all-assets.js.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

const args = process.argv.slice(2);
const DO_ALL = args.includes('--all') || args.length === 0;
const DO_AVATARS = DO_ALL || args.includes('--avatars');
const DO_SMILIES = DO_ALL || args.includes('--smilies');
const DO_SOUNDS = DO_ALL || args.includes('--sounds');
const DO_API = DO_ALL || args.includes('--api');
const DO_LOGOS = DO_ALL || args.includes('--logos');
const DO_FLAGS = DO_ALL || args.includes('--flags');

const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const REFERER = 'https://xat.com/';

let stats = { downloaded: 0, skipped: 0, failed: 0, bytes: 0 };

// Rate limiting
let lastFetch = 0;
const MIN_DELAY = 50; // ms between requests

async function download(url, destPath, { overwrite = false } = {}) {
  // Skip if already exists and not overwriting
  if (!overwrite && fs.existsSync(destPath)) {
    const stat = fs.statSync(destPath);
    if (stat.size > 0) {
      stats.skipped++;
      return true;
    }
  }

  // Rate limit
  const now = Date.now();
  const elapsed = now - lastFetch;
  if (elapsed < MIN_DELAY) {
    await new Promise(r => setTimeout(r, MIN_DELAY - elapsed));
  }
  lastFetch = Date.now();

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': UA, 'Referer': REFERER },
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      if (response.status !== 404) {
        stats.failed++;
      }
      return false;
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length === 0) return false;

    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, buffer);
    stats.downloaded++;
    stats.bytes += buffer.length;
    return true;
  } catch (err) {
    stats.failed++;
    return false;
  }
}

// ===== AVATARS =====
// xat has ~1758 default avatars at /web_gear/chat/av/{1..1758}.png
async function grabAvatars() {
  console.log('\n=== AVATARS ===');
  const destDir = path.join(PUBLIC, 'web_gear', 'chat', 'av');
  fs.mkdirSync(destDir, { recursive: true });

  const MAX_AVATAR = 1758;
  let consecutive404 = 0;
  let downloaded = 0;

  for (let id = 1; id <= MAX_AVATAR; id++) {
    const url = `https://xat.com/web_gear/chat/av/${id}.png`;
    const dest = path.join(destDir, `${id}.png`);
    const ok = await download(url, dest);
    if (ok) {
      downloaded++;
      consecutive404 = 0;
      if (downloaded % 100 === 0) {
        process.stdout.write(`  ${downloaded} avatars downloaded...\r`);
      }
    } else {
      consecutive404++;
      // If we get many 404s in a row, the range might have ended
      if (consecutive404 > 20) {
        console.log(`  Stopping at ID ${id} after ${consecutive404} consecutive misses`);
        break;
      }
    }
  }
  console.log(`  Avatars: ${downloaded} downloaded`);
}

// ===== SMILIES / SMW =====
// Smilies on gs.xat.com: a_({name})_30 format
// Also /images/smw/{name}.png for named smilies
async function grabSmilies() {
  console.log('\n=== SMILIES ===');
  const destDir = path.join(PUBLIC, 'smilies');
  const smwDir = path.join(PUBLIC, 'images', 'smw');
  fs.mkdirSync(destDir, { recursive: true });
  fs.mkdirSync(smwDir, { recursive: true });

  // Common smiley names from xat
  const SMILEY_NAMES = [
    'smile', 'biggrin', 'sad', 'frown', 'wink', 'tongue', 'cool', 'mad',
    'redface', 'confused', 'rolleyes', 'eek', 'cry', 'surprised', 'angel',
    'alien', 'annoyed', 'applause', 'argue', 'ashamed', 'backoff', 'blowkiss',
    'bomb', 'bow', 'brb', 'bye', 'chad', 'clap', 'coffee', 'confused2',
    'cool2', 'crazy', 'crybaby', 'curse', 'd', 'dance', 'devil', 'dizzy',
    'dog', 'drink', 'drunk', 'dunce', 'evilgrin', 'fail', 'facepalm',
    'fight', 'finger', 'flower', 'fly', 'furious', 'ghost', 'giggle',
    'glasses', 'groan', 'grr', 'hairpull', 'handshake', 'happy', 'heart',
    'hello', 'help', 'hide', 'hug', 'idea', 'inlove', 'innocent', 'jump',
    'kiss', 'laugh', 'lol', 'love', 'mean', 'meh', 'mmf', 'mock', 'music',
    'nerd', 'no', 'nod', 'oink', 'omg', 'oops', 'party', 'peace', 'phone',
    'pirate', 'please', 'poke', 'pout', 'pray', 'puke', 'punch', 'rage',
    'rain', 'rofl', 'run', 'santa', 'scared', 'scream', 'shy', 'sick',
    'sing', 'slap', 'sleep', 'smirk', 'snore', 'spin', 'star', 'stop',
    'stress', 'stung', 'sweat', 'swt', 'tease', 'think', 'thumbsup',
    'thumbsdown', 'tired', 'toad', 'tongue2', 'trophy', 'violin', 'wait',
    'wave', 'whip', 'whistle', 'woot', 'worried', 'yawn', 'yes', 'zip',
    'zombie', 'zzz',
    // Numbered smilies
    'd', 'p', 'xd', 'xp', '8)',
  ];

  let downloaded = 0;

  // gs.xat.com format: a_(name)_30
  for (const name of SMILEY_NAMES) {
    const url = `https://gs.xat.com/a_(${name})_30`;
    const dest = path.join(destDir, `${name}.webp`);
    if (await download(url, dest)) downloaded++;
  }

  // Also try numbered smilies from gs.xat.com
  for (let i = 1; i <= 200; i++) {
    const url = `https://gs.xat.com/a_(${i})_30`;
    const dest = path.join(destDir, `${i}.webp`);
    if (await download(url, dest)) downloaded++;
  }

  // SMW flag images - common country codes
  const FLAGS = [
    'ad','ae','af','ag','ai','al','am','ao','ar','at','au','az','ba','bb','bd','be','bf',
    'bg','bh','bi','bj','bn','bo','br','bs','bt','bw','by','bz','ca','cd','cf','cg','ch',
    'ci','cl','cm','cn','co','cr','cu','cv','cy','cz','de','dj','dk','dm','do','dz','ec',
    'ee','eg','er','es','et','fi','fj','fm','fr','ga','gb','gd','ge','gh','gm','gn','gq',
    'gr','gt','gw','gy','hk','hn','hr','ht','hu','id','ie','il','in','iq','ir','is','it',
    'jm','jo','jp','ke','kg','kh','ki','km','kn','kp','kr','kw','ky','kz','la','lb','lc',
    'li','lk','lr','ls','lt','lu','lv','ly','ma','mc','md','me','mg','mh','mk','ml','mm',
    'mn','mo','mr','mt','mu','mv','mw','mx','my','mz','na','ne','ng','ni','nl','no','np',
    'nr','nz','om','pa','pe','pg','ph','pk','pl','pt','pw','py','qa','ro','rs','ru','rw',
    'sa','sb','sc','sd','se','sg','si','sk','sl','sm','sn','so','sr','ss','st','sv','sy',
    'sz','td','tg','th','tj','tl','tm','tn','to','tr','tt','tv','tw','tz','ua','ug','us',
    'uy','uz','va','vc','ve','vn','vu','ws','ye','za','zm','zw',
  ];

  let flagCount = 0;
  for (const code of FLAGS) {
    const url = `https://xat.com/images/smw/flag/${code}.png`;
    const dest = path.join(smwDir, 'flag', `${code}.png`);
    if (await download(url, dest)) flagCount++;
  }

  // Also grab the generic flag.png
  await download('https://xat.com/images/smw/flag.png', path.join(smwDir, 'flag.png'));

  console.log(`  Smilies: ${downloaded} downloaded`);
  console.log(`  Flags: ${flagCount} downloaded`);
}

// ===== SOUNDS =====
async function grabSounds() {
  console.log('\n=== SOUNDS ===');
  const sndDir = path.join(PUBLIC, 'web_gear', 'chat', 'snd');
  const audiesDir = path.join(PUBLIC, 'content', 'sounds', 'audies');
  fs.mkdirSync(sndDir, { recursive: true });
  fs.mkdirSync(audiesDir, { recursive: true });

  // Known sound names from deobfuscated xat.js
  const CHAT_SOUNDS = [
    'beep', 'ding', 'dong', 'tickle', 'buzz', 'alert', 'ring',
    'chime', 'click', 'knock', 'pop', 'whistle', 'bell',
  ];

  // Audies - xat custom sounds
  const AUDIES = [
    'applause', 'aww', 'boo', 'boing', 'boom', 'burp', 'buzzer', 'cartoon',
    'cash', 'chirp', 'clap', 'crowd', 'cry', 'doorbell', 'drum', 'evil',
    'explosion', 'fart', 'gasp', 'giggle', 'groan', 'growl', 'gulp',
    'gunshot', 'heartbeat', 'honk', 'horn', 'howl', 'kiss', 'knock',
    'laugh', 'meow', 'moo', 'oink', 'orchestra', 'phone', 'plop',
    'pop', 'punch', 'purr', 'quack', 'rain', 'record', 'ribbit',
    'roar', 'scream', 'sigh', 'siren', 'slap', 'snore', 'splash',
    'squeak', 'thunder', 'train', 'trumpet', 'tuba', 'violin', 'whistle',
    'woof', 'yawn', 'yodel',
  ];

  let sndCount = 0, audiesCount = 0;

  for (const name of CHAT_SOUNDS) {
    for (const ext of ['mp3', 'webm']) {
      const url = `https://xat.com/web_gear/chat/snd/${name}.${ext}`;
      const dest = path.join(sndDir, `${name}.${ext}`);
      if (await download(url, dest)) sndCount++;
    }
  }

  for (const name of AUDIES) {
    for (const ext of ['webm', 'mp3']) {
      const url = `https://xat.com/content/sounds/audies/${name}.${ext}`;
      const dest = path.join(audiesDir, `${name}.${ext}`);
      if (await download(url, dest)) audiesCount++;
    }
  }

  console.log(`  Chat sounds: ${sndCount} downloaded`);
  console.log(`  Audies: ${audiesCount} downloaded`);
}

// ===== API/JSON DATA =====
async function grabApiData() {
  console.log('\n=== API / JSON DATA ===');

  const endpoints = [
    // Powers data
    { url: 'https://xat.com/web_gear/chat/pow2.php', dest: 'web_gear/chat/pow2.php' },
    { url: 'https://xat.com/web_gear/chat/powers.php', dest: 'web_gear/chat/powers.php' },
    { url: 'https://xat.com/web_gear/chat/GetPowers5.php', dest: 'web_gear/chat/GetPowers5.php' },

    // Language packs
    { url: 'https://xat.com/json/lang/getlang2.php?f=box&l=en', dest: 'json/lang/en_box.json' },
    { url: 'https://xat.com/json/lang/getlang2.php?f=direct&l=en', dest: 'json/lang/en_direct.json' },
    { url: 'https://xat.com/json/lang/getlang2.php?f=embed&l=en', dest: 'json/lang/en_embed.json' },
    { url: 'https://xat.com/json/lang/languages.php', dest: 'json/lang/languages.json' },
    { url: 'https://xat.com/json/lang/customlang2.php?t=0', dest: 'json/lang/customlang.json' },

    // Lists (featured groups, popular, etc)
    { url: 'https://xat.com/json/lists/0_en_featured.php', dest: 'json/lists/0_en_featured.json' },
    { url: 'https://xat.com/json/lists/0_en_popular.php', dest: 'json/lists/0_en_popular.json' },
    { url: 'https://xat.com/json/lists/0_en_promoted.php', dest: 'json/lists/0_en_promoted.json' },

    // Promo/announcements
    { url: 'https://xat.com/web_gear/chat/Announce.php', dest: 'web_gear/chat/Announce.json' },
    { url: 'https://xat.com/json/promo.php', dest: 'json/promo.json' },
    { url: 'https://xat.com/json/abx.php', dest: 'json/abx.json' },
    { url: 'https://xat.com/json/vote.php', dest: 'json/vote.json' },

    // Gifts/kisses/hugs data
    { url: 'https://xat.com/web_gear/chat/gifts22.php', dest: 'web_gear/chat/gifts22.json' },
    { url: 'https://xat.com/web_gear/chat/kiss.php', dest: 'web_gear/chat/kiss.json' },
    { url: 'https://xat.com/web_gear/chat/hugs.php', dest: 'web_gear/chat/hugs.json' },

    // Gift images data
    { url: 'https://xat.com/web_gear/chat/gift2.php?v2=1', dest: 'web_gear/chat/gift2.json' },
  ];

  let count = 0;
  for (const ep of endpoints) {
    const dest = path.join(PUBLIC, ep.dest);
    const ok = await download(ep.url, dest, { overwrite: true });
    if (ok) {
      count++;
      console.log(`  OK: ${ep.dest}`);
    } else {
      console.log(`  MISS: ${ep.url}`);
    }
  }
  console.log(`  API data: ${count}/${endpoints.length} downloaded`);
}

// ===== LOGOS =====
async function grabLogos() {
  console.log('\n=== LOGOS ===');
  const logoDir = path.join(PUBLIC, 'images', 'logo');
  fs.mkdirSync(logoDir, { recursive: true });

  // From common.js: seasonal logo arrays
  const LOGOS = [
    // New Year
    ...Array.from({ length: 8 }, (_, i) => `newyear${i + 1}`),
    // Valentine
    ...Array.from({ length: 12 }, (_, i) => `valentine${i + 1}`),
    // Fourth of July
    ...Array.from({ length: 8 }, (_, i) => `fourth${i + 1}`),
    // Anniversary
    ...Array.from({ length: 8 }, (_, i) => `anniversary${i + 1}`),
    // Halloween
    ...Array.from({ length: 12 }, (_, i) => `halloween${i + 1}`),
    // Christmas
    ...Array.from({ length: 24 }, (_, i) => `xmas${i + 1}`),
    // Easter
    ...Array.from({ length: 12 }, (_, i) => `easter${i + 1}`),
    // St Patrick's
    ...Array.from({ length: 8 }, (_, i) => `patricks${i + 1}`),
    // Default
    'xatplanet',
  ];

  let count = 0;
  for (const name of LOGOS) {
    const url = `https://xat.com/images/logo/${name}.png`;
    const dest = path.join(logoDir, `${name}.png`);
    if (await download(url, dest)) count++;
  }
  console.log(`  Logos: ${count} downloaded`);
}

// ===== MAIN =====
async function main() {
  console.log('=== xat Bulk Asset Downloader ===');
  console.log(`Output: ${PUBLIC}`);
  const startTime = Date.now();

  if (DO_AVATARS) await grabAvatars();
  if (DO_SMILIES) await grabSmilies();
  if (DO_SOUNDS) await grabSounds();
  if (DO_API) await grabApiData();
  if (DO_LOGOS) await grabLogos();

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const mb = (stats.bytes / (1024 * 1024)).toFixed(1);
  console.log(`\n=== DONE in ${elapsed}s ===`);
  console.log(`Downloaded: ${stats.downloaded} files (${mb} MB)`);
  console.log(`Skipped (already had): ${stats.skipped}`);
  console.log(`Failed: ${stats.failed}`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
