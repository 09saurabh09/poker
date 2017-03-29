"use strict";

let responseMessage = require("../utils/responseMessage");
let io = require("../socket/socketRoute");


let GameModel = DB_MODELS.Game;
let UserModel = DB_MODELS.User;
let PokerTable = DB_MODELS.PokerTable;
let UserPokerTableModel = DB_MODELS.UserPokerTable;

//UPDATE "Users" SET "currentBalance"="currentBalance" + -500,"updatedAt"='2017-01-14 13:14:07.493 +00:00' WHERE "id" = 1 RETURNING *

module.exports = {
    // This will deduct money from account and will add to the table, 
    // User might be playing at multiple tab
    /**
     * This will deduct money from account and will add to the table
     * @param {Number} params.tableId 
     * @param {Number} params.amount
     * @param {Object} currentUser object
     */
    addMoneyToTable: function ({ tableId, amount }, currentUser, callback) {
        let userId = currentUser.id;
        let pokerTablePromise = PokerTable.findOne({
            where: {
                id: tableId
            }
        })

        let userPromise = UserModel.findOne({
            where: {
                id: userId
            }
        })

        PROMISE.all([pokerTablePromise, userPromise])
            .then(function (result) {
                let table = result[0];
                let user = result[1];

                // let query = `UPDATE "PokerTables" SET gameState = jsonb_set(gameState,'{currentBalance}','123') WHERE id = 1;`;
                let query = `UPDATE "PokerTables" SET "gameState" = "gameState" || CONCAT('{"currentBalance":', COALESCE("gameState"->>'currentBalance','0')::int + ${amount}, '}')::jsonb WHERE id = ${table.id};`
                // table.set("gameState.currentBalance", table.gameState.currentBalance + amount);
                // table.changed().concat(['gameState.currentBalance']);
                return DB_MODELS.sequelize.transaction(function (t) {

                    // chain all your queries here. make sure you return them.
                    return DB_MODELS.sequelize.query(query, { transaction: t })
                        .then(function (table) {
                            return user.decrement('currentBalance', { by: amount }, { transaction: t });
                        });

                }).then(function (result) {
                    callback();
                    // Transaction has been committed
                    // result is whatever the result of the promise chain returned to the transaction callback
                }).catch(function (err) {
                    console.log(err.message);
                    callback();
                    // Transaction has been rolled back
                    // err is whatever rejected the promise chain returned to the transaction callback
                });
            })
            .catch(function (err) {
                console.log(`ERROR ::: ${err.message}, stack: ${err.stack}`);
            })

    },

    listTables: function (callback) {
        let self = this;
        let response;
        // PokerTable.findAll({ raw: true, attributes: { exclude: ['gameState'] } })
        PokerTable.findAll({ raw: true })
            .then(function (tables) {
                response = new responseMessage.GenericSuccessMessage();
                // if(tables && tables.length) {
                //     tables.forEach(function(table) {
                //         table.gameState = self.getCommonGameState(table.gameState);
                //     });
                // }
                tables.forEach(function (table) {
                    table.currentTotalPlayer = table.gameState.currentTotalPlayer;
                    delete table.gameState;
                });
                response.data = tables;
                callback(null, response, response.code);
            })
            .catch(function (err) {
                console.log(`ERROR ::: Unable to fetch list of tables, error: ${err.message}, stack: ${err.stack}`);
                response = new responseMessage.GenericFailureMessage();
                callback(null, response, response.code);
            })
    },

    // Similar to listTables execpt it will include a flag whether requester is sitting on table or not
    listTablesWithUserDetails: function (user, callback) {
        let self = this;
        let response;
        PokerTable.findAll({ raw: true })
            .then(function (tables) {
                tables.forEach(function (table) {
                    table.userJoined = false;
                    table.currentTotalPlayer = table.gameState.currentTotalPlayer;
                    if (table.gameState.players) {
                        table.gameState.players.forEach(function (player) {
                            if (player && player.id == user.id) {
                                table.userJoined = true;
                                table.userCards = player.cards;
                            }
                        })
                    }
                    delete table.gameState;
                });
                response = new responseMessage.GenericSuccessMessage();
                response.data = tables;
                callback(null, response, response.code);
            })
            .catch(function (err) {
                console.log(`ERROR ::: Unable to fetch list of tables, error: ${err.message}, stack: ${err.stack}`);
                response = new responseMessage.GenericFailureMessage();
                callback(null, response, response.code);
            })
    },

    // This will add request for adding money on particular table, 
    // User might be playing at multiple tab
    /**
     * This will add request for adding money on particular table
     * @param {Number} params.tableId 
     * @param {Number} params.amount
     * @param {Object} currentUser object
     */
    requestMoney: function ({ tableId, amount }, currenUser, callback) {
        let response;
        let query = `UPDATE "PokerTables" SET "moneyRequest" = "moneyRequest" || CONCAT('{"${currenUser.id}":', COALESCE("moneyRequest"->>'${currenUser.id}','0')::int + ${amount}, '}')::jsonb WHERE id = ${tableId};`;
        return DB_MODELS.sequelize.query(query)
            .then(function () {
                response = new responseMessage.GenericSuccessMessage();
                callback(null, response, response.code);
            })
            .catch(function () {
                response = new responseMessage.GenericFailureMessage();
                callback(null, response, response.code);
            })
    },

    /**
     * This will add request for adding money on particular table
     * @param {Object} params for new table 
     */
    spawnTable: function (params) {
        return new PROMISE(function (resolve, reject) {
            return PokerTable.create(params)
                .then(function (table) {
                    resolve(table);
                })
                .catch(function (err) {
                    reject(err)
                })
        })

    },

    getCommonGameState: function (gameState) {
        let commonGameState = {
            tableId: gameState.tableId,
            turnPos: gameState.turnPos,
            round: gameState.round,
            minRaise: gameState.minRaise,
            maxRaise: gameState.maxRaise,
            callValue: gameState.callValue,
            gamePots: gameState.gamePots,
            totalPot: gameState.totalPot,
            lastRaise: gameState.lastRaise,
            currentTotalPlayer: gameState.currentTotalPlayer,
            communityCards: gameState.communityCards,
            maxPlayer: gameState.maxPlayer,
            bigBlind: gameState.bigBlind,
            dealerPos: gameState.dealerPos,
            minAmount: gameState.minAmount,
            maxAmount: gameState.maxAmount,
            currentPot: gameState.currentPot,
            players: [],
            lastTurnAt: gameState.lastTurnAt,
            actionTime: gameState.actionTime
        };

        gameState.players = gameState.players || Array.apply(null, Array(gameState.maxPlayer));
        gameState.players.forEach(function (player) {
            if (player) {
                let pl = {
                    id: player.id,
                    name: player.name,
                    seat: player.seat,
                    chips: player.chips,
                    bet: player.bet,
                    lastAction: player.lastAction,
                    hasDone: player.hasDone,
                    idleForHand: player.idleForHand,
                    betForRound: player.betForRound,
                    timeBank: player.timeBank,
                    expCallValue: player.expCallValue,
                    hasSitOut: player.hasSitOut
                }
                if ((gameState.round == "showdown") && (player.showCards)) {
                    pl.cards = player.cards;
                }
                commonGameState.players.push(pl);
            } else {
                commonGameState.players.push(null);
            }

        });
        return commonGameState;
    },

    getGameState: function (params, callback) {
        let self = this;
        let response;
        let query = {
            where: {
                id: params.id
            },
            raw: true
        }
        return PokerTable.findOne(query)
            .then(function (table) {
                let commonGameState = self.getCommonGameState(table.gameState);
                table.gameState = commonGameState;
                response = new responseMessage.GenericSuccessMessage();
                response.data = table;
                callback(null, response, response.code);
            })
            .catch(function (err) {
                response = new responseMessage.GenericFailureMessage();
                callback(null, response, response.code);
                console.log(`ERROR ::: Unable to fetch game state, error: ${err.message}, stack:${err.stack}`);
            })
    },

    listMyTables: function (user, callback) {
        let response;
        UserModel.findOne({ where: { id: user.id } })
            .then(function (user) {
                user.getPokerTables({ raw: true })
                    .then(function (tables) {
                        tables.forEach(function (table) {
                            if (table.gameState.players) {
                                table.gameState.players.forEach(function (player) {
                                    if (player && player.id == user.id) {
                                        table.userCards = player.cards;
                                    }
                                })
                            }
                            delete table.gameState;
                        });
                        response = new responseMessage.GenericSuccessMessage();
                        response.data = tables;
                        callback(null, response, response.code);
                    })

            })
            .catch(function (err) {
                console.log(`ERROR ::: Unable to fetch list of my tables, error: ${err.message}, stack: ${err.stack}`);
                response = new responseMessage.GenericFailureMessage();
                callback(null, response, response.code);
            })
    }
};