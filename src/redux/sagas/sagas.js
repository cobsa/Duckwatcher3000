import { put, takeEvery, all, call } from 'redux-saga/effects'
import axios from 'axios'
import Alert from 'react-s-alert'

// Sighting reducer
import * as sightingConstants from '../constants/sightings'
import * as sightingActions from '../actions/sightingsActions'
// Species reducer
import * as speciesConstants from '../constants/species'
import * as speciesActions from '../actions/speciesActions'
import backend from '../constants/backend'

// Worker sagas
export function* updateSightings() {
  // Make axios call to get all sightings
  try {
    const response = yield call(axios, backend + '/sightings')
    yield put(sightingActions.setSightings(response.data))
  } catch (e) {
    yield put(sightingActions.setError(e.message))
  }
}

export function* updateSpecies() {
  try {
    const response = yield call(axios, backend + '/species')
    yield put(speciesActions.setSpecies(response.data))
  } catch (e) {
    yield put(speciesActions.setError(e.message))
  }
}

export function* addSighting(action) {
  try {
    // Make axios post call to add new sighting to backend
    const response = yield call(axios.post, backend + '/sightings', {
      dateTime: action.payload.dateTime,
      description: action.payload.description,
      species: action.payload.species,
      count: action.payload.count
    })
    // Refetch all sightings so front end and back end are synchronized
    yield put(sightingActions.updateAll())
    // Notify user that sighting has been added
    Alert.success('Sighting added successfully', {
      position: 'bottom',
      effect: 'scale',
      timeout: 4000
    })
  } catch (e) {
    yield put(sightingActions.setError(e.message))
  }
}

// Watcher sagas
export function* watchSightings() {
  yield takeEvery(sightingConstants.UPDATE_ALL_SIGHTINGS, updateSightings)
}

export function* watchSpecies() {
  yield takeEvery(speciesConstants.GET_SPECIES, updateSpecies)
}

export function* watchAddingSightings() {
  yield takeEvery(sightingConstants.ADD_SIGHTING, addSighting)
}

export default function* rootSaga() {
  yield all([watchSightings(), watchSpecies(), watchAddingSightings()])
}
