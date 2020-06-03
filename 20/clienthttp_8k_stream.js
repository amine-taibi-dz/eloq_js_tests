const { request } = require("http");
let content = process.argv[2] || "Hello Me";
request({
    hostname: "localhost",
    port: 8000,
    method: "POST"
}, resp => { resp.on("data", chunk => process.stdout.write(chunk.toString())); }).end(content);
// → HELLO SERVER
console.log(`process.argv0 = ${process.argv0}`);
