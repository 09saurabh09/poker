"use strict";

let Queue = require("bull");

let GameModel = DB_MODELS.Game;
let PokerTableModel = DB_MODELS.PokerTable;
let UserGamesModel = DB_MODELS.UserGame;


POKER_QUEUE.gameStateUpdated = Queue('gameStateUpdated', GlobalConstant.bullQueueRedisConnectionOptions);
POKER_QUEUE.gameOverUpdateGame = Queue('gameOverUpdateGame', GlobalConstant.bullQueueRedisConnectionOptions);
POKER_QUEUE.gameStartCreateUserGames = Queue('gameStartCreateUserGames', GlobalConstant.bullQueueRedisConnectionOptions);

POKER_QUEUE.gameOverUpdateGame
    .on('ready', function () {
        POKER_QUEUE.gameOverUpdateGame.process(function (job, done) {
            console.log(`INFO ::: Job gameOverUpdateGame with data ${JSON.stringify(job.data)} is being picked up`);
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
    })
    .on('error', function (err) {
        console.log(`ERROR ::: Error in processing queue gameOverUpdateGame. error: ${err.message}, stack: ${err.stack}`);
    })

POKER_QUEUE.gameStateUpdated
    .on('ready', function () {
        POKER_QUEUE.gameStateUpdated.process(function (job, done) {
            console.log(`INFO ::: Job gameStateUpdated with data ${JSON.stringify(job.data)} is being picked up`);
            let data = job.data;
            let pokerTableId = data.pokerTableId;
            let updateObject = {
                gameState: data.gameState
            }

            // return DB_MODELS.sequelize.transaction(function (t) {
            //     // Can update gameHistory status also in transaction
            // });

            PokerTableModel.update(updateObject, { where: { id: pokerTableId, updatedAt: { "$lte": data.createdAt } } }).then(function (game) {
                console.log(`SUCCESS ::: poker table game state with id ${pokerTableId} updated`);
                done();
                return null;
            }).catch(function (err) {
                console.log(`ERROR ::: Unable to update poker table game state with id ${pokerTableId}, error: ${err.message}, stack: ${err.stack}`);
                done(err);
                return null;
            });
        });
    })
    .on('error', function (err) {
        console.log(`ERROR ::: Error in processing queue gameStateUpdated. error: ${err.message}, stack: ${err.stack}`);
    })

POKER_QUEUE.gameStartCreateUserGames
    .on('ready', function () {
        POKER_QUEUE.gameStartCreateUserGames.process(function (job, done) {
            console.log(`INFO ::: Job gameStartCreateUserGames with data ${JSON.stringify(job.data)} is being picked up`);
            let gameState = job.data;
            let players = gameState.players;
            let userGamePromise = [];
            players.forEach(function(player) {
                if(player) {
                    userGamePromise.push(UserGamesModel.create({
                        GameId: gameState.currentGameId,
                        UserId: player.id,
                        sessionKey: player.sessionKey,
                        pokerTableId: gameState.tableId
                    }));
                }
            });

            PROMISE.all(userGamePromise)
                .then(() => {
                    console.log(`SUCCESS ::: User game created for game id ${gameState.currentGameId}`);
                })
                .catch((err) => {
                    console.log(`ERROR ::: Unable to create user games for game ${gameState.currentGameId}, error: ${err.message}, stack: ${err.stack}`);
                })
        });
    })
    .on('error', function (err) {
        console.log(`ERROR ::: Error in processing queue gameStartCreateUserGames. error: ${err.message}, stack: ${err.stack}`);
    })
