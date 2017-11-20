// Node packages
import React from 'react'
import { connect } from 'react-redux'

// Custom packages
import Sighting from '../components/sighting'
import { UPDATEALL } from '../redux/constants/sightings'
import sortBy from '../components/sortBy'
import Header from '../components/table/header'

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
    this.state = {
      orderBy: undefined,
      reverseOrder: false
    }
    this.handleSort = this.handleSort.bind(this)
  }

  handleSort(type, event) {
    if (this.state.orderBy !== type) {
      this.setState({
        orderBy: type,
        reverseOrder: false
      })
    } else {
      this.setState({
        reverseOrder: !this.state.reverseOrder
      })
    }
  }
  componentDidMount() {
    this.props.updateAll()
  }
  render() {
    const { sightings, fetched } = this.props.sightings
    let listOfSightings
    // Sort list
    sortBy(sightings, this.state.orderBy, this.state.reverseOrder)
    if (fetched) {
      listOfSightings = sightings.map(sighting => {
        return <Sighting key={sighting.id} {...sighting} />
      })
    } else {
      return <div> Loading </div>
    }
    console.log(this.state)
    return (
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <Header {...this.state} name="Species" type="species" onClick={this.handleSort} />
            <Header
              {...this.state}
              name="Description"
              type="description"
              onClick={this.handleSort}
            />
            <Header {...this.state} name="Count" type="count" onClick={this.handleSort} />
            <Header {...this.state} name="DateTime" type="dateTime" onClick={this.handleSort} />
          </tr>
        </thead>
        <tbody>{listOfSightings}</tbody>
      </table>
    )
  }
}

const Sightings = connect(mapStateToProps, mapDispatchToProps)(SightingsComponent)

export default Sightings
