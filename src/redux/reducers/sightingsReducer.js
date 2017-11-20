import { SIGHTINGS, FETCHING, FETCHED, ERROR, RESETSIGHTINGS } from '../constants/sightings'

/* 
    State layout:
    fetching: true,
    fetched: false,
    error: false,
    sightings: [
    {
        "id": int,
        "dateTime": Sting(ISO-8601),
        "description:" String,
        "count": int
    }, {
        ...
    }
    ]
*/

let initialState = {
  fetching: false,
  fetched: false,
  error: undefined,
  sightings: []
}

const sightings = (state = initialState, action) => {
  switch (action.type) {
    case SIGHTINGS:
      // Replaces state
      return {
        ...state,
        fetched: true,
        sightings: action.payload.sightings
      }
    case FETCHING: {
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: undefined
      }
    }
    case FETCHED: {
      return {
        ...state,
        fetched: true,
        fetching: false,
        error: undefined
      }
    }
    case ERROR: {
      return {
        ...state,
        fetched: false,
        fetching: false,
        error: action.payload.error
      }
    }
    case RESETSIGHTINGS: {
      return {
        ...state,
        error: undefined
      }
    }
    default:
      return state
  }
}

export default sightings
