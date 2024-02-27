using amalisov.cuibono.dummy as Dum from '../../db/dummy/dummy';

@path: 'dummy'
service Dummy {

    entity Dummy as projection on Dum.Dummy;

    action dosomething() returns String;

}