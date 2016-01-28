var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PoiReportSchema   = new Schema({
    poi : { type : mongoose.Schema.ObjectId, ref : 'Poi'},
    created : { type: Date, default: Date.now },
    reporter : { type : mongoose.Schema.ObjectId, ref : 'User'},
    administrated: { type: Boolean, default: false }
});

module.exports = mongoose.model('PoiReport', PoiReportSchema);
