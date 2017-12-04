/* Page shows listing of current sightings. 
Handles sorting and filtering of the sightings. Reads filter arguments and sightings data from redux */

// Node packages
import React from 'react'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'

// Custom packages

import * as sightingActions from '../redux/actions/sightingsActions'
import sortBy from '../components/sortBy'
import filterBy from '../components/filterBy'
import Header from '../components/table/header'
import Sighting from '../components/table/row'
import Loading from '../components/loading'
import Filter from '../components/filterComponent'
import Empty from '../components/table/empty'

const mapStateToProps = state => {
  return {
    sightings: state.sightings,
    translate: getTranslate(state.locale)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSightings: () => {
      dispatch(sightingActions.getSightings())
    },
    setOrder: (column, direction) => {
      dispatch(sightingActions.setOrder(column, direction))
    },
    resetNewID: () => {
      dispatch(sightingActions.resetNewSightingID())
    }
  }
}

// Page that shows all sightings
export class SightingsComponent extends React.Component {
  constructor() {
    super()
    this.handleSort = this.handleSort.bind(this)
  }

  componentDidMount() {
    // Update sightings
    this.props.updateSightings()
  }
  componentWillReceiveProps(nextProps) {
    // Will force update all when link to sightings is clicked again
    if (
      nextProps.location.pathname === this.props.location.pathname &&
      nextProps.location.key !== this.props.location.key
    ) {
      this.props.updateSightings()
    }
  }

  handleSort(column) {
    // Handles sort, sorting is handled via redux to persist sorting state between changing pages
    if (this.props.sightings.order.column !== column) {
      this.props.setOrder(column, 'ASCENDING')
    } else {
      if (this.props.sightings.order.direction == 'ASCENDING') {
        this.props.setOrder(column, 'DESCENDING')
      } else {
        this.props.setOrder(column, 'ASCENDING')
      }
    }
  }

  render() {
    const { sightings, status } = this.props.sightings
    const { translate } = this.props
    let listOfSightings
    let emptyAlert
    // If sightings status is "FETCHED" filter and sort data, otherwise show loading component
    if (status.code == 'FETCHED') {
      // Filter list
      let filteredSightings = filterBy(sightings, {
        filterBy: this.props.sightings.filter.column,
        filterArguments: this.props.sightings.filter.filterArguments
      })
      if (filteredSightings.length > 0) {
        // Sort list
        let sortedSightings = sortBy(
          filteredSightings,
          this.props.sightings.order.column,
          this.props.sightings.order.direction == 'ASCENDING' ? true : false
        )
        listOfSightings = sortedSightings.map(sighting => {
          return (
            <Sighting
              key={sighting.id}
              {...sighting}
              newSightingID={this.props.sightings.newSightingID}
              resetNewID={this.props.resetNewID}
            />
          )
        })
      } else {
        emptyAlert = <Empty message={translate('filter.noResults')} />
      }
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
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <Header
                orderBy={this.props.sightings.order.column}
                reverseOrder={this.props.sightings.order.direction == 'ASCENDING' ? true : false}
                name={translate('table.dateTime')}
                type="dateTime"
                onClick={this.handleSort}
              />
              <Header
                orderBy={this.props.sightings.order.column}
                reverseOrder={this.props.sightings.order.direction == 'ASCENDING' ? true : false}
                name={translate('table.description')}
                type="description"
                onClick={this.handleSort}
              />
              <Header
                orderBy={this.props.sightings.order.column}
                reverseOrder={this.props.sightings.order.direction == 'ASCENDING' ? true : false}
                name={translate('table.species')}
                type="species"
                onClick={this.handleSort}
              />
              <Header
                orderBy={this.props.sightings.order.column}
                reverseOrder={this.props.sightings.order.direction == 'ASCENDING' ? true : false}
                name={translate('table.count')}
                type="count"
                onClick={this.handleSort}
              />
            </tr>
          </thead>
          <tbody>{listOfSightings}</tbody>
        </table>
        {emptyAlert}
      </div>
    )
  }
}

// Connect to store

const Sightings = connect(mapStateToProps, mapDispatchToProps)(SightingsComponent)

export default Sightings
