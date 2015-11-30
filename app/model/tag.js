var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TagSchema   = new Schema({
    name : String,
    created : { type: Date, default: Date.now },
    user : { type : mongoose.Schema.ObjectId, ref : 'User'},
    active: Boolean
});

module.exports = mongoose.model('Tag', TagSchema);
