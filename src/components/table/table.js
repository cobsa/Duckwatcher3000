import React from 'react'

import Header from './header'
import Empty from './empty'
import Row from './row'
import sortBy from '../helpers/sortBy'
import filterBy from '../helpers/filterBy'

export default class Table extends React.Component {
  render() {
    const { sightings } = this.props
    const { translate } = this.props
    let listOfSightings
    let emptyAlert
    // Filter list
    let filteredSightings = filterBy(sightings, {
      filterBy: this.props.filter.column,
      filterArguments: this.props.filter.filterArguments
    })
    if (filteredSightings.length > 0) {
      // Sort list
      let sortedSightings = sortBy(
        filteredSightings,
        this.props.order.column,
        this.props.order.direction == 'ASCENDING' ? true : false
      )
      listOfSightings = sortedSightings.map(sighting => {
        return (
          <Row
            key={sighting.id}
            {...sighting}
            newSightingID={this.props.newSightingID}
            resetNewID={this.props.resetNewID}
          />
        )
      })
    } else {
      emptyAlert = <Empty message={translate('filter.noResults')} />
    }
    return (
      <div>
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <Header
                orderBy={this.props.order.column}
                reverseOrder={this.props.order.direction == 'ASCENDING' ? true : false}
                name={translate('table.dateTime')}
                type="dateTime"
                onClick={this.props.handleSort}
              />
              <Header
                orderBy={this.props.order.column}
                reverseOrder={this.props.order.direction == 'ASCENDING' ? true : false}
                name={translate('table.description')}
                type="description"
                onClick={this.props.handleSort}
              />
              <Header
                orderBy={this.props.order.column}
                reverseOrder={this.props.order.direction == 'ASCENDING' ? true : false}
                name={translate('table.species')}
                type="species"
                onClick={this.props.handleSort}
              />
              <Header
                orderBy={this.props.order.column}
                reverseOrder={this.props.order.direction == 'ASCENDING' ? true : false}
                name={translate('table.count')}
                type="count"
                onClick={this.props.handleSort}
              />
            </tr>
          </thead>
          <tbody>{listOfSightings}</tbody>
        </table>
        {emptyAlert}
      </div>
    )
  }
}
