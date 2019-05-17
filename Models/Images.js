const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImagesSchema = new Schema({

    URL:{type: String , require:true},
    productId:{type:String, require:true},
    publicId:{type:String, require:true},

})
module.exports =  mongoose.model('images', ImagesSchema);