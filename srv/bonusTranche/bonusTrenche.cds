using amalisov.cuibono.bonusTranche as BonusTranc from '../../db/bonusTranche/bonusTranche';
using amalisov.cuibono.targetAmount as targt from '../../db/targetAmount/targetAmount';
using amalisov.cuibono.trancheParticipation as trancheParti from '../../db/tranchPatricipation/tracheParticipation';


@path: 'bonusTranche'
service BonusTranche {
    entity BonusTranche as projection on BonusTranc.BonusTranche;
    entity Target  as projection on targt.Target;
    entity trancheParticipation  as projection on trancheParti.TrancheParticipation;
    action deleteBonusTranche(ID:String) returns String;
    action calculateBonusTranche(employeeId:String) returns String;
}
