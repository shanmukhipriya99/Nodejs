const auth = require('../middleware/auth');  //authorization
const jwt = require('jsonwebtoken'); 
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req,res) => {
     const user = await User.findById(req.user._id).select('-password');
     res.send(user); 
});

//POST method for registering new users
router.post('/', async (req, res) => {
     //validating
     const {error} = validate(req.body);
     if(error) return res.status(400).send(error.details[0].message); //400 - Bad Request
     let user = await User.findOne({ email: req.body.email });
     if(user) return res.status(400).send('User already registered...');
     //create
     user = new User(_.pick(req.body, ['name', 'email', 'password']));
     const salt = await bcrypt.genSalt(10); //no. of times to run the alg. to generate the salt
     user.password = await bcrypt.hash(user.password, salt);
     await user.save();

     const token = user.generateAuthToken();
     res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));  //view
});

module.exports = router;