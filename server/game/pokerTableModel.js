/**
 * Created by saurabhk on 03/01/17.
 */
"use strict";
let pokerTableConfig = require("./pokerTableConfig").pokerTableConfig;

module.exports = function (sequelize, DataTypes) {
    var PokerTable = sequelize.define("PokerTable", {
        gameState: { 
            type: DataTypes.JSONB, 
            defaultValue: {} 
        },
        moneyRequest: { 
            type: DataTypes.JSONB, 
            defaultValue: {} 
        },
        parentType: { 
            type: DataTypes.STRING 
        },
        tableType: { 
            type: DataTypes.INTEGER 
        },
        state: { 
            type: DataTypes.STRING 
        },
        moneyType: {
            type: DataTypes.STRING,
            validate: {
                 isIn: [pokerTableConfig.moneyType.values], 
            }
        },
        bigBlind: {
            type: DataTypes.FLOAT,
            validate: {
                 isIn: [pokerTableConfig.bigBlind.values], 
            }
        },
        gameType: {
            type: DataTypes.STRING,
            validate: {
                 isIn: [pokerTableConfig.gameType.values], 
            }
        },
        accessType: {
            type: DataTypes.STRING,
            validate: {
                 isIn: [pokerTableConfig.accessType.values], 
            }
        },
        runType: {
            type: DataTypes.STRING,
            validate: {
                 isIn: [pokerTableConfig.runType.values], 
            }
        },
        nOfPlayers: {
            type: DataTypes.INTEGER,
            validate: {
                 min: [pokerTableConfig.nOfPlayers.min], 
                 max: [pokerTableConfig.nOfPlayers.max],
            }
        }
    });

    return PokerTable;
};