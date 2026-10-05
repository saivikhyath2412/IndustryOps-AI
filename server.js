'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const port = Number(process.env.PORT) || 4173;
const publicFiles = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/app.js', ['app.js', 'text/javascript; charset=utf-8']],
  ['/backend-client.js', ['backend-client.js', 'text/javascript; charset=utf-8']],
  ['/supabase-config.js', ['supabase-config.js', 'text/javascript; charset=utf-8']],
  ['/styles.css', ['styles.css', 'text/css; charset=utf-8']],
]);

http.createServer((request, response) => {
  const entry = publicFiles.get(new URL(request.url, 'http://localhost').pathname);
  if (!entry || (request.method !== 'GET' && request.method !== 'HEAD')) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8', 'X-Content-Type-Options': 'nosniff' });
    response.end('Not found');
    return;
  }
  const [file, contentType] = entry;
  const absolutePath = path.join(root, file);
  fs.readFile(absolutePath, (error, content) => {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Unable to read the requested page.');
      return;
    }
    response.writeHead(200, {
      'Content-Type': contentType,
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self' https: wss:; img-src 'self' data:;",
    });
    response.end(request.method === 'HEAD' ? undefined : content);
  });
}).listen(port, '127.0.0.1', () => {
  console.log(`IndustryOps AI is available at http://localhost:${port}`);
});
