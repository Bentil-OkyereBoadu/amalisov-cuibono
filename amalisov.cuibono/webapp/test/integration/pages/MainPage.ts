import Opa5 from "sap/ui/test/Opa5";
import Press from "sap/ui/test/actions/Press";
import BindingPath from "sap/ui/test/matchers/BindingPath";
import AggregationLengthEquals from "sap/ui/test/matchers/AggregationLengthEquals";
import AggregationContainsPropertyEqual from "sap/ui/test/matchers/AggregationContainsPropertyEqual";
import EnterText from "sap/ui/test/actions/EnterText";
import PropertyStrictEquals from "sap/ui/test/matchers/PropertyStrictEquals";
import ViewSettingsDialog from "sap/m/ViewSettingsDialog";

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

    iPressOnTheEditButton() {
        return this.waitFor({
            //we get id using RegExp in OPA5 test for SAPUI5 applications bcz it is way to target controls to get an exact ID based 
            //on a pattern in their IDs  since we have multiple button with id but some are enabled and disbaled 
            id: new RegExp("editIcon"),
            controlType: "sap.m.Button",
            viewName,
    
            success: function(aEditButtons: any[]) {
                // Filter to get only enabled buttons
                let bAllEnabled = aEditButtons.filter(oEditBtn => oEditBtn.getEnabled());
                if (bAllEnabled.length > 0) {
                    bAllEnabled[0]; // Press the first enabled button
                }
            },
            actions: new Press(), 
            errorMessage: "Did not find the Edit button on the main view"
        });
    }

    iPressOnTheDuplicateButton() {
        return this.waitFor({
            id: new RegExp("duplicateIcon"),
            controlType: "sap.m.Button",
            viewName,
    
            success: function(aEditButtons: any[]) {
                // Filter to get only enabled buttons
                let bAllEnabled = aEditButtons.filter(oEditBtn => oEditBtn.getEnabled());
                if (bAllEnabled.length > 0) {
                    bAllEnabled[0]; // Press the first enabled button
                }
            },
            actions: new Press(), 
            errorMessage: "Did not find the duplicate button on the main view"
        });
    }

    iEnterTextForSearch () {
        return this.waitFor({
            id: "search",
            viewName,
            actions: [new EnterText({text: "New Tranche 1"})],
            errorMessage: "The text could not be entered in the search"
        });
    }

    iPressOnTheSortButton () {
		return this.waitFor({
			id: "sortTranche",
			viewName,
			actions: new Press(),
			errorMessage: "Did not find the Sort button on the main view"
		});
	}

    iPressOnTheSortConfirmButton() {
        return this.waitFor({
            controlType: "sap.m.Button",
            matchers: new PropertyStrictEquals({
                name: "text",
                value: "OK"
            }),
            actions: new Press(),
            errorMessage: "Did not find the Sort Confirm button in the ViewSettingsDialog"
        });
    }

    // iSelectViewSettingsItem () {
    //     return this.waitFor({
    //         controlType: "sap.m.ViewSettingsItem",
    //         matchers: new PropertyStrictEquals({
    //             name: "text",
    //             value: "Status"
    //         }),
    //         actions: new Press(),
    //         errorMessage: `Did not find the ViewSettingsItem with text `
    //     });
    // }

    // iSelectSortItem () {
    //     return this.waitFor({
    //         controlType: "sap.m.ViewSettingsDialog",
    //         matchers: new PropertyStrictEquals({
    //             name: "id",
    //             value: "sortDialog"
    //         }),
    //         actions: function(oDialog: any) {
    //             var aSortItems = oDialog.getSortItems();
    //             var oItemToSelect = aSortItems.find((item: any) => item.getId() === "2");
    //             if (oItemToSelect) {
    //                 oDialog.setSelectedSortItem(oItemToSelect);
    //                 oDialog.fireConfirm({
    //                     sortItem: oItemToSelect
    //                 });
    //             } else {
    //                 Opa5.assert.ok(false, "Could not find the sort item with id '2'");
    //             }
    //         },
    //         errorMessage: "Could not find the sort dialog."
    //     });
    // }

    iPressOnTheSortCloseButton() {
        console.log("cancelled")
        return this.waitFor({
            controlType: "sap.m.Button",
            matchers: new PropertyStrictEquals({
                name: "text",
                value: "Cancel"
            }),
            actions: new Press(),
            errorMessage: "Did not find the Sort Close button in the ViewSettingsDialog"
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
            success: function () {
                Opa5.assert.ok(true, "The expected search result is displayed in the table");
            },
            errorMessage: "The expected search result was not found in the table"
        });
    }

    iShouldSeeTheSortDialog() {
        return this.waitFor({
            controlType: "sap.m.ViewSettingsDialog",
            viewName, 
            success: function() {
                Opa5.assert.ok(true, "Opened the Sort Dialog");
            },
            errorMessage: "Did not opened the Sort Dialog"
        });
    }

    // iShouldNotSeeDialog () {
    //     return this.waitFor({
    //         controlType: "sap.m.ViewSettingsDialog",
    //         id: "sortDialog",
    //         visible: false,
    //         success: function (oDialog: any) {
    //             Opa5.assert.notOk(oDialog.getVisible(), "Dialog is not visible -- OK");
    //         },
    //         errorMessage: "Checking Field: dialogID -- Assertion Failed"
    //     });
    // }
    
    iShouldSeeSelectOptionMessageBox () {
        return this.waitFor({
            controlType: "sap.m.Dialog",
            matchers: new PropertyStrictEquals({
                name: "title",
                value: "Information"
            }),
            success: function(aDialogs: any) {
                Opa5.assert.ok(aDialogs.length > 0, "The Information MessageBox is shown");
            },
            errorMessage: "Did not find the expected MessageBox"
        });
    }

    iTeardownMyApp(): void {
        return this.iTeardownMyUIComponent();
    }
}
