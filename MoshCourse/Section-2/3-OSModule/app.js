const os = require('os');
var totalMem = os.totalmem();
var freeMem = os.freemem();
console.log(`Total memory: ${totalMem}`);
console.log(`Free memory: ${freeMem}`);