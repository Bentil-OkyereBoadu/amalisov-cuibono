export default {
	formatValue: (value: string) => {
		return value?.toUpperCase();
	},
	statusEnabled(status: string): boolean {
        return status !== "Completed";
    }
};
