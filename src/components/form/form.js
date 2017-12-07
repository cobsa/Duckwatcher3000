import React from 'react'
import moment from 'moment'
import { Redirect } from 'react-router-dom'

import SelectInput from './selectInput'
import TextInput from './textInput'
import DatePicker from './dateTimePicker'

export default class Form extends React.Component {
  constructor() {
    super()
    this.handleDateTimeChange = this.handleDateTimeChange.bind(this)
    this.handleDescription = this.handleDescription.bind(this)
    this.handleCount = this.handleCount.bind(this)
    this.handleSpecies = this.handleSpecies.bind(this)
    this.validateInputs = this.validateInputs.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
        value: '',
        valid: undefined
      },
      redirect: false
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
    let value = ''
    // Check if value is null
    if (e.target.value !== '') {
      value = parseInt(e.target.value, 10)
    }
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
    // Checks that species is part of species got from back end
    const { value } = e.target
    const { species } = this.props.species
    const valid = species.find(duck => {
      return duck.name === value
    })
    this.setState({
      species: {
        value,
        valid: valid ? true : false
      }
    })
  }

  handleDateTimeChange(date) {
    let value = moment().startOf('hour')
    let valid = false
    if (date instanceof moment) {
      valid = date.isBefore(moment())
      value = date
    }
    this.setState({
      dateTime: {
        value,
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
    const { translate } = this.props
    if (this.state.redirect) {
      // Redirect if adding successful
      return <Redirect to="/" />
    }
    return (
      <form onSubmit={this.handleSubmit} noValidate>
        <SelectInput
          name={translate('addSighting.label.species')}
          id="speciesSelect"
          defaultValue={translate('addSighting.hints.species')}
          errorMessage={translate('addSighting.error.species')}
          optionsList={species}
          onChange={this.handleSpecies}
          valid={this.state.species.valid}
          value={this.state.species.value}
        />
        <TextInput
          name={translate('addSighting.label.count')}
          id="inputCount"
          type="number"
          placeholder={translate('addSighting.hints.count')}
          valid={this.state.count.valid}
          errorMessage={translate('addSighting.error.count')}
          onChange={this.handleCount}
          value={this.state.count.value}
        />
        <TextInput
          name={translate('addSighting.label.description')}
          id="inputDescription"
          type="text"
          placeholder={translate('addSighting.hints.description')}
          errorMessage={translate('addSighting.error.description')}
          value={this.state.description.value}
          onChange={this.handleDescription}
          valid={this.state.description.valid}
        />
        <fieldset disabled>
          <DatePicker
            name={translate('addSighting.label.time')}
            value={this.state.dateTime.value}
            valid={this.state.dateTime.valid}
            handleDateTimeChange={this.handleDateTimeChange}
            defaultValue={translate('addSighting.hints.time')}
            errorMessage={translate('addSighting.error.time')}
          />
        </fieldset>
        <button type="submit" className="btn btn-primary">
          {translate('addSighting.submit')}
        </button>
      </form>
    )
  }
}
