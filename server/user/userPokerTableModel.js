"use strict";

var Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    var UserPokerTable = sequelize.define("UserPokerTable", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        // Both UserId and PokerTableId columns are Automatically created by sequalize
        PokerTableId: {
            type: Sequelize.INTEGER,
        },
        UserId: {
            type: Sequelize.INTEGER,
        },
        status: {
            type: DataTypes.STRING
        },
    });
    return UserPokerTable;
};