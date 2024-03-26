// This is an automatically generated file. Please do not change its contents manually!
import * as _amalisov_cuibono_bonusTranche from './../amalisov/cuibono/bonusTranche';
import * as __ from './../_';
import * as _ from './..';
export default { name: 'TargetAmount' }
export function _Aspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class  extends Base {
        ID?: string;
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
export class  extends _._cuidAspect(_Aspect(__.Entity)) {}
Object.defineProperty(, 'name', { value: 'TargetAmount.TargetAmount' })
export class TargetAmount extends Array<> {}
Object.defineProperty(TargetAmount, 'name', { value: 'TargetAmount.TargetAmount' })
