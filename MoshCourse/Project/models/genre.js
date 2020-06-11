const Joi = require('joi');
const mongoose = require('mongoose');

//getting the genres from the database
const Genre = mongoose.model('Genre', mongoose.Schema({  //since the schema is declared only once, it can be put in here directly 
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.validate = validateGenre;