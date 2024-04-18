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
import Page from "sap/m/Page";
import Select from "sap/m/Select";

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
	orignDate?: string;
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
			.attachPatternMatched(this.onObjectMatched, this);
	}

	public onObjectMatched(oEvent: any): void {
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
		const sPath = `/BonusTranche(${sTrancheId})`;
	
		const oGeneralModel = this.getModel("tranches") as ODataModel;
		const mParameters = {
			$expand: `targets`,
		};
		const oBinding = oGeneralModel.bindContext(sPath, null, mParameters);	
		oBinding.requestObject().then((oData: any) => {
			const oTrancheData: TrancheData = {
						ID: isDuplicate ? "" : sTrancheId,
						name: oData.name,
						location: oData.location,
						startDate: !isDuplicate ? oData.startDate : "",
						endDate: !isDuplicate ? oData.endDate : "",
						orignDate: !isDuplicate ? oData.orignDate : "",
						weight: oData.weight,
						description: oData.description,
						Status: isDuplicate ? "Open" : oData.Status,
						targets: oData.targets,
					};
					console.log(oTrancheData)
			oUpdateModel.setData(oTrancheData);
			this.calculateTotalWeight();
			this.changeTitle(sTrancheId);
		}).catch((oError: any) => {
			MessageBox.error(oError.message);
		});
	}

	public onCreateRoute(): void {
		const oUpdateModel = this.getModel("updateModel") as JSONModel;
		oUpdateModel.setData({});
		oUpdateModel.setProperty("/Status", "Open");
		this.changeTitle('')
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

	public async onDeleteTarget(oEvent: any): Promise<void> {
		//delete target from array and send to backend
		const oItem = oEvent.getSource();
		const oContext = oItem.getBindingContext("updateModel");
		const sTargetId = oContext.getProperty("ID");
		const oUpdateModel = this.getModel("updateModel") as JSONModel;
		const aTargets = oUpdateModel.getProperty("/targets");
		const resourceBundle: ResourceBundle = await this.getResourceBundle();

		if (sTargetId) {
			MessageBox.confirm(resourceBundle.getText("confirmDeleteTranche"), {
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: async (sAction: string) => {
					if (sAction === MessageBox.Action.YES) {
						try {
							aTargets.splice(sTargetId, 1);
							oUpdateModel.setProperty("/targets", aTargets);
							this.calculateTotalWeight();
							MessageBox.success(resourceBundle.getText("deleteTarget"));
							oUpdateModel.refresh();
						} catch (error) {
							MessageBox.error(resourceBundle.getText("errorDeleteTarget"));
						}
					}
				}
			});
		}
	}

	public validateInputs(): Promise<void> {
		return new Promise(async (resolve, reject) => {
		const oNameInput = this.getView().byId("nameInput") as Input
		const sName: string = oNameInput.getValue();
		const oStartDatePicker = this.getView().byId("startDateInput") as DatePicker;
		const sStartDateValue = oStartDatePicker.getValue();
		const oEndDatePicker = this.getView().byId("endDateInput") as DatePicker;
		const sEndDateValue = oEndDatePicker.getValue();

		const startDate = new Date(sStartDateValue);
		const endDate = new Date(sEndDateValue);

		const oUpdateModel = this.getView().getModel("updateModel") as JSONModel;
		const aTargets = oUpdateModel.getProperty("/targets");



		const resourceBundle: ResourceBundle = await this.getResourceBundle();
		
		if(!sName || sName.length < 4){
			oNameInput.setValueState("Error")
			reject(new Error(resourceBundle.getText("nameError")));
		} else if (!sStartDateValue) {
			oNameInput.setValueState("None")
			oStartDatePicker.setValueState("Error")
			reject(new Error(resourceBundle.getText("dateError")));
		} else if (!sEndDateValue) {
			oStartDatePicker.setValueState("None")
			oEndDatePicker.setValueState("Error")
			reject(new Error(resourceBundle.getText("dateError")));
		} else if (startDate >= endDate) {
			oEndDatePicker.setValueState("Error")
			oStartDatePicker.setValueState("Error")
			reject(new Error(resourceBundle.getText("startDateError")));
		} else if (!aTargets) {
			
			reject(new Error(resourceBundle.getText("targetError")));
		} else {
			oNameInput.setValueState("None")
			oStartDatePicker.setValueState("None")
			oEndDatePicker.setValueState("None")
			resolve();
		}
	});
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
		const sOriginDateValue = oOriginDatePicker.getDateValue()

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
			const originDate = new Date(sOriginDateValue);
			
			if (startDate > endDate) {
				sStartDate.setValueState("Error");
				oEndDatePicker.setValueState("Error");
			} else if (endDate > originDate) {
				oOriginDatePicker.setValueState("Error");
			}else {
				sStartDate.setValueState("None");
				oEndDatePicker.setValueState("None");
				oOriginDatePicker.setValueState("None");
			}
		}
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
			await this.validateInputs();
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
		const sLocation = (this.getView().byId("locationSelect") as Select).getSelectedKey() || oUpdateModel.getProperty("/location");
		const nTrancheWeight = Number(oUpdateModel.getProperty("/weight"));
		const sDescription = oUpdateModel.getProperty("/description");
		const aTargets = oUpdateModel.getProperty("/targets");
		const sStartDate = oUpdateModel.getProperty("/startDate");
		const sEndDate = oUpdateModel.getProperty("/endDate");
		const sOriginDate = oUpdateModel.getProperty("/orignDate") || "";
		const sTrancheId = oUpdateModel.getProperty("/ID");
		const sStatus = oUpdateModel.getProperty("/Status");


		const formattedStartDate = this.formatDate(sStartDate);
		const formattedEndDate = this.formatDate(sEndDate);
		const formattedOriginDate = this.formatDate(sOriginDate);


		const oData: TrancheData = {
			name: sTrancheName,
			location: sLocation,
			startDate: formattedStartDate,
			endDate: formattedEndDate,
			orignDate: formattedOriginDate,
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

		const oRouter = this.getRouter();
		const currentHash = oRouter.getHashChanger().getHash();
		const sPageName = oRouter.getRouteInfoByHash(currentHash).name;

		let sPath = "";
		let oData: TrancheData = {
		};
		let sToastMessage = "";

		if (!sTrancheID || sTrancheID === "") {
			sPath = "/createTranche";
			oData = { ...this.constructTrancheData(), Status:"Locked" };
			sToastMessage = "createdTranche";
		} else if (
			sTrancheID !== "" &&
			sPageName === resourceBundle.getText("routeCondition")
		) {
			sPath = "/updateBonusTranche";
			const ID = sTrancheID;
			oData = { ...this.constructTrancheData(), ID: ID, Status:"Locked" };
			sToastMessage = "updatedTranche";
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
	};

	public async onCompleteTranche() : Promise <void>{
		const oView = this.getView();
		const oUpdateModel = this.getModel("updateModel");
		const sTrancheID = oUpdateModel.getProperty("/ID");
		const oModel = oView.getModel("tranches") as ODataModel;
		const resourceBundle: ResourceBundle = await this.getResourceBundle();

		let oData: TrancheData = {};

		const sPath = "/updateBonusTranche";
		const ID = sTrancheID;
		oData = { ...this.constructTrancheData(), ID: ID, Status:"Completed" };

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

	public async onReOpenTranche() : Promise <void>{
		const oView = this.getView();
		const oUpdateModel = this.getModel("updateModel");
		const sTrancheID = oUpdateModel.getProperty("/ID");
		const oModel = oView.getModel("tranches") as ODataModel;
		const resourceBundle: ResourceBundle = await this.getResourceBundle();

		let oData: TrancheData = {};

		const sPath = "/updateBonusTranche";
		const ID = sTrancheID;
		oData = { ...this.constructTrancheData(), ID: ID, Status:"Open" };

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
		const oModel =  oUpdateModel.getProperty("/totalWeight");
		const aTargets = oUpdateModel.getProperty("/targets");
	
		// Calculate the total weight of all targets
		let totalWeight = aTargets.reduce((acc:any, target:any) => acc + target.weight, 0);
	
		// Assign value an existing model to set the total weight
		// oModel.setData({totalWeight:totalWeight});
		oUpdateModel.setProperty("/totalWeight", totalWeight)
	};
	
	public onCancel(): void {}

	public async changeTitle(sTrancheId: string): Promise<void> {
		const oView = this.getView()
		const oPage = oView.byId("editPage") as Page;
		const resourceBundle: ResourceBundle = await this.getResourceBundle();
		const title1 = resourceBundle.getText("createTrancheTitle");
		const title2 = resourceBundle.getText("updateTrancheTitle");

		if (!sTrancheId) {
			oPage.setTitle(title1);
		} else if (sTrancheId) {
			oPage.setTitle(title2);
		}
	}
}
