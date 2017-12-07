/* Page where user can add new sighting. Takes care of user input validation */
import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'

import * as sightingsActions from '../redux/actions/sightingsActions'
import * as speciesActions from '../redux/actions/speciesActions'

import Form from '../components/form/form'
import Loading from '../components/common/loading'

// Connect to store
const mapStateToProps = state => {
  return {
    species: state.species,
    location: state.router.location,
    translate: getTranslate(state.locale)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addSighting: (species, dateTime, description, count) => {
      dispatch(sightingsActions.addSighting(species, dateTime, description, count))
    },
    getSpecies: () => {
      dispatch(speciesActions.getSpecies())
    }
  }
}

export class AddSightingComponent extends React.Component {
  componentDidMount() {
    this.props.getSpecies()
  }

  componentWillReceiveProps(nextProps) {
    // Will force update all when link to sightings is clicked again
    if (
      nextProps.location.pathname === this.props.location.pathname &&
      nextProps.location.key !== this.props.location.key
    ) {
      this.props.getSpecies()
    }
  }

  render() {
    if (this.props.species.status.code === 'FETCHED') {
      return <Form {...this.props} />
    } else {
      return <Loading />
    }
  }
}

const addSighting = connect(mapStateToProps, mapDispatchToProps)(AddSightingComponent)

export default addSighting
