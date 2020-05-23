function log(req, res, next) {  //each middleware function in a different file
    console.log('Logging...');
    next();
}

module.exports = log;