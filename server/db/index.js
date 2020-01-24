const mongoose = require('mongoose');
const config = require('./config.json');

mongoose.Promise = global.Promise;


const connectionURL = `mongodb://${config.db.host}/${config.db.name}`;
mongoose.connect(connectionURL, { useNewUrlParser: true,  useUnifiedTopology: true})
.catch((e) => console.error(e));
const db = mongoose.connection;

db.on('connected', () => {
    console.log('Mongoose connection open on ' + connectionURL)
});

db.on('error',(err) => console.error(err));


db.on('disconnected', () => {
    console.log('mongoose connection dosconected')
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log('mongoose connection closed throw app terminatatnio');
        process.exit(0);
    });
});