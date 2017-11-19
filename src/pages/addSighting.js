import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { connect } from 'react-redux'

import 'react-datepicker/dist/react-datepicker.css'
import { addSightingAction } from '../redux/actions/sightingsActions'
import { GETSPECIES } from '../redux/constants/species'
import { FETCHED } from '../redux/constants/sightings'

import TextInput from '../components/form/textInput'
import SelectInput from '../components/form/selectInput'

// Connect to store
const mapStateToProps = state => {
  return {
    species: state.species
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addSighting: (species, dateTime, description, count) => {
      dispatch(addSightingAction(species, dateTime, description, count))
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
    this.handleSpecies = this.handleSpecies.bind(this)
    this.validateInputs = this.validateInputs.bind(this)
    this.state = {
      dateTime: moment().startOf('hour'),
      species: {
        value: '',
        valid: undefined
      },
      description: {
        value: '',
        valid: undefined
      },
      count: {
        value: 0,
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

  handleSpecies(e) {
    // TODO: Find way to clean code?
    const { value } = e.target
    const { species } = this.props.species
    const valid = species.find(duck => {
      if (duck.name == value) {
        return true
      }
    })
    if (valid) {
      this.setState({
        species: {
          value,
          valid: true
        }
      })
    } else {
      this.setState({
        species: {
          value,
          valid: false
        }
      })
    }
  }

  handleDateTimeChange(date) {
    this.setState({
      dateTime: date
    })
  }
  validateInputs() {
    // Check that all inputs are valid
    let allValid = true
    if (!this.state.count.valid) {
      this.setState({
        count: {
          ...this.state.count,
          valid: false
        }
      })
      allValid = false
    }
    if (!this.state.description.valid) {
      this.setState({
        description: {
          ...this.state.description,
          valid: false
        }
      })
      allValid = false
    }
    if (!this.state.species.valid) {
      this.setState({
        species: {
          ...this.state.species,
          valid: false
        }
      })
      allValid = false
    }
    return allValid
  }

  handleSubmit(event) {
    event.preventDefault()
    // Convert date to iso 8601
    let date = this.state.dateTime.format('YYYY:MM:DDTHH:MM:SS')
    if (this.validateInputs()) {
      this.props.addSighting(
        this.state.species.value,
        date,
        this.state.description.value,
        this.state.count.value
      )
    }
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
          <SelectInput
            name="Select Species"
            id="speciesSelect"
            defaultValue="Select duck species"
            errorMessage="Please select duck species from list"
            optionsList={speciesOptions}
            onChange={this.handleSpecies}
            valid={this.state.species.valid}
          />
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
              selected={this.state.dateTime}
              onChange={this.handleDateTimeChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={60}
              dateFormat="LLL"
              className="form-control"
              maxDate={moment()}
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
