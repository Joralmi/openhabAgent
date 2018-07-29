'use strict';

// Global variables and objects
var fileMgmt = require('../../util/fileMgmt');

// Public functions
exports.read = function(){
  return new Promise(
    function(resolve, reject) {
      fileMgmt.read('./configuration/registered.json')
      .then(function(response){
        if(!response.error){
          var data = JSON.parse(response);
          resolve(data);
        } else {
          reject("Error: " + response.error);
        }
      })
    }
  );
}

exports.write = function(data){
  return new Promise(
    function(resolve, reject) {
      fileMgmt.write('./configuration/registered.json', data)
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
