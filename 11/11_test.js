var bigOak = require("./crow-tech").bigOak;
var greatPine = require("./crow-tech").greatPine;
var butcherShop = require("./crow-tech").butcherShop;
var defineRequestType = require("./crow-tech").defineRequestType;
var everywhere = require("./crow-tech").everywhere;

if (false) {
    console.log("--------------------");
    setTimeout(() => console.log("Tick"), 1500);

}
if (false) {
    console.log("--------------------");
    bigOak.readStorage("food caches", caches => {
        let firstCache = caches[0];
        bigOak.readStorage(firstCache, info => {
            console.log(info);
        });
    });
}
if (false) {
    console.log("--------------------");
    defineRequestType("note", (nest, content, source, done) => {
        console.log(`${nest.name} received note: ${content} from [${source}]!`);
        done();
    });
    bigOak.send("Cow Pasture", "note", "Let's caw loudly at 7PM",
        () => console.log("Note delivered."));
}
if (false) {
    console.log("-------------------- PROMISE");
    let fifteen = Promise.resolve(15);// direct value no calclus
    console.log(fifteen);
    fifteen.then((x) => { console.log(`Got ${x}`); });
    function storage(nest, name) {
        return new Promise(func => {
            nest.readStorage(name, res => func(res));
        });
    }
    storage(bigOak, "enemies").then(value => console.log(`Got: < ${value.toString()} >END`));
    //storage(bigOak, "enemies").then(value => console.log("Got:", value));
    new Promise((_, reject) => reject(new Error("Fail error!")))
        .then(value => console.log("Handler 1"))
        .catch(reason => {
            console.log("Caught failure " + reason);
            return "nothing";
        })
        .then(value => console.log("Handler 2", value));
    // → Caught failure Error: Fail
    // → Handler 2 nothing

}
if (false) {
    console.log("--------------------");
    var Timeout = class Timeout extends Error { }
    function request(nest, target, type, content) {
        return new Promise((resolve, reject) => {
            let done = false;
            function attempt(n) {
                nest.send(target, type, content, (failed, value) => {
                    done = true;
                    if (failed) reject(failed);
                    else resolve(value);
                });
                setTimeout(() => {
                    if (done) return;
                    else if (n < 3) attempt(n + 1);
                    else reject(new Timeout("Timed out"));
                }, 250);
            }
            attempt(1);
        });
    }
    function requestType(name, handler) {
        defineRequestType(name, (nest, content, source, callback) => {
            try {
                Promise.resolve(handler(nest, content, source))
                    .then(response => callback(null, response),
                        failure => callback(failure));
            } catch (exception) {
                callback(exception);
            }
        });
    }
    requestType("Nota Bene", () => "let N.B.");
    let p = request(bigOak, "Cow Pasture", "Nota Bene", "Let's caw loudly at 7PM");
    //console.log(p);
    p.then(v => console.log(`good ==>${v}`));
    requestType("ping", () => "pong");
    function availableNeighbors(nest) {
        let requests = nest.neighbors.map(neighbor => {
            return request(nest, neighbor, "ping")
                .then(() => true, () => false);
        });
        return Promise.all(requests).then(result => {
            return nest.neighbors.filter((_, i) => result[i]);
        });
    }
    console.log(bigOak.neighbors);
    let allPromises = availableNeighbors(bigOak);
    console.log(allPromises);
    allPromises.then(v => console.log(`good Neighbors ==>${v}`));


    everywhere(nest => {
        nest.state.gossip = [];
    });
    function sendGossip(nest, message, exceptFor = null) {
        nest.state.gossip.push(message);
        for (let neighbor of nest.neighbors) {
            if (neighbor == exceptFor) continue;
            request(nest, neighbor, "gossip", message);
        }
    }
    let pGossip = requestType("gossip", (nest, message, source) => {
        if (nest.state.gossip.includes(message)) return;
        //else 
        console.log(`${nest.name} received gossip '${message}' from ${source}`);
        sendGossip(nest, message, source);
    });
    console.log("--" + pGossip);

    let pG = request(bigOak, "Cow Pasture", "gossip", "HOOKING");
    pG.then(v => console.log("++++++++++>" + v));
    //everywhere(n=>console.log(n.state));
}
if (true) {
    console.log("--------------------");
    defineRequestType("note", (nest, content, source, done) => {
        console.log(`${nest.name} received note: ${content} from [${source}]!`);
        done();
    });
    var Timeout = class Timeout extends Error { }
    function request(nest, target, type, content) {
        return new Promise((resolve, reject) => {
            let done = false;
            function attempt(n) {
                nest.send(target, type, content, (failed, value) => {
                    done = true;
                    if (failed) reject(failed);
                    else resolve(value);
                });
                setTimeout(() => {
                    if (done) return;
                    else if (n < 3) attempt(n + 1);
                    else reject(new Timeout("Timed out"));
                }, 250);
            }
            attempt(1);
        });
    }
    function requestType(name, handler) {
        defineRequestType(name, (nest, content, source, callback) => {
            try {
                Promise.resolve(handler(nest, content, source))
                    .then(response => callback(null, response),
                        failure => callback(failure));
            } catch (exception) {
                callback(exception);
            }
        });
    }

    requestType("connections", (nest, { name, neighbors }, source) => {
        let connections = nest.state.connections;
        if (JSON.stringify(connections.get(name)) == JSON.stringify(neighbors)) return;
        connections.set(name, neighbors);
        broadcastConnections(nest, name, source);
    });
    function broadcastConnections(nest, name, exceptFor = null) {
        for (let neighbor of nest.neighbors) {
            if (neighbor == exceptFor) continue;//don't loop !
            //else other neighbors
            request(nest, neighbor, "connections",
                { name, neighbors: nest.state.connections.get(name) }
            );
        }
    }
    everywhere(nest => {
        nest.state.connections = new Map;
        nest.state.connections.set(nest.name, nest.neighbors);
        broadcastConnections(nest, nest.name);
    });
    //everywhere(n => console.log(n.name + "---> ", n.state.connections));

    function findRoute0(from, to, connections) {
        let work = [{ at: from, via: null }];
        for (let i = 0; i < work.length; i++) {
            let { at, via } = work[i];
            for (let next of connections.get(at) || []) {
                if (next == to) return via;
                if (!work.some(w => w.at == next)) {
                    work.push({ at: next, via: via || next });
                }
            }
        }
        return null;
    }
    function findRoute(from, to, connections) {
        let work = [{ at: from, via: null }];
        for (let i = 0; i < work.length; i++) {
            let { at, via } = work[i];
            for (let next of connections.get(at) || []) {
                if (next == to) return via;
                if (!work.some(w => w.at == next)) {
                    work.push({ at: next, via: via || next });
                }
            }
        }
        return null;
    }
    requestType("route", (nest, { target, type, content }) => {
        return routeRequest(nest, target, type, content);
    });

    function routeRequest(nest, target, type, content) {
        if (nest.neighbors.includes(target)) {
            console.log(`**** PATHS --> FROM ${nest.name} TO ${target}`);
            return request(nest, target, type, content);
        } else { 
            let allConnection = new Map;
            
            everywhere(nest => { 
                for(let k of nest.state.connections.keys()){
                    allConnection.set(k,nest.state.connections.get(k));
                }
            });
            let via = findRoute(nest.name, target, allConnection);//nest.state.connections);
            if (!via) throw new Error(`No route to ${target} from ${nest.name} `);
            return request(nest, via, "route", { target, type, content });
        }
    }
    //everywhere(nest => { console.log(nest.state.connections) });
    let req100 = request(bigOak, "Cow Pasture", "connections",
        { name: bigOak.name, neighbors: bigOak.state.connections.get(bigOak.name) });
    req100.then(v => console.log(v));


    let routeReq1 = routeRequest(bigOak, butcherShop.name, "note", "help me my God");
    routeReq1.then(v => console.log(v), r => console.error(r.message));
    let routeReq3 = routeRequest(bigOak, "Gilles's Garden", "note", "help me my God");
       routeReq3.then(v => console.log(v), r => console.error(r.message));
    let routeReq2 = routeRequest(bigOak, greatPine.name, "note", "help me my God");
       routeReq2.then(v => console.log(v), r => console.error(r.message));


    requestType("storage", (nest, name) => storage(nest, name));
    function findInStorage(nest, name) {
        return storage(nest, name).then(found => {
            if (found != null) return found;
            else return findInRemoteStorage(nest, name);
        });
    }

    function network(nest) {
        return Array.from(nest.state.connections.keys());
    }
    function findInRemoteStorage(nest, name) {
        let sources = network(nest).filter(n => n != nest.name);
        function next() {
            if (sources.length == 0) {
                return Promise.reject(new Error("Not found"));
            } else {
                let source = sources[Math.floor(Math.random() * sources.length)];
                sources = sources.filter(n => n != source);
                return routeRequest(nest, source, "storage", name)
                    .then(value => value != null ? value : next(), next);
            }
        }
        return next();
    }
    function storage(nest, name) {
        return new Promise(func => {
            nest.readStorage(name, res => func(res));
        });
    }

    async function findInStorage2(nest, name) {
        let local = await storage(nest, name);
        if (local != null) return local;
        let sources = network(nest).filter(n => n != nest.name);
        while (sources.length > 0) {
            let source = sources[Math.floor(Math.random() * sources.length)];
            sources = sources.filter(n => n != source);
            try {
                let found = await routeRequest(nest, source, "storage", name);
                if (found != null) return found;
            } catch (_) { }
        }
        throw new Error("Not found");
    }

    findInStorage2(bigOak, "enemies").then(value => console.log(`Got: <2 ${value.toString()} >END`));
    findInStorage(greatPine, "cache under the hedge").then(value => console.log(`Got: <1 ${value.toString()} >END`));

    function anyStorage(nest, source, name) {
        if (source == nest.name) return storage(nest, name);
        else return routeRequest(nest, source, "storage", name);
    }
    async function chicks(nest, year) {
        let list = "";
        await Promise.all(network(nest).map(async name => {
            list = list + `${name}: ${await anyStorage(nest, name, `chicks in ${year}`)}\n`;
        }));
        return list;
    }
    chicks(bigOak, 2018).then(console.log);
    async function chicksOk(nest, year) {
        let lines = network(nest).map(async name => {
            return name + ": " +
                await anyStorage(nest, name, `chicks in ${year}`);
        });
        return (await Promise.all(lines)).join("\n");
    }
    chicksOk(bigOak, 2016).then(console.log);
    async function locateScalpel(nest) {
        let current = nest.name;
        for (;;) {
          let next = await anyStorage(nest, current, "scalpel");
          if (next == current) return current;
          current = next;
        }
      }
      
      function locateScalpel2(nest) {
        function loop(current) {
          return anyStorage(nest, current, "scalpel").then(next => {
            if (next == current) return current;
            else return loop(next);
          });
        }
        return loop(nest.name);
      }
      
      locateScalpel(bigOak).then(console.log);
      // → Butcher's Shop
      locateScalpel2(bigOak).then(console.log);
      // → Butcher's Shop

}
if (false) {
    console.log("--------------------");
    function* powers(n) {
        for (let current = n; ; current *= n) {
            yield current;
        }
    }
    for (let power of powers(3)) {
        if (power > 5000) break;
        console.log(power);
    }
    // → 3
    // → 9
    // → 27

}
if (false) {
    console.log("--------------------");
    try {
        setTimeout(() => {
            //throw new Error("Woosh");
        }, 20);
    } catch (_) {
        // This will never run
        console.log("Caught!");
    }
    let start = Date.now();
    setTimeout(() => {
        console.log("Timeout ran at", Date.now() - start);
    }, 20);
    while (Date.now() < start + 200) {

    }
    console.log("Wasted time until", Date.now() - start);
    // → Wasted time until 50
    // → Timeout ran at 55
    Promise.resolve("Done").then(console.log);
    console.log("Me first!");
    // → Me first!
    // → Done
}
if (false) {
    console.log("--------------------");
}
if (false) {
    console.log("--------------------");
}

if (false) {
    console.log("--------------------");
}
if (false) {
    console.log("--------------------");
}
if (false) {
    console.log("--------------------");
}