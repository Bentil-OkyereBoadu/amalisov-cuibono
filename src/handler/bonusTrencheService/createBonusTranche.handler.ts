import { Service } from "typedi";
import { Handler, Srv, Req, Action } from "cds-routing-handlers";
import { Request } from "@sap/cds";
// import {BonusTranche} from '../../../@cds-models/amalisov/cuibono/bonusTranche';
// import {Target} from '../../../@cds-models/amalisov/cuibono/targetAmount';
// import { Employees } from "../../../@cds-models/amalisov/cuibono/employee";
// import { TrancheParticipation } from "../../../@cds-models/amalisov/cuibono/trancheParticipation";

// const { createTranche } = require('#cds-models/BonusTranche')
const { BonusTranche } = require('#cds-models/amalisov/cuibono/bonusTranche')
const { Target } = require('#cds-models/amalisov/cuibono/targetAmount')
const { Employees } = require('#cds-models/amalisov/cuibono/employee')
const { TrancheParticipation } = require('#cds-models/amalisov/cuibono/trancheParticipation')

@Service()
@Handler()
export class CreateTrancheHandler{
    @Action('createTranche')
    public async newTranche(@Srv() srv:any,@Req() req:Request){
        const {name,startDate,endDate,weight, Status,location,targets} = req.data
        const result:any= INSERT.into(BonusTranche.name).entries({ name , startDate, endDate,Status, location});
        console.log('data',result)
        if(targets.length > 0){
          targets.forEach(async(d: { name: any; weight: any; achievement: any; description: any; }) => {
            const {name,weight,achievement,description} = d
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
        const data= await SELECT.from(Employees.name)

        data.forEach(async(d: { firstName: any; lastName: any; department_ID: any; }) => {
            const {firstName, lastName, department_ID} = d
            const [query] = await INSERT.into(TrancheParticipation.name).entries({
                name: `${firstName} ${lastName}`,
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
