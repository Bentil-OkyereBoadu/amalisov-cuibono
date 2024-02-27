import { Container } from 'typedi';
import { Application } from 'express';

import { useContainer } from 'cds-routing-handlers';
import cds from '@sap/cds';
import proxy from '@sap/cds-odata-v2-adapter-proxy';
import "reflect-metadata";

// enable dependency injection
useContainer(Container);

cds.on('bootstrap', (app: Application) => {
  app.use(proxy({ caseInsensitive: true }));
});
module.exports = cds.server;
