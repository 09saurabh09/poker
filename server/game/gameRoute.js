'use strict';

let express = require('express');
let gameController = require('./gameController');

let router = express.Router();

router.get('/add-money-to-game', (req, res, next) => {

    gameController.addMoneyToTable(req, res);

});

module.exports = router;