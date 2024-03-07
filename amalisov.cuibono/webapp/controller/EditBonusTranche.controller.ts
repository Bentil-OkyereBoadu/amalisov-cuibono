import Dialog from "sap/m/Dialog";
import BaseController from "./BaseController";
import Input from "sap/m/Input";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace amalisov.cuibono.controller
 */
export default class EditBonusTranche extends BaseController {

    public onInit(): void {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.getRoute("EditBonusTranche").attachPatternMatched(this.onRouteMatched, this);
        this.getView().setModel(this.getOwnerComponent().getModel("tranches"));
    };

    public onRouteMatched(oEvent: any): void {
        const oView = this.getView();
        const oModel = this.getModel("updateModel");
       

        console.log("update", oModel);
       
        (oView.byId("nameInput") as Input).setValue(oModel.getProperty("/TrancheName"));
        (oView.byId("locationSelect") as Input).setValue(oModel.getProperty("/Location"));
        (oView.byId("startDateInput") as Input).setValue(oModel.getProperty("/StartDate"));
        (oView.byId("endDateInput") as Input).setValue(oModel.getProperty("/EndDate"));
        (oView.byId("weightInput") as Input).setValue(oModel.getProperty("/TrancheWeight"));
        (oView.byId("descriptionInput") as Input).setValue(oModel.getProperty("/Description"));
        (oView.byId("originDateInput") as Input).setValue(oModel.getProperty("/OriginDate"));

        
    }

    // public onRouteMatched(oEvent: any): void {
    //     const oView = this.getView();
    //     const oModel = oEvent.getParameter("arguments").updateModel;
    
    //     (oView.byId("nameInput") as Input).bindProperty("value", "TrancheName");
    //     (oView.byId("locationSelect") as Input).bindProperty("value", "Location");
    //     (oView.byId("startDateInput") as Input).bindProperty("value", "StartDate");
    //     (oView.byId("endDateInput") as Input).bindProperty("value", "EndDate");
    //     (oView.byId("weightInput") as Input).bindProperty("value", "TrancheWeight");
    //     (oView.byId("descriptionInput") as Input).bindProperty("value", "Description");
    //     (oView.byId("originDateInput") as Input).bindProperty("value", "OriginDate");
    
    //     oView.setModel(oModel);
    // }

    // public onRouteMatched(oEvent: any): void {
    //     const oView = this.getView();
    //     // const threadId = window.decodeURIComponent(oEvent.getParameter("arguments").ID);
    //     // const sPath = `/${threadId}`;
    //     // oView.bindElement({
    //     //     path: sPath,
    //     //     model: "thread",
    //     //     parameters: {
    //     //         "$expand": "answers",
    //     //     }
    //     // });

    //     (oView.byId("nameInput")as Input).setValue("");

    //     (oView.byId("locationSelect")as Input).setValue("updateModel>TrancheName");
    //     (oView.byId("startDateInput")as Input).setValue("updateModel>");
    //     (oView.byId("endDateInput")as Input).setValue("updateModel>");
    //     (oView.byId("weightInput")as Input).setValue("updateModel>");
    //     (oView.byId("descriptionInput")as Input).setValue("updateModel>");
    //     (oView.byId("originDateInput")as Input).setValue("updateModel>");

    // }



	public onAddTarget(): void{
        const oDialog = this.byId("editDialog") as Dialog;
        oDialog.open();
    }
    public closeAddTarget(): void{
        const oDialog = this.byId("editDialog") as Dialog;
        oDialog.close();
    }
}
