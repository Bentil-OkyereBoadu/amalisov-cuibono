// This is an automatically generated file. Please do not change its contents manually!
import * as _amalisov_cuibono_bonusTranche from './../bonusTranche';
import * as __ from './../../../_';
import * as _ from './../../..';
export function _TargetAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Target extends Base {
        name?: string | null;
        weight?: number | null;
        achievement?: number | null;
        description?: string | null;
        bonusTranche?: __.Association.to<_amalisov_cuibono_bonusTranche.BonusTranche> | null;
        bonusTranche_ID?: string | null;
      static actions: {
      }
  };
}
export class Target extends _._cuidAspect(_TargetAspect(__.Entity)) {}
Object.defineProperty(Target, 'name', { value: 'amalisov.cuibono.targetAmount.Target' })
export class Target_ extends Array<Target> {}
Object.defineProperty(Target_, 'name', { value: 'amalisov.cuibono.targetAmount.Target' })
