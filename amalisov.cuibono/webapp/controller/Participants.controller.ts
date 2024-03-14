import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import Table from "sap/m/Table";
import Button from "sap/m/Button";
import FilterBar from "sap/ui/comp/filterbar/FilterBar";


/**
 * @namespace amalisov.cuibono.controller
 */
export default class Participants extends BaseController {
  private oModel: JSONModel;
  private oFilterBar: FilterBar;
  private oGoButton: Button;
  private oTable: Table

  public onInit(): void {
    this.oModel = new JSONModel();
    this.getView().setModel(this.oModel);

  
    this.oFilterBar = this.getView().byId("filterbar") as FilterBar;
    this.oGoButton = this.getView().byId("filterbar") as Button; 
    this.oGoButton.addStyleClass("GoFilterBar") as Button;
    this.oTable = this.getView().byId("parameterTable") as Table

  }

  public onExit(): void {
    this.oFilterBar= null;
    this.oTable = null;
  }
}