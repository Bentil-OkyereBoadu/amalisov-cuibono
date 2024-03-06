namespace amalisov.cuibono.trancheParticipation;

using {cuid} from '@sap/cds/common';
using amalisov.cuibono.bonusTranche as bonusTranche from '../bonusTranche/bonusTranche';
using amalisov.cuibono.department as department from '../department/department';


entity TrancheParticipation : cuid {
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
    bonusTranche     : Association to bonusTranche.BonusTranche;
    CreatedAt        : Timestamp @cds.on.insert: $now;
    UpdatedAt        : Timestamp @cds.on.insert: $now;
}

type participationStatus : String enum {
    Running;
    Locked;
    Completed;
}
