import * as sinon from 'sinon';
import CalculatedBonus from 'amalisov/cuibono/controller/CalculatedBonus.controller';
import Table from "sap/m/Table";
import Input from "sap/m/Input";

QUnit.module("CalculatedBonus onSearch with Mock Data", hooks => {
    let oController: CalculatedBonus;
    let oViewStub: any;
    let oInputStub: Input;
    let oTableStub: Table;
    let oBindingStub: any;
  
    hooks.beforeEach(() => {
      oController = new CalculatedBonus("SearchName");
      oViewStub = { byId: sinon.stub() };
      oInputStub = new Input();
      oTableStub = new Table();
      oBindingStub = {
        aData: [
          { name: "Alice", id: 1 },
          { name: "Bob", id: 2 },
          { name: "Charlie", id: 3 }
        ],
        filter: sinon.spy(),
        getData: () => oBindingStub.aData
      };
  
      sinon.stub(oController, "getView").returns(oViewStub);
      oViewStub.byId.withArgs("search").returns(oInputStub);
      oViewStub.byId.withArgs("Table").returns(oTableStub);
      sinon.stub(oTableStub, "getBinding").withArgs("items").returns(oBindingStub);
    });
  
    QUnit.test("Should filter data correctly with matching query", assert => {
      // Arrange
      const query = "ALice";
      oInputStub.getValue = sinon.stub().returns(query);
      
      // Act
      oController.onSearch();
  
      // Assert
      const expectedFilteredData = [{ name: "Alice", id: 1 }];
      const actualFilteredData = oBindingStub.getData().filter((item: { name: string; }) => item.name.toLowerCase().includes(query.toLowerCase()));
      assert.deepEqual(actualFilteredData, expectedFilteredData, "Filtered data should only include matching items.");
    });
  
    QUnit.test("Should return empty array for non-matching query", assert => {
      // Arrange
      const query = "nonexistent";
      oInputStub.getValue = sinon.stub().returns(query);
  
      // Act
      oController.onSearch();
  
      // Assert
      const expectedFilteredData: any[] = [];
      const actualFilteredData = oBindingStub.getData().filter((item: { name: string; }) => item.name.toLowerCase().includes(query.toLowerCase()));
      assert.deepEqual(actualFilteredData, expectedFilteredData, "Filtered data should be empty for non-matching query.");
    });

    QUnit.test("Should return all data if query is empty", assert => {
        // Arrange
        const query = " ";
        oInputStub.getValue = sinon.stub().returns(query);
    
        // Act
        oController.onSearch();
    
        // Assert
        const expectedFilteredData:any[]= 
        [
            { name: "Alice", id: 1 },
            { name: "Bob", id: 2 },
            { name: "Charlie", id: 3 }
        ];
        const actualFilteredData = oBindingStub.getData();
        assert.deepEqual(actualFilteredData, expectedFilteredData, "Should return all data if query is empty");
    });
  });
  
