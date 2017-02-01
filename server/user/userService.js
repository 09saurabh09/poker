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
                        console.log(`ERROR ::: Unable to create user, error: ${err.message}`);
                        response = new responseMessage.GenericFailureMessage();
                        callback(null, response, response.code);
                    })
            })
            .catch(function (err) {
                console.log(`ERROR ::: Unable to create password hash, error: ${err.message}`);
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
                                    expiresIn: 24 * 60 * 60 // expires in 24 hours
                                });
                                response = new responseMessage.GenericSuccessMessage();
                                response.data = {
                                    token: token
                                }
                                callback(null, response, response.code);

                            } else {

                                console.log(`ERROR ::: Password does not match for for email: ${params.email}`);
                                response = new responseMessage.GenericFailureMessage();
                                response.message = "Either username or password is incorrect";
                                callback(null, response, response.code);

                            }
                        })
                        .catch(function (err) {
                            console.log(`ERROR ::: Unable to match password for email: ${params.email}, error: ${err.message}`);
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
                console.log(`ERROR ::: Unable to match password for email: ${params.email}, error: ${err.message}`);
                response = new responseMessage.GenericFailureMessage();
                callback(null, response, response.code);
            })
    }
}