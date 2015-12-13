//import packages
var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var path     = require('path');
var appDir   = path.dirname(require.main.filename);

//import model
var Poi    = require(appDir + '/app/model/poi');

router.get('/pois', function(req, res) {
  // Poi.find({})
  // .populate("tags")
  // .populate("comments")
  // .populate("user")
  // .exec(function(err, pois) {
  //   if (err) res.send(err);
  //   res.send(pois);
  // })
  Poi.find({}, function(err, pois) {
    if (err) res.send(err);
    res.send(pois);
  });
});

module.exports = router;
