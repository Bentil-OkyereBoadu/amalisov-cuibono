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

/**
 * @namespace amalisov.cuibono.controller
 */
export default abstract class BaseController extends Controller {
	private oDialog: Dialog;
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
				dialogTitle = "Exclude from Tranche";
				this.oDialog.addContent(new Label({ text: resourceBundle.getText("justification")}));
				this.oDialog.addContent(new TextArea({ width: "100%"}));
				break;

			case overRuleBtn:
				dialogTitle = "Overrule";
				this.oDialog.addContent(new Label({ text:resourceBundle.getText("overRule") }));
				this.oDialog.addContent(new TextArea({ width: "100%" }));
				break;
				
                        case localId:
				dialogTitle = "Filter by Local ID";
				this.oDialog.addContent(new Label({ text: resourceBundle.getText("localId") }));
				this.oDialog.addContent(new TextArea({ width: "100%" }));
				break;

			case nameId:
				dialogTitle = "Filter by Name";
				this.oDialog.addContent(new Label({ text:resourceBundle.getText("name") }));
				this.oDialog.addContent(new TextArea({ width: "100%" }));
				break;

			case departmentId:
				dialogTitle = "Filter by Department";
				this.oDialog.addContent(new Label({ text: resourceBundle.getText("department")}));
				this.oDialog.addContent(new TextArea({ width: "100%",  }));
				break;

			case trancheId:
				dialogTitle = "Filter by Tranche";
				this.oDialog.addContent(new Label({ text: resourceBundle.getText("tranche") }));
				this.oDialog.addContent(new TextArea({ width: "100%", }));
				break;
		}

		this.oDialog.setTitle(dialogTitle);
		this.oDialog.setContentWidth("300px");
		this.oDialog.addStyleClass("myCustomDialog")
		this.oDialog.open();	  
	}

	public closingDialog(): void {
		if (this.oDialog) {
			this.oDialog.close();
		}
	}
}
