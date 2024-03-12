import { createCombinedHandler } from 'cds-routing-handlers';
import { DeleteBonusTrancheHandler }  from '../../src/handler/bonusTrencheService/bonusTrenchService.handler';

module.exports = createCombinedHandler({
  handler: [
    DeleteBonusTrancheHandler
  ],
  middlewares: [],
});
  
