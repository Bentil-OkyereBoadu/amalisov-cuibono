namespace amalisov.cuibono.bonusTranche;

using amalisov.cuibono.targetAmount as target from '../targetAmount/targetAmount.model';
using amalisov.cuibono.location as location from '../location/location.model';
using amalisov.cuibono.trancheParticipation as trancheParticipation from '../tranchPatricipation/tracheParticipation.model';

using {
    managed,
    cuid
} from '@sap/cds/common';

entity BonusTranche : cuid, managed {
    name                  : String;
    startDate             : String;
    endDate               : String;
    Status                : bonusStatus;
    location              : Association to location.Location;
    targets               : Association to many target.Target
                                on targets.bonusTranche = $self;
    trancheParticipations : Association to many trancheParticipation.TrancheParticipation
                                on trancheParticipations.bonusTranche = $self;
}

type bonusStatus : String enum {
    Running;
    Locked;
}
