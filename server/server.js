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
const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

let app = express();
// Instead of using express's built-in http server. This allows to use socket.io
let server = http.createServer(app);
let io = socketIO(server); // this allows new connections to the server.
app.use(express.static(publicPath));

// Listens to new connection when it comes in.
io.on('connection', (socket) => {
  console.log('New user connected.');

  socket.emit('newMessage', {
    from: 'someone',
    text: 'some random text sent',
    createdAt: 123
  });

  socket.on('createMessage', (message) => {
    console.log('Message received: ', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected.')
  });
});

server.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
})