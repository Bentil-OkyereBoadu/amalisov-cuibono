/* eslint-disable @typescript-eslint/no-floating-promises */
import opaTest from "sap/ui/test/opaQunit";
import MainPage from "./pages/MainPage";
import AppPage from "./pages/AppPage";
import ParticipantsPage from "./pages/ParticipantsPage";
import EditBonusTranchePage from "./pages/EditBonusTranchePage";

const onTheParticipantsPage = new ParticipantsPage();
const onTheMainPage = new MainPage();
const onTheAppPage = new AppPage();
const onTheEditPage = new EditBonusTranchePage();



//-------------- APP PAGE ---------------//  

QUnit.module("App Navigation Journey")

opaTest("Should navigate to Participants page when button is pressed", function(Then: any) {

    //Arrangements
    onTheAppPage.iStartMyApp();

    // Actions
    onTheAppPage.iPressOnTheParticipantsButton();

    //Assertions
    onTheAppPage.iShouldSeeTheParticipantsPage();

    // Cleanup
    Then.iTeardownMyApp();

});

opaTest("Should navigate to Calculated Bonus page when button is pressed", function(Then: any) {

    //Arrangements
    onTheAppPage.iStartMyApp();

    // Actions
    onTheAppPage.iPressOnTheCalculatedBonusButton();

    //Assertions
    onTheAppPage.iShouldSeeTheCalculatedBonusPage();

    // Cleanup
    Then.iTeardownMyApp();

});





/////////----------MAIN PAGE---------/////////// 


QUnit.module("On Edit Press Journey");
opaTest("Should navigate to the edit page when the edit or duplicate button are pressed", function (Given: any, When: any, Then: any) {
    // Arrangements
    onTheMainPage.iStartMyApp();

    // Actions
    
    // click on the edit icon button
    onTheMainPage.iPressOnTheEditButton();
    // i should see the edit page
    onTheMainPage.iShouldSeeTheEditPage();


    // click on the main button page in navbar
    onTheAppPage.iPressOnTheMainPageButton();
    // i should the main page
    onTheAppPage.iShouldSeeTheMainPage();
  

    // click on the duplicate button
    onTheMainPage.iPressOnTheDuplicateButton();
    // i  should see the edit page
    onTheMainPage.iShouldSeeTheEditPage();

    // Cleanup
    Then.iTeardownMyApp();
});




QUnit.module("Search");

opaTest("Should enter text into search field and filter table data", function (Given: any, When: any, Then: any) {
    // Arrangements
    onTheMainPage.iStartMyApp();

    // Actions
    onTheMainPage.iEnterTextForSearch();

    // Assertions
    onTheMainPage.iSeeExpectedSearchResults();

    // Cleanup
    Then.iTeardownMyApp();
});

QUnit.module("Sorter");

opaTest("Should open sorter dialog and filter table data", function (Given: any, When: any, Then: any) {
    // Arrangements
    onTheMainPage.iStartMyApp();

    // Actions
    onTheMainPage.iPressOnTheSortButton();
    // Assertion
    onTheMainPage.iShouldSeeTheSortDialog();

   // Actions
   onTheMainPage.iPressOnTheSortConfirmButton();
   // Assertion
   onTheMainPage.iShouldSeeSelectOptionMessageBox();


    // onTheMainPage.iSelectViewSettingsItem();
    // onTheMainPage.iPressOnTheSortCloseButton();


    // Assertions
    

    // Cleanup
    Then.iTeardownMyApp();
});
 




/////////---------- PARTICIPANTS PAGE ---------///////////

QUnit.module("Participants Checkbox Journey and open a dialog with exclude button")

opaTest("Should Check all checkboxes on Participants page when button is pressed and click exclude button to open a dialog", function(Then: any) {

    //Arrangements
    onTheParticipantsPage.iStartMyApp();

    // Actions

    // navigate to the participants page
    onTheAppPage.iPressOnTheParticipantsButton();
    //  press the select all checkboxes checkbox 
    onTheParticipantsPage.iPressOnTheCheckBox();
    // press the exclude button
    onTheParticipantsPage.iPressOnTheExcludeFromTrancheButton();

    //Assertions

    //i should see all enable checkboxes checked
    onTheParticipantsPage.allCheckBoxesMustBeSelected();
    // i should be able to see the dialog open
    onTheParticipantsPage.iShouldSeeTheDialogOpen();

    // Cleanup
    Then.iTeardownMyApp();
});

QUnit.module("Participants Checkbox Journey and open a dialog with overRule button")

opaTest("Should Check all checkboxes on Participants page when button is pressed and click overRule button to open a dialog", function(Then: any) {

    //Arrangements
    onTheParticipantsPage.iStartMyApp();


    // Actions

    // navigate to the participants page
    onTheAppPage.iPressOnTheParticipantsButton();
    //  press the select all checkboxes checkbox 
    onTheParticipantsPage.iPressOnTheCheckBox();
    // i should see the dialog open again but with overrule button
    onTheParticipantsPage.iPressOnTheOverruleFromTrancheButton()

    //Assertions

    //i should see all enable checkboxes checked
    onTheParticipantsPage.allCheckBoxesMustBeSelected();
    // i should be able to see the dialog open
    onTheParticipantsPage.iShouldSeeTheDialogOpen();

    // Cleanup
    Then.iTeardownMyApp();
})





///////////// EDIT TRANCHE PAGE //////////////

QUnit.module("On Create tranche Press Journey");

opaTest("Should navigate to the Create page when the create tranche button is pressed", function (Given: any, When: any, Then: any) {
    // Arrangements
    onTheMainPage.iStartMyApp();

    // Actions
    onTheMainPage.iPressOnTheCreateButton();

    // Assertions
    onTheMainPage.iShouldSeeTheCreatePage();

});

opaTest("Should enter fill tranche creation form", function () {
    // Actions
    onTheEditPage.iEnterTextIntoTrancheNameField();

    // Asserions
    onTheEditPage.iShouldSeeTheCorrectTrancheNameInput();
})

opaTest("Should open the Add Target Dialog when the Add Target button is pressed", function (Given: any, When: any, Then: any) {

    // Actions
    onTheEditPage.iPressOnTheAddTargetButton();

    // Assertions
    onTheEditPage.iShouldSeeTheTargetDialogOpen();

});
opaTest("Should enter text into the target name input the", function (Given: any, When: any, Then: any) {   

    // Actions
    onTheEditPage.iEnterTextIntoTargetNameField();

    // Assertions
    onTheEditPage.iShouldSeeTheCorrectTargetNameInInput();

    // Action
    onTheEditPage.iEnterTextIntoTargetWeightField();
    // Assertion
    onTheEditPage.iShouldSeeTheCorrectTargetWeightInInput();

     // Action
     onTheEditPage.iEnterTextIntoAchievementField();
     // Assertion
     onTheEditPage.iShouldSeeTheCorrectTargetAchievementInInput();

      // Action
    onTheEditPage.iEnterTextIntoTargetDescriptionField();
    // Assertion
    onTheEditPage.iShouldSeeTheCorrectTargetDescriptionInInput();

    // Cleanup
    Then.iTeardownMyApp();
});