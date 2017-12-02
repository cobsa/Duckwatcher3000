// Node packages
import React from 'react' // eslint-disable-line no-unused-vars
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import logger from 'redux-logger'
import { createBrowserHistory } from 'history'
import { Route } from 'react-router'
import createSageMiddleware from 'redux-saga'
import Alert from 'react-s-alert' // Module to show alerts
import { initialize, addTranslationForLanguage } from 'react-localize-redux' // Localization package
import Cookies from 'universal-cookie'
// Import Alert css files
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/scale.css'

// Custom packages
import Sightings from './pages/sightings'
import AddSighting from './pages/addSighting'
import rootReducer from './redux/reducers/rootReducer'
import Navbar from './components/navbar'
import rootSaga from './redux/sagas/sagas'
import cookiesMiddleware from './redux/middlewares/cookies'

// Setup store with history, logger and sagaMiddleware
const history = createBrowserHistory()
const sagaMiddleware = createSageMiddleware()
const middleware = [routerMiddleware(history), logger, sagaMiddleware, cookiesMiddleware]
const cookies = new Cookies()

let store = createStore(rootReducer, applyMiddleware(...middleware))
sagaMiddleware.run(rootSaga) // Initialize sagas
// Initialize localization
const languages = ['en', 'fi']
store.dispatch(initialize(languages, { defaultLanguage: cookies.get('language') }))
const englishTranslation = require('./translations/en.json')
store.dispatch(addTranslationForLanguage(englishTranslation, 'en'))
const finnishTranslation = require('./translations/fi.json')
store.dispatch(addTranslationForLanguage(finnishTranslation, 'fi'))

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
        <Alert stack={{ limit: 1 }} />
      </div>
    </ConnectedRouter>
  </Provider>,
  app
)
