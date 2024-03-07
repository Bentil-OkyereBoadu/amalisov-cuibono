import { Func, Handler } from 'cds-routing-handlers';

@Handler()
export class ReturnSomethingFunctionHandler {
  @Func('returnSomething')
  public returnSomething() {
    console.log('returnSomething function was called');
    return 'Success';
  }
}