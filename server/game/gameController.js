"use strict";

let gameService = require("./gameService");

module.exports = {
    addMoneyToTable: function(req, res) {
        let params = req.body;
        gameService.addMoneyToTable(params, function() {
            res.status(200).send({data: "cool"});
        });
    }
};