//import packages
var express  = require('express');
var router   = express.Router();
var path     = require('path');
var appDir   = path.dirname(require.main.filename);
var config   = require(appDir + '/config');
var jwt      = require('jsonwebtoken');

router.use(function(req, res, next) {
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];

	// decode token
	if (token) {
		// verifies secret and checks exp
    try {
      var decoded = jwt.verify(token, config.secret);
      req.user = decoded;
      next();
    } catch(err) {
      return res.json({ success: false, message: 'Failed to authenticate token.' });
    }

	} else {

		// if there is no token
		// return an error
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});

	}

});

module.exports = router;
