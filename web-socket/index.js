var server = require('websocket').server, http = require('http');

var socket = new server({
    httpServer: http.createServer().listen(1337, () => console.log("Socket Server started at PORT : 1337"))
});

socket.on('request', function (request) {
    var connection = request.accept(null, request.origin);
    connection.on('message', function (message) {
        console.log(message.utf8Data);
        // connection.sendUTF(message.utf8Data)
        socket.broadcast(message.utf8Data)
    });

    connection.on('close', function (connection) {
        console.log('connection closed');
    });
});