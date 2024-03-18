import { Service } from "typedi";
import { Handler, Srv, Req, Action } from "cds-routing-handlers";
import { Request } from "@sap/cds";
import {BonusTranche} from '../../../@cds-models/amalisov/cuibono/bonusTranche';
import {Target} from '../../../@cds-models/amalisov/cuibono/targetAmount';
import { Employees } from "../../../@cds-models/amalisov/cuibono/employee";
import { TrancheParticipation } from "../../../@cds-models/amalisov/cuibono/trancheParticipation";


@Service()
@Handler()
export class CreateTranche{
    @Action('CreateTranche')
    public async createTranche(@Srv() srv:any,@Req() req:Request){
        const {name,startDate,endDate,weight, Status,location,targets}:BonusTranche = req.data as BonusTranche
        const [result] = await INSERT.into(BonusTranche.name).entries({ name , startDate, endDate,Status, location});
        if(targets.length > 0){
          targets.forEach(async(d) => {
            const {name,weight,achievement,description}:Target = d as Target
            const [query] = await INSERT.into(Target.name).entries({
                name,
                weight,
                achievement,
                description,
                bonusTranche_ID: result.ID
            })
             return query
            })
        }
        const data:Employees= await SELECT.from(Employees.name) as unknown as Employees

        data.forEach(async(d) => {
            const {firstName, lastName, department_ID} = d
            const [query] = await INSERT.into(TrancheParticipation.name).entries({
                name: {firstName,lastName},
                Status,
                startDate,
                endDate,
                weight,
                location,
                department_ID,
                bonusTranche_ID: result.ID
            })
            return query
        })
        return result
    }
}
