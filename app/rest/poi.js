//import packages
var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var path     = require('path');
var appDir   = path.dirname(require.main.filename);

//import model
var Poi    = require(appDir + '/app/model/poi');

router.get('/pois', function(req, res) {
});

module.exports = router;
