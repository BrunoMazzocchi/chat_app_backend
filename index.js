const express = require('express');
const path = require('path');
require('dotenv').config();

// App express
const app = express();

// Read and parse body 
app.use(express.json());


// DB Config
const { dbConnection } = require('./database/config');
dbConnection();

// Socket server 
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/socket');

server.listen(3000);

// Public path 
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

// My routes
app.use('/api/login', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${process.env.PORT}`);
});