const EventEmitter = require('events'); // First alphabets of EventEmitter are capital to indicate that it is a class
const emitter = new EventEmitter(); //instance/object of the class

emitter.on('messageLogged', function(){  //register a listener
    console.log('Listener called');
});

emitter.emit('messageLogged'); //raised an event
//order is imp
//always register the listener first and then raise an event
