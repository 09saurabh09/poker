"use strict";

let UserModel = DB_MODELS.User;
let userService = require("../user/userService");
let responseHelper = require("../utils/responseHelper");
let responseMessage = require("../utils/responseMessage");

module.exports = {
    create: function (req, res) {
        userService.create(req.body.user, function (err, response, statusCode) {
            responseHelper(err, res, response, statusCode);
        })
    },

    update: function(req, res) {
        userService.update(req.body.user, req.user, function (err, response, statusCode) {
            responseHelper(err, res, response, statusCode);
        })
    },

    authenticate: function (req, res) {
        userService.authenticate(req.body.user, function (err, response, statusCode) {
            responseHelper(err, res, response, statusCode);
        })
    },

    getUserInfo: function (req, res) {
        let responseGroup = req.query.responseGroup || "small";

        switch (responseGroup) {
            case "small":
                let response = new responseMessage.GenericSuccessMessage();
                response.data = req.user;
                responseHelper(null, res, response, response.code);
                break;

            case "large":
                userService.getUserInfo(req.user, function (err, response, statusCode) {
                    responseHelper(err, res, response, statusCode);
                })
                break;
        }

    },

    getSessionHistory: function(req, res) {
        let params = req.query;
        userService.getSessionHistory(params, req.user, function(err, response, statusCode) {
            responseHelper(err, res, response, statusCode);
        })
    }
};