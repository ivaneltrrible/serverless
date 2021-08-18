const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//Llamados de rutas
const meals = require('./routes/meals');
const orders = require('./routes/orders');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })



//Utilizar ruta Meals
app.use('/api/meals', meals);
app.use('/api/orders', orders);


module.exports = app
