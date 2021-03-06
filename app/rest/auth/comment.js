//import packages
var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var path     = require('path');
var appDir   = path.dirname(require.main.filename);
var validator = require(appDir + '/app/util/validator');

//import model
var Comment  = require(appDir + '/app/model/comment');
var CommentReport = require(appDir + '/app/model/comment_report');

router.get('/allcomments', function(req, res) {
  if (req.user.role == 'admin') {
    Comment.find({})
    .populate("user").
    exec(function(err, comments){
      if (err) res.send(err);
      res.send(comments);
    });
  } else {
      res.send({ "success" : "false", "error" : "no admin rights"});
  }
});

router.post('/comment/:id/report', function(req, res) {
  var reqUser = req.user;
  Comment.findOne({ "_id" : req.params.id }, function(err, poi) {
    if (err) res.send(err);
    if (poi) {
      var commentReport = new CommentReport({
        comment : req.params.id,
        reporter : req.user._id
      });
      commentReport.save(function(err) {
        if (err) res.send(err);
        res.json({
          "success": "true",
          "id": "comment " + req.params.id  + " reported."
        })
      });
    } else {
      res.send({ "success" : "false", "error" : "comment not found"});
    }
  });
});

router.put('/comment/:id/active/:active', function(req, res) {
  var reqUser = req.user;
  Comment.findOne({ "_id" : req.params.id }, function(err, comment) {
    if (err) res.send(err);
    if (comment) {
      var active = req.params.active;
      if (active == 'true' || active == 'false') {
        if (reqUser.role == 'admin') {
          comment.active = (active === 'true');
          comment.save(function(err) {
            if (err) res.send(err);
            res.json({
              "success": "true",
              "id": comment._id
            })
          });
        } else {
          res.send({ "success" : "false", "error" : "user has no rights."});
        }
      } else {
        res.send({ "success" : "false", "error" : "status invalid. Must be true or false."});
      }
    } else {
      res.send({ "success" : "false", "error" : "comment not found"});
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
