const fs = require('fs');
const files = fs.readdirSync('./');  //Synchronous way
console.log(files);

const file = fs.readdir('./', function(err, result) {  //Asynchronous way (Most preferred)
    if (err) console.log("Error: " + err);
    else console.log("Result: " + result);
});