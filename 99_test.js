//test yield and generators
function* IdGenerator() {
    let id = 0;
    while (true) { yield ++id; }
}
let iter = IdGenerator();
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.return());

console.log(iter.next().value);