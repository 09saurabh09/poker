'use strict';

let express = require('express');
let userController = require('./userController');

let router = express.Router();

router.post('/', (req, res, next) => {

    userController.create(req, res);

});

router.post('/authenticate', (req, res, next) => {

    userController.authenticate(req, res);

});

module.exports = router;