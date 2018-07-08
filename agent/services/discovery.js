'use strict';

var request = require('../services/request'),
    mapping = require('../../configuration/platformMapping'),
    config = require('../../configuration/configuration'),
    logger = require('../../middlewares/logger');

exports.discover = function () {
  return new Promise(function(resolve, reject){
    var info;
    request.send('Openhab', 'things', 'GET', {})
    .then(function(response){
      info = parseDiscovery(JSON.parse(response));
      resolve(info);
    })
    .catch(function(err){
      logger.debug(err);
      reject(err);
    });
  });
};

// Private Functions
function parseDiscovery(x){
  var y = [];
  for(var i = 0, l = x.length; i < l; i++){
    if(mapping.types[x[i].thingTypeUID]){
      var item = {};
      var properties = [];
      item.name = x[i].label;
      item["infrastructure-id"] = x[i].UID;
      item["adapter-id"] = config.agid;
      item.type = mapping.types[x[i].thingTypeUID].type;
      item.write = mapping.types[x[i].thingTypeUID].write;
      for(var j = 0, k = x[i].channels.length; j < k; j++){
        if(x[i].channels[j].linkedItems.length > 0){
          var prop = {};
          prop.pid = x[i].channels[j].linkedItems[0];
          prop.schema = x[i].channels[j].itemType;
          prop.monitors = mapping.interactions[x[i].channels[j].id];
          properties.push(prop);
        }
      }
      item.properties = properties;
      y.push(item);
    }
  }
  return y;
}
