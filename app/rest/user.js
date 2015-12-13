//import packages
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');
var appDir = path.dirname(require.main.filename);
var crypto   = require('crypto');

//import models
var User    = require(appDir + '/app/model/user');

router.post('/user', function(req, res) {
  var name = req.body.name;
  var password = req.body.password;
  var email = req.body.email;

  if (!name || 0 === name.trim().length) {
    res.json({ "success" : "false", "error" : "name must be given." })
  }

  if (!password || 0 === password.trim().length) {
    res.json({ "success" : "false", "error" : "password must be given." })
  }

  if (!email || 0 === email.trim().length) {
    res.json({ "success" : "false", "error" : "email must be given." })
  }

  var pwh = crypto.createHash('md5').update(password).digest("hex");
  var user = new User();
  user.name = name;
  user.pwh = pwh;
  user.email = email;
  user.role = "user";
  user.active = true;

  user.save(function(err) {
    if (err) res.send(err);
    res.json({
      "success": "true",
      "id": user._id
    })
  });
});

module.exports = router;
