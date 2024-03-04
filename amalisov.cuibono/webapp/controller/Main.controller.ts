import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import Control from "sap/ui/core/Control";
import MessageBox from "sap/m/MessageBox";
import ResourceBundle from 'sap/base/i18n/ResourceBundle';
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import Input from "sap/m/Input";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";


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

	public onSearch():void {

		let sQuery = (this.getView().byId("search") as Input).getValue();

		const oBinding = this.getView()
			.byId("productTable")
			.getBinding("items") as ODataListBinding; 

		if (sQuery) {
			const oFilter = new Filter({
				path: "TrancheName", 
				operator: FilterOperator.Contains,
				value1: sQuery.toLowerCase(),
				caseSensitive: false
			  });
			oBinding.filter([oFilter]);
		} else {
			oBinding.filter([]);
		}
	}

	public onEditPress(oEvent: any): void {

		const oItem = oEvent.getSource();
		const oRouter = this.getOwnerComponent().getRouter();
		oRouter.navTo("EditBonusTranche", {
			ID: window.encodeURIComponent(
				oItem.getBindingContext("tranches").getPath().substr(1)
			),
		});

	}

	public onDuplicate(oEvent: any): void {
		const oItem = oEvent.getSource();
		const oRouter = this.getOwnerComponent().getRouter();
		oRouter.navTo("EditBonusTranche", {
			ID: window.encodeURIComponent(
				oItem.getBindingContext("tranches").getPath().substr(1)
			),
		});

		// const oSource = oEvent.getSource();
		// const oContext = oSource.getBindingContext("tranches");
		// const sContent = oContext.getProperty("Content");
		// const oModel = new JSONModel({ Content: sContent });

		// this.setModel(oModel, "updateModel");

		// const oDialog = this.getView().byId("editDialog") as Dialog;
		// oDialog.open();

		// this._sSelectedAnswerID = oContext.getProperty("ID");
	}

	public async onDeleteTranche(oEvent: any): Promise<void>{
		const oView = this.getView();
        const oModel = oView.getModel("tranches") as ODataModel;
        const oSource = oEvent.getSource().getBindingContext("tranches");
		const resourceBundle: ResourceBundle = await this.getResourceBundle();
        const oObjectContext: any = oSource.getObject();
        const thread_ID: string = oObjectContext.ID;
		const sPath =("/Tranches("+ thread_ID +")")
        try {
            await oModel.delete(sPath);
            oModel.refresh();
            MessageBox.success(resourceBundle.getText("deleteTranche"));
        } catch (error) {
            MessageBox.error(resourceBundle.getText("errorDeleteTranche"));
        }
	}
}
