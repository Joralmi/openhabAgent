'use strict';

var login = require('../services/login'),
    registrationStatus = require('../services/registrationStatus'),
    logger = require('../../middlewares/logger');

exports.start = function (req, res, next) {
  var oids = [];
  login.logAgent()
  .then(function(response){
    return registrationStatus.oids();
  })
  .then(function(response){
    return login.logItems(response);
  })
  .then(function(response){
    res.json(response);
  })
  .catch(function(err){
    logger.debug(err);
    res.json({error: true, data: err});
  });
};
