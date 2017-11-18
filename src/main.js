// Node packages
import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import logger from 'redux-logger'
import { createBrowserHistory } from 'history'
import { Route } from 'react-router'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'
import createSageMiddleware from 'redux-saga'
// Custom packages
import Sightings from './pages/sightings'
import AddSighting from './pages/addSighting'
import rootReducer from './redux/reducers/rootReducer'
import Navbar from './components/navbar'
import rootSaga from './redux/sagas/sagas'

// Setup store with history, logger and sagaMiddleware
const history = createBrowserHistory()
const sagaMiddleware = createSageMiddleware()
const middleware = [routerMiddleware(history), logger, sagaMiddleware]

let store = createStore(rootReducer, applyMiddleware(...middleware))
sagaMiddleware.run(rootSaga)

var app = document.getElementById('app')
ReactDom.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="container">
        <div className="navContainer">
          <Navbar />
        </div>
        <div className="content">
          <Route exact path="/" component={Sightings} />
          <Route path="/addSighting" component={AddSighting} />
        </div>
      </div>
    </ConnectedRouter>
  </Provider>,
  app
)
