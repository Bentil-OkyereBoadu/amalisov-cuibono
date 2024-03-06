export interface Employees {
  ID: string;
  createdAt?: Date;
  createdBy?: string;
  modifiedAt?: Date;
  modifiedBy?: string;
  firstName: string;
  lastName: string;
  email: string;
  bonusPercentage: string;
  trancheParticipations?: amalisov.cuibono.trancheParticipation.TrancheParticipation[];
  attendance?: amalisov.cuibono.attendance.Attendance;
  attendance_ID?: string;
  department?: amalisov.cuibono.department.Department;
  department_ID?: string;
}

export enum Entity {
  Employees = "amalisov.cuibono.employee.Employees",
}

export enum SanitizedEntity {
  Employees = "Employees",
}
