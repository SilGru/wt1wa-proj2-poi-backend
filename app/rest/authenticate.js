//import packages
var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var path     = require('path');
var appDir   = path.dirname(require.main.filename);
var crypto   = require('crypto');
var jwt      = require('jsonwebtoken');
var config   = require(appDir + '/config');

//import model
var User    = require(appDir + '/app/model/user');

router.post('/authenticate', function(req, res) {
  var name = req.body.name;
  var password = req.body.password;
  var pwh = crypto.createHash('md5').update(password).digest("hex");
  // find the user
  User.findOne({
    name: name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. Invalid credentials.' });
    } else if (user) {

      // check if password matches
      if (user.pwh != pwh) {
        res.json({ success: false, message: 'Authentication failed. Invalid credentials.' });
      } else {
        if (user.active === false) {
          res.json({ success: false, message: 'Authentication failed. User inactive.' });
        } else {
          // if user is found and password is right
          // create a token
          var token = jwt.sign(user, config.secret, {
            expiresIn: 24 * 60 * 60 // expires in 24 hours
          });

          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }
      }}

    });

});

module.exports = router;
