namespace amalisov.cuibono.targetAmount;

using amalisov.cuibono.bonusTranche as bonusTranche from '../bonusTranche/bonusTranche';

using {
    cuid
} from '@sap/cds/common';

entity Target : cuid {
    name         : String;
    weight       : Integer;
    achievement  : Integer;
    description  : String;
    isDelete     : Boolean default false;
    bonusTranche : Association to bonusTranche.BonusTranche;
}
