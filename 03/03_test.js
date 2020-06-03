const square = function (x) {
    return x * x;
};
console.log(square(12));
//144

const makeNoise = function () {
    console.log("Pling!");
};
makeNoise();
// → Pling!
const power = function (base, exponent) {
    let result = 1;
    for (let count = 0; count < exponent; count++) {
        result *= base;
    }
    return result;
};
console.log(power(2, 10));
// → 1024

let x = 10;
if (true) {
    let y = 20;
    var z = 30;
    console.log(x + y + z);
    // → 60
}
// y is not visible here
try {
    console.log(y);
} catch (error) {
    console.log("y not found");
}
console.log("x + z= " + (x + z));
// → 40

const halve = function (n) {
    return n / 2;
};
let n = 10;
console.log(halve(100));
// → 50
console.log(n);
// → 10
console.log("-------------");
const hummus = function (factor) {
    const ingredient = function (amount, unit, name) {
        let ingredientAmount = amount * factor;
        if (ingredientAmount > 1) {
            unit += "s";
        }
        console.log(`${ingredientAmount} ${unit} ${name}`);
    };
    ingredient(1, "can", "chickpeas");
    ingredient(0.25, "cup", "tahini");
    ingredient(0.25, "cup", "lemon juice");
    ingredient(1, "clove", "garlic");
    ingredient(2, "tablespoon", "olive oil");
    ingredient(0.5, "teaspoon", "cumin");
};
let missileSystem = {
    launch: function (val) {
        console.log("starting missile " + val + " 3 2 1 ....")
    },
    safeMode: false
}
hummus(2);
console.log("----------");
let launchMissiles = function () {
    missileSystem.launch("now");
};
console.log("call 1");
launchMissiles();
missileSystem.safeMode = true;
if (missileSystem.safeMode) {
    launchMissiles = function () {/* do nothing */ };
}
console.log("call 2");
launchMissiles();
//declaring
function squaring(x) {
    return x * x;
}
console.log(squaring(15));
console.log("The future says:", future());
function future() {
    return "You'll never have flying cars";
}
console.log("-----------");
const powerFunc = (base, expo) => {
    let res = 1;
    for (let i = 0; i < expo; i++) {
        res *= base;
    }
    return res;
}
console.error(powerFunc(2, 10));

const square1 = (x) => { return x * x; };
const square2 = x => x * x;
console.error(square1(square2(4)));

const horn = () => {
    console.log("Toot /°\\/°\\ ");
};
horn()


function greet(who) {
    console.log("Hello " + who);
}
greet("Harry");
console.log("Bye");
function chicken() {
    return egg();
}
function egg() {
    return chicken();
}
try {
    console.log(chicken() + " came first.");
} catch (error) {
    console.log(error.message);
}

// → ?? Maximum call stack size exceeded
function squareOpt(x) { return x * x; }
console.log(squareOpt(4, true, "hedgehog"));
// → 16
function minus(a, b) {
    if (b === undefined) return -a;
    else return a - b;
}
console.log(minus(10));
// → -10
console.log(minus(10, 5));
// → 5

function powerDef(base, exponent = 2) {
    let result = 1;
    for (let count = 0; count < exponent; count++) {
        result *= base;
    }
    return result;
}
console.log(powerDef(4));
// → 16
console.log(powerDef(2, 6));
// → 64


console.log("COOL", "OK", 200);
// → C O 2
function wrapValue(n) {
    let local = n;
    return () => local;
}
let wrap1 = wrapValue(1);
let wrap2 = wrapValue(2);
console.log(wrap1());
// → 1
console.log(wrap2());
// → 2
const _100 = wrapValue(100);
console.log(_100());
console.log(_100());
const _200 = wrapValue(200);
console.log(_200());
//partial function using closure
function multiplier(factor) {
    return (number) => number * factor;
}
let twice = multiplier(2);
console.log(twice(5));
// → 10
function increment(cpt) {


    return (step) => cpt + step;
}
let inc1 = increment(1);
let inc100 = increment(100);
console.warn(inc1(2));
console.warn(inc1(3));
console.warn(inc1(4));
console.warn(inc1(5));

console.warn(inc100(5));
console.warn(inc100(6));
console.warn(inc100(7));
console.warn(inc100(8));
console.warn(inc100(9));
console.warn("------------");

function powerRec(base, exponent) {
    if (exponent == 0) {
        return 1;
    } else {
        return base * powerRec(base, exponent - 1);
    }
}
console.log(powerRec(2, 3));
// → 8

function findSolution(target) {
    function find(current, history) {
        if (current == target) {
            //console.log("*** found***");
            //console.log(`(${current},${history})***`)
            return history;
        } else if (current > target) {
            //console.error(`(${current},${history})`)
            return null;
        } else {
            //console.log(`(${current},${history})`)
            return find(current + 5, `(${history} + 5)`) || find(current * 3, `(${history} * 3)`);
        }
    }
    return find(1, "1");
}
console.log(findSolution(24));
// → (((1 * 3) + 5) * 3)
//console.log(findSolution(32));
console.error(null || "test");


console.log(findSolution(10));
function printFarmInventory(cows, chickens) {
    function formatData(data, len) {
        let dataF = data;
        while (dataF.length < len) {
            dataF = "0" + dataF;
        }
        return dataF;
    }
    let cowString = formatData(String(cows), 5);
    console.log(`${cowString} Cows`);
    let chickenString = formatData(String(chickens), 5);
    console.log(`${chickenString} Chickens`);
}
printFarmInventory(7, 11);
function printZeroPaddedWithLabel(number, label) {
    let numberString = String(number);
    while (numberString.length < 3) {
        numberString = "0" + numberString;
    }
    console.log(`${numberString} ${label}`);
}
function printFarmInventory2(cows, chickens, pigs) {
    printZeroPaddedWithLabel(cows, "Cows");
    printZeroPaddedWithLabel(chickens, "Chickens");
    printZeroPaddedWithLabel(pigs, "Pigs");
}
printFarmInventory2(7, 11, 3);


function zeroPad(number, width) {
    let string = String(number);
    while (string.length < width) {
        string = "0" + string;
    }
    return string;
}
function printFarmInventory3(cows, chickens, pigs) {
    console.log(`${zeroPad(cows, 3)} Cows`);
    console.log(`${zeroPad(chickens, 3)} Chickens`);
    console.log(`${zeroPad(pigs, 3)} Pigs`);
}
printFarmInventory3(7, 16, 3)

// Define f to hold a function value
const f = function (a) {
    console.log(a + 2);
};
// Declare g to be a function
function g(a, b) {
    return a * b * 3.5;
}
// A less verbose function value
let h = a => a % 3;

f(5);
console.log(g(4, 2));
console.log(h(10));
