"use strict";

let GameModel    = DB_MODELS.Game;
let UserModel    = DB_MODELS.User;
let PokerTable   = DB_MODELS.PokerTable

module.exports = {
    // This will deduct money from account and will add to the table, 
    // User might be playing at multiple tab
    /**
     * This will deduct money from account and will add to the table
     * @param {Number} params.tableId 
     * @param {Number} params.amount
     * @return {Object} currentUser object
     */
    addMoneyToTable: function(params, user, callback) {
        let {tableId, amount} = params;
        let userId = user.id;
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

        BLUEBIRD_PROMISE.all([pokerTablePromise, userPromise])
        .then(function(result) {
            let table = result[0];
            let user = result[1];
            return DB_MODELS.sequelize.transaction(function (t) {
                
                
                // chain all your queries here. make sure you return them.
                return table.increment('gameState.currentBalance', {by: amount}, {transaction: t})
                .then(function (game) {
                    return user.decrement('currentBalance', {by: amount}, {transaction: t});
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
        .then(null, function(err) {
            console.log(`ERROR ::: ${err.message}`);
        })

    }
};