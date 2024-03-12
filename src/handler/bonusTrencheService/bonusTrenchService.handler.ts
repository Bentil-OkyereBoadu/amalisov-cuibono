import {Handler, Next, Req, Srv,Action } from "cds-routing-handlers";
import { Service } from "typedi";
import cds, { Request } from "@sap/cds";

const logger = cds.log("Bonus Tranch handler logger ")
@Service()
@Handler()
export class DeleteBonusTrancheHandler {
  @Action('deleteBonusTranche')
  public async createBonusTranche(@Srv() srv: any,@Req() req: Request,@Next() next: any): Promise<any> {
    logger.info("Read Handler of BonusTrench")
    const { BonusTranche } = cds.entities("amalisov.cuibono.bonusTranche");
    const { ID } = req.data;
    const tx = cds.transaction(req);
    const tranche = await tx.read(BonusTranche).where({ ID });
      if (tranche.length === 0) return req.reject(404, "Tranche not found");
      const trancheStatus = tranche[0].Status;
      if (trancheStatus === "Locked") return req.reply("This tranche is already locked");
      await tx.run(DELETE.from(BonusTranche).where({ ID }));
      return {
        code: 200,
        message: "Thread deleted successfully",
        status: "SUCCESS",
      };

  }
}





