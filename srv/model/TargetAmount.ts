export interface TargetAmount {
  ID: string;
  createdAt?: Date;
  createdBy?: string;
  modifiedAt?: Date;
  modifiedBy?: string;
  name: string;
  type: string;
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
