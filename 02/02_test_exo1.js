let str = "";
for (let i = 0; i < 7; i++) {
    str = str + "#";
    console.log(str);
}

function fizzBizz(len) {
    for (let i = 1; i < len + 1; i++) {
        if (i % 5 == 0 && i % 3 == 0) {
            console.log("FIZZBIZZ");
        }
        else if (i % 5 == 0 && i % 3 != 0) {
            console.log("BIZZ");
        } else if (i % 3 == 0) {
            console.log("FIZZ");
        } else {
            console.log(i);
        }

    }
}
fizzBizz(100);

function drawChess(len) {
    const diaz = "#";
    const star = ".";
    let car = star;
    for (let i = 0; i < len; i++) {
        let line = "|";
        if (i % 2 == 0) {
            car = star;
        } else {
            car = diaz;
        }
        for (let j = 0; j < len; j++) {
            line = line + car;
            if (car == diaz) {
                car = star;
            } else {
                car = diaz;
            }
        }
        console.log(line + "|");
    }
}
drawChess(11);