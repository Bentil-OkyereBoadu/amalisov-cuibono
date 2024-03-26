// This is an automatically generated file. Please do not change its contents manually!
import * as __ from './../_';
export default { name: 'Dummy' }
export function _Aspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class  extends Base {
        id?: string;
        name?: string | null;
      static actions: {
      }
  };
}
export class  extends _Aspect(__.Entity) {}
Object.defineProperty(, 'name', { value: 'Dummy.Dummy' })
export class Dummy extends Array<> {}
Object.defineProperty(Dummy, 'name', { value: 'Dummy.Dummy' })

// function
export declare const dosomething: { (): string | null, __parameters: {}, __returns: string | null };