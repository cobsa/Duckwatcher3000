import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import sightings from './sightingsReducer'

const rootReducer = combineReducers({
  router: routerReducer,
  sightings: sightings
})

export default rootReducer
