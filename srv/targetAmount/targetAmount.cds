using amalisov.cuibono.targetAmount as TargetAmt from '../../db/targetAmount/targetAmount';

@path: 'targetAmount'
service TargetAmount {
    entity TargetAmount as projection on TargetAmt.Target;
}
