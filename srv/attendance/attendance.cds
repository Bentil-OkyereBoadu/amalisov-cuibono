using amalisov.cuibono.attendance as Attend from '../../db/attendance/attendace';

@path: 'attendance'
service Attendance {
    entity Attendance as projection on Attend.Attendance;
}
