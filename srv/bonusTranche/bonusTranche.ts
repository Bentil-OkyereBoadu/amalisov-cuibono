import { createCombinedHandler } from 'cds-routing-handlers';
import {TrancheLockedHandler} from '../../src/handler/bonusTranche/bonusTranche.handler';
import {TrancheLocked} from '../../src/handler/bonusTranche/bonusTranche.action'

module.exports = createCombinedHandler({
  handler: [
    TrancheLocked,
    TrancheLockedHandler
  ],
  middlewares: [],
});

