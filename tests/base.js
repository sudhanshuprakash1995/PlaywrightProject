const Person = require('./test')

class BaseTest extends Person{

    constructor(fname,lname){
        //  person = new Person('Prakash','Raj');
        super(fname,lname)
    }

    get Location(){
        return 'Chennai'
    }
    
}

let person = new BaseTest('Prakash','Kumar')
console.log(person.Location)
console.log(person.fullName)