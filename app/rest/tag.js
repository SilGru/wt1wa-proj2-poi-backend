//import packages
var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var path     = require('path');
var appDir   = path.dirname(require.main.filename);

//import model
var Tag    = require(appDir + '/app/model/tag');

router.get('/tags', function(req, res) {
  var aIds = req.query.aIds;
  if (aIds) {
    console.log(aIds);
    Tag.find({ '_id' : { $in : aIds }}, function(err, tags){
      if (err) res.send(err);
      res.send(tags);
    });
  } else {
    Tag.find({}, function(err, tags) {
      if (err) res.send(err);
      res.send(tags);
    });
  }
});

module.exports = router;
