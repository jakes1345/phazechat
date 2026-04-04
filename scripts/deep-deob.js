#!/usr/bin/env node
/**
 * Deep deobfuscator for xat.com JavaScript files.
 *
 * Handles obfuscator.io style obfuscation:
 * - String array with rotation (a0_0x????/a0_0x???? pattern)
 * - Simple decoder: a0_0x1789(0x274)
 * - RC4 decoder with string key: a0_0x424e(0x123, 'key')
 * - Proxy wrapper functions that redirect to the main decoder
 * - Hex number literals
 * - Boolean obfuscation (!![],![])
 */

const vm = require('vm');
const fs = require('fs');
const path = require('path');

const inputFile = process.argv[2];
if (!inputFile) {
  console.error('Usage: node deep-deob.js <input.js> [output.js]');
  process.exit(1);
}

const outputFile = process.argv[3] || null;
const code = fs.readFileSync(inputFile, 'utf8');

console.error(`[deep-deob] Processing: ${path.basename(inputFile)} (${(code.length / 1024).toFixed(0)}KB)`);

// ============================================================
// STEP 1: Find the string array function and decoder function
// ============================================================

// Pattern 1: function a0_0x????(p1, p2) { var arr = a0_0x????(); ... }
// The string array is a0_0x???? = function() { return [...] }
// Pattern 2: const a0_0x???? = a0_0x????; (alias)

// Find all a0_0x identifiers
const a0_0xNames = [...new Set(code.match(/a0_0x[0-9a-f]+/g) || [])];
console.error(`[deep-deob] Found a0_0x identifiers: ${a0_0xNames.join(', ')}`);

if (a0_0xNames.length === 0) {
  console.error('[deep-deob] No obfuscation pattern found, outputting as-is');
  const output = code;
  if (outputFile) fs.writeFileSync(outputFile, output);
  else process.stdout.write(output);
  process.exit(0);
}

// Find the string array function - it's the one that returns an array
// and the decoder function that indexes into it
// Strategy: Extract everything up to and including the IIFE rotation loop,
// then evaluate it to get the decoder function working

// The obfuscator.io pattern is:
// 1. String array function definition (may be at top or bottom due to hoisting)
// 2. Decoder function definition
// 3. IIFE that rotates the array
// 4. Anti-debug/console protection IIFE
// 5. Actual code

// For single-line files, we need to find the bootstrap boundary
// The bootstrap ends after the anti-tamper IIFE

// Let's try a different approach: find the string array by looking for the
// large array literal, then extract just the functions we need

// Find the decoder function name (the one called with hex args throughout the code)
// It's the a0_0x name that appears most frequently
let decoderFuncName = null;
let maxCount = 0;
for (const name of a0_0xNames) {
  // Count calls like name(0x...)
  const callRegex = new RegExp(name.replace(/0x/g, '0x') + '\\s*\\(', 'g');
  const count = (code.match(callRegex) || []).length;
  console.error(`[deep-deob]   ${name}: ${count} calls`);
  if (count > maxCount) {
    maxCount = count;
    decoderFuncName = name;
  }
}

console.error(`[deep-deob] Decoder function: ${decoderFuncName} (${maxCount} calls)`);

// Find the array function name - it's referenced by the decoder but isn't the decoder itself
const arrayFuncName = a0_0xNames.find(n => n !== decoderFuncName &&
  code.includes(`${n}()`) &&
  (code.includes(`function ${n}`) || code.includes(`var ${n}`)));

console.error(`[deep-deob] Array function: ${arrayFuncName || 'unknown'}`);

// ============================================================
// STEP 2: Extract and evaluate the bootstrap code
// ============================================================

// Strategy: We need to extract:
// 1. The string array function (contains the array of strings)
// 2. The decoder function (does the lookup + optional RC4)
// 3. The rotation IIFE (shuffles the array)
// We do NOT need the anti-tamper code

// For obfuscator.io, the structure in the minified code is:
// [decoder_func_def][rotation_IIFE(array_func, target)][anti_tamper][actual_code]
// OR
// [array_func_def][decoder_func_def][rotation_IIFE][anti_tamper][actual_code]

// The array function contains a large array literal with strings
// Let's find it by looking for the array

let bootstrapCode = '';

// Try to find and extract the key components
// Method: Use regex to find function definitions and the rotation IIFE

// Find the string array function definition
// Pattern: function a0_0x????(){var arr=[...];a0_0x????=function(){return arr;};return a0_0x????();}
// Or at the end of file

let arrayFuncCode = '';
let decoderFuncCode = '';
let rotationCode = '';

// The array function often appears near the end in hoisted position
// Let's search for it

// Find: function a0_0x5004() or a0_0x2314 = function or var a0_0x2314
if (arrayFuncName) {
  // Look for the function definition
  const arrayDefPatterns = [
    // function a0_0x????(){...return ...}
    new RegExp(`function\\s+${arrayFuncName}\\s*\\(\\)\\s*\\{`),
    // var a0_0x???? = function(){...}
    new RegExp(`(?:var|const|let)\\s+${arrayFuncName}\\s*=\\s*function\\s*\\(\\)\\s*\\{`),
  ];

  for (const pat of arrayDefPatterns) {
    const m = pat.exec(code);
    if (m) {
      // Find the matching closing brace
      let depth = 0;
      let start = m.index;
      let i = m.index;
      for (; i < code.length; i++) {
        if (code[i] === '{') depth++;
        if (code[i] === '}') {
          depth--;
          if (depth === 0) break;
        }
      }
      arrayFuncCode = code.substring(start, i + 1);
      // If it was var/const, include the var keyword
      if (code[start] !== 'f') {
        // Find the start of the var/const/let
        const varStart = code.lastIndexOf(code.substring(start).match(/^(?:var|const|let)/)[0], start);
        arrayFuncCode = code.substring(start, i + 1);
      }
      console.error(`[deep-deob] Found array function at offset ${start} (${arrayFuncCode.length} chars)`);
      break;
    }
  }
}

// Find the decoder function
if (decoderFuncName) {
  const decoderDefPatterns = [
    new RegExp(`function\\s+${decoderFuncName}\\s*\\([^)]*\\)\\s*\\{`),
    new RegExp(`(?:var|const|let)\\s+${decoderFuncName}\\s*=\\s*function\\s*\\([^)]*\\)\\s*\\{`),
  ];

  for (const pat of decoderDefPatterns) {
    const m = pat.exec(code);
    if (m) {
      let depth = 0;
      let start = m.index;
      let i = m.index;
      for (; i < code.length; i++) {
        if (code[i] === '{') depth++;
        if (code[i] === '}') {
          depth--;
          if (depth === 0) break;
        }
      }
      decoderFuncCode = code.substring(start, i + 1);
      console.error(`[deep-deob] Found decoder function at offset ${start} (${decoderFuncCode.length} chars)`);
      break;
    }
  }
}

// Find the rotation IIFE - it calls the array function and decoder
// Pattern: (function(arr, target){...while(!![]){try{...parseInt...}catch{...push(shift)}}})(a0_0x????, 0x????);
{
  const rotationPattern = new RegExp(
    `\\(function\\s*\\([^)]*\\)\\s*\\{[^}]*while\\s*\\(!!\\[\\]\\)\\s*\\{\\s*try\\s*\\{[^}]*parseInt`,
  );

  // Find the rotation IIFE more carefully
  // It starts with (function( and contains the array rotation logic
  // And is called with (a0_0x????, 0x????)
  const rotCallPattern = new RegExp(
    `\\}\\s*\\}\\s*\\}\\s*\\(\\s*${arrayFuncName || 'a0_0x\\w+'}\\s*,\\s*0x[0-9a-fA-F]+\\s*\\)\\s*\\)\\s*;?`
  );

  // Alternative: find it by searching for the IIFE that takes arrayFunc as arg
  if (arrayFuncName) {
    const iifePat = new RegExp(`\\(${arrayFuncName}\\s*,\\s*0x[0-9a-fA-F]+\\s*\\)\\s*\\)\\s*;?`);
    const m = iifePat.exec(code);
    if (m) {
      // Walk backwards from this match to find the start of the IIFE
      let iEnd = m.index + m[0].length;
      // The IIFE starts with a ( before function
      // Count back through the balanced parens
      let depth = 0;
      let iStart = m.index + m[0].length - 1;
      // Find end of the ); pattern
      while (iStart >= 0 && code[iStart] !== ')') iStart--;
      // Now walk back to find matching (
      depth = 0;
      for (let j = iStart; j >= 0; j--) {
        if (code[j] === ')') depth++;
        if (code[j] === '(') {
          depth--;
          if (depth === 0) {
            iStart = j;
            break;
          }
        }
      }
      rotationCode = code.substring(iStart, iEnd);
      console.error(`[deep-deob] Found rotation IIFE at offset ${iStart} (${rotationCode.length} chars)`);
    }
  }
}

// Assemble the bootstrap
bootstrapCode = arrayFuncCode + ';\n' + decoderFuncCode + ';\n' + rotationCode + ';\n';

if (!arrayFuncCode || !decoderFuncCode) {
  console.error('[deep-deob] WARNING: Could not extract all bootstrap components');
  console.error(`[deep-deob]   arrayFuncCode: ${arrayFuncCode.length} chars`);
  console.error(`[deep-deob]   decoderFuncCode: ${decoderFuncCode.length} chars`);
  console.error(`[deep-deob]   rotationCode: ${rotationCode.length} chars`);

  // Fallback: try to evaluate the entire beginning of the file
  // For single-line files, try extracting until we find the anti-tamper section end
  console.error('[deep-deob] Trying fallback: evaluate first portion of file...');

  // Find the decoder function name and try eval approach
  // Look for the pattern up to the first real code after bootstrap
}

console.error(`[deep-deob] Bootstrap code: ${bootstrapCode.length} chars`);

// ============================================================
// STEP 3: Evaluate bootstrap in sandbox
// ============================================================

let sandbox = {};
let decoderAvailable = false;

try {
  vm.createContext(sandbox);
  vm.runInContext(bootstrapCode, sandbox, { timeout: 10000 });

  // Test the decoder
  if (sandbox[decoderFuncName]) {
    decoderAvailable = true;
    console.error(`[deep-deob] Decoder function is available in sandbox`);
    // Test it
    try {
      const testVal = sandbox[decoderFuncName](0x100);
      console.error(`[deep-deob] Test decode(0x100) = ${JSON.stringify(testVal)}`);
    } catch(e) {
      console.error(`[deep-deob] Test decode failed: ${e.message}`);
    }
  } else {
    console.error(`[deep-deob] Decoder function NOT found in sandbox`);
    console.error(`[deep-deob] Sandbox keys: ${Object.keys(sandbox).join(', ')}`);
  }
} catch(e) {
  console.error(`[deep-deob] Bootstrap eval failed: ${e.message}`);
  console.error(`[deep-deob] Trying alternative approach...`);

  // Alternative: try evaluating in a more permissive way
  try {
    // Some files need 'window' and other globals
    sandbox = {
      window: {},
      document: { getElementById: () => null, querySelector: () => null },
      console: { log: () => {}, warn: () => {}, error: () => {} },
      navigator: { userAgent: '' },
      location: { href: '', hostname: '', protocol: 'https:' },
      setTimeout: () => {},
      setInterval: () => {},
      RegExp: RegExp,
      parseInt: parseInt,
      String: String,
      Array: Array,
      Object: Object,
      Function: Function,
    };
    vm.createContext(sandbox);
    vm.runInContext(bootstrapCode, sandbox, { timeout: 10000 });
    if (sandbox[decoderFuncName]) {
      decoderAvailable = true;
      console.error(`[deep-deob] Decoder available after retry with globals`);
    }
  } catch(e2) {
    console.error(`[deep-deob] Retry also failed: ${e2.message}`);
  }
}

// ============================================================
// STEP 4: Also find and resolve proxy functions (for messages.js style)
// ============================================================

// messages.js uses wrapper functions like:
// function _0x2078d5(a,b,c,d,e){return a0_0x424e(c-0x1a,e);}
// These need to be resolved too

const proxyFuncs = new Map();

if (decoderAvailable) {
  // Find all proxy function definitions that call the main decoder
  const proxyPattern = new RegExp(
    `function\\s+(_0x[0-9a-f]+)\\s*\\(([^)]+)\\)\\s*\\{\\s*return\\s+${decoderFuncName}\\s*\\(([^)]+)\\)\\s*;?\\s*\\}`,
    'g'
  );

  let proxyMatch;
  while ((proxyMatch = proxyPattern.exec(code)) !== null) {
    const funcName = proxyMatch[1];
    const params = proxyMatch[2].split(',').map(s => s.trim());
    const callArgs = proxyMatch[3];

    // Parse what the proxy does - it maps its params to decoder args
    // e.g., function _0x2078d5(_0x3793bb,_0x49a8d5,_0x23a1d0,_0x2896bb,_0x44478d){return a0_0x424e(_0x23a1d0-0x1a,_0x44478d);}
    proxyFuncs.set(funcName, {
      params,
      callArgs,
      raw: proxyMatch[0]
    });
  }

  console.error(`[deep-deob] Found ${proxyFuncs.size} proxy functions`);
  if (proxyFuncs.size > 0) {
    for (const [name, info] of [...proxyFuncs.entries()].slice(0, 5)) {
      console.error(`[deep-deob]   ${name}(${info.params.join(',')}) -> ${decoderFuncName}(${info.callArgs})`);
    }
  }
}

// ============================================================
// STEP 5: Replace all decoder calls with actual strings
// ============================================================

let result = code;

if (decoderAvailable) {
  let replacements = 0;
  let failures = 0;

  // First: Replace direct calls to decoder
  // Pattern: decoderFuncName(0xHEX) or decoderFuncName(0xHEX, 'key')
  const directCallPattern = new RegExp(
    `${decoderFuncName}\\s*\\(\\s*(0x[0-9a-fA-F]+)\\s*(?:,\\s*'([^']*)')?\\s*\\)`,
    'g'
  );

  result = result.replace(directCallPattern, (match, hexArg, strKey) => {
    try {
      const numArg = parseInt(hexArg, 16);
      let val;
      if (strKey !== undefined) {
        val = sandbox[decoderFuncName](numArg, strKey);
      } else {
        val = sandbox[decoderFuncName](numArg);
      }
      if (typeof val === 'string') {
        replacements++;
        return JSON.stringify(val);
      }
      return match;
    } catch(e) {
      failures++;
      return match;
    }
  });

  console.error(`[deep-deob] Direct replacements: ${replacements} (${failures} failures)`);

  // Second: Replace proxy function calls
  // This is harder because proxy functions have variable argument positions
  if (proxyFuncs.size > 0) {
    let proxyReplacements = 0;
    let proxyFailures = 0;

    for (const [funcName, info] of proxyFuncs) {
      // Parse the callArgs to understand the mapping
      // e.g., callArgs = "_0x23a1d0-0x1a,_0x44478d"
      // params = ["_0x3793bb","_0x49a8d5","_0x23a1d0","_0x2896bb","_0x44478d"]

      const callArgParts = info.callArgs.split(',').map(s => s.trim());

      // For each call arg, determine which param it uses and what offset
      const argMappings = callArgParts.map(argExpr => {
        // Could be: paramName-0xHEX, paramName+0xHEX, paramName- -0xHEX, or just paramName
        for (let pi = 0; pi < info.params.length; pi++) {
          const paramName = info.params[pi];
          if (argExpr === paramName) {
            return { paramIndex: pi, offset: 0, isString: false };
          }
          // paramName-0xHEX
          const subMatch = argExpr.match(new RegExp(`^${paramName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*-\\s*(0x[0-9a-fA-F]+)$`));
          if (subMatch) {
            return { paramIndex: pi, offset: -parseInt(subMatch[1], 16), isString: false };
          }
          // paramName+0xHEX
          const addMatch = argExpr.match(new RegExp(`^${paramName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\+\\s*(0x[0-9a-fA-F]+)$`));
          if (addMatch) {
            return { paramIndex: pi, offset: parseInt(addMatch[1], 16), isString: false };
          }
          // paramName- -0xHEX (double negative = add)
          const dnMatch = argExpr.match(new RegExp(`^${paramName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*-\\s*-\\s*(0x[0-9a-fA-F]+)$`));
          if (dnMatch) {
            return { paramIndex: pi, offset: parseInt(dnMatch[1], 16), isString: false };
          }
        }
        return null;
      });

      if (argMappings.some(m => m === null)) {
        console.error(`[deep-deob]   Skipping proxy ${funcName}: couldn't parse arg mapping`);
        continue;
      }

      // Now find and replace all calls to this proxy function
      // Calls look like: funcName(arg1, arg2, arg3, arg4, arg5)
      // where some args are 0xHEX and some are 'string'
      const proxyCallPattern = new RegExp(
        funcName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') +
        `\\s*\\(([^)]+)\\)`,
        'g'
      );

      result = result.replace(proxyCallPattern, (match, argsStr) => {
        try {
          // Parse the actual arguments
          // Handle nested parens and strings carefully
          const actualArgs = parseArgList(argsStr);
          if (actualArgs.length !== info.params.length) {
            proxyFailures++;
            return match;
          }

          // Compute the decoder arguments
          const decoderArgs = argMappings.map(mapping => {
            const actualArg = actualArgs[mapping.paramIndex].trim();
            if (mapping.offset !== 0) {
              // This should be a numeric arg
              const hexMatch = actualArg.match(/^(0x[0-9a-fA-F]+)$/);
              if (hexMatch) {
                return parseInt(hexMatch[1], 16) + mapping.offset;
              }
              // Could be a decimal
              const decMatch = actualArg.match(/^(-?\d+)$/);
              if (decMatch) {
                return parseInt(decMatch[1]) + mapping.offset;
              }
              return null;
            } else {
              // String arg (for RC4 key) or numeric
              const hexMatch = actualArg.match(/^(0x[0-9a-fA-F]+)$/);
              if (hexMatch) return parseInt(hexMatch[1], 16);
              // String literal
              const strMatch = actualArg.match(/^['"](.*)['"]$/);
              if (strMatch) return strMatch[1];
              const decMatch = actualArg.match(/^(-?\d+)$/);
              if (decMatch) return parseInt(decMatch[1]);
              return null;
            }
          });

          if (decoderArgs.some(a => a === null)) {
            proxyFailures++;
            return match;
          }

          const val = sandbox[decoderFuncName](...decoderArgs);
          if (typeof val === 'string') {
            proxyReplacements++;
            return JSON.stringify(val);
          }
          proxyFailures++;
          return match;
        } catch(e) {
          proxyFailures++;
          return match;
        }
      });
    }

    console.error(`[deep-deob] Proxy replacements: ${proxyReplacements} (${proxyFailures} failures)`);
  }

  // Also handle aliases: const a0_0x4e680e = a0_0x1789; then a0_0x4e680e(0x...)
  const aliasNames = a0_0xNames.filter(n => n !== decoderFuncName && n !== arrayFuncName);
  for (const aliasName of aliasNames) {
    // Check if this is an alias: const aliasName = decoderFuncName;
    const aliasCheck = new RegExp(`(?:const|var|let)\\s+${aliasName}\\s*=\\s*${decoderFuncName}\\s*[;,]`);
    if (aliasCheck.test(code)) {
      console.error(`[deep-deob] Found alias: ${aliasName} -> ${decoderFuncName}`);

      const aliasCallPattern = new RegExp(
        `${aliasName}\\s*\\(\\s*(0x[0-9a-fA-F]+)\\s*(?:,\\s*'([^']*)')?\\s*\\)`,
        'g'
      );

      let aliasReplacements = 0;
      result = result.replace(aliasCallPattern, (match, hexArg, strKey) => {
        try {
          const numArg = parseInt(hexArg, 16);
          let val;
          if (strKey !== undefined) {
            val = sandbox[decoderFuncName](numArg, strKey);
          } else {
            val = sandbox[decoderFuncName](numArg);
          }
          if (typeof val === 'string') {
            aliasReplacements++;
            return JSON.stringify(val);
          }
          return match;
        } catch(e) {
          return match;
        }
      });
      console.error(`[deep-deob]   Alias ${aliasName}: ${aliasReplacements} replacements`);
    }
  }

  // Also find _0x local aliases of the decoder
  // Pattern: const _0x560ad0 = a0_0x1789  (inside functions)
  const localAliasPattern = new RegExp(
    `(?:const|var|let)\\s+(_0x[0-9a-f]+)\\s*=\\s*${decoderFuncName}\\s*[;,]`,
    'g'
  );
  const localAliases = new Set();
  let laMatch;
  while ((laMatch = localAliasPattern.exec(code)) !== null) {
    localAliases.add(laMatch[1]);
  }

  if (localAliases.size > 0) {
    console.error(`[deep-deob] Found ${localAliases.size} local aliases of decoder`);

    for (const alias of localAliases) {
      const aliasCallPattern = new RegExp(
        alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') +
        `\\s*\\(\\s*(0x[0-9a-fA-F]+)\\s*(?:,\\s*'([^']*)')?\\s*\\)`,
        'g'
      );

      let count = 0;
      result = result.replace(aliasCallPattern, (match, hexArg, strKey) => {
        try {
          const numArg = parseInt(hexArg, 16);
          let val = strKey !== undefined
            ? sandbox[decoderFuncName](numArg, strKey)
            : sandbox[decoderFuncName](numArg);
          if (typeof val === 'string') {
            count++;
            return JSON.stringify(val);
          }
          return match;
        } catch(e) {
          return match;
        }
      });
      if (count > 0) {
        console.error(`[deep-deob]   Local alias ${alias}: ${count} replacements`);
      }
    }
  }
}

// ============================================================
// STEP 6: Clean up the code
// ============================================================

// Replace hex number literals (but not in strings)
result = result.replace(/(?<!['"\\a-zA-Z])0x([0-9a-fA-F]+)(?![0-9a-fA-F])/g, (match) => {
  return String(parseInt(match, 16));
});

// Replace !![] with true and ![] with false
result = result.replace(/!\[\]/g, 'false');
result = result.replace(/!!\[\]/g, 'true');

// Fix double negation from the replacement above
// !false should be true (!![] was true, but we replaced ![] first)
// Actually let's be more careful - replace in the right order
// Reset and redo
result = result.replace(/!!\[\]/g, 'true');  // !![] -> true first
result = result.replace(/!\[\]/g, 'false');   // ![] -> false

// Replace void 0 with undefined
result = result.replace(/\bvoid\s+0\b/g, 'undefined');

// Clean up computed property access where possible
// obj['property'] -> obj.property (when property is a valid identifier)
result = result.replace(/\[['"]([a-zA-Z_$][a-zA-Z0-9_$]*)['"]]/g, '.$1');

// Remove the bootstrap code (string array, decoder, rotation)
// Keep only the actual application code
if (arrayFuncName && decoderFuncName) {
  // Remove the array function definition
  if (arrayFuncCode) {
    result = result.replace(arrayFuncCode, '/* [string array removed] */');
  }
  // Remove the decoder function definition
  if (decoderFuncCode) {
    result = result.replace(decoderFuncCode, '/* [decoder removed] */');
  }
  // Remove rotation IIFE
  if (rotationCode) {
    result = result.replace(rotationCode, '/* [rotation removed] */');
  }
}

// ============================================================
// STEP 7: Output
// ============================================================

if (outputFile) {
  fs.writeFileSync(outputFile, result);
  console.error(`[deep-deob] Written to: ${outputFile}`);
} else {
  process.stdout.write(result);
}

console.error(`[deep-deob] Done!`);


// ============================================================
// Helper functions
// ============================================================

function parseArgList(argsStr) {
  // Parse a comma-separated argument list, handling nested parens and strings
  const args = [];
  let depth = 0;
  let current = '';
  let inString = false;
  let stringChar = '';

  for (let i = 0; i < argsStr.length; i++) {
    const ch = argsStr[i];

    if (inString) {
      current += ch;
      if (ch === stringChar && argsStr[i-1] !== '\\') {
        inString = false;
      }
      continue;
    }

    if (ch === "'" || ch === '"') {
      inString = true;
      stringChar = ch;
      current += ch;
      continue;
    }

    if (ch === '(' || ch === '[' || ch === '{') {
      depth++;
      current += ch;
      continue;
    }

    if (ch === ')' || ch === ']' || ch === '}') {
      depth--;
      current += ch;
      continue;
    }

    if (ch === ',' && depth === 0) {
      args.push(current);
      current = '';
      continue;
    }

    current += ch;
  }

  if (current.trim()) {
    args.push(current);
  }

  return args;
}
