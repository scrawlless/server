const mongoose = require('mongoose');

require('dotenv').config();
const url = process.env.DB_URL;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + url);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

require('./User');
