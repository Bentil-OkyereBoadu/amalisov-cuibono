// This is an automatically generated file. Please do not change its contents manually!
import * as _amalisov_cuibono_employee from './../employee';
import * as __ from './../../../_';
import * as _ from './../../..';
export function _AttendanceAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Attendance extends Base {
        startDate?: string | null;
        endDate?: string | null;
        employee?: __.Association.to<_amalisov_cuibono_employee.Employee> | null;
        employee_ID?: string | null;
      static actions: {
      }
  };
}
export class Attendance extends _._cuidAspect(_AttendanceAspect(__.Entity)) {}
Object.defineProperty(Attendance, 'name', { value: 'amalisov.cuibono.attendance.Attendance' })
export class Attendance_ extends Array<Attendance> {}
Object.defineProperty(Attendance_, 'name', { value: 'amalisov.cuibono.attendance.Attendance' })
