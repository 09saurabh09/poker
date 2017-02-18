/*import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk)
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

const store = configureStore();

export default store;*/

import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers'
import DevTools from '../utils/devtools';

function _buildStore(middlewares) {
  let functions = [applyMiddleware(...middlewares)];
  if (process.env.feature.DEV) {
    functions.push(require('../utils/devtools').default.instrument());
  }
  return compose(
    ...functions
  )(createStore)(rootReducer);
}

export default function storeBuilder(customMiddlewares = []) {
  const middlewares = [thunk, createLogger];
  const store = _buildStore([...middlewares, ...customMiddlewares])
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }
  return store;
}

