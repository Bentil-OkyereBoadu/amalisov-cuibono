/* eslint-disable @typescript-eslint/no-floating-promises */
import opaTest from "sap/ui/test/opaQunit";
import MainPage from "./pages/MainPage";
import AppPage from "./pages/AppPage";
import ParticipantsPage from "./pages/ParticipantsPage";

const onTheParticipantsPage = new ParticipantsPage();
const onTheMainPage = new MainPage();
const onTheAppPage = new AppPage();



//-------------- APP PAGE ---------------//  

QUnit.module("App Navigation Journey")

opaTest("Should navigate to Participants page when button is pressed", function(Then: any) {

    //Arrangements
    onTheAppPage.iStartMyUIComponent({
        componentConfig: {
            name: "amalisov.cuibono"
        }
    });

    // Actions
    onTheAppPage.iPressOnTheParticipantsButton();

    //Assertions
    onTheAppPage.iShouldSeeTheParticipantsPage();

    // Cleanup
    Then.iTeardownMyApp();

});

opaTest("Should navigate to Calculated Bonus page when button is pressed", function(Then: any) {

    //Arrangements
    onTheAppPage.iStartMyUIComponent({
        componentConfig: {
            name: "amalisov.cuibono"
        }
    });

    // Actions
    onTheAppPage.iPressOnTheCalculatedBonusButton();

    //Assertions
    onTheAppPage.iShouldSeeTheCalculatedBonusPage();

    // Cleanup
    Then.iTeardownMyApp();

});


/////////----------MAIN PAGE---------///////////


// QUnit.module("On Edit Press Journey");

// opaTest("Should navigate to the edit page when the edit button is pressed", function (Given: any, When: any, Then: any) {
//     // Arrangements
//     onTheMainPage.iStartMyUIComponent({
// 				componentConfig: {
// 					name: "amalisov.cuibono"
// 				}
// 			});

//     // Actions
//     onTheMainPage.iPressOnTheEditButton();

//     // Assertions
//     onTheMainPage.iShouldSeeTheEditPage();

//     // Cleanup
//     Then.iTeardownMyApp();
// });

QUnit.module("On Create tranche Press Journey");
opaTest("Should navigate to the Create page when the create tranche button is pressed", function (Given: any, When: any, Then: any) {
    // Arrangements
    onTheMainPage.iStartMyUIComponent({
				componentConfig: {
					name: "amalisov.cuibono"
				}
			});

    // Actions
    onTheMainPage.iPressOnTheCreateButton();

    // Assertions
    onTheMainPage.iShouldSeeTheCreatePage();

    // Cleanup
    Then.iTeardownMyApp();
});

QUnit.module("Search");

opaTest("Should enter text into search field and filter table data", function (Given: any, When: any, Then: any) {
    // Arrangements
    onTheMainPage.iStartMyUIComponent({
				componentConfig: {
					name: "amalisov.cuibono"
				}
			});

    // Actions
    onTheMainPage.iEnterTextForSearchAndPressEnter();

    // Assertions
    onTheMainPage.iSeeExpectedSearchResults();

    // Cleanup
    Then.iTeardownMyApp();
});


/////////----------PARTICIPANTS PAGE---------///////////

QUnit.module("Participants Checkbox Journey")

opaTest("Should Check all checkboxes on Participants page when button is pressed", function(Then: any) {

    //Arrangements
    onTheParticipantsPage.iStartMyUIComponent({
        componentConfig: {
            name: "amalisov.cuibono"
        }
    });

    // Actions
    onTheAppPage.iPressOnTheParticipantsButton();
    onTheParticipantsPage.iPressOnTheCheckBox();

    //Assertions
    onTheParticipantsPage.allCheckBoxesMustBeSelected();
    

    // Cleanup
    Then.iTeardownMyApp();

});