// This is an automatically generated file. Please do not change its contents manually!
import * as _amalisov_cuibono_bonusTranche from './../bonusTranche';
import * as _amalisov_cuibono_department from './../department';
import * as __ from './../../../_';
import * as _ from './../../..';
export function _TrancheParticipationAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class TrancheParticipation extends Base {
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
export class TrancheParticipation extends _._cuidAspect(_TrancheParticipationAspect(__.Entity)) {}
Object.defineProperty(TrancheParticipation, 'name', { value: 'amalisov.cuibono.trancheParticipation.TrancheParticipation' })
export class TrancheParticipation_ extends Array<TrancheParticipation> {}
Object.defineProperty(TrancheParticipation_, 'name', { value: 'amalisov.cuibono.trancheParticipation.TrancheParticipation' })
