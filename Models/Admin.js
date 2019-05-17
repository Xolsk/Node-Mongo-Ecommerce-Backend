const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({

    id: {type:String, required: true, unique: true}, 
    product: {type:String}, //Comic, Miniature, Poster, Tshirt..
    title: {type:String, required: true},
    price:{type:String, required:true},
    number:{type:String, required:true}, 
    published: {type:String, required: true},
    editorial: {type:String, required:true },
    distributor: {type:String, required: true},
    format: {type:String}, //ComicBook, Hardbound, SoftBound, Album
    writer: {type:String},
    drawer:{type:String},
    pages: {type:String},
    description: {type:String},
    cover: {type: String},
    stock: {type:Number},
    sold: {type:Number, default:0},
    hidden: {type:Boolean,default:"false"},
    sale: {type:Boolean, default:"false"},
    salePrice:{type:String, default:"0"},
    created : { type: Date, default: Date.now }
})
module.exports =  mongoose.model('Admin', adminSchema);