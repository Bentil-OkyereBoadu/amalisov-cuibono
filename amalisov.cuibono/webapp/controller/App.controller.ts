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
		const oRouter = this.getRouter();
		const currentHash = oRouter.getHashChanger().getHash();
		const sPageName= oRouter.getRouteInfoByHash(currentHash).name
		const resourceBundle: ResourceBundle = await this.getResourceBundle();
		if (selectedKey === resourceBundle.getText("Bonus")) {
			
			oRouter.navTo("main");
		} else if (selectedKey === resourceBundle.getText("Participant") && sPageName !== resourceBundle.getText("routeCondition")) {
			
			oRouter.navTo("participants");
		} else if(selectedKey === resourceBundle.getText("Participant") && sPageName === resourceBundle.getText("routeCondition")) {
			
			oRouter.navTo("trancheParticipants");
		}
	}
}
