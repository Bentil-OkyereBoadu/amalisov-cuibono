import { createCombinedHandler } from 'cds-routing-handlers';
import { DeleteBonusTrancheHandler }  from '../../src/handler/bonusTrencheService/bonusTrenchService.handler';
import {CalculateBonusTrancheHandler} from '../../src/handler/bonusTrencheService/calculateBonusTrenchService.handler'
import {CreateTranche} from '../../src/handler/createTrancheHandler/createBonusTranche.handler';
import {UpdateBonusTrancheHandler} from '../../src/handler/bonusTrencheService/updateBonusTrench.handler';

module.exports = createCombinedHandler({
  handler: [
    DeleteBonusTrancheHandler,
    CalculateBonusTrancheHandler,
    CreateTranche,
    UpdateBonusTrancheHandler
  ],
  middlewares: [],
});
  
