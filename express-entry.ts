import express from 'express';
import { exec } from 'node:child_process';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { createHandler } from '@universal-middleware/express';

import { telefuncHandler } from './server/telefunc-handler';
import { vikeHandler } from './server/vike-handler';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = __dirname;
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const hmrPort = process.env.HMR_PORT ? parseInt(process.env.HMR_PORT, 10) : 24678;

export default (await startServer()) as unknown;

async function startServer() {
  const app = express();

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(`${root}/dist/client`));
  } else {
    // Instantiate Vite's development server and integrate its middleware to our server.
    // ⚠️ We should instantiate it *only* in development. (It isn't needed in production
    // and would unnecessarily bloat our server in production.)
    const vite = await import('vite');
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true, hmr: { port: hmrPort } },
      })
    ).middlewares;
    app.use(viteDevMiddleware);
  }

  app.post('/_telefunc', createHandler(telefuncHandler)());

  /**
   * Vike route
   *
   * @link {@see https://vike.dev}
   **/
  app.all(/(.*)/, createHandler(vikeHandler)());

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });

  if (process.env.NODE_ENV === 'production') {
    setInterval(() => {
      exec('tsx ./server/prerender.ts', (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      });
    }, 60000);
  }

  return app;
}
