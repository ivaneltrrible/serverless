import { Schema, model } from 'mongoose';


const Users = model('User', new Schema({ 
    email: String,
    password: String,
    salt: String,

}));

module.exports = Users;