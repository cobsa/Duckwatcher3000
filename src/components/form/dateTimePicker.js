// Container for react-datetime element

import React from 'react'
import moment from 'moment'
import DateTime from 'react-datetime'

export default class DatePicker extends React.Component {
  constructor() {
    super()
    this.state = {
      value: undefined
    }
  }
  render() {
    // Showing form validation state
    let valid = ''
    if (this.props.valid != undefined) {
      valid = this.props.valid ? 'is-valid' : 'is-invalid'
    }

    let classes = 'form-control ' + valid
    return (
      <div className="form-group">
        <label htmlFor="inputDateTime">Time</label>
        <DateTime
          value={this.state.value}
          defaultValue={moment().startOf('hour')}
          timeFormat="HH:mm:ss"
          onBlur={this.props.handleDateTimeChange}
          isValidDate={currentDate => {
            return currentDate.isBefore(moment())
          }}
          inputProps={{ className: classes }}
          className={classes}
        />
        <div className="invalid-feedback">
          Please select date and time that is not in the future
        </div>
      </div>
    )
  }
}
