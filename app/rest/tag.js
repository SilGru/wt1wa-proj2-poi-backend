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
    Tag.find({ $and: [{'_id' : { $in : aIds }}, {'active': true}]}, function(err, tags){
      if (err) res.send(err);
      res.send(tags);
    });
  } else {
    Tag.find({ 'active': true }, function(err, tags) {
      if (err) res.send(err);
      res.send(tags);
    });
  }
});

module.exports = router;
