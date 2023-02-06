const fs = require('fs');
const express = require('express');
const app = express();

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
      tours
    },
  });
});

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
