import Enzyme from 'enzyme'

import sortBy from '../../components/sortBy'

let arrayToSort

beforeEach(() => {
  arrayToSort = [
    {
      name: 'CCC',
      count: 5
    },
    {
      name: 'AAA',
      count: 120
    },
    {
      name: 'ZZZ',
      count: 1
    }
  ]
})

test('Should order by name', () => {
  expect(sortBy(arrayToSort, 'name', false)).toEqual([
    {
      name: 'AAA',
      count: 120
    },
    {
      name: 'CCC',
      count: 5
    },
    {
      name: 'ZZZ',
      count: 1
    }
  ])
})

test('Should order by count', () => {
  expect(sortBy(arrayToSort, 'count', false)).toEqual([
    {
      name: 'ZZZ',
      count: 1
    },

    {
      name: 'CCC',
      count: 5
    },
    {
      name: 'AAA',
      count: 120
    }
  ])
})

test('Should order by name and from Z to A', () => {
  expect(sortBy(arrayToSort, 'name', true)).toEqual([
    {
      name: 'ZZZ',
      count: 1
    },
    {
      name: 'CCC',
      count: 5
    },
    {
      name: 'AAA',
      count: 120
    }
  ])
})

test('Should return same array', () => {
  expect(
    sortBy([
      {
        count: 1,
        name: 'I am first'
      },
      {
        count: 1,
        name: 'I am second'
      }
    ])
  ).toEqual([
    {
      count: 1,
      name: 'I am first'
    },
    {
      count: 1,
      name: 'I am second'
    }
  ])
})