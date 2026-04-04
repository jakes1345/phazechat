# cToC Command Dispatch Table

## Overview

The `cToC` function is the main JS-to-WASM bridge in xat's chat client. It is exported as `"t"` (WASM function index 1671) and called via Emscripten's `Module.ccall("cToC", ...)`.

**Signature:** `cToC(command: string, arg1: string, arg2: string) -> string`

The function uses a **reversed djb2 hash** (seed=5381, multiply by 33, XOR with char, processed from last char to first) to dispatch on the command string.

## Hash Function

```c
// f_vd -> f_jd: reversed djb2 hash
int hash(const char* str, int pos) {
    if (str[pos] == 0) return 5381;
    return hash(str, pos + 1) * 33 ^ (signed char)str[pos];
}
```

## Complete Dispatch Table

| Hash | Command | Label | Line | Description |
|------|---------|-------|------|-------------|
| -1811963288 | **UNKNOWN** | first_branch | 76337 | Creates empty string, calls f_ig(), f_ky(mainObj, buf) - init/reset |
| -1756483759 | **UNKNOWN** | B_w | 76337 | Same branch as above |
| -1745076651 | **UNKNOWN** | B_d | 76807 | Stores `parseInt(arg2)` to global d_cb[8] - set integer config |
| -1587465983 | `LastActionHero` | B_p | 76622 | Stores arg1 to addr 72936, parses arg2 as int64 to 72928 |
| -1539805951 | `getStuff` | B_s | 76588 | Builds lang-tagged response, returns serialized data |
| -1402574941 | `xatURL` | B_j | 76603 | Forwards HTTP response (arg1, arg2) to message handler |
| -1396525437 | `setLang` | B_f | 76731 | Stores arg2 to language global (73204) |
| -1387716733 | `xatMain` | noop | 76289 | Falls through to B_b (no-op in current build) |
| -1282316897 | `xatRestart` | B_aa | 76291 | Calls f_ko(0, "") - restart with empty state |
| -896185121 | `viewWillDisappear` | B_x | 76332 | iOS lifecycle: calls f_za("viewWillDisappear") |
| -557078289 | `xatCommand` | B_i | 76676 | Parses arg2 JSON, calls f_ug() - generic command dispatch |
| -437126340 | `setToken` | B_g | 76726 | Stores arg2 to push token global (73516) |
| -290044908 | `SetPage` | B_z | 76295 | Complex page navigation: sets current/previous page, handles "same"/"pop"/"chats" pages, builds page history, updates UI |
| 362538796 | `xatMessageReceived` | B_r | 76603 | Forwards network message (arg1, arg2) to packet handler |
| 380866499 | `getUserno` | B_t | 76584 | Returns timestamp from global 68944 as string |
| 726595915 | `sendStuff` | B_v | 76346 | Parses JSON device/config data, sets flags (73468-73476), updates smilie/power indices |
| 814117492 | **UNKNOWN** | B_e | 76734 | Complex user/packet parser: splits arg2 by delimiters, hashes subfields (compares to 2088644705), processes user join/presence data with f_ki, f_ra, f_xa |
| 917256167 | `xatMessageOK` | B_q | 76609 | Checks if arg2 is non-empty, compares parsed version, calls f_om() on mismatch |
| 979143216 | `leaveBackground` | B_m | 76639 | Calls f_qj("applicationWillEnterForeground"), then f_ko(1, arg2) |
| 985218723 | `enterBackground` | B_n | 76630 | Calls f_om(), f_tq("",0), f_qj("Application entered background state.") |
| 997690685 | `xatTick` | B_l | 76646 | Calls f_pva() then falls through to B_k for FIFO read |
| 1209914388 | **UNKNOWN** | B_h | 76683 | Parses arg2 as key-value tree using f_kw/f_hd, walks tree structure inserting into global map (68800) |
| 1434258493 | `ConsoleOff` | store_1 | 76286 | Stores "1" to result buffer (d+608) |
| 1559391012 | `webViewDidFinishLoad` | B_y | 76327 | iOS lifecycle: calls f_za("webViewDidFinishLoad") |
| 1978868946 | `xatInit` | B_u | 76386 | **Main initialization**: stores arg2 to 73444, gets timestamp, creates smilie/power arrays (2500 entries), loads default smilies/powers, builds chest/glow indices |
| 2042281805 | `SetPhoneFontSize` | B_c | 76811 | Parses arg2 as float * 16.0, stores to d_cb[9] |
| 2115152406 | `ReadToJavaFifo` | B_k | 76648 | Reads next entry from message FIFO queue (74692-74708) |

## Calling Convention

From JavaScript (`Activity.SendC`):
```javascript
SendC(cmd, arg1, arg2) {
    const cmdPtr = Module._malloc(size);
    Module.stringToUTF8(cmd, cmdPtr, size);
    // ... same for arg1, arg2
    const resultPtr = Module.ccall("cToC", null,
        ["number", "number", "number"], [cmdPtr, arg1Ptr, arg2Ptr]);
    return UTF8ToString(resultPtr);
}
```

## Initial xatTick Check

Before the hash dispatch, cToC always checks if `command == "xatTick"` (offset 24876, using strcmp). If true, it prepends ":" separators to arg1 and arg2 for logging/debugging:
```
"SetPage was:" + ":" + arg1 + " new:" + ":" + arg2 + " ret:" + ":" + result
```

## Command Flow

1. **Startup**: `xatInit` -> `xatMain` -> `leaveBackground` -> `ConsoleOff` -> `SetPhoneFontSize` -> `setLang`
2. **Config**: `xatCommand({Cmd:"xatcmd",...})` -> `getStuff` -> `sendStuff`
3. **Tick loop**: `xatTick` (returns JSON) -> `ReadToJavaFifo` (drains queue)
4. **Network**: `xatMessageReceived` (incoming) / `xatMessageOK` (ack)
5. **Navigation**: `SetPage` (page changes)
6. **HTTP**: `xatURL` (HTTP response forwarding)
7. **Lifecycle**: `enterBackground` / `leaveBackground` / `viewWillDisappear` / `webViewDidFinishLoad`
8. **Misc**: `setToken` (push notifications), `LastActionHero` (user tracking), `getUserno` (get timestamp)

## Unknown Commands (5 remaining)

| Hash | Behavior | Possible Purpose |
|------|----------|------------------|
| -1811963288 | Creates empty string, calls init functions on main object | Reset/reinit command |
| -1756483759 | Same as above | Alias for the above |
| -1745076651 | Stores integer from arg2 to global config | Set numeric parameter |
| 814117492 | Complex user/packet parser with delimiter splitting and tree insertion | Process user data / presence update |
| 1209914388 | Key-value tree parser, walks and inserts into global map | Load configuration / settings data |

These 5 commands are likely iOS-native-only or use dynamically constructed command strings not present as literals in the web JS code.
