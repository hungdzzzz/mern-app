const mongoose = require('mongoose');
let database_url = 'mongodb+srv://Hungdz1:123@cluster0.gbstyl8.mongodb.net/?retryWrites=true&w=majority';

// Connecting to the database
mongoose.connect(database_url, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

module.exports = mongoose.connection;