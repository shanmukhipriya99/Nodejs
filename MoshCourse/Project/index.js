const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const home = require('./routes/home');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch( err => console.log("Could not connect to MongoDB..."));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/', home);


const port = process.env.PORT || 8080;
app.listen(8080, console.log(`Listening on port ${port}...`));