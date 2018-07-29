'use strict';

// Global variables and objects
var fileMgmt = require('../../util/fileMgmt');

// Public functions
exports.read = function(type){
  return new Promise(
    function(resolve, reject) {
      fileMgmt.read('./configuration/tds.json')
      .then(function(response){
        if(!response.error){
          var data = JSON.parse(response);
          if(type === "all"){
            resolve(data);
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
function getInfraids(data){
  var oids = [];
  for(var i = 0, l = data.length; i < l; i++){
    oids.push(data[i]["infrastructure-id"]);
  }
  return oids;
}
