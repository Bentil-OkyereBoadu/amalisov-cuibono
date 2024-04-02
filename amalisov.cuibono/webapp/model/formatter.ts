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

	statusEnabled(status: string): boolean {
        return status !== "Completed";
    },

    statusLocked(Status: string): boolean {
        return Status !== "Locked" && Status !== "Completed";
    },

    showSave(Status: string): boolean {
        return Status === "Open" || Status === "Running";
    },
    
    showComplete(Status: string): boolean {
        return Status === "Locked" || Status === "Completed";
    },
};
