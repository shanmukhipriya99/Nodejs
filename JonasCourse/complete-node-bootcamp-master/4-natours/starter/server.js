const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
// console.log(process.env);

// Start Server
const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
