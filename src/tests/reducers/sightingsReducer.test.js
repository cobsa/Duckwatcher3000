import sightings from '../../redux/reducers/sightingsReducer'

import * as constants from '../../redux/constants/sightings'

const initialState = {
  status: {
    code: 'NOT_FETCHED',
    message: undefined
  },
  order: {
    column: 'dateTime',
    direction: 'ASCENDING'
  },
  filter: {
    column: undefined,
    filterArguments: {
      filterQuery: undefined,
      startTime: undefined,
      endTime: undefined
    }
  },
  sightings: []
}

test('Should return initial state', () => {
  expect(sightings(undefined, {})).toEqual(initialState)
})

test('Should update all sightings', () => {
  expect(
    sightings(undefined, {
      type: constants.SET_SIGHTINGS,
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
    status: {
      code: 'FETCHED',
      message: undefined
    },
    order: {
      column: 'dateTime',
      direction: 'ASCENDING'
    },
    filter: {
      column: undefined,
      filterArguments: {
        filterQuery: undefined,
        startTime: undefined,
        endTime: undefined
      }
    },
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

test('Should set error state', () => {
  expect(
    sightings(undefined, {
      type: constants.SET_ERROR,
      payload: {
        error: 'Some error'
      }
    })
  ).toEqual({
    status: {
      code: 'ERROR',
      message: 'Some error'
    },
    order: {
      column: 'dateTime',
      direction: 'ASCENDING'
    },
    filter: {
      column: undefined,
      filterArguments: {
        filterQuery: undefined,
        startTime: undefined,
        endTime: undefined
      }
    },
    sightings: []
  })
})
