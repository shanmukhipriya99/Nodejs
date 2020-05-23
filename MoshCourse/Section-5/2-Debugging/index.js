const startupDebugger = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');
const morgan = require('morgan');
const express = require('express');
const app = express();

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

//Db work...
// dbDebugger('Connected to the database...');

//like emitting an event
const port = process.env.PORT || 8080  //pORT is an env variable
app.listen(port, () => console.log(`Listening on port ${port}`));