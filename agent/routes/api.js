'use strict';
var express = require('express'),
router = express.Router(),
controller = require('../controllers/start');

// respond with "hello world" when a GET request is made to the homepage
module.exports = router
.get('/start', controller.start);
