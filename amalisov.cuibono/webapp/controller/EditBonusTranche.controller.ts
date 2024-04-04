import Dialog from "sap/m/Dialog";
import BaseController from "./BaseController";
import Input from "sap/m/Input";
import JSONModel from "sap/ui/model/json/JSONModel";
import TextArea from "sap/m/Input";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import MessageBox from "sap/m/MessageBox";

/**
 * @namespace amalisov.cuibono.controller
 */

interface TrancheData {
	ID?: string;
	name: string;
	description?: string;
	location?: string;
	startDate?: string;
	endDate?: string;
	originDate?: string;
	weight?: string;
	Status?: string;
	targets?: [];
}
export default class EditBonusTranche extends BaseController {
	public onInit(): void {
		const oRouter = this.getRouter();
		oRouter
			.getRoute("CreateTranche")
			.attachPatternMatched(this.onCreateRoute, this);
		this.getView().setModel(this.getModel("tranches"));
		oRouter
			.getRoute("EditBonusTranche")
			.attachPatternMatched(this.onObjectMatched, this);
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

	public onObjectMatched(oEvent: any): void {
        const oView = this.getView();
		const oUpdateModel = this.getModel("updateModel");

		const sTrancheId = oUpdateModel.getProperty("/ID");
        // const sTrancheId = window.decodeURIComponent(oEvent.getParameter("arguments").ID);
        const sPath = `/${sTrancheId}`;
        oView.bindElement({
            path: sPath,
            model: "thread",
            parameters: {
                "$expand": "targets",
            }
        });
		console.log("pathhh",sPath,"iddddd", sTrancheId);
    }
	public onAddTarget(): void {
		const oDialog = this.byId("editDialog") as Dialog;
		oDialog.open();
	}

	public closeAddTarget(): void {
		const oDialog = this.byId("editDialog") as Dialog;
		oDialog.close();
	}

	public onSaveTarget(): void {}

	public async onSaveTranche(): Promise<void> {
		const oView = this.getView();
		const oModel = oView.getModel("tranches") as ODataModel;
		const resourceBundle: ResourceBundle = await this.getResourceBundle();
		const oUpdateModel = this.getModel("updateModel");
		const sTrancheID = oUpdateModel.getProperty("/ID");

		let sPath = "";
		let oData: TrancheData = {
			name: "",
		};
		let sToastMessage = "";
		if (sTrancheID === "") {
			sPath = "/createTranche";
			oData = { ...this.constructTrancheData(), targets: [], Status: "Open" };
			sToastMessage = "createdTranche";
		} else if (sTrancheID !== "") {
			sPath = "/updateBonusTranche";
			const ID = sTrancheID;
			oData = { ...this.constructTrancheData(), ID: ID };
			sToastMessage = "updatedTranche";
		}

		const oContext = oModel.bindList(sPath);

		try {
			oContext.create(oData);
			MessageBox.success(resourceBundle.getText(sToastMessage), {
				onClose: () => {
					this.getRouter().navTo("main");
				},
			});
			oModel.refresh();
		} catch (error) {
			MessageBox.error(resourceBundle.getText("errorCreateTranche"));
		}
	}

	private constructTrancheData(): TrancheData {
		const oUpdateModel = this.getModel("updateModel");

		const sTrancheName = oUpdateModel.getProperty("/name");
		const sLocation = oUpdateModel.getProperty("/location");
		const nTrancheWeight = oUpdateModel.getProperty("/weight");
		const sDescription = oUpdateModel.getProperty("/description");
		const aTargets = oUpdateModel.getProperty("/targets");
		const sStartDate = oUpdateModel.getProperty("/startDate");
		const sEndDate = oUpdateModel.getProperty("/endDate");
		const sTrancheId = oUpdateModel.getProperty("/ID");

		const oData: TrancheData = {
			// ID: sTrancheId,
			name: sTrancheName,
			location: "Ghana", //sLocation,
			startDate: sStartDate,
			endDate: sEndDate,
			// weight: nTrancheWeight,
			// description: sDescription,
			// Status: includeID ? oUpdateModel.getProperty("Status") : "",
			// targets: [],
		};

		return oData;
	}

	public onCancel(): void {}
}
