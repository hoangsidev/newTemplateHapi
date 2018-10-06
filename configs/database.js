const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/testDB', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected mongoDB !');
});
module.exports = mongoose;