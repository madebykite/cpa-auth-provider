"use strict";

var app = require('./lib/app');
var http = require('http');

http.createServer(app).listen(app.get('port'));