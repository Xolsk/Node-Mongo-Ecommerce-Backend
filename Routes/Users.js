const express = require('express'),
    router = express.Router(),
    controller = require('../Controllers/Users.js');


router.post('/add', controller.add); //adds new user

router.post("/login", controller.login); //allows login to user

router.get("/verifyToken/:token", controller.verifyToken);  //verifies matching info to allow to access user data

router.post('/update', controller.update); //updates user info

//router.get("/orders", controller.pastOrders) //list past orders

router.get("/wishlist", controller.wishlist) //list wishlist

router.post ("/removefromwish", controller.removeWish) //removes from wishlist

router.post ("/addtowish", controller.addWish) //adds to wishlist 

module.exports = router;