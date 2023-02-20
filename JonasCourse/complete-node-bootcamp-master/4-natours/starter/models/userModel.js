const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    // maxLength: [40, 'Name must not have more than 40 characters'],
    // minLength: [10, 'Name must not have less than 10 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true, // not a validator, just converts it to lowercase
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [8, 'Password must have less atleast 8 characters'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Password is required'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
