const mongoose = require('mongoose');
const env = require('./environment');
console.log(env);
mongoose.connect(env.dbPath);

const db = mongoose.connection; 

// db.on('error', console.log("error connecting to database!!"));
db.on('error', console.error.bind(console, "Got error while connecting to db"));

db.once('open', () => {console.log("Connected to database successfully !!")})

module.exports = db;