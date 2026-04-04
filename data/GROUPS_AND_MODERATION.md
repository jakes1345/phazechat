# xat.com Groups, Rooms & Moderation - Deep Research

## 1. Rank Hierarchy

### Complete Rank Order (lowest to highest)
| Rank | Pawn Color | Rank Value (GetRank) | f&7 Flag | r Value (i packet) |
|------|-----------|---------------------|----------|-------------------|
| Guest (unregistered) | Green | 0 | 0 | - |
| Guest (registered) | Green | 0 | 0 | - |
| Temp Member | Blue | ~3 | 3 | 3 |
| Member | Blue | ~3 | 3 | 3 |
| Temp Moderator | White | ~7 | 2 | 2 |
| Moderator | White | 7 | 2 | 2 |
| Sinbin (mod stripped) | White (demoted) | <7 | 2 | 2 |
| Temp Owner | Orange | ~10 | 4 | 4 |
| Owner | Orange | 10 | 4 | 4 |
| Main Owner | Orange | 14 | 1 | 1 |

### Flag Bits in `f` attribute (user packets)
- `f & 7` = rank: 0=guest, 1=main owner, 2=moderator, 3=member, 4=owner
- `f & 8` = not new (already announced)
- `f & 16` = banned
- `f & 32` = VIP/subscriber
- `f & 64` = forever banned
- `f & 0x0100 (256)` = gagged
- `f & 0x0200 (512)` = cannot be kicked (protected flag)
- `f & 65536` = typing indicator

### `q` attribute bits (user packets)
- `q & 1` = OnXat (user is on xat platform, not embedded)
- `q & 2` = VIP/subscriber

### `r` attribute (in `i` packet - your own rank)
- 1 = Main Owner (sets both mainowner and owner flags)
- 2 = Moderator
- 3 = Member
- 4 = Owner
- Other = Guest (clears pass)

### `v` attribute (in `i` packet - VIP status)
- 1 = Normal
- 3 = VIP (w_VIP)
- 4 = ALLP (w_ALLP / allpowers)

---

## 2. Permissions Per Rank

### Guest (Green Pawn)
- Can chat in main room
- Can receive/send private messages
- Cannot post links (filtered out if not member+)
- Cannot use moderation tools
- Affected by protect mode (/p gagged 3 min)

### Member (Blue Pawn)
- Everything a guest can do
- Can post links in chat
- Higher position on user list than guests
- Can kick banned users (members can kick banned guests only)
- With gcontrol, can be given additional permissions

### Moderator (White Pawn)
- Everything a member can do
- Can kick lower-ranked users (guests, members)
- Can ban users for up to 6 hours (default)
  - +2 hours with Mod8 power owned
  - +2 hours with GControl power owned
  - +4 hours total if both Mod8 AND GControl
- Can gag users up to 1 hour
- Can dunce users (add dunce hat to pawn)
- Can naughty step users (1 msg per 30 sec)
- Can yellowcard users
- Can use redcard
- Can make/remove members (with gcontrol permission)
- Cannot kick/ban equal or higher ranks
- Can set scroller (if permanent mod, with gcontrol)

### Owner (Orange Pawn)
- Everything a moderator can do
- Can ban for any duration including forever (enter 0 = permanent)
- Can make/remove moderators
- Can make/remove members
- Can set scroller message (/s)
- Can enter protect mode (/p, /pr, /pm)
- Can hush chat (/h)
- Can use /i to see who last set scroller/hush/protect
- Can use mute (silent ban, user doesn't know they're banned)
- Can sinbin moderators (strip mod powers 1-24 hours)
- Can make temporary moderators (tempmod, up to 24 hours)
- Can make temporary members (tempmem, up to 24 hours)
- Can use stealth mode ($ prefix in name, invisible on user list)
- Can access editgroup with account password (limited tabs)

### Main Owner (Orange Pawn, highest authority)
- Everything an owner can do
- Can make/remove owners
- Can make temporary owners (tempown, up to 24 hours)
- Can access ALL editgroup tabs including "main owners" and "miscellaneous"
- Can change group password
- Can add/remove main owners
- Can activate/deactivate group powers
- Can configure gcontrol settings
- Can back up chat CSV
- Can use "get main" to reclaim ownership
- Not affected by gag/hush (IsGagUser forced false for main owners)

---

## 3. Group Creation

- **Free**: Creating a basic group costs nothing
- **Requirements**: Must be a registered xat user
- **Process**: Go to xat.com/create, fill form, verify email via activation link, complete CAPTCHA
- **Group Name**: Must be unique, becomes the URL (xat.com/GroupName)
- **Group Password**: Alphanumeric only (a-z, A-Z, 0-9), symbols/spaces stripped
- **Inactive Groups**: After 90 days of inactivity, a group can be purchased by another user
- **Promotion**: Cannot promote a group less than 7 days old; costs 100 xats/hour for English

---

## 4. EditGroup Interface

Accessed at `xat.com/chats#!editgroup` or by hovering "group" > "customize" in chat.

### Login Methods
1. **Group Password**: Full access to all tabs
2. **Account Password**: Limited access (no "main owners" or "miscellaneous" tabs)

### Tabs

#### Chat Tab
- **Group Name**: Display name
- **Description**: Group description
- **Language**: Dropdown for group language (affects promotion/features pages)
- **Inner Background**: Image URL or color picker (displayed inside chat)
- **Outer Background**: Image URL or color picker (displayed behind chat)
- **Transparent**: Checkbox for transparent chat box
- **Radio Station**: URL for streaming radio
- **Button**: Custom button configuration
- **Scroller**: Current scroll message

#### Group Powers Tab
- Lists all assigned powers (filterable by assigned/unassigned, by name/ID)
- Activate/deactivate via checkbox + save
- "Edit" button for powers with configurable settings (e.g., GControl, Announce, Rankpool)

#### Main Owners Tab (group password only)
- Add main owners by ID or username
- Remove main owners
- Main owners added here can access settings with their account password
- With Main power, can configure which sub-tabs each main owner can access

#### Miscellaneous Tab (group password only)
- **Change Password**: Change group password
- **Get Main**: Reclaim main ownership
- **Backup**: Download chat CSV backup
- **Additional options**: "Don't include this chat box on any lists or charts" (NoList)

---

## 5. The `i` (Init) Packet - Room Settings

```
<i b="BG;=NAME;=ID;=LANG;=RADIO;=BUTTON" f="FLAGS" v="VIP_STATUS" cb="VERSION" />
```

### `b` field (semicolon-equals delimited)
- Position 0: Background URL/color
- Position 1: Group name
- Position 2: Group ID (attached)
- Position 3: Language code
- Position 4: Radio URL
- Position 5: Button config

### `f` field - Room Flags (from xconst.as)
- `f_Lobby = 2` - Is a lobby
- `f_Group = 64` - Is a group
- `f_MembersOnly = 128` - Members only mode
- `f_MembersOnly2 = 0x100000` - Alternative members only
- `f_Live = 0x200000` - Live mode (PMs only from members+)
- `f_NoList = 0x0200` - Hidden from search/lists
- `f_NoSmilies = 0x0800` - Smilies disabled
- `f_DefNoSound = 131072` - Default sound off
- `f_Deleted = 33554432` - Group is deleted

---

## 6. Group Powers (`gp` packet)

### Power Bitmask (`p` attribute)
The `p` attribute contains pipe-delimited integers representing bitmasks of assigned powers:
```
p="0|0|1163220288|1079330064|20975876|269549572|16645|4210689|1|4194304|0|0|0|"
```
Each integer is a 32-bit bitmask. Power IDs 0-31 map to bits in index 0, 32-63 to index 1, etc.

### Group-Specific Power Settings (g-prefixed attributes)

| Attribute | Power | Content |
|-----------|-------|---------|
| `g80` | GControl | JSON with permission rank minimums |
| `g90` | BadWords filter | Comma-separated banned words |
| `g100` | Redirect | Chat names and keys for redirection |
| `g106` | Censor/Flix | Custom flix configuration |
| `g112` | Announce | Welcome message text |
| `g114` | Rankpool | JSON with pool names and rank requirements |
| `g180` | (Misc settings) | JSON with various options |
| `g246` | Naughtystep/Yellowcard | JSON with rank/duration settings |
| `g256` | Redcard | JSON with rank/duration settings |
| `g74` | (Smiley config) | Comma-separated smiley names |

### Power ID to Name Mapping (from xconst.as pss string)
The complete power list is indexed starting at 0:
- 0: powers, 1: allpowers, 2: topman, 3: subhide, 4: mod8, 5: zoom
- 6: nofollow, 7: invert, 8: mirror, 9: noaudies, 10: reghide, 11: nopc
- 12: tempmod, 13: hat, 14: red, 15: green, 16: blue, 17: light
- 18: heart, 19: shuffle, 20: animate, 21: square, 22: nameglow, 23: cycle
- 24: hexagon, 25: clear, 26: boot, 27: octogram, 28: show, 29: superkick
- 30: invisible, 31: pink
- 32: guestself, 33: sinbin, 34: diamond, 35: purple, 36: ttth, 37: hands
- 38: hairm, 39: hairf, 40: fade, 41: gag, 42: costumes, 43: six
- 44: dood, 45: angel, 46: mute, 47: radio, 48: fruit, 49: sport
- 50: num, 51: hush, 52: halloween, 53: anime, 54: status, 55: thanksgiving
- 56: snowy, 57: christmas, 58: count, 59: stick, 60: dx, 61: tempmem
- 62: valentine
- 64: blueman, 65: party, 66: irish, 67: flashrank, 68: easter, 69: nopm
- 70: banish, 71: circus, 72: gkaoani, 73: military, 74: gline
- 75: bump, 76: gkaliens, 77: scifi, 78: supporter, 79: tempown
- 80: gcontrol, 81: tickle, 82: sea, 83: silly, 84: blastpro, 85: flag
- 86: blastban, 87: independence, 88: blastde, 89: summer, 90: bad
- 91: rapid, 92: horror, 93: mint, 94: blastkick, 95: everypower
- 96: winter, 97: adventure, 98: feast, 99: single, 100: link
- 101: shocker, 102: fairy, 103: namecolor, 104: gkbear, 105: angry
- 106: gscol, 107: ugly, 108: love, 109: barge, 110: gkkitty
- 111: fantasy, 112: announce, 113: hero, 114: rankpool, 115: spin
- 116: animal, 117: music, 118: gkpanda, 119: unwell, 120: events
- 121: zap, 122: sins, 123: outfit, 124: wildwest, 125: work, 126: banpool
- 128: beach, 129: candy, 130: gback, 131: zodiac, 132: flower
- 133: space, 134: snakeban, 135: stoneage, 136: spaceban, 137: dance
- 138: kpeng, 139: nerd, 140: matchban, 141: school, 142: silentm
- 143: punch, 144: away, 145: peace, 146: kchick, 147: carve
- 148: spooky, 149: kdog, 150: bot, 151: manga, 152: mazeban
- 153: gold, 154: snowman, 155: reindeer, 156: santa, 157: sparta
- 158: dunce
- 160: newyear, 161: can, 162: codeban, 163: magicfx, 164: spy
- 165: kduck, 166: heartfx, 167: carnival, 168: topspin, 169: movie
- 170: monster, 171: kat, 172: typing, 173: ksheep, 174: pulsefx
- 175: blobby, 176: reverse, 177: fuzzy, 178: spiralfx, 179: nursing
- 180: gsound, 181: kbee, 182: vortexfx, 183: jail, 184: zip
- 185: drip, 186: moustache, 187: whirlfx, 188: doodlerace, 189: olympic
- 190: aliens
- 192: matchrace, 193: burningheart, 194: snakerace, 195: kpig
- 196: poker, 197: pony, 198: clockfx, 199: drop, 200: spacewar
- 201: speech, 202: vampyre, 203: treefx, 204: claus, 205: quest
- 206: lang, 207: quest2, 208: glitterfx, 209: xavi, 210: kmouse
- 211: eighties, 212: foe, 213: zombie, 214: makeup, 215: kheart
- 216: kmonkey, 217: nuclear, 218: stylist, 219: spring, 220: vote
- 221: hands2, 222: eggs, 224: hearts, 225: kfox, 226: kcow
- 227: sketch, 228: led, 229: seaside, 230: hair2f, 231: statusglow
- ...continues to 296+

### Notable Group Powers (assigned to chat, not personal)
| Power | ID | Description |
|-------|-----|-------------|
| gcontrol | 80 | Fine-tune chat permissions per rank |
| gag | 41 | Gag users (silence 1 hour max) |
| sinbin | 33 | Strip moderator powers temporarily |
| hush | 51 | Silence all users of a rank |
| mute | 46 | Silent ban (user doesn't know) |
| dunce | 158 | Add dunce hat to user pawn |
| naughtystep | 285 | Limit to 1 msg per 30 sec |
| yellowcard | 293 | Warning card on pawn |
| redcard | 256 | Red card - talking = auto-ban |
| boot | 26 | Redirect users to other chats |
| barge | 109 | Enter full pools by removing someone |
| announce | 112 | Custom welcome message |
| rankpool | 114 | Create rank-based pools |
| banpool | 126 | Create pool for banned users |
| redirect | 100 | Auto-redirect to other chats |
| tempmod | 12 | Make temporary moderators |
| tempown | 79 | Make temporary owners |
| tempmem | 61 | Make temporary members |
| mod8 | 4 | Extend mod ban time by 2 hours |
| rapid | 91 | Single-click moderation actions |
| zap | 121 | Kick with screen shake + audio |
| silentm | 142 | Silent member promotion |
| badge | 289 | Add badge to user pawn |
| kickall | 253 | Kick all users at once |
| lang | 206 | Multi-language chat box |
| gback | 130 | Group background customization |
| gsound | 180 | Group sound settings |
| gscol | 106 | Group scroller color |
| gline | 74 | Custom line of smilies |

---

## 7. GControl (Power 80) - g80 Packet Fields

The `g80` attribute in the `gp` packet contains a JSON object with permission settings.

### Verified Fields (from reference server)
```json
{
  "mb": "11",     // Minimum rank to Make Member (11 = tempmod+)
  "ubn": "8",     // Minimum rank to Unban
  "mbt": 24,      // Max Ban Time in hours for mods
  "ss": "8",      // Minimum rank to Set Scroller
  "rgd": "8",     // Minimum rank to use Redirect
  "prm": "14",    // Minimum rank to Promote (make mod/owner) (14 = main owner)
  "bge": "8",     // Minimum rank to use Badge
  "mxt": 60,      // Max ban time (extended?) in hours
  "sme": "11",    // Minimum rank to use Silent Member
  "dnc": "11",    // Minimum rank to use Dunce
  "bdg": "11",    // Minimum rank to use Badge
  "yl": "10",     // Minimum rank to use Yellowcard (10 = owner)
  "rc": "10",     // Minimum rank to use Redcard (10 = owner)
  "p": "7",       // Minimum rank to use Protect mode (7 = moderator)
  "ka": "7"       // Minimum rank to Kick All
}
```

### Rank Values Used in GControl
| Value | Rank |
|-------|------|
| 0 | Guest |
| 3 | Member |
| 7 | Moderator |
| 8 | Temp Owner / Higher Mod |
| 10 | Owner |
| 11 | Temp Mod+ (stricter) |
| 14 | Main Owner |

---

## 8. Moderation Tools

### Kick
- **Who**: Mods+ (can only kick lower ranks)
- **Effect**: User must sign in again, 15-second cooldown before talking
- **Command**: Click user > Kick button, or use superkick (power 29) for one-click
- **Special**: Members can kick banned guests

### Ban
- **Who**: Mods+ (can only ban lower ranks)
- **Duration Limits**:
  - Moderator default: 6 hours
  - +2 hours with Mod8 power
  - +2 hours with GControl power
  - Maximum mod ban: 10 hours (with both)
  - Owner: unlimited (0 = permanent/forever)
  - GControl can raise mod max to 99 hours
- **Process**: Click user > Ban button > set duration + reason > Ban
- **Flags**: Banned = `f & 16`, Forever = `f & 64`

### Gag
- **Requires**: Gag power (ID 41) assigned to group
- **Who**: Mods+
- **Duration**: Up to 1 hour
- **Effect**: User cannot speak, no notification shown
- **Flag**: `f & 0x0100 (256)` = gagged
- **Process**: Click user > Ban > select duration > Gag button

### Dunce
- **Requires**: Dunce power (ID 158) assigned to group
- **Who**: Mods+ (can dunce equal or higher rank with power 158)
- **Effect**: Adds dunce hat to user's pawn
- **Process**: Click user > Ban > set duration + reason > Dunce button
- **Special**: Unlike kick/ban, dunce can affect equal ranks if you have the power

### Naughty Step
- **Requires**: Naughtystep power (ID 285) assigned to group
- **Who**: Mods+
- **Effect**: Limits user to 1 message per 30 seconds in main pool
- **Process**: Click user > Kick > Naughty button

### Yellowcard
- **Requires**: Yellowcard power (ID 293) assigned to group
- **Who**: Temp mods+ (cannot yellowcard equal or higher ranks)
- **Effect**: Yellow card icon appears on user's pawn (warning)
- **Removal**: Click user > Kick > UnYellow button
- **g246 settings**: `{'rnk':'8','dt':30,'rt':'10','rc':'1','tg':1000,'v':1}`
  - rnk: minimum rank, dt: duration, rt: rate, rc: rank check, tg: target

### Redcard
- **Requires**: Redcard power (ID 256) assigned to group
- **Who**: Mods+
- **Effect**: Red card on pawn; if user talks in main chat, auto-banned for 6x the redcard duration (default multiplier)
- **PC safe**: Sending private chat/PM does NOT trigger redcard
- **g256 settings**: `{'rnk':'8','dt':120,'rc':'1','v':1}`
  - rnk: minimum rank, dt: duration, rc: rank check

### Mute (Silent Ban)
- **Requires**: Mute power (ID 46)
- **Who**: Owners only
- **Duration**: Up to 1 hour
- **Effect**: User doesn't know they're banned; messages appear to send but nobody sees them

### Silent Ban (Silentban)
- **Who**: Temp owners+
- **Duration**: Up to 1 hour
- **Effect**: Ban is invisible to all other users, including main owner. The banned user does not see they've been banned.

### Sinbin
- **Requires**: Sinbin power (ID 33)
- **Who**: Owners/Main Owners only
- **Effect**: Strips moderator of kick/ban abilities for 36 seconds to 24 hours
- **Command**: Private chat the mod > `/n` followed by hours (e.g., `/n2.5` = 2h30m)
- **Note**: Only works on permanent mods, not temp mods. Mod stays sinbinned until they sign out/in after timer expires.

### Zap
- **Requires**: Zap power (ID 121)
- **Who**: Mods+
- **Effect**: Kick user while shaking the chat + optional audio

### Rapid
- **Requires**: Rapid power (ID 91)
- **Who**: Mods+
- **Effect**: Single-click moderation (ban, gag, mute, member, guest in one click)

---

## 9. Room Control Commands

### Protect Mode
- `/p` - Protect: All guests gagged for 3 minutes for 1 hour
- `/pr` - Registered only: Only registered users can talk
- `/pm` - Members only: Only members+ can talk
- **Duration**: 60 minutes for all protect modes
- **Who**: Any owner can activate
- **Note**: Don't use /pr while promoted (can lose promotion)

### Hush
- **Requires**: Hush power (ID 51)
- **Who**: Owners/Main Owners
- **Commands**:
  - `/hD` - Hush guests for D seconds (10-60)
  - `/hmD` - Hush members and below
  - `/hdD` - Hush moderators and below
  - `/hoD` - Hush owners and below
- **Example**: `/h60Quiet please` - gags all guests for 60 seconds with message

### Scroller
- **Who**: Owners/Main Owners (configurable via gcontrol `ss` field)
- **Command**: `/s MESSAGE` (no space after /s)
- **Color**: Append HTML color code to end of message
- **Rank-based**: With Rankscroll power, use `/s RANK,MESSAGE`
- **API**: SetScroller endpoint at `xat.com/web_gear/chat/SetScroller.php`
  - Parameters: `Message`, `id`, `pw` (from extra features URL)
  - Rate limit: 1 update per minute
  - Supports GET and POST

### Info
- `/i` - Shows who last: set scroller (/s), hushed (/h), entered protect (/p)

---

## 10. Pool System

### Default Pool
- Every chat starts with 1 pool (pool 0 = main pool)

### Rankpool (Power 114)
- Creates private pools for specific ranks
- Can name the first two pools
- Pool names limited to 19 characters
- Users can see pool user counts by hovering over the user count in quickbar

### Rankpool Settings (g114)
```json
{'m':'Lobby','t':'Staff','rnk':'8','b':'Jail','brk':'8','v':1}
```
- `m`: Main pool name
- `t`: Staff pool name
- `rnk`: Minimum rank for staff pool
- `b`: Ban pool name (if banpool assigned)
- `brk`: Minimum rank for ban pool access
- `v`: Version

### Banpool (Power 126)
- Creates a brown-colored pool for banned users
- Banned users are sent to this pool on refresh
- Cannot view main chat while in banpool
- Requires Rankpool to also be assigned

### Pool Navigation
- `/go POOLNAME` or `/go POOLNUMBER` to switch pools
- Pool data sent via `w` packet: `<w v="USER_POOL CHAT_POOL" />`

### Pool Names (from xconst.as)
Random pool names generated from two word lists:
- List 1: funky, boogie, cool, groove, divine, glory, swell, nifty, crazy, freak, wacky, quirky, weird, wild, strange, style, radical, urban, wicked
- List 2: town, zone, club, city, time, community, center, place, central, nation, state, district, jungle, land, realm, tribe, monkeys, junction, show, point

---

## 11. Announce (Power 112)

- Group power that sends a custom welcome message to all users entering the chat
- Configured in editgroup > group powers > Announce > edit
- Stored in `g112` attribute of `gp` packet
- **Available tags**: `{id}`, `{regname}`, `{nickname}`, `{userscount}`, `{latestpower}`, `{rank}`, `{chatversion}`
- Example: `"Welcome to the lobby! Visit assistance and help pages."`

---

## 12. Embedding

- Access embed code: hover "group" > "embed"
- Uses iframe to embed chat on external websites or xatspaces
- Customizable dimensions
- Changes may take up to 10 minutes to go live on xatspace
- URL format: `xat.com/web_gear/chat/embed.php?GroupName=NAME&id=ID`

---

## 13. Group Discovery & Search

- Groups menu shows available chat rooms
- Categories: anime, gaming, music, technology, news, etc.
- Privacy: Enable "Don't include this chat box on any lists or charts" to hide from search
- Flag: `f_NoList = 0x0200` in room flags
- Promotion: Pay xats to appear on homepage (100 xats/hour for English)

---

## 14. Group Security

### Password Protection
- Group password required for full editgroup access
- Alphanumeric only (symbols/spaces stripped)
- Minimum 8 characters recommended
- Password recovery via email linked to group creation

### Access Control
- `/pr` - Registered users only
- `/pm` - Members only
- `f_MembersOnly = 128` flag in room settings
- Main owners added via editgroup can use account password (limited access)

### Stealth Mode
- Owners/Main Owners can prefix name with `$` to become invisible on user list
- `IsStealth = ((IsOwner) || (IsMainOwner))` when name starts with `$`

---

## 15. Temporary Rank Powers

| Power | ID | Who Can Use | Max Duration | Command |
|-------|-----|------------|-------------|---------|
| Tempmem | 61 | Mods, Owners, Main Owners | 24 hours | `/mbTIME` in PC |
| Tempmod | 12 | Owners, Main Owners | 24 hours | `/mTIME` in PC |
| Tempown | 79 | Main Owners only | 24 hours | `/MTIME` in PC |

---

## 16. Group Power Categories

### IsGroup Powers (from xconst.as)
Powers at even IDs from 70-120 and specific IDs (126, 130, 134, 188, 192, 194, 200, 206, 220, 224, 238, 246, 252, 256, 296) are group powers - they must be assigned to the chat to function.

### Game Powers (Group)
- spacewar (200), snakerace (194), matchrace (192), doodlerace (188), snakeban (134), spaceban (136), matchban (140), mazeban (152), codeban (162), slotban (251)

### Moderation Powers (Group)
- gcontrol (80), gag (41), hush (51), mute (46), sinbin (33), dunce (158), naughtystep (285), yellowcard (293), redcard (256), badge (289), rapid (91), zap (121), kickall (253), silentm (142)

### Utility Powers (Group)
- announce (112), rankpool (114), banpool (126), boot (26), barge (109), redirect (100), gback (130), gsound (180), gscol (106), gline (74), lang (206), gstyle (636)

---

## 17. Bad Words Filter (g90)

- Stored in `g90` attribute of `gp` packet
- Comma-separated list of filtered words
- Also has built-in badwords list in xconst.as (bw variable)
- Built-in: cunt, fuck, wanker, nigger, bastard, prick, bollocks, asshole, cyber, blowjob, clit, cock, wank, twat, vagina, pussy, whore, porn, penis, sperm, spunk, ejaculat, bitch

---

## 18. Special Pawn Colors (Powers)

| Power | Effect |
|-------|--------|
| pink (31) | Pink pawn |
| blueman (64) | Dark blue pawn |
| purple (35) | Purple pawn (epic/expensive) |
| gold (153) | Gold pawn |
| hat (13) | Hat on pawn |
| dunce (158) | Dunce hat on pawn (moderation) |
| yellowcard (293) | Yellow card on pawn |
| redcard (256) | Red card on pawn |
| badge (289) | Badge on pawn |

### Default Colors
- Green: Guest
- Blue: Member
- White: Moderator
- Orange: Owner/Main Owner
- Brown: Banned
- Red: Offline
- Grey: Ignored
- Black: xat Staff
- Cyan: Celebrity
