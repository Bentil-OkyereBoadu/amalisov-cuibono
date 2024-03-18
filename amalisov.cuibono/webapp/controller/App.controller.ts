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
		const oRouter = this.getOwnerComponent().getRouter();
		const currentHash = oRouter.getHashChanger().getHash();
		const pageName= oRouter.getRouteInfoByHash(currentHash).name
		const resourceBundle: ResourceBundle = await this.getResourceBundle();
		if (selectedKey === resourceBundle.getText("Bonus")) {
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("main");
		} else if (selectedKey === resourceBundle.getText("Participant") && pageName !== resourceBundle.getText("routeCondition")) {
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("participants");
		} else if(selectedKey === resourceBundle.getText("Participant") && pageName === resourceBundle.getText("routeCondition")) {
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("trancheParticipants");
		}
	}
}
