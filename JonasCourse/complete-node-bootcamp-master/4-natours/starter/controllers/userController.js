const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handleFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// Route Handlers

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user tries to POST password data
  if (req.body.password || req.body.passwordConfirm) {
    next(new AppError('Cannot update password here', 400));
  }
  // 2) Filtered out unwanted field names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'Success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'sucess',
    data: null,
  });
});

exports.getUser = factory.getOne(User);

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not defined! Please use /signup',
  });
};
// Do not update password with this
exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);

exports.getAllUsers = factory.getAll(User);

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
