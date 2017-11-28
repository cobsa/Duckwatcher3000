/* Page where user can add new sighting. Takes care of user input validation */
import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import 'react-datetime/css/react-datetime.css'
import * as sightingsActions from '../redux/actions/sightingsActions'
import * as speciesActions from '../redux/actions/speciesActions'

import TextInput from '../components/form/textInput'
import SelectInput from '../components/form/selectInput'
import DatePicker from '../components/form/dateTimePicker'
import Loading from '../components/loading'

// Connect to store
const mapStateToProps = store => {
  return {
    species: store.species,
    location: store.router.location
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addSighting: (species, dateTime, description, count) => {
      dispatch(sightingsActions.addSighting(species, dateTime, description, count))
    },
    getSpecies: () => {
      dispatch(speciesActions.getSpecies())
    }
  }
}

export class AddSightingComponent extends React.Component {
  constructor() {
    super()
    this.handleDateTimeChange = this.handleDateTimeChange.bind(this)
    this.handleDescription = this.handleDescription.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCount = this.handleCount.bind(this)
    this.handleSpecies = this.handleSpecies.bind(this)
    this.validateInputs = this.validateInputs.bind(this)
    this.state = {
      dateTime: {
        value: undefined,
        valid: undefined
      },
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
      },
      redirect: false
    }
  }

  componentDidMount() {
    this.props.getSpecies()
  }

  componentWillReceiveProps(nextProps) {
    // Will force update all when link to sightings is clicked again
    // TODO: Might not be good way?
    if (
      nextProps.location.pathname === this.props.location.pathname &&
      nextProps.location.key !== this.props.location.key
    ) {
      this.props.getSpecies()
    }
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
    // Check if value is null
    if (e.target.value != '') {
      const value = parseInt(e.target.value)
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
  }

  handleSpecies(e) {
    const { value } = e.target
    const { species } = this.props.species
    const valid = species.find(duck => {
      if (duck.name == value) {
        return true
      }
    })
    this.setState({
      species: {
        value,
        valid: valid
      }
    })
  }

  handleDateTimeChange(date) {
    let valid = date.isBefore(moment())
    this.setState({
      dateTime: {
        value: date,
        valid
      }
    })
  }
  validateInputs() {
    // Check that all inputs are valid marks inputs false if user had not inputted any thing
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
    if (!this.state.dateTime.valid) {
      this.setState({
        dateTime: {
          ...this.state.dateTime,
          valid: false
        }
      })
      allValid = false
    }
    return allValid
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.validateInputs()) {
      // Convert date to iso 8601
      let date = this.state.dateTime.value.utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]') // To add UTC timezone to dateTime string
      this.props.addSighting(
        this.state.species.value,
        date,
        this.state.description.value,
        this.state.count.value
      )
      // Redirect
      this.setState({
        redirect: true
      })
    }
  }

  render() {
    const { species } = this.props.species
    if (this.props.species.status.code == 'FETCHED') {
      if (this.state.redirect) {
        // Redirect if adding successful
        return <Redirect to="/" />
      }
      return (
        <form onSubmit={this.handleSubmit} noValidate>
          <SelectInput
            name="Select Species"
            id="speciesSelect"
            defaultValue="Select duck species"
            errorMessage="Please select duck species from list"
            optionsList={species}
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
          <DatePicker
            value={this.state.dateTime.value}
            valid={this.state.dateTime.valid}
            handleDateTimeChange={this.handleDateTimeChange}
          />
          <button type="submit" className="btn btn-primary">
            Submit sighting
          </button>
        </form>
      )
    } else {
      return <Loading />
    }
  }
}

const addSighting = connect(mapStateToProps, mapDispatchToProps)(AddSightingComponent)

export default addSighting
