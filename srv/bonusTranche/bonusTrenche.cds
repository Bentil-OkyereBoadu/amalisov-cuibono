using amalisov.cuibono.bonusTranche as BonusTranc from '../../db/bonusTranche/bonusTranche';
using amalisov.cuibono.targetAmount as targt from '../../db/targetAmount/targetAmount';
using amalisov.cuibono.trancheParticipation as trancheParti from '../../db/tranchPatricipation/tracheParticipation';


@path: 'bonusTranche'
service BonusTranche {
    entity BonusTranche as projection on BonusTranc.BonusTranche;

    entity Target  as projection on targt.Target;

    entity trancheParticipation  as projection on trancheParti.TrancheParticipation;

    action deleteBonusTranche(ID:String) returns String;

    function calculateBonusTranche() returns String;
    action createTranche(name: String, startDate: String, endDate: String, Status: String, location: String, description:String, orignDate:String, weight:Integer, targets:many Target) returns String;
    action updateBonusTranche(ID:String,name:String,weight:Integer,startDate:String,endDate:String,location:String, targets:many Target) returns String;
}
