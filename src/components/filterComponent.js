import React from 'react'
import moment from 'moment'
import DateTime from 'react-datetime'
import { connect } from 'react-redux'

import SelectInput from '../components/form/selectInput'
import { GET_SPECIES } from '../redux/constants/species'

const mapStateToProps = state => {
  return {
    species: state.species
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateSpecies: () => {
      dispatch({ type: GET_SPECIES })
    }
  }
}
export class FilterComponent extends React.Component {
  constructor() {
    super()
    this.validateSpecies = this.validateSpecies.bind(this)
  }
  componentDidMount() {
    this.props.updateSpecies()
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
      this.props.handleSpecies(value)
    } else {
      this.props.handleSpecies(undefined)
    }
  }
  render() {
    const classes = 'form-control'
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
        <div className="collapse" id="filterMenu">
          <div className="card card-body">
            <form className="form-inline">
              <div className="form-group">
                <DateTime
                  value={this.props.startTime}
                  defaultValue="Select start time"
                  timeFormat={false}
                  onBlur={this.props.handleStartTime}
                  inputProps={{ className: classes }}
                  className={classes}
                />-
                <DateTime
                  value={this.props.endTime}
                  defaultValue="Select end time"
                  timeFormat={false}
                  onBlur={this.props.handleEndTime}
                  inputProps={{ className: classes }}
                  className={classes}
                />
              </div>
              <div className="form-group">
                or
                <SelectInput
                  defaultValue="Choose species"
                  optionsList={this.props.species.species}
                  onChange={this.validateSpecies}
                />
              </div>
              <button onClick={this.props.resetFilters} className="btn btn-primary">
                Clear filters
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const Filter = connect(mapStateToProps, mapDispatchToProps)(FilterComponent)

export default Filter
