// CODING CHALLENGE

/*

    Suppose that you're working in a small town administration, and you're in 
        charge of two town elements:
            1. Parks
            2. Streets

    It's a very small town, so right now there are only 3 parks and 4 streets.
        All parks and streets have a name and a build year.

    At an end-of-year meeting, your boss wants a final report with the 
        following:
            1. Tree density of each park in the town (forumla: number of 
                    trees/park area)
            2. Average age of each town's park (forumla: sum of 
                    all ages/number of parks)
            3. The name of the park that has more than 1000 trees
            4. Total and average length of the town's streets
            5. Size classification of all streets: tiny/small/normal/big/huge. 
                If the size is unknown, the default is normal

    All the report data should be printed to the console.

    HINT: Use some of the ES6 features: classes, subclasses, template strings, 
        default parameters, maps, arrow functions, destructuring, etc.

*/

class Element{
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends Element {
    constructor(name, buildYear, parkArea, numOfTrees) {
        super(name, buildYear)
        this.area = parkArea;
        this.numOfTrees = numOfTrees;
    }

    treeDensity() {
        return Math.round((this.numOfTrees/this.area));
    }
}

class Street extends Element {
    constructor(name, buildYear, length, size = 3) {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }

    classifyStreet() {
        const classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');
        return classification.get(this.size);
    }
}


function average(arr) {
    var sum = arr.reduce((prev, cur, index) => prev + cur, 0);
    return [Math.round(sum), Math.round(sum/arr.length)];
}

function parksReport(arr) {
    console.log('-'.repeat(15) + ' Parks Report ' + '-'.repeat(15));

    // print the density
    arr.forEach(e => {
        console.log(`The tree density of ${e.name} is ${e.treeDensity()}`);
    });

    console.log();

    const ages = arr.map(e => new Date().getFullYear() - e.buildYear);
    const [totalAge, averageAge] = average(ages);
    console.log(`The average age of our ${arr.length} parks in town are ${averageAge}`);

    console.log();

    arr.forEach(e => {
        if (e.numOfTrees > 1000) {
            console.log(`${e.name} has ${e.numOfTrees}`);
        }
    });

    console.log();
}

function streetsReport(arr) {
    console.log('-'.repeat(15) + ' Streets Report ' + '-'.repeat(15));
    console.log();

    const [totalLengths, averageLengths] = average(arr.map(e => e.length));
    console.log(`The total length of all the streets in town is ${totalLengths}, and the average length is ${averageLengths}`);
    console.log();

    arr.forEach(e => {
        console.log(`${e.name} has the classificaton of ${e.classifyStreet()}`)
    })

}


const allParks = [new Park('Green Park', 1987, 0.2, 215),
                 new Park('National Park', 1894, 2.9, 3541),
                 new Park('Oak Park', 1953, 0.4, 949)];

const allStreets = [new Street('Ocean Avenue', 1999, 1.1, 4),
                   new Street('Evergreen Street', 2008, 2.7, 2),
                   new Street('4th Street', 2015, 0.8),
                   new Street('Sunset Boulevard', 1982, 2.5, 5)];

console.log();
parksReport(allParks);
console.log();
streetsReport(allStreets);
console.log();