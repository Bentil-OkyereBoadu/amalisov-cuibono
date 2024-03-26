// This is an automatically generated file. Please do not change its contents manually!
import * as _amalisov_cuibono_employee from './../employee';
import * as __ from './../../../_';
import * as _amalisov_cuibono_trancheParticipation from './../trancheParticipation';
import * as _ from './../../..';
export function _DepartmentAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Department extends Base {
        name?: string | null;
        bonus?: number | null;
        employees?: __.Association.to.many<_amalisov_cuibono_employee.Employees>;
        trancheParticipations?: __.Association.to.many<_amalisov_cuibono_trancheParticipation.TrancheParticipation_>;
      static actions: {
      }
  };
}
export class Department extends _._cuidAspect(_DepartmentAspect(__.Entity)) {}
Object.defineProperty(Department, 'name', { value: 'amalisov.cuibono.department.Department' })
export class Department_ extends Array<Department> {}
Object.defineProperty(Department_, 'name', { value: 'amalisov.cuibono.department.Department' })
