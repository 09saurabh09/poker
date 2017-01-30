/**
 * Created by saurabhk on 28/12/16.
 */
"use strict";

var io = require('socket.io')();
var socketioJwt = require('socketio-jwt');

io.use('authorization', socketioJwt.authorize({
  secret: GlobalConstant.tokenSecret,
  handshake: true
}));

io.on('connection', function (socket) {
    console.log("player connected");
    // console.log(socket.handshake.decoded_token.email, 'connected');
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

module.exports = io;