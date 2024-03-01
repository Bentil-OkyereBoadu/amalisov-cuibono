namespace amalisov.cuibono.employee;

using {
    managed,
    cuid
} from '@sap/cds/common';

using amalisov.cuibono.trancheParticipation as trancheParticipation from '../tranchPatricipation/tracheParticipation';
using amalisov.cuibono.department as department from '../department/department';
using amalisov.cuibono.attendance as attendance from '../attendance/attendace';

// Person entity
entity Employees : cuid, managed {
    firstName             : String;
    lastName              : String;
    email                 : String;
    bonusPercentage       : String;
    trancheParticipations : Association to many trancheParticipation.TrancheParticipation
                                on trancheParticipations.employee = $self;
    attendance           : Association to attendance.Attendance;
    department            : Association to department.Department;
}
