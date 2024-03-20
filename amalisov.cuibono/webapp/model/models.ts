import JSONModel from "sap/ui/model/json/JSONModel";
import BindingMode from "sap/ui/model/BindingMode";

import Device from "sap/ui/Device";

interface Target {
    TargetName: string;
    TargetWeight: number;
    Achieved: string;
}

interface Tranche {
    trancheID: string;
    TrancheName: string;
    Location: string;
    StartDate: string;
    EndDate: string;
	OriginDate: string;
    TrancheWeight: number;
    Description: string;
    Status: string;
    Targets: Target[];
}


export default {
	createDeviceModel: () => {
		const oModel = new JSONModel(Device);
		oModel.setDefaultBindingMode(BindingMode.OneWay);
		return oModel;
	},

	createUpdateModel: () => {
		const oData: Tranche = {
			trancheID: "",
            TrancheName: "",
            Location: "",
            StartDate: "",
            EndDate: "",
			OriginDate: "",
            TrancheWeight: 0,
            Description: "",
            Status: "",
            Targets: [{
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
