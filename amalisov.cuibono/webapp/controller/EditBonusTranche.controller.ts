import Dialog from "sap/m/Dialog";
import BaseController from "./BaseController";
import Input from "sap/m/Input";
import JSONModel from "sap/ui/model/json/JSONModel";
import TextArea from "sap/m/Input";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
// import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import MessageBox from "sap/m/MessageBox";
import DatePicker from "sap/m/DatePicker";
import Table from "sap/m/Table";
import Select from "sap/m/Select";
import Text from "sap/m/Text";
/**
 * @namespace amalisov.cuibono.controller
 */
interface Target {
	name: string;
	weight: number;
	achievement: number;
	description: string;
}
interface TrancheData {
	ID?: string;
	name?: string;
	description?: string;
	location?: string;
	startDate?: string;
	endDate?: string;
	originDate?: string;
	weight?: number;
	Status?: string;
	targets?: Target[];
}
export default class EditBonusTranche extends BaseController {

	public onInit(): void {
		const oRouter = this.getOwnerComponent().getRouter();
		oRouter
			.getRoute("CreateTranche")
			.attachPatternMatched(this.onCreateRoute, this);
		this.getView().setModel(this.getModel("tranches"));
		oRouter
			.getRoute("EditBonusTranche")
			.attachPatternMatched(this.onObjectMatched, this);
	}

	public onObjectMatched(oEvent: any): void {
        const oView = this.getView();
		// const oUpdateModel = this.getModel("updateModel") as JSONModel;
        // const trancheId = oUpdateModel.getProperty("/ID");
		const trancheId = window.decodeURIComponent(oEvent.getParameter("arguments").ID);
        const sPath = `/${trancheId}`;
        oView.bindElement({
            path: sPath,
            model: "tranches",
            parameters: {
                "$expand": "targets",
            }
        });
		this.readArray(oEvent)
		
    }

	public async readArray(oEvent: any): Promise<any>{
		// read data from model and place in an array.
		const oUpdateModel = this.getModel("updateModel") as JSONModel;
		const trancheId = window.decodeURIComponent(oEvent.getParameter("arguments").ID);
		const oGeneralModel =  this.getModel("tranches") as ODataModel;
		
		const sPath = `/BonusTranche`;
		const mParameters =  {
			"$expand": `targets`
		};
		const data = oGeneralModel.bindList(sPath, null, null, null, mParameters);
        const contextObjects = await data.requestContexts();
		let dataArray = []

		dataArray = contextObjects.map( item => item.getObject())
		console.log(dataArray, "jk", trancheId)
		// oGeneralModel.read(sPath, { 
		// 	success : function(oData: any, response: any){
		// 		console.log("kkkkk",oData, response)
		// 	   },
		   
		// 	error: function(oError: any ){
		// 	  console.log("first")
		// 	}
		//    });
	}

	public onCreateRoute(oEvent: any): void {
		const oView = this.getView();
		const oUpdateModel = this.getModel("updateModel") as JSONModel;

		(oView.byId("nameInput") as Input).setValue("");
		(oView.byId("locationSelect") as Input).setValue("");
		(oView.byId("startDateInput") as Input).setValue("");
		(oView.byId("endDateInput") as Input).setValue("");
		(oView.byId("weightInput") as Input).setValue("");
		(oView.byId("descriptionInput") as TextArea).setValue("");
		(oView.byId("originDateInput") as Input).setValue("");
		oUpdateModel.setProperty("/Targets", []);
	}

	public onAddTarget(): void {
		const oView = this.getView();
		const oDialog = this.byId("editDialog") as Dialog;
		oView.addDependent(oDialog);
		oDialog.open();
	}

	public closeAddTarget(): void {
		const oDialog = this.byId("editDialog") as Dialog;
		oDialog.close();
	}

	public onSaveTarget(): void {
		const oUpdateModel = this.getModel("updateModel") as JSONModel;
		const oNewTarget =this.getModel("newTargets") as JSONModel;
        const aTargets = oUpdateModel.getProperty("/targets") || [];
		const targetWeight = Number (oNewTarget.getProperty("/weight"));
		const targetAchieved = Number (oNewTarget.getProperty("/achievement"));
		const oData = {
					name: oNewTarget.getProperty("/name"),
					weight: targetWeight,
					achievement: targetAchieved,
					description: oNewTarget.getProperty("/description"),
		};
		
		aTargets.push(oData);
        oUpdateModel.setProperty("/targets", aTargets);
		console.log(oData, oNewTarget, aTargets, oUpdateModel)
        oNewTarget.setData({}); 
		this.closeAddTarget();
	}

	public onOpenEditTarget(): void {}

	public onDeleteTarget(): void {
		//delete target from array and send to backend
	}

	public limitDates(oEvent: any): void {
		const sStartDate = this.getView().byId("startDateInput") as DatePicker;
		const oEndDatePicker = this.getView().byId("endDateInput") as DatePicker;
		const oOriginDatePicker = this.getView().byId(
			"originDateInput"
		) as DatePicker;

		const sDatePicked = oEvent.getSource().getDateValue();

		const sStartDatePicked = sStartDate.getDateValue();
		const sStartDateValue = sStartDate.getValue();

		const sEndDate = oEndDatePicker.getDateValue();
		const sEndDateValue = oEndDatePicker.getValue();

		//limit date range
		if (sDatePicked !== "") {
			oEndDatePicker.setMinDate(new Date(sStartDatePicked));
			sStartDate.setMaxDate(new Date(sEndDate));
			oOriginDatePicker.setMinDate(new Date(sEndDate));
		} else {
			oEndDatePicker.setMinDate(new Date(sStartDateValue));
			sStartDate.setMaxDate(new Date(sEndDateValue));
			oOriginDatePicker.setMinDate(new Date(sEndDateValue));
		}

		//handle input validation
		if (sEndDateValue && sStartDateValue) {
			const startDate = new Date(sStartDateValue);
			const endDate = new Date(sEndDateValue);
		

			if (startDate > endDate) {
				sStartDate.setValueState("Error");
				oEndDatePicker.setValueState("Error");
			} else {
				sStartDate.setValueState("None");
				oEndDatePicker.setValueState("None");
			}
		}
	}


	public checkDate(oData: TrancheData): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const startDate = new Date(oData.startDate);
            const endDate = new Date(oData.endDate);
		    const resourceBundle: ResourceBundle = await this.getResourceBundle();

            if (startDate >= endDate) {
                reject(new Error(resourceBundle.getText("startDateError")));
            } else {
                resolve();
            }
        });
    }

	public async onSaveTranche(oEvent: any): Promise<void> {
		const oView = this.getView();
		const oModel = oView.getModel("tranches") as ODataModel;
		const resourceBundle: ResourceBundle = await this.getResourceBundle();
		// const oUpdateModel = this.getModel("updateModel");
		// const sTrancheID = window.decodeURIComponent(oEvent.getParameter("arguments").ID);
		// const sTrancheID = oUpdateModel.getProperty("/ID");

		const oRouter = this.getRouter();
		const currentHash = oRouter.getHashChanger().getHash();
		const sPageName= oRouter.getRouteInfoByHash(currentHash).name

		let sPath = "";
		let oData: TrancheData = {
			name: "",
		};
		let sToastMessage = "";
		if (sPageName !== resourceBundle.getText("routeCondition")) {
			sPath = "/createTranche";
			oData = this.constructTrancheData();
			sToastMessage = "createdTranche";
			
		} else if (sPageName === resourceBundle.getText("routeCondition")) {
			sPath = "/updateBonusTranche";
			// const ID = sTrancheID;
			// oData = { ...this.constructTrancheData(), ID: ID };
			sToastMessage = "updatedTranche";
			

		}

		try {
            await this.checkDate(oData);
        } catch (error) {
            if (error instanceof Error) {
                MessageBox.error(error.message);
            }
            return;
        }

		const oContext = oModel.bindList(sPath);
		try {
			oContext.create(oData);
			MessageBox.success(resourceBundle.getText(sToastMessage), {
				onClose: () => {
					this.getRouter().navTo("main");
					oModel.refresh();
				},
			});
		} catch (error) {
			MessageBox.error(resourceBundle.getText("errorCreateTranche"), error);
		}
	}

	private formatDate(date: string): string {
		const d = new Date(date);
		let day = d.getDate().toString();
		let month = (d.getMonth() + 1).toString();
		const year = d.getFullYear().toString();

		day = day.length < 2 ? '0' + day :day;
		month = month.length < 2 ? '0' + month :month;

		return  `${day}.${month}.${year}`
	}

	private constructTrancheData(): TrancheData {
		const oUpdateModel = this.getModel("updateModel");
		const oView = this.getView();

		const sTrancheName = oUpdateModel.getProperty("/name");
		const sLocation = oUpdateModel.getProperty("/location");
		const nTrancheWeight = oUpdateModel.getProperty("/weight");
		const sDescription = oUpdateModel.getProperty("/description");
		const aTargets = oUpdateModel.getProperty("/targets");
		const sStartDate = oUpdateModel.getProperty("/startDate");
		const sEndDate = oUpdateModel.getProperty("/endDate");
		const sOriginDate = oUpdateModel.getProperty("/originDate") || "";
		const sTrancheId = oUpdateModel.getProperty("/ID");
		const sStatus = oUpdateModel.getProperty("/Status");

		// const sTrancheName = (oView.byId("nameInput") as Input).getValue();
		// const sLocation = (oView.byId("locationSelect") as Select).getSelectedKey();
		// const nTrancheWeight =  Number((oView.byId("weightInput") as Input).getValue());
		// const sDescription = (oView.byId("descriptionInput") as Input).getValue();
		// const aTargets = oUpdateModel.getProperty("/targets");
		// const sStartDate = (oView.byId("startDateInput") as Input).getValue();
		// const sEndDate = (oView.byId("endDateInput") as Input).getValue();
		// //const sOriginDate = (oView.byId("originDateInput") as Input).getValue();
		// const sStatus = (oView.byId("statusValue") as Text).getText() || "Open";
		// console.log(sStatus, sLocation)

		const formattedStartDate = this.formatDate(sStartDate)
		const formattedEndDate = this.formatDate(sEndDate)
		const formattedOriginDate = this.formatDate(sOriginDate)

		const oData: TrancheData = {
			ID: sTrancheId,
			name: sTrancheName,
			location: sLocation,
			startDate: formattedStartDate,
			endDate: formattedEndDate,
			//originDate: formattedOriginDate,
			weight: nTrancheWeight,
			description: sDescription,
			Status: sStatus,
			targets: aTargets,
		};

		return oData;
	}

	public onCancel(): void {}
}
