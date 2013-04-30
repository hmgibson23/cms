var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    crypto = require('crypto'),
    SALT_WORK_FACTOR = 10,
    // these values can be whatever you want - we're defaulting to a
    // max of 5 attempts, resulting in a 2 hour lock
    MAX_LOGIN_ATTEMPTS = 5,
    LOCK_TIME = 2 * 60 * 60 * 1000;

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
    'hashed_password': String,
    'salt': String,
    'last_login': {type: Date, default: Date.now}
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