var config = {};
module.exports = config;

/*
Credentials
*/
config.credentialsGateway = "72e7c282-aca0-4aa4-8cd7-0f10d2d5ac97:test";
config.agid = "72e7c282-aca0-4aa4-8cd7-0f10d2d5ac97";

/*
Urls
*/
config.urlOpenhab = "http://192.168.0.74:8080/rest/";
config.urlGateway = "http://192.168.0.74:8181/api/"

/*
Headers
*/
config.headOpenhab = {
  'Content-Type' : 'application/json',
  'Accept' : 'application/json',
  'simple': false
};
config.headGateway = {
  'Authorization': 'Basic ' + new Buffer(config.credentialsGateway).toString('base64'),
  'Content-Type' : 'application/json',
  'Accept' : 'application/json',
  'simple': false
};
