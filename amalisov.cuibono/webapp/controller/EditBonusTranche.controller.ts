import Dialog from "sap/m/Dialog";
import BaseController from "./BaseController";
import Input from "sap/m/Input";
import JSONModel from "sap/ui/model/json/JSONModel";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import MessageBox from "sap/m/MessageBox";
import DatePicker from "sap/m/DatePicker";
import FilterOperator from "sap/ui/model/FilterOperator";
import Filter from "sap/ui/model/Filter";

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

	public currentAction: string = "";
	public targetId: string = "";

	public onInit(): void {
		const oRouter = this.getOwnerComponent().getRouter();
		oRouter
			.getRoute("CreateTranche")
			.attachPatternMatched(this.onCreateRoute, this);
		oRouter
			.getRoute("EditBonusTranche")
			.attachPatternMatched(this.onEditRouteMatched, this);
	}

	public async onEditRouteMatched(oEvent: any): Promise<any> {
		// read data from model and place in an array.
		const oUpdateModel = this.getModel("updateModel") as JSONModel;
		const trancheIdUri = window.decodeURIComponent(
			oEvent.getParameter("arguments").ID
		);
		const sTrancheId = trancheIdUri.match(/\(([^)]+)\)/)[1];
		const sDuplicate = window.decodeURIComponent(
			oEvent.getParameter("arguments").Duplicate
		)
		let isDuplicate = true

		if (sDuplicate === "true") {
			isDuplicate = true;
		} else if (sDuplicate === "false") {
			isDuplicate = false;
		}
		const oGeneralModel = this.getModel("tranches") as ODataModel;
		const sPath = `/BonusTranche`;
		const mParameters = {
			$expand: `targets`,
		};
		const oFilter = new Filter("ID", FilterOperator.EQ, sTrancheId);

		const data = oGeneralModel.bindList(
			sPath,
			null,
			null,
			[oFilter],
			mParameters
		);
		const contextObjects = await data.requestContexts();
		let dataArray = [];
		dataArray = contextObjects.map((item) => item.getObject());

		const oData: TrancheData = {
			ID: sTrancheId,
			name: dataArray[0].name,
			location: dataArray[0].location,
			startDate: !isDuplicate ? dataArray[0].startDate : "",
			endDate: !isDuplicate ? dataArray[0].endDate : "",
			originDate: !isDuplicate ? dataArray[0].originDate : "",
			weight: dataArray[0].weight,
			description: dataArray[0].description,
			Status: dataArray[0].Status,
			targets: dataArray[0].targets,
		};
		oUpdateModel.setData(oData);
		this.calculateTotalWeight();
	}

	public onObjectMatched(): void {
        const oView = this.getView();
		const oUpdateModel = this.getModel("updateModel") as JSONModel;
        const trancheId = oUpdateModel.getProperty("/ID");
        const sPath = `/BonusTranche(${trancheId})`;
        oView.bindElement({
            path: sPath,
            model: "tranches",
            parameters: {
                "$expand": "targets",
            }
        });
    }

	public onCreateRoute(): void {
		const oUpdateModel = this.getModel("updateModel") as JSONModel;
		const oModel = this.getModel("totalWeightModel") as JSONModel;
		oUpdateModel.setData({});
		oUpdateModel.setProperty("/Status", "Open");
		oModel.setData({totalWeight:0});
	}

	public onAddTarget(): void {
		const oView = this.getView();
		const oDialog = this.byId("editDialog") as Dialog;
		oView.addDependent(oDialog);
		oDialog.open();
		this.currentAction = "save";
	}

	public closeAddTarget(): void {
		const oDialog = this.byId("editDialog") as Dialog;
		const oNewTarget = this.getModel("newTargets") as JSONModel;
		oNewTarget.setData({});
		oDialog.close();
	}

	public onSaveTarget(): void {
		const oUpdateModel = this.getModel("updateModel") as JSONModel;
		const oNewTarget = this.getModel("newTargets") as JSONModel;
		const aTargets = oUpdateModel.getProperty("/targets") || [];
		const targetWeight = Number(oNewTarget.getProperty("/weight"));
		const targetAchieved = Number(oNewTarget.getProperty("/achievement"));
		const oData = {
			name: oNewTarget.getProperty("/name"),
			weight: targetWeight,
			achievement: targetAchieved,
			description: oNewTarget.getProperty("/description"),
		};
		aTargets.push(oData);
		oUpdateModel.setProperty("/targets", aTargets);
		oNewTarget.setData({});
		this.closeAddTarget();
		this.calculateTotalWeight();
	}

	public onOpenEditTarget(oEvent: any): void {
		this.currentAction = "edit";
		const oItem = oEvent.getSource();
		const oContext = oItem.getBindingContext("updateModel");
		const sTargetName = oContext.getProperty("name");
		const nTargetWeight = oContext.getProperty("weight");
		const nTargetAchievement = oContext.getProperty("achievement");
		const sDescription = oContext.getProperty("description");
		const id = oContext.getProperty("ID");

		this.targetId = id;

		const oView = this.getView();
		const oDialog = this.byId("editDialog") as Dialog;
		oView.addDependent(oDialog);
		oDialog.open();
		(oView.byId("targetName") as Input).setValue(sTargetName);
		(oView.byId("targetWeight") as Input).setValue(nTargetWeight);
		(oView.byId("targetDescription") as Input).setValue(sDescription);
		(oView.byId("targetAchievement") as Input).setValue(nTargetAchievement);
	}


	public onSaveEditedTarget(): void {
		const oView = this.getView();
		const oModel = oView.getModel("updateModel") as JSONModel;
		const sNewName = (oView.byId("targetName") as Input).getValue();
		const nNewWeight = Number((oView.byId("targetWeight") as Input).getValue());
		const nNewAchievement = Number(
			(oView.byId("targetAchievement") as Input).getValue()
		);
		const sNewDescription = (
			oView.byId("targetDescription") as Input
		).getValue();

		this.targetId;

		const aTargets = oModel.getProperty("/targets");
		const targetIndex = aTargets.findIndex(
			(target: any) => target.ID === this.targetId
		);

		if (targetIndex !== -1) {
			const updatedTarget = {
				...aTargets[targetIndex],
				name: sNewName,
				weight: nNewWeight,
				achievement: nNewAchievement,
				description: sNewDescription,
			};
			aTargets[targetIndex] = updatedTarget;

			oModel.setProperty("/targets", aTargets);
		}
		this.closeAddTarget();
		this.calculateTotalWeight();
	}

	public onSave(): void {
		switch (this.currentAction) {
			case "save":
				this.onSaveTarget();
				break;
			case "edit":
				this.onSaveEditedTarget();
				break;
			default:
				this.closeAddTarget();
				break;
		}
	}

	public onDeleteTarget(oEvent: any): void {
		//delete target from array and send to backend
		const oItem = oEvent.getSource();
		const oContext = oItem.getBindingContext("updateModel");
		const sTargetId = oContext.getProperty("ID");
		const oUpdateModel = this.getModel("updateModel") as JSONModel;
		const aTargets = oUpdateModel.getProperty("/targets");
		aTargets.splice(sTargetId, 1);
		oUpdateModel.setProperty("/targets", aTargets);
		this.calculateTotalWeight();
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

	public async onSaveTranche(): Promise<void> {
		const oView = this.getView();
		const oModel = oView.getModel("tranches") as ODataModel;
		const resourceBundle: ResourceBundle = await this.getResourceBundle();
		const oUpdateModel = this.getModel("updateModel");
		const sTrancheID = oUpdateModel.getProperty("/ID");

		const oRouter = this.getRouter();
		const currentHash = oRouter.getHashChanger().getHash();
		const sPageName = oRouter.getRouteInfoByHash(currentHash).name;

		let sPath = "";
		let oData: TrancheData = {
			name: "",
		};
		let sToastMessage = "";
		if (!sTrancheID) {
			sPath = "/createTranche";
			oData = this.constructTrancheData();
			sToastMessage = "createdTranche";
		} else if (
			sTrancheID !== "" &&
			sPageName === resourceBundle.getText("routeCondition")
		) {
			sPath = "/updateBonusTranche";
			const ID = sTrancheID;
			oData = { ...this.constructTrancheData(), ID: ID };
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

		day = day.length < 2 ? "0" + day : day;
		month = month.length < 2 ? "0" + month : month;

		return `${year}-${month}-${day}`

	}

	private constructTrancheData(): TrancheData {
		const oUpdateModel = this.getModel("updateModel");
		const sTrancheName = oUpdateModel.getProperty("/name");
		const sLocation = oUpdateModel.getProperty("/location");
		const nTrancheWeight = Number(oUpdateModel.getProperty("/weight"));
		const sDescription = oUpdateModel.getProperty("/description");
		const aTargets = oUpdateModel.getProperty("/targets");
		const sStartDate = oUpdateModel.getProperty("/startDate");
		const sEndDate = oUpdateModel.getProperty("/endDate");
		const sOriginDate = oUpdateModel.getProperty("/originDate") || "";
		const sTrancheId = oUpdateModel.getProperty("/ID");
		const sStatus = oUpdateModel.getProperty("/Status");


		const formattedStartDate = this.formatDate(sStartDate);
		const formattedEndDate = this.formatDate(sEndDate);
		const formattedOriginDate = this.formatDate(sOriginDate);


		const oData: TrancheData = {
			ID: sTrancheId,
			name: sTrancheName,
			location: sLocation,
			startDate: formattedStartDate,
			endDate: formattedEndDate,
			// originDate: formattedOriginDate,
			weight: nTrancheWeight,
			description: sDescription,
			Status: sStatus,
			targets: aTargets,
		};

		return oData;
	}

	public async onLockTranche() : Promise <void>{
		const oView = this.getView();
		const oUpdateModel = this.getModel("updateModel");
		const sTrancheID = oUpdateModel.getProperty("/ID");
		const oModel = oView.getModel("tranches") as ODataModel;
		const resourceBundle: ResourceBundle = await this.getResourceBundle();

		let oData: TrancheData = {};

		const sPath = "/updateBonusTranche";
		const ID = sTrancheID;
		oData = { ...this.constructTrancheData(), ID: ID, Status:"Locked" };

		const oContext = oModel.bindList(sPath);
		try {
			oContext.create(oData);
			MessageBox.success(resourceBundle.getText("updatedTranche"), {
				onClose: () => {
					this.getRouter().navTo("main");
					oModel.refresh();
				},
			});
		} catch (error) {
			MessageBox.error(resourceBundle.getText("errorCreateTranche"), error);
		}
	};

	public calculateTotalWeight(): void {
		const oUpdateModel = this.getModel("updateModel") as JSONModel;
		const oModel =  this.getModel("totalWeightModel") as JSONModel
		const aTargets = oUpdateModel.getProperty("/targets");
	
		// Calculate the total weight of all targets
		let totalWeight = aTargets.reduce((acc:any, target:any) => acc + target.weight, 0);
	
		// Assign value an existing model to set the total weight
		oModel.setData({totalWeight:totalWeight});
	};
	
	public onCancel(): void {}
}
