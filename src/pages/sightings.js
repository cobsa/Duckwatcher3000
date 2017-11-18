// Node packages
import React from 'react'
import { connect } from 'react-redux'

// Custom packages
import Sighting from '../components/sighting'
import { UPDATEALL } from '../redux/constants/sightings'

const mapStateToProps = state => {
  return {
    sightings: state.sightings
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateAll: () => {
      dispatch({ type: UPDATEALL })
    }
  }
}

// Page that shows all sightings
class SightingsComponent extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.updateAll()
  }
  render() {
    const { sightings, fetched } = this.props.sightings
    console.log(sightings)
    let listOfSightings
    if (fetched) {
      listOfSightings = sightings.map(sighting => {
        return <Sighting key={sighting.id} {...sighting} />
      })
      console.log(listOfSightings)
    } else {
      return <div> Loading </div>
    }

    return (
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Species</th>
            <th>Description</th>
            <th>Count</th>
            <th>DateTime</th>
          </tr>
        </thead>
        <tbody>{listOfSightings}</tbody>
      </table>
    )
  }
}

const Sightings = connect(mapStateToProps, mapDispatchToProps)(SightingsComponent)

export default Sightings
