import { UPDATEALL, FETCHING, FETCHED, ERROR } from '../constants/sightings'

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

export const sightings = (state = initialState, action) => {
  switch (action.type) {
    case UPDATEALL:
      // Replaces state
      return {
        ...state,
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
    default:
      return state
  }
}
