//import {days as dayNames} from "date-names";
//console.log(dayNames.length);
// → 7
requireV2.cache = Object.create(null);
function requireV2(name) {
    if (!(name in require.cache)) {
        let code = readFile(name);
        let module = { exports: {} };
        require.cache[name] = module;
        let wrapper = Function("require, exports, module", code);
        wrapper(require, module.exports, module);
    }
    return require.cache[name].exports;
}
function readFile(name) {
    return 'var x = 1;';
}

const weekDay = function () {
    const names = ["Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"];
    return {
        name(number) { return names[number]; },
        number(name) { return names.indexOf(name); }
    };
}();
console.log(weekDay.name(weekDay.number("Sunday")));
console.log(weekDay.name(-1));

// → Sunday
{
    const x = 1;
    function evalAndReturnX(code) {
        eval(code);
        return x;
    }
    console.log(evalAndReturnX("var x = 2"));
    // → 2
    console.log(x);
    // → 2
}
console.log("----------------");
{
    let plusOne = Function("n", "return n + 1;");
    console.log(plusOne(4));
    // → 5
}
console.log("----------------");
{
    const { formatDate } = require("./mod");
    console.log(formatDate(new Date(2017, 9, 13), "dddd the Do"));
    // → Friday the 13th
}
console.log("----------------");
{
    const { parse } = require("ini");
    console.log(parse("x = 10\ny = 20"));
    // → {x: "10", y: "20"}

}
console.log("----------------");
{
    // export default ["Winter", "Spring", "Summer", "Autumn"];
}
console.log("----------------");
var roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
];

function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

var roadGraph = buildGraph(roads);
const { find_path } = require("dijkstrajs");
let graph = {};
for (let node of Object.keys(roadGraph)) {
    let edges = graph[node] = {};
    for (let dest of roadGraph[node]) {
        edges[dest] = 1;
    }
}
console.log(find_path(graph, "Post Office", "Cabin"));
// → ["Post Office", "Alice's House", "Cabin"]

console.log("----------------");
{
    const { roadGraph } = require('./roads');
    console.log(roadGraph);
}