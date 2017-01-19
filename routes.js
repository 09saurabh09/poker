/**
 * Created by saurabhk on 27/12/16.
 */

"use strict";

let gameRoute = require("./server/game/gameRoute");

module.exports = function(app) {

    // Insert routes below
    app.use('/api/game', gameRoute);

    //app.use('/healthcheck', healthCheck);

};

