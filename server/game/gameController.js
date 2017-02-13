"use strict";

let gameService = require("./gameService");
let responseMessage = require("../utils/responseMessage");
let responseHelper = require("../utils/responseHelper");

module.exports = {
    addMoneyToTable: function(req, res) {
        let params = req.body.params;
        let user = {
            id:1
        }
        gameService.addMoneyToTable(params, user, function() {
            res.status(200).send({data: "cool"});
        });
    },

    listTables: function(req, res) {
        gameService.listTables(function(err, data, statusCode) {
            responseHelper(err, res, data, statusCode);
        });
    },

    joinTable: function(req, res) {

    },

    spawnTable: function(req, res) {
        let params = req.body.tableParams;
        let response;
        gameService.spawnTable(params)
            .then(function(table){
                response = new responseMessage.GenericSuccessMessage();
                response.data = table;
                responseHelper(null, res, response, response.code);
            })
            .catch(function(err) {
                response = new responseMessage.GenericFailureMessage();
                response.message = err.message;
                responseHelper(null, res, response, response.code);
            });
    },

    requestMoney: function (req, res) {
        let params = req.body.params;
        let user = {
            id: 1
        }
        gameService.requestMoney(params, user, function(err, data, statusCode) {
            responseHelper(err, res, data, statusCode);
        });
    },

    getGameState: function(req, res) {
        gameService.getGameState(req.params, function(err, data, statusCode) {
            responseHelper(err, res, data, statusCode);
        });
    }
};