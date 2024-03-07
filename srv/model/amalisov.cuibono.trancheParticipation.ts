export enum ParticipationStatus {
  Running,
  Locked,
  Completed,
}

export interface TrancheParticipation {
  ID: string;
  localId: number;
  name: string;
  Status: ParticipationStatus;
  startDate: string;
  endDate: string;
  weight: number;
  calculatedAmount: number;
  finalAmount: number;
  excluded?: boolean;
  justtification: string;
  location: string;
  department?: amalisov.cuibono.department.Department;
  department_ID?: string;
  bonusTranche?: amalisov.cuibono.bonusTranche.BonusTranche;
  bonusTranche_ID?: string;
  CreatedAt: Date;
  UpdatedAt: Date;
}

export enum Entity {
  TrancheParticipation = "amalisov.cuibono.trancheParticipation.TrancheParticipation",
}

export enum SanitizedEntity {
  TrancheParticipation = "TrancheParticipation",
}
