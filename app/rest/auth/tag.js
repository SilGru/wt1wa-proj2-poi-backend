//import packages
var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var path     = require('path');
var appDir   = path.dirname(require.main.filename);

//import model
var Tag    = require(appDir + '/app/model/tag');

router.get('/alltags', function(req, res) {
  if (req.user.role == 'admin') {
    Tag.find({})
    .exec(function(err, tags){
      if (err) res.send(err);
      res.send(tags);
    });
  } else {
      res.send({ "success" : "false", "error" : "no admin rights"});
  }
});

router.put('/tag/:id/active/:active', function(req, res) {
  var reqUser = req.user;
  Tag.findOne({ "_id" : req.params.id }, function(err, tag) {
    if (err) res.send(err);
    if (tag) {
      var active = req.params.active;
      if (active == 'true' || active == 'false') {
        if (reqUser.role == 'admin') {
          tag.active = (active === 'true');
          tag.save(function(err) {
            if (err) res.send(err);
            res.json({
              "success": "true",
              "id": tag._id
            })
          });
        } else {
          res.send({ "success" : "false", "error" : "user has no rights."});
        }
      } else {
        res.send({ "success" : "false", "error" : "status invalid. Must be true or false."});
      }
    } else {
      res.send({ "success" : "false", "error" : "tag not found"});
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
