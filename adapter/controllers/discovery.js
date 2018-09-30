'use strict';

var sDiscovery = require('../services/discovery'),
    manageTds = require('../services/manageTds');

exports.discovery = function (req, res, next) {
  var tdsOpenhab = [];
  var tdsStatic = [];
  var tds = [];
  sDiscovery.openhabDiscovery()
  .then(function(response){
    tdsOpenhab = response;
    return sDiscovery.staticDiscovery();
  })
  .then(function(response){
    tdsStatic = response;
    tds = tdsOpenhab.concat(tdsStatic);
    return manageTds.write(tds);
  })
  .then(function(response){
    res.json(tds);
  })
  .catch(function(err){
    res.json({error: true, data: err});
  });
};
