'use strict';

var sDiscovery = require('../services/discovery'),
    manageTds = require('../services/manageTds');

exports.discovery = function (req, res, next) {
  var tds;
  sDiscovery.discover()
  .then(function(response){
    tds = response;
    return manageTds.write(response);
  })
  .then(function(response){
    res.json(tds);
  })
  .catch(function(err){
    res.json({error: true, data: err});
  });
};
