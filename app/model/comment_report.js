var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CommentReportSchema   = new Schema({
    comment : { type : mongoose.Schema.ObjectId, ref : 'Comment'},
    created : { type: Date, default: Date.now },
    reporter : { type : mongoose.Schema.ObjectId, ref : 'User'},
    administrated: { type: Boolean, default: false }
});

module.exports = mongoose.model('CommentReport', CommentReportSchema);
