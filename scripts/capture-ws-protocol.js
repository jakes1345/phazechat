#!/usr/bin/env node
/**
 * Capture real xat.com WebSocket protocol exchange.
 * Uses CDP (Chrome DevTools Protocol) to intercept WebSocket frames
 * during a real chat session, capturing the full join sequence and
 * all packet types.
 *
 * Usage: node scripts/capture-ws-protocol.js [roomName]
 *   roomName defaults to "Chat"
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const DATA_DIR = path.resolve(__dirname, '..', 'data');
const ROOM = process.argv[2] || 'Chat';
const CAPTURE_DURATION = 30000; // 30 seconds of capture after page load

async function main() {
  console.log(`[WS-Capture] Launching stealth browser for room: ${ROOM}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');

  // Get CDP session for WebSocket interception
  const client = await page.target().createCDPSession();
  await client.send('Network.enable');

  const wsFrames = [];
  const apiResponses = [];
  let wsUrl = null;

  // Capture WebSocket creation
  client.on('Network.webSocketCreated', (params) => {
    console.log(`[WS] WebSocket created: ${params.url}`);
    wsUrl = params.url;
    wsFrames.push({ type: 'created', url: params.url, ts: Date.now() });
  });

  // Capture WebSocket handshake
  client.on('Network.webSocketHandshakeResponseReceived', (params) => {
    console.log(`[WS] Handshake complete, status: ${params.response.status}`);
    wsFrames.push({ type: 'handshake', status: params.response.status, headers: params.response.headers, ts: Date.now() });
  });

  // Capture ALL outgoing WebSocket frames (client → server)
  client.on('Network.webSocketFrameSent', (params) => {
    const data = params.response.payloadData;
    const opcode = params.response.opcode;
    console.log(`[WS →] opcode=${opcode} ${(data || '').substring(0, 200)}`);
    wsFrames.push({ type: 'sent', opcode, data: data || '', ts: Date.now() });
  });

  // Capture ALL incoming WebSocket frames (server → client)
  client.on('Network.webSocketFrameReceived', (params) => {
    const data = params.response.payloadData;
    const opcode = params.response.opcode;
    const preview = (data || '').length > 200 ? data.substring(0, 200) + '...' : (data || '');
    console.log(`[WS ←] opcode=${opcode} ${preview}`);
    wsFrames.push({ type: 'received', opcode, data: data || '', ts: Date.now() });
  });

  // Capture WebSocket errors
  client.on('Network.webSocketFrameError', (params) => {
    console.log(`[WS ERR] ${params.errorMessage}`);
    wsFrames.push({ type: 'error', error: params.errorMessage, ts: Date.now() });
  });

  // Capture WebSocket close
  client.on('Network.webSocketClosed', (params) => {
    console.log(`[WS] Connection closed`);
    wsFrames.push({ type: 'closed', ts: Date.now() });
  });

  // Also capture all API responses with FULL body (no truncation)
  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('.php') || url.includes('/json/')) {
      try {
        const body = await response.text();
        apiResponses.push({
          url,
          status: response.status(),
          contentType: response.headers()['content-type'] || '',
          body,
          ts: Date.now()
        });
      } catch (e) {}
    }
  });

  // First pass Cloudflare on main page
  console.log('[WS-Capture] Passing Cloudflare...');
  try {
    await page.goto('https://xat.com/', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 5000));
    console.log('[WS-Capture] Cloudflare passed');
  } catch (e) {
    console.warn('[WS-Capture] Initial load issue:', e.message);
  }

  // Navigate to chat room to trigger WebSocket connection
  console.log(`[WS-Capture] Loading chat room: https://xat.com/${ROOM}`);
  try {
    await page.goto(`https://xat.com/${ROOM}`, { waitUntil: 'networkidle2', timeout: 45000 });
  } catch (e) {
    console.warn('[WS-Capture] Room load issue:', e.message);
  }

  // Wait longer for WASM to initialize and connect
  console.log(`[WS-Capture] Waiting for WASM initialization...`);
  await new Promise(r => setTimeout(r, 10000));

  // Check console logs for WASM debug info
  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('ws') || text.includes('WS') || text.includes('socket') || text.includes('connect') || text.includes('xat')) {
      console.log(`[PAGE] ${text}`);
    }
  });

  // Wait for WebSocket traffic
  console.log(`[WS-Capture] Capturing for ${CAPTURE_DURATION / 1000}s...`);
  await new Promise(r => setTimeout(r, CAPTURE_DURATION));

  // Save results
  const output = {
    room: ROOM,
    capturedAt: new Date().toISOString(),
    wsUrl,
    wsFrameCount: wsFrames.length,
    apiResponseCount: apiResponses.length,
    wsFrames,
    apiResponses
  };

  const outputPath = path.join(DATA_DIR, `ws_capture_${ROOM.toLowerCase()}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`\n[WS-Capture] Saved ${wsFrames.length} WS frames + ${apiResponses.length} API responses to ${outputPath}`);

  // Also save individual API responses as separate files for easy access
  for (const api of apiResponses) {
    try {
      const urlPath = new URL(api.url).pathname;
      const filename = urlPath.replace(/\//g, '_').replace(/^_/, '') + '.json';
      const filePath = path.join(DATA_DIR, 'api_cache', filename);

      // Try to parse as JSON first
      try {
        const json = JSON.parse(api.body);
        fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
      } catch {
        fs.writeFileSync(filePath, api.body);
      }
    } catch (e) {}
  }

  // Extract and save just the WS protocol packets in a clean format
  const protocolPackets = wsFrames
    .filter(f => f.type === 'sent' || f.type === 'received')
    .map(f => ({
      dir: f.type === 'sent' ? 'C→S' : 'S→C',
      data: f.data,
      ts: f.ts
    }));

  if (protocolPackets.length > 0) {
    const protoPath = path.join(DATA_DIR, `protocol_packets_${ROOM.toLowerCase()}.json`);
    fs.writeFileSync(protoPath, JSON.stringify(protocolPackets, null, 2));
    console.log(`[WS-Capture] Saved ${protocolPackets.length} protocol packets to ${protoPath}`);

    // Also save a human-readable log
    const logLines = protocolPackets.map(p => `${p.dir} | ${p.data}`);
    const logPath = path.join(DATA_DIR, `protocol_log_${ROOM.toLowerCase()}.txt`);
    fs.writeFileSync(logPath, logLines.join('\n'));
    console.log(`[WS-Capture] Saved protocol log to ${logPath}`);
  }

  await browser.close();
  console.log('[WS-Capture] Done');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
