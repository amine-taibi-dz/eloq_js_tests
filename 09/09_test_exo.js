//Regexp golf
{
    //1. car and cat
    let reg1 = /^ca(r|t)$/;
    //2. pop and prop
    let reg2 = /^pr?op$/;
    //3. ferret, ferry, and ferrari
    let reg3 = /^ferr(et|y|ari)$/;
    //4. Any word ending in ious
    let reg4 = /^\w+ious$/;
    //5. A whitespace character followed by a period, comma, colon, or semicolon
    let reg5 = /^\s[.,:;]$/;
    //6. A word longer than six letters
    let reg6 = /^[\w]{7,}$/;
    //7. A word without the letter e (or E)
    let reg7 = /^[a-df-z]+$/i;
}
//Quoting style
let regexQuote = /((^|\b)'(\B|$)|(^|\B)'(\b|$)|(^|\B)'(\B|$))/g;
let regexQuote3 = /((^|\b)'(\b|$))/g;


let regexQuote2 = /(^|\W)'|'(\W|$)/g;
let text = "'I'm the cook,' he said, 'it's my job.'";
//'I#m the cook,' he said, 'it#s my job.'
console.log(text);
console.log("----> " + text.replace(/(^|\W)'|'(\W|$)/g, '$1"$2'));
// Change this call.
console.log("====> " + text.replace(regexQuote, '"'));
console.log("++++> " + text.replace(regexQuote3, '"'));


console.log(text.replace(regexQuote2, '"'));
// → "I'm the cook," he said, "it's my job."
//Numbers again
{
    // Fill in this regular expression.
    let number = /^((\+|\-)?\d*\.?(\d+)?)?((\.?(\d+)?)?e(\+|\-)?\d+)?$/i;
    //let number = /^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?$/;
    //               sign    55.555     
    // Tests:
    for (let str of ["1", "-1", "+15", "1.55", ".5", "5.", "1.3e2", "1E-4", "1e+12"]) {
        if (!number.test(str)) {
            console.log(`Failed to match '${str}'`);
        }
    }
    for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5",".5.", "1f5", "."]) {
        if (number.test(str)) {
            console.log(`Incorrectly accepted '${str}'`);
        }
    }
    let regExNumb = /^(-)?d*\.d*$/i;
}