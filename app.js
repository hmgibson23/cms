
/**
 * Module dependencies.
 */


//requirements
var express = require('express')
, routes = require('./routes')
, User = require('./models/user')
, user = require('./routes/user')
, models = require('./models')
, http = require('http')
, path = require('path')
, pass = require('./config/passport')
, passport = require('passport')
, mongoose = require('mongoose')
, flash = require('connect-flash')
, vehicles = require('./routes/vehicles')
, LocalStrategy = require('passport-local').Strategy
, MongoStore = require('connect-mongo')(express);




//main application initialisation
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.cookieParser('super duper secret')); //ssshhhhh don't tell anyone!
//use mongostore for sessions - it's more secure!
app.use(express.session({
	secret:'super duper secret',
	maxAge: new Date(Date.now() + 3600000),
	store: new MongoStore(
		{db: mongoose.connection.db},
		function(err){
			console.log(err || 'connect-mongodb setup ok');
		})
}));

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}





//GET Routes
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/newuser', user.newuser);
app.get('/login', user.login);



//POST Routes
app.post('/register', user.register);
//hard-coded as uses passport and is pretty simple
app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      req.session.messages =  [info.message];
      return res.redirect('/login')
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
});


//VEHICLE ROUTES
app.get('/vehicles', vehicles.vehicles);
app.post('/vehicles', vehicles.new_vehicle);
app.put('/vehicles/:id', vehicles.update_vehicle);
app.del('/vehicles/:id', vehicles.delete_vehicle);


http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
