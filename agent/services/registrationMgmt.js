'use strict';

// Global variables and objects
var request = require('../../util/request'),
    sync = require('../../util/sync'),
    config = require('../../configuration/configuration'),
    registrationStatus = require('../services/registrationStatus'),
    logger = require('../../middlewares/logger');

// Public functions
exports.process = function(info){
  return new Promise(
    function(resolve, reject) {
      fRemove(info) // Update data.registered and registered.json ASYNC
      .then(function(response){
        return fUnregister(info); // Unregister items
      })
      .then(function(response){
        return fRegister(info) // Register items and add them to registered file
      })
      .then(function(response){
        resolve(response);
      })
      .catch(function(error){
        logger.debug(error);
        reject(error);
      });
    }
  );
}

//Private function

/**
* @param {Object} ItemsInfo
* @return {Promise}
*/
function fRemove(info){
  return new Promise(
    function(resolve, reject) {
      var newArray = [];
      // Items in registered file but not in tds file
      var toRemove = findItems(info.registered, info.tds, "infrastructure-id");
      // Store a new array with devices that do not have to be removed
      for(var i = 0, l = info.registered.length; i < l; i++){
        if(array.indexOf(info.registered[i].oid) === -1){
          newArray.push(info.registered[i]);
        }
      }
      // Assign only the values that are not removed
      info.registered = newArray;
      // Update registered.json
      return registrationStatus.write(newArray);
    }
  );
}

/**
* @param {Object} ItemsInfo
* @return {Promise} Array with things registered
*/
function fRegister(info){
  return new Promise(
    function(resolve, reject) {
      // Items in tds file but not in registered file
      var toRegister = findItems(info.tds, info.registered, "infrastructure-id");
      // Store a new array with devices that need to be registered
      var newArray = [];
      for(var i = 0, l = info.tds.length; i < l; i++){
        if(toRegister.indexOf(info.tds[i].oid) !== -1){
          newArray.push(info.tds[i]);
        }
      }
      // Register items
      var toRegisterObj = { agid: config.agid, thingDescriptions: newArray};
      request.send('Gateway', 'agents/' + config.agid + '/objects', 'POST', toRegisterObj)
      .then(function (response) {
        // Save new registered.json
        return registrationStatus.write(info.tds);
      })
      .then(function (response) {
        resolve(toRegister);
      })
      .catch(function (err) {
        reject(err);
      })
    }
  );
}

/**
* @param {Object} ItemsInfo
* @return {Promise}
*/
function fUnregister(info){
  return new Promise(
    function(resolve, reject) {
      // Items in platform file but not in registered file
      var toUnregister = findItems(info.platform, info.registered, "oid");
      var toUnregisterObj = { agid: config.agid, oids: toUnregister};
      return request.send('Gateway', 'agents/' + config.agid + '/objects/delete', 'POST', toUnregisterObj);
    }
  );
}

/*
Items in set1 but not in set2
*/
function findItems(set1, set2, type){
  var ids = [], a = [], b = [];
  if(set1){
    set2 = !set2 ? [] : set2; // Ensure empty array if was undefined
    a = getFromJson(set1, type);
    b = getFromJson(set2, type);
    for( var i = 0, l = a.length; i < l; i++){
      if(b.indexOf(a[i]) === -1){ ids.push(a[i]); }
    }
  }
  return ids;
}

/*
Get property from JSON array
*/
function getFromJson(data, type){
  var oids = [];
  for(var i = 0, l = data.length; i < l; i++){
    oids.push(data[i][type]);
  }
  return oids;
}
