"use strict";

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let network = require("./server/utils/network");

require("./server/config/prototype");
require('./server/config/globalConstant');

// ---- start of server side rendering ---

import env from '../server/utils/environment';
import {webpack as webPackCustomMiddleware, render} from './middleware';
import compression from 'compression';

const {isProduction, ssrEnabled, isDevelopment} = env;

require.extensions['.scss'] = function() {
    return;
};

// compile ES6 to 5
require('babel-register')();

/**
 * Environment configuration
 */
delete process.env.BROWSER;

if (!process.env.hasOwnProperty('feature')) {
  process.env.feature = {};
}

// ---- end of server side rendering ---

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Environment setup
if (isDevelopment) {
  app.use(function (req, res, next) {
    if (req.url !== '/') {
      // if you're not the root url, pass throught the webpack middleware
      webPackCustomMiddleware.WebPackMiddleware(req, res, next);
    } else {
      // Will pass through a middleware to server side render index.html
      next();
    }
  });

  app.use(webPackCustomMiddleware.HotReloadMiddleware);
}


// Other middlewares
app.use(compression());
if (ssrEnabled) {
  app.use(render.route);
} else {
  app.use(render.index);
}
/*app.use(express.static(path.join(__dirname, 'build')));

if (app.get('env') === 'development') {
    let ip = network()[0];
    console.log(ip);
    app.use(function (req, res, next) {
      let allowedOrigins = ['http://127.0.0.1:7000', 'http://localhost:7000', `http://${ip}:7000`];
      let origin = req.headers.origin;
      if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
      }
      res.setHeader("Access-Control-Request-Headers", "X-Access-Token");
      res.setHeader("Access-Control-Request-Method", "GET");
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, session-Id, source, okta_session_id, X-Access-Token, X-Session-Id, X-Device-Info, X-Os-Id, X-Request-Key, X-Application-License-Key, X-Client-Id, X-Transaction-Key, X-Custom-Driver-Id, X-Custom-operator_id, X-User-Roles, X-Auth-Msisdn");
      res.setHeader('Access-Control-Allow-Credentials', true);
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
      next();
  });

  app.use(function(req, res, next) {
    var oneof = false;
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if(oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
  });
}*/

require('./routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
