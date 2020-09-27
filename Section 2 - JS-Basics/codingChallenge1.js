/******************************
 * Coding Challenge 1
 */

 /*
 Mark and John are trying to compare their BMI (Body Mass Index), which is
 calculated using the formula:

 BMI = mass / height^2 = mass / (height *height)
 (mass in kg and height in meters)

  1. Store Mark's and John's mass and height in variables.
  2. Calculate both their BMI's
  3. Create a boolean variable containing information about whether Mark has a
     higher BMI than John.
  4. Print a string to the console containing the variable from step 3. (something
     like "Is Mark's BMI higher than John's? true").
*/

var jBMI, mBMI, jHeight, mHeight, jMass, mMass;

mMass = 78;
jMass = 89;
mHeight = 3.5;
jHeight = 2.75;

mBMI = mMass / (mHeight * mHeight);
jBMI = jMass / (jHeight * jHeight);

console.log('Is Mark\'s BMI higher than John\'s?', 
    (mBMI > jBMI));