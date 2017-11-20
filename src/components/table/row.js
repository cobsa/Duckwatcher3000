/* Renders row to table */

import React from 'react'

export default class Sighting extends React.Component {
  render() {
    return (
      <tr>
        <th>{this.props.species}</th>
        <th>{this.props.description}</th>
        <th>{this.props.count}</th>
        <th>{this.props.dateTime}</th>
      </tr>
    )
  }
}
