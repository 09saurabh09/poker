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
