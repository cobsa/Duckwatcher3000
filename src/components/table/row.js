/* Renders row to table */

import React from 'react'
import moment from 'moment'
import { CSSTransition } from 'react-transition-group'
import { setTimeout } from 'timers'
import '../../static/css/new-row-transitions.css'

export default class Row extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: true
    }
    if (props.newSightingID == props.id) {
      setTimeout(() => {
        this.setState({
          active: false
        })
        props.resetNewID()
      }, 500)
    }
  }
  render() {
    return (
      <CSSTransition in={this.state.active} classNames="newRow" timeout={8000}>
        <tr>
          <th>{moment(this.props.dateTime).format('DD/MM/YYYY HH:mm:ss')}</th>
          <th>{this.props.description}</th>
          <th>{this.props.species}</th>
          <th>{this.props.count}</th>
        </tr>
      </CSSTransition>
    )
  }
}
