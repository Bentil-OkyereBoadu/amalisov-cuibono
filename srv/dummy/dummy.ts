import "reflect-metadata";
import { createCombinedHandler } from 'cds-routing-handlers';
import { DoSomethingHandler } from '../../src/handler/dummyService/dummyService.handler';
import { ReturnSomethingFunctionHandler } from '../../src/handler/dummyService/return-something.function';

module.exports = createCombinedHandler({
  handler: [
    DoSomethingHandler,
    ReturnSomethingFunctionHandler
  ],
  middlewares: [],
});

