"use strict";

let GameModel = DB_MODELS.Game;
let UserModel = DB_MODELS.User;

module.exports = {
    addMoneyToTable: function(params, callback) {
        return DB_MODELS.sequelize.transaction(function (t) {

            // chain all your queries here. make sure you return them.
            return GameModel.create({
                gameState: {test: "its great"}
            }, {transaction: t}).then(function (user) {
                return UserModel.create({
                username: 'John',
                email: 'Boothe'
                }, {transaction: t});
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
    }
};