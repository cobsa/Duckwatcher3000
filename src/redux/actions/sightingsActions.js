import { UPDATEALL, SIGHTINGS, ERROR, ADDSIGHTING } from '../constants/sightings'

export const updateAll = () => {
  return {
    type: UPDATEALL
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
    type: ERROR,
    payload: {
      error
    }
  }
}

export const addSightingAction = (species, dateTime, description, count) => {
  return {
    type: ADDSIGHTING,
    payload: {
      species,
      dateTime,
      description,
      count
    }
  }
}
