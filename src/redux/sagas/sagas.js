import { put, takeEvery, all, call } from 'redux-saga/effects'
import axios from 'axios'

import { FETCHING, FETCHED, ERROR, SIGHTINGS, UPDATEALL } from '../constants/sightings'
import { setSightings, setError } from '../actions/sightingsActions'
import backend from '../constants/backend'

// Worker sagas
export function* updateAll() {
  yield put({ type: FETCHING })
  // Make axios call to get all sightings
  try {
    const response = yield call(axios, backend + '/sightings')
    yield put(setSightings(response.data))
  } catch (e) {
    yield put(setError(e))
  }
}

// Watcher sagas
export function* watchSightings() {
  yield takeEvery(UPDATEALL, updateAll)
}

export default function* rootSaga() {
  yield all([watchSightings()])
}
