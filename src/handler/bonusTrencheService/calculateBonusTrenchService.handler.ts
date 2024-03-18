import { Handler, Next, Req, Srv, Func } from "cds-routing-handlers";
import { BonusTranche } from '../../../@cds-models/amalisov/cuibono/bonusTranche';
import { TrancheParticipation } from '../../../@cds-models/amalisov/cuibono/trancheParticipation';
import { Service } from "typedi";
import cds, { Request } from "@sap/cds";

@Service()
@Handler()
export class CalculateBonusTrancheHandler {
    @Func('calculateBonusTranche')
    public async createBonusTranche(@Srv() srv: any, @Req() req: Request, @Next() next: any): Promise<any> {
        const allTranchBonus = await SELECT.from(BonusTranche.name);

        allTranchBonus.forEach(async (tranch: BonusTranche) => { 

            if (tranch.Status === 'Locked') {
                // Calculate the bonus 
                // 1. Calculate the department bonus 
                const tranchParticipantID = tranch.trancheParticipations
                const tranchParticipations = await SELECT.from(TrancheParticipation.name).where({ id: tranchParticipantID });
                tranchParticipations.forEach((tranchParticipation: TrancheParticipation) => {
                    const department = tranchParticipation.department;
                    const departBonus = tranchParticipation.department.bonus
                    console.log(department);
                });
            }
        });
    }
}

