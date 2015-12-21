//import packages
var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var path     = require('path');
var appDir   = path.dirname(require.main.filename);

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
  if (!name || 0 === name.trim().size) {
    res.json({
      "success": "false",
      "error": "empty name"
    })
  }

  if (!description || 0 === description.trim().size) {
    res.json({
      "success": "false",
      "error": "empty description"
    })
  }

});

module.exports = router;
