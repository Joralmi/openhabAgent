'use strict';

var platformStatus = require('../services/platformStatus'),
    registrationStatus = require('../services/registrationStatus'),
    tdsStatus = require('../services/tdsStatus'),
    registrationMgmt = require('../services/registrationMgmt'),
    logger = require('../../middlewares/logger');

exports.registration = function (req, res, next) {
  var oids = [];
  var info = {}
  platformStatus.read()
  .then(function(response){
    info.platform = response;
    return registrationStatus.read();
  })
  .then(function(response){
    info.registered = response;
    return tdsStatus.read();
  })
  .then(function(response){
    info.tds = response;
    return registrationMgmt.process(info);
  })
  .then(function(response){
    res.json(response);
  })
  .catch(function(err){
    logger.debug(err);
    res.json({error: true, data: err});
  });
};
