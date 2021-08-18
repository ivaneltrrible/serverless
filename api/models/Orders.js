import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema

const Orders = model('Order', new Schema ({
    meal_id: { type: Schema.Types.ObjectId, ref:'Meal' },
    user_id: String,

}))

module.exports = Orders;