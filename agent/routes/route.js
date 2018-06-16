'use strict';
var express = require('express'),
router = express.Router(),
controller = require('../controllers/controller');

// respond with "hello world" when a GET request is made to the homepage
module.exports = router
.get('/', controller.get)
.get('/tasks', controller.list_all_tasks)
.post('/tasks', controller.create_a_task);
