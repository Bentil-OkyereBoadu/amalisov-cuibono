namespace amalisov.cuibono.employee;

using amalisov.cuibono.trancheParticipation as trancheParticipation from '../tranchPatricipation/tracheParticipation.model';
using {
    managed,
    cuid
} from '@sap/cds/common';

using amalisov.cuibono.department as department from '../department/department.model';
using amalisov.cuibono.attendance as attendance from '../attendance/attendace.model';

// Person entity
entity Employees : cuid, managed {
    name                  : String;
    firstName             : String;
    lastName              : String;
    email                 : String;
    bonusPercentage       : String;
    trancheParticipations : Association to many trancheParticipation.TrancheParticipation
                                on trancheParticipations.employee = $self;
    attendances           : Association to many attendance.Attendance
                                on attendances.employee = $self;
    department            : Association to department.Department;
}
