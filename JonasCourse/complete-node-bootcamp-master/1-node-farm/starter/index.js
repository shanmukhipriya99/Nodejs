const fs = require('fs');
const http = require('http');

/* --------- hello world --------- */

// const hello = 'Hello World';
// console.log(hello);

/* --------- fs: sync --------- */

// blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on: ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

/* --------- fs: async --------- */

// Non-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//     console.log(data);
// });
// Another way [CALLBACK HELL]
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);

//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('File has been written 🥳')
//             })
//         });
//     });
// });

/* --------- server --------- */
const server = http.createServer((req, res) => {
    console.log(req);
    res.end('Hey, from the server!🤗')
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening on port 8000');
});
