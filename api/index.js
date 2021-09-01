const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//Llamados de rutas
const mealsRoute = require('./routes/meals');
const ordersRoute = require('./routes/orders');
const authRoute = require('./routes/auth');

const app = express();
app.use(express.json());
//app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })



//Utilizar ruta Meals
app.use('/api/meals', mealsRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/auth', authRoute);


module.exports = app
