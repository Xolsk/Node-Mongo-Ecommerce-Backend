const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({

    number:{type: Number, require:true, unique: true},
    client: {type:Object,required : true},
    orderDetails:{type:Object, required:true},
    amount:{type:Number, required:true},
    taxes:{type:Number, required:true},
    created : { type: Date, default: Date.now }
})
module.exports =  mongoose.model('orders', orderSchema);

