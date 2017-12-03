// Container for react-datetime element

import React from 'react'
import moment from 'moment'
import DateTime from 'react-datetime'

export default class DatePicker extends React.Component {
  render() {
    // Showing form validation state
    let valid = ''
    if (this.props.valid != undefined) {
      valid = this.props.valid ? 'is-valid' : 'is-invalid'
    }

    let classes = 'form-control ' + valid
    return (
      <div className="form-group">
        <label htmlFor="inputDateTime">{this.props.name}</label>
        <DateTime
          value={this.props.value}
          timeFormat="HH:mm:ss"
          onBlur={this.props.handleDateTimeChange}
          isValidDate={currentDate => {
            return currentDate.isBefore(moment())
          }}
          inputProps={{ className: classes }}
          className={classes}
          dateFormat="DD/MM/YYYY"
          onChange={this.props.handleDateTimeChange}
          inputProps={{ placeholder: this.props.defaultValue }}
        />
        <div className="invalid-feedback">{this.props.errorMessage}</div>
      </div>
    )
  }
}
