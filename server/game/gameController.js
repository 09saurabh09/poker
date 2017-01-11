"use strict";

let gameService = require("./gameService");

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

    },

    joinGame: function(req, res) {

    },

    spawnTable: function(req, res) {

    }
};