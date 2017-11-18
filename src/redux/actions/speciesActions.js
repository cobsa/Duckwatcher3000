import { SETSPECIES, SETERROR } from '../constants/species'

export const setSpecies = species => {
  return {
    type: SETSPECIES,
    payload: {
      species
    }
  }
}

export const setError = error => {
  return {
    type: SETERROR,
    payload: {
      error
    }
  }
}
