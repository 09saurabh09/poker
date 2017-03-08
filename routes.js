/**
 * Created by saurabhk on 27/12/16.
 */

"use strict";

let customMiddleWare = require("./server/utils/customMiddleWare");

let gameRoute = require("./server/game/gameRoute").router;
let gamePublicRoute = require("./server/game/gameRoute").publicRouter;
let userRoute = require("./server/user/userRoute").router;
let userPublicRoute = require("./server/user/userRoute").publicRouter;
let tournamentRoute = require("./server/tournament/tournamentRoute").router;

module.exports = function(app) {

    // Insert routes below
    app.use('/api/game', [customMiddleWare.authenticate], gameRoute);

    app.use('/api/public/game', gamePublicRoute);

    app.use('/api/public/user', userPublicRoute);

    app.use('/api/user', [customMiddleWare.authenticate], userRoute);

    app.use('/api/tournament', [customMiddleWare.authenticate], userRoute);
    //app.use('/healthcheck', healthCheck);

};

