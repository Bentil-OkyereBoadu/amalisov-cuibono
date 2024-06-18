import CheckBox from "sap/m/CheckBox";
import Opa5 from "sap/ui/test/Opa5";
import Press from "sap/ui/test/actions/Press";

const viewName = "amalisov.cuibono.view.Participants";

export default class ParticipantsPage extends Opa5 {

    iStartMyApp(): void {
        return this.iStartMyUIComponent({
            componentConfig: {
                name: "amalisov.cuibono"
            }
        });
    }

    iPressOnTheCheckBox () {
		return this.waitFor({
			id: "headerCheck",
			viewName,
			actions: new Press(),
			errorMessage: "Did not find the CheckBox button"
		});
	}

    iPressOnTheExcludeFromTrancheButton () {
		return this.waitFor({
			id: "excludeTrancheButton",
			viewName,
			actions: new Press(),
			errorMessage: "Did not find the exclude tranche button"
		});
	}

    iPressOnTheOverruleFromTrancheButton () {
		return this.waitFor({
			id: "overRuleButton",
			viewName,
			actions: new Press(),
			errorMessage: "Did not find the overRule tranche button"
		});
	}         

    // Assertions

    allCheckBoxesMustBeSelected() {
        return this.waitFor({
        controlType: "sap.m.CheckBox",
        viewName: "amalisov.cuibono.view.Participants",
      
        success: function(aCheckBoxes: any[]) {
            let bAllSelected = aCheckBoxes
            .filter(oCheckBox => oCheckBox.getEnabled())
            .every(oCheckBox => oCheckBox.getSelected());
            Opa5.assert.ok(bAllSelected, "All checkboxes are checked");
        },
        errorMessage: "The checkboxes weren't all checked"
    });
    }

    iShouldSeeTheDialogOpen(){
        return this.waitFor({
            controlType: "sap.m.Dialog",
            viewName,
            success: function() {
                Opa5.assert.ok(true, "dialog is open");
            },
            errorMessage: "Dialog did not open"
        });
    }

      // clean up
    iTeardownMyApp(): void {
        return this.iTeardownMyUIComponent();
    }
}