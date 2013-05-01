
var connect_login = require('connect-ensure-login')
	, ensureLoggedIn = connect_login.ensureLoggedIn;

//index page
exports.index = function(req, res){
	ensureLoggedIn('/login');
	return res.render('index', { title: 'Express' });
};




//REST 