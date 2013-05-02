var mongoose = require('mongoose'),
Schema = mongoose.Schema;


UserSchema = new Schema({
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