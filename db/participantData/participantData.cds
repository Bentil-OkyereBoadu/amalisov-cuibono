namespace amalisov.cuibono.participantData;

using{
    cuid
} from '@sap/cds/common';

entity ParticipantData:cuid {
    localId: String;
    name:String;
    departmentName: String;
    netAmount : Double;
    fiscalYear: String;
}