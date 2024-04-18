using amalisov.cuibono.dummy as Dum from '../../db/dummy/dummy';

@path: 'dummy'
service Dummy {

    entity Dummy as projection on Dum.Dummy;
     // Where to call the action 
    action dosomething() returns String;
    function returnSomething() returns String;

}