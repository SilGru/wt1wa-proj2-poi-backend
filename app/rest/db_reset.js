//import packages
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');
var appDir = path.dirname(require.main.filename);

//import models
var User    = require(appDir + '/app/model/user');
var Comment = require(appDir + '/app/model/comment');
var Poi     = require(appDir + '/app/model/poi');
var Tag     = require(appDir + '/app/model/tag');

router.get('/db_reset', function(req, res) {
  //Delete all entities
  mongoose.connection.db.dropCollection('users', function(err, result) {});
  mongoose.connection.db.dropCollection('comments', function(err, result) {});
  mongoose.connection.db.dropCollection('pois', function(err, result) {});
  mongoose.connection.db.dropCollection('tags', function(err, result) {});

  //Create new entities with associations
  var user1 = new User({ name: "Peter", email: "he@his.com", pwh: "5f4dcc3b5aa765d61d8327deb882cf99", role: "admin", active: true });
  var user2 = new User({ name: "Petra", email: "she@her.com", pwh: "5f4dcc3b5aa765d61d8327deb882cf99", role: "user", active: true });
  user1.save();
  user2.save();

  var tag1 = new Tag({ name: "Kultur", user: user1._id, active: true });
  var tag2 = new Tag({ name: "Party", user: user2._id, active: true });
  tag1.save();
  tag2.save();

  var comment1 = new Comment({ content: "Dolles Ding.", user: user1._id, active: true });
  var comment2 = new Comment({ content: "Haaaaaaammeeeeer.", user: user2._id, active: true });
  comment1.save();
  comment2.save();

  var poi1 = new Poi({
    name: 'Brandenburger Tor', description: 'Historisches Bauwerk',
    lat: 52.516275, lon: 13.377704, active: true, user: user1._id,
    comments: [ comment1._id ], tags: [ tag1._id ]
  });
  var poi2 = new Poi ({
    name: 'Matrix', description: 'Nachtclub',
    lat: 52.5050442, lon: 13.4468875, active: true, user: user2._id,
    comments: [ comment2._id ], tags: [ tag2._id ]
  });
  poi1.save();
  poi2.save();

  res.send(poi1);
});

module.exports = router;
