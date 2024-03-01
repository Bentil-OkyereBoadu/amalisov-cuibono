using amalisov.cuibono.bonusTranche as BonusTranc from '../../db/bonusTranche/bonusTranche';

@path: 'bonusTranche'
service BonusTranche {
    entity BonusTranche as projection on BonusTranc.BonusTranche;
}
