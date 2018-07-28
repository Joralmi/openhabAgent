'use strict';

// Global variables and objects
var request = require('../../util/request');

// Public functions
// Modify to be able to register items
// Return registration status of each item
exports.logItems = function(){
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
