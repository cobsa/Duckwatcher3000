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

// Watcher sagas
export function* watchSightings() {
  yield takeEvery(sightingConstants.UPDATEALL, updateSightings)
}

export function* watchSpecies() {
  yield takeEvery(speciesConstants.GETSPECIES, updateSpecies)
}

export default function* rootSaga() {
  yield all([watchSightings(), watchSpecies()])
}
