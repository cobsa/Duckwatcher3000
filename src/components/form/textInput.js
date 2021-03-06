/* Component that renders text selection input */

import React from 'react'

export default class TextInput extends React.Component {
  render() {
    let valid = ''
    if (this.props.valid != undefined) {
      valid = this.props.valid ? 'is-valid' : 'is-invalid'
    }

    let classes = 'form-control ' + valid
    return (
      <div className="form-group">
        <label htmlFor={this.props.id}>{this.props.name}</label>
        <input
          type={this.props.type}
          className={classes}
          id={this.props.id}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onChange}
        />
        <div className="invalid-feedback">{this.props.errorMessage}</div>
      </div>
    )
  }
}
