const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

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

// List of APIs/Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// Start Server
const port = 3000;
app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
