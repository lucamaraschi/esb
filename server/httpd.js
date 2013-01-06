/**
 * HTTP Server
 * Copyright(c) 2013 Netspedition Inc <ovi@netspedition.com>
 * MIT Licensed
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , config = require('../config.json')
  , router = require('./router')(config)

var app = express();

app.configure(function() {
  app.set('views', './web/views');
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static('./web/public'));    
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', router.index);
app.get('/request', router.request);
app.get('/respond', router.respond);

http.createServer(app).listen(config.bind.port, config.bind.host, function () {
  console.log("Enterprise Service Bus started on port " + config.bind.port);
});
