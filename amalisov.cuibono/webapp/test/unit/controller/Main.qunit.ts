// import QUnit from "qunit";
// import * as sinon from "sinon";
// import main from "../../../controller/Main.controller";
// // import JSONModel from "sap/ui/model/json/JSONModel";

// QUnit.module("Main Controller Tests", {
// 	beforeEach: function () {
// 		// Set up code for each test case
// 		this.oController = new main("newMain");

// 		// Stub getView and getModel to simulate the UI5 environment
// 		// const oViewStub = {
// 		//     getModel: sinon.stub().returns(new JSONModel())
// 		// };
// 		// sinon.stub(this.oController, "getView").returns(oViewStub);

// 		this.oViewStub = {
// 			byId: sinon.stub(),
// 		};
// 		this.oController.getView = sinon.stub().returns(this.oViewStub);

// 		//Mock input control
// 		this.oInputStub = {
// 			getValue: sinon.stub(),
// 		};
// 		this.oTableStub = {
// 			getBinding: sinon.stub(),
// 		};
// 		this.oBindingStub = {
// 			filter: sinon.stub(),
// 		};

// 		//setup stubs
// 		this.oViewStub.byId.withArgs("input").returns(this.oInputStub);
// 		this.oViewStub.byId.withArgs("Table").returns(this.oTableStub);
// 		this.oTableStub.getBinding.withArgs("items").returns(this.oBindingStub);
// 	},

// 	afterEach: function () {
// 		// Clean up code for each test case
// 		// this.oController.getView.restore();
// 		this.oController.destroy();
// 	},
// });


import * as sinon from 'sinon';
import Main from 'amalisov/cuibono/controller/Main.controller';
import JSONModel from "sap/ui/model/json/JSONModel";
import Table from "sap/m/Table";

QUnit.module("Participants Controller Tests", hooks => {
  let oMain: Main;
  let oViewStub: any;
  let oModel: JSONModel;
  let oTableStub: any;
  let oBindingStub: any;
  let oInputStub: any;

  hooks.beforeEach(() => {
      // Assuming 'Main' requires a string as the constructor argument
      oMain = new Main("MainControllerName");
      oModel = new JSONModel();
      oViewStub = {
          byId: sinon.stub(),
          setModel: sinon.stub()
      };
      oTableStub = new Table();
      oBindingStub = {
          filter: sinon.spy()
      };
      sinon.stub(oMain, "getView").returns(oViewStub);
      sinon.stub(oMain, "getModel").returns(oModel);
      oViewStub.byId.withArgs("Table").returns(oTableStub);
      oViewStub.byId.withArgs("tranche").returns(oInputStub);
      sinon.stub(oTableStub, "getBinding").withArgs("items").returns(oBindingStub);
  });
  // hooks.afterEach(() => {
  //     sinon.restore();
  // });


  QUnit.test("", assert => {
    // Arrange
  

   

    // Act


    // Assert
    
});


  QUnit.test("", assert => {
      // Arrange
   

      // Act
    
      
      // Assert

  });
});