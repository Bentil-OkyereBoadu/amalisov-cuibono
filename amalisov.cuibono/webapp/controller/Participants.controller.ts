import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import Control from "sap/ui/core/Control";
import Table from "sap/m/Table";
import Event from "sap/ui/base/Event";
import FilterOperator from "sap/ui/model/FilterOperator";
import Filter from "sap/ui/model/Filter";
import ListBinding from "sap/ui/model/ListBinding";
import Button from "sap/m/Button";

/**
 * @namespace amalisov.cuibono.controller
 */
export default class Participants extends BaseController {
  private oModel: JSONModel;
  private oFilterBar: any;
  private oGoButton: Button;
  private oTable: Table

  public onInit(): void {
    this.oModel = new JSONModel();
    this.getView().setModel(this.oModel);

    this.applyData = this.applyData.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.getFiltersWithValues = this.getFiltersWithValues.bind(this);
    
    this.oFilterBar = this.getView().byId("filterbar") as Control;
    this.oGoButton = this.getView().byId("filterbar") as Button; 
    this.oGoButton.addStyleClass("GoFilterBar") as Button;
    this.oTable = this.getView().byId("parameterTable") as Table

    this.oFilterBar.registerFetchData(this.fetchData);
    this.oFilterBar.registerApplyData(this.applyData);
    this.oFilterBar.registerGetFiltersWithValues(this.getFiltersWithValues);
  }

  public onExit(): void {
    this.oFilterBar= null;
    this.oTable = null;
  }

  public fetchData(): any {
    const aData= this.oFilterBar.getAllFilterItems().reduce(function(aResult:any, oFilterItem:any){
      aResult.push({
        groupName: oFilterItem.getGroupName(),
        fieldName: oFilterItem.getName(),
        fieldData: oFilterItem.getControl().getSelectedKeys()
      });

      return aResult;
    }, []);

    return aData;
  }

  public applyData(aData: any): void{
    aData.forEach( (oDataObject:any) => {
      var oControl = this.oFilterBar.determineControlByName(oDataObject.fieldName, oDataObject.groupName);
      oControl.setSelectedKeys(oDataObject.fieldData);
    }, this);
  }

  public getFiltersWithValues(): void{
    const aFiltersWithvalues= this.oFilterBar.getFilterGroupItems().reduce(function(aResult: any, oFilterGroupItem: any){
      const oControl = oFilterGroupItem.getControl();

      if(oControl && oControl.getSelectedKeys && oControl.getSelectedKeys().length > 0){
        aResult.push(oFilterGroupItem)
      }
       return aResult;
    }, []);

    return aFiltersWithvalues;
  }

  public onSelectionChange(oEvent: Event): void{
   this.oFilterBar.fireFilterChange(oEvent)
  }

  public onSearch(): any{
    const aTableFilters = this.oFilterBar.getFilterGroupItems().reduce(function (aResult: any, oFilterGroupItem: any) {
      const oControl = oFilterGroupItem.getControl()
      
      if (typeof oControl.getSelectedKeys === 'function'){
       const aSelectedKeys = oControl.getSelectedKeys(),
        aFilters = aSelectedKeys.map(function (sSelectedKey: any) {
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
      } else if (typeof oControl.getValue === 'function'){
        const sValue = oControl.getValue();
        if (sValue){
          aResult.push(new Filter({
            path: oFilterGroupItem.getName(),
            operator: FilterOperator.Contains,
            value1: sValue
          }));
        }
      }

      return aResult;
    }, []);

    (this.oTable.getBinding("items") as ListBinding).filter(aTableFilters);

    this.oTable.setShowOverlay(false);
  }
}