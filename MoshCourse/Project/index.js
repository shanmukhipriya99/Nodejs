const genres = require('./routes/genres');
const home = require('./routes/home');
const express = require('express');
const app = express();


app.use(express.json());
app.use('/api/genres', genres);
app.use('/', home);


const port = process.env.PORT || 8080;
app.listen(8080, console.log(`Listening on port ${port}...`));