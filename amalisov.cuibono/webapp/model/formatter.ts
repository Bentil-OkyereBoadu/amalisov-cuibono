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
        return Status !== "Locked" && Status !== "completed";
    },

    showSave(Status: string): boolean {
        return Status === "Open" || Status === "Running";
    },
    
    showComplete(Status: string): boolean {
        return Status === "Locked" || Status === "completed";
    },
};
