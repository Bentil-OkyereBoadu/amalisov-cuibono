import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import Table from "sap/m/Table";
import Button from "sap/m/Button";
import FilterBar from "sap/ui/comp/filterbar/FilterBar";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ListBinding from "sap/ui/model/ListBinding";


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
		this.oTable = this.getView().byId("parameterTable") as Table;

		const oRouter = this.getOwnerComponent().getRouter();
		oRouter
			.getRoute("trancheParticipants")
			.attachPatternMatched(this.onRouteMatched, this);
	}

	private onRouteMatched(): void {
    const oGlobalModel = this.getOwnerComponent().getModel("appModel");
    const sTrancheID = oGlobalModel.getProperty("/trancheID");

    this.applyFilter(sTrancheID);
	}
  private applyFilter(sTrancheID: string): void {
    const oTable = this.getView().byId("Table");
    const oBinding = oTable.getBinding("items") as ListBinding;

    if (sTrancheID) {
        // Apply filter for SupplierID
        const oFilter = new Filter("trancheId", FilterOperator.EQ, sTrancheID);
        oBinding.filter([oFilter]);
    } else {
        // No SupplierID specified, show all products
        oBinding.filter([]);
    }
	}

	public onExit(): void {
		this.oFilterBar = null;
		this.oTable = null;
	}
}
