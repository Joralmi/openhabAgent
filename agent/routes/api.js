'use strict';
var express = require('express'),
router = express.Router(),
cStart = require('../controllers/start'),
cDiscovery = require('../controllers/discovery');

// respond with "hello world" when a GET request is made to the homepage
module.exports = router
.get('/start', cStart.start)
.get('/discovery', cDiscovery.discovery);
