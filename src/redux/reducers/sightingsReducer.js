import * as constants from '../constants/sightings'

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
  status: {
    code: 'NOT_FETCHED',
    message: undefined
  },
  order: {
    column: 'dateTime',
    direction: 'ASCENDING'
  },
  filter: {
    column: undefined,
    filterArguments: {
      filterQuery: undefined,
      startTime: undefined,
      endTime: undefined
    }
  },
  sightings: []
}

const sightings = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_SIGHTINGS: {
      return {
        ...state,
        status: {
          code: 'FETCHED'
        },
        sightings: action.payload.sightings
      }
    }
    case constants.SET_ERROR: {
      return {
        ...state,
        status: {
          code: 'ERROR',
          message: action.payload.error
        }
      }
    }
    case constants.SET_ORDER: {
      return {
        ...state,
        order: {
          column: action.payload.column,
          direction: action.payload.direction
        }
      }
    }
    case constants.RESET_ORDER: {
      return {
        ...state,
        order: {
          column: initialState.order.column,
          direction: initialState.order.direction
        }
      }
    }
    case constants.SET_FILTER: {
      return {
        ...state,
        filter: {
          column: action.payload.column,
          filterArguments: Object.assign(
            state.filter.filterArguments,
            action.payload.filterArguments
          )
        }
      }
    }
    case constants.RESET_FILTER: {
      return {
        ...state,
        filter: {
          column: undefined,
          filterArguments: {
            filterQuery: undefined,
            startTime: undefined,
            endTime: undefined
          }
        }
      }
    }
    default:
      return state
  }
}

export default sightings
