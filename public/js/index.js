let socket = io();
socket.on('connect', function () {
    console.log('Client connected to server.');

    socket.emit('createMessage', {
        from: 'someone',
        text: 'some random texts sent to the server.',
    });
});

socket.on('disconnect', function () {
    console.log('Client disconnected from server.');
});

socket.on('newMessage', function (message) {
    console.log('New message:', message);
});