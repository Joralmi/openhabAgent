'use strict';

// Global variables and objects
var request = require('../../util/request'),
    config = require('../../configuration/configuration');

// Public functions
exports.read = function(){
  return new Promise(
    function(resolve, reject) {
      request.send('Gateway', 'agents/' + config.agid + '/objects', 'GET', {})
      .then(function(response){
        if(!response.error){
          var data = JSON.parse(response).message;
          resolve(data);
        } else {
          reject("Error: " + response.error);
        }
      })
    }
  );
}
