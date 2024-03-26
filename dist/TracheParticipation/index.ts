// This is an automatically generated file. Please do not change its contents manually!
import * as _amalisov_cuibono_bonusTranche from './../amalisov/cuibono/bonusTranche';
import * as _amalisov_cuibono_department from './../amalisov/cuibono/department';
import * as __ from './../_';
import * as _ from './..';
export default { name: 'TracheParticipation' }
export function _Aspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class  extends Base {
        ID?: string;
        localId?: number | null;
        name?: string | null;
        Status?: _amalisov_cuibono_bonusTranche.bonusStatus | null;
        startDate?: string | null;
        endDate?: string | null;
        weight?: number | null;
        calculatedAmount?: number | null;
        finalAmount?: number | null;
        excluded?: boolean | null;
        justification?: string | null;
        location?: string | null;
        department?: __.Association.to<_amalisov_cuibono_department.Department> | null;
        department_ID?: string | null;
        bonusTranche?: __.Association.to<_amalisov_cuibono_bonusTranche.BonusTranche> | null;
        bonusTranche_ID?: string | null;
      static actions: {
      }
  };
}
export class  extends _._cuidAspect(_Aspect(__.Entity)) {}
Object.defineProperty(, 'name', { value: 'TracheParticipation.TracheParticipation' })
export class TracheParticipation extends Array<> {}
Object.defineProperty(TracheParticipation, 'name', { value: 'TracheParticipation.TracheParticipation' })
