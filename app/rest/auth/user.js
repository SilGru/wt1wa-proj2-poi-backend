//import packages
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');
var appDir = path.dirname(require.main.filename);

//import models
var User    = require(appDir + '/app/model/user');

router.put('/user/:id/:password', function(req, res) {
  User.findOne({ "_id" : req.params.id }, function(err, user) {
    if (err) res.send(err);
    if (user) {
      
    } else {
      res.send({ "success" : "false", "error" : "user not found"});
    }
  });
});
