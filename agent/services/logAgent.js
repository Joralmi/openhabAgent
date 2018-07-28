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
