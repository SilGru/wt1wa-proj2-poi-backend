var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    name: String,
    email: String,
    pwh: String,
    role: String,
    active: Boolean
});

module.exports = mongoose.model('User', UserSchema);
