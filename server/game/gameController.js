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

    joinGame: function(req, res) {

    },

    spawnTable: function(req, res) {

    },

    requestMoney: function (req, res) {
        let params = req.body.params;
        let user = {
            id: 1
        }
        gameService.requestMoney(params, user, function(err, data, statusCode) {
            responseHelper(err, res, data, statusCode);
        });
    }
};