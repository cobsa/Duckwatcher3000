import { GETALL, SETERROR, FETCHED, FETCHING, SETSPECIES, RESETSPECIES } from '../constants/species'

const initialState = {
  fetching: false,
  fetched: false,
  error: undefined,
  species: []
}

const species = (state = initialState, action) => {
  switch (action.type) {
    case SETSPECIES: {
      return {
        species: action.payload.species,
        fetched: true,
        fetching: false
      }
    }
    case SETERROR: {
      return {
        ...state,
        error: action.payload.error
      }
    }
    case FETCHING: {
      return {
        ...state,
        fetching: true,
        fetched: false
      }
    }
    case FETCHED: {
      return {
        ...state,
        fetching: false,
        fetched: true
      }
    }
    case RESETSPECIES: {
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
