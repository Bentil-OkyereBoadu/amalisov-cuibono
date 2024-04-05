export function calculateDays(initialDate: string, finishDate: string): number {
    const startDate = new Date(initialDate);
    const endDate = new Date(finishDate);
    return Math.ceil(Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
}
