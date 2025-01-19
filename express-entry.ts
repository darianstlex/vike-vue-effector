import express from 'express';
import { exec } from 'node:child_process';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createDevMiddleware } from 'vike/server';

import { createHandler } from '@universal-middleware/express';

import { telefuncHandler } from './server/telefunc-handler';
import { vikeHandler } from './server/vike-handler';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = __dirname;
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

export default (await startServer()) as unknown;

async function startServer() {
  const app = express();

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(`${root}/dist/client`));
  } else {
    const { devMiddleware } = await createDevMiddleware({ root });
    app.use(devMiddleware);
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
