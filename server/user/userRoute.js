'use strict';

let express = require('express');
let userController = require('./userController');

let router = express.Router();

router.get('/', (req, res, next) => {

    userController.create(req, res);

});

module.exports = router;