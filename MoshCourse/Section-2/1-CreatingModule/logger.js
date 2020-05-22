var url = 'http://mylogger.io/log';

function log(message) {
    console.log(message);
}

module.exports.log = log; // log is an object (method) in the exports object (useful when there are multiple methods)
//module.exports = log;
// log is a function
console.log(__filename);
console.log(__dirname);
