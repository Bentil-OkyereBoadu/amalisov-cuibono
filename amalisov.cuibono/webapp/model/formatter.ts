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
        return Status !== "Locked" && Status !== "Completed"
    },

    statusLocked(Status: string): boolean {
        return Status !== "Completed";
    },
    
    showComplete(Status: string): boolean {
        return Status === "Locked" || Status === "Completed";
    },

    limitText(sVal: string): string {
		return sVal && sVal.length > 7 ? sVal.substring(0, 7) + '...' : sVal;
	},

    totalWeight(totalWeight: number): boolean {
      return totalWeight > 100
    },

    saveVisibility(Status: string, totalWeight:number): boolean {
        return (Status === "Open" || Status === "Running") && totalWeight <=100;
    },

    lockVisibility(Status: string, totalWeight:number): boolean {
        return (Status === "Open" || Status === "Running") && totalWeight === 100;
    },
    formatAmount(amount:number) {
        if (amount === null || amount === undefined) {
            return 0;
        }
        // Remove commas and any unwanted characters before conversion
        const cleanedAmount = amount.toString().replace(/,/g, '');
        const num = parseFloat(cleanedAmount);
        return Math.round(num * 100) / 100;
    }
};
