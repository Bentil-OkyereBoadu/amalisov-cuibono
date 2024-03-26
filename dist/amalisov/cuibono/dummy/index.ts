// This is an automatically generated file. Please do not change its contents manually!
import * as __ from './../../../_';
export function _DummyAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Dummy extends Base {
        id?: string;
        name?: string | null;
      static actions: {
      }
  };
}
export class Dummy extends _DummyAspect(__.Entity) {}
Object.defineProperty(Dummy, 'name', { value: 'amalisov.cuibono.dummy.Dummy' })
export class Dummy_ extends Array<Dummy> {}
Object.defineProperty(Dummy_, 'name', { value: 'amalisov.cuibono.dummy.Dummy' })
