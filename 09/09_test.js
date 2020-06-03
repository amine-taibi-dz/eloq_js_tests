let re1 = new RegExp("abc");
let re2 = /abc/;
let eighteenPlus = /eighteen\+/;
console.log("eighteen+eighteeneighteen+test".indexOf("eighteen\+"));
console.log(eighteenPlus.test("eight!een+eight!eeneighteen+test"));
console.log(/abc/.test("abcde"));
// → true
console.log(/abc/.test("abxde"));
// → false
console.log(/[0123456789]/.test("in 1992"));
// → true
console.log(/[0-9]/.test("in 1992"));
// → true
console.log(/(0x[0-9A-Fa-f]+){2}/.test("0xFF1E0xee"));
let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d(:\d\d)*/;
console.log(dateTime.test("01-30-2003 15:20:15"));
// → true
console.log(dateTime.test("30-jan-2003 15:20"));
// → false
console.log(dateTime.test("01-30-2003 15:20:1"));
let notBinary = /[^01]/;
console.log(notBinary.test("1100100010100110"));
// → false
console.log(notBinary.test("1100100010200110"));
// → true
console.log(/'\d+'/.test("'123'"));
// → true
console.log(/'\d+'/.test("''"));
// → false
console.log(/'\d*'/.test("'123'"));
// → true
console.log(/'\d*'/.test("''"));
// → true
console.log("----------------");
let neighbor = /neighbou?r/;
console.log(neighbor.test("neighbour"));
// → true
console.log(neighbor.test("neighbor"));
// → true
console.log("----------------");
let dateTime0 = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(dateTime0.test("1-30-2003 8:45"));
// → true
console.log("----------------");
let cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("Boohoooohoohooo"));
// → true
console.log("----------------");
let match = /\d+/.exec("one two 100");
console.log(match);
// → ["100"]
console.log(match.index);
// → 8
console.log("one two 100".match(/\d+/));
// → ["100"]
console.log("----------------");
let quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'"));
// → ["'hello'", "hello"]
console.log(/bad(ly)?/.exec("bad"));
// → ["bad", undefined]
console.log(/(\d)+/.exec("123"));
// → ["123", "3"]
console.log("----------------");
console.log(new Date());
// → Mon Nov 13 2017 16:19:11 GMT+0100 (CET)
console.log(new Date(2019, 11, 9));
// → Wed Dec 09 2009 00:00:00 GMT+0100 (CET)
console.log(new Date(2019, 11, 9, 12, 59, 59, 999));
// → Wed Dec 09 2009 12:59:59 GMT+0100 (CET)
console.log(new Date(2019, 11, 19).getTime());
// → 1576710000000
console.log(new Date(1576710000000));
// → Thu Dec 19 2019 00:00:00 GMT+0100 (CET)
console.log(Date.now());
console.log("----------------");
function getDate(string) {
    console.log(/(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string));
    let [_, month, day, year] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
    return new Date(year, month - 1, day);
}
let dt = getDate("1-30-2019");
console.log(dt);
console.log(dt.getTimezoneOffset());
// → 2019-01-29T23:00:00.000Z
console.log("----------------");
console.log(/cat/.test("concatenate"));
// → true
console.log(/\bcat\b/.test("concatenate"));
// → false
console.log("----------------");
let animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
console.log(animalCount.test("15 pigs"));
console.log(animalCount.test("1 pig`s"));
console.log(animalCount.test("15 pigchickens"));
// → false
console.log("----------------");
console.log((/\b([01]+b|[\da-f]+h|\d+)\b/i.exec("! 101fh 25 10b")));
console.log(/^.*x/.exec("abcxe"));
console.log(/([01]+)+b/g.exec("0100000000001111011101010111110101010001b"));
console.log("----------------");
console.log("papa".replace("p", "m"));
// → mapa
console.log("----------------");
console.log("Borobudur".replace(/[ou]/, "a"));
// → Barobudur
console.log("Borobudur".replace(/[ou]/g, "a"));
// → Barabadar
console.log("<A>Liskov, Barbara\nMcCarthy, John\nWadler, Philip<A>".replace(/(\w+), (\w+)/g, "$2 $1"));
// → Barbara Liskov
// John McCarthy
// Philip Wadler
let s = "the cia, fbi and dea works together.";
console.log(s.replace(/\b(fbi|cia|dea)\b/g, str => str.toUpperCase()));
// → the CIA, FBI and DEA works together.
console.log("----------------");
let stock = "1 lemon, 2 cabbages, and 101 eggs";
function minusOne(match, amount, unit) {
    amount = Number(amount) - 1;
    if (amount == 1) { // only one left, remove the 's'
        unit = unit.slice(0, unit.length - 1);
    } else if (amount == 0) {
        amount = "no";
    }
    return amount + " " + unit;
}
console.log(stock = stock.replace(/(\d+) (\w+)/g, minusOne));
console.log(stock = stock.replace(/(\d+) (\w+)/g, minusOne));
console.log(stock = stock.replace(/(\d+) (\w+)/g, minusOne));
// → no lemon, 1 cabbage, and 100 eggs
console.log("---------------- GREEDY");
function stripComments(code) {
    console.error(code);
    return code.replace(/\/\/.*|\/\*[^]*\*\//g, "");
    //                   //.*|/*[^]**/ 
}
console.log(stripComments("1 + /* 2 */3"));
// → 1 + 3
console.log(stripComments("x = 10;// ten!"));
// → x = 10;
console.log(stripComments("1 /* a */+/* b */ 1"));
// → 1 1
function stripComments0(code) {
    return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}
console.log(stripComments0("1 /* a */+/* b */ 1"));
// → 1 + 1
console.log("----------------RegEx class");
let name = "harry";
let text = "Harry is a suspicious character, please harryup.";
let regexp = new RegExp("\\b(" + name + ")\\b", "gi");//(G)lobal case (I)nsensitive
console.log(text.replace(regexp, "_$1_"));
// → _Harry_ is a suspicious character
let name0 = "dea+hl[]rd";
let text0 = "This dea+hl[]rd guy is super annoying.";//deathlord
let escaped0 = name0.replace(/[\\[.+*?(){|^$]/g, "\\$&");
let regexp0 = new RegExp("\\b" + escaped0 + "\\b", "gi");
console.log(text0.replace(regexp0, "_$&_"));
// → This _dea+hl[]rd_ guy is super annoying.
console.log("----------------String's Search func");
console.log(" word".search(/\S/));
// → 2
console.log("  ".search(/\S/));
// → -1
let pattern0 = /y/g;
pattern0.lastIndex = 3;
let match0 = pattern0.exec("xyzzy");
console.log(match0.index);
// → 4
console.log(pattern0.lastIndex);
// → 5
console.log("----------------");
let global = /abc/g;
console.log("G---> " + global.exec("xyz abc"));
console.log("G---> " + global.exec("abcxyz abc"));
console.log("G---> " + global.exec("xabc yz abc"));

// → ["abc"]
let sticky = /abc/y;
console.log("Y---> " + sticky.exec("xyz abc"));
console.log("Y---> " + sticky.exec("abcxyz abc"));
console.log("Y---> " + sticky.exec("xabc yz abc"));
// → null
let digit = /\d/g;
console.log(digit.exec("here it is: 1"));
// → ["1"]
console.log(digit.exec("and now: 1"));
// → null
console.log("Banana".match(/an/g));
// → ["an", "an"]
console.log("----------------");
{
    let input = "A 5tr1ng with 3 num63rs in it... 42 and 88.";
    let number = /\b\d+\b/g;
    let match;
    while (match = number.exec(input)) {
        console.log("Found", match[0], "at", match.index);
    }
    //Found 3 at 14
    //Found 42 at 33
    //Found 88 at 40
}
console.log("----------------");
{
    let myIni = `\n
searchengine=https://duckduckgo.com/?q=$1\r\n
spitefulness=9.7\r\n
; comments are preceded by a semicolon...\r\n
; each section concerns an individual enemy\r\n
[larry]\r\n
fullname=Larry Doe\r\n
type=kindergarten bully\n
website=http://www.geocities.com/CapeCanaveral/11451\r\n
[davaeorn]\r\n
fullname=Davaeorn\r\n
type=evil wizard\r\n
outputdir=/home/marijn/enemies/davaeorn`;
    function parseINI(string) {
        // Start with an object to hold the top-level fields
        let result = {};
        let section = result;
        string.split(/\r?\n/).forEach(line => {
            let match;
            if (match = line.match(/^(\w+)=(.*)$/)) {
                section[match[1]] = match[2];
            } else if (match = line.match(/^\[(.*)\]$/)) {
                section = result[match[1]] = {};
            } else if (!/^\s*(;.*)?$/.test(line)) {
                throw new Error("Line '" + line + "' is not valid.");
            }
        });
        return result;
    }
    console.log(parseINI(`
name=Vasilis
[address]
city=Tessaloniki`));
    console.log("----------------");
    console.log(parseINI(myIni));
}
console.log("----------------");
{
    console.log(/🍎{3}/.test("🍎🍎🍎"));
    console.log(/🍎{3}/u.test("🍎🍎🍎"));
    // → false
    console.log(/<.>/.test("<🌹>"));
    // → false
    console.log(/<.>/u.test("<🌹>"));
    // → true
}
console.log("----------------");
console.log(/\p{Script=Greek}/u.test("α"));
// → true
console.log(/\p{Script=Arabic}/u.test("α"));
// → false
console.log(/\p{Alphabetic}/u.test("α"));
// → true
console.log(/\p{Alphabetic}/u.test("!"));
// → false
console.log(/\p{Script=Arabic}/u.test("ب"));
console.log("----------------");
console.log("----------------");
