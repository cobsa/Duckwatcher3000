import * as actions from '../../redux/actions/sightingsActions'
import { access } from 'fs'
import * as constants from '../../redux/constants/sightings'

test('Should start updating all by sending UPDATE_ALL_SIGHTINGS', () => {
  expect(actions.getSightings()).toEqual({
    type: constants.GET_SIGHTINGS
  })
})

test('Should create action replace sightings in store', () => {
  expect(actions.setSightings([])).toEqual({
    type: constants.SET_SIGHTINGS,
    payload: {
      sightings: []
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
    actions.addSighting(
      exampleSighting.species,
      exampleSighting.dateTime,
      exampleSighting.description,
      exampleSighting.count
    )
  ).toEqual({
    type: constants.ADD_SIGHTING,
    payload: {
      species: exampleSighting.species,
      dateTime: exampleSighting.dateTime,
      description: exampleSighting.description,
      count: exampleSighting.count
    }
  })
})
