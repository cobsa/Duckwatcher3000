import React from 'react'
import moment from 'moment'
import DateTime from 'react-datetime'
import { connect } from 'react-redux'

import SelectInput from '../components/form/selectInput'
import * as speciesActions from '../redux/actions/speciesActions'
import * as sightingsActions from '../redux/actions/sightingsActions'

const mapStateToProps = state => {
  return {
    species: state.species,
    sightings: state.sightings
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateSpecies: () => {
      dispatch(speciesActions.getSpecies())
    },
    setFilter: (column, filterArguments) => {
      dispatch(sightingsActions.setFilter(column, filterArguments))
    },
    resetFilter: () => {
      dispatch(sightingsActions.resetFilter())
    }
  }
}
export class FilterComponent extends React.Component {
  constructor() {
    super()
    this.validateSpecies = this.validateSpecies.bind(this)
    this.handleStartTime = this.handleStartTime.bind(this)
    this.handleEndTime = this.handleEndTime.bind(this)
    this.resetFilters = this.resetFilters.bind(this)
    this.state = {
      collapsed: true
    }
  }
  componentDidMount() {
    this.props.updateSpecies()
    if (this.props.sightings.filter.column != undefined) {
      this.setState({
        collapsed: false
      }) // WARNING: Potential performance issue
    }
  }
  validateSpecies(e) {
    const { value } = e.target
    const { species } = this.props.species
    const valid = species.find(duck => {
      if (duck.name == value) {
        return true
      }
    })
    if (valid) {
      // Species in list of species
      this.props.setFilter('species', {
        filterQuery: value,
        startTime: undefined,
        endTime: undefined
      }) // Set other filter arguments to undefined
    } else {
      // Species is not in the list ie. User selected "Choose species"
      this.props.resetFilter()
    }
  }

  handleStartTime(startTime) {
    // Check that is moment and not string
    if (startTime instanceof moment) {
      this.props.setFilter('dateTime', { startTime, filterQuery: undefined }) // Set other filter arguments to undefined
    }
  }
  handleEndTime(endTime) {
    // Check that is moment and not string
    if (endTime instanceof moment) {
      this.props.setFilter('dateTime', { endTime, filterQuery: undefined }) // Set other filter arguments to undefined
    }
  }
  resetFilters(e) {
    e.preventDefault()
    this.props.resetFilter()
  }
  render() {
    const classes = 'form-control'
    console.log(this.state)
    if (this.props.species.status.code == 'FETCHED') {
      return (
        <div>
          <p>
            <button
              className="btn btn-primary btn-filter"
              type="button"
              data-toggle="collapse"
              data-target="#filterMenu"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Filter
            </button>
          </p>
          <div className={this.state.collapsed ? 'collapse' : 'collapse.show'} id="filterMenu">
            <div className="card card-body">
              <form className="form-inline">
                <div className="form-group">
                  <DateTime
                    value={this.props.sightings.filter.filterArguments.startTime}
                    defaultValue="Select start time"
                    timeFormat={false}
                    onChange={this.handleStartTime}
                    inputProps={{ className: classes }}
                    className={classes}
                  />-
                  <DateTime
                    value={this.props.sightings.filter.filterArguments.endTime}
                    defaultValue="Select end time"
                    timeFormat={false}
                    onChange={this.handleEndTime}
                    inputProps={{ className: classes }}
                    className={classes}
                  />
                </div>
                <div className="form-group">
                  or
                  <SelectInput
                    value={this.props.sightings.filter.filterArguments.filterQuery}
                    defaultValue="Choose species"
                    optionsList={this.props.species.species}
                    onChange={this.validateSpecies}
                  />
                </div>
                <button onClick={this.resetFilters} className="btn btn-primary">
                  Clear filters
                </button>
              </form>
            </div>
          </div>
        </div>
      )
    }
    return null
  }
}

const Filter = connect(mapStateToProps, mapDispatchToProps)(FilterComponent)

export default Filter
