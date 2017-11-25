import { UPDATE_ALL_SIGHTINGS, SIGHTINGS, ERROR_SIGHTINGS, ADD_SIGHTING } from '../constants/sightings'

export const updateAll = () => {
  return {
    type: UPDATE_ALL_SIGHTINGS
  }
}

export const setSightings = data => {
  return {
    type: SIGHTINGS,
    payload: {
      sightings: data
    }
  }
}

export const setError = error => {
  return {
    type: ERROR_SIGHTINGS,
    payload: {
      error
    }
  }
}

export const addSightingAction = (species, dateTime, description, count) => {
  return {
    type: ADD_SIGHTING,
    payload: {
      species,
      dateTime,
      description,
      count
    }
  }
}
