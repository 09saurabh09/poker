'use strict';

let express = require('express');
let userController = require('./userController');

let router = express.Router();
let publicRouter = express.Router();

publicRouter.post('/', (req, res, next) => {

    userController.create(req, res);

});

router.put('/', (req, res, next) => {

    userController.update(req, res);

});

publicRouter.post('/authenticate', (req, res, next) => {

    userController.authenticate(req, res);

});

router.get('/', (req, res, next) => {

    userController.getUserInfo(req, res);

});

router.get('/session/game-history', (req, res, next) => {

    userController.getSessionHistory(req, res);

});

module.exports = {router, publicRouter};