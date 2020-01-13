const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = 3000;

app.use(express.static('../view'));

io.on('connection', socket => {
    console.log(`new user connected ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`user ${socket.id} disconnected`);
    });

    socket.on('send message', msg => {
        const obj = {
          author: socket.id.substr(1, 4),
            message: msg,
            date: new Date()
        };
        io.emit('receive message', obj)
    })
});

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});
