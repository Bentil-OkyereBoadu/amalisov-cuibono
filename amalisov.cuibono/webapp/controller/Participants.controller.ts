import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import Table from "sap/m/Table";
import Button from "sap/m/Button";
import FilterBar from "sap/ui/comp/filterbar/FilterBar";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ListBinding from "sap/ui/model/ListBinding";
import Dialog from "sap/m/Dialog";
import MessageBox from "sap/m/MessageBox";
import Sorter from "sap/ui/model/Sorter";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
import MessageToast from "sap/m/MessageToast";
import ResourceBundle from 'sap/base/i18n/ResourceBundle';
import CheckBox from "sap/m/CheckBox";

/**
 * @namespace amalisov.cuibono.controller
 */
export default class Participants extends BaseController {
	private oModel: JSONModel;
	private oFilterBar: FilterBar;
	private oGoButton: Button;
	private oTable: Table;
	public selectedItems: any = [];

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
		const oGlobalModel = this.getModel("updateModel");
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
	private onNoFilter(): void {
		const oTable = this.getView().byId("Table") as Table;
		const oBinding = oTable.getBinding("items") as ListBinding;
		oBinding.filter([]);
	}

	public onSelectChange(oEvent: any): void{
		const oCheckBox = oEvent.getSource();
			const oSource = oCheckBox.getBindingContext("participant");
		const oSelectedData = oSource.getObject();
	
		if(oCheckBox.getSelected()){
		  this.selectedItems.push(oSelectedData)
		} else{
		  this.selectedItems = this.selectedItems.filter(function(item:any){
			return item.localID !== oSelectedData.localID;
		  }) 
		}
		console.log(this.selectedItems);
	}

	public onSelectAll(oEvent: any):void{
		const oTable= this.getView().byId('Table') as Table;
		const bCheckboxState = oEvent.getParameter('selected')

		oTable.getItems().forEach(function(item: any) {
			const oCheckBoxCell= item.getCells()[0] as CheckBox;
			const sCellStatus= item.getCells()[5].getText();
			if(sCellStatus !== "Completed"){
				oCheckBoxCell.setSelected(bCheckboxState)
			}
		})
	}

	public async onSortChange(event: any): Promise<void> {
		const selectedKey: string = event.getSource().getSelectedSortItem();
		const resourceBundle: ResourceBundle = await this.getResourceBundle();
		const order: boolean=event.getSource().getSortDescending()
		if (!selectedKey) {
			MessageBox.information(resourceBundle.getText("selectOption"));
			return;
		}
		const selectedKeyNumber: number = parseInt(selectedKey.split('--').pop() || '');

		if (isNaN(selectedKeyNumber)) {
			MessageBox.error(resourceBundle.getText("noKeyAvailable"));
			return;
		}
		
		let sSortProperty: string;
		let sortToastKey: string;
	
		switch (selectedKeyNumber) {
			case 1:
				sSortProperty = resourceBundle.getText("Name"); 
				sortToastKey = "sortBynameToast";
				break;
			case 2:
				sSortProperty = resourceBundle.getText("Department"); 
				sortToastKey = "sortBydepartmentToast";
				break;
			case 3:
				sSortProperty = resourceBundle.getText("Status"); 
				sortToastKey = "sortBystatusToast";
				break;
			default:
				return;
		}

    const oList: Table = this.getView().byId("Table") as Table;
    const oSorted= oList.getBinding("items") as ODataListBinding;
		const oSorter = new Sorter(sSortProperty, order); 
		oSorted.sort(oSorter)

		MessageToast.show(resourceBundle.getText(sortToastKey));
	};

	public onOpenSortDialog(): void{
		const oDialog = this.byId("sortDialog") as Dialog;
		oDialog.open();
	}

	public onExit(): void {
		this.oFilterBar = null;
		this.oTable = null;
	}
}
