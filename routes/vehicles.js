/*
Routes for updating Vehicles
*/
var Vehicle = require('../models/vehicle');

exports.vehicles = function(req, res) {
	Vehicle.find(function(err, results) {
		if(err) {
			console.log(err);
			return res.send({
				error: err
			});
		} else {
			return res.send(results);
		}
	});
}

exports.new_vehicle = function(req, res) {
	var v = new Vehicle();
	v.image = req.body.image;
	v.manufacturer = req.body.manufacturer;
	v.registration = req.body.registration;
	v.color = req.body.color;
	v.mileage = req.body.mileage;
	v.list_price = req.body.list_price;
	v.sold = false; //can't have been sold if just registered
	v.date_registered = new Date();
	v.date_sold = null
	v.description = req.body.description;
	v.save(function(err) {
		if(err) {
			console.log(err);
		} else {
			return res.send(req.body);
		}
	});
}

exports.update_vehicle = function(req, res) {
	Vehicle.findOne({_id: req.params.id}, function(err, veh) {
		if(!veh) {
			console.log('No such vehicle exists');
		}
	veh.manufacturer = req.body.manufacturer;
	veh.registration = req.body.registration;
	veh.color = req.body.color;
	veh.mileage = req.body.mileage;
	veh.list_price = req.body.list_price;
	veh.sold = req.body.sold; //can't have been sold if just registered
	veh.date_registered = new Date();
	veh.date_sold = req.body.date_sold
	veh.description = req.body.description;
	return veh.save(function(err){
		if(err) {
			console.log(err);
		} else {
			return res.send(req.body);
		}
	});
	});
}

exports.delete_vehicle = function(req, res) {
	Vehicle.findOne({_id: req.params.id}, function(err, veh) {
		if(!veh) {
			console.log(err);
		} else {
			return veh.remove(function() {
				res.send('removed');
			});
		}
	});
}