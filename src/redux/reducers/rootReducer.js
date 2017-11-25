// Node packages

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// Reducers

import sightings from './sightingsReducer'
import species from './speciesReducer'

const rootReducer = combineReducers({
  router: routerReducer,
  sightings: sightings,
  species: species
})

export default rootReducer
