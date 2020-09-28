/*****************
 * Coding Challenge 2
 */

 /*
 * John and Mike both play basketball in different teams. In the latest 3 games,
 * John's team scored 89, 120, and 103 points, while Mike's team scored 116, 94,
 * and 123 points.
 * 
 * 1. Calculate the average score for each team.
 * 2. Decide which team wins in average (highest average score), and print the
 *      winner to the console. Also include the average score in the output.
 * 3. The change the scores to show different winners. Don't forget to take into
 *      account there might be a draw (the same average score).
 * 4. EXTRA: Mary also plays basketball, and her team scored 97, 134, and 105 
 *      points. Like before, log the average winner to the console. HINT: you
 *      will need the && operator to take the decision. If you can't solve this
 *      one, just watch the solution, it's no problem :)
 * 5. Like before, change the scores to generate different winners, keeping in
 *      mind there might be a draw.
 */

var johnScore1 = 89;
var johnScore2 = 120;
var johnScore3 = 103;

var mikeScore1 = 116;
var mikeScore2 = 94;
var mikeScore3 = 123;

var maryScore1 = 97;
var maryScore2 = 134;
var maryScore3 = 105;

var johnAverage = (johnScore1 + johnScore2 + johnScore3) / 3;
var mikeAverage = (mikeScore1 + mikeScore2 + mikeScore3) / 3;
var maryAverage = (maryScore1 + maryScore2 + maryScore3) / 3;

switch (true) {
    case (mikeAverage > johnAverage && mikeAverage > maryAverage):
        console.log('Mike\'s team had the most points with', mikeAverage, 'average points.');
        break;
    case (johnAverage > mikeAverage && johnAverage > maryAverage):
        console.log('John\'s team had the most points with', johnAverage, 'average points.');
        break;
    case (maryAverage > mikeAverage && maryAverage > johnAverage):
        console.log('Mary\'s team had the most points with', maryAverage, 'average points.');
        break;
    default:
        console.log('There is a draw and no one won!');
}