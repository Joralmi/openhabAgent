'use strict';

var request = require('../../util/request'),
    logger = require('../../middlewares/logger');

exports.get = function () {
  return new Promise(function(resolve, reject){
    var info;
    request.send('AirQuality', 'measure', 'GET', {})
    .then(function(response){
      info = JSON.parse(response);
      resolve(info);
    })
    .catch(function(err){
      logger.debug(err);
      reject(err);
    });
  });
};
