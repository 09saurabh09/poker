"use strict";
let UserModel = DB_MODELS.User;

module.exports = {
    authenticate: function(params) {
        UserModel.findOne({
            where: {
                email: params.email
            }
        })
        .then(function(user) {
            
        })
    }
}