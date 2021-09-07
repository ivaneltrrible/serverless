import express, { json } from 'express';
import cors from 'cors';
import { connect } from 'mongoose';

//Llamados de rutas
import mealsRoute from './routes/meals';
import ordersRoute from './routes/orders';
import authRoute from './routes/auth';

const app = express()
app.use(json())
app.use(cors())

connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })



//Utilizar ruta Meals
app.use('/api/meals', mealsRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/auth', authRoute);


module.exports = app
