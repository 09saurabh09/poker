import React from 'react';
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

import 'semantic-ui/dist/semantic.min.js';
import 'semantic-ui/dist/semantic.min.css';

const history = syncHistoryWithStore(browserHistory, store);
ReactDOM.render(
	<Provider store={store}>
		<Router history={history} routes={routes} />
	</Provider>,
  document.getElementById('root')
);


