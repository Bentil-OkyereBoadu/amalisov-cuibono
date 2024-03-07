export interface Target {
  ID: string;
  name: string;
  weight: number;
  achievement: number;
  description: string;
  bonusTranche?: amalisov.cuibono.bonusTranche.BonusTranche;
  bonusTranche_ID?: string;
}

export enum Entity {
  Target = "amalisov.cuibono.targetAmount.Target",
}

export enum SanitizedEntity {
  Target = "Target",
}