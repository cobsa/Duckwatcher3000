import React from 'react'

export default class SelectInput extends React.Component {
  render() {
    let valid = ''
    if (this.props.valid != undefined) {
      valid = this.props.valid ? 'is-valid' : 'is-invalid'
    }

    let classes = 'form-control ' + valid

    return (
      <div className="form-group">
        <label htmlFor={this.props.id}>{this.props.name}</label>
        <select className={classes} id={this.props.id} onChange={this.props.onChange}>
          <option defaultValue>{this.props.defaultValue}</option>
          {this.props.optionsList}
        </select>
        <div className="invalid-feedback">{this.props.errorMessage}</div>
      </div>
    )
  }
}