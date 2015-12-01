var express = require('express');
var router = express.Router();

router.get('/db_reset', function(req, res) {
  //TODO db_reset

  res.send('db_reset is todo.');
});

module.exports = router;
