// This is an automatically generated file. Please do not change its contents manually!
import * as _amalisov_cuibono_targetAmount from './../targetAmount';
import * as __ from './../../../_';
import * as _amalisov_cuibono_trancheParticipation from './../trancheParticipation';
import * as _ from './../../..';
// enum
export const bonusStatus = {
  Running: "Running",
  Locked: "Locked",
  Completed: "Completed",
} as const;
export type bonusStatus = "Running" | "Locked" | "Completed"

export function _BonusTrancheAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class BonusTranche extends Base {
        name?: string | null;
        startDate?: string | null;
        endDate?: string | null;
        weight?: number | null;
        Status?: bonusStatus | null;
        location?: string | null;
        targets?: __.Association.to.many<_amalisov_cuibono_targetAmount.Target_>;
        trancheParticipations?: __.Association.to.many<_amalisov_cuibono_trancheParticipation.TrancheParticipation_>;
      static actions: {
      }
  };
}
export class BonusTranche extends _._cuidAspect(_._managedAspect(_BonusTrancheAspect(__.Entity))) {}
Object.defineProperty(BonusTranche, 'name', { value: 'amalisov.cuibono.bonusTranche.BonusTranche' })
export class BonusTranche_ extends Array<BonusTranche> {}
Object.defineProperty(BonusTranche_, 'name', { value: 'amalisov.cuibono.bonusTranche.BonusTranche' })
