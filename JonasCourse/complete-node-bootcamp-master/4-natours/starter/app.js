const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();
// Middlewares
app.use(morgan('dev'));
app.use(express.json()); // middleware that handles the json input
// middleware functions that apply to every API call if positioned before the route handler
app.use((req, res, next) => {
  console.log('Middleware here!');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const port = 3000;

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));
// Route Handlers
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'Success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  // console.log(req.params)
  const tour = tours.find((el) => el.id === parseInt(req.params.id));
  //   if (parseInt(req.params.id) > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid id',
    });
  }
  res.status(200).json({
    status: 'Success',
    //   results: tours.length,
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      if (err) return console.log('Couldnt write the new tour');
      res.status(201).json({
        status: 'Success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  // for the update operation
  // don't need the entire entry like in PUT
  if (parseInt(req.params.id) > tours.length) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid id',
    });
  }
  res.status(200).json({
    status: 'Success',
    data: {
      tour: `Updated the tour with id ${req.params.id}`,
    },
  });
};

const deleteTour = (req, res) => {
  if (parseInt(req.params.id) > tours.length) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid id',
    });
  }
  res.status(204).json({
    status: 'Success',
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not defined yet...',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not defined yet...',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not defined yet...',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not defined yet...',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not defined yet...',
  });
};
// List of APIs/Routes

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

const tourRouter = express.Router();
const userRouter = express.Router();
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
userRouter.route('/').get(getAllUsers).post(createUser);
userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);
// Start Server
app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
