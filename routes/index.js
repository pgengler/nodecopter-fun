var express = require('express');
var router = express.Router();

var arDrone = require('ar-drone');
var drone;
var glob;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
  glob = "Hi";
});

router.post('/initialize', function(req, res) {
  drone = arDrone.createClient();
  res.send();
});

router.post('/takeoff', function(req, res) {
  drone.land();
  res.send('');
});

router.post('/land', function(req, res) {
  drone.land();
  res.send('');
});

module.exports = router;
