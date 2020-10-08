// Let and Const

//  VARIABLES
// ES5
var names5 = 'Jane Smith';
var age5 = 23;
names5 = 'Jane Miller';
console.log(names5);

// ES6
const name6 = 'Jane Smith';
let age6 = 23;
//name6 = 'Jane Miller';
console.log(name6);

// BLOCK SCOPE

// ES5
function driversLicense5(passedTest) {
    if (passedTest) {
        var firstName = 'John';
        var yearOfBirth = 1990;
        
    }
    console.log(firstName + ', born in ' + yearOfBirth + ', is now officially allowed to drive a car.');
}

driversLicense5(true);

// ES6

function driversLicense6(passedTest) {
    if (passedTest) {
        let firstName = 'John';
        const yearOfBirth = 1990;
    }
    console.log(firstName + ', born in ' + yearOfBirth + ', is now officially allowed to drive a car.');
}

driversLicense6(true);