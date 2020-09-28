/********************
 * Coding Challenge 4
 */

/*
* Let's remember the first coding challenge where Mark and John compared their
* BMIs. Let's now implement the same functionality with objects and methods.
*
*   1. For each of them, create an object with properties for their full name, 
*       mass, and height.
*   2. Then, add a method to each object to calculate the BMI. Save the BMI to
*       to the object and also return it from the method.
*   3. In the end, log to the console who has the highest BMI, together with
*       the full name and the respective BMI. Don't forget they might have the
*       same BMI.
*
*   REMEMBER: BMI = mass / (height * height)
*/

var john = {
    firstName:  'John',
    lastName:   'Smith',
    height:      2.75,
    mass:        89,
    calcuateBMI: function() {
        return (this.mass / (this.height * this.height));
    }
};

var mark = {
    firstName:  'Mark',
    lastName:   'Jones',
    height:      3.5,
    mass:        78,
    calcuateBMI: function() {
        return (this.mass / (this.height * this.height));
    }
};

john.BMI = john.calcuateBMI();
mark.BMI = mark.calcuateBMI();

if (john.BMI > mark.BMI) {
    console.log(john.firstName, john.lastName, 
            'has the highest BMI. His BMI is', john.BMI);
} else {
    console.log(mark.firstName, mark.lastName, 
        'has the highest BMI. His BMI is', mark.BMI);
}