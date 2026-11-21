// Production HTTP Server for Render / Cloud Hosting (Zero external dependencies)
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.jsx': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  // Normalize URL
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  // Check if file exists in root or dist
  let filePath = path.join(__dirname, reqPath);
  
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    // Check in dist if built with Vite
    const distPath = path.join(__dirname, 'dist', reqPath);
    if (fs.existsSync(distPath) && !fs.statSync(distPath).isDirectory()) {
      filePath = distPath;
    } else {
      // Single Page Application Fallback
      const distIndex = path.join(__dirname, 'dist', 'index.html');
      filePath = fs.existsSync(distIndex) ? distIndex : path.join(__dirname, 'index.html');
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server Error: ' + err.message);
    } else {
      res.writeHead(200, { 
        'Content-Type': contentType,
        'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000'
      });
      res.end(content);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(` AapdaLink Disaster Safety Platform Running on Render `);
  console.log(` Port: ${PORT} (http://0.0.0.0:${PORT})               `);
  console.log(`=======================================================`);
});
