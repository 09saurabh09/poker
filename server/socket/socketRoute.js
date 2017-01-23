/**
 * Created by saurabhk on 28/12/16.
 */
"use strict";

var io = require('socket.io')();

io.on('connection', function (socket) {
    console.log("player connected");
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

module.exports = io;