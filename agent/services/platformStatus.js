'use strict';

// Global variables and objects
var request = require('../../util/request'),
    config = require('../../configuration/configuration');

// Public functions
exports.read = function(type){
  return new Promise(
    function(resolve, reject) {
      request.send('Gateway', 'agents/' + config.agid + '/objects', 'GET', {})
      .then(function(response){
        if(!response.error){
          var data = JSON.parse(response).message;
          if(type === "all"){
            resolve(data);
          } else if(type === "oid"){
            resolve(getOids(data));
          } else if(type === "infrastructure"){
            resolve(getInfraids(data));
          } else {
            reject(false);
          }
        } else {
          reject(false);
        }
      })
    }
  );
}

//Private function
function getOids(data){
  var oids = [];
  for(var i = 0, l = data.length; i < l; i++){
    oids.push(data[i].oid);
  }
  return oids;
}

function getInfraids(data){
  var ids = [];
  for(var i = 0, l = data.length; i < l; i++){
    ids.push(data[i]["infrastructure-id"]);
  }
  return ids;
}
