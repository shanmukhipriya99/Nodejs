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
    const tours = await Tour.find();
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

exports.getTour = (req, res) => {
  // console.log(req.params)
  // const tour = tours.find((el) => el.id === parseInt(req.params.id, 10));
  //   if (parseInt(req.params.id) > tours.length) {
  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'Fail',
  //     message: 'Invalid id',
  //   });
  // }
  // res.status(200).json({
  //   status: 'Success',
  //   //   results: tours.length,
  //   data: {
  //     tour,
  //   },
  // });
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

exports.updateTour = (req, res) => {
  // for the update operation
  // don't need the entire entry like in PUT
  // if (parseInt(req.params.id) > tours.length) {
  //   return res.status(404).json({
  //     status: 'Fail',
  //     message: 'Invalid id',
  //   });
  // }
  res.status(200).json({
    status: 'Success',
    data: {
      tour: `Updated the tour with id ${req.params.id}`,
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'Success',
    data: null,
  });
};
