import type express from 'express';
import { config, onBug, telefunc } from 'telefunc';

config.telefuncUrl = '/api/_data';

export const connectTelefunc = (app: express.Application) => {
  app.post('/api/_data', async (req, res) => {
    const context = {};
    const httpResponse = await telefunc({
      url: req.originalUrl,
      method: req.method,
      body: req.body,
      context,
    });
    const { body, contentType, statusCode } = httpResponse;
    res.status(statusCode).type(contentType).send(body);
  });
};

onBug(() => {
  // log telefunc error
});
