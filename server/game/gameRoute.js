'use strict';

let express = require('express');
let gameController = require('./gameController');

let router = express.Router();
let publicRouter = express.Router();

router.post('/add-money-to-game', (req, res, next) => {

    gameController.addMoneyToTable(req, res);

});

router.post('/request-money', (req, res, next) => {

    gameController.requestMoney(req, res);

});

// API to return list of tables
publicRouter.get('/tables', (req, res, next) => {

    gameController.listTables(req, res);

});

// This API will include whether the requester is sitting on table or not
router.get('/tables', (req, res, next) => {

    gameController.listTables(req, res);

});

router.post('/join-table', (req, res, next) => {

    gameController.joinTable(req, res);

});

router.post('/spawn-table', (req, res, next) => {

    gameController.spawnTable(req, res);

});

publicRouter.get('/table/:id', (req, res, next) => {

    gameController.getGameState(req, res);

});

module.exports = {router, publicRouter};