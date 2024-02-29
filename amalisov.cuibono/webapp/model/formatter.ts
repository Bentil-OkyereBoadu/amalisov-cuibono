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
    }
};
