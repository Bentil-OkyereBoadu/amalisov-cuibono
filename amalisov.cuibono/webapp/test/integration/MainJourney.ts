/* eslint-disable @typescript-eslint/no-floating-promises */
import opaTest from "sap/ui/test/opaQunit";
import MainPage from "./pages/MainPage";

const onTheMainPage = new MainPage();

QUnit.module("On Edit Press Journey");

opaTest("Should navigate to the edit page when the edit button is pressed", function (Given: any, When: any, Then: any) {
    // Arrangements
    onTheMainPage.iStartMyUIComponent({
				componentConfig: {
					name: "amalisov.cuibono"
				}
			});

    // Actions
    onTheMainPage.iPressOnTheEditButton();

    // Assertions
    onTheMainPage.iShouldSeeTheEditPage();

    // Cleanup
    Then.iTeardownMyApp();
});
