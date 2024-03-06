namespace amalisov.cuibono.attendance;

using amalisov.cuibono.employee as employee from '../employee/employees';
using {cuid} from '@sap/cds/common';

entity Attendance : cuid {
    startDate : String;
    endDate   : String;
    employee  : Association to employee.Employees;
    CreatedAt : Timestamp @cds.on.insert: $now;
    UpdatedAt : Timestamp @cds.on.insert: $now;
}
