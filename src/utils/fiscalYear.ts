export function calculateFiscalYear(start_Date: string): string {
    const fiscalYearStart = new Date("2023-10-01");
    const startDate = new Date(start_Date);
    if (startDate >= fiscalYearStart) {
        return `${startDate.getFullYear()}`;
    } else {
        return `${startDate.getFullYear() - 1}`;
    }
}