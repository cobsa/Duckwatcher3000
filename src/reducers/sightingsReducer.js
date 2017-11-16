/* 
    State layout:
    fetching: true,
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

let initialState = []

const sightings = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_ALL_SIGHTINGS':
      // Replaces state
      return action.payload.sightings
    default:
      return state
  }
}
