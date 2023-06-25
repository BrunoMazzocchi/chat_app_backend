const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');
const bands = new Bands();


bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Heroes del Silencio'));
bands.addBand(new Band('Metallica'));
bands.addBand(new Band('Iron Maiden'));
bands.addBand(new Band('AC/DC'));



// Socket messages 
// The server (Node) listens for connections from clients (browser)
io.on('connection', client => {
  console.log('Client connected');

  client.emit('active-bands', bands.getBands()); 

  client.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // The server (Node) listens for messages from clients (browser)
  client.on('message', (data) => {
    console.log(data);
    io.emit('nuevo-mensaje', data);
  });

  client.on('vote-band',  (data) => {
    bands.voteBand(data.id);
    io.emit('active-bands', bands.getBands());
    console.log(data);
  });

  client.on('add-band',  (data) => {
    bands.addBand(new Band(data.name));
    io.emit('active-bands', bands.getBands());
    console.log(data);
  });

  client.on('delete-band',  (data) => {
    bands.deleteBand(data.id);
    io.emit('active-bands', bands.getBands());
    console.log(data);
  });

});

