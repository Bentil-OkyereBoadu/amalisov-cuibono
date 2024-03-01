namespace amalisov.cuibono.department;

using {
    managed,
    cuid
} from '@sap/cds/common';

using amalisov.cuibono.employee as employee from '../employee/employees.model';


entity Department : cuid, managed {
    name      : String;
    bonus     : Integer;
    employees : Association to many employee.Employees
                    on employees.department = $self;
}
