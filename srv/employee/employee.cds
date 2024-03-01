using amalisov.cuibono.employee as Empl from '../../db/employee/employees';

@path: 'employee'
service Employees {
    entity Employees as projection on Empl.Employees;
}
