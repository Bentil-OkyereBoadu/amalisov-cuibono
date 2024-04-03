import { Handler,Srv,Req, Action } from "cds-routing-handlers";
import { Service } from "typedi";
import { TrancheParticipation } from "#cds-models/amalisov/cuibono/trancheParticipation";
import { Request } from "@sap/cds";


@Handler()
@Service()
export class ExcludeParticipant{
    @Action("excludeParticipant")
    public async excludeParticipant(@Srv() srv:any, @Req() req:Request){
         const {ID,excluded,justification}:any = req.data
         try {
           const data = await Promise.all(
                ID.map(async(id:String) => {
                    const particapants:TrancheParticipation = await SELECT.one.from(TrancheParticipation.name).where({ID:id})
                    if(!particapants)req.reject(404,"Participant not found")
                    await UPDATE(TrancheParticipation.name).where({ID:id})
                .set({
                excluded,
               justification
                     })
            return {
                message:`${particapants.name} is exclude from  the tranche`,
            }
                })
            )
            return {
                code:200,
                status:"success",
                data
            }
         } catch (error:any) {
            console.log(error)
            throw Error(error)
         } 
    }
}