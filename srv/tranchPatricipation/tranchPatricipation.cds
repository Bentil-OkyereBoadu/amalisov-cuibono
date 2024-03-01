using amalisov.cuibono.trancheParticipation as Tranch from '../../db/tranchPatricipation/tracheParticipation';

@path: 'tranchParticipation'
service TracheParticipation {
    entity TracheParticipation as projection on Tranch.TrancheParticipation;
}
