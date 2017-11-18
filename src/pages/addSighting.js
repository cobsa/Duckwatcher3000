import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

export default class AddSighting extends React.Component {
  constructor() {
    super()
    this.state = {
      startTime: moment(),
      species: [
        {
          name: 'Mallard'
        },
        {
          name: 'Mallard1'
        },
        {
          name: 'Mallard2'
        },
        {
          name: 'Mallard3'
        }
      ]
    }
    this.handleDateTimeChange = this.handleDateTimeChange.bind(this)
    this.handleDescription = this.handleDescription.bind(this)
  }

  handleDescription(e) {
    e.preventDefault()
    // TODO: Implement
  }
  handleDateTimeChange(date) {
    console.log('Triggered')
    this.setState({
      startTime: date
    })
  }

  render() {
    // Populate drop down selection with duck names
    const { species } = this.state
    const speciesOptions = species.map(specie => {
      return <option key={specie.name}>{specie.name}</option>
    })

    return (
      <form>
        <div className="form-group">
          <label htmlFor="speciesSelect">Select species</label>
          <select className="form-control" id="speciesSelect">
            {speciesOptions}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="inputCount">Count</label>
          <input
            type="number"
            className="form-control"
            id="inputCount"
            placeholder="Number of sighted birds"
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputDescription">Description</label>
          <input
            type="text"
            className="form-control"
            id="inputDescription"
            placeholder="Short description about sighting"
            onChange={this.handleDescription}
          />
        </div>
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
  }
}
