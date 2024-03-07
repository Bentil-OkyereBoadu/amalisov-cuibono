namespace amalisov.cuibono.department;

using {
    cuid
} from '@sap/cds/common';

using amalisov.cuibono.employee as employee from '../employee/employees';
using amalisov.cuibono.trancheParticipation as trancheParticipation from '../tranchPatricipation/tracheParticipation';

entity Department : cuid {
    name                  : String;
    bonus                 : Integer;
    employees             : Association to many employee.Employees
                                on employees.department = $self;
    trancheParticipations : Association to many trancheParticipation.TrancheParticipation
                                on trancheParticipations.department = $self;
}
