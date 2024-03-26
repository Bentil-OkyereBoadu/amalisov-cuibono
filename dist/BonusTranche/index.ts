// This is an automatically generated file. Please do not change its contents manually!
import * as _ from './..';
import * as _amalisov_cuibono_bonusTranche from './../amalisov/cuibono/bonusTranche';
import * as __ from './../_';
import * as _amalisov_cuibono_department from './../amalisov/cuibono/department';
export default { name: 'BonusTranche' }
export function _Aspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class  extends Base {
        ID?: string;
        createdAt?: string | null;
    /**
    * Canonical user ID
    */
        createdBy?: _.User | null;
        modifiedAt?: string | null;
    /**
    * Canonical user ID
    */
        modifiedBy?: _.User | null;
        name?: string | null;
        startDate?: string | null;
        endDate?: string | null;
        weight?: number | null;
        Status?: _amalisov_cuibono_bonusTranche.bonusStatus | null;
        location?: string | null;
        targets?: __.Association.to.many<Target_>;
        trancheParticipations?: __.Association.to.many<trancheParticipation_>;
      static actions: {
      }
  };
}
export class  extends _._cuidAspect(_._managedAspect(_Aspect(__.Entity))) {}
Object.defineProperty(, 'name', { value: 'BonusTranche.BonusTranche' })
export class BonusTranche extends Array<> {}
Object.defineProperty(BonusTranche, 'name', { value: 'BonusTranche.BonusTranche' })

export function _TargetAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Target extends Base {
        ID?: string;
        name?: string | null;
        weight?: number | null;
        achievement?: number | null;
        description?: string | null;
        bonusTranche?: __.Association.to<> | null;
        bonusTranche_ID?: string | null;
      static actions: {
      }
  };
}
export class Target extends _._cuidAspect(_TargetAspect(__.Entity)) {}
Object.defineProperty(Target, 'name', { value: 'BonusTranche.Target' })
export class Target_ extends Array<Target> {}
Object.defineProperty(Target_, 'name', { value: 'BonusTranche.Target' })

export function _trancheParticipationAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class trancheParticipation extends Base {
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
        bonusTranche?: __.Association.to<> | null;
        bonusTranche_ID?: string | null;
      static actions: {
      }
  };
}
export class trancheParticipation extends _._cuidAspect(_trancheParticipationAspect(__.Entity)) {}
Object.defineProperty(trancheParticipation, 'name', { value: 'BonusTranche.trancheParticipation' })
export class trancheParticipation_ extends Array<trancheParticipation> {}
Object.defineProperty(trancheParticipation_, 'name', { value: 'BonusTranche.trancheParticipation' })

// function
export declare const deleteBonusTranche: { (ID: string | null): string | null, __parameters: {ID: string | null}, __returns: string | null };
// action
export declare const calculateBonusTranche: { (): string | null, __parameters: {}, __returns: string | null };
// function
export declare const createTranche: { (name: string | null, startDate: string | null, endDate: string | null, Status: string | null, location: string | null, targets: Array<Target>): string | null, __parameters: {name: string | null, startDate: string | null, endDate: string | null, Status: string | null, location: string | null, targets: Array<Target>}, __returns: string | null };