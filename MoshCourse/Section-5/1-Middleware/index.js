const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true})); //key=val&key=val
app.use(express.static('public'));
app.use(helmet());

//configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));


if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}

app.use(logger);

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
];

//like registering a listener
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

//post method
app.post('/api/courses', (req,res) => {
    // const schema = {
    //     name: Joi.string().min(6).required()
    // };
    // const result = Joi.validate(req.body, schema);
    // if (result.error) {
    //     //400 - bad request
    //     res.status(400).send(result.error.details[0].message);
    //     return;
    // }
    const { error } = validateCourse(req.body); //object destructuring
    if (error) {  ///similar to result.error
        //400 - bad request
        return res.status(400).send(error.details[0].message);
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.get('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course not found.');
    res.send(course);
});

app.get('/api/posts/:year/:month', (req,res) => {
    res.send(req.params);
});

app.get('/api/posts/:year', (req, res) => {
    res.send(req.query);   // query parameters: ?sortBy=name   :stored in an object with key-value pairs
});

//put method
app.put('/api/courses/:id', (req,res) => {
    //check if course exists
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course not found.');
    
    //validate
    const { error } = validateCourse(req.body); //object destructuring
    if (error) {  ///similar to result.error
        //400 - bad request
        return res.status(400).send(error.details[0].message);
    }

    //update
    course.name = req.body.name;
    res.send(course); //return
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(6).required()
    };
    return Joi.validate(course, schema);
}

//delete method
app.delete('/api/courses/:id', (req, res) => {
    //check if course exists
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course not found.');
    //delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    
    res.send(course); //return
});
//like emitting an event
const port = process.env.PORT || 8080  //pORT is an env variable
app.listen(port, () => console.log(`Listening on port ${port}`));