import "reflect-metadata";
import { Service } from "@sap/cds";
import { createCombinedHandler } from 'cds-routing-handlers';
import { DeleteBonusTrancheHandler }  from '../../src/handler/bonusTrencheService/bonusTrenchService.handler';
import {ParticipantDataHandler} from '../../src/handler/trancheParticipant/participantDataService.function.handler'
import {CreateTrancheHandler} from '../../src/handler/bonusTrencheService/createBonusTranche.handler';
import {UpdateBonusTrancheHandler} from '../../src/handler/bonusTrencheService/updateBonusTrench.handler';
import { ExcludeParticipant } from "../../src/handler/trancheParticipant/exclude.handler";
import { OverRuleAmount } from "../../src/handler/trancheParticipant/overruleAmount.handler";

module.exports = (srv: Service) => {
  const combinedHandler = createCombinedHandler({
    handler: [
      DeleteBonusTrancheHandler,
      UpdateBonusTrancheHandler,
      ParticipantDataHandler,
      CreateTrancheHandler,
      ExcludeParticipant,
      OverRuleAmount
    ],
    middlewares: [],
  });
  combinedHandler(srv)
} 
  
