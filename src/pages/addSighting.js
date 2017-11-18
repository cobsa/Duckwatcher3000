import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { connect } from 'react-redux'

import 'react-datepicker/dist/react-datepicker.css'
import { addSightingAction } from '../redux/actions/sightingsActions'
import { GETSPECIES } from '../redux/constants/species'
import { FETCHED } from '../redux/constants/sightings'

import TextInput from '../components/form/textInput'

const mapStateToProps = state => {
  return {
    species: state.species
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addSightingAction: (species, dateTime, description, count) => {
      dispatch(addSighting(species, dateTime, description, count))
    },
    getSpecies: () => {
      dispatch({ type: GETSPECIES })
    }
  }
}

class AddSightingComponent extends React.Component {
  constructor() {
    super()
    this.handleDateTimeChange = this.handleDateTimeChange.bind(this)
    this.handleDescription = this.handleDescription.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCount = this.handleCount.bind(this)
    this.state = {
      startTime: moment(),
      description: {
        value: '',
        valid: undefined
      },
      count: {
        value: undefined,
        valid: undefined
      }
    }
  }

  componentDidMount() {
    this.props.getSpecies()
  }

  handleDescription(e) {
    e.preventDefault()
    const { value } = e.target
    let valid = false
    if (value.length > 0) {
      valid = true
    }
    this.setState({
      description: {
        value,
        valid
      }
    })
  }

  handleCount(e) {
    e.preventDefault()
    const { value } = e.target
    let valid = false
    if (value > 0) {
      valid = true
    }
    this.setState({
      count: {
        value,
        valid
      }
    })
  }

  handleDateTimeChange(date) {
    this.setState({
      startTime: date
    })
  }

  handleSubmit(event) {
    this.props.addSighting()
  }

  render() {
    const { species, fetched } = this.props.species
    if (fetched) {
      // Populate drop down selection with duck names
      const speciesOptions = species.map(specie => {
        return <option key={specie.name}>{specie.name}</option>
      })
      return (
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="speciesSelect">Select species</label>
            <select className="form-control" id="speciesSelect">
              {speciesOptions}
            </select>
          </div>
          <TextInput
            name="Count"
            id="inputCount"
            type="number"
            placeholder="Input amount of ducks sighted"
            valid={this.state.count.valid}
            errorMessage="Input amount that is greater than zero"
            onChange={this.handleCount}
            value={this.state.count.value}
          />
          <TextInput
            name="Description"
            id="inputDescription"
            type="text"
            placeholder="Short description of sighting"
            errorMessage="Description can't be empty"
            value={this.state.description.value}
            onChange={this.handleDescription}
            valid={this.state.description.valid}
          />
          <div className="form-group">
            <label htmlFor="inputDateTime">Time</label>
            <DatePicker
              selected={this.state.startTime}
              onChange={this.handleDateTimeChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="LLL"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit sighting
          </button>
        </form>
      )
    } else {
      return <div>Loading</div>
    }
  }
}

const addSighting = connect(mapStateToProps, mapDispatchToProps)(AddSightingComponent)

export default addSighting
