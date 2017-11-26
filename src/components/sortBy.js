/* Sorts array of objects by "orderBy" attribute, returns new copy of array.
Default sorting is ascending */

// NOTE: might be issues with chrome. TODO: RECHECK


const sortBy = (array, orderBy, descending = false) => {
  function compare(a, b) {
    let aToOrder = a[orderBy]
    let bToOrder = b[orderBy]
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
