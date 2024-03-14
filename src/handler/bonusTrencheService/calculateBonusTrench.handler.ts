import {Handler, Next, Req, Srv,Action } from "cds-routing-handlers";
import { Department }  from '../../../@cds-models/amalisov/cuibono/department';
import { Employee }  from '../../../@cds-models/amalisov/cuibono/employee';
import { Service } from "typedi";
import cds, { Request } from "@sap/cds";

@Service()
@Handler()
export class CalculateBonusTrancheHandler {
  @Action('calculateBonusTranche')
  public async calculateBonusTranche(@Srv() srv: any, @Req() req: Request, @Next() next: any): Promise<any> {

    const { employeeId } = req.data;

    const employee = await SELECT.from(Employee.name).where({ ID:employeeId });

    if (!employee || employee.length === 0) return req.reject(404, "Tranche not found");

    const departmentId = employee[0].department_ID;

    const department = await SELECT.from(Department.name).where({ ID:departmentId });

    const departmentBonus = department[0]['bonus']
    
    console.log(departmentBonus)
}
}