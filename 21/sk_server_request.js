let testJsonArray = [{
    "title": "Unituning",
    "presenter": "Jamal",
    "summary": "Modifying your cycle for extra style",
    "comments": []
}];
console.log(testJsonArray);
//JSON.stringify();
//JSON.parse();
console.log("/talks/" + encodeURIComponent("Test a live call"));
let PUT_request = `
PUT /talks/Test%20a%20live%20call HTTP/1.1
Content-Type: application/json
Content-Length: 92

{"presenter": "Maureen",
"summary": "Standing still on a unicycle"}
`;
//Adding a comment
let POST_Comment = `
POST /talks/Unituning/comments HTTP/1.1
Content-Type: application/json
Content-Length: 72

{"author": "Iman",
"message": "Will you talk about raising a cycle?"}
`;
let GET_callAndWait = `
GET /talks HTTP/1.1
If-None-Match: "4"
Prefer: wait=90`;
/// pass time ...
let GET_callAndWaitResp = `
HTTP/1.1 200 OK
Content-Type: application/json
ETag: "5"

Content-Length: 295
[....]
`;
