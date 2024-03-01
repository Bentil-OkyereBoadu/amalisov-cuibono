import Dialog from "sap/m/Dialog";
import BaseController from "./BaseController";

/**
 * @namespace amalisov.cuibono.controller
 */
export default class EditBonusTranche extends BaseController {
	public onAddTarget(): void{
        const oDialog = this.byId("editDialog") as Dialog;
        oDialog.open();
    }
    public closeAddTarget(): void{
        const oDialog = this.byId("editDialog") as Dialog;
        oDialog.close();
    }
}
