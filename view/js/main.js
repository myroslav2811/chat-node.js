window.addEventListener('load', () => {

    const dateOptions = {
        hour12: false,
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    };

    const socket = io();

    const appendMessage = msg => {
        const li = document.createElement('li');
        li.innerHTML = `${msg.author}: ${msg.message} (${new Date(msg.date).toLocaleString("en-US", dateOptions)})`;
        document.getElementById('message-list').appendChild(li);
    };

    const sendMessageHandler = event => {
        event.preventDefault();
        let msg = document.getElementById('message-input');
        socket.emit('send message', msg.value);
        msg.value = '';
    };

    document.getElementById('send-message').addEventListener('submit', sendMessageHandler);

    socket.on('receive all messages', arr => {
        console.log(arr);
        arr.forEach(appendMessage);
    });

    socket.on('receive message', appendMessage);

});

