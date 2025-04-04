import type express from 'express';
import { renderPage } from 'vike/server';

export const handleVike = (app: express.Application) => {
  app.get(/.*/, async (req, res, next) => {
    const pageContextInit = {
      cookies: req.cookies,
      urlOriginal: req.originalUrl,
      headersOriginal: req.headers,
    };
    const pageContext = await renderPage(pageContextInit);
    if (pageContext.errorWhileRendering) {
      // Install error tracking here, see https://vike.dev/errors
    }
    const { httpResponse } = pageContext;
    if (!httpResponse) {
      return next();
    } else {
      const { body, statusCode, headers, earlyHints } = httpResponse;
      if (res.writeEarlyHints) res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) }); // need to be supported by the infrastructure
      headers.forEach(([name, value]) => res.setHeader(name, value));
      res.status(statusCode).send(body);
    }
  });
};
