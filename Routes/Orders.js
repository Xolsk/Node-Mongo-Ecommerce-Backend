const express = require('express'),
    router = express.Router(),
    controller = require('../Controllers/Orders.js');

    
router.post('/purchase', controller.purchase)

router.post ("/create", controller.create)
    
    
module.exports = router;