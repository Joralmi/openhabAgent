'use strict';

var request = require('../services/request'),
    logger = require('../../middlewares/logger');

exports.discovery = function (req, res, next) {
  var info;
  request.send('Openhab', 'things', 'GET', {});
  .then(function(response){
    info = parseDiscovery(JSON.parse(response));
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
