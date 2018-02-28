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
  generateMessage,
  generateLocationMessage
} = require('./utils/message')

const {
  isRealString
} = require('./utils/validation')

const {
  Users
} = require('./utils/users')

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 8000;

let app = express();
// Instead of using express's built-in http server. This allows to use socket.io
let server = http.createServer(app);
let io = socketIO(server); // this allows new connections to the server.
let users = new Users();

app.use(express.static(publicPath));

// Listens to new connection when it comes in.
io.on('connection', (socket) => {

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room name are required.')
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room)

    io.to(params.room).emit('updateUserList', Users.getUserList(params.room))

    // Welcomes new user.
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    // Warns everyone a new user joined.
    socket.broadcast.to(params.room)
      .emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  })

  socket.on('createMessage', (message, callback) => {
    let user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    let user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name,
        coords.latitude, coords.longitude));
    }

  });

  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to().emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });

});

server.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});