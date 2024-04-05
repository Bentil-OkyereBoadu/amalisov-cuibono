import { Handler, Next, Req, Srv, Action, Func } from "cds-routing-handlers";
import { BonusTranche } from "../../../@cds-models/amalisov/cuibono/bonusTranche";
import { Service } from "typedi";
import cds, { Request } from "@sap/cds";
import { Target} from "#cds-models/amalisov/cuibono/targetAmount";
import { TrancheParticipation } from "#cds-models/amalisov/cuibono/trancheParticipation";
import { Department } from "#cds-models/amalisov/cuibono/department";
import { Attendance } from "#cds-models/amalisov/cuibono/attendance";
import { calculateDays } from "../../../src/utils/calculateDays";

const logger = cds.log("Bonus Tranch handler logger ");
@Service()
@Handler()
export class UpdateBonusTrancheHandler {
  @Action("updateBonusTranche")
  public async updateBonusTranche( @Srv() srv: any, @Req() req: Request, @Next() next: any
  ): Promise<any> {
    logger.info("Read Handler of BonusTrench");
    const { ID, name, weight, startDate, endDate, location,targets,Status } = req.data;
    const bonusTranche = await SELECT.one.from(BonusTranche.name).where({ ID });
    if (!bonusTranche) return req.reject(404, "Tranche not found");
    if (Status === "Locked") {
    if (targets.length === 0) {
            return req.reject(403, "You cannot lock a bonus without a target");
        }
        const targetSum = targets.reduce((acc:number, target:Target) => acc + target.weight, 0);
        if (targetSum !== 100) {
            return req.reject(400, "You cannot lock a Tranche whose sum is not equal to 100");
        }
        const participants = await SELECT.from(TrancheParticipation.name).where({bonusTranche_ID: ID});
        // Tranch duration 
        const tranchDuration = calculateDays(bonusTranche.startDate,bonusTranche.endDate) 
        participants.map(async(participant: TrancheParticipation) => {
          const employeeId  = participant.localId;
          const departementID = participant.department_ID;
          const department = await SELECT.one.from(Department).where({ ID: departementID });
          // Department bonus 
          const departmentBonus = department.bonus;
          // participant attendance 
          const attendance =  await SELECT.one.from(Attendance).where({ ID: employeeId });
          const participantAttendance = calculateDays(attendance.startDate,attendance.endDate); // small issue to be fixed
          // trenach bonus payout  
          const trenchPayoutBonus = departmentBonus * (weight / 100);
          // Period Ratio
          const periondRatio =  participantAttendance/tranchDuration
          //  targetPayout for each targets 
          const targetsAmount = targets.map((target:Target) => {
            const targetPayout = trenchPayoutBonus * periondRatio * target.achievement * target.weight;
            return targetPayout;
        });
        // Calculated Amount 
          const calculatedAmount = targetsAmount.reduce((curr:number,acc:number)=>curr + acc);
          console.log(calculatedAmount)
          await UPDATE(TrancheParticipation.name)
              .where({ ID: participant.ID })
              .set({
                calculatedAmount
              });
        });
    }  


    if (Status === "Completed"){
      const participants = await SELECT.from(TrancheParticipation.name).where({bonusTranche_ID: ID});
      participants.map(async(participant: TrancheParticipation) => {
        // check if participant is excluded 
        if(participant.excluded){
          await UPDATE(TrancheParticipation.name)
          .where({ID:participant.ID})
          .set({finalAmount:0})
        }else{
          const {calculatedAmount} = participant;
          await UPDATE(TrancheParticipation.name)
          .where({ID:participant.ID})
          .set({finalAmount:calculatedAmount})
        }
      });
    }

    if (Status === "Open") {
        const data = {
            name: name ? name : bonusTranche.name,
            weight: weight ? weight : bonusTranche.weight,
            startDate: startDate ? startDate : bonusTranche.startDate,
            endDate: endDate ? endDate : bonusTranche.endDate,
            location: location ? location : bonusTranche.location
        };
        await DELETE.from(Target.name).where({ bonusTranche_ID: ID });
        await Promise.all(targets.map(async (target: any) => {
            const { name, weight, achievement, description } = target;
            await INSERT.into(Target.name).entries({
                name,
                weight,
                achievement,
                description,
                bonusTranche_ID: ID
            });
        }));
    
        await UPDATE(BonusTranche, ID).with({ ...data });
    } 
     await UPDATE(BonusTranche.name).where({ ID }).set({ Status });
      const participants = await SELECT.from(TrancheParticipation.name).where({bonusTranche_ID: ID});
      await Promise.all(
        participants.map(async (particapant: TrancheParticipation) => {
          await UPDATE(TrancheParticipation.name).where({ ID: particapant.ID }).set({Status});
        })
      );

      return {
        code: 200,
        message: "Tranche updated successfully",
        status: "SUCCESS",
    };

  }
}



