import Opa5 from "sap/ui/test/Opa5";
import Press from "sap/ui/test/actions/Press";

const viewName = "amalisov.cuibono.view.App";

export default class AppPage extends Opa5 {

    iStartMyApp(): void {
        return this.iStartMyUIComponent({
            componentConfig: {
                name: "amalisov.cuibono"
            }
        });
    }

    iPressOnTheParticipantsButton () {
		return this.waitFor({
			id: "participantNav",
			viewName,
			actions: new Press(),
			errorMessage: "Did not find the Paricipants button"
		});
	}

    iPressOnTheCalculatedBonusButton () {
		return this.waitFor({
			id: "calculatedNav",
			viewName,
			actions: new Press(),
			errorMessage: "Did not find the calculated bonus button"
		});
	}

    // Assertions
    iShouldSeeTheParticipantsPage() {
        return this.waitFor({
            viewName: "amalisov.cuibono.view.Participants", 
            success: function() {
                Opa5.assert.ok(true, "Navigated to the Participants page");
            },
            errorMessage: "Did not navigate to the Participants page"
        });
    }

    iShouldSeeTheCalculatedBonusPage() {
        return this.waitFor({
            viewName: "amalisov.cuibono.view.CalculatedBonus", 
            success: function() {
                Opa5.assert.ok(true, "Navigated to the CalculatedBonus page");
            },
            errorMessage: "Did not navigate to the CalculatedBonus page"
        });
    }


    iTeardownMyApp(): void {
        return this.iTeardownMyUIComponent();
    }
}