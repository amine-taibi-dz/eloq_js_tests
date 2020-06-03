require('./scripts.js')
//Flattening
function flattening(array2d){
    return  array2d.reduce((arr, elem)=> arr.concat(elem));//,[] 
}
console.log(flattening([[1,2,3],[0],[200,300]]));
//Your own loop
// It takes a value, a test function, an update function, and a body function
function loop(value,test,update,body){
    for(;test(value);value =update(value))body(value);
}
let idx=0;
loop(idx,e=>e<20,e=>e+1,e=>console.log(`idx -> ${e}`));
//Everything
function every(array,predicate){
    return array.reduce((result,elem)=>(result&&predicate(elem)));
}
console.log(every([1,5,3],e=>e%2==1));
function everyLoop(array,predicate){
    let result = true;
    array.forEach(element => {
        result = result && predicate(element);
    });

    return result;
}
console.log(everyLoop([1,5,3],e=>e%2==1));

//Domin
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


function countBy(items, groupName) {
    let counts = [];
    for (let item of items) {
        let direction = groupName(item);
        let known = counts.findIndex(c => c.direction == direction);
        if (known == -1) {
            counts.push({ direction, count: 1 });
        } else {
            counts[known].count++;
        }
    }
    return counts;
}

function dominantDirection(text) {
    let scripts = countBy(text, char => {
        let script = characterScript(char.codePointAt(0));
        return script ? script.direction : "none";
    }).filter(({ direction }) => direction != "none");
    
    return (scripts.reduce((e1,e2) => {
        return e1.count < e2.count ? e2 : e1;
    })).direction;
}
console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl