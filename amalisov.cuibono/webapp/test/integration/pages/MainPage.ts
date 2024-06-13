import Opa5 from "sap/ui/test/Opa5";
import Press from "sap/ui/test/actions/Press";
import BindingPath from "sap/ui/test/matchers/BindingPath";
import AggregationLengthEquals from "sap/ui/test/matchers/AggregationLengthEquals";
import AggregationContainsPropertyEqual from "sap/ui/test/matchers/AggregationContainsPropertyEqual";

const viewName = "amalisov.cuibono.view.Main";

export default class MainPage extends Opa5 {

    iStartMyApp(): void {
        return this.iStartMyUIComponent({
            componentConfig: {
                name: "amalisov.cuibono"
            }
        });
    }

	iPressOnTheEditButton () {
		return this.waitFor({
			id: "createTranche",
			viewName,
			// matchers:  new BindingPath({
			// 	path: `/edit-tranche/${sId}/false`
			// }),
			actions: new Press(),
			errorMessage: "Did not find the Edit button on the main view"
		});
	}

    // Assertions
    iShouldSeeTheEditPage() {
        return this.waitFor({
            controlType: "sap.m.Page",
            viewName: "amalisov.cuibono.view.EditBonusTranche", 
            success: function() {
                Opa5.assert.ok(true, "Navigated to the edit page");
            },
            errorMessage: "Did not navigate to the edit page"
        });
    }

    iTeardownMyApp(): void {
        return this.iTeardownMyUIComponent();
    }
}
