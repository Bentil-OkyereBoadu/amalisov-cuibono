import BaseController from "./BaseController";
import ResourceBundle from "sap/base/i18n/ResourceBundle";

/**
 * @namespace amalisov.cuibono.controller
 */
export default class App extends BaseController {
	public onInit(): void {
		// apply content density mode to root view
		const oRouter = this.getOwnerComponent().getRouter();
		this.getView().addStyleClass(
			this.getOwnerComponent().getContentDensityClass()
		);
		// eslint-disable-next-line @typescript-eslint/unbound-method
	}

	

	public async onRouteSelection(oEvent: any): Promise<void> {
		const selectedKey: string = oEvent.getSource().getSelectedKey();
		const resourceBundle: ResourceBundle = await this.getResourceBundle();

		if (selectedKey === resourceBundle.getText("Bonus")) {
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("main");
		} else if (selectedKey === resourceBundle.getText("Participant")) {
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("participants");
		}
	}
}
