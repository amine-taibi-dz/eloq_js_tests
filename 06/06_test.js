let rabbit = {};
rabbit.speak = function (line) {
    console.log(`The rabbit says '${line}'`);
};
rabbit.speak("I'm alive.");
// → The rabbit says 'I'm alive.'

function speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
}
let whiteRabbit = { type: "white", speak };
let hungryRabbit = { type: "hungry", speak };
whiteRabbit.speak("Oh my ears and whiskers, how late it's getting!");
// → The white rabbit says 'Oh my ears and whiskers, how late it's getting!'
hungryRabbit.speak("I could use a carrot right now.");
// → The hungry rabbit says 'I could use a carrot right now.'

speak.call(hungryRabbit, "Burp!");

function normalize() {
    console.log(this.coords.map(n => n / this.length));
}
normalize.call({ coords: [0, 2, 3], length: 5 });
// → [0, 0.4, 0.6]
let empty = {};
console.log(empty.toString);
// → function toString()…{}
console.log(empty.toString());
// → [object Object]
console.log(Object.getPrototypeOf({}) == Object.prototype);
// → true
console.log(Object.getPrototypeOf(Object.prototype));
// → null
console.log(Object.keys(new Object({ t: 25, d: 15, jk: 100 })));

console.log(Object.getPrototypeOf(Math.max) == Function.prototype);
// → true
console.log(Object.getPrototypeOf([]) == Array.prototype);
// → true
let protoRabbit = {
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`);
    }
};
let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "killer";
killerRabbit.speak("SKREEEE!");
console.log(Object.getPrototypeOf(killerRabbit.speak));
// → The killer rabbit says 'SKREEEE!'
function makeRabbit(type) {
    let rabbit = Object.create(protoRabbit);
    rabbit.type = type;
    return rabbit;
}
makeRabbit("mickey").speak("rook!");

function Rabbit(type) {
    this.type = type;
}
Rabbit.prototype.speak = function (line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
};
let weirdRabbit = new Rabbit("weird");
weirdRabbit.speak("Cool");
console.log(Object.getPrototypeOf(Function) == Function.prototype);
console.log(Object.getPrototypeOf(Rabbit) == Function.prototype);
// → true
console.log(Object.getPrototypeOf(weirdRabbit) == Rabbit.prototype);
// → true

class Rabbity {
    constructor(type) {
        this.type = type;
    }
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`);
    }
}
let killerRabbity = new Rabbity("killer");
let blackRabbity = new Rabbity("black");
blackRabbity.speak("Dark");
let object = new class { getWord() { return "hello"; } };
console.log(Object.getPrototypeOf(object));
console.log(object.getWord());
// → hello
console.log("-----------");
Rabbity.prototype.teeth = "small";
console.log(killerRabbity.teeth);
// → small
killerRabbity.teeth = "long, sharp, and bloody";
console.log(killerRabbity.teeth);
blackRabbity.teeth = " gggggggg";
console.log(blackRabbity.teeth);
delete blackRabbity.teeth;
// → undef
console.log(blackRabbity.teeth);
delete (Rabbity.prototype.teeth);
console.log(blackRabbity.teeth);
console.log(killerRabbity.teeth);
// → small
console.log(Rabbity.prototype.teeth);
// → small
console.log(Array.prototype.toString == Object.prototype.toString);
// → false
console.log([1, 2].toString());
// → 1,2
console.log("-----------");
console.log(Object.prototype.toString.call([1, 2]));
// → [object Array]
console.log("-----------");
let ages = {
    Boris: 39,
    Liang: 22,
    Júlia: 62
};
console.log(`Júlia is ${ages["Júlia"]}`);
// → Júlia is 62
console.log("Is Jack's age known?", "Jack" in ages);
// → Is Jack's age known? false
console.log("Is toString's age known?", "toString" in ages);
// → Is toString's age known? true
console.log("toString" in Object.create(null));
// → false
console.log("-----------");
let ages0 = new Map();
ages0.set("Boris", 39);
ages0.set("Liang", 22);
ages0.set("Júlia", 62);
console.log(`Júlia is ${ages0.get("Júlia")}`);
// → Júlia is 62
console.log("Is Jack's age known?", ages0.has("Jack"));
// → Is Jack's age known? false
console.log(ages0.has("toString"));
// → false
console.log({ x: 1 }.hasOwnProperty("x"));
// → true
console.log({ x: 1 }.hasOwnProperty("toString"));
// → false
console.log("-----------");
Rabbity.prototype.toString = function () {
    return `a ${this.type} rabbit`;
};
console.log(String(blackRabbity));
// → a black rabbit
console.log("-----------");
let sym = Symbol("name");
console.log(sym == Symbol("name"));
// → false
Rabbity.prototype[sym] = 55;
console.log(blackRabbity[sym]);
// → 55
const toStringSymbol = Symbol("toString");
Array.prototype[toStringSymbol] = function () {
    return `${this.length} cm of blue yarn`;
};
console.log([1, 2].toString());
// → 1,2
console.log([1, 2][toStringSymbol]());
let stringObject = {
    [toStringSymbol]() { return "a jute rope"; }
};
console.log(stringObject[toStringSymbol]());
console.log(stringObject);
// → a jute rope
console.log("-----------");
let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next());
// → {value: "O", done: false}
console.log(okIterator.next());
// → {value: "K", done: false}
console.log(okIterator.next());
// → {value: undefined, done: true}

let tabIterator = [15, "'15'"][Symbol.iterator]();
console.log(tabIterator.next());
console.log(tabIterator.next());
console.log(tabIterator.next());
console.log("-----------");
class Matrix {
    constructor(width, height, element = (x, y) => undefined) {
        this.width = width;
        this.height = height;
        this.content = [];
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.content[y * width + x] = element(x, y);
            }
        }
    }
    get(x, y) {
        return this.content[y * this.width + x];
    }
    set(x, y, value) {
        this.content[y * this.width + x] = value;
    }
}

class MatrixIterator {
    constructor(matrix) {
        this.x = 0;
        this.y = 0;
        this.matrix = matrix;
    }
    next() {
        if (this.y == this.matrix.height) return { done: true };
        let value = {
            x: this.x,
            y: this.y,
            value: this.matrix.get(this.x, this.y)
        };
        this.x++;
        if (this.x == this.matrix.width) {
            this.x = 0;
            this.y++;
        }
        return { value, done: false };
    }
}
Matrix.prototype[Symbol.iterator] = function () {
    return new MatrixIterator(this);
};
let matrix = new Matrix(2, 2, (x, y) => `<value (${(x + 1) * (y + 1)})>`);
console.log(matrix.content);
for (let { x, y, value } of matrix) {
    //for (let e in matrix) {
    console.log(x, y, value);
    //console.log(e.x, e.y, e.value);
}
// → 0 0 value 0,0
// → 1 0 value 1,0
// → 0 1 value 0,1
// → 1 1 value 1,1

let varyingSize = {
    get size() {
        return Math.floor(Math.random() * 100);
    },
    get len() {
        return 10;
    }
};
console.log(varyingSize.size);
// → 73
console.log(varyingSize.size);
// → 49
console.log(varyingSize.len);
// → 49
class Temperature {
    constructor(celsius) {
        this.celsius = celsius;
    }
    get fahrenheit() {
        return this.celsius * 1.8 + 32;
    }
    set fahrenheit(value) {
        this.celsius = (value - 32) / 1.8;
    }
    static fromFahrenheit(value) {
        return new Temperature((value - 32) / 1.8);
    }
}
let temp = new Temperature(100);
console.log(temp.fahrenheit);
// → 71.6
temp.fahrenheit = 212;
console.log(temp.celsius);
// → 100
console.log(Temperature.fromFahrenheit(212).celsius);
console.log("-------------------------");

class SymmetricMatrix extends Matrix {
    constructor(size, element = (x, y) => undefined) {
        super(size, size, (x, y) => {
            if (x < y) return element(y, x);
            else return element(x, y);
        });
    }
    set(x, y, value) {
        super.set(x, y, value);
        if (x != y) {
            super.set(y, x, value);
        }
    }
}
let symMatrix = new SymmetricMatrix(5, (x, y) => `${(x+1)*(y+1)}`);
console.log(symMatrix.get(2, 3));
// → 3,2
console.log(new SymmetricMatrix(2) instanceof SymmetricMatrix);
// → true
console.log(new SymmetricMatrix(2) instanceof Matrix);
// → true
console.log(new Matrix(2, 2) instanceof SymmetricMatrix);
// → false
console.log([1] instanceof Array);
// → true