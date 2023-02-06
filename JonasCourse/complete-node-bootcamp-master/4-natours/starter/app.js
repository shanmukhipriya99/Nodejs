const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json()); // middleware that handles the json input

const port = 3000;

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'Success',
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

// List of APIs
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour)

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
