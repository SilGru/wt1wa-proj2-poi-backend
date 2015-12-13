//import packages
var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var path     = require('path');
var appDir   = path.dirname(require.main.filename);

//import model
var Comment    = require(appDir + '/app/model/comment');

router.get('/comments', function(req, res) {
});

module.exports = router;
