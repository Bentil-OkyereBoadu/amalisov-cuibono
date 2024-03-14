import { createCombinedHandler } from 'cds-routing-handlers';
import { DeleteBonusTrancheHandler }  from '../../src/handler/bonusTrencheService/bonusTrenchService.handler';
import {CalculateBonusTrancheHandler} from '../../src/handler/bonusTrencheService/calculateBonusTrench.handler'

module.exports = createCombinedHandler({
  handler: [
    DeleteBonusTrancheHandler,
    CalculateBonusTrancheHandler
  ],
  middlewares: [],
});
  
