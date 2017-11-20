/* Sorts array of objects by "orderBy" attribute.
Default sorting ascending */

const sortBy = (array, orderBy, descending) => {
  function compare(a, b) {
    if (a[orderBy] < b[orderBy]) {
      return -1
    }
    if (a[orderBy] > b[orderBy]) {
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
