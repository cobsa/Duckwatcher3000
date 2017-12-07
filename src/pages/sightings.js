/* Page shows listing of current sightings. 
Handles sorting and filtering of the sightings. Reads filter arguments and sightings data from redux */

// Node packages
import React from 'react'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'

// Custom packages

import * as sightingActions from '../redux/actions/sightingsActions'
import Filter from '../components/filterComponent'
import Loading from '../components/common/loading'
import Table from '../components/table/table'

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
    const { status } = this.props.sightings
    // If sightings status is "FETCHED" filter and sort data, otherwise show loading component
    if (status.code === 'FETCHED') {
      return (
        <div>
          <Filter
            handleSpecies={this.handleSpecies}
            handleStartTime={this.handleStartTime}
            handleEndTime={this.handleEndTime}
            resetFilters={this.resetFilters}
          />
          <Table
            {...this.props.sightings}
            handleSort={this.handleSort}
            translate={this.props.translate}
          />
        </div>
      )
    } else {
      return <Loading />
    }
  }
}

// Connect to store

const Sightings = connect(mapStateToProps, mapDispatchToProps)(SightingsComponent)

export default Sightings
