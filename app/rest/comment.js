//import packages
var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var path     = require('path');
var appDir   = path.dirname(require.main.filename);

//import model
var Comment    = require(appDir + '/app/model/comment');

router.get('/comments', function(req, res) {
  var aIds = req.query.aIds;
  if (aIds) {
    Comment.find({ '_id' : { $in : aIds }}, function(err, comments){
      if (err) res.send(err);
      res.send(comments);
    });
  } else {
    Comment.find({})
    .populate("user")
    .exec(function(err, comments) {
      if (err) res.send(err);
      res.send(comments);
    });
    // Comment.find({}, function(err, comments) {
    //   if (err) res.send(err);
    //   res.send(comments);
    // });
  }
});

module.exports = router;
