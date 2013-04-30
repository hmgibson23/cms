var mongoose = require('mongoose'),
    Page = require('./content'),
    User = require('./user'),
    LoginToken = require('./token');

    
mongoose.connect('mongodb://localhost/guletweek');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log('connection made');
});