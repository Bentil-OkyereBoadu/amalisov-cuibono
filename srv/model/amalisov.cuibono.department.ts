export interface Department {
  ID: string;
  name: string;
  bonus: number;
  employees?: amalisov.cuibono.employee.Employees[];
  trancheParticipations?: amalisov.cuibono.trancheParticipation.TrancheParticipation[];
}

export enum Entity {
  Department = "amalisov.cuibono.department.Department",
}

export enum SanitizedEntity {
  Department = "Department",
}
