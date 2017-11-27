/* Sorts array of objects by "orderBy" attribute, returns new copy of array.
Default sorting is ascending */

import moment from 'moment'

const sortBy = (array, orderBy, descending = false) => {
  function compare(a, b) {
    let aToOrder = a[orderBy]
    let bToOrder = b[orderBy]
    // When comparing dateTimes convert ISO-8601 value to unix timestamp to assure they are correctly ordered
    if (orderBy === 'dateTime') {
      aToOrder = moment(a[orderBy]).unix()
      bToOrder = moment(b[orderBy]).unix()
    }
    if (aToOrder == undefined || bToOrder == undefined) {
      return array
    }
    if (typeof aToOrder === 'string' && typeof bToOrder === 'string') {
      aToOrder = aToOrder.toLowerCase()
      bToOrder = bToOrder.toLowerCase()
    }
    if (aToOrder < bToOrder) {
      return -1
    }
    if (aToOrder > bToOrder) {
      return 1
    }
    return 0
  }
  const sortedArray = array.slice() // Copy array
  sortedArray.sort(compare)
  if (descending) {
    return sortedArray.reverse()
  } else {
    return sortedArray
  }
}

export default sortBy
