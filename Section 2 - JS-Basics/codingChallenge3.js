/***************
* Coding Challenge 3
*/

/*
* John and his family went on a holiday and went to 3 different restraunts.
* The bills were $124, $48, and $268.
* 
* To tip the waiter a fair amount, John created a simple tip calculator 
* (as a function). He likes to tip 20% of the bill when bill is less than
* $50, 15% when the bill is between $50 and $200, and 10% if the bill is 
* more than $200.
*
* In the end, John would like to have 2 arrays:
*   1) Containing all three tips (one for each bill).
*   2) Containing all three final paid amounts (bill + tip).
*
* (NOTE: to calculate 20% of a value, simple multiply if with
*    20/100 = 0.2)
*/


var bills = [124, 48, 268];
var tips = [];
var finalBill = [];

tipCal(bills[0]);
tipCal(bills[1]);
tipCal(bills[2]);

console.log(bills, tips, finalBill);

function tipCal(bill) {
    if (bill < 50) {
        tips.push(bill*0.2);
        finalBill.push(bill + (bill * 0.2));
    } else if (bill > 50 && bill < 200) {
        tips.push(bill * 0.15);
        finalBill.push(bill + (bill * 0.15));
    } else {
        tips.push(bill * 0.1);
        finalBill.push(bill + (bill * 0.1));
    }
}
