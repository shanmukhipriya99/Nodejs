const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Homepage💻', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.status(200).send('This is a post');
});

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
