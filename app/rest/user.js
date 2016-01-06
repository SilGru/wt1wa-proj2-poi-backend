//import packages
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');
var appDir = path.dirname(require.main.filename);
var crypto   = require('crypto');

//import models
var User    = require(appDir + '/app/model/user');

router.get('/user/:id', function(req, res) {
  User.findOne({ "_id" : req.params.id }, function(err, user) {
    if (err) res.send(err);
    if (user) {
      user.pwh = "";
      res.send(user).end();
    } else {
      res.send({ "success" : "false", "error" : "user not found"});
    }
  });
});

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

  User.findOne({ "name": name }, function(err, user) {
    if (user) {
      res.json({
        "success": "false",
        "error": "name is used",
      })
    }
  })

  User.findOne({ "email": email }, function(err, user) {
    if (user) {
      res.json({
        "success": "false",
        "error": "email is used",
      })
    }
  })

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
