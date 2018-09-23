'use strict';
var express = require('express'),
router = express.Router(),
cDiscovery = require('../controllers/discovery'),
cInterfaces = require('../controllers/interfaces');

module.exports = router
.get('/discovery', cDiscovery.discovery)
.get('/airQuality', cInterfaces.getAirQuality);
