const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const port = 3000;
const dbName = 'chat';
const client = new MongoClient('mongodb://localhost:27017', {useUnifiedTopology: true});

client.connect(err => {
    assert.equal(null, err);
    console.log('Connected to server...');
    app.use(express.static(__dirname + '/../view'));
    const db = client.db(dbName);

    io.on('connection', socket => {
        console.log(`new user connected ${socket.id}`);

        db.collection('messages').find().toArray((err, res) => {
            assert.equal(null, err);
            socket.emit('receive all messages', res);
        });

        socket.on('disconnect', () => {
            console.log(`user ${socket.id} disconnected`);
        });

        socket.on('send message', msg => {
            const obj = {
                author: socket.id.substr(1, 4),
                message: msg,
                date: new Date()
            };
            db.collection('messages').insertOne(obj, err => {
                assert.equal(null, err);
                io.emit('receive message', obj);
                console.log('success');
            });


        })
    });

    server.listen(port, () => {
        console.log(`listening on port ${port}`);
    });

});


