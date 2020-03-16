const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({

    id: {type:String, required: true, unique: true}, 
    product: {type:String}, //Comic, Miniature, Poster, Tshirt..
    title: {type:String, required: true},
    price:{type:Number, required:true},
    number:{type:String, required:true}, 
    published: {type:Number, required: true},
    editorial: {type:String, required:true },
    distributor: {type:String, required: true},
    format: {type:String}, //ComicBook, Hardbound, SoftBound, Album
    writer: {type:String},
    drawer:{type:String},
    pages: {type:String},
    description: {type:String},
    cover: {type: String, required:true},
    interior01: {type:String ,required:true},
    stock: {type:Number},
    sold: {type:Number, default:0},
    hidden: {type:Boolean,default:"false"},
    sale: {type:Boolean, default:"false"},
    salePrice:{type:Number, default:0},
    created : { type: Date, default: Date.now }
})
module.exports =  mongoose.model('Admin', adminSchema);