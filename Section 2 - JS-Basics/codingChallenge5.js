/***************
 * Coding Challenge 5
 */

/*
* Recreate the tip calcualtor using more advacned tools.
*
* This time John and his family wne to 5 different restraunts. The bills were
* $124, $48, $268, $180, and $42. John likes to tip 20% of the bill when the
* bill is less than $50, 15% when the bill is between $50 and $200, and 10% 
* if the bill is over $200.
*
* Implement the tip calculator using objects and loops.
*   1. Create and object with an array for the bill values.
*   2. Add a method to calculate the tip.
*   3. This method should include a loop to iterate over all the paid bills
*       and do the tip calculations.
*   4. As an output, create 1) a new array containing all tips, and 2) an array
*       containing final paid amounts (bill + tip). HINT: Start with an two 
*       empty array [] as properties and then fill them up in the loop.
*
*
* EXTRA: After finishing, Mark's fmaily also went on a holiday, going to 4
*       different restraunts. The bills were $77, $375, $110, and $45. Mark
*       likes to tip 20% when the bill is les than $100, 10% if the bill is
*       between $100 and $300, and 25% if the bill is over $300.
*
*   5. Implement the same functionality for Mark's tipping rules.
*   6. Create a function, not a method, to calculate the average of a given
*       array of tips. HINT: Loop over the array with a running sum starting
*       at 0, then divide by the length of the array.
*   7. Calculate the average tip for each family.
*   8. Log to the conosle which family paid the highest average tip.
*/

johnFam = {
    bills:      [124, 48, 268, 180, 42],
    tips:       [],
    finalBills: [],
    calcTip: function() {
        for(var i = 0; i < this.bills.length; i++){
            switch(true) {
                case this.bills[i] < 50:
                    this.tips.push(this.bills[i] * 0.2);
                    this.finalBills.push(this.bills[i] + this.tips[i]);
                case this.bills[i] > 50 && this.bills[i] < 200:
                    this.tips.push(this.bills[i] * 0.15);
                    this.finalBills.push(this.bills[i] + this.tips[i]);
                case this.bills[i] > 200:
                    this.tips.push(this.bills[i] * 0.1);
                    this.finalBills.push(this.bills[i] + this.tips[i]);
            }
        }
    }
}

markFam = {
    bills:      [77, 375, 110, 45],
    tips:       [],
    finalBills: [],
    calcTip: function() {
        for(var i = 0; i < this.bills.length; i++){
            switch(true) {
                case this.bills[i] < 100:
                    this.tips.push(this.bills[i] * 0.2);
                    this.finalBills.push(this.bills[i] + this.tips[i]);
                case this.bills[i] > 100 && this.bills[i] < 300:
                    this.tips.push(this.bills[i] * 0.1);
                    this.finalBills.push(this.bills[i] + this.tips[i]);
                case this.bills[i] > 300:
                    this.tips.push(this.bills[i] * 0.25);
                    this.finalBills.push(this.bills[i] + this.tips[i]);
            }
        }
    }
}

function calcAverage(arr) {
    var sum = 0;
    for( var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return (sum / arr.length);
}

johnFam.calcTip();
markFam.calcTip();

if (calcAverage(johnFam.tips) > calcAverage(markFam.tips)) {
    console.log('John\'s family paid the highest tip with an average of', calcAverage(johnFam.tips));
} else {
    console.log('Mark\'s family paid the highest tip with an average of', calcAverage(markFam.tips));
}