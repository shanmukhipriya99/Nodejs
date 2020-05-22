const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(message) {
        console.log(message);
        //raising an event
        this.emit('logged', {data: 'message'});
    }
}

module.exports = Logger;