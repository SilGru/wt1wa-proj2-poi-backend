//import packages
var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var path     = require('path');
var appDir   = path.dirname(require.main.filename);
var validator = require(appDir + '/app/util/validator');

//import model
var Comment  = require(appDir + '/app/model/comment');

router.put('/comment/:id/active/:active', function(req, res) {
  var reqUser = req.user;
  Comment.findOne({ "_id" : req.params.id }, function(err, comment) {
    if (err) res.send(err);
    if (comment) {
    } else {
      res.send({ "success" : "false", "error" : "tag not found"});
    }
  });
});

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

  var comment = new Comment({
    content: content,
    user: user._id,
    active: true
  });

  comment.save(function(err) {
    if (err) res.status(400).send(err);
    res.status(200).json({
      "sucess": "true",
      "id": comment._id
    })
  });

});

router.put('/comment', function(req, res) {
  var commentId = req.body.commentId;
  var content = req.body.content;
  var user = req.user;

  //check content validity
  if (!validator.validateString(content)) {
    res.json({
      "success": "false",
      "error": "empty content"
    })
  }

  //check comment exists
  Comment.findOne({ "_id" : commentId }, function(err, comment) {
    if (comment) {
      if (comment.user == user._id) {
        comment.content = content;
        comment.save(function(err) {
          if (err) res.send(err);
          res.json({
            "success": "true",
            "id": comment._id
          })
        });
      } else {
        res.json({
          "success": "false",
          "error": "user is not comment owner."
        })
      }
    } else {
      res.json({
        "success": "false",
        "error": "comment with id: " + commentId + "does not exist."
      })
    }
  });

});

module.exports = router;
