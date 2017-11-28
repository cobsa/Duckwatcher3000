/* Component that renders drop down selection input */

import React from 'react'

export default class SelectInput extends React.Component {
  render() {
    let valid = ''
    if (this.props.valid != undefined) {
      valid = this.props.valid ? 'is-valid' : 'is-invalid'
    }

    let classes = 'form-control ' + valid
    // Populate drop down selection with duck names
    let options
    if (this.props.optionsList) {
      options = this.props.optionsList.map(specie => {
        return <option key={specie.name}>{specie.name}</option>
      })
    }

    return (
      <div className="form-group">
        <label htmlFor={this.props.id}>{this.props.name}</label>
        <select className={classes} id={this.props.id} onChange={this.props.onChange}>
          <option defaultValue>{this.props.defaultValue}</option>
          {options}
        </select>
        <div className="invalid-feedback">{this.props.errorMessage}</div>
      </div>
    )
  }
}
