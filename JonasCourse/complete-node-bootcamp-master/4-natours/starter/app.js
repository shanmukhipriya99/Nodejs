const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json()); // middleware that handles the json input

const port = 3000;

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Homepage💻', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.status(200).send('This is a post');
// });

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
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
});

app.post('/api/v1/tours', (req, res) => {
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
});

app.patch('/api/v1/tours/:id', (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
