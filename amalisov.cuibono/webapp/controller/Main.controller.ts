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

interface Target {
    TargetName: string;
    TargetWeight: number;
    Achieved: string;
}

interface Tranche {
    ID?: string;
    TrancheName: string;
    Location: string;
    StartDate: string;
    EndDate: string;
	OriginDate: string;
    TrancheWeight: number;
    Description: string;
    Status?: string;
    Targets: Target[];
}


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
		this.oGoButton.addStyleClass("GoFilterBar");
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
		const sStatus = oContext.getProperty("Status");
		const sLocation = oContext.getProperty("Location");
		const sStartDate = oContext.getProperty("StartDate");
		const sEndDate = oContext.getProperty("EndDate");
		const nTrancheWeight = oContext.getProperty("TrancheWeight");
		const sDescription = oContext.getProperty("Description");
		const sOriginDate = oContext.getProperty("OriginDate");
		const aTargets =  oContext.getProperty("Targets");

		const oData: Tranche = {
			TrancheName: sTrancheName,
            Location: sLocation,
            StartDate: sStartDate,
            EndDate: sEndDate,
			OriginDate: sOriginDate,
            TrancheWeight: nTrancheWeight,
            Description: sDescription,
            Status: sStatus,
            Targets: aTargets
		}

		oUpdateModel.setData(oData);
	}

	public onDuplicate(oEvent: any): void {
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
		const nTrancheWeight = oContext.getProperty("TrancheWeight");
		const sDescription = oContext.getProperty("Description");
		const sOriginDate = oContext.getProperty("OriginDate");
		const aTargets =  oContext.getProperty("Targets");

		const oData: Tranche = {
			TrancheName: sTrancheName,
            Location: sLocation,
            StartDate: '',
            EndDate: '',
			OriginDate: sOriginDate,
            TrancheWeight: nTrancheWeight,
            Description: sDescription,
            Status: "",
            Targets: aTargets
		}

		oUpdateModel.setData(oData);
	}

	public async onDeleteTranche(oEvent: any): Promise<void>{
		const oView = this.getView();
        const oModel = oView.getModel("tranches") as ODataModel;
        const oSource = oEvent.getSource().getBindingContext("tranches");
		const resourceBundle: ResourceBundle = await this.getResourceBundle();
        const oObjectContext: any = oSource.getObject();
        const ID: string = oObjectContext.ID;
		const sPath =("/Tranches("+ ID +")")
        try {
            await oModel.delete(sPath);
            oModel.refresh();
            MessageBox.success(resourceBundle.getText("deleteTranche"));
        } catch (error) {
            MessageBox.error(resourceBundle.getText("errorDeleteTranche"));
        }
	}
}
