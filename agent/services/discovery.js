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
      item.keywords = mapping.types[x[i].thingTypeUID].keywords;
      for(var j = 0, ll = x[i].channels.length; j < ll; j++){
        if(x[i].channels[j].linkedItems.length > 0){
          var interactions = mapping.interactions[x[i].channels[j].id];
          for(var k = 0, lll = interactions.length; k < lll; k++){
            var prop = {};
            if(lll > 1){
              prop.pid = x[i].channels[j].linkedItems[0] + '_' + k;
            } else {
              prop.pid = x[i].channels[j].linkedItems[0];
            }
            if(interactions[k].write){
              prop.write_link = {
                "href" : "/objects/{oid}/properties/{pid}",
                "input" : mapping.schema[x[i].channels[j].itemType][interactions[k].type]
              };
            }
            prop.read_link = {
              "href" : "/objects/{oid}/properties/{pid}",
              "output" : mapping.schema[x[i].channels[j].itemType][interactions[k].type]
            };
            prop.monitors = interactions[k].type;
            properties.push(prop);
          }
        }
      }
      item.properties = properties;
      y.push(item);
    }
  }
  return y;
}
