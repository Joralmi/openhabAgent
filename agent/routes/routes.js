'use strict';
var express = require('express'),
router = express.Router(),
cStart = require('../controllers/start'),
cRegistration = require('../controllers/registration');

// respond with "hello world" when a GET request is made to the homepage
module.exports = router
.get('/start', cStart.start)
.post('/registration', cRegistration.registration);
