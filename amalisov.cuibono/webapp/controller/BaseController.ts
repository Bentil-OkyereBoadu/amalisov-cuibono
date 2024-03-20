import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import AppComponent from "../Component";
import Model from "sap/ui/model/Model";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Router from "sap/ui/core/routing/Router";
import History from "sap/ui/core/routing/History";
import Dialog from "sap/m/Dialog";
import Event from "sap/ui/base/Event";
import Label from "sap/m/Label";
import TextArea from "sap/m/TextArea"
import FilterBar from "sap/ui/comp/filterbar/FilterBar";
import Table from "sap/m/Table";
import ListBinding from "sap/ui/model/ListBinding";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import Core from "sap/ui/core/Core";

/**
 * @namespace amalisov.cuibono.controller
 */
export default abstract class BaseController extends Controller {
	public oDialog: Dialog;
	public dialogContent: string = ""
	public inputFilter: any = [];
	public ColumnName: string = "";
	/**
	 * Convenience method for accessing the component of the controller's view.
	 * @returns The component of the controller's view
	 */
	public getOwnerComponent(): AppComponent {
		return super.getOwnerComponent() as AppComponent;
	}

	/**
	 * Convenience method to get the components' router instance.
	 * @returns The router instance
	 */
	public getRouter(): Router {
		return UIComponent.getRouterFor(this);
	}

	/**
	 * Convenience method for getting the i18n resource bundle of the component.
	 * @returns The i18n resource bundle of the component
	 */
	public getResourceBundle(): ResourceBundle | Promise<ResourceBundle> {
		const oModel = this.getOwnerComponent().getModel("i18n") as ResourceModel;
		return oModel.getResourceBundle();
	}

	/**
	 * Convenience method for getting the view model by name in every controller of the application.
	 * @param [sName] The model name
	 * @returns The model instance
	 */
	public getModel(sName?: string): Model {
		return this.getView().getModel(sName);
	}

	/**
	 * Convenience method for setting the view model in every controller of the application.
	 * @param oModel The model instance
	 * @param [sName] The model name
	 * @returns The current base controller instance
	 */
	public setModel(oModel: Model, sName?: string): BaseController {
		this.getView().setModel(oModel, sName);
		return this;
	}

	/**
	 * Convenience method for triggering the navigation to a specific target.
	 * @public
	 * @param sName Target name
	 * @param [oParameters] Navigation parameters
	 * @param [bReplace] Defines if the hash should be replaced (no browser history entry) or set (browser history entry)
	 */
	public navTo(sName: string, oParameters?: object, bReplace?: boolean): void {
		this.getRouter().navTo(sName, oParameters, undefined, bReplace);
	}

	/**
	 * Convenience event handler for navigating back.
	 * It there is a history entry we go one step back in the browser history
	 * If not, it will replace the current entry of the browser history with the main route.
	 */
	public onNavBack(): void {
		const sPreviousHash = History.getInstance().getPreviousHash();
		if (sPreviousHash !== undefined) {
			window.history.go(-1);
		} else {
			this.getRouter().navTo("main", {}, undefined, true);
		}
	}

	public onFilter(): void {
		const oView = this.getView()
		const oFilterBar = oView.byId("filterbar") as FilterBar;
		const oTable = oView.byId("Table") as Table;

		const aTableFilters = oFilterBar.getFilterGroupItems().reduce(function (aResult: any, oFilterGroupItem: any) {
				const oControl = oFilterGroupItem.getControl(),
				aSelectedKeys = oControl.getSelectedKeys ? oControl.getSelectedKeys() : [],
					aFilters = aSelectedKeys.map(function (sSelectedKey: number) {
						return new Filter({
							path: oFilterGroupItem.getName(),
							operator: FilterOperator.Contains,
							value1: sSelectedKey
						});
					});
				if (aSelectedKeys.length > 0) {
					aResult.push(new Filter({
						filters: aFilters,
						and: false
					}));
				}
				return aResult;
		}, []);
		if (this.inputFilter && this.inputFilter.length > 0) {
			const filterValues = this.inputFilter.split(','); 
			filterValues.forEach((filterValue: string) => {
				const trimmedValue = filterValue.trim();
				if (trimmedValue.length > 0) {
					const columnFilter = new Filter(this.ColumnName, FilterOperator.Contains, trimmedValue);
					aTableFilters.push(columnFilter);
				}
			});
		}
		(oTable.getBinding("items") as ListBinding).filter(aTableFilters);
	}

	public async onDialogOpen(oEvent: Event): Promise <void> {
		const oButton = oEvent.getSource();
		const oView = this.getView();
		const excludeTrancheBtn = oView.byId("excludeTrancheButton");
		const overRuleBtn = oView.byId("overRuleButton");
		const localId = oView.byId("localId");
		const nameId = oView.byId("name");
		const departmentId = oView.byId("department");
		const trancheId = oView.byId("tranche");
		let dialogTitle = "";
		const resourceBundle: ResourceBundle = await this.getResourceBundle();

		if (!this.oDialog) {
			this.oDialog = sap.ui.xmlfragment("amalisov.cuibono.view.fragments.Dialog", this) as Dialog;
			this.getView().addDependent(this.oDialog);
		}
		// Clear the previous content
		this.oDialog.removeAllContent();

		switch (oButton) {
			case excludeTrancheBtn:
				dialogTitle = resourceBundle.getText("excludeTranche")
				this.oDialog.addContent(new Label({ text: resourceBundle.getText("justification")}));
				this.oDialog.addContent(new TextArea({ width: "100%"}));
				break;

			case overRuleBtn:
				dialogTitle = resourceBundle.getText("overRule")
				this.oDialog.addContent(new Label({ text:resourceBundle.getText("overRule") }));
				this.oDialog.addContent(new TextArea({ width: "100%" }));
				break;
				
            case localId:
				dialogTitle = resourceBundle.getText("FilterByLocalId")
				this.oDialog.addContent(new Label({ text: resourceBundle.getText("localId") }));
				const textArea1 = new TextArea({ id: "localIdDialog", width: "100%" });
				this.oDialog.addContent(textArea1);
			    this.dialogContent = textArea1.getId();
				this.ColumnName = resourceBundle.getText("LocalID")
				break;

			case nameId:
				dialogTitle = resourceBundle.getText("FilterByName")
				this.oDialog.addContent(new Label({ text:resourceBundle.getText("name") }));
				const textArea2 = new TextArea({ id: "nameDialog", width: "100%" });
				this.oDialog.addContent(textArea2);
			    this.dialogContent = textArea2.getId();
				this.ColumnName = resourceBundle.getText("Name")
				break;

			case departmentId:
				dialogTitle = resourceBundle.getText("FilterByDepartment")
				this.oDialog.addContent(new Label({ text: resourceBundle.getText("department")}));
				const textArea3 = new TextArea({ id: "departmentDialog", width: "100%" });
				this.oDialog.addContent(textArea3);
			    this.dialogContent = textArea3.getId();
				this.ColumnName= resourceBundle.getText("Department")
				break;

			case trancheId:
				dialogTitle = resourceBundle.getText("FilterByTranche")
				this.oDialog.addContent(new Label({ text: resourceBundle.getText("tranche") }));
				const textArea4 = new TextArea({ id: "trancheDialog", width: "100%" });
				this.oDialog.addContent(textArea4);
			    this.dialogContent = textArea4.getId();
				this.ColumnName = resourceBundle.getText("Tranche")
				break;
		}

		this.oDialog.setTitle(dialogTitle);
		this.oDialog.setContentWidth("300px");
		this.oDialog.addStyleClass("myCustomDialog")
		this.oDialog.open();	  
	}

	public onSave(): void {
		if (this.oDialog && this.dialogContent) {
			const textArea = Core.byId(this.dialogContent) as TextArea;
	        this.inputFilter = textArea.getValue();
			this.onFilter();
			this.oDialog.close();
			this.oDialog.destroyContent(); 
		}
	}

	public closingDialog(): void {
		if (this.oDialog) {
			this.oDialog.close();
			this.oDialog.destroyContent(); 
		}
	}
}

