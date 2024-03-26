// This is an automatically generated file. Please do not change its contents manually!
import * as _amalisov_cuibono_attendance from './../attendance';
import * as __ from './../../../_';
import * as _amalisov_cuibono_department from './../department';
import * as _ from './../../..';
export function _EmployeeAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Employee extends Base {
        firstName?: string | null;
        lastName?: string | null;
        email?: string | null;
        bonusPercentage?: string | null;
        attendance?: __.Association.to<_amalisov_cuibono_attendance.Attendance> | null;
        attendance_ID?: string | null;
        department?: __.Association.to<_amalisov_cuibono_department.Department> | null;
        department_ID?: string | null;
      static actions: {
      }
  };
}
export class Employee extends _._cuidAspect(_EmployeeAspect(__.Entity)) {}
Object.defineProperty(Employee, 'name', { value: 'amalisov.cuibono.employee.Employees' })
export class Employees extends Array<Employee> {}
Object.defineProperty(Employees, 'name', { value: 'amalisov.cuibono.employee.Employees' })
