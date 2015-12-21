//import packages
var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var path     = require('path');
var appDir   = path.dirname(require.main.filename);
var validator = require(appDir + '/app/util/validator');

//import model
var Poi    = require(appDir + '/app/model/poi');

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

  //disambiguate poi
  Poi.findOne({
    "name" : name,
    "lat" : { $gt: lat - 0.5, $lt: lat + 0.5 },
    "lon" : { $gt: lon - 0.5, $lt: lon + 0.5 }
  }, function(err, poi) {
    if (poi) {
      res.json({
        "success": "false",
        "error": "poi exists",
        "tagId": poi._id
      })
    } else {
      console.log("kein poi gefunden");
    }
  });

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

});

module.exports = router;
