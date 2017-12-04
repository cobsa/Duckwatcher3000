/* eslint-disable no-unused-vars */
import sightings from '../../redux/reducers/sightingsReducer'

import * as constants from '../../redux/constants/sightings'

let initialState = {
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
    },
    collapsed: true // Controls wether or not filter controls are shown
  },
  sightings: [],
  newSightingID: undefined
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
      },
      collapsed: true
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
      },
      collapsed: true
    },
    sightings: []
  })
})
test('Should set sort order', () => {
  expect(
    sightings(undefined, {
      type: constants.SET_ORDER,
      payload: {
        column: 'species',
        direction: 'ASCENDING'
      }
    })
  ).toEqual({
    status: {
      code: 'NOT_FETCHED',
      message: undefined
    },
    order: {
      column: 'species',
      direction: 'ASCENDING'
    },
    filter: {
      column: undefined,
      filterArguments: {
        filterQuery: undefined,
        startTime: undefined,
        endTime: undefined
      },
      collapsed: true
    },
    sightings: []
  })
})

test('Should reset sort order', () => {
  expect(
    sightings(
      {
        status: {
          code: 'NOT_FETCHED',
          message: undefined
        },
        order: {
          column: 'species',
          direction: 'ASCENDING'
        },
        filter: {
          column: undefined,
          filterArguments: {
            filterQuery: undefined,
            startTime: undefined,
            endTime: undefined
          },
          collapsed: true
        },
        sightings: []
      },
      {
        type: constants.RESET_ORDER
      }
    )
  ).toEqual(initialState)
})

test('Should set filter', () => {
  expect(
    sightings(undefined, {
      type: constants.SET_FILTER,
      payload: {
        column: 'species',
        filterArguments: {
          filterQuery: 'mallard'
        }
      }
    })
  ).toEqual({
    status: {
      code: 'NOT_FETCHED',
      message: undefined
    },
    order: {
      column: 'dateTime',
      direction: 'ASCENDING'
    },
    filter: {
      column: 'species',
      filterArguments: {
        filterQuery: 'mallard',
        startTime: undefined,
        endTime: undefined
      },
      collapsed: true
    },
    newSightingID: undefined,
    sightings: []
  })
})

test('Should reset filter', () => {
  expect(
    sightings(
      {
        status: {
          code: 'NOT_FETCHED',
          message: undefined
        },
        order: {
          column: 'dateTime',
          direction: 'ASCENDING'
        },
        filter: {
          column: 'species',
          filterArguments: {
            filterQuery: 'mallard',
            startTime: undefined,
            endTime: undefined
          },
          collapsed: true
        },
        sightings: []
      },
      { type: constants.RESET_FILTER }
    )
  ).toEqual(initialState)
})
