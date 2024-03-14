namespace amalisov.cuibono.trancheParticipation;

using {cuid} from '@sap/cds/common';
using amalisov.cuibono.employee as employee from '../employee/employees';
using amalisov.cuibono.bonusTranche as bonusTranche from '../bonusTranche/bonusTranche';
using amalisov.cuibono.department as department from '../department/department';


entity TrancheParticipation : cuid {
    localId          : Integer;
    employee : Association to employee.Employees;
    calculatedAmount : Decimal;
    finalAmount      : Decimal;
    excluded         : Boolean default false;
    justtification   : String;
    department       : Association to department.Department;
    bonusTranche     : Association to bonusTranche.BonusTranche;
}
