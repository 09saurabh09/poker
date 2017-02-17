"use strict";

let GameModel = DB_MODELS.GameModel;
let PokerTableModel = DB_MODELS.PokerTable;

/**
 * This job will be created after hand will be over from game server
 * @param {Object} job: will contain data for pots related to table 
 * @param {function} done: callback when job finishes
 */

GAME_QUEUE.process('gameOverMoneyTransaction', function (job, done) {
    console.log(`INFO ::: Picked up job gameOverMoneyTransaction with data ${JSON.stringify(job)}`);
    let pots = job.data.pots;
    let gameId = job.data.gameId;
    let rakeMoney = 0;
    let moneyDistribution = {};
    pots.forEach(function (pot) {
        let stakeHolders = pot.stakeHolders;
        if (stakeHolders.length == 2) {
            let moneyForEachPlayer = (pot.amount / stakeHolders.length);
            stakeHolders.forEach(function (userId) {
                moneyDistribution[userId] = (moneyDistribution[userId] || 0) + moneyForEachPlayer;
            });
        } else {
            let moneyForEachPlayer = ((pot.amount - pot.rakeMoney) / stakeHolders.length);
            stakeHolders.forEach(function (userId) {
                moneyDistribution[userId] = (moneyDistribution[userId] || 0) + moneyForEachPlayer;
            });
            rakeMoney += pot.rakeMoney;
        }
    });

    let moneyDistributionQuery = `Update "Games" SET "rake" = ${rakeMoney} where id = ${gameId};`;
    Object.keys(moneyDistribution).forEach(function (userId) {
        moneyDistributionQuery += `UPDATE "Users" SET "currentBalance" = "currentBalance" + ${moneyDistribution[userId] || 0} WHERE id = ${userId};`
    });
    console.log(`INFO ::: Final result \n ${moneyDistributionQuery}`, `RakeMoney: ${rakeMoney}`);
    return DB_MODELS.sequelize.transaction(function (t) {
        return DB_MODELS.sequelize.query(moneyDistributionQuery, { transaction: t })
    }).then(function (result) {
        done();
    }).catch(function (err) {
        done(err);
    })
});

GAME_QUEUE.process('gameOverUpdateGame', function (job, done) {
    let data = job.data;
    let updateObject = {
        rake: data.rakeEarning,
        finalGameState: data.gameState,
        earnings: data.earnings,
        status: 'finished'
    }
    GameModel.update(updateObject, { where: { id: data.gameState.currentGameId } }).then(function (game) {
        console.log(`SUCCESS ::: Game with id ${data.gameState.currentGameId} updated`);
        done();
    }).catch(function (err) {
        console.log(`ERROR ::: Unable to update game with id: ${data.gameState.currentGameId}, error: ${err.message}, stack: ${err.stack}`);
        done(err);
    });
});

GAME_QUEUE.process('gameStateUpdated', function (job, done) {
    let data = job.data;
    let pokerTableId = data.pokerTableId;
    let updateObject = {
        gameState: data.gameState
    }

    // return DB_MODELS.sequelize.transaction(function (t) {
    //     // Can update gameHistory status also in transaction
    // });

    PokerTableModel.update(updateObject, { where: { id: pokerTableId, updatedAt: {"$lte": data.createdAt} } }).then(function (game) {
        console.log(`SUCCESS ::: poker table game state with id ${pokerTableId} updated`);
        done();
    }).catch(function (err) {
        console.log(`ERROR ::: Unable to update poker table game state with id ${pokerTableId}, error: ${err.message}, stack: ${err.stack}`);
        done(err);
    });
});