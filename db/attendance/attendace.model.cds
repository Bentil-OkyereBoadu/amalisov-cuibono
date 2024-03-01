namespace amalisov.cuibono.attendance;

using amalisov.cuibono.employee as employee from '../employee/employees.model';

using {
    managed,
    cuid
} from '@sap/cds/common';


entity Attendance : cuid, managed {
    startDate : String;
    endDate   : String;
    employee  : Association to employee.Employees;
}
