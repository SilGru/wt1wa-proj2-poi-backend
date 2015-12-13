//import packages
var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var path     = require('path');
var appDir   = path.dirname(require.main.filename);

//import model
var Tag    = require(appDir + '/app/model/tag');

router.get('/tags', function(req, res) {
  var aIds = req.body.aIds;
  
});

module.exports = router;
