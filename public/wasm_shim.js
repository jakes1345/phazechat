/**
 * WASM Shim for Xat Clone
 * This script hooks into the 'activity.js' architecture to intercept
 * communication between the UI and the (missing or original) WASM core.
 */

(function() {
    console.log("[WASM-SHIM] Initializing...");

    // Helper to read strings from Emscripten HEAP
    const readString = (ptr) => {
        if (!ptr || !Module.HEAPU8) return "";
        let str = "";
        let i = ptr;
        while (Module.HEAPU8[i] !== 0) {
            str += String.fromCharCode(Module.HEAPU8[i]);
            i++;
        }
        return str;
    };

    // We hook the global Module object. 
    // Since activity.js overwrites it in the constructor, 
    // we need to be clever.
    let _Module = window.Module || {};

    const logTraffic = (direction, command, data1, data2) => {
        const color = direction.includes("WASM -> UI") ? "#ff00ff" : "#00ff00";
        console.groupCollapsed(`%c[WASM-SHIM] ${direction}: ${command}`, `color: ${color}; font-weight: bold;`);
        console.log("Arg 1:", data1);
        console.log("Arg 2:", data2);
        console.groupEnd();

        // Redirect to OpenClaw if needed
        if (window.OpenClawBridge) {
            window.OpenClawBridge.send(direction, command, data1, data2);
        }
    };

    // Intercept Module definition
    Object.defineProperty(window, 'Module', {
        get: function() { return this._Module; },
        set: function(val) {
            console.log("[WASM-SHIM] Module defined by activity.js, hooking...");
            
            // Hook ccall
            const originalCCall = val.ccall;
            val.ccall = function(name, returnType, argTypes, args) {
                if (name === "cToC") {
                    const cmd = readString(args[0]);
                    const a1 = readString(args[1]);
                    const a2 = readString(args[2]);
                    
                    logTraffic("UI -> WASM", cmd, a1, a2);
                    
                    // Component Separation & Specific Logic
                    if (cmd === "xatInit") return 0;
                    if (cmd === "MakeAvatar") {
                        console.log("[WASM-SHIM] AVATAR REQUEST:", a1);
                    }
                    if (cmd === "MakeSmiley") {
                        console.log("[WASM-SHIM] SMILEY REQUEST:", a1);
                    }
                    
                    return originalCCall ? originalCCall.apply(this, arguments) : 0;
                }
                return originalCCall ? originalCCall.apply(this, arguments) : 0;
            };

            // Hook for WASM -> JS (ProcessDataFromC)
            // This is called by activity.js when it gets JSON from C
            this._Module = val;
        },
        configurable: true
    });

    // Bridge for OpenClaw
    window.OpenClawBridge = {
        send: (dir, cmd, d1, d2) => {
            // Forward relevant packets to OpenClaw WebSocket
            // (Assumes a shared socket is established by the parent)
        }
    };

})();

