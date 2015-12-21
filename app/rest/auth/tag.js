//import packages
var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var path     = require('path');
var appDir   = path.dirname(require.main.filename);

//import model
var Tag    = require(appDir + '/app/model/tag');

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
        "tagId": tag._id
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
