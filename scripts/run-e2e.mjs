import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { spawn } from 'node:child_process';

const root = process.cwd();
const dist = resolve(root, 'dist');
const port = Number(process.env.PORT ?? 3000);

const mimeTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg']
]);

const run = (command, args) =>
  new Promise((resolveCommand, reject) => {
    const child = spawn(command, args, {
      cwd: root,
      shell: process.platform === 'win32',
      stdio: 'inherit'
    });

    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) {
        resolveCommand();
        return;
      }

      reject(new Error(`${command} ${args.join(' ')} exited with ${code}`));
    });
  });

const sendFile = async (requestUrl, response) => {
  const url = new URL(requestUrl ?? '/', `http://localhost:${port}`);
  const requestPath = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
  const filePath = resolve(dist, requestPath === sep ? 'index.html' : requestPath.slice(1));
  const safePath = filePath.startsWith(dist) ? filePath : join(dist, 'index.html');

  try {
    const bytes = await readFile(safePath);
    response.writeHead(200, {
      'Content-Type': mimeTypes.get(extname(safePath)) ?? 'application/octet-stream'
    });
    response.end(bytes);
  } catch {
    const bytes = await readFile(join(dist, 'index.html'));
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });
    response.end(bytes);
  }
};

await run('npx', ['expo', 'export', '--platform', 'web', '--output-dir', 'dist']);

const server = createServer((request, response) => {
  void sendFile(request.url, response);
});

await new Promise((resolveServer, reject) => {
  server.once('error', reject);
  server.listen(port, resolveServer);
});

try {
  await run('npx', ['cypress', 'run']);
} finally {
  await new Promise((resolveClose) => server.close(resolveClose));
}
