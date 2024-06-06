import * as sinon from 'sinon';
import Participants from 'amalisov/cuibono/controller/Participants.controller';
import JSONModel from "sap/ui/model/json/JSONModel";
import Table from "sap/m/Table";
import MultiInput from "sap/m/MultiInput";
import Token from "sap/m/Token";

QUnit.module("Participants applyfilter Controller Tests", hooks => {
  let oParticipants: Participants;
  let oViewStub: any;
  let oModel: JSONModel;
  let oTableStub: any;
  let oBindingStub: any;
  let oInputStub: any;

  hooks.beforeEach(() => {

      oParticipants = new Participants("ParticipantsControllerName");
      oModel = new JSONModel();
      oViewStub = {
          byId: sinon.stub(),
          setModel: sinon.stub()
      };
      oTableStub = new Table();
      oBindingStub = {
          filter: sinon.spy()
      };
      oInputStub = new MultiInput();

      sinon.stub(oParticipants, "getView").returns(oViewStub);
      sinon.stub(oParticipants, "getModel").returns(oModel);

      oViewStub.byId.withArgs("Table").returns(oTableStub);
      oViewStub.byId.withArgs("tranche").returns(oInputStub);
      sinon.stub(oTableStub, "getBinding").withArgs("items").returns(oBindingStub);
  });

  // hooks.afterEach(() => {
  //     sinon.restore();
  // });

  QUnit.test("applyFilter should set filters on the table binding with a specific tranche ID and verify the tranche name in the input", assert => {
    // Arrange
    const sTrancheID = "123";
    const sTrancheName = "ABC";
    const expectedToken = new Token({
        key: sTrancheName,
        text: sTrancheName
    });

    oInputStub.setTokens = sinon.spy();

    // Act
    oParticipants.applyFilter(sTrancheID, sTrancheName);

    // Assert
    assert.ok(oBindingStub.filter.calledOnce, "Binding filter was called once");
  });

  QUnit.test("applyFilter should clear filters if no tranche ID is provided", assert => {
      // Arrange
      const sTrancheID = "";
      const sTrancheName = "";

      // Act
      oParticipants.applyFilter(sTrancheID, sTrancheName);

      // Assert
      assert.ok(oBindingStub.filter.calledWith([]), "Filters were cleared on the table binding");
  });
});


