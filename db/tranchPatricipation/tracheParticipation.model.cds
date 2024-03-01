namespace amalisov.cuibono.trancheParticipation;

using amalisov.cuibono.employee as employee from '../employee/employees.model';
using amalisov.cuibono.bonusTranche as bonusTranche from '../bonusTranche/bonusTranche.model';
using {
    managed,
    cuid
} from '@sap/cds/common';

entity TrancheParticipation : cuid, managed {
    localId          : Integer;
    name             : String;
    department       : String;
    Tranche          : String;
    Status           : participationStatus;
    Location         : String;
    startDate        : String;
    endDate          : String;
    weight           : Integer;
    calculatedAmount : String;
    finalAmount      : String;
    excluded         : Boolean default false;
    justtification   : String;
    employee         : Association to employee.Employees;
    bonusTranche     : Association to bonusTranche.BonusTranche;
}

type participationStatus : String enum {
    Running;
    Locked;
    Completed;
}
