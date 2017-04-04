"use strict";

let jwt = require("jsonwebtoken");

let UserModel = DB_MODELS.User;

module.exports = {
    authenticate: function (req, res, next) {
        let token = req.headers['x-access-token'];
        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, GlobalConstant.tokenSecret, function (err, user) {
                if (err) {
                    return res.status(401).send({ success: false, message: 'Failed to authenticate token' });
                } else {
                    // if everything is good, save to request for use in other routes
                    UserModel.findOne({
                        where: {
                            id: user.id
                        },
                        attributes: { exclude: ['password'] }
                    }).then(function (user) {
                        if (user) {
                            req.user = user;
                            next();
                        } else {
                            return res.status(404).send({
                                success: false,
                                message: 'User not present'
                            });
                        }
                    }).catch(function (err) {
                        console.log(`ERROR ::: Unable to authenticate user, error: ${err.message}, stack: ${err.stack}`);
                        return res.status(401).send({
                            success: false,
                            message: 'User authentication failed'
                        });
                    })
                }
            });

        } else {
            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    }
}