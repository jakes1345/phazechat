# Xat.com Clone Architecture (Reverse Engineered)

## Technology Stack
- **Backend**: Node.js with Express (Replicating `.php` endpoints).
- **Database**: SQLite (via `better-sqlite3`).
- **Frontend Framework**: **jQuery 3.5.1** and **Bootstrap 4.5.3** (Site Core).
- **Templating**: **Handlebars 4.7.6**.
- **Real-time**: Custom protocol driven by **xatcorewasm.wasm** and `xat.js`.
- **Audio**: **Howler.js**.
- **Gestures**: **Hammer.js**.

## Libraries and External "Shit" (Verified)
- **jQuery 3.5.1**: Core DOM manipulation.
- **Bootstrap 4.5.3**: Layout and responsive components.
- **Handlebars 4.7.6**: Client-side templating for rooms/store.
- **Pickr**: Used for the custom color selectors in chat.
- **Firebase Messaging**: Real-time push notifications.
- **Hammer.js**: Touch support for mobile/tablets.
- **Howler.js**: Web Audio API wrapper for chat pings.

## Core Components (Reversed)
1. **Chat Engine**: Must interface with `xatcorewasm.wasm`. Logic is binary/proprietary.
2. **API Layer**:
    - `roomid.php`: Group name to ID resolution.
    - `abx.php`: Social/Metadata.
    - `getlang2.php`: Localization.
3. **Asset CDNs**: Replicate mapping to `xatimg.com` and `i0.xat.com`.

## Subpage Network
- 100+ pages including `/buy`, `/powers`, `/aces`, `/shortname`, `/promotion`, `/ad`.
- Subdomains: `wiki.xat.com`, `forum.xat.com`, `gs.xat.com`.

## Agent Guidelines
- Follow the 1:1 recreation goal.
- Document all new patterns in `LEARNINGS.md`.
- Keep it retro (recreate the 2000s vibes).
