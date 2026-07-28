let person = {

    fname: 'John',
    lname: 'Doe',
    age: 30,
    fullName: function() {
        return this.fname+" "+this.lname
    }

}

module.exports = class Guy{

    workEligibilityStatus(age){
        if(age>=18){
            return true
        }
        else return false
    }

    get Location(){
        return 'Bangalore'
    }

    constructor(fname,lname){
        this.fname=fname
        this.lname=lname
    }

    get fullName(){
        return this.fname+" "+this.lname
    }

}

// console.log('Person age: '+person.age)
// console.log('Person name: '+person['name'])
person.gender= 'M'
// console.log(person)
/*
for (let key in person){
    console.log(key+" => "+person[key])
}

*/

console.log('Full name: '+person.fullName())
const val = [1,2,3,5]
let sum=0
for (let i=0;i<val.length;i++){
sum+=val[i]
}
console.log('Sum: '+sum)


const expenses = [12,34,54,77,15]
let totalExpense = 0
for (let value of expenses){
    totalExpense+=value
}
console.log("Total expenses: "+totalExpense)

for (let value of expenses){
    if (totalExpense>value)
    {
       totalExpense=value 
    }
}
console.log("Minimum expense: "+totalExpense)


for (let value of expenses){
    if (totalExpense<value)
    {
       totalExpense=value 
    }
}
console.log("Maximum expense: "+totalExpense)

let numbers = [1,2,3]
let num = new Array(numbers)
num[0]=20
console.log('Value of numbers: '+numbers)
console.log('Value of num: '+num)



let obj1 = { name: "A", address: { city: "Chennai" } };

let obj2 = { ...obj1 }; // shallow copy

obj2.name = "B";
obj2.address.city = "Delhi";

console.log(obj1.name);         // A ✅
console.log(obj1.address.city);

// let newGuy = new Guy('Pratham','Sahu')
// console.log('Work eligibility status: '+newGuy.workEligibilityStatus(12))
// console.log('Full name: '+newGuy.fullName)