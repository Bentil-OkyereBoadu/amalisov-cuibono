import JSONModel from "sap/ui/model/json/JSONModel";
import BindingMode from "sap/ui/model/BindingMode";

import Device from "sap/ui/Device";

interface Target {
    name: string;
    weight: number;
    achievement: number;
    description: string;
}

interface Tranche {
    ID: string;
    name: string;
    location: string;
    startDate: string;
    endDate: string;
	originDate: string;
    weight: number;
    description: string;
    Status: string;
    targets: Target[];
    totalWeight: number
}


export default {
	createDeviceModel: () => {
		const oModel = new JSONModel(Device);
		oModel.setDefaultBindingMode(BindingMode.OneWay);
		return oModel;
	},

	createUpdateModel: () => {
		const oData: Tranche = {
			ID: "",
            name: "",
            location: "",
            startDate: "",
            endDate: "",
			originDate: "",
            weight: 0,
            description: "",
            Status: "Open",
            targets: [],
            totalWeight: 0
		};
		const oModel = new JSONModel();
        oModel.setData(oData);

        return oModel;
	},

    createNewTargets: () => {
		const oData: Target = {
				name:"", 
				weight: null, 
				achievement: null,
                description:"",
		};
		const oModel = new JSONModel();
        oModel.setData(oData);

        return oModel;
	},
};
