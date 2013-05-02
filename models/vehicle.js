var mongoose = require('mongoose'),
Schema = mongoose.Schema;


VehicleSchema = new Schema({
	'image': String, //src to image resource
    'manufacturer': String,
    'registration': {type: String, unique:true},    
    'color' : String,
    'mileage': Number,
    'list_price': Number,
    'date_registered': Date,
    'sold': Boolean,
    'date_sold': Date,
    'description': String
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
