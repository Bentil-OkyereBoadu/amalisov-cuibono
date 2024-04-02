import { Handler, Srv,Req,Action } from "cds-routing-handlers";
import { Service } from "typedi";
import { TrancheParticipation } from "#cds-models/amalisov/cuibono/trancheParticipation";
import { Request } from "@sap/cds";

@Handler()
@Service()
export class OverRuleAmount{
    @Action("overRuleAmount")
    public async overRuleAmount(@Srv() srv:any, @Req() req:Request){
      const {ID,finalAmount,justification}:TrancheParticipation = req.data as unknown as TrancheParticipation
      try {
        const participant = await SELECT.one.from(TrancheParticipation.name).where({ID})
        if(!participant) req.reject(404,"Participant not found") 
        await  UPDATE(TrancheParticipation.name)
    .where({ID})
    .set({
        finalAmount,
        justification
       })
      return {
        code:200,
        message:`${participant.name} final amount was overruled to ${finalAmount}`,
        status:"Success"
      }
      }catch (error:any) {
        console.log(error)
        throw Error(error)
      }
    }
}