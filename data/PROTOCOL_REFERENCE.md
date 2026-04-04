# xat.com Real Protocol Reference

Captured from live WebSocket sessions against xat.com/Chat (room 123).
All packet data is observed exactly as-sent; nothing here is speculative.

---

## Transport

- WebSocket (wss or ws), XML-formatted text frames
- Each frame is a self-closing XML element: `<tagname attr="value" />`
- Direction notation: C→S = client to server, S→C = server to client

---

## Join Sequence (observed order)

Two complete join cycles were captured. Both follow the same order.

```
Step  Dir   Packet  Notes
  0   C→S   y       Client opens handshake
  1   S→C   y       Server handshake response (assigns session IDs)
  2   C→S   j2      Client join request
  3   S→C   i       Room info
  4   S→C   gp      Group powers
  5   S→C   aa      Announcement (base64 HTML)
  6   S→C   m       MOTD/system message (d="0" means no sender)
  7   S→C   w       Pool/rank counts
  8+  S→C   o       Offline users (one per user)
 12+  S→C   u       Online users (one per user, in rank order)
 N    S→C   m       Replayed recent messages (with original E= timestamps)
 N+1  S→C   m       Room topic/welcome line (d="<timestamp>" or d="0")
 N+2  S→C   done    Signals end of backfill; room is now live
```

After `done`, the client sends a keepalive `<C />` and can reconnect with a new `<y>` + `<j2>` (second join shown starting at step 42).

---

## Packet Formats

### y — Handshake

**C→S (client initiates):**
```xml
<y r="123" v="0" u="2" />
```
| Attr | Example | Meaning |
|------|---------|---------|
| r    | 123     | Room ID |
| v    | 0       | Protocol version |
| u    | 2       | User ID (2 = guest) |

**S→C (server response):**
```xml
<y I="32701" i="1329443014" c="1774108729" cb="147" p="697701586809030,1" k="32701" t="10034" s="51" e="125563435" />
```
| Attr | Example         | Meaning |
|------|-----------------|---------|
| I    | 32701           | Server instance ID |
| i    | 1329443014      | Session nonce (used in j2 `y=`) |
| c    | 1774108729      | Server Unix timestamp |
| cb   | 147             | Room chat block flags |
| p    | 697701586809030,1 | PoW challenge (number,difficulty) |
| k    | 32701           | Key (same as I in observed captures) |
| t    | 10034           | Unknown (static across reconnects) |
| s    | 51              | Unknown |
| e    | 125563435       | Unknown |

---

### j2 — Join Room

**C→S:**
```xml
<j2 cb="0" Y="2" l5="1818465756" l4="900" l3="801" l2="0"
    y="1329443014" k="" k3="0" z="m1.68.1,3"
    p="0" c="123" f="0" u="2"
    n="PoochieDip_## " a="1476" h="" v="0" />
```
| Attr | Example        | Meaning |
|------|----------------|---------|
| cb   | 0              | Unknown (0 on initial join) |
| Y    | 2              | Unknown (matches server `u` value, usually 2 for guest) |
| l5   | 1818465756     | PoW answer (uint32) |
| l4   | 900            | PoW timing value |
| l3   | 801            | PoW timing value |
| l2   | 0              | PoW timing value |
| y    | 1329443014     | Session nonce from server `<y i=...>` |
| k    | (empty)        | Auth token (empty for guest) |
| k3   | 0              | Auth token extension |
| z    | m1.68.1,3      | Client version string |
| p    | 0              | Unknown |
| c    | 123            | Room ID |
| f    | 0              | Flags (0 for guest) |
| u    | 2              | User ID |
| n    | PoochieDip_## | Display name (suffix `## ` is common separator) |
| a    | 1476           | Avatar (smiley ID or URL) |
| h    | (empty)        | Homepage URL |
| v    | 0              | Unknown |

---

### i — Room Info

**S→C:**
```xml
<i b="https://xatimg.com/image/U9qMbE4J0DoY.png;=;=;=English;=https://cooljazz.stream.laut.fm/cooljazz;=#C76F9E;=;=;=;=None;=navspace;=DeliusSwashCaps;=#C76F9E"
   f="88342592" cb="5039" B="23232323" />
```
| Attr | Example       | Meaning |
|------|---------------|---------|
| b    | (semicolon-delimited string) | Room settings — see format below |
| f    | 88342592      | Room flags bitmask |
| cb   | 5039          | Chat block flags |
| B    | 23232323      | Bot user ID (the room bot) |

**`b` field format** (`;=` delimited, positions observed):
```
[0]  Background image URL
[1]  (empty in capture)
[2]  (empty)
[3]  Language: "English"
[4]  Radio stream URL
[5]  Primary color hex: #C76F9E
[6]  (empty)
[7]  (empty)
[8]  (empty)
[9]  (empty)
[10] "None"
[11] CSS class or nav style: "navspace"
[12] Font name: "DeliusSwashCaps"
[13] Secondary color hex: #C76F9E
```

---

### gp — Group Powers

**S→C:**
```xml
<gp p="0|0|1091638592|1079264528|20975940|268500996|268435713|4194305|0|1077936128|0|0|0|0|1090519040|256|0|0|4194304|268435456|0|0|65536|0|0|"
    g188="{'st':30,'v':1}"
    g106="#keback"
    g74="sob,smug,dull,cool,hehe,wailing,mad,redface,frown,um,ugh,dream"
    g100="ata,2LKNAKI,help,1f7yNSN,ticket,1efkvma,staff,4rZlgXX,..."
    g114="{'m':'Chat','t':'Idle','rnk':'5','b':'Cellar','brk':'2','v':1}"
    g192="{'dt':90,'rt':20,'v':1}"
    g246="{'rc':'1','v':1}"
    g200="{}"
    g80="{'mb':'14','ubn':'11','mbt':24,'rl':'14','ns':'14','yl':'11','rc':'14','p':'8','pd':'5','pt':10}" />
```
| Attr  | Meaning |
|-------|---------|
| p     | Pipe-delimited power bitmasks for the room (24 slots, p0–p23 indexed by position) |
| g{N}  | Per-power config where N is the power ID; value is JSON-ish or plain string |

**Observed g{N} keys:**
- `g74` — Rankpool smileys: comma-separated smiley name list
- `g80` — Moderator limits JSON: mb (max bans), ubn, mbt (ban time), rl, ns, yl, rc, p, pd, pt
- `g100` — Aliases: alternating `name,id,name,id,...` pairs (wiki page shortcuts)
- `g106` — Default keback smiley: string like `#keback`
- `g114` — Room info JSON: m (room name), t (status text), rnk (rank), b (rank label), brk, v
- `g188` — Stealth config JSON: st (seconds), v
- `g192` — Rain config JSON: dt (drop time ms), rt, v
- `g200` — Empty object `{}`
- `g246` — Unknown: rc, v

---

### aa — Announcement

**S→C:**
```xml
<aa b="PGRpdiBzdHlsZT0i..." />
```
| Attr | Meaning |
|------|---------|
| b    | Base64-encoded HTML to display as room announcement |

Decoded example:
```html
<div style="font-family:Arial;font-size:16px;color:white;text-align:center">
  <img src="https://i0.xat.com/images/promo/live-announce.png" style="width:100%;max-width:400px;height:auto">
  <div style="margin:15px 0;font-size:19px"><b>NEW:</b> Make <b>Voice</b> or <b>Video calls</b> with xat Live</div>
</div>
```

---

### w — Pool (rank counts)

**S→C:**
```xml
<w v="0 0 1 2" />
```
`v` is a space-delimited list of counts. Observed as 4 integers: `0 0 1 2`.
Likely position-indexed rank level counts (owners, mods, members, guests or similar).

---

### o — Offline User

**S→C:**
```xml
<o u="724877055" d0="4128" N="Gangster18" n="zCyber ## " a="17" h="" v="0"
   W="eyJMaXZlQWNjZXB0Q2FsbHMi..." />
```
Sent during backfill for users in the room list but currently disconnected.

| Attr | Example    | Meaning |
|------|------------|---------|
| u    | 724877055  | User ID |
| N    | Gangster18 | Registered username (absent if guest) |
| n    | zCyber ##  | Display name with status suffix |
| a    | 17         | Avatar (smiley ID or URL) |
| h    | (empty)    | Homepage URL |
| v    | 0          | Unknown flag |
| d0   | 4128       | Days/subscriber bitmask (see d0 section) |
| W    | base64     | Extra user attributes JSON (see W section) |

---

### u — Online User

**S→C:**
```xml
<u cb="0" s="1" f="8" u="1560416170" n="PoochieKin ## " a="1572" h="" v="0"
   W="eyJMaXZlQWNjZXB0Q2FsbHMi..." />
```
Sent during backfill for currently connected users.

| Attr | Example    | Meaning |
|------|------------|---------|
| cb   | 0 or timestamp | Last message timestamp for this user (0 if no recent message) |
| s    | 1          | Status (1 = online) |
| f    | 8 / 136 / 168 / 8364 | Flags bitmask (see f section) |
| u    | 1560416170 | User ID |
| N    | Stif       | Registered username (absent if guest/unregistered) |
| n    | display ##  | Display name with status suffix |
| a    | URL or ID  | Avatar (smiley ID or full URL; dual URL with `#` separator seen for animated) |
| h    | URL        | Homepage URL |
| v    | 0–4        | Unknown flag (values 0,1,2,4 observed) |
| d0   | 17305632   | Days/subscriber bitmask |
| d2   | 358469415  | Additional days bitmask |
| q    | 2 or 3     | Rank (2 = mod, 3 = owner observed) |
| p0–p23 | bitmasks | Power bitmasks (24 slots, only present when user has powers) |
| po   | pipe-delimited | Power overrides (see po section) |
| W    | base64     | Extra user attributes JSON (see W section) |

**Minimal user** (guest with no name set):
```xml
<u cb="0" s="1" f="8" u="1999945730" n="" a="" h="" v="1" />
```

---

### m — Message

**S→C:**
```xml
<m t="Hello (hi)" o="eyJpc1RyYW5zbGF0ZWQiOiAiIiwgIm1zZ0lkIjogIjB6a2RqdmNrdiIsICJ0eXBlIjogIm1zZyJ9"
   u="724877055" E="1774104762" i="17708495" s="1" />
```
System/bot messages omit `o`:
```xml
<m t="/s Welcome to Chat! 💕" d="0" />
<m t="Bot message text" u="23232323" E="1774104412" i="17708493" s="1" />
```

| Attr | Example        | Meaning |
|------|----------------|---------|
| t    | Hello (hi)     | Message text; smiley codes in parentheses |
| u    | 724877055      | Sender user ID; may be `{id}_2` for second session |
| E    | 1774104762     | Message Unix timestamp |
| i    | 17708495       | Message sequence number (monotonically increasing) |
| s    | 1              | Unknown (1 = normal message) |
| d    | 0 or timestamp | For system messages: 0 = current join, timestamp = replay |
| o    | base64         | Message metadata JSON (see o section below) |

**`o` attribute decoded** (base64 JSON):
```json
{"isTranslated": "", "msgId": "0zkdjvckv", "type": "msg"}
```
Fields:
- `isTranslated` — empty string if not translated
- `msgId` — unique message ID (alphanumeric string)
- `type` — "msg" for regular messages

---

### l — Leave

Not directly observed in the capture, but referenced in protocol. Expected format:
```xml
<l u="12345678" />
```

---

### C — Keepalive

**C→S:**
```xml
<C />
```
Sent by client after receiving `done`. No server response observed in capture.

---

### done — Backfill Complete

**S→C:**
```xml
<done />
```
Signals that the server has finished sending the backfill (user list + recent messages). After this, subsequent messages are live/real-time.

---

## Attribute Encoding

### f — Flags Bitmask

Observed on `<u>` and `<i>` packets.

**User `f` values observed:**
| Value  | Hex       | Users |
|--------|-----------|-------|
| 8      | 0x008     | Most regular/guest users |
| 136    | 0x088     | Some named users |
| 168    | 0x0A8     | User with rank (mod) |
| 8364   | 0x20AC    | Bot / owner-level user |
| 88342592 | 0x5430000 | Room `<i>` f field |

Bit breakdown (partially inferred from values):
- Bit 3 (0x8) — set on all observed online users
- Bit 7 (0x80) — set on some named users
- Bit 5 (0x20) — set on ranked users
- Bit 13 (0x2000) — set on bot/owner

### q — Rank Values

Observed on `<u>` packets for privileged users only.

| q value | Rank |
|---------|------|
| 2       | Moderator |
| 3       | Owner |

Regular members and guests: `q` attribute absent.

### W — User Attributes (base64 JSON)

`W` appears on `<o>` and `<u>` packets. Decoded from base64, it is a JSON object.

**Standard W structure** (most users):
```json
{
  "LiveAcceptCalls": "",
  "LiveAppConsent": "",
  "Pcplus": "",
  "StatusFx": "",
  "Stealth": "disable",
  "Verified": "disable",
  "avatarSettings": "",
  "iconcolor": "",
  "pawnHue": "",
  "pstyle": ""
}
```

**W with values set** (from user `jorge`, u=1556072569):
```json
{
  "LiveAcceptCalls": "",
  "LiveAppConsent": "",
  "Pcplus": "off",
  "StatusFx": "",
  "Stealth": "disable",
  "Verified": "enable",
  "avatarSettings": "",
  "iconcolor": "",
  "pawnHue": "",
  "pstyle": ""
}
```

**W fields:**
| Field          | Values observed | Meaning |
|----------------|-----------------|---------|
| LiveAcceptCalls | "" | Whether user accepts live calls |
| LiveAppConsent  | "" | Consent for live app |
| Pcplus          | "" / "off" | Pcplus power state |
| StatusFx        | "" / base64 JSON | Status effects config (complex when set) |
| Stealth         | "disable" | Stealth power state |
| Verified        | "disable" / "enable" | Whether user is verified |
| avatarSettings  | "" / base64 JSON | Avatar customization config |
| iconcolor       | "" / "#FFFFFF" | Icon color override |
| pawnHue         | "" | Pawn hue override |
| pstyle          | "" / base64 JSON | Pawn style config |

The bot user (FEXBot, u=23232323) has a minimal W:
```json
{"StatusFx":"","Stealth":"disable","Verified":"enable","pstyle":""}
```

### o — Message Metadata (base64 JSON)

The `o` attribute on `<m>` packets decodes to:
```json
{"isTranslated": "", "msgId": "0zkdjvckv", "type": "msg"}
```
- `isTranslated`: empty string when not translated
- `msgId`: random alphanumeric string identifying the message
- `type`: "msg" for all regular messages observed

System messages from the bot (u=23232323) do not carry an `o` attribute.

### p0–p23 — Power Bitmasks

24 power slots present on `<u>` packets for users who own powers. Each is a 32-bit unsigned integer bitmask. Absent attributes mean 0 (no powers in that slot).

**Observed: regular user with some powers** (u=344107857, q=2):
```
p0=304740798   p1=1080033313  p2=134351392   p3=117448840
p4=1077938688  p5=268435456   p6=261         p7=5505152
p8=257         p9=16896       p10=536870912  p11=67141632
p12=67108864   p14=16385      p15=335544320  p17=2
p18=4194304    p19=32800      p20=512        p21=257
p22=268435456  p23=58
```

**Observed: bot/owner with near-full powers** (u=23232323, q=3):
```
p0=1476395007  p1=2147483647  p2=4294967287  p3=4294967295
p4=2147483647  p5=2147483647  p6=2147352575  p7=2147483519
p8=2147483647  p9=2147483647  p10=2147483647 p11=2147483647
p12=2147483647 p13=2147483647 p14=2080374783 p15=2112880639
p16=1608499071 p17=1069547519 p18=2130702079 p19=2147483647
p20=1869610875 p21=1065353215 p22=2130706431 p23=58
```
Note: p23=58 appears on both users; p3=4294967295 (all bits set) on the bot.

### po — Power Overrides

`po` is a pipe-delimited string on `<u>` packets listing powers granted or denied at specific levels.

Format: `powerID` or `powerID=level`, pipe-separated, trailing pipe present.

**Examples observed:**
```
po="25|200=2|367=2|623=2|732|737=2|739|740"
po="5|9|10|12|13|14|15|16|21|27|28|30|37|42|53=3|54|64|67|69=2|..."
```
- Plain `powerID` (no `=`): power granted at default level
- `powerID=N`: power granted at level N (2 or 3 observed)

### d0 — Days / Subscriber Bitmask

Present on `<o>` and some `<u>` packets. 32-bit integer.

**Values observed:**
| d0 value  | User context |
|-----------|-------------|
| 4128      | Offline user (zCyber) |
| 17305632  | Named user with rank (Arinka) |
| 151001128 | Moderator with powers (Stif) |
| 25170976  | Bot/owner (FEXBot) |

A second field `d2` was observed once:
```
d2="358469415"   (on FEXBot, u=23232323)
```

### n — Display Name Format

The `n` attribute follows this convention in observed data:
```
DisplayText(optionalSmiley) ## [StatusText]
```
- `##` is a visual separator between name and status
- Status may be empty (trailing space after `##`)
- Powers can embed display modifiers: `(glow#color)`, `(hat#name)`, `(glow#brb#grad#...)`
- Full observed example: `Lucky Chat Bot (glow#0)(hat#Egh)(glow#brb#grad#namebrb#bg#bbg+++)##xat.com/Chat#-#-`

### a — Avatar Format

- Plain integer: smiley ID (e.g., `17`, `83`, `415`, `1476`, `1751`)
- URL: full image URL (e.g., `https://xatimg.com/image/IccU18h5cO49.jpg`)
- Dual URL with `#`: `url1#url2` (animated avatar: static#animated)
- Power smiley syntax: `(patcake#)#url` (power smiley prefix + image URL)

---

## ip3.php Server List Format

File: `ip3_real.json` — fetched from `xat.com/web_gear/chat/ip3.php`

**Top-level structure:**
```json
{
  "S0":  [priority, ["hostname", ...]],
  "T0":  [priority, ["hostname"]],
  "E0":  [priority, ["hostname"]],
  "E1":  [priority, ["hostname:port:flag"]],
  "order": [["serverType", delayMs], ...],
  "xFlag": 2,
  "time": 1773530462,
  "k1n": 2000000000,
  "k1d": 14,
  "pow2": { "last": {...}, "backs": {...} }
}
```

**Server pool keys observed:**
| Key | Priority | Hostnames |
|-----|----------|-----------|
| S0  | 0        | 16x `s.xat.com` (WebSocket servers) |
| T0  | 1        | `""` (empty/fallback) |
| E0  | 1        | `fwdelb00-1964376362.us-east-1.elb.amazonaws.com` |
| E1  | 1        | `fwdelb00-1964376362.us-east-1.elb.amazonaws.com:80:1` |

**`order` field** — connection attempt sequence with timeout (ms):
```json
[["E0",60],["E1",90],["E0",180],["E1",240],["S0",240]]
```
Client tries server types in this order, with the given delay between attempts.

**Scalar fields:**
| Field | Value       | Meaning |
|-------|-------------|---------|
| xFlag | 2           | Unknown flag |
| time  | 1773530462  | Server Unix timestamp at fetch time |
| k1n   | 2000000000  | PoW work threshold (max nonce) |
| k1d   | 14          | PoW difficulty parameter |

**`pow2` field:**
```json
{
  "last": {"id": 741, "text": "[LIMITED]"},
  "backs": {
    "b87": "kmback",
    "b89": "zombieback",
    "b90": "kheartb",
    ...
  }
}
```
- `last.id`: highest power ID currently active
- `last.text`: display label for the latest power
- `backs`: map of `b{N}` keys to background power names for powers that include backgrounds (N is the power ID)

The `backs` map contained entries from b87 through at least b295+ in the captured response.

---

## Observed User ID Conventions

| ID         | Context |
|------------|---------|
| 2          | Guest (client sends this in `<y u="2">` and `<j2 u="2">`) |
| 23232323   | FEXBot (the room's bot, also the `B=` value in `<i>`) |
| Others     | Registered users (large 32-bit integers) |

User IDs in message `u` attributes may include a `_N` suffix for multiple sessions:
```
u="1553448427_2"   (user 1553448427, second session)
```

---

*Captured from xat.com/Chat (room 123), two WebSocket sessions observed.*
*Packet count: 83 lines total, two complete join/backfill cycles.*
