var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/directions', function(req, res, next) {
  var start = req.body.start;
  var end = req.body.end;

  var options = { method: 'GET',
    url: 'https://maps.googleapis.com/maps/api/directions/json',
    qs:
     { origin: start,
       destination: end,
       key: process.env.MAPS_API_KEY }
    };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(JSON.parse(body));
    var steps = JSON.parse(body).routes[0].legs[0].steps;
    res.render('steps', {steps: steps});
  });
});

router.get('/directions', function(req, res, next) {
    res.render('steps');
});

module.exports = router;
