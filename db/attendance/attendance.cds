namespace amalisov.cuibono.attendance;

using amalisov.cuibono.employee as employee from '../employee/employees';
// using {cuid} from '@sap/cds/common';

entity Attendance {
    startDate : String;
    endDate   : String;
    employee  : Association to employee.Employees;
}
