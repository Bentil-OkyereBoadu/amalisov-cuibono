import BaseController from "./BaseController";

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

	

	public onRouteSelection(oEvent: any): void {
		const selectedKey: string = oEvent.getSource().getSelectedKey();

		if (selectedKey === "bonus") {
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("main");
		} else if (selectedKey === "participant") {
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("participants");
		}
	}
}
