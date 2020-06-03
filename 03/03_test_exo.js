//Min
let minimum = (a, b) => (a > b) ? b : a;
console.log(minimum(15, 20));
console.log(minimum(30, 15));
console.log(minimum(15, 15));
//recurs
function oddOrEven(num) {
    function parity(nb) {
        if (nb == 0) {
            return "Even";
        } else if (nb == 1) {
            return "Odd";
        } else {
            return parity(nb - 2);
        }
    }
    function isEven(nb) {
        if (nb == 0) {
            return true;
        } else if (nb == 1) {
            return false;
        } else {
            return parity(nb - 2);
        }
    }
    console.log(`${num} is ${parity(Math.abs(num))}`);
    console.log(`${num} is ${isEven(Math.abs(num)) ? "Even" : "Odd"}`);
}

oddOrEven(50);
oddOrEven(75);
oddOrEven(-1);
//Bean counting
function countB(str) {
    let count = 0;
    for (let index = 0; index < str.length; index++) {
        if (str[index] == "B") {
            count++;
        }
    }
    return count;
}
console.log(countB("Baby have a Bean"));

function countCar(str) {


    return (car) => {
        let count = 0;
        for (let index = 0; index < str.length; index++) {
            if (str[index] == car) {
                count++;
            }
        }
        return count;
    }

}
let myStr = countCar("Baby have a Bean Bool")
console.log(myStr("B"));
console.log(myStr("a"));
//console.log(countCar("Baby have a Bean", "B"));