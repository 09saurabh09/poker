"use strict";

let bcrypt = require('bcrypt');

exports.cryptPassword = function (password) {
    return new PROMISE(function (resolve, reject) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) {
                    reject(err)
                } else {
                    resolve(hash);
                }
            });

        });
    });

};

exports.comparePassword = function (password, userPassword) {
    return new PROMISE(function (resolve, reject) {
        bcrypt.compare(password, userPassword, function (err, isPasswordMatch) {
            if (err) {
                reject(err);
            } else {
                resolve(isPasswordMatch)
            }
        });
    });

};