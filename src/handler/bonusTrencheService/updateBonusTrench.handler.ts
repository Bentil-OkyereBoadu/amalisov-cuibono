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
    if (bonusTranche.Status === "Running") {

      let updatedTargets: Partial<Target>[] = [];
      
      if (targets.length > 0) {
        updatedTargets = await Promise.all(
          targets.map(async (t: Target) => {
            if(t.isDelete === true){
              await DELETE.from(Target.name, t.ID)
             }else{
            const target: Target = await SELECT.one.from(Target.name).where({ ID: t.ID, bonusTranche_ID: ID }) as Target;
            if (!target) return req.reject(404, "Target not found");
            const updatedTarget: Partial<Target> = {
              name: t.name || target.name,
              weight: t.weight || target.weight,
              achievement: t.achievement || target.achievement,
              description: t.description || target.description,
              bonusTranche_ID: target.bonusTranche_ID
            };

            await UPDATE(Target, t.ID).with(updatedTarget);
            return updatedTarget;
          }})
        );
      }
      const data = {
        name: name ? name : bonusTranche.name,
        weight: weight ? weight : bonusTranche.weight,
        startDate: startDate ? startDate : bonusTranche.startDate,
        endDate: endDate ? endDate : bonusTranche.endDate,
        location: location ? location : bonusTranche.location
      };

      await UPDATE(BonusTranche, ID).with({ ...data });
      return {
        code: 200,
        message: "Tranche udpated successfully",
        status: "SUCCESS",
      };
    }
  }
}
