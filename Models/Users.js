const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    email: {type:String, required: true},
    name: {type:String, required: true}, 
    lastname: {type:String},
    adress: {type:String, required: true},
    cp: {type:String, required: true},
    city: {type:String, required:true },
    province: {type:String, required: true},
    state:{type:String, required: true},
    wishlist:{type:Object},
    password:{type:String, required:true},
    admin:{type:Boolean}
})
module.exports =  mongoose.model('users', userSchema);