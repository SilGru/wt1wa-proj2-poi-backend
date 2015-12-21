//import packages
var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var path     = require('path');
var appDir   = path.dirname(require.main.filename);
var validator = require(appDir + 'app/util/validator');

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

  if (!validator.validateString(decription)) {
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

});

module.exports = router;
