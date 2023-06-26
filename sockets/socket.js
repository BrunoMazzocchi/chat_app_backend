const { io } = require('../index');


// Socket messages 
// The server (Node) listens for connections from clients (browser)
io.on('connection', client => {
  console.log('Client connected');

  client.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // The server (Node) listens for messages from clients (browser)
  client.on('message', (data) => {
    console.log(data);
    io.emit('nuevo-mensaje', data);
  });

});

