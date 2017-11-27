/* Custom table header. Allows to toggle sort direction and type */

import React from 'react'

export default class Header extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.props.onClick(this.props.type)
  }
  render() {
    // Display current sorting direction in appropriate arrow
    let orderBy = this.props.orderBy || null
    let descending = this.props.reverseOrder
    let upStyle = 'material-icons'
    let downStyle = 'material-icons'
    if (orderBy === this.props.type) {
      if (descending) {
        upStyle = 'material-icons active-icon'
      } else {
        downStyle = 'material-icons active-icon'
      }
    }

    return (
      <th className="headerWithIcons" scope="col">
        <button className="sortButton" onClick={this.handleClick}>
          {this.props.name}
          <div className="sortButtons">
            <i className={upStyle}>arrow_upward</i>
            <i className={downStyle}>arrow_downward</i>
          </div>
        </button>
      </th>
    )
  }
}
