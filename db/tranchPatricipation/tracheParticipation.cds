namespace amalisov.cuibono.trancheParticipation;

using {
    managed,
    cuid
} from '@sap/cds/common';

using amalisov.cuibono.employee as employee from '../employee/employees';
using amalisov.cuibono.bonusTranche as bonusTranche from '../bonusTranche/bonusTranche';
using amalisov.cuibono.department as department from '../department/department';


entity TrancheParticipation : cuid, managed {
    localId          : Integer;
    name             : String;
    Status           : participationStatus;
    startDate        : String;
    endDate          : String;
    weight           : Integer;
    calculatedAmount : Decimal;
    finalAmount      : Decimal;
    excluded         : Boolean default false;
    justtification   : String;
    location         : String;
    department       : Association to department.Department;
    employee         : Association to employee.Employees;
    bonusTranche     : Association to bonusTranche.BonusTranche;
}

type participationStatus : String enum {
    Running;
    Locked;
    Completed;
}
