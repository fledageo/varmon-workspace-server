const fs = require('fs');
const path = require('path');

const LOG_DIR = process.env.LOG_DIR || path.join(process.cwd(), 'logs');
if (!fs.existsSync(LOG_DIR)) {
  try { fs.mkdirSync(LOG_DIR, { recursive: true }); } catch (e) { /* ignore */ }
}

function appendLog(filename, text) {
  const file = path.join(LOG_DIR, filename);
  const line = `[${new Date().toISOString()}] ${text}\n\n`;
  try {
    fs.appendFileSync(file, line, 'utf8');
  } catch (err) {
    console.error('Failed to write log file', err);
    console.log(line);
  }
}

module.exports = {
  info: (msg) => appendLog('info.log', msg),
  error: (msg) => appendLog('error.log', msg),
  debug: (msg) => appendLog('debug.log', msg),
};