const auth = require('../middleware/auth');
const { Genre, validate} = require('../models/genre');
const express = require('express');
const router = express.Router();

//creating the Genres array
// const genres = [
//     {id: 1, name: 'Fantasy'},
//     {id: 2, name: 'Thriller'},
//     {id: 3, name: 'Romance'},
// ];
//GET method
router.get('/', auth, async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);    
});
//POST method
router.post('/', async (req, res) => {
    //validating
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message); //400 - Bad Request
    //create
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.send(genre);  //view
});
//PUT method
router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
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
  
module.exports = router;