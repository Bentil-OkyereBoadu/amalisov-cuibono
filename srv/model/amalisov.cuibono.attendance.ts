export interface Attendance {
  ID: string;
  createdAt?: Date;
  createdBy?: string;
  modifiedAt?: Date;
  modifiedBy?: string;
  startDate: string;
  endDate: string;
  employee?: amalisov.cuibono.employee.Employees;
  employee_ID?: string;
}

export enum Entity {
  Attendance = "amalisov.cuibono.attendance.Attendance",
}

export enum SanitizedEntity {
  Attendance = "Attendance",
}
