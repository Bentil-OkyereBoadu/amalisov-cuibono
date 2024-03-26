import DateFormat from "sap/ui/core/format/DateFormat";

export default {
	formatValue: (value: string) => {
		return value?.toUpperCase();
	},
	formatDate: (sDate: string): string => {
        if (sDate) {
            const oDateFormat = DateFormat.getDateInstance({ pattern: "MM.dd.yyyy" });
            return oDateFormat.format(new Date(sDate));
        }
        return sDate;
    
	},
	statusEnabled(status: string): boolean {
        return status !== "Completed";
    },
    statusLocked(Status: string): boolean {
        return Status !== "Locked";
    }
};
