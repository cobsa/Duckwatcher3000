import React from 'react'

export default class Empty extends React.Component {
  render() {
    return <div className="empty">{this.props.message}</div>
  }
}
