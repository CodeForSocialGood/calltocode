import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import { Route, Switch } from 'react-router-dom'
import localStorageMiddleware from './middleware/localStorageMiddleware'
import promiseMiddleware from './middleware/promiseMiddleware'

import './index.css'
import App from './App'
import reducers from './reducers'

const browserHistory = createHistory()
const navigationMiddleware = routerMiddleware(browserHistory)
const loggerMiddleware = createLogger({
  predicate: (getState, action) => action.type && !action.type.includes('redux-form')
})

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  applyMiddleware(
    navigationMiddleware,
    loggerMiddleware,
    promiseMiddleware,
    thunkMiddleware,
    localStorageMiddleware
  )
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={browserHistory}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.querySelector('main')
)

export default store
