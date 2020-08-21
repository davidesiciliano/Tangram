'use strict';

var fs = require('fs'),
  path = require('path'),
  http = require('http');

const express = require('express');
var app = express();
var serverPort = process.env.PORT || 5000;

let serveStatic = require("serve-static");

app.use(serveStatic(__dirname)); //location where static files are located

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end('Hello, World!');
}

http.createServer(app).listen(serverPort, function () {
  console.log('Your server is listening on port %d (http://localhost:%d)',
    serverPort,
    serverPort);
});
