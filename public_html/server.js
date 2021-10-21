var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    users = [];
//specify the html we will use
app.use('/', express.static(__dirname ));

server.listen(process.env.OPENSHIFT_NODEJS_PORT || 3000);//publish to openshift
//console.log('server started on port'+process.env.PORT || 3000);
//handle the socket
io.sockets.on('connection', function(socket) {
    //new user login
    socket.on('login', function(nickname) {
        if (users.indexOf(nickname) > -1) {
            socket.emit('nickExisted');
        } else {
            //socket.userIndex = users.length;
            socket.nickname = nickname;
            users.push(nickname);
            socket.emit('loginSuccess');
            io.sockets.emit('system', nickname, users.length, 'login');
        };
    });
    //user leaves
    socket.on('disconnect', function() {
        if (socket.nickname != null) {
            //users.splice(socket.userIndex, 1);
            users.splice(users.indexOf(socket.nickname), 1);
            socket.broadcast.emit('system', socket.nickname, users.length, 'logout');
        }
    });
    //new message get
    socket.on('postMsg', function(msg, color,fkGroupId,fkUserID) {
        socket.broadcast.emit('newMsg', socket.nickname,fkGroupId,fkUserID, msg, color);
    });
    //new image get
    socket.on('img', function(imgData, color,fkGroupId,fkUserID) {
        socket.broadcast.emit('newImg', socket.nickname,fkGroupId,fkUserID,imgData, color);
    });
    socket.on('voice', function(url, color,fkGroupId,fkUserID) {
        socket.broadcast.emit('newVoice', socket.nickname,fkGroupId,fkUserID,url, color);
    });
});
