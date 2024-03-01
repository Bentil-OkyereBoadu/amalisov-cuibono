import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import Control from "sap/ui/core/Control";

/**
 * @namespace amalisov.cuibono.controller
 */
export default class Main extends BaseController {

	private oModel: JSONModel;
	public oFilterBar: Control;
	private oGoButton: Control;
	
	public onInit(): void {
	  this.oModel = new JSONModel();
	  this.getView().setModel(this.oModel);
	  this.oFilterBar = this.getView().byId("filterbar") as Control;
	  this.oGoButton = this.getView().byId("filterbar") as Control; 
	  this.oGoButton.addStyleClass("myCustomFilterBar");
	}

	
	public onCreateNewTranche(): void {
		this.getRouter().navTo("EditBonusTranche");
	}
}
