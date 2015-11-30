var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PoiSchema   = new Schema({
    name: String,
    description: String,
    lon: Number,
    lat: Number,
    active: Boolean
});

module.exports = mongoose.model('Poi', PoiSchema);
