const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
//getting the genres from the database
const Genre = mongoose.model('Genre', mongoose.Schema({  //since the schema is declared only once, it can be put in here directly 
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));
//creating the Genres array
// const genres = [
//     {id: 1, name: 'Fantasy'},
//     {id: 2, name: 'Thriller'},
//     {id: 3, name: 'Romance'},
// ];
//GET method
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});
//POST method
router.post('/', async (req, res) => {
    //validating
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message); //400 - Bad Request
    //create
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.send(genre);  //view
});
//PUT method
router.put('/:id', async (req, res) => {
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message); //400 - Bad Request
    //check if genre exists
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });
    
    if(!genre) return res.status(404).send("Genre not found!");
    //validate
    
    //update
    res.send(genre);   //view
});
//DELETE method
router.delete('/:id', async (req, res) => {
    //check if genre exists
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if(!genre) return res.status(404).send("Genre not found!");
   //delete
    res.send(genre);   //view
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send("Genre not found!");
    res.send(genre);
  });
  

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}

module.exports = router;