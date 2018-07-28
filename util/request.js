// Global Objects

var config = require('../../configuration/configuration');
var logger = require('../../middlewares/logger');
var request = require('request-promise');

// Functions

/*
External API request service
When invoked requires 3 obligatory parameters:
url - String - Addreses the right external service -- http://.../
      The url will also point to the right header to be included in the request
endpoint - String - Endpoint where the request must be addressed
method - String - POST, GET, PUT, DELETE
payload - Object - Contains payload and may be an empty object  if not required {}
The headers are preconfigured and the token is stored under /configuration
*/
exports.send = function(url, endpoint, method, payload){

  var head = config['head' + url];
  var uri = config['url' + url] + endpoint;

  data = JSON.stringify(payload);

  var options = {};
  options.method = method;
  options.headers = head;
  options.uri = uri;
  if(method !== 'GET'){ options.body = data; }

  return request(options);
  // return request(options, function(err, response, body) {
  //       logger.debug('REQUEST RESULTS:', err, response.statusCode, body);
  //   }
  // );
}
