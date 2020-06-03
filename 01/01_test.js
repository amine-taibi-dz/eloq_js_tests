
var test = `half of 100 is ${100 / 2}`;
console.log(test);
console.log(2.998e8);
console.log(0.981==(.45+.45+.081));
var test1 ="bla\
    bla \n test \t tab";
console.log(test1);
console.log(Infinity - Infinity);
console.log(Infinity + Infinity);
console.log(Infinity * Infinity);
console.log(-1 * Infinity);
console.log((--Infinity));
console.log(`Down on the sea`,
"Lie on the ocean",
'Float on the ocean');
console.log("A newline character in JavaScript is written like \"\\n\".");
console.log(typeof 4.5)
// → number
console.log(typeof "x")
// → string
console.log(- (10 - 2))
console.log(3 > 2)
// → true
console.log(3 < 2)
// → false
console.log("Aardvark" < "Zoroaster");
// → true
console.log("Itchy" != "Scratchy");
// → true
console.log("Apple" == "Orange")
// → false
console.log(NaN == NaN);
// → false
console.log(Infinity==Infinity);
console.log(true && false);
// → false
console.log(true && true);
// → true
console.log(false || true);
// → true
console.log(false || false);
// → false
console.log(1 + 1 == 2 && 10 * 10 > 50);
console.log(true ? 1 : 2);
// → 1
console.log(false ? 1 : 2);
// → 2
console.log(null==undefined);
console.log(null!=undefined);
console.log(null===undefined);
console.log(null!==undefined);
console.log(null==0);
console.log(null===0);
console.log(typeof null);
console.log(typeof undefined);
console.log(8 * null)
// → 0
console.log("5" - 1)
// → 4
console.log("5" + 1)
// → 51
console.log("five" * 2)
//NaN
console.log(false == 0)
// → true
console.log(undefined + 1)
console.log(NaN+undefined);
console.log(undefined+undefined);
console.log(undefined-undefined);
console.log("Be "+undefined/NaN);
console.log(null == undefined);
// → true
console.log(null == 0);
// → false
console.log(null == {});
console.log(null == []);
console.log(null == '');
console.log(null == function(){});
console.log(0 == false,"" == false);
console.log(0 === false,"" === false);
console.log(null || "user")
// → user
console.log("Agnes" || "user")
// → Agnes
console.log(undefined || "user")
// → user
console.log(0 || -1 );
//produces -1, and 
console.log("" || "!?"); 
//yields "!?"
//short-circuit evaluation
console.log(true || 5/0);
console.log(false && 0/0);
