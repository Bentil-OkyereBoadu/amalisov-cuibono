import CheckBox from "sap/m/CheckBox";
import Opa5 from "sap/ui/test/Opa5";
import EnterText from "sap/ui/test/actions/EnterText";
import Press from "sap/ui/test/actions/Press";
import AggregationLengthEquals from "sap/ui/test/matchers/AggregationLengthEquals";

const viewName = "amalisov.cuibono.view.EditBonusTranche";

export default class EditBonusTranchePage extends Opa5 {
	iStartMyApp(): void {
		return this.iStartMyUIComponent({
			componentConfig: {
				name: "amalisov.cuibono",
			},
		});
	}
    iEnterTextIntoTrancheNameField () {
        return this.waitFor({
            id: "nameInput",
            viewName,
            actions: [new EnterText({text: "Integration Tranche"})],
            errorMessage: "The text could not be entered in the Name field"
        });
    }

// target actions
iPressOnTheEditTargetButton() {
    return this.waitFor({
        id: "editTarget",
        viewName,
        actions: new Press(),
        errorMessage: "Did not find the edit Target button",
    });
}

	iPressOnTheAddTargetButton() {
		return this.waitFor({
			id: "addTarget",
			viewName,
			actions: new Press(),
			errorMessage: "Did not find the Add Target button",
		});
	}

    iEnterTextIntoTargetNameField () {
        return this.waitFor({
            id: "targetName",
            viewName,
            actions: [new EnterText({text: "Integration target 1"})],
            errorMessage: "The text could not be entered in the Input field"
        });
    }

    iEnterTextIntoTargetWeightField () {
        return this.waitFor({
            id: "targetWeight",
            viewName,
            actions: [new EnterText({text: "55"})],
            errorMessage: "The text could not be entered in the Input field"
        });
    }
    iEnterTextIntoAchievementField () {
        return this.waitFor({
            id: "targetAchievement",
            viewName,
            actions: [new EnterText({text: "39"})],
            errorMessage: "The text could not be entered in the Input field"
        });
    }
    iEnterTextIntoTargetDescriptionField () {
        return this.waitFor({
            id: "targetDescription",
            viewName,
            actions: [new EnterText({text: "Integration target 1 descrip"})],
            errorMessage: "The text could not be entered in the Input field"
        });
    }

    iPressOnTheSaveTargetButton() {
		return this.waitFor({
			id: "saveTarget",
			viewName,
			actions: new Press(),
			errorMessage: "Did not find the Add Target button",
		});
	}

	// Assertions

    iShouldSeeTheDateFilled() {
        return this.waitFor({
            id: "startDateInput",
            viewName,
            success: (oInput: any) => {
                Opa5.assert.ok(oInput.getValue().length > 0, "The Date field was already filled. This is the edit page");
            },
            errorMessage: "Dates werent filled",
        });
    }

    iShouldSeeTheDateEmpty() {
        return this.waitFor({
            id: "startDateInput",
            viewName,
            success: (oInput: any) => {
                Opa5.assert.notOk(oInput.getValue().length > 0, "The Date field was empty. This is the duplicate page");
            },
            errorMessage: "Dates were filled",
        });
    }

    iShouldSeeTheCorrectTrancheNameInput() {
        return this.waitFor({
            id: "nameInput",
            viewName,
            success: (oInput: any) => {
                Opa5.assert.strictEqual(oInput.getValue(), "Integration Tranche", "The input field contains the correct text");
            },
            errorMessage: "Input didnt contain the text",
        });
    }

    iShouldSeeTheTargetDialogOpen(){
        return this.waitFor({
            controlType: "sap.m.Dialog",
            id: "editDialog",
            viewName,
            success: function() {
                Opa5.assert.ok(true, "dialog is open");
            },
            errorMessage: "Dialog did not open"
        });
    }

    iShouldSeeTheCorrectTargetNameInInput() {
        return this.waitFor({
            id: "targetName",
            viewName,
            success: (oInput: any) => {
                Opa5.assert.strictEqual(oInput.getValue(), "Integration target 1", "The input field contains the correct text");
            },
            errorMessage: "Input didnt contain the text",
        });
    }
    iShouldSeeTheCorrectTargetWeightInInput() {
        return this.waitFor({
            id: "targetWeight",
            viewName,
            success: (oInput: any) => {
                Opa5.assert.strictEqual(Number(oInput.getValue()), 55, "The input field contains the correct text");
            },
            errorMessage: "Input didnt contain the Value",
        });
    }
    iShouldSeeTheCorrectTargetAchievementInInput() {
        return this.waitFor({
            id: "targetAchievement",
            viewName,
            success: (oInput: any) => {
                Opa5.assert.strictEqual(Number(oInput.getValue()), 39, "The input field contains the correct text");
            },
            errorMessage: "Input didnt contain the value",
        });
    }
    iShouldSeeTheCorrectTargetDescriptionInInput() {
        return this.waitFor({
            id: "targetDescription",
            viewName,
            success: (oInput: any) => {
                Opa5.assert.strictEqual(oInput.getValue(), "Integration target 1 descrip", "The input field contains the correct text");
            },
            errorMessage: "Input didnt contain the text",
        });
    }

    // theTableHasNewItem () {
    //     return this.waitFor({
    //         id: "trancheTable",
    //         viewName,
    //         matchers: new AggregationLengthEquals({
    //             name: "items",
    //             length: 1
    //         }),
    //         success: function () {
    //             Opa5.assert.ok(true, "The table contains the added entry");
    //         },
    //         errorMessage: "The table does not contain the item."
    //     });
    // }

    theTableHasNewItem () {
        return this.waitFor({
            id: "trancheTable",
            viewName,
            matchers: new AggregationLengthEquals({
                name: "items",
                length: 1
            }),
            success: function () {
                Opa5.assert.ok(true, "The table contains the added entry");
            },
            errorMessage: "The table does not contain the item."
        });
    }

}
