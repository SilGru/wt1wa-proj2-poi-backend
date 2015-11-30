var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CommentSchema   = new Schema({
    content: String,
    created : { type: Date, default: Date.now },
    user : { type : mongoose.Schema.ObjectId, ref : 'User'},
    poi : { type : mongoose.Schema.ObjectId, ref : 'Poi'},
    active: Boolean
});

module.exports = mongoose.model('Comment', CommentSchema);
