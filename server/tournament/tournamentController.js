"use strcit";
let tournamentService = require('./tournamentService');
let responseHelper = require("../utils/responseHelper");

module.exports = {
    createTournament: function (req, res) {
        let params = req.body.tournamentParams;
        tournamentService.createTournament(params, function (err, data, statusCode) {
            responseHelper(err, res, data, statusCode);
        })
    }
}