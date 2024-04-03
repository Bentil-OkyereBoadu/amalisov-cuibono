import { Handler, Srv,Req,Action } from "cds-routing-handlers";
import { Service } from "typedi";
import { TrancheParticipation } from "#cds-models/amalisov/cuibono/trancheParticipation";
import { Request } from "@sap/cds";
import { BonusTranche } from "#cds-models/amalisov/cuibono/bonusTranche";

@Handler()
@Service()
export class OverRuleAmount{
    @Action("overRuleAmount")
    public async overRuleAmount(@Srv() srv:any, @Req() req:Request){
      const {ID,finalAmount,justification}:any = req.data as unknown as TrancheParticipation
      try {
      const data =  await Promise.all(ID.map(async(id:String) => {
          const participant = await SELECT.one.from(TrancheParticipation.name).where({ID:id})
          const bonusTranche = await SELECT.one.from(BonusTranche.name).where({ID:participant.bonusTranche_ID})
          if(!bonusTranche && bonusTranche.status === "Completed") req.reject(400,"Bonus tranche is completed")
          if(!participant) req.reject(404,"Participant not found") 
          await  UPDATE(TrancheParticipation.name)
      .where({ID:id})
      .set({
          finalAmount,
          justification
         })
        return {
          message:`${participant.name} final amount was overruled to ${finalAmount}`,
        }
        }))
        return {
          code:200,
          status:"Success",
          data
        }
      }catch (error:any) {
        console.log(error)
        throw Error(error)
      }
    }
}