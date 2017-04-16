/**
 * Created by saurabhk on 28/12/16.
 */
"use strict";

var io = require('socket.io')();
let jwt = require("jsonwebtoken");


io.use(function (socket, next) {
    // make sure the handshake data looks good as before
    // if error do this:
    // next(new Error('not authorized');
    // else just call next
    jwt.verify(socket.handshake.query.token, GlobalConstant.tokenSecret, function (err, user) {
        if (err) {
            console.log(`ERROR ::: Unable to authorize socket, error: ${err.message}, stack: ${err.stack}`);
            return next(new Error('not authorized'));
        } else {
            socket.user = user;
            return next();
        }
    });
});

io.on('connection', function (socket) {
    console.log("player connected");
    // console.log(socket.handshake.decoded_token.email, 'connected');
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data, socket.user);
    });

    socket.on('disconnect', function (socket) {
        console.log(`Player disconnected`);
    });
});

module.exports = io;