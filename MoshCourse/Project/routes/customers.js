const { Customer, validate } = require('../models/customer');
const express = require('express');
const router = express.Router();

//creating the Genres array
// const genres = [
//     {id: 1, name: 'Fantasy'},
//     {id: 2, name: 'Thriller'},
//     {id: 3, name: 'Romance'},
// ];
//GET method
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});
//POST method
router.post('/', async (req, res) => {
    //validating
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message); //400 - Bad Request
    //create
    let customer = new Customer({ 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold    
    });
    customer = await customer.save();
    res.send(customer);  //view
});
//PUT method
router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message); //400 - Bad Request
    //check if genre exists
    const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });
    
    if(!customer) return res.status(404).send("Customer not found!");
    //validate
    
    //update
    res.send(customer);   //view
});
//DELETE method
router.delete('/:id', async (req, res) => {
    //check if genre exists
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if(!customer) return res.status(404).send("Customer not found!");
   //delete
    res.send(customer);   //view
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send("Customer not found!");
    res.send(customer);
  });



module.exports = router;