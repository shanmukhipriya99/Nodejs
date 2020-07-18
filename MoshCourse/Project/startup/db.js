const mongoose = require('mongoose');

module.exports = function() {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);

    mongoose.connect('mongodb://localhost/vidly')
        .then(() => console.log('Connected to MongoDB...'))
        .catch( err => console.log("Could not connect to MongoDB..."));

}