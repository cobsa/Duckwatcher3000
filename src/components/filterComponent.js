/* 
Container for filter element in sightings page. Selected filters are passed to redux.
 */

import React from 'react'
import moment from 'moment'
import DateTime from 'react-datetime'
import { connect } from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'

import SelectInput from '../components/form/selectInput'
import * as speciesActions from '../redux/actions/speciesActions'
import * as sightingsActions from '../redux/actions/sightingsActions'

const mapStateToProps = state => {
  return {
    species: state.species,
    sightings: state.sightings,
    translate: getTranslate(state.locale),
    getLanguage: getActiveLanguage(state.locale).code
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
      })
      /* WARNING: Potential performance issue since using setState
      in componentDidMount() is no recommended in large quantities
      */
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
    // Check that is moment and not string and modified moment to be end of day instead of start of day
    if (endTime instanceof moment) {
      this.props.setFilter('dateTime', { endTime: endTime.endOf('day'), filterQuery: undefined }) // Set other filter arguments to undefined
    }
  }
  resetFilters(e) {
    e.preventDefault()
    this.props.resetFilter()
  }
  render() {
    const { translate, getLanguage } = this.props
    const classes = 'form-control'
    if (this.props.species.status.code == 'FETCHED') {
      const { startTime, endTime } = this.props.sightings.filter.filterArguments
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
              {translate('filter.filter')}
            </button>
          </p>
          <div className={this.state.collapsed ? 'collapse' : 'collapse.show'} id="filterMenu">
            <div className="card card-body">
              <form className="form-inline">
                <div className="form-group">
                  <span className="filter-label">{translate('filter.filterByTime')}</span>
                  <DateTime
                    value={startTime}
                    timeFormat={false}
                    onChange={this.handleStartTime}
                    inputProps={{ className: classes }}
                    className={classes}
                    dateFormat="DD/MM/YYYY"
                    locale={getLanguage}
                    inputProps={{ placeholder: translate('filter.startTime') }}
                  />
                  <span className="filter-date-separator">-</span>
                  <DateTime
                    value={endTime}
                    timeFormat={false}
                    onChange={this.handleEndTime}
                    inputProps={{ className: classes }}
                    className={classes}
                    dateFormat="DD/MM/YYYY"
                    locale={getLanguage}
                    inputProps={{ placeholder: translate('filter.endTime') }}
                  />
                </div>
                <div className="form-group">
                  <span className="filter-label">{translate('filter.filterBySpecies')}</span>
                  <SelectInput
                    value={this.props.sightings.filter.filterArguments.filterQuery}
                    defaultValue={translate('filter.species')}
                    optionsList={this.props.species.species}
                    onChange={this.validateSpecies}
                  />
                </div>
                <button onClick={this.resetFilters} className="btn btn-primary btn-clear-filter">
                  {translate('filter.clearFilter')}
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
