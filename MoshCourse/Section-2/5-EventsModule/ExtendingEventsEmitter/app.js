const EventEmitter = require('events');

const Logger = require('./logger'); //PascalCase to depict a class
const logger = new Logger();

// register a listener
logger.on('logged', (e) => {  //using logger instead of this since it needs to be linked back to the Logger class
    console.log('Logged', e);
});

logger.log('Hi!'); //is required to call the log function from the Logger class in logger.js