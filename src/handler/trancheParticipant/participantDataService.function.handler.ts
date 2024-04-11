import { Handler, Next, Req, Srv, Func } from "cds-routing-handlers";
import { Department } from "#cds-models/amalisov/cuibono/department";
import { TrancheParticipation } from '../../../@cds-models/amalisov/cuibono/trancheParticipation';
import { calculateFiscalYear } from "../../../src/utils/fiscalYear";
import { Service } from "typedi";
import cds, { Request } from "@sap/cds";

@Service()
@Handler()
export class ParticipantDataHandler {
    @Func('participantData')
    public async createBonusTranche(@Srv() srv: any, @Req() req: Request, @Next() next: any): Promise<any> {
        const participants = await SELECT.from(TrancheParticipation.name);
        const dataMap = new Map()
        const data: any[] = [];

        
        await Promise.all(participants.map(async (participant: TrancheParticipation) => {
         const localId = participant.localId;
         const calculatedAmount = participant.calculatedAmount;
         if(dataMap.has(localId)){
            dataMap.get(localId).push(participant.calculatedAmount);
         }else{
            dataMap.set(localId,[calculatedAmount])
         }
        })
    );
      
        await Promise.all(participants.map(async (participant: TrancheParticipation) => {
         const name = participant.name;
         const department = await SELECT.one.from(Department).where({ ID: participant.department_ID})
         const departmentName = department.name;
         const {localId,startDate} = participant;
         const fiscalYear = calculateFiscalYear(startDate)
         const amounts = dataMap.get(localId)
         const netAmount = amounts.reduce((acc: number, curr: number | null | string) => {
                if (typeof curr === 'number') {
                    return acc + curr;
                } else if (typeof curr === 'string' && !isNaN(Number(curr))) {
                    return acc + Number(curr);
                }
                return acc;
            }, 0);
           data.push({name,localId,departmentName,fiscalYear,netAmount})
           }));
        return {
            code:200,
            message:"participants retrieved successfully",
            data
        }
    
    }
}

