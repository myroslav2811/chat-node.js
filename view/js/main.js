window.addEventListener('load', () => {

    const socket = io();

    const appendMessage = msg => {
        const li = document.createElement('li');
        li.innerHTML = `${msg.author}: ${msg.message} (${msg.date})`;
        document.getElementById('message-list').appendChild(li);
    };

    const sendMessageHandler = () => {
        let msg = document.getElementById('message-input');
        socket.emit('send message', msg.value);
        msg.value = '';
    };

    document.getElementById('send-message').addEventListener('click', sendMessageHandler);

    socket.on('receive all messages', arr => {
        console.log(arr);
        arr.forEach(appendMessage);
    });

    socket.on('receive message', appendMessage);

});

