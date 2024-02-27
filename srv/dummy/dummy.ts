// import { DoSomethingHandler } from './../../src/handler/dummyService/dummyService.handler';
import { createCombinedHandler } from 'cds-routing-handlers';
import { DoSomethingHandler } from '../../src/handler/dummyService/dummyService.handler';

module.exports = createCombinedHandler({
  handler: [
    DoSomethingHandler
  ],
  middlewares: [],
});