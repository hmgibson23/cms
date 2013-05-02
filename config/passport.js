/**
 * Config file for loading Passport for user authentication
 */

var passport = require('passport')
	, LocalStrategy = require('passport-local').Strategy
	, User = require('./../models/user');


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

//serialization functions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.userModel.findById(id, function (err, user) {
    done(err, user);
  });
});