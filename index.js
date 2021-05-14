const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectId')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const customers = require('./routes/customers');
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();

if(!config.get('jwtPrivateKey')){
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

 mongoose.connect("mongodb://localhost/rentmovie_api", {useNewUrlParser:true, useUnifiedTopology: true})
    .then(() => console.log('Connected to mongodb...'))
    .catch(err => console.err('Could not connect to the database....'));


app.use(express.json());
app.use('/api/customers', customers);
app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 5500;
app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);