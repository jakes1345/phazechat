# xat-clone Full Codebase Audit Report

**Date:** 2026-04-04
**Scope:** Every file in src/, public/, scripts/, data/, reference/
**Total lines audited:** ~40,000+

---

## CRITICAL BUGS (Must Fix)

### 1. Password Hash Mismatch — Users Can't Log In After Reset
**File:** `src/server.js` ~line 759
**Problem:** `reset-password/confirm` uses `bcryptjs` to hash the new password, but `verifyPassword()` uses `crypto.scrypt`. After reset, login always fails.
**Fix:** Use `crypto.scrypt` (same as registration) in the reset confirm handler.

### 2. pFlags namefont Collision — Corrupts Name Rendering
**File:** `public/content/web/R00241/box/xatcore-js.js` line 492
**Problem:** `if (u.namefont) pFlags |= 64` but 64 = `NamePowers.red`. Users with custom fonts get red name color applied.
**Fix:** Use a unique bit value for namefont or handle it separately from pFlags.

### 3. Pool Suffix Mismatch — Messages Show "Unknown" in Non-Default Pools
**File:** `public/content/web/R00241/box/xatcore-js.js`
**Problem:** `handleUserPacket` stores user IDs with pool suffixes (`"12345_2"`), but `handleMessage` strips suffixes before lookup. Users in pool > 0 show as "Unknown".
**Fix:** Strip pool suffix in `handleUserPacket` before `state.users.set()`.

### 4. Trade Power Loss on UNIQUE Constraint
**File:** `src/server.js` (trade handler)
**Problem:** If trade inserts a power that violates a UNIQUE constraint, the power is lost — removed from sender but not added to receiver.
**Fix:** Wrap trade in a transaction, rollback on any error.

### 5. `/mainowner` Command Exploitable
**File:** `src/server.js`
**Problem:** Insufficient authorization check allows non-owners to claim main owner status.
**Fix:** Verify current user IS the main owner before allowing transfer.

### 6. Switch Fall-Through in ProcessDataFromC
**File:** `public/content/web/R00241/box/activity.js` line 806
**Problem:** Missing `break` after `this.DoNotify()` — falls through to ALERT/HTTP/LANGS/FINISHTRANSACTION cases.
**Fix:** Add `break;` after `this.DoNotify(_0x525c97, _0x23cd7f);`

### 7. LOADSOL Overwrites Instead of Loading
**File:** `public/content/web/R00241/box/activity.js` line 740-743
**Problem:** `localStorage.getItem()` result discarded, value overwritten with new data. Supposed to LOAD, actually SAVES.
**Fix:** Return the getItem result instead of calling setItem.

---

## HIGH SEVERITY

### 8. Unlimited Store Claims — No Rate Limiting
**File:** `src/server.js` `/api/store/claim`
**Problem:** Users can claim infinite xats/days with no cooldown or limit.
**Fix:** Add rate limiting or per-user claim tracking.

### 9. `xs` Username Change — No Uniqueness Check
**File:** `src/server.js` (xatspace save handler)
**Problem:** Username change via xatspace doesn't check if the new name is already taken.
**Fix:** Add uniqueness check before updating.

### 10. Transfer Password SHA-256 vs scrypt Mismatch
**File:** `src/server.js`
**Problem:** Transfer password verification uses SHA-256 but storage uses scrypt. Transfers always fail.
**Fix:** Use consistent hashing (scrypt for both).

### 11. All Powers Cost = 0
**File:** `src/server.js` (powers database)
**Problem:** Every power in the database has cost_xats = 0. No real economy.
**Fix:** Populate real costs from pow2 data.

### 12. console.log Silenced in Production
**File:** `public/content/web/R00241/box/activity.js` line 127
**Problem:** `debugNoLogs = true` suppresses ALL console.log output. All `[xatcore-js]` debug logs invisible.
**Fix:** Set to false during development, or use a separate debug channel.

### 13. handleInteraction is a Stub
**File:** `public/content/web/R00241/box/xatcore-js.js` line 952
**Problem:** `<a>` packets (real xat kiss/hug/gift interactions) are only logged, never rendered.
**Fix:** Implement actual interaction rendering, or redirect to `<hg>` handler.

### 14. mainInitDone Set Too Early — Duplicate Visitors
**File:** `public/content/web/R00241/box/xatcore-js.js` line 674
**Problem:** Set to `true` BEFORE rank-group emission loop completes. Concurrent `<u>` packets cause duplicate entries.
**Fix:** Move `state.mainInitDone = true` to after line 733.

### 15. Hardcoded Audie Sound List
**File:** `public/content/web/R00241/box/xatcore-js.js` line 789
**Problem:** Only 13 of ~600+ audies recognized for auto-play.
**Fix:** Reference the `audiesList` array from xat.js instead of hardcoding.

---

## MEDIUM SEVERITY

### 16. Cloudflare Beacon Phones Home
**File:** `public/content/web/R00241/apps/abx/abx.html`
**Problem:** Contains real Cloudflare analytics beacon with xat.com's production token. Calls home on every page load.
**Fix:** Remove the beacon script tag entirely.

### 17. Turnstile CAPTCHA Uses xat.com's Production Key
**File:** `public/content/web/R00241/box/www/selector.js`
**Problem:** Sitekey `0x4AAAAAAA9EZmss0YydDlgD` is xat.com's real key. CAPTCHA won't work.
**Fix:** Replace with own key or disable CAPTCHA for private server.

### 18. TicTacToe Player Assignment Bug
**File:** `public/games/tictactoe.html`
**Problem:** `mySymbol` always hardcoded to `'X'` regardless of `?player=` param. Both players play as X.
**Fix:** Set `mySymbol` based on the player URL parameter.

### 19. shortname.html checkName() Always False-Positive
**File:** `public/shortname.html`
**Problem:** `.then(function(id) { parseInt(id) })` on a JSON response — parseInt of JSON string = NaN.
**Fix:** Parse the JSON first, then extract the ID.

### 20. GOE gcontrol Schema Mismatch
**File:** `public/web_gear/chat/goe/html/80.html` vs `public/gcontrol.html`
**Problem:** Web-based gcontrol uses simplified field set; GOE file uses full real xat schema. Incompatible data.
**Fix:** Align field names and rank values between both files.

### 21. parseXml Missing &apos; Unescape
**File:** `public/content/web/R00241/box/xatcore-js.js` line 113
**Problem:** Single-quote entities in XML attributes not decoded.
**Fix:** Add `&apos;` -> `'` to the unescape chain.

### 22. escapeJson Incomplete
**File:** `public/content/web/R00241/box/xatcore-js.js` line 1298
**Problem:** Only escapes `\` and `'` but not newlines, tabs, or control characters.
**Fix:** Escape `\n`, `\r`, `\t`, and control chars.

### 23. updateFriendsPanel ToC Scope Issue
**File:** `public/content/web/R00241/box/xatcore-js.js` line 1216
**Problem:** `typeof ToC === 'function'` evaluates in embed.html's scope where ToC is NOT defined. Friends panel never updates.
**Fix:** Access ToC through the appframe's contentWindow.

### 24. Avatar Image Handling Dead Code
**File:** `public/content/web/R00241/box/xatcore-js.js` lines 500-505
**Problem:** Three if/else branches all do `image = avatar` — conditions are meaningless.
**Fix:** Remove dead branches.

### 25. kiss.html is a Non-Functional Placeholder
**File:** `public/content/web/R00241/box/www/kiss.html`
**Problem:** Static placeholder with a beating heart emoji. Never listens for postMessage from xat2.js, never sends `kissDone`/`kissClick` back. Kiss/blast overlay appears but never auto-dismisses.
**Fix:** Implement real kiss animation: receive `{name, Message, color, Cols, Bust}`, load sprite, animate, post `kissDone`.

### 26. Firebase Uses Real xat.com Production Credentials
**File:** `public/content/web/R00241/box/www/firebase.js`
**Problem:** Uses project `com-xat-firepush`, apiKey `AIzaSyAqzoQW31FchUw2v7wZuUmzXQsLtA_8hR4`. Could interfere with real xat push notifications.
**Fix:** Replace with clone-specific Firebase project or disable push entirely.

### 27. GifUtility.isInGifs() Always Returns False
**File:** `public/content/web/R00241/box/www/Quickbar.js`
**Problem:** Compares `width_`/`height_` properties but stored properties are `width`/`height` (no underscore). GIF dedup cache never hits.
**Fix:** Use consistent property names.

### 28. Smilies.js Lights Ultra Effect Missing .instance
**File:** `public/content/web/R00241/box/www/Smilies.js`
**Problem:** `_Activity.Window.document.body.animate(...)` should be `_Activity.instance.Window...`. Throws TypeError.
**Fix:** Add `.instance`.

### 29. settings.js Category Color Picker Bug
**File:** `public/content/web/R00241/box/www/settings.js` ~line 1514
**Problem:** `categoryColor.on("save")` calls `this.keywordColor.hide()` instead of `this.categoryColor.hide()`. Wrong picker dismissed.
**Fix:** Change to `this.categoryColor.hide()`.

### 26. sca Cookie Bug
**File:** `public/content/web/R00241/common.js`
**Problem:** sca (session cookie attribute) parsing/setting has a bug that corrupts cookie values.
**Fix:** Review and fix the sca cookie handling logic.

### 27. Language Storage Mismatch
**File:** `public/content/web/R00241/common.js` / `direct.js`
**Problem:** Language preference stored in different keys/locations between common.js and the chat iframe.
**Fix:** Use a single consistent storage key.

### 28. Broken Sanitize() Function
**File:** `public/content/web/R00241/common.js`
**Problem:** The sanitize function has gaps that allow certain HTML through.
**Fix:** Review and strengthen the sanitizer.

---

## LOW SEVERITY / MISSING FEATURES

### 33. Missing API Endpoints
| Endpoint | Called By | Status |
|----------|----------|--------|
| `GET /api/smiley/:id` | trade.html | Missing |
| `GET /api/groups/search?q=` | search.html | Missing |
| `POST /api/reports` | report.html | Stub |

### 30. Missing Client Functions (All Guarded — Won't Crash)
- `openGameWindow()` — game window never opens
- `handleGameMove()` — game moves never processed
- `showNotification()` — notifications never shown

### 31. Hardcoded localhost:6969 Throughout
Dozens of files hardcode `http://localhost:6969`. Should use relative URLs or a configurable base.

**Files affected:** selector.js, settings.js, classic.js, messages.js, Smilies.js, abx.html, and more.

### 32. buygroup.html Fake Data
**File:** `public/buygroup.html`
**Problem:** 6 hardcoded fake group listings (RetroGaming, MusicLounge, etc.)
**Fix:** Wire to real group marketplace API.

### 33. auction.html Sample Data Visible
**File:** `public/auction.html`
**Problem:** 6 hardcoded sample auction rows show if API returns empty.
**Fix:** Only show rows from API data.

### 34. home.html Social Links Are Placeholders
**File:** `public/home.html`
**Problem:** All social media links are `href="#"`.
**Fix:** Either remove or point to real social accounts.

### 35. index.html .html Suffix Links
**File:** `public/index.html`
**Problem:** Nav links use `/trade.html`, `/store.html` etc. but server routes don't have `.html` suffix.
**Fix:** Use `/trade`, `/store`, `/login` consistently.

### 36. Games Are All Single-Player
All mini-games (SnakeRace, Pawns, Grid/TicTacToe, Doodle2) are single-player local only. The originals were multiplayer via WebSocket.

### 37. Doodle2 Not Multiplayer
The original xat Doodle was multiplayer canvas sharing. Current implementation is local-only drawing.

### 38. report.html Form Is a Stub
The report submission form has no backend handler.

### 39. friends.js debug("fake") Call
**File:** `public/content/web/R00241/box/www/friends.js`
`debug("fake")` call in `main()` — likely undefined function.

### 40. Logout Nukes ALL localStorage
**File:** `public/content/web/R00241/box/www/selector.js`
`localStorage.clear()` on logout removes everything, including unrelated data.

### 41. newstuff() Dead Code
**File:** `public/content/web/R00241/box/www/classic.js`
Hardcoded date range (March-April 2021) — always evaluates false.

### 42. Reference Client Outdated
- Uses TCP sockets (old protocol), not WebSocket
- MAX_PWR_INDEX = 14 but real xat uses 24 power slots (p0-p23)
- PoW format changed from perlin noise to numeric challenge

### 43. pow2 Parse Format
**File:** `data/pow2_real2.json`
Real pow2.php returns `[[key, value], ...]` array, not a plain object. Code parsing it as an object will break.

---

## ARCHITECTURE NOTES

### Data Flow
```
Browser -> index.html -> common.js -> direct.js -> embed.html (iframe)
  embed.html loads: xat.js -> xatcore-js.js -> activity.js
  xatcore-js.js patches SendC, connects WS to server
  activity.js manages tick loop, FIFO queue
  classic.html loaded inside appframe (innermost iframe)
  classic.html loads: messages.js, visitors.js, actions.js, settings.js, friends.js, selector.js
```

### Server Stack
- Express HTTP on port 6969
- WebSocket on same port at `/ws`
- SQLite via better-sqlite3
- 21+ DB tables, ~100+ HTTP routes
- Stealth Puppeteer for Cloudflare bypass (smiley fetching)
- proxyXatApi with 24h disk cache

### Protocol
- XML-over-WebSocket with null byte framing
- Join: `<y>` -> `<j2>` -> `<i>` -> `<gp>` -> `<aa>` -> `<w>` -> `<o>` -> `<u>` -> `<m>` -> `<done>`
- Powers: 24 bitmask slots (p0-p23), 32 bits each
- Rank: `q` attribute (1=main_owner, 2=mod, 3=member, 4=owner)

---

## PRIORITY ORDER FOR FIXES

1. **Password hash mismatch** (#1) — blocks all password resets
2. **Trade power loss** (#4) — data loss bug
3. **mainowner exploit** (#5) — security vulnerability
4. **Unlimited store claims** (#8) — economy exploit
5. **Username change no uniqueness** (#9) — data integrity
6. **Transfer password mismatch** (#10) — blocks all transfers
7. **Pool suffix mismatch** (#3) — broken multi-pool chat
8. **pFlags namefont collision** (#2) — corrupts rendering
9. **Switch fall-through** (#6) — latent defect
10. **LOADSOL overwrite** (#7) — localStorage corruption
11. **Cloudflare beacon** (#16) — privacy/security
12. **All remaining items** in order listed above
