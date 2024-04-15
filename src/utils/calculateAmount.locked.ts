import { Handler, Next, Req, Srv, Action, Func } from "cds-routing-handlers";
import { BonusTranche } from "../../@cds-models/amalisov/cuibono/bonusTranche";
import { Target} from "#cds-models/amalisov/cuibono/targetAmount";
import { TrancheParticipation } from "#cds-models/amalisov/cuibono/trancheParticipation";
import { Department } from "#cds-models/amalisov/cuibono/department";
import { Attendance } from "#cds-models/amalisov/cuibono/attendance";
import { calculateAttendance, calculateDays } from "../../src/utils/calculateDays";
import { Employee } from "#cds-models/amalisov/cuibono/employee";



export async function calculateAmountOnLocked(targets: Target[],ID: string): Promise<void> {
    const bonusTranche = await SELECT.one.from(BonusTranche.name).where({ ID });
    if (targets.length === 0) {
        throw new Error("You cannot lock a bonus without a target");
    }

    const targetSum = targets.reduce((acc: number, target: Target) => acc + target.weight, 0);
    if (targetSum !== 100) {
        throw new Error("You cannot lock a Tranche whose sum is not equal to 100");
    }

    const participants = await SELECT.from(TrancheParticipation.name).where({ bonusTranche_ID: ID });
    const tranchDuration = calculateDays(bonusTranche.startDate, bonusTranche.endDate);

    await Promise.all(participants.map(async (participant: TrancheParticipation) => {
        const employeeId = participant.localId;
        const departmentID = participant.department_ID;
        const department = await SELECT.one.from(Department).where({ ID: departmentID });
        const departmentBonus = department.bonus;
        const employee = await SELECT.one.from(Employee.name).where({ID:employeeId});
        const bonusPercentage = employee.bonusPercentage

        const attendance = await SELECT.one.from(Attendance).where({ employee_ID: employeeId });
           // participant attendance 
        const participantAttendance = calculateAttendance(attendance.startDate,attendance.endDate,bonusTranche.startDate,bonusTranche.endDate);
        // trenach bonus payout  
        const trenchPayoutBonus = departmentBonus * (participant.weight / 100);
         // Period Ratio
        const periondRatio = participantAttendance / tranchDuration;
          //  targetPayout for each targets 
        const targetsAmount = targets.map((target: Target) => {
            const targetPayout = trenchPayoutBonus * periondRatio * (target.achievement / 100) * (target.weight / 100)*(bonusPercentage/100);
            return targetPayout;
        });

         // Calculated Amoun
        const calculatedAmount = targetsAmount.reduce((curr: number, acc: number) => curr + acc);
        await UPDATE(TrancheParticipation.name)
            .where({ ID: participant.ID })
            .set({
                calculatedAmount
            });
    }));
}
