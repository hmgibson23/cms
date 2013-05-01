var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

/**
 * Model: User
 */

function validatePresenceOf(value) {
    return value && value.length;
}

UserSchema = new Schema({
    'first_name': String,
    'last_name': String,    
    'email': {
        type: String,
        validate: [validatePresenceOf, 'an email is required'],
        index: {
            unique: true,
            dropDups: true
        }
    },
    'username' : {type: String, unique: true},
    'hased_password': String,
    'salt': String,
    'last_login': {type: Date, default: Date.now},
    'date_joined': {type: Date}

});

UserSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

UserSchema.virtual('password').set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
}).get(function() {
    return this._password;
});

UserSchema.method('authenticate', function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
});

UserSchema.method('makeSalt', function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
});

UserSchema.method('encryptPassword', function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
});

UserSchema.pre('save', function(next) {
    if(!validatePresenceOf(this.password)) {
        next(new Error('Invalid password'));
    } else {
        next();
    }
});
module.exports = mongoose.model('User', UserSchema);