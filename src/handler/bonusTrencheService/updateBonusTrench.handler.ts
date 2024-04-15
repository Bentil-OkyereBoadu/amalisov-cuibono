import { Handler, Next, Req, Srv, Action, Func } from "cds-routing-handlers";
import { BonusTranche } from "../../../@cds-models/amalisov/cuibono/bonusTranche";
import { Service } from "typedi";
import cds, { Request } from "@sap/cds";
import { TrancheParticipation } from "#cds-models/amalisov/cuibono/trancheParticipation";
import {calculateAmountOnLocked} from '../../../src/utils/calculateAmount.locked';
import { updateTranche } from "../../../src/utils/updateTranchFlieds";

const logger = cds.log("Bonus Tranch handler logger ");
@Service()
@Handler()
export class UpdateBonusTrancheHandler {
  @Action("updateBonusTranche")
  public async updateBonusTranche( @Srv() srv: any, @Req() req: Request, @Next() next: any
  ): Promise<any> {
    logger.info("Read Handler of BonusTrench");
    const { ID, name,description, weight,orignDate, startDate, endDate, location,targets,Status } = req.data;
    const bonusTranche = await SELECT.one.from(BonusTranche.name).where({ ID });
    if (!bonusTranche) return req.reject(404, "Tranche not found");

    if (Status === "Locked") {
    await updateTranche(ID, name, description, weight, orignDate, startDate, endDate, location, targets, bonusTranche);
    await calculateAmountOnLocked(targets,ID)
  }
  
    if (Status === "Completed"){
      const participants = await SELECT.from(TrancheParticipation.name).where({bonusTranche_ID: ID});
      participants.map(async(participant: TrancheParticipation) => {
        // check if participant is excluded  
        if(participant.excluded){
          await UPDATE(TrancheParticipation.name)
          .where({ID:participant.ID})
          .set({finalAmount:0})
        }else{
          const {calculatedAmount} = participant;
          await UPDATE(TrancheParticipation.name)
          .where({ID:participant.ID})
          .set({finalAmount:calculatedAmount})
        }
      });
    }

    if (Status === "Open") {
        await updateTranche(ID, name, description, weight, orignDate, startDate, endDate, location, targets, bonusTranche);
    } 
    
     await UPDATE(BonusTranche.name).where({ ID }).set({ Status });
      const participants = await SELECT.from(TrancheParticipation.name).where({bonusTranche_ID: ID});
      await Promise.all(
        participants.map(async (particapant: TrancheParticipation) => {
          await UPDATE(TrancheParticipation.name).where({ ID: particapant.ID }).set({Status});
        })
      );

      return {
        code: 200,
        message: "Tranche updated successfully",
        status: "SUCCESS",
    };

  }
}



