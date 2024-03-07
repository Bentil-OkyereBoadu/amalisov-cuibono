export interface TargetAmount {
  ID: string;
  name: string;
  weight: number;
  achievement: number;
  description: string;
  bonusTranche?: amalisov.cuibono.bonusTranche.BonusTranche;
  bonusTranche_ID?: string;
}

export enum Entity {
  TargetAmount = "TargetAmount.TargetAmount",
}

export enum SanitizedEntity {
  TargetAmount = "TargetAmount",
}
