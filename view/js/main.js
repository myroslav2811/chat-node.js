window.addEventListener('load', () => {

    const appendMessage = msg => {
        const li = document.createElement('li');
        li.innerHTML = `${msg.author}: ${msg.message} (${msg.date})`;
        document.getElementById('message-list').appendChild(li);
    };

    fetch('./messages.json')
        .then(data => data.json())
        .then(data => {
            data.messages.forEach(appendMessage);
        });

    const socket = io();

    const sendMessageHandler = () => {
        const msg = document.getElementById('message-input').value;
        socket.emit('send message', msg);
    };

    socket.on('receive message', appendMessage);

    document.getElementById('send-message').addEventListener('click', sendMessageHandler);


});

