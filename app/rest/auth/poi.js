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

/**
 * Create poi
 */
router.post('/poi', function(req, res) {
  var name = req.body.name;
  var description = req.body.description;
  var lat = req.body.lat;
  var lon = req.body.lon;
  var user = req.user;

  //check poi validity
  if (!validator.validateString(name)) {
    res.json({
      "success": "false",
      "error": "empty name"
    })
  }

  if (!validator.validateString(description)) {
    res.json({
      "success": "false",
      "error": "empty description"
    })
  }

  if (!validator.validateLon(lon)) {
    res.json({
      "success": "false",
      "error": "lon invalid"
    })
  }

  if (!validator.validateLon(lat)) {
    res.json({
      "success": "false",
      "error": "lat invalid"
    })
  }

  lon = parseFloat(lon);
  lat = parseFloat(lat);

  //disambiguate poi
  Poi.findOne({
    "name" : name,
    "lat" : { $gt: (lat - 0.5), $lt: (lat + 0.5) },
    "lon" : { $gt: (lon - 0.5), $lt: (lon + 0.5) }
  }, function(err, poi) {
    if (poi) {
      res.json({
        "success": "false",
        "error": "poi exists",
        "tagId": poi._id
      });
    } else {
      //poi save
      var poi = new Poi({
        name: name,
        description: description,
        lon: lon,
        lat: lat,
        user: req.user._id,
        active: true
      });

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
          poi.tags.push(tagId);
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

/**
 * assign comment to poi
 */
router.post('/poi/:poiId/comment/:commentId', function(req, res) {
  var poiId = req.params.poiId;
  var commentId = req.params.commentId;

});

module.exports = router;
