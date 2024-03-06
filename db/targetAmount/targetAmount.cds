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
    CreatedAt: Timestamp @cds.on.insert : $now;
    UpdatedAt : Timestamp @cds.on.insert : $now ;
    bonusTranche : Association to bonusTranche.BonusTranche;
}
