import BaseController from "./BaseController";

/**
 * @namespace amalisov.cuibono.controller
 */
export default class Main extends BaseController {
	public onCreateNewTranche(): void {
		this.getRouter().navTo("EditBonusTranche");
	}
}
