namespace amalisov.cuibono.trancheParticipation;

using {cuid} from '@sap/cds/common';
using amalisov.cuibono.bonusTranche as bonusTranche from '../bonusTranche/bonusTranche';
using amalisov.cuibono.department as department from '../department/department';
using amalisov.cuibono.employee as employee from '../employee/employees';

    
entity TrancheParticipation : cuid {
    localId          : String;
    name             : String;
    Status           : bonusTranche.bonusStatus;
    startDate        : String;
    endDate          : String;
    weight           : Integer;
    calculatedAmount : Double;
    finalAmount      : Double;
    excluded         : Boolean default false;
    overRuled        : Boolean default false;
    justification   : String;
    location         : String;
    department       : Association to department.Department;
    bonusTranche     : Association to bonusTranche.BonusTranche;
}
