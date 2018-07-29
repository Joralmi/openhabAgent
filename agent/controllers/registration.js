'use strict';

var platformStatus = require('../services/platformStatus'),
    registrationStatus = require('../services/registrationStatus'),
    logger = require('../../middlewares/logger');

exports.registration = function (req, res, next) {
  var oids = [];
  platformStatus.read("infrastructure")
  .then(function(response){
    return registrationStatus.read("infrastructure");
  })
  .then(function(response){
    return tdsStatus.read("infrastructure");
  })
  .then(function(response){
    res.json(response);
  })
  .catch(function(err){
    logger.debug(err);
    res.json({error: true, data: err});
  });
};
