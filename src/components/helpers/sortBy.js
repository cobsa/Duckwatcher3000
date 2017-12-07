/* Sorts array of objects by "orderBy" attribute, returns new copy of array.
Default sorting is ascending */

const sortBy = (array, orderBy, descending = false) => {
  function compare(a, b) {
    let aToOrder = a[orderBy]
    let bToOrder = b[orderBy]
    // Return original table if orderBy argument is invalid
    if (aToOrder === undefined || bToOrder === undefined) {
      return array
    }
    if (typeof aToOrder === 'string' && typeof bToOrder === 'string') {
      aToOrder = aToOrder.toLowerCase()
      bToOrder = bToOrder.toLowerCase()
    }
    // Reverse sort order for species and description to allow default order to be A-Z instead Z-A
    if (orderBy === 'description' || orderBy === 'species') {
      if (aToOrder < bToOrder) {
        return 1
      }
      if (aToOrder > bToOrder) {
        return -1
      }
    }
    // Default case, used for count and dateTime
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
