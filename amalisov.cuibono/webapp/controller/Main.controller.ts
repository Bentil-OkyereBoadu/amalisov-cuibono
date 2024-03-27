import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import Button from "sap/m/Button";
import MessageBox from "sap/m/MessageBox";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import Input from "sap/m/Input";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
interface Target {
	TargetName: string;
	TargetWeight: number;
	Achieved: string;
}

interface Tranche {
	ID: string;
    name: string;
    location: string;
    startDate: string;
    endDate: string;
	originDate: string;
    weight: number;
    description: string;
    Status: string;
    targets: Target[];
}

/**
 * @namespace amalisov.cuibono.controller
 */
export default class Main extends BaseController {
	private oGoButton: Button;

	public onInit(): void {
		this.oGoButton = this.getView().byId("filterbar") as Button;
		this.oGoButton.addStyleClass("GoFilterBar");
	}

	public onCreateNewTranche(): void {
		this.getRouter().navTo("CreateTranche");
	}

	public onSearch(): void {
		let sQuery = (this.getView().byId("search") as Input).getValue();

		const oBinding = this.getView()
			.byId("Table")
			.getBinding("items") as ODataListBinding;

		if (sQuery) {
			const oFilter = new Filter({
				path: "name",
				operator: FilterOperator.Contains,
				value1: sQuery.toLowerCase(),
				caseSensitive: false,
			});
			oBinding.filter([oFilter]);
		} else {
			oBinding.filter([]);
		}
	}

	public onEditPress(oEvent: any): void {
		const oItem = oEvent.getSource();
		const oUpdateModel = this.getModel(
			"updateModel"
		) as JSONModel;	
		const oRouter = this.getRouter();
		oRouter.navTo("EditBonusTranche", {
			ID: window.encodeURIComponent(
				oItem.getBindingContext("tranches").getPath().substr(1)
			),
		});

		const oContext = oItem.getBindingContext("tranches");
		const oData = this.constructTrancheData(oContext, true);
		oUpdateModel.setData(oData);
	}

	public onDuplicate(oEvent: any): void {
		const oItem = oEvent.getSource();
		const oUpdateModel = this.getModel(
			"updateModel"
		) as JSONModel;
		const oRouter = this.getRouter();
		oRouter.navTo("EditBonusTranche", {
			ID: window.encodeURIComponent(
				oItem.getBindingContext("tranches").getPath().substr(1)
			),
		});

		const oContext = oItem.getBindingContext("tranches");
		const oData = this.constructTrancheData(oContext, false);
		oUpdateModel.setData(oData);
	}

	//use boolean to control when dates are added
	private constructTrancheData(oContext: any, includeDates: boolean): Tranche {
		const sTrancheName = oContext.getProperty("name");
		const sLocation = oContext.getProperty("location");
		const nTrancheWeight = oContext.getProperty("weight");
		const sDescription = oContext.getProperty("createdBy");
		const sOriginDate = oContext.getProperty("createdAt");
		const aTargets = oContext.getProperty("targets");
		const sTrancheId = oContext.getProperty("ID");
		const sStatus = oContext.getProperty("Status");

		const oData: Tranche = {
			ID: sTrancheId,
			name: sTrancheName,
			location: sLocation,
			startDate: includeDates ? oContext.getProperty("startDate") : "",
			endDate: includeDates ? oContext.getProperty("endDate") : "",
			originDate: sOriginDate,
			weight: nTrancheWeight,
			description: sDescription,
			Status: sStatus,
			targets: aTargets,
		};

		return oData;
	}

	public async onDeleteTranche(oEvent: any): Promise<void> {
		const oView = this.getView();
		const oModel = oView.getModel("tranches") as ODataModel;
		const oSource = oEvent.getSource().getBindingContext("tranches");
		const resourceBundle: ResourceBundle = await this.getResourceBundle();

		const oObjectContext = oSource.getObject();
		const bonusID: string = oObjectContext.ID;

		if (bonusID) {
			try {
				await oModel.bindContext('/deleteBonusTranche(...)') 
				    .setParameter('ID', bonusID)
					.execute();
				MessageBox.success(resourceBundle.getText("deleteTranche"));
				oModel.refresh();
			} catch (error) {
				MessageBox.error(resourceBundle.getText("errorDeleteTranche"));
			}
		}

	}
}
