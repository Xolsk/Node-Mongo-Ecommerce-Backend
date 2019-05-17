const express = require('express'),
    router = express.Router(),
    controller = require('../Controllers/Admin.js');


router.get('/all', controller.findAll); //lists all products

router.get(`/date`, controller.findByDate); //lists by Date the latest 25.

router.get(`/sold`, controller.findBySold); //lists by Date the latest 25.

router.get('/:searchInput', controller. findByMatch); //find product by matches on DB.

router.post('/add', controller.add); //add product

router.post('/remove', controller.remove); //remove product

router.post('/update', controller.update); //update product

router.post("/checkStock", controller.checkStock)//checks available stock before confirming purchase

router.post (`/findAmount`, controller.findAmount); //find total in cart

// router.get('/stock/:amount', controller.listByStock); // filtered search showing only understocked product

// router.get('/finduser/', controller.findUser); //finds user

// router.get('/userdata/', controller.listUsers); ///filter options??



module.exports = router;