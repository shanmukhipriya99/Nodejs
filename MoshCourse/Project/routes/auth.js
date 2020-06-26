const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//POST method for registering new users
router.post('/', async (req, res) => {
     //validating
     const {error} = validate(req.body);
     if(error) return res.status(400).send(error.details[0].message); //400 - Bad Request
     
     let user = await User.findOne({ email: req.body.email });
     if(!user) return res.status(400).send('Invalid email/password...');
     //
     const validPassword = await bcrypt.compare(req.body.password, user.password);
     if(!validPassword) return res.status(400).send('Invalid email/password...');

     const token = user.generateAuthToken();  //not to be stored on the server!!
     res.send(token);
});

// Information Expert Principle


function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    };
    return Joi.validate(req, schema);
}
module.exports = router;