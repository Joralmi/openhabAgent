'use strict';

//Global variables and objects
var fileMgmt = require('../../util/fileMgmt');

// Public functions
exports.write = function(data){
  return new Promise(
    function(resolve, reject) {
      fileMgmt.write('./configuration/tds.json', JSON.stringify(data))
      .then(function(response){
        if(!response.error){
          resolve(response);
        } else {
          reject(false);
        }
      })
    }
  );
}
