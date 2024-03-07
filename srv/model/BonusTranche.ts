import { BonusStatus } from "./amalisov.cuibono.bonusTranche";
import {
  ParticipationStatus,
  TrancheParticipation,
} from "./amalisov.cuibono.trancheParticipation";
import { Target } from "./amalisov.cuibono.targetAmount";

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
  targets?: Target[];
  trancheParticipations?: TrancheParticipation[];
}

export interface Target {
  ID: string;
  name: string;
  weight: number;
  achievement: number;
  description: string;
  bonusTranche?: BonusTranche;
  bonusTranche_ID?: string;
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
  bonusTranche?: BonusTranche;
  bonusTranche_ID?: string;
  CreatedAt: Date;
  UpdatedAt: Date;
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
  Target = "BonusTranche.Target",
  TrancheParticipation = "BonusTranche.trancheParticipation",
}

export enum SanitizedEntity {
  BonusTranche = "BonusTranche",
  Target = "Target",
  TrancheParticipation = "TrancheParticipation",
}
