const mongoose = require('mongoose');

// Connection to MongoDB
const dbConnection = async() => {
    try {
        await mongoose.connect(
            process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false
        });
        console.log('Database online');
    } catch (error) {
        console.log(error);
        throw new Error('Error when initializing the database');
    }
};

module.exports = {
    dbConnection
};