// 'use strict';
//
// var mongoose = require('mongoose'),
//   task = require('../models/model').task;
//
// exports.get = function (req, res) {
//   res.json({status: 'Success', data: 'NULL'})
// };
//
//
// exports.list_all_tasks = function(req, res) {
//   task.find({}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };
//
// exports.create_a_task = function(req, res) {
//   var new_task = new task(req.body);
//   new_task.save(function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };
