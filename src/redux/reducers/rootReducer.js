// Node packages

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { localeReducer } from 'react-localize-redux' // Localization package

// Reducers

import sightings from './sightingsReducer'
import species from './speciesReducer'

const rootReducer = combineReducers({
  router: routerReducer,
  sightings: sightings,
  species: species,
  locale: localeReducer
})

export default rootReducer
