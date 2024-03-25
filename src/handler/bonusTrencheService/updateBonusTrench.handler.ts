import { Handler, Next, Req, Srv, Action, Func } from "cds-routing-handlers";
import { BonusTranche } from "../../../@cds-models/amalisov/cuibono/bonusTranche";
import { Service } from "typedi";
import cds, { Request } from "@sap/cds";

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
    const { ID, name, weight, startDate, endDate, location } = req.data;
    const bonusTranche = await SELECT.one.from(BonusTranche.name).where({ ID });
    if (!bonusTranche) return req.reject(404, "Tranche not found");
    if (bonusTranche.Status === "Running") {
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
