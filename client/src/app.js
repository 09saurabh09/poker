
// Import Modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './router';
import storeBuilder from './store/storeBuilder';
import {Provider} from 'react-redux';
require('es6-promise').polyfill();

import '../assets/styles/modal.scss';
import '../assets/styles/global.css';


const store = storeBuilder();

if (process.env.feature.DEV) {
  window.__STORE__ = store;
}

window.addEventListener('orientationchange', (e)=>{
	console.log(e);
})
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} >
            {routes}
     </Router>
  </Provider>,
  document.getElementById('root')
);
