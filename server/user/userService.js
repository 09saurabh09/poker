"use strict";
let responseMessage = require("../utils/responseMessage");
let userManager = require("../utils/userManager");
let jwt = require("jsonwebtoken");
const uuidV4 = require('uuid/v4');
let userConfig = require('./userConfig');

let UserModel = DB_MODELS.User;
let PokerTable = DB_MODELS.PokerTable;

module.exports = {
    create: function (params, callback) {
        let response;
        params.password = userManager.cryptPassword(params.password.toString())
            .then(function (hash) {
                params.password = hash;
                return UserModel.create(params)
                    .then(function (user) {
                        user = user.toJSON();
                        delete user.password;
                        var token = jwt.sign({ id: user.id }, GlobalConstant.tokenSecret, {
                            expiresIn: GlobalConstant.tokenValidity // expires depend on env
                        });
                        user.token = token;

                        response = new responseMessage.GenericSuccessMessage();
                        response.data = user;
                        callback(null, response, response.code);
                    })
            })
            .catch(function (err) {
                console.log(`ERROR ::: Unable to create password hash, error: ${err.message}, stack: ${err.stack}`);
                response = new responseMessage.GenericFailureMessage();
                response.errors = err.errors;
                callback(null, response, response.code);
            })

    },

    update: function (params, user, callback) {
        let response;
        let userParams = _.pickBy(params, function (value, key) {
            return (userConfig.preferences.indexOf(key) > -1);
        });
        if (Object.keys(userParams).length) {
            UserModel.update(userParams, { where: { id: user.id } })
                .then(function (user) {
                    response = new responseMessage.GenericSuccessMessage();
                    callback(null, response, response.code);
                })
                .catch(function (err) {
                    console.log(`ERROR ::: Unable to update user with id ${user.id}, error: ${err.message}, stack: ${err.stack}`);
                    response = new responseMessage.GenericFailureMessage();
                    callback(null, response, response.code);
                })
        } else {
            response = new responseMessage.GenericSuccessMessage();
            callback(null, response, response.code);
        }

    },

    authenticate: function (params, callback) {
        let response
        UserModel.findOne({
            where: {
                userName: params.userName
            },
            raw: true
        })
            .then(function (user) {
                if (user) {
                    return userManager.comparePassword(params.password.toString(), user.password)
                        .then(function (isPasswordMatched) {
                            if (isPasswordMatched) {

                                delete user.password;
                                // user.sessionKey = uuidV4();
                                var token = jwt.sign({ id: user.id }, GlobalConstant.tokenSecret, {
                                    expiresIn: GlobalConstant.tokenValidity // expires depend on env
                                });
                                user.token = token;
                                response = new responseMessage.GenericSuccessMessage();
                                response.data = user;
                                callback(null, response, response.code);

                            } else {

                                console.log(`ERROR ::: Password does not match for for email: ${params.email}`);
                                response = new responseMessage.GenericFailureMessage();
                                response.message = "Either username or password is incorrect";
                                callback(null, response, response.code);

                            }
                        })
                        .catch(function (err) {
                            console.log(`ERROR ::: Unable to match password for email: ${params.email}, error: ${err.message}, stack: ${err.stack}`);
                            response = new responseMessage.GenericFailureMessage();
                            callback(null, response, response.code);
                        })
                } else {
                    console.log(`ERROR ::: Unable to find user for email: ${params.email}`);
                    response = new responseMessage.GenericFailureMessage();
                    response.message = "Either username or password is incorrect";
                    callback(null, response, response.code);
                }

            })
            .catch(function (err) {
                console.log(`ERROR ::: Unable to match password for email: ${params.email}, error: ${err.message}, stack: ${err.stack}`);
                response = new responseMessage.GenericFailureMessage();
                callback(null, response, response.code);
            })
    },

    getUserInfo: function (currentUser, callback) {
        let userData = {};
        let response;
        UserModel.findOne({ where: { id: currentUser.id } }).then(function (user) {
            user.getPokerTables({ raw: true }).then(function (pokerTables) {
                pokerTables.forEach(function (pokerTable) {
                    pokerTable.gameState.players.forEach(function (player) {
                        if (player && player.id == currentUser.id) {
                            userData["bet"] = (userData["bet"] || 0) + player.bet + player.chips;
                            userData["totalBet"] = (userData["totalBet"] || 0) + player.totalBet + player.chips;
                        }
                    });
                });
                response = new responseMessage.GenericSuccessMessage();
                response.data = _.assign(currentUser, userData);
                callback(null, response, response.code);
            }).catch(function (err) {
                console.log(`ERROR ::: Unable to get table details for user: ${user.id}, error: ${err.message}, stack: ${err.stack}`);
                response = new responseMessage.GenericFailureMessage();
                callback(null, response, response.code);
            })
        })
    },

    getSessionHistory: function (params, user, callback) {
        let response;

        PokerTable.findOne({
            where: {
                id: params.tableId
            }, raw: true
        }).then(function (table) {
            if (table) {
                let player = table.gameState.players.filter(function (pl) {
                    if (pl) {
                        return pl.id == user.id;
                    }
                    return;

                })[0];

                if (player) {
                    let userGameQuery = {
                        sessionKey: player.sessionKey,
                        pokerTableId: params.tableId
                    }
                    return UserModel.findOne({
                        where: {
                            id: user.id
                        },
                        // attributes: {
                        //     exclude: ['password']
                        // },
                        attributes: ['id'],
                        // include: [DB_MODELS.Game]
                        include: [{
                            model: DB_MODELS.Game,
                            attributes: ['pokerTableId'],
                            // as: 'games',
                            through: {
                                where: userGameQuery
                            },
                            include: {
                                model: DB_MODELS.GameHistory,
                                attributes: ['gameState', 'createdAt'],
                                order: ['createdAt']
                            }
                        }

                        ]
                    }).then(function (userGames) {
                        response = new responseMessage.GenericSuccessMessage();
                        userGames.Games.forEach(function (userGame) {
                            userGame.GameHistories.forEach(function (gameHistory) {
                                gameHistory.gameState.players.forEach(function (player) {
                                    if (player && !player.showCards && (player.id != user.id)) {
                                        delete player.cards;
                                    }
                                });

                            });
                        });
                        response.data = userGames;
                        callback(null, response, response.code);
                    })
                } else {
                    console.log(`ERROR ::: Player ${user.id} not playing on table ${params.tableId}`);
                    response = responseMessage.dataNotPresent;
                    callback(null, response, response.code);
                }
            } else {
                console.log(`ERROR ::: Table not found with id ${params.tableId}`);
                response = responseMessage.dataNotPresent;
                callback(null, response, response.code);
            }
        }).catch(function (err) {
            console.log(`ERROR ::: Unable to get table details for user: ${user.id}, error: ${err.message}, stack: ${err.stack}`);
            response = new responseMessage.GenericFailureMessage();
            callback(null, response, response.code);
        })
    }

}