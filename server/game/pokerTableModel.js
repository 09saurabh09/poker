/**
 * Created by saurabhk on 03/01/17.
 */
"use strict";
let pokerTableConfig = require("./pokerTableConfig").pokerTableConfig;

module.exports = function (sequelize, DataTypes) {
    var PokerTable = sequelize.define("PokerTable", {
        tableName: {
            type: DataTypes.STRING
        },
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
        tournamentId: {
            type: DataTypes.INTEGER
        },
        tableType: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        },
        moneyType: {
            type: DataTypes.STRING,
            validate: {
                isIn: [pokerTableConfig.moneyType.values]
            }
        },
        bigBlind: {
            type: DataTypes.FLOAT,
            validate: {
                isIn: [pokerTableConfig.bigBlind.values]
            }
        },
        gameType: {
            type: DataTypes.STRING,
            validate: {
                isIn: [pokerTableConfig.gameType.values]
            }
        },
        accessType: {
            type: DataTypes.STRING,
            validate: {
                isIn: [pokerTableConfig.accessType.values]
            }
        },
        runTimeType: {
            type: DataTypes.STRING,
            validate: {
                isIn: [pokerTableConfig.runTimeType.values]
            }
        },
        maxPlayer: {
            type: DataTypes.INTEGER,
            validate: {
                min: [pokerTableConfig.nOfPlayers.min],
                max: [pokerTableConfig.nOfPlayers.max]
            }
        },
        minAmount: {
            type: DataTypes.FLOAT
        },
        maxAmount: {
            type: DataTypes.FLOAT
        },
        maxSitOutTime: {
            type: DataTypes.INTEGER
        },
        rakeX: {
            type: DataTypes.FLOAT
        },
        rakeY: {
            type: DataTypes.FLOAT
        },
        rakeZ: {
            type: DataTypes.FLOAT
        },
        timeBank: {
            type: DataTypes.JSONB,
            defaultValue: {}
        },
        actionTime: {
            type: DataTypes.INTEGER,
            defaultValue: 20
        }
    }, {
            classMethods: {
                associate: function (models) {
                    PokerTable.belongsToMany(models.User, {
                        through: "UserPokerTables"
                    });
                    PokerTable.hasMany(models.Game, {foreignKey: 'pokerTableId'});

                    PokerTable.belongsTo(models.Tournament, {foreignKey: 'tournamentId'});

                }
            },

            hooks: {
                beforeCreate: function (table, options) {
                    console.log("creating table");
                    let gameState = {
                        "tableId": table.id,
                        "turnPos": 0,
                        minRaise: 0,
                        maxRaise: 0,
                        callValue: 0,
                        gamePots: [],
                        totalPot: 0,
                        lastRaise: 0,
                        currentTotalPlayer: 0,
                        dealerPos: 0,
                        "moneyType": table.moneyType,
                        "bigBlind": table.bigBlind,
                        "gameType": table.gameType,
                        "parentType": table.parentType,
                        "accessType": table.accessType,
                        "communityCards": [],
                        "runTimeType": table.runTimeType,
                        "maxPlayer": table.maxPlayer,
                        "minAmount": table.minAmount,
                        "maxAmount": table.maxAmount,
                        "maxSitOutTime": table.maxSitOutTime,
                        "tableType": table.tableType,
                        "rakeX": table.rakeX,
                        "rakeY": table.rakeY,
                        "rakeZ": table.rakeZ,
                        "actionTime": table.actionTime
                    }
                    table.set('gameState', gameState);
                }
                // beforeBulkUpdate: function(table, options) {
                //     console.log("Update is called");
                // }
            }
        });

    return PokerTable;
};