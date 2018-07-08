'use strict';

var sDiscovery = require('../services/discovery');

exports.discovery = function (req, res, next) {
  sDiscovery.discover()
  .then(function(response){
    res.json(response);
  })
  .catch(function(err){
    res.json({error: true, data: err});
  });
};
