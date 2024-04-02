import { Handler,Srv,Req, Action } from "cds-routing-handlers";
import { Service } from "typedi";
import { TrancheParticipation } from "#cds-models/amalisov/cuibono/trancheParticipation";
import { Request } from "@sap/cds";


@Handler()
@Service()
export class ExcludeParticipant{
    @Action("excludeParticipant")
    public async excludeParticipant(@Srv() srv:any, @Req() req:Request){
         const {ID,justification} = <TrancheParticipation>req.data
         try {
            const particapants:TrancheParticipation = await SELECT.one.from(TrancheParticipation.name).where({ID})
            console.log(particapants)
            if(!particapants)req.reject(404,"Participant not found")
            await UPDATE(TrancheParticipation.name)
        .set({
        excluded:true,
       justification
             })
    return {
        code:200,
        message:`${particapants.name} is exclude from  the tranche`,
        status:"Success"
    }
         } catch (error) {
            console.log(error)
         } 
    }
}