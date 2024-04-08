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
import MultiInput from "sap/m/MultiInput";
import Token from "sap/m/Token";
import MessageBox from "sap/m/MessageBox";
import Sorter from "sap/ui/model/Sorter";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
import MessageToast from "sap/m/MessageToast";
import CheckBox from "sap/m/CheckBox";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";


/**
 * @namespace amalisov.cuibono.controller
 */
export default abstract class BaseController extends Controller {
	public oDialog: Dialog;
	public dialogContent: string = ""
	public dialogContent2: string = ""
	public inputFilter: any = [];
	public ColumnName: string = "";
	public MultiInputId: string = "";
	public currentAction : string = ""
	public selectedItems: any = [];
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
		const oView = this.getView();
		const oFilterBar = oView.byId("filterbar") as FilterBar;
		const oTable = oView.byId("Table") as Table;
	
		const aTableFilters = oFilterBar.getFilterGroupItems().reduce(function (aResult: any, oFilterGroupItem: any) {
			const oControl = oFilterGroupItem.getControl(),
			aSelectedKeys = oControl.getSelectedKeys ? oControl.getSelectedKeys() : [],
			aFilters = aSelectedKeys.map(function (sSelectedKey: string) {
	
				const year = parseInt(sSelectedKey, 10);  // selected year to filter
				if (year) { 
					const startDate = new Date(`${year - 1}-10-01`); //fiscal start at 1st October of the previous year
					const endDate = new Date(`${year}-09-30`); // fiscal year end at 30th September of the selected year
	
					return new Filter({
						path: "startDate",
						operator: FilterOperator.BT,
						value1: startDate.toISOString(),
						value2: endDate.toISOString(),
					});
				} else {
					let value1 
					let operator
					if (sSelectedKey === "true" || sSelectedKey === "false") {
						value1 = sSelectedKey === "true";
						operator = FilterOperator.EQ; 
					} else {
						value1 = sSelectedKey;
						operator = FilterOperator.Contains;
					}
		
					return new Filter({
						path: oFilterGroupItem.getName(),
						operator: operator,
						value1: value1
					});
				}
			});
	
			if (aFilters.length > 0) {
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
					const columnFilter = new Filter({
						path: this.ColumnName,
						operator: FilterOperator.Contains,
						value1: trimmedValue,
						caseSensitive: false
					});
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

		if (oButton === excludeTrancheBtn) {
			this.currentAction = 'exclude';
		} else if (oButton === overRuleBtn) {
			this.currentAction = 'overrule';
		} else {
			this.currentAction = 'save';
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
				const textAreaAmount = new TextArea({ id: "overRuleAmoundId", width: "100%" });
				this.oDialog.addContent(textAreaAmount);
				this.dialogContent = textAreaAmount.getId();

				this.oDialog.addContent(new Label({ text: resourceBundle.getText("justification")}));
				const textAreaJustification = new TextArea({ id: "overRuleJustificationId", width: "100%" });
				this.oDialog.addContent(textAreaJustification);
				this.dialogContent2 = textAreaJustification.getId();
				break;
				
            case localId:
				dialogTitle = resourceBundle.getText("FilterByLocalId")
				this.oDialog.addContent(new Label({ text: resourceBundle.getText("localId") }));
				const textArea1 = new TextArea({ id: "localIdDialog", width: "100%" });
				this.oDialog.addContent(textArea1);
			    this.dialogContent = textArea1.getId();
				this.ColumnName = resourceBundle.getText("LocalID")
				this.MultiInputId = localId.getId();
				break;

			case nameId:
				dialogTitle = resourceBundle.getText("FilterByName")
				this.oDialog.addContent(new Label({ text:resourceBundle.getText("name") }));
				const textArea2 = new TextArea({ id: "nameDialog", width: "100%" });
				this.oDialog.addContent(textArea2);
			    this.dialogContent = textArea2.getId();
				this.ColumnName = resourceBundle.getText("Name")
				this.MultiInputId = nameId.getId();
				break;

			case departmentId:
				dialogTitle = resourceBundle.getText("FilterByDepartment")
				this.oDialog.addContent(new Label({ text: resourceBundle.getText("department")}));
				const textArea3 = new TextArea({ id: "departmentDialog", width: "100%" });
				this.oDialog.addContent(textArea3);
			    this.dialogContent = textArea3.getId();
				this.ColumnName= resourceBundle.getText("Department")
				this.MultiInputId = departmentId.getId();
				break;

			case trancheId:
				dialogTitle = resourceBundle.getText("FilterByTranche")
				this.oDialog.addContent(new Label({ text: resourceBundle.getText("tranche") }));
				const textArea4 = new TextArea({ id: "trancheDialog", width: "100%" });
				this.oDialog.addContent(textArea4);
			    this.dialogContent = textArea4.getId();
				this.ColumnName = resourceBundle.getText("tranche2")
				this.MultiInputId = trancheId.getId();
				break;
		}

		this.oDialog.setTitle(dialogTitle);
		this.oDialog.setContentWidth("300px");
		this.oDialog.addStyleClass("myCustomDialog")
		this.oDialog.open();	  
	}

	public onSaveAction(): void {
		if (this.oDialog && this.dialogContent) {
			const textArea = Core.byId(this.dialogContent) as TextArea;
	        this.inputFilter = textArea.getValue();
			const holderMultiInput = this.getView().byId(this.MultiInputId) as MultiInput;
			const aTokens = this.inputFilter.split(',').map(function (sValue:any) {
				return new Token({
					key: sValue,
					text: sValue
				});
			});
	
			holderMultiInput.setTokens(aTokens);
			this.onFilter();
			this.oDialog.close();
			this.oDialog.destroyContent(); 
		}
	}
	
	public onExclude(): void {
		
		this.oDialog.close();
		this.oDialog.destroyContent(); 
	}
	
	public async onOverrule(): Promise <void> {
		const oView = this.getView();
		const oModel = oView.getModel("participant") as ODataModel; 
		const resourceBundle: ResourceBundle = await this.getResourceBundle();

		const textArea = Core.byId(this.dialogContent) as TextArea;
		const textArea2 = Core.byId(this.dialogContent2) as TextArea
        
		try {
            await oModel.bindContext("/overRuleAmount(...)")
                .setParameter("ID", this.selectedItems)
                .setParameter("finalAmount", textArea.getValue())
				.setParameter("justification", textArea2.getValue())
                .execute();
            MessageBox.success(resourceBundle.getText("successOverRule"), {
                onClose: () => {
                    oModel.refresh();
                }
            });
        } catch (error) {
            MessageBox.error(resourceBundle.getText("failedOverRule"),);
        }

		this.oDialog.close();
		this.oDialog.destroyContent(); 
	}

	public onSave(): void {
		switch (this.currentAction) {
			case 'exclude':
				this.onExclude();
				break;
			case 'overrule':
				this.onOverrule();
				break;
			default:
				this.onSaveAction(); 
				break;
		}
	}

	public onSelectChange(oEvent: any): void {
		const oCheckBox = oEvent.getSource();
		const oSource = oCheckBox.getBindingContext("participant");
		const oSelectedData = oSource.getObject();
	
		if (oCheckBox.getSelected()) {
			this.selectedItems.push(oSelectedData.ID);
		} else {
			this.selectedItems = this.selectedItems.filter(function(item: any) {
				return item !== oSelectedData.ID;
			});
		}
	}
	
	public onSelectAll(oEvent: any): void {
		const oTable = this.getView().byId('Table') as Table;
		const bCheckboxState = oEvent.getParameter('selected');
	
		oTable.getItems().forEach((item: any) => {
			const oCheckBoxCell = item.getCells()[0] as CheckBox;
			const sCellStatus = item.getCells()[5].getText();
			const oSelectedData = item.getBindingContext("participant").getObject();
	
			if (sCellStatus !== "Completed") {
				oCheckBoxCell.setSelected(bCheckboxState);
	
				if (bCheckboxState) {
					this.selectedItems.push(oSelectedData.ID);
				} else {
					this.selectedItems = this.selectedItems.filter(function(item: any) {
						return item !== oSelectedData.ID;
					});
				}
			}
		});
	}
	
	public onClearFilter(): void {
		const oView = this.getView();
		const oFilterBar = oView.byId("filterbar") as FilterBar;
		const oTable = oView.byId("Table") as Table;
	
		// Clear the filter inputs in the filter bar
		oFilterBar.getFilterGroupItems().forEach(oFilterGroupItem => {
			const oControl = oFilterGroupItem.getControl() as any;
			if (oControl.setSelectedKeys) {
				oControl.setSelectedKeys([]);
			} else if (oControl.setValue) {
				oControl.setValue("");
			}
		});
	     
	    const holderMultiInput = oView.byId(this.MultiInputId) as MultiInput;
		if (holderMultiInput) {
			holderMultiInput.removeAllTokens();
		}
		const oBinding = oTable.getBinding("items") as ListBinding;
		oBinding.filter([]);
		this.inputFilter = '';
	}

	public closingDialog(): void {
		if (this.oDialog) {
			this.oDialog.close();
			this.oDialog.destroyContent(); 
		}
	}

	//sorter


	public onOpenSortDialog(): void{
		const oDialog = this.byId("sortDialog") as Dialog;
		oDialog.open();
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
}

