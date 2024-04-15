export function calculateDays(initialDate: string, finishDate: string): number {
    const startDate = new Date(initialDate);
    const endDate = new Date(finishDate);
    return Math.ceil(Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
}

export function calculateAttendance(attend_start:string, attend_end:string, tranch_start:string, tranch_end:string): number {
    const attendanceStartDate = new Date(attend_start);
    const attendanceEndDate = new Date(attend_end);
    const tranchStartDate = new Date(tranch_start);
    const tranchEndDate = new Date(tranch_end);
    const truncatedStartDate = attendanceStartDate > tranchStartDate ? attendanceStartDate : tranchStartDate;
    const truncatedEndDate = attendanceEndDate < tranchEndDate ? attendanceEndDate : tranchEndDate;

    return calculateDays(truncatedStartDate.toISOString(), truncatedEndDate.toISOString());
}
