const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const http = require('http');
const crypto = require('crypto');
const { WebSocketServer } = require('ws');
const webpush = require('web-push');
const multer = require('multer');

const app = express();
const port = 6969;

// ===== DATABASE SETUP =====
const dbPath = path.resolve(__dirname, '..', 'data', 'xat.db');
console.log('Database:', dbPath);

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    rank INTEGER DEFAULT 0,
    xats INTEGER DEFAULT 1000,
    days INTEGER DEFAULT 30,
    avatar TEXT DEFAULT '',
    homepage TEXT DEFAULT '',
    created_at INTEGER DEFAULT (strftime('%s','now'))
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s','now')),
    expires_at INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS bans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    room_id TEXT NOT NULL,
    banned_by INTEGER,
    reason TEXT DEFAULT '',
    expires_at INTEGER,
    created_at INTEGER DEFAULT (strftime('%s','now'))
  );

  CREATE TABLE IF NOT EXISTS groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    title TEXT,
    owner_id INTEGER
  );

  CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    subject TEXT NOT NULL DEFAULT '',
    message TEXT NOT NULL DEFAULT '',
    group_id TEXT NOT NULL DEFAULT '',
    created_at INTEGER DEFAULT (strftime('%s','now'))
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    username TEXT NOT NULL,
    text TEXT NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s','now'))
  );

  CREATE TABLE IF NOT EXISTS gags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    room_id TEXT NOT NULL,
    gagged_by INTEGER,
    expires_at INTEGER,
    created_at INTEGER DEFAULT (strftime('%s','now'))
  );

  CREATE TABLE IF NOT EXISTS ignores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    ignored_id INTEGER NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s','now')),
    UNIQUE(user_id, ignored_id)
  );

  CREATE TABLE IF NOT EXISTS friends (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    friend_id INTEGER NOT NULL,
    status TEXT DEFAULT 'accepted',
    created_at INTEGER DEFAULT (strftime('%s','now')),
    UNIQUE(user_id, friend_id)
  );

  CREATE TABLE IF NOT EXISTS powers (
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    section TEXT DEFAULT 'group',
    cost_xats INTEGER DEFAULT 0,
    cost_days INTEGER DEFAULT 0,
    is_epic INTEGER DEFAULT 0,
    is_allpower INTEGER DEFAULT 0,
    topsh INTEGER DEFAULT 0,
    description TEXT DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS user_powers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    power_id INTEGER NOT NULL,
    count INTEGER DEFAULT 1,
    equipped INTEGER DEFAULT 0,
    created_at INTEGER DEFAULT (strftime('%s','now')),
    UNIQUE(user_id, power_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (power_id) REFERENCES powers(id)
  );

  CREATE TABLE IF NOT EXISTS trades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    initiator_id INTEGER NOT NULL,
    target_id INTEGER NOT NULL,
    room_id TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    initiator_offer TEXT DEFAULT '{}',
    target_offer TEXT DEFAULT '{}',
    created_at INTEGER DEFAULT (strftime('%s','now')),
    updated_at INTEGER DEFAULT (strftime('%s','now'))
  );

  CREATE TABLE IF NOT EXISTS relationships (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    partner_id INTEGER NOT NULL,
    type TEXT NOT NULL DEFAULT 'friend',
    ring TEXT DEFAULT '',
    created_at INTEGER DEFAULT (strftime('%s','now')),
    UNIQUE(user_id, partner_id)
  );

  CREATE TABLE IF NOT EXISTS gifts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipient_id INTEGER NOT NULL,
    sender_id INTEGER NOT NULL,
    sender_name TEXT DEFAULT '',
    gift_type TEXT NOT NULL DEFAULT 'rose',
    message TEXT DEFAULT '',
    front_text TEXT DEFAULT '',
    flags INTEGER DEFAULT 2,
    created_at INTEGER DEFAULT (strftime('%s','now'))
  );

  CREATE TABLE IF NOT EXISTS guestbook (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_id INTEGER NOT NULL,
    author_id INTEGER NOT NULL,
    author_name TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s','now'))
  );

  CREATE TABLE IF NOT EXISTS room_settings (
    room_id TEXT PRIMARY KEY,
    owner_id INTEGER,
    background TEXT DEFAULT '',
    tab_info TEXT DEFAULT '',
    iframe_url TEXT DEFAULT '',
    hush_until INTEGER DEFAULT 0,
    hush_by INTEGER DEFAULT 0,
    gcontrol TEXT DEFAULT '{}',
    pool_config TEXT DEFAULT '{}',
    created_at INTEGER DEFAULT (strftime('%s','now'))
  );

  CREATE TABLE IF NOT EXISTS k1_tokens (
    token TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s','now')),
    expires_at INTEGER NOT NULL
  );
`);

// Seed user ID autoincrement to start at 1500000000 (matching real xat ID range)
// Only if no users exist yet — otherwise existing IDs are fine
const userCount0 = db.prepare('SELECT COUNT(*) as c FROM users').get().c;
if (userCount0 === 0) {
  try {
    db.exec("INSERT INTO users (id, username, password_hash) VALUES (1500000000, '__seed__', '__seed__')");
    db.exec("DELETE FROM users WHERE username = '__seed__'");
  } catch(e) {}
}

// Migrate: add columns if missing (for existing DBs)
try { db.exec('ALTER TABLE users ADD COLUMN rank INTEGER DEFAULT 0'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN avatar TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN homepage TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN created_at INTEGER DEFAULT 0'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN status TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN pawn TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN cyclepawn TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN d0 TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN married_to INTEGER DEFAULT 0'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN bff_with INTEGER DEFAULT 0'); } catch(e) {}
try { db.exec('ALTER TABLE groups ADD COLUMN background TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE groups ADD COLUMN gcontrol TEXT DEFAULT "{}"'); } catch(e) {}
try { db.exec('ALTER TABLE groups ADD COLUMN tabs TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE groups ADD COLUMN type INTEGER DEFAULT 256'); } catch(e) {}
try { db.exec('ALTER TABLE room_settings ADD COLUMN cs TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE room_settings ADD COLUMN gb TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE friends ADD COLUMN status TEXT DEFAULT "accepted"'); } catch(e) {}
try { db.prepare('ALTER TABLE friends ADD COLUMN category TEXT DEFAULT \'\'').run(); } catch(e) {}

// Protocol-critical user fields (from reference xat-server + Flash AS3 source)
try { db.exec('ALTER TABLE users ADD COLUMN nickname TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN email TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN k TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN k2 TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN k3 TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN d2 INTEGER DEFAULT 0'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN d3 INTEGER DEFAULT 0'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN dO TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN dt INTEGER DEFAULT 0'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN bride TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN coins INTEGER DEFAULT 0'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN enabled TEXT DEFAULT "enabled"'); } catch(e) {}

// Visual customization columns
try { db.exec('ALTER TABLE users ADD COLUMN namecolor TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN nameglow TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN namegrad TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN namefont TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN pcback TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN statusfx TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN hat TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN badge TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN iconcolor TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN pawnHue TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN avatarSettings TEXT DEFAULT ""'); } catch(e) {}

// Powers table: subid is critical for pow2 bitmask calculation (pv[section] += subid)
try { db.exec('ALTER TABLE powers ADD COLUMN subid INTEGER DEFAULT 0'); } catch(e) {}

// Messages table: pool support + offline display fields
try { db.exec('ALTER TABLE messages ADD COLUMN pool INTEGER DEFAULT 0'); } catch(e) {}
try { db.exec('ALTER TABLE messages ADD COLUMN registered TEXT DEFAULT "unregistered"'); } catch(e) {}
try { db.exec('ALTER TABLE messages ADD COLUMN avatar TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE messages ADD COLUMN msg_id TEXT DEFAULT ""'); } catch(e) {}

// Room settings: add new columns for real xat format
try { db.exec('ALTER TABLE room_settings ADD COLUMN announcement TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE room_settings ADD COLUMN bot_id TEXT DEFAULT "0"'); } catch(e) {}
try { db.exec('ALTER TABLE room_settings ADD COLUMN color1 TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE room_settings ADD COLUMN color2 TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE room_settings ADD COLUMN nav_style TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE room_settings ADD COLUMN font_name TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE room_settings ADD COLUMN scroll_type TEXT DEFAULT "None"'); } catch(e) {}
try { db.exec('ALTER TABLE room_settings ADD COLUMN features INTEGER DEFAULT 0'); } catch(e) {}
try { db.exec('ALTER TABLE room_settings ADD COLUMN revision INTEGER DEFAULT 0'); } catch(e) {}
try { db.exec('ALTER TABLE room_settings ADD COLUMN banned_smilies TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE room_settings ADD COLUMN kickback TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE room_settings ADD COLUMN room_mode TEXT DEFAULT "Chat"'); } catch(e) {}
try { db.exec('ALTER TABLE room_settings ADD COLUMN idle_title TEXT DEFAULT "Idle"'); } catch(e) {}
try { db.exec('ALTER TABLE room_settings ADD COLUMN min_rank TEXT DEFAULT "5"'); } catch(e) {}
try { db.exec('ALTER TABLE room_settings ADD COLUMN slow_mode INTEGER DEFAULT 0'); } catch(e) {}

// New feature columns
try { db.prepare('ALTER TABLE messages ADD COLUMN edited INTEGER DEFAULT 0').run(); } catch(e) {}
try { db.prepare('ALTER TABLE users ADD COLUMN macros TEXT DEFAULT \'{}\'').run(); } catch(e) {}
try { db.prepare('ALTER TABLE users ADD COLUMN power_masks TEXT DEFAULT \'[]\'').run(); } catch(e) {}
try { db.prepare('ALTER TABLE group_members ADD COLUMN rank_expires INTEGER DEFAULT 0').run(); } catch(e) {}
try { db.prepare('ALTER TABLE users ADD COLUMN status TEXT DEFAULT \'\'').run(); } catch(e) {}
try { db.prepare('ALTER TABLE users ADD COLUMN homepage TEXT DEFAULT \'\'').run(); } catch(e) {}
try { db.prepare('ALTER TABLE users ADD COLUMN married_to INTEGER DEFAULT 0').run(); } catch(e) {}
try { db.prepare('ALTER TABLE users ADD COLUMN bff_with INTEGER DEFAULT 0').run(); } catch(e) {}
try { db.prepare('ALTER TABLE users ADD COLUMN pstyle TEXT DEFAULT \'\'').run(); } catch(e) {}
try { db.prepare('ALTER TABLE groups ADD COLUMN group_powers TEXT DEFAULT \'0|0|0|0|0|0|0|0|0|0|0\'').run(); } catch(e) {}
try { db.prepare('ALTER TABLE users ADD COLUMN powers_disabled TEXT DEFAULT \'[]\'').run(); } catch(e) {}
try { db.prepare('ALTER TABLE users ADD COLUMN is_bot INTEGER DEFAULT 0').run(); } catch(e) {}
try { db.prepare('ALTER TABLE groups ADD COLUMN description TEXT DEFAULT \'\'').run(); } catch(e) {}
try { db.prepare('ALTER TABLE groups ADD COLUMN scroller TEXT DEFAULT \'\'').run(); } catch(e) {}
try { db.prepare('ALTER TABLE room_settings ADD COLUMN radio_url TEXT DEFAULT \'\'').run(); } catch(e) {}
try { db.prepare('ALTER TABLE users ADD COLUMN verified INTEGER DEFAULT 0').run(); } catch(e) {}

// Game sessions table
try { db.exec(`CREATE TABLE IF NOT EXISTS game_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  room_id TEXT NOT NULL,
  game_type TEXT NOT NULL,
  host_id INTEGER NOT NULL,
  players TEXT DEFAULT '[]',
  state TEXT DEFAULT '{}',
  status TEXT DEFAULT 'waiting',
  created_at INTEGER DEFAULT (strftime('%s','now'))
)`); } catch(e) {}

// Polls / voting tables
try { db.exec(`CREATE TABLE IF NOT EXISTS polls (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  room_id TEXT NOT NULL,
  question TEXT NOT NULL,
  options TEXT NOT NULL,
  created_by INTEGER,
  created_at INTEGER DEFAULT (strftime('%s','now')),
  expires_at INTEGER DEFAULT 0
)`); } catch(e) {}

try { db.exec(`CREATE TABLE IF NOT EXISTS poll_votes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  poll_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  option_index INTEGER NOT NULL,
  UNIQUE(poll_id, user_id)
)`); } catch(e) {}

try { db.exec(`CREATE TABLE IF NOT EXISTS auctions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  power_id INTEGER NOT NULL,
  seller_id INTEGER NOT NULL,
  starting_price INTEGER NOT NULL DEFAULT 100,
  current_bid INTEGER DEFAULT 0,
  bidder_id INTEGER DEFAULT 0,
  created_at INTEGER DEFAULT (strftime('%s','now')),
  expires_at INTEGER NOT NULL,
  status TEXT DEFAULT 'active'
)`); } catch(e) {}

// Reactions table
db.exec(`
  CREATE TABLE IF NOT EXISTS reactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reaction_id TEXT,
    msg_id TEXT,
    room_id INTEGER,
    user_id INTEGER,
    username TEXT,
    reaction TEXT,
    created_at INTEGER
  );
`);

// Web Push: VAPID keys + push subscriptions table
try { db.exec(`CREATE TABLE IF NOT EXISTS config (key TEXT PRIMARY KEY, value TEXT)`); } catch(e) {}
try { db.exec(`CREATE TABLE IF NOT EXISTS push_subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  subscription TEXT NOT NULL,
  created_at INTEGER DEFAULT (strftime('%s','now')),
  UNIQUE(user_id, subscription)
)`); } catch(e) {}

try { db.exec(`CREATE TABLE IF NOT EXISTS tr_trades (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sender_id INTEGER NOT NULL,
  receiver_id INTEGER NOT NULL,
  offer_xats INTEGER DEFAULT 0,
  offer_days INTEGER DEFAULT 0,
  offer_powers TEXT DEFAULT '[]',
  request_xats INTEGER DEFAULT 0,
  request_days INTEGER DEFAULT 0,
  request_powers TEXT DEFAULT '[]',
  status TEXT DEFAULT 'pending',
  created_at INTEGER DEFAULT (strftime('%s','now'))
)`); } catch(e) {}

let vapidKeys;
try {
  const vapidRow = db.prepare("SELECT value FROM config WHERE key = 'vapid_keys'").get();
  if (vapidRow) {
    vapidKeys = JSON.parse(vapidRow.value);
  }
} catch(e) {}
if (!vapidKeys) {
  vapidKeys = webpush.generateVAPIDKeys();
  try {
    db.prepare("INSERT OR REPLACE INTO config (key, value) VALUES ('vapid_keys', ?)").run(JSON.stringify(vapidKeys));
  } catch(e) {}
}
webpush.setVapidDetails('mailto:admin@ixat.local', vapidKeys.publicKey, vapidKeys.privateKey);

// Room settings: full chat room configuration from reference server
try { db.exec('ALTER TABLE room_settings ADD COLUMN name TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE room_settings ADD COLUMN language TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE room_settings ADD COLUMN description TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE room_settings ADD COLUMN scroll_msg TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE room_settings ADD COLUMN radio TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE room_settings ADD COLUMN password TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE room_settings ADD COLUMN button TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE room_settings ADD COLUMN attached TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE room_settings ADD COLUMN inner_color TEXT DEFAULT ""'); } catch(e) {}
try { db.exec('ALTER TABLE room_settings ADD COLUMN topic TEXT DEFAULT ""'); } catch(e) {}

// Gags table: add type (dunce/mute/gag) and pool columns
try { db.exec('ALTER TABLE gags ADD COLUMN type TEXT DEFAULT "gag"'); } catch(e) {}
try { db.exec('ALTER TABLE gags ADD COLUMN pool INTEGER DEFAULT 0'); } catch(e) {}

// User flags table: persistent per-room flags (badge, redcard, yellowcard, naughty, ranklock)
db.exec(`
  CREATE TABLE IF NOT EXISTS user_flags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    room_id TEXT NOT NULL,
    flag_type TEXT NOT NULL,
    flag_value TEXT DEFAULT '',
    set_by INTEGER,
    expires_at INTEGER,
    created_at INTEGER DEFAULT (strftime('%s','now')),
    UNIQUE(user_id, room_id, flag_type)
  );

  CREATE TABLE IF NOT EXISTS group_members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    group_id TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    rank INTEGER NOT NULL DEFAULT 0,
    assigned_by INTEGER,
    assigned_at INTEGER DEFAULT (strftime('%s','now')),
    rank_expires INTEGER DEFAULT 0,
    UNIQUE(group_id, user_id)
  );
`);

// Clean expired sessions on startup
db.prepare('DELETE FROM sessions WHERE expires_at < ?').run(Math.floor(Date.now() / 1000));

// Seed powers table from complete pow2-derived power definitions (705 powers)
// Generated from pow2_real.json + Flash xconst.as pss string
const POWER_DEFS_JSON = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'powers_complete.json'), 'utf8'));
// Assign tiered pricing based on power ID (mirrors real xat where newer powers cost more)
function powerCost(p) {
  if (p.is_allpower) return [0, 0]; // allpowers: free (bundled)
  if (p.id < 50) return [200, 1];
  if (p.id < 100) return [250, 2];
  if (p.id < 200) return [300, 3];
  if (p.id < 350) return [350, 5];
  if (p.id < 500) return [500, 5];
  return [1000, 10]; // newer/rarer powers
}
const POWER_DEFS = POWER_DEFS_JSON.map(p => { const [xats, days] = powerCost(p); return [p.id, p.name, p.section, xats, days, p.is_epic, p.is_allpower, 0, p.subid]; });
// Legacy reference (keeping for search):
// Seed powers (upsert to fix old wrong IDs and add subid)
{
  db.pragma('foreign_keys = OFF');
  const upsertPower = db.prepare('INSERT OR REPLACE INTO powers (id, name, section, cost_xats, cost_days, is_epic, is_allpower, topsh, subid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
  const seedPowers = db.transaction(() => {
    for (const p of POWER_DEFS) {
      upsertPower.run(...p);
    }
  });
  seedPowers();
  db.pragma('foreign_keys = ON');
  console.log(`Powers seeded: ${POWER_DEFS.length}`);
}

// Restrict CORS to same origin. Set ALLOWED_ORIGIN env var to permit a specific
// external frontend (e.g. https://yourchat.example.com). Wildcard is intentionally avoided.
const corsOrigin = process.env.ALLOWED_ORIGIN || false;
app.use(cors({
  origin: corsOrigin,
  credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// ===== MULTER FILE UPLOAD CONFIG =====
const uploadStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    const type = req.params.type || 'avatars';
    const dir = path.join(__dirname, '..', 'public', 'uploads', type);
    cb(null, dir);
  },
  filename: function(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase() || '.png';
    const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    if (!allowed.includes(ext)) return cb(new Error('Invalid file type'));
    cb(null, Date.now() + '-' + Math.random().toString(36).substr(2, 8) + ext);
  }
});
const upload = multer({
  storage: uploadStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: function(req, file, cb) {
    if (!file.mimetype.startsWith('image/')) return cb(new Error('Only images allowed'));
    cb(null, true);
  }
});

// ===== IMAGE SERVICE (smiley proxy, avatar GetImage, avatareffects) =====
// Registered early so it takes priority over later catch-all routes.
const imageService = require('./image-service');
imageService.register(app);

// ===== PASSWORD HASHING (using crypto.scrypt - no native deps) =====
function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex');
    crypto.scrypt(password, salt, 64, (err, derived) => {
      if (err) reject(err);
      resolve(salt + ':' + derived.toString('hex'));
    });
  });
}

function verifyPassword(password, hash) {
  // Reject non-scrypt hashes (guest:no-password, bot:..., __seed__) immediately
  if (!hash || hash.startsWith('guest:') || hash.startsWith('bot:') || hash === '__seed__') {
    return Promise.resolve(false);
  }
  return new Promise((resolve, reject) => {
    const colonIdx = hash.indexOf(':');
    if (colonIdx === -1) return resolve(false);
    const salt = hash.slice(0, colonIdx);
    const key = hash.slice(colonIdx + 1);
    // Validate key is valid hex before attempting Buffer conversion
    if (!/^[0-9a-f]+$/i.test(key) || key.length !== 128) return resolve(false);
    crypto.scrypt(password, salt, 64, (err, derived) => {
      if (err) return reject(err);
      try {
        resolve(crypto.timingSafeEqual(Buffer.from(key, 'hex'), derived));
      } catch(e) {
        resolve(false);
      }
    });
  });
}

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// ===== XAT PROTOCOL CONSTANTS =====
const RANK = {
  GUEST:       0,
  MEMBER:      2,
  MOD:         4,
  OWNER:       16,
  MAIN_OWNER:  32,
  BANNED:      64,
  DUNCED:      0x100,
  GAGGED:      0x200,
  NAUGHTY:     0x400,
  YELLOWCARD:  0x800,
  REDCARD:     0x1000,
};

const RANK_NAMES = {
  [RANK.GUEST]: 'Guest',
  [RANK.MEMBER]: 'Member',
  [RANK.MOD]: 'Moderator',
  [RANK.OWNER]: 'Owner',
  [RANK.MAIN_OWNER]: 'Main Owner',
};

// Get a user's rank in a specific room (per-room rank system)
// Falls back to global rank from users table if no per-room rank is set
function getUserRoomRank(userId, roomId) {
  const member = db.prepare('SELECT rank, rank_expires FROM group_members WHERE group_id = ? AND user_id = ?').get(roomId, userId);
  if (member) {
    // Check if temp rank has expired
    if (member.rank_expires && member.rank_expires > 0 && member.rank_expires < Math.floor(Date.now() / 1000)) {
      // Expired — revert to guest
      db.prepare('UPDATE group_members SET rank = ?, rank_expires = 0 WHERE group_id = ? AND user_id = ?').run(RANK.GUEST, roomId, userId);
      return RANK.GUEST;
    }
    return member.rank;
  }
  // Fall back to global rank
  const user = db.prepare('SELECT rank FROM users WHERE id = ?').get(userId);
  return user ? user.rank : RANK.GUEST;
}

// Set a user's rank in a specific room
function setUserRoomRank(userId, roomId, rank, assignedBy) {
  db.prepare(`INSERT INTO group_members (group_id, user_id, rank, assigned_by)
    VALUES (?, ?, ?, ?) ON CONFLICT(group_id, user_id)
    DO UPDATE SET rank = ?, assigned_by = ?, assigned_at = strftime('%s','now')`)
    .run(roomId, userId, rank, assignedBy, rank, assignedBy);
}

// GControl defaults (from ixat config.py)
const GCONTROL_DEFAULTS = {
  mg: 7,    // makeGuest minRank (mod)
  mb: 8,    // makeMember minRank (mod)
  mm: 11,   // makeMod minRank (owner)
  kk: 7,    // kick minRank (mod)
  bn: 7,    // ban minRank (mod)
  ubn: 7,   // unban minRank (mod)
  mbt: 6,   // maxBanTime hours (mod)
  obt: 0,   // maxBanTime hours (owner, 0=unlimited)
  ss: 10,   // setScroller minRank (owner)
  dnc: 14,  // canBeDunced maxRank (main owner)
  bdg: 10,  // badge minRank (owner)
  ns: 7,    // naughtyStep minRank (mod)
  yl: 7,    // yellowCard minRank (mod)
  rc: 7,    // redCard minRank (mod)
  rf: 6,    // redCard banMultiplier
  ka: 10,   // kickAll minRank (owner)
  rl: 11,   // rankLock minRank (owner)
  sme: 7,   // silentMember minRank (mod)
  bst: 0,   // boost
  p: 10,    // protect minRank (owner)
  pd: 1,    // protectDefault type
  pt: 1,    // protectTime hours
  j: 2,     // jinx minRank
  js: 0,    // jinxSameRank
  mmt: 1,   // maxMuteTime hours
  cm: 11,   // canMute minRank (owner)
};

// GControl rank number to RANK constant mapping
function gcontrolToRank(gcVal) {
  if (gcVal <= 2) return RANK.GUEST;
  if (gcVal <= 5) return RANK.MEMBER;
  if (gcVal <= 8) return RANK.MOD;
  if (gcVal <= 11) return RANK.OWNER;
  return RANK.MAIN_OWNER;
}

// Simple in-memory rate limiter
const rateLimits = new Map();
function rateLimit(key, maxRequests, windowMs) {
  const now = Date.now();
  if (!rateLimits.has(key)) {
    rateLimits.set(key, []);
  }
  const timestamps = rateLimits.get(key).filter(t => t > now - windowMs);
  if (timestamps.length >= maxRequests) {
    return false; // rate limited
  }
  timestamps.push(now);
  rateLimits.set(key, timestamps);
  return true; // allowed
}
// Clean up old entries every 60 seconds
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamps] of rateLimits) {
    const filtered = timestamps.filter(t => t > now - 60000);
    if (filtered.length === 0) rateLimits.delete(key);
    else rateLimits.set(key, filtered);
  }
}, 60000);

const captchaSessions = new Map();
// Clean expired captchas
setInterval(() => {
  const now = Date.now();
  for (const [id, session] of captchaSessions) {
    if (session.expires < now) captchaSessions.delete(id);
  }
}, 60000);

// Get effective gcontrol for a room
function getRoomGcontrol(roomId) {
  const settings = db.prepare('SELECT gcontrol FROM room_settings WHERE room_id = ?').get(roomId);
  if (!settings || !settings.gcontrol) return { ...GCONTROL_DEFAULTS };
  try {
    return { ...GCONTROL_DEFAULTS, ...JSON.parse(settings.gcontrol) };
  } catch(e) {
    return { ...GCONTROL_DEFAULTS };
  }
}

// Check if user meets gcontrol rank requirement
function meetsGcontrol(userData, gcKey, roomId) {
  const gc = getRoomGcontrol(roomId);
  const requiredRank = gcontrolToRank(gc[gcKey] || GCONTROL_DEFAULTS[gcKey]);
  return userData.rank >= requiredRank;
}

const SESSION_DURATION = 7 * 24 * 60 * 60; // 7 days

// ===== AUTH HELPER =====
// Returns the authenticated user from a Bearer token, or null if not authenticated.
function getAuthUser(req) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return null;
  const session = db.prepare('SELECT * FROM sessions WHERE token = ? AND expires_at > ?')
    .get(token, Math.floor(Date.now() / 1000));
  if (!session) return null;
  return db.prepare('SELECT id, username, rank, xats, days FROM users WHERE id = ?').get(session.user_id) || null;
}

// ===== AUTH ENDPOINTS =====

// Register
app.post('/auth/register', async (req, res) => {
  try {
    const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
    if (!rateLimit('register:' + clientIp, 3, 300000)) {
      return res.status(429).json({ error: 'Too many registration attempts. Try again later.' });
    }
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }
    if (username.length < 2 || username.length > 20) {
      return res.status(400).json({ error: 'Username must be 2-20 characters' });
    }
    if (password.length < 4) {
      return res.status(400).json({ error: 'Password must be at least 4 characters' });
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return res.status(400).json({ error: 'Username: letters, numbers, underscores only' });
    }

    const existing = db.prepare('SELECT id FROM users WHERE username = ? COLLATE NOCASE').get(username);
    if (existing) {
      return res.status(409).json({ error: 'Username already taken' });
    }

    const hash = await hashPassword(password);

    // First registered (non-guest) user = Owner, everyone else = Guest
    const regCount = db.prepare("SELECT COUNT(*) as c FROM users WHERE password_hash != 'guest:no-password'").get().c;
    const rank = regCount === 0 ? RANK.OWNER : RANK.GUEST;

    const info = db.prepare('INSERT INTO users (username, password_hash, rank, xats, days) VALUES (?, ?, ?, 1000, 30)').run(username, hash, rank);
    const userId = info.lastInsertRowid;

    // Create session
    const token = generateToken();
    const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION;
    db.prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)').run(token, userId, expiresAt);

    const user = db.prepare('SELECT id, username, rank, xats, days FROM users WHERE id = ?').get(userId);

    console.log(`[Auth] Registered: ${username} (ID: ${userId}, rank: ${RANK_NAMES[rank] || rank})`);
    res.json({ token, user });
  } catch (err) {
    console.error('[Auth] Register error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
app.post('/auth/login', async (req, res) => {
  try {
    const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
    if (!rateLimit('login:' + clientIp, 5, 60000)) {
      return res.status(429).json({ error: 'Too many login attempts. Try again in a minute.' });
    }
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const user = db.prepare('SELECT * FROM users WHERE username = ? COLLATE NOCASE').get(username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Create session
    const token = generateToken();
    const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION;
    db.prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)').run(token, user.id, expiresAt);

    console.log(`[Auth] Login: ${user.username} (ID: ${user.id})`);
    res.json({
      token,
      user: { id: user.id, username: user.username, rank: user.rank, xats: user.xats, days: user.days }
    });
  } catch (err) {
    console.error('[Auth] Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Reset password — private server implementation
// Generates a one-time reset token valid for 15 minutes. The user gets the token
// from the admin panel or server logs, then uses it to set a new password.
app.post('/auth/reset-password', (req, res) => {
  const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
  if (!rateLimit('reset:' + clientIp, 3, 300000)) {
    return res.status(429).json({ error: 'Too many reset attempts. Try again later.' });
  }
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: 'Username required' });
  }
  const user = db.prepare('SELECT id, username FROM users WHERE username = ? COLLATE NOCASE').get(username);
  if (!user) {
    // Don't reveal whether user exists
    return res.json({ message: 'If the account exists, a reset token has been generated. Ask the server admin for it.' });
  }
  const resetToken = crypto.randomBytes(32).toString('hex');
  const expiresAt = Math.floor(Date.now() / 1000) + 900; // 15 minutes
  db.exec(`CREATE TABLE IF NOT EXISTS password_resets (
    token TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    expires_at INTEGER NOT NULL,
    used INTEGER DEFAULT 0
  )`);
  // Clear any existing reset tokens for this user
  db.prepare('DELETE FROM password_resets WHERE user_id = ?').run(user.id);
  db.prepare('INSERT INTO password_resets (token, user_id, expires_at) VALUES (?, ?, ?)').run(resetToken, user.id, expiresAt);
  // NOTE: Token is intentionally NOT logged. Retrieve it via the admin DB or a secure admin endpoint.
  console.log(`[Auth] Password reset token generated for ${user.username} (expires in 15 min) — retrieve from DB: SELECT token FROM password_resets WHERE user_id = ${user.id};`);
  res.json({ message: 'If the account exists, a reset token has been generated. Ask the server admin for it.' });
});

// Complete password reset with token
app.post('/auth/reset-password/confirm', async (req, res) => {
  const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
  if (!rateLimit('reset-confirm:' + clientIp, 5, 300000)) {
    return res.status(429).json({ error: 'Too many attempts. Try again later.' });
  }
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token and new password required' });
  }
  if (newPassword.length < 4) {
    return res.status(400).json({ error: 'Password must be at least 4 characters' });
  }
  const reset = db.prepare('SELECT * FROM password_resets WHERE token = ? AND used = 0 AND expires_at > ?')
    .get(token, Math.floor(Date.now() / 1000));
  if (!reset) {
    return res.status(400).json({ error: 'Invalid or expired reset token' });
  }
  const hash = await hashPassword(newPassword);
  db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(hash, reset.user_id);
  db.prepare('UPDATE password_resets SET used = 1 WHERE token = ?').run(token);
  // Invalidate all existing sessions for this user
  db.prepare('DELETE FROM sessions WHERE user_id = ?').run(reset.user_id);
  res.json({ message: 'Password has been reset. You can now log in with your new password.' });
});

// Get current user
app.get('/auth/me', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token' });

  const session = db.prepare('SELECT * FROM sessions WHERE token = ? AND expires_at > ?').get(token, Math.floor(Date.now() / 1000));
  if (!session) return res.status(401).json({ error: 'Invalid or expired session' });

  const user = db.prepare('SELECT id, username, rank, xats, days, avatar, homepage, status, pawn, cyclepawn, namecolor, nameglow, namegrad, pcback, statusfx, hat, badge, iconcolor, pawnHue, married_to, bff_with FROM users WHERE id = ?').get(session.user_id);
  if (!user) return res.status(401).json({ error: 'User not found' });

  res.json({ user });
});

// Logout
app.post('/auth/logout', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token) {
    db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
  }
  res.json({ ok: true });
});

app.post('/auth/delete-account', async (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Not authenticated' });

  const { password } = req.body;
  if (!password) return res.status(400).json({ error: 'Password required to confirm deletion' });

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(authUser.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: 'Invalid password' });

  // Delete all user data
  db.prepare('DELETE FROM sessions WHERE user_id = ?').run(authUser.id);
  db.prepare('DELETE FROM friends WHERE user_id = ? OR friend_id = ?').run(authUser.id, authUser.id);
  db.prepare('DELETE FROM group_members WHERE user_id = ?').run(authUser.id);
  db.prepare('DELETE FROM ignores WHERE user_id = ? OR ignored_id = ?').run(authUser.id, authUser.id);
  db.prepare('DELETE FROM user_powers WHERE user_id = ?').run(authUser.id);
  // Don't delete messages - just anonymize
  db.prepare("UPDATE messages SET username = 'Deleted User', user_id = 0 WHERE user_id = ?").run(authUser.id);
  // Finally delete the user
  db.prepare('DELETE FROM users WHERE id = ?').run(authUser.id);

  console.log(`[Auth] Account deleted: ${user.username} (ID: ${authUser.id})`);
  res.json({ success: true, message: 'Account deleted' });
});

// Guest login (like real xat.com — no registration required)
app.post('/auth/guest', (req, res) => {
  try {
    const { nickname } = req.body;
    // Generate guest username: use provided nickname or generate random one
    const guestName = (nickname && nickname.trim().length >= 2)
      ? `${nickname.trim().slice(0, 15)}`
      : `Guest_${Math.floor(1000 + Math.random() * 9000)}`;

    // Check if name collides with registered user
    const existing = db.prepare('SELECT id FROM users WHERE username = ? COLLATE NOCASE').get(guestName);
    const finalName = existing ? `${guestName}_${Math.floor(100 + Math.random() * 900)}` : guestName;

    // Create a temporary guest user (no password)
    const guestHash = 'guest:no-password';
    const info = db.prepare('INSERT INTO users (username, password_hash, rank, xats, days) VALUES (?, ?, ?, 0, 0)')
      .run(finalName, guestHash, RANK.GUEST);
    const userId = info.lastInsertRowid;

    // Create short session (24h for guests)
    const token = generateToken();
    const expiresAt = Math.floor(Date.now() / 1000) + (24 * 60 * 60);
    db.prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)').run(token, userId, expiresAt);

    console.log(`[Auth] Guest joined: ${finalName} (ID: ${userId})`);
    res.json({
      token,
      user: { id: userId, username: finalName, rank: RANK.GUEST, xats: 0, days: 0 },
      isGuest: true,
    });
  } catch (err) {
    console.error('[Auth] Guest error:', err);
    res.status(500).json({ error: 'Guest login failed' });
  }
});

// ===== AUTH MIDDLEWARE =====
function requireAuth(req, res, next) {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  const session = db.prepare('SELECT * FROM sessions WHERE token = ? AND expires_at > ?')
    .get(token, Math.floor(Date.now() / 1000));
  if (!session) return res.status(401).json({ error: 'Invalid or expired session' });
  req.user = db.prepare('SELECT * FROM users WHERE id = ?').get(session.user_id);
  if (!req.user) return res.status(401).json({ error: 'User not found' });
  next();
}

// ===== POWERS API =====
app.get('/api/powers', (req, res) => {
  const powers = db.prepare('SELECT * FROM powers ORDER BY id').all();
  res.json({ powers });
});

app.get('/api/powers/:id', (req, res) => {
  const power = db.prepare('SELECT * FROM powers WHERE id = ?').get(parseInt(req.params.id));
  if (!power) return res.status(404).json({ error: 'Power not found' });
  res.json(power);
});

app.get('/api/user/powers', requireAuth, (req, res) => {
  const powers = db.prepare(`
    SELECT up.*, p.name, p.section, p.cost_xats, p.cost_days, p.is_epic
    FROM user_powers up JOIN powers p ON up.power_id = p.id
    WHERE up.user_id = ?
  `).all(req.user.id);
  res.json({ powers });
});

app.post('/api/powers/buy', requireAuth, (req, res) => {
  const { powerId } = req.body;
  const power = db.prepare('SELECT * FROM powers WHERE id = ?').get(parseInt(powerId));
  if (!power) return res.status(404).json({ error: 'Power not found' });

  if (req.user.xats < power.cost_xats) {
    return res.status(400).json({ error: 'Not enough xats. Need ' + power.cost_xats });
  }
  if (req.user.days < power.cost_days) {
    return res.status(400).json({ error: 'Not enough days. Need ' + power.cost_days });
  }

  db.prepare('UPDATE users SET xats = xats - ?, days = days - ? WHERE id = ?')
    .run(power.cost_xats, power.cost_days, req.user.id);

  const existing = db.prepare('SELECT * FROM user_powers WHERE user_id = ? AND power_id = ?')
    .get(req.user.id, power.id);
  if (existing) {
    db.prepare('UPDATE user_powers SET count = count + 1 WHERE user_id = ? AND power_id = ?')
      .run(req.user.id, power.id);
  } else {
    db.prepare('INSERT INTO user_powers (user_id, power_id) VALUES (?, ?)')
      .run(req.user.id, power.id);
  }
  res.json({ ok: true, message: `Purchased ${power.name}!` });
});

app.post('/api/powers/equip', requireAuth, (req, res) => {
  const { powerId, equipped } = req.body;
  const owned = db.prepare('SELECT * FROM user_powers WHERE user_id = ? AND power_id = ?')
    .get(req.user.id, parseInt(powerId));
  if (!owned) return res.status(400).json({ error: 'You do not own this power' });

  db.prepare('UPDATE user_powers SET equipped = ? WHERE user_id = ? AND power_id = ?')
    .run(equipped ? 1 : 0, req.user.id, parseInt(powerId));
  res.json({ ok: true });
});

// Compute power bitmask fields for user packet (p0-p15)
function getUserPowerBitmasks(userId) {
  // Real xat protocol: each power has a section (p0, p1, ...) and subid
  // The bitmask for each section is the SUM of subid values for powers in that section
  // Reference: xat-server/src/workers/user.coffee lines 151-170
  const userPowers = db.prepare(
    `SELECT up.power_id, p.section, p.subid FROM user_powers up
     JOIN powers p ON p.id = up.power_id
     WHERE up.user_id = ? AND up.count > 0`
  ).all(userId);
  const masks = new Array(24).fill(0);
  for (const p of userPowers) {
    // section is stored as "p0", "p1", etc. — extract the number
    const sectionStr = p.section || 'p0';
    const sectionNum = parseInt(sectionStr.replace('p', '')) || 0;
    if (sectionNum < 24 && p.subid) {
      masks[sectionNum] = (masks[sectionNum] + p.subid) >>> 0; // unsigned add
    }
  }
  return masks;
}

function hasPower(userId, powerId) {
  const p = db.prepare('SELECT count FROM user_powers WHERE user_id = ? AND power_id = ? AND count > 0')
    .get(userId, powerId);
  return !!p;
}

function groupHasPower(roomId, powerId) {
  // Check if the group owner has the power (group powers come from owner)
  const settings = db.prepare('SELECT owner_id FROM room_settings WHERE room_id = ?').get(roomId);
  if (!settings || !settings.owner_id) return false;
  return hasPower(settings.owner_id, powerId);
}

// Check whether a group (room) has a specific power enabled.
// Currently all powers are enabled in all rooms; extend for per-room power settings.
function isGroupPowerEnabled(roomId, powerId) {
  return true;
}

// Find the WebSocket connection for an online user by their DB id.
// Returns the WebSocket if the user is currently connected, otherwise null.
function findOnlineUserWsByDbId(dbId) {
  for (const [, room] of rooms) {
    for (const [, u] of room.users) {
      if (u.dbId === dbId && u.ws && u.ws.readyState === 1) return u.ws;
    }
  }
  return null;
}

// ===== TRADE API =====
app.post('/api/trades/initiate', requireAuth, (req, res) => {
  const { targetId, roomId, offer } = req.body;
  if (!targetId) return res.status(400).json({ error: 'Target user required' });
  const target = db.prepare('SELECT id, username FROM users WHERE id = ?').get(parseInt(targetId));
  if (!target) return res.status(404).json({ error: 'Target user not found' });

  // Cancel any existing pending trades between these users
  db.prepare("UPDATE trades SET status = 'cancelled' WHERE initiator_id = ? AND target_id = ? AND status = 'pending'")
    .run(req.user.id, target.id);

  const info = db.prepare('INSERT INTO trades (initiator_id, target_id, room_id, initiator_offer) VALUES (?, ?, ?, ?)')
    .run(req.user.id, target.id, roomId || '1', JSON.stringify(offer || {}));
  res.json({ ok: true, tradeId: info.lastInsertRowid });
});

app.post('/api/trades/:id/offer', requireAuth, (req, res) => {
  const trade = db.prepare('SELECT * FROM trades WHERE id = ?').get(parseInt(req.params.id));
  if (!trade) return res.status(404).json({ error: 'Trade not found' });
  if (trade.status !== 'pending') return res.status(400).json({ error: 'Trade is not pending' });

  const { offer } = req.body;
  if (req.user.id === trade.initiator_id) {
    db.prepare('UPDATE trades SET initiator_offer = ?, updated_at = ? WHERE id = ?')
      .run(JSON.stringify(offer || {}), Math.floor(Date.now() / 1000), trade.id);
  } else if (req.user.id === trade.target_id) {
    db.prepare('UPDATE trades SET target_offer = ?, updated_at = ? WHERE id = ?')
      .run(JSON.stringify(offer || {}), Math.floor(Date.now() / 1000), trade.id);
  } else {
    return res.status(403).json({ error: 'Not part of this trade' });
  }
  res.json({ ok: true });
});

app.post('/api/trades/:id/accept', requireAuth, (req, res) => {
  const trade = db.prepare('SELECT * FROM trades WHERE id = ?').get(parseInt(req.params.id));
  if (!trade) return res.status(404).json({ error: 'Trade not found' });
  if (trade.status !== 'pending') return res.status(400).json({ error: 'Trade is not pending' });
  if (req.user.id !== trade.target_id && req.user.id !== trade.initiator_id) {
    return res.status(403).json({ error: 'Not part of this trade' });
  }

  // Execute trade: swap xats/days
  const initOffer = JSON.parse(trade.initiator_offer || '{}');
  const targetOffer = JSON.parse(trade.target_offer || '{}');
  const initXats = parseInt(initOffer.xats) || 0;
  const initDays = parseInt(initOffer.days) || 0;
  const targetXats = parseInt(targetOffer.xats) || 0;
  const targetDays = parseInt(targetOffer.days) || 0;

  const initiator = db.prepare('SELECT xats, days FROM users WHERE id = ?').get(trade.initiator_id);
  const target = db.prepare('SELECT xats, days FROM users WHERE id = ?').get(trade.target_id);

  if (initiator.xats < initXats || initiator.days < initDays) {
    return res.status(400).json({ error: 'Initiator cannot afford this trade' });
  }
  if (target.xats < targetXats || target.days < targetDays) {
    return res.status(400).json({ error: 'Target cannot afford this trade' });
  }

  db.prepare('UPDATE users SET xats = xats - ? + ?, days = days - ? + ? WHERE id = ?')
    .run(initXats, targetXats, initDays, targetDays, trade.initiator_id);
  db.prepare('UPDATE users SET xats = xats - ? + ?, days = days - ? + ? WHERE id = ?')
    .run(targetXats, initXats, targetDays, initDays, trade.target_id);

  db.prepare("UPDATE trades SET status = 'completed', updated_at = ? WHERE id = ?")
    .run(Math.floor(Date.now() / 1000), trade.id);
  res.json({ ok: true, message: 'Trade completed!' });
});

app.post('/api/trades/:id/reject', requireAuth, (req, res) => {
  const trade = db.prepare('SELECT * FROM trades WHERE id = ?').get(parseInt(req.params.id));
  if (!trade) return res.status(404).json({ error: 'Trade not found' });
  if (req.user.id !== trade.target_id && req.user.id !== trade.initiator_id) {
    return res.status(403).json({ error: 'Not part of this trade' });
  }
  db.prepare("UPDATE trades SET status = 'rejected', updated_at = ? WHERE id = ?")
    .run(Math.floor(Date.now() / 1000), trade.id);
  res.json({ ok: true });
});

app.get('/api/trades', requireAuth, (req, res) => {
  const userId = req.user.id;
  const status = req.query.status; // optional filter: 'pending', 'completed', 'rejected', 'cancelled'
  let query = `
    SELECT t.*,
      u1.username AS initiator_username, u1.avatar AS initiator_avatar,
      u2.username AS target_username, u2.avatar AS target_avatar
    FROM trades t
    LEFT JOIN users u1 ON u1.id = t.initiator_id
    LEFT JOIN users u2 ON u2.id = t.target_id
    WHERE (t.initiator_id = ? OR t.target_id = ?)
  `;
  const params = [userId, userId];
  if (status) { query += ' AND t.status = ?'; params.push(status); }
  query += ' ORDER BY t.updated_at DESC LIMIT 50';
  const trades = db.prepare(query).all(...params);
  res.json({ trades });
});

// ===== GUESTBOOK API =====
app.get('/api/guestbook/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const page = parseInt(req.query.page) || 0;
  const limit = Math.min(parseInt(req.query.limit) || 20, 50);
  const entries = db.prepare('SELECT g.*, u.avatar as author_avatar FROM guestbook g LEFT JOIN users u ON g.author_id = u.id WHERE g.owner_id = ? ORDER BY g.created_at DESC LIMIT ? OFFSET ?')
    .all(userId, limit, page * limit);
  const total = db.prepare('SELECT COUNT(*) as c FROM guestbook WHERE owner_id = ?').get(userId);
  res.json({ entries, total: total.c });
});

app.post('/api/guestbook/:userId', requireAuth, (req, res) => {
  const { message } = req.body;
  if (!message || !message.trim()) return res.status(400).json({ error: 'Message required' });
  if (message.length > 500) return res.status(400).json({ error: 'Message too long (max 500 chars)' });
  const ownerId = parseInt(req.params.userId);
  const owner = db.prepare('SELECT id FROM users WHERE id = ?').get(ownerId);
  if (!owner) return res.status(404).json({ error: 'User not found' });

  // Rate limit: 5 entries per hour per author
  if (!rateLimit('guestbook:' + req.user.id, 5, 3600000)) {
    return res.status(429).json({ error: 'Too many guestbook entries. Try again later.' });
  }

  db.prepare('INSERT INTO guestbook (owner_id, author_id, author_name, message) VALUES (?, ?, ?, ?)')
    .run(ownerId, req.user.id, req.user.username, message.trim().slice(0, 500));

  if (typeof sendPushNotification === 'function') {
    sendPushNotification(ownerId, req.user.username + ' wrote in your guestbook', message.substring(0, 80), { type: 'guestbook' });
  }

  res.json({ ok: true });
});

// Delete by entryId only (legacy)
app.delete('/api/guestbook/:entryId', requireAuth, (req, res) => {
  const entry = db.prepare('SELECT * FROM guestbook WHERE id = ?').get(parseInt(req.params.entryId));
  if (!entry) return res.status(404).json({ error: 'Entry not found' });
  if (entry.owner_id !== req.user.id && entry.author_id !== req.user.id && req.user.rank < RANK.MOD) {
    return res.status(403).json({ error: 'Not authorized' });
  }
  db.prepare('DELETE FROM guestbook WHERE id = ?').run(entry.id);
  res.json({ ok: true });
});

// Delete by userId + entryId (profile owner or author)
app.delete('/api/guestbook/:userId/:entryId', requireAuth, (req, res) => {
  const userId = parseInt(req.params.userId);
  const entryId = parseInt(req.params.entryId);
  if (req.user.id !== userId) {
    const entry = db.prepare('SELECT author_id FROM guestbook WHERE id = ?').get(entryId);
    if (!entry || entry.author_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this entry' });
    }
  }
  db.prepare('DELETE FROM guestbook WHERE id = ? AND owner_id = ?').run(entryId, userId);
  res.json({ success: true });
});

// ===== RELATIONSHIPS API =====
app.post('/api/relationships/marry', requireAuth, (req, res) => {
  const { partnerId, ring } = req.body;
  if (!partnerId) return res.status(400).json({ error: 'Partner required' });
  if (req.user.xats < 200) return res.status(400).json({ error: 'Marriage costs 200 xats' });

  const partner = db.prepare('SELECT id, username, married_to FROM users WHERE id = ?').get(parseInt(partnerId));
  if (!partner) return res.status(404).json({ error: 'Partner not found' });
  if (partner.married_to && partner.married_to !== 0) {
    return res.status(400).json({ error: 'Partner is already married' });
  }
  if (req.user.married_to && req.user.married_to !== 0) {
    return res.status(400).json({ error: 'You are already married' });
  }

  db.prepare('UPDATE users SET xats = xats - 200, married_to = ? WHERE id = ?').run(partner.id, req.user.id);
  db.prepare('UPDATE users SET married_to = ? WHERE id = ?').run(req.user.id, partner.id);
  db.prepare('INSERT OR REPLACE INTO relationships (user_id, partner_id, type, ring) VALUES (?, ?, ?, ?)')
    .run(req.user.id, partner.id, 'married', ring || 'ring1');
  db.prepare('INSERT OR REPLACE INTO relationships (user_id, partner_id, type, ring) VALUES (?, ?, ?, ?)')
    .run(partner.id, req.user.id, 'married', ring || 'ring1');

  res.json({ ok: true, message: `Married to ${partner.username}!` });
});

app.post('/api/relationships/divorce', requireAuth, (req, res) => {
  if (!req.user.married_to || req.user.married_to === 0) {
    return res.status(400).json({ error: 'You are not married' });
  }
  const partnerId = req.user.married_to;
  db.prepare('UPDATE users SET married_to = 0 WHERE id = ?').run(req.user.id);
  db.prepare('UPDATE users SET married_to = 0 WHERE id = ?').run(partnerId);
  db.prepare("DELETE FROM relationships WHERE (user_id = ? OR partner_id = ?) AND type = 'married'")
    .run(req.user.id, req.user.id);
  res.json({ ok: true, message: 'Divorced.' });
});

app.post('/api/relationships/bff', requireAuth, (req, res) => {
  const { partnerId } = req.body;
  if (!partnerId) return res.status(400).json({ error: 'Partner required' });
  if (req.user.xats < 200) return res.status(400).json({ error: 'BFF costs 200 xats' });

  const partner = db.prepare('SELECT id, username FROM users WHERE id = ?').get(parseInt(partnerId));
  if (!partner) return res.status(404).json({ error: 'Partner not found' });

  db.prepare('UPDATE users SET xats = xats - 200, bff_with = ? WHERE id = ?').run(partner.id, req.user.id);
  db.prepare('UPDATE users SET bff_with = ? WHERE id = ?').run(req.user.id, partner.id);
  db.prepare('INSERT OR REPLACE INTO relationships (user_id, partner_id, type) VALUES (?, ?, ?)')
    .run(req.user.id, partner.id, 'bff');
  db.prepare('INSERT OR REPLACE INTO relationships (user_id, partner_id, type) VALUES (?, ?, ?)')
    .run(partner.id, req.user.id, 'bff');

  res.json({ ok: true, message: `BFF with ${partner.username}!` });
});

// ===== USER SEARCH API =====
app.get('/api/users/search', (req, res) => {
  const q = (req.query.q || '').replace(/[%_]/g, '');
  if (q.length < 2) return res.json({ users: [] });
  const users = db.prepare("SELECT id, username, rank, avatar FROM users WHERE username LIKE ? AND password_hash != 'guest:no-password' LIMIT 20")
    .all('%' + q + '%');
  res.json({ users });
});

// ===== ROOM SETTINGS API =====
app.get('/api/room/:roomId/settings', (req, res) => {
  const settings = db.prepare('SELECT * FROM room_settings WHERE room_id = ?').get(req.params.roomId);
  res.json(settings || { room_id: req.params.roomId, gcontrol: '{}', background: '', hush_until: 0 });
});

app.post('/api/room/:roomId/settings', requireAuth, (req, res) => {
  if (req.user.rank < RANK.OWNER) return res.status(403).json({ error: 'Owner rank required' });
  const roomId = req.params.roomId;
  const { background, gcontrol, tab_info, iframe_url } = req.body;

  const existing = db.prepare('SELECT room_id FROM room_settings WHERE room_id = ?').get(roomId);
  if (existing) {
    if (background !== undefined) db.prepare('UPDATE room_settings SET background = ? WHERE room_id = ?').run(background, roomId);
    if (gcontrol !== undefined) db.prepare('UPDATE room_settings SET gcontrol = ? WHERE room_id = ?').run(JSON.stringify(gcontrol), roomId);
    if (tab_info !== undefined) db.prepare('UPDATE room_settings SET tab_info = ? WHERE room_id = ?').run(tab_info, roomId);
    if (iframe_url !== undefined) db.prepare('UPDATE room_settings SET iframe_url = ? WHERE room_id = ?').run(iframe_url, roomId);
  } else {
    db.prepare('INSERT INTO room_settings (room_id, owner_id, background, gcontrol, tab_info, iframe_url) VALUES (?, ?, ?, ?, ?, ?)')
      .run(roomId, req.user.id, background || '', JSON.stringify(gcontrol || {}), tab_info || '', iframe_url || '');
  }
  res.json({ ok: true });
});

// ===== WEB PUSH NOTIFICATION ENDPOINTS =====

// Get VAPID public key
app.get('/api/push/vapid-key', (req, res) => {
  res.json({ publicKey: vapidKeys.publicKey });
});

// Subscribe to push notifications
app.post('/api/push/subscribe', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Not authenticated' });
  const { subscription } = req.body;
  if (!subscription) return res.status(400).json({ error: 'Subscription required' });
  try {
    db.prepare('INSERT OR REPLACE INTO push_subscriptions (user_id, subscription) VALUES (?, ?)')
      .run(authUser.id, JSON.stringify(subscription));
  } catch(e) {}
  res.json({ success: true });
});

// Unsubscribe from push notifications
app.post('/api/push/unsubscribe', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Not authenticated' });
  db.prepare('DELETE FROM push_subscriptions WHERE user_id = ?').run(authUser.id);
  res.json({ success: true });
});

// ===== CHAT ROOM STATE =====
const rooms = new Map();
const userIdToRoom = new Map(); // Fast lookup: userId -> {roomId, socketId}
let globalSocketId = 1;

function getOrCreateRoom(roomId) {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, {
      id: roomId,
      users: new Map(),
      background: '',
      scroller: 'Welcome to your xat Private Server!',
      language: 'en',
    });
  }
  return rooms.get(roomId);
}

function xmlTag(tag, attrs = {}) {
  const attrStr = Object.entries(attrs)
    .filter(([_, v]) => v !== undefined && v !== null)
    .map(([k, v]) => `${k}="${String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}"`)
    .join(' ');
  return `<${tag}${attrStr ? ' ' + attrStr : ''} />`;
}

function parseXatPacket(raw) {
  const trimmed = raw.trim().replace(/\0/g, '');
  if (!trimmed.startsWith('<')) return null;
  const tagMatch = trimmed.match(/^<(\w+)\s*/);
  if (!tagMatch) return null;
  const tag = tagMatch[1];
  const attrs = {};
  const attrRegex = /(\w+)="([^"]*)"/g;
  let m;
  while ((m = attrRegex.exec(trimmed)) !== null) {
    attrs[m[1]] = m[2].replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
  }
  return { tag, attrs };
}

function broadcastToRoom(roomId, xmlStr, exceptSocketId = null) {
  const room = rooms.get(roomId);
  if (!room) return;
  for (const [sid, user] of room.users) {
    if (sid !== exceptSocketId && user.ws && user.ws.readyState === 1) {
      user.ws.send(xmlStr + '\0');
    }
  }
}

// Convert internal rank to xat protocol `q` attribute value
// Real xat uses `q` for rank, NOT f&7. Confirmed from live capture:
//   q=2 = moderator (Stifler), q=3 = owner (FEXBot)
//   Members and guests have NO q attribute
function rankToQ(internalRank) {
  switch (internalRank) {
    case RANK.MAIN_OWNER: return '1';
    case RANK.OWNER: return '3';
    case RANK.MOD: return '2';
    default: return null; // guests and members have no q attribute
  }
}

// Build the `f` flags bitmask for a user
// Real xat: bit 3 (8) = base flag for registered/ranked users
// f-flags bitmask — verified from real xat.com capture:
// Bit 3 (0x08) = registered user (ALL registered users)
// Bit 5 (0x20) = has group powers assigned (users with p0-p23 attrs)
// Bit 7 (0x80) = subscriber/has days (users with d0 attr)
// Bit 2 (0x04) = bot account
// Bit 13 (0x2000) = bot/system flag
// Unverified (no gagged/dunced users in capture): gag/dunce likely use higher bits
function buildFFlags(user) {
  let flags = 0;
  if (user.registered || user.rank !== RANK.GUEST) flags |= 0x08;  // bit 3 = registered
  if (user.days && user.days > 0) flags |= 0x80;  // bit 7 = subscriber
  // bit 5 = has powers (check if user has any power bitmasks set)
  if (user.powerMasks && user.powerMasks.some(m => m > 0)) flags |= 0x20;
  // Gag/dunce — use bits that don't conflict with verified bits
  if (user.gagged) flags |= 0x100;     // bit 8 = gagged (speculative, higher range)
  if (user.dunced) flags |= 0x200;     // bit 9 = dunced (speculative, higher range)
  if (user.naughtyStepped) flags |= 0x400;  // bit 10 = naughty step (speculative)
  return flags;
}

// Convert protocol q attribute back to internal rank
function protocolToRank(qValue) {
  switch (parseInt(qValue) || 0) {
    case 1: return RANK.MAIN_OWNER;
    case 2: return RANK.MOD;
    case 3: return RANK.OWNER;
    default: return RANK.GUEST;
  }
}

// Build the W attribute (base64-encoded JSON with WebExtensions data)
function buildWAttribute(user) {
  const wData = {
    LiveAcceptCalls: '',
    LiveAppConsent: '',
    Pcplus: user.pcplus || '',
    StatusFx: user.statusFx || '',
    Stealth: 'disable',
    Verified: user.verified ? 'enable' : 'disable',
    avatarSettings: user.avatarSettings || '',
    iconcolor: user.iconcolor || '',
    pawnHue: user.pawnHue || '',
    pstyle: user.pstyle || '',
  };
  return Buffer.from(JSON.stringify(wData)).toString('base64');
}

// Build user packet attributes for <u> XML tags
// Build the 'n' (name) attribute with embedded visual effects
// Real xat format: "Username(glow#COLOR#grad#C1#C2#C3)(hat#NAME) ##status#statusglow#statuscolor"
function buildNameAttribute(user) {
  let name = user.username || '';
  if (user.registered) {
    // Embed namecolor/nameglow/namegrad as (glow#...) tag in the name
    if (user.nameglow || user.namecolor || user.namegrad) {
      let glowParts = ['glow'];
      // Glow color (outer glow)
      glowParts.push(user.nameglow || 'FF0000');
      if (user.namegrad) {
        // Gradient: (glow#GLOW#grad#COLOR1#COLOR2#...)
        glowParts.push('grad');
        const gradColors = user.namegrad.split(',').map(c => c.trim().replace('#', ''));
        glowParts.push(...gradColors);
      } else if (user.namecolor) {
        // Simple color: (glow#GLOW#COLOR)
        glowParts.push(user.namecolor.replace('#', ''));
      }
      name += '(' + glowParts.join('#') + ')';
    }
    // Hat effect
    if (user.hat) {
      name += '(hat#' + user.hat + ')';
    }
    // Status with statusfx
    let statusStr = user.status || ' ';
    name = `${name} ##${statusStr}`;
  }
  return name;
}

function buildUserPacket(user, extraAttrs) {
  const flags = buildFFlags(user);
  const pkt = {
    cb: String(user.cb || 0),
    s: '1',
    f: flags,
    u: user.userId,
    n: buildNameAttribute(user),
    a: user.avatar || '',
    h: user.homepage || '',
    v: String(user.v || 0),
    W: buildWAttribute(user),
    ...extraAttrs,
  };
  // q attribute = rank (only present for ranked users)
  const q = rankToQ(user.rank);
  if (q) pkt.q = q;
  // d0 = subscriber feature bitmask (from real xat capture analysis)
  // Bit 5 (0x20) = basic subscriber, Bit 12 (0x1000) = subscriber tier 1
  // Bit 24 (0x1000000) = premium, Bit 19 (0x80000) = extended features
  // Gangster18 (basic): bits 5,12 = 4128
  // szivkiralyno (subscriber): bits 5,12,19,24 = 17305632
  // Stif (mod+powers): bits 3,5,11,12,24,27 = 151001128
  if (user.days) {
    let d0 = 0x20 | 0x1000; // bits 5+12 = basic subscriber (4128)
    if (user.days >= 30) d0 |= 0x80000;    // bit 19 = extended
    if (user.days >= 30) d0 |= 0x1000000;  // bit 24 = premium tier
    pkt.d0 = String(d0);
  }
  // N = registered username (distinct from n = display name)
  if (user.registered) pkt.N = user.registered;
  if (user.isBot) {
    pkt.pawn = pkt.pawn || '(bot)';
  }
  if (user.pawn) pkt.pawn = user.pawn;
  if (user.cyclepawn) pkt.cyclepawn = user.cyclepawn;
  // Status is embedded in n attribute after ## delimiter, not as separate attr
  if (user.badge) pkt.badge = user.badge;
  // Visual customization attributes
  if (user.namecolor) pkt.namecolor = user.namecolor;
  if (user.nameglow) pkt.nameglow = user.nameglow;
  if (user.namegrad) pkt.namegrad = user.namegrad;
  if (user.namefont) pkt.namefont = user.namefont;
  if (user.pcback) pkt.pcback = user.pcback;
  if (user.statusfx) pkt.statusfx = user.statusfx;
  if (user.iconcolor) pkt.iconcolor = user.iconcolor;
  if (user.pawnHue) pkt.pawnHue = user.pawnHue;
  if (user.hat) pkt.hat = user.hat;
  if (user.avatarSettings) pkt.avatarSettings = user.avatarSettings;
  if (user.d2) pkt.d2 = String(user.d2);
  if (user.d3 !== undefined) pkt.d3 = String(user.d3);
  if (user.dO) pkt.dO = user.dO;
  if (user.dt) pkt.dt = String(user.dt);
  if (user.marriedTo) {
    const spouse = db.prepare('SELECT username FROM users WHERE id = ?').get(user.marriedTo);
    if (spouse) pkt.sn = spouse.username;
  }
  if (user.bffWith) {
    const bff = db.prepare('SELECT username FROM users WHERE id = ?').get(user.bffWith);
    if (bff) pkt.bff = bff.username;
  }
  if (user.pstyle) pkt.pstyle = user.pstyle;
  if (user.k3) pkt.k3 = user.k3;
  // Disabled powers mask (pd attribute)
  if (user.powersDisabled) pkt.pd = user.powersDisabled;
  // Power bitmasks use p0-p23 (NOT d4-d27)
  if (user.powerMasks) {
    for (let i = 0; i < user.powerMasks.length; i++) {
      if (user.powerMasks[i]) pkt['p' + i] = String(user.powerMasks[i]);
    }
  }
  // Power overrides (po attribute)
  if (user.powerOverrides) pkt.po = user.powerOverrides;
  // Verified badge
  if (user.verified) pkt.verified = '1';
  return pkt;
}

// Pool-aware broadcast — only sends to users in the same pool
function broadcastToPool(roomId, pool, xmlStr, exceptSocketId = null) {
  const room = rooms.get(roomId);
  if (!room) return;
  for (const [sid, user] of room.users) {
    if (sid !== exceptSocketId && user.pool === pool && user.ws && user.ws.readyState === 1) {
      user.ws.send(xmlStr + '\0');
    }
  }
}

function sendTo(ws, xmlStr) {
  if (ws && ws.readyState === 1) {
    ws.send(xmlStr + '\0');
  }
}

// Format duration in seconds to human-readable string
function formatDuration(seconds) {
  if (seconds <= 0) return 'permanently';
  if (seconds < 3600) return Math.floor(seconds / 60) + 'm';
  if (seconds < 86400) return Math.floor(seconds / 3600) + 'h';
  return Math.floor(seconds / 86400) + 'd';
}

// Find a user in a room by username (case-insensitive)
function findUserInRoom(room, targetName) {
  for (const [sid, user] of room.users) {
    if (user.username.toLowerCase() === targetName.toLowerCase()) {
      return user;
    }
  }
  return null;
}

function findUserInRoomById(room, userId) {
  for (const [sid, user] of room.users) {
    if (user.userId === userId || String(user.userId) === String(userId)) {
      return user;
    }
  }
  return null;
}

// Find the WebSocket for an online user by their database ID
function findOnlineUserWs(dbId) {
  for (const [roomId, room] of rooms) {
    for (const [sid, user] of room.users) {
      if (user.dbId === dbId && user.ws && user.ws.readyState === 1) {
        return user.ws;
      }
    }
  }
  return null;
}

// Send a Web Push notification to a user (by their DB id)
function sendPushNotification(userId, title, body, data) {
  let subs;
  try {
    subs = db.prepare('SELECT subscription FROM push_subscriptions WHERE user_id = ?').all(userId);
  } catch(e) { return; }
  for (const sub of subs) {
    try {
      const subscription = JSON.parse(sub.subscription);
      webpush.sendNotification(subscription, JSON.stringify({ title, body, data }))
        .catch(err => {
          if (err.statusCode === 410 || err.statusCode === 404) {
            // Subscription expired — remove it
            try { db.prepare('DELETE FROM push_subscriptions WHERE user_id = ? AND subscription = ?').run(userId, sub.subscription); } catch(e2) {}
          }
        });
    } catch(e) {}
  }
}

// Check if user is ranklocked (prevents rank changes)
function isRanklocked(user) {
  return user && user.ranklocked;
}

// Check if user A is ignoring user B
function isIgnoring(userId, targetId) {
  const row = db.prepare('SELECT 1 FROM ignores WHERE user_id = ? AND ignored_id = ?').get(userId, targetId);
  return !!row;
}

// Get all user IDs that a user is ignoring
function getIgnoreList(userId) {
  return db.prepare('SELECT ignored_id FROM ignores WHERE user_id = ?').all(userId).map(r => r.ignored_id);
}

// Broadcast to pool but skip users who are ignoring the sender
function broadcastToPoolFiltered(roomId, pool, xmlStr, senderDbId, exceptSocketId) {
  const room = rooms.get(roomId);
  if (!room) return;
  for (const [sid, user] of room.users) {
    if (sid === exceptSocketId) continue;
    if (user.pool !== pool) continue;
    if (!user.ws || user.ws.readyState !== 1) continue;
    // Skip if this user is ignoring the sender
    if (senderDbId && user.dbId && isIgnoring(user.dbId, senderDbId)) continue;
    user.ws.send(xmlStr + '\0');
  }
}

// Check if a user is banned from a room
function isUserBanned(userId, roomId) {
  const now = Math.floor(Date.now() / 1000);
  const ban = db.prepare(
    'SELECT * FROM bans WHERE user_id = ? AND room_id = ? AND (expires_at IS NULL OR expires_at > ?)'
  ).get(userId, roomId, now);
  return !!ban;
}

// Send a system message to one user
// Real xat format: scroller-style message with d="0" (no user attribution)
function sendSystemMsg(ws, text) {
  sendTo(ws, xmlTag('m', { t: `/s ${text}`, d: '0' }));
}

// Send a system message to the whole room
function broadcastSystemMsg(roomId, text, exceptSocketId = null) {
  broadcastToRoom(roomId, xmlTag('m', { t: `/s ${text}`, d: '0' }), exceptSocketId);
}

// ===== COMMAND HANDLER =====
function handleCommand(userData, currentRoom, text) {
  const room = rooms.get(currentRoom);
  if (!room) return false;

  const parts = text.split(' ');
  const cmd = parts[0].toLowerCase();
  const targetName = parts[1];
  const reason = parts.slice(2).join(' ') || '';

  switch (cmd) {
    // === /kick <user> [reason] ===
    case '/kick': {
      if (!targetName) {
        sendSystemMsg(userData.ws, 'Usage: /kick <username> [reason]');
        return true;
      }
      if (userData.rank < RANK.MOD) {
        sendSystemMsg(userData.ws, 'You need Moderator rank or higher to kick.');
        return true;
      }
      const target = findUserInRoom(room, targetName);
      if (!target) {
        sendSystemMsg(userData.ws, `User "${targetName}" not found in this room.`);
        return true;
      }
      if (target.rank >= userData.rank) {
        sendSystemMsg(userData.ws, 'You cannot kick someone with equal or higher rank.');
        return true;
      }

      broadcastSystemMsg(currentRoom, `${target.username} was kicked by ${userData.username}${reason ? ': ' + reason : ''}`);
      sendTo(target.ws, xmlTag('c', { t: '/k', u: userData.userId, d: target.userId, r: reason }));
      target.ws.close();
      console.log(`[Mod] ${userData.username} kicked ${target.username} from ${currentRoom}`);
      return true;
    }

    // === /ban <user> [reason] ===
    case '/ban': {
      if (!targetName) {
        sendSystemMsg(userData.ws, 'Usage: /ban <username> [reason]');
        return true;
      }
      if (userData.rank < RANK.MOD) {
        sendSystemMsg(userData.ws, 'You need Moderator rank or higher to ban.');
        return true;
      }
      const target = findUserInRoom(room, targetName);
      if (!target) {
        sendSystemMsg(userData.ws, `User "${targetName}" not found in this room.`);
        return true;
      }
      if (target.rank >= userData.rank) {
        sendSystemMsg(userData.ws, 'You cannot ban someone with equal or higher rank.');
        return true;
      }

      // Persist ban (6 hours default)
      const expiresAt = Math.floor(Date.now() / 1000) + 6 * 3600;
      db.prepare('INSERT INTO bans (user_id, room_id, banned_by, reason, expires_at) VALUES (?, ?, ?, ?, ?)')
        .run(target.dbId, currentRoom, userData.dbId, reason, expiresAt);

      broadcastSystemMsg(currentRoom, `${target.username} was banned by ${userData.username}${reason ? ': ' + reason : ''} (6h)`);
      sendTo(target.ws, xmlTag('c', { t: '/b', u: userData.userId, d: target.userId, r: reason }));
      target.ws.close();
      console.log(`[Mod] ${userData.username} banned ${target.username} from ${currentRoom}`);
      return true;
    }

    // === /unban <username> ===
    case '/unban': {
      if (!targetName) {
        sendSystemMsg(userData.ws, 'Usage: /unban <username>');
        return true;
      }
      if (userData.rank < RANK.MOD) {
        sendSystemMsg(userData.ws, 'You need Moderator rank or higher to unban.');
        return true;
      }
      const targetUser = db.prepare('SELECT id FROM users WHERE username = ? COLLATE NOCASE').get(targetName);
      if (!targetUser) {
        sendSystemMsg(userData.ws, `User "${targetName}" not found.`);
        return true;
      }
      const deleted = db.prepare('DELETE FROM bans WHERE user_id = ? AND room_id = ?').run(targetUser.id, currentRoom);
      if (deleted.changes > 0) {
        sendSystemMsg(userData.ws, `${targetName} has been unbanned from this room.`);
      } else {
        sendSystemMsg(userData.ws, `${targetName} is not banned from this room.`);
      }
      return true;
    }

    // === /gag <user> ===
    case '/gag': {
      if (!targetName) {
        sendSystemMsg(userData.ws, 'Usage: /gag <username>');
        return true;
      }
      if (userData.rank < RANK.MOD) {
        sendSystemMsg(userData.ws, 'You need Moderator rank or higher to gag.');
        return true;
      }
      const target = findUserInRoom(room, targetName);
      if (!target) {
        sendSystemMsg(userData.ws, `User "${targetName}" not found in this room.`);
        return true;
      }
      if (target.rank >= userData.rank) {
        sendSystemMsg(userData.ws, 'You cannot gag someone with equal or higher rank.');
        return true;
      }

      target.gagged = true;
      // Persist gag (1 hour default)
      const gagExpires = Math.floor(Date.now() / 1000) + 3600;
      db.prepare('DELETE FROM gags WHERE user_id = ? AND room_id = ?').run(target.dbId, currentRoom);
      db.prepare('INSERT INTO gags (user_id, room_id, gagged_by, expires_at) VALUES (?, ?, ?, ?)')
        .run(target.dbId, currentRoom, userData.dbId, gagExpires);
      broadcastSystemMsg(currentRoom, `${target.username} was gagged by ${userData.username}`);
      // Send updated user packet with gag flag
      broadcastToRoom(currentRoom, xmlTag('u', buildUserPacket(target)));
      console.log(`[Mod] ${userData.username} gagged ${target.username}`);
      return true;
    }

    // === /ungag <user> ===
    case '/ungag': {
      if (!targetName) {
        sendSystemMsg(userData.ws, 'Usage: /ungag <username>');
        return true;
      }
      if (userData.rank < RANK.MOD) {
        sendSystemMsg(userData.ws, 'You need Moderator rank or higher to ungag.');
        return true;
      }
      const target = findUserInRoom(room, targetName);
      if (!target) {
        sendSystemMsg(userData.ws, `User "${targetName}" not found in this room.`);
        return true;
      }
      target.gagged = false;
      db.prepare('DELETE FROM gags WHERE user_id = ? AND room_id = ?').run(target.dbId, currentRoom);
      broadcastSystemMsg(currentRoom, `${target.username} was ungagged by ${userData.username}`);
      broadcastToRoom(currentRoom, xmlTag('u', buildUserPacket(target)));
      return true;
    }

    // === /mod <user> ===
    case '/mod': {
      if (!targetName) {
        sendSystemMsg(userData.ws, 'Usage: /mod <username>');
        return true;
      }
      if (userData.rank < RANK.OWNER) {
        sendSystemMsg(userData.ws, 'Only owners can promote to Moderator.');
        return true;
      }
      const target = findUserInRoom(room, targetName);
      if (!target) {
        sendSystemMsg(userData.ws, `User "${targetName}" not found in this room.`);
        return true;
      }
      if (isRanklocked(target)) { sendSystemMsg(userData.ws, `${target.username} is rank-locked.`); return true; }
      target.rank = RANK.MOD;
      setUserRoomRank(target.dbId, currentRoom, RANK.MOD, userData.dbId);
      broadcastSystemMsg(currentRoom, `${target.username} was promoted to Moderator by ${userData.username}`);
      broadcastToRoom(currentRoom, xmlTag('u', buildUserPacket(target)));
      console.log(`[Mod] ${userData.username} promoted ${target.username} to Mod`);
      return true;
    }

    // === /member <user> ===
    case '/member': {
      if (!targetName) {
        sendSystemMsg(userData.ws, 'Usage: /member <username>');
        return true;
      }
      if (userData.rank < RANK.OWNER) {
        sendSystemMsg(userData.ws, 'Only owners can set Member rank.');
        return true;
      }
      const target = findUserInRoom(room, targetName);
      if (!target) {
        sendSystemMsg(userData.ws, `User "${targetName}" not found in this room.`);
        return true;
      }
      if (isRanklocked(target)) { sendSystemMsg(userData.ws, `${target.username} is rank-locked.`); return true; }
      target.rank = RANK.MEMBER;
      setUserRoomRank(target.dbId, currentRoom, RANK.MEMBER, userData.dbId);
      broadcastSystemMsg(currentRoom, `${target.username} was set to Member by ${userData.username}`);
      broadcastToRoom(currentRoom, xmlTag('u', buildUserPacket(target)));
      return true;
    }

    // === /guest <user> ===
    case '/guest': {
      if (!targetName) {
        sendSystemMsg(userData.ws, 'Usage: /guest <username>');
        return true;
      }
      if (userData.rank < RANK.OWNER) {
        sendSystemMsg(userData.ws, 'Only owners can set Guest rank.');
        return true;
      }
      const target = findUserInRoom(room, targetName);
      if (!target) {
        sendSystemMsg(userData.ws, `User "${targetName}" not found in this room.`);
        return true;
      }
      if (target.rank >= userData.rank) {
        sendSystemMsg(userData.ws, 'You cannot demote someone with equal or higher rank.');
        return true;
      }
      if (isRanklocked(target)) { sendSystemMsg(userData.ws, `${target.username} is rank-locked.`); return true; }
      target.rank = RANK.GUEST;
      setUserRoomRank(target.dbId, currentRoom, RANK.GUEST, userData.dbId);
      broadcastSystemMsg(currentRoom, `${target.username} was demoted to Guest by ${userData.username}`);
      broadcastToRoom(currentRoom, xmlTag('u', buildUserPacket(target)));
      return true;
    }

    // === /owner <user> ===
    case '/owner': {
      if (!targetName) {
        sendSystemMsg(userData.ws, 'Usage: /owner <username>');
        return true;
      }
      if (userData.rank < RANK.OWNER) {
        sendSystemMsg(userData.ws, 'Only owners can promote to Owner.');
        return true;
      }
      const target = findUserInRoom(room, targetName);
      if (!target) {
        sendSystemMsg(userData.ws, `User "${targetName}" not found in this room.`);
        return true;
      }
      if (isRanklocked(target)) { sendSystemMsg(userData.ws, `${target.username} is rank-locked.`); return true; }
      target.rank = RANK.OWNER;
      setUserRoomRank(target.dbId, currentRoom, RANK.OWNER, userData.dbId);
      broadcastSystemMsg(currentRoom, `${target.username} was promoted to Owner by ${userData.username}`);
      broadcastToRoom(currentRoom, xmlTag('u', buildUserPacket(target)));
      console.log(`[Mod] ${userData.username} promoted ${target.username} to Owner`);
      return true;
    }

    // === /scroller <text> ===
    case '/scroller': {
      if (userData.rank < RANK.OWNER) {
        sendSystemMsg(userData.ws, 'Only owners can change the scroller.');
        return true;
      }
      const scrollerText = parts.slice(1).join(' ');
      if (!scrollerText) {
        sendSystemMsg(userData.ws, 'Usage: /scroller <text>');
        return true;
      }
      room.scroller = scrollerText;
      // Broadcast scroller as a message packet (real xat format)
      broadcastToRoom(currentRoom, xmlTag('m', { t: `/s ${scrollerText}`, d: userData.userId }));
      // Persist to DB
      try {
        db.prepare('UPDATE room_settings SET scroll_msg = ? WHERE room_id = ?').run(scrollerText, currentRoom);
      } catch(e) {}
      sendSystemMsg(userData.ws, 'Scroller updated.');
      return true;
    }

    // === /hush [seconds] [reason] ===
    case '/hush': {
      if (userData.rank < RANK.OWNER) {
        sendSystemMsg(userData.ws, 'Only owners can hush the chat.');
        return true;
      }
      const duration = parseInt(parts[1]) || 60;
      const hushReason = parts.slice(2).join(' ') || '';
      const hushUntil = Math.floor(Date.now() / 1000) + duration;

      // Store hush state in room settings
      const existingSettings = db.prepare('SELECT room_id FROM room_settings WHERE room_id = ?').get(currentRoom);
      if (existingSettings) {
        db.prepare('UPDATE room_settings SET hush_until = ?, hush_by = ? WHERE room_id = ?')
          .run(hushUntil, userData.dbId, currentRoom);
      } else {
        db.prepare('INSERT INTO room_settings (room_id, hush_until, hush_by) VALUES (?, ?, ?)')
          .run(currentRoom, hushUntil, userData.dbId);
      }

      room.hushUntil = hushUntil;
      room.hushBy = userData.dbId;
      broadcastSystemMsg(currentRoom, `Chat hushed by ${userData.username} for ${duration}s${hushReason ? ': ' + hushReason : ''}`);
      console.log(`[Mod] ${userData.username} hushed room ${currentRoom} for ${duration}s`);
      return true;
    }

    // === /unhush ===
    case '/unhush': {
      if (userData.rank < RANK.OWNER) {
        sendSystemMsg(userData.ws, 'Only owners can unhush the chat.');
        return true;
      }
      const existingSettings2 = db.prepare('SELECT room_id FROM room_settings WHERE room_id = ?').get(currentRoom);
      if (existingSettings2) {
        db.prepare('UPDATE room_settings SET hush_until = 0, hush_by = 0 WHERE room_id = ?').run(currentRoom);
      }
      room.hushUntil = 0;
      room.hushBy = 0;
      broadcastSystemMsg(currentRoom, `Chat unhushed by ${userData.username}`);
      return true;
    }

    // === /ka [flags] - Kick All ===
    case '/ka': {
      if (userData.rank < RANK.OWNER) {
        sendSystemMsg(userData.ws, 'Only owners can kick all.');
        return true;
      }
      const kaFlags = parts[1] || '';
      let kickCount = 0;
      const toKick = [];

      for (const [sid, user] of room.users) {
        if (sid === userData.socketId) continue; // Don't kick yourself
        if (user.rank >= userData.rank) continue; // Don't kick equal/higher rank

        if (kaFlags.includes('r') && user.username.startsWith('Guest_')) continue; // Only registered
        if (kaFlags.includes('g') && !user.username.startsWith('Guest_')) continue; // Only guests

        toKick.push(user);
      }

      for (const user of toKick) {
        sendTo(user.ws, xmlTag('c', { t: '/k', u: userData.userId, d: user.userId, r: 'Kick all' }));
        user.ws.close();
        kickCount++;
      }

      sendSystemMsg(userData.ws, `Kicked ${kickCount} users.`);
      console.log(`[Mod] ${userData.username} kicked all (${kickCount} users, flags: ${kaFlags})`);
      return true;
    }

    // === /dunce <user> ===
    case '/dunce': {
      if (userData.rank < RANK.OWNER) {
        sendSystemMsg(userData.ws, 'Only owners can dunce users.');
        return true;
      }
      if (!targetName) { sendSystemMsg(userData.ws, 'Usage: /dunce <username>'); return true; }
      const dTarget = findUserInRoom(room, targetName);
      if (!dTarget) { sendSystemMsg(userData.ws, `User "${targetName}" not found.`); return true; }
      if (dTarget.rank >= userData.rank) { sendSystemMsg(userData.ws, 'Cannot dunce equal/higher rank.'); return true; }

      dTarget.gagged = true;
      dTarget.dunced = true;
      const dunceExpires = Math.floor(Date.now() / 1000) + 315569520;
      db.prepare('DELETE FROM gags WHERE user_id = ? AND room_id = ?').run(dTarget.dbId, currentRoom);
      db.prepare('INSERT INTO gags (user_id, room_id, gagged_by, expires_at, type) VALUES (?, ?, ?, ?, ?)')
        .run(dTarget.dbId, currentRoom, userData.dbId, dunceExpires, 'dunce');
      broadcastSystemMsg(currentRoom, `${dTarget.username} was dunced by ${userData.username}`);
      broadcastToRoom(currentRoom, xmlTag('u', buildUserPacket(dTarget)));
      return true;
    }

    // === /mute <user> ===
    case '/mute': {
      if (userData.rank < RANK.OWNER) {
        sendSystemMsg(userData.ws, 'Only owners can mute users.');
        return true;
      }
      if (!targetName) { sendSystemMsg(userData.ws, 'Usage: /mute <username>'); return true; }
      const mTarget = findUserInRoom(room, targetName);
      if (!mTarget) { sendSystemMsg(userData.ws, `User "${targetName}" not found.`); return true; }
      if (mTarget.rank >= userData.rank) { sendSystemMsg(userData.ws, 'Cannot mute equal/higher rank.'); return true; }

      mTarget.gagged = true;
      mTarget.muted = true;
      const muteExpires = Math.floor(Date.now() / 1000) + 3600;
      db.prepare('DELETE FROM gags WHERE user_id = ? AND room_id = ?').run(mTarget.dbId, currentRoom);
      db.prepare('INSERT INTO gags (user_id, room_id, gagged_by, expires_at, type) VALUES (?, ?, ?, ?, ?)')
        .run(mTarget.dbId, currentRoom, userData.dbId, muteExpires, 'mute');
      sendSystemMsg(userData.ws, `${mTarget.username} has been silently muted.`);
      return true;
    }

    // === /badge <user> [text] ===
    case '/badge': {
      if (userData.rank < RANK.OWNER) {
        sendSystemMsg(userData.ws, 'Only owners can badge users.');
        return true;
      }
      if (!targetName) { sendSystemMsg(userData.ws, 'Usage: /badge <username> [text]'); return true; }
      const bTarget = findUserInRoom(room, targetName);
      if (!bTarget) { sendSystemMsg(userData.ws, `User "${targetName}" not found.`); return true; }
      bTarget.badge = reason || 'Badge';
      db.prepare('INSERT OR REPLACE INTO user_flags (user_id, room_id, flag_type, flag_value, set_by) VALUES (?, ?, ?, ?, ?)')
        .run(bTarget.dbId, currentRoom, 'badge', bTarget.badge, userData.dbId);
      broadcastToRoom(currentRoom, xmlTag('u', buildUserPacket(bTarget)));
      sendSystemMsg(userData.ws, `Badge set on ${bTarget.username}: ${bTarget.badge}`);
      return true;
    }

    // === /yellowcard <user> ===
    case '/yellowcard':
    case '/yc': {
      if (userData.rank < RANK.MOD) {
        sendSystemMsg(userData.ws, 'Moderators+ can give yellow cards.');
        return true;
      }
      if (!targetName) { sendSystemMsg(userData.ws, 'Usage: /yellowcard <username>'); return true; }
      const ycTarget = findUserInRoom(room, targetName);
      if (!ycTarget) { sendSystemMsg(userData.ws, `User "${targetName}" not found.`); return true; }
      if (ycTarget.rank >= userData.rank) { sendSystemMsg(userData.ws, 'Cannot card equal/higher rank.'); return true; }
      const ycExpires = Math.floor(Date.now() / 1000) + 3600; // 1 hour
      db.prepare('INSERT OR REPLACE INTO user_flags (user_id, room_id, flag_type, flag_value, set_by, expires_at) VALUES (?, ?, ?, ?, ?, ?)')
        .run(ycTarget.dbId, currentRoom, 'yellowcard', '1', userData.dbId, ycExpires);
      broadcastSystemMsg(currentRoom, `${ycTarget.username} received a Yellow Card from ${userData.username}`);
      broadcastToRoom(currentRoom, xmlTag('u', buildUserPacket(ycTarget)));
      return true;
    }

    // === /redcard <user> ===
    case '/redcard':
    case '/rc': {
      if (userData.rank < RANK.MOD) {
        sendSystemMsg(userData.ws, 'Moderators+ can give red cards.');
        return true;
      }
      if (!targetName) { sendSystemMsg(userData.ws, 'Usage: /redcard <username>'); return true; }
      const rcTarget = findUserInRoom(room, targetName);
      if (!rcTarget) { sendSystemMsg(userData.ws, `User "${targetName}" not found.`); return true; }
      if (rcTarget.rank >= userData.rank) { sendSystemMsg(userData.ws, 'Cannot card equal/higher rank.'); return true; }
      // Red card = any message triggers a ban, persists until used or 1 hour
      rcTarget.redcarded = true;
      const rcExpires = Math.floor(Date.now() / 1000) + 3600;
      db.prepare('INSERT OR REPLACE INTO user_flags (user_id, room_id, flag_type, flag_value, set_by, expires_at) VALUES (?, ?, ?, ?, ?, ?)')
        .run(rcTarget.dbId, currentRoom, 'redcard', '1', userData.dbId, rcExpires);
      broadcastSystemMsg(currentRoom, `${rcTarget.username} received a Red Card from ${userData.username}! Next message triggers a ban.`);
      broadcastToRoom(currentRoom, xmlTag('u', buildUserPacket(rcTarget)));
      return true;
    }

    // === /naughty <user> ===
    case '/naughty':
    case '/ns': {
      if (userData.rank < RANK.MOD) {
        sendSystemMsg(userData.ws, 'Moderators+ can naughty step.');
        return true;
      }
      if (!targetName) { sendSystemMsg(userData.ws, 'Usage: /naughty <username>'); return true; }
      const nsTarget = findUserInRoom(room, targetName);
      if (!nsTarget) { sendSystemMsg(userData.ws, `User "${targetName}" not found.`); return true; }
      if (nsTarget.rank >= userData.rank) { sendSystemMsg(userData.ws, 'Cannot naughty step equal/higher rank.'); return true; }
      nsTarget.naughtyStepped = true;
      const nsExpires = Math.floor(Date.now() / 1000) + 1800; // 30 min
      db.prepare('INSERT OR REPLACE INTO user_flags (user_id, room_id, flag_type, flag_value, set_by, expires_at) VALUES (?, ?, ?, ?, ?, ?)')
        .run(nsTarget.dbId, currentRoom, 'naughty', '1', userData.dbId, nsExpires);
      broadcastSystemMsg(currentRoom, `${nsTarget.username} was put on the Naughty Step by ${userData.username}`);
      broadcastToRoom(currentRoom, xmlTag('u', buildUserPacket(nsTarget)));
      return true;
    }

    // === /ranklock <user> ===
    case '/ranklock':
    case '/rl': {
      if (userData.rank < RANK.OWNER) {
        sendSystemMsg(userData.ws, 'Only owners can ranklock.');
        return true;
      }
      if (!targetName) { sendSystemMsg(userData.ws, 'Usage: /ranklock <username>'); return true; }
      const rlTarget = findUserInRoom(room, targetName);
      if (!rlTarget) { sendSystemMsg(userData.ws, `User "${targetName}" not found.`); return true; }
      rlTarget.ranklocked = !rlTarget.ranklocked;
      if (rlTarget.ranklocked) {
        db.prepare('INSERT OR REPLACE INTO user_flags (user_id, room_id, flag_type, flag_value, set_by) VALUES (?, ?, ?, ?, ?)')
          .run(rlTarget.dbId, currentRoom, 'ranklock', String(rlTarget.rank), userData.dbId);
      } else {
        db.prepare('DELETE FROM user_flags WHERE user_id = ? AND room_id = ? AND flag_type = ?')
          .run(rlTarget.dbId, currentRoom, 'ranklock');
      }
      sendSystemMsg(userData.ws, `${rlTarget.username} is now ${rlTarget.ranklocked ? 'rank-locked' : 'rank-unlocked'}.`);
      return true;
    }

    // === /gcontrol <key> <value> ===
    case '/gcontrol':
    case '/gc': {
      if (userData.rank < RANK.OWNER) {
        sendSystemMsg(userData.ws, 'Only owners can change gcontrol settings.');
        return true;
      }
      const gcKey = parts[1];
      const gcVal = parseInt(parts[2]);
      if (!gcKey || isNaN(gcVal)) {
        sendSystemMsg(userData.ws, 'Usage: /gcontrol <key> <value>');
        sendSystemMsg(userData.ws, 'Keys: mg,mb,mm,kk,bn,ubn,mbt,obt,ss,dnc,bdg,ns,yl,rc,rf,ka,rl,sme,p,j,mmt,cm');
        return true;
      }
      if (!(gcKey in GCONTROL_DEFAULTS)) {
        sendSystemMsg(userData.ws, 'Unknown gcontrol key: ' + gcKey);
        return true;
      }

      const gc = getRoomGcontrol(currentRoom);
      gc[gcKey] = gcVal;

      const existingGC = db.prepare('SELECT room_id FROM room_settings WHERE room_id = ?').get(currentRoom);
      if (existingGC) {
        db.prepare('UPDATE room_settings SET gcontrol = ? WHERE room_id = ?')
          .run(JSON.stringify(gc), currentRoom);
      } else {
        db.prepare('INSERT INTO room_settings (room_id, gcontrol) VALUES (?, ?)')
          .run(currentRoom, JSON.stringify(gc));
      }
      sendSystemMsg(userData.ws, `GControl: ${gcKey} set to ${gcVal}`);
      return true;
    }

    // === /clear ===
    case '/clear': {
      if (userData.rank < RANK.OWNER) {
        sendSystemMsg(userData.ws, 'Only owners can clear chat.');
        return true;
      }
      db.prepare('DELETE FROM messages WHERE room_id = ?').run(currentRoom);
      broadcastSystemMsg(currentRoom, 'Chat cleared by ' + userData.username);
      return true;
    }

    // === /mainowner ===
    case '/mainowner': {
      if (userData.rank < RANK.OWNER) {
        sendSystemMsg(userData.ws, 'You must be owner first.');
        return true;
      }
      // Check if there's already a main owner in this room
      const existingMainOwner = db.prepare('SELECT user_id FROM room_ranks WHERE room_id = ? AND rank >= ?').get(currentRoom, RANK.MAIN_OWNER);
      if (existingMainOwner && existingMainOwner.user_id !== userData.dbId) {
        sendSystemMsg(userData.ws, 'This room already has a main owner.');
        return true;
      }
      userData.rank = RANK.MAIN_OWNER;
      setUserRoomRank(userData.dbId, currentRoom, RANK.MAIN_OWNER, userData.dbId);
      broadcastToRoom(currentRoom, xmlTag('u', buildUserPacket(userData)));
      sendSystemMsg(userData.ws, 'You are now the Main Owner.');
      return true;
    }

    // === /go <room> - Navigate to another room ===
    case '/go': {
      const targetRoom = parts[1];
      if (!targetRoom) { sendSystemMsg(userData.ws, 'Usage: /go <room_id>'); return true; }
      // Send room redirect packet (real xat format)
      sendTo(userData.ws, xmlTag('m', { t: `/go${targetRoom}`, d: '0' }));
      return true;
    }

    // === /t <user> <xats> [days] - Transfer xats/days ===
    case '/t': {
      if (!userData.dbId) { sendSystemMsg(userData.ws, 'You must be registered to transfer.'); return true; }
      const tUser = parts[1];
      const tXats = parseInt(parts[2]) || 0;
      const tDays = parseInt(parts[3]) || 0;
      if (!tUser || (tXats <= 0 && tDays <= 0)) {
        sendSystemMsg(userData.ws, 'Usage: /t <username> <xats> [days]');
        return true;
      }
      const tTarget = findUserInRoom(room, tUser);
      if (!tTarget || !tTarget.dbId) { sendSystemMsg(userData.ws, `User "${tUser}" not found or is a guest.`); return true; }
      if (tTarget.userId === userData.userId) { sendSystemMsg(userData.ws, 'Cannot transfer to yourself.'); return true; }
      const sender = db.prepare('SELECT xats, days FROM users WHERE id = ?').get(userData.dbId);
      if (!sender || sender.xats < tXats || sender.days < tDays) {
        sendSystemMsg(userData.ws, 'Insufficient balance.');
        return true;
      }
      db.prepare('UPDATE users SET xats = xats - ?, days = days - ? WHERE id = ?').run(tXats, tDays, userData.dbId);
      db.prepare('UPDATE users SET xats = xats + ?, days = days + ? WHERE id = ?').run(tXats, tDays, tTarget.dbId);
      sendSystemMsg(userData.ws, `Transferred ${tXats} xats and ${tDays} days to ${tTarget.username}.`);
      sendSystemMsg(tTarget.ws, `${userData.username} sent you ${tXats} xats and ${tDays} days.`);
      return true;
    }

    // === /d <user> - View user details ===
    case '/d': {
      if (!targetName) { sendSystemMsg(userData.ws, 'Usage: /d <username>'); return true; }
      const dTarget = findUserInRoom(room, targetName);
      if (!dTarget) { sendSystemMsg(userData.ws, `User "${targetName}" not found.`); return true; }
      const dInfo = dTarget.dbId ? db.prepare('SELECT id, username, rank, xats, days, avatar, created_at, married_to, bff_with FROM users WHERE id = ?').get(dTarget.dbId) : null;
      const lines = [
        `User: ${dTarget.username} (ID: ${dTarget.userId})`,
        `Rank: ${dTarget.rank >= RANK.MAIN_OWNER ? 'Main Owner' : dTarget.rank >= RANK.OWNER ? 'Owner' : dTarget.rank >= RANK.MOD ? 'Moderator' : dTarget.rank >= RANK.MEMBER ? 'Member' : 'Guest'}`,
      ];
      if (dInfo) {
        lines.push(`Xats: ${dInfo.xats} | Days: ${dInfo.days}`);
        if (dInfo.married_to) {
          const spouse = db.prepare('SELECT username FROM users WHERE id = ?').get(dInfo.married_to);
          if (spouse) lines.push(`Married to: ${spouse.username}`);
        }
        if (dInfo.bff_with) {
          const bff = db.prepare('SELECT username FROM users WHERE id = ?').get(dInfo.bff_with);
          if (bff) lines.push(`BFF: ${bff.username}`);
        }
        lines.push(`Registered: ${new Date(dInfo.created_at * 1000).toLocaleDateString()}`);
      }
      lines.forEach(l => sendSystemMsg(userData.ws, l));
      return true;
    }

    // === /bg <url|id> - Set room background ===
    case '/bg': {
      if (userData.rank < RANK.OWNER) { sendSystemMsg(userData.ws, 'Only owners can change the background.'); return true; }
      const bgVal = parts[1];
      if (!bgVal) { sendSystemMsg(userData.ws, 'Usage: /bg <background_url_or_id>'); return true; }
      room.background = bgVal;
      const bgSettings = db.prepare('SELECT room_id FROM room_settings WHERE room_id = ?').get(currentRoom);
      if (bgSettings) {
        db.prepare('UPDATE room_settings SET background = ? WHERE room_id = ?').run(bgVal, currentRoom);
      } else {
        db.prepare('INSERT INTO room_settings (room_id, background) VALUES (?, ?)').run(currentRoom, bgVal);
      }
      // Broadcast new background via gp packet
      broadcastToRoom(currentRoom, xmlTag('gp', { xback: bgVal }));
      sendSystemMsg(userData.ws, `Background set to: ${bgVal}`);
      return true;
    }

    // === /cb [color] - Set room inner color ===
    case '/cb': {
      if (userData.rank < RANK.OWNER) { sendSystemMsg(userData.ws, 'Only owners can change room colors.'); return true; }
      const cbVal = parts[1] || '';
      room.innerColor = cbVal;
      const cbSettings = db.prepare('SELECT room_id FROM room_settings WHERE room_id = ?').get(currentRoom);
      if (cbSettings) {
        db.prepare('UPDATE room_settings SET inner_color = ? WHERE room_id = ?').run(cbVal, currentRoom);
      } else {
        db.prepare('INSERT INTO room_settings (room_id, inner_color) VALUES (?, ?)').run(currentRoom, cbVal);
      }
      broadcastToRoom(currentRoom, xmlTag('gp', { cb: cbVal }));
      sendSystemMsg(userData.ws, cbVal ? `Room color set to: ${cbVal}` : 'Room color reset.');
      return true;
    }

    // === /ri <user> - Ring (propose marriage) ===
    case '/ri':
    case '/ring': {
      if (!userData.dbId) { sendSystemMsg(userData.ws, 'You must be registered.'); return true; }
      if (!targetName) { sendSystemMsg(userData.ws, 'Usage: /ri <username>'); return true; }
      const riTarget = findUserInRoom(room, targetName);
      if (!riTarget || !riTarget.dbId) { sendSystemMsg(userData.ws, `User "${targetName}" not found or is a guest.`); return true; }
      const riSelf = db.prepare('SELECT married_to, xats FROM users WHERE id = ?').get(userData.dbId);
      if (riSelf.married_to && riSelf.married_to !== 0) { sendSystemMsg(userData.ws, 'You are already married. /divorce first.'); return true; }
      if (riSelf.xats < 200) { sendSystemMsg(userData.ws, 'Marriage costs 200 xats.'); return true; }
      const riOther = db.prepare('SELECT married_to FROM users WHERE id = ?').get(riTarget.dbId);
      if (riOther.married_to && riOther.married_to !== 0) { sendSystemMsg(userData.ws, `${riTarget.username} is already married.`); return true; }
      // Store pending proposal
      if (!room.proposals) room.proposals = new Map();
      room.proposals.set(riTarget.userId, { from: userData.userId, fromDb: userData.dbId, toDb: riTarget.dbId, fromName: userData.username });
      sendSystemMsg(riTarget.ws, `${userData.username} is proposing to you! Type /accept to accept or /reject to decline.`);
      sendSystemMsg(userData.ws, `Proposal sent to ${riTarget.username}. Waiting for response...`);
      return true;
    }

    // === /accept - Accept marriage proposal ===
    case '/accept': {
      if (!room.proposals || !room.proposals.has(userData.userId)) {
        sendSystemMsg(userData.ws, 'No pending proposal.');
        return true;
      }
      const proposal = room.proposals.get(userData.userId);
      room.proposals.delete(userData.userId);
      db.prepare('UPDATE users SET xats = xats - 200, married_to = ? WHERE id = ?').run(proposal.toDb, proposal.fromDb);
      db.prepare('UPDATE users SET married_to = ? WHERE id = ?').run(proposal.fromDb, proposal.toDb);
      broadcastSystemMsg(currentRoom, `${proposal.fromName} and ${userData.username} are now married!`);
      return true;
    }

    // === /reject - Reject marriage proposal ===
    case '/reject': {
      if (!room.proposals || !room.proposals.has(userData.userId)) {
        sendSystemMsg(userData.ws, 'No pending proposal.');
        return true;
      }
      const proposal = room.proposals.get(userData.userId);
      room.proposals.delete(userData.userId);
      const proposer = findUserInRoomById(room, proposal.from);
      if (proposer) sendSystemMsg(proposer.ws, `${userData.username} rejected your proposal.`);
      sendSystemMsg(userData.ws, 'Proposal rejected.');
      return true;
    }

    // === /divorce - Divorce ===
    case '/divorce': {
      if (!userData.dbId) { sendSystemMsg(userData.ws, 'You must be registered.'); return true; }
      const divSelf = db.prepare('SELECT married_to FROM users WHERE id = ?').get(userData.dbId);
      if (!divSelf.married_to || divSelf.married_to === 0) { sendSystemMsg(userData.ws, 'You are not married.'); return true; }
      const exId = divSelf.married_to;
      db.prepare('UPDATE users SET married_to = 0 WHERE id = ?').run(userData.dbId);
      db.prepare('UPDATE users SET married_to = 0 WHERE id = ?').run(exId);
      const exUser = db.prepare('SELECT username FROM users WHERE id = ?').get(exId);
      broadcastSystemMsg(currentRoom, `${userData.username} and ${exUser ? exUser.username : 'someone'} got divorced.`);
      return true;
    }

    // === /mb <user> - Make best friend ===
    case '/mb':
    case '/bff': {
      if (!userData.dbId) { sendSystemMsg(userData.ws, 'You must be registered.'); return true; }
      if (!targetName) { sendSystemMsg(userData.ws, 'Usage: /mb <username>'); return true; }
      const mbTarget = findUserInRoom(room, targetName);
      if (!mbTarget || !mbTarget.dbId) { sendSystemMsg(userData.ws, `User "${targetName}" not found or is a guest.`); return true; }
      const mbSelf = db.prepare('SELECT bff_with, xats FROM users WHERE id = ?').get(userData.dbId);
      if (mbSelf.bff_with && mbSelf.bff_with !== 0) { sendSystemMsg(userData.ws, 'You already have a BFF.'); return true; }
      if (mbSelf.xats < 200) { sendSystemMsg(userData.ws, 'BFF costs 200 xats.'); return true; }
      const mbOther = db.prepare('SELECT bff_with FROM users WHERE id = ?').get(mbTarget.dbId);
      if (mbOther.bff_with && mbOther.bff_with !== 0) { sendSystemMsg(userData.ws, `${mbTarget.username} already has a BFF.`); return true; }
      if (!room.bffRequests) room.bffRequests = new Map();
      room.bffRequests.set(mbTarget.userId, { from: userData.userId, fromDb: userData.dbId, toDb: mbTarget.dbId, fromName: userData.username });
      sendSystemMsg(mbTarget.ws, `${userData.username} wants to be your BFF! Type /acceptbff to accept.`);
      sendSystemMsg(userData.ws, `BFF request sent to ${mbTarget.username}.`);
      return true;
    }

    // === /acceptbff - Accept BFF request ===
    case '/acceptbff': {
      if (!room.bffRequests || !room.bffRequests.has(userData.userId)) {
        sendSystemMsg(userData.ws, 'No pending BFF request.');
        return true;
      }
      const bffReq = room.bffRequests.get(userData.userId);
      room.bffRequests.delete(userData.userId);
      db.prepare('UPDATE users SET xats = xats - 200, bff_with = ? WHERE id = ?').run(bffReq.toDb, bffReq.fromDb);
      db.prepare('UPDATE users SET bff_with = ? WHERE id = ?').run(bffReq.fromDb, bffReq.toDb);
      broadcastSystemMsg(currentRoom, `${bffReq.fromName} and ${userData.username} are now Best Friends!`);
      return true;
    }

    // === /tban <user> <hours> [reason] - Timed ban ===
    case '/tban': {
      if (userData.rank < RANK.MOD) { sendSystemMsg(userData.ws, 'Moderators+ can timed ban.'); return true; }
      if (!targetName) { sendSystemMsg(userData.ws, 'Usage: /tban <username> <hours> [reason]'); return true; }
      const tbTarget = findUserInRoom(room, targetName);
      if (!tbTarget) { sendSystemMsg(userData.ws, `User "${targetName}" not found.`); return true; }
      if (tbTarget.rank >= userData.rank) { sendSystemMsg(userData.ws, 'Cannot ban equal/higher rank.'); return true; }
      const tbHours = Math.min(Math.max(parseInt(parts[2]) || 1, 1), 720); // 1h-30d
      const tbReason = parts.slice(3).join(' ') || '';
      const tbExpires = Math.floor(Date.now() / 1000) + tbHours * 3600;
      db.prepare('INSERT INTO bans (user_id, room_id, banned_by, reason, expires_at) VALUES (?, ?, ?, ?, ?)')
        .run(tbTarget.dbId, currentRoom, userData.dbId, tbReason, tbExpires);
      broadcastSystemMsg(currentRoom, `${tbTarget.username} was banned by ${userData.username} for ${tbHours}h${tbReason ? ': ' + tbReason : ''}`);
      sendTo(tbTarget.ws, xmlTag('c', { t: '/b', u: userData.userId, d: tbTarget.userId, r: tbReason }));
      tbTarget.ws.close();
      return true;
    }

    // === /banlist - Show banned users ===
    case '/banlist':
    case '/bl': {
      if (userData.rank < RANK.MOD) { sendSystemMsg(userData.ws, 'Moderators+ can view bans.'); return true; }
      const now = Math.floor(Date.now() / 1000);
      const bans = db.prepare('SELECT b.user_id, b.reason, b.expires_at, u.username FROM bans b LEFT JOIN users u ON b.user_id = u.id WHERE b.room_id = ? AND (b.expires_at IS NULL OR b.expires_at > ?)').all(currentRoom, now);
      if (bans.length === 0) { sendSystemMsg(userData.ws, 'No active bans.'); return true; }
      sendSystemMsg(userData.ws, `Active bans (${bans.length}):`);
      bans.forEach(b => {
        const timeLeft = b.expires_at ? Math.ceil((b.expires_at - now) / 3600) + 'h left' : 'permanent';
        sendSystemMsg(userData.ws, `  ${b.username || b.user_id} - ${timeLeft}${b.reason ? ' (' + b.reason + ')' : ''}`);
      });
      return true;
    }

    // === /count - Show user count ===
    case '/count': {
      const count = room.users ? room.users.size : 0;
      sendSystemMsg(userData.ws, `Users in room: ${count}`);
      return true;
    }

    // === /block <user> - Block/ignore a user ===
    case '/block':
    case '/ignore': {
      if (!userData.dbId) { sendSystemMsg(userData.ws, 'You must be registered.'); return true; }
      if (!targetName) { sendSystemMsg(userData.ws, 'Usage: /block <username>'); return true; }
      const blTarget = findUserInRoom(room, targetName);
      if (!blTarget || !blTarget.dbId) { sendSystemMsg(userData.ws, `User "${targetName}" not found or is a guest.`); return true; }
      if (blTarget.userId === userData.userId) { sendSystemMsg(userData.ws, 'Cannot block yourself.'); return true; }
      try {
        db.prepare('INSERT OR IGNORE INTO ignores (user_id, ignored_id) VALUES (?, ?)').run(userData.dbId, blTarget.dbId);
      } catch(e) {}
      sendTo(userData.ws, xmlTag('b', { u: String(blTarget.dbId), t: 'added' }));
      sendSystemMsg(userData.ws, `${blTarget.username} blocked.`);
      return true;
    }

    // === /unblock <user> - Unblock a user ===
    case '/unblock':
    case '/unignore': {
      if (!userData.dbId) { sendSystemMsg(userData.ws, 'You must be registered.'); return true; }
      if (!targetName) { sendSystemMsg(userData.ws, 'Usage: /unblock <username>'); return true; }
      const ubTarget = db.prepare('SELECT id, username FROM users WHERE username = ? COLLATE NOCASE').get(targetName);
      if (!ubTarget) { sendSystemMsg(userData.ws, `User "${targetName}" not found.`); return true; }
      db.prepare('DELETE FROM ignores WHERE user_id = ? AND ignored_id = ?').run(userData.dbId, ubTarget.id);
      sendTo(userData.ws, xmlTag('b', { u: String(ubTarget.id), t: 'removed' }));
      sendSystemMsg(userData.ws, `${ubTarget.username} unblocked.`);
      return true;
    }

    // === /resetcount - Reset room visitor count ===
    case '/resetcount': {
      if (userData.rank < RANK.OWNER) { sendSystemMsg(userData.ws, 'Only owners can reset count.'); return true; }
      sendSystemMsg(userData.ws, 'Visitor count reset.');
      return true;
    }

    // === /topic <text> - Set room topic ===
    case '/topic': {
      if (userData.rank < RANK.OWNER) { sendSystemMsg(userData.ws, 'Only owners can change the topic.'); return true; }
      const topicText = parts.slice(1).join(' ');
      if (!topicText) { sendSystemMsg(userData.ws, 'Usage: /topic <text>'); return true; }
      room.topic = topicText;
      const topicSettings = db.prepare('SELECT room_id FROM room_settings WHERE room_id = ?').get(currentRoom);
      if (topicSettings) {
        db.prepare('UPDATE room_settings SET topic = ? WHERE room_id = ?').run(topicText, currentRoom);
      } else {
        db.prepare('INSERT INTO room_settings (room_id, topic) VALUES (?, ?)').run(currentRoom, topicText);
      }
      broadcastSystemMsg(currentRoom, `Topic set: ${topicText}`);
      return true;
    }

    // === /wave <user> - Wave at someone ===
    case '/wave': {
      if (!targetName) { sendSystemMsg(userData.ws, 'Usage: /wave <username>'); return true; }
      const wTarget = findUserInRoom(room, targetName);
      if (!wTarget) { sendSystemMsg(userData.ws, `User "${targetName}" not found.`); return true; }
      broadcastToRoom(currentRoom, xmlTag('m', { t: `/wave ${userData.username} waved at ${wTarget.username}`, d: '0' }));
      return true;
    }

    // === /me <action> - Emote action ===
    case '/me': {
      const meText = parts.slice(1).join(' ');
      if (!meText) { sendSystemMsg(userData.ws, 'Usage: /me <action>'); return true; }
      broadcastToRoom(currentRoom, xmlTag('m', { t: `* ${userData.username} ${meText}`, u: userData.userId, d: '0' }));
      return true;
    }

    // === /help ===
    case '/help': {
      const help = [
        'Commands:',
        '  /kick <user> [reason] - Kick a user (Mod+)',
        '  /ban <user> [reason] - Ban for 6h (Mod+)',
        '  /tban <user> <hrs> [reason] - Timed ban (Mod+)',
        '  /unban <user> - Remove ban (Mod+)',
        '  /banlist - Show active bans (Mod+)',
        '  /gag <user> - Mute a user (Mod+)',
        '  /ungag <user> - Unmute a user (Mod+)',
        '  /mute <user> - Silent mute (Owner)',
        '  /dunce <user> - Dunce cap (Owner)',
        '  /mod <user> - Promote to Mod (Owner)',
        '  /member <user> - Set to Member (Owner)',
        '  /guest <user> - Demote to Guest (Owner)',
        '  /owner <user> - Promote to Owner (Owner)',
        '  /scroller <text> - Room scroller (Owner)',
        '  /topic <text> - Set room topic (Owner)',
        '  /bg <url|id> - Set background (Owner)',
        '  /cb [color] - Set room color (Owner)',
        '  /hush [secs] - Silence chat (Owner)',
        '  /unhush - End silence (Owner)',
        '  /ka [g|r] - Kick all (Owner)',
        '  /clear - Clear chat (Owner)',
        '  /go <room> - Go to room',
        '  /t <user> <xats> [days] - Transfer',
        '  /d <user> - User details',
        '  /ri <user> - Propose marriage (200 xats)',
        '  /mb <user> - Make BFF (200 xats)',
        '  /divorce - End marriage',
        '  /me <text> - Emote action',
        '  /wave <user> - Wave',
        '  /count - User count',
      ];
      help.forEach(line => sendSystemMsg(userData.ws, line));
      return true;
    }

    default:
      return false;
  }
}

// ===== XAT AUTH CHALLENGE (ixat-compatible) =====
// Implements the same crypto challenge as the real xat.com/ixat servers
// so the WASM client can authenticate properly.

function generateAuthChallenge() {
  const loginKey = Math.floor(10000000 + Math.random() * 89999999);
  const loginShift = Math.floor(2 + Math.random() * 4); // 2-5
  const loginTime = Math.floor(Date.now() / 1000);
  const loginAuth = loginTime;
  const ma = [
    Math.floor(Math.random() * 32),
    Math.floor(32 + Math.random() * 32),
    Math.floor(64 + Math.random() * 64),
    Math.floor(128 + Math.random() * 128),
  ];

  // j2 attribute order (shuffled, anti-bot measure)
  const yo1 = ['auth2','auth','cb','Y','fuckm1','fuckm2','huem3','huem4','q','y','k','k3','d1','z','p','c','b','r','f','e','u'];
  const yo2 = ['dO','sn','dx','dt','N','n','a','h','v','cv'];
  // Shuffle arrays
  for (let i = yo1.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [yo1[i], yo1[j]] = [yo1[j], yo1[i]]; }
  for (let i = yo2.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [yo2[i], yo2[j]] = [yo2[j], yo2[i]]; }

  return {
    loginKey, loginShift, loginTime, loginAuth, ma, yo1, yo2,
  };
}

function verifyAuthChallenge(challenge, j2Attrs) {
  // Verify the crypto response fields from the WASM client
  // For a private server, we can be lenient - just check that they sent reasonable values
  // The real verification checks: y, fuckm1, fuckm2, huem3, huem4, auth, auth2

  if (!j2Attrs.y || !j2Attrs.cb) return false;

  // Basic check: y should echo back the loginKey
  if (parseInt(j2Attrs.y) !== challenge.loginKey) return false;

  // For a private server, we skip the full crypto verification
  // The WASM client computed it correctly if it got this far
  return true;
}

// ===== WEBSOCKET PROTOCOL HANDLER =====
function handleXatConnection(ws) {
  const socketId = globalSocketId++;
  let currentRoom = null;
  let userData = null;
  let authChallenge = null;     // xat WASM auth challenge
  let authenticatedUser = null;  // DB user from token auth (custom client)
  let isWasmClient = false;      // true if using real xat WASM client

  ws.on('message', (rawMsg) => {
    try {
    // Handle both text and binary messages (WASM client sends binary ArrayBuffers)
    let msg;
    if (Buffer.isBuffer(rawMsg)) {
      msg = rawMsg.toString('utf8');
    } else if (rawMsg instanceof ArrayBuffer) {
      msg = Buffer.from(rawMsg).toString('utf8');
    } else {
      msg = rawMsg.toString();
    }

    const packets = msg.split('\0').filter(p => p.trim().length > 0);

    for (const pkt of packets) {
      const parsed = parseXatPacket(pkt);
      if (!parsed) continue;
      const { tag, attrs } = parsed;

      switch (tag) {
        // === HANDSHAKE (y packet) ===
        case 'y': {
          const roomId = attrs.r || '1';
          currentRoom = roomId;

          // Detect client type: custom HTML5 client sends 'token', WASM sends 'u' (userId)
          const token = attrs.token;
          const hasToken = token && token !== 'null' && token !== 'undefined';

          // --- MODE 1: Custom HTML5 client with token auth ---
          if (hasToken || !attrs.u) {
            if (hasToken) {
              const session = db.prepare('SELECT * FROM sessions WHERE token = ? AND expires_at > ?')
                .get(token, Math.floor(Date.now() / 1000));
              if (session) {
                authenticatedUser = db.prepare('SELECT * FROM users WHERE id = ?').get(session.user_id);
              }
            }

            // Guest mode (no token or invalid token)
            if (!authenticatedUser) {
              const guestName = `Guest_${Math.floor(1000 + Math.random() * 9000)}`;
              const guestHash = 'guest:no-password';
              const info = db.prepare('INSERT INTO users (username, password_hash, rank, xats, days) VALUES (?, ?, ?, 0, 0)')
                .run(guestName, guestHash, RANK.GUEST);
              authenticatedUser = db.prepare('SELECT * FROM users WHERE id = ?').get(info.lastInsertRowid);
              console.log(`[Auth] Auto-created guest: ${guestName} (ID: ${authenticatedUser.id})`);
            }

            if (isUserBanned(authenticatedUser.id, roomId)) {
              sendTo(ws, xmlTag('e', { t: 'You are banned from this room.' }));
              ws.close();
              return;
            }

            // Send y response for custom client
            sendTo(ws, xmlTag('y', {
              i: socketId,
              u: authenticatedUser.id,
              n: authenticatedUser.username,
              c: roomId,
              r: authenticatedUser.rank,
              d0: authenticatedUser.days,
              x0: authenticatedUser.xats,
              v: '2',
              au: '1',
              p: '0',
              t: Math.floor(Date.now() / 1000),
            }));
            break;
          }

          // --- MODE 2: Real xat WASM client (standard protocol) ---
          isWasmClient = true;
          authChallenge = generateAuthChallenge();

          // If they sent a userId, try to look them up
          if (attrs.u) {
            authenticatedUser = db.prepare('SELECT * FROM users WHERE id = ?').get(parseInt(attrs.u));
          }

          // Send auth challenge matching real xat.com format:
          // <y I="32701" i="sessionNonce" c="timestamp" cb="147" p="powChallenge,1" k="32701" t="10034" s="51" e="entropy" />
          // IMPORTANT: i (nonce) and p (PoW challenge) must be DIFFERENT values
          const powChallenge = Math.floor(Math.random() * 999999999999999) + 100000000000000;
          sendTo(ws, xmlTag('y', {
            I: '32701',
            i: authChallenge.loginKey,
            c: authChallenge.loginTime,
            cb: '147',
            p: `${powChallenge},1`,
            k: '32701',
            t: '10034',
            s: '51',  // constant, not random
            e: String(Math.floor(Math.random() * 999999999)),
          }));
          // Store PoW challenge for verification in j2
          authChallenge.powChallenge = powChallenge;
          break;
        }

        // === JOIN ROOM (j2 packet) ===
        case 'j2': {
          const roomId = currentRoom || '1';
          const room = getOrCreateRoom(roomId);
          let dbUser = authenticatedUser;

          // --- WASM client: verify crypto challenge ---
          if (isWasmClient && authChallenge) {
            const userId = attrs.u ? parseInt(String(attrs.u).replace(/_.*/, '')) : null;
            const userName = attrs.n ? String(attrs.n).replace(/\s*##\s*$/, '').trim() : `User_${userId || socketId}`;
            const k = attrs.k || '';
            const k3 = attrs.k3 || '0';

            // If client provides a k1 token, validate it (registered user auth)
            if (k && k !== '' && userId) {
              const tokenRow = db.prepare('SELECT * FROM k1_tokens WHERE token = ? AND user_id = ? AND expires_at > ?')
                .get(k, userId, Math.floor(Date.now() / 1000));
              if (tokenRow) {
                dbUser = db.prepare('SELECT * FROM users WHERE id = ?').get(tokenRow.user_id);
                db.prepare('DELETE FROM k1_tokens WHERE token = ?').run(k);
                if (dbUser) console.log(`[Auth] WASM k1 auth: ${dbUser.username} (ID: ${dbUser.id})`);
              } else {
                // k1 token was provided but is invalid/expired — reject, do not fall back
                sendTo(ws, xmlTag('e', { t: 'Authentication failed: invalid or expired token.' }));
                ws.close();
                return;
              }
            }

            // If still no user, auto-create a guest account for WASM clients
            if (!dbUser) {
              const guestHash = 'guest:no-password';
              const existing = db.prepare('SELECT id FROM users WHERE username = ? COLLATE NOCASE').get(userName);
              if (existing) {
                dbUser = db.prepare('SELECT * FROM users WHERE id = ?').get(existing.id);
              } else {
                const info = db.prepare('INSERT INTO users (username, password_hash, rank, xats, days) VALUES (?, ?, ?, 0, 0)')
                  .run(userName, guestHash, RANK.GUEST);
                dbUser = db.prepare('SELECT * FROM users WHERE id = ?').get(info.lastInsertRowid);
                console.log(`[Auth] WASM guest auto-created: ${userName} (ID: ${dbUser.id})`);
              }
            }
          }

          // --- Custom client: use token from y packet or j2 token attr ---
          if (!dbUser && attrs.token) {
            const session = db.prepare('SELECT * FROM sessions WHERE token = ? AND expires_at > ?')
              .get(attrs.token, Math.floor(Date.now() / 1000));
            if (session) {
              dbUser = db.prepare('SELECT * FROM users WHERE id = ?').get(session.user_id);
            }
          }

          if (!dbUser) {
            sendTo(ws, xmlTag('e', { t: 'Authentication failed.' }));
            ws.close();
            return;
          }

          // Check if banned from this room
          if (isUserBanned(dbUser.id, roomId)) {
            sendTo(ws, xmlTag('e', { t: 'You are banned from this room.' }));
            ws.close();
            return;
          }

          // Check for duplicate session — kick old connection
          const existingSession = userIdToRoom.get(String(dbUser.id));
          if (existingSession) {
            const existingRoom = rooms.get(existingSession.roomId);
            if (existingRoom) {
              const existingUser = existingRoom.users.get(existingSession.socketId);
              if (existingUser && existingUser.ws && existingUser.ws.readyState === 1) {
                existingUser.ws.close();
              }
              existingRoom.users.delete(existingSession.socketId);
              broadcastToRoom(existingSession.roomId, xmlTag('l', { u: String(dbUser.id) }));
            }
            userIdToRoom.delete(String(dbUser.id));
          }

          // Check room password
          const roomSettingsJoin = db.prepare('SELECT password FROM room_settings WHERE room_id = ?').get(roomId);
          if (roomSettingsJoin && roomSettingsJoin.password && dbUser.rank < RANK.MOD) {
            const providedPass = attrs.r || '';
            if (providedPass !== roomSettingsJoin.password) {
              sendTo(ws, xmlTag('e', { t: 'Incorrect room password.' }));
              break;
            }
          }

          // Check gag status
          const now = Math.floor(Date.now() / 1000);
          const gagRecord = db.prepare('SELECT * FROM gags WHERE user_id = ? AND room_id = ? AND (expires_at IS NULL OR expires_at > ?)').get(dbUser.id, roomId, now);
          // Clean expired gags
          db.prepare('DELETE FROM gags WHERE expires_at IS NOT NULL AND expires_at < ?').run(now);

          // Determine gag type (dunce vs mute vs plain gag)
          const gagType = gagRecord ? (gagRecord.type || 'gag') : null;

          // Restore persistent user flags (badge, redcard, yellowcard, naughty, ranklock)
          const activeFlags = db.prepare(
            'SELECT flag_type, flag_value FROM user_flags WHERE user_id = ? AND room_id = ? AND (expires_at IS NULL OR expires_at > ?)'
          ).all(dbUser.id, roomId, now);
          // Clean expired flags
          db.prepare('DELETE FROM user_flags WHERE expires_at IS NOT NULL AND expires_at < ?').run(now);

          const flagMap = {};
          for (const f of activeFlags) flagMap[f.flag_type] = f.flag_value || true;

          userData = {
            socketId,
            ws,
            dbId: dbUser.id,
            userId: String(dbUser.id),
            username: dbUser.username,
            avatar: attrs.a || dbUser.avatar || '',
            homepage: dbUser.homepage || '',
            rank: getUserRoomRank(dbUser.id, roomId),
            xats: dbUser.xats,
            days: dbUser.days,
            gagged: !!gagRecord,
            dunced: gagType === 'dunce',
            muted: gagType === 'mute',
            badge: flagMap.badge || '',
            redcarded: !!flagMap.redcard,
            naughtyStepped: !!flagMap.naughty,
            ranklocked: !!flagMap.ranklock,
            joinTime: Math.floor(Date.now() / 1000),
            pool: parseInt(attrs.pool) || 0,
            // N = registered username, distinct from n = display name
            // Only set for properly registered users (not auto-created guests)
            registered: (dbUser.password_hash && dbUser.password_hash !== 'guest:no-password') ? dbUser.username : '',
            // cb = per-user timestamp (registration or subscription time)
            cb: String(dbUser.created_at || 0),
            // v = client version/verification status
            v: 0,
          };

          // Load extra user data (pawn, status, powers, protocol fields)
          userData.isBot = !!(dbUser.is_bot);
          userData.pawn = dbUser.pawn || '';
          userData.cyclepawn = dbUser.cyclepawn || '';
          userData.status = dbUser.status || '';
          userData.nickname = dbUser.nickname || '';
          userData.d0 = dbUser.d0 || '';
          userData.d2 = dbUser.created_at || 0;  // registration timestamp
          userData.d3 = dbUser.xats || dbUser.d3 || 0;
          userData.dO = dbUser.dO || '';
          userData.dt = dbUser.dt || 0;
          userData.bride = dbUser.bride || '';
          userData.marriedTo = dbUser.married_to || 0;
          userData.bffWith = dbUser.bff_with || 0;
          userData.pstyle = dbUser.pstyle || '';
          userData.coins = dbUser.coins || 0;
          userData.k = dbUser.k || '';
          userData.k3 = dbUser.k3 || '';
          userData.powerMasks = getUserPowerBitmasks(dbUser.id);
          userData.powersDisabled = dbUser.powers_disabled || '[]';
          // Visual customization fields
          userData.namecolor = dbUser.namecolor || '';
          userData.nameglow = dbUser.nameglow || '';
          userData.namegrad = dbUser.namegrad || '';
          userData.namefont = dbUser.namefont || '';
          userData.pcback = dbUser.pcback || '';
          userData.statusfx = dbUser.statusfx || '';
          userData.hat = dbUser.hat || '';
          userData.iconcolor = dbUser.iconcolor || '';
          userData.pawnHue = dbUser.pawnHue || '';
          userData.avatarSettings = dbUser.avatarSettings || '';
          userData.verified = !!(dbUser.verified);

          room.users.set(socketId, userData);
          userIdToRoom.set(String(userData.userId), { roomId: currentRoom, socketId });

          // === JOIN SEQUENCE (matching real xat.com order) ===
          // 1. <i> room info  2. <gp> group powers  3. <aa> announcement
          // 4. <m /s> scroller  5. <w> pool  6. <o> offline  7. <u> online
          // 8. <m> history  9. <m /s> scroller with owner  10. <done />

          // Room info — include background, gcontrol, pool config
          const groupDb = db.prepare('SELECT * FROM groups WHERE id = ?').get(parseInt(roomId));
          const roomSettings = db.prepare('SELECT * FROM room_settings WHERE room_id = ?').get(roomId);
          // Group power bitmask — stored in groups.group_powers (pipe-delimited, 11 slots)
          const storedGroupPowers = (groupDb && groupDb.group_powers) || '0|0|0|0|0|0|0|0|0|0|0';
          const groupPowerStr = storedGroupPowers + '|';  // trailing pipe like real xat
          // g80 = gcontrol — single-quoted JSON format matching real xat.com
          const gc = roomSettings ? JSON.parse(roomSettings.gcontrol || '{}') : {};
          const g80Obj = {
            mb: gc.mb || '14', ubn: gc.ubn || '11', mbt: gc.mbt || 24,
            rl: gc.rl || '14', ns: gc.ns || '14', yl: gc.yl || '11',
            rc: gc.rc || '14', p: gc.p || '8', pd: gc.pd || '5', pt: gc.pt || 10,
          };
          // Build backtick-quoted JSON string (real xat format — setGconfig replaces ` with " before JSON.parse)
          const g80Str = '{' + Object.entries(g80Obj).map(([k, v]) => {
            return typeof v === 'number' ? `\`${k}\`:${v}` : `\`${k}\`:\`${v}\``;
          }).join(',') + '}';
          const gpAttrs = {
            p: groupPowerStr,
            // g74 = banned smilies list (from real xat.com/Chat capture)
            g74: (roomSettings && roomSettings.banned_smilies) || 'sob,smug,dull,cool,hehe,wailing,mad,redface,frown,um,ugh,dream',
            g80: g80Str,
          };
          // g100 = tab links (comma-separated name,shortlink pairs)
          if (roomSettings && roomSettings.tab_info) gpAttrs.g100 = roomSettings.tab_info;
          // g106 = kickback smiley
          if (roomSettings && roomSettings.kickback) gpAttrs.g106 = roomSettings.kickback;
          // g114 = room mode/rank config (single-quoted JSON)
          const roomMode = (roomSettings && roomSettings.room_mode) || 'Chat';
          const roomTitle = (roomSettings && roomSettings.idle_title) || 'Idle';
          const roomRnk = (roomSettings && roomSettings.min_rank) || '5';
          const roomBgName = (roomSettings && roomSettings.room_bg_name) || 'Cellar';
          const roomBrk = (roomSettings && roomSettings.room_brk) || '2';
          gpAttrs.g114 = `{\`m\`:\`${roomMode}\`,\`t\`:\`${roomTitle}\`,\`rnk\`:\`${roomRnk}\`,\`b\`:\`${roomBgName}\`,\`brk\`:\`${roomBrk}\`,\`v\`:1}`;
          // g188 = slow mode config
          const slowMode = (roomSettings && roomSettings.slow_mode) || 0;
          if (slowMode) gpAttrs.g188 = `{\`st\`:${slowMode},\`v\`:1}`;
          // g192 = rate limiting config
          gpAttrs.g192 = `{\`dt\`:90,\`rt\`:20,\`v\`:1}`;
          // g246 = recaptcha config
          gpAttrs.g246 = `{\`rc\`:\`1\`,\`v\`:1}`;
          // g200 = empty config
          gpAttrs.g200 = '{}';
          // radio URL — sent so the client can launch a radio player
          const gpRadio = (roomSettings && (roomSettings.radio_url || roomSettings.radio)) || '';
          if (gpRadio) gpAttrs.radio = gpRadio;
          // yt = YouTube embeds enabled
          gpAttrs.yt = '1';

          // Send <i> packet (room info) — real xat format:
          // b="bg_image;=name;=???;=language;=radio_url;=color1;=???;=???;=???;=???;=scroll_type;=nav_style;=font_name;=color2"
          // f=bitmask, cb=revision, B=bot_user_id
          const iBackground = (roomSettings && roomSettings.background) || (groupDb && groupDb.background) || '';
          const iLang = (roomSettings && roomSettings.language) || 'English';
          const iRadio = (roomSettings && roomSettings.radio) || '';
          const iColor1 = (roomSettings && roomSettings.color1) || '';
          const iColor2 = (roomSettings && roomSettings.color2) || '';
          const iNavStyle = (roomSettings && roomSettings.nav_style) || '';
          const iFontName = (roomSettings && roomSettings.font_name) || '';
          const iScrollType = (roomSettings && roomSettings.scroll_type) || 'None';
          // 14-field semicolon-separated format matching real xat.com
          const bFields = [
            iBackground, '', '', iLang, iRadio, iColor1,
            '', '', '', '', iScrollType, iNavStyle, iFontName, iColor2
          ];
          const botUserId = (roomSettings && roomSettings.bot_id) || '0';
          sendTo(ws, xmlTag('i', {
            b: bFields.join(';='),
            f: String(roomSettings ? (roomSettings.features || 88342592) : 88342592),
            cb: String(roomSettings ? (roomSettings.revision || 0) : 0),
            B: botUserId,
          }));

          sendTo(ws, xmlTag('gp', gpAttrs));

          // 3. <aa> announcement (base64-encoded HTML)
          const announcement = roomSettings && roomSettings.announcement;
          if (announcement) {
            const aaB64 = Buffer.from(announcement).toString('base64');
            sendTo(ws, xmlTag('aa', { b: aaB64 }));
          }

          // 4. First scroller message: <m t="/s text" d="0" />
          const scrollerText = room.scroller || (roomSettings && roomSettings.scroll_msg) || '';
          if (scrollerText) {
            sendTo(ws, xmlTag('m', { t: `/s ${scrollerText}`, d: '0' }));
          }

          // 5. Pool info: <w v="pool0 pool1 poolCount maxPool" /> (4 values)
          sendTo(ws, xmlTag('w', { v: `${userData.pool} 0 1 2` }));

          // Initialize room hush state from DB
          if (roomSettings && roomSettings.hush_until > Math.floor(Date.now() / 1000)) {
            room.hushUntil = roomSettings.hush_until;
            room.hushBy = roomSettings.hush_by;
          }

          // 6. <o> offline user packets (users in history who are not currently online)
          const recentMsgsDesc = db.prepare('SELECT * FROM messages WHERE room_id = ? AND pool = ? ORDER BY id DESC LIMIT 25').all(roomId, userData.pool);
          const offlineSent = new Set();
          for (const msg of recentMsgsDesc) {
            const msgUid = String(msg.user_id);
            if (offlineSent.has(msgUid)) continue;
            let isOnline = false;
            for (const [, u] of room.users) {
              if (u.userId === msgUid && u.pool === userData.pool) { isOnline = true; break; }
            }
            if (!isOnline) {
              offlineSent.add(msgUid);
              // Look up user from DB for full offline packet
              const offlineDbUser = db.prepare('SELECT username, avatar, homepage, days, rank FROM users WHERE id = ?').get(parseInt(msgUid));
              const offlineName = msg.username || (offlineDbUser && offlineDbUser.username) || '';
              const isRegistered = msg.registered && msg.registered !== 'unregistered';
              // Build f-flags for offline user
              const offlineRank = offlineDbUser ? offlineDbUser.rank : RANK.GUEST;
              let offlineFlags = 0;
              if (isRegistered) offlineFlags |= 0x08; // bit 3 = registered
              const offlineDays = offlineDbUser && offlineDbUser.days;
              if (offlineDays && offlineDays > 0) offlineFlags |= 0x80; // bit 7 = subscriber
              const offlineAttrs = {
                u: msgUid,
                n: isRegistered ? `${offlineName} ## ` : offlineName,
                a: msg.avatar || (offlineDbUser && offlineDbUser.avatar) || '',
                h: (offlineDbUser && offlineDbUser.homepage) || '',
                f: offlineFlags,
                s: '1',
                v: '0',
                W: buildWAttribute({}),
              };
              // q attribute for ranked offline users
              const offlineQ = rankToQ(offlineRank);
              if (offlineQ) offlineAttrs.q = offlineQ;
              // d0 = subscriber bitmask (same encoding as online users)
              if (offlineDays) {
                let od0 = 0x20 | 0x1000;
                if (offlineDays >= 30) od0 |= 0x80000 | 0x1000000;
                offlineAttrs.d0 = String(od0);
              }
              if (isRegistered) offlineAttrs.N = msg.registered;
              sendTo(ws, xmlTag('o', offlineAttrs));
            }
          }

          // 7. <u> online user packets (all users in room including self)
          for (const [sid, existingUser] of room.users) {
            sendTo(ws, xmlTag('u', buildUserPacket(existingUser)));
          }

          // 8. <m> message history in chronological order
          // Real xat format: t, o (base64 metadata), u (userId_pool), E (epoch), i (seqId), s="1"
          for (const msg of recentMsgsDesc.reverse()) {
            // User ID includes pool suffix when pool > 0
            const histUserId = msg.pool > 0 ? `${msg.user_id}_${msg.pool}` : String(msg.user_id);
            const msgUserId = String(msg.user_id);
            // Check if sender is currently online in this room/pool
            let histUserOnline = false;
            for (const [, u] of room.users) {
              if (u.userId === msgUserId && u.pool === userData.pool) { histUserOnline = true; break; }
            }
            const msgAttrs = {
              t: msg.text,
              u: histUserId,
              E: String(msg.created_at || Math.floor(Date.now() / 1000)),
              i: String(msg.id),
              s: '1',
            };
            // Add o attribute with base64-encoded metadata (for user messages, not system)
            if (msg.user_id && !String(msg.text).startsWith('/s ')) {
              const oData = JSON.stringify({
                isTranslated: '',
                msgId: msg.msg_id || String(msg.id),
                type: 'msg',
              });
              msgAttrs.o = Buffer.from(oData).toString('base64');
            }
            // For messages from offline users, include name and avatar so client can display them
            if (!histUserOnline && msg.user_id) {
              msgAttrs.n = msg.username || '';
              msgAttrs.a = msg.avatar || '';
            }
            sendTo(ws, xmlTag('m', msgAttrs));
          }

          // 9. Second scroller with owner user ID
          const ownerUserId = (roomSettings && roomSettings.owner_id) || '0';
          if (scrollerText) {
            sendTo(ws, xmlTag('m', { t: `/s ${scrollerText}`, d: String(ownerUserId) }));
          }

          // 9.5. Send ignore list so client knows who to filter
          if (userData.dbId) {
            const ignoreList = getIgnoreList(userData.dbId);
            if (ignoreList.length > 0) {
              sendTo(ws, xmlTag('b', { l: ignoreList.join(',') }));
            }
          }

          // 10. Signal that initial data load is complete
          sendTo(ws, xmlTag('done'));

          // Send stored macros to client
          if (userData.dbId) {
            try {
              const macroRow = db.prepare('SELECT macros FROM users WHERE id = ?').get(userData.dbId);
              if (macroRow && macroRow.macros && macroRow.macros !== '{}') {
                sendTo(ws, xmlTag('mc', { data: macroRow.macros }));
              }
            } catch(e) {}
          }

          // 11. Send friend list and pending requests
          if (userData.dbId) {
            const acceptedFriends = db.prepare(`
              SELECT u.id, u.username, u.avatar FROM friends f
              JOIN users u ON u.id = f.friend_id
              WHERE f.user_id = ? AND f.status = 'accepted'
            `).all(userData.dbId);
            for (const friend of acceptedFriends) {
              const isOnline = userIdToRoom.has(String(friend.id));
              sendTo(ws, xmlTag('f', {
                u: String(friend.id),
                n: friend.username,
                a: friend.avatar || '',
                s: isOnline ? '1' : '0',
              }));
            }
            // Send pending incoming requests
            const pendingRequests = db.prepare(`
              SELECT u.id, u.username FROM friends f
              JOIN users u ON u.id = f.user_id
              WHERE f.friend_id = ? AND f.status = 'pending'
            `).all(userData.dbId);
            for (const req of pendingRequests) {
              sendTo(ws, xmlTag('f', { u: String(req.id), n: req.username, t: 'request' }));
            }
          }

          // Notify friends that this user came online
          if (userData.dbId) {
            const onlineFriends = db.prepare(`
              SELECT f.friend_id FROM friends f
              WHERE f.user_id = ? AND f.status = 'accepted'
            `).all(userData.dbId);
            for (const friend of onlineFriends) {
              const friendWs = findOnlineUserWs(friend.friend_id);
              if (friendWs) {
                sendTo(friendWs, xmlTag('f', {
                  u: String(userData.userId),
                  n: userData.username,
                  a: userData.avatar || '',
                  s: '1',
                  t: 'status'
                }));
              }
              // Push notification to offline friends
              sendPushNotification(friend.friend_id, userData.username + ' is now online', '', { type: 'friend_online', userId: userData.userId });
            }
          }

          // Broadcast join to other users in same pool
          broadcastToPool(roomId, userData.pool, xmlTag('u', buildUserPacket(userData)), socketId);

          console.log(`[WS] ${userData.username} (${RANK_NAMES[userData.rank] || 'rank:' + userData.rank}) joined ${roomId} [${room.users.size} online]`);
          break;
        }

        // === MESSAGE (m packet) ===
        case 'm': {
          if (!currentRoom || !userData) break;
          const msgRoom = rooms.get(currentRoom);
          if (!msgRoom) break;
          const text = attrs.t || '';

          // Check gag (auto-expire if time passed)
          if (userData.gagged) {
            const gagRow = db.prepare('SELECT expires_at FROM gags WHERE user_id = ? AND room_id = ?').get(userData.dbId, currentRoom);
            if (!gagRow || (gagRow.expires_at && gagRow.expires_at < Math.floor(Date.now() / 1000))) {
              userData.gagged = false;
              db.prepare('DELETE FROM gags WHERE user_id = ? AND room_id = ?').run(userData.dbId, currentRoom);
            } else {
              sendSystemMsg(ws, 'You are gagged and cannot send messages.');
              break;
            }
          }

          // Rate limit: 10 messages per 10 seconds
          if (!rateLimit('chat:' + userData.userId, 10, 10000)) {
            sendSystemMsg(ws, 'You are sending messages too fast. Please slow down.');
            break;
          }

          // Check hush (room silence) — owners/mods exempt
          if (msgRoom.hushUntil && msgRoom.hushUntil > Math.floor(Date.now() / 1000) && userData.rank < RANK.MOD && !text.startsWith('/')) {
            sendSystemMsg(ws, 'Chat is hushed. Please wait.');
            break;
          }

          // Check red card — speaking triggers auto-ban
          if (userData.redcarded && !text.startsWith('/')) {
            const gc = getRoomGcontrol(currentRoom);
            const banDuration = (gc.rf || 6) * 3600;
            const expiresAt = Math.floor(Date.now() / 1000) + banDuration;
            db.prepare('INSERT INTO bans (user_id, room_id, banned_by, reason, expires_at) VALUES (?, ?, ?, ?, ?)')
              .run(userData.dbId, currentRoom, msgRoom.hushBy || 0, 'Red Card auto-ban', expiresAt);
            broadcastSystemMsg(currentRoom, `${userData.username} was auto-banned (Red Card) for ${formatDuration(banDuration)}`);
            sendTo(ws, xmlTag('c', { t: '/b', u: '0', d: userData.userId, r: 'Red Card' }));
            ws.close();
            break;
          }

          // Check if it's a command
          if (text.startsWith('/')) {
            const handled = handleCommand(userData, currentRoom, text);
            if (handled) break;
            // If not a recognized command, send as normal message
          }

          // Save to DB first to get the sequential message ID
          let msgId = 0;
          const randomMsgId = Math.random().toString(36).substring(2, 12);
          try {
            const result = db.prepare('INSERT INTO messages (room_id, user_id, username, text, pool, registered, avatar, msg_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
              .run(currentRoom, userData.userId, userData.username, text, userData.pool, userData.registered || userData.username || 'unregistered', userData.avatar || '', randomMsgId, Math.floor(Date.now() / 1000));
            msgId = result.lastInsertRowid;
            // Keep only last 50 messages per room
            db.prepare('DELETE FROM messages WHERE room_id = ? AND id NOT IN (SELECT id FROM messages WHERE room_id = ? ORDER BY id DESC LIMIT 50)')
              .run(currentRoom, currentRoom);
          } catch(e) {}

          // Real xat message format: t, o (base64 metadata), u (userId), E (epoch), i (seqId), s="1"
          // No n (username) or d (rank) — client looks up user from user list
          const msgEpoch = Math.floor(Date.now() / 1000);
          const oData = JSON.stringify({ isTranslated: '', msgId: randomMsgId, type: 'msg' });
          // User ID includes pool suffix when pool > 0 (e.g., "12345_2")
          const msgUserId = userData.pool > 0 ? `${userData.userId}_${userData.pool}` : userData.userId;
          broadcastToPoolFiltered(currentRoom, userData.pool, xmlTag('m', {
            t: text,
            o: Buffer.from(oData).toString('base64'),
            u: msgUserId,
            E: String(msgEpoch),
            i: String(msgId),
            s: '1',
          }), userData.dbId);
          console.log(`[Chat] ${userData.username}: ${text}`);
          break;
        }

        // === PRIVATE MESSAGE (p packet) ===
        case 'p': {
          if (!currentRoom || !userData) break;
          if (userData.gagged) {
            const gagRow = db.prepare('SELECT expires_at FROM gags WHERE user_id = ? AND room_id = ?').get(userData.dbId, currentRoom);
            if (!gagRow || (gagRow.expires_at && gagRow.expires_at < Math.floor(Date.now() / 1000))) {
              userData.gagged = false;
              db.prepare('DELETE FROM gags WHERE user_id = ? AND room_id = ?').run(userData.dbId, currentRoom);
            } else {
              sendSystemMsg(ws, 'You are gagged and cannot send messages.');
              break;
            }
          }

          const text = attrs.t || '';
          const targetUser = attrs.d;
          if (!targetUser) break;

          const room = rooms.get(currentRoom);
          if (!room) break;

          for (const [sid, user] of room.users) {
            if (user.userId === targetUser) {
              // Check if target is ignoring sender
              if (user.dbId && userData.dbId && isIgnoring(user.dbId, userData.dbId)) {
                sendSystemMsg(ws, 'This user is not accepting messages from you.');
                break;
              }
              // Real xat PM format with extra fields for PC rendering
              sendTo(user.ws, xmlTag('p', {
                t: text,
                u: userData.userId,
                d: targetUser,
                s: '1',
                n: userData.username,
                a: userData.avatar || '',
                pawn: userData.pawn || '',
                pcback: userData.pcback || '',
              }));
              // Send push notification for PM
              if (user.dbId) {
                sendPushNotification(user.dbId, 'New PM from ' + userData.username, text.substring(0, 100), { type: 'pm', from: userData.userId });
              }
              break;
            }
          }
          // Do NOT echo PM back to sender — the client handles display locally
          break;
        }

        // (x packet handled below — typing indicator + trade protocol)

        // === IDLE / AWAY STATUS ===
        case 'z': {
          if (!currentRoom || !userData) break;
          broadcastToRoom(currentRoom, xmlTag('z', {
            u: userData.userId,
            d: attrs.d || '2',
          }), socketId);
          break;
        }

        // === CONTROL PACKET (c) — kick/ban/rank/gag/mute/dunce/unban ===
        case 'c': {
          if (!currentRoom || !userData) break;
          const room = rooms.get(currentRoom);
          if (!room) break;

          let actionType = attrs.t || '';
          const targetUserId = attrs.d;
          if (!targetUserId && !actionType.startsWith('/b')) break;

          // Parse real xat protocol format: /g600 = gag 600s, /k = kick, /m = make mod, /e = make member, /r = make guest, /M = make owner
          // Our HTML5 client uses simple codes: k, g, gg, ug, gm, gd, m, e, r, M
          // Support both formats
          let gagDuration = 0;
          if (actionType.startsWith('/g') && actionType !== '/gg') {
            gagDuration = parseInt(actionType.slice(2)) || 600;
            actionType = 'g';
          } else if (actionType.startsWith('/k')) {
            actionType = 'k';
          } else if (actionType === '/m') {
            actionType = 'm';
          } else if (actionType === '/e') {
            actionType = 'e';
          } else if (actionType === '/r') {
            actionType = 'r';
          } else if (actionType === '/M') {
            actionType = 'M';
          }

          // Find target user in room
          let target = null;
          if (targetUserId) {
            for (const [sid, u] of room.users) {
              if (u.userId === targetUserId) {
                target = u;
                break;
              }
            }
          }

          switch (actionType) {
            // --- KICK ---
            case 'k': {
              if (!meetsGcontrol(userData, 'kk', currentRoom)) {
                sendSystemMsg(ws, 'You do not have permission to kick in this group.');
                break;
              }
              if (!target) {
                sendSystemMsg(ws, 'User not found in this room.');
                break;
              }
              if (target.rank >= userData.rank) {
                sendSystemMsg(ws, 'You cannot kick someone with equal or higher rank.');
                break;
              }
              const reason = attrs.p || '';
              // Send kick packet to target (ixat format: <c p="reason" t="/k" u="kickerId" d="targetId" />)
              sendTo(target.ws, xmlTag('c', { p: reason, t: '/k', u: userData.userId, d: target.userId }));
              // Broadcast leave to room
              broadcastToRoom(currentRoom, xmlTag('l', { u: target.userId }));
              target.ws.close();
              console.log(`[Mod] ${userData.username} kicked ${target.username}`);
              break;
            }

            // --- BAN ---
            case 'g': {
              if (!meetsGcontrol(userData, 'bn', currentRoom)) {
                sendSystemMsg(ws, 'You do not have permission to ban in this group.');
                break;
              }
              if (!target) {
                sendSystemMsg(ws, 'User not found in this room.');
                break;
              }
              if (target.rank >= userData.rank) {
                sendSystemMsg(ws, 'You cannot ban someone with equal or higher rank.');
                break;
              }
              const reason = attrs.p || '';
              const duration = gagDuration || parseInt(attrs.dt) || 21600; // default 6h
              const expiresAt = duration === 0
                ? Math.floor(Date.now() / 1000) + 315569520 // "permanent" = 10 years
                : Math.floor(Date.now() / 1000) + duration;

              // Enforce mod ban time limit (6h default, owners unlimited)
              if (userData.rank < RANK.OWNER && duration > 21600) {
                sendSystemMsg(ws, 'Moderators can only ban for up to 6 hours.');
                break;
              }

              db.prepare('INSERT INTO bans (user_id, room_id, banned_by, reason, expires_at) VALUES (?, ?, ?, ?, ?)')
                .run(target.dbId, currentRoom, userData.dbId, reason, expiresAt);

              const durStr = duration === 0 ? 'permanently' : formatDuration(duration);
              // Send ban/gag packet to target (ixat format: <c p="reason" t="/g{duration}" u="bannerId" d="targetId" />)
              sendTo(target.ws, xmlTag('c', { p: reason, t: `/g${duration}`, u: userData.userId, d: target.userId }));
              // Broadcast leave to room
              broadcastToRoom(currentRoom, xmlTag('l', { u: target.userId }));
              target.ws.close();
              console.log(`[Mod] ${userData.username} banned ${target.username} for ${durStr}`);
              break;
            }

            // --- UNBAN ---
            case 'u': {
              if (userData.rank < RANK.MOD) {
                sendSystemMsg(ws, 'You need Moderator rank or higher to unban.');
                break;
              }
              // targetUserId is the DB user ID
              const deleted = db.prepare('DELETE FROM bans WHERE user_id = ? AND room_id = ?').run(parseInt(targetUserId), currentRoom);
              if (deleted.changes > 0) {
                sendSystemMsg(ws, 'User has been unbanned.');
              } else {
                sendSystemMsg(ws, 'User is not banned from this room.');
              }
              break;
            }

            // --- GAG ---
            case 'gg': {
              if (!meetsGcontrol(userData, 'bn', currentRoom)) {
                sendSystemMsg(ws, 'You do not have permission to gag in this group.');
                break;
              }
              if (!target) {
                sendSystemMsg(ws, 'User not found in this room.');
                break;
              }
              if (target.rank >= userData.rank) {
                sendSystemMsg(ws, 'You cannot gag someone with equal or higher rank.');
                break;
              }
              target.gagged = true;
              const gagExpires = Math.floor(Date.now() / 1000) + 3600;
              db.prepare('DELETE FROM gags WHERE user_id = ? AND room_id = ?').run(target.dbId, currentRoom);
              db.prepare('INSERT INTO gags (user_id, room_id, gagged_by, expires_at) VALUES (?, ?, ?, ?)')
                .run(target.dbId, currentRoom, userData.dbId, gagExpires);
              broadcastSystemMsg(currentRoom, `${target.username} was gagged by ${userData.username}`);
              broadcastToRoom(currentRoom, xmlTag('u', buildUserPacket(target)));
              console.log(`[Mod] ${userData.username} gagged ${target.username}`);
              break;
            }

            // --- UNGAG ---
            case 'ug': {
              if (!meetsGcontrol(userData, 'ubn', currentRoom)) {
                sendSystemMsg(ws, 'You do not have permission to ungag in this group.');
                break;
              }
              if (!target) {
                sendSystemMsg(ws, 'User not found in this room.');
                break;
              }
              target.gagged = false;
              db.prepare('DELETE FROM gags WHERE user_id = ? AND room_id = ?').run(target.dbId, currentRoom);
              broadcastSystemMsg(currentRoom, `${target.username} was ungagged by ${userData.username}`);
              broadcastToRoom(currentRoom, xmlTag('u', buildUserPacket(target)));
              break;
            }

            // --- MUTE (invisible gag) ---
            case 'gm': {
              if (!meetsGcontrol(userData, 'bn', currentRoom)) {
                sendSystemMsg(ws, 'You do not have permission to mute in this group.');
                break;
              }
              if (!target) {
                sendSystemMsg(ws, 'User not found in this room.');
                break;
              }
              if (target.rank >= userData.rank) {
                sendSystemMsg(ws, 'You cannot mute someone with equal or higher rank.');
                break;
              }
              target.gagged = true;
              target.muted = true;
              const muteExpires = Math.floor(Date.now() / 1000) + 3600;
              db.prepare('DELETE FROM gags WHERE user_id = ? AND room_id = ?').run(target.dbId, currentRoom);
              db.prepare('INSERT INTO gags (user_id, room_id, gagged_by, expires_at) VALUES (?, ?, ?, ?)')
                .run(target.dbId, currentRoom, userData.dbId, muteExpires);
              sendSystemMsg(ws, `${target.username} has been muted.`);
              console.log(`[Mod] ${userData.username} muted ${target.username}`);
              break;
            }

            // --- DUNCE ---
            case 'gd': {
              if (!meetsGcontrol(userData, 'dnc', currentRoom)) {
                sendSystemMsg(ws, 'You do not have permission to dunce in this group.');
                break;
              }
              if (!target) {
                sendSystemMsg(ws, 'User not found in this room.');
                break;
              }
              if (target.rank >= userData.rank) {
                sendSystemMsg(ws, 'You cannot dunce someone with equal or higher rank.');
                break;
              }
              // Dunce = permanent gag + dunce flag
              target.gagged = true;
              target.dunced = true;
              const dunceExpires = Math.floor(Date.now() / 1000) + 315569520; // 10 years
              db.prepare('DELETE FROM gags WHERE user_id = ? AND room_id = ?').run(target.dbId, currentRoom);
              db.prepare('INSERT INTO gags (user_id, room_id, gagged_by, expires_at, type) VALUES (?, ?, ?, ?, ?)')
                .run(target.dbId, currentRoom, userData.dbId, dunceExpires, 'dunce');
              broadcastSystemMsg(currentRoom, `${target.username} was dunced by ${userData.username}`);
              broadcastToRoom(currentRoom, xmlTag('u', buildUserPacket(target)));
              console.log(`[Mod] ${userData.username} dunced ${target.username}`);
              break;
            }

            // --- RANK: Make Moderator ---
            case 'm': {
              if (!meetsGcontrol(userData, 'mm', currentRoom)) {
                sendSystemMsg(ws, 'You do not have permission to promote to Moderator.');
                break;
              }
              if (!target) {
                sendSystemMsg(ws, 'User not found in this room.');
                break;
              }
              if (isRanklocked(target)) { sendSystemMsg(ws, `${target.username} is rank-locked.`); break; }
              target.rank = RANK.MOD;
              setUserRoomRank(target.dbId, currentRoom, RANK.MOD, userData.dbId);
              broadcastSystemMsg(currentRoom, `${target.username} was promoted to Moderator by ${userData.username}`);
              broadcastToRoom(currentRoom, xmlTag('u', buildUserPacket(target)));
              console.log(`[Rank] ${userData.username} promoted ${target.username} to Mod`);
              break;
            }

            // --- RANK: Make Member ---
            case 'e': {
              if (!meetsGcontrol(userData, 'mb', currentRoom)) {
                sendSystemMsg(ws, 'You do not have permission to set Member rank.');
                break;
              }
              if (!target) {
                sendSystemMsg(ws, 'User not found in this room.');
                break;
              }
              if (isRanklocked(target)) { sendSystemMsg(ws, `${target.username} is rank-locked.`); break; }
              target.rank = RANK.MEMBER;
              setUserRoomRank(target.dbId, currentRoom, RANK.MEMBER, userData.dbId);
              broadcastSystemMsg(currentRoom, `${target.username} was set to Member by ${userData.username}`);
              broadcastToRoom(currentRoom, xmlTag('u', buildUserPacket(target)));
              break;
            }

            // --- RANK: Make Guest (demote) ---
            case 'r': {
              if (!meetsGcontrol(userData, 'mg', currentRoom)) {
                sendSystemMsg(ws, 'You do not have permission to set Guest rank.');
                break;
              }
              if (!target) {
                sendSystemMsg(ws, 'User not found in this room.');
                break;
              }
              if (target.rank >= userData.rank) {
                sendSystemMsg(ws, 'You cannot demote someone with equal or higher rank.');
                break;
              }
              if (isRanklocked(target)) { sendSystemMsg(ws, `${target.username} is rank-locked.`); break; }
              target.rank = RANK.GUEST;
              setUserRoomRank(target.dbId, currentRoom, RANK.GUEST, userData.dbId);
              broadcastSystemMsg(currentRoom, `${target.username} was demoted to Guest by ${userData.username}`);
              broadcastToRoom(currentRoom, xmlTag('u', buildUserPacket(target)));
              break;
            }

            // --- RANK: Make Owner ---
            case 'M': {
              if (userData.rank < RANK.OWNER) {
                sendSystemMsg(ws, 'Only owners can promote to Owner.');
                break;
              }
              if (!target) {
                sendSystemMsg(ws, 'User not found in this room.');
                break;
              }
              if (isRanklocked(target)) { sendSystemMsg(ws, `${target.username} is rank-locked.`); break; }
              target.rank = RANK.OWNER;
              setUserRoomRank(target.dbId, currentRoom, RANK.OWNER, userData.dbId);
              broadcastSystemMsg(currentRoom, `${target.username} was promoted to Owner by ${userData.username}`);
              broadcastToRoom(currentRoom, xmlTag('u', buildUserPacket(target)));
              console.log(`[Rank] ${userData.username} promoted ${target.username} to Owner`);
              break;
            }

            // --- RAPID (auto-action) ---
            case '/rapid': {
              // Rapid applies a preset action to a user (kick, ban, etc.)
              // For now, just broadcast to notify — the settings define what action occurs
              if (!target) break;
              // Rapid is a shortcut; the client's settings define the actual action
              // Just acknowledge it
              sendTo(ws, xmlTag('c', { t: '/rapid', d: targetUserId, u: userData.userId, s: '1' }));
              break;
            }

            default:
              console.log(`[WS] Unhandled <c> action type: ${actionType}`, attrs);
          }
          break;
        }

        // === TRADE PACKET (x) ===
        case 'x': {
          if (!currentRoom || !userData) break;

          // x packet can be typing indicator OR trade
          // Real xat WASM client sends /RTypeOn and /RTypeOff, custom client may send /typing
          if (attrs.t === '/typing' || attrs.t === '/typingoff' || attrs.t === '/RTypeOn' || attrs.t === '/RTypeOff') {
            // Typing indicator
            broadcastToRoom(currentRoom, xmlTag('x', {
              u: userData.userId,
              t: attrs.t,
            }), socketId);
            break;
          }

          // Trade packets — unified with REST trade API (same DB table)
          const tradeAction = attrs.t || '';
          const tradeTarget = attrs.d;

          if (tradeAction === '/trade') {
            // Initiate trade request
            if (!tradeTarget) break;
            let target = null;
            const tradeRoom = rooms.get(currentRoom);
            if (!tradeRoom) break;
            for (const [sid, u] of tradeRoom.users) {
              if (u.userId === tradeTarget) { target = u; break; }
            }
            if (!target) {
              sendSystemMsg(ws, 'User not found in this room.');
              break;
            }
            // Cancel any existing pending trades between these users
            db.prepare("UPDATE trades SET status = 'cancelled', updated_at = ? WHERE initiator_id = ? AND target_id = ? AND status = 'pending'")
              .run(Math.floor(Date.now() / 1000), userData.dbId, target.dbId);
            // Create trade record in DB
            const tradeInfo = db.prepare('INSERT INTO trades (initiator_id, target_id, room_id) VALUES (?, ?, ?)')
              .run(userData.dbId, target.dbId, currentRoom);
            // Send trade request to target with trade ID
            sendTo(target.ws, xmlTag('x', { t: '/trade', u: userData.userId, n: userData.username, tid: String(tradeInfo.lastInsertRowid) }));
            sendSystemMsg(ws, `Trade request sent to ${target.username}.`);
          } else if (tradeAction === '/tradeaccept') {
            // Accept trade — find and execute pending trade
            const initiatorId = attrs.u;
            if (!initiatorId) break;
            const pendingTrade = db.prepare(
              "SELECT * FROM trades WHERE initiator_id = ? AND target_id = ? AND status = 'pending' ORDER BY id DESC LIMIT 1"
            ).get(parseInt(initiatorId), userData.dbId);
            if (pendingTrade) {
              // Execute trade: swap xats/days from offers
              const initOffer = JSON.parse(pendingTrade.initiator_offer || '{}');
              const targetOffer = JSON.parse(pendingTrade.target_offer || '{}');
              const initXats = parseInt(initOffer.xats) || 0;
              const initDays = parseInt(initOffer.days) || 0;
              const targetXats = parseInt(targetOffer.xats) || 0;
              const targetDays = parseInt(targetOffer.days) || 0;

              if (initXats || initDays || targetXats || targetDays) {
                const trader1 = db.prepare('SELECT xats, days FROM users WHERE id = ?').get(pendingTrade.initiator_id);
                const trader2 = db.prepare('SELECT xats, days FROM users WHERE id = ?').get(pendingTrade.target_id);
                if (trader1.xats >= initXats && trader1.days >= initDays && trader2.xats >= targetXats && trader2.days >= targetDays) {
                  db.prepare('UPDATE users SET xats = xats - ? + ?, days = days - ? + ? WHERE id = ?')
                    .run(initXats, targetXats, initDays, targetDays, pendingTrade.initiator_id);
                  db.prepare('UPDATE users SET xats = xats - ? + ?, days = days - ? + ? WHERE id = ?')
                    .run(targetXats, initXats, targetDays, initDays, pendingTrade.target_id);
                }
              }
              db.prepare("UPDATE trades SET status = 'completed', updated_at = ? WHERE id = ?")
                .run(Math.floor(Date.now() / 1000), pendingTrade.id);
            }
            let initiator = null;
            const tradeRoom2 = rooms.get(currentRoom);
            if (!tradeRoom2) break;
            for (const [sid, u] of tradeRoom2.users) {
              if (u.userId === initiatorId) { initiator = u; break; }
            }
            if (initiator) {
              sendTo(initiator.ws, xmlTag('x', { t: '/tradeaccept', u: userData.userId, n: userData.username }));
            }
            sendSystemMsg(ws, 'Trade accepted!');
          } else if (tradeAction === '/tradereject') {
            const initiatorId = attrs.u;
            if (!initiatorId) break;
            // Reject pending trade in DB
            const pendingTrade = db.prepare(
              "SELECT id FROM trades WHERE initiator_id = ? AND target_id = ? AND status = 'pending' ORDER BY id DESC LIMIT 1"
            ).get(parseInt(initiatorId), userData.dbId);
            if (pendingTrade) {
              db.prepare("UPDATE trades SET status = 'rejected', updated_at = ? WHERE id = ?")
                .run(Math.floor(Date.now() / 1000), pendingTrade.id);
            }
            let initiator = null;
            const tradeRoom3 = rooms.get(currentRoom);
            if (!tradeRoom3) break;
            for (const [sid, u] of tradeRoom3.users) {
              if (u.userId === initiatorId) { initiator = u; break; }
            }
            if (initiator) {
              sendTo(initiator.ws, xmlTag('x', { t: '/tradereject', u: userData.userId, n: userData.username }));
            }
            sendSystemMsg(ws, 'Trade rejected.');
          } else if (tradeAction === '/tradeoffer') {
            // Update trade offer via WS (mirrors REST /api/trades/:id/offer)
            const targetUserId = attrs.u;
            const offerXats = parseInt(attrs.xats) || 0;
            const offerDays = parseInt(attrs.days) || 0;
            if (!targetUserId) break;
            const pendingTrade = db.prepare(
              "SELECT * FROM trades WHERE ((initiator_id = ? AND target_id = ?) OR (initiator_id = ? AND target_id = ?)) AND status = 'pending' ORDER BY id DESC LIMIT 1"
            ).get(userData.dbId, parseInt(targetUserId), parseInt(targetUserId), userData.dbId);
            if (pendingTrade) {
              const offer = JSON.stringify({ xats: offerXats, days: offerDays });
              if (userData.dbId === pendingTrade.initiator_id) {
                db.prepare('UPDATE trades SET initiator_offer = ?, updated_at = ? WHERE id = ?')
                  .run(offer, Math.floor(Date.now() / 1000), pendingTrade.id);
              } else {
                db.prepare('UPDATE trades SET target_offer = ?, updated_at = ? WHERE id = ?')
                  .run(offer, Math.floor(Date.now() / 1000), pendingTrade.id);
              }
            }
          } else if (tradeAction === 'on' || tradeAction === 'off') {
            // === POWER ACTIVATION / DEACTIVATION ===
            // Client sends: <x i="powerId" t="on"|"off" />
            const powerIdRaw = parseInt(attrs.i);
            if (isNaN(powerIdRaw)) break;

            // Verify ownership before allowing activation
            if (!hasPower(userData.dbId, powerIdRaw)) {
              sendSystemMsg(ws, 'You do not own that power.');
              break;
            }

            if (tradeAction === 'on') {
              db.prepare('UPDATE user_powers SET equipped = 1 WHERE user_id = ? AND power_id = ?')
                .run(userData.dbId, powerIdRaw);
              if (!userData.activePowers) userData.activePowers = new Set();
              userData.activePowers.add(powerIdRaw);
            } else {
              db.prepare('UPDATE user_powers SET equipped = 0 WHERE user_id = ? AND power_id = ?')
                .run(userData.dbId, powerIdRaw);
              if (userData.activePowers) userData.activePowers.delete(powerIdRaw);
            }

            // Refresh bitmasks so the updated state is reflected in future user packets
            userData.powerMasks = getUserPowerBitmasks(userData.dbId);

            // Broadcast updated user packet so all room members see the power state change
            broadcastToRoom(currentRoom, xmlTag('u', buildUserPacket(userData)));

            // Echo back the action so all clients (including sender) can update local state
            broadcastToRoom(currentRoom, xmlTag('x', { u: userData.userId, i: String(powerIdRaw), t: tradeAction }));

          } else if (tradeAction === 'gift') {
            // === POWER GIFTING ===
            // Client sends: <x i="powerId" t="gift" d="targetDbId" />
            const giftPowerId = parseInt(attrs.i);
            const giftTargetDbId = parseInt(attrs.d);

            if (isNaN(giftPowerId) || isNaN(giftTargetDbId)) {
              sendSystemMsg(ws, 'Invalid gift request.');
              break;
            }

            // Check that sender owns at least one of this power
            const senderOwned = db.prepare(
              'SELECT count FROM user_powers WHERE user_id = ? AND power_id = ? AND count > 0'
            ).get(userData.dbId, giftPowerId);
            if (!senderOwned) {
              sendSystemMsg(ws, 'You do not own that power.');
              break;
            }

            // Verify recipient exists
            const recipientUser = db.prepare('SELECT id, username FROM users WHERE id = ?').get(giftTargetDbId);
            if (!recipientUser) {
              sendSystemMsg(ws, 'Recipient user not found.');
              break;
            }

            // Prevent gifting to yourself
            if (giftTargetDbId === userData.dbId) {
              sendSystemMsg(ws, 'You cannot gift a power to yourself.');
              break;
            }

            // Decrement sender's count (remove row when count reaches 0)
            if (senderOwned.count <= 1) {
              db.prepare('DELETE FROM user_powers WHERE user_id = ? AND power_id = ?')
                .run(userData.dbId, giftPowerId);
            } else {
              db.prepare('UPDATE user_powers SET count = count - 1 WHERE user_id = ? AND power_id = ?')
                .run(userData.dbId, giftPowerId);
            }

            // Refresh sender's power bitmasks and broadcast updated user packet
            userData.powerMasks = getUserPowerBitmasks(userData.dbId);
            broadcastToRoom(currentRoom, xmlTag('u', buildUserPacket(userData)));

            // Add power to recipient (increment count if already owned, else insert)
            const recipOwned = db.prepare(
              'SELECT id FROM user_powers WHERE user_id = ? AND power_id = ?'
            ).get(giftTargetDbId, giftPowerId);
            if (recipOwned) {
              db.prepare('UPDATE user_powers SET count = count + 1 WHERE user_id = ? AND power_id = ?')
                .run(giftTargetDbId, giftPowerId);
            } else {
              db.prepare('INSERT INTO user_powers (user_id, power_id, count, equipped) VALUES (?, ?, 1, 0)')
                .run(giftTargetDbId, giftPowerId);
            }

            sendSystemMsg(ws, 'Power gifted to ' + recipientUser.username + ' successfully!');
            console.log('[Gift] ' + userData.username + ' gifted power ' + giftPowerId + ' to ' + recipientUser.username);

            // Notify recipient if they are currently online
            const recipWs = findOnlineUserWsByDbId(giftTargetDbId);
            if (recipWs) {
              sendTo(recipWs, xmlTag('x', {
                u: userData.userId,
                i: String(giftPowerId),
                t: 'gifted',
                n: userData.username,
              }));
            }
          }
          break;
        }

        // === FRIEND LIST / FRIEND ACTIONS (f packet) ===
        case 'f': {
          if (!userData || !userData.dbId) break;
          const fAction = attrs.t; // 'add', 'accept', 'decline', 'remove', or absent (list request)

          if (!fAction) {
            // No action = client requesting friend list
            const friends = db.prepare(`
              SELECT u.id, u.username, u.avatar, u.rank FROM friends f
              JOIN users u ON f.friend_id = u.id
              WHERE f.user_id = ? AND f.status = 'accepted'
            `).all(userData.dbId);

            for (const friend of friends) {
              const isOnline = userIdToRoom.has(String(friend.id));
              sendTo(ws, xmlTag('f', {
                u: String(friend.id),
                n: friend.username,
                a: friend.avatar || '',
                s: isOnline ? '1' : '0',
              }));
            }
          } else {
            // Friend action
            const targetId = parseInt(attrs.u);
            if (!targetId) break;

            if (fAction === 'add') {
              // Send friend request (pending)
              db.prepare('INSERT OR IGNORE INTO friends (user_id, friend_id, status) VALUES (?, ?, ?)').run(userData.dbId, targetId, 'pending');
              // Notify target if online
              const targetWs = findOnlineUserWs(targetId);
              if (targetWs) {
                sendTo(targetWs, xmlTag('f', { u: String(userData.userId), n: userData.username, t: 'request' }));
              }
              sendTo(ws, xmlTag('f', { u: String(targetId), t: 'sent' }));
            } else if (fAction === 'accept') {
              // Accept incoming request: update their pending row to accepted and create reverse row
              db.prepare("UPDATE friends SET status = 'accepted' WHERE user_id = ? AND friend_id = ? AND status = 'pending'").run(targetId, userData.dbId);
              db.prepare('INSERT OR REPLACE INTO friends (user_id, friend_id, status) VALUES (?, ?, ?)').run(userData.dbId, targetId, 'accepted');
              // Notify requester if online
              const targetWs = findOnlineUserWs(targetId);
              if (targetWs) {
                sendTo(targetWs, xmlTag('f', { u: String(userData.userId), n: userData.username, t: 'accepted', s: '1' }));
              }
              // Confirm to accepter with friend info
              const targetUser = db.prepare('SELECT id, username, avatar FROM users WHERE id = ?').get(targetId);
              if (targetUser) {
                const isOnline = userIdToRoom.has(String(targetId));
                sendTo(ws, xmlTag('f', { u: String(targetId), n: targetUser.username, a: targetUser.avatar || '', t: 'accepted', s: isOnline ? '1' : '0' }));
              }
            } else if (fAction === 'decline') {
              // Delete the pending request
              db.prepare("DELETE FROM friends WHERE user_id = ? AND friend_id = ? AND status = 'pending'").run(targetId, userData.dbId);
              sendTo(ws, xmlTag('f', { u: String(targetId), t: 'declined' }));
            } else if (fAction === 'remove') {
              // Remove friendship both ways
              db.prepare('DELETE FROM friends WHERE (user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?)').run(userData.dbId, targetId, targetId, userData.dbId);
              // Notify removed friend if online
              const targetWs = findOnlineUserWs(targetId);
              if (targetWs) {
                sendTo(targetWs, xmlTag('f', { u: String(userData.userId), t: 'removed' }));
              }
              sendTo(ws, xmlTag('f', { u: String(targetId), t: 'removed' }));
            }
          }
          break;
        }

        // === BLOCK/IGNORE (b packet) ===
        case 'b': {
          if (!userData || !userData.dbId) break;
          const blockTarget = attrs.u || attrs.d;
          const blockAction = attrs.t || 'add'; // 'add' or 'remove'
          if (!blockTarget) break;
          const targetDbId = parseInt(blockTarget);
          if (isNaN(targetDbId)) break;

          if (blockAction === 'remove' || blockAction === 'unblock') {
            db.prepare('DELETE FROM ignores WHERE user_id = ? AND ignored_id = ?').run(userData.dbId, targetDbId);
            sendTo(ws, xmlTag('b', { u: blockTarget, t: 'removed' }));
          } else {
            try {
              db.prepare('INSERT OR IGNORE INTO ignores (user_id, ignored_id) VALUES (?, ?)').run(userData.dbId, targetDbId);
            } catch(e) {}
            sendTo(ws, xmlTag('b', { u: blockTarget, t: 'added' }));
          }
          break;
        }

        // === GUESTBOOK (gb packet) ===
        case 'gb': {
          if (!userData) break;
          const targetGbId = attrs.u || userData.userId;
          const gbAction = attrs.t;

          if (gbAction === 'write' && attrs.m) {
            // Rate limit: max 1 guestbook write per 10 seconds per user
            const gbKey = 'gb_' + userData.dbId;
            if (!rateLimit(gbKey, 1, 10000)) {
              sendSystemMsg(ws, 'Please wait before writing another guestbook entry.');
              break;
            }
            // Write guestbook entry
            db.prepare('INSERT INTO guestbook (owner_id, author_id, author_name, message) VALUES (?, ?, ?, ?)')
              .run(parseInt(targetGbId), userData.dbId, userData.username, (attrs.m || '').slice(0, 500));
            sendSystemMsg(ws, 'Guestbook entry added.');
          } else {
            // Read guestbook
            const entries = db.prepare('SELECT * FROM guestbook WHERE owner_id = ? ORDER BY created_at DESC LIMIT 20')
              .all(parseInt(targetGbId));
            for (const entry of entries) {
              sendTo(ws, xmlTag('gb', {
                u: String(entry.owner_id),
                a: String(entry.author_id),
                n: entry.author_name,
                m: entry.message,
                t: String(entry.created_at),
              }));
            }
          }
          break;
        }

        // === USER SEARCH (us packet) ===
        case 'us': {
          if (!userData) break;
          const searchQuery = (attrs.n || '').replace(/[%_]/g, '');
          if (searchQuery.length < 2) break;
          const results = db.prepare("SELECT id, username, rank, avatar FROM users WHERE username LIKE ? AND password_hash != 'guest:no-password' LIMIT 10")
            .all('%' + searchQuery + '%');
          for (const user of results) {
            sendTo(ws, xmlTag('us', {
              u: String(user.id),
              n: user.username,
              a: user.avatar || '',
              f: String(buildFFlags({ rank: user.rank, registered: true })),
              q: rankToQ(user.rank) || undefined,
            }));
          }
          break;
        }

        // === HEARTBEAT (h packet) ===
        case 'h': {
          sendTo(ws, xmlTag('h', { t: String(Math.floor(Date.now() / 1000)) }));
          if (userData) userData.lastActivity = Date.now();
          break;
        }

        // === KEEPALIVE / CONNECTION RESET (C packet) ===
        // Real xat client sends <C /> as a keepalive signal
        // After receiving it, the client typically re-initiates the y→j2 handshake
        case 'C': {
          if (userData) userData.lastActivity = Date.now();
          // Acknowledge — the client will follow up with a new <y> packet
          break;
        }

        // === VERSION (v packet) ===
        case 'v': {
          // Client sends version info. Acknowledge it.
          if (userData) userData.clientVersion = attrs.n || attrs.v || '';
          sendTo(ws, xmlTag('v', { n: attrs.n || '0' }));
          break;
        }

        // === IDLE (idle packet) ===
        case 'idle': {
          if (!currentRoom || !userData) break;
          userData.idle = true;
          broadcastToRoom(currentRoom, xmlTag('idle', { u: userData.userId }));
          break;
        }

        // === LOGOUT (logout packet) ===
        case 'logout': {
          // Graceful disconnect
          console.log(`[WS] ${userData ? userData.username : 'Unknown'} sent logout`);
          ws.close();
          break;
        }

        // === REDIRECT/BOOT (q packet) ===
        case 'q': {
          if (!currentRoom || !userData) break;
          // q packet can redirect user to another room or boot them
          // attrs.d = target userId, attrs.r = target room, attrs.p2 = reason
          const qTarget = attrs.d;
          if (!qTarget) break;
          if (userData.rank < RANK.MOD) break;

          const room = rooms.get(currentRoom);
          if (!room) break;
          for (const [sid, user] of room.users) {
            if (user.userId === qTarget && user.rank < userData.rank) {
              // Send redirect packet to target
              sendTo(user.ws, xmlTag('q', {
                r: attrs.r || '',       // room to redirect to
                d2: userData.userId,    // who booted them
                p2: attrs.p2 || '',     // reason
              }));
              user.ws.close();
              console.log(`[Mod] ${userData.username} booted ${user.username} to room ${attrs.r || 'disconnect'}`);
              break;
            }
          }
          break;
        }

        // === ANIMATED INTERACTION (a packet) — kiss/hug/gift ===
        case 'a': {
          if (!currentRoom || !userData) break;
          // Forward the interaction to the target user and broadcast to pool
          const aTarget = attrs.d || attrs.u;
          const aPkt = { ...attrs, u: userData.userId };
          if (aTarget) {
            // Send to specific target
            const targetLoc = userIdToRoom.get(aTarget);
            if (targetLoc && targetLoc.roomId === currentRoom) {
              const targetRoom = rooms.get(currentRoom);
              if (targetRoom) {
                const targetUser = targetRoom.users.get(targetLoc.socketId);
                if (targetUser) sendTo(targetUser.ws, xmlTag('a', aPkt));
              }
            }
          }
          // Also broadcast to pool so everyone sees the animation
          broadcastToPool(currentRoom, userData.pool, xmlTag('a', aPkt), socketId);
          break;
        }

        // === POOL SWITCH (w packet) ===
        case 'w': {
          if (!currentRoom || !userData) break;
          const newPool = parseInt(attrs.v) || 0;
          const oldPool = userData.pool;
          if (newPool === oldPool) break;

          // Send <l> (leave) to users in old pool
          broadcastToPool(currentRoom, oldPool, xmlTag('l', { u: userData.userId }), socketId);

          userData.pool = newPool;

          // Send <u> (user join) to users in new pool
          broadcastToPool(currentRoom, newPool, xmlTag('u', buildUserPacket(userData)), socketId);

          // Confirm pool switch — real xat format: 4 space-separated values
          sendTo(ws, xmlTag('w', { v: `${newPool} 0 1 2` }));

          // Send users in new pool
          const poolRoom = rooms.get(currentRoom);
          if (poolRoom) {
            for (const [sid, u] of poolRoom.users) {
              if (u.pool === newPool && sid !== socketId) {
                sendTo(ws, xmlTag('u', buildUserPacket(u)));
              }
            }
          }

          // Send recent messages from new pool (real format with o, E, i attrs)
          const poolMsgs = db.prepare('SELECT * FROM messages WHERE room_id = ? AND pool = ? ORDER BY id DESC LIMIT 15').all(currentRoom, newPool);
          for (const msg of poolMsgs.reverse()) {
            const poolHistUserId = msg.pool > 0 ? `${msg.user_id}_${msg.pool}` : String(msg.user_id);
            const poolMsgAttrs = {
              t: msg.text,
              u: poolHistUserId,
              E: String(msg.created_at || Math.floor(Date.now() / 1000)),
              i: String(msg.id),
              s: '1',
            };
            if (msg.user_id && !String(msg.text).startsWith('/s ')) {
              const oData = JSON.stringify({ isTranslated: '', msgId: msg.msg_id || String(msg.id), type: 'msg' });
              poolMsgAttrs.o = Buffer.from(oData).toString('base64');
            }
            sendTo(ws, xmlTag('m', poolMsgAttrs));
          }

          console.log(`[WS] ${userData.username} switched to pool ${newPool} in ${currentRoom}`);
          break;
        }

        // === MESSAGE EDIT (em packet) ===
        case 'em': {
          if (!currentRoom || !userData) break;
          const newText = attrs.t || '';
          const msgId = attrs.i || '';
          if (!newText || !msgId) break;

          // Verify message belongs to sender and is within edit window (120 seconds)
          const msgRow = db.prepare('SELECT * FROM messages WHERE msg_id = ? AND room_id = ?').get(msgId, currentRoom);
          if (!msgRow) {
            sendSystemMsg(ws, 'Message not found.');
            break;
          }
          if (String(msgRow.user_id) !== String(userData.userId)) {
            sendSystemMsg(ws, 'You can only edit your own messages.');
            break;
          }
          const editWindow = 120; // seconds
          const msgAge = Math.floor(Date.now() / 1000) - (msgRow.created_at || 0);
          if (msgAge > editWindow) {
            sendSystemMsg(ws, 'Message can no longer be edited (120 second limit).');
            break;
          }

          // Update in DB
          db.prepare('UPDATE messages SET text = ?, edited = 1 WHERE msg_id = ? AND room_id = ?').run(newText, msgId, currentRoom);

          // Broadcast edit to all users in room
          broadcastToRoom(currentRoom, xmlTag('em', {
            t: newText,
            i: msgId,
            u: userData.userId,
            E: String(Math.floor(Date.now() / 1000)),
          }));
          console.log(`[Edit] ${userData.username} edited message ${msgId}`);
          break;
        }

        // === MESSAGE DELETE (dm packet) ===
        case 'dm': {
          if (!currentRoom || !userData) break;
          const dmMsgId = attrs.i || '';
          if (!dmMsgId) break;

          // Verify message belongs to sender OR sender is mod+
          const dmMsgRow = db.prepare('SELECT * FROM messages WHERE msg_id = ? AND room_id = ?').get(dmMsgId, currentRoom);
          if (!dmMsgRow) break;

          const isOwn = String(dmMsgRow.user_id) === String(userData.userId);
          const isMod = userData.rank >= RANK.MOD;
          if (!isOwn && !isMod) {
            sendSystemMsg(ws, 'You can only delete your own messages.');
            break;
          }

          // Delete from DB
          db.prepare('DELETE FROM messages WHERE msg_id = ? AND room_id = ?').run(dmMsgId, currentRoom);

          // Broadcast delete to all users in room
          broadcastToRoom(currentRoom, xmlTag('dm', {
            i: dmMsgId,
            u: userData.userId,
          }));
          console.log(`[Delete] ${userData.username} deleted message ${dmMsgId}`);
          break;
        }

        // === REACTION (rc packet) ===
        case 'rc': {
          if (!currentRoom || !userData) break;
          const rcMsgId = attrs.i || '';
          const reaction = attrs.r || '';
          const reactionId = attrs.rid || '';
          const isDel = attrs.del === '1';

          if (!rcMsgId) break;

          if (isDel) {
            // Remove reaction
            try {
              db.prepare('DELETE FROM reactions WHERE reaction_id = ? AND user_id = ? AND room_id = ?').run(reactionId, userData.dbId, currentRoom);
            } catch(e) {}
            broadcastToRoom(currentRoom, xmlTag('rc', {
              i: rcMsgId,
              u: userData.userId,
              n: userData.username,
              rid: reactionId,
              del: '1',
            }));
          } else {
            // Add reaction
            if (!reaction) break;
            try {
              db.prepare('INSERT INTO reactions (reaction_id, msg_id, room_id, user_id, username, reaction, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
                .run(reactionId, rcMsgId, currentRoom, userData.dbId, userData.username, reaction, Math.floor(Date.now() / 1000));
            } catch(e) {}
            broadcastToRoom(currentRoom, xmlTag('rc', {
              i: rcMsgId,
              r: reaction,
              u: userData.userId,
              n: userData.username,
              rid: reactionId,
            }));
          }
          break;
        }

        // === MACRO SAVE (mc packet) ===
        case 'mc': {
          if (!userData || !userData.dbId) break;
          const macroName = attrs.n || '';
          const macroValue = attrs.v || '';

          // Load existing macros, update, save back
          try {
            const row = db.prepare('SELECT macros FROM users WHERE id = ?').get(userData.dbId);
            let macros = {};
            try { macros = JSON.parse(row?.macros || '{}'); } catch(e) {}
            if (macroName === '' && macroValue === '') {
              // Clear all macros
              macros = {};
            } else if (macroValue === '') {
              delete macros[macroName];
            } else {
              macros[macroName] = macroValue;
            }
            db.prepare('UPDATE users SET macros = ? WHERE id = ?').run(JSON.stringify(macros), userData.dbId);
          } catch(e) {
            console.error('[Macro] Error saving macro:', e.message);
          }
          // Acknowledge
          sendTo(ws, xmlTag('mc', { n: macroName, v: macroValue, s: '1' }));
          break;
        }

        // === HUG/KISS/GIFT (hg packet) ===
        case 'hg': {
          if (!currentRoom || !userData) break;
          const targetId = attrs.d;
          const giftType = attrs.g || 'hug'; // hug, kiss, bear, smooch, etc.
          const smiley = attrs.s || '(hug)';
          if (!targetId) break;

          // Broadcast to entire room so everyone sees the animation
          broadcastToRoom(currentRoom, xmlTag('hg', {
            u: String(userData.userId),
            n: userData.username,
            d: targetId,
            g: giftType,
            s: smiley,
          }));
          console.log(`[Hug] ${userData.username} sent ${giftType} to user ${targetId}`);
          break;
        }

        // === TRADE (tr packet) ===
        case 'tr': {
          if (!currentRoom || !userData) break;
          const action = attrs.a || '';

          if (action === 'offer') {
            const receiverId = parseInt(attrs.d);
            const offerXats = Math.max(0, parseInt(attrs.ox) || 0);
            const offerDays = Math.max(0, parseInt(attrs.od) || 0);
            const offerPowers = attrs.op || '[]';
            const requestXats = Math.max(0, parseInt(attrs.rx) || 0);
            const requestDays = Math.max(0, parseInt(attrs.rd) || 0);
            const requestPowers = attrs.rp || '[]';

            if (!receiverId) break;

            const senderUser = db.prepare('SELECT xats, days FROM users WHERE id = ?').get(userData.dbId);
            if (!senderUser) break;
            if (senderUser.xats < offerXats) { sendSystemMsg(ws, 'Insufficient xats for trade offer.'); break; }
            if (senderUser.days < offerDays) { sendSystemMsg(ws, 'Insufficient days for trade offer.'); break; }

            let offerPowersList = [];
            try { offerPowersList = JSON.parse(offerPowers); } catch(e) {}
            for (const pid of offerPowersList) {
              const owned = db.prepare('SELECT id FROM user_powers WHERE user_id = ? AND power_id = ?').get(userData.dbId, pid);
              if (!owned) { sendSystemMsg(ws, 'You do not own power ID ' + pid); break; }
            }

            if (offerXats > 0) db.prepare('UPDATE users SET xats = xats - ? WHERE id = ?').run(offerXats, userData.dbId);
            if (offerDays > 0) db.prepare('UPDATE users SET days = days - ? WHERE id = ?').run(offerDays, userData.dbId);
            for (const pid of offerPowersList) {
              const delRow = db.prepare('SELECT id FROM user_powers WHERE user_id = ? AND power_id = ? LIMIT 1').get(userData.dbId, pid);
              if (delRow) db.prepare('DELETE FROM user_powers WHERE id = ?').run(delRow.id);
            }

            const trInfo = db.prepare('INSERT INTO tr_trades (sender_id, receiver_id, offer_xats, offer_days, offer_powers, request_xats, request_days, request_powers) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
              .run(userData.dbId, receiverId, offerXats, offerDays, JSON.stringify(offerPowersList), requestXats, requestDays, requestPowers);

            const receiverWs = findOnlineUserWs(receiverId);
            if (receiverWs) {
              sendTo(receiverWs, xmlTag('tr', {
                a: 'incoming',
                id: String(trInfo.lastInsertRowid),
                from: userData.username,
                fromId: String(userData.userId),
                ox: String(offerXats), od: String(offerDays), op: JSON.stringify(offerPowersList),
                rx: String(requestXats), rd: String(requestDays), rp: requestPowers,
              }));
            }
            sendTo(ws, xmlTag('tr', { a: 'sent', id: String(trInfo.lastInsertRowid) }));
            break;
          }

          if (action === 'accept') {
            const tradeId = parseInt(attrs.id);
            const trade = db.prepare("SELECT * FROM tr_trades WHERE id = ? AND receiver_id = ? AND status = 'pending'").get(tradeId, userData.dbId);
            if (!trade) { sendSystemMsg(ws, 'Trade not found or already resolved.'); break; }

            const receiverUser = db.prepare('SELECT xats, days FROM users WHERE id = ?').get(userData.dbId);
            if (receiverUser.xats < trade.request_xats) { sendSystemMsg(ws, 'Insufficient xats.'); break; }
            if (receiverUser.days < trade.request_days) { sendSystemMsg(ws, 'Insufficient days.'); break; }

            let requestPowersList = [];
            try { requestPowersList = JSON.parse(trade.request_powers); } catch(e) {}
            for (const pid of requestPowersList) {
              const owned = db.prepare('SELECT id FROM user_powers WHERE user_id = ? AND power_id = ?').get(userData.dbId, pid);
              if (!owned) { sendSystemMsg(ws, 'You do not own required power.'); break; }
            }

            // Wrap entire trade in a transaction for atomicity
            const executeTrade = db.transaction(() => {
              if (trade.offer_xats > 0) db.prepare('UPDATE users SET xats = xats + ? WHERE id = ?').run(trade.offer_xats, userData.dbId);
              if (trade.offer_days > 0) db.prepare('UPDATE users SET days = days + ? WHERE id = ?').run(trade.offer_days, userData.dbId);
              let offerPowersList = [];
              try { offerPowersList = JSON.parse(trade.offer_powers); } catch(e) {}
              for (const pid of offerPowersList) {
                db.prepare('INSERT INTO user_powers (user_id, power_id, count) VALUES (?, ?, 1) ON CONFLICT(user_id, power_id) DO UPDATE SET count = count + 1').run(userData.dbId, pid);
              }

              if (trade.request_xats > 0) {
                db.prepare('UPDATE users SET xats = xats - ? WHERE id = ?').run(trade.request_xats, userData.dbId);
                db.prepare('UPDATE users SET xats = xats + ? WHERE id = ?').run(trade.request_xats, trade.sender_id);
              }
              if (trade.request_days > 0) {
                db.prepare('UPDATE users SET days = days - ? WHERE id = ?').run(trade.request_days, userData.dbId);
                db.prepare('UPDATE users SET days = days + ? WHERE id = ?').run(trade.request_days, trade.sender_id);
              }
              for (const pid of requestPowersList) {
                const powerRow = db.prepare('SELECT count FROM user_powers WHERE user_id = ? AND power_id = ?').get(userData.dbId, pid);
                if (powerRow && powerRow.count > 1) {
                  db.prepare('UPDATE user_powers SET count = count - 1 WHERE user_id = ? AND power_id = ?').run(userData.dbId, pid);
                } else {
                  db.prepare('DELETE FROM user_powers WHERE user_id = ? AND power_id = ?').run(userData.dbId, pid);
                }
                db.prepare('INSERT INTO user_powers (user_id, power_id, count) VALUES (?, ?, 1) ON CONFLICT(user_id, power_id) DO UPDATE SET count = count + 1').run(trade.sender_id, pid);
              }

              db.prepare("UPDATE tr_trades SET status = 'completed' WHERE id = ?").run(tradeId);
            });

            try {
              executeTrade();
            } catch (tradeErr) {
              sendSystemMsg(ws, 'Trade failed: ' + tradeErr.message);
              break;
            }

            const senderWs = findOnlineUserWs(trade.sender_id);
            if (senderWs) sendTo(senderWs, xmlTag('tr', { a: 'accepted', id: String(tradeId) }));
            sendTo(ws, xmlTag('tr', { a: 'complete', id: String(tradeId) }));
            break;
          }

          if (action === 'decline') {
            const tradeId = parseInt(attrs.id);
            const trade = db.prepare("SELECT * FROM tr_trades WHERE id = ? AND receiver_id = ? AND status = 'pending'").get(tradeId, userData.dbId);
            if (!trade) break;

            const executeDecline = db.transaction(() => {
              if (trade.offer_xats > 0) db.prepare('UPDATE users SET xats = xats + ? WHERE id = ?').run(trade.offer_xats, trade.sender_id);
              if (trade.offer_days > 0) db.prepare('UPDATE users SET days = days + ? WHERE id = ?').run(trade.offer_days, trade.sender_id);
              let offerPowersList = [];
              try { offerPowersList = JSON.parse(trade.offer_powers); } catch(e) {}
              for (const pid of offerPowersList) {
                db.prepare('INSERT INTO user_powers (user_id, power_id, count) VALUES (?, ?, 1) ON CONFLICT(user_id, power_id) DO UPDATE SET count = count + 1').run(trade.sender_id, pid);
              }
              db.prepare("UPDATE tr_trades SET status = 'declined' WHERE id = ?").run(tradeId);
            });
            executeDecline();

            const senderWs = findOnlineUserWs(trade.sender_id);
            if (senderWs) sendTo(senderWs, xmlTag('tr', { a: 'declined', id: String(tradeId) }));
            break;
          }

          if (action === 'cancel') {
            const tradeId = parseInt(attrs.id);
            const trade = db.prepare("SELECT * FROM tr_trades WHERE id = ? AND sender_id = ? AND status = 'pending'").get(tradeId, userData.dbId);
            if (!trade) break;

            const executeCancel = db.transaction(() => {
              if (trade.offer_xats > 0) db.prepare('UPDATE users SET xats = xats + ? WHERE id = ?').run(trade.offer_xats, userData.dbId);
              if (trade.offer_days > 0) db.prepare('UPDATE users SET days = days + ? WHERE id = ?').run(trade.offer_days, userData.dbId);
              let offerPowersList = [];
              try { offerPowersList = JSON.parse(trade.offer_powers); } catch(e) {}
              for (const pid of offerPowersList) {
                db.prepare('INSERT INTO user_powers (user_id, power_id, count) VALUES (?, ?, 1) ON CONFLICT(user_id, power_id) DO UPDATE SET count = count + 1').run(userData.dbId, pid);
              }
              db.prepare("UPDATE tr_trades SET status = 'cancelled' WHERE id = ?").run(tradeId);
            });
            executeCancel();
            break;
          }
          break;
        }

        // === PROFILE SAVE (xs packet) ===
        case 'xs': {
          if (!userData || !userData.dbId) break;
          const newName = attrs.n;
          const newAvatar = attrs.a;
          const newStatus = attrs.s;
          const newHomepage = attrs.h;

          // Update DB
          const xsUpdates = [];
          const xsParams = [];
          if (newName !== undefined && newName !== '') {
            // Check username uniqueness
            const existingUser = db.prepare('SELECT id FROM users WHERE LOWER(username) = LOWER(?) AND id != ?').get(newName, userData.dbId);
            if (existingUser) {
              sendSystemMsg(ws, 'Username "' + newName + '" is already taken.');
              break;
            }
            xsUpdates.push('username = ?');
            xsParams.push(newName);
            userData.username = newName;
          }
          if (newAvatar !== undefined) {
            xsUpdates.push('avatar = ?');
            xsParams.push(newAvatar);
            userData.avatar = newAvatar;
          }
          if (newStatus !== undefined) {
            xsUpdates.push('status = ?');
            xsParams.push(newStatus);
            userData.status = newStatus;
          }
          if (newHomepage !== undefined) {
            xsUpdates.push('homepage = ?');
            xsParams.push(newHomepage);
            userData.homepage = newHomepage;
          }
          // Name styling fields
          if (attrs.nc !== undefined) { xsUpdates.push('namecolor = ?'); xsParams.push(attrs.nc); userData.namecolor = attrs.nc; }
          if (attrs.ng !== undefined) { xsUpdates.push('nameglow = ?'); xsParams.push(attrs.ng); userData.nameglow = attrs.ng; }
          if (attrs.nf !== undefined) { xsUpdates.push('namefont = ?'); xsParams.push(attrs.nf); userData.namefont = attrs.nf; }
          if (attrs.ngrad !== undefined) { xsUpdates.push('namegrad = ?'); xsParams.push(attrs.ngrad); userData.namegrad = attrs.ngrad; }

          if (xsUpdates.length > 0) {
            xsParams.push(userData.dbId);
            try {
              db.prepare('UPDATE users SET ' + xsUpdates.join(', ') + ' WHERE id = ?').run(...xsParams);
            } catch(e) {
              console.error('[Profile] Error saving profile:', e.message);
            }

            // Re-broadcast updated user packet to room
            if (currentRoom) {
              broadcastToRoom(currentRoom, xmlTag('u', buildUserPacket(userData)));
            }
          }
          // Acknowledge save
          sendTo(ws, xmlTag('xs', { s: '1' }));
          console.log(`[Profile] ${userData.username} updated profile`);
          break;
        }

        // === POWER TOGGLE (sp packet) ===
        case 'sp': {
          if (!userData || !userData.dbId) break;
          const powerId = parseInt(attrs.p);
          const powerVal = parseInt(attrs.v) || 0;
          if (isNaN(powerId)) break;

          // Update disabled powers in DB (sp toggles disabled mask, NOT owned powers)
          try {
            const row = db.prepare('SELECT powers_disabled FROM users WHERE id = ?').get(userData.dbId);
            let disabled = [];
            try { disabled = JSON.parse(row?.powers_disabled || '[]'); } catch(e) {}

            const slotIndex = powerId >> 5;
            const bitIndex = powerId % 32;

            // Ensure array is long enough
            while (disabled.length <= slotIndex) disabled.push(0);

            if (powerVal) {
              // Value 1 = turn OFF (disable) the power
              disabled[slotIndex] = disabled[slotIndex] | (1 << bitIndex);
            } else {
              // Value 0 = turn ON (enable) the power
              disabled[slotIndex] = disabled[slotIndex] & ~(1 << bitIndex);
            }

            db.prepare('UPDATE users SET powers_disabled = ? WHERE id = ?').run(JSON.stringify(disabled), userData.dbId);
            userData.powersDisabled = JSON.stringify(disabled);
          } catch(e) {
            console.error('[Power] Error toggling power:', e.message);
          }
          // Acknowledge
          sendTo(ws, xmlTag('sp', { p: attrs.p, v: attrs.v, s: '1' }));
          break;
        }

        // === ASSIGN GROUP POWER (ap packet) ===
        case 'ap': {
          if (!userData || !currentRoom) break;
          if (userData.rank < RANK.OWNER) {
            sendSystemMsg(ws, 'Only owners can assign group powers.');
            break;
          }
          const apPowerId = parseInt(attrs.p);
          if (isNaN(apPowerId)) break;

          const grp = db.prepare('SELECT id, group_powers FROM groups WHERE name = ? COLLATE NOCASE').get(currentRoom);
          if (!grp) break;

          let gpArr = (grp.group_powers || '0|0|0|0|0|0|0|0|0|0|0').split('|').map(Number);
          const apSlot = apPowerId >> 5;
          const apBit = apPowerId % 32;
          while (gpArr.length <= apSlot) gpArr.push(0);

          // Toggle the bit
          if (gpArr[apSlot] & (1 << apBit)) {
            gpArr[apSlot] = gpArr[apSlot] & ~(1 << apBit);
          } else {
            gpArr[apSlot] = gpArr[apSlot] | (1 << apBit);
          }

          const newGroupPowers = gpArr.join('|');
          db.prepare('UPDATE groups SET group_powers = ? WHERE id = ?').run(newGroupPowers, grp.id);

          // Re-broadcast gp packet with updated group powers
          broadcastToRoom(currentRoom, xmlTag('gp', { p: newGroupPowers + '|' }));
          sendTo(ws, xmlTag('ap', { p: attrs.p, s: '1' }));
          console.log('[Power] Group power ' + apPowerId + ' toggled by ' + userData.username);
          break;
        }

        // === GAME (gm packet) ===
        case 'game': {
          if (!currentRoom || !userData) break;
          const gameAction = attrs.a || '';

          if (gameAction === 'create') {
            const gameType = attrs.g || 'tictactoe';
            const info = db.prepare('INSERT INTO game_sessions (room_id, game_type, host_id, players) VALUES (?, ?, ?, ?)')
              .run(currentRoom, gameType, userData.dbId, JSON.stringify([userData.dbId]));
            const gameId = info.lastInsertRowid;

            broadcastToRoom(currentRoom, xmlTag('game', {
              a: 'created',
              id: String(gameId),
              g: gameType,
              host: userData.username,
              hostId: String(userData.userId),
            }));
            break;
          }

          if (gameAction === 'join') {
            const gameId = parseInt(attrs.id);
            const game = db.prepare("SELECT * FROM game_sessions WHERE id = ? AND status = 'waiting'").get(gameId);
            if (!game) { sendSystemMsg(ws, 'Game not found or already started.'); break; }

            let players = JSON.parse(game.players || '[]');
            if (players.includes(userData.dbId)) { sendSystemMsg(ws, 'Already in this game.'); break; }
            if (players.length >= 4) { sendSystemMsg(ws, 'Game is full.'); break; }

            players.push(userData.dbId);
            db.prepare('UPDATE game_sessions SET players = ? WHERE id = ?').run(JSON.stringify(players), gameId);

            broadcastToRoom(currentRoom, xmlTag('game', {
              a: 'joined',
              id: String(gameId),
              player: userData.username,
              playerId: String(userData.userId),
            }));
            break;
          }

          if (gameAction === 'start') {
            const gameId = parseInt(attrs.id);
            const game = db.prepare("SELECT * FROM game_sessions WHERE id = ? AND host_id = ? AND status = 'waiting'").get(gameId, userData.dbId);
            if (!game) { sendSystemMsg(ws, 'Cannot start game.'); break; }

            db.prepare("UPDATE game_sessions SET status = 'active' WHERE id = ?").run(gameId);

            broadcastToRoom(currentRoom, xmlTag('game', {
              a: 'started',
              id: String(gameId),
              g: game.game_type,
              players: game.players,
            }));
            break;
          }

          if (gameAction === 'move') {
            const gameId = parseInt(attrs.id);
            const game = db.prepare("SELECT * FROM game_sessions WHERE id = ? AND status = 'active'").get(gameId);
            if (!game) break;

            broadcastToRoom(currentRoom, xmlTag('game', {
              a: 'move',
              id: String(gameId),
              u: String(userData.userId),
              n: userData.username,
              d: attrs.d || '',
            }));
            break;
          }

          if (gameAction === 'end') {
            const gameId = parseInt(attrs.id);
            db.prepare("UPDATE game_sessions SET status = 'ended' WHERE id = ?").run(gameId);
            broadcastToRoom(currentRoom, xmlTag('game', {
              a: 'ended',
              id: String(gameId),
              winner: attrs.winner || '',
            }));
            break;
          }
          break;
        }

        default:
          console.log(`[WS] Unhandled: <${tag}>`, attrs);
      }
    }
    } catch (err) {
      console.error('[WS] Error in message handler:', err.message, err.stack);
      try { sendSystemMsg(ws, 'An internal error occurred.'); } catch(e) {}
    }
  });

  ws.on('close', () => {
    if (currentRoom && userData) {
      const room = rooms.get(currentRoom);
      if (room) {
        room.users.delete(socketId);
        userIdToRoom.delete(String(userData.userId));
        // Send leave to same-pool users, but also notify all (xat sends <l> room-wide)
        broadcastToRoom(currentRoom, xmlTag('l', { u: userData.userId }));
        console.log(`[WS] ${userData.username} left ${currentRoom} [${room.users.size} online]`);
        if (room.users.size === 0) rooms.delete(currentRoom);
      }
    }
    // Notify friends that this user went offline
    if (userData && userData.dbId) {
      const offlineFriends = db.prepare(`
        SELECT f.friend_id FROM friends f
        WHERE f.user_id = ? AND f.status = 'accepted'
      `).all(userData.dbId);
      for (const friend of offlineFriends) {
        const friendWs = findOnlineUserWs(friend.friend_id);
        if (friendWs) {
          sendTo(friendWs, xmlTag('f', {
            u: String(userData.userId),
            s: '0',
            t: 'status'
          }));
        }
      }
    }
  });

  ws.on('error', (err) => {
    console.error('[WS] Error:', err.message);
  });
}

// ===== PATH REWRITING =====
// direct.html uses ../src/img/ relative paths which resolve to /src/ when served via /:GroupName
// Rewrite /src/img/ -> /content/web/R00241/img/ and /src/apps/ -> /content/web/R00241/apps/
app.use((req, res, next) => {
  if (req.path.startsWith('/src/')) {
    const rewritten = req.path.replace(/^\/src\//, '/content/web/R00241/');
    const qs = req.originalUrl.includes('?') ? req.originalUrl.slice(req.originalUrl.indexOf('?')) : '';
    return res.redirect(301, rewritten + qs);
  }
  // Rewrite any R00242+ version requests to R00241 (the version we have)
  if (req.path.match(/\/content\/web\/R00[2-9]\d\d/) && !req.path.includes('R00241')) {
    const rewritten = req.path.replace(/\/content\/web\/R00\d{3}\//, '/content/web/R00241/');
    const qs = req.originalUrl.includes('?') ? req.originalUrl.slice(req.originalUrl.indexOf('?')) : '';
    return res.redirect(301, rewritten + qs);
  }
  next();
});

// ===== XAT API PROXY =====
// ===== STEALTH PUPPETEER SMILEY FETCHER =====
// Bypasses Cloudflare on gs.xat.com to fetch smileys/pawns we don't have cached
const SMILIES_DIR = path.resolve(__dirname, '..', 'public', 'smilies');

let _stealthBrowser = null;
let _stealthPage = null;
let _stealthFetching = new Set(); // prevent duplicate fetches

async function getStealthPage() {
  if (_stealthPage) return _stealthPage;
  try {
    const puppeteer = require('puppeteer-extra');
    const StealthPlugin = require('puppeteer-extra-plugin-stealth');
    puppeteer.use(StealthPlugin());
    _stealthBrowser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    _stealthPage = await _stealthBrowser.newPage();
    await _stealthPage.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    // Hit gs.xat.com once to solve the CF challenge
    await _stealthPage.goto('https://gs.xat.com/', { waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {});
    console.log('[Stealth] Browser ready for gs.xat.com');
    return _stealthPage;
  } catch (err) {
    console.error('[Stealth] Failed to launch:', err.message);
    return null;
  }
}

async function fetchSmileyViaStealth(name, size) {
  if (_stealthFetching.has(name)) return null;
  _stealthFetching.add(name);
  try {
    const page = await getStealthPage();
    if (!page) return null;
    const url = `https://gs.xat.com/a_(${name})_${size}`;
    const response = await page.goto(url, { waitUntil: 'networkidle0', timeout: 10000 });
    if (response && response.ok()) {
      const buffer = await response.buffer();
      if (buffer.length > 100) { // sanity check — not an error page
        const ext = (response.headers()['content-type'] || '').includes('webp') ? '.webp' : '.png';
        const filePath = path.resolve(SMILIES_DIR, name + ext);
        fs.writeFileSync(filePath, buffer);
        console.log(`[Stealth] Cached: ${name} (${buffer.length} bytes)`);
        return { buffer, contentType: response.headers()['content-type'] || 'image/webp' };
      }
    }
  } catch (err) {
    // Silent fail — non-critical
  } finally {
    _stealthFetching.delete(name);
  }
  return null;
}

// Proxy xat.com API endpoints that the client calls, with local disk caching.
// These endpoints return real data from xat.com, cached locally so we don't hit them repeatedly.
const CACHE_DIR = path.resolve(__dirname, '..', 'data', 'api_cache');
if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });

const API_CACHE_TTL = 24 * 60 * 60 * 1000; // 24h cache

async function proxyXatApi(req, res, xatDomain = 'xat.com') {
  const queryStr = Object.keys(req.query).length ? '?' + new URLSearchParams(req.query) : '';
  const cacheKey = (req.path + queryStr).replace(/[^a-zA-Z0-9._-]/g, '_');
  const cachePath = path.join(CACHE_DIR, cacheKey);

  // Check local cache
  if (fs.existsSync(cachePath)) {
    try {
      const stat = fs.statSync(cachePath);
      if (Date.now() - stat.mtimeMs < API_CACHE_TTL) {
        const cached = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
        res.set('Content-Type', cached.contentType || 'application/json');
        if (cached.binary) {
          return res.send(Buffer.from(cached.data, 'base64'));
        }
        return res.send(cached.data);
      }
    } catch (cacheErr) {
      // Corrupt cache file — delete and continue to proxy
      try { fs.unlinkSync(cachePath); } catch(e) {}
    }
  }

  // Proxy to xat.com (with timeout so we don't hang forever if offline)
  const targetUrl = `https://${xatDomain}${req.path}${queryStr}`;
  try {
    const response = await fetch(targetUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0.0.0', 'Referer': 'https://xat.com/' },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      // Serve stale cache if upstream returned an error
      if (fs.existsSync(cachePath)) {
        try {
          const stale = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
          res.set('Content-Type', stale.contentType || 'application/json');
          return stale.binary ? res.send(Buffer.from(stale.data, 'base64')) : res.send(stale.data);
        } catch (_) {}
      }
      return res.status(response.status).send('');
    }
    const contentType = response.headers.get('Content-Type') || 'application/octet-stream';
    const isBinary = !contentType.includes('text') && !contentType.includes('json') && !contentType.includes('javascript');

    if (isBinary) {
      const buf = Buffer.from(await response.arrayBuffer());
      fs.writeFileSync(cachePath, JSON.stringify({ contentType, binary: true, data: buf.toString('base64') }));
      res.set('Content-Type', contentType);
      return res.send(buf);
    } else {
      const text = await response.text();
      fs.writeFileSync(cachePath, JSON.stringify({ contentType, binary: false, data: text }));
      res.set('Content-Type', contentType);
      return res.send(text);
    }
  } catch (err) {
    console.error(`[Proxy] ${targetUrl}: ${err.message}`);
    // Serve stale cache when upstream is unreachable (offline mode)
    if (fs.existsSync(cachePath)) {
      try {
        const stale = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
        console.log(`[Proxy] Serving stale cache for ${req.path}`);
        res.set('Content-Type', stale.contentType || 'application/json');
        return stale.binary ? res.send(Buffer.from(stale.data, 'base64')) : res.send(stale.data);
      } catch (_) {}
    }
    res.status(502).send('');
  }
}

// User lookup - use our DB first, fallback to proxy
app.get('/web_gear/chat/auser3.php', (req, res) => {
  const userId = req.query.u || req.query.id;
  if (userId) {
    const user = db.prepare('SELECT id, username, rank, xats, days, avatar, homepage FROM users WHERE id = ?').get(userId);
    if (user) {
      // Real auser3.php returns URL-encoded key=value pairs (not JSON)
      // Format: &UserId=123&k1=hextoken&k2=timestamp
      const k1 = crypto.randomBytes(10).toString('hex');
      const k2 = String(Math.floor(Date.now() / 1000));
      // Store k1 token for j2 auth validation (expires in 1 hour)
      const expiresAt = Math.floor(Date.now() / 1000) + 3600;
      db.prepare('DELETE FROM k1_tokens WHERE user_id = ?').run(user.id);
      db.prepare('INSERT INTO k1_tokens (token, user_id, expires_at) VALUES (?, ?, ?)').run(k1, user.id, expiresAt);
      return res.type('text/plain').send(`&UserId=${user.id}&k1=${k1}&k2=${k2}`);
    }
  }
  proxyXatApi(req, res);
});

// Registration - handle locally (our auth system)
app.post('/web_gear/chat/register5.php', (req, res) => {
  res.redirect(307, '/auth/register');
});

// Room ID lookup - must come before generic proxy
// Returns JSON that direct.js expects: {id, g, d, a, tabs, t, gb, if, ni, fs}
app.get('/web_gear/chat/roomid.php', (req, res) => {
  const groupName = req.query.d;
  if (!groupName) return res.status(400).send('Missing group name');
  let group = db.prepare('SELECT * FROM groups WHERE name = ? COLLATE NOCASE').get(groupName);
  if (!group) {
    const info = db.prepare('INSERT INTO groups (name, title) VALUES (?, ?)').run(groupName, groupName);
    group = { id: info.lastInsertRowid, name: groupName, title: groupName };
  }
  // Build real xat.com roomid.php format
  // Real response: {id, d, g, a (14 ;= fields), tabs, bot, a1, 636, cs, v, t, gb}
  const rs = db.prepare('SELECT * FROM room_settings WHERE room_id = ?').get(String(group.id));
  const bg = (rs && rs.background) || group.background || '';
  const lang = (rs && rs.language) || 'English';
  const radio = (rs && rs.radio) || '';
  const color1 = (rs && rs.color1) || '';
  const color2 = (rs && rs.color2) || '';
  const navStyle = (rs && rs.nav_style) || '';
  const fontName = (rs && rs.font_name) || '';
  const scrollType = (rs && rs.scroll_type) || 'None';
  const desc = (rs && rs.description) || group.title || group.name;
  // 14-field ;= separated format matching real xat.com
  const aFields = [bg, '', '', lang, radio, color1, '', '', '', '', scrollType, navStyle, fontName, color2];
  const aStr = aFields.join(';=');
  const tabs = [];
  if (rs && rs.tab_info) {
    try { const t = JSON.parse(rs.tab_info); if (Array.isArray(t)) tabs.push(...t); } catch(e) {}
  }
  const botId = (rs && rs.bot_id) || 0;
  const csStyle = (rs && rs.cs) || '';
  const gbImage = (rs && rs.gb) || group.background || '';
  res.json({
    id: String(group.id),
    d: desc,
    g: group.name,
    a: aStr,
    tabs: tabs,
    bot: parseInt(botId) || 0,
    a1: 0,
    '636': 4,
    cs: csStyle,
    v: false,
    t: parseInt(group.type) || 256,
    gb: gbImage,
  });
});

// Announce endpoint - serve real xat.com data
const announceRealPath = path.resolve(__dirname, '..', 'data', 'announce_real.json');
let announceCache = null;
app.get('/web_gear/chat/Announce.php', (req, res) => {
  try {
    if (!announceCache) {
      announceCache = JSON.parse(fs.readFileSync(announceRealPath, 'utf8'));
    }
    res.json(announceCache);
  } catch (err) {
    res.json({ BlackFriday: { Promotion: false, ShortName: false, XatsBackBuy: { enabled: false, ends: 0 }, XatsBackSpend: { enabled: false, ends: 0 } }, Announce: [], alpha: { "1": 25, "2": 35, "5": 50, "9": 65, "12": 90 } });
  }
});

app.get('/web_gear/chat/embed.php', (req, res) => {
  const groupName = req.query.GroupName || 'Lobby';
  res.redirect(`/content/web/R00241/box/embed.html?n=${encodeURIComponent(groupName)}`);
});

// Giphy search proxy - uses GIPHY API
// Returns GIPHY-compatible response format: { data: [{id, url, preview, width, height, title}] }
app.get('/web_gear/chat/Giphy.php', async (req, res) => {
  const GIPHY_KEY = process.env.GIPHY_API_KEY || 'dc6zaTOxFJmzC'; // Giphy public beta key
  const mode = req.query.mode || 'trending';
  const limit = Math.min(parseInt(req.query.limit) || 25, 50);

  try {
    let apiUrl;
    if (mode === 'search' && req.query.q) {
      apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${encodeURIComponent(req.query.q)}&limit=${limit}&rating=pg-13`;
    } else if (mode === 'getgif' && req.query.gifId) {
      apiUrl = `https://api.giphy.com/v1/gifs/${encodeURIComponent(req.query.gifId)}?api_key=${GIPHY_KEY}`;
    } else {
      apiUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_KEY}&limit=${limit}&rating=pg-13`;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (mode === 'getgif') {
      // Single GIF response
      if (data.data) {
        res.json({
          id: data.data.id,
          url: data.data.images?.downsized_medium?.url || data.data.images?.original?.url || '',
          preview: data.data.images?.fixed_width_small?.url || '',
          width: data.data.images?.original?.width || 200,
          height: data.data.images?.original?.height || 200,
        });
      } else {
        res.json({ error: 'GIF not found' });
      }
    } else {
      // Search/trending response - map to format Quickbar expects
      const results = (data.data || []).map(g => ({
        id: g.id,
        url: g.images?.downsized_medium?.url || g.images?.original?.url || '',
        preview: g.images?.fixed_width_small?.url || g.images?.preview_gif?.url || '',
        width: parseInt(g.images?.fixed_width_small?.width) || 100,
        height: parseInt(g.images?.fixed_width_small?.height) || 100,
        title: g.title || '',
      }));
      res.json({ data: results });
    }
  } catch (err) {
    console.error('[Giphy] API error:', err.message);
    res.json({ data: [], error: 'Giphy API unavailable' });
  }
});

// Sound files proxy - serve from local audies directory or proxy from xat.com
// Client requests /web_gear/chat/snd/<name>.mp3 as fallback for older browsers
app.get('/web_gear/chat/snd/:filename', async (req, res) => {
  const filename = req.params.filename;
  // Try local snd directory first
  const sndPath = path.resolve(__dirname, '..', 'public', 'web_gear', 'chat', 'snd', filename);
  if (fs.existsSync(sndPath)) {
    return res.sendFile(sndPath);
  }
  // Also check audies directory (webm versions)
  const audiesPath = path.resolve(__dirname, '..', 'public', 'content', 'sounds', 'audies', filename);
  if (fs.existsSync(audiesPath)) {
    return res.sendFile(audiesPath);
  }
  // Proxy from xat.com
  try {
    const targetUrl = `https://xat.com/web_gear/chat/snd/${filename}`;
    const response = await fetch(targetUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://xat.com/' }
    });
    if (!response.ok) {
      return res.status(404).send('Sound not found');
    }
    const buf = Buffer.from(await response.arrayBuffer());
    // Cache locally for future requests
    try { fs.mkdirSync(path.dirname(sndPath), { recursive: true }); } catch (_) {}
    try { fs.writeFileSync(sndPath, buf); } catch (_) {}
    res.set('Content-Type', response.headers.get('Content-Type') || 'audio/mpeg');
    res.send(buf);
  } catch (err) {
    console.error('[Sound proxy]', err.message);
    res.status(404).send('Sound not found');
  }
});

// linkvalidator.net replacement - warns user before leaving xat
app.get('/linkvalidator/warn.php', (req, res) => {
  let url = req.query.url || '';
  // Block javascript: URLs to prevent XSS
  if (/^javascript:/i.test(url.trim())) url = '';
  const safeUrl = url.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  res.set('Content-Type', 'text/html; charset=utf-8');
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Leaving xat</title>
  <style>
    body { font-family: Arial, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f0f0f0; }
    .box { background: #fff; border: 1px solid #ccc; border-radius: 8px; padding: 24px 32px; max-width: 480px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
    h2 { color: #d00; margin-top: 0; }
    p { color: #333; word-break: break-all; }
    .url { background: #f8f8f8; border: 1px solid #ddd; border-radius: 4px; padding: 8px; margin: 12px 0; font-size: 0.9em; color: #555; }
    .buttons { margin-top: 20px; display: flex; gap: 12px; justify-content: center; }
    a.btn { display: inline-block; padding: 10px 24px; border-radius: 4px; text-decoration: none; font-weight: bold; }
    a.go { background: #e8340a; color: #fff; }
    a.go:hover { background: #c02a08; }
    a.back { background: #eee; color: #333; border: 1px solid #ccc; }
    a.back:hover { background: #ddd; }
  </style>
</head>
<body>
  <div class="box">
    <h2>Warning</h2>
    <p>You are about to leave xat and go to an external website.</p>
    <div class="url">${safeUrl || '(no URL provided)'}</div>
    <p>xat is not responsible for external websites. Continue at your own risk.</p>
    <div class="buttons">
      ${url ? `<a class="btn go" href="${safeUrl}" target="_top">Continue</a>` : ''}
      <a class="btn back" href="javascript:window.history.back()">Go Back</a>
    </div>
  </div>
</body>
</html>`);
});

// Server IP list for WASM connection
app.get('/web_gear/chat/ip3.php', (req, res) => {
  // Return real xat.com JSON format — server list + pow2 data
  const host = req.hostname || 'localhost';
  // Load pow2 data to embed in ip3 response (real xat bundles pow2 inside ip3)
  let pow2Data = {};
  try {
    const pow2Path = path.resolve(__dirname, '..', 'data', 'pow2_full.json');
    if (fs.existsSync(pow2Path)) {
      pow2Data = JSON.parse(fs.readFileSync(pow2Path, 'utf8'));
    } else {
      const pow2Alt = path.resolve(__dirname, '..', 'data', 'pow2_real.json');
      if (fs.existsSync(pow2Alt)) pow2Data = JSON.parse(fs.readFileSync(pow2Alt, 'utf8'));
    }
  } catch(e) {}

  const ip3Response = {
    // S0 = primary server list, format: [priority, [hostnames...]]
    S0: [0, new Array(16).fill(host)],
    // Connection order: [serverKey, timeoutMs] pairs
    order: [['E0', 60], ['E1', 90], ['E0', 180], ['E1', 240], ['S0', 240]],
    xFlag: 2,
    time: Math.floor(Date.now() / 1000),
    T0: [1, ['']],
    // E0/E1 = WebSocket server addresses (point to ourselves)
    E0: [1, [host]],
    E1: [1, [`${host}:6969:1`]],
    // PoW parameters
    k1n: 2000000000,
    k1d: 14,
    // Powers database (bundled in ip3 response)
    pow2: pow2Data,
  };
  res.json(ip3Response);
});

// Languages list — serve captured real data
app.get('/json/lang/languages.php', (req, res) => {
  try {
    const langPath = path.resolve(__dirname, '..', 'data', 'languages_real2.json');
    const data = JSON.parse(fs.readFileSync(langPath, 'utf8'));
    res.json(data);
  } catch(e) {
    res.json({});
  }
});

// Language strings for client
app.get('/json/lang/getlang2.php', (req, res) => {
  const file = req.query.f || 'box';
  // Try data/ directory first
  try {
    const filePath = path.resolve(__dirname, '..', 'data', `getlang2_${file}.json`);
    if (fs.existsSync(filePath)) {
      return res.json(JSON.parse(fs.readFileSync(filePath, 'utf8')));
    }
  } catch(e) {}
  // Try public/json/lang/ cached files
  const langDir = path.resolve(__dirname, '..', 'public', 'json', 'lang');
  const queryStr = Object.keys(req.query).length ? '?' + new URLSearchParams(req.query) : '';
  const encoded = Buffer.from(queryStr).toString('base64url').slice(0, 16);
  const cachedFile = path.join(langDir, `getlang2.php__q_${encoded}`);
  if (fs.existsSync(cachedFile)) {
    res.set('Content-Type', 'application/json');
    return res.sendFile(cachedFile);
  }
  const knownCaches = { box: 'P2Y9Ym94Jmw9ZW4', mob2: 'P2Y9bW9iMiZsPWVu', mob1: 'P2Y9bW9iMSZsPWVu', login: 'P2Y9bG9naW4mbD1l' };
  if (knownCaches[file]) {
    const fb = path.join(langDir, `getlang2.php__q_${knownCaches[file]}`);
    if (fs.existsSync(fb)) { res.set('Content-Type', 'application/json'); return res.sendFile(fb); }
  }
  res.json({});
});

// Featured room lists
// (json/lists handled by comprehensive route below)

// Powers data (pow2.php) - serve REAL xat.com data from crawl cache
// Format: JSON array of 19 [key, value] pairs matching xat.com exactly
// Keys: last, backs, actions, hugs, topsh, isgrp, pssa, pawns, nonmob,
//       pawns2, SuperP, EmoteP, Sticker, Free, Types, Aces, Effects, Frames, Flixes
const pow2RealPath = path.resolve(__dirname, '..', 'data', 'pow2_real.json');
let pow2Cache = null;
app.get('/web_gear/chat/pow2.php', (req, res) => {
  try {
    // Cache in memory after first load
    if (!pow2Cache) {
      pow2Cache = JSON.parse(fs.readFileSync(pow2RealPath, 'utf8'));
    }
    res.json(pow2Cache);
  } catch (err) {
    console.error('[pow2] Failed to load real data:', err.message);
    // Minimal fallback so client doesn't break
    res.json([
      ['last', { id: 741, text: '' }],
      ['backs', {}],
      ['actions', {}],
      ['hugs', {}],
      ['topsh', {}],
      ['isgrp', {}],
      ['pssa', {}],
      ['pawns', {}],
      ['nonmob', {}],
      ['pawns2', {}],
      ['SuperP', {}],
      ['EmoteP', {}],
      ['Sticker', ''],
      ['Free', ''],
      ['Types', {}],
      ['Aces', {}],
      ['Effects', {}],
      ['Frames', {}],
      ['Flixes', []]
    ]);
  }
});

// ===== LOCAL ENDPOINT IMPLEMENTATIONS (must come before the catch-all proxy below) =====

// AreYouaHuman - real svg-captcha implementation
app.get('/web_gear/chat/AreYouaHuman.php', (req, res) => {
  const svgCaptcha = require('svg-captcha');
  const captcha = svgCaptcha.create({
    size: 5,
    noise: 2,
    color: true,
    background: '#1a1a2e',
  });
  // Store captcha text in a short-lived map keyed by session
  const captchaId = Math.random().toString(36).substr(2, 12);
  captchaSessions.set(captchaId, { text: captcha.text, expires: Date.now() + 300000 }); // 5 min

  res.json({
    status: 2, // 2 = show captcha
    captchaId: captchaId,
    svg: captcha.data,
  });
});

app.post('/web_gear/chat/AreYouaHuman.php', (req, res) => {
  const { captchaId, answer } = req.body;
  const session = captchaSessions.get(captchaId);

  if (!session || session.expires < Date.now()) {
    captchaSessions.delete(captchaId);
    return res.json({ status: 0, error: 'Captcha expired' });
  }

  if (session.text.toLowerCase() === (answer || '').toLowerCase()) {
    captchaSessions.delete(captchaId);
    return res.json({ status: 1 }); // 1 = verified
  }

  return res.json({ status: 0, error: 'Incorrect answer' });
});

// translate3 - no-op translation: echo back the input text
app.get('/web_gear/chat/translate3.php', async (req, res) => {
  const text = req.query.t || req.query.text || '';
  const target = req.query.target || 'en';

  if (!text) return res.json({ text: '' });

  // Use LibreTranslate API (free, self-hostable)
  const TRANSLATE_URL = process.env.TRANSLATE_API_URL || 'https://libretranslate.com/translate';
  const TRANSLATE_KEY = process.env.TRANSLATE_API_KEY || '';

  try {
    const body = {
      q: text,
      source: 'auto',
      target: target,
      format: 'text',
    };
    if (TRANSLATE_KEY) body.api_key = TRANSLATE_KEY;

    const response = await fetch(TRANSLATE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    res.json({ text: data.translatedText || text });
  } catch (err) {
    // Fallback: return original text
    console.error('[Translate] API error:', err.message);
    res.json({ text: text });
  }
});

// DaysToXats2.php - currency conversion (1 day ≈ 13.5 xats on real xat)
app.get('/web_gear/chat/DaysToXats2.php', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.json({ error: 'Not authenticated' });
  const days = parseInt(req.query.days) || 0;
  if (days <= 0) return res.json({ error: 'Invalid amount' });
  const rate = 13.5; // xats per day
  const xats = Math.floor(days * rate);
  // Execute conversion
  const user = db.prepare('SELECT days, xats FROM users WHERE id = ?').get(authUser.id);
  if (!user || user.days < days) return res.json({ error: 'Insufficient days' });
  db.prepare('UPDATE users SET days = days - ?, xats = xats + ? WHERE id = ?').run(days, xats, authUser.id);
  const updated = db.prepare('SELECT days, xats FROM users WHERE id = ?').get(authUser.id);
  res.json({ done: 1, days: updated.days, xats: updated.xats });
});

// XatsToDays2.php - currency conversion
app.get('/web_gear/chat/XatsToDays2.php', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.json({ error: 'Not authenticated' });
  const xats = parseInt(req.query.xats) || 0;
  if (xats <= 0) return res.json({ error: 'Invalid amount' });
  const rate = 13.5;
  const days = Math.floor(xats / rate);
  if (days <= 0) return res.json({ error: 'Not enough xats for 1 day' });
  const xatsUsed = Math.floor(days * rate);
  const user = db.prepare('SELECT days, xats FROM users WHERE id = ?').get(authUser.id);
  if (!user || user.xats < xatsUsed) return res.json({ error: 'Insufficient xats' });
  db.prepare('UPDATE users SET xats = xats - ?, days = days + ? WHERE id = ?').run(xatsUsed, days, authUser.id);
  const updated = db.prepare('SELECT days, xats FROM users WHERE id = ?').get(authUser.id);
  res.json({ done: 1, days: updated.days, xats: updated.xats });
});

// GetPowers5.php - power aces/store data
app.get('/web_gear/chat/GetPowers5.php', (req, res) => {
  // Return powers with pricing info
  const powers = db.prepare('SELECT id, name, section, cost_xats, cost_days, is_epic, is_allpower, subid FROM powers ORDER BY id').all();
  res.json(powers.map(p => ({
    id: p.id, name: p.name, section: p.section,
    xats: p.cost_xats || 0, days: p.cost_days || 0,
    epic: p.is_epic, allp: p.is_allpower,
  })));
});

// GetAces.php - aces timer (limited powers available for purchase)
app.get('/web_gear/chat/GetAces.php', (req, res) => {
  res.json({ aces: [], timer: Math.floor(Date.now() / 1000) + 86400 });
});

// buy2.php - power purchase
app.post('/web_gear/chat/buy2.php', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.json({ error: 'Not authenticated' });
  const powerId = parseInt(req.body.id || req.query.id);
  if (!powerId) return res.json({ error: 'Missing power id' });
  const power = db.prepare('SELECT * FROM powers WHERE id = ?').get(powerId);
  if (!power) return res.json({ error: 'Power not found' });
  const cost = power.cost_xats || 250;
  const user = db.prepare('SELECT xats FROM users WHERE id = ?').get(authUser.id);
  if (!user || user.xats < cost) return res.json({ error: 'Insufficient xats' });
  // Check if already owned
  const owned = db.prepare('SELECT id FROM user_powers WHERE user_id = ? AND power_id = ?').get(authUser.id, powerId);
  if (owned) return res.json({ error: 'Already owned' });
  db.prepare('UPDATE users SET xats = xats - ? WHERE id = ?').run(cost, authUser.id);
  db.prepare('INSERT INTO user_powers (user_id, power_id, equipped) VALUES (?, ?, 1)').run(authUser.id, powerId);
  const updated = db.prepare('SELECT xats FROM users WHERE id = ?').get(authUser.id);
  res.json({ done: 1, xats: updated.xats, power: power.name });
});

// Auction2.php - power auction
app.get('/web_gear/chat/Auction2.php', (req, res) => {
  const now = Math.floor(Date.now() / 1000);

  // Auto-resolve expired auctions
  const expired = db.prepare("SELECT * FROM auctions WHERE status = 'active' AND expires_at < ?").all(now);
  for (const auction of expired) {
    if (auction.bidder_id > 0) {
      // Transfer power to winner
      try { db.prepare('INSERT INTO user_powers (user_id, power_id) VALUES (?, ?)').run(auction.bidder_id, auction.power_id); } catch(e) {}
      // Pay seller
      db.prepare('UPDATE users SET xats = xats + ? WHERE id = ?').run(auction.current_bid, auction.seller_id);
      db.prepare("UPDATE auctions SET status = 'sold' WHERE id = ?").run(auction.id);
    } else {
      db.prepare("UPDATE auctions SET status = 'expired' WHERE id = ?").run(auction.id);
    }
  }

  const auctions = db.prepare(`
    SELECT a.*, p.name as power_name,
           s.username as seller_name,
           b.username as bidder_name
    FROM auctions a
    JOIN powers p ON a.power_id = p.id
    JOIN users s ON a.seller_id = s.id
    LEFT JOIN users b ON a.bidder_id = b.id
    WHERE a.status = 'active' AND a.expires_at > ?
    ORDER BY a.expires_at ASC
  `).all(now);

  const nextExpiry = auctions.length > 0 ? auctions[0].expires_at : now + 3600;

  res.json({
    auctions: auctions.map(a => ({
      id: a.id,
      power: a.power_name,
      powerId: a.power_id,
      seller: a.seller_name,
      startPrice: a.starting_price,
      currentBid: a.current_bid || a.starting_price,
      bidder: a.bidder_name || '',
      expiresAt: a.expires_at,
      timeLeft: a.expires_at - now,
    })),
    next: nextExpiry,
  });
});

// avatareffects - empty list
app.get('/web_gear/chat/avatareffects.php', (req, res) => {
  // Avatar effect rendering: generates a simple SVG border/frame
  // Client requests: ?e=effectId&f=frameId&c=color
  const effectId = parseInt(req.query.e) || 0;
  const frameId = parseInt(req.query.f) || 15;
  const color = (req.query.c || '4ecdc4').replace('#', '');

  // Generate SVG avatar frame
  const size = 80;
  const stroke = 3;
  const shapes = {
    0: `<circle cx="${size/2}" cy="${size/2}" r="${size/2-stroke}" fill="none" stroke="#${color}" stroke-width="${stroke}"/>`,
    1: `<rect x="${stroke}" y="${stroke}" width="${size-stroke*2}" height="${size-stroke*2}" rx="8" fill="none" stroke="#${color}" stroke-width="${stroke}"/>`,
    2: `<circle cx="${size/2}" cy="${size/2}" r="${size/2-stroke}" fill="none" stroke="#${color}" stroke-width="${stroke}" stroke-dasharray="5,3"/>`,
    3: `<polygon points="${size/2},${stroke} ${size-stroke},${size-stroke} ${stroke},${size-stroke}" fill="none" stroke="#${color}" stroke-width="${stroke}"/>`,
    4: `<circle cx="${size/2}" cy="${size/2}" r="${size/2-stroke}" fill="none" stroke="#${color}" stroke-width="${stroke+1}"><animate attributeName="stroke-dasharray" values="0,1000;314,0" dur="2s" repeatCount="indefinite"/></circle>`,
  };

  const shape = shapes[effectId % Object.keys(shapes).length] || shapes[0];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${shape}</svg>`;

  res.type('image/svg+xml').send(svg);
});

// hugs - basic hugs power smilies list
// Hugs renderer — client loads as iframe: hugs.php?p=BASE64(JSON)&cb=cc11
// JSON params: {h: hugType, n: name1, n2: name2, av: avatar1, av2: avatar2, p1, p2, m: message, t, p, j}
app.get('/web_gear/chat/hugs.php', (req, res) => {
  const p = req.query.p;
  if (!p) return res.status(400).send('Missing p param');
  let data;
  try {
    data = JSON.parse(decodeURIComponent(Buffer.from(p, 'base64').toString('utf8')));
  } catch (e) {
    return res.status(400).send('Invalid p param');
  }
  const hugType = data.h || 'hug';
  const name1 = data.n || 'User1';
  const name2 = data.n2 || 'User2';
  const av1 = data.av || '';
  const av2 = data.av2 || '';
  const msg = data.m || '';
  const smileyBase = '/web_gear/chat/hugs';
  res.type('html').send(`<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:transparent;font-family:'Segoe UI',Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:60px;padding:4px;overflow:hidden}
.hug{display:flex;align-items:center;gap:6px;background:rgba(255,255,255,0.05);border-radius:12px;padding:6px 10px}
.av{width:36px;height:36px;border-radius:50%;object-fit:cover;border:2px solid #444}
.name{font-size:12px;color:#ccc;max-width:70px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center}
.smiley{width:40px;height:40px}
.msg{font-size:11px;color:#999;margin-top:2px;text-align:center;max-width:180px;word-break:break-word}
.col{display:flex;flex-direction:column;align-items:center;gap:2px}
</style></head><body>
<div class="hug">
  <div class="col">
    ${av1 ? `<img class="av" src="${av1}" onerror="this.style.display='none'">` : '<div class="av" style="background:#333"></div>'}
    <div class="name">${name1}</div>
  </div>
  <div class="col">
    <img class="smiley" src="${smileyBase}/${hugType}.png" onerror="this.src='${smileyBase}/hug.png'" alt="${hugType}">
    ${msg ? `<div class="msg">${msg}</div>` : ''}
  </div>
  <div class="col">
    ${av2 ? `<img class="av" src="${av2}" onerror="this.style.display='none'">` : '<div class="av" style="background:#333"></div>'}
    <div class="name">${name2}</div>
  </div>
</div>
</body></html>`);
});

// Hug smiley images - serve from local smiley cache or smiley proxy
// On real xat.com these live at /web_gear/chat/hugs/<name>.png
app.get('/web_gear/chat/hugs/:name.png', async (req, res) => {
  const name = req.params.name;
  // Try local smilies cache first (webp or png)
  const localWebP = path.resolve(__dirname, '..', 'public', 'smilies', name + '.webp');
  const localPNG = path.resolve(__dirname, '..', 'public', 'smilies', name + '.png');
  if (fs.existsSync(localWebP)) {
    res.set('Cache-Control', 'public, max-age=86400');
    return res.sendFile(localWebP);
  }
  if (fs.existsSync(localPNG)) {
    res.set('Cache-Control', 'public, max-age=86400');
    return res.sendFile(localPNG);
  }
  // Try stealth fetch for the smiley
  const stealthResult = await fetchSmileyViaStealth(name, '40');
  if (stealthResult) {
    res.set('Content-Type', stealthResult.contentType);
    res.set('Cache-Control', 'public, max-age=86400');
    return res.send(stealthResult.buffer);
  }
  // Return transparent 1x1 PNG as last resort
  const transparentPng = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
  res.set('Content-Type', 'image/png');
  res.set('Cache-Control', 'public, max-age=3600');
  res.send(transparentPng);
});

// kiss.php - kiss smiley catalog (real xat.com data captured via stealth puppeteer)
// Format: array of [label, "kiss,cost,smiley1,...", "kiss,cost,smiley1,..."]
// Client iterates entries, accesses [1] and [2] as comma-separated strings
const kissRealPath = path.resolve(__dirname, '..', 'data', 'kiss_real.json');
let kissCache = null;
app.get('/web_gear/chat/kiss.php', (req, res) => {
  try {
    if (!kissCache) kissCache = JSON.parse(fs.readFileSync(kissRealPath, 'utf8'));
    res.json(kissCache);
  } catch (err) {
    // Fallback with real format
    res.json([
      ["New", "kiss,25,Shark,Haunt,Hippo,Ufo,Tv", "kiss,25,Sticky,Spider,Weather,Spring,Baseball"],
      ["more", "kiss,25,Kiss,Mailbox,Carnival,Autumn,Potofgold", "kiss,25,Holiday,Snowfight,Chimney,Hogmanay,Globe"],
    ]);
  }
});

// gifts22.php - user's received gifts (real xat.com format)
// Format: { "timestamp": { id: senderUserId, n: "senderName", g: "giftType", s: "frontText", m: "message", f: flags, FrontColText: color, FrontColBkg: color } }
// Client iterates keys sorted reverse (newest first), renders gift SVG from /images/js/gift/{g}.svg
// flags: bit 0 = private, bit 1 = unread, bit 2 = unopened, bit 3 = has front text
// When ?id=X is provided, returns that user's gifts; otherwise returns authed user's gifts
app.get('/web_gear/chat/gifts22.php', (req, res) => {
  const targetId = req.query.id;
  const authUser = getAuthUser(req);
  const userId = targetId || (authUser ? authUser.id : null);
  if (!userId) {
    return res.status(404).json({});
  }
  const gifts = db.prepare(
    `SELECT id, sender_id, sender_name, gift_type, message, front_text, flags, created_at
     FROM gifts WHERE recipient_id = ? ORDER BY created_at DESC LIMIT 50`
  ).all(userId);
  const result = {};
  for (const g of gifts) {
    const ts = String(g.created_at || g.id);
    result[ts] = {
      id: g.sender_id,
      n: g.sender_name || 'Anonymous',
      g: g.gift_type || 'rose',
      s: g.front_text || '',
      m: g.message || '',
      f: g.flags || 0,
      FrontColText: 0,
      FrontColBkg: 1,
    };
  }
  res.json(result);
});

// POST gifts22.php - send a gift to another user
app.post('/web_gear/chat/gifts22.php', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Not authenticated' });
  const { id: recipientId, g: giftType, m: message, s: frontText, f: flags } = req.body;
  if (!recipientId) return res.status(400).json({ error: 'Missing recipient id' });
  const recipient = db.prepare('SELECT id, username FROM users WHERE id = ?').get(recipientId);
  if (!recipient) return res.status(404).json({ error: 'User not found' });
  const giftFlags = flags || 2; // bit 1 = unread by default
  db.prepare(
    'INSERT INTO gifts (recipient_id, sender_id, sender_name, gift_type, message, front_text, flags) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).run(recipientId, authUser.id, authUser.username, giftType || 'rose', message || '', frontText || '', giftFlags);
  console.log(`[Gift] ${authUser.username} sent ${giftType || 'rose'} to user ${recipientId}`);
  res.json({ status: 'ok' });
});

// ownerfeedback2 - store feedback from group owners
app.post('/web_gear/chat/ownerfeedback2.php', (req, res) => {
  const { subject, message, groupId } = req.body;
  if (!message) {
    return res.status(400).json({ status: 'error', message: 'Message is required' });
  }

  const authUser = getAuthUser(req);
  const userId = authUser ? authUser.id : null;

  db.prepare(
    'INSERT INTO feedback (user_id, subject, message, group_id) VALUES (?, ?, ?, ?)'
  ).run(userId, subject || '', message, groupId || '');

  console.log(`[Feedback] From user ${userId || 'anon'}, group ${groupId || ''}: ${(message || '').slice(0, 80)}`);
  res.json({ status: 'ok' });
});

// powers.php - power catalog for actions profile card
app.get('/web_gear/chat/powers.php', (req, res) => {
  const powers = db.prepare('SELECT id, name, section, cost_xats, cost_days, is_epic, is_allpower, subid FROM powers ORDER BY id').all();
  res.json(powers.map(p => ({
    id: p.id, name: p.name, s: p.section || 0,
    x: p.cost_xats || 0, d: p.cost_days || 0,
    e: p.is_epic || 0, a: p.is_allpower || 0,
  })));
});

// gift2.php - gift catalog (kisses, hugs, etc.)
app.get('/web_gear/chat/gift2.php', (req, res) => {
  // Return minimal gift structure so selector gift tab renders
  res.json({
    catagory: [
      ['@Gifts', 'category,0,@Hugs,@Kisses'],
      ['@Hugs', 'kiss,0,(hug),(bear),(grouphug)'],
      ['@Kisses', 'kiss,0,(kiss),(blowkiss),(smooch)'],
    ]
  });
});

// Proxy all other web_gear/chat PHP endpoints to xat.com
app.get('/web_gear/chat/:endpoint', (req, res, next) => {
  // Skip if we have a local file for this
  const localPath = path.resolve(__dirname, '..', 'public', 'web_gear', 'chat', req.params.endpoint);
  if (fs.existsSync(localPath)) return next();
  proxyXatApi(req, res);
});

// Promo API - serve real xat.com promoted groups data (language-keyed)
const promoRealPath = path.resolve(__dirname, '..', 'data', 'promo_real.json');
let promoCache = null;
app.get('/json/promo.php', (req, res) => {
  try {
    if (!promoCache) {
      promoCache = JSON.parse(fs.readFileSync(promoRealPath, 'utf8'));
    }
    res.json(promoCache);
  } catch (err) {
    res.json({ en: [{ n: 'Chat', i: 123, d: 'Meet people around the world', a: '' }] });
  }
});

// ABX promo banner data
// ABX promo banners — serve real cached data
const abxRealPath = path.resolve(__dirname, '..', 'data', 'abx_real.json');
let abxCache = null;
app.get('/json/abx.php', (req, res) => {
  try {
    if (!abxCache) abxCache = JSON.parse(fs.readFileSync(abxRealPath, 'utf8'));
    res.json(abxCache);
  } catch (err) {
    res.json({ en: [], es: [], ro: [], pt: [], tr: [], it: [], fr: [], de: [] });
  }
});

// ABX countdown timer
const abxCountRealPath = path.resolve(__dirname, '..', 'data', 'abxcount_real.json');
let abxCountCache = null;
app.get('/json/abxcount.php', (req, res) => {
  try {
    if (!abxCountCache) abxCountCache = JSON.parse(fs.readFileSync(abxCountRealPath, 'utf8'));
    res.json(abxCountCache);
  } catch (err) {
    res.json({ m1: '', m2: '', t: 1 });
  }
});

// Translation files are now served as static .php files from public/json/translate/
// e.g. /json/translate/web-en.php → public/json/translate/web-en.php
// The .php middleware above handles Content-Type detection

// (getlang2.php handled above — merged into single route)

app.get('/json/lang/:endpoint', (req, res) => {
  // Try to find a cached version with encoded query params
  const langDir = path.resolve(__dirname, '..', 'public', 'json', 'lang');
  const queryStr = Object.keys(req.query).length ? '?' + new URLSearchParams(req.query) : '';
  const encoded = Buffer.from(queryStr).toString('base64url').slice(0, 16);
  const cachedFile = path.join(langDir, `${req.params.endpoint}__q_${encoded}`);
  if (fs.existsSync(cachedFile)) {
    res.set('Content-Type', 'application/json');
    return res.sendFile(cachedFile);
  }
  // Also check plain filename
  const plainFile = path.join(langDir, req.params.endpoint);
  if (fs.existsSync(plainFile)) {
    res.set('Content-Type', 'application/json');
    return res.sendFile(plainFile);
  }
  proxyXatApi(req, res);
});

// Group listings API - returns groups for homepage tabs
app.get('/json/lists/:endpoint', (req, res, next) => {
  const endpoint = req.params.endpoint;

  // Parse endpoint: {page}_{lang}_{list}.php or games.php
  let list, page, lang;
  if (endpoint === 'games.php') {
    list = 'games';
    page = 0;
    lang = 'en';
  } else {
    const match = endpoint.match(/^(\d+)_([a-z]{2})_(featured|popular|supported|games)\.php$/);
    if (!match) return next();
    page = parseInt(match[1]);
    lang = match[2];
    list = match[3];
  }

  const perPage = 12;
  const offset = page * perPage;

  // Get groups from DB
  const groups = db.prepare('SELECT * FROM groups ORDER BY id ASC LIMIT ? OFFSET ?').all(perPage, offset);

  const result = groups.map(g => {
    const room = rooms.get(String(g.id));
    return {
      g: g.name,
      d: g.title || g.name,
      n: room ? room.users.size : 0,
      a: '',
    };
  });

  // If empty and page 0, return default groups
  if (result.length === 0 && page === 0) {
    const defaults = ['Chat', 'Help', 'Trade', 'Lobby', 'Music', 'Gaming', 'Social', 'Radio'];
    defaults.forEach((name, i) => {
      // Auto-create if not exists
      let g = db.prepare('SELECT * FROM groups WHERE name = ? COLLATE NOCASE').get(name);
      if (!g) {
        const info = db.prepare('INSERT INTO groups (name, title) VALUES (?, ?)').run(name, name);
        g = { id: info.lastInsertRowid, name, title: name };
      }
      const room = rooms.get(String(g.id));
      result.push({ g: g.name, d: g.title || name, n: room ? room.users.size : 0, a: '' });
    });
  }

  // Add page count entry (xlist() checks for `l` property)
  const totalGroups = db.prepare('SELECT COUNT(*) as c FROM groups').get().c;
  const numPages = Math.max(1, Math.ceil(totalGroups / perPage));
  result.push({ l: numPages });

  res.json(result);
});

// Vote / poll endpoint used by VoteComponent.js
// GET  /json/vote.php?id=<user>&roomid=<room>&cb=<cb>            → returns poll data
// POST /json/vote.php?...&vote=<1-based-option>&i=...&s=...&t=...&k=... → submits vote
app.get('/json/vote.php', (req, res) => {
  const roomId = req.query.roomid || '';
  // Find the most recent active poll for this room
  const poll = db.prepare(
    'SELECT * FROM polls WHERE room_id = ? ORDER BY created_at DESC LIMIT 1'
  ).get(roomId);
  if (!poll) return res.json({});  // no poll → VoteComponent shows "no poll running"

  const options = JSON.parse(poll.options);
  const votes = db.prepare(
    'SELECT option_index, COUNT(*) as count FROM poll_votes WHERE poll_id = ? GROUP BY option_index'
  ).all(poll.id);
  const totalVotes = votes.reduce((sum, v) => sum + v.count, 0);

  // Build answer map: answer1..answerN
  const data = { Question: poll.question };
  options.forEach((opt, idx) => {
    const vRow = votes.find(v => v.option_index === idx);
    const vCount = vRow ? vRow.count : 0;
    const pct = totalVotes > 0 ? Math.round((vCount / totalVotes) * 100) : 0;
    data['answer' + (idx + 1)] = { choice: opt, votes: vCount, percent: pct };
  });

  // Check if requesting user already voted
  let voted = false;
  const authUser = getAuthUser(req);
  if (authUser) {
    const existing = db.prepare('SELECT 1 FROM poll_votes WHERE poll_id = ? AND user_id = ?').get(poll.id, authUser.id);
    voted = !!existing;
  }

  const now = Math.floor(Date.now() / 1000);
  const endTime = poll.expires_at > 0 ? poll.expires_at : (now + 86400);
  res.json({
    data,
    voted,
    NbAnswers: options.length,
    endTime,
    total: totalVotes,
  });
});

app.post('/json/vote.php', (req, res) => {
  const roomId = req.query.roomid || '';
  const voteOption = parseInt(req.query.vote || req.body?.vote);  // 1-based
  const authUser = getAuthUser(req);
  if (!authUser) return res.json({ Err: 'Not authenticated' });
  if (isNaN(voteOption) || voteOption < 1) return res.json({ Err: 'Invalid option' });

  const poll = db.prepare(
    'SELECT * FROM polls WHERE room_id = ? ORDER BY created_at DESC LIMIT 1'
  ).get(roomId);
  if (!poll) return res.json({ Err: 'No poll running' });

  const options = JSON.parse(poll.options);
  if (voteOption > options.length) return res.json({ Err: 'Invalid option' });

  const optionIndex = voteOption - 1;  // convert to 0-based
  try {
    db.prepare('INSERT OR REPLACE INTO poll_votes (poll_id, user_id, option_index) VALUES (?, ?, ?)')
      .run(poll.id, authUser.id, optionIndex);
  } catch(e) {
    return res.json({ Err: 'Vote failed' });
  }

  // Return updated results
  const votes = db.prepare(
    'SELECT option_index, COUNT(*) as count FROM poll_votes WHERE poll_id = ? GROUP BY option_index'
  ).all(poll.id);
  const totalVotes = votes.reduce((sum, v) => sum + v.count, 0);

  const data = { Question: poll.question };
  options.forEach((opt, idx) => {
    const vRow = votes.find(v => v.option_index === idx);
    const vCount = vRow ? vRow.count : 0;
    const pct = totalVotes > 0 ? Math.round((vCount / totalVotes) * 100) : 0;
    data['answer' + (idx + 1)] = { choice: opt, votes: vCount, percent: pct };
  });

  const now = Math.floor(Date.now() / 1000);
  const endTime = poll.expires_at > 0 ? poll.expires_at : (now + 86400);
  res.json({
    ResVote: 'OK',
    data,
    voted: true,
    NbAnswers: options.length,
    endTime,
    total: totalVotes,
  });
});

// REST API for poll management
app.post('/api/polls', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Not authenticated' });
  const { room_id, question, options, expires_at } = req.body;
  if (!question || !options || !Array.isArray(options) || options.length < 2) {
    return res.status(400).json({ error: 'Question and at least 2 options required' });
  }
  const info = db.prepare(
    'INSERT INTO polls (room_id, question, options, created_by, expires_at) VALUES (?, ?, ?, ?, ?)'
  ).run(room_id || '', question, JSON.stringify(options), authUser.id, expires_at || 0);
  res.json({ id: info.lastInsertRowid });
});

app.post('/api/polls/:id/vote', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Not authenticated' });
  const pollId = parseInt(req.params.id);
  const { option } = req.body;
  if (option === undefined) return res.status(400).json({ error: 'Option index required' });
  try {
    db.prepare('INSERT OR REPLACE INTO poll_votes (poll_id, user_id, option_index) VALUES (?, ?, ?)')
      .run(pollId, authUser.id, option);
  } catch(e) {
    return res.status(400).json({ error: 'Vote failed' });
  }
  const votes = db.prepare(
    'SELECT option_index, COUNT(*) as count FROM poll_votes WHERE poll_id = ? GROUP BY option_index'
  ).all(pollId);
  res.json({ votes });
});

app.get('/api/polls/:id', (req, res) => {
  const pollId = parseInt(req.params.id);
  const poll = db.prepare('SELECT * FROM polls WHERE id = ?').get(pollId);
  if (!poll) return res.status(404).json({ error: 'Poll not found' });
  const votes = db.prepare(
    'SELECT option_index, COUNT(*) as count FROM poll_votes WHERE poll_id = ? GROUP BY option_index'
  ).all(pollId);
  const totalVotes = votes.reduce((sum, v) => sum + v.count, 0);
  res.json({ ...poll, options: JSON.parse(poll.options), votes, totalVotes });
});

app.get('/api/polls', (req, res) => {
  const roomId = req.query.room || '';
  const polls = db.prepare(
    'SELECT * FROM polls WHERE room_id = ? ORDER BY created_at DESC LIMIT 10'
  ).all(roomId);
  res.json(polls.map(p => ({ ...p, options: JSON.parse(p.options) })));
});

// Proxy JSON API endpoints (catch-all - must come after all specific /json/* routes)
app.get('/json/:endpoint', (req, res, next) => {
  const localPath = path.resolve(__dirname, '..', 'public', 'json', req.params.endpoint);
  if (fs.existsSync(localPath)) return next();
  proxyXatApi(req, res);
});

// Avatar images - serve local, proxy missing ones
app.get('/web_gear/chat/av/:id.png', (req, res, next) => {
  const localPath = path.resolve(__dirname, '..', 'public', 'web_gear', 'chat', 'av', `${req.params.id}.png`);
  if (fs.existsSync(localPath)) return next(); // let static serve it
  proxyXatApi(req, res);
});

// GetImage endpoints (avatar rendering) - proxy to i0.xat.com
app.get('/web_gear/chat/GetImage:version.php', (req, res) => {
  proxyXatApi(req, res, 'i0.xat.com');
});

// Sticker endpoint
app.get('/web_gear/chat/sticker.php', (req, res) => {
  const stickerId = req.query.s || '';
  const isListRequest = req.query.a === '1';

  if (isListRequest) {
    // Return sticker catalog - the client loads this in selector.js
    // Format: { stickers: [{id, name, smileys: ["smiley1","smiley2"]}] }
    res.json({
      stickers: [
        { id: 'basic', name: 'Basic', smileys: ['(smile)', '(wink)', '(heart)', '(star)', '(thumbsup)', '(clap)', '(fire)', '(100)'] },
        { id: 'faces', name: 'Faces', smileys: ['(happy)', '(sad)', '(angry)', '(surprised)', '(cool)', '(nerd)', '(cry)', '(love)'] },
        { id: 'animals', name: 'Animals', smileys: ['(cat)', '(dog)', '(bear)', '(bunny)', '(bird)', '(fish)', '(butterfly)', '(panda)'] },
      ]
    });
    return;
  }

  if (!stickerId) return res.status(400).send('Missing sticker ID');

  // Stickers are rendered as enlarged smileys - proxy to smiley system
  // Generate a simple sticker image (colored circle with text)
  const text = stickerId.replace(/[^a-zA-Z0-9]/g, '').substring(0, 6);
  const colors = ['#ff6b6b','#4ecdc4','#45b7d1','#96ceb4','#ffeaa7','#dda0dd','#98d8c8','#f7dc6f'];
  const color = colors[Math.abs(text.charCodeAt(0) || 0) % colors.length];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="55" fill="${color}" opacity="0.9"/>
    <text x="60" y="68" text-anchor="middle" font-size="24" font-family="Arial" fill="white" font-weight="bold">${text}</text>
  </svg>`;
  res.type('image/svg+xml').send(svg);
});

// Flag images - serve local, proxy missing
app.get('/images/smw/flag/:name', (req, res, next) => {
  const localPath = path.resolve(__dirname, '..', 'public', 'images', 'smw', 'flag', req.params.name);
  if (fs.existsSync(localPath)) return next();
  proxyXatApi(req, res);
});

// SMW images (smilies, pawns, etc) - serve local, proxy missing
app.get('/images/smw/:name', (req, res, next) => {
  const localPath = path.resolve(__dirname, '..', 'public', 'images', 'smw', req.params.name);
  if (fs.existsSync(localPath)) return next();
  proxyXatApi(req, res);
});

// ===== GROUP ICON PROXY (gs.xat.com format: /g_(name)_size) =====
const GROUP_ICON_DIR = path.resolve(__dirname, '..', 'public', 'cache', 'group_icons');
if (!fs.existsSync(GROUP_ICON_DIR)) fs.mkdirSync(GROUP_ICON_DIR, { recursive: true });

app.get(/^\/g_\(([^)]+)\)_(\d+)$/, async (req, res) => {
  const name = req.params[0];
  const size = req.params[1];
  const cacheFile = path.join(GROUP_ICON_DIR, `${name}_${size}.webp`);

  // Serve from disk cache
  if (fs.existsSync(cacheFile)) {
    res.set('Content-Type', 'image/webp');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Cache-Control', 'public, max-age=86400');
    return res.sendFile(cacheFile);
  }

  // Try fetching from gs.xat.com
  const targetUrl = `https://gs.xat.com/g_(${name})_${size}`;
  try {
    const response = await fetch(targetUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://xat.com/' },
      signal: AbortSignal.timeout(8000),
    });
    if (response.ok) {
      const buf = Buffer.from(await response.arrayBuffer());
      // Cache to disk
      try { fs.writeFileSync(cacheFile, buf); } catch (_) {}
      res.set('Content-Type', response.headers.get('Content-Type') || 'image/webp');
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Cache-Control', 'public, max-age=86400');
      return res.send(buf);
    }
  } catch (err) {
    console.error(`[Group Icon Proxy] ${targetUrl}:`, err.message);
  }

  // Generate a default group icon SVG with the group initial
  const initial = name.charAt(0).toUpperCase();
  const colors = ['#e91e63','#9c27b0','#673ab7','#3f51b5','#2196f3','#009688','#4caf50','#ff9800','#ff5722'];
  const color = colors[name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length];
  const s = parseInt(size) || 40;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
    <rect width="${s}" height="${s}" rx="${s * 0.15}" fill="${color}"/>
    <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif" font-size="${s * 0.5}" font-weight="bold">${initial}</text>
  </svg>`;
  res.set('Content-Type', 'image/svg+xml');
  res.set('Cache-Control', 'public, max-age=3600');
  res.send(svg);
});

// ===== LOCAL PAWN SVG GENERATOR =====
// Generates colored pawn SVGs for p1pwn*COLOR and p1*rXX requests
function generatePawnSvg(color, size) {
  const s = parseInt(size) || 20;
  // SVG pawn shape extracted from ixat's groups.svg
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 11 17">
<defs>
<radialGradient id="g1" cx="0" cy="0" r="9.67" fx="0" fy="0" gradientUnits="userSpaceOnUse"
  gradientTransform="matrix(0.48,-0.88,0.51,0.28,8.15,13.8)" spreadMethod="pad">
<stop offset="0%" stop-color="#000" stop-opacity="0.41"/><stop offset="100%" stop-color="#013198" stop-opacity="0"/>
</radialGradient>
<radialGradient id="g2" cx="0" cy="0" r="5.02" fx="0" fy="0" gradientUnits="userSpaceOnUse"
  gradientTransform="matrix(0.78,-0.63,0.40,0.49,6.9,5.15)" spreadMethod="pad">
<stop offset="0%" stop-color="#000" stop-opacity="0.42"/><stop offset="100%" stop-color="#013198" stop-opacity="0"/>
</radialGradient>
</defs>
<path fill="${color}" d="M8.3 3.4Q8.3 2 7.3 1 6.3 0 4.9 0 3.5 0 2.5 1 1.5 2 1.5 3.4 1.5 4.8 2.5 5.8 3.5 6.8 4.9 6.75 3.2 6.9 1.7 9.1-0.1 11.6 0 14.85 0 15.9 5.15 16 10.3 16.1 10.2 15.05 10 11.7 8.45 9.2 7 6.8 5.15 6.75 6.4 6.7 7.3 5.8 8.3 4.8 8.3 3.4Z"/>
<path fill="#000" fill-opacity="0.65" d="M7.95 1.3Q6.9 0.25 5.4 0.25 3.9 0.25 2.8 1.3 1.75 2.4 1.75 3.9 1.75 5.4 2.8 6.45 3.46 7.1 4.25 7.35 3.1 7.9 2 9.5 0.2 12 0.25 15.4L0.25 15.4Q0.26 16.65 5.65 16.75 8.23 16.8 9.5 16.55 11 16.27 10.95 15.55L10.95 15.5Q10.75 12.1 9.2 9.6 8.1 7.8 6.8 7.25 7.45 7 7.95 6.45 9.05 5.4 9.05 3.9 9.05 2.4 7.95 1.3M5.4 0.75Q6.7 0.75 7.6 1.65 8.55 2.6 8.55 3.9 8.55 5.2 7.6 6.1 6.8 6.95 5.7 7.05L5.7 7.3 5.7 7.55Q7.38 7.59 8.75 9.85 10.25 12.28 10.45 15.55 10.38 15.88 9.4 16.05 8.17 16.3 5.65 16.25 0.83 16.16 0.75 15.4 0.7 12.19 2.4 9.8 3.86 7.73 5.4 7.55L5.4 7.3 5.35 7.05Q4.09 7.04 3.15 6.1 2.25 5.2 2.25 3.9 2.25 2.6 3.15 1.65 4.1 0.75 5.4 0.75Z"/>
<path fill="url(#g1)" d="M5.45 7.3L5.4 7.3 5.4 7.55Q3.86 7.73 2.4 9.8 0.7 12.19 0.75 15.4 0.83 16.16 5.65 16.25 8.17 16.3 9.4 16.05 10.38 15.88 10.45 15.55 10.25 12.28 8.75 9.85 7.38 7.59 5.7 7.55L5.7 7.3 5.65 7.3Q5.66 7.4 5.6 7.45L5.55 7.5Q5.54 7.49 5.5 7.45 5.45 7.4 5.45 7.3Z"/>
<path fill="url(#g2)" d="M7.6 1.65Q6.7 0.75 5.4 0.75 4.1 0.75 3.15 1.65 2.25 2.6 2.25 3.9 2.25 5.2 3.15 6.1 4.09 7.04 5.35 7.05L5.4 7.3 5.45 7.3Q5.45 7.2 5.5 7.1L5.55 7.1Q5.65 7.2 5.65 7.3L5.7 7.3 5.7 7.05Q6.8 6.95 7.6 6.1 8.55 5.2 8.55 3.9 8.55 2.6 7.6 1.65Z"/>
<path stroke="#fff" stroke-width="0.8" fill="none" d="M3.7 3.95Q3.9 2.65 5 2.1M2.7 14.9Q3 10.65 5.4 9.1"/>
</svg>`;
}

// Rank color mapping for p1*rXX format (r = rank hex)
const RANK_COLORS = {
  '0': '#808080',   // Unregistered (gray)
  '1': '#808080',   // Guest (gray)
  '2': '#00C000',   // Guest registered (green)
  '4': '#00C000',   // Member (green)
  '6': '#5555FF',   // Member+ (blue)
  '8': '#FF0000',   // Mod (red)
  'a': '#FF0000',   // Mod+ (red)
  'c': '#FF0000',   // Admin (red)
  'e': '#FF9900',   // Owner (orange)
  '10': '#FF9900',  // Main Owner (orange)
  '12': '#FF9900',  // Owner+ (orange)
};

// ===== SMILEY PROXY (gs.xat.com format: /a_(name)_size and /S_(name)_size for static) =====
app.get(/^\/[aS]_\(([^)]+)\)_(\d+)$/, async (req, res) => {
  const prefix = req.path.charAt(1); // 'a' or 'S'
  const name = req.params[0];
  const size = req.params[1];

  // Serve DEFAULT pawn images locally via SVG generator
  // Only for: p1pwn*COLOR (basic pawn), p1*rXX (rank shorthand)
  // Power pawns like p1ruby*COLOR go through stealth fetcher below
  const defaultPawnMatch = name.match(/^p1(pwn)?\*r?([0-9a-fA-F]+)$/);
  if (defaultPawnMatch) {
    const colorHex = defaultPawnMatch[2];
    let color;
    if (colorHex.length <= 2) {
      color = RANK_COLORS[colorHex.toLowerCase()] || '#00C000';
    } else {
      color = '#' + colorHex;
    }
    const svg = generatePawnSvg(color, size);
    res.set('Content-Type', 'image/svg+xml');
    res.set('Cache-Control', 'public, max-age=86400');
    return res.send(svg);
  }

  // Check local smilies cache (webp files grabbed previously)
  const localSmiley = path.resolve(__dirname, '..', 'public', 'smilies', name + '.webp');
  if (fs.existsSync(localSmiley)) {
    res.set('Content-Type', 'image/webp');
    res.set('Cache-Control', 'public, max-age=86400');
    return res.sendFile(localSmiley);
  }

  // Check for local smw PNG (power icons like "tempawn", "cyclepawn", etc.)
  if (name.match(/^[a-zA-Z]/) && !name.includes('*')) {
    const localSmw = path.resolve(__dirname, '..', 'public', 'images', 'smw', name + '.png');
    if (fs.existsSync(localSmw)) {
      res.set('Content-Type', 'image/png');
      res.set('Cache-Control', 'public, max-age=86400');
      return res.sendFile(localSmw);
    }
  }

  // Try stealth puppeteer fetch (bypasses Cloudflare)
  const stealthResult = await fetchSmileyViaStealth(name, size);
  if (stealthResult) {
    res.set('Content-Type', stealthResult.contentType);
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Cache-Control', 'public, max-age=86400');
    return res.send(stealthResult.buffer);
  }
  // For pawn images (p1*rXX), return a transparent 1x1 PNG instead of 404 to prevent console spam
  if (name.startsWith('p1')) {
    const transparentPng = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
    res.set('Content-Type', 'image/png');
    res.set('Cache-Control', 'public, max-age=3600');
    return res.send(transparentPng);
  }
  res.status(404).send('');
});

// ===== ASSET MIDDLEWARE =====
app.use(async (req, res, next) => {
  const customPath = path.resolve(__dirname, '..', 'public', 'custom_assets', req.path.replace(/^\//, ''));

  if (fs.existsSync(customPath) && fs.lstatSync(customPath).isFile()) {
    return res.sendFile(customPath);
  }

  const smileyMatch = req.path.match(/\/smilies\/([^/.]+)\.(?:png|webp|gif)/);
  if (smileyMatch) {
    const name = smileyMatch[1];
    const localWebP = path.resolve(__dirname, '..', 'public', 'smilies', `${name}.webp`);
    const localPNG = path.resolve(__dirname, '..', 'public', 'smilies', `${name}.png`);
    if (fs.existsSync(localWebP)) return res.sendFile(localWebP);
    if (fs.existsSync(localPNG)) return res.sendFile(localPNG);
  }

  const publicPath = path.resolve(__dirname, '..', 'public', req.path.replace(/^\//, ''));
  if (fs.existsSync(publicPath) && fs.lstatSync(publicPath).isFile()) {
    return next();
  }

  if (req.path.includes('/smw/') || req.path.includes('/smilies/') || req.path.includes('/sounds/') || req.path.includes('/images/') || req.path.includes('/web_gear/chat/') || req.path.includes('/content/web/')) {
    let targetUrl;
    const smileyProxy = req.path.match(/\/(?:images\/)?smilies\/([^/.]+)\.(?:png|webp|gif)/);
    if (smileyProxy) {
      targetUrl = `https://gs.xat.com/a_(${smileyProxy[1]})_30`;
    } else if (req.path.startsWith('/content/web/') || req.path.startsWith('/web_gear/')) {
      targetUrl = `https://xat.com${req.path}`;
    } else {
      targetUrl = `https://gs.xat.com${req.path}`;
    }

    try {
      const response = await fetch(targetUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://xat.com/' },
        signal: AbortSignal.timeout(8000),
      });
      if (response.ok) {
        const buf = Buffer.from(await response.arrayBuffer());
        const ct = response.headers.get('Content-Type') || 'image/webp';
        // Cache fetched asset to disk for offline use
        const assetCachePath = path.resolve(__dirname, '..', 'public', req.path.replace(/^\//, ''));
        try {
          fs.mkdirSync(path.dirname(assetCachePath), { recursive: true });
          fs.writeFileSync(assetCachePath, buf);
        } catch (_) {}
        res.set('Content-Type', ct);
        res.set('Access-Control-Allow-Origin', '*');
        return res.send(buf);
      }
    } catch (err) {
      console.error(`[Proxy] ${targetUrl}:`, err.message);
    }
  }

  next();
});

// Serve .wasm files with correct MIME type (needed for WebAssembly.instantiateStreaming)
app.use((req, res, next) => {
  if (req.path.endsWith('.wasm')) {
    const wasmPath = path.resolve(__dirname, '..', 'public', req.path.replace(/^\//, ''));
    if (fs.existsSync(wasmPath)) {
      res.set('Content-Type', 'application/wasm');
      return res.sendFile(wasmPath);
    }
  }
  next();
});

// Serve .php files with correct content type
// xat uses .php extensions for JS, JSON, and WASM glue files
app.use((req, res, next) => {
  if (req.path.endsWith('.php')) {
    const phpPath = path.resolve(__dirname, '..', 'public', req.path.replace(/^\//, ''));
    if (fs.existsSync(phpPath)) {
      const content = fs.readFileSync(phpPath, 'utf8');
      // Strip PHP headers if present
      const cleaned = content.replace(/<\?php[\s\S]*?\?>/g, '');
      // Translation files are JSON, everything else is JS
      if (req.path.startsWith('/json/translate/')) {
        res.set('Content-Type', 'application/json');
      } else {
        // Try to detect JSON content
        const trimmed = cleaned.trim();
        if ((trimmed.startsWith('{') || trimmed.startsWith('[')) && !trimmed.startsWith('{//')) {
          try { JSON.parse(trimmed); res.set('Content-Type', 'application/json'); }
          catch { res.set('Content-Type', 'application/javascript'); }
        } else {
          res.set('Content-Type', 'application/javascript');
        }
      }
      return res.send(cleaned);
    }
  }
  next();
});

// ===== HOMEPAGE (like real xat.com) =====
app.get('/', (req, res) => {
  const homePath = path.resolve(__dirname, '..', 'public', 'home.html');
  if (!fs.existsSync(homePath)) {
    return res.status(500).send('home.html not found');
  }

  const homeHtml = fs.readFileSync(homePath, 'utf8');

  const xjson = JSON.stringify({
    dir: '/content/web/R00241/',
    type: 'home',
    id: 1,
    d: 'xat - chat with anyone',
    g: null,
    a: '',
    tabs: 0,
    bot: 0,
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>xat</title>
  <script type="application/json" id="xjson">${xjson}</script>
  <meta name="description" content="xat.com is a fun social networking site, join a group, make friends, create your own xat group">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="theme-color" content="#000088">
  <link rel="icon" href="/content/web/R00241/img/favicon.ico">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.3/css/bootstrap.min.css" rel="stylesheet">
  <link href="/css/animate.css" rel="stylesheet">
  <link href="/content/web/R00241/direct.css" rel="stylesheet">
</head>
<body class="hmbody" style="background-color: white;">
  <noscript>To use this chat, please enable Javascript.</noscript>
  ${homeHtml}
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.3/js/bootstrap.bundle.min.js"></script>
  <script src="/content/js/jquery.localize.js"></script>
  <script src="/content/web/R00241/common.js"></script>
  <script>
    xConfig = xConfig || {};
    xConfig.debugJsonGroup = true;
    xConfig.debugFetchGroup = true;
  </script>
  <script src="/content/web/R00241/direct.js"></script>
</body>
</html>`;

  res.send(html);
});

// Login page
app.get('/login', (req, res) => {
  const loginPath = path.resolve(__dirname, '..', 'public', 'login.html');
  if (!fs.existsSync(loginPath)) {
    return res.status(500).send('login.html not found');
  }
  const loginHtml = fs.readFileSync(loginPath, 'utf8');

  const xjson = JSON.stringify({ type: 'home', dir: '/content/web/R00241/' });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Log in to xat.</title>
  <script type="application/json" id="xjson">${xjson}</script>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="icon" href="/content/web/R00241/img/favicon.ico">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.3/css/bootstrap.min.css" rel="stylesheet">
  <link href="/content/web/R00241/direct.css" rel="stylesheet">
</head>
<body style="background-color: white; cursor: default;">
  ${loginHtml}
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.3/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;

  res.send(html);
});

// Register page (same as login, just shows register tab)
app.get('/register', (req, res) => {
  const loginPath = path.resolve(__dirname, '..', 'public', 'login.html');
  if (!fs.existsSync(loginPath)) {
    return res.status(500).send('login.html not found');
  }
  const loginHtml = fs.readFileSync(loginPath, 'utf8');

  const xjson = JSON.stringify({ type: 'home', dir: '/content/web/R00241/' });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Register - xat</title>
  <script type="application/json" id="xjson">${xjson}</script>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="icon" href="/content/web/R00241/img/favicon.ico">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.3/css/bootstrap.min.css" rel="stylesheet">
  <link href="/content/web/R00241/direct.css" rel="stylesheet">
</head>
<body style="background-color: white; cursor: default;">
  ${loginHtml}
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.3/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;

  res.send(html);
});

// Helper to serve simple content pages wrapped in the xat shell
function serveContentPage(pageName, title) {
  return (req, res) => {
    const pagePath = path.resolve(__dirname, '..', 'public', `${pageName}.html`);
    if (!fs.existsSync(pagePath)) {
      return res.status(404).send(`${pageName}.html not found`);
    }
    const pageHtml = fs.readFileSync(pagePath, 'utf8');
    const xjson = JSON.stringify({ type: 'home', dir: '/content/web/R00241/' });
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} - xat</title>
  <script type="application/json" id="xjson">${xjson}</script>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="icon" href="/content/web/R00241/img/favicon.ico">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.3/css/bootstrap.min.css" rel="stylesheet">
  <link href="/content/web/R00241/direct.css" rel="stylesheet">
</head>
<body style="background-color: white; cursor: default;">
  ${pageHtml}
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.3/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
    res.send(html);
  };
}

app.get('/privacy', serveContentPage('privacy', 'Privacy Policy'));
app.get('/terms', serveContentPage('terms', 'Terms of Service'));
app.get('/safety', serveContentPage('safety', 'Safety Center'));
app.get('/wiki', serveContentPage('wiki', 'Wiki'));
app.get('/store', (req, res) => {
  const authUser = getAuthUser(req);

  // Get all purchasable powers
  let powers = [];
  try {
    powers = db.prepare('SELECT id, name, section, cost_xats, cost_days FROM powers WHERE cost_xats > 0 OR cost_days > 0 ORDER BY name').all();
  } catch(e) {}

  res.type('html').send(`<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>ixat Store</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#0f0f23;color:#e0e0e0;font-family:'Segoe UI',Arial,sans-serif}
  .header{background:#1a1a2e;padding:20px 40px;border-bottom:1px solid #333;display:flex;justify-content:space-between;align-items:center}
  .header h1{color:#4ecdc4;font-size:28px}
  .header a{color:#8ecae6;text-decoration:none}
  .container{max-width:1200px;margin:0 auto;padding:30px}
  h2{color:#fff;margin:30px 0 15px;font-size:22px}
  .balance{background:#1a1a2e;padding:20px;border-radius:10px;display:flex;gap:40px;margin-bottom:30px}
  .balance-item{text-align:center}
  .balance-item .amount{font-size:32px;font-weight:700;color:#4ecdc4}
  .balance-item .label{color:#888;font-size:14px;margin-top:4px}
  .powers-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:15px}
  .power-card{background:#1a1a2e;border:1px solid #333;border-radius:10px;padding:20px;text-align:center;transition:transform .2s,border-color .2s}
  .power-card:hover{transform:translateY(-3px);border-color:#4ecdc4}
  .power-card .name{font-size:16px;font-weight:600;color:#fff;margin-bottom:8px}
  .power-card .price{color:#4ecdc4;font-size:14px;margin-bottom:12px}
  .power-card .buy-btn{padding:8px 20px;background:#0077b6;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600}
  .power-card .buy-btn:hover{background:#0096c7}
  .power-card .buy-btn:disabled{background:#333;cursor:not-allowed}
  .admin-section{background:#1a1a2e;padding:20px;border-radius:10px;margin-top:30px;border:1px solid #444}
  .admin-section h3{color:#ffd700;margin-bottom:15px}
  .admin-row{display:flex;gap:10px;align-items:center;margin-bottom:10px}
  .admin-row input{padding:8px;background:#16213e;border:1px solid #333;border-radius:4px;color:#fff;width:120px}
  .admin-row select{padding:8px;background:#16213e;border:1px solid #333;border-radius:4px;color:#fff}
  .admin-row button{padding:8px 16px;background:#0077b6;color:#fff;border:none;border-radius:4px;cursor:pointer}
  .msg{padding:10px;border-radius:6px;margin-bottom:15px}
  .msg.success{background:#1a3a3a;color:#4ecdc4}
  .msg.error{background:#3a1a1a;color:#ff6b6b}
</style>
</head><body>
<div class="header">
  <h1>ixat Store</h1>
  <a href="/">Back to Chat</a>
</div>
<div class="container">
  <div id="msg"></div>
  ${authUser ? `
  <div class="balance">
    <div class="balance-item"><div class="amount" id="xatsBal">...</div><div class="label">xats</div></div>
    <div class="balance-item"><div class="amount" id="daysBal">...</div><div class="label">days</div></div>
  </div>
  ` : '<p style="margin:20px 0">Please <a href="/login">log in</a> to purchase.</p>'}

  <h2>Powers</h2>
  <div class="powers-grid" id="powersGrid">
    ${powers.map(p => `
      <div class="power-card">
        <div class="name">${p.name}</div>
        <div class="price">${p.cost_xats ? p.cost_xats + ' xats' : ''}${p.cost_xats && p.cost_days ? ' or ' : ''}${p.cost_days ? p.cost_days + ' days' : ''}</div>
        <button class="buy-btn" onclick="buyPower(${p.id}, 'xats')" ${!authUser ? 'disabled' : ''}>Buy</button>
      </div>`).join('')}
  </div>

  ${authUser && authUser.rank >= RANK.OWNER ? `
  <div class="admin-section">
    <h3>Admin: Grant Currency</h3>
    <div class="admin-row">
      <select id="grantUser"><option value="">Select user...</option></select>
      <input type="number" id="grantXats" placeholder="Xats" min="0">
      <input type="number" id="grantDays" placeholder="Days" min="0">
      <button onclick="grantCurrency()">Grant</button>
    </div>
  </div>` : ''}
</div>
<script>
const token = localStorage.getItem('xat_token') || '';
const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token };

// Load balance
fetch('/api/balance', { headers }).then(r=>r.json()).then(d => {
  if (d.xats !== undefined) { document.getElementById('xatsBal').textContent = d.xats; document.getElementById('daysBal').textContent = d.days; }
});

// Load users for admin grant
const grantSelect = document.getElementById('grantUser');
if (grantSelect) {
  fetch('/api/users', { headers }).then(r=>r.json()).then(users => {
    users.forEach(u => { const o = document.createElement('option'); o.value = u.id; o.textContent = u.username; grantSelect.appendChild(o); });
  });
}

function showMsg(text, type) { document.getElementById('msg').innerHTML = '<div class="msg ' + type + '">' + text + '</div>'; setTimeout(() => document.getElementById('msg').innerHTML = '', 5000); }

function buyPower(powerId, currency) {
  fetch('/api/store/buy', { method: 'POST', headers, body: JSON.stringify({ powerId, currency }) })
    .then(r=>r.json()).then(d => {
      if (d.success) { showMsg('Power purchased!', 'success'); location.reload(); }
      else showMsg(d.error || 'Purchase failed', 'error');
    });
}

function grantCurrency() {
  const userId = document.getElementById('grantUser').value;
  const xats = parseInt(document.getElementById('grantXats').value) || 0;
  const days = parseInt(document.getElementById('grantDays').value) || 0;
  if (!userId) return showMsg('Select a user', 'error');
  fetch('/api/admin/grant', { method: 'POST', headers, body: JSON.stringify({ userId: parseInt(userId), xats, days }) })
    .then(r=>r.json()).then(d => {
      if (d.success) showMsg('Granted ' + xats + ' xats and ' + days + ' days', 'success');
      else showMsg(d.error || 'Grant failed', 'error');
    });
}
</script>
</body></html>`);
});
app.get('/buy', (req, res) => res.redirect('/store#!buyxats'));
app.get('/powers', (req, res) => res.redirect('/store#!powers'));
app.get('/search', serveContentPage('search', 'Search Groups'));
app.get('/chats', serveContentPage('chats', 'Groups'));
app.get('/aces', (req, res) => res.redirect('/store#!aces'));
app.get('/shortname', (req, res) => res.redirect('/store#!shortname'));
app.get('/promotion', (req, res) => res.redirect('/store#!promotion'));
app.get('/auction', (req, res) => res.redirect('/store#!auction'));
app.get('/ad', (req, res) => res.redirect('/store#!ads'));
app.get('/buygroup', (req, res) => res.redirect('/store#!groups'));
app.get('/trade', serveContentPage('trade', 'Trade'));
app.get('/editme', serveContentPage('editme', 'Edit Profile'));
app.get('/gcontrol', serveContentPage('gcontrol', 'Group Management'));
app.get('/report', serveContentPage('report', 'Report'));
app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

app.use(express.static(path.resolve(__dirname, '..', 'public')));

// ===== BAN LIST API =====

// Get bans for a room
app.get('/api/room/:roomId/bans', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Not authenticated' });
  const roomId = req.params.roomId;
  const membership = db.prepare('SELECT rank FROM group_members WHERE group_id = ? AND user_id = ?').get(roomId, authUser.id);
  if (!membership || membership.rank < RANK.MOD) return res.status(403).json({ error: 'Moderator rank required' });

  const bans = db.prepare(`
    SELECT b.id, b.user_id, b.reason, b.expires_at, b.banned_by, u.username
    FROM bans b LEFT JOIN users u ON b.user_id = u.id
    WHERE b.room_id = ? AND (b.expires_at > ? OR b.expires_at = 0)
    ORDER BY b.expires_at DESC
  `).all(roomId, Math.floor(Date.now() / 1000));
  res.json(bans);
});

// Remove a ban
app.delete('/api/room/:roomId/bans/:banId', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Not authenticated' });
  const roomId = req.params.roomId;
  const membership = db.prepare('SELECT rank FROM group_members WHERE group_id = ? AND user_id = ?').get(roomId, authUser.id);
  if (!membership || membership.rank < RANK.MOD) return res.status(403).json({ error: 'Moderator rank required' });

  db.prepare('DELETE FROM bans WHERE id = ? AND room_id = ?').run(req.params.banId, roomId);
  res.json({ success: true });
});

// ===== GROUP EDIT PAGE =====

app.get('/editgroup', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.redirect('/login');
  const groupName = req.query.g;
  if (!groupName) return res.status(400).send('Missing group name. Use /editgroup?g=GroupName');

  const group = db.prepare('SELECT * FROM groups WHERE name = ? COLLATE NOCASE').get(groupName);
  if (!group) return res.status(404).send('Group not found');

  // Check if user is owner of this group
  const membership = db.prepare('SELECT rank FROM group_members WHERE group_id = ? AND user_id = ?').get(groupName, authUser.id);
  if (!membership || membership.rank < RANK.OWNER) {
    return res.status(403).send('Only group owners can edit settings');
  }

  const settings = db.prepare('SELECT * FROM room_settings WHERE room_id = ?').get(groupName) || {};
  let gc = {};
  try { gc = JSON.parse(settings.gcontrol || '{}'); } catch(e) {}

  res.type('html').send(`<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Edit Group: ${group.name}</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#1a1a2e;color:#e0e0e0;font-family:'Segoe UI',Arial,sans-serif;padding:20px;max-width:800px;margin:0 auto}
  h1{color:#fff;margin-bottom:20px;font-size:24px}
  h2{color:#8ecae6;margin:20px 0 10px;font-size:18px;border-bottom:1px solid #333;padding-bottom:5px}
  .form-group{margin-bottom:15px}
  label{display:block;margin-bottom:5px;color:#aaa;font-size:14px}
  input[type=text],input[type=url],textarea,select{width:100%;padding:10px;background:#16213e;border:1px solid #333;border-radius:6px;color:#fff;font-size:14px}
  textarea{height:80px;resize:vertical}
  .btn{padding:10px 24px;border:none;border-radius:6px;cursor:pointer;font-size:14px;font-weight:600;margin-right:10px;margin-top:10px}
  .btn-primary{background:#0077b6;color:#fff}
  .btn-primary:hover{background:#0096c7}
  .btn-secondary{background:#333;color:#fff}
  .btn-secondary:hover{background:#444}
  .btn-danger{background:#d62828;color:#fff}
  .btn-danger:hover{background:#e63946}
  .gc-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  .gc-item{display:flex;align-items:center;gap:10px}
  .gc-item label{margin:0;min-width:120px}
  .gc-item select{width:auto;min-width:100px}
  .success{color:#4ecdc4;padding:10px;background:#1a3a3a;border-radius:6px;margin-bottom:15px}
  .error{color:#ff6b6b;padding:10px;background:#3a1a1a;border-radius:6px;margin-bottom:15px}
  a{color:#8ecae6;text-decoration:none}
  .back{margin-bottom:20px;display:inline-block}
</style>
</head><body>
<a class="back" href="/${group.name}">&larr; Back to chat</a>
<h1>Edit Group: ${group.name}</h1>
<div id="msg"></div>
<form id="editForm">
  <h2>General</h2>
  <div class="form-group">
    <label>Group Title</label>
    <input type="text" name="title" value="${(group.title || '').replace(/"/g,'&quot;')}" maxlength="50">
  </div>
  <div class="form-group">
    <label>Description</label>
    <textarea name="description">${(group.description || '').replace(/</g,'&lt;')}</textarea>
  </div>
  <div class="form-group">
    <label>Background Image URL</label>
    <input type="url" name="background" value="${(settings.background || '').replace(/"/g,'&quot;')}">
  </div>
  <div class="form-group">
    <label>Scroller Text</label>
    <input type="text" name="scroller" value="${(group.scroller || '').replace(/"/g,'&quot;')}" maxlength="200">
  </div>
  <div class="form-group">
    <label>Radio URL</label>
    <input type="url" name="radio_url" value="${(settings.radio_url || '').replace(/"/g,'&quot;')}">
  </div>

  <h2>GControl (Rank Requirements)</h2>
  <div class="gc-grid">
    ${[
      ['kk', 'Kick', gc.kk || 7],
      ['bn', 'Ban', gc.bn || 7],
      ['ubn', 'Unban', gc.ubn || 7],
      ['mm', 'Make Mod', gc.mm || 11],
      ['mb', 'Make Member', gc.mb || 8],
      ['mg', 'Make Guest', gc.mg || 7],
      ['ss', 'Set Scroller', gc.ss || 10],
      ['dnc', 'Dunce', gc.dnc || 14],
    ].map(([key, label, val]) => `
    <div class="gc-item">
      <label>${label}</label>
      <select name="gc_${key}">
        <option value="1" ${val<=1?'selected':''}>Everyone</option>
        <option value="5" ${val>1&&val<=5?'selected':''}>Members+</option>
        <option value="7" ${val>5&&val<=8?'selected':''}>Mods+</option>
        <option value="11" ${val>8&&val<=11?'selected':''}>Owners+</option>
        <option value="14" ${val>11?'selected':''}>Main Owner</option>
      </select>
    </div>`).join('')}
  </div>

  <h2>Ban Management</h2>
  <div id="banList">Loading...</div>

  <div style="margin-top:20px">
    <button type="submit" class="btn btn-primary">Save Changes</button>
    <a href="/${group.name}" class="btn btn-secondary">Cancel</a>
  </div>
</form>

<script>
const groupName = ${JSON.stringify(group.name)};
const token = localStorage.getItem('xat_token') || document.cookie.match(/token=([^;]+)/)?.[1] || '';

// Load ban list
fetch('/api/room/' + encodeURIComponent(groupName) + '/bans', {
  headers: { 'Authorization': 'Bearer ' + token }
}).then(r => r.json()).then(bans => {
  const el = document.getElementById('banList');
  if (!bans.length) { el.innerHTML = '<p style="color:#666">No active bans</p>'; return; }
  el.innerHTML = '<table style="width:100%;border-collapse:collapse">' +
    '<tr style="border-bottom:1px solid #333"><th style="text-align:left;padding:8px">User</th><th>Reason</th><th>Expires</th><th></th></tr>' +
    bans.map(b => '<tr style="border-bottom:1px solid #222">' +
      '<td style="padding:8px">' + (b.username||'User #'+b.user_id) + '</td>' +
      '<td style="padding:8px">' + (b.reason||'-') + '</td>' +
      '<td style="padding:8px">' + (b.expires_at ? new Date(b.expires_at*1000).toLocaleString() : 'Permanent') + '</td>' +
      '<td style="padding:8px"><button class="btn btn-danger" style="padding:4px 12px;font-size:12px" onclick="unban('+b.id+')">Unban</button></td>' +
    '</tr>').join('') + '</table>';
}).catch(() => { document.getElementById('banList').innerHTML = '<p style="color:#666">Could not load bans</p>'; });

function unban(banId) {
  fetch('/api/room/' + encodeURIComponent(groupName) + '/bans/' + banId, {
    method: 'DELETE', headers: { 'Authorization': 'Bearer ' + token }
  }).then(() => location.reload());
}

document.getElementById('editForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const fd = new FormData(this);
  const data = {};
  fd.forEach((v,k) => data[k] = v);
  // Build gcontrol object
  const gcontrol = {};
  for (const [k,v] of Object.entries(data)) {
    if (k.startsWith('gc_')) { gcontrol[k.slice(3)] = parseInt(v); delete data[k]; }
  }
  data.gcontrol = gcontrol;

  fetch('/editgroup?g=' + encodeURIComponent(groupName), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify(data)
  }).then(r => r.json()).then(resp => {
    document.getElementById('msg').innerHTML = resp.error
      ? '<div class="error">' + resp.error + '</div>'
      : '<div class="success">Settings saved!</div>';
    window.scrollTo(0,0);
  });
});
</script>
</body></html>`);
});

app.post('/editgroup', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Not authenticated' });
  const groupName = req.query.g;
  if (!groupName) return res.status(400).json({ error: 'Missing group name' });

  const group = db.prepare('SELECT * FROM groups WHERE name = ? COLLATE NOCASE').get(groupName);
  if (!group) return res.status(404).json({ error: 'Group not found' });

  const membership = db.prepare('SELECT rank FROM group_members WHERE group_id = ? AND user_id = ?').get(groupName, authUser.id);
  if (!membership || membership.rank < RANK.OWNER) {
    return res.status(403).json({ error: 'Only group owners can edit settings' });
  }

  const { title, description, background, scroller, radio_url, gcontrol } = req.body;

  // Update group record
  if (title !== undefined || description !== undefined || scroller !== undefined) {
    const updates = [];
    const params = [];
    if (title !== undefined) { updates.push('title = ?'); params.push(title); }
    if (description !== undefined) { updates.push('description = ?'); params.push(description); }
    if (scroller !== undefined) { updates.push('scroller = ?'); params.push(scroller); }
    if (updates.length) {
      params.push(group.id);
      db.prepare('UPDATE groups SET ' + updates.join(', ') + ' WHERE id = ?').run(...params);
    }
  }

  // Update room settings
  const existing = db.prepare('SELECT * FROM room_settings WHERE room_id = ?').get(groupName);
  if (existing) {
    if (background !== undefined) db.prepare('UPDATE room_settings SET background = ? WHERE room_id = ?').run(background, groupName);
    if (gcontrol) db.prepare('UPDATE room_settings SET gcontrol = ? WHERE room_id = ?').run(JSON.stringify(gcontrol), groupName);
    if (radio_url !== undefined) {
      try { db.prepare('ALTER TABLE room_settings ADD COLUMN radio_url TEXT DEFAULT \'\'').run(); } catch(e) {}
      db.prepare('UPDATE room_settings SET radio_url = ? WHERE room_id = ?').run(radio_url, groupName);
    }
  } else {
    try { db.prepare('ALTER TABLE room_settings ADD COLUMN radio_url TEXT DEFAULT \'\'').run(); } catch(e) {}
    db.prepare('INSERT INTO room_settings (room_id, owner_id, background, gcontrol, radio_url) VALUES (?, ?, ?, ?, ?)')
      .run(groupName, authUser.id, background || '', JSON.stringify(gcontrol || {}), radio_url || '');
  }

  res.json({ success: true });
});

// ===== FILE UPLOAD ROUTES =====

// Upload avatar
app.post('/api/upload/avatar', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Not authenticated' });

  const uploadSingle = upload.single('avatar');
  uploadSingle(req, res, async function(err) {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    try {
      const sharp = require('sharp');
      const outputPath = req.file.path.replace(/\.[^.]+$/, '_thumb.png');
      await sharp(req.file.path)
        .resize(100, 100, { fit: 'cover' })
        .png()
        .toFile(outputPath);

      const avatarUrl = '/uploads/avatars/' + path.basename(outputPath);

      // Update user's avatar in DB
      db.prepare('UPDATE users SET avatar = ? WHERE id = ?').run(avatarUrl, authUser.id);

      res.json({ url: avatarUrl });
    } catch (e) {
      res.status(500).json({ error: 'Failed to process image' });
    }
  });
});

// Upload group background
app.post('/api/upload/background', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Not authenticated' });

  const groupName = req.query.g;
  if (!groupName) return res.status(400).json({ error: 'Group name required' });

  // Verify owner
  const membership = db.prepare('SELECT rank FROM group_members WHERE group_id = ? AND user_id = ?').get(groupName, authUser.id);
  if (!membership || membership.rank < RANK.OWNER) {
    return res.status(403).json({ error: 'Only owners can set backgrounds' });
  }

  const uploadSingle = upload.single('background');
  uploadSingle(req, res, async function(err) {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    try {
      const sharp = require('sharp');
      const outputPath = req.file.path.replace(/\.[^.]+$/, '_bg.jpg');
      await sharp(req.file.path)
        .resize(1200, 800, { fit: 'cover', withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toFile(outputPath);

      const bgUrl = '/uploads/backgrounds/' + path.basename(outputPath);

      // Update room_settings
      const existing = db.prepare('SELECT * FROM room_settings WHERE room_id = ?').get(groupName);
      if (existing) {
        db.prepare('UPDATE room_settings SET background = ? WHERE room_id = ?').run(bgUrl, groupName);
      } else {
        db.prepare('INSERT INTO room_settings (room_id, owner_id, background) VALUES (?, ?, ?)').run(groupName, authUser.id, bgUrl);
      }

      res.json({ url: bgUrl });
    } catch (e) {
      res.status(500).json({ error: 'Failed to process image' });
    }
  });
});

// ===== LINK PREVIEW ROUTE =====

app.get('/api/link-preview', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'URL required' });

  // Basic URL validation
  try { new URL(url); } catch(e) { return res.status(400).json({ error: 'Invalid URL' }); }

  // Don't fetch internal URLs
  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    return res.status(400).json({ error: 'Cannot preview internal URLs' });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ixat-preview/1.0)' },
    });
    clearTimeout(timeout);

    if (!response.ok) return res.json({ error: 'Failed to fetch' });

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) {
      return res.json({ url, type: contentType.split(';')[0] });
    }

    const html = await response.text();

    // Parse OG tags with regex (no dependency needed)
    function getOg(prop) {
      const m = html.match(new RegExp('<meta[^>]+property=["\']og:' + prop + '["\'][^>]+content=["\']([^"\']*)["\']', 'i'))
        || html.match(new RegExp('<meta[^>]+content=["\']([^"\']*)["\'][^>]+property=["\']og:' + prop + '["\']', 'i'));
      return m ? m[1] : '';
    }
    function getMeta(name) {
      const m = html.match(new RegExp('<meta[^>]+name=["\']' + name + '["\'][^>]+content=["\']([^"\']*)["\']', 'i'))
        || html.match(new RegExp('<meta[^>]+content=["\']([^"\']*)["\'][^>]+name=["\']' + name + '["\']', 'i'));
      return m ? m[1] : '';
    }

    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);

    const preview = {
      url: url,
      title: getOg('title') || (titleMatch ? titleMatch[1].trim() : ''),
      description: getOg('description') || getMeta('description'),
      image: getOg('image'),
      siteName: getOg('site_name'),
      type: getOg('type') || 'website',
    };

    // Make relative image URLs absolute
    if (preview.image && !preview.image.startsWith('http')) {
      try {
        preview.image = new URL(preview.image, url).toString();
      } catch(e) {}
    }

    res.json(preview);
  } catch(e) {
    res.json({ url, error: 'Preview unavailable' });
  }
});

// ===== STORE & AUCTION API =====

// Get user balance
app.get('/api/balance', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Not authenticated' });
  const user = db.prepare('SELECT xats, days FROM users WHERE id = ?').get(authUser.id);
  res.json(user || { xats: 0, days: 0 });
});

// List users (admin)
app.get('/api/users', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser || authUser.rank < RANK.OWNER) return res.status(403).json({ error: 'Admin only' });
  const users = db.prepare('SELECT id, username FROM users WHERE is_bot = 0 OR is_bot IS NULL ORDER BY username').all();
  res.json(users);
});

// Buy a power
app.post('/api/store/buy', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Not authenticated' });
  const { powerId, currency } = req.body;

  const power = db.prepare('SELECT * FROM powers WHERE id = ?').get(powerId);
  if (!power) return res.status(404).json({ error: 'Power not found' });

  const user = db.prepare('SELECT xats, days FROM users WHERE id = ?').get(authUser.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  // Check if already owned
  const owned = db.prepare('SELECT id FROM user_powers WHERE user_id = ? AND power_id = ?').get(authUser.id, powerId);
  if (owned) return res.status(400).json({ error: 'You already own this power' });

  const cost = currency === 'days' ? (power.cost_days || 0) : (power.cost_xats || 0);
  const balance = currency === 'days' ? (user.days || 0) : (user.xats || 0);

  if (cost <= 0) return res.status(400).json({ error: 'Power not available for ' + currency });
  if (balance < cost) return res.status(400).json({ error: 'Insufficient ' + currency + '. Need ' + cost + ', have ' + balance });

  // Deduct and grant
  if (currency === 'days') {
    db.prepare('UPDATE users SET days = days - ? WHERE id = ?').run(cost, authUser.id);
  } else {
    db.prepare('UPDATE users SET xats = xats - ? WHERE id = ?').run(cost, authUser.id);
  }
  db.prepare('INSERT INTO user_powers (user_id, power_id) VALUES (?, ?)').run(authUser.id, powerId);

  console.log(`[Store] ${authUser.username} bought power ${power.name} for ${cost} ${currency}`);
  res.json({ success: true, power: power.name });
});

// Admin grant currency
app.post('/api/admin/grant', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser || authUser.rank < RANK.OWNER) return res.status(403).json({ error: 'Admin only' });
  const { userId, xats, days } = req.body;
  if (!userId) return res.status(400).json({ error: 'User ID required' });

  if (xats > 0) db.prepare('UPDATE users SET xats = xats + ? WHERE id = ?').run(xats, userId);
  if (days > 0) db.prepare('UPDATE users SET days = days + ? WHERE id = ?').run(days, userId);

  const target = db.prepare('SELECT username FROM users WHERE id = ?').get(userId);
  console.log(`[Admin] ${authUser.username} granted ${xats} xats and ${days} days to ${target?.username || userId}`);
  res.json({ success: true });
});

// Create auction
app.post('/api/auctions', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Not authenticated' });
  const { powerId, startingPrice, durationHours } = req.body;

  if (!powerId) return res.status(400).json({ error: 'Power ID required' });

  // Verify user owns the power
  const owned = db.prepare('SELECT id FROM user_powers WHERE user_id = ? AND power_id = ?').get(authUser.id, powerId);
  if (!owned) return res.status(400).json({ error: 'You do not own this power' });

  const price = Math.max(parseInt(startingPrice) || 100, 1);
  const hours = Math.min(Math.max(parseInt(durationHours) || 24, 1), 168); // 1-168 hours (1 week max)
  const expiresAt = Math.floor(Date.now() / 1000) + (hours * 3600);

  // Remove power from user
  db.prepare('DELETE FROM user_powers WHERE user_id = ? AND power_id = ?').run(authUser.id, powerId);

  const info = db.prepare('INSERT INTO auctions (power_id, seller_id, starting_price, expires_at) VALUES (?, ?, ?, ?)')
    .run(powerId, authUser.id, price, expiresAt);

  res.json({ success: true, auctionId: info.lastInsertRowid });
});

// Place bid
app.post('/api/auctions/:id/bid', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Not authenticated' });
  const auctionId = parseInt(req.params.id);
  const { amount } = req.body;
  const bidAmount = parseInt(amount) || 0;

  const auction = db.prepare("SELECT * FROM auctions WHERE id = ? AND status = 'active'").get(auctionId);
  if (!auction) return res.status(404).json({ error: 'Auction not found or ended' });
  if (auction.expires_at < Math.floor(Date.now() / 1000)) return res.status(400).json({ error: 'Auction has ended' });
  if (auction.seller_id === authUser.id) return res.status(400).json({ error: 'Cannot bid on your own auction' });

  const minBid = Math.max(auction.current_bid || auction.starting_price, auction.starting_price);
  if (bidAmount <= minBid) return res.status(400).json({ error: 'Bid must be higher than ' + minBid + ' xats' });

  // Check balance
  const user = db.prepare('SELECT xats FROM users WHERE id = ?').get(authUser.id);
  if (!user || user.xats < bidAmount) return res.status(400).json({ error: 'Insufficient xats' });

  // Refund previous bidder
  if (auction.bidder_id > 0 && auction.current_bid > 0) {
    db.prepare('UPDATE users SET xats = xats + ? WHERE id = ?').run(auction.current_bid, auction.bidder_id);
  }

  // Deduct from new bidder
  db.prepare('UPDATE users SET xats = xats - ? WHERE id = ?').run(bidAmount, authUser.id);
  db.prepare('UPDATE auctions SET current_bid = ?, bidder_id = ? WHERE id = ?').run(bidAmount, authUser.id, auctionId);

  res.json({ success: true, currentBid: bidAmount });
});

// ===== LIST AUCTIONS =====
app.get('/api/auctions', (req, res) => {
  const auctions = db.prepare(`
    SELECT a.id, a.power_id, a.starting_price, a.current_bid, a.expires_at, a.status,
           p.name, u.username as top_bidder
    FROM auctions a
    LEFT JOIN powers p ON a.power_id = p.id
    LEFT JOIN users u ON a.bidder_id = u.id
    WHERE a.status = 'active' AND a.expires_at > ?
    ORDER BY a.expires_at ASC
  `).all(Math.floor(Date.now() / 1000));
  res.json(auctions);
});

// ===== PROMOTIONS =====
// Create promotions table if not exists
try {
  db.exec(`CREATE TABLE IF NOT EXISTS promotions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    group_name TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    type TEXT NOT NULL DEFAULT 'rank',
    days INTEGER NOT NULL DEFAULT 7,
    cost INTEGER NOT NULL DEFAULT 0,
    starts_at INTEGER NOT NULL,
    ends_at INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
} catch(e) {}

app.post('/api/promotions', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Not authenticated' });
  const { groupName, type, days } = req.body;
  if (!groupName) return res.status(400).json({ error: 'Group name required' });

  const promoRates = { rank: 100, featured: 200, spotlight: 500 };
  const rate = promoRates[type] || 100;
  const numDays = Math.min(Math.max(parseInt(days) || 1, 1), 30);
  const cost = rate * numDays;

  // Verify user owns the group
  const group = db.prepare('SELECT * FROM groups WHERE name = ? COLLATE NOCASE').get(groupName);
  if (!group) return res.status(404).json({ error: 'Group not found' });
  const membership = db.prepare('SELECT rank FROM group_members WHERE group_id = ? AND user_id = ?').get(groupName, authUser.id);
  if (!membership || membership.rank < RANK.OWNER) return res.status(403).json({ error: 'Must be group owner' });

  // Check balance
  const user = db.prepare('SELECT xats FROM users WHERE id = ?').get(authUser.id);
  if (!user || user.xats < cost) return res.status(400).json({ error: 'Insufficient xats. Need ' + cost + ' xats.' });

  // Deduct and create promotion
  const now = Math.floor(Date.now() / 1000);
  db.prepare('UPDATE users SET xats = xats - ? WHERE id = ?').run(cost, authUser.id);
  db.prepare('INSERT INTO promotions (group_name, user_id, type, days, cost, starts_at, ends_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(groupName, authUser.id, type, numDays, cost, now, now + numDays * 86400);

  res.json({ ok: true, message: 'Group promoted for ' + numDays + ' days!' });
});

app.get('/api/promotions', (req, res) => {
  const now = Math.floor(Date.now() / 1000);
  const promos = db.prepare('SELECT * FROM promotions WHERE ends_at > ? ORDER BY type DESC, ends_at ASC').all(now);
  res.json(promos);
});

// ===== FRIEND CATEGORIES =====

// Update friend category
app.put('/api/friends/:friendId/category', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Not authenticated' });
  const friendId = parseInt(req.params.friendId);
  const { category } = req.body;
  db.prepare('UPDATE friends SET category = ? WHERE user_id = ? AND friend_id = ?').run(category || '', authUser.id, friendId);
  res.json({ success: true });
});

// Get friend categories list
app.get('/api/friends/categories', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Not authenticated' });
  try {
    const row = db.prepare('SELECT macros FROM users WHERE id = ?').get(authUser.id);
    let macros = {};
    try { macros = JSON.parse(row?.macros || '{}'); } catch(e) {}
    res.json({ categories: macros.friend_categories || [] });
  } catch(e) { res.json({ categories: [] }); }
});

// Save friend categories list
app.post('/api/friends/categories', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Not authenticated' });
  const { categories } = req.body;
  try {
    const row = db.prepare('SELECT macros FROM users WHERE id = ?').get(authUser.id);
    let macros = {};
    try { macros = JSON.parse(row?.macros || '{}'); } catch(e) {}
    macros.friend_categories = categories || [];
    db.prepare('UPDATE users SET macros = ? WHERE id = ?').run(JSON.stringify(macros), authUser.id);
  } catch(e) {}
  res.json({ success: true });
});

// ===== RANK LIST API =====

// Get ranked users for a group
app.get('/api/room/:roomId/ranks', (req, res) => {
  const roomId = req.params.roomId;
  const ranks = db.prepare(`
    SELECT gm.user_id, gm.rank, gm.rank_expires, u.username, u.avatar
    FROM group_members gm
    LEFT JOIN users u ON gm.user_id = u.id
    WHERE gm.group_id = ? AND gm.rank >= ${RANK.MEMBER}
    ORDER BY gm.rank DESC, u.username ASC
  `).all(roomId);

  const grouped = {
    mainOwner: ranks.filter(r => r.rank >= RANK.MAIN_OWNER),
    owners: ranks.filter(r => r.rank >= RANK.OWNER && r.rank < RANK.MAIN_OWNER),
    moderators: ranks.filter(r => r.rank >= RANK.MOD && r.rank < RANK.OWNER),
    members: ranks.filter(r => r.rank >= RANK.MEMBER && r.rank < RANK.MOD),
  };
  res.json(grouped);
});

// ===== ADMIN: VERIFIED BADGE =====

app.post('/api/admin/verify', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser || authUser.rank < RANK.OWNER) return res.status(403).json({ error: 'Admin only' });
  const { userId, verified } = req.body;
  db.prepare('UPDATE users SET verified = ? WHERE id = ?').run(verified ? 1 : 0, userId);
  res.json({ success: true });
});

// ===== GROUP ROUTES (like real xat.com) =====

// /:GroupName -> serves the full xat.com group page
// Mirrors the real xat.com page structure: shell HTML + xjson config + direct.html fragment
app.get('/:GroupName', (req, res, next) => {
  const name = req.params.GroupName;

  // Skip if it looks like a file request, API path, or smiley proxy URL
  if (name.includes('.') || name.includes('(') || name.includes(')') || name.startsWith('a_') || ['auth', 'admin', 'ws', 'content', 'web_gear', 'json', 'smilies', 'public', 'images', 'src', 'favicon.ico', 'privacy', 'terms', 'login', 'register', 'store', 'powers', 'chats', 'css', 'search', 'buy', 'aces', 'shortname', 'wiki', 'safety', 'sounds', 'fonts', 'promotion', 'auction', 'ad', 'buygroup', 'editme', 'gcontrol', 'trade', 'report', 'logout', 'sw.js', 'robots.txt', 'sitemap.xml', 'custom_assets', 'data', 'scripts', 'node_modules', 'api'].includes(name.toLowerCase())) {
    return next();
  }

  // Valid group names: alphanumeric + underscore, 1-20 chars
  if (!/^[a-zA-Z0-9_]{1,20}$/.test(name)) {
    return next();
  }

  // Auto-create group if it doesn't exist
  let group = db.prepare('SELECT * FROM groups WHERE name = ? COLLATE NOCASE').get(name);
  if (!group) {
    const info = db.prepare('INSERT INTO groups (name, title) VALUES (?, ?)').run(name, name);
    group = { id: info.lastInsertRowid, name, title: name };
  }

  const directPath = path.resolve(__dirname, '..', 'public', 'content', 'web', 'R00241', 'direct.html');
  if (!fs.existsSync(directPath)) {
    return res.status(500).send('direct.html not found. Run: node scripts/patch-xat-files.js');
  }

  const directHtml = fs.readFileSync(directPath, 'utf8');

  // Build the xjson config exactly like real xat.com serves it
  // This is the critical piece - common.js reads this to set dir, group name, etc.
  const xjson = JSON.stringify({
    dir: '/content/web/R00241/',
    id: group.id,
    d: group.title || name,
    g: name,
    a: '',
    gb: '#000044',
    tabs: 0,
    bot: 0,
    Direct: 1,
  });

  // debugJsonGroup tells direct.js to read group config from xjson instead of fetching from API
  const debugConfig = `<script>
    xConfig = xConfig || {};
    xConfig.debugJsonGroup = true;
    xConfig.debugFetchGroup = true;
  </script>`;

  // Build the full page exactly like xat.com does
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${name}</title>
  <script type="application/json" id="xjson">${xjson}</script>
  <meta name="description" content="${group.title || name}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#000088">
  <base href="/content/web/R00241/">
  <link rel="icon" href="/content/web/R00241/img/favicon.ico">
  <link rel="icon" href="/content/web/R00241/img/favicon-32x32.png" sizes="32x32" type="image/png">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.3/css/bootstrap.min.css" rel="stylesheet">
  <link href="/content/web/R00241/direct.css" rel="stylesheet">
  <link href="/content/web/R00241/pwa.css" rel="stylesheet">
</head>
<body class="d-none">
  <noscript>To use this chat, please enable Javascript.</noscript>
  ${directHtml}
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.3/js/bootstrap.bundle.min.js"></script>
  <script src="/content/js/jquery.localize.js"></script>
  <script src="/content/web/R00241/common.js"></script>
  ${debugConfig}
  <script src="/content/web/R00241/direct.js"></script>
</body>
</html>`;

  res.send(html);
});

// ===== LEGACY API ENDPOINTS =====
app.get('/json/user.php', (req, res) => {
  const userId = req.query.id;
  if (!userId) return res.json({ status: 'error', message: 'Missing User ID' });
  const user = db.prepare('SELECT id, username, rank, xats, days FROM users WHERE id = ?').get(userId);
  if (!user) return res.json({ status: 'error', message: 'User not found' });
  res.json({ status: 'ok', user });
});

// Store claim endpoint — private server gives free xats/days to any logged-in user
const storeClaimCooldowns = new Map(); // userId -> lastClaimTimestamp
app.post('/api/store/claim', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Login required' });

  // Rate limit: 1 claim per 30 seconds per user
  const now = Date.now();
  const lastClaim = storeClaimCooldowns.get(authUser.id) || 0;
  if (now - lastClaim < 30000) {
    const waitSec = Math.ceil((30000 - (now - lastClaim)) / 1000);
    return res.status(429).json({ error: `Please wait ${waitSec}s before claiming again` });
  }

  const { xats, days } = req.body;
  const addXats = Math.min(parseInt(xats) || 0, 100000); // cap per claim
  const addDays = Math.min(parseInt(days) || 0, 730);
  if (addXats <= 0 && addDays <= 0) return res.json({ error: 'Nothing to claim' });

  storeClaimCooldowns.set(authUser.id, now);
  db.prepare('UPDATE users SET xats = xats + ?, days = days + ? WHERE id = ?').run(addXats, addDays, authUser.id);
  const updated = db.prepare('SELECT xats, days FROM users WHERE id = ?').get(authUser.id);
  console.log(`[Store] ${authUser.username} claimed ${addXats} xats, ${addDays} days`);
  res.json({ ok: true, user: { ...authUser, xats: updated.xats, days: updated.days } });
});

// === GROUP MANAGEMENT API ===

// Active groups with live user counts (for homepage)
app.get('/api/groups/active', (req, res) => {
  const groups = [];
  for (const [roomId, room] of rooms) {
    const userCount = room.users ? room.users.size : 0;
    const settings = db.prepare('SELECT * FROM room_settings WHERE room_id = ?').get(roomId);
    groups.push({
      id: roomId,
      name: settings ? settings.name : roomId,
      title: settings ? (settings.topic || '') : '',
      userCount,
      color1: settings ? (settings.color1 || '#1a1a2e') : '#1a1a2e',
      color2: settings ? (settings.color2 || settings.inner_color || '#2d2d44') : '#2d2d44',
      background: settings ? (settings.background || '') : '',
    });
  }
  // Also include groups from DB that aren't currently active
  const dbGroups = db.prepare('SELECT * FROM room_settings').all();
  const activeIds = new Set(groups.map(g => g.id));
  for (const s of dbGroups) {
    if (!activeIds.has(s.room_id)) {
      groups.push({
        id: s.room_id,
        name: s.name || s.room_id,
        title: s.topic || '',
        userCount: 0,
        color1: s.color1 || '#1a1a2e',
        color2: s.color2 || s.inner_color || '#2d2d44',
        background: s.background || '',
      });
    }
  }
  groups.sort((a, b) => b.userCount - a.userCount);
  res.json({ groups });
});

// Search groups by name/topic
app.get('/api/groups/search', (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q) return res.json([]);
  const groups = db.prepare(
    "SELECT room_id AS id, name, topic, background FROM room_settings WHERE name LIKE ? OR topic LIKE ? LIMIT 50"
  ).all('%' + q + '%', '%' + q + '%');
  // Add live user count
  groups.forEach(g => {
    const room = rooms.get(String(g.id));
    g.userCount = room && room.users ? room.users.size : 0;
  });
  res.json(groups);
});

// Groups listed for sale (marketplace)
app.get('/api/groups/forsale', (req, res) => {
  const q = (req.query.q || '').trim();
  let query = "SELECT rs.room_id AS id, rs.name, rs.topic, rs.background, g.for_sale_price AS price, g.featured FROM room_settings rs LEFT JOIN groups g ON rs.room_id = g.id WHERE g.for_sale_price > 0";
  const params = [];
  if (q) {
    query += " AND (rs.name LIKE ? OR rs.topic LIKE ?)";
    params.push('%' + q + '%', '%' + q + '%');
  }
  query += " ORDER BY g.featured DESC, g.for_sale_price ASC LIMIT 50";
  try {
    const groups = db.prepare(query).all(...params);
    groups.forEach(g => {
      const room = rooms.get(String(g.id));
      g.members = room && room.users ? room.users.size : 0;
    });
    res.json(groups);
  } catch(e) {
    // Table may not have for_sale_price column yet
    res.json([]);
  }
});

// Get smiley info by power ID (used by trade.html)
app.get('/api/smiley/:id', (req, res) => {
  const power = db.prepare('SELECT id, name, section, cost_xats, cost_days, is_epic, is_allpower FROM powers WHERE id = ?').get(req.params.id);
  if (!power) return res.status(404).json({ error: 'Power not found' });
  res.json(power);
});

// Submit a report
app.post('/api/reports', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Login required' });
  const { type, target_id, reason, details } = req.body;
  if (!type || !reason) return res.status(400).json({ error: 'Type and reason are required' });
  try {
    db.prepare('CREATE TABLE IF NOT EXISTS reports (id INTEGER PRIMARY KEY AUTOINCREMENT, reporter_id INTEGER, type TEXT, target_id TEXT, reason TEXT, details TEXT, status TEXT DEFAULT "open", created_at INTEGER)').run();
    db.prepare('INSERT INTO reports (reporter_id, type, target_id, reason, details, created_at) VALUES (?, ?, ?, ?, ?, ?)').run(authUser.id, type, target_id || '', reason, details || '', Math.floor(Date.now() / 1000));
    res.json({ ok: true });
  } catch(e) {
    res.status(500).json({ error: 'Failed to submit report' });
  }
});

// List groups the authenticated user owns/manages
app.get('/api/groups/mine', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Login required' });
  // Find groups where the user is owner + rooms with group_members OWNER rank
  const ownedGroups = db.prepare('SELECT id, name, title FROM groups WHERE owner_id = ?').all(authUser.id);
  // Also find rooms where user has OWNER rank via group_members
  const managedRooms = db.prepare(`
    SELECT DISTINCT gm.group_id as room_id, rs.name, rs.description
    FROM group_members gm
    LEFT JOIN room_settings rs ON gm.group_id = rs.room_id
    WHERE gm.user_id = ? AND gm.rank >= ?
  `).all(authUser.id, RANK.OWNER);
  res.json({ groups: ownedGroups, managedRooms });
});

// Get settings for a specific group/room
app.get('/api/groups/:id/settings', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Login required' });
  const roomId = req.params.id;
  const settings = db.prepare('SELECT * FROM room_settings WHERE room_id = ?').get(roomId);
  if (!settings) return res.json({ settings: {} });
  // Check ownership
  const group = db.prepare('SELECT * FROM groups WHERE id = ?').get(parseInt(roomId));
  const userRank = db.prepare('SELECT rank FROM group_members WHERE user_id = ? AND group_id = ?').get(authUser.id, roomId);
  if ((!group || group.owner_id !== authUser.id) && (!userRank || userRank.rank < RANK.OWNER)) {
    return res.status(403).json({ error: 'Not authorized to manage this room' });
  }
  res.json({ settings });
});

// Update settings for a specific group/room
app.post('/api/groups/:id/settings', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Login required' });
  const roomId = req.params.id;
  // Check ownership
  const group = db.prepare('SELECT * FROM groups WHERE id = ?').get(parseInt(roomId));
  const userRank = db.prepare('SELECT rank FROM group_members WHERE user_id = ? AND group_id = ?').get(authUser.id, roomId);
  if ((!group || group.owner_id !== authUser.id) && (!userRank || userRank.rank < RANK.OWNER)) {
    return res.status(403).json({ error: 'Not authorized to manage this room' });
  }
  const allowedKeys = [
    'name', 'description', 'language', 'background', 'inner_color', 'color1', 'color2',
    'scroll_msg', 'scroll_type', 'password', 'bot_id', 'iframe_url', 'button', 'attached',
    'radio', 'topic', 'gcontrol', 'banned_smilies', 'kickback', 'room_mode', 'idle_title',
    'min_rank', 'slow_mode', 'nav_style', 'font_name', 'announcement', 'features',
  ];
  const updates = req.body;
  // Ensure the room_settings row exists
  const existing = db.prepare('SELECT room_id FROM room_settings WHERE room_id = ?').get(roomId);
  if (!existing) {
    db.prepare('INSERT INTO room_settings (room_id, owner_id) VALUES (?, ?)').run(roomId, authUser.id);
  }
  for (const [key, value] of Object.entries(updates)) {
    if (allowedKeys.includes(key)) {
      try {
        db.prepare(`UPDATE room_settings SET ${key} = ? WHERE room_id = ?`).run(String(value), roomId);
      } catch(e) { /* ignore invalid columns */ }
    }
  }
  const updated = db.prepare('SELECT * FROM room_settings WHERE room_id = ?').get(roomId);
  // Increment revision so clients refresh
  db.prepare('UPDATE room_settings SET revision = revision + 1 WHERE room_id = ?').run(roomId);
  console.log(`[GControl] ${authUser.username} updated settings for room ${roomId}`);
  res.json({ ok: true, settings: updated });
});

// Get banned users for a room
app.get('/api/groups/:id/bans', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Login required' });
  const roomId = req.params.id;
  const now = Math.floor(Date.now() / 1000);
  const bans = db.prepare(`
    SELECT b.*, u.username FROM bans b
    LEFT JOIN users u ON b.user_id = u.id
    WHERE b.room_id = ? AND (b.expires_at IS NULL OR b.expires_at > ?)
  `).all(roomId, now);
  res.json({ bans });
});

// Get ranked users for a room
app.get('/api/groups/:id/ranks', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Login required' });
  const roomId = req.params.id;
  const ranks = db.prepare(`
    SELECT gm.*, u.username FROM group_members gm
    LEFT JOIN users u ON gm.user_id = u.id
    WHERE gm.group_id = ?
    ORDER BY gm.rank DESC
  `).all(roomId);
  res.json({ ranks });
});

app.post('/admin/mint', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) {
    return res.status(401).json({ status: 'error', message: 'Authentication required' });
  }
  if (authUser.rank < RANK.OWNER) {
    return res.status(403).json({ status: 'error', message: 'Insufficient permissions: Owner rank required' });
  }

  const { userId, xats, days } = req.body;
  const result = db.prepare('UPDATE users SET xats = xats + ?, days = days + ? WHERE id = ?').run(xats || 0, days || 0, userId);
  if (result.changes > 0) {
    console.log(`[Admin] ${authUser.username} minted ${xats} xats and ${days} days for user ${userId}`);
    res.json({ status: 'ok', message: `Minted ${xats} xats and ${days} days for user ${userId}` });
  } else {
    res.status(404).json({ status: 'error', message: 'User not found' });
  }
});

// Profile editing — supports all visual customization fields
app.post('/auth/profile', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Authentication required' });

  const allowedFields = [
    'avatar', 'homepage', 'status', 'pawn', 'cyclepawn', 'nickname',
    'namecolor', 'nameglow', 'namegrad', 'pcback', 'statusfx',
    'hat', 'badge', 'iconcolor', 'pawnHue', 'avatarSettings',
  ];
  const updates = [];
  const params = [];

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updates.push(`${field} = ?`);
      params.push(String(req.body[field]).slice(0, 500));
    }
  }

  if (updates.length === 0) return res.status(400).json({ error: 'No fields to update' });

  params.push(authUser.id);
  db.prepare(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`).run(...params);

  const user = db.prepare('SELECT id, username, rank, xats, days, avatar, homepage, status, pawn, namecolor, nameglow, namegrad, pcback, statusfx, hat, badge, iconcolor, pawnHue FROM users WHERE id = ?').get(authUser.id);
  res.json({ ok: true, user });
});

// Friend system
app.post('/api/friends/add', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Authentication required' });

  const { friendId } = req.body;
  if (!friendId) return res.status(400).json({ error: 'friendId required' });

  const friend = db.prepare('SELECT id, username FROM users WHERE id = ?').get(friendId);
  if (!friend) return res.status(404).json({ error: 'User not found' });

  try {
    db.prepare('INSERT OR IGNORE INTO friends (user_id, friend_id) VALUES (?, ?)').run(authUser.id, friendId);
    res.json({ ok: true, message: `Added ${friend.username} as friend` });
  } catch(e) {
    res.status(500).json({ error: 'Failed to add friend' });
  }
});

app.post('/api/friends/remove', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Authentication required' });

  const { friendId } = req.body;
  if (!friendId) return res.status(400).json({ error: 'friendId required' });

  db.prepare('DELETE FROM friends WHERE user_id = ? AND friend_id = ?').run(authUser.id, friendId);
  res.json({ ok: true });
});

app.get('/api/friends', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Authentication required' });

  const friends = db.prepare(
    'SELECT u.id, u.username, u.avatar FROM friends f JOIN users u ON u.id = f.friend_id WHERE f.user_id = ?'
  ).all(authUser.id);
  res.json({ friends });
});

// Transfer xats/days between users
app.post('/api/transfer', async (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Authentication required' });

  // Rate limit: 10 transfers per minute per user
  if (!rateLimit('transfer:' + authUser.id, 10, 60000)) {
    return res.status(429).json({ error: 'Too many transfer attempts. Try again later.' });
  }

  const { targetId, xats, days, password } = req.body;
  const xatsAmount = parseInt(xats) || 0;
  const daysAmount = parseInt(days) || 0;

  if (xatsAmount <= 0 && daysAmount <= 0) return res.status(400).json({ error: 'Must transfer at least some xats or days' });
  if (xatsAmount < 0 || daysAmount < 0) return res.status(400).json({ error: 'Amounts must be positive' });

  // Password is required for transfers — must match the sender's stored hash
  if (!password) return res.status(400).json({ error: 'Password is required to transfer' });
  const userAuth = db.prepare('SELECT password_hash FROM users WHERE id = ?').get(authUser.id);
  if (!userAuth) return res.status(404).json({ error: 'Sender not found' });
  const validPassword = await verifyPassword(password, userAuth.password_hash);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const sender = db.prepare('SELECT id, username, xats, days FROM users WHERE id = ?').get(authUser.id);
  if (!sender) return res.status(404).json({ error: 'Sender not found' });

  if (sender.xats < xatsAmount) return res.status(400).json({ error: 'Insufficient xats' });
  if (sender.days < daysAmount) return res.status(400).json({ error: 'Insufficient days' });

  const target = db.prepare('SELECT id, username FROM users WHERE id = ?').get(targetId);
  if (!target) return res.status(404).json({ error: 'Target user not found' });

  // Use a transaction for atomicity
  const transfer = db.transaction(() => {
    db.prepare('UPDATE users SET xats = xats - ?, days = days - ? WHERE id = ?').run(xatsAmount, daysAmount, sender.id);
    db.prepare('UPDATE users SET xats = xats + ?, days = days + ? WHERE id = ?').run(xatsAmount, daysAmount, target.id);
  });

  try {
    transfer();
    console.log(`[Transfer] ${sender.username} sent ${xatsAmount} xats, ${daysAmount} days to ${target.username}`);
    res.json({ ok: true, message: `Transferred ${xatsAmount} xats and ${daysAmount} days to ${target.username}` });
  } catch(e) {
    res.status(500).json({ error: 'Transfer failed' });
  }
});

// ===== BOT API =====
// Bot token generation endpoint
app.post('/api/bots/create', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Not authenticated' });

  const { name, room } = req.body;
  if (!name) return res.status(400).json({ error: 'Bot name required' });

  // Create a bot user account
  const botUsername = 'Bot_' + name.replace(/[^a-zA-Z0-9_]/g, '');
  const existing = db.prepare('SELECT id FROM users WHERE username = ? COLLATE NOCASE').get(botUsername);
  if (existing) return res.status(409).json({ error: 'Bot name already taken' });

  const info = db.prepare('INSERT INTO users (username, password_hash, rank, xats, days, is_bot) VALUES (?, ?, ?, 0, 0, 1)')
    .run(botUsername, 'bot:' + generateToken(), 0);
  const botId = info.lastInsertRowid;

  // Generate a permanent bot token
  const botToken = 'bot_' + generateToken();
  const expiresAt = Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60); // 1 year
  db.prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)').run(botToken, botId, expiresAt);

  // If room specified, give bot member rank
  if (room) {
    db.prepare('INSERT OR REPLACE INTO group_members (group_id, user_id, rank) VALUES (?, ?, 1)').run(room, botId);
  }

  res.json({
    botId,
    username: botUsername,
    token: botToken,
    usage: 'Connect via WebSocket with Authorization header or pass token in j2 packet k1 attribute'
  });
});

// List bots (only bots with valid sessions) — tokens are NOT returned here
app.get('/api/bots', (req, res) => {
  const authUser = getAuthUser(req);
  if (!authUser) return res.status(401).json({ error: 'Not authenticated' });
  const bots = db.prepare('SELECT u.id, u.username FROM users u JOIN sessions s ON s.user_id = u.id WHERE u.is_bot = 1 AND s.expires_at > ?')
    .all(Math.floor(Date.now() / 1000));
  res.json(bots);
});

// ===== START SERVER =====
// HTTPS: set SSL_CERT and SSL_KEY env vars, or place cert.pem/key.pem in project root
const sslCertPath = process.env.SSL_CERT || path.resolve(__dirname, '..', 'cert.pem');
const sslKeyPath = process.env.SSL_KEY || path.resolve(__dirname, '..', 'key.pem');
let server;
if (fs.existsSync(sslCertPath) && fs.existsSync(sslKeyPath)) {
  const https = require('https');
  server = https.createServer({
    cert: fs.readFileSync(sslCertPath),
    key: fs.readFileSync(sslKeyPath),
  }, app);
  console.log('[TLS] HTTPS enabled with', sslCertPath);
} else {
  server = http.createServer(app);
}
// Accept WebSocket on both /ws (custom client) and /v2 (real xat WASM client)
const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', (request, socket, head) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  if (pathname === '/ws' || pathname === '/v2') {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

wss.on('connection', (ws) => {
  console.log('[WS] New connection');
  handleXatConnection(ws);
});

server.listen(port, () => {
  const isHttps = server.cert !== undefined || (server._sharedCreds !== undefined);
  const proto = fs.existsSync(sslCertPath) && fs.existsSync(sslKeyPath) ? 'https' : 'http';
  const wsProto = proto === 'https' ? 'wss' : 'ws';
  console.log(`xat Private Server running at ${proto}://localhost:${port}`);
  console.log(`WebSocket: ${wsProto}://localhost:${port}/ws`);
  const userCount = db.prepare('SELECT COUNT(*) as c FROM users').get().c;
  console.log(`Users registered: ${userCount}`);
});

// Periodic guest cleanup - remove expired guest sessions and orphaned guest accounts
setInterval(() => {
  const now = Math.floor(Date.now() / 1000);
  // Delete expired sessions
  const expiredSessions = db.prepare('DELETE FROM sessions WHERE expires_at < ?').run(now);
  // Delete guest accounts with no active sessions (guest accounts have 'guest:no-password' hash)
  const orphanedGuests = db.prepare(
    "DELETE FROM users WHERE password_hash = 'guest:no-password' AND id NOT IN (SELECT user_id FROM sessions WHERE expires_at > ?)"
  ).run(now);
  if (orphanedGuests.changes > 0) {
    console.log(`[Cleanup] Removed ${orphanedGuests.changes} expired guest accounts`);
  }
  // Clean expired k1 tokens
  db.prepare('DELETE FROM k1_tokens WHERE expires_at < ?').run(now);
}, 60 * 60 * 1000); // Every hour

// Idle timeout — disconnect users inactive for 10 minutes
const IDLE_TIMEOUT = 60 * 60 * 1000; // 60 minutes (real xat keeps connections alive for a long time)
setInterval(() => {
  const now = Date.now();
  for (const [roomId, room] of rooms) {
    for (const [sid, user] of room.users) {
      const lastAct = user.lastActivity || user.joinTime * 1000;
      if (now - lastAct > IDLE_TIMEOUT) {
        if (user.ws && user.ws.readyState === 1) {
          user.ws.close();
        }
        room.users.delete(sid);
        userIdToRoom.delete(String(user.userId));
        broadcastToRoom(roomId, xmlTag('l', { u: user.userId }));
        console.log(`[Idle] ${user.username} timed out from ${roomId}`);
      }
    }
    if (room.users.size === 0) rooms.delete(roomId);
  }
}, 60 * 1000); // Check every minute
