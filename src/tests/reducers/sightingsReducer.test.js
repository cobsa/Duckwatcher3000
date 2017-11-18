import { sightings } from '../../redux/reducers/sightingsReducer'

import { UPDATEALL, FETCHING, FETCHED, ERROR } from '../../redux/constants/sightings'

const initialState = {
  fetching: false,
  fetched: false,
  error: undefined,
  sightings: []
}

test('Should return initial state', () => {
  expect(sightings(undefined, {})).toEqual(initialState)
})

test('Should update all sightings', () => {
  expect(
    sightings(undefined, {
      type: UPDATEALL,
      payload: {
        sightings: [
          {
            id: 'int',
            dateTime: 'Sting(ISO-8601)',
            description: 'String',
            count: 'int'
          }
        ]
      }
    })
  ).toEqual({
    fetching: false,
    fetched: false,
    error: undefined,
    sightings: [
      {
        id: 'int',
        dateTime: 'Sting(ISO-8601)',
        description: 'String',
        count: 'int'
      }
    ]
  })
})

test('Should switch state to fetching', () => {
  expect(sightings(undefined, { type: FETCHING })).toEqual({
    fetching: true,
    fetched: false,
    error: undefined,
    sightings: []
  })
})

test('Should switch state to fetching and set fetched and error to initial state', () => {
  expect(
    sightings(
      {
        fetching: false,
        fetched: true,
        error: 'Some error',
        sightings: []
      },
      { type: FETCHING }
    )
  ).toEqual({
    fetching: true,
    fetched: false,
    error: undefined,
    sightings: []
  })
})

test('Should switch state to fetched', () => {
  expect(sightings(undefined, { type: FETCHED })).toEqual({
    fetching: false,
    fetched: true,
    error: undefined,
    sightings: []
  })
})

test('Should set error state', () => {
  expect(
    sightings(undefined, {
      type: ERROR,
      payload: {
        error: 'Some error'
      }
    })
  ).toEqual({
    fetching: false,
    fetched: false,
    error: 'Some error',
    sightings: []
  })
})
