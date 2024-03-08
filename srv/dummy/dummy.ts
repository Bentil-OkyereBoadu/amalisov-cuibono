import "reflect-metadata";
import { Service } from "@sap/cds";
import { createCombinedHandler } from 'cds-routing-handlers';
import { DoSomethingHandler } from '../../src/handler/dummyService/dummyService.handler';
import { ReturnSomethingFunctionHandler } from '../../src/handler/dummyService/returnSomethingHandler';

module.exports = (srv: Service) => {
  const combinedHandler = createCombinedHandler({
    handler: [
      DoSomethingHandler,
      ReturnSomethingFunctionHandler
    ],
  });
  combinedHandler(srv);
};
