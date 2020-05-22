const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());
//creating the Genres array
const genres = [
    {id: 1, name: 'Fantasy'},
    {id: 2, name: 'Thriller'},
    {id: 3, name: 'Romance'},
];
//GET method
app.get('/api/genres', (req, res) => {
    res.send(genres);
});
//POST method
app.post('/api/genres', (req, res) => {
    //validating
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message); //400 - Bad Request
    //create
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);  //view
});
//PUT method
app.put('/api/genres/:id', (req, res) => {
    //check if genre exists
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("Genre not found!");
    //validate
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message); //400 - Bad Request
    //update
    genre.name = req.body.name;
    res.send(genre);   //view
});
//DELETE method
app.delete('/api/genres/:id', (req, res) => {
    //check if genre exists
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("Genre not found!");
    //validate
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message); //400 - Bad Request
    //delete
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);   //view
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Genre not found!");
    res.send(genre);
  });
  

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}

const port = process.env.PORT || 8080;
app.listen(8080, console.log(`Listening on port ${port}...`));