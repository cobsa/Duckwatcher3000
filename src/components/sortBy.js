/* Sorts array of objects by "orderBy" attribute.
Default sorting ascending */

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
  if (descending) {
    array.sort(compare)
    return array.reverse()
  } else {
    return array.sort(compare)
  }
}

export default sortBy
