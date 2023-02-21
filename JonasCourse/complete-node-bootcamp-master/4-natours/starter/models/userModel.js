const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    validate: {
      // This only works on CREATE & SAVE!
      // User.create() || User.save()
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwrods do not match!',
    },
  },
});

// Document middleware for encrypting passwords
userSchema.pre('save', async function (next) {
  // only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // hash the password with a cost of 12 => Salting
  this.password = await bcrypt.hash(this.password, 12);
  // delete this field
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
