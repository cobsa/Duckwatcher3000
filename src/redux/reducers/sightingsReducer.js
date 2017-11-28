import {
  SIGHTINGS,
  FETCHING,
  FETCHED_SIGHTINGS,
  ERROR_SIGHTINGS,
  RESET_SIGHTINGS
} from '../constants/sightings'

/* 
    State layout:
    status: {
      code: "ERROR", "FETCHED", 
      message: "i.e. error message"
    }
    order: {
      column: "species"/"dateTime" etc,
      direction: "ASCENDING/DESCENDING"
    }
    filter: {
      filterBy: string,
      filterArguments: {
        
      }
    }
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
  fetched: false,
  error: undefined,
  sightings: []
}

const sightings = (state = initialState, action) => {
  switch (action.type) {
    case SIGHTINGS:
      // Replaces sightings
      return {
        ...state,
        fetched: true,
        error: undefined,
        sightings: action.payload.sightings
      }
    case FETCHED_SIGHTINGS: {
      return {
        ...state,
        fetched: true,
        fetching: false,
        error: undefined
      }
    }
    case ERROR_SIGHTINGS: {
      return {
        ...state,
        fetched: false,
        fetching: false,
        error: action.payload.error
      }
    }
    case RESET_SIGHTINGS: {
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
