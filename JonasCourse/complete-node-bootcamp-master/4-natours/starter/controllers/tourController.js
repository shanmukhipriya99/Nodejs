// const fs = require('fs');
const Tour = require('../models/tourModel');

// Route Handlers
// const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour id: ${val}`);
//   if (parseInt(val, 10) > tours.length) {
//     return res.status(404).json({
//       status: 'Fail',
//       message: 'Invalid id',
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   console.log(req.body);
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'Fail',
//       message: 'Missing required info',
//     });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  try {
    console.log(req.query);
    // BUILD the query
    // 1. Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2. Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // { difficulty: easy, duration: { $gte: 5 } } => What MongoDB requires...
    // { duration: { gte: '5' }, difficulty: 'easy' } => What is parsed...
    // const query = Tour.find(queryObj); // to be able to perform advanced filtering on the obj
    const query = Tour.find(JSON.parse(queryStr));

    // EXECUTE the query
    const tours = await query;

    // const query = Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    // SEND response
    res.status(200).json({
      status: 'Success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  // console.log(req.params)
  // const tour = tours.find((el) => el.id === parseInt(req.params.id, 10));
  //   if (parseInt(req.params.id) > tours.length) {
  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'Fail',
  //     message: 'Invalid id',
  //   });
  // }
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'Success',
      //   results: tours.length,
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  // console.log(req.body);
  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);
  // fs.writeFile(
  //   './dev-data/data/tours-simple.json',
  //   JSON.stringify(tours),
  //   (err) => {
  //     if (err) return console.log('Couldnt write the new tour');
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'Success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err,
    });
  }
  // }
  // );
};

exports.updateTour = async (req, res) => {
  // for the update operation
  // don't need the entire entry like in PUT
  // if (parseInt(req.params.id) > tours.length) {
  //   return res.status(404).json({
  //     status: 'Fail',
  //     message: 'Invalid id',
  //   });
  // }
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'Success',
      data: {
        message: `Updated the tour with id ${req.params.id}`,
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'Success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err,
    });
  }
};
