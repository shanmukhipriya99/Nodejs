const express = require('express');
const Joi = require('joi');
const router = express.Router();

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
];

//like registering a listener
router.get('/', (req, res) => {
    res.send(courses);
});

//post method
router.post('/', (req,res) => {
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

router.get('/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course not found.');
    res.send(course);
});

router.get('/api/posts/:year/:month', (req,res) => {
    res.send(req.params);
});

router.get('/api/posts/:year', (req, res) => {
    res.send(req.query);   // query parameters: ?sortBy=name   :stored in an object with key-value pairs
});

//put method
router.put('/:id', (req,res) => {
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
router.delete('/:id', (req, res) => {
    //check if course exists
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course not found.');
    //delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    
    res.send(course); //return
});

module.exports = router;