import { Service } from "typedi";
import { Handler, Srv, Req, Action } from "cds-routing-handlers";
import { Request } from "@sap/cds";
const { BonusTranche } = require('#cds-models/amalisov/cuibono/bonusTranche')
const { Target } = require('#cds-models/amalisov/cuibono/targetAmount')
const { Employees } = require('#cds-models/amalisov/cuibono/employee')
const { TrancheParticipation } = require('#cds-models/amalisov/cuibono/trancheParticipation')

@Service()
@Handler()
export class CreateTrancheHandler {
    @Action('createTranche')
    public async newTranche(@Srv() srv: any, @Req() req: Request) {
        const { name, startDate, endDate, weight, Status, location, targets } = req.data;
        const [result] = await INSERT.into(BonusTranche.name).entries({ name, startDate, endDate, Status, location });
        console.log(result);
        if (targets.length > 0) {
            for (let i = 0; i < targets.length; i++) {
                const { name, weight, achievement, description } = targets[i];
                const [query] = await INSERT.into(Target.name).entries({
                    name,
                    weight,
                    achievement,
                    description,
                    bonusTranche_ID: result.ID
                });
            }
        }

        const data = await SELECT.from(Employees.name);

        for (let i = 0; i < data.length; i++) {
            const { firstName, lastName, department_ID } = data[i];
            const [query] = await INSERT.into(TrancheParticipation.name).entries({
                name: `${firstName} ${lastName}`,
                Status,
                startDate,
                endDate,
                weight,
                location,
                department_ID,
                bonusTranche_ID: result.ID
            });
        }

        return result;
    }
}
