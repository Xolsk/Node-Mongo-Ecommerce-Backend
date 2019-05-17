const images = require("../Models/Images.js")
const cloudinary = require ("cloudinary")

class ImagesController {

async upload (req, res){
    console.log(req.body)
      let {URL, publicId, productId}=req.body
        try{
            const image = await images.create({URL, publicId, productId});
            res.send ({image, message:"Image uploaded"});
        }
        catch (error) {
              res.send(error)
        }
}
}
module.exports = new ImagesController;