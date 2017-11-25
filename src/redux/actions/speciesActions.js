import { SET_SPECIES, SET_ERROR, GET_SPECIES } from '../constants/species'

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

export const getSpecies = () => {
  return {
    type: GET_SPECIES
  }
}
