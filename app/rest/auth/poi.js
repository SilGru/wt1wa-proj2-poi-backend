//import packages
var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var path     = require('path');
var appDir   = path.dirname(require.main.filename);
var validator = require(appDir + '/app/util/validator');

//import model
var Poi     = require(appDir + '/app/model/poi');
var Tag     = require(appDir + '/app/model/tag');
var Comment = require(appDir + '/app/model/comment');
var PoiReport = require(appDir + '/app/model/poi_report');

router.post('/poi/:id/report', function(req, res) {
  var reqUser = req.user;
  Poi.findOne({ "_id" : req.params.id }, function(err, poi) {
    if (err) res.send(err);
    if (poi) {
      var poiReport = new PoiReport({
        poi : req.params.id,
        reporter : req.user._id
      });
      poiReport.save(function(err) {
        if (err) res.send(err);
        res.json({
          "success": "true",
          "id": "poi " + req.params.id  + " reported."
        })
      });
    } else {
      res.send({ "success" : "false", "error" : "poi not found"});
    }
  });
});

router.put('/poi/:id/active/:active', function(req, res) {
  var reqUser = req.user;
  Poi.findOne({ "_id" : req.params.id }, function(err, poi) {
    if (err) res.send(err);
    if (poi) {
      var active = req.params.active;
      if (active == 'true' || active == 'false') {
        if (reqUser.role == 'admin') {
          poi.active = (active === 'true');
          poi.save(function(err) {
            if (err) res.send(err);
            res.json({
              "success": "true",
              "id": poi._id
            })
          });
        } else {
          res.send({ "success" : "false", "error" : "user has no rights."});
        }
      } else {
        res.send({ "success" : "false", "error" : "status invalid. Must be true or false."});
      }
    } else {
      res.send({ "success" : "false", "error" : "poi not found"});
    }
  });
});

/**
 * Create poi
 */
router.post('/poi', function(req, res) {
  var name = req.body.name;
  var description = req.body.description;
  var lat = req.body.lat;
  var lon = req.body.lon;
  var user = req.user;

  var poi = new Poi({
    name: name,
    description: description,
    lon: lon,
    lat: lat,
    user: req.user._id,
    active: true
  });

  var result = validator.validatePoi(poi);

  if (!result.success) {
    res.status(400).json({
      "success": result.success,
      "error": result.error
    });
  }

  lon = parseFloat(lon);
  lat = parseFloat(lat);

  //disambiguate poi
  Poi.findOne({
    "name" : name,
    "lat" : { $gt: (lat - 0.5), $lt: (lat + 0.5) },
    "lon" : { $gt: (lon - 0.5), $lt: (lon + 0.5) }
  }, function(err, tPoi) {
    if (tPoi) {
      res.json({
        "success": "false",
        "error": "poi exists",
        "tagId": tPoi._id
      });
    } else {
      //poi save
      poi.save(function(err) {
        if (err) res.send(err);
        res.json({
          "success": "true",
          "id": poi._id
        })
      });
    }
  });
});

/**
 * Update poi
 */
router.put('/poi', function(req, res) {
  var name = req.body.name;
  var description = req.body.description;
  var lat = req.body.lat;
  var lon = req.body.lon;
  var poiId = req.body._id;
  var user = req.user;

  Poi.findOne({ _id: poiId}, function(err, poi) {
    if (err) res.send(err);
    if (!poi) {
      res.status(400).send({
        "success": "false",
        "error": "poi does not exist"
      });
    } else {
      // console.log(poi.user);
      // console.log(user._id);
      // console.log(poi.user == user._id);
      if (poi.user != user._id) {
        res.status(400).send({
          "success": "false",
          "error": "user does not own poi"
        });
      } else {
        lon = parseFloat(lon);
        lat = parseFloat(lat);
        poi.name = name;
        poi.description = description;
        poi.lat = lat;
        poi.lon = lon;
        //check poi validity
        var result = validator.validatePoi(poi);
        if (!result.success) {
          res.status(400).json({
            "success": result.success,
            "error": result.error
          });
        }
        //poi save
        poi.save(function(err) {
          if (err) res.send(err);
          res.json({
            "success": "true",
            "id": poi._id
          })
        });
      }
    }
  });
});

/**
 * assign tag to poi
 */
router.post('/poi/:poiId/tag/:tagId', function(req, res) {
  var poiId = req.params.poiId;
  var tagId = req.params.tagId;

  Poi.findOne({ _id: poiId}, function(err, poi) {
    if (err) res.status(400).send(err);
    if (!poi) {
      res.status(400).json({
        "success": "false",
        "error": "poi does not exists"
      });
    } else {
      Tag.findOne({ _id: tagId }, function(err, tag) {
        if (err) res.status(400).send(err);
        if (!tag) {
          res.status(400).json({
            "success": "false",
            "error": "tag does not exists"
          });
        } else {
          //check if Tag is assigned
          var aTags = poi.tags;
          var length = poi.tags.length;
          var tagIsAssigned = false;
          for (var i = 0; i < length; i++) {
            if (aTags[i] == tagId) {
              tagIsAssigned = true;
            }
          }
          //Assign tag
          if (tagIsAssigned) {
            res.status(400).json({
              "success": "false",
              "error": "tag is already assigned"
            });
          } else {
            poi.tags.push(tagId);
            poi.save(function(err) {
              if (err) res.status(400).send(err);
              res.status(200).json({
                "success": "true"
              });
            });
          }
        }
      });

    }
  });
});

/**
 * assign comment to poi
 */
router.post('/poi/:poiId/comment/:commentId', function(req, res) {
  var poiId = req.params.poiId;
  var commentId = req.params.commentId;

  Poi.findOne({ _id: poiId}, function(err, poi) {
    if (err) res.status(400).send(err);
    if (!poi) {
      res.status(400).json({
        "success": "false",
        "error": "poi does not exists"
      });
    } else {
      Comment.findOne({ _id: commentId }, function(err, comment) {
        if (err) res.status(400).send(err);
        if (!comment) {
          res.status(400).json({
            "success": "false",
            "error": "comment does not exists"
          });
        } else {
          poi.comments.push(commentId);
          poi.save(function(err) {
            if (err) res.status(400).send(err);
            res.status(200).json({
              "success": "true"
            });
          });
        }
      });

    }
  });
});

module.exports = router;
