const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

//In express, every route handler function(req,res) is a middleware function.
//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); //key=val&key=val
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

//configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));


if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...'); 
}

app.use(logger);

//like emitting an event
const port = process.env.PORT || 8080  //pORT is an env variable
app.listen(port, () => console.log(`Listening on port ${port}`));