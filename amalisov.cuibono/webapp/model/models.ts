import JSONModel from "sap/ui/model/json/JSONModel";
import BindingMode from "sap/ui/model/BindingMode";

import Device from "sap/ui/Device";

interface Target {
    TargetName: string;
    TargetWeight: number;
    Achieved: string;
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
            Status: "",
            targets: [{
				TargetName:"", 
				TargetWeight: 0, 
				Achieved: ""
			}
			]
		};
		const oModel = new JSONModel();
        oModel.setData(oData);

        return oModel;
	},
};
