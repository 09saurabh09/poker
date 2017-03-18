'use strict';

let express = require('express');
let tournamentController = require('./tournamentController');

let router = express.Router();

router.post('/', (req, res, next) => {
    
    tournamentController.createTournament(req, res);
    
});

module.exports = {router};