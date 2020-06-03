const { readFile } = require("fs").promises;
readFile(process.argv[2] || process.argv[1], "utf8")
    .then(text => console.log("The file contains:", text))
    .catch(reason => console.error(reason.message));