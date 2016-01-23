//import packages
var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var path     = require('path');
var appDir   = path.dirname(require.main.filename);

//import model
var Poi    = require(appDir + '/app/model/poi');

/**
 * Returns all pois containing given name.
 */
router.get('/pois/:name', function(req, res) {
  Poi.find({ $and: [
    { "name" : { "$regex" : req.params.name, "$options" : "i" }},
    { "active" : true} ]
  },function(err, pois) {
    if (err) res.send(err);
    res.send(pois);
  });
});

/**
 * Returns all pois.
 */
router.get('/pois', function(req, res) {
  Poi.find({ 'active': true })
  .populate("tags")
  .populate("comments")
  .populate("user")
  .exec(function(err, pois) {
    if (err) res.send(err);
    res.send(pois);
  })
  // Poi.find({}, function(err, pois) {
  //   if (err) res.send(err);
  //   res.send(pois);
  // });
});

module.exports = router;
