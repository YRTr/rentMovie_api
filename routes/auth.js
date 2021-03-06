const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const _ = require('lodash');
const { User } = require('../models/user');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const mongoose = require('mongoose');


router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('invalid email or password');

    const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));

    res.send(token);

})


function validateUser(req){
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(req, schema);
}
module.exports = router;