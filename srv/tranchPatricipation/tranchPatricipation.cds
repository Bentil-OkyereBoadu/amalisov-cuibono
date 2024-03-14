using amalisov.cuibono.trancheParticipation as Tranch from '../../db/tranchPatricipation/tracheParticipation';
using amalisov.cuibono.employee as employ from '../../db/employee/employees';


@path: 'tranchParticipation'
service TracheParticipation {
    entity TracheParticipation as projection on Tranch.TrancheParticipation;
    entity Employee as projection on employ.Employees;
}
