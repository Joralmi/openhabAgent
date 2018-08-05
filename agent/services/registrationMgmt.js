'use strict';

// Global variables and objects
var request = require('../../util/request'),
    config = require('../../configuration/configuration'),
    logger = require('../../middlewares/logger');

// Public functions
exports.process = function(info){
  return new Promise(
    function(resolve, reject) {

      // Items in registered file but not in tds file
      var toRemove = findItems(info.registered, info.tds, "infrastructure-id");
      // TODO update data.registered and registered.json ASYNC
      fRemove(toRemove);

      // Items in platform file but not in registered file
      var toUnregister = findItems(info.platform, info.registered, "oid");
      // unregister items
      fUnregister(toUnregister)
      .then(function (response) {
        // Items in tds file but not in registered file
        var toRegister = findItems(info.tds, info.registered, "infrastructure-id");
        // TODO register items ASYNC and add them to registered file
        fRegister(toRegister);
      })
      .catch(function(err){
        reject(err);
      })

      resolve(toRegister);

    }
  );
}

//Private function

function fUnregister(array){
  return new Promise(
    function(resolve, reject) {
      sync.forEachAll(array,
        function(value, allresult, next, otherParams) {
          fUnregistering(value, otherParams, function(value, error, success, message) {
            allresult.push({value: value, error: error, success: success, message: message});
            next();
          });
        },
      function(allresult) {
        if(allresult.length === items.length){
          logger.debug('Completed async handler: ' + JSON.stringify(allresult));
          resolve(true);
        }
      },
      false,
      {}
    );
  });
}

function fUnregistering(array){}

function fRegister(items){
  return new Promise(
    function(resolve, reject) {
      sync.forEachAll(items,
        function(value, allresult, next, otherParams) {
          fRegistering(value, otherParams, function(value, error, success, message) {
            allresult.push({value: value, error: error, success: success, message: message});
            next();
          });
        },
      function(allresult) {
        if(allresult.length === items.length){
          logger.debug('Completed async handler: ' + JSON.stringify(allresult));
          resolve(true);
        }
      },
      false,
      {}
    );
  });
}

function fRegistering(){}

function fRemove(array){
  

}

/*
Items in set1 but not in set2
*/
function findItems(set1, set2, type){
  var ids = [], a = [], b = [];
  if(set1){
    set2 = !set2 ? [] : set2; // Ensure empty array if was undefined
    a = getFromJson(set1, type);
    b = getFromJson(set2, type);
    for( var i = 0, l = a.length; i < l; i++){
      if(b.indexOf(a[i]) === -1){ ids.push(a[i]); }
    }
  }
  return ids;
}

/*
Get property from JSON array
*/
function getFromJson(data, type){
  var oids = [];
  for(var i = 0, l = data.length; i < l; i++){
    oids.push(data[i][type]);
  }
  return oids;
}
