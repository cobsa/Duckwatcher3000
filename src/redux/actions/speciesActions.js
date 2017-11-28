import * as constants from '../constants/species'
export const setSpecies = species => {
  return {
    type: constants.SET_SPECIES,
    payload: {
      species
    }
  }
}

export const setError = error => {
  return {
    type: constants.SET_ERROR,
    payload: {
      error
    }
  }
}

export const getSpecies = () => {
  return {
    type: constants.GET_SPECIES
  }
}
