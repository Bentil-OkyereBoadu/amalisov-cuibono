import Dialog from "sap/m/Dialog";
import BaseController from "./BaseController";
import Input from "sap/m/Input";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace amalisov.cuibono.controller
 */
export default class EditBonusTranche extends BaseController {
	public onInit(): void {
		const oRouter = this.getOwnerComponent().getRouter();
		oRouter
			.getRoute("CreateTranche")
			.attachPatternMatched(this.onCreateRoute, this);
		this.getView().setModel(this.getOwnerComponent().getModel("tranches"));

		const oGlobalModel = this.getOwnerComponent().getModel("appModel");
		const sTrancheID = oGlobalModel.getProperty("/trancheID");
		console.log("the id sets", sTrancheID);
	}

	public onCreateRoute(oEvent: any): void {
		const oView = this.getView();
		const oUpdateModel = this.getOwnerComponent().getModel(
			"updateModel"
		) as JSONModel;

		(oView.byId("nameInput") as Input).setValue("");
		(oView.byId("locationSelect") as Input).setValue("");
		(oView.byId("startDateInput") as Input).setValue("");
		(oView.byId("endDateInput") as Input).setValue("");
		(oView.byId("weightInput") as Input).setValue("");
		(oView.byId("descriptionInput") as Input).setValue("");
		(oView.byId("originDateInput") as Input).setValue("");
		oUpdateModel.setProperty("/Targets", []);
	}

	public onAddTarget(): void {
		const oDialog = this.byId("editDialog") as Dialog;
		oDialog.open();
	}

	public closeAddTarget(): void {
		const oDialog = this.byId("editDialog") as Dialog;
		oDialog.close();
	}

	public onSaveTarget(): void {}

	public onSaveTranche(): void {}

	public onCancel(): void {}
}
