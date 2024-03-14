import {Handler, Next, Req, Srv,Action } from "cds-routing-handlers";
import { BonusTranche }  from '../../../@cds-models/amalisov/cuibono/bonusTranche';
import { Service } from "typedi";
import cds, { Request } from "@sap/cds";

const logger = cds.log("Bonus Tranch handler logger ")
@Service()
@Handler()
export class DeleteBonusTrancheHandler {
  @Action('deleteBonusTranche')
public async createBonusTranche(@Srv() srv: any, @Req() req: Request, @Next() next: any): Promise<any> {

  logger.info("Read Handler of BonusTrench")
  
  const { ID } = req.data;
  
  const bonusTranche = await SELECT.from(BonusTranche.name).where({ ID });
  
  if (bonusTranche.length === 0) return req.reject(404, "Tranche not found");
  
  const trancheStatus = bonusTranche[0].Status;
  
  if (trancheStatus === "Locked") return req.reply("This tranche is already locked");
  
  await DELETE.from(BonusTranche.name).where({ ID });
  
  return {
    code: 200,
    message: "Tranche deleted successfully",
    status: "SUCCESS",
  };
}

}





