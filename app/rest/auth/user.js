//import packages
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');
var appDir = path.dirname(require.main.filename);
var crypto   = require('crypto');
var validator = require(appDir + '/app/util/validator');

//import models
var User    = require(appDir + '/app/model/user');

router.put('/user/:id/role/:role', function(req, res) {
  var reqUser = req.user;
  User.findOne({ "_id" : req.params.id }, function(err, user) {
    if (err) res.send(err);
    if (user) {
    } else {
      res.send({ "success" : "false", "error" : "user not found"});
    }
  });
});

router.put('/user/:id/active/:active', function(req, res) {
  var reqUser = req.user;
  User.findOne({ "_id" : req.params.id }, function(err, user) {
    if (err) res.send(err);
    if (user) {
      var active = req.params.active;
      if (active == 'true' || active == 'false') {
        if (reqUser.role == 'admin') {
          if (JSON.stringify(reqUser._id) != JSON.stringify(user._id)) {
            user.active = (active === 'true');
            user.save(function(err) {
              if (err) res.send(err);
              res.json({
                "success": "true",
                "id": user._id
              })
            });
          } else {
            res.send({ "success" : "false", "error" : "user can not change own status."});
          }
        } else {
          res.send({ "success" : "false", "error" : "user has no rights."});
        }
      } else {
        res.send({ "success" : "false", "error" : "status invalid. Must be true or false."});
      }
    } else {
      res.send({ "success" : "false", "error" : "user not found"});
    }
  });
});

router.put('/user/:id/password/:password', function(req, res) {
  var reqUser = req.user;
  User.findOne({ "_id" : req.params.id }, function(err, user) {
    if (err) res.send(err);
    if (user) {
      var password = req.params.password;
      if (validator.validatePassword(password)) {
        if (user._id == reqUser._id) {
          var pwh = crypto.createHash('md5').update(password).digest("hex");
          user.pwh = pwh;
          user.save(function(err) {
            if (err) res.send(err);
            res.json({
              "success": "true",
              "id": user._id
            })
          });
        } else {
          res.send({ "success" : "false", "error" : "user has no rights."});
        }
      } else {
        res.send({ "success" : "false", "error" : "password invalid."});
      }
    } else {
      res.send({ "success" : "false", "error" : "user not found"});
    }
  });
});

router.put('/user/:id/email/:email', function(req, res) {
  var reqUser = req.user;
  User.findOne({ "_id" : req.params.id }, function(err, user) {
    if (err) res.send(err);
    if (user) {
      var email = req.params.email;
      if (validator.validateEmail(email)) {
        if (user._id == reqUser._id) {
          user.email = email;
          user.save(function(err) {
            if (err) res.send(err);
            res.json({
              "success": "true",
              "id": user._id
            })
          });
        } else {
          res.send({ "success" : "false", "error" : "user has no rights."});
        }
      } else {
        res.send({ "success" : "false", "error" : "email invalid."});
      }
    } else {
      res.send({ "success" : "false", "error" : "user not found"});
    }
  });
});

module.exports = router;
