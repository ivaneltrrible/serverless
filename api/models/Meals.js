import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema

const Meals = model('Meal', new Schema({
    name: String,
    desc: String,
}))

module.exports = Meals;
