'use strict';
var express = require('express'),
router = express.Router(),
cDiscovery = require('../controllers/discovery');

// respond with "hello world" when a GET request is made to the homepage
module.exports = router
.get('/discovery', cDiscovery.discovery);
