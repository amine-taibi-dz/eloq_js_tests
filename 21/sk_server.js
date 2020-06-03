const { createServer } = require("http");
const Router = require("./router");
const ecstatic = require("ecstatic");

const router = new Router();
const defaultHeaders = { "Content-Type": "text/plain" };

class SkillShareServer {
    constructor(talks) {
        this.talks = talks;
        this.version = 0;
        this.waiting = [];
        let fileServer = ecstatic({ root: "./public" });
        this.server = createServer((request, response) => {
            let resolved = router.resolve(this, request);
            if (resolved) {
                resolved.catch(error => {
                    if (error.status != null) return error;
                    return { body: String(error), status: 500 };
                }).then(({ body,
                    status = 200,
                    headers = defaultHeaders }) => {
                    response.writeHead(status, headers);
                    response.end(body);
                });
            } else {
                fileServer(request, response);
            }
        });
    }
    start(port) {
        this.server.listen(port);
    }
    stop() {
        this.server.close();
    }
}

//GET Talks like Promise see async
const talkPath = /^\/talks\/([^\/]+)$/;
router.add("GET", talkPath, async (server, title) => {
    if (title in server.talks) {
        return {
            body: JSON.stringify(server.talks[title]),
            headers: { "Content-Type": "application/json" }
        };
    } else {
        return { status: 404, body: `No talk '${title}' found` };
    }
});
// DELETE a talk as promise see async 204 for no content
router.add("DELETE", talkPath, async (server, title) => {
    if (title in server.talks) {
        delete server.talks[title];
        server.updated();
    }
    return { status: 204 };
});
// read stream 
function readStream(stream) {
    return new Promise((resolve, reject) => {
        let data = "";
        stream.on("error", reject); // ==> on error
        stream.on("data", chunk => data += chunk.toString()); // ==> on data event data-concat
        stream.on("end", () => resolve(data)); // ==> on end event finalize the data
    });
}
// PUT EVENT
//$ curl -X PUT -H "Content-Type: application/json" -d '{"presenter":"debouse","summary":"bla bla"}' http://localhost:8000/talks

router.add("PUT", talkPath, async (server, title, request) => {
    let requestBody = await readStream(request);
    let talk;
    try { talk = JSON.parse(requestBody); }
    catch (_) { return { status: 400, body: "Invalid JSON" }; }
    if (!talk ||
        typeof talk.presenter != "string" ||
        typeof talk.summary != "string") {
        return { status: 400, body: "Bad talk data" };
    }
    server.talks[title] = {
        title,
        presenter: talk.presenter,
        summary: talk.summary,
        comments: []
    };
    server.updated();
    return { status: 204 };
});
//Add my comments
router.add("POST", /^\/talks\/([^\/]+)\/comments$/, async (server, title, request) => {
    let requestBody = await readStream(request);
    let comment;
    try {
        comment = JSON.parse(requestBody);
    } catch (_) {
        return { satatus: 400, body: "Invalide JSON." }
    }
    if (!comment ||
        typeof comment.author !== "string" ||
        typeof comment.message !== "string") {
        return { satatus: 400, body: "Bad comment Data." }
    } else if (title in server.talks) {
        server.talks[title].comments.push(comment);
        server.updated();
        return { satatus: 204 };
    } else {
        return { satatus: 404, body: `No talks with the title ${title}` }
    }
});

// add ETag ==> entity Tag
SkillShareServer.prototype.talkResponse = function () {
    let talks = [];
    for (let title of Object.keys(this.talks)) {
        talks.push(this.talks[title]);
    }
    return {
        body: JSON.stringify(talks),
        headers: {
            "Content-Type": "application/json",
            "ETag": `"${this.version}"`
        }
    };
};

//GET talks with Prefer an If-None-Match
/*
GET / talks HTTP / 1.1
If - None - Match: "4"
Prefer: wait = 90
*/
router.add("GET", /^\/talks$/, async (server, request) => {
    let tag = /"(.*)"/.exec(request.headers["if-none-match"]);
    let wait = /\bwait=(\d+)/.exec(request.headers["prefer"]);
    if (!tag || tag[1] != server.version) {
        return server.talkResponse();
    } else if (!wait) {
        return { status: 304 };
    } else {
        return server.waitForChanges(Number(wait[1]));
    }
});
// waiting array ...
SkillShareServer.prototype.waitForChanges = function (time) {
    return new Promise(resolve => {
        this.waiting.push(resolve);
        setTimeout(() => {
            if (!this.waiting.includes(resolve)) return;
            this.waiting = this.waiting.filter(r => r != resolve);
            resolve({ status: 304 });
        }, time * 1000);
    });
};
const { readFileSync, writeFile } = require("fs");

const fileName = "./talks.json";

function loadTalks() {
    let json;
    try {
        json = JSON.parse(readFileSync(fileName, "utf8"));
    } catch (e) {
        json = {};
    }
    return Object.assign(Object.create(null), json);
}

//wakes up all waiting requests
SkillShareServer.prototype.updated = function () {
    this.version++;
    let response = this.talkResponse();
    this.waiting.forEach(resolve => resolve(response));
    this.waiting = [];
    writeFile(fileName, JSON.stringify(this.talks), e => { if (e) throw e; });
};



//new SkillShareServer(Object.create(null)).start(8000);
new SkillShareServer(loadTalks()).start(8000);
