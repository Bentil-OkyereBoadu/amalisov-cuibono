namespace amalisov.cuibono.bonusTranche;

using {cuid,managed} from '@sap/cds/common';
using amalisov.cuibono.targetAmount as target from '../targetAmount/targetAmount';
using amalisov.cuibono.trancheParticipation as trancheParticipation from '../tranchPatricipation/tracheParticipation';


entity BonusTranche : cuid,managed {
    name                  : String;
    description           : String;
    startDate             : String;
    endDate               : String;
    orignDate             : String;
    weight                : Double default 0.0;
    Status                : bonusStatus;
    location              : String;
    targets               : Association to many target.Target
                                on targets.bonusTranche = $self;
    trancheParticipations : Association to many trancheParticipation.TrancheParticipation
                                on trancheParticipations.bonusTranche = $self;
}

type bonusStatus : String enum {
    Open;
    Locked;
    Completed;
}
