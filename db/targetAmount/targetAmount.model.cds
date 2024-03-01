namespace amalisov.cuibono.targetAmount;

using amalisov.cuibono.bonusTranche as bonusTranche from '../bonusTranche/bonusTranche.model';

using {
    managed,
    cuid
} from '@sap/cds/common';

entity Target : cuid, managed {
    name         : String;
    type         : String;
    weight       : Integer;
    achievement  : Integer;
    bonusTranche : Association to bonusTranche.BonusTranche;
}
