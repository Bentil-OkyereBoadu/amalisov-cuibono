namespace amalisov.cuibono.employee;

using {
    cuid
} from '@sap/cds/common';

using amalisov.cuibono.department as department from '../department/department';
using amalisov.cuibono.attendance as attendance from '../attendance/attendance';

// Person entity
entity Employees : cuid {
    firstName       : String;
    lastName        : String;
    email           : String;
    bonusPercentage : String;
    attendance      : Association to attendance.Attendance;
    department      : Association to department.Department;
}
