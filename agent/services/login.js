'use strict';

// Global variables and objects
var request = require('../../util/request');

// Public functions
exports.logAgent = function(){
  return new Promise(
    function(resolve, reject) {
      request.send('Gateway', 'objects/login', 'GET', {})
      .then(function(response){
        if(!response.error){
          resolve(true);
        } else {
          reject(false);
        }
      })
    }
  );
}

// Modify to be able to register items
// Return registration status of each item
exports.logItems = function(data){
  var oids = getOids(data);
  return new Promise(
    function(resolve, reject) {
      request.send('Items', 'objects/login', 'GET', {})
      .then(function(response){
        if(!response.error){
          resolve(true);
        } else {
          reject(false);
        }
      })
    }
  );
}

// Private functions
/*
Get oids from JSON
*/
function getOids(data){
  var oids = [];
  for(var i = 0, l = data.length; i < l; i++){
    oids.push(data[i].oid);
  }
  return oids;
}
