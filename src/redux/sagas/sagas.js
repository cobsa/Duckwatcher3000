import { put, takeEvery, all, call, select } from 'redux-saga/effects'
import axios from 'axios'
import Alert from 'react-s-alert'
import { getTranslate } from 'react-localize-redux'

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
    // Show error message to user
    const state = yield select() // Get state for getTranslate
    const translate = getTranslate(state.locale) // Get translate function
    Alert.error(translate('alerts.error.network'), {
      position: 'bottom',
      effect: 'scale',
      timeout: 4000
    })
  }
}

export function* updateSpecies() {
  try {
    const response = yield call(axios, backend + '/species')
    yield put(speciesActions.setSpecies(response.data))
  } catch (e) {
    yield put(speciesActions.setError(e.message))
    // Show error message to user
    const state = yield select() // Get state for getTranslate
    const translate = getTranslate(state.locale) // Get translate function
    Alert.error(translate('alerts.error.network'), {
      position: 'bottom',
      effect: 'scale',
      timeout: 4000
    })
  }
}

export function* addSighting(action) {
  try {
    let newID
    // Make axios post call to add new sighting to backend
    const response = yield call(axios.post, backend + '/sightings', {
      dateTime: action.payload.dateTime,
      description: action.payload.description,
      species: action.payload.species,
      count: action.payload.count
    })
    if (response.data.id >= 0) {
      newID = response.data.id
    }
    // Refetch all sightings so front end and back end are synchronized
    yield put(sightingActions.getSightings())
    // Notify user that sighting has been added
    const state = yield select() // Get state for getTranslate
    const translate = getTranslate(state.locale) // Get translate function
    Alert.success(translate('alerts.success.addSighting'), {
      position: 'bottom',
      effect: 'scale',
      timeout: 4000
    })
    // Add sightings id to redux so user can have visual cue of the added sighting
    yield put(sightingActions.setNewSightingId(newID))
    // Reset filters so user can see newly added sighting
    yield put(sightingActions.resetFilter())
    // Also hide filter controls
    yield put(sightingActions.collapseFilter(true))
  } catch (e) {
    yield put(sightingActions.setError(e.message))
  }
}

// Watcher sagas
export function* watchSightings() {
  yield takeEvery(sightingConstants.GET_SIGHTINGS, updateSightings)
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
