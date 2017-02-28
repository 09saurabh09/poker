/*import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store';
import routes from './router';
require('es6-promise').polyfill();

// Provider is a top-level component that wrapps our entire application, including
// the Router. We pass it a reference to the store so we can use react-redux's
// connect() method for Component Containers.

/*import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';*/
/*import './main.css';
import '../assets/styles/modal.scss';
import globalStyles from '../assets/styles/global.css';


window.addEventListener('orientationchange', (e)=>{
	console.log(e);
})
const history = syncHistoryWithStore(browserHistory, store);
ReactDOM.render(
	<Provider store={store}>
		<Router history={history} routes={routes} />
	</Provider>,
  document.getElementById('root')
);
*/

import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'

import configureStore from 'store/configureStore'
import createRoutes from 'routes/index'
import { Provider } from 'react-redux'
import _ from 'lodash'

let initialState;
if (window.__REDUX_STATE__) {
  try {
    initialState = JSON.parse(unescape(__REDUX_STATE__))
  } catch (e) {
  }
}

const store = configureStore(initialState)

ReactDOM.render((
  <Provider store={store}>
    { createRoutes(browserHistory) }
  </Provider>
), document.getElementById('root'))
