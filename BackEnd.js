const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');
const cors= require ("cors");

// =================== initial settings ===================
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// connnect to mongo
mongoose.connect('mongodb://127.0.0.1/comicShopDB',()=>{
    console.log('connected to mongodb');
})
app.use(cors())
// routes
 const adminRoute = require("./Routes/Admin.js");
  const userRoute = require("./Routes/Users.js");
  const orderRoute = require("./Routes/Orders.js");
  const imagesRoute = require("./Routes/Images.js");
    app.use("/admin", adminRoute);
     app.use("/user", userRoute);
     app.use("/orders", orderRoute);
     app.use ("/images", imagesRoute);
    
const port = 2000
app.listen(port, () => console.log(`listening on port ${port}`))