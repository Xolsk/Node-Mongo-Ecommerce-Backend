const express = require('express'),
    router = express.Router(),
    controller = require('../Controllers/Images.js');

    
router.post('/upload', controller.upload)
   
module.exports = router;