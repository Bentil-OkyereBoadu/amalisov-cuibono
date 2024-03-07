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
import FilterBar from "sap/ui/comp/filterbar/FilterBar";


/**
 * @namespace amalisov.cuibono.controller
 */
export default class Main extends BaseController {
	private oModel: JSONModel;
	public oFilterBar: FilterBar;
	private oGoButton: FilterBar;

	public onInit(): void {
		this.oModel = new JSONModel();
		this.getView().setModel(this.oModel);
		this.oFilterBar = this.getView().byId("filterbar") as FilterBar;
		this.oGoButton = this.getView().byId("filterbar") as FilterBar;
		this.oGoButton.addStyleClass("myCustomFilterBar");
	}

	public onCreateNewTranche(): void {
		this.getRouter().navTo("CreateTranche");
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
		const oUpdateModel= this.getOwnerComponent().getModel("updateModel") as JSONModel;
		const oRouter = this.getOwnerComponent().getRouter();
		oRouter.navTo("EditBonusTranche", {
			ID: window.encodeURIComponent(
				oItem.getBindingContext("tranches").getPath().substr(1)
			),
		});

		const oContext = oItem.getBindingContext("tranches");
		const sTrancheName = oContext.getProperty("TrancheName");
		const sLocation = oContext.getProperty("Location");
		const sStartDate = oContext.getProperty("StartDate");
		const sEndDate = oContext.getProperty("EndDate");
		const nTrancheWeight = oContext.getProperty("TrancheWeight");
		const sDescription = oContext.getProperty("Description");
		const sOriginDate = oContext.getProperty("OriginDate");

		// const oModel = new JSONModel({ 
		// 	TrancheName: sTrancheName, 
		// 	Location: sLocation,  
		// 	TrancheWeight: nTrancheWeight,  
		// 	Description: sDescription,
		// 	EndDate: sEndDate,
		// 	StartDate: sStartDate
		// });

		// this.setModel(oModel, "updateModel");
		
		
		oUpdateModel.setProperty("/TrancheName", sTrancheName);
		oUpdateModel.setProperty("/Location", sLocation);
		oUpdateModel.setProperty("/StartDate", sStartDate);
		oUpdateModel.setProperty("/EndDate", sEndDate);
		oUpdateModel.setProperty("/TrancheWeight", nTrancheWeight);
		oUpdateModel.setProperty("/Description", sDescription);
		oUpdateModel.setProperty("/OriginDate", sOriginDate);

		
		oUpdateModel.setProperty("/Description", sDescription);
		oUpdateModel.setProperty("/Description", sDescription);
		oUpdateModel.setProperty("/Description", sDescription);
		oUpdateModel.setProperty("/Description", sDescription);
		oUpdateModel.setProperty("/Description", sDescription);



		console.log("sdfghjkl", oUpdateModel)

	}

	public onDuplicate(oEvent: any): void {
		const oItem = oEvent.getSource();
		const oRouter = this.getOwnerComponent().getRouter();
		oRouter.navTo("EditBonusTranche", {
			ID: window.encodeURIComponent(
				oItem.getBindingContext("tranches").getPath().substr(1)
			),
		});
		
		const oContext = oItem.getBindingContext("tranches");
		const sTrancheName = oContext.getProperty("TrancheName");
		const sLocation = oContext.getProperty("Location");
		const nTrancheWeight = oContext.getProperty("TrancheWeight");
		const sDescription = oContext.getProperty("Description");

		const oModel = new JSONModel({ 
			TrancheName: sTrancheName, 
			Location: sLocation,  
			TrancheWeight: nTrancheWeight,  
			Description: sDescription,
		
		});

		this.setModel(oModel, "updateModel");

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
