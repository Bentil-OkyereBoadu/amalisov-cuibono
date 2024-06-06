import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import Table from "sap/m/Table";
import Button from "sap/m/Button";
import FilterBar from "sap/ui/comp/filterbar/FilterBar";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ListBinding from "sap/ui/model/ListBinding";
import MultiInput from "sap/m/MultiInput";
import Token from "sap/m/Token";


/**
 * @namespace amalisov.cuibono.controller
 */
export default class Participants extends BaseController {
	private oModel: JSONModel;
	private oFilterBar: FilterBar;
	private oGoButton: Button;
	private oTable: Table;

	public onInit(): void {
		this.oModel = new JSONModel();
		this.getView().setModel(this.oModel);

		this.oFilterBar = this.getView().byId("filterbar") as FilterBar;
		this.oGoButton = this.getView().byId("filterbar") as Button;
		this.oGoButton.addStyleClass("GoFilterBar") as Button;
		this.oTable = this.getView().byId("Table") as Table;

		const oRouter = this.getRouter();
		oRouter
			.getRoute("trancheParticipants")
			.attachPatternMatched(this.onRouteMatched, this);

		oRouter
			.getRoute("participants")
			.attachPatternMatched(this.onNoFilter, this);
	}

	private onRouteMatched(): void {
		const oUpdateModel = this.getModel("updateModel");
		const sTrancheID = oUpdateModel.getProperty("/ID");
		const sTrancheName = oUpdateModel.getProperty("/name");
		this.applyFilter(sTrancheID, sTrancheName);
	}
	public applyFilter(sTrancheID: string, sTrancheName: string): void {
		const oTable = this.getView().byId("Table");
		const oBinding = oTable.getBinding("items") as ListBinding;
		const oInputField = this.getView().byId("tranche") as MultiInput
		const aTokens =  new Token({
				key: sTrancheName,
				text: sTrancheName
			});

		if (sTrancheID) {
			// Apply filter for SupplierID
			const oFilter = new Filter("bonusTranche_ID", FilterOperator.EQ, sTrancheID);
			oBinding.filter([oFilter]);
			oInputField.setTokens([aTokens]);
		} else {
			// No SupplierID specified, show all products
			oBinding.filter([]);
		}
	}
	private onNoFilter(): void {
		const oTable = this.getView().byId("Table") as Table;
		const oBinding = oTable.getBinding("items") as ListBinding;
		oBinding.filter([]);
	}

	public onExit(): void {
		this.oFilterBar = null;
		this.oTable = null;
	}
}
