using amalisov.cuibono.department as Depart from '../../db/department/department';

@path: 'department'
service Department {
    entity Department as projection on Depart.Department;
}
