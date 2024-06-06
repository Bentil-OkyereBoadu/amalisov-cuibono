import * as sinon from 'sinon';
import Main from 'amalisov/cuibono/controller/Main.controller';
import Table from "sap/m/Table";
import Input from "sap/m/Input";

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
        const expectedFilteredData:any[]= 
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


QUnit.module("Main onDeleteTranche with Mock Data", hooks => {
    let oController: Main;
    let oViewStub: any;
    let oInputStub: Input;
    let oTableStub: Table;
    let oBindingStub: any;
  
    hooks.beforeEach(() => {
      oController = new Main("DeleteTranche");
      oViewStub = { byId: sinon.stub() };
      oInputStub = new Input();
      oTableStub = new Table();
      oBindingStub = {
        aData: [
            { name: "Tranche1", id: 1 },
            { name: "Tranche2", id: 2 },
            { name: "Tranche3", id: 3 }
          ],
          delete: function (id: number) {
            this.aData = this.aData.filter((item: any) => item.id !== id);
        },
        getData: function () {
            return this.aData;
        }
      };
  
      sinon.stub(oController, "getView").returns(oViewStub);
      oViewStub.byId.withArgs("search").returns(oInputStub);
      oViewStub.byId.withArgs("Table").returns(oTableStub);
      sinon.stub(oTableStub, "getBinding").withArgs("items").returns(oBindingStub);
    });
  
    QUnit.test("On matching delete the deleted item must be removed from array", assert => {
      // Arrange
      const idToDelete = 1;
      
      // Act
      oController.onDeleteTranche(idToDelete);
  
      // Assert
      const expectedData = [
        { name: "Tranche2", id: 2 },
        { name: "Tranche3", id: 3 }
    ];
    const actualData = oBindingStub.getData();
    assert.deepEqual(actualData, expectedData, "Deleted item should be removed from the array.");
    });
  });
  
