//A vector type
class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    plus(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }
    minus(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5
//Groups ....
class Group {
    constructor() {
        this.data = new Map();
    }
    add(elem) {
        this.data.set(elem, elem);
    }
    delete(elem) {
        this.data.delete(elem);
    }
    toString() {
        return this.data.toString();
    }
    has(elem) {
        return this.data.has(elem);
    }
    static from(array) {
        let res = new Group();
        array.forEach(element => {
            res.add(element);
        });
        return res;
    }
    
    [Symbol.iterator]() {
        return new GroupIterator(this);
    }
}
/*
Group.prototype[Symbol.iterator] = function*() {
    for (let i = 0; i < this.members.length; i++) {
        yield this.members[i];
    }
};
*/

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false
console.log(group);
class GroupIterator {
    constructor(group) {
        this.group = group;
        this.iter = this.group.data[Symbol.iterator]();
    }
    next() { return this.iter.next(); }
}
/*Group.prototype[Symbol.iterator] = function () {
    return new GroupIterator(this);
};*/
let g = Group.from([1, 2, 3, 4]);
for (let value of g) {
    console.log(value[0]);
}
// → a
// → b
// → c
//Borrowing a method
let map = { one: true, two: true, hasOwnProperty: true };

// Fix this call
//console.log(map.hasOwnProperty("one"));
// → true
console.log(Object.prototype.hasOwnProperty.call(map, "one"));
console.log(Object.prototype.hasOwnProperty.call(map, "two"));
console.log(Object.prototype.hasOwnProperty.call(map, "hasOwnProperty"));
console.log(Object.prototype.hasOwnProperty.call(map, "test"));
console.log(Object.prototype.hasOwnProperty.call(map, "toString"));
