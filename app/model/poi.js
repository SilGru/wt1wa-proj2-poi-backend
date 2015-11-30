var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PoiSchema   = new Schema({
    name: String,
    description: String,
    lon: Number,
    lat: Number,
    created : { type: Date, default: Date.now },
    user : { type : mongoose.Schema.ObjectId, ref : 'User'},
    comments : [ { type : mongoose.Schema.ObjectId, ref : 'Comment'} ],
    tags : [ { type : mongoose.Schema.ObjectId, ref : 'Tag'} ],
    active: Boolean
});

module.exports = mongoose.model('Poi', PoiSchema);
