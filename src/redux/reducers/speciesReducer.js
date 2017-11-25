import {
  GETALL,
  SET_ERROR,
  FETCHED_SPECIES,
  FETCHING_SPECIES,
  SET_SPECIES,
  RESET_SPECIES
} from '../constants/species'

const initialState = {
  fetching: false,
  fetched: false,
  error: undefined,
  species: []
}

const species = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPECIES: {
      return {
        species: action.payload.species,
        fetched: true,
        fetching: false
      }
    }
    case SET_ERROR: {
      return {
        ...state,
        error: action.payload.error
      }
    }
    case FETCHING_SPECIES: {
      return {
        ...state,
        fetching: true,
        fetched: false
      }
    }
    case FETCHED_SPECIES: {
      return {
        ...state,
        fetching: false,
        fetched: true
      }
    }
    case RESET_SPECIES: {
      return {
        ...state,
        error: undefined
      }
    }
    default:
      return state
  }
}

export default species
