const http = require('http');
//server is an EventEmitter
const server = http.createServer((req, res) => {
    if(req.url === '/'){  //we can change the response depending upon the url
        res.write('Hello World!');
        res.end();
    }
    if(req.url === '/courses') {
        res.write(JSON.stringify([ 1, 2, 3, 4])); //return array of objects(numbers in this case) using JSON
        res.end();
    }
}); 
//registering a listener but not applied in real world
// server.on('connection', (socket) => {
//     console.log('New Connection...');
// });
//raises an event
server.listen(3000);
console.log('Listening on port 3000...');
