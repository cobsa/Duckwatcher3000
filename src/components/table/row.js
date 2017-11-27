/* Renders row to table */

import React from 'react'
import moment from 'moment'

export default class Sighting extends React.Component {
  render() {
    return (
      <tr>
        <th>{moment(this.props.dateTime).format('DD/MM/YYYY HH:mm:ss')}</th>
        <th>{this.props.description}</th>
        <th>{this.props.species}</th>
        <th>{this.props.count}</th>
      </tr>
    )
  }
}
