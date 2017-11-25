import * as actions from '../../redux/actions/sightingsActions'
import { access } from 'fs'
import {
  UPDATE_ALL_SIGHTINGS,
  SIGHTINGS,
  ERROR,
  ADD_SIGHTING
} from '../../redux/constants/sightings'

test('Should start updating all by sending UPDATE_ALL_SIGHTINGS', () => {
  expect(actions.updateAll()).toEqual({
    type: UPDATE_ALL_SIGHTINGS
  })
})

test('Should create action replace sightings in store', () => {
  expect(actions.setSightings([])).toEqual({
    type: SIGHTINGS,
    payload: {
      sightings: []
    }
  })
})

test('Should create action to set error state', () => {
  expect(actions.setError('Some error')).toEqual({
    type: ERROR,
    payload: {
      error: 'Some error'
    }
  })
})

test('Should create action to add sighting', () => {
  const exampleSighting = {
    species: 'mallard',
    dateTime: '2016-10-01T01:01:00Z',
    description: 'Some description',
    count: 2
  }
  expect(
    actions.addSightingAction(
      exampleSighting.species,
      exampleSighting.dateTime,
      exampleSighting.description,
      exampleSighting.count
    )
  ).toEqual({
    type: ADD_SIGHTING,
    payload: {
      species: exampleSighting.species,
      dateTime: exampleSighting.dateTime,
      description: exampleSighting.description,
      count: exampleSighting.count
    }
  })
})
