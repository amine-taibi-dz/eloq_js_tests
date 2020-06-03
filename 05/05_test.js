
require('./scripts.js')
let total = 0, count = 1;
while (count <= 10) {
    total += count;
    count += 1;
}
console.log(total);
//console.log(sum(range(1, 10)));

for (let i = 0; i < 3; i++) {
    console.log(i);
}
function repeatLog(n) {
    for (let i = 0; i < n; i++) {
        console.log(i);
    }
}
console.log("----");
function repeat(n, action) {
    for (let i = 0; i < n; i++) {
        action(i);
    }
}
repeat(3, console.log);
// → 0
// → 1
// → 2 
let labels = [];
repeat(5, i => {
    labels.push(`Unit ${i + 1}`);
});
console.log(labels);
// → ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"]
console.log("----");
function greaterThan(n) {
    return m => m > n;
}
let greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));
// → true
console.log("----");
function noisy(f) {
    return (...args) => {
        console.log("calling with", args);
        let result = f(...args);
        console.log("called with", args, ", returned", result);
        return result;
    };
}
console.log("----");
noisy(Math.min)(3, 2, 1);
// → calling with [3, 2, 1]
// → called with [3, 2, 1] , returned 1

console.log("----");
function unless(test, then) {
    if (!test) then();
}
repeat(5, n => {
    unless(n % 2 == 1, () => {
        console.log(n, "is even");
    });
});
// → 0 is even
// → 2 is even
console.log("----");
["A", "B"].forEach(l => console.log(l));
// → A
// → B
console.log("----");

let t = {
    name: "Coptic",
    ranges: [[994, 1008], [11392, 11508], [11513, 11520]],
    direction: "ltr",
    year: -200,
    living: false,
    link: "https://en.wikipedia.org/wiki/Coptic_alphabet"
}

function filter(array, test) {
    let passed = [];
    for (let element of array) {
        if (test(element)) {
            passed.push(element);
        }
    }
    return passed;
}
console.log(filter(SCRIPTS, script => script.living));
// → [{name: "Adlam", …}, …]
console.log("----");
console.log(SCRIPTS.filter(s => s.direction == "ttb"));
// → [{name: "Mongolian", …}, …]
console.log("----map");
function map(array, transform) {
    let mapped = [];
    for (let element of array) {
        mapped.push(transform(element));
    }
    return mapped;
}
let rtlScripts = SCRIPTS.filter(s => s.direction == "rtl");
console.log(map(rtlScripts, s => s.name));
// → ["Adlam", "Arabic", "Imperial Aramaic", …]
console.log("---- reduce");
function reduce(array, combine, start) {
    let result = start;
    array.forEach(element => {
        result = combine(result, element);
    });
    return result;
}
console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));
console.log([1, 2, 3, 4].reduce((a, b) => a + b));
console.log([1, 2, 3, 4].reduce((a, b) => a + b, 0));
function characterCount(script) {
    return script.ranges.reduce((count, [from, to]) => {
        return count + (to - from);
    }, 0);
}
console.log(SCRIPTS.reduce((a, b) => {
    return characterCount(a) < characterCount(b) ? b : a;
}));
// → {name: "Han", …}
// → 10
let biggest = null;
for (let script of SCRIPTS) {
    if (biggest == null ||
        characterCount(biggest) < characterCount(script)) {
        biggest = script;
    }
}
console.log(biggest);
// → {name: "Han", …} 89_000
console.log("---- compose");
function average(array) {
    return (array.reduce((a, b) => a + b)) / array.length;
}
console.log(Math.round(
    average(
        SCRIPTS.filter(s => s.living)
            .map(s => s.year))));
// → 1165
console.log(Math.round(
    average(
        SCRIPTS.filter(s => !s.living)
            .map(s => s.year))));
// → 204
let total1 = 0, count1 = 0;
for (let script of SCRIPTS) {
    if (script.living) {
        total1 += script.year;
        count1 += 1;
    }
}
console.log(Math.round(total1 / count1));
console.log(average([7, 8, 9]));
// → 1165
console.log("----");
function characterScript(code) {
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => {
            return code >= from && code < to;
        })) {
            return script;
        }
    }
    return null;
}
console.log(characterScript("L".charCodeAt(0)));
// → {name: "Latin", …}
console.log("----");
// Two emoji characters, horse and shoe
let horseShoe = "🐴👟";
console.log(horseShoe.length);
// → 4
console.log(horseShoe[0]);
// → (Invalid half-character)
console.log(horseShoe.charCodeAt(0));
// → 55357 (Code of the half-character)
console.log(horseShoe.codePointAt(0));
// → 128052 (Actual code for horse emoji)
let roseDragon = "🌹🐉";
for (let char of roseDragon) {
    console.log(char);
}
// → 🌹
// → 🐉
function countBy(items, groupName) {
    let counts = [];
    for (let item of items) {
        let name = groupName(item);
        let known = counts.findIndex(c => c.name == name);
        if (known == -1) {
            counts.push({ name, count: 1 });
        } else {
            counts[known].count++;
        }
    }
    return counts;
}
console.log(countBy([1, 2, 3, 4, 5], n => n > 2));
console.log("----");
function textScripts(text) {
    let scripts = countBy(text, char => {
        let script = characterScript(char.codePointAt(0));
        return script ? script.name : "none";
    }).filter(({ name }) => name != "none");
    
    let total = scripts.reduce((n, { count }) => n + count, 0);
    if (total == 0) return "No scripts found";
    return scripts.map(({ name, count }) => {
        return `${Math.round(count * 100 / total)}% ${name}`;
    }).join(", ");
}
console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));
// → 61% Han, 22% Latin, 17% Cyrillic
console.log("----");
console.log("----");