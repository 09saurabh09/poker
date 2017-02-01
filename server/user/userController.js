"use strict";

let UserModel = DB_MODELS.User;
let userService = require("../user/userService");
let responseHelper = require("../utils/responseHelper");

module.exports = {
    create: function(req, res) {
        userService.create(req.body.user, function(err, response, statusCode) {
            responseHelper(err, res, response, statusCode);
        })
    },

    authenticate: function(req, res) {
        userService.authenticate(req.body.user, function(err, response, statusCode) {
            responseHelper(err, res, response, statusCode);
        })
    }
};