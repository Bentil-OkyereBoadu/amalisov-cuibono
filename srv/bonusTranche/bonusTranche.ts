import "reflect-metadata";
import {Service} from '@sap/cds';
import { createCombinedHandler } from 'cds-routing-handlers';
import {TrancheLockedHandler} from '../../src/handler/bonusTranche/bonusTranche.handler';
import {TrancheLocked} from '../../src/handler/bonusTranche/bonusTranche.action'

module.exports =(srv:Service) => {
    const combinedHandler =  createCombinedHandler({
        handler: [
          TrancheLocked,
          TrancheLockedHandler
        ],
        middlewares: [],
      });
    combinedHandler(srv);
}

