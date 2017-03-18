"use strict";
let TournamentModel = DB_MODELS.Tournament
let responseMessage = require("../utils/responseMessage");

module.exports = {
    createTournament: function(params, callback) {
        let response;
        TournamentModel.create(params)
            .then(function(tournament) {
                response = new responseMessage.GenericSuccessMessage();
                response.data = tournament;
                callback(null, response, response.code);
            })
            .catch(function(err) {
                console.log(`ERROR ::: Unable to spawn tournament, error: ${err.message}, stack: ${err.stack}`);
                response = new responseMessage.GenericFailureMessage();
                callback(null, response, response.code);
            })
    }
}