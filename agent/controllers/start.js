'use strict';

var logAgent = require('../services/logAgent'),
    logItems = require('../services/logItems'),
    getRegistered = require('../services/getRegistered'),
    logger = require('../../middlewares/logger');

exports.start = function (req, res, next) {
  var oids = [];
  logAgent.logAgent()
  .then(function(response){
    return getRegistered.oids();
  })
  .then(function(response){
    return logItems.logItems(response);
  })
  .then(function(response){
    res.json(response);
  })
  .catch(function(err){
    logger.debug(err);
    res.json({error: true, data: err});
  });
};
