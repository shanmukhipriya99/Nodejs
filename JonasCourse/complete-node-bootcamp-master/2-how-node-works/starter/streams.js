const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // Sol 1 (Not good for production level as it's time taking)
  //   fs.readFile('./test-file.txt', (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });
  // Sol 2: Streams (rate of incoming vs rate of outgoing creates back-pressure)
  //   const readable = fs.createReadStream('./test-file.txt');
  //   readable.on('data', (chunk) => {
  //     res.write(chunk);
  //   });
  //   readable.on('end', () => {
  //     res.end();
  //   });
  //   readable.on('error', (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end('File not found');
  //   });
  // Sol 3
  const readable = fs.createReadStream('./test-file.txt');
  readable.pipe(res); // solves the back-pressure problem
  //readableSource.pipe(writeableDest) => readable.pipe(res)
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening...');
});
