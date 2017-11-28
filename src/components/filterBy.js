/* Filters given array by filterBy which determines which column 
is filtered and filterQuery is the query to filter by. Does not mutate original array*/

import moment from 'moment'

const filterBy = (array, argumentsJSON) => {
  console.log(argumentsJSON)
  let arrayCopy = array.slice() // Copy array so original is not mutated
  if (argumentsJSON.filterBy == 'dateTime') {
    // Filter based on startTime&endTime
    if (argumentsJSON.filterArguments.startTime != undefined) {
      arrayCopy = arrayCopy.filter(row => {
        return moment(row['dateTime']).isAfter(argumentsJSON.filterArguments.startTime)
      })
    }
    if (argumentsJSON.filterArguments.endTime != undefined) {
      arrayCopy = arrayCopy.filter(row => {
        return moment(row['dateTime']).isBefore(argumentsJSON.filterArguments.endTime)
      })
    }
  }
  if (argumentsJSON.filterBy == 'species') {
    arrayCopy = arrayCopy.filter(row => {
      return row[argumentsJSON.filterBy] == argumentsJSON.filterArguments.filterQuery
    })
  }

  return arrayCopy
}

export default filterBy
