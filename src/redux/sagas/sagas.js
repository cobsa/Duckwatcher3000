import { put, takeEvery, all, call } from 'redux-saga/effects'
import axios from 'axios'

// Sighting reducer
import * as sightingConstants from '../constants/sightings'
import * as sightingActions from '../actions/sightingsActions'
// Species reducer
import * as speciesConstants from '../constants/species'
import * as speciesActions from '../actions/speciesActions'
import backend from '../constants/backend'

// Worker sagas
export function* updateSightings() {
  yield put({ type: sightingConstants.FETCHING })
  // Make axios call to get all sightings
  try {
    const response = yield call(axios, backend + '/sightings')
    yield put(sightingActions.setSightings(response.data))
  } catch (e) {
    yield put(sightingActions.setError(e))
  }
}

export function* updateSpecies() {
  yield put({ type: speciesConstants.FETCHING })
  try {
    const response = yield call(axios, backend + '/species')
    yield put(speciesActions.setSpecies(response.data))
  } catch (e) {
    yield put(speciesActions.setError(e))
  }
}

export function* addSighting(action) {
  try {
    const response = yield call(axios.post, backend + '/sightings', {
      dateTime: action.payload.dateTime,
      description: action.payload.description,
      species: action.payload.species,
      count: action.payload.count
    })
    yield put(sightingActions.updateAll())
  } catch (e) {
    yield put(sightingActions.setError(e))
  }
}

// Watcher sagas
export function* watchSightings() {
  yield takeEvery(sightingConstants.UPDATEALL, updateSightings)
}

export function* watchSpecies() {
  yield takeEvery(speciesConstants.GETSPECIES, updateSpecies)
}

export function* watchAddingSightings() {
  yield takeEvery(sightingConstants.ADDSIGHTING, addSighting)
}

export default function* rootSaga() {
  yield all([watchSightings(), watchSpecies(), watchAddingSightings()])
}
