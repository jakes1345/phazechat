'use strict';

/**
 * image-service.js
 *
 * Smiley/avatar image generation and proxy service for xat-clone.
 *
 * Provides:
 *   - Smiley proxy/cache: serves smilies from gs.xat.com via /[aS]_(code)_size routes,
 *     caching results in public/cache/smilies/
 *   - GetImage7.php replacement: fetches and resizes avatar images (GIF support)
 *   - GetImage9.php replacement: fetches and resizes avatar images (static/direct)
 *   - avatareffects.php: returns available avatar effects list
 *
 * Usage in server.js:
 *   const imageService = require('./image-service');
 *   imageService.register(app);
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// ---------------------------------------------------------------------------
// Cache directory setup
// ---------------------------------------------------------------------------

const ROOT_DIR = path.resolve(__dirname, '..');
const SMILIES_CACHE_DIR = path.join(ROOT_DIR, 'public', 'cache', 'smilies');
const AVATARS_CACHE_DIR = path.join(ROOT_DIR, 'public', 'cache', 'avatars');
const LOCAL_SMILIES_DIR = path.join(ROOT_DIR, 'public', 'smilies');

// Ensure cache dirs exist at module load time
[SMILIES_CACHE_DIR, AVATARS_CACHE_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`[ImageService] Created cache directory: ${dir}`);
  }
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const REFERER = 'https://xat.com/';

/**
 * Sanitize a smiley code/hash so it can be used as a filesystem filename.
 * Replaces characters that are unsafe in file paths with underscores.
 */
function sanitizeCacheKey(str) {
  return str.replace(/[^a-zA-Z0-9\-_.]/g, '_');
}

/**
 * Fetch a remote URL and return { buffer, contentType } or null on failure.
 */
async function fetchRemote(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
        'Referer': REFERER,
      },
    });
    if (!response.ok) return null;
    const contentType = response.headers.get('Content-Type') || 'application/octet-stream';
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length < 50) return null; // sanity: skip empty/error responses
    return { buffer, contentType };
  } catch (err) {
    console.error(`[ImageService] fetch error ${url}:`, err.message);
    return null;
  }
}

/**
 * Look up an image in the local cache.
 * Returns { filePath, contentType } if found, null otherwise.
 *
 * The cache stores a small sidecar .meta file alongside the image to record
 * the original content-type (since the extension alone is ambiguous).
 */
function findInCache(cacheDir, key) {
  const base = path.join(cacheDir, sanitizeCacheKey(key));
  const metaPath = base + '.meta';
  if (!fs.existsSync(metaPath)) return null;
  try {
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    const imgPath = base + meta.ext;
    if (fs.existsSync(imgPath)) {
      return { filePath: imgPath, contentType: meta.contentType };
    }
  } catch {
    // corrupted meta, ignore
  }
  return null;
}

/**
 * Write an image to the local cache directory.
 */
function writeToCache(cacheDir, key, buffer, contentType) {
  try {
    const ext = contentTypeToExt(contentType);
    const base = path.join(cacheDir, sanitizeCacheKey(key));
    fs.writeFileSync(base + ext, buffer);
    fs.writeFileSync(base + '.meta', JSON.stringify({ contentType, ext }));
  } catch (err) {
    console.error('[ImageService] cache write error:', err.message);
  }
}

function contentTypeToExt(contentType) {
  if (!contentType) return '.bin';
  if (contentType.includes('webp')) return '.webp';
  if (contentType.includes('gif'))  return '.gif';
  if (contentType.includes('png'))  return '.png';
  if (contentType.includes('jpeg') || contentType.includes('jpg')) return '.jpg';
  if (contentType.includes('svg'))  return '.svg';
  return '.bin';
}

// ---------------------------------------------------------------------------
// EncodeGetStrip - server-side port of the client's Smilies.EncodeGetStrip()
// Needed so we can construct the correct gs.xat.com URL from a raw hash.
// ---------------------------------------------------------------------------

function base64EncodeUrl(str) {
  const encoded = Buffer.from(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16)))
  ).toString('base64');
  return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function encodeGetStrip(str) {
  str = str.replace(/#/g, '*');
  if (/[^0-9a-zA-Z_*()]/.test(str)) {
    const parts = str.split('*');
    for (let i = 0; i < parts.length; i++) {
      if (/[^0-9a-zA-Z_*()]/.test(parts[i])) {
        if (parts[i].includes(')')) {
          const subParts = parts[i].split(')');
          parts[i] = '!' + base64EncodeUrl(subParts[0]) + ')' + subParts[1];
        } else {
          parts[i] = '!' + base64EncodeUrl(parts[i]);
        }
      }
    }
    str = parts.join('*');
  }
  return str;
}

// ---------------------------------------------------------------------------
// Smiley Proxy handler
// ---------------------------------------------------------------------------

/**
 * Route handler for smiley requests (gs.xat.com format).
 *
 * Handles both animated (a_) and static (S_) prefix formats:
 *   GET /a_(smileyCode)_size
 *   GET /S_(smileyCode)_size
 *
 * Priority:
 *   1. Existing locally-shipped smilies in public/smilies/
 *   2. Cache in public/cache/smilies/
 *   3. Fetch from gs.xat.com and cache
 */
async function handleSmileyProxy(req, res) {
  const rawPath = req.path; // e.g. /a_(hug)_30
  const match = rawPath.match(/^\/([aS])_\(([^)]+)\)_(\d+)$/);
  if (!match) {
    return res.status(400).send('Bad smiley path');
  }

  const prefix = match[1]; // 'a' or 'S'
  const code   = match[2]; // raw smiley code, e.g. "hug" or "hug*r1234ab"
  const size   = match[3]; // pixel size, e.g. "30"

  // 1. Check locally-shipped smilies (authoritative, no caching needed)
  const localWebp = path.join(LOCAL_SMILIES_DIR, code + '.webp');
  const localPng  = path.join(LOCAL_SMILIES_DIR, code + '.png');
  if (fs.existsSync(localWebp)) {
    res.set('Content-Type', 'image/webp');
    res.set('Cache-Control', 'public, max-age=86400');
    res.set('Access-Control-Allow-Origin', '*');
    return res.sendFile(localWebp);
  }
  if (fs.existsSync(localPng)) {
    res.set('Content-Type', 'image/png');
    res.set('Cache-Control', 'public, max-age=86400');
    res.set('Access-Control-Allow-Origin', '*');
    return res.sendFile(localPng);
  }

  // 2. Check the smilies cache
  const cacheKey = `${prefix}_${code}_${size}`;
  const cached = findInCache(SMILIES_CACHE_DIR, cacheKey);
  if (cached) {
    res.set('Content-Type', cached.contentType);
    res.set('Cache-Control', 'public, max-age=86400');
    res.set('Access-Control-Allow-Origin', '*');
    return res.sendFile(cached.filePath);
  }

  // 3. Fetch from gs.xat.com
  // The URL path is already encoded by the client's EncodeGetStrip — pass through directly
  const gsUrl = `https://gs.xat.com${rawPath}`;

  console.log(`[ImageService] Fetching smiley: ${gsUrl}`);
  const result = await fetchRemote(gsUrl);
  if (result) {
    writeToCache(SMILIES_CACHE_DIR, cacheKey, result.buffer, result.contentType);
    res.set('Content-Type', result.contentType);
    res.set('Cache-Control', 'public, max-age=86400');
    res.set('Access-Control-Allow-Origin', '*');
    return res.send(result.buffer);
  }

  // 4. Fallback: return transparent 1x1 PNG to avoid console spam
  console.warn(`[ImageService] Smiley not found: ${cacheKey}`);
  const transparentPng = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    'base64'
  );
  res.set('Content-Type', 'image/png');
  res.set('Cache-Control', 'public, max-age=3600');
  return res.send(transparentPng);
}

// ---------------------------------------------------------------------------
// Avatar image processing helpers (shared by GetImage7 and GetImage9)
// ---------------------------------------------------------------------------

/**
 * Fetch a source image URL and resize it using sharp.
 * Returns a Buffer of the resized image.
 *
 * For GIFs we cannot animate through sharp (it strips frames), but we can
 * at least resize the first frame reliably.  The caller passes isGif=true
 * when the source is a GIF so we can apply appropriate handling.
 */
async function fetchAndResize(sourceUrl, width, height, isGif = false) {
  const result = await fetchRemote(sourceUrl);
  if (!result) return null;

  try {
    let pipeline = sharp(result.buffer, { animated: isGif });

    if (isGif) {
      // For animated GIFs, resize each page preserving animation
      pipeline = pipeline.resize(width, height, {
        fit: 'inside',
        withoutEnlargement: false,
      });
      const resized = await pipeline.gif().toBuffer();
      return { buffer: resized, contentType: 'image/gif' };
    } else {
      pipeline = pipeline.resize(width, height, {
        fit: 'inside',
        withoutEnlargement: false,
      });
      const resized = await pipeline.webp({ quality: 85 }).toBuffer();
      return { buffer: resized, contentType: 'image/webp' };
    }
  } catch (err) {
    console.error('[ImageService] sharp resize error:', err.message);
    // Return original if resize fails
    return { buffer: result.buffer, contentType: result.contentType };
  }
}

/**
 * Build a cache key for avatar images based on URL + dimensions + variant.
 */
function avatarCacheKey(url, width, height, variant) {
  const urlHash = Buffer.from(url).toString('base64url').slice(0, 40);
  return `av_${variant}_${width}x${height}_${urlHash}`;
}

// ---------------------------------------------------------------------------
// GetImage7.php handler (animated GIF support)
// ---------------------------------------------------------------------------

/**
 * Replacement for https://i0.xat.com/web_gear/chat/GetImage7.php
 *
 * Query params (matching real xat behaviour):
 *   U   - source image URL
 *   W   - target width  (default 80)
 *   H   - target height (default 80)
 *   s   - flag: static mode (no animation)
 *   g   - flag: GIF passthrough
 *   we  - flag: webp output
 *
 * The client constructs URLs like:
 *   GetImage7.php?W=80&H=80&U=<url>&g          (animated GIF)
 *   GetImage7.php?s&W=80&H=80&U=<url>&we       (static webp)
 */
async function handleGetImage7(req, res) {
  const sourceUrl = req.query.U || req.query.u;
  if (!sourceUrl) {
    return res.status(400).send('Missing U parameter');
  }

  const width  = parseInt(req.query.W || req.query.w || '80', 10);
  const height = parseInt(req.query.H || req.query.h || '80', 10);
  const isGif  = 'g' in req.query || (sourceUrl.toLowerCase().endsWith('.gif'));
  const isStatic = 's' in req.query;

  const cacheKey = avatarCacheKey(sourceUrl, width, height, isGif && !isStatic ? 'gif' : 'webp');
  const cached = findInCache(AVATARS_CACHE_DIR, cacheKey);
  if (cached) {
    res.set('Content-Type', cached.contentType);
    res.set('Cache-Control', 'public, max-age=3600');
    res.set('Access-Control-Allow-Origin', '*');
    return res.sendFile(cached.filePath);
  }

  const result = await fetchAndResize(sourceUrl, width, height, isGif && !isStatic);
  if (!result) {
    return res.status(404).send('');
  }

  writeToCache(AVATARS_CACHE_DIR, cacheKey, result.buffer, result.contentType);
  res.set('Content-Type', result.contentType);
  res.set('Cache-Control', 'public, max-age=3600');
  res.set('Access-Control-Allow-Origin', '*');
  return res.send(result.buffer);
}

// ---------------------------------------------------------------------------
// GetImage9.php handler (static/direct format)
// ---------------------------------------------------------------------------

/**
 * Replacement for https://i0.xat.com/web_gear/chat/GetImage9.php
 *
 * Query params:
 *   U   - source image URL
 *   W   - target width  (default 80)
 *   H   - target height (default 80)
 *   s   - flag present in most calls
 *
 * GetImage9 is used for direct/useDirectLink avatar mode and non-GIF images.
 * Output is always static (no animation).
 */
async function handleGetImage9(req, res) {
  const sourceUrl = req.query.U || req.query.u;
  if (!sourceUrl) {
    return res.status(400).send('Missing U parameter');
  }

  const width  = parseInt(req.query.W || req.query.w || '80', 10);
  const height = parseInt(req.query.H || req.query.h || '80', 10);

  const cacheKey = avatarCacheKey(sourceUrl, width, height, 'static');
  const cached = findInCache(AVATARS_CACHE_DIR, cacheKey);
  if (cached) {
    res.set('Content-Type', cached.contentType);
    res.set('Cache-Control', 'public, max-age=3600');
    res.set('Access-Control-Allow-Origin', '*');
    return res.sendFile(cached.filePath);
  }

  const result = await fetchAndResize(sourceUrl, width, height, false);
  if (!result) {
    return res.status(404).send('');
  }

  writeToCache(AVATARS_CACHE_DIR, cacheKey, result.buffer, result.contentType);
  res.set('Content-Type', result.contentType);
  res.set('Cache-Control', 'public, max-age=3600');
  res.set('Access-Control-Allow-Origin', '*');
  return res.send(result.buffer);
}

// ---------------------------------------------------------------------------
// avatareffects.php handler
// ---------------------------------------------------------------------------

/**
 * Returns the list of available avatar effects.
 *
 * The real xat API returns a JSON array of effect descriptors.  We return a
 * small set of well-known effects so the client effect picker is populated.
 * Extend this list as more effects are supported.
 */
function handleAvatarEffects(req, res) {
  const effects = [
    { id: 1,  name: 'none',      title: 'None',         preview: '' },
    { id: 2,  name: 'blur',      title: 'Blur',         preview: '' },
    { id: 3,  name: 'grayscale', title: 'Grayscale',    preview: '' },
    { id: 4,  name: 'sepia',     title: 'Sepia',        preview: '' },
    { id: 5,  name: 'invert',    title: 'Invert',       preview: '' },
    { id: 6,  name: 'hue',       title: 'Hue Rotate',   preview: '' },
    { id: 7,  name: 'saturate',  title: 'Saturate',     preview: '' },
    { id: 8,  name: 'contrast',  title: 'Contrast',     preview: '' },
    { id: 9,  name: 'glow',      title: 'Glow',         preview: '' },
    { id: 10, name: 'shadow',    title: 'Shadow',       preview: '' },
    { id: 11, name: 'rainbow',   title: 'Rainbow',      preview: '' },
    { id: 12, name: 'sparkle',   title: 'Sparkle',      preview: '' },
  ];
  res.set('Cache-Control', 'public, max-age=3600');
  res.json(effects);
}

// ---------------------------------------------------------------------------
// Module export: register all routes on an Express app
// ---------------------------------------------------------------------------

/**
 * Register image service routes on the given Express app instance.
 *
 * Call this BEFORE the catch-all static/proxy middleware in server.js so that
 * image-service routes take priority over the generic fallback handlers.
 *
 * @param {import('express').Application} app
 */
function register(app) {
  // Smiley proxy: animated (a_) and static (S_) formats
  // Pattern: /a_(code)_size or /S_(code)_size
  app.get(/^\/[aS]_\([^)]*\)_\d+$/, handleSmileyProxy);

  // GetImage7: avatar image fetching with GIF support
  app.get('/web_gear/chat/GetImage7.php', handleGetImage7);

  // GetImage9: avatar image fetching, static mode
  app.get('/web_gear/chat/GetImage9.php', handleGetImage9);

  // avatareffects: return available avatar effects list
  app.get('/web_gear/chat/avatareffects.php', handleAvatarEffects);

  console.log('[ImageService] Routes registered: smiley proxy, GetImage7, GetImage9, avatareffects');
}

module.exports = {
  register,
  // Also export individual handlers for testing or direct use
  handleSmileyProxy,
  handleGetImage7,
  handleGetImage9,
  handleAvatarEffects,
  // Utility exports
  encodeGetStrip,
  sanitizeCacheKey,
  SMILIES_CACHE_DIR,
  AVATARS_CACHE_DIR,
};
