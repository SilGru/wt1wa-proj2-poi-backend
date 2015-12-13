//import packages
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');
var appDir = path.dirname(require.main.filename);

//import models
var User    = require(appDir + '/app/model/user');

router.post('/user', function(req, res) {
});

module.exports = router;
