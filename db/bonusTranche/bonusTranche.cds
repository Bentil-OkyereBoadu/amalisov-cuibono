namespace amalisov.cuibono.bonusTranche;

using {cuid,managed} from '@sap/cds/common';
using amalisov.cuibono.targetAmount as target from '../targetAmount/targetAmount';
using amalisov.cuibono.trancheParticipation as trancheParticipation from '../tranchPatricipation/tracheParticipation';


entity BonusTranche : cuid,managed {
    name                  : String;
    startDate             : String;
    endDate               : String;
    Status                : bonusStatus;
    location              : String;
    targets               : Association to many target.Target
                                on targets.bonusTranche = $self;
    trancheParticipations : Association to many trancheParticipation.TrancheParticipation
                                on trancheParticipations.bonusTranche = $self;
}

type bonusStatus : String enum {
    Running;
    Locked;
}
