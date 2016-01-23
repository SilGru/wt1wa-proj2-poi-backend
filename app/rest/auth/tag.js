//import packages
var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var path     = require('path');
var appDir   = path.dirname(require.main.filename);

//import model
var Tag    = require(appDir + '/app/model/tag');

router.put('/tag/:id/active/:active', function(req, res) {
  var reqUser = req.user;
  Tag.findOne({ "_id" : req.params.id }, function(err, tag) {
    if (err) res.send(err);
    if (tag) {
    } else {
      res.send({ "success" : "false", "error" : "user not found"});
    }
  });
});

router.post('/tag', function(req, res) {
  var name = req.body.name;
  var user = req.user;

  if (!name || 0 === name.trim().size) {
    res.json({
      "success": "false",
      "error": "empty name"
    })
  }

  Tag.findOne({ "name": name }, function(err, tag) {
    if (tag) {
      res.json({
        "success": "false",
        "error": "tag exists",
        "id": tag._id
      })
    } else {
      var tag = new Tag({
        "name": name,
        "user": user._id,
        "active": true
      });

      tag.save(function(err) {
        if (err) res.send(err);
        res.json({
          "success": "true",
          "id": tag._id
        })
      });
    }
  });

});

module.exports = router;
