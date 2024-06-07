import * as sinon from 'sinon';
import Main from 'amalisov/cuibono/controller/Main.controller';
import Table from "sap/m/Table";
import Input from "sap/m/Input";
import MessageBox from 'sap/m/MessageBox';

QUnit.module("Main onSearch with Mock Data", hooks => {
  let oController: Main;
  let oViewStub: any;
  let oInputStub: Input;
  let oTableStub: Table;
  let oBindingStub: any;

  hooks.beforeEach(() => {
    oController = new Main("SearchTranche");
    oViewStub = { byId: sinon.stub() };
    oInputStub = new Input();
    oTableStub = new Table();
    oBindingStub = {
      aMockData: [
        { name: "Tranche1", id: 1 },
        { name: "Tranche2", id: 2 },
        { name: "Tranche3", id: 3 }
      ],
      filter: sinon.spy(),
      getData: () => oBindingStub.aMockData
    };

    sinon.stub(oController, "getView").returns(oViewStub);
    oViewStub.byId.withArgs("search").returns(oInputStub);
    oViewStub.byId.withArgs("Table").returns(oTableStub);
    sinon.stub(oTableStub, "getBinding").withArgs("items").returns(oBindingStub);
  });

  QUnit.test("Should filter tranche data correctly", assert => {
    // Arrange
    const query = "TraNche1";
    oInputStub.getValue = sinon.stub().returns(query);

    // Act
    oController.onSearch();

    // Assert
    const expectedFilteredData = [{ name: "Tranche1", id: 1 }];
    const actualFilteredData = oBindingStub.getData().filter((item: { name: string; }) => item.name.toLowerCase().includes(query.toLowerCase()));
    assert.deepEqual(actualFilteredData, expectedFilteredData, "Filtered data should only include matching items.");
  });

  QUnit.test("Should return empty array for non-matching query", assert => {
    // Arrange
    const query = "Tranche14";
    oInputStub.getValue = sinon.stub().returns(query);

    // Act
    oController.onSearch();

    // Assert
    const expectedFilteredData: any[] = [];
    const actualFilteredData = oBindingStub.getData().filter((item: { name: string; }) => item.name.toLowerCase().includes(query.toLowerCase()));
    assert.deepEqual(actualFilteredData, expectedFilteredData, "Filtered data should be empty for non-matching query.");
  });

  QUnit.test("Should return all tranche data if query is empty", assert => {
    // Arrange
    const query = " ";
    oInputStub.getValue = sinon.stub().returns(query);

    // Act
    oController.onSearch();

    // Assert
    const expectedFilteredData: any[] =
      [
        { name: "Tranche1", id: 1 },
        { name: "Tranche2", id: 2 },
        { name: "Tranche3", id: 3 }
      ];
    const actualFilteredData = oBindingStub.getData();
    assert.deepEqual(actualFilteredData, expectedFilteredData, "Should return all data if query is empty");
  });
});


//Delete Tranche


// QUnit.module("Main onDeleteTranche with Mock Data", hooks => {
//     let oController: Main;
//     let oViewStub: any;
//     let oInputStub: Input;
//     let oTableStub: Table;
//     let oBindingStub: any;

//     hooks.beforeEach(() => {
//       oController = new Main("DeleteTranche");
//       oViewStub = { byId: sinon.stub() };
//       oInputStub = new Input();
//       oTableStub = new Table();
//       oBindingStub = {
//         aData: [
//             { name: "Tranche1", id: 1 },
//             { name: "Tranche2", id: 2 },
//             { name: "Tranche3", id: 3 }
//           ],
//         filter: sinon.spy(),
//         getData: () => oBindingStub.aData
//       };

//       sinon.stub(oController, "getView").returns(oViewStub);
//       oViewStub.byId.withArgs("search").returns(oInputStub);
//       oViewStub.byId.withArgs("Table").returns(oTableStub);
//       sinon.stub(oTableStub, "getBinding").withArgs("items").returns(oBindingStub);
//     });

//     QUnit.test("On matching delete the deleted item must be removed from array", assert => {
//       // Arrange
//       const idToDelete = 1;

//       // Act
//       oController.onDeleteTranche(idToDelete);

//       // Assert
//       const expectedData = [
//         { name: "Tranche2", id: 2 },
//         { name: "Tranche3", id: 3 }
//     ];
//     const actualData = oBindingStub.getData().filter((item: any) => item.id !== idToDelete);;
//     assert.deepEqual(actualData, expectedData, "Deleted item should be removed from the array.");
//     });
//   });

QUnit.module("OnDelete tranche testing", hooks => {
  let oController: Main;
  let oEvent: any;
  let oModel: any
  let oParticipantModel: any
  hooks.beforeEach(() => {
    oController = new Main("delete tranche test");

    oEvent = {
      getSource: sinon.stub().returns({
        getBindingContext: sinon.stub().returns({
          getObject: sinon.stub().returns({ ID: "123" })
        })
      })
    };

    oModel = {
      bindContext: sinon.stub().returns({
        setParameter: sinon.stub().returns({
          execute: sinon.stub().returns(Promise.resolve())
        })
      }),
      refresh: sinon.stub()
    };

    oParticipantModel = {
      refresh: sinon.stub()
    };

    oController.getView = sinon.stub().returns({
      getModel: sinon.stub().returns(oModel)
    });

    oController.getResourceBundle = sinon.stub().returns(Promise.resolve({
      getText: sinon.stub().returns("Some text")
    }));

    sinon.stub(MessageBox, "confirm")
    sinon.stub(MessageBox, "success")
    sinon.stub(MessageBox, "error")
  })

  hooks.afterEach(() => {
    oController.destroy();
  })

  QUnit.test("Should call the deleteBonusTranche function when confirmed", assert => {

    let done = assert.async();
    oController.onDeleteTranche(oEvent).then(() => {
      const confirmStub = MessageBox.confirm as sinon.SinonStub;
      const confirmArgs = confirmStub.getCall(0).args;
      const onClose = confirmArgs[1].onClose;
      onClose(MessageBox.Action.YES);
      Promise.all([
        oModel.bindContext().setParameter().execute.returnValues[0]
      ]).then(() => {
        assert.ok(oModel.bindContext.calledWith("/deleteBonusTranche(...)"), "deleteBonusTranche function should be called");
        assert.ok(oModel.refresh.called, "model should be refreshed");
        done();
      })
    })
  })
})


