import { Handler, Next, Req, Srv, Action, Func } from "cds-routing-handlers";
import { BonusTranche } from "../../../@cds-models/amalisov/cuibono/bonusTranche";
import { Service } from "typedi";
import cds, { Request } from "@sap/cds";
import { Target } from "#cds-models/amalisov/cuibono/targetAmount";

const logger = cds.log("Bonus Tranch handler logger ");
@Service()
@Handler()
export class UpdateBonusTrancheHandler {
  @Action("updateBonusTranche")
  public async updateBonusTranche(
    @Srv() srv: any,
    @Req() req: Request,
    @Next() next: any
  ): Promise<any> {
    logger.info("Read Handler of BonusTrench");
    const { ID, name, weight, startDate, endDate, location,targets } = req.data;
    const bonusTranche = await SELECT.one.from(BonusTranche.name).where({ ID });
    if (!bonusTranche) return req.reject(404, "Tranche not found");
    if (bonusTranche.Status !== "Open") return req.reject(400, `BonusTranche cannot be updted while the status is ${bonusTranche.status}`)
    
    const data = {
      name: name ? name : bonusTranche.name,
      weight: weight ? weight : bonusTranche.weight,
      startDate: startDate ? startDate : bonusTranche.startDate,
      endDate: endDate ? endDate : bonusTranche.endDate,
      location: location ? location : bonusTranche.location
    };
   if(targets.length > 0){
    await DELETE.from(Target.name).where({bonusTranche_ID:ID})
    await Promise.all(targets.map(async(target:any) => {
      const {name,weight,achievement,description} = target
      await INSERT.into(Target.name).entries({
        name,
        weight,
        achievement,
        description,
        bonusTranche_ID:ID
      })
    }))
   }
    await UPDATE(BonusTranche, ID).with({ ...data });
    return {
      code: 200,
      message: "Tranche udpated successfully",
      status: "SUCCESS",
    };
  }
}
