1;
!false;
45 + 17;
false && 0 / 0;
let caught = 5 * 5;
let ten = 10;
console.log(ten * ten);
// → 100
let mood = "light";
console.log(mood);
// → light
mood = "dark";
console.log(mood);
// → dark
let luigisDebt = 140;
luigisDebt = luigisDebt - 35;
console.log(luigisDebt);
// → 105
let one = 1, two = 2;
console.log(one + two);
// → 3
var name = "Ayda";
const greeting = "Hello ";
console.log(greeting + name);
// → Hello Ayda
try {
    greeting = "Bye ";//TypeError: Assignment to constant variable.
} catch (ex) {
    console.error("Assignment to constant variable " + ex.name);
}
console.log(greeting + name);
console.log("break case catch class const continue debugger default \
delete do else enum export extends false finally for \
function if implements import interface in instanceof let \
new package private protected public return static super \
switch this throw true try typeof var void while with yield");
console.log(Math.max(2, 4));
// → 4
console.log(Math.min(2, 4) + 100);
// → 102
if (1 + 1 == 2) console.log("It's true");
// → It's true
/*console.log(0);
console.log(2);
console.log(4);
console.log(6);
console.log(8);
console.log(10);
console.log(12);
*/
let number = 0;
while (number <= 12) {
    console.log(number);
    number = number + 2;
}
let result = 1;
let counter = 0;
while (counter < 10) {
    result = result * 2;
    counter = counter + 1;
}
console.log(result);
// → 1024
if (false != true) {
    console.log("That makes sense.");
    if (1 < 2) {
        console.log("No surprise there.");
    }
}

for (let number = 0; number <= 12; number = number + 2) {
    console.log(number);
}

let result1 = 1;
for (let counter = 0; counter < 10; counter = counter + 1) {
    result1 = result1 * 2;
}
console.log(result1);
// → 1024

for (let current = 200; ; current = current + 1) {
    if (current % 7 == 0) {
        console.log(current);
        break;
    }
}
// → 203
//console.log(current);//ReferenceError: current is not defined
