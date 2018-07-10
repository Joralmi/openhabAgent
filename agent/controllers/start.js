'use strict';

var request = require('../services/request'),
    fileMgmt = require('../services/fileMgmt'),
    discovery = require('../services/discovery'),
    // agent = require('../services/agent'),
    logger = require('../../middlewares/logger'),
    config = require('../../configuration/configuration');

exports.start = function (req, res, next) {
  var info = {};

  // request.send('Openhab', 'things', 'GET', {})
  request.send('Gateway', 'objects/login', 'GET', {})
  .then(function(response){
    if(!response.error){
      return discovery.discover();
    } else {
      return new Promise(
        function(resolve, reject) { reject(false); }
      );
    }
  })
  .then(function(response){
    info.tds = response;
    return request.send('Gateway', 'agents/' + config.agid + '/objects', 'GET', {});
  })
  .then(function(response){
    info.platform = JSON.parse(response).message;
    return fileMgmt.read('./configuration/registered.json');
  })
  .then(function(response){
    info.registered = JSON.parse(response);
    return agent.process(info);
  })
  .then(function(response){
    res.json(response);
  })
  .catch(function(err){
    logger.debug(err);
    res.json({error: true, data: err});
  });
};
