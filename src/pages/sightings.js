// Node packages
import React from 'react'
import { connect } from 'react-redux'

// Custom packages

import { UPDATE_ALL_SIGHTINGS } from '../redux/constants/sightings'
import sortBy from '../components/sortBy'
import Header from '../components/table/header'
import Sighting from '../components/table/row'

import Loading from '../components/loading'

const mapStateToProps = state => {
  return {
    sightings: state.sightings,
    location: state.router.location
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateAll: () => {
      dispatch({ type: UPDATE_ALL_SIGHTINGS })
    }
  }
}

// Page that shows all sightings
class SightingsComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      orderBy: 'dateTime', // Initial order
      reverseOrder: true
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
  componentWillReceiveProps(nextProps) {
    // Will force update all when link to sightings is clicked again
    // TODO: Might not be good way?
    if (
      nextProps.location.pathname === this.props.location.pathname &&
      nextProps.location.key !== this.props.location.key
    ) {
      this.props.updateAll()
    }
  }
  render() {
    const { sightings, fetched } = this.props.sightings
    let listOfSightings
    // Sort list
    let sortedSightings = sortBy(sightings, this.state.orderBy, this.state.reverseOrder)
    if (fetched) {
      listOfSightings = sortedSightings.map(sighting => {
        return <Sighting key={sighting.id} {...sighting} />
      })
    } else {
      return <Loading />
    }
    return (
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <Header {...this.state} name="DateTime" type="dateTime" onClick={this.handleSort} />
            <Header
              {...this.state}
              name="Description"
              type="description"
              onClick={this.handleSort}
            />
            <Header {...this.state} name="Species" type="species" onClick={this.handleSort} />
            <Header {...this.state} name="Count" type="count" onClick={this.handleSort} />
          </tr>
        </thead>
        <tbody>{listOfSightings}</tbody>
      </table>
    )
  }
}

const Sightings = connect(mapStateToProps, mapDispatchToProps)(SightingsComponent)

export default Sightings
