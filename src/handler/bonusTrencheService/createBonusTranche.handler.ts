import { Service } from "typedi";
import { Handler, Srv, Req, Action } from "cds-routing-handlers";
import { Request } from "@sap/cds";

import { BonusTranche } from '#cds-models/amalisov/cuibono/bonusTranche';
import { Target } from '#cds-models/amalisov/cuibono/targetAmount';
import { Employees } from '#cds-models/amalisov/cuibono/employee';
import { TrancheParticipation } from '#cds-models/amalisov/cuibono/trancheParticipation';
import { calculateDays } from "../../../src/utils/calculateDays";
import {calculateAmountOnLocked} from '../../../src/utils/calculateAmount.locked';
@Service()
@Handler()
export class CreateTrancheHandler {
    @Action('createTranche')
    public async newTranche(@Srv() srv: any, @Req() req: Request) {
        const { name, startDate, endDate, weight, Status, location, description, orignDate, targets } = req.data;
        const tranchDuration = calculateDays(startDate,endDate)
        if (tranchDuration>365){
            return req.reject(403,"You can not create a tranch with a period great than a year !")
        }
        try {
            // Insert BonusTranche
            const [result]: any = await INSERT.into(BonusTranche.name)
                .entries({ name, startDate, endDate, weight, Status, location, description, orignDate });
            // Process targets sequentially
            if (targets.length > 0) {
                await Promise.all(targets.map(async (target: any) => {
                    const { name, weight, achievement, description } = target;
                    await INSERT.into(Target.name).entries({
                        name,
                        weight,
                        achievement,
                        description,
                        bonusTranche_ID: result.ID
                    });
                }));
            }

            // Insert TrancheParticipation sequentially
            const employees = await SELECT.from(Employees.name);
            await Promise.all(employees.map(async (employee: any) => {
                const { ID,firstName, lastName, department_ID } = employee;
                
                await INSERT.into(TrancheParticipation.name).entries({
                    name: `${firstName} ${lastName}`,
                    localId: ID,
                    Status,
                    startDate,
                    endDate,
                    weight,
                    location,
                    department_ID,
                    bonusTranche_ID: result.ID
                });
            }));

            if (Status === "Locked") {
                await calculateAmountOnLocked(targets,result.ID)
            }

            return {
                code:"200",
                message:"Tranche Created Successfully",
                status:"SUCCESS",
                result
            };
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }
}
