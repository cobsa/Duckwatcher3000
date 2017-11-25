import { SET_SPECIES, SET_ERROR } from '../constants/species'

export const setSpecies = species => {
  return {
    type: SET_SPECIES,
    payload: {
      species
    }
  }
}

export const setError = error => {
  return {
    type: SET_ERROR,
    payload: {
      error
    }
  }
}
