'use strict';

var sDiscovery = require('../services/discovery'),
    manageTds = require('../services/manageTds');

exports.discovery = function (req, res, next) {
  sDiscovery.discover()
  .then(function(response){
    return manageTds.write(response);
  })
  .then(function(response){
    res.json(response);
  })
  .catch(function(err){
    res.json({error: true, data: err});
  });
};
