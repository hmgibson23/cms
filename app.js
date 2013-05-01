
/**
 * Module dependencies.
 */


//requirements
var express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, models = require('./models')
, User = require('./models/user')
, http = require('http')
, path = require('path')
, passport = require('passport')
, mongoose = require('mongoose')
, flash = require('connect-flash')
, LocalStrategy = require('passport-local').Strategy
, MongoStore = require('connect-mongo')(express);


//setup passport for authentication use must follow app initial configuration
passport.use(new LocalStrategy(
function(username, password, done) {
	console.log('finding user: ' + username);
	console.log('with password: ' + password);
	User.findOne({username: username}, function(err, user) {
		if (err) { 
			console.log(err);
			return done(err); 
		}
		if (!user) {
			console.log('no such user: ' + username);
			return done(null, false, { message: 'Incorrect username.' });
		}
		if(user.authenticate(password)) {
			console.log('no such password');
			return done(null, false, { message: 'Incorrect password.' });
		}
		console.log('you appear to have logged in');
		return done(null, user);
	});
}
));

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
app.post('/login', 
	passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
	function(req, res) {
		res.redirect('/');
	});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
