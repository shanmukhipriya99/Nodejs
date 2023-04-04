const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

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
    default: `${__dirname}/../../public/img/users/default.jpg`,
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [8, 'Password must have less atleast 8 characters'],
    select: false,
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
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
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

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  // subtracting 1 sec as sometimes this maybe delayed when
  // compared to the tome when the new jwt was created
  next();
});

userSchema.pre(/^find/, function (next) {
  // 'this' points to the current query: query middleware
  this.find({ active: { $ne: false } });
  next();
});

// Instance method-1
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
// Instance method-2
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10 // base 10 number
    );
    return JWTTimestamp < changedTimestamp;
  }
  // If not changed
  return false;
};
// Instance method-3
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 mins=>10 * 60sec * 1000ms
  return resetToken;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
