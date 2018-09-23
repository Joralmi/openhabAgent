'use strict';

var sAirQuality = require('../services/airQuality');

exports.getAirQuality = function (req, res, next) {
  sAirQuality.get()
  .then(function(response){
    res.json({error: false, data: response});
  })
  .catch(function(err){
    res.json({error: true, data: err});
  });
};
