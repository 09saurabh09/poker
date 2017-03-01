"use strict";

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { useRouterHistory, RouterContext, match } from 'react-router'

import { createMemoryHistory, useQueries } from 'history'
import compression from 'compression'
import Promise from 'bluebird'

import configureStore from './client/src/store/configureStore'
import createRoutes from './client/src/routes/index'

import { Provider } from 'react-redux'

import Helmet from 'react-helmet'

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let network = require("./server/utils/network");


require("./server/config/prototype");
require('./server/config/globalConstant');

var app = express();

let scriptSrcs;
process.env.ON_SERVER = true

// view engine setup

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


let styleSrc
if ( process.env.NODE_ENV === 'production' ) {
  let refManifest = require('../rev-manifest.json')
  scriptSrcs = [
    `/${refManifest['vendor.js']}`,
    `/${refManifest['app.js']}`,
  ]
  styleSrc = `/${refManifest['main.css']}`
} else {
  let ip = network()[0];
  console.log(ip);
  scriptSrcs = [
    `http://${ip}:7000/static/vendor.js`,
    `http://${ip}:7000/static/dev.js`,
    `http://${ip}:7000/static/app.js`
  ]
  styleSrc = '/main.css'
}

app.use(compression())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'public')))
} else {
  app.use('/assets', express.static(path.join(__dirname, 'client/assets')))
  app.use(express.static(path.join(__dirname, 'dist')))
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


app.get('*', (req, res, next)=> {
  let history = useRouterHistory(useQueries(createMemoryHistory))()
  let store = configureStore()
  let routes = createRoutes(history)
  let location = history.createLocation(req.url)

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search)
    } else if (error) {
      res.status(500).send(error.message)
    } else if (renderProps == null) {
      res.status(404).send('Not found')
    } else {
      let [ getCurrentUrl, unsubscribe ] = subscribeUrl()
      let reqUrl = location.pathname + location.search

      getReduxPromise().then(()=> {
        let reduxState = escape(JSON.stringify(store.getState()))
        let html = ReactDOMServer.renderToString(
          <Provider store={store}>
            { <RouterContext {...renderProps}/> }
          </Provider>
        )
        let metaHeader = Helmet.rewind();

        if ( getCurrentUrl() === reqUrl ) {          res.render('index', { metaHeader, html, scriptSrcs, reduxState, styleSrc })
        } else {
          res.redirect(302, getCurrentUrl())
        }
        unsubscribe()
      })
      .catch((err)=> {
        Helmet.rewind();
        unsubscribe()
        next(err)
      })
      function getReduxPromise () {
        let { query, params } = renderProps
        let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent
        let promise = comp.fetchData ?
          comp.fetchData({ query, params, store, history }) :
          Promise.resolve()

        return promise
      }
    }
  })
  function subscribeUrl () {
    let currentUrl = location.pathname + location.search
    let unsubscribe = history.listen((newLoc)=> {
      if (newLoc.action === 'PUSH' || newLoc.action === 'REPLACE') {
        currentUrl = newLoc.pathname + newLoc.search
      }
    })
    return [
      ()=> currentUrl,
      unsubscribe
    ]
  }
})


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
