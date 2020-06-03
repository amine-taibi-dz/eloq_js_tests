//range sum
function range(start, end, step = 1) {
    let res = [];
    for (let i = start; step > 0 ? i <= end : i >= end; i += step) {
        res.push(i);
    }
    return res;
}

console.log(range(5, 2, -1));
function sum(arr) {
    let res = 0;
    for (let v of arr) {
        res += v;
    }
    return res;
}
console.log(sum(range(5, 2, -1)));
//Reversing an array

function reverseArray(arr) {
    let result = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        result.push(arr[i]);
    }
    return result;

}
console.log(reverseArray([1, 2, 3]))
function reverseArrayInPlace(array) {
    for (let index = 0; index < (array.length / 2); index++) {
        let offset = array.length - index - 1;
        let temp = array[index];
        array[index] = array[offset];
        array[offset] = temp;
    }
    return array;
}

console.log(reverseArrayInPlace([1, 20, 3, 14, 5, 6]))

///LISTS 
function add(elem, rest) {
    return { elem: elem, rest: rest };
}
function arrayToList(array) {
    /*if(array.length==0){
        return prepend(null,null);
    }  else*/

    if ((array.length == 1)) {
        return add(array[0], null);
    } else {
        return add(array[0], arrayToList(array.slice(1, array.length)));
    }
}
let myVal = arrayToList([1, 2, 3, 4])
console.log(myVal);
function listToArray(list) {
    let res = [];
    let point = list;
    while (point != null) {
        res.push(point.elem);
        point = point.rest;
    }
    return res;
}

console.log(listToArray(myVal));
function prepend(elem, list) {
    let nouv = { elem: elem, rest: list };
    return nouv;
}
let nouvel = prepend(100, myVal);
console.log(nouvel);
console.log(listToArray(nouvel));
function nth(list, index) {
    let result;
    let point = list;
    let i = 0;
    while (point != null && i < index) {
        point = point.rest;
        i++;
    }
    if (point != null) {
        result = point.elem;
    }

    return result;

}
console.log(nth(nouvel, 40));
function nth2(list, n) {
    if (!list) return undefined;
    else if (n == 0) return list.value;
    else return nth2(list.rest, n - 1);
}
console.log(nth2(nouvel, 4));
function deepEqual(a, b) {
    if (a === b) return true;

    if (a == null || typeof a != "object" ||
        b == null || typeof b != "object") return false;

    let keysA = Object.keys(a), keysB = Object.keys(b);

    if (keysA.length != keysB.length) return false;

    for (let key of keysA) {
        if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
    }

    return true;
}

let obj = { here: { is: "an" }, object: 2 };
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, { here: 1, object: 2 }));
// → false
console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }));
  // → true