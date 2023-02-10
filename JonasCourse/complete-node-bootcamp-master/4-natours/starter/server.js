const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');
// console.log(process.env);
const db = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    // console.log(connection.connections);
    console.log('DB connected successfully');
  });

// const testTour = new Tour({
//   name: 'The Forest Hiker',
//   rating: 4.6,
//   price: 400,
// });
// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('Err💥:', err);
//   });
// Start Server
const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
