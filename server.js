// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var cors       = require('cors');

var path = require('path');
var appDir = path.dirname(require.main.filename);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 8080;        // set our port

//connect db
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/wt1wadb');

// ROUTES FOR OUR API
// =============================================================================
// enable cors for all routes
app.use(cors());

var router = express.Router();              // get an instance of the express Router
var restServiceName = "/api"
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use(restServiceName, router);
var dbResetRestCtrl = require(appDir + '/app/rest/db_reset');
app.use(restServiceName, dbResetRestCtrl);
var userRestCtrl = require(appDir + '/app/rest/user');
app.use(restServiceName, userRestCtrl);
var poiRestCtrl = require(appDir + '/app/rest/poi');
app.use(restServiceName, poiRestCtrl);
var authenticateRestCtrl = require(appDir + '/app/rest/authenticate');
app.use(restServiceName, authenticateRestCtrl);

//all following routes require authentication
var authMiddlewareRestCtrl = require(appDir + '/app/rest/auth_middleware');
app.use(restServiceName, authMiddlewareRestCtrl);
var tagRestCtrl = require(appDir + '/app/rest/auth/tag');
app.use(restServiceName, tagRestCtrl);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server listen on port ' + port);
