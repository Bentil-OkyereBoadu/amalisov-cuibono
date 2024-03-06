export enum BonusStatus {
  Running,
  Locked,
}

export interface BonusTranche {
  ID: string;
  createdAt?: Date;
  createdBy?: string;
  modifiedAt?: Date;
  modifiedBy?: string;
  name: string;
  startDate: string;
  endDate: string;
  Status: BonusStatus;
  location: string;
  targets?: amalisov.cuibono.targetAmount.Target[];
  trancheParticipations?: amalisov.cuibono.trancheParticipation.TrancheParticipation[];
}

export enum Entity {
  BonusTranche = "amalisov.cuibono.bonusTranche.BonusTranche",
}

export enum SanitizedEntity {
  BonusTranche = "BonusTranche",
}
