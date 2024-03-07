import { Action, Handler, Req } from "cds-routing-handlers";

// built handler to do the functionality 
@Handler()
export class DoSomethingHandler {
    @Action('dosomething')
    public async dosomething() {
        console.log('doSomething action was called');
        return 'Success';
    }
}


// @Handler()
// export class ReturnSomethingFunctionHandler {
//   @Func('returnSomething')
//   public returnSomething() {
//     console.log('returnSomething function was called');
//     return 'Success';
//   }
// }

