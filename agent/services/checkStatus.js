'use strict';

// Global variables and objects
var request = require('../../util/request'),
    config = require('../../configuration/configuration');

// Public functions
exports.checkStatus = function(){
  return new Promise(
    function(resolve, reject) {
      request.send('Gateway', 'agents/' + config.agid + '/objects', 'GET', {})
      .then(function(response){
        if(!response.error){
          resolve(JSON.parse(response).message);
        } else {
          reject(false);
        }
      })
    }
  );
}
