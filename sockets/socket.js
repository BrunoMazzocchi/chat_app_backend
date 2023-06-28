const { io } = require('../index');
const { verifyJWT } = require('../helpers/jwt');
const { userConnected, userDisconnected, saveMessage } = require('../controllers/socket');
// Socket messages 
// The server (Node) listens for connections from clients (browser)
io.on('connection', client => {
  console.log('Client connected');

  // Handshake
  const [valid, uid] = verifyJWT(client.handshake.headers['x-token']);

  if (!valid) { return client.disconnect(); }
  userConnected(uid);

  // Enter the user to a specific room
  // global, client.id, 5f9c9c7b7b3b7a2a3c7b7b7b
  client.join(uid);

  // Listen the event from the client
  client.on('personal-message', async (payload) => {
    // Save message in database
    await saveMessage(payload);
    io.to(payload.to).emit('personal-message', payload);
  });



  // The server (Node) listens for disconnections from clients (browser)
  client.on('disconnect', () => {
    userDisconnected(uid);
  });

  // The server (Node) listens for messages from clients (browser)
  client.on('message', (data) => {
    console.log(data);
    io.emit('nuevo-mensaje', data);
  });

});

