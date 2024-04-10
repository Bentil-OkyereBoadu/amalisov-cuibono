import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import Table from "sap/m/Table";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ListBinding from "sap/ui/model/ListBinding";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";

/**
 * @namespace amalisov.cuibono.controller
 */
export default class CalculatedBonus extends BaseController {
	public onInit(): void {}

	public onSliderChange(oEvent: any): void {
		const oBinding = this.getView()
			.byId("Table")
			.getBinding("items") as ODataListBinding;

		var oFilters = [];
		const oRangeSlider = oEvent.getSource();
		const fMinValue = oRangeSlider.getValue();
		const fMaxValue = oRangeSlider.getValue2();

		const oPriceFilter = new Filter(
			"finalAmount",
			FilterOperator.BT,
			fMinValue,
			fMaxValue
		);
		oFilters.push(oPriceFilter);
		oBinding.filter([oPriceFilter]);
	}
}
