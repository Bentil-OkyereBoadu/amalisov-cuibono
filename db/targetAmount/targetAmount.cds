namespace amalisov.cuibono.targetAmount;

using amalisov.cuibono.bonusTranche as bonusTranche from '../bonusTranche/bonusTranche';

using {
    managed,
    cuid
} from '@sap/cds/common';

entity Target : cuid, managed {
    name         : String;
    type         : String;
    weight       : Integer;
    achievement  : Integer;
    description  : String;
    bonusTranche : Association to bonusTranche.BonusTranche;
}
