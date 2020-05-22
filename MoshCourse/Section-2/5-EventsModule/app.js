const EventEmitter = require('events'); // First alphabets of EventEmitter are capital to indicate that it is a class
const emitter = new EventEmitter(); //instance/object of the class
//register a listener
emitter.on('messageLogged', (e) => { //can pass arguments: arg/e/eventArg  
    console.log('Listener called', e); //arrow function used
});
//raised an event
emitter.emit('messageLogged', { id: 1, url: 'google.com'}); 
//order is imp
//always register the listener first and then raise an event

//exercise- Raise: logging (data: message)
//listener
emitter.on('logging', (e) => {
    console.log('Logging', e);
});
//raising event
emitter.emit('logging', { data: "message"});