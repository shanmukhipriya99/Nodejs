require('express-async-errors');
const config = require('config');
const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();

if(!config.get('jwt')) {
    console.log('FATAL ERROR: jwt is not defined');
    process.exit(1); //0->Success
}


//middleware



const port = process.env.PORT || 8080;
app.listen(8080, console.log(`Listening on port ${port}...`));