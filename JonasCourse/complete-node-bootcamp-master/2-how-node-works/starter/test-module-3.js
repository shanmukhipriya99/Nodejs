// runs once due to caching
console.log('From the module...');
// loads once and runs as many times as called
module.exports = () => console.log('Log this text!')