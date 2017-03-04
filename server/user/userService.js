"use strict";
let UserModel = DB_MODELS.User;
let responseMessage = require("../utils/responseMessage");
let userManager = require("../utils/userManager");
let jwt = require("jsonwebtoken");

module.exports = {
    create: function (params, callback) {
        let response;
        params.password = userManager.cryptPassword(params.password.toString())
            .then(function (hash) {
                params.password = hash;
                UserModel.create(params)
                    .then(function (user) {
                        response = new responseMessage.GenericSuccessMessage();
                        callback(null, response, response.code);
                    })
                    .catch(function (err) {
                        console.log(`ERROR ::: Unable to create user, error: ${err.message}, stack: ${err.stack}`);
                        response = new responseMessage.GenericFailureMessage();
                        callback(null, response, response.code);
                    })
            })
            .catch(function (err) {
                console.log(`ERROR ::: Unable to create password hash, error: ${err.message}, stack: ${err.stack}`);
                response = new responseMessage.GenericFailureMessage();
                callback(null, response, response.code);
            })

    },

    authenticate: function (params, callback) {
        let response
        UserModel.findOne({
            where: {
                email: params.email
            },
            raw: true
        })
            .then(function (user) {
                if (user) {
                    return userManager.comparePassword(params.password.toString(), user.password)
                        .then(function (isPasswordMatched) {
                            if (isPasswordMatched) {

                                delete user.password;
                                var token = jwt.sign(user, GlobalConstant.tokenSecret, {
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
    }

}