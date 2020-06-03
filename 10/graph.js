exports.buildGraph = function (edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
        if (!(from in graph)) graph[from] = Object.create(null);
        graph[from][to] = 1;
    }
    for (let [from, to] of edges) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
};