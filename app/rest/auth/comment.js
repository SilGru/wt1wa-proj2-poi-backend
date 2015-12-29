//import packages
var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var path     = require('path');
var appDir   = path.dirname(require.main.filename);
var validator = require(appDir + '/app/util/validator');

//import model
var Comment  = require(appDir + '/app/model/comment');

router.post('/comment', function(req, res) {
  var content = req.body.content;
  var user = req.user;

  //check comment validity
  if (!validator.validateString(content)) {
    res.json({
      "success": "false",
      "error": "empty content"
    })
  }

  

});

module.exports = router;
