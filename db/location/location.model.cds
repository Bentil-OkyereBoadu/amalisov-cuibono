namespace amalisov.cuibono.location;

using amalisov.cuibono.bonusTranche as bonusTranche from '../bonusTranche/bonusTranche.model';
using {
    managed,
    cuid
} from '@sap/cds/common';

entity Location : cuid, managed {
    name               : String;
    localBonusWageType : String;
    payoutWageType     : String;
    bonusTranches      : Association to many bonusTranche.BonusTranche
                             on bonusTranches.location = $self;
}
