var mongoose = require('mongoose'),
    User = require('./user'),
    Vehicle = require('./vehicle');

    
mongoose.connect('mongodb://localhost/cms');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log('connection made');
});