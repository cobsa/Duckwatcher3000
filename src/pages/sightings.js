/* Page shows listing of current sightings */

// Node packages
import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

// Custom packages

import { UPDATE_ALL_SIGHTINGS } from '../redux/constants/sightings'
import { GET_SPECIES } from '../redux/constants/species'
import sortBy from '../components/sortBy'
import filterBy from '../components/filterBy'
import Header from '../components/table/header'
import Sighting from '../components/table/row'
import SelectInput from '../components/form/selectInput'

import Loading from '../components/loading'
import Filter from '../components/filterComponent'

const mapStateToProps = state => {
  return {
    sightings: state.sightings,
    location: state.router.location,
    species: state.species
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSightings: () => {
      dispatch({ type: UPDATE_ALL_SIGHTINGS })
    },
    updateSpecies: () => {
      dispatch({ type: GET_SPECIES })
    }
  }
}

// Page that shows all sightings
class SightingsComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      orderBy: 'dateTime', // Initial order
      reverseOrder: true,
      filterByColumn: undefined,
      filterQuery: undefined,
      filterStartTime: undefined,
      filterEndTime: undefined
    }
    this.handleSort = this.handleSort.bind(this)
    this.handleSpecies = this.handleSpecies.bind(this)
    this.handleStartTime = this.handleStartTime.bind(this)
    this.handleEndTime = this.handleEndTime.bind(this)
    this.resetFilters = this.resetFilters.bind(this)
  }

  componentDidMount() {
    // Update sightings
    this.props.updateSightings()
    this.props.updateSpecies()
  }
  componentWillReceiveProps(nextProps) {
    // Will force update all when link to sightings is clicked again
    // TODO: Might not be good way?
    if (
      nextProps.location.pathname === this.props.location.pathname &&
      nextProps.location.key !== this.props.location.key
    ) {
      this.props.updateSightings()
      this.props.updateSpecies()
    }
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
  handleSpecies(data) {
    if (data != undefined) {
      // Species in list of species
      this.setState({
        filterByColumn: 'species',
        filterQuery: data
      })
    } else {
      // Species is not in the list ie. User selected "Choose species"
      this.setState({
        filterByColumn: undefined,
        filterQuery: undefined
      })
    }
  }

  handleStartTime(startTime) {
    // Check that is moment and not string
    if (startTime instanceof moment) {
      this.setState({
        filterByColumn: 'dateTime',
        filterStartTime: startTime
      })
    }
  }
  handleEndTime(endTime) {
    // Check that is moment and not string
    if (endTime instanceof moment) {
      this.setState({
        filterByColumn: 'dateTime',
        filterEndTime: endTime
      })
    }
  }
  resetFilters(e) {
    e.preventDefault()
    this.setState({
      filterByColumn: undefined
    })
  }
  render() {
    const { sightings, fetched } = this.props.sightings
    const { species } = this.props.species
    let listOfSightings
    console.log(this.state)
    if (fetched) {
      // Filter list
      let filteredSightings = filterBy(sightings, {
        filterBy: this.state.filterByColumn,
        filterQuery: this.state.filterQuery,
        startTime: this.state.filterStartTime,
        endTime: this.state.filterEndTime
      })
      // Sort list
      let sortedSightings = sortBy(filteredSightings, this.state.orderBy, this.state.reverseOrder)
      listOfSightings = sortedSightings.map(sighting => {
        return <Sighting key={sighting.id} {...sighting} />
      })
    } else {
      return <Loading />
    }
    return (
      <div>
        <Filter
          handleSpecies={this.handleSpecies}
          handleStartTime={this.handleStartTime}
          handleEndTime={this.handleEndTime}
          resetFilters={this.resetFilters}
        />
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
      </div>
    )
  }
}

const Sightings = connect(mapStateToProps, mapDispatchToProps)(SightingsComponent)

export default Sightings
