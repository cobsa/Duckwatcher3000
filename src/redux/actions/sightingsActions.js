import { UPDATEALL, SIGHTINGS, ERROR } from '../constants/sightings'

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
