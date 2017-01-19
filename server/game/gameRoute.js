'use strict';

let express = require('express');
let gameController = require('./gameController');

let router = express.Router();

router.post('/add-money-to-game', (req, res, next) => {

    gameController.addMoneyToTable(req, res);

});

router.get('/tables', (req, res, next) => {

    gameController.listTables(req, res);

});

router.post('/join-game', (req, res, next) => {

    gameController.joinGame(req, res);

});

router.post('/spawn-table', (req, res, next) => {

    gameController.spawnTable(req, res);

});

module.exports = router;