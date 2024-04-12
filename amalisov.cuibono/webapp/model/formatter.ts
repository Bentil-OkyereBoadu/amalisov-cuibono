import DateFormat from "sap/ui/core/format/DateFormat";

export default {
	formatValue: (value: string) => {
		return value?.toUpperCase();
	},
	formatDate: (sDate: string): string => {
        if (sDate) {
            const oDateFormat = DateFormat.getDateInstance({ pattern: "dd.MM.yyyy" });
            return oDateFormat.format(new Date(sDate));
        }
        return sDate;
    
	},

    statusEnabled(Status: string): boolean {
        return Status !== "Locked" && Status !== "completed"
    },

    statusLocked(Status: string): boolean {
        return Status !== "completed";
    },
    
    showComplete(Status: string): boolean {
        return Status === "Locked" || Status === "Completed";
    },

    limitText(sVal: string): string {
		return sVal && sVal.length > 10 ? sVal.substring(0, 10) + '...' : sVal;
	},

    totalWeight(totalWeight: number): boolean {
      return totalWeight > 100
    },

    saveVisibility(Status: string, totalWeight:number): boolean {
        return (Status === "Open" || Status === "Running") && totalWeight <=100;
    },

    lockVisibility(Status: string, totalWeight:number): boolean {
        return (Status === "Open" || Status === "Running") && totalWeight === 100;
    }

};
