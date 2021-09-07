import { Schema, model } from 'mongoose';


const Users = model('User', new Schema({ 
    email: String,
    password: String,
    salt: String,
    role: { type: String, default: 'user' }// also be admin or whatever you decided 

}));

module.exports = Users;