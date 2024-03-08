import BaseController from "./BaseController";
import Button from "sap/m/Button";
import HashChanger from "sap/ui/core/routing/HashChanger";

/**
 * @namespace amalisov.cuibono.controller
 */
export default class App extends BaseController {
	public onInit(): void {
		// apply content density mode to root view
		const oRouter = this.getOwnerComponent().getRouter();
		this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		// eslint-disable-next-line @typescript-eslint/unbound-method
		oRouter.attachRouteMatched(this.onRouteMatched, this);
	}

	public onRouteMatched(): void {
		const oView = this.getView()

		const oRouteButton = oView.byId("btnRoute") as Button; 
		const oRouteButton2 = oView.byId("btnRoute1") as Button;  

		const sCurrentHash = HashChanger.getInstance().getHash();

		if (!sCurrentHash) {
			oRouteButton.addStyleClass("activeButton");
			oRouteButton2.removeStyleClass("activeButton");
		} else if (sCurrentHash === "participant") {
			oRouteButton2.addStyleClass("activeButton");
			oRouteButton.removeStyleClass("activeButton");
		}
	}

	public onNavToRoute1(): void {
		const oRouter = this.getOwnerComponent().getRouter();
		oRouter.navTo("main");
	}

	public onNavToRoute2(): void {
		const oRouter = this.getOwnerComponent().getRouter();
		oRouter.navTo("participants");
	}
}
