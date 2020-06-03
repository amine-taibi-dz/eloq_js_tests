function canYouSpotTheProblem() {
    "use strict";
    for (let counter = 0; counter < 10; counter++) {
        console.log("Happy happy");
    }
}
canYouSpotTheProblem();

"use strict";
function Person(name) { this.name = name; }
let ferdinand = Person("Ferdinand"); // oops
console.log(name);
// → Ferdinand
// (VillageState, Array) → {direction: string, memory: Array}
function goalOrientedRobot(state, memory) {
    // ...
}
function test(label, body) {
    if (!body()) console.log(`Failed: ${label}`);
}
test("convert Latin text to uppercase", () => {
    return "hello".toUpperCase() == "HELLO";
});
test("convert Greek text to uppercase", () => {
    return "Χαίρετε".toUpperCase() == "ΧΑΊΡΕΤΕ";
});
test("don't convert case-less characters", () => {
    return "لبي".toUpperCase() == "لبي";
});
function numberToString(n, base = 10) {
    let result = "", sign = "";
    if (n < 0) {
        sign = "-";
        n = -n;
    }
    do {
        result = String(n % base) + result;
        n = Math.floor(n / base);
    } while (n > 0 /*&& n>base*/);
    return sign +/*n+*/ result;
}
console.log(numberToString(5004, 10));
// → 1.5e-3231.3e-3221.3e-3211.3e-3201.3e-3191.3e…-3181.3
function lastElement(array) {
    if (array.length == 0) {
        return { failed: true };
    } else {
        return { element: array[array.length - 1] };
    }
}
console.log(lastElement([]));
console.log(lastElement([12, 14, "55", { b: 15 }, ["a"]]));

function firstElement(array) {
    if (array.length == 0) {
        throw new Error("firstElement called with []");
    }
    return array[0];
}
console.log(firstElement([12, 14, "55", { b: 15 }, ["a"]]));
let tab =[];
assert(tab.length!=0);
console.log(firstElement(tab));



