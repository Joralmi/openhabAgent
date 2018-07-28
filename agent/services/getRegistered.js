'use strict';

// Global variables and objects
var fileMgmt = require('../../util/fileMgmt');

// Public functions
exports.all = function(){
  return new Promise(
    function(resolve, reject) {
      fileMgmt.read('./configuration/registered.json')
      .then(function(response){
        if(!response.error){
          resolve(JSON.parse(response));
        } else {
          reject(false);
        }
      })
    }
  );
}

exports.oids = function(){
  return new Promise(
    function(resolve, reject) {
      fileMgmt.read('./configuration/registered.json')
      .then(function(response){
        if(!response.error){
          var data = JSON.parse(response);
          resolve(getOids(data));
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
