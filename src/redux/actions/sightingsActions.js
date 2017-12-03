import * as constants from '../constants/sightings'
export const getSightings = () => {
  return {
    type: constants.GET_SIGHTINGS
  }
}

export const setSightings = data => {
  return {
    type: constants.SET_SIGHTINGS,
    payload: {
      sightings: data
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

export const addSighting = (species, dateTime, description, count) => {
  return {
    type: constants.ADD_SIGHTING,
    payload: {
      species,
      dateTime,
      description,
      count
    }
  }
}

export const setOrder = (column, direction) => {
  return {
    type: constants.SET_ORDER,
    payload: {
      column,
      direction
    }
  }
}

export const resetOrder = () => {
  return {
    type: constants.RESET_ORDER
  }
}

export const setFilter = (column, filterArguments) => {
  return {
    type: constants.SET_FILTER,
    payload: {
      column,
      filterArguments
    }
  }
}

export const resetFilter = () => {
  return {
    type: constants.RESET_FILTER
  }
}

export const setNewSightingId = id => {
  return {
    type: constants.SET_NEW_SIGHTING_ID,
    payload: {
      id
    }
  }
}

export const resetNewSightingID = () => {
  return {
    type: constants.RESET_NEW_SIGHTING_ID
  }
}
