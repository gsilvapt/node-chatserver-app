/**
 * Third-party node modules
 */
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

/**
 * Constants and other constant variables defined in scope.
 */
const {
  generateMessage
} = require('./utils/message')
const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 8000;

let app = express();
// Instead of using express's built-in http server. This allows to use socket.io
let server = http.createServer(app);
let io = socketIO(server); // this allows new connections to the server.
app.use(express.static(publicPath));

// Listens to new connection when it comes in.
io.on('connection', (socket) => {

  // Welcomes new user.
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  // Warns everyone a new user joined.
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'));

  socket.on('createMessage', (message, callback) => {
    console.log('Message received: ', message);
    // emits a message to all connections.
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server.');
    //   socket.broadcast.emit('newMessage', {
    //     from: message.from,
    //     text: message.text,
    //     createdAt: new Date().getTime()
    // });

    socket.on('disconnect', () => {
      console.log('User disconnected.')
      socket.broadcast.emit('newMessage', generateMessage('Admin', 'An user left.'));
    });

  });
});

server.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});