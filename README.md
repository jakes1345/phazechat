# PhazeChat (xat.com clone)

A modern, high-fidelity clone of the classic xat.com chat platform.

## Features
- **Express Backend**: High-performance Node.js API.
- **WebSocket Protocol**: Real-time messaging and status updates.
- **SQLite Database**: Uses `better-sqlite3` for persistent storage (id range 1500xx... compatible).
- **Static Assets**: Serves legacy Flash assets and modern HTML/JS chat.
- **Authentication**: Custom scrypt hashing and session tokens.
- **Powers System**: Full support for 700+ xat powers.

## Getting Started

### 1. Install Dependencies
Ensure you have [Node.js](https://nodejs.org/) installed, then run:
```bash
npm install
```

### 2. Start the Server
To launch the server on port `6969`:
```bash
npm start
```

### 3. Access the Chat
Open your browser and navigate to:
[http://localhost:6969](http://localhost:6969)

## Project Structure
- `/src/server.js`: Main entry point (API + WebSockets + Static serving).
- `/public/`: Frontend assets, HTML, and legacy Flash `.swf` files.
- `/data/`: SQLite database (`xat.db`) and power definitions.
- `/scripts/`: Crawler and deobfuscation utilities.
- `/reference/`: Analyzed source material from original xat clients.

## License
ISC
