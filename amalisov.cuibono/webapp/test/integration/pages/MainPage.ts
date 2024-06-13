import Opa5 from "sap/ui/test/Opa5";
import Press from "sap/ui/test/actions/Press";
import BindingPath from "sap/ui/test/matchers/BindingPath";
import AggregationLengthEquals from "sap/ui/test/matchers/AggregationLengthEquals";
import AggregationContainsPropertyEqual from "sap/ui/test/matchers/AggregationContainsPropertyEqual";
import EnterText from "sap/ui/test/actions/EnterText";

const viewName = "amalisov.cuibono.view.Main";

export default class MainPage extends Opa5 {

    iStartMyApp(): void {
        return this.iStartMyUIComponent({
            componentConfig: {
                name: "amalisov.cuibono"
            }
        });
    }

    iPressOnTheCreateButton () {
		return this.waitFor({
			id: "createTranche",
			viewName,
			actions: new Press(),
			errorMessage: "Did not find the Create button on the main view"
		});
	}

	iPressOnTheEditButton () {
		return this.waitFor({
			id: "editIcon",
			viewName,
			// matchers:  new BindingPath({
			// 	path: `/edit-tranche/${sId}/false`
			// }),
			actions: new Press(),
			errorMessage: "Did not find the Edit button on the main view"
		});
	}

    iEnterTextForSearchAndPressEnter () {
        return this.waitFor({
            id: "search",
            viewName,
            actions: [new EnterText({text: "Demo Tranche New"})],
            errorMessage: "The text could not be entered in the search"
        });
    }

    // Assertions
    iShouldSeeTheCreatePage() {
        return this.waitFor({
            controlType: "sap.m.Page",
            viewName: "amalisov.cuibono.view.EditBonusTranche", 
            success: function() {
                Opa5.assert.ok(true, "Navigated to the Create page");
            },
            errorMessage: "Did not navigate to the Create page"
        });
    }

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

    iSeeExpectedSearchResults(): object {
        return this.waitFor({
            controlType: "sap.m.Table",
            id: "Table",
            viewName,
            matchers: new AggregationLengthEquals({
                name: "items",
				length: 1
            }),
            success: function (oTable: any) {
                Opa5.assert.ok(true, "The expected search result is displayed in the table");
            },
            errorMessage: "The expected search result was not found in the table"
        });
    }
    

    iTeardownMyApp(): void {
        return this.iTeardownMyUIComponent();
    }
}
