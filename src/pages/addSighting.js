import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

export default class AddSighting extends React.Component {
  constructor() {
    super()
    this.state = {
      startTime: moment()
    }
    this.handleDateTimeChange = this.handleDateTimeChange.bind(this)
  }

  handleDateTimeChange(date) {
    console.log(date)
    this.setState({
      startTime: date
    })
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="speciesSelect">Select species</label>
          <select className="form-control" id="speciesSelect">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
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
