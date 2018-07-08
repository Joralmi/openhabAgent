// Global settings and packages
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser');

// Configuration file
var configuration = require('./configuration/configuration');

// Routes
var api = require('./agent/routes/api');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', api);

app.listen(port);
console.log('Server listening on: ' + port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'});
});
