/* 
Shows errors when fetching sightings/species, errors are gotten from store.
*/
import React from 'react'
import { connect } from 'react-redux'

import { RESET_SIGHTINGS } from '../redux/constants/sightings'
import { RESET_SPECIES } from '../redux/constants/species'

const mapStateToProps = store => {
  return {
    speciesError: store.species.error,
    sightingsError: store.sightings.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetSightings: (species, dateTime, description, count) => {
      dispatch({ type: RESET_SIGHTINGS })
    },
    resetSpecies: () => {
      dispatch({ type: RESET_SPECIES })
    }
  }
}

// Show sightings/species errors

export class ShowErrorComponent extends React.Component {
  render() {
    const { speciesError, sightingsError } = this.props
    let errors = [speciesError, sightingsError]
    let errorsList = [
      <Error key="species" message={speciesError} onClick={this.props.resetSpecies} />,
      <Error key="sightings" message={sightingsError} onClick={this.props.resetSightings} />
    ]
    return <div className="errorList">{errorsList}</div>
  }
}

// Individual error component

export class Error extends React.Component {
  render() {
    if (this.props.message == undefined) {
      return null
    }
    return (
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
        {this.props.message}
        <button type="button" className="close" onClick={this.props.onClick} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
  }
}

const ErrorComponent = connect(mapStateToProps, mapDispatchToProps)(ShowErrorComponent)
export default ErrorComponent
