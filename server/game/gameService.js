"use strict";

let responseMessage = require("../utils/responseMessage");


let GameModel    = DB_MODELS.Game;
let UserModel    = DB_MODELS.User;
let PokerTable   = DB_MODELS.PokerTable


//UPDATE "Users" SET "currentBalance"="currentBalance" + -500,"updatedAt"='2017-01-14 13:14:07.493 +00:00' WHERE "id" = 1 RETURNING *

module.exports = {
    // This will deduct money from account and will add to the table, 
    // User might be playing at multiple tab
    /**
     * This will deduct money from account and will add to the table
     * @param {Number} params.tableId 
     * @param {Number} params.amount
     * @return {Object} currentUser object
     */
    addMoneyToTable: function({tableId, amount}, currentUser, callback) {
        let userId = currentUser.id;
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

            // let query = `UPDATE "PokerTables" SET gameState = jsonb_set(gameState,'{currentBalance}','123') WHERE id = 1;`;
            let query = `UPDATE "PokerTables" SET "gameState" = "gameState" || CONCAT('{"currentBalance":', COALESCE("gameState"->>'currentBalance','0')::int + ${amount}, '}')::jsonb WHERE id = ${table.id};`
            // table.set("gameState.currentBalance", table.gameState.currentBalance + amount);
            // table.changed().concat(['gameState.currentBalance']);
            return DB_MODELS.sequelize.transaction(function (t) {
                
                
                // chain all your queries here. make sure you return them.
            return DB_MODELS.sequelize.query(query, {transaction: t})
                .then(function (table) {
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
        .catch(function(err) {
            console.log(`ERROR ::: ${err.message}`);
        })

    },

    listTables: function(callback) {
        let response;
        PokerTable.findAll()
            .then(function(tables) {
                response = new responseMessage.GenericSuccessMessage();
                response.data = tables;
                callback(null, response, response.code);
            })
            .catch(function() {

            })
    }
};