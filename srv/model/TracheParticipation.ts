import { ParticipationStatus } from "./amalisov.cuibono.trancheParticipation";

export interface TracheParticipation {
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
}

export enum Entity {
  TracheParticipation = "TracheParticipation.TracheParticipation",
}

export enum SanitizedEntity {
  TracheParticipation = "TracheParticipation",
}
