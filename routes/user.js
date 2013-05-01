var User = require('../models/user');
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};


exports.newuser = function(req, res) {
	return res.render('register' , {
		title : 'Register New User',
	 });
};

exports.register = function(req, res) {
	
	var u = new User();
	u.first_name = req.body.first_name;
	u.last_name = req.body.last_name;
	u.email = req.body.email;
	u.username = req.body.email; //no difference between email and username
	u.password = req.body.password;
	u.join_date = new Date();
	u.last_login = new Date();
	
	u.save(function(err) {
		if(err) {
			console.log(err);
		} else {
			res.send({
				result : 'Successfully created new user.'
			});
		}
	})

}

//login page
exports.login = function (req, res) {
    return res.render('login', { title : 'Log In'});
};