const { io } = require('../index');
const { verifyJWT } = require('../helpers/jwt');
const { userConnected, userDisconnected } = require('../controllers/socket');
// Socket messages 
// The server (Node) listens for connections from clients (browser)
io.on('connection', client => {
  console.log('Client connected');

  // Handshake
  const [valid, uid] = verifyJWT(client.handshake.headers['x-token']);

  if (!valid) { return client.disconnect(); }
   userConnected(uid);


  client.on('disconnect', () => {
    userDisconnected(uid);
  });

  // The server (Node) listens for messages from clients (browser)
  client.on('message', (data) => {
    console.log(data);
    io.emit('nuevo-mensaje', data);
  });

});

