import * as speciesConstants from '../constants/species'

/* 
    State layout:
    status: {
      code: "ERROR", "FETCHED", 
      message: "i.e. error message"
    }
    species: [
    {
        name: "mallard"
    }, {
        ...
    }
    ]
*/

const initialState = {
  status: {
    code: 'NOT_FETCHED',
    message: undefined
  },
  species: []
}

const species = (state = initialState, action) => {
  switch (action.type) {
    case speciesConstants.SET_SPECIES: {
      return {
        ...state,
        status: {
          code: 'FETCHED'
        },
        species: action.payload.species
      }
    }
    case speciesConstants.SET_ERROR: {
      return {
        ...state,
        status: {
          code: 'ERROR',
          message: action.payload.error
        }
      }
    }
    default:
      return state
  }
}

export default species
