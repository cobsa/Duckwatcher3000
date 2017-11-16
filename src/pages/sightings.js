// Node packages
import React from 'react'

// Custom packages
import Sighting from '../components/sighting'

// Page that shows all sightings

export default class Sightings extends React.Component {
  constructor() {
    super()
    // TODO: connect to redux
    this.state = {
      id: 123,
      description: 'Generic description',
      dateTime: '2016-12-12T10:10:00Z',
      species: 'Mallard',
      count: 3
    }
  }
  render() {
    return (
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Species</th>
            <th>Description</th>
            <th>Count</th>
            <th>DateTime</th>
          </tr>
        </thead>
        <tbody>
          <Sighting {...this.state} id={this.state.id} />
          <Sighting {...this.state} id={this.state.id} />
          <Sighting {...this.state} id={this.state.id} />
          <Sighting {...this.state} id={this.state.id} />
          <Sighting {...this.state} id={this.state.id} />
        </tbody>
      </table>
    )
  }
}
