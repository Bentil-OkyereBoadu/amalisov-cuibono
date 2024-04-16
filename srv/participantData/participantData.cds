using amalisov.cuibono.participantData as participant from '../../db/participantData/participantData';

@path:'participantData'
service ParticipantData {
 entity ParticipantData as projection on participant.ParticipantData;
}