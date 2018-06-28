'use strict';

var request = require('../services/request'),
    fileMgmt = require('../services/fileMgmt'),
    logger = require('../../middlewares/logger'),
    config = require('../../configuration/configuration');

exports.start = function (req, res, next) {
  var info = {};

  // request.send('Openhab', 'things', 'GET', {})
  request.send('Gateway', 'objects/login', 'GET', {})
  .then(function(response){
    if(!response.error){
      return request.send('Openhab', 'things', 'GET', {});
    } else {
      return new Promise(
        function(resolve, reject) { reject(false); }
      );
    }
  })
  .then(function(response){
    info.discovery = parseDiscovery(JSON.parse(response));
    return fileMgmt.findFiles('./configuration/');
  })
  .then(function(response){
    info.tds = getThingDescriptions(response);
    return request.send('Gateway', 'agents/' + config.agid + '/objects', 'GET', {})
  })
  .then(function(response){
    info.platform = JSON.parse(response).message;
    return fileMgmt.read('./configuration/mapping.json');
  })
  .then(function(response){
    info.registered = JSON.parse(response);
    res.json(info);
  })
  .catch(function(err){
    logger.debug(err);
    res.json({error: true, data: err});
  });
};

// Private Functions
function parseDiscovery(x){
  var y = [];
  for(var i = 0, l = x.length; i < l; i++){
    y.push({"name": x[i].label, "infrastructure-id": x[i].UID})
  }
  return y;
}

function getThingDescriptions(x){
  var y = [];
  for(var i = 0, l = x.length; i < l; i++){
    if(x[i].indexOf("TD_") !== -1){
      y.push(x[i]);
    }
  }
  return y;
}
